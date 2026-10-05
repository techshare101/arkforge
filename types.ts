export interface Connector {
  name: string;
  logo: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  companyLogo: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// -------------------------------------------------------------
// 1. AGENT-NATIVE CONVERSION STUDIO TYPES
// -------------------------------------------------------------
export interface ConversionPreset {
  id: string;
  name: string;
  category: 'Local Service & Clinics' | 'B2B SaaS' | 'Field Service' | 'FinTech / Payments';
  tagline: string;
  rawWorkflow: string;
  beforeSteps: string[];
  afterSteps: string[];
  mockResult: ConversionResult;
}

export interface ConversionResult {
  toolDefinition: {
    name: string;
    description: string;
    parameters: Record<string, any>;
  };
  chatGptActionYaml: string;
  mcpToolDeclaration: string;
  authConfig: {
    type: 'OAuth 2.0 PKCE' | 'API Key Token' | 'Delegated Agent JWT';
    scopes: string[];
    spendingLimitPerAction: string;
  };
  safetyGuardrails: string[];
  humanInLoopTriggers: string[];
}

// -------------------------------------------------------------
// 2. ARK LABOR CLOUD TYPES & WORKERS
// -------------------------------------------------------------
export interface ArkWorker {
  id: string;
  name: string;
  codeName: string;
  avatar: string;
  role: string;
  department: string;
  status: 'idle' | 'executing' | 'standby';
  specialization: string;
  hourlyCostEquivalent: number;
  tokensConsumedToday: number;
  reliabilityRate: number;
  recentMission: string;
  isOutcomeVerificationAgent?: boolean;
  isDiscoveryAuditAgent?: boolean;
}

export interface MissionStep {
  stepIndex: number;
  workerName: string;
  phase: 'orchestrator' | 'browser' | 'research' | 'verification' | 'proof' | 'return';
  action: string;
  detail: string;
  status: 'pending' | 'in_progress' | 'completed' | 'flagged';
  durationMs?: number;
  proofHash?: string;
}

export interface LaborMission {
  id: string;
  title: string;
  initiatedBy: string;
  status: 'orchestrating' | 'running' | 'completed' | 'verifying';
  targetQuery: string;
  steps: MissionStep[];
  outputReport?: {
    summary: string;
    prospectsIdentified: Array<{
      name: string;
      rating: number;
      agentReadyScore: number;
      bookingStatus: string;
      failureReason: string;
      contactWorthiness: 'HIGH' | 'MEDIUM' | 'LOW';
      keyInsight: string;
    }>;
    proofAiAuditTrail: {
      merkleRoot: string;
      verifiedWorkerId: string;
      timestamp: string;
      executionTimeSec: number;
    };
  };
}

// -------------------------------------------------------------
// 3. AGENTREADY CERTIFICATION & MONITORING TYPES
// -------------------------------------------------------------
export type JourneyStageKey = 
  | 'discover'
  | 'understand'
  | 'authenticate'
  | 'act'
  | 'verify'
  | 'pay';

export interface StageAuditResult {
  key: JourneyStageKey;
  label: string;
  score: number;
  status: 'passed' | 'warning' | 'failed';
  failureDescription: string;
  technicalImpact: string;
  remediationSnippet: string;
}

export interface AgentReadyAuditReport {
  id: string;
  targetName: string;
  targetUrl: string;
  industry: string;
  overallScore: number;
  certificationGrade: 'A+ (Agent-Native)' | 'A (Certified)' | 'B (Friction Warning)' | 'C (Agent-Impaired)' | 'F (Agent-Inaccessible)';
  stages: Record<JourneyStageKey, StageAuditResult>;
  summary: string;
  revenueLeakageEstimate: string;
  proofBadgeId: string;
  testedAt: string;
}

export interface SyntheticProbeMetric {
  id: string;
  timestamp: string;
  stage: JourneyStageKey;
  latencyMs: number;
  success: boolean;
  message: string;
}

// -------------------------------------------------------------
// 4. THE DIAMOND: DONEPROOF WORK-ORDER VERIFICATION
// -------------------------------------------------------------
export interface DoneproofChecklistItem {
  id: string;
  title: string;
  description: string;
  passed: boolean;
  telemetryEvidence: string;
  verifiedAt: string;
}

export interface WorkOrderProofRecord {
  id: string;
  workOrderNumber: string;
  workflowCategory: 'Property Maintenance' | 'Field Service HVAC' | 'Commercial Plumbing' | 'Tenant Punchlist';
  title: string;
  propertyLocation: string;
  propertyManagerCompany: string;
  assignedContractor: string;
  invoiceAmount: number;
  status: 'SUBMITTED' | 'EVIDENCE_INSPECTED' | 'VERIFIED_AND_SETTLED' | 'DISCREPANCY_FLAGGED';
  
  // The 5-link physical & digital chain
  chain: {
    trigger: { timestamp: string; note: string; source: string };
    work: { timestamp: string; technician: string; durationHours: number };
    evidence: {
      timestamp: string;
      geotag: { lat: number; lng: number; address: string };
      beforePhoto: string;
      afterPhoto: string;
      serialNumberBarcode: string;
      checklists: DoneproofChecklistItem[];
    };
    verification: {
      timestamp: string;
      merkleProofHash: string;
      proofAiConfidenceScore: number; // 0 - 100
      verifiedWorker: string;
      discrepanciesFound: string[];
    };
    settlement: {
      timestamp?: string;
      approvedBy?: string;
      paymentReleaseStatus: 'ESCROW_LOCKED' | 'PAYMENT_RELEASED' | 'APPROVAL_REQUIRED';
      receiptId?: string;
    };
  };
  
  shareableCertificateUrl: string;
}

// -------------------------------------------------------------
// 5. ASTRA OPPORTUNITY RADAR: DIAMOND, GOLD, SILVER
// -------------------------------------------------------------
export interface PhotoEvidenceItem {
  id: string;
  url: string;
  label: 'BEFORE_WORK' | 'AFTER_WORK' | 'BARCODE_SERIAL' | 'PRESSURE_GAUGE' | 'TENANT_SIGNOFF';
  timestamp: string;
  geotag?: string;
  verified: boolean;
}

export interface ClientComplianceRule {
  id: string;
  clientName: string;
  accountCategory: 'Commercial Real Estate' | 'Retail Facilities' | 'Multi-Family Residential' | 'Municipal Public Housing';
  requirements: string[];
  minPhotosRequired: number;
  requiresPOOnHeader: boolean;
  requiresCustomerSignoff: boolean;
  requiresBarcodeSerialMatch: boolean;
  requiresTorqueOrPressureReading: boolean;
  standardPaymentCycleDays: number;
  averageRejectionPenaltyDays: number;
  portalSubmissionUrl?: string;
}

export interface CloseoutPacket {
  id: string;
  contractorName: string;
  contractorLicense?: string;
  clientName: string;
  poNumber: string;
  workOrderNumber: string;
  clientRequirements: string[];
  techNotes: string;
  photosUploadedCount: number;
  photos?: PhotoEvidenceItem[];
  customerSignoffObtained: boolean;
  customerSignoffSigner?: string;
  telemetricGaugeReading?: string;
  missingEvidence: string[];
  billingReadinessStatus: 'BILLING_READY' | 'MISSING_EVIDENCE' | 'EXCEPTION_ROUTED';
  complianceScore: number;
  invoiceAmount: number;
  assembledAt: string;
  merkleAuditHash?: string;
  pilotSlotNumber?: number;
  rejectionRiskDays?: number;
  aiExecutiveSummary?: string;
  recommendedAction?: string;
}

export interface PilotSlotTracker {
  slotNumber: number;
  status: 'COMPLETED' | 'IN_REVIEW' | 'AVAILABLE';
  workOrderNumber?: string;
  contractorName?: string;
  invoiceAmount?: number;
  rejectionDaysSaved?: number;
}

export interface ExceptionDeskIncident {
  id: string;
  workflowChain: string;
  failedStep: string;
  detectedProblem: string;
  agentInvestigation: string;
  preparedResolution: string;
  status: 'INVESTIGATED' | 'AWAITING_HUMAN_CONFIRMATION' | 'AUTO_RESOLVED';
  timeAgo: string;
}

