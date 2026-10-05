import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AssistantDemo from './components/AssistantDemo';
import ConversionStudio from './components/ConversionStudio';
import LaborCloud from './components/LaborCloud';
import AgentReadyAudit from './components/AgentReadyAudit';
import DoneproofDiamond from './components/DoneproofDiamond';
import { 
  ArrowRight, 
  Bot, 
  BrainCircuit, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  ExternalLink, 
  Fingerprint, 
  Gem, 
  Layers, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Workflow, 
  Zap 
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'conversion' | 'labor' | 'agentready' | 'diamond'>('overview');
  const [demoRoleTab, setDemoRoleTab] = useState('Engineering');

  const demoRoles = [
    { id: 'Engineering', label: 'Engineering', desc: 'Debug code & schemas' },
    { id: 'Support', label: 'Customer Support', desc: 'Resolve incidents' },
    { id: 'Sales', label: 'Sales & Outreach', desc: 'Review high-value accounts' },
    { id: 'Operations', label: 'Property Ops & Doneproof', desc: 'Verify work orders' },
    { id: 'IT', label: 'AgentOps / IT', desc: 'AgentReady compliance' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#D8FD49] selection:text-black">
      {/* Navbar with Pillar Switcher */}
      <Navbar currentTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 max-w-[1400px] mx-auto w-full">
        {/* Navigation Selector Bar */}
        <div className="mb-8 flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-2 shadow-sm flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-gray-900 text-white shadow'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Platform Overview
            </button>

            <button
              onClick={() => setActiveTab('diamond')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'diamond'
                  ? 'bg-cyan-600 text-white shadow ring-2 ring-cyan-200'
                  : 'text-cyan-900 bg-cyan-50/60 hover:bg-cyan-100/70 border border-cyan-200'
              }`}
            >
              <Gem className="w-3.5 h-3.5 text-cyan-400" />
              💎 The Diamond: Doneproof
            </button>

            <button
              onClick={() => setActiveTab('conversion')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'conversion'
                  ? 'bg-[#343CED] text-white shadow'
                  : 'text-gray-700 hover:text-[#343CED] hover:bg-blue-50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#D8FD49]" />
              1 · Agent-Native Conversion Studio
            </button>

            <button
              onClick={() => setActiveTab('labor')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'labor'
                  ? 'bg-[#1a1a1a] text-white shadow'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#343CED]" />
              2 · Ark Labor Cloud
            </button>

            <button
              onClick={() => setActiveTab('agentready')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'agentready'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-gray-700 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              3 · AgentReady Certification & Monitoring
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-500 pr-2">
            <span className="text-cyan-600 font-bold">ProofAI Verified</span>
            <span>•</span>
            <span>Runtime: <strong>Gemini 3.8 Flash</strong></span>
          </div>
        </div>

        {/* View: The Diamond (Doneproof) */}
        {activeTab === 'diamond' && <DoneproofDiamond />}

        {/* View 1: Conversion Studio */}
        {activeTab === 'conversion' && <ConversionStudio />}

        {/* View 2: Ark Labor Cloud */}
        {activeTab === 'labor' && <LaborCloud />}

        {/* View 3: AgentReady Suite */}
        {activeTab === 'agentready' && <AgentReadyAudit />}

        {/* View 0: Platform Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-24">
            {/* Hero Section */}
            <section className="pt-8 pb-12">
              <div className="grid lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-6 space-y-8">
                  <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-800">
                    <Gem className="w-3.5 h-3.5 text-cyan-600" />
                    The Diamond: Proof That an Agent or Worker Finished the Job
                  </div>

                  <h1 className="text-6xl sm:text-7xl font-bold leading-[1.02] text-[#1a1a1a] tracking-tight">
                    Discovery gets work. <br />
                    Execution does it. <br />
                    <span className="text-cyan-600 underline decoration-cyan-300 decoration-4">Evidence proves it.</span>
                  </h1>

                  <p className="text-lg text-gray-600 max-w-xl leading-relaxed font-medium">
                    "The durable business sits between an agent's action and a customer's trust:
                    <strong> businesses need proof between ‘the agent says it did it’ and ‘the customer accepts the result.’</strong>"
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab('diamond')}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                    >
                      <Gem className="w-4 h-4 text-cyan-200" />
                      Inspect The Diamond (Doneproof)
                    </button>
                    <button
                      onClick={() => setActiveTab('conversion')}
                      className="bg-[#343CED] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-[#D8FD49]" />
                      Conversion Studio
                    </button>
                    <button
                      onClick={() => setActiveTab('agentready')}
                      className="bg-white border border-gray-300 text-gray-800 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#343CED]" />
                      AgentReady Audit
                    </button>
                  </div>

                  {/* 4 Pillars Summary Preview Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-200">
                    <div 
                      onClick={() => setActiveTab('diamond')}
                      className="p-3 bg-cyan-50/50 rounded-xl border border-cyan-200 hover:border-cyan-500 cursor-pointer transition-all"
                    >
                      <div className="text-[10px] uppercase font-bold text-cyan-700">💎 THE DIAMOND</div>
                      <div className="font-bold text-xs text-gray-900 mt-0.5">Doneproof</div>
                      <div className="text-[11px] text-gray-500 mt-1">Proof of completion</div>
                    </div>

                    <div 
                      onClick={() => setActiveTab('conversion')}
                      className="p-3 bg-white rounded-xl border border-gray-200 hover:border-[#343CED] cursor-pointer transition-all"
                    >
                      <div className="text-[10px] uppercase font-bold text-[#343CED]">01. REVENUE GEM</div>
                      <div className="font-bold text-xs text-gray-900 mt-0.5">Conversion Studio</div>
                      <div className="text-[11px] text-gray-500 mt-1">SaaS ➔ ChatGPT tools</div>
                    </div>

                    <div 
                      onClick={() => setActiveTab('labor')}
                      className="p-3 bg-white rounded-xl border border-gray-200 hover:border-gray-900 cursor-pointer transition-all"
                    >
                      <div className="text-[10px] uppercase font-bold text-purple-600">02. STRATEGIC GEM</div>
                      <div className="font-bold text-xs text-gray-900 mt-0.5">Ark Labor Cloud</div>
                      <div className="text-[11px] text-gray-500 mt-1">Runtime behind ChatGPT</div>
                    </div>

                    <div 
                      onClick={() => setActiveTab('agentready')}
                      className="p-3 bg-white rounded-xl border border-gray-200 hover:border-emerald-600 cursor-pointer transition-all"
                    >
                      <div className="text-[10px] uppercase font-bold text-emerald-600">03. MONEY-NOW</div>
                      <div className="font-bold text-xs text-gray-900 mt-0.5">AgentReady Suite</div>
                      <div className="text-[11px] text-gray-500 mt-1">Agent discovery audit</div>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Hero Canvas */}
                <div className="lg:col-span-6 relative">
                  <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 border border-gray-200 shadow-xl relative z-10 space-y-4">
                    <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
                      {demoRoles.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setDemoRoleTab(tab.id)}
                          className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                            demoRoleTab === tab.id
                              ? 'bg-white shadow-sm text-gray-900'
                              : 'text-gray-500 hover:text-gray-800'
                          }`}
                        >
                          <div className="whitespace-nowrap">{tab.label}</div>
                        </button>
                      ))}
                    </div>
                    <AssistantDemo />
                  </div>
                </div>
              </div>
            </section>

            {/* The Diamond Spotlight: Doneproof Work-Order Verification */}
            <section className="bg-gradient-to-br from-gray-900 via-[#101924] to-gray-950 rounded-3xl p-8 md:p-12 text-white border border-gray-800 relative overflow-hidden space-y-8">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold bg-cyan-950/70 border border-cyan-800 px-3 py-1 rounded-full">
                  💎 The Diamond Opportunity
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Proof That an Agent Finished the Job: <span className="text-cyan-300">Doneproof</span>
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  The physical & digital chain of custody: <strong>trigger ➔ work ➔ evidence ➔ verification ➔ settlement</strong>.
                  Before closing a maintenance ticket or paying a vendor invoice, property managers inspect timestamped before/after photos, barcode serials, and sensor checklists into a tamper-proof shareable record.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-gray-800">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <div className="text-xs uppercase font-bold text-cyan-300">The Problem</div>
                  <h4 className="font-bold text-base text-white">Unresolved Maintenance Friction</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Property managers lose days arguing over disputed contractor invoices and whether boiler repairs or turnovers were properly finished.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <div className="text-xs uppercase font-bold text-[#D8FD49]">The Solution</div>
                  <h4 className="font-bold text-base text-white">Doneproof Verification Link</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    A single shareable certificate URL containing cryptographically signed before/after photos, GPS geofencing, and ProofAI Merkle roots.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <div className="text-xs uppercase font-bold text-emerald-400">The Money Path</div>
                  <h4 className="font-bold text-base text-white">$1,500 Pilot ➔ $499/mo</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Target 5 Twin Cities property management companies; offer a 30-day work-order evidence pilot converting into monthly recurring workflow fees.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('diamond')}
                  className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold px-8 py-3 rounded-xl text-xs transition-all inline-flex items-center gap-2"
                >
                  <Gem className="w-4 h-4" />
                  Test Live Doneproof Work-Order Engine ➔
                </button>
              </div>
            </section>

            {/* The Connective Tissue Across Ventures */}
            <section className="bg-white rounded-3xl p-10 md:p-14 border border-gray-200 shadow-xl space-y-8">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <div className="text-xs font-mono uppercase tracking-widest text-[#343CED] font-bold">
                  Connective Tissue Across Ventures
                </div>
                <h3 className="text-3xl font-bold text-gray-900">How MetalMindTech Ventures Unify</h3>
                <p className="text-xs text-gray-500">
                  Instead of disconnected AI tools, every product operates as a critical handoff in the agent lifecycle:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center space-y-2">
                  <div className="text-[#343CED] font-black text-lg">ProofAI</div>
                  <div className="text-xs font-bold text-gray-900">Evidence Layer</div>
                  <div className="text-[11px] text-gray-600">Captures and preserves immutable cryptographic evidence of what happened.</div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center space-y-2">
                  <div className="text-purple-600 font-black text-lg">Ark Labor Cloud</div>
                  <div className="text-xs font-bold text-gray-900">Workforce Runtime</div>
                  <div className="text-[11px] text-gray-600">Assigns, executes, and orchestrates persistent specialist workers.</div>
                </div>

                <div className="bg-cyan-50 border-2 border-cyan-400 rounded-2xl p-5 text-center space-y-2 shadow-sm">
                  <div className="text-cyan-800 font-black text-lg flex items-center justify-center gap-1">
                    <Gem className="w-4 h-4 text-cyan-600" /> Doneproof
                  </div>
                  <div className="text-xs font-bold text-cyan-900">The Diamond</div>
                  <div className="text-[11px] text-cyan-950 font-medium">The completion record and physical/digital verification step.</div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center space-y-2">
                  <div className="text-emerald-600 font-black text-lg">AgentReady</div>
                  <div className="text-xs font-bold text-gray-900">Discovery & Audit</div>
                  <div className="text-[11px] text-gray-600">Tests which agent gets chosen & resolves booking friction.</div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center space-y-2">
                  <div className="text-amber-600 font-black text-lg">Venture Factory</div>
                  <div className="text-xs font-bold text-gray-900">Market Validation</div>
                  <div className="text-[11px] text-gray-600">Tests workflows, buyers, and pricing before scaling products.</div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6 text-xs text-gray-500">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#343CED] rounded flex items-center justify-center">
              <div className="w-3 h-3 border border-white rotate-45"></div>
            </div>
            <span className="font-bold text-gray-900 text-sm">Ark Forge · MetalMindTech</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('diamond')} className="hover:text-cyan-600 font-bold">💎 Doneproof</button>
            <button onClick={() => setActiveTab('conversion')} className="hover:text-[#343CED]">Conversion Studio</button>
            <button onClick={() => setActiveTab('labor')} className="hover:text-[#343CED]">Ark Labor Cloud</button>
            <button onClick={() => setActiveTab('agentready')} className="hover:text-[#343CED]">AgentReady Monitor</button>
            <span className="text-gray-400">v2.5 Diamond Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
