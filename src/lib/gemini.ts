import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface PhishReport {
  score: number; // 0 to 100, where 100 is definitely phishing
  verdict: "Safe" | "Suspicious" | "Malicious";
  reasons: string[];
  recommendations: string[];
  details?: {
    domainReputation: string;
    sslStatus: string;
    redirectChain: string;
  };
  isOfficial?: boolean;
}

export async function analyzeUrl(url: string): Promise<PhishReport> {
  const prompt = `Analyze this URL for phishing and authenticity: ${url}
  
  CORE TASKS:
  1. Determine if this is the OFFICIAL domain for a well-known brand/bank (e.g., google.com, chase.com).
  2. If it is the official gateway, set the score to 0 and verdict to "Safe".
  3. Look for Typosquatting (g0ogle.com), deceptive subdomains (chase.login-secure.com), and suspicious TLDs.
  4. Evaluate "Brand Integrity": Is it pretending to be an official bank while residing on a generic host?
  
  Return a JSON object with the following structure:
  {
    "score": number (0-100, where 0 is perfectly authentic/safe),
    "verdict": "Safe" | "Suspicious" | "Malicious",
    "reasons": string[],
    "recommendations": string[],
    "details": {
      "domainReputation": "string (e.g. 'Highly Trusted Official Brand')",
      "sslStatus": "string (e.g. 'Verified EV Certificate')",
      "redirectChain": "string (e.g. 'Direct Encrypted Link')"
    },
    "isOfficial": boolean (true if it's a known top-tier brand/bank portal)
  }
  Do not include markdown formatting in your response.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      score: result.score ?? 50,
      verdict: result.verdict ?? "Suspicious",
      reasons: result.reasons ?? ["Unable to fully analyze"],
      recommendations: result.recommendations ?? ["Proceed with extreme caution"],
      details: result.details,
      isOfficial: result.isOfficial
    };
  } catch (error) {
    console.error("Phish Detection Error:", error);
    return {
      score: 100,
      verdict: "Suspicious",
      reasons: ["AI Analysis failed", "URL appears non-standard"],
      recommendations: ["Do not enter credentials"]
    };
  }
}

export interface AssociationResult {
  category: string;
  trustScore: number;
  associations: string[];
  riskPatterns: string[];
  description: string;
}

export async function classifyAssociation(query: string): Promise<AssociationResult> {
  const prompt = `Perform an associative classification for: "${query}".
  Identify the primary industry category, a trust score (0-100), common service associations, and potential risk patterns associated with this entity or similar entities in its class.
  
  Return a JSON object:
  {
    "category": "string",
    "trustScore": number,
    "associations": ["string"],
    "riskPatterns": ["string"],
    "description": "string"
  }
  Do not include markdown formatting.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      category: result.category ?? "Unknown",
      trustScore: result.trustScore ?? 0,
      associations: result.associations ?? [],
      riskPatterns: result.riskPatterns ?? [],
      description: result.description ?? "Analysis unavailable."
    };
  } catch (error) {
    console.error("Classification Error:", error);
    return {
      category: "Error",
      trustScore: 0,
      associations: [],
      riskPatterns: ["Analysis failure"],
      description: "Could not classify."
    };
  }
}
