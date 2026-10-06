import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  FileCheck, 
  Wrench, 
  Target, 
  ChevronDown, 
  Zap, 
  Menu, 
  X, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'overview' | 'closeout' | 'exceptions' | 'outreach' | 'diamond' | 'connectors' | 'conversion' | 'labor' | 'agentready';
  onSelectTab: (tab: 'overview' | 'closeout' | 'exceptions' | 'outreach' | 'diamond' | 'connectors' | 'conversion' | 'labor' | 'agentready') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ecosystemTabs = ['outreach', 'labor', 'conversion', 'agentready'] as const;
  const isEcosystemActive = ecosystemTabs.includes(currentTab as any);

  const getEcosystemLabel = () => {
    switch (currentTab) {
      case 'outreach': return 'Field Outreach';
      case 'labor': return 'Ark Labor Cloud';
      case 'conversion': return 'Conversion Studio';
      case 'agentready': return 'Governance Suite';
      default: return 'More Engines';
    }
  };

  return (
    <>
      {/* Top Industrial Mission Signal Bar */}
      <div className="bg-[#0b0f17] text-slate-300 py-1.5 px-6 text-xs font-medium relative z-[60] border-b border-slate-800/80">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-white font-semibold">Enterprise Agent Infrastructure:</span>
            <span className="text-slate-400 hidden sm:inline">Automated Closeout, Evidence Verification & Self-Healing Pipelines</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono shrink-0">
            <span className="text-slate-400 hidden md:inline">Model: <strong className="text-cyan-300">Gemini 3.8 Flash</strong></span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <button 
              onClick={() => onSelectTab('closeout')}
              className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
            >
              Closeout Desk →
            </button>
          </div>
        </div>
      </div>

      {/* Global Navbar */}
      <nav className={`fixed top-7 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-2.5' 
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                onSelectTab('overview');
                setIsDropdownOpen(false);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow border border-slate-700 transition-transform group-hover:scale-105">
                <div className="w-3.5 h-3.5 border-2 border-cyan-400 rounded-sm rotate-45"></div>
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-slate-950">ark forge</span>
                <span className="text-[9px] block font-mono text-cyan-800 uppercase tracking-widest -mt-1 font-bold">Industrial Outcomes</span>
              </div>
            </button>

            {/* Desktop Navigation Menu: Clean, Minimal, Non-Duplicated */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 text-xs">
              <button
                onClick={() => {
                  onSelectTab('overview');
                  setIsDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  currentTab === 'overview'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => {
                  onSelectTab('closeout');
                  setIsDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  currentTab === 'closeout'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5 text-cyan-600" />
                Closeout Desk
              </button>

              <button
                onClick={() => {
                  onSelectTab('exceptions');
                  setIsDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  currentTab === 'exceptions'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-purple-600" />
                Exception Desk
              </button>

              <button
                onClick={() => {
                  onSelectTab('diamond');
                  setIsDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  currentTab === 'diamond'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                Doneproof Oracle
              </button>

              <button
                onClick={() => {
                  onSelectTab('connectors');
                  setIsDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  currentTab === 'connectors'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-600" />
                MCP & Railway Hub
              </button>

              {/* Ecosystem Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    isEcosystemActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{getEcosystemLabel()}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider border-b border-slate-100">
                      Specialized Engines & Tools
                    </div>

                    <button
                      onClick={() => {
                        onSelectTab('outreach');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 text-left flex items-start gap-3 hover:bg-slate-50 transition-colors ${
                        currentTab === 'outreach' ? 'bg-cyan-50/60 font-bold' : ''
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Target className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Field Outreach</div>
                        <div className="text-[11px] text-slate-500">48-Hour Contractor Validation Wave</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectTab('labor');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 text-left flex items-start gap-3 hover:bg-slate-50 transition-colors ${
                        currentTab === 'labor' ? 'bg-cyan-50/60 font-bold' : ''
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Ark Labor Cloud</div>
                        <div className="text-[11px] text-slate-500">Autonomous Workforce Runtime</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectTab('conversion');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 text-left flex items-start gap-3 hover:bg-slate-50 transition-colors ${
                        currentTab === 'conversion' ? 'bg-cyan-50/60 font-bold' : ''
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Conversion Studio</div>
                        <div className="text-[11px] text-slate-500">AgentReady Conversion & Pricing</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectTab('agentready');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 text-left flex items-start gap-3 hover:bg-slate-50 transition-colors ${
                        currentTab === 'agentready' ? 'bg-cyan-50/60 font-bold' : ''
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Governance Suite</div>
                        <div className="text-[11px] text-slate-500">6-Stage Synthetic Agent Audit</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-mono text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Railway Ready</span>
            </div>

            <button
              onClick={() => {
                onSelectTab('closeout');
                setIsDropdownOpen(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm shadow-blue-500/20 transition-all font-mono"
            >
              <FileCheck className="w-3.5 h-3.5 text-cyan-200" />
              <span>Run Closeout Audit</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 animate-fadeIn shadow-lg">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold px-2 pt-1">Core Desks</div>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
              <button
                onClick={() => { onSelectTab('overview'); setIsMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left ${currentTab === 'overview' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'}`}
              >
                Overview
              </button>
              <button
                onClick={() => { onSelectTab('closeout'); setIsMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left flex items-center gap-1.5 ${currentTab === 'closeout' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-900'}`}
              >
                <FileCheck className="w-3.5 h-3.5" /> Closeout Desk
              </button>
              <button
                onClick={() => { onSelectTab('exceptions'); setIsMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left flex items-center gap-1.5 ${currentTab === 'exceptions' ? 'bg-purple-700 text-white' : 'bg-purple-50 text-purple-900'}`}
              >
                <Wrench className="w-3.5 h-3.5" /> Exception Desk
              </button>
              <button
                onClick={() => { onSelectTab('diamond'); setIsMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left flex items-center gap-1.5 ${currentTab === 'diamond' ? 'bg-cyan-700 text-white' : 'bg-cyan-50 text-cyan-900'}`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Doneproof Oracle
              </button>
              <button
                onClick={() => { onSelectTab('connectors'); setIsMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left flex items-center gap-1.5 ${currentTab === 'connectors' ? 'bg-cyan-800 text-white' : 'bg-slate-50 text-slate-700'}`}
              >
                <Terminal className="w-3.5 h-3.5" /> MCP Hub
              </button>
              <button
                onClick={() => { onSelectTab('outreach'); setIsMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left flex items-center gap-1.5 ${currentTab === 'outreach' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-900'}`}
              >
                <Target className="w-3.5 h-3.5" /> Field Outreach
              </button>
            </div>

            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold px-2 pt-2">Specialist Engines</div>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
              <button
                onClick={() => { onSelectTab('labor'); setIsMobileMenuOpen(false); }}
                className={`p-2 rounded-xl text-center ${currentTab === 'labor' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'}`}
              >
                Ark Labor
              </button>
              <button
                onClick={() => { onSelectTab('conversion'); setIsMobileMenuOpen(false); }}
                className={`p-2 rounded-xl text-center ${currentTab === 'conversion' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-700'}`}
              >
                Studio
              </button>
              <button
                onClick={() => { onSelectTab('agentready'); setIsMobileMenuOpen(false); }}
                className={`p-2 rounded-xl text-center ${currentTab === 'agentready' ? 'bg-emerald-700 text-white' : 'bg-slate-50 text-slate-700'}`}
              >
                Governance
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
