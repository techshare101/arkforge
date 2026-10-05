import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  BadgeCheck, 
  Camera, 
  Check, 
  CheckCircle2, 
  Clock, 
  Copy, 
  DollarSign, 
  Download, 
  ExternalLink, 
  FileCheck, 
  FileText, 
  Fingerprint, 
  Gem, 
  MapPin, 
  QrCode, 
  RefreshCw, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  Wrench 
} from 'lucide-react';
import { WorkOrderProofRecord } from '../types';
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

export const DoneproofDiamond: React.FC = () => {
  const [selectedWO, setSelectedWO] = useState<WorkOrderProofRecord>(SAMPLE_WORK_ORDERS[0]);
  const [activeChainStep, setActiveChainStep] = useState<'trigger' | 'work' | 'evidence' | 'verification' | 'settlement'>('evidence');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationDone, setVerificationDone] = useState(false);
  const [settled, setSettled] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

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
      setVerificationDone(true);
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(selectedWO.shareableCertificateUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* The Diamond Banner */}
      <div className="bg-[#1a1a1a] rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-[140px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#343CED] rounded-full blur-[130px] opacity-25 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 text-xs font-bold uppercase tracking-wider text-cyan-300 border border-cyan-500/30">
            <Gem className="w-3.5 h-3.5" />
            The Diamond · Proof That an Agent or Field Worker Finished the Job
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Doneproof <span className="text-cyan-300">Verification Engine</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
            "The hidden opportunity is that businesses will need proof between{' '}
            <span className="text-white font-semibold">‘the agent says it did it’</span> and{' '}
            <span className="text-cyan-300 font-semibold">‘the customer accepts the result.’</span>"
            Turn physical work orders into timestamped, before-and-after cryptographic evidence and verified settlement.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-sm">
            <div>
              <div className="text-gray-400 text-xs">Initial Wedge</div>
              <div className="font-bold text-white text-base">Property Maintenance</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Smallest MVP</div>
              <div className="font-bold text-cyan-300 text-base">1 Work-Order Evidence Flow</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Pilot Revenue</div>
              <div className="font-bold text-white text-base">$1,500 Pilot ➔ $499/mo</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Durable Moat</div>
              <div className="font-bold text-emerald-400 text-base">Outcome Evidence Data</div>
            </div>
          </div>
        </div>
      </div>

      {/* The 5-Link Chain Visualizer */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              The Real-World & Digital Chain of Custody
            </h2>
            <p className="text-xs text-gray-500">
              Trigger ➔ Work ➔ Evidence ➔ Verification ➔ Settlement
            </p>
          </div>
          <div className="flex items-center gap-2">
            {SAMPLE_WORK_ORDERS.map((wo) => (
              <button
                key={wo.id}
                onClick={() => {
                  setSelectedWO(wo);
                  setSettled(false);
                  setVerificationDone(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  selectedWO.id === wo.id
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {wo.workOrderNumber} ({wo.workflowCategory.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Chain Steps Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { key: 'trigger', step: '01', title: '1. Trigger', sub: 'Ticket / Request' },
            { key: 'work', step: '02', title: '2. Work', sub: 'Technician Dispatched' },
            { key: 'evidence', step: '03', title: '3. Evidence', sub: 'Photos, Telemetry & GPS' },
            { key: 'verification', step: '04', title: '4. Verification', sub: 'ProofAI Oracle Attest' },
            { key: 'settlement', step: '05', title: '5. Settlement', sub: 'Payment Release' },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveChainStep(s.key as any)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                activeChainStep === s.key
                  ? 'border-cyan-500 ring-2 ring-cyan-100 bg-cyan-50/30 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-gray-400 mb-1">{s.step}</div>
              <div className="font-bold text-sm text-gray-900">{s.title}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">{s.sub}</div>
              <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Captured
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Work Order Proof Inspector */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-8">
        {/* Header summary of the work order */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#343CED] bg-blue-50 px-2.5 py-0.5 rounded">
                {selectedWO.workOrderNumber}
              </span>
              <span className="text-xs text-gray-400 font-medium">|</span>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                {selectedWO.workflowCategory}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{selectedWO.title}</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {selectedWO.propertyLocation}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-gray-400">Invoice Amount</div>
              <div className="text-2xl font-black text-gray-900">${selectedWO.invoiceAmount.toFixed(2)}</div>
            </div>
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
              selectedWO.status === 'VERIFIED_AND_SETTLED'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {selectedWO.status === 'VERIFIED_AND_SETTLED' ? 'Settled & Paid' : 'Awaiting PM Approval'}
            </span>
          </div>
        </div>

        {/* Step 3: Before & After Evidence Canvas */}
        {activeChainStep === 'evidence' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg text-gray-900">Physical Evidence Bundle</h4>
                <p className="text-xs text-gray-500">
                  Cryptographically sealed EXIF metadata, timestamped GPS coordinates, and component barcode.
                </p>
              </div>
              <span className="text-xs font-mono text-gray-400">
                Geotag: {selectedWO.chain.evidence.geotag.lat}, {selectedWO.chain.evidence.geotag.lng}
              </span>
            </div>

            {/* Before vs After Photos */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <span>🔴 Before Work (Corroded Circulator)</span>
                  <span className="font-mono text-gray-400">11:45 AM</span>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-gray-300 aspect-[4/3] bg-gray-100 shadow-inner group">
                  <img
                    src={selectedWO.chain.evidence.beforePhoto}
                    alt="Before Maintenance"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] px-2.5 py-1 rounded-md font-mono backdrop-blur-sm">
                    SHA-256: 0x8a1f...c09b
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  <span>🟢 After Work (New OEM Taco 007-F5 Installed)</span>
                  <span className="font-mono text-emerald-600">01:05 PM</span>
                </div>
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 aspect-[4/3] bg-gray-100 shadow-md group">
                  <img
                    src={selectedWO.chain.evidence.afterPhoto}
                    alt="After Maintenance"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5" /> Installed & Tested
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] px-2.5 py-1 rounded-md font-mono backdrop-blur-sm">
                    SHA-256: 0x4f2b...99ee
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist & Telemetry Rows */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Technician Checklist & Sensor Telemetry
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedWO.chain.evidence.checklists.map((chk) => (
                  <div key={chk.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-gray-900">{chk.title}</span>
                      <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> PASS
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{chk.description}</p>
                    <div className="text-[11px] font-mono text-[#343CED] bg-blue-50 px-2 py-0.5 rounded inline-block mt-1">
                      Sensor: {chk.telemetryEvidence}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Contractor: <strong className="text-gray-900">{selectedWO.assignedContractor}</strong> (License Verified)
              </div>
              <button
                onClick={handleRunVerification}
                disabled={isVerifying}
                className="bg-[#1a1a1a] hover:bg-black text-white px-8 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                    Executing ProofAI Oracle Verification...
                  </>
                ) : (
                  <>
                    <Gem className="w-4 h-4 text-cyan-300" />
                    Verify Evidence with Doneproof Oracle ➔
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Verification Oracle Details */}
        {activeChainStep === 'verification' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 border border-gray-700 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1.5">
                  <Fingerprint className="w-4 h-4" />
                  ProofAI Merkle Evidence Attestation
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
                  Confidence Score: {selectedWO.chain.verification.proofAiConfidenceScore}%
                </span>
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-1">Merkle Root Hash (Immutable Audit Log)</div>
                <div className="font-mono text-cyan-200 text-xs bg-black/50 p-3 rounded-xl break-all border border-gray-800">
                  {selectedWO.chain.verification.merkleProofHash}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
                <div className="bg-white/5 p-3 rounded-xl">
                  <div className="text-gray-400">EXIF Geofence Match</div>
                  <div className="font-bold text-emerald-400 mt-0.5">Mill City Lofts (0.002 mi)</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <div className="text-gray-400">Timestamp Continuity</div>
                  <div className="font-bold text-emerald-400 mt-0.5">11:45 AM ➔ 01:05 PM (Verified)</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <div className="text-gray-400">OEM Barcode Match</div>
                  <div className="font-bold text-emerald-400 mt-0.5">Taco 007-F5 (UL-Listed)</div>
                </div>
              </div>
            </div>

            {/* PM Approval Call to Action */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-gray-900 text-base">
                  Ready for Property Director Sign-off & Payout Release
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  All work verified against work order specs. Clicking approve releases the $850.00 contractor invoice.
                </p>
              </div>
              <button
                onClick={handleApproveSettlement}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all whitespace-nowrap"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve & Release ${selectedWO.invoiceAmount.toFixed(2)}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Settlement & Shareable Certificate */}
        {activeChainStep === 'settlement' && (
          <div className="space-y-6">
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-8 text-center space-y-4 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                <BadgeCheck className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Work Order Verified & Settled</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Payment of <strong>${selectedWO.invoiceAmount.toFixed(2)}</strong> released to {selectedWO.assignedContractor}.
                The tamper-proof completion certificate is now permanently accessible for insurance, property audits, and owner reporting.
              </p>

              <div className="pt-2">
                <div className="font-mono text-xs text-gray-500 bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between">
                  <span className="truncate">{selectedWO.shareableCertificateUrl}</span>
                  <button
                    onClick={handleCopyLink}
                    className="text-xs font-bold text-[#343CED] ml-2 shrink-0 flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedLink ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* The 48-Hour Twin Cities Commercial Move */}
      <div className="bg-gradient-to-r from-gray-900 via-[#1a1a1a] to-gray-900 rounded-3xl p-8 text-white border border-gray-800 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D8FD49] font-bold">
              The Money Path · 48-Hour Validation Move
            </span>
            <h3 className="text-2xl font-bold mt-1">Twin Cities Property Manager Pilot Offer</h3>
          </div>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full font-bold text-cyan-300">
            Validated Sales Script
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <h4 className="font-bold text-base text-gray-200">The Problem You Ask 5 Local Operators:</h4>
            <p className="text-xs text-gray-400 leading-relaxed italic bg-black/40 p-4 rounded-xl border border-gray-800">
              "How much time do your property managers waste chasing HVAC contractors for before/after photos, verifying whether a tenant's heating leak was actually fixed, and arguing over disputed invoices before releasing payment?"
            </p>
            <div className="text-xs text-gray-300 font-semibold">
              ➔ Pitch: "We give you a single shareable Doneproof link for every work order: timestamped photos, GPS, torque/pressure readings, and 1-click settlement sign-off."
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">Commercial Pilot Terms</div>
            <div className="flex items-baseline justify-between">
              <span className="text-gray-300 text-sm">30-Day Paid Setup & Pilot:</span>
              <span className="text-2xl font-black text-white">$1,500</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-white/10 pt-2">
              <span className="text-gray-300 text-sm">Recurring Monthly Fee:</span>
              <span className="text-xl font-bold text-[#D8FD49]">$499 <span className="text-xs text-gray-400">/ property group</span></span>
            </div>
            <div className="text-[11px] text-gray-400 pt-1">
              Includes Doneproof Oracle attestation, contractor mobile upload portal, and AppFolio / Buildium webhook integration.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoneproofDiamond;
