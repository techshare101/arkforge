import React, { useState } from 'react';
import { 
  Activity, 
  AlertCircle, 
  AlertTriangle, 
  ArrowRight, 
  BadgeCheck, 
  Building2, 
  Check, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Database, 
  DollarSign, 
  Download, 
  ExternalLink, 
  FileCheck, 
  FileCode, 
  FileSearch, 
  FileText, 
  Filter, 
  Fingerprint, 
  Layers, 
  Lock, 
  Play, 
  Plus, 
  RefreshCw, 
  RotateCcw, 
  Search, 
  Server, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Wrench, 
  X, 
  XCircle, 
  Zap 
} from 'lucide-react';
import { ExceptionDeskIncident } from '../types';
import { geminiService } from '../services/geminiService';

// Real-World Enterprise Operational Incidents
const INITIAL_INCIDENTS: ExceptionDeskIncident[] = [
  {
    id: 'exc-101',
    workflowChain: 'ERP → Work Order → Documents → Accounting → Approval',
    failedStep: 'Accounting / AP',
    severity: 'CRITICAL_HALT',
    erpSystem: 'NetSuite AP',
    workOrderNumber: 'WO-7719-MN',
    contractorName: 'NorthStar Commercial Roofing',
    financialImpact: 1420.00,
    detectedProblem: 'Contractor invoice of $1,420.00 halted in NetSuite AP: Customer PO #PO-TARGET-FM-88192 only pre-authorized $1,250.00 ($170 cost variance exceeds 10% threshold).',
    agentInvestigation: 'TrueForge cross-referenced the technician supply-house invoice from Beacon Building Products. The technician was forced to substitute high-temp 60-mil TPO membrane due to heavy rain conditions at Nicollet Mall.',
    investigationSteps: [
      'Scanned NetSuite transaction log and flagged $170 line item variance on Line #3 (Membrane Roll Spec)',
      'Extracted Beacon Building Products electronic invoice #BBP-44919 dated Oct 5 09:40 AM',
      'Corroborated National Weather Service rain radar (0.42 inches/hr) at Minneapolis Nicollet Mall during repair window',
      'Synthesized Emergency Weather Variance Change-Order Rider justifying additional material cost'
    ],
    preparedResolution: 'Auto-appended Emergency Weather Variance Rider #CR-7719 to NetSuite AP packet and adjusted authorized PO cap from $1,250.00 to $1,420.00 for 1-click accounting release.',
    remediationArtifact: 'WEATHER_VARIANCE_RIDER_CR7719.pdf',
    status: 'INVESTIGATED',
    timeAgo: '8m ago'
  },
  {
    id: 'exc-102',
    workflowChain: 'ERP → Work Order → Documents → Accounting → Approval',
    failedStep: 'Field Proof / Photos',
    severity: 'DOCUMENT_DEFICIENCY',
    erpSystem: 'ServiceTitan',
    workOrderNumber: 'WO-8942-MN',
    contractorName: 'Twin Cities Mechanical Co.',
    financialImpact: 850.00,
    detectedProblem: 'Technician uploaded blurred, oil-smudged photo of replaced Taco circulator pump serial nameplate in dim basement utility room; OCR confidence dropped to 31%.',
    agentInvestigation: 'TrueForge performed multi-spectral contrast enhancement on image EXIF pixels, extracted partial serial string "...9982410-UL", and matched the Johnstone Supply wholesale EDI purchase manifest.',
    investigationSteps: [
      'Executed adaptive CLAHE contrast enhancement on low-light photo',
      'Isolated alphanumeric prefix TACO-007-F5 and suffix 9982410-UL',
      'Queried Johnstone Supply Minneapolis EDI transaction ledger matching contractor account #MN-88410',
      'Confirmed 100% authentic OEM serial match and generated digitally signed verification seal'
    ],
    preparedResolution: 'Linked verified Ferguson/Johnstone EDI delivery receipt to ServiceTitan equipment registry, overriding manual photo OCR rejection with certified OEM stamp.',
    remediationArtifact: 'OEM_SERIAL_NOTARIZATION_STAMP.json',
    status: 'INVESTIGATED',
    timeAgo: '24m ago'
  },
  {
    id: 'exc-103',
    workflowChain: 'ERP → Work Order → Documents → Accounting → Approval',
    failedStep: 'Work Order Spec',
    severity: 'WARNING_MISMATCH',
    erpSystem: 'Yardi Voyager',
    workOrderNumber: 'WO-6104-MN',
    contractorName: 'Gopher State Commercial Plumbing',
    financialImpact: 680.00,
    detectedProblem: 'Yardi Voyager compliance gateway flagged Minneapolis Public Housing RPZ backflow preventer permit tag #BF-2025-412 as expired by 14 days.',
    agentInvestigation: 'TrueForge queried the Minneapolis Development Review / City Portal API and discovered that renewal permit #BF-2026-901 was officially issued yesterday at 04:30 PM but had not yet synced to the housing authority’s vendor ledger.',
    investigationSteps: [
      'Identified expired municipal permit tag alert on Cedar High Apartments account in Yardi',
      'Queried City of Minneapolis Citizen Access portal via automated REST lookup for contractor license #12093',
      'Retrieved active permit cert #BF-2026-901 valid through Oct 2027',
      'Downloaded official PDF certificate stamped by City Mechanical Inspector'
    ],
    preparedResolution: 'Synchronized valid municipal permit #BF-2026-901 to Yardi Voyager compliance records and cleared the vendor compliance hold.',
    remediationArtifact: 'MPLS_PERMIT_BF2026_901_CERT.pdf',
    status: 'INVESTIGATED',
    timeAgo: '42m ago'
  },
  {
    id: 'exc-104',
    workflowChain: 'ERP → Work Order → Documents → Accounting → Approval',
    failedStep: 'Approval Gateway',
    severity: 'DOCUMENT_DEFICIENCY',
    erpSystem: 'Procore',
    workOrderNumber: 'WO-5510-MN',
    contractorName: 'Superior Building Automation & Controls',
    financialImpact: 2150.00,
    detectedProblem: 'Emergency heating restoration finished at 11:45 PM; tenant was asleep and could not provide a digital signature on the mobile technician tablet.',
    agentInvestigation: 'TrueForge queried property IoT thermostat telemetry (Ecobee/Honeywell API) showing indoor temperature rose from 54°F to 71°F between 11:15 PM and 12:05 AM, proving heating loop was restored.',
    investigationSteps: [
      'Detected missing tenant signature slip on Procore Closeout Ticket',
      'Queried Honeywell RedLINK commercial thermostat sensor logs for Unit 4B',
      'Confirmed +17°F delta temperature rise within 50 minutes of burner ignition',
      'Auto-drafted SMS 1-tap verification link to registered resident tenant'
    ],
    preparedResolution: 'Attached verified IoT thermal performance graph to Procore work order and dispatched 1-tap confirmation SMS to tenant mobile, maintaining invoice eligibility.',
    remediationArtifact: 'IOT_THERMAL_DELTA_VERIFICATION.png',
    status: 'INVESTIGATED',
    timeAgo: '1h ago'
  }
];

export const ExceptionDesk: React.FC = () => {
  const [incidents, setIncidents] = useState<ExceptionDeskIncident[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<ExceptionDeskIncident>(INITIAL_INCIDENTS[0]);
  const [resolvedIncidentIds, setResolvedIncidentIds] = useState<string[]>([]);
  
  // Investigation state
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [investigationNote, setInvestigationNote] = useState<string | null>(null);

  // New incident modal / creator
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStep, setNewStep] = useState<'ERP Sync' | 'Work Order Spec' | 'Field Proof / Photos' | 'Accounting / AP' | 'Approval Gateway'>('Accounting / AP');
  const [newERP, setNewERP] = useState<'ServiceTitan' | 'NetSuite AP' | 'Procore' | 'Yardi Voyager' | 'ServiceChannel'>('NetSuite AP');
  const [newWO, setNewWO] = useState('WO-9201-MN');
  const [newContractor, setNewContractor] = useState('Twin Cities Mechanical Co.');
  const [newAmount, setNewAmount] = useState('1150.00');
  const [newProblem, setNewProblem] = useState('Invoice tax line item omitted state sales tax exemption certificate number for non-profit client.');

  // Retainer Agreement Modal
  const [showRetainerModal, setShowRetainerModal] = useState(false);
  const [retainerContractorName, setRetainerContractorName] = useState('Twin Cities Mechanical & Heating Co.');
  const [retainerPlanTier, setRetainerPlanTier] = useState<'STANDARD' | 'ENTERPRISE'>('ENTERPRISE');

  // Filter state
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  // Calculate Pipeline Metrics
  const totalBlockedAmount = incidents.reduce((acc, inc) => acc + inc.financialImpact, 0);
  const totalRescuedAmount = incidents
    .filter(inc => resolvedIncidentIds.includes(inc.id))
    .reduce((acc, inc) => acc + inc.financialImpact, 0);
  const activeCount = incidents.length - resolvedIncidentIds.length;

  // Handle Commit Fix to ERP
  const handleCommitRemediation = (incidentId: string) => {
    if (!resolvedIncidentIds.includes(incidentId)) {
      setResolvedIncidentIds([...resolvedIncidentIds, incidentId]);
      const updated = incidents.map(inc => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            status: 'AUTO_RESOLVED' as const,
            severity: 'AUTO_REMEDIATED' as const,
            committedAt: new Date().toLocaleTimeString()
          };
        }
        return inc;
      });
      setIncidents(updated);
      setSelectedIncident(updated.find(i => i.id === incidentId) || updated[0]);
    }
  };

  // Re-run Gemini Autonomous Investigation
  const handleReinvestigate = async () => {
    setIsInvestigating(true);
    setInvestigationNote(null);
    try {
      const res = await geminiService.investigatePipelineException({
        failedStep: selectedIncident.failedStep,
        detectedProblem: selectedIncident.detectedProblem,
        erpSystem: selectedIncident.erpSystem,
        workOrderNumber: selectedIncident.workOrderNumber,
        contractorName: selectedIncident.contractorName,
        financialImpact: selectedIncident.financialImpact
      });

      const updated: ExceptionDeskIncident = {
        ...selectedIncident,
        agentInvestigation: res.rootCause,
        investigationSteps: res.investigationSteps,
        preparedResolution: res.preparedResolution,
        remediationArtifact: res.remediationArtifact
      };

      setSelectedIncident(updated);
      setIncidents(incidents.map(i => i.id === updated.id ? updated : i));
      setInvestigationNote(`TrueForge deep forensic investigation complete. Confidence: ${res.confidenceScore}%.`);
    } finally {
      setIsInvestigating(false);
    }
  };

  // Handle Custom Anomaly Injection
  const handleCreateCustomIncident = async () => {
    setIsInvestigating(true);
    const newInc: ExceptionDeskIncident = {
      id: `exc-${Date.now()}`,
      workflowChain: 'ERP → Work Order → Documents → Accounting → Approval',
      failedStep: newStep,
      severity: 'WARNING_MISMATCH',
      erpSystem: newERP,
      workOrderNumber: newWO,
      contractorName: newContractor,
      financialImpact: parseFloat(newAmount) || 850.0,
      detectedProblem: newProblem,
      agentInvestigation: 'Investigating cause and querying external trade registers...',
      investigationSteps: [
        `Detected operational anomaly in ${newERP} at ${newStep}`,
        `Querying audit trail logs for ${newWO}`,
        `Synthesizing automated remediation resolution`
      ],
      preparedResolution: 'Auto-generating compliance patch for human sign-off...',
      remediationArtifact: `PATCH_${newWO}.json`,
      status: 'INVESTIGATED',
      timeAgo: 'Just now'
    };

    try {
      const res = await geminiService.investigatePipelineException({
        failedStep: newInc.failedStep,
        detectedProblem: newInc.detectedProblem,
        erpSystem: newInc.erpSystem,
        workOrderNumber: newInc.workOrderNumber,
        contractorName: newInc.contractorName,
        financialImpact: newInc.financialImpact
      });

      newInc.agentInvestigation = res.rootCause;
      newInc.investigationSteps = res.investigationSteps;
      newInc.preparedResolution = res.preparedResolution;
      newInc.remediationArtifact = res.remediationArtifact;

      setIncidents([newInc, ...incidents]);
      setSelectedIncident(newInc);
      setShowCreateModal(false);
    } finally {
      setIsInvestigating(false);
    }
  };

  const filteredIncidents = incidents.filter(i => {
    if (severityFilter === 'ALL') return true;
    if (severityFilter === 'RESOLVED') return resolvedIncidentIds.includes(i.id);
    if (severityFilter === 'ACTIVE') return !resolvedIncidentIds.includes(i.id);
    return i.severity === severityFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ========================================================================= */}
      {/* 1. EXECUTIVE MISSION BANNER & RETAINER ECONOMICS                          */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-500/20 text-purple-300 text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-purple-400" />
                OPERATIONAL REVENUE ENGINE · AUTOMATION MAINTENANCE DESK
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Model: Gemini 3.8 Flash · Self-Healing Pipeline
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Industrial Exception Resolution Desk
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
              Businesses pay once for workflow automation, but the durable recurring contract is maintaining it when reality breaks the pipeline.
              TrueForge watches the ERP pipeline, investigates root causes, and prepares 1-click executable fixes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowRetainerModal(true)}
              className="bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all font-mono"
            >
              <Zap className="w-4 h-4" />
              Operations Retainer SLA ($2,500/mo)
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 border border-white/20 transition-all font-mono"
            >
              <Plus className="w-4 h-4 text-cyan-300" />
              Simulate Pipeline Failure
            </button>
          </div>
        </div>

        {/* Real-time Exception Desk Telemetry Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">Blocked Accounts Payable</span>
            <span className="text-2xl font-black text-white font-mono">${totalBlockedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span className="text-[10px] text-amber-300 block mt-1">{activeCount} Incidents in Queue</span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">Cash Flow Rescued</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">${totalRescuedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span className="text-[10px] text-emerald-400 block mt-1">{resolvedIncidentIds.length} Committed to ERP</span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">Mean Time to Resolution (MTTR)</span>
            <span className="text-2xl font-black text-cyan-300 font-mono">3.4 Mins</span>
            <span className="text-[10px] text-slate-400 block mt-1">Vs 4.8 Days manual back-and-forth</span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">Pipeline Self-Healing SLA</span>
            <span className="text-2xl font-black text-purple-300 font-mono">99.98%</span>
            <span className="text-[10px] text-slate-400 block mt-1">Continuous ERP Observation</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE 5-STEP INDUSTRIAL PIPELINE OBSERVABILITY GLASS                    */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              CONTINUOUS SURVEILLANCE PIPELINE
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-0.5">
              ERP ➔ Work Order ➔ Field Proof ➔ Accounting ➔ Approval
            </h3>
          </div>
          <div className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-xl">
            Active Integrations: NetSuite · ServiceTitan · Procore · Yardi
          </div>
        </div>

        {/* 5 Chain Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {[
            { step: 'ERP Sync', desc: 'NetSuite & ServiceTitan', hasError: false, icon: Server },
            { step: 'Work Order Spec', desc: 'PO Cap & Municipal Tags', hasError: incidents.some(i => i.failedStep === 'Work Order Spec' && !resolvedIncidentIds.includes(i.id)), icon: FileText },
            { step: 'Field Proof / Photos', desc: 'EXIF, OCR & Serial Match', hasError: incidents.some(i => i.failedStep === 'Field Proof / Photos' && !resolvedIncidentIds.includes(i.id)), icon: FileCheck },
            { step: 'Accounting / AP', desc: 'PO Price Reconciliation', hasError: incidents.some(i => i.failedStep === 'Accounting / AP' && !resolvedIncidentIds.includes(i.id)), icon: DollarSign },
            { step: 'Approval Gateway', desc: 'Tenant Sign-off & Release', hasError: incidents.some(i => i.failedStep === 'Approval Gateway' && !resolvedIncidentIds.includes(i.id)), icon: BadgeCheck }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all text-xs ${
                  item.hasError
                    ? 'bg-red-50/80 border-red-300 ring-2 ring-red-100'
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-gray-500 font-bold">STEP 0{idx + 1}</span>
                  {item.hasError ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <div className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-gray-700" />
                  {item.step}
                </div>
                <div className="text-[11px] text-gray-500 mt-1">{item.desc}</div>
                <div className="mt-2 text-[10px] font-mono font-bold">
                  {item.hasError ? (
                    <span className="text-red-700">ANOMALY INTERCEPTED</span>
                  ) : (
                    <span className="text-emerald-700">FLOWING NORMALLY</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INCIDENT WORKSPACE: QUEUE (LEFT) + FORENSIC CONSOLE (RIGHT)            */}
      {/* ========================================================================= */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column (5 Cols): Incident Stream */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Active Operational Breakdown Incidents ({filteredIncidents.length})
              </span>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 text-[10px] font-mono">
                {['ALL', 'ACTIVE', 'RESOLVED'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSeverityFilter(f)}
                    className={`px-2 py-0.5 rounded font-bold transition-all ${
                      severityFilter === f
                        ? 'bg-slate-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredIncidents.map((inc) => {
                const isResolved = resolvedIncidentIds.includes(inc.id);
                return (
                  <div
                    key={inc.id}
                    onClick={() => {
                      setSelectedIncident(inc);
                      setInvestigationNote(null);
                    }}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      selectedIncident.id === inc.id
                        ? 'bg-purple-50/80 border-purple-500 shadow-md ring-2 ring-purple-200'
                        : isResolved
                        ? 'bg-emerald-50/40 border-emerald-200 opacity-80'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800'
                          : inc.severity === 'CRITICAL_HALT'
                          ? 'bg-red-100 text-red-800'
                          : inc.severity === 'WARNING_MISMATCH'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {isResolved ? 'COMMITTED TO ERP' : inc.failedStep}
                      </span>
                      <span className="text-[11px] font-mono text-gray-400">{inc.timeAgo}</span>
                    </div>

                    <div className="text-xs font-bold text-gray-900 font-mono">{inc.workOrderNumber} · {inc.erpSystem}</div>
                    <p className="text-[11px] text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                      {inc.detectedProblem}
                    </p>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200/60 text-[11px] font-mono">
                      <span className="text-gray-500 truncate">{inc.contractorName}</span>
                      <span className="font-bold text-gray-900">${inc.financialImpact.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SLA Maintenance Retainer Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono uppercase text-purple-300 font-bold block">
              The Retainer Moat
            </span>
            <h4 className="font-bold text-sm text-white">Why Exception Desks Command Monthly SLAs</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When a commercial contractor or property manager's NetSuite pipeline breaks, invoices stall for 30+ days. 
              The Exception Desk continuously heals anomalies, guaranteeing continuous cash velocity under a paid monthly retainer.
            </p>
          </div>
        </div>

        {/* Right Column (7 Cols): Forensic Diagnostic & Commit Console */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 font-mono">
                  TRUEFORGE FORENSIC INVESTIGATOR
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                  {selectedIncident.workOrderNumber} · {selectedIncident.erpSystem}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReinvestigate}
                  disabled={isInvestigating}
                  className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {isInvestigating ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-300" /> : <Sparkles className="w-3.5 h-3.5 text-cyan-300" />}
                  {isInvestigating ? 'Investigating...' : 'Deep Forensic Scan'}
                </button>
              </div>
            </div>

            {investigationNote && (
              <div className="bg-blue-50 border border-blue-200 text-blue-900 px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                {investigationNote}
              </div>
            )}

            {/* Failure & Financial Impact Overview */}
            <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Failed Pipeline Node</span>
                <span className="text-red-700 font-bold text-sm mt-0.5 block">{selectedIncident.failedStep}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Target ERP Accounting</span>
                <span className="text-gray-900 font-bold text-sm mt-0.5 block">{selectedIncident.erpSystem}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Blocked Cash Flow</span>
                <span className="text-purple-700 font-bold text-sm mt-0.5 block">${selectedIncident.financialImpact.toFixed(2)}</span>
              </div>
            </div>

            {/* Detected Anomaly Statement */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Detected Operational Breakdown:
              </span>
              <p className="text-xs text-gray-800 bg-red-50/60 p-4 rounded-2xl border border-red-200 leading-relaxed font-sans">
                {selectedIncident.detectedProblem}
              </p>
            </div>

            {/* TrueForge Root-Cause Investigation & Steps */}
            <div className="space-y-3 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-cyan-300 font-mono">
                <span className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  TRUEFORGE AUTONOMOUS ROOT-CAUSE ANALYSIS
                </span>
                <span>Active Forensic Trace</span>
              </div>

              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {selectedIncident.agentInvestigation}
              </p>

              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold">
                  Evidence Corroboration Steps Executed:
                </span>
                {selectedIncident.investigationSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 font-mono text-[11px] text-cyan-200/90">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Staged Fix & Generated Remediation Artifact */}
            <div className="space-y-3 bg-purple-50/70 p-6 rounded-2xl border border-purple-200 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-900 uppercase font-mono text-[11px] flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-purple-700" />
                  Staged Remediation Action (Prepared for ERP Commit)
                </span>
                {selectedIncident.remediationArtifact && (
                  <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-purple-300 text-purple-800 font-bold">
                    Artifact: {selectedIncident.remediationArtifact}
                  </span>
                )}
              </div>

              <p className="text-gray-800 leading-relaxed font-sans">
                {selectedIncident.preparedResolution}
              </p>

              <div className="pt-3 border-t border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-gray-600">
                  {resolvedIncidentIds.includes(selectedIncident.id) ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Committed to {selectedIncident.erpSystem} at {selectedIncident.committedAt}
                    </span>
                  ) : (
                    <span>Status: Awaiting Operator Commit</span>
                  )}
                </div>

                {!resolvedIncidentIds.includes(selectedIncident.id) ? (
                  <button
                    onClick={() => handleCommitRemediation(selectedIncident.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md font-mono"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                    Commit Fix & Restore Pipeline in ERP ➔
                  </button>
                ) : (
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-4 py-2 rounded-xl text-xs font-mono">
                    Pipeline Fully Restored
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL: INJECT CUSTOM OPERATIONAL BREAKDOWN ANOMALY                     */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-gray-200 shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h4 className="font-bold text-gray-900 text-lg">Simulate Pipeline Failure Scenario</h4>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase text-gray-600 block mb-1">Failed Node</label>
                  <select
                    value={newStep}
                    onChange={(e) => setNewStep(e.target.value as any)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-gray-900 focus:outline-none bg-white font-medium"
                  >
                    <option value="ERP Sync">ERP Sync</option>
                    <option value="Work Order Spec">Work Order Spec</option>
                    <option value="Field Proof / Photos">Field Proof / Photos</option>
                    <option value="Accounting / AP">Accounting / AP</option>
                    <option value="Approval Gateway">Approval Gateway</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase text-gray-600 block mb-1">ERP Target</label>
                  <select
                    value={newERP}
                    onChange={(e) => setNewERP(e.target.value as any)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-gray-900 focus:outline-none bg-white font-medium"
                  >
                    <option value="NetSuite AP">NetSuite AP</option>
                    <option value="ServiceTitan">ServiceTitan</option>
                    <option value="Procore">Procore</option>
                    <option value="Yardi Voyager">Yardi Voyager</option>
                    <option value="ServiceChannel">ServiceChannel</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase text-gray-600 block mb-1">Work Order #</label>
                  <input
                    type="text"
                    value={newWO}
                    onChange={(e) => setNewWO(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-gray-900 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-gray-600 block mb-1">Blocked Amount ($)</label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-gray-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-gray-600 block mb-1">Contractor Business Entity</label>
                <input
                  type="text"
                  value={newContractor}
                  onChange={(e) => setNewContractor(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-gray-900"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-gray-600 block mb-1">Detected Anomaly Description</label>
                <textarea
                  rows={3}
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-gray-900"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={handleCreateCustomIncident}
                disabled={isInvestigating}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow font-mono disabled:opacity-50"
              >
                {isInvestigating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Running TrueForge Diagnostic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    Inject & Run TrueForge Diagnostic
                  </>
                )}
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-3.5 rounded-xl text-xs font-mono"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: RETAINER AGREEMENT & SLA CONTRACT                               */}
      {/* ========================================================================= */}
      {showRetainerModal && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-gray-200 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-mono font-bold text-purple-600 uppercase">Enterprise Support Retainer</span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">AI Operations Maintenance SLA</h3>
              </div>
              <button onClick={() => setShowRetainerModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
            </div>

            <div className="space-y-4 text-xs text-gray-700">
              <p className="leading-relaxed bg-purple-50 p-4 rounded-2xl border border-purple-200 text-purple-950 font-sans">
                <strong>SLA Terms:</strong> 24/7 continuous surveillance of your ERP pipeline. TrueForge automatically investigates, 
                corroborates third-party supply chain and municipal records, and prepares 1-click executable fixes with 
                a guaranteed <strong>&lt;5-minute Mean Time to Remediation</strong>.
              </p>

              <div className="space-y-3 font-mono">
                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-500 block mb-1">Contractor / Enterprise Entity</label>
                  <input
                    type="text"
                    value={retainerContractorName}
                    onChange={(e) => setRetainerContractorName(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-900 font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div
                    onClick={() => setRetainerPlanTier('STANDARD')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      retainerPlanTier === 'STANDARD' ? 'bg-purple-50 border-purple-500' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="font-bold text-gray-900">Standard Tier</div>
                    <div className="text-lg font-black text-purple-700">$1,500/mo</div>
                    <div className="text-[10px] text-gray-500 mt-1">Up to 50 exceptions</div>
                  </div>

                  <div
                    onClick={() => setRetainerPlanTier('ENTERPRISE')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      retainerPlanTier === 'ENTERPRISE' ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-300' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="font-bold text-gray-900">Enterprise SLA</div>
                    <div className="text-lg font-black text-purple-700">$2,500/mo</div>
                    <div className="text-[10px] text-gray-500 mt-1">Unlimited self-healing</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 flex items-center justify-between font-mono">
                <span>Monthly Maintenance Fee:</span>
                <span className="font-bold text-gray-900 text-base">{retainerPlanTier === 'ENTERPRISE' ? '$2,500.00 / month' : '$1,500.00 / month'}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowRetainerModal(false)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow font-mono"
                >
                  Execute Retainer Agreement
                </button>
                <button
                  onClick={() => setShowRetainerModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-3.5 rounded-xl text-xs font-mono"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExceptionDesk;
