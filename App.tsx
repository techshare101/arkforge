import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AssistantDemo from './components/AssistantDemo';
import ConversionStudio from './components/ConversionStudio';
import LaborCloud from './components/LaborCloud';
import AgentReadyAudit from './components/AgentReadyAudit';
import DoneproofDiamond from './components/DoneproofDiamond';
import CloseoutWorkspace from './components/CloseoutWorkspace';
import ConnectorHub from './components/ConnectorHub';
import { 
  ArrowRight, 
  Bot, 
  BrainCircuit, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  ExternalLink, 
  FileCheck, 
  Fingerprint, 
  Layers, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  TrendingUp, 
  Workflow, 
  Zap 
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'closeout' | 'diamond' | 'connectors' | 'conversion' | 'labor' | 'agentready'>('overview');
  const [demoRoleTab, setDemoRoleTab] = useState('Engineering');

  const demoRoles = [
    { id: 'Engineering', label: 'Engineering & Schemas', desc: 'Debug tools & MCP' },
    { id: 'Support', label: 'Incident Operations', desc: 'Resolve exceptions' },
    { id: 'Sales', label: 'Mission Outreach', desc: 'Enterprise accounts' },
    { id: 'Operations', label: 'Field Outcome Acceptance', desc: 'Verify work orders' },
    { id: 'IT', label: 'Industrial Governance', desc: 'AgentReady compliance' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] flex flex-col font-sans selection:bg-cyan-200 selection:text-black">
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
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Platform Overview
            </button>

            <button
              onClick={() => setActiveTab('closeout')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'closeout'
                  ? 'bg-blue-600 text-white shadow ring-2 ring-blue-300'
                  : 'text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5 text-cyan-500" />
              Phase 1: Closeout Desk
            </button>

            <button
              onClick={() => setActiveTab('diamond')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'diamond'
                  ? 'bg-cyan-700 text-white shadow ring-2 ring-cyan-200'
                  : 'text-cyan-900 bg-cyan-50/70 hover:bg-cyan-100 border border-cyan-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
              Doneproof Oracle
            </button>

            <button
              onClick={() => setActiveTab('connectors')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'connectors'
                  ? 'bg-cyan-800 text-white shadow ring-2 ring-cyan-300'
                  : 'text-slate-700 hover:text-cyan-700 hover:bg-cyan-50/60'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-500" />
              MCP Hub (5 Repos)
            </button>

            <button
              onClick={() => setActiveTab('conversion')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'conversion'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              1 · Conversion Studio
            </button>

            <button
              onClick={() => setActiveTab('labor')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'labor'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              2 · Ark Labor Cloud
            </button>

            <button
              onClick={() => setActiveTab('agentready')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'agentready'
                  ? 'bg-emerald-700 text-white shadow'
                  : 'text-gray-700 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              3 · AgentReady Governance
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-500 pr-2">
            <span className="text-cyan-700 font-bold">ProofAI Verified Protocol</span>
            <span>•</span>
            <span>Runtime: <strong>Gemini 3.8 Flash</strong></span>
          </div>
        </div>

        {/* View: Phase 1 Closeout Workspace */}
        {activeTab === 'closeout' && <CloseoutWorkspace />}

        {/* View: Outcome Verification (Doneproof) */}
        {activeTab === 'diamond' && <DoneproofDiamond />}

        {/* View: TrueForge MCP & API Connector Hub */}
        {activeTab === 'connectors' && <ConnectorHub />}

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
                  <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-300 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                    Industrial Agent Infrastructure · Task Execution to Verifiable Settlement
                  </div>

                  <h1 className="text-6xl sm:text-7xl font-bold leading-[1.02] text-[#1a1a1a] tracking-tight">
                    Discovery gets work. <br />
                    Execution runs it. <br />
                    <span className="text-cyan-700 underline decoration-cyan-400 decoration-4">Evidence proves it.</span>
                  </h1>

                  <p className="text-lg text-gray-600 max-w-xl leading-relaxed font-medium">
                    The enterprise layer between an agent's execution and institutional trust:
                    <strong> verifying physical & digital completion before financial settlement release.</strong>
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab('closeout')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                      <FileCheck className="w-4 h-4 text-cyan-200" />
                      Phase 1: Closeout Desk ($750 Pilot)
                    </button>
                    <button
                      onClick={() => setActiveTab('diamond')}
                      className="bg-slate-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 border border-slate-700"
                    >
                      <ShieldCheck className="w-4 h-4 text-cyan-300" />
                      Outcome Verification (Doneproof)
                    </button>
                    <button
                      onClick={() => setActiveTab('conversion')}
                      className="bg-white border border-gray-300 text-gray-800 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-cyan-500" />
                      Conversion Studio
                    </button>
                  </div>

                  {/* 4 Pillars Summary Preview Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-200">
                    <div 
                      onClick={() => setActiveTab('diamond')}
                      className="p-3 bg-cyan-50/70 rounded-xl border border-cyan-200 hover:border-cyan-500 cursor-pointer transition-all"
                    >
                      <div className="text-[10px] uppercase font-bold text-cyan-800">OUTCOME VERIFICATION</div>
                      <div className="font-bold text-xs text-gray-900 mt-0.5">Doneproof Protocol</div>
                      <div className="text-[11px] text-gray-500 mt-1">Proof of completion & settlement</div>
                    </div>

                    <div 
                      onClick={() => setActiveTab('conversion')}
                      className="p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-500 cursor-pointer transition-all"
                    >
                      <div className="text-[10px] uppercase font-bold text-blue-700">01. CONVERSION PROTOCOL</div>
                      <div className="font-bold text-xs text-gray-900 mt-0.5">Conversion Studio</div>
                      <div className="text-[11px] text-gray-500 mt-1">SaaS ➔ Agent-Native specs</div>
                    </div>

                    <div 
                      onClick={() => setActiveTab('labor')}
                      className="p-3 bg-white rounded-xl border border-gray-200 hover:border-slate-800 cursor-pointer transition-all"
                    >
                      <div className="text-[10px] uppercase font-bold text-slate-700">02. WORKFORCE RUNTIME</div>
                      <div className="font-bold text-xs text-gray-900 mt-0.5">Ark Labor Cloud</div>
                      <div className="text-[11px] text-gray-500 mt-1">Persistent specialist execution</div>
                    </div>

                    <div 
                      onClick={() => setActiveTab('agentready')}
                      className="p-3 bg-white rounded-xl border border-gray-200 hover:border-emerald-600 cursor-pointer transition-all"
                    >
                      <div className="text-[10px] uppercase font-bold text-emerald-700">03. GOVERNANCE & TELEMETRY</div>
                      <div className="font-bold text-xs text-gray-900 mt-0.5">AgentReady Suite</div>
                      <div className="text-[11px] text-gray-500 mt-1">Agent discovery & compliance</div>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Hero Canvas */}
                <div className="lg:col-span-6 relative">
                  <div className="bg-white/90 backdrop-blur-md rounded-[32px] p-6 border border-gray-200 shadow-xl relative z-10 space-y-4">
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

            {/* Industrial Outcome Architecture Section */}
            <section className="bg-gradient-to-br from-slate-900 via-[#101924] to-slate-950 rounded-3xl p-8 md:p-12 text-white border border-gray-800 relative overflow-hidden space-y-8">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold bg-cyan-950/70 border border-cyan-800 px-3 py-1 rounded-full">
                  Autonomous Outcome Acceptance Protocol
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Doneproof: <span className="text-cyan-300">The Layer Between Field Action & Payment</span>
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  The verified custody chain: <strong>Incident Trigger ➔ Field Execution ➔ Multimodal Evidence ➔ Acceptance Verification ➔ Financial Settlement Release</strong>.
                  Eliminates payment rejections and vendor disputes by accumulating client-specific acceptance rules into immutable, reviewable certificates.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-gray-800">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <div className="text-xs uppercase font-bold text-cyan-300">Core Infrastructure</div>
                  <h4 className="font-bold text-base text-white">Outcome Acceptance Engine</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Evaluates work orders, before/after photos, torque/pressure telemetry, and digital sign-offs against customer PO criteria.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <div className="text-xs uppercase font-bold text-blue-400">Deployment Wedge</div>
                  <h4 className="font-bold text-base text-white">Closeout & Invoice-Support Service</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Assembles complete compliance packets for contractors and property managers, flagging missing evidence prior to billing submission.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
                  <div className="text-xs uppercase font-bold text-emerald-400">Enterprise Continuity</div>
                  <h4 className="font-bold text-base text-white">Exception Desk & Remediation</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Continuous pipeline observability that diagnoses and remediates real-world discrepancies across ERP, POs, and accounting.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('diamond')}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-3 rounded-xl text-xs transition-all inline-flex items-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  Inspect Outcome Acceptance Engine ➔
                </button>
              </div>
            </section>

            {/* The Connective Tissue Across Ventures */}
            <section className="bg-white rounded-3xl p-10 md:p-14 border border-gray-200 shadow-xl space-y-8">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-700 font-bold">
                  Enterprise Integration Architecture
                </div>
                <h3 className="text-3xl font-bold text-gray-900">How MetalMindTech Capabilities Converge</h3>
                <p className="text-xs text-gray-500">
                  Every capability serves as an authoritative layer in the industrial autonomous lifecycle:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center space-y-2">
                  <div className="text-blue-700 font-black text-lg">ProofAI</div>
                  <div className="text-xs font-bold text-gray-900">Evidence Protocol</div>
                  <div className="text-[11px] text-gray-600">Preserves immutable cryptographic Merkle evidence of physical & digital actions.</div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center space-y-2">
                  <div className="text-slate-800 font-black text-lg">Ark Labor Cloud</div>
                  <div className="text-xs font-bold text-gray-900">Workforce Runtime</div>
                  <div className="text-[11px] text-gray-600">Dispatches, coordinates, and executes persistent autonomous domain workers.</div>
                </div>

                <div className="bg-cyan-50 border-2 border-cyan-500 rounded-2xl p-5 text-center space-y-2 shadow-sm">
                  <div className="text-cyan-900 font-black text-lg flex items-center justify-center gap-1">
                    <FileCheck className="w-4 h-4 text-cyan-600" /> Doneproof
                  </div>
                  <div className="text-xs font-bold text-cyan-950">Outcome Acceptance</div>
                  <div className="text-[11px] text-cyan-900 font-medium">Verifies job completion and authorizes financial settlement release.</div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center space-y-2">
                  <div className="text-emerald-700 font-black text-lg">AgentReady</div>
                  <div className="text-xs font-bold text-gray-900">Governance & Discovery</div>
                  <div className="text-[11px] text-gray-600">Audits agent discovery, machine-readability, and transaction reliability.</div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center space-y-2">
                  <div className="text-amber-700 font-black text-lg">Venture Factory</div>
                  <div className="text-xs font-bold text-gray-900">Commercial Validation</div>
                  <div className="text-[11px] text-gray-600">Validates target workflows, buyer ROI, and recurring SLAs before scale.</div>
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
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
              <div className="w-3 h-3 border border-cyan-400 rotate-45"></div>
            </div>
            <span className="font-bold text-gray-900 text-sm">Ark Forge · MetalMindTech</span>
            <span>© 2026. Industrial Agent Infrastructure.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('diamond')} className="hover:text-cyan-700 font-bold">Outcome Acceptance</button>
            <button onClick={() => setActiveTab('conversion')} className="hover:text-blue-700">Conversion Studio</button>
            <button onClick={() => setActiveTab('labor')} className="hover:text-slate-900">Ark Labor Cloud</button>
            <button onClick={() => setActiveTab('agentready')} className="hover:text-emerald-700">AgentReady Governance</button>
            <span className="text-gray-400">v2.6 Industrial Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
