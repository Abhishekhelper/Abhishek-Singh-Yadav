import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Key, Lock, Eye, EyeOff, Globe, ArrowRight, ShieldCheck, Fingerprint, Settings } from 'lucide-react';

interface Site {
  name: string;
  url: string;
  username: string;
  strength: 'weak' | 'moderate' | 'strong';
}

const MOCK_SITES: Site[] = [
  { name: 'Google Cloud', url: 'console.cloud.google.com', username: 'admin@phishguard.ai', strength: 'strong' },
  { name: 'GitHub Enterprise', url: 'github.com', username: 'dev-abhishek', strength: 'strong' },
  { name: 'Slack Workspace', url: 'app.slack.com', username: 'abhishek@company.com', strength: 'moderate' },
  { name: 'AWS Portal', url: 'aws.amazon.com', username: 'root_phish', strength: 'strong' },
];

export default function Vault() {
  const [showPassword, setShowPassword] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="font-serif italic text-sm text-cyber-muted uppercase tracking-widest">Security Module 02</h2>
            <h1 className="text-4xl font-bold tracking-tight">Secure Access Vault</h1>
          </div>
          <div className="p-3 bg-cyber-accent/10 border border-cyber-accent/30 rounded-xl">
             <Fingerprint className="w-8 h-8 text-cyber-accent" />
          </div>
        </div>
        <p className="text-cyber-muted max-w-2xl">
           Manager your authenticated sessions within an encrypted, sandboxed environment. PhishGuard ensures your credentials are never exposed to malicious redirects.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-2">
             <button className="w-full flex items-center gap-3 px-4 py-3 bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30 rounded-lg text-sm font-medium">
               <Globe className="w-4 h-4" /> All Portals
             </button>
             <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyber-border/50 text-cyber-muted rounded-lg text-sm transition-colors">
               <ShieldCheck className="w-4 h-4" /> Trusted Only
             </button>
             <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyber-border/50 text-cyber-muted rounded-lg text-sm transition-colors">
               <Settings className="w-4 h-4" /> Configuration
             </button>
        </aside>

        <div className="md:col-span-3 space-y-4">
          <div className="flex justify-between items-center px-4 py-2 border-b border-cyber-border">
             <span className="font-serif italic text-[10px] text-cyber-muted uppercase tracking-[0.2em]">Resource</span>
             <span className="font-serif italic text-[10px] text-cyber-muted uppercase tracking-[0.2em]">Access Token Status</span>
          </div>

          <div className="space-y-3">
            {MOCK_SITES.map((site, i) => (
              <motion.div
                key={site.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex items-center justify-between p-4 bg-cyber-border/20 border border-cyber-border rounded-xl hover:border-cyber-accent/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-cyber-accent">
                      <Lock className="w-5 h-5" />
                   </div>
                   <div className="space-y-1">
                      <p className="font-bold text-sm">{site.name}</p>
                      <p className="font-mono text-[10px] text-cyber-muted uppercase tracking-tighter">{site.url}</p>
                   </div>
                </div>

                <div className="flex items-center gap-6">
                   <div className="text-right hidden sm:block">
                      <p className="text-xs text-cyber-ink/80">{site.username}</p>
                      <div className="flex items-center justify-end gap-1">
                         <div className={`w-1.5 h-1.5 rounded-full ${site.strength === 'strong' ? 'bg-cyber-safe shadow-[0_0_8px_var(--color-cyber-safe)]' : 'bg-cyber-warning'}`} />
                         <span className="text-[9px] uppercase tracking-tighter text-cyber-muted">Encrypted</span>
                      </div>
                   </div>
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       setShowPassword(showPassword === site.name ? null : site.name);
                     }}
                     className="p-2 text-cyber-muted hover:text-cyber-accent transition-colors"
                   >
                      {showPassword === site.name ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                   </button>
                   <button className="p-2 h-10 w-10 flex items-center justify-center bg-cyber-accent text-white rounded-lg hover:bg-cyber-accent/90 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 border border-dashed border-cyber-border rounded-xl flex flex-col items-center justify-center text-center space-y-4">
             <Key className="w-12 h-12 text-cyber-muted opacity-30" />
             <div className="space-y-1">
                <p className="text-sm font-medium">Add New Authenticated Portal</p>
                <p className="text-xs text-cyber-muted">Integrate a new service using OAuth or Direct Credentials through our secure bridge.</p>
             </div>
             <button className="px-6 py-2 border border-cyber-border rounded-full text-xs font-mono uppercase tracking-widest hover:bg-cyber-border/50 transition-colors">
                Initialize Connect
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
