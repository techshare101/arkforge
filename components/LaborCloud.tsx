import React, { useState } from 'react';
import { 
  Bot, 
  BrainCircuit, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Cpu, 
  Database, 
  ExternalLink, 
  Fingerprint, 
  Layers, 
  Play, 
  RefreshCw, 
  Search, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  UserCheck, 
  Users 
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ArkWorker, LaborMission } from '../types';

const INITIAL_WORKERS: ArkWorker[] = [
  {
    id: 'worker-doneproof',
    name: 'Doneproof Verification Worker',
    codeName: 'DONEPROOF-ORACLE-v2',
    avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&auto=format&fit=crop&q=80',
    role: 'Work-Order Proof & Physical Outcome Verification',
    department: 'Trust & Governance',
    status: 'executing',
    specialization: 'The Diamond Agent: inspects before/after photos, checks EXIF timestamps, verifies GPS boundaries, confirms sensor checklists, and authorizes payment settlement.',
    hourlyCostEquivalent: 3.40,
    tokensConsumedToday: 512000,
    reliabilityRate: 99.9,
    recentMission: 'Twin Cities Property Maintenance HVAC Doneproof Verification',
    isDiamondAgent: true
  },
  {
    id: 'worker-discovery-radar',
    name: 'Agent Discovery & Selection Auditor',
    codeName: 'DISCOVERY-RADAR-v1',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&auto=format&fit=crop&q=80',
    role: 'Prompt Selection & Agent Visibility Benchmark',
    department: 'Market Intelligence',
    status: 'standby',
    specialization: 'The Money-Now Agent: tests which app/agent gets chosen for user queries, identifies missing public info & booking gaps, produces the $297 Discovery Audit.',
    hourlyCostEquivalent: 2.80,
    tokensConsumedToday: 380000,
    reliabilityRate: 99.5,
    recentMission: 'Minneapolis Local Service Agent Selection Benchmark',
    isMoneyNowAgent: true
  },
  {
    id: 'worker-susie',
    name: 'Susie Signal',
    codeName: 'SUSIE-SIGNAL-v2.4',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    role: 'Lead Intelligence & Business Auditor',
    department: 'Market Intelligence',
    status: 'executing',
    specialization: 'Deep research, digital footprint mapping, machine-readability analysis, local SEO & agent readiness audit',
    hourlyCostEquivalent: 3.20,
    tokensConsumedToday: 421000,
    reliabilityRate: 99.4,
    recentMission: 'Minneapolis Med-Spa Agent-Readiness Benchmark'
  },
  {
    id: 'worker-browser',
    name: 'Headless Browser Worker',
    codeName: 'CHROMIUM-AGENT-9',
    avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=80',
    role: 'Synthetic User Journey Execution',
    department: 'Automation Ops',
    status: 'idle',
    specialization: 'DOM inspection, booking widget traversal, form interaction, captcha detection, network request interception',
    hourlyCostEquivalent: 1.85,
    tokensConsumedToday: 680000,
    reliabilityRate: 98.9,
    recentMission: 'Automated Checkout Friction Probe'
  },
  {
    id: 'worker-proofai',
    name: 'ProofAI Verification Worker',
    codeName: 'PROOF-ORACLE-v1',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    role: 'Cryptographic Audit & Evidence Layer',
    department: 'Trust & Governance',
    status: 'standby',
    specialization: 'Deterministic proof bundling, SHA-256 state hashing, compliance sign-offs, immutable verification logs',
    hourlyCostEquivalent: 2.10,
    tokensConsumedToday: 310000,
    reliabilityRate: 100.0,
    recentMission: 'SOC2 & HIPAA Evidence Attestation'
  },
  {
    id: 'worker-comp-intel',
    name: 'Competitive Intel Worker',
    codeName: 'INTEL-VECTOR-4',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    role: 'Pricing & Product Differentiation',
    department: 'Strategic Research',
    status: 'idle',
    specialization: 'Competitor pricing scraping, feature parity matrix, market positioning extraction, customer sentiment drift',
    hourlyCostEquivalent: 2.90,
    tokensConsumedToday: 185000,
    reliabilityRate: 99.1,
    recentMission: 'Aesthetic Medical SaaS Pricing Index'
  },
  {
    id: 'worker-procure',
    name: 'Procurement & Vendor Worker',
    codeName: 'SUPPLY-CHAIN-ALPHA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    role: 'Vendor Evaluation & Risk Scoring',
    department: 'FinOps',
    status: 'idle',
    specialization: 'RFP evaluation, contract clause scanning, supplier risk scoring, automated rate negotiations',
    hourlyCostEquivalent: 3.50,
    tokensConsumedToday: 95000,
    reliabilityRate: 99.6,
    recentMission: 'B2B API Provider Security Compliance'
  },
  {
    id: 'worker-outreach',
    name: 'Lead Qualification Worker',
    codeName: 'CONV-OUTREACH-8',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    role: 'Personalized Value Outreach',
    department: 'Revenue Growth',
    status: 'standby',
    specialization: 'Cold email generation with hyper-specific failure evidence, founder LinkedIn personalization, meeting booking',
    hourlyCostEquivalent: 2.40,
    tokensConsumedToday: 240000,
    reliabilityRate: 98.7,
    recentMission: 'Minneapolis Med-Spa Owner Audit Outreach'
  }
];

export const LaborCloud: React.FC = () => {
  const [workers] = useState<ArkWorker[]>(INITIAL_WORKERS);
  const [selectedWorker, setSelectedWorker] = useState<ArkWorker>(INITIAL_WORKERS[0]);
  const [missionPrompt, setMissionPrompt] = useState(
    'Research the 30 best med spas in Minneapolis, inspect their agent readiness, verify your findings, prepare reports and give me the five prospects worth contacting.'
  );
  const [activeMission, setActiveMission] = useState<LaborMission | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState<string>('ALL');

  const handleLaunchMission = async () => {
    setIsRunning(true);
    try {
      const mission = await geminiService.runLaborMission(missionPrompt, selectedWorker.name);
      setActiveMission(mission);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const departments = ['ALL', 'Market Intelligence', 'Automation Ops', 'Trust & Governance', 'Strategic Research', 'FinOps', 'Revenue Growth'];

  const filteredWorkers = filterDepartment === 'ALL'
    ? workers
    : workers.filter(w => w.department === filterDepartment);

  return (
    <div className="space-y-12">
      {/* Top Strategic Gem Banner */}
      <div className="bg-[#1a1a1a] rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#343CED] rounded-full blur-[140px] opacity-25 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#D8FD49] rounded-full blur-[130px] opacity-15 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#D8FD49] border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            #1 Strategic Gem · The Agent Runtime Behind ChatGPT
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Ark Labor <span className="text-[#343CED]">Cloud</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
            Don't position Ark merely as another place where agents live. Position it as:{' '}
            <span className="text-white font-semibold underline decoration-[#D8FD49] decoration-2">
              The workforce backend that gives ChatGPT access to persistent specialist workers.
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#D8FD49] font-black text-lg">ChatGPT</span>
              <span className="text-gray-400">= The Front-End Interface</span>
            </div>
            <div className="text-gray-600">•</div>
            <div className="flex items-center gap-2">
              <span className="text-[#343CED] font-black text-lg">Ark Labor</span>
              <span className="text-gray-400">= The Autonomous Workforce Backend</span>
            </div>
            <div className="text-gray-600">•</div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-black text-lg">ProofAI</span>
              <span className="text-gray-400">= Verifiable Audit & Evidence Layer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Flow Diagram */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Enterprise Delegation Architecture</h2>
            <p className="text-xs text-gray-500">
              How ChatGPT delegates high-context, multi-hour specialist missions to Ark Labor Cloud
            </p>
          </div>
          <span className="text-xs font-mono bg-blue-50 text-[#343CED] px-3 py-1 rounded-full font-bold">
            MCP Protocol + REST Gateway
          </span>
        </div>

        {/* Visual Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-center flex flex-col justify-between hover:border-[#343CED] transition-all">
            <div className="text-xs font-mono text-gray-400 mb-1">01. INGESTION</div>
            <div className="w-10 h-10 mx-auto rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-sm mb-2">
              💬
            </div>
            <div className="font-bold text-gray-900 text-sm">ChatGPT</div>
            <div className="text-[11px] text-gray-500 mt-1">User Intent & Scoped Query</div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-center flex flex-col justify-between hover:border-[#343CED] transition-all">
            <div className="text-xs font-mono text-gray-400 mb-1">02. SECURITY</div>
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-100 text-[#343CED] flex items-center justify-center font-bold text-sm mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-bold text-gray-900 text-sm">Auth Gateway</div>
            <div className="text-[11px] text-gray-500 mt-1">Identity & Spending Limits</div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-center flex flex-col justify-between hover:border-[#343CED] transition-all">
            <div className="text-xs font-mono text-gray-400 mb-1">03. ROUTING</div>
            <div className="w-10 h-10 mx-auto rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm mb-2">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div className="font-bold text-gray-900 text-sm">Orchestrator</div>
            <div className="text-[11px] text-gray-500 mt-1">Task DAG & Sub-Mission Plan</div>
          </div>

          <div className="bg-[#1a1a1a] text-white rounded-2xl p-4 border border-gray-800 text-center flex flex-col justify-between shadow-md">
            <div className="text-xs font-mono text-[#D8FD49] mb-1">04. EXECUTION</div>
            <div className="w-10 h-10 mx-auto rounded-xl bg-[#343CED] text-white flex items-center justify-center font-bold text-sm mb-2">
              <Users className="w-5 h-5" />
            </div>
            <div className="font-bold text-white text-sm">Ark Workers</div>
            <div className="text-[11px] text-gray-300 mt-1">Susie, Browser, Research</div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-center flex flex-col justify-between hover:border-[#343CED] transition-all">
            <div className="text-xs font-mono text-gray-400 mb-1">05. AUDIT</div>
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm mb-2">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div className="font-bold text-gray-900 text-sm">ProofAI Log</div>
            <div className="text-[11px] text-gray-500 mt-1">Merkle Proof & Cryptographic Evidence</div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-center flex flex-col justify-between hover:border-[#343CED] transition-all">
            <div className="text-xs font-mono text-gray-400 mb-1">06. RETURN</div>
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="font-bold text-gray-900 text-sm">Return Stream</div>
            <div className="text-[11px] text-gray-500 mt-1">Actionable Output to User</div>
          </div>
        </div>
      </div>

      {/* The 48-Hour Demonstration Runner */}
      <div className="bg-gradient-to-br from-gray-900 to-[#12121e] rounded-3xl p-8 text-white border border-gray-800 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#D8FD49] text-gray-950 text-xs font-black uppercase tracking-wider">
                Flagship Validation Mission
              </span>
              <span className="text-xs text-gray-400 font-mono">Susie Signal Worker</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              Execute Minneapolis Med-Spa Agent-Readiness Scan
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              "Research the 30 best med spas in Minneapolis, inspect their agent readiness, verify findings, and return the 5 best prospects."
            </p>
          </div>

          <button
            onClick={handleLaunchMission}
            disabled={isRunning}
            className="bg-[#343CED] hover:bg-[#2b32c7] text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-50 shrink-0"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Dispatching Ark Autonomous Fleet...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-[#D8FD49]" />
                Dispatch Susie & Ark Fleet Now
              </>
            )}
          </button>
        </div>

        {/* Editable Prompt Input */}
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-4 flex items-center gap-3">
          <div className="text-gray-400 text-xs font-mono uppercase tracking-wider">Prompt:</div>
          <input
            type="text"
            value={missionPrompt}
            onChange={(e) => setMissionPrompt(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-200 focus:outline-none font-mono"
            placeholder="Enter mission prompt..."
          />
        </div>

        {/* Live Mission Execution View */}
        {activeMission && (
          <div className="bg-black/60 border border-gray-800 rounded-2xl p-6 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-mono text-[#D8FD49] font-bold">MISSION ID: {activeMission.id}</span>
                <div className="text-sm font-semibold text-white mt-0.5">{activeMission.title}</div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Execution Complete
                </span>
                <span className="text-gray-400 font-mono">4.89s total</span>
              </div>
            </div>

            {/* Step Timeline */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Autonomous Mission Steps & Handoffs
              </div>
              <div className="grid md:grid-cols-5 gap-3">
                {activeMission.steps.map((st) => (
                  <div key={st.stepIndex} className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#D8FD49] font-mono font-bold">Step 0{st.stepIndex}</span>
                      <span className="text-gray-400">{st.durationMs}ms</span>
                    </div>
                    <div className="text-xs font-bold text-white truncate">{st.workerName}</div>
                    <div className="text-[11px] text-gray-300 leading-snug line-clamp-3">{st.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Findings: 5 Top Prospects */}
            {activeMission.outputReport && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Top 5 High-Value Prospects with Agent Failure Evidence
                  </div>
                  <span className="text-xs text-gray-400">Ready for $297 Audit Pitch</span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeMission.outputReport.prospectsIdentified.map((prospect, idx) => (
                    <div key={idx} className="bg-gray-900/90 border border-gray-700 rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-[#343CED] transition-all">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-sm text-white">{prospect.name}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                            prospect.contactWorthiness === 'HIGH' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {prospect.contactWorthiness} PRIORITY
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-yellow-400 font-bold">★ {prospect.rating}</span>
                          <span className="text-gray-500">|</span>
                          <span className="text-red-400 font-mono font-bold">
                            Score: {prospect.agentReadyScore}/100
                          </span>
                        </div>

                        <div className="text-xs bg-red-950/40 border border-red-500/30 text-red-200 p-2.5 rounded-lg leading-tight">
                          <span className="font-bold text-red-300">Failure Point: </span>
                          {prospect.failureReason}
                        </div>

                        <div className="text-xs text-gray-300 leading-snug">
                          <span className="text-[#D8FD49] font-medium">Revenue Leakage: </span>
                          {prospect.keyInsight}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs">
                        <span className="text-gray-400 font-mono text-[11px]">Audit Pitch Ready</span>
                        <button className="bg-white/10 hover:bg-[#D8FD49] hover:text-black text-white px-3 py-1 rounded-md text-xs font-bold transition-all">
                          Send $297 Audit →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ProofAI Merkle Root */}
                <div className="bg-black/70 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-gray-400">ProofAI Merkle Root: </span>
                    <span className="text-emerald-300 font-bold truncate max-w-xs md:max-w-md">
                      {activeMission.outputReport.proofAiAuditTrail.merkleRoot}
                    </span>
                  </div>
                  <div className="text-gray-400 shrink-0">
                    Worker: <span className="text-white font-bold">{activeMission.outputReport.proofAiAuditTrail.verifiedWorkerId}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Specialist Worker Fleet Marketplace */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Ark Specialist Worker Roster</h2>
            <p className="text-sm text-gray-500">
              Persistent, verifiable domain workers callable by ChatGPT actions and autonomous workflows.
            </p>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {departments.map((dep) => (
              <button
                key={dep}
                onClick={() => setFilterDepartment(dep)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterDepartment === dep
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {dep}
              </button>
            ))}
          </div>
        </div>

        {/* Worker Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((w) => (
            <div
              key={w.id}
              onClick={() => setSelectedWorker(w)}
              className={`rounded-2xl p-6 border transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedWorker.id === w.id
                  ? 'border-[#343CED] ring-2 ring-blue-100 bg-blue-50/20 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={w.avatar} alt={w.name} className="w-12 h-12 rounded-xl object-cover border border-gray-200" />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-base">{w.name}</h3>
                        {w.isDiamondAgent && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-cyan-100 text-cyan-800 border border-cyan-300">
                            💎 THE DIAMOND
                          </span>
                        )}
                        {w.isMoneyNowAgent && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                            💰 MONEY-NOW
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-gray-400">{w.codeName}</div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    w.status === 'executing' ? 'bg-emerald-100 text-emerald-700 animate-pulse' :
                    w.status === 'idle' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {w.status}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-[#343CED] uppercase tracking-wider mb-1">
                    {w.department}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {w.specialization}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Compute Equivalent:</span>
                  <span className="font-bold text-gray-900">${w.hourlyCostEquivalent.toFixed(2)}/hr</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Reliability SLA:</span>
                  <span className="font-bold text-emerald-600">{w.reliabilityRate}%</span>
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  Recent: <span className="text-gray-600">{w.recentMission}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LaborCloud;
