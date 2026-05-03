import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldCheck, QrCode, Building2, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { classifyAssociation, AssociationResult } from '../lib/gemini';

const WHITELIST_BANKS = [
  { name: 'Chase Bank', domain: 'chase.com', status: 'verified' },
  { name: 'Bank of America', domain: 'bankofamerica.com', status: 'verified' },
  { name: 'HSBC', domain: 'hsbc.com', status: 'verified' },
  { name: 'Wells Fargo', domain: 'wellsfargo.com', status: 'verified' },
  { name: 'Citibank', domain: 'citi.com', status: 'verified' },
  { name: 'Barclays', domain: 'barclays.co.uk', status: 'verified' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [classification, setClassification] = useState<AssociationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClassify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    const result = await classifyAssociation(query);
    setClassification(result);
    setLoading(false);
  };

  const appDetails = JSON.stringify({
    name: 'PhishGuard AI',
    version: '1.0.0',
    developer: 'Abhishek S.',
    endpoint: window.location.origin,
    security_level: 'Enterprise'
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="inline-block px-4 py-1 rounded-full bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-accent text-[10px] font-mono uppercase tracking-[0.3em]"
        >
          Neural-Powered Security Operations
        </motion.div>
        <h1 className="text-6xl font-bold tracking-tighter max-w-4xl mx-auto leading-tight">
          Detect Threats. Protect Assets. <span className="text-cyber-accent">Analyze Everything.</span>
        </h1>
        <p className="text-cyber-muted max-w-2xl mx-auto text-lg">
          The next generation of phishing detection combined with associative classification and secure bank whitelisting.
        </p>
      </section>

      {/* Associative Classifier Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6 bg-cyber-border/10 border border-cyber-border rounded-3xl p-8 mission-control-grid">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-cyber-accent" />
              Associative Classifier
            </h2>
            <p className="text-cyber-muted text-sm">
              Enter any brand, domain, or industry to classify risk associations and trust metrics using our Neural Engine.
            </p>
          </div>

          <form onSubmit={handleClassify} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. PayPal, Amazon, Finance industry"
                className="w-full bg-cyber-bg border border-cyber-border rounded-xl py-4 px-6 focus:outline-none focus:border-cyber-accent transition-all font-mono"
              />
              <button
                disabled={loading || !query}
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 bg-cyber-accent text-white rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'CLASSIFY'}
              </button>
            </div>
          </form>

          <AnimatePresence mode="wait">
            {classification && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cyber-bg/80 border border-cyber-border p-6 rounded-2xl space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-mono text-cyber-muted uppercase tracking-widest">Classification</p>
                    <h3 className="text-xl font-bold text-cyber-accent">{classification.category}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-cyber-muted uppercase tracking-widest">Trust Score</p>
                    <p className={`text-xl font-black ${classification.trustScore > 70 ? 'text-cyber-safe' : 'text-cyber-warning'}`}>
                      {classification.trustScore}%
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-cyber-ink/80 italic">"{classification.description}"</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono text-cyber-muted uppercase tracking-widest">Associations</p>
                    <div className="flex flex-wrap gap-2">
                      {classification.associations.map((a, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 bg-cyber-border/50 rounded border border-cyber-border">{a}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono text-cyber-muted uppercase tracking-widest">Risk Patterns</p>
                    <div className="flex flex-wrap gap-2">
                      {classification.riskPatterns.map((rp, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 bg-cyber-danger/10 text-cyber-danger rounded border border-cyber-danger/20">{rp}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global QR Code & Whitelist */}
        <div className="space-y-8">
           <div className="bg-cyber-border/10 border border-cyber-border rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="p-4 bg-white rounded-2xl">
                 <QRCodeSVG 
                    value={appDetails} 
                    size={160}
                    level="H"
                    includeMargin={false}
                 />
              </div>
              <div className="space-y-3 text-center md:text-left">
                 <div className="flex items-center justify-center md:justify-start gap-2 text-cyber-accent">
                    <QrCode className="w-5 h-5" />
                    <span className="font-mono text-xs uppercase tracking-widest font-bold">Secure Access QR</span>
                 </div>
                 <h3 className="text-2xl font-bold">App Verification</h3>
                 <p className="text-sm text-cyber-muted">Scan this code to verify app integrity and access specialized security documentation on your mobile device.</p>
              </div>
           </div>

           <div className="bg-cyber-border/10 border border-cyber-border rounded-3xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-cyber-safe" />
                  Bank Whitelist
                </h3>
                <span className="text-[10px] font-mono text-cyber-muted px-2 py-1 border border-cyber-border rounded">GLOBAL DATABASE</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {WHITELIST_BANKS.map((bank) => (
                  <div key={bank.name} className="flex items-center gap-3 p-3 bg-cyber-bg border border-cyber-border rounded-xl group hover:border-cyber-safe transition-colors">
                     <div className="w-8 h-8 rounded bg-cyber-border flex items-center justify-center text-cyber-muted group-hover:text-cyber-safe">
                        <Building2 className="w-4 h-4" />
                     </div>
                     <div className="overflow-hidden">
                        <p className="text-xs font-bold truncate">{bank.name}</p>
                        <p className="text-[9px] font-mono text-cyber-muted uppercase tracking-tighter truncate">{bank.domain}</p>
                     </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-center text-cyber-muted flex items-center justify-center gap-2 font-mono">
                <AlertCircle className="w-3 h-3" />
                ONLY CONNECT TO THE DOMAINS LISTED ABOVE.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
}
