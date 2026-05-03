import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, ShieldX, Search, Loader2, ExternalLink, AlertTriangle } from 'lucide-react';
import { analyzeUrl, PhishReport } from '../lib/gemini';

export default function Detector() {
  const [url, setUrl] = useState('');
  const [report, setReport] = useState<PhishReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (input: string) => {
    try {
      const parsed = new URL(input);
      return (parsed.protocol === 'http:' || parsed.protocol === 'https:');
    } catch (_) {
      return false;
    }
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let processedUrl = url.trim();
    if (!processedUrl) return;

    // Smart Validation: If it looks like a domain, prepending https for processing
    if (!processedUrl.includes('.')) {
      setError('Invalid domain structure.');
      return;
    }

    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = `https://${processedUrl}`;
    }

    // Attempt normalized validation
    try {
      new URL(processedUrl);
    } catch (_) {
      setError('Please enter a valid active URL.');
      return;
    }

    setLoading(true);
    setReport(null);

    // Call the AI API directly for hybrid evaluation of both whitelist and suspect domains
    const result = await analyzeUrl(processedUrl);
    setReport(result);
    setLoading(false);
  };

  const getVerdictStyles = (verdict: string) => {
    switch (verdict) {
      case 'Safe': return 'bg-cyber-safe/10 text-cyber-safe border-cyber-safe/30';
      case 'Suspicious': return 'bg-cyber-warning/10 text-cyber-warning border-cyber-warning/30';
      case 'Malicious': return 'bg-cyber-danger/10 text-cyber-danger border-cyber-danger/30';
      default: return 'bg-cyber-muted/10 text-cyber-muted border-cyber-muted/30';
    }
  };

  const getVerdictIcon = (verdict: string, isOfficial?: boolean) => {
    if (isOfficial) return <ShieldCheck className="w-10 h-10 text-cyber-safe animate-pulse" />;
    switch (verdict) {
      case 'Safe': return <ShieldCheck className="w-8 h-8" />;
      case 'Suspicious': return <ShieldAlert className="w-8 h-8" />;
      case 'Malicious': return <ShieldX className="w-8 h-8" />;
      default: return <AlertTriangle className="w-8 h-8" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="space-y-2">
        <h2 className="font-serif italic text-sm text-cyber-muted uppercase tracking-widest">Security Module 01</h2>
        <h1 className="text-4xl font-bold tracking-tight">AI Phishing Detector</h1>
        <p className="text-cyber-muted">Input any URL to perform a deep semantic analysis of its structure and potential threats.</p>
      </header>

      <form onSubmit={handleScan} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyber-muted group-focus-within:text-cyber-accent transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://suspect-site.com"
          className="w-full bg-cyber-bg border border-cyber-border rounded-xl py-4 pl-12 pr-32 focus:outline-none focus:border-cyber-accent transition-all font-mono text-sm"
        />
        <button
          disabled={loading || !url}
          type="submit"
          className="absolute inset-y-1.5 right-1.5 px-6 bg-cyber-accent text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SCANN'}
        </button>
      </form>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-cyber-danger text-xs font-mono px-2"
          >
            <AlertTriangle className="w-3 h-3" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-64 border border-cyber-border rounded-xl mission-control-grid flex flex-col items-center justify-center space-y-4 overflow-hidden"
          >
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="scan-line" 
            />
            <Loader2 className="w-12 h-12 text-cyber-accent animate-spin" />
            <div className="space-y-1 text-center">
              <p className="font-mono text-xs text-cyber-muted uppercase tracking-tighter">Analyzing Network Latency...</p>
              <p className="font-mono text-xs text-cyber-muted uppercase tracking-tighter">Decompiling URL Syntax...</p>
              <p className="font-mono text-xs text-cyber-accent uppercase tracking-tighter">Checking Threat Database...</p>
            </div>
          </motion.div>
        )}

        {report && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className={`md:col-span-1 rounded-xl border p-6 flex flex-col items-center text-center space-y-4 ${getVerdictStyles(report.verdict)}`}>
              {getVerdictIcon(report.verdict, report.isOfficial)}
              <div className="space-y-1">
                <p className="text-xs uppercase font-bold tracking-widest opacity-70 italic font-serif">Assessment</p>
                <h3 className="text-3xl font-black">{report.verdict}</h3>
                {report.isOfficial && (
                  <div className="px-2 py-0.5 bg-cyber-safe text-[8px] text-black font-black uppercase tracking-[0.2em] rounded animate-bounce">
                    Official Gateway
                  </div>
                )}
              </div>
              <div className="w-full space-y-1">
                <div className="flex justify-between text-[9px] font-mono uppercase tracking-tighter opacity-80">
                  <span>Threat: {report.score}%</span>
                  <span>Authenticity: {100 - report.score}%</span>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden flex">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${report.score}%` }}
                    className="h-full bg-current transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Trust Index: {100 - report.score}%</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="bg-cyber-border/30 rounded-xl p-6 space-y-4">
                <h4 className="font-serif italic text-cyber-muted text-sm uppercase tracking-widest border-b border-cyber-border pb-2">Analysis Results</h4>
                
                {report.details && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 bg-cyber-bg/40 p-4 rounded-lg border border-cyber-border">
                    <div className="space-y-1">
                      <p className="text-[9px] font-mono text-cyber-muted uppercase tracking-[0.2em]">Reputation</p>
                      <p className="text-xs font-medium text-cyber-ink">{report.details.domainReputation}</p>
                    </div>
                    <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-cyber-border sm:pl-4 pt-2 sm:pt-0">
                      <p className="text-[9px] font-mono text-cyber-muted uppercase tracking-[0.2em]">SSL / Security</p>
                      <p className="text-xs font-medium text-cyber-ink">{report.details.sslStatus}</p>
                    </div>
                    <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-cyber-border sm:pl-4 pt-2 sm:pt-0">
                      <p className="text-[9px] font-mono text-cyber-muted uppercase tracking-[0.2em]">Redirect Check</p>
                      <p className="text-xs font-medium text-cyber-ink">{report.details.redirectChain}</p>
                    </div>
                  </div>
                )}

                <ul className="space-y-3">
                  {report.reasons.map((reason, i) => (
                    <li key={i} className="flex gap-3 text-sm text-cyber-ink/80">
                      <span className="text-cyber-accent font-mono">[{i + 1}]</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-cyber-border/30 rounded-xl p-6 space-y-4">
                <h4 className="font-serif italic text-cyber-muted text-sm uppercase tracking-widest border-b border-cyber-border pb-2">Counter-Measures</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {report.recommendations.map((rec, i) => (
                    <div key={i} className="bg-cyber-bg/50 p-3 rounded border border-cyber-border text-xs text-cyber-muted flex items-start gap-2">
                       <ShieldCheck className="w-4 h-4 text-cyber-accent shrink-0 mt-0.5" />
                       {rec}
                    </div>
                  ))}
                </div>
              </div>

              {report.verdict === 'Safe' && (
                <a 
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-cyber-accent hover:underline text-sm font-medium"
                >
                  Proceed to Website <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
