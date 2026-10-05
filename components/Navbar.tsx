import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Terminal, Layers, FileCheck, CheckCircle2, Wrench } from 'lucide-react';

interface NavbarProps {
  currentTab: 'overview' | 'closeout' | 'exceptions' | 'diamond' | 'connectors' | 'conversion' | 'labor' | 'agentready';
  onSelectTab: (tab: 'overview' | 'closeout' | 'exceptions' | 'diamond' | 'connectors' | 'conversion' | 'labor' | 'agentready') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Industrial Mission Signal Bar */}
      <div className="bg-[#0f131a] text-white py-2 px-6 text-center text-xs font-medium relative z-[60] border-b border-gray-800">
        <span className="text-cyan-300 font-bold mr-1">Phase 1 Commercial Wedge:</span>
        AI Closeout & Invoice-Support Service active — 10 Jobs @ $750 Pilot. 0% AP invoice rejections.
        <button 
          onClick={() => onSelectTab('closeout')}
          className="underline ml-2 hover:text-cyan-300 font-bold font-mono"
        >
          Open Closeout Desk →
        </button>
      </div>

      <nav className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-morphism py-2 shadow-md border-b border-gray-100' : 'bg-white/90 backdrop-blur-md py-3.5 border-b border-gray-100'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onSelectTab('overview')}
              className="flex items-center gap-2 text-left"
            >
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md border border-slate-700">
                <div className="w-4 h-4 border-2 border-cyan-400 rounded-sm rotate-45"></div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[#1a1a1a]">ark forge</span>
                <span className="text-[10px] block font-mono text-cyan-700 uppercase tracking-widest -mt-1 font-bold">Industrial Outcomes</span>
              </div>
            </button>
            
            {/* Primary Strategic Nav Pills */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold">
              <button
                onClick={() => onSelectTab('overview')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  currentTab === 'overview'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => onSelectTab('closeout')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'closeout'
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                    : 'text-blue-900 hover:text-blue-950 bg-blue-50 hover:bg-blue-100 border border-blue-200'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5 text-cyan-500" />
                Phase 1: Closeout
              </button>

              <button
                onClick={() => onSelectTab('exceptions')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'exceptions'
                    ? 'bg-purple-700 text-white shadow-sm ring-2 ring-purple-300'
                    : 'text-purple-900 hover:text-purple-950 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-purple-600" />
                Phase 2: Exceptions
              </button>

              <button
                onClick={() => onSelectTab('diamond')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'diamond'
                    ? 'bg-cyan-700 text-white shadow-sm ring-2 ring-cyan-200'
                    : 'text-cyan-900 hover:text-cyan-950 bg-cyan-50/80 hover:bg-cyan-100 border border-cyan-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                Doneproof Oracle
              </button>

              <button
                onClick={() => onSelectTab('connectors')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'connectors'
                    ? 'bg-cyan-800 text-white shadow-sm ring-2 ring-cyan-300'
                    : 'text-slate-700 hover:text-cyan-700 hover:bg-cyan-50/60'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-500" />
                MCP Hub (5 Repos)
              </button>

              <button
                onClick={() => onSelectTab('conversion')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'conversion'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                1. Studio
              </button>

              <button
                onClick={() => onSelectTab('labor')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'labor'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                2. Ark Labor
              </button>

              <button
                onClick={() => onSelectTab('agentready')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'agentready'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                3. Governance
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('closeout')}
              className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow"
            >
              <FileCheck className="w-3.5 h-3.5 text-cyan-200" />
              Run Closeout Audit
            </button>
            <button
              onClick={() => onSelectTab('conversion')}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-300" />
              Launch Studio
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
