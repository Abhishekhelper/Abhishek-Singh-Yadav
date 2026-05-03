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
}

export async function analyzeUrl(url: string): Promise<PhishReport> {
  const prompt = `Analyze this URL for phishing characteristics: ${url}
  Look for:
  - Typosquatting (e.g., g0ogle.com instead of google.com)
  - Suspicious TLDs
  - Length and complexity
  - Domain age (if you can infer patterns)
  - Known phishing patterns
  - Domain Reputation (is it a well-known brand?)
  - SSL/HTTPS expectations
  - Potential redirect traps
  
  Return a JSON object with the following structure:
  {
    "score": number (0-100),
    "verdict": "Safe" | "Suspicious" | "Malicious",
    "reasons": string[],
    "recommendations": string[],
    "details": {
      "domainReputation": "string describing domain trust level",
      "sslStatus": "string describing SSL/Security posture",
      "redirectChain": "string describing potential for malicious redirection"
    }
  }
  Do not include markdown formatting in your response, just the raw JSON.`;

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
      details: result.details
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
