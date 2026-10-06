import React, { useState } from 'react';
import { 
  AlertCircle,
  AlertTriangle, 
  ArrowRight, 
  BadgeCheck, 
  Building2, 
  Camera, 
  Check, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Copy, 
  Cpu, 
  DollarSign, 
  Download, 
  ExternalLink, 
  FileCheck, 
  FileSearch, 
  FileText, 
  Fingerprint, 
  Layers, 
  Lock, 
  MapPin, 
  QrCode, 
  RefreshCw, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  TrendingUp, 
  UserCheck, 
  Wrench, 
  XCircle 
} from 'lucide-react';
import { WorkOrderProofRecord, CloseoutPacket, ExceptionDeskIncident } from '../types';
import { geminiService } from '../services/geminiService';

const SAMPLE_WORK_ORDERS: WorkOrderProofRecord[] = [
  {
    id: 'wo-1',
    workOrderNumber: 'WO-8942-MN',
    workflowCategory: 'Field Service HVAC',
    title: 'Emergency Boiler Circulator Pump Replacement',
    propertyLocation: 'Mill City Lofts (Unit 4B), 100 2nd St S, Minneapolis, MN 55401',
    propertyManagerCompany: 'Apex Midwest Property Management',
    assignedContractor: 'Twin Cities Mechanical & Heating Co.',
    invoiceAmount: 850.00,
    status: 'SUBMITTED',
    chain: {
      trigger: {
        timestamp: 'Oct 5, 2026 08:14 AM',
        note: 'Tenant reported zero radiator heat, pressure dropped below 10 PSI.',
        source: 'AppFolio Resident Portal Ticket #4912'
      },
      work: {
        timestamp: 'Oct 5, 2026 11:45 AM',
        technician: 'Marcus Vance (Lic #HVAC-MN-8841)',
        durationHours: 2.2
      },
      evidence: {
        timestamp: 'Oct 5, 2026 01:05 PM',
        geotag: { lat: 44.9778, lng: -93.2650, address: 'Mill City Lofts Basement Utility Rm B' },
        beforePhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
        afterPhoto: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
        serialNumberBarcode: 'TACO-007-F5-SERIAL-9982410-UL',
        checklists: [
          {
            id: 'chk-1',
            title: 'Water Isolation & Depressurization',
            description: 'Inlet and outlet shutoff valves closed; drained static loop without glycol spill.',
            passed: true,
            telemetryEvidence: '0.0 PSI verified at drain valve gauge',
            verifiedAt: '11:58 AM'
          },
          {
            id: 'chk-2',
            title: 'OEM Circulator Pump Flange Torque',
            description: 'New Taco 007-F5 cast iron circulator mounted with high-temp gaskets torqued to 35 ft-lbs.',
            passed: true,
            telemetryEvidence: 'Torque wrench digital confirmation logged',
            verifiedAt: '12:32 PM'
          },
          {
            id: 'chk-3',
            title: 'System Re-pressurization & Bleed',
            description: 'Pressurized loop to 15.0 PSI cold; bleed air purge valves at top 3 radiator risers.',
            passed: true,
            telemetryEvidence: '14.8 PSI static gauge reading',
            verifiedAt: '12:50 PM'
          },
          {
            id: 'chk-4',
            title: 'Thermal Operating Delta Verification',
            description: 'Burner cycle fired; return water temp rose from 68°F to 162°F within 12 minutes.',
            passed: true,
            telemetryEvidence: 'FLIR thermal delta verified: +94°F delta',
            verifiedAt: '01:02 PM'
          }
        ]
      },
      verification: {
        timestamp: 'Oct 5, 2026 01:08 PM',
        merkleProofHash: '0x9e8a4d7c10b5f3a2981ce7749103c8b54f9a012d48c3b70e',
        proofAiConfidenceScore: 99.2,
        verifiedWorker: 'Doneproof-Verification-Worker-v2',
        discrepanciesFound: []
      },
      settlement: {
        paymentReleaseStatus: 'APPROVAL_REQUIRED'
      }
    },
    shareableCertificateUrl: 'https://verify.doneproof.ai/cert/wo-8942-mn'
  },
  {
    id: 'wo-2',
    workOrderNumber: 'WO-8943-MN',
    workflowCategory: 'Property Maintenance',
    title: 'Tenant Turnover Punchlist & Fire Damper Inspection',
    propertyLocation: 'North Loop Flats (Unit 310), Minneapolis, MN',
    propertyManagerCompany: 'Apex Midwest Property Management',
    assignedContractor: 'Twin Cities Pro Handyman & Maintenance',
    invoiceAmount: 420.00,
    status: 'SUBMITTED',
    chain: {
      trigger: {
        timestamp: 'Oct 5, 2026 09:30 AM',
        note: 'Incoming tenant move-in scheduled for Oct 8; mandatory municipal safety turnover inspection.',
        source: 'Buildium Maintenance Portal'
      },
      work: {
        timestamp: 'Oct 5, 2026 02:15 PM',
        technician: 'David Berg (Field Lead)',
        durationHours: 1.8
      },
      evidence: {
        timestamp: 'Oct 5, 2026 03:40 PM',
        geotag: { lat: 44.9866, lng: -93.2750, address: 'North Loop Flats, Unit 310' },
        beforePhoto: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
        afterPhoto: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=80',
        serialNumberBarcode: 'FIRE-DAMPER-UL555-MN-4491',
        checklists: [
          {
            id: 'chk-1',
            title: 'UL-555 Fire Damper Fusible Link',
            description: 'Inspected 165°F fusible link; manual drop test verified unobstructed closure.',
            passed: true,
            telemetryEvidence: 'Photo and drop-latch click verified',
            verifiedAt: '02:45 PM'
          },
          {
            id: 'chk-2',
            title: 'GFCI Outlet Trip Time Test',
            description: 'Tested all kitchen & bath wet-location receptacles using calibrated GFCI tester.',
            passed: true,
            telemetryEvidence: 'Trip latency 18ms (UL standard <25ms)',
            verifiedAt: '03:10 PM'
          }
        ]
      },
      verification: {
        timestamp: 'Oct 5, 2026 03:45 PM',
        merkleProofHash: '0x3c71a9f04bb618e20984da7203b54199c8f0012e847aa19b',
        proofAiConfidenceScore: 98.7,
        verifiedWorker: 'Doneproof-Verification-Worker-v2',
        discrepanciesFound: []
      },
      settlement: {
        paymentReleaseStatus: 'APPROVAL_REQUIRED'
      }
    },
    shareableCertificateUrl: 'https://verify.doneproof.ai/cert/wo-8943-mn'
  }
];

const INITIAL_CLOSEOUT_PACKETS: CloseoutPacket[] = [
  {
    id: 'pkt-1',
    contractorName: 'Apex Commercial Mechanical',
    clientName: 'Midwest Logistics Center (Target Depot Eagan)',
    poNumber: 'PO-2026-98124',
    workOrderNumber: 'WO-44810-RTU',
    clientRequirements: [
      'Customer Purchase Order PO-2026-98124 printed on invoice header',
      'Before & after photos of 25-ton RTU compressor replacement',
      'Old compressor serial nameplate legible photo',
      'Refrigerant recovery log (EPA 608 certified tag)',
      'Signed facilities manager completion slip'
    ],
    techNotes: 'Replaced failed Copeland Scroll compressor on RTU #4. Recovered 18 lbs R-410A. Pulled vacuum to 380 microns. Recharged to factory spec (21.5 lbs). Running test passed with 12°F superheat.',
    photosUploadedCount: 4,
    customerSignoffObtained: true,
    missingEvidence: [],
    billingReadinessStatus: 'BILLING_READY',
    complianceScore: 98,
    invoiceAmount: 4850.00,
    assembledAt: '10:14 AM Today'
  },
  {
    id: 'pkt-2',
    contractorName: 'North Star Plumbing & Fire',
    clientName: 'Cushman & Wakefield Twin Cities Properties',
    poNumber: 'PO-PENDING-MATCH',
    workOrderNumber: 'WO-1928-SPRINKLER',
    clientRequirements: [
      'Pre-approved emergency PO authorization code',
      'Photo of replaced 4" backflow preventer valve assembly',
      'Hydrostatic pressure test certificate signed by licensed master plumber',
      'City of Minneapolis fire marshal inspection tag'
    ],
    techNotes: 'Repaired burst riser coupling on 2nd-floor parking ramp sprinkler system. Replaced check valve.',
    photosUploadedCount: 2,
    customerSignoffObtained: false,
    missingEvidence: [
      'Missing City Fire Marshal re-inspection tag photo',
      'Customer PO Number is missing or unverified in Cushman portal'
    ],
    billingReadinessStatus: 'MISSING_EVIDENCE',
    complianceScore: 56,
    invoiceAmount: 2340.00,
    assembledAt: '09:42 AM Today'
  }
];

const INITIAL_EXCEPTIONS: ExceptionDeskIncident[] = [
  {
    id: 'exc-1',
    workflowChain: 'ERP → Work Order → Documents → Accounting → Approval',
    failedStep: 'Accounting / AP',
    severity: 'WARNING_MISMATCH',
    erpSystem: 'NetSuite AP',
    workOrderNumber: 'WO-8942-MN',
    contractorName: 'Apex Commercial Mechanical',
    financialImpact: 120.00,
    detectedProblem: 'Contractor invoice references PO-98124, but ERP issued PO-98124-B with line item change for disposal fee ($120).',
    agentInvestigation: 'Agent cross-referenced technician notes and supplier receipt. The disposal fee was authorized by assistant property manager via email at 11:15 AM.',
    investigationSteps: [
      'Scanned AP inbox for email authorizations matching PO-98124',
      'Extracted approval timestamp (11:15 AM) from assistant property manager',
      'Queried NetSuite line items and prepared revised delta allocation'
    ],
    preparedResolution: 'Auto-appended email authorization PDF to billing packet and updated ERP invoice line item to match revised PO-98124-B.',
    status: 'INVESTIGATED',
    timeAgo: '12m ago'
  },
  {
    id: 'exc-2',
    workflowChain: 'ERP → Work Order → Documents → Accounting → Approval',
    failedStep: 'Field Proof / Photos',
    severity: 'DOCUMENT_DEFICIENCY',
    erpSystem: 'ServiceTitan',
    workOrderNumber: 'WO-1928-SPRINKLER',
    contractorName: 'North Star Plumbing & Fire',
    financialImpact: 2340.00,
    detectedProblem: 'Technician uploaded blurry camera photo of compressor serial barcode in dim basement lighting.',
    agentInvestigation: 'Agent queried supplier wholesale purchase manifest from Johnstone Supply. Serial number matching invoice is COPELAND-ZR61K3-TF5-930.',
    investigationSteps: [
      'Performed OCR contrast enhancement on blurred photo',
      'Extracted partial string ZR61K3-TF5',
      'Queried Johnstone Supply EDI manifest matching contractor invoice timestamp',
      'Verified authentic OEM match and generated attestation certificate'
    ],
    preparedResolution: 'Matched supplier delivery manifest and tagged asset database with verified serial string for human sign-off.',
    status: 'AWAITING_HUMAN_CONFIRMATION',
    timeAgo: '34m ago'
  }
];

export const DoneproofDiamond: React.FC = () => {
  const [operationalPillar, setOperationalPillar] = useState<'acceptance' | 'closeout' | 'exceptions'>('acceptance');
  
  // Acceptance Engine state
  const [selectedWO, setSelectedWO] = useState<WorkOrderProofRecord>(SAMPLE_WORK_ORDERS[0]);
  const [activeChainStep, setActiveChainStep] = useState<'trigger' | 'work' | 'evidence' | 'verification' | 'settlement'>('evidence');
  const [isVerifying, setIsVerifying] = useState(false);
  const [settled, setSettled] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Closeout Packet state
  const [closeoutPackets] = useState<CloseoutPacket[]>(INITIAL_CLOSEOUT_PACKETS);
  const [selectedPacket, setSelectedPacket] = useState<CloseoutPacket>(INITIAL_CLOSEOUT_PACKETS[0]);
  const [isAssembling, setIsAssembling] = useState(false);
  const [isAuditingCloseout, setIsAuditingCloseout] = useState(false);
  const [closeoutAuditResult, setCloseoutAuditResult] = useState<any>(null);
  const [packetGenerated, setPacketGenerated] = useState(false);
  const [showPilotModal, setShowPilotModal] = useState(false);
  const [pilotContractorName, setPilotContractorName] = useState('Twin Cities Mechanical Co.');
  const [pilotContractorEmail, setPilotContractorEmail] = useState('billing@tcmechanical.com');
  const [pilotSigned, setPilotSigned] = useState(false);

  // Exception Desk state
  const [exceptions] = useState<ExceptionDeskIncident[]>(INITIAL_EXCEPTIONS);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const handleRunCloseoutAIAudit = async () => {
    setIsAuditingCloseout(true);
    try {
      const res = await geminiService.auditCloseoutJob(selectedPacket);
      setCloseoutAuditResult(res);
    } finally {
      setIsAuditingCloseout(false);
    }
  };

  const handleRunVerification = async () => {
    setIsVerifying(true);
    try {
      const res = await geminiService.verifyWorkOrderEvidence(selectedWO);
      setSelectedWO(prev => ({
        ...prev,
        status: 'EVIDENCE_INSPECTED',
        chain: {
          ...prev.chain,
          verification: {
            ...prev.chain.verification,
            merkleProofHash: res.merkleProofHash,
            proofAiConfidenceScore: res.verifiedConfidenceScore
          }
        }
      }));
      setActiveChainStep('verification');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleApproveSettlement = () => {
    setSelectedWO(prev => ({
      ...prev,
      status: 'VERIFIED_AND_SETTLED',
      chain: {
        ...prev.chain,
        settlement: {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          approvedBy: 'Sharon Milz (Property Director)',
          paymentReleaseStatus: 'PAYMENT_RELEASED',
          receiptId: `STTL-${Math.floor(100000 + Math.random() * 900000)}`
        }
      }
    }));
    setSettled(true);
    setActiveChainStep('settlement');
  };

  const handleAssembleCloseout = () => {
    setIsAssembling(true);
    setTimeout(() => {
      setIsAssembling(false);
      setPacketGenerated(true);
    }, 1000);
  };

  const handleResolveException = (id: string) => {
    setResolvedIds(prev => [...prev, id]);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(selectedWO.shareableCertificateUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Executive Industrial Banner */}
      <div className="bg-[#12161f] rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-[140px] opacity-15 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600 rounded-full blur-[130px] opacity-15 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-cyan-300 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Industrial Agent Outcome Framework · Enterprise Infrastructure
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Outcome Verification <br />
            <span className="text-cyan-300">& Acceptance Infrastructure</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
            The mission layer between <span className="text-white font-semibold">“job completed in the field”</span> and{' '}
            <span className="text-cyan-300 font-semibold">“job accepted for financial settlement.”</span> Accumulating customer acceptance rules, exception diagnostics, and verifiable cryptographic handoffs.
          </p>

          {/* Operational Pillar Switcher */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => setOperationalPillar('acceptance')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                operationalPillar === 'acceptance'
                  ? 'bg-cyan-500 text-gray-950 shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              Outcome Acceptance Engine (Core Infrastructure)
            </button>

            <button
              onClick={() => setOperationalPillar('closeout')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                operationalPillar === 'closeout'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <FileText className="w-4 h-4" />
              Autonomous Closeout & Billing Packet Service
            </button>

            <button
              onClick={() => setOperationalPillar('exceptions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                operationalPillar === 'exceptions'
                  ? 'bg-slate-700 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Industrial Exception Desk & Continuous Continuity
            </button>
          </div>
        </div>
      </div>

      {/* Industrial Mission Telemetry Bar */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl shrink-0">
            <Terminal className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900">Mission Pipeline Architecture</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Work Completed ➔ Multimodal Evidence Extraction ➔ ProofAI Verification ➔ Acceptance Rules ➔ Financial Settlement Release.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs font-mono text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-200 font-bold">
            Zero-Dispute SLA Standard
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. OUTCOME ACCEPTANCE ENGINE (Core Infrastructure)                       */}
      {/* ========================================================================= */}
      {operationalPillar === 'acceptance' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 font-mono">
                  INDUSTRIAL GOVERNANCE & SETTLEMENT PROTOCOL
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  Autonomous Acceptance Engine
                </h2>
                <p className="text-xs text-gray-500">
                  Inspects technician work orders, matches customer specifications, detects discrepancies, and authorizes settlement.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {SAMPLE_WORK_ORDERS.map((wo) => (
                  <button
                    key={wo.id}
                    onClick={() => {
                      setSelectedWO(wo);
                      setSettled(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      selectedWO.id === wo.id
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {wo.workOrderNumber} ({wo.workflowCategory.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>

            {/* The 5-Link Chain */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              {[
                { key: 'trigger', step: '01', title: '1. Incident Trigger', sub: 'ERP / Portal Work Order' },
                { key: 'work', step: '02', title: '2. Field Dispatch', sub: 'Certified Execution' },
                { key: 'evidence', step: '03', title: '3. Evidence Ingestion', sub: 'EXIF, Sensor, Geotag' },
                { key: 'verification', step: '04', title: '4. Rule Acceptance', sub: 'ProofAI Attestation' },
                { key: 'settlement', step: '05', title: '5. Settlement Release', sub: 'Contractor Payment' },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActiveChainStep(s.key as any)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    activeChainStep === s.key
                      ? 'border-cyan-600 ring-2 ring-cyan-100 bg-cyan-50/30 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold text-gray-400 mb-1">{s.step}</div>
                  <div className="font-bold text-sm text-gray-900">{s.title}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{s.sub}</div>
                  <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Validated
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Evidence & Acceptance Inspector */}
            <div className="pt-4 border-t border-gray-100 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{selectedWO.title}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {selectedWO.propertyLocation} • Authorized Vendor: <strong>{selectedWO.assignedContractor}</strong>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Authorized Valuation</div>
                  <div className="text-2xl font-black text-gray-900">${selectedWO.invoiceAmount.toFixed(2)}</div>
                </div>
              </div>

              {/* Before vs After Photos */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <span>Pre-Maintenance Condition (Fault State)</span>
                    <span className="font-mono text-gray-400">11:45 AM</span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-gray-300 aspect-[4/3] bg-gray-100 shadow-inner">
                    <img
                      src={selectedWO.chain.evidence.beforePhoto}
                      alt="Pre-Maintenance"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] px-2.5 py-1 rounded-md font-mono backdrop-blur-sm">
                      SHA-256: 0x8a1f...c09b
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    <span>Post-Maintenance State (OEM Taco 007-F5 Installed)</span>
                    <span className="font-mono text-emerald-600">01:05 PM</span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 aspect-[4/3] bg-gray-100 shadow-md">
                    <img
                      src={selectedWO.chain.evidence.afterPhoto}
                      alt="Post-Maintenance"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5" /> Acceptance Criteria Satisfied
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] px-2.5 py-1 rounded-md font-mono backdrop-blur-sm">
                      SHA-256: 0x4f2b...99ee
                    </div>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Doneproof™ Attestation Oracle</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Merkle Verification: <code className="text-cyan-800 font-bold">{selectedWO.chain.verification.merkleProofHash.substring(0, 24)}...</code>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRunVerification}
                    disabled={isVerifying}
                    className="bg-[#12161f] hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isVerifying ? <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" /> : <ShieldCheck className="w-4 h-4 text-cyan-300" />}
                    {isVerifying ? 'Running Attestation...' : 'Execute Attestation Engine'}
                  </button>
                  <button
                    onClick={handleApproveSettlement}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Accept Outcome & Release ${selectedWO.invoiceAmount.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. AUTONOMOUS CLOSEOUT & BILLING PACKET SERVICE                         */}
      {/* ========================================================================= */}
      {operationalPillar === 'closeout' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-500 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                  FIELD CLOSEOUT AUTOMATION & BILLING VALIDATION
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  Closeout & Invoice-Support Orchestrator
                </h2>
                <p className="text-xs text-gray-500">
                  Assembles field work orders, technician logs, PO numbers, and client compliance criteria into verified, audit-proof billing packets.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 text-blue-900 px-4 py-2 rounded-xl text-xs font-bold">
                Enterprise Pilot: 10 Deployments ➔ $750 / Month SLA
              </div>
            </div>

            {/* Packet Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-2">Field Missions:</span>
              {closeoutPackets.map((pkt) => (
                <button
                  key={pkt.id}
                  onClick={() => {
                    setSelectedPacket(pkt);
                    setPacketGenerated(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    selectedPacket.id === pkt.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {pkt.workOrderNumber} ({pkt.billingReadinessStatus === 'BILLING_READY' ? 'Verified Ready' : 'Compliance Exception'})
                </button>
              ))}
            </div>

            {/* Live Packet Breakdown */}
            <div className="grid md:grid-cols-2 gap-8 pt-2">
              {/* Requirements & Tech Notes */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-500">Client Compliance Specifications</span>
                    <span className="text-xs font-mono text-gray-400">{selectedPacket.clientName}</span>
                  </div>
                  <ul className="space-y-2 text-xs">
                    {selectedPacket.clientRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-2">
                  <span className="text-xs font-bold uppercase text-gray-500">Technician Telemetry & Field Log</span>
                  <p className="text-xs text-gray-700 leading-relaxed italic bg-white p-3 rounded-xl border border-gray-200">
                    "{selectedPacket.techNotes}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                    <span>Multimodal Assets: <strong>{selectedPacket.photosUploadedCount} images</strong></span>
                    <span>PO Cross-Reference: <strong className="text-gray-900">{selectedPacket.poNumber}</strong></span>
                  </div>
                </div>
              </div>

              {/* Compliance & Assembly Engine */}
              <div className="space-y-4">
                <div className={`rounded-2xl p-6 border transition-all ${
                  selectedPacket.billingReadinessStatus === 'BILLING_READY'
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-amber-50/60 border-amber-300'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Billing Integrity Audit</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      selectedPacket.billingReadinessStatus === 'BILLING_READY'
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-amber-200 text-amber-900'
                    }`}>
                      {selectedPacket.billingReadinessStatus === 'BILLING_READY' ? 'Compliant for Submission' : 'Missing Requisite Evidence'}
                    </span>
                  </div>

                  {selectedPacket.missingEvidence.length > 0 ? (
                    <div className="space-y-2 mb-4">
                      <div className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" /> Detected Compliance Deficiencies:
                      </div>
                      <div className="space-y-1.5">
                        {selectedPacket.missingEvidence.map((err, idx) => (
                          <div key={idx} className="text-xs bg-red-100 text-red-800 p-2 rounded-lg font-medium">
                            • {err}
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2">
                        Submitting this packet without remediation triggers a 21-day accounts payable rejection cycle.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 mb-4">
                      <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> All Customer Acceptance Criteria Verified
                      </div>
                      <p className="text-xs text-gray-600">
                        PO-2026-98124 validated against enterprise ERP database. Vacuum gauge reading and certified recovery logs match line item entries.
                      </p>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-gray-400">Total Valuation</div>
                      <div className="text-2xl font-black text-gray-900">${selectedPacket.invoiceAmount.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleRunCloseoutAIAudit}
                        disabled={isAuditingCloseout}
                        className="bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                      >
                        {isAuditingCloseout ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-300" /> : <Sparkles className="w-3.5 h-3.5 text-cyan-300" />}
                        {isAuditingCloseout ? 'Analyzing Rules...' : 'Run AI Compliance Audit'}
                      </button>

                      <button
                        onClick={handleAssembleCloseout}
                        disabled={isAssembling}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow transition-all"
                      >
                        {isAssembling ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
                        {isAssembling ? 'Validating...' : 'Compile Billing Packet'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live AI Compliance Evaluation Card */}
                {closeoutAuditResult && (
                  <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 font-sans text-xs border border-slate-700 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="font-bold text-cyan-300 flex items-center gap-1.5 font-mono">
                        <BadgeCheck className="w-4 h-4 text-cyan-400" />
                        AI COMPLIANCE SCORE: {closeoutAuditResult.complianceScore}/100
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        closeoutAuditResult.billingReadinessStatus === 'BILLING_READY'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {closeoutAuditResult.billingReadinessStatus}
                      </span>
                    </div>

                    <div className="text-gray-300 leading-relaxed">
                      {closeoutAuditResult.executiveSummary}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                      <div className="bg-white/5 p-2 rounded">
                        <span className="text-gray-400">Rejection Delay Avoided: </span>
                        <span className="text-cyan-300 font-bold">{closeoutAuditResult.estimatedRejectionRiskDays} Days</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded">
                        <span className="text-gray-400">Recommended Next Step: </span>
                        <span className="text-emerald-400 font-bold">{closeoutAuditResult.recommendedAction}</span>
                      </div>
                    </div>
                  </div>
                )}

                {packetGenerated && (
                  <div className="bg-[#12161f] text-white p-5 rounded-2xl space-y-3 font-mono text-xs animate-fadeIn">
                    <div className="flex items-center justify-between text-cyan-300 pb-2 border-b border-gray-800">
                      <span>AUDIT PACKET ASSEMBLED (PDF / JSON SCHEMA)</span>
                      <span>Verified for ERP Ingestion</span>
                    </div>
                    <div className="text-gray-300">
                      Artifact: <strong className="text-white">CLOSEOUT_{selectedPacket.workOrderNumber}_VERIFIED.pdf</strong>
                    </div>
                    <div className="text-gray-400 text-[11px]">
                      Package bundle includes: Verified PO, digital sign-off certificate, timestamped geofenced media, and mechanical logs.
                    </div>
                  </div>
                )}

                {/* Pilot Callout Card */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-5 rounded-2xl border border-blue-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold">
                      Commercial Pilot Program
                    </span>
                    <h5 className="font-bold text-sm text-white mt-0.5">10-Job Contractor Pilot Program</h5>
                    <p className="text-[11px] text-blue-200 mt-0.5">
                      $750 setup fee covers 10 complete job closeouts. 0% invoice rejection guarantee.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPilotModal(true)}
                    className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs whitespace-nowrap transition-all shadow"
                  >
                    Open Pilot Terms ➔
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pilot Enrollment Modal */}
          {showPilotModal && (
            <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-gray-200 shadow-2xl space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase">Twin Cities Commercial Agreement</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-0.5">10-Job AI Closeout Pilot ($750)</h3>
                  </div>
                  <button
                    onClick={() => setShowPilotModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>

                {!pilotSigned ? (
                  <div className="space-y-4 text-xs text-gray-700">
                    <p className="leading-relaxed bg-blue-50 p-3.5 rounded-xl border border-blue-200 text-blue-950">
                      <strong>Pilot Scope:</strong> Contractor submits 10 completed work orders via WhatsApp, email, or web portal. 
                      MetalMindTech AI workers compile customer-compliant billing packets, verify PO numbers, match photos, and audit before/after evidence.
                    </p>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-bold uppercase text-gray-500 block mb-1">Contractor / Company Name</label>
                        <input
                          type="text"
                          value={pilotContractorName}
                          onChange={(e) => setPilotContractorName(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase text-gray-500 block mb-1">Billing Lead Email</label>
                        <input
                          type="email"
                          value={pilotContractorEmail}
                          onChange={(e) => setPilotContractorEmail(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs font-mono">
                      <span>Total Pilot Fee:</span>
                      <span className="font-bold text-gray-900 text-sm">$750.00 USD (Fixed)</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setPilotSigned(true)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow"
                      >
                        Sign & Activate 10-Job Pilot
                      </button>
                      <button
                        onClick={() => setShowPilotModal(false)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-3 rounded-xl text-xs transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-center py-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">Pilot Agreement Executed!</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Welcome, <strong>{pilotContractorName}</strong>. Your dedicated closeout inbox and intake portal have been provisioned. 
                      You can now forward your first 10 field work orders to begin generating audit-ready billing packets.
                    </p>
                    <button
                      onClick={() => {
                        setPilotSigned(false);
                        setShowPilotModal(false);
                      }}
                      className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-black transition-all"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. INDUSTRIAL EXCEPTION DESK & CONTINUITY DESK                           */}
      {/* ========================================================================= */}
      {operationalPillar === 'exceptions' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  INDUSTRIAL PIPELINE CONTINUITY & SELF-HEALING
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  Autonomous Exception Resolution Desk
                </h2>
                <p className="text-xs text-gray-500">
                  Continuous workflow observability when real-world operational breakdowns occur. Agents investigate causes and prepare executable fixes.
                </p>
              </div>
              <div className="text-xs font-mono bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl font-bold border border-slate-200">
                Monitoring Pipeline: ERP ➔ Work Order ➔ Docs ➔ Accounting ➔ Approval
              </div>
            </div>

            {/* Exception Incident Stream */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Active Operational Breakdown Incidents (Real-Time Remediation Queue)
              </div>

              <div className="space-y-3">
                {exceptions.map((exc) => {
                  const isResolved = resolvedIds.includes(exc.id);
                  return (
                    <div
                      key={exc.id}
                      className={`p-6 rounded-2xl border transition-all ${
                        isResolved
                          ? 'bg-emerald-50/40 border-emerald-300 opacity-80'
                          : 'bg-white border-gray-200 hover:border-slate-400 shadow-sm'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {isResolved ? 'REMEDIATED & COMMITTED' : exc.failedStep}
                          </span>
                          <span className="text-xs font-mono text-gray-400">{exc.timeAgo}</span>
                        </div>
                        <span className="text-xs font-mono text-gray-500">{exc.workflowChain}</span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="font-bold text-red-600 mb-1">Operational Anomaly Detected:</div>
                          <p className="text-gray-700 bg-red-50/50 p-3 rounded-xl border border-red-200">
                            {exc.detectedProblem}
                          </p>
                        </div>

                        <div>
                          <div className="font-bold text-blue-700 mb-1">Autonomous Agent Diagnostic:</div>
                          <p className="text-gray-700 bg-blue-50/50 p-3 rounded-xl border border-blue-200">
                            {exc.agentInvestigation}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-xs text-gray-600">
                          <strong>Prepared Remediation Action: </strong> {exc.preparedResolution}
                        </div>
                        {!isResolved ? (
                          <button
                            onClick={() => handleResolveException(exc.id)}
                            className="bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                            Commit Agent Fix ➔
                          </button>
                        ) : (
                          <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Pipeline Restored in ERP
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DoneproofDiamond;
