/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Shield, LayoutDashboard, Search, Key, Menu, X, Bell, User, Activity } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './components/Dashboard';
import Detector from './components/Detector';
import Vault from './components/Vault';
import Home from './components/Home';
import Intelligence from './components/Intelligence';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-cyber-bg flex flex-col">
        {/* Navigation Rail / Header */}
        <nav className="border-b border-cyber-border bg-cyber-bg/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-cyber-accent rounded-lg flex items-center justify-center text-white">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-bold tracking-tight text-xl hidden sm:inline-block">PHISHGUARD <span className="text-cyber-accent">AI</span></span>
              </div>

              <div className="hidden md:flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                <NavButton to="/" icon={<LayoutDashboard className="w-3.5 h-3.5" />} label="Home" />
                <NavButton to="/intelligence" icon={<Activity className="w-3.5 h-3.5" />} label="Intelligence" />
                <NavButton to="/detect" icon={<Search className="w-3.5 h-3.5" />} label="Detect" />
                <NavButton to="/vault" icon={<Key className="w-3.5 h-3.5" />} label="Vault" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-cyber-muted hover:text-cyber-ink transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-cyber-danger rounded-full" />
              </button>
              <div className="h-8 w-[1px] bg-cyber-border hidden sm:block" />
              <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cyber-ink/80 group-hover:text-cyber-ink transition-colors">Abhishek S.</p>
                  <p className="text-[9px] font-mono text-cyber-muted uppercase tracking-tighter">Security Level: 05</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-cyber-border border border-cyber-border flex items-center justify-center text-cyber-muted overflow-hidden group-hover:border-cyber-accent transition-all ring-2 ring-transparent group-hover:ring-cyber-accent/20">
                   <User className="w-5 h-5" />
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-cyber-muted"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 md:p-10 relative">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/intelligence" element={<PageWrapper><Intelligence /></PageWrapper>} />
              <Route path="/detect" element={<PageWrapper><Detector /></PageWrapper>} />
              <Route path="/vault" element={<PageWrapper><Vault /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Footer Rail */}
        <footer className="border-t border-cyber-border p-4 bg-cyber-bg/50">
           <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-cyber-muted">
              <div className="flex items-center gap-4">
                 <span>System Time: {new Date().toLocaleTimeString()}</span>
                 <span className="hidden sm:inline">|</span>
                 <span>Latency: 24ms</span>
              </div>
              <p>&copy; 2024 PhishGuard Security Operations Center. All Rights Reserved.</p>
           </div>
        </footer>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-[60] bg-cyber-bg md:hidden p-6 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-12">
                 <span className="font-bold tracking-tight text-xl">PHISHGUARD <span className="text-cyber-accent">AI</span></span>
                 <button onClick={() => setMobileMenuOpen(false)} className="p-2 border border-cyber-border rounded-lg">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              <div className="flex flex-col gap-4">
                 <MobileLink to="/" label="Home" icon={<LayoutDashboard />} setOpen={setMobileMenuOpen} />
                 <MobileLink to="/intelligence" label="Intelligence" icon={<Activity />} setOpen={setMobileMenuOpen} />
                 <MobileLink to="/detect" label="Phish Detector" icon={<Search />} setOpen={setMobileMenuOpen} />
                 <MobileLink to="/vault" label="Secure Vault" icon={<Key />} setOpen={setMobileMenuOpen} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

function NavButton({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `
        flex items-center gap-2 px-4 py-2 rounded-lg transition-all
        ${isActive ? 'bg-cyber-accent/10 text-cyber-accent' : 'text-cyber-muted hover:text-cyber-ink hover:bg-cyber-border/50'}
      `}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

function MobileLink({ to, label, icon, setOpen }: { to: string, label: string, icon: React.ReactNode, setOpen: (o: boolean) => void }) {
  return (
     <NavLink 
       to={to}
       onClick={() => setOpen(false)}
       className={({ isActive }) => `
         flex items-center gap-4 p-4 rounded-xl text-lg font-medium transition-all
         ${isActive ? 'bg-cyber-accent text-white shadow-lg shadow-cyber-accent/20' : 'bg-cyber-border/20 text-cyber-muted'}
       `}
     >
       {icon}
       {label}
     </NavLink>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

