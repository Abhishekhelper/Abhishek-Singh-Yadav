import React from 'react';
import { motion } from 'motion/react';
import { Shield, Activity, Lock, AlertCircle, TrendingUp, Cpu } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="font-serif italic text-sm text-cyber-muted uppercase tracking-widest">Global Status Overview</h2>
        <h1 className="text-4xl font-bold tracking-tight">Security Command Center</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<Shield className="w-5 h-5 text-cyber-safe" />} 
          title="Active Monitoring" 
          value="Online" 
          detail="All systems operational" 
        />
        <StatCard 
          icon={<Activity className="w-5 h-5 text-cyber-accent" />} 
          title="Daily Scans" 
          value="1,284" 
          detail="+12% from yesterday" 
        />
        <StatCard 
          icon={<AlertCircle className="w-5 h-5 text-cyber-danger" />} 
          title="Threats Blocked" 
          value="42" 
          detail="3 high-priority intercepts" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-muted">Real-time Traffic Analysis</h3>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-cyber-safe animate-pulse" />
                 <span className="text-[10px] font-mono text-cyber-safe">LIVE</span>
              </div>
           </div>
           
           <div className="h-[300px] bg-cyber-border/10 border border-cyber-border rounded-2xl p-6 relative overflow-hidden mission-control-grid">
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent opacity-50" />
              <div className="relative h-full flex flex-col justify-between">
                 <div className="space-y-2">
                    <p className="font-serif italic text-xl">Incoming data packets optimized for secure routing.</p>
                    <p className="text-xs text-cyber-muted max-w-md">Our neural engine is currently processing global threat vectors to update your local firewall heuristics.</p>
                 </div>
                 <div className="flex items-end gap-1 h-32">
                    {[40, 70, 45, 90, 65, 80, 50, 100, 85, 95, 60].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="flex-1 bg-cyber-accent/40 border-t-2 border-cyber-accent rounded-t-sm"
                      />
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-muted">Recent Security Logs</h3>
           <div className="space-y-2">
              {[
                { time: '12:04:22', msg: 'HEURISTIC SCAN COMPLETE: URL-CONTEXT-228', status: 'SAFE' },
                { time: '11:58:10', msg: 'CREDENTIAL ENCRYPTION SYNCED: VAULT-PRIMARY', status: 'SYNC' },
                { time: '11:42:05', msg: 'MALICIOUS PAYLOAD DETECTED: 192.168.1.4', status: 'BLOCKED' },
                { time: '10:30:15', msg: 'SYSTEM BOOT SEQUENCE FINALIZED', status: 'OK' },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-cyber-border/20 border border-cyber-border/50 rounded-lg text-[11px] font-mono group hover:border-cyber-accent transition-colors">
                   <span className="text-cyber-muted">{log.time}</span>
                   <span className="flex-1 text-cyber-ink/80 group-hover:text-cyber-ink">{log.msg}</span>
                   <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                     log.status === 'BLOCKED' ? 'bg-cyber-danger/20 text-cyber-danger' : 
                     log.status === 'SAFE' ? 'bg-cyber-safe/20 text-cyber-safe' : 'bg-cyber-accent/20 text-cyber-accent'
                   }`}>
                     {log.status}
                   </span>
                </div>
              ))}
           </div>
           
           <div className="p-4 bg-cyber-accent/5 border border-cyber-accent/20 rounded-xl flex items-center gap-4">
              <Cpu className="w-8 h-8 text-cyber-accent" />
              <div className="space-y-1">
                 <p className="text-xs font-bold uppercase tracking-widest">Neural Link Enabled</p>
                 <p className="text-[10px] text-cyber-muted">Gemini-3-Flash is currently providing augmented threat detection at high precision.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, detail }: { icon: React.ReactNode, title: string, value: string, detail: string }) {
  return (
    <div className="bg-cyber-border/20 border border-cyber-border p-6 rounded-2xl space-y-4 hover:border-cyber-accent/50 transition-all group">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-black rounded-lg group-hover:bg-cyber-bg transition-colors">
          {icon}
        </div>
        <TrendingUp className="w-4 h-4 text-cyber-muted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-mono uppercase tracking-widest text-cyber-muted">{title}</p>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
      <p className="text-[10px] uppercase font-bold tracking-tighter text-cyber-muted">{detail}</p>
    </div>
  );
}
