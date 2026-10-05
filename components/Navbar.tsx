import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, Cpu, ShieldCheck, Play, Layers, Gem } from 'lucide-react';

interface NavbarProps {
  currentTab: 'overview' | 'conversion' | 'labor' | 'agentready' | 'diamond';
  onSelectTab: (tab: 'overview' | 'conversion' | 'labor' | 'agentready' | 'diamond') => void;
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
      {/* Top Value Signal Bar */}
      <div className="bg-[#1a1a1a] text-white py-2 px-6 text-center text-xs font-medium relative z-[60] border-b border-gray-800">
        <span className="text-[#D8FD49] font-bold mr-1">MetalMindTech Thesis:</span>
        "The durable business sits between an agent's action and a customer's trust: discovery gets the work, execution does it, and evidence proves the result."
        <button 
          onClick={() => onSelectTab('diamond')}
          className="underline ml-2 hover:text-cyan-300 font-bold"
        >
          Inspect The Diamond (Doneproof) →
        </button>
      </div>

      <nav className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-morphism py-2 shadow-md border-b border-gray-100' : 'bg-white/80 backdrop-blur-md py-3.5 border-b border-gray-100'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onSelectTab('overview')}
              className="flex items-center gap-2 text-left"
            >
              <div className="w-8 h-8 bg-[#343CED] rounded-lg flex items-center justify-center shadow-md">
                <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[#1a1a1a]">ark forge</span>
                <span className="text-[10px] block font-mono text-gray-500 uppercase tracking-widest -mt-1 font-bold">MetalMindTech</span>
              </div>
            </button>
            
            {/* Primary Strategic Nav Pills */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold">
              <button
                onClick={() => onSelectTab('overview')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  currentTab === 'overview'
                    ? 'bg-gray-100 text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Platform Overview
              </button>

              <button
                onClick={() => onSelectTab('diamond')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'diamond'
                    ? 'bg-cyan-600 text-white shadow-sm ring-2 ring-cyan-200'
                    : 'text-cyan-800 hover:text-cyan-900 bg-cyan-50/70 hover:bg-cyan-100/70 border border-cyan-200'
                }`}
              >
                <Gem className="w-3.5 h-3.5 text-cyan-400" />
                💎 The Diamond (Doneproof)
              </button>

              <button
                onClick={() => onSelectTab('conversion')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'conversion'
                    ? 'bg-[#343CED] text-white shadow-sm'
                    : 'text-gray-600 hover:text-[#343CED] hover:bg-blue-50/50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#D8FD49]"></span>
                1. Conversion Studio
              </button>

              <button
                onClick={() => onSelectTab('labor')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'labor'
                    ? 'bg-[#1a1a1a] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-[#343CED]" />
                2. Ark Labor Cloud
              </button>

              <button
                onClick={() => onSelectTab('agentready')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'agentready'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                3. AgentReady Suite
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('diamond')}
              className="hidden sm:flex items-center gap-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-900 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-cyan-300"
            >
              <Gem className="w-3.5 h-3.5 text-cyan-600" />
              Doneproof Verification
            </button>
            <button
              onClick={() => onSelectTab('conversion')}
              className="bg-[#343CED] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#2b32c7] transition-all shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D8FD49]" />
              Launch Studio
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
