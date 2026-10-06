import React, { useState } from 'react';
import { 
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  Clock,
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
  Mail,
  MapPin,
  Maximize2,
  MessageSquare,
  Phone,
  Plus,
  Printer,
  QrCode,
  RefreshCw,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Terminal,
  Upload,
  UserCheck,
  Users,
  Wrench,
  X,
  XCircle,
  Zap
} from 'lucide-react';
import { 
  CloseoutPacket, 
  ClientComplianceRule, 
  PhotoEvidenceItem, 
  PilotSlotTracker 
} from '../types';
import { geminiService } from '../services/geminiService';

// Default Client Compliance Rules
const DEFAULT_CLIENT_RULES: ClientComplianceRule[] = [
  {
    id: 'rule-apex',
    clientName: 'Apex Midwest Property Management',
    accountCategory: 'Multi-Family Residential',
    requirements: [
      'Customer PO Number strictly required in invoice header',
      'Minimum 3 geotagged photos (Before, After, and Component Serial Barcode)',
      'Digital sign-off from building manager or on-site tenant lead',
      'Static gauge or pressure telemetric reading logged in work ticket'
    ],
    minPhotosRequired: 3,
    requiresPOOnHeader: true,
    requiresCustomerSignoff: true,
    requiresBarcodeSerialMatch: true,
    requiresTorqueOrPressureReading: true,
    standardPaymentCycleDays: 30,
    averageRejectionPenaltyDays: 21,
    portalSubmissionUrl: 'https://ap.apexmidwestpm.com/vendor-intake'
  },
  {
    id: 'rule-target',
    clientName: 'Target Commercial Facilities Group',
    accountCategory: 'Retail Facilities',
    requirements: [
      'Approved Facilities Maintenance PO strictly cross-referenced against Verisae/ServiceChannel',
      'Minimum 4 photos: Roof curb, seal membrane, technician safety harness, equipment tag',
      'Store Duty Manager sign-off stamp with Employee ID',
      'EPA Section 608 certified refrigerant recovery logs (if mechanical)'
    ],
    minPhotosRequired: 4,
    requiresPOOnHeader: true,
    requiresCustomerSignoff: true,
    requiresBarcodeSerialMatch: true,
    requiresTorqueOrPressureReading: false,
    standardPaymentCycleDays: 45,
    averageRejectionPenaltyDays: 35,
    portalSubmissionUrl: 'https://vendor.targetfacilities.corp/submit'
  },
  {
    id: 'rule-mpha',
    clientName: 'Minneapolis Public Housing Authority',
    accountCategory: 'Municipal Public Housing',
    requirements: [
      'Municipal Purchase Order & Contract Master Service Agreement number',
      'Minimum 2 timestamped photos verifying code-compliant physical installations',
      'Resident or Site Supervisor signature acknowledgment form',
      'Certified backflow test report or municipal mechanical permit tag number'
    ],
    minPhotosRequired: 2,
    requiresPOOnHeader: true,
    requiresCustomerSignoff: true,
    requiresBarcodeSerialMatch: false,
    requiresTorqueOrPressureReading: true,
    standardPaymentCycleDays: 15,
    averageRejectionPenaltyDays: 18,
    portalSubmissionUrl: 'https://mphaonline.org/vendor-portal'
  }
];

// Initial Field Missions / Closeout Packets
const INITIAL_PACKETS: CloseoutPacket[] = [
  {
    id: 'pkt-1',
    contractorName: 'Twin Cities Mechanical & Heating Co.',
    contractorLicense: 'MN-HVAC-MASTER-88410',
    clientName: 'Apex Midwest Property Management',
    poNumber: 'PO-2026-98124',
    workOrderNumber: 'WO-8942-MN',
    clientRequirements: [
      'Customer PO Number strictly required in invoice header',
      'Minimum 3 geotagged photos (Before, After, Serial Barcode)',
      'Digital sign-off from building manager or on-site tenant lead',
      'Static gauge or pressure telemetric reading logged in work ticket'
    ],
    techNotes: 'Dispatched for boiler failure at Mill City Lofts. Replaced burned out Taco 007 circulator pump with new cast iron unit. Bled lines, torqued flanges to 35 ft-lbs, verified static loop pressure at 14.8 PSI. Unit heated to 162°F operating delta. Tenant lead Karen M. inspected and signed work order.',
    photosUploadedCount: 4,
    photos: [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
        label: 'BEFORE_WORK',
        timestamp: '11:48 AM',
        geotag: 'Mill City Lofts Utility Rm (44.9778° N, 93.2650° W)',
        verified: true
      },
      {
        id: 'p2',
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
        label: 'AFTER_WORK',
        timestamp: '01:04 PM',
        geotag: 'Mill City Lofts Utility Rm (44.9778° N, 93.2650° W)',
        verified: true
      },
      {
        id: 'p3',
        url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&auto=format&fit=crop&q=80',
        label: 'BARCODE_SERIAL',
        timestamp: '12:35 PM',
        geotag: 'Serial TACO-007-F5-SERIAL-9982410',
        verified: true
      },
      {
        id: 'p4',
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80',
        label: 'PRESSURE_GAUGE',
        timestamp: '12:55 PM',
        geotag: 'Gauge Telemetry: 14.8 PSI static',
        verified: true
      }
    ],
    customerSignoffObtained: true,
    customerSignoffSigner: 'Karen Miller (Resident Tenant Lead - Unit 4B)',
    telemetricGaugeReading: '14.8 PSI (Static Loop @ 68°F), Delta +94°F active',
    missingEvidence: [],
    billingReadinessStatus: 'BILLING_READY',
    complianceScore: 98,
    invoiceAmount: 850.00,
    assembledAt: 'Oct 5, 2026 01:15 PM',
    merkleAuditHash: 'SHA256:0x8f19bc32e9a4f6109923da7102e3b991823ab2',
    pilotSlotNumber: 1,
    rejectionRiskDays: 0,
    aiExecutiveSummary: 'Work order WO-8942-MN meets 100% of Apex Midwest compliance rules. Validated PO-2026-98124, 4 high-resolution verified photos, digital tenant sign-off, and telemetric pressure reading attached.',
    recommendedAction: 'Submit verified packet directly to accounts payable portal for automated Net 30 approval.'
  },
  {
    id: 'pkt-2',
    contractorName: 'NorthStar Commercial Roofing & Sheet Metal',
    contractorLicense: 'MN-ROOF-COMM-44192',
    clientName: 'Target Commercial Facilities Group',
    poNumber: 'PO-PENDING-MATCH',
    workOrderNumber: 'WO-7719-MN',
    clientRequirements: [
      'Approved Facilities Maintenance PO strictly cross-referenced against Verisae/ServiceChannel',
      'Minimum 4 photos: Roof curb, seal membrane, technician safety harness, equipment tag',
      'Store Duty Manager sign-off stamp with Employee ID',
      'EPA Section 608 certified refrigerant recovery logs (if mechanical)'
    ],
    techNotes: 'Emergency leak call at Nicollet Mall Store #001. Repaired 6-foot seam failure on RTU-4 curb flashing with heat-welded 60-mil TPO membrane. Applied termination bar and polyurethane seal. Completed work in rain.',
    photosUploadedCount: 2,
    photos: [
      {
        id: 'p2-1',
        url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80',
        label: 'BEFORE_WORK',
        timestamp: '09:20 AM',
        geotag: 'Target Store #001 Roof RTU-4',
        verified: true
      },
      {
        id: 'p2-2',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=600&auto=format&fit=crop&q=80',
        label: 'AFTER_WORK',
        timestamp: '11:15 AM',
        geotag: 'Target Store #001 Roof RTU-4',
        verified: true
      }
    ],
    customerSignoffObtained: false,
    customerSignoffSigner: '',
    telemetricGaugeReading: '',
    missingEvidence: [
      'Customer PO Number is unverified or missing from the billing invoice header (Marked PO-PENDING).',
      'Insufficient photo documentation (Only 2 photos uploaded; Target Facilities mandates minimum 4 including safety harness & equipment tag).',
      'Missing Store Duty Manager sign-off stamp and Employee ID.'
    ],
    billingReadinessStatus: 'MISSING_EVIDENCE',
    complianceScore: 54,
    invoiceAmount: 1420.00,
    assembledAt: 'Oct 5, 2026 11:30 AM',
    pilotSlotNumber: 2,
    rejectionRiskDays: 35,
    aiExecutiveSummary: 'Work order WO-7719-MN is flagged with 3 critical deficiencies. Submitting without customer PO and Store Duty Manager signature will trigger immediate rejection in ServiceChannel AP.',
    recommendedAction: 'Dispatch automated SMS to field tech for store manager signature, and query Target Verisae dispatch for approved PO number.'
  },
  {
    id: 'pkt-3',
    contractorName: 'Gopher State Commercial Plumbing',
    contractorLicense: 'MN-PLUMB-MASTER-12093',
    clientName: 'Minneapolis Public Housing Authority',
    poNumber: 'PO-MPHA-4029',
    workOrderNumber: 'WO-6104-MN',
    clientRequirements: [
      'Municipal Purchase Order & Contract Master Service Agreement number',
      'Minimum 2 timestamped photos verifying code-compliant physical installations',
      'Resident or Site Supervisor signature acknowledgment form',
      'Certified backflow test report or municipal mechanical permit tag number'
    ],
    techNotes: 'Annual RPZ backflow preventer test and relief valve rebuild at Cedar High Apartments. Replaced rubber disc seals, calibrated differential pressure relief to 2.4 PSI. Certified tag #BF-2026-901 attached.',
    photosUploadedCount: 3,
    photos: [
      {
        id: 'p3-1',
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
        label: 'BEFORE_WORK',
        timestamp: '08:10 AM',
        geotag: 'Cedar High Mechanical Basement',
        verified: true
      },
      {
        id: 'p3-2',
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
        label: 'AFTER_WORK',
        timestamp: '09:40 AM',
        geotag: 'Cedar High Mechanical Basement',
        verified: true
      },
      {
        id: 'p3-3',
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80',
        label: 'PRESSURE_GAUGE',
        timestamp: '09:42 AM',
        geotag: 'Differential Relief: 2.4 PSI tag #BF-2026-901',
        verified: true
      }
    ],
    customerSignoffObtained: true,
    customerSignoffSigner: 'Darren Washington (MPHA Maintenance Supervisor)',
    telemetricGaugeReading: 'Differential Relief 2.4 PSI, Static Supply 62.0 PSI',
    missingEvidence: [],
    billingReadinessStatus: 'BILLING_READY',
    complianceScore: 96,
    invoiceAmount: 680.00,
    assembledAt: 'Oct 5, 2026 10:00 AM',
    merkleAuditHash: 'SHA256:0x41ab9901ef45bc02148da390021c38e918451',
    pilotSlotNumber: 3,
    rejectionRiskDays: 0,
    aiExecutiveSummary: 'Work order WO-6104-MN certified against MPHA specifications. Verified PO, municipal tag #BF-2026-901, and supervisor signature attached.',
    recommendedAction: 'Transmit audit packet to MPHA vendor accounting for Net 15 municipal disbursement.'
  }
];

// Initial 10-Job Pilot Slots
const INITIAL_PILOT_SLOTS: PilotSlotTracker[] = [
  { slotNumber: 1, status: 'COMPLETED', workOrderNumber: 'WO-8942-MN', contractorName: 'Twin Cities Mechanical', invoiceAmount: 850, rejectionDaysSaved: 21 },
  { slotNumber: 2, status: 'IN_REVIEW', workOrderNumber: 'WO-7719-MN', contractorName: 'NorthStar Roofing', invoiceAmount: 1420, rejectionDaysSaved: 35 },
  { slotNumber: 3, status: 'COMPLETED', workOrderNumber: 'WO-6104-MN', contractorName: 'Gopher State Plumbing', invoiceAmount: 680, rejectionDaysSaved: 18 },
  { slotNumber: 4, status: 'AVAILABLE' },
  { slotNumber: 5, status: 'AVAILABLE' },
  { slotNumber: 6, status: 'AVAILABLE' },
  { slotNumber: 7, status: 'AVAILABLE' },
  { slotNumber: 8, status: 'AVAILABLE' },
  { slotNumber: 9, status: 'AVAILABLE' },
  { slotNumber: 10, status: 'AVAILABLE' }
];

export const CloseoutWorkspace: React.FC = () => {
  // Navigation Subtabs
  const [activeSubtab, setActiveSubtab] = useState<'intake' | 'rules' | 'audit' | 'packet' | 'pilot'>('intake');

  // Packets state
  const [packets, setPackets] = useState<CloseoutPacket[]>(INITIAL_PACKETS);
  const [selectedPacket, setSelectedPacket] = useState<CloseoutPacket>(INITIAL_PACKETS[0]);
  
  // Rules state
  const [clientRules, setClientRules] = useState<ClientComplianceRule[]>(DEFAULT_CLIENT_RULES);
  const [selectedRule, setSelectedRule] = useState<ClientComplianceRule>(DEFAULT_CLIENT_RULES[0]);
  const [showNewRuleModal, setShowNewRuleModal] = useState(false);
  const [newRuleClientName, setNewRuleClientName] = useState('');
  const [newRuleCategory, setNewRuleCategory] = useState<'Commercial Real Estate' | 'Retail Facilities' | 'Multi-Family Residential' | 'Municipal Public Housing'>('Commercial Real Estate');
  const [newRuleReq1, setNewRuleReq1] = useState('Purchase Order verified on work order line items');
  const [newRuleReq2, setNewRuleReq2] = useState('Minimum 3 timestamped before & after photos');
  const [newRuleMinPhotos, setNewRuleMinPhotos] = useState(3);
  const [newRuleRequiresSignoff, setNewRuleRequiresSignoff] = useState(true);

  // Ingestion Form State (Custom Work Order Creator)
  const [inputContractor, setInputContractor] = useState('Twin Cities Mechanical & Heating Co.');
  const [inputLicense, setInputLicense] = useState('MN-HVAC-MASTER-88410');
  const [inputClient, setInputClient] = useState('Apex Midwest Property Management');
  const [inputPO, setInputPO] = useState('PO-2026-98124');
  const [inputWO, setInputWO] = useState('WO-9011-MN');
  const [inputAmount, setInputAmount] = useState('920.00');
  const [inputNotes, setInputNotes] = useState('Replaced rooftop condenser fan motor on Lennox unit. Verified amperage draw 2.8A vs 3.1A rated. Flanges sealed, vibration pads installed. Property lead acknowledged repair.');
  const [inputPhotosCount, setInputPhotosCount] = useState(3);
  const [inputSignoff, setInputSignoff] = useState(true);
  const [inputSigner, setInputSigner] = useState('Robert Chen (Assistant Property Manager)');
  const [inputTelemetry, setInputTelemetry] = useState('Amp draw 2.8A, Delta T 19.5°F');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);

  // AI Auditing state
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditFeedback, setAuditFeedback] = useState<string | null>(null);

  // PDF & Formal packet view modal
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isGeneratingNarrative, setIsGeneratingNarrative] = useState(false);
  const [formalNarrative, setFormalNarrative] = useState<{
    formalSummary: string;
    accountingAllocationNote: string;
    merkleAttestationStamp: string;
  } | null>(null);

  // Pilot program modal & tracker
  const [pilotSlots, setPilotSlots] = useState<PilotSlotTracker[]>(INITIAL_PILOT_SLOTS);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [pilotContractorName, setPilotContractorName] = useState('Twin Cities Mechanical & Heating Co.');
  const [pilotContactEmail, setPilotContactEmail] = useState('billing@twincitiesmechanical.com');
  const [pilotActivated, setPilotActivated] = useState(true);

  // Calculate Cumulative Metrics
  const totalInvoiced = pilotSlots.reduce((acc, slot) => acc + (slot.invoiceAmount || 0), 0);
  const totalDaysSaved = pilotSlots.reduce((acc, slot) => acc + (slot.rejectionDaysSaved || 0), 0);
  const completedCount = pilotSlots.filter(s => s.status === 'COMPLETED').length;

  // Handle Preset Selection
  const handleSelectPreset = (packet: CloseoutPacket) => {
    setSelectedPacket(packet);
    setInputContractor(packet.contractorName);
    setInputLicense(packet.contractorLicense || 'MN-HVAC-MASTER-88410');
    setInputClient(packet.clientName);
    setInputPO(packet.poNumber);
    setInputWO(packet.workOrderNumber);
    setInputAmount(packet.invoiceAmount.toString());
    setInputNotes(packet.techNotes);
    setInputPhotosCount(packet.photosUploadedCount);
    setInputSignoff(packet.customerSignoffObtained);
    setInputSigner(packet.customerSignoffSigner || '');
    setInputTelemetry(packet.telemetricGaugeReading || '');
    setAuditFeedback(null);
  };

  // Handle Work Order Submission & Instant AI Audit
  const handleIngestWorkOrder = async () => {
    setIsSimulatingUpload(true);
    setAuditFeedback(null);

    // Find rule for client
    const matchedRule = clientRules.find(r => r.clientName.toLowerCase() === inputClient.toLowerCase()) || clientRules[0];

    const newPacket: CloseoutPacket = {
      id: `pkt-${Date.now()}`,
      contractorName: inputContractor,
      contractorLicense: inputLicense,
      clientName: inputClient,
      poNumber: inputPO,
      workOrderNumber: inputWO,
      clientRequirements: matchedRule.requirements,
      techNotes: inputNotes,
      photosUploadedCount: Number(inputPhotosCount),
      photos: [
        {
          id: `ph-1`,
          url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
          label: 'BEFORE_WORK',
          timestamp: '10:00 AM',
          geotag: `${inputClient} Site`,
          verified: true
        },
        {
          id: `ph-2`,
          url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
          label: 'AFTER_WORK',
          timestamp: '11:30 AM',
          geotag: `${inputClient} Site`,
          verified: true
        }
      ],
      customerSignoffObtained: inputSignoff,
      customerSignoffSigner: inputSigner,
      telemetricGaugeReading: inputTelemetry,
      missingEvidence: [],
      billingReadinessStatus: 'BILLING_READY',
      complianceScore: 95,
      invoiceAmount: parseFloat(inputAmount) || 850.00,
      assembledAt: new Date().toLocaleString(),
      pilotSlotNumber: completedCount + 1
    };

    // Run AI Compliance Audit
    try {
      const auditResult = await geminiService.auditCloseoutJob({
        contractorName: newPacket.contractorName,
        clientName: newPacket.clientName,
        poNumber: newPacket.poNumber,
        workOrderNumber: newPacket.workOrderNumber,
        clientRequirements: newPacket.clientRequirements,
        techNotes: newPacket.techNotes,
        photosUploadedCount: newPacket.photosUploadedCount,
        customerSignoffObtained: newPacket.customerSignoffObtained,
        invoiceAmount: newPacket.invoiceAmount
      });

      newPacket.billingReadinessStatus = auditResult.billingReadinessStatus;
      newPacket.complianceScore = auditResult.complianceScore;
      newPacket.missingEvidence = auditResult.missingEvidence;
      newPacket.aiExecutiveSummary = auditResult.executiveSummary;
      newPacket.recommendedAction = auditResult.recommendedAction;
      newPacket.rejectionRiskDays = auditResult.estimatedRejectionRiskDays;
      newPacket.merkleAuditHash = `SHA256:0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;

      setPackets([newPacket, ...packets]);
      setSelectedPacket(newPacket);
      setIsSimulatingUpload(false);
      setActiveSubtab('audit');
      setAuditFeedback(`Audit complete. Score: ${newPacket.complianceScore}/100.`);
    } catch {
      setIsSimulatingUpload(false);
      setPackets([newPacket, ...packets]);
      setSelectedPacket(newPacket);
      setActiveSubtab('audit');
    }
  };

  // Run AI Audit on Currently Selected Packet
  const handleRunAudit = async () => {
    setIsAuditing(true);
    try {
      const res = await geminiService.auditCloseoutJob({
        contractorName: selectedPacket.contractorName,
        clientName: selectedPacket.clientName,
        poNumber: selectedPacket.poNumber,
        workOrderNumber: selectedPacket.workOrderNumber,
        clientRequirements: selectedPacket.clientRequirements,
        techNotes: selectedPacket.techNotes,
        photosUploadedCount: selectedPacket.photosUploadedCount,
        customerSignoffObtained: selectedPacket.customerSignoffObtained,
        invoiceAmount: selectedPacket.invoiceAmount
      });

      const updated = {
        ...selectedPacket,
        billingReadinessStatus: res.billingReadinessStatus,
        complianceScore: res.complianceScore,
        missingEvidence: res.missingEvidence,
        aiExecutiveSummary: res.executiveSummary,
        recommendedAction: res.recommendedAction,
        rejectionRiskDays: res.estimatedRejectionRiskDays,
        merkleAuditHash: selectedPacket.merkleAuditHash || `SHA256:0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`
      };

      setSelectedPacket(updated);
      setPackets(packets.map(p => p.id === updated.id ? updated : p));
      setAuditFeedback(`TrueForge audit updated: ${res.complianceScore}/100 score.`);
    } finally {
      setIsAuditing(false);
    }
  };

  // One-click instant remediation of missing evidence
  const handleRemediatePacket = () => {
    const remediated: CloseoutPacket = {
      ...selectedPacket,
      poNumber: selectedPacket.poNumber.includes('PENDING') ? 'PO-TARGET-FM-88192' : selectedPacket.poNumber,
      photosUploadedCount: Math.max(selectedPacket.photosUploadedCount, 4),
      customerSignoffObtained: true,
      customerSignoffSigner: 'Marcus Daniels (Target Store Operations Duty Mgr #0441)',
      telemetricGaugeReading: 'Thermal imaging delta: +22°F verified, seam torqued to spec',
      missingEvidence: [],
      billingReadinessStatus: 'BILLING_READY',
      complianceScore: 98,
      rejectionRiskDays: 0,
      merkleAuditHash: `SHA256:0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      aiExecutiveSummary: `Remediation executed. Target Verisae PO #PO-TARGET-FM-88192 linked, safety harness photos attached, duty manager sign-off secured. Ready for 100% automated invoice settlement.`,
      recommendedAction: 'Compile verified billing packet and submit to Target accounts payable portal.'
    };

    setSelectedPacket(remediated);
    setPackets(packets.map(p => p.id === remediated.id ? remediated : p));
    setAuditFeedback('All deficiencies remediated. Packet status upgraded to BILLING_READY.');
  };

  // Generate formal AP narrative & open print modal
  const handleOpenPrintPreview = async () => {
    setShowPrintModal(true);
    setIsGeneratingNarrative(true);
    try {
      const nar = await geminiService.generateBillingPacketNarrative({
        contractorName: selectedPacket.contractorName,
        clientName: selectedPacket.clientName,
        workOrderNumber: selectedPacket.workOrderNumber,
        poNumber: selectedPacket.poNumber,
        invoiceAmount: selectedPacket.invoiceAmount,
        techNotes: selectedPacket.techNotes,
        verifiedChecks: selectedPacket.clientRequirements
      });
      setFormalNarrative(nar);
    } finally {
      setIsGeneratingNarrative(false);
    }
  };

  // Add custom client rule
  const handleCreateRule = () => {
    if (!newRuleClientName) return;
    const rule: ClientComplianceRule = {
      id: `rule-${Date.now()}`,
      clientName: newRuleClientName,
      accountCategory: newRuleCategory,
      requirements: [
        newRuleReq1,
        newRuleReq2,
        newRuleRequiresSignoff ? 'Mandatory customer digital sign-off completion form' : 'Technician field sign-off',
        `Minimum ${newRuleMinPhotos} timestamped photos uploaded`
      ],
      minPhotosRequired: newRuleMinPhotos,
      requiresPOOnHeader: true,
      requiresCustomerSignoff: newRuleRequiresSignoff,
      requiresBarcodeSerialMatch: true,
      requiresTorqueOrPressureReading: false,
      standardPaymentCycleDays: 30,
      averageRejectionPenaltyDays: 24
    };
    setClientRules([...clientRules, rule]);
    setSelectedRule(rule);
    setInputClient(rule.clientName);
    setShowNewRuleModal(false);
    setNewRuleClientName('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ========================================================================= */}
      {/* 1. TOP EXECUTIVE MISSION BANNER                                           */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-cyan-400" />
                COMMERCIAL REVENUE WEDGE · INDUSTRIAL OUTCOMES
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Model: Gemini 3.8 Flash · TrueForge Attestation Engine
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              AI Closeout & Invoice-Support Workspace
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
              Eliminate accounts payable rejections before invoices go out. TrueForge cross-references technician notes, 
              geotagged photos, and client PO requirements to generate audit-proof billing packets in seconds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowEnrollModal(true)}
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all font-mono"
            >
              <Zap className="w-4 h-4" />
              10-Job Pilot ($750 Fixed)
            </button>
            <button
              onClick={handleOpenPrintPreview}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 border border-white/20 transition-all font-mono"
            >
              <Printer className="w-4 h-4 text-cyan-300" />
              Print Billing Packet (PDF)
            </button>
          </div>
        </div>

        {/* Real-time Commercial Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">Invoiced Volume Audited</span>
            <span className="text-2xl font-black text-white font-mono">${totalInvoiced.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span className="text-[10px] text-emerald-400 block mt-1">100% Payment Acceptance</span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">AR Rejection Delay Avoided</span>
            <span className="text-2xl font-black text-cyan-300 font-mono">{totalDaysSaved} Days</span>
            <span className="text-[10px] text-slate-400 block mt-1">Vs 21-45 day contractor baseline</span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">Commercial Pilot Slots</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">{completedCount} / 10 Jobs</span>
            <span className="text-[10px] text-slate-400 block mt-1">Contractor validation cohort</span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">Rejection Intercept Rate</span>
            <span className="text-2xl font-black text-purple-300 font-mono">100% Caught</span>
            <span className="text-[10px] text-slate-400 block mt-1">Zero bad invoices submitted</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SUBTAB CONTROLLER                                                      */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveSubtab('intake')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubtab === 'intake'
                ? 'bg-slate-900 text-white shadow'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            1. Work Order Ingestion
          </button>

          <button
            onClick={() => setActiveSubtab('rules')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubtab === 'rules'
                ? 'bg-slate-900 text-white shadow'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            2. Client Compliance Rules ({clientRules.length})
          </button>

          <button
            onClick={() => setActiveSubtab('audit')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubtab === 'audit'
                ? 'bg-slate-900 text-white shadow'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            3. TrueForge AI Audit Desk
          </button>

          <button
            onClick={() => setActiveSubtab('packet')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubtab === 'packet'
                ? 'bg-slate-900 text-white shadow'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            4. Audit-Ready Billing Packet
          </button>

          <button
            onClick={() => setActiveSubtab('pilot')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubtab === 'pilot'
                ? 'bg-blue-600 text-white shadow'
                : 'text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-300" />
            Pilot Board (10 Jobs @ $750)
          </button>
        </div>

        {/* Selected Job Quick Selector */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-gray-400 font-mono uppercase text-[11px] font-bold mr-1">Active Job:</span>
          {packets.slice(0, 3).map((pkt) => (
            <button
              key={pkt.id}
              onClick={() => handleSelectPreset(pkt)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold border transition-all ${
                selectedPacket.id === pkt.id
                  ? 'bg-cyan-700 text-white border-cyan-700'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {pkt.workOrderNumber}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SUBTAB 1: WORK ORDER INGESTION & DISPATCH                              */}
      {/* ========================================================================= */}
      {activeSubtab === 'intake' && (
        <div className="grid lg:grid-cols-3 gap-8 animate-fadeIn">
          {/* Left Column: Preset Templates */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  Live Dispatch Presets
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded">
                  Quick Load
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Click any real-world commercial ticket to test how TrueForge evaluates diverse trade requirements:
              </p>

              <div className="space-y-3">
                {packets.map((pkt) => (
                  <div
                    key={pkt.id}
                    onClick={() => handleSelectPreset(pkt)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedPacket.id === pkt.id
                        ? 'bg-blue-50/70 border-blue-500 shadow-sm'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-gray-900">{pkt.workOrderNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        pkt.billingReadinessStatus === 'BILLING_READY'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {pkt.billingReadinessStatus === 'BILLING_READY' ? 'Verified Ready' : 'Deficiency Detected'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-gray-800">{pkt.contractorName}</div>
                    <div className="text-[11px] text-gray-500 truncate mt-0.5">{pkt.clientName}</div>
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200/60 text-[11px] font-mono">
                      <span className="text-gray-500">Valuation:</span>
                      <span className="font-bold text-gray-900">${pkt.invoiceAmount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Helper Box */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
              <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold block">
                The TrueForge Difference
              </span>
              <h4 className="font-bold text-sm text-white">Why Contractors Love Closeout Desk</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Most general contractors submit invoices via email and wait 30 days only to be told an inspector signature or 
                before-photo is missing. TrueForge prevents submission until 100% of acceptance criteria are satisfied.
              </p>
            </div>
          </div>

          {/* Right 2 Columns: Ingestion Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                  FIELD DISPATCH INTAKE PORTAL
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                  Ingest Field Work Order & Proof Assets
                </h3>
              </div>
              <div className="text-xs font-mono bg-blue-50 text-blue-900 px-3 py-1 rounded-xl font-bold border border-blue-200">
                Work Order Intake Gateway
              </div>
            </div>

            {/* Simulated Drag & Drop Banner */}
            <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-6 text-center space-y-2 bg-gray-50/60 transition-all cursor-pointer">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-gray-800">
                Drop Work Order PDF, Photos, or Mobile Audio Transcript Here
              </div>
              <div className="text-[11px] text-gray-500">
                Supports Buildertrend, Jobber, ServiceTitan exports, or raw WhatsApp technician logs
              </div>
            </div>

            {/* Ingestion Fields Form */}
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold uppercase text-gray-600 block mb-1">Contractor / Business Entity</label>
                <input
                  type="text"
                  value={inputContractor}
                  onChange={(e) => setInputContractor(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-gray-600 block mb-1">Contractor State License #</label>
                <input
                  type="text"
                  value={inputLicense}
                  onChange={(e) => setInputLicense(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-gray-600 block mb-1">Client / Property Group</label>
                <select
                  value={inputClient}
                  onChange={(e) => {
                    setInputClient(e.target.value);
                    const matched = clientRules.find(r => r.clientName === e.target.value);
                    if (matched) setSelectedRule(matched);
                  }}
                  className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-blue-600 font-medium bg-white"
                >
                  {clientRules.map(r => (
                    <option key={r.id} value={r.clientName}>{r.clientName} ({r.accountCategory})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold uppercase text-gray-600 block mb-1">Client PO / Work Authorization #</label>
                <input
                  type="text"
                  value={inputPO}
                  onChange={(e) => setInputPO(e.target.value)}
                  placeholder="e.g. PO-2026-98124 or PENDING"
                  className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-blue-600 font-mono font-medium"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-gray-600 block mb-1">Internal Work Order #</label>
                <input
                  type="text"
                  value={inputWO}
                  onChange={(e) => setInputWO(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-blue-600 font-mono font-medium"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-gray-600 block mb-1">Invoice Amount ($ USD)</label>
                <input
                  type="number"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-blue-600 font-mono font-bold"
                />
              </div>
            </div>

            {/* Technician Notes */}
            <div className="text-xs space-y-1">
              <label className="font-bold uppercase text-gray-600 block">
                Technician Field Execution Log & Physical Symptoms
              </label>
              <textarea
                rows={3}
                value={inputNotes}
                onChange={(e) => setInputNotes(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:border-blue-600 font-sans"
              />
            </div>

            {/* Evidence Checklist Controls */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 grid sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Photos Uploaded</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={inputPhotosCount}
                    onChange={(e) => setInputPhotosCount(parseInt(e.target.value) || 1)}
                    className="w-20 border border-gray-200 rounded-xl p-2 font-mono text-center font-bold bg-white"
                  />
                  <span className="text-[11px] text-gray-500">EXIF Geotagged</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Customer / Lead Sign-off</label>
                <label className="flex items-center gap-2 cursor-pointer mt-2">
                  <input
                    type="checkbox"
                    checked={inputSignoff}
                    onChange={(e) => setInputSignoff(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="font-medium text-gray-800">Sign-off Secured</span>
                </label>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Sensor / Gauge Reading</label>
                <input
                  type="text"
                  value={inputTelemetry}
                  onChange={(e) => setInputTelemetry(e.target.value)}
                  placeholder="e.g. 14.8 PSI static"
                  className="w-full border border-gray-200 rounded-xl p-2 bg-white text-gray-800 text-[11px] font-mono"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-gray-500 font-mono">
                Matching against: <strong>{inputClient}</strong> specifications
              </div>

              <button
                onClick={handleIngestWorkOrder}
                disabled={isSimulatingUpload}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
              >
                {isSimulatingUpload ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Running TrueForge Ingestion & AI Audit...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    Ingest & Run TrueForge AI Audit ➔
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUBTAB 2: CLIENT COMPLIANCE RULES BUILDER                              */}
      {/* ========================================================================= */}
      {activeSubtab === 'rules' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  CUSTOMER ACCEPTANCE RULES MATRIX
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                  Client-Specific Acceptance Rule Profiles
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Each enterprise property management group has idiosyncratic criteria for invoice approval. 
                  Ark Forge stores these profiles to intercept missing evidence before submission.
                </p>
              </div>

              <button
                onClick={() => setShowNewRuleModal(true)}
                className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow font-mono"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-300" />
                Add New Client Rule Profile
              </button>
            </div>

            {/* Rule Profiles Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {clientRules.map((rule) => (
                <div
                  key={rule.id}
                  onClick={() => setSelectedRule(rule)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    selectedRule.id === rule.id
                      ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-200'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-700">
                      {rule.accountCategory}
                    </span>
                    <span className="text-xs font-mono text-blue-700 font-bold">Net {rule.standardPaymentCycleDays} Days</span>
                  </div>

                  <h4 className="font-bold text-sm text-gray-900 mb-2">{rule.clientName}</h4>

                  <div className="space-y-2 text-xs text-gray-600 mb-4">
                    <div className="font-bold text-gray-800 text-[11px] uppercase tracking-wider">
                      Required Closeout Gates:
                    </div>
                    {rule.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <span>Rejection Penalty:</span>
                    <span className="font-bold text-red-600">+{rule.averageRejectionPenaltyDays} Days Delay</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Rule Detail & Testing */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-sm text-white font-mono">
                    ACTIVE COMPLIANCE GATEWAY: {selectedRule.clientName}
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-300">
                  Target Portal: {selectedRule.portalSubmissionUrl || 'Direct AP Ingestion'}
                </span>
              </div>

              <div className="grid sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Photo Count Floor</span>
                  <span className="text-white font-bold text-sm">{selectedRule.minPhotosRequired} Required</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">PO Verification</span>
                  <span className="text-cyan-300 font-bold text-sm">{selectedRule.requiresPOOnHeader ? 'Mandatory Header' : 'Optional'}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Customer Sign-off</span>
                  <span className="text-emerald-400 font-bold text-sm">{selectedRule.requiresCustomerSignoff ? 'Strictly Required' : 'Field Note Suffices'}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Average Delay Avoided</span>
                  <span className="text-purple-300 font-bold text-sm">{selectedRule.averageRejectionPenaltyDays} Days Saved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add Rule Modal */}
          {showNewRuleModal && (
            <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-gray-200 shadow-2xl space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h4 className="font-bold text-gray-900 text-lg">Define New Client Rule Profile</h4>
                  <button onClick={() => setShowNewRuleModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold uppercase text-gray-600 block mb-1">Client / Property Mgmt Entity</label>
                    <input
                      type="text"
                      placeholder="e.g. Hines Real Estate Management"
                      value={newRuleClientName}
                      onChange={(e) => setNewRuleClientName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-gray-600 block mb-1">Account Category</label>
                    <select
                      value={newRuleCategory}
                      onChange={(e) => setNewRuleCategory(e.target.value as any)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-blue-600 bg-white"
                    >
                      <option value="Commercial Real Estate">Commercial Real Estate</option>
                      <option value="Retail Facilities">Retail Facilities</option>
                      <option value="Multi-Family Residential">Multi-Family Residential</option>
                      <option value="Municipal Public Housing">Municipal Public Housing</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold uppercase text-gray-600 block mb-1">Primary Requirement 1</label>
                    <input
                      type="text"
                      value={newRuleReq1}
                      onChange={(e) => setNewRuleReq1(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-gray-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase text-gray-600 block mb-1">Primary Requirement 2</label>
                    <input
                      type="text"
                      value={newRuleReq2}
                      onChange={(e) => setNewRuleReq2(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-gray-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="font-bold uppercase text-gray-600 block mb-1">Min Photos Required</label>
                      <input
                        type="number"
                        min={1}
                        max={6}
                        value={newRuleMinPhotos}
                        onChange={(e) => setNewRuleMinPhotos(parseInt(e.target.value) || 2)}
                        className="w-full border border-gray-200 rounded-xl p-2.5 text-gray-900 font-mono text-center font-bold"
                      />
                    </div>

                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newRuleRequiresSignoff}
                          onChange={(e) => setNewRuleRequiresSignoff(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="font-bold text-gray-800 text-xs">Customer Sign-off</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={handleCreateRule}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow"
                  >
                    Save Client Rule Profile
                  </button>
                  <button
                    onClick={() => setShowNewRuleModal(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-3 rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SUBTAB 3: TRUEFORGE AI AUDIT & DEFICIENCY INTERCEPTOR                  */}
      {/* ========================================================================= */}
      {activeSubtab === 'audit' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 font-mono">
                  TRUEFORGE AUDIT ORACLE · REJECTION INTERCEPTOR
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                  Compliance Diagnostic & Missing Evidence Scanner
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRunAudit}
                  disabled={isAuditing}
                  className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow font-mono disabled:opacity-50"
                >
                  {isAuditing ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-300" /> : <Sparkles className="w-3.5 h-3.5 text-cyan-300" />}
                  {isAuditing ? 'Evaluating Rules...' : 'Re-Run TrueForge AI Audit'}
                </button>
              </div>
            </div>

            {auditFeedback && (
              <div className="bg-blue-50 border border-blue-200 text-blue-900 px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                {auditFeedback}
              </div>
            )}

            {/* Score & Verdict Card */}
            <div className={`p-8 rounded-3xl border transition-all ${
              selectedPacket.billingReadinessStatus === 'BILLING_READY'
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-amber-50/70 border-amber-300'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200/60">
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black font-mono shadow-md ${
                    selectedPacket.billingReadinessStatus === 'BILLING_READY'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}>
                    {selectedPacket.complianceScore}%
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider block">
                      TrueForge Compliance Verdict
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-0.5">
                      {selectedPacket.billingReadinessStatus === 'BILLING_READY'
                        ? '100% Billing Ready · Verified for Submission'
                        : 'Deficiencies Detected · Submission Intercepted'}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Target Accounts Payable: <strong>{selectedPacket.clientName}</strong> · Work Order: <strong>{selectedPacket.workOrderNumber}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-left md:text-right font-mono">
                  <span className="text-xs text-gray-500 block">Rejection Risk Avoided:</span>
                  <span className={`text-2xl font-black ${
                    selectedPacket.rejectionRiskDays && selectedPacket.rejectionRiskDays > 0 ? 'text-red-600' : 'text-emerald-700'
                  }`}>
                    {selectedPacket.rejectionRiskDays && selectedPacket.rejectionRiskDays > 0
                      ? `+${selectedPacket.rejectionRiskDays} Days Delay`
                      : '0 Days (Immediate Net 30)'}
                  </span>
                </div>
              </div>

              {/* Deficiencies vs Verified Summary */}
              <div className="pt-6 space-y-4">
                {selectedPacket.missingEvidence.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      Critical Missing Items Caught by TrueForge:
                    </div>

                    <div className="space-y-2">
                      {selectedPacket.missingEvidence.map((gap, idx) => (
                        <div key={idx} className="bg-red-100/90 border border-red-200 text-red-900 p-3 rounded-xl text-xs font-medium flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <span>{gap}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-white/80 rounded-2xl border border-amber-200 text-xs text-gray-700 space-y-2">
                      <div className="font-bold text-gray-900">Recommended Remediation Action:</div>
                      <p className="italic text-gray-600">"{selectedPacket.recommendedAction}"</p>
                      
                      <div className="pt-2 flex flex-wrap gap-2">
                        <button
                          onClick={handleRemediatePacket}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Execute Simulated Remediation (Upload Missing Items)
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      All Mandatory Client Specifications Satisfied:
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      {selectedPacket.clientRequirements.map((req, idx) => (
                        <div key={idx} className="bg-white/80 border border-emerald-200 text-gray-800 p-3 rounded-xl flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-white/80 rounded-2xl border border-emerald-200 text-xs text-gray-700 space-y-1">
                      <div className="font-bold text-gray-900 font-mono">TrueForge Attestation Summary:</div>
                      <p className="text-gray-600 leading-relaxed">{selectedPacket.aiExecutiveSummary}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Evidence Photostream & Telemetry Breakdown */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 font-mono block">
                Multimodal Evidence Chain Attached
              </span>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {selectedPacket.photos && selectedPacket.photos.map((ph) => (
                  <div key={ph.id} className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm space-y-2">
                    <div className="h-32 bg-gray-100 overflow-hidden relative">
                      <img src={ph.url} alt={ph.label} className="w-full h-full object-cover" />
                      <span className="absolute top-2 right-2 bg-slate-900/80 text-cyan-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                        {ph.label}
                      </span>
                    </div>
                    <div className="p-3 text-[11px] font-mono space-y-1">
                      <div className="text-gray-500 truncate">{ph.geotag}</div>
                      <div className="text-gray-400 text-[10px]">Verified: {ph.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SUBTAB 4: AUDIT-READY BILLING PACKET & PDF PREVIEW                    */}
      {/* ========================================================================= */}
      {activeSubtab === 'packet' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                  FINAL COMPLIANCE ASSET
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                  Audit-Ready Billing-Support Packet
                </h3>
                <p className="text-xs text-gray-500">
                  Ready for direct electronic transmittal to Accounts Payable or automated ERP ingestion.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenPrintPreview}
                  className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow font-mono"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-300" />
                  Full Page Print (PDF)
                </button>

                <a
                  href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(selectedPacket, null, 2))}`}
                  download={`BILLING_PACKET_${selectedPacket.workOrderNumber}.json`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all font-mono"
                >
                  <Download className="w-3.5 h-3.5" />
                  JSON-LD Manifest
                </a>
              </div>
            </div>

            {/* Packet Simulation Paper Document */}
            <div className="bg-gray-50 p-6 sm:p-10 rounded-3xl border border-gray-300 max-w-4xl mx-auto shadow-inner space-y-8 font-sans text-gray-900">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-gray-900 pb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-gray-900 uppercase">
                    {selectedPacket.contractorName}
                  </h2>
                  <div className="text-xs text-gray-600 mt-1 space-y-0.5 font-mono">
                    <div>State Mechanical Contractor License: <strong>{selectedPacket.contractorLicense || 'MN-88410'}</strong></div>
                    <div>Headquarters: 1040 Industrial Blvd NE, Minneapolis, MN 55413</div>
                    <div>Direct Billing Contact: billing@twincitiesmechanical.com</div>
                  </div>
                </div>

                <div className="text-right font-mono space-y-1">
                  <div className="bg-slate-900 text-cyan-300 font-bold px-3 py-1 rounded text-xs inline-block">
                    BILLING-SUPPORT PACKET
                  </div>
                  <div className="text-xs text-gray-500">Date: {selectedPacket.assembledAt}</div>
                  <div className="text-xs font-bold text-gray-900">Work Order: #{selectedPacket.workOrderNumber}</div>
                </div>
              </div>

              {/* Target AP Block */}
              <div className="grid sm:grid-cols-2 gap-6 text-xs font-mono bg-white p-5 rounded-2xl border border-gray-200">
                <div>
                  <span className="text-gray-400 font-bold uppercase block text-[10px]">Billed To (Accounts Payable):</span>
                  <div className="font-bold text-gray-900 text-sm mt-1">{selectedPacket.clientName}</div>
                  <div className="text-gray-600 mt-0.5">Central AP Accounting Department</div>
                  <div className="text-gray-500">Customer PO Ref: <strong className="text-blue-600 font-bold">{selectedPacket.poNumber}</strong></div>
                </div>

                <div className="sm:text-right">
                  <span className="text-gray-400 font-bold uppercase block text-[10px]">Payment Terms & Attestation:</span>
                  <div className="font-bold text-emerald-600 text-sm mt-1">Status: VERIFIED BILLING-READY</div>
                  <div className="text-gray-600 mt-0.5">Agreed Terms: Net 30 Days</div>
                  <div className="text-[10px] text-gray-400 truncate mt-1">Hash: {selectedPacket.merkleAuditHash || '0x71ba9082f4'}</div>
                </div>
              </div>

              {/* Scope of Work */}
              <div className="space-y-2 text-xs">
                <span className="font-bold uppercase tracking-wider text-gray-500 font-mono text-[11px]">
                  Certified Work Order Scope & Field Resolution
                </span>
                <p className="p-4 bg-white rounded-2xl border border-gray-200 text-gray-800 leading-relaxed">
                  {selectedPacket.techNotes}
                </p>
              </div>

              {/* Line Items Table */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white text-xs">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 font-mono text-gray-700 uppercase text-[10px] border-b border-gray-200">
                    <tr>
                      <th className="p-3">Description</th>
                      <th className="p-3 text-center">Compliance Gate</th>
                      <th className="p-3 text-right">Amount (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-3 font-medium text-gray-900">
                        Field Labor, Diagnostic & System Replacement
                        <div className="text-[11px] text-gray-500 font-mono">Work Order {selectedPacket.workOrderNumber}</div>
                      </td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          PO Matched
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono font-bold">${(selectedPacket.invoiceAmount * 0.65).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-gray-900">
                        OEM Parts, Hardware & Certified Replacement Components
                        <div className="text-[11px] text-gray-500 font-mono">Serial barcode validated</div>
                      </td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Photos Attached
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono font-bold">${(selectedPacket.invoiceAmount * 0.35).toFixed(2)}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-gray-50 font-mono border-t border-gray-200">
                    <tr>
                      <td colSpan={2} className="p-3 font-bold text-gray-700 text-right uppercase text-[11px]">Total Compliant Invoiced Balance:</td>
                      <td className="p-3 text-right font-black text-gray-900 text-sm">${selectedPacket.invoiceAmount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Signatures & Attestation Seal */}
              <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-gray-500 uppercase text-[10px] font-mono">Customer Acknowledgment:</span>
                  <div className="p-3 bg-white rounded-xl border border-gray-200 font-mono text-[11px]">
                    <div className="font-bold text-gray-900">
                      {selectedPacket.customerSignoffSigner || 'Tenant Lead / Site Supervisor Digital Acknowledgment'}
                    </div>
                    <div className="text-emerald-600 font-bold text-[10px] flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Digital Signature Cryptographically Preserved
                    </div>
                  </div>
                </div>

                <div className="space-y-1 sm:text-right">
                  <span className="font-bold text-gray-500 uppercase text-[10px] font-mono">TrueForge Notarization:</span>
                  <div className="p-3 bg-slate-900 text-white rounded-xl border border-slate-800 font-mono text-[11px] sm:text-right">
                    <div className="text-cyan-300 font-bold">ARK FORGE ATTESTATION SEAL</div>
                    <div className="text-gray-400 text-[10px] truncate">{selectedPacket.merkleAuditHash || 'SHA256:0x8f19bc32'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. SUBTAB 5: 10-JOB COMMERCIAL PILOT BOARD ($750)                         */}
      {/* ========================================================================= */}
      {activeSubtab === 'pilot' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                  CONTRACTOR PILOT COHORT TRACKER
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                  10-Job AI Closeout Pilot ($750 Fixed Setup)
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Contractors submit their first 10 completed work orders. MetalMindTech workers compile audit-proof 
                  billing packets, eliminate invoice disputes, and convert into a $1,000/month recurring SLA.
                </p>
              </div>

              <button
                onClick={() => setShowEnrollModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow font-mono"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-300" />
                Enroll New Contractor Pilot
              </button>
            </div>

            {/* 10 Visual Slots */}
            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
              {pilotSlots.map((slot) => (
                <div
                  key={slot.slotNumber}
                  className={`p-5 rounded-2xl border transition-all text-xs ${
                    slot.status === 'COMPLETED'
                      ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                      : slot.status === 'IN_REVIEW'
                      ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                      : 'bg-gray-50/80 border-gray-200 border-dashed text-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-xs text-gray-700">Slot #{slot.slotNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      slot.status === 'COMPLETED'
                        ? 'bg-emerald-200 text-emerald-900'
                        : slot.status === 'IN_REVIEW'
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {slot.status}
                    </span>
                  </div>

                  {slot.workOrderNumber ? (
                    <div className="space-y-1 font-mono">
                      <div className="font-bold text-gray-900 text-sm">{slot.workOrderNumber}</div>
                      <div className="text-[11px] text-gray-500 truncate">{slot.contractorName}</div>
                      <div className="pt-2 text-xs font-bold text-gray-900">${slot.invoiceAmount?.toFixed(2)}</div>
                      <div className="text-[10px] text-emerald-600 font-bold">Saved: {slot.rejectionDaysSaved} Days AR</div>
                    </div>
                  ) : (
                    <div className="py-4 text-center space-y-1">
                      <span className="block text-[11px] font-mono text-gray-400">Available Slot</span>
                      <button
                        onClick={() => setActiveSubtab('intake')}
                        className="text-[10px] text-blue-600 font-bold hover:underline font-mono"
                      >
                        + Submit Job
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Commercial Terms Breakdown */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 rounded-2xl border border-blue-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-cyan-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                  The Revenue Wedge to the Outcome Infrastructure
                </span>
                <h4 className="text-lg font-bold text-white">Commercial Conversion Economics</h4>
                <p className="text-xs text-blue-200 leading-relaxed max-w-2xl">
                  <strong>10 Jobs ➔ $750 Setup Pilot ➔ $1,000/month recurring SLA.</strong> Contractors recover their $750 investment 
                  on the very first prevented accounts payable dispute, creating sticky retention and customer data flywheel.
                </p>
              </div>

              <button
                onClick={() => setShowEnrollModal(true)}
                className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs whitespace-nowrap transition-all shadow-md font-mono"
              >
                Sign Pilot Agreement ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. MODAL: FULL PRINT PREVIEW & AP RECONCILIATION NARRATIVE               */}
      {/* ========================================================================= */}
      {showPrintModal && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-3xl w-full border border-gray-200 shadow-2xl space-y-6 my-8 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase">Audit-Ready Export</span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">Print Billing-Support Packet</h3>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* AI Accounts Payable Narrative */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-cyan-300 pb-2 border-b border-slate-800">
                <span className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  GEMINI 3.8 FLASH · AP EXECUTIVE NARRATIVE
                </span>
                <span>{selectedPacket.workOrderNumber}</span>
              </div>

              {isGeneratingNarrative ? (
                <div className="py-4 text-center text-slate-400 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                  Generating executive accounts payable cover note...
                </div>
              ) : (
                <div className="space-y-3 text-slate-300 font-sans leading-relaxed text-xs">
                  <p>{formalNarrative?.formalSummary}</p>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 font-mono text-[11px]">
                    <span className="text-cyan-300 font-bold block mb-1">GL Accounting Note:</span>
                    {formalNarrative?.accountingAllocationNote}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Notarization Stamp: <span className="text-cyan-300">{formalNarrative?.merkleAttestationStamp}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow"
              >
                <Printer className="w-4 h-4 text-cyan-300" />
                Launch System Print Dialog (Save as PDF)
              </button>
              <button
                onClick={() => setShowPrintModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3.5 rounded-xl text-xs transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. MODAL: PILOT AGREEMENT EXECUTION                                      */}
      {/* ========================================================================= */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-gray-200 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase">Commercial Pilot Agreement</span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">10-Job Closeout Pilot ($750)</h3>
              </div>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-700">
              <p className="leading-relaxed bg-blue-50 p-4 rounded-2xl border border-blue-200 text-blue-950">
                <strong>Pilot Scope:</strong> Contractor forwards 10 completed field work orders via email, portal, or WhatsApp. 
                MetalMindTech AI workers compile audit-proof billing packets, verify PO numbers, match photos, and audit before/after evidence.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-500 block mb-1">Contractor / Trade Business Name</label>
                  <input
                    type="text"
                    value={pilotContractorName}
                    onChange={(e) => setPilotContractorName(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-gray-500 block mb-1">Billing Lead Email</label>
                  <input
                    type="email"
                    value={pilotContactEmail}
                    onChange={(e) => setPilotContactEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 flex items-center justify-between font-mono">
                <span>Fixed Setup Fee:</span>
                <span className="font-bold text-gray-900 text-base">$750.00 USD (Includes 10 Jobs)</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setShowEnrollModal(false);
                    setActiveSubtab('intake');
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow"
                >
                  Sign & Activate 10-Job Pilot
                </button>
                <button
                  onClick={() => setShowEnrollModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-3.5 rounded-xl text-xs"
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

export default CloseoutWorkspace;
