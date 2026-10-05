import React, { useState } from 'react';
import { 
  Activity, 
  AlertCircle, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Code, 
  Copy, 
  Cpu, 
  DollarSign, 
  Download, 
  ExternalLink, 
  Eye, 
  FileCheck, 
  Fingerprint, 
  Key, 
  Layers, 
  LineChart, 
  Lock, 
  Play, 
  RefreshCw, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  TrendingDown, 
  XCircle,
  Check
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { AgentReadyAuditReport, JourneyStageKey, SyntheticProbeMetric } from '../types';

const INITIAL_PROBES: SyntheticProbeMetric[] = [
  { id: 'pb-1', timestamp: '10:04:12 AM', stage: 'discover', latencyMs: 142, success: true, message: 'JSON-LD schema discovered' },
  { id: 'pb-2', timestamp: '10:04:13 AM', stage: 'understand', latencyMs: 380, success: false, message: 'Pricing rendered in unindexed image' },
  { id: 'pb-3', timestamp: '10:04:14 AM', stage: 'authenticate', latencyMs: 820, success: false, message: 'reCAPTCHA v3 blocked autonomous agent session' },
  { id: 'pb-4', timestamp: '10:04:15 AM', stage: 'act', latencyMs: 610, success: false, message: 'No structured slot reservation endpoint' },
  { id: 'pb-5', timestamp: '10:04:16 AM', stage: 'verify', latencyMs: 210, success: true, message: 'HTML thank you banner detected (unstructured)' },
  { id: 'pb-6', timestamp: '10:04:17 AM', stage: 'pay', latencyMs: 1240, success: false, message: 'Interactive 3D Secure modal required' }
];

export const AgentReadyAudit: React.FC = () => {
  const [targetName, setTargetName] = useState('Lakeside Aesthetics & Laser Spa');
  const [targetUrl, setTargetUrl] = useState('lakesideaesthetics-mpls.com');
  const [industry, setIndustry] = useState('Med-Spa & Aesthetic Medicine');
  const [isAuditing, setIsAuditing] = useState(false);
  const [activeReport, setActiveReport] = useState<AgentReadyAuditReport | null>(null);
  const [activeStageTab, setActiveStageTab] = useState<JourneyStageKey>('understand');
  const [copiedCode, setCopiedCode] = useState(false);

  const presets = [
    { name: 'Lakeside Aesthetics & Laser Spa', url: 'lakesideaesthetics-mpls.com', industry: 'Med-Spa / Clinics' },
    { name: 'Twin Cities Heating & Air', url: 'twincitieshvac-dispatch.com', industry: 'Field Service' },
    { name: 'SaaSFlow Billing Portal', url: 'app.saasflow-billing.io', industry: 'B2B SaaS' },
    { name: 'North Star Dermatology', url: 'northstarderm-mpls.com', industry: 'Healthcare Ops' }
  ];

  const handleRunAudit = async () => {
    setIsAuditing(true);
    try {
      const report = await geminiService.runAgentReadyAudit(targetName, targetUrl, industry);
      setActiveReport(report);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleSelectPreset = (p: typeof presets[0]) => {
    setTargetName(p.name);
    setTargetUrl(p.url);
    setIndustry(p.industry);
    setActiveReport(null);
  };

  const stageKeys: JourneyStageKey[] = ['discover', 'understand', 'authenticate', 'act', 'verify', 'pay'];

  const getStageIcon = (key: JourneyStageKey) => {
    switch (key) {
      case 'discover': return <Search className="w-4 h-4" />;
      case 'understand': return <Eye className="w-4 h-4" />;
      case 'authenticate': return <Key className="w-4 h-4" />;
      case 'act': return <Layers className="w-4 h-4" />;
      case 'verify': return <FileCheck className="w-4 h-4" />;
      case 'pay': return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Banner */}
      <div className="bg-[#1a1a1a] rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D8FD49] rounded-full blur-[140px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#343CED] rounded-full blur-[130px] opacity-25 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#D8FD49] border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            #1 Hidden Gem · The SEO of the Agent Era
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            AgentReady <span className="text-[#D8FD49]">Certification & Monitoring</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
            "Today websites obsess over SEO. Tomorrow businesses will care about{' '}
            <span className="text-white font-semibold">Agent Readiness</span>."
            Continuous synthetic agent observability answering: <em>Can agents actually use this business safely and transact?</em>
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#D8FD49] font-bold">Free Scan</span>
              <span className="text-gray-400">→ Lead Magnet</span>
            </div>
            <div className="text-gray-600">•</div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">$297</span>
              <span className="text-gray-400">→ Verified Audit</span>
            </div>
            <div className="text-gray-600">•</div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$99–$499/mo</span>
              <span className="text-gray-400">→ Continuous Monitoring</span>
            </div>
            <div className="text-gray-600">•</div>
            <div className="flex items-center gap-2">
              <span className="text-[#343CED] font-bold">$2K–$10K</span>
              <span className="text-gray-400">→ SchemaForge Remediation</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 6-Stage Synthetic Agent Journey Banner */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              The 6-Stage Agent Journey Failure Chain
            </h2>
            <span className="text-xs font-bold text-gray-400 font-mono">
              SYNTHETIC AGENT TEST SUITE
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Where 82% of businesses fail when ChatGPT, Anthropic Computer-Use, or personal agents attempt to transact
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: '01', key: 'Discover', desc: 'Robots.txt, LLM index, llms.txt' },
            { step: '02', key: 'Understand', desc: 'Machine pricing & structured taxonomy' },
            { step: '03', key: 'Authenticate', desc: 'Delegated tokens vs captcha traps' },
            { step: '04', key: 'Act', desc: 'Typed tool endpoints vs form clicks' },
            { step: '05', key: 'Verify', desc: 'Deterministic proof & webhooks' },
            { step: '06', key: 'Pay', desc: 'Agentic card / Stripe Agent Toolkit' },
          ].map((s, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-center hover:border-[#343CED] transition-all">
              <div className="text-[11px] font-mono font-bold text-[#343CED] mb-1">STAGE {s.step}</div>
              <div className="font-bold text-sm text-gray-900 mb-1">{s.key}</div>
              <div className="text-[11px] text-gray-500 leading-tight">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Audit Scanner */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Run Live AgentReady Audit</h2>
          <p className="text-sm text-gray-500">
            Probe any local business or SaaS endpoint across all 6 stages of autonomous agent interaction.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-2">Try Real Examples:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                targetName === p.name
                  ? 'bg-[#343CED] text-white border-[#343CED]'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {p.name.split(' ')[0]} {p.name.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
              Business / SaaS Name
            </label>
            <input
              type="text"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#343CED]"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
              Domain / Booking URL
            </label>
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#343CED]"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
              Industry Category
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#343CED]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="bg-[#343CED] hover:bg-[#2b32c7] text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Executing 6-Stage Synthetic Agent Probes...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-[#D8FD49]" />
                Execute AgentReady Audit Scan
              </>
            )}
          </button>
        </div>

        {/* Report Output */}
        {activeReport && (
          <div className="space-y-8 pt-6 border-t border-gray-100 animate-fadeIn">
            {/* Scorecard Hero */}
            <div className="bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 rounded-3xl p-8 text-white border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 font-bold text-xs uppercase tracking-wider border border-red-500/30">
                    {activeReport.certificationGrade}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">ID: {activeReport.proofBadgeId}</span>
                </div>
                <h3 className="text-3xl font-bold tracking-tight">{activeReport.targetName}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{activeReport.summary}</p>

                <div className="flex items-center gap-6 pt-2 text-xs">
                  <div>
                    <span className="text-gray-400">Monthly Revenue Leakage: </span>
                    <span className="font-bold text-[#D8FD49] text-base ml-1">
                      {activeReport.revenueLeakageEstimate}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Audited At: </span>
                    <span className="text-white font-mono ml-1">{activeReport.testedAt}</span>
                  </div>
                </div>
              </div>

              {/* Big Score Gauge */}
              <div className="bg-black/60 border border-gray-800 rounded-2xl p-6 text-center w-full md:w-56 shrink-0 flex flex-col items-center justify-center">
                <div className="text-xs font-mono uppercase text-gray-400 mb-1">AgentReady Index</div>
                <div className="text-6xl font-black text-red-400 tracking-tighter">
                  {activeReport.overallScore}
                  <span className="text-lg text-gray-500 font-normal">/100</span>
                </div>
                <div className="text-xs text-red-400 font-semibold mt-1">High Agent Abandonment</div>
                <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] text-gray-400">
                  Fails 4 of 6 Autonomous Milestones
                </div>
              </div>
            </div>

            {/* Stage-by-Stage Breakdown Tabs */}
            <div className="space-y-4">
              <div className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Detailed Stage Failure Breakdown & Remediation
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {stageKeys.map((key) => {
                  const stage = activeReport.stages[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveStageTab(key)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        activeStageTab === key
                          ? 'border-[#343CED] bg-blue-50/50 ring-2 ring-blue-100 shadow-sm'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">{getStageIcon(key)}</span>
                        <span className={`text-[11px] font-mono font-bold ${
                          stage.status === 'passed' ? 'text-emerald-600' :
                          stage.status === 'warning' ? 'text-amber-600' : 'text-red-500'
                        }`}>
                          {stage.score}/100
                        </span>
                      </div>
                      <div className="text-xs font-bold text-gray-900 capitalize truncate">{key}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-semibold mt-0.5">{stage.status}</div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Stage Detail Card */}
              {activeReport.stages[activeStageTab] && (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">
                        {activeReport.stages[activeStageTab].label}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Technical impact on ChatGPT, Claude Computer Use, and autonomous agent clients
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${
                      activeReport.stages[activeStageTab].status === 'passed' ? 'bg-emerald-100 text-emerald-800' :
                      activeReport.stages[activeStageTab].status === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {activeReport.stages[activeStageTab].status.toUpperCase()} (Score: {activeReport.stages[activeStageTab].score})
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
                          Failure Root Cause
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-3.5 rounded-xl border border-gray-200">
                          {activeReport.stages[activeStageTab].failureDescription}
                        </p>
                      </div>

                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                          Agent Behavioral Impact
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-3.5 rounded-xl border border-gray-200">
                          {activeReport.stages[activeStageTab].technicalImpact}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#343CED]">
                          1-Click SchemaForge Remediation Patch
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(activeReport.stages[activeStageTab].remediationSnippet);
                            setCopiedCode(true);
                            setTimeout(() => setCopiedCode(false), 2000);
                          }}
                          className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1"
                        >
                          {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          {copiedCode ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre className="bg-gray-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[160px]">
                        {activeReport.stages[activeStageTab].remediationSnippet}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Commercial Next Step CTA */}
            <div className="bg-[#343CED] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-lg">Send Verified $297 Audit Package to Business Owner</h4>
                <p className="text-xs text-blue-100 mt-1">
                  Includes full 14-page PDF with executive summary, video demonstration of agent failure, and SchemaForge remediation code.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-[#D8FD49] text-gray-950 px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#cbf532] transition-all whitespace-nowrap">
                  Generate $297 Audit PDF →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Continuous Synthetic Monitoring Cockpit */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">Continuous AgentReady Monitor</h2>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Synthetic heartbeat polling every 5 minutes to detect broken schemas, API drifts, and captcha blocks.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-gray-500">Tier: <strong className="text-gray-900">$299/mo Pro</strong></span>
            <span className="text-gray-500">Uptime: <strong className="text-emerald-600">99.94%</strong></span>
          </div>
        </div>

        {/* Live Probes Feed */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            Recent Synthetic Agent Probes
          </div>
          <div className="space-y-2 font-mono text-xs">
            {INITIAL_PROBES.map((pb) => (
              <div
                key={pb.id}
                className="bg-gray-50 border border-gray-200 p-3 rounded-xl flex items-center justify-between gap-4 hover:bg-gray-100/70 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-[11px]">{pb.timestamp}</span>
                  <span className="px-2 py-0.5 rounded bg-gray-200 font-bold uppercase text-[10px] text-gray-700">
                    {pb.stage}
                  </span>
                  <span className="text-gray-800 font-sans text-xs">{pb.message}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-gray-400">{pb.latencyMs}ms</span>
                  {pb.success ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> OK
                    </span>
                  ) : (
                    <span className="text-red-500 font-bold flex items-center gap-1 text-[11px]">
                      <XCircle className="w-3.5 h-3.5" /> FAILED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AgentReadyAudit;
