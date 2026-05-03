import React from 'react';
import { motion } from 'motion/react';
import { Building2, ShieldCheck, ExternalLink, ArrowRight, Info, AlertTriangle, FileText } from 'lucide-react';
import Dashboard from './Dashboard';

const DETAILED_BANKS = [
  { 
    name: 'Chase Bank', 
    security: 'Multi-factor authentication via Duo, physical token support.', 
    reputation: 'High trust, enterprise-grade protection.',
    portal: 'https://chase.com',
    details: 'Member FDIC. Equal Housing Lender.'
  },
  { 
    name: 'Bank of America', 
    security: 'SafePass identification card, advanced encryption.', 
    reputation: 'Global presence, robust fraud detection.',
    portal: 'https://bankofamerica.com',
    details: 'Over 60 million customers worldwide.'
  },
  { 
    name: 'HSBC', 
    security: 'Secure Key (physical/digital), biometric login.', 
    reputation: 'International banking standard.',
    portal: 'https://hsbc.com',
    details: 'One of the largest banking organizations.'
  },
];

export default function Intelligence() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h2 className="font-serif italic text-sm text-cyber-muted uppercase tracking-widest">Security Module 03</h2>
        <h1 className="text-4xl font-bold tracking-tight">Intelligence & Bank Auth</h1>
        <p className="text-cyber-muted">Verified financial institution profiles and real-time security telemetry.</p>
      </header>

      {/* Security Dashboard Section */}
      <section className="bg-cyber-border/5 rounded-3xl p-2 border border-cyber-border/50">
        <Dashboard />
      </section>

      {/* Verified Banks Detailed List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-2xl font-bold flex items-center gap-3">
              <Building2 className="w-6 h-6 text-cyber-accent" />
              Verified Institution Protocols
           </h2>
           <button className="text-[10px] font-mono text-cyber-accent flex items-center gap-1 hover:underline">
              DOWNLOAD FULL REPORT <FileText className="w-3 h-3" />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {DETAILED_BANKS.map((bank, i) => (
             <motion.div
               key={bank.name}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-cyber-bg border border-cyber-border rounded-2xl p-6 flex flex-col justify-between hover:border-cyber-accent/50 transition-all group"
             >
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="w-12 h-12 bg-cyber-accent/10 rounded-xl flex items-center justify-center text-cyber-accent">
                        <Building2 className="w-6 h-6" />
                     </div>
                     <ShieldCheck className="w-6 h-6 text-cyber-safe" />
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-xl font-bold group-hover:text-cyber-accent transition-colors">{bank.name}</h3>
                     <p className="text-xs text-cyber-muted font-mono">{bank.portal}</p>
                  </div>
                  <div className="space-y-2">
                     <div className="p-3 bg-cyber-border/20 rounded-lg text-xs leading-relaxed text-cyber-ink/80">
                        <span className="font-bold text-cyber-accent uppercase text-[9px] block mb-1 tracking-widest">Security Protocol</span>
                        {bank.security}
                     </div>
                     <div className="p-3 bg-cyber-border/20 rounded-lg text-xs leading-relaxed text-cyber-ink/80">
                        <span className="font-bold text-cyber-muted uppercase text-[9px] block mb-1 tracking-widest">Trust Assessment</span>
                        {bank.reputation}
                     </div>
                  </div>
               </div>

               <div className="mt-6 pt-4 border-t border-cyber-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-cyber-muted">
                    <Info className="w-3 h-3" />
                    <span>Verified Source</span>
                  </div>
                  <a 
                    href={bank.portal} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-cyber-accent hover:gap-3 transition-all"
                  >
                    GO TO PORTAL <ArrowRight className="w-4 h-4" />
                  </a>
               </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Advisory Section */}
      <section className="bg-cyber-danger/5 border border-cyber-danger/20 rounded-3xl p-8 flex items-center gap-6">
        <div className="w-16 h-16 bg-cyber-danger/10 rounded-full flex items-center justify-center text-cyber-danger shrink-0">
           <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-cyber-danger">Security Advisory: Unverified Redirects</h4>
          <p className="text-sm text-cyber-ink/70 max-w-3xl">
            Never click on banking links received via SMS or email regardless of how legitimate they look. Use the verified portals listed above or manually type the URL into your browser bridge. PhishGuard monitors all outbound requests to these domains.
          </p>
        </div>
      </section>
    </div>
  );
}
