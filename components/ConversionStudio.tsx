import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Copy, 
  Cpu, 
  DollarSign, 
  ExternalLink, 
  FileCode, 
  Layers, 
  Play, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Workflow, 
  Zap,
  Check
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ConversionPreset, ConversionResult } from '../types';

const SAMPLE_PRESETS: ConversionPreset[] = [
  {
    id: 'medspa',
    name: 'Med-Spa & Aesthetic Clinic Booking',
    category: 'Local Service & Clinics',
    tagline: 'Replace multi-step Boulevard/Jane iFrames with instant ChatGPT slot reservation',
    rawWorkflow: `Customer searches clinic website -> clicks "Book Now" -> redirects to third-party booking widget -> scrolls 45 services -> selects provider -> picks time -> enters 12 form fields -> enters SMS verification code -> enters credit card info -> waits for confirmation email.`,
    beforeSteps: [
      'Opens clinic website on mobile or desktop browser',
      'Clicks through confusing multi-tab navigation to find service menu',
      'Redirects to 3rd-party iframe (Boulevard/Jane App)',
      'Manually inputs name, email, phone, and medical intake notes',
      'Solves reCAPTCHA challenge & enters 6-digit SMS OTP',
      'Enters credit card details into interactive iframe'
    ],
    afterSteps: [
      'User tells ChatGPT: "Book my usual $250 HydraFacial with Sarah next Tuesday afternoon"',
      'ChatGPT queries Ark Agent-Native Gateway with user identity token',
      'Gateway checks practitioner calendar & locks optimal 2:00 PM slot',
      'Agent executes authorized pre-approved transaction via Agentic Card',
      'Appointment confirmed in 1.4s with cryptographic ProofAI receipt'
    ],
    mockResult: {
      toolDefinition: {
        name: "book_clinic_appointment",
        description: "Autonomous agent action to check availability, verify pricing, and confirm medical spa appointment.",
        parameters: {
          type: "object",
          properties: {
            service_type: { type: "string", description: "hydrafacial_deluxe | botox_20u | microneedling" },
            preferred_date: { type: "string", description: "ISO 8601 date, e.g. 2026-10-20" },
            practitioner_preference: { type: "string", description: "Optional provider name" },
            spending_limit_usd: { type: "number", description: "Maximum authorized spend" }
          },
          required: ["service_type", "preferred_date", "spending_limit_usd"]
        }
      },
      chatGptActionYaml: `openapi: 3.1.0
info:
  title: Med-Spa Agent-Native Gateway API
  description: Instant zero-touch booking endpoint for ChatGPT & autonomous personal agents.
  version: 1.0.0
servers:
  - url: https://api.arkforge.ai/v1/agent-gateway
paths:
  /appointments/reserve:
    post:
      summary: Reserve appointment slot
      operationId: bookClinicAppointment
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [service_type, preferred_date, spending_limit_usd]
              properties:
                service_type: { type: string }
                preferred_date: { type: string }
                spending_limit_usd: { type: number }
      responses:
        '200':
          description: Slot locked and verified
          content:
            application/json:
              schema:
                type: object
                properties:
                  confirmation_id: { type: string }
                  proof_hash: { type: string }
                  status: { type: string }`,
      mcpToolDeclaration: JSON.stringify({
        name: "ark_clinic_booking",
        description: "Model Context Protocol tool for medical spa appointment discovery and booking",
        inputSchema: {
          type: "object",
          properties: {
            service_type: { type: "string" },
            preferred_date: { type: "string" }
          },
          required: ["service_type", "preferred_date"]
        }
      }, null, 2),
      authConfig: {
        type: "OAuth 2.0 PKCE",
        scopes: ["agent:booking_write", "agent:identity_delegate", "payment:preauth"],
        spendingLimitPerAction: "$350.00 USD"
      },
      safetyGuardrails: [
        "Strict input validation on medical contraindications",
        "Deterministic rate-limit of 3 reservations/hr to prevent automated calendar spam",
        "Prompt injection firewall stripping SQL & instruction override tokens"
      ],
      humanInLoopTriggers: [
        "Patient flags pregnancy or active skin infection",
        "Total price exceeds $350 spending ceiling"
      ]
    }
  },
  {
    id: 'fieldservice',
    name: 'Field Service & HVAC Emergency Dispatch',
    category: 'Field Service',
    tagline: 'Convert complex ServiceTitan / FieldEdge forms into a 1-sentence agent trigger',
    rawWorkflow: `Homeowner experiences furnace failure -> calls dispatch call center -> waits on hold 8 minutes -> explains furnace model -> dispatcher enters manual ticket in CRM -> technician assigned hours later.`,
    beforeSteps: [
      'Customer notices heating failure at 8:00 PM',
      'Goes to Google, finds HVAC business website, searches for emergency page',
      'Calls phone number or fills out 9-field emergency quote form',
      'Dispatcher manually copies customer details into ServiceTitan schedule',
      'Customer waits 45 minutes for SMS confirmation with arrival window'
    ],
    afterSteps: [
      'Customer says to ChatGPT: "My Carrier furnace stopped heating. Dispatch emergency technician under $200 diagnostic fee."',
      'Agent inspects HVAC equipment record from home profile',
      'Agent calls Ark Service Dispatcher tool with geocoded coordinates & equipment serial number',
      'Nearest on-call certified technician automatically assigned in ServiceTitan',
      'Live ETA + diagnostic authorization token returned in 800ms'
    ],
    mockResult: {
      toolDefinition: {
        name: "dispatch_emergency_hvac",
        description: "Creates urgent field dispatch ticket with equipment telemetry and pre-authorized service fee.",
        parameters: {
          type: "object",
          properties: {
            issue_type: { type: "string", description: "no_heat | ac_leak | electrical" },
            equipment_model: { type: "string" },
            postal_code: { type: "string" },
            max_diagnostic_fee: { type: "number" }
          },
          required: ["issue_type", "postal_code", "max_diagnostic_fee"]
        }
      },
      chatGptActionYaml: `openapi: 3.1.0
info:
  title: HVAC Emergency Agent Dispatch API
  version: 1.0.0
paths:
  /dispatch/emergency:
    post:
      summary: Auto-dispatch emergency technician
      operationId: dispatchEmergencyHvac
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [issue_type, postal_code, max_diagnostic_fee]
              properties:
                issue_type: { type: string }
                equipment_model: { type: string }
                postal_code: { type: string }
                max_diagnostic_fee: { type: number }`,
      mcpToolDeclaration: JSON.stringify({
        name: "hvac_dispatch_service",
        description: "Autonomous field service dispatch tool"
      }, null, 2),
      authConfig: {
        type: "Delegated Agent JWT",
        scopes: ["dispatch:emergency", "payment:authorize_diagnostic"],
        spendingLimitPerAction: "$200.00 USD"
      },
      safetyGuardrails: [
        "Gas smell emergency protocol: prompts user immediately to call 911 if gas leak is detected",
        "Geofence validation to prevent dispatching outside licensed service territory"
      ],
      humanInLoopTriggers: [
        "Reported gas or carbon monoxide detector alert",
        "Homeowner does not have confirmed payment method on file"
      ]
    }
  }
];

export const ConversionStudio: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<ConversionPreset>(SAMPLE_PRESETS[0]);
  const [customWorkflow, setCustomWorkflow] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'yaml' | 'schema' | 'auth' | 'guardrails' | 'simulator'>('yaml');
  const [conversionResult, setConversionResult] = useState<ConversionResult>(SAMPLE_PRESETS[0].mockResult);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simulator state
  const [simQuery, setSimQuery] = useState('Book a $250 HydraFacial Deluxe next Tuesday at 2:00 PM');
  const [simRunning, setSimRunning] = useState(false);
  const [simOutput, setSimOutput] = useState<any>(null);

  const handleSelectPreset = (preset: ConversionPreset) => {
    setSelectedPreset(preset);
    setCustomWorkflow(preset.rawWorkflow);
    setConversionResult(preset.mockResult);
    setSimOutput(null);
  };

  const handleConvert = async () => {
    setIsGenerating(true);
    try {
      const textToConvert = customWorkflow || selectedPreset.rawWorkflow;
      const res = await geminiService.convertWorkflow(textToConvert, selectedPreset.category);
      setConversionResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRunSimulation = () => {
    setSimRunning(true);
    setSimOutput(null);
    setTimeout(() => {
      setSimOutput({
        status: 'SUCCESS',
        executionDuration: '1.24s',
        agentChannel: 'ChatGPT Plus (Agent-Native Action)',
        toolInvoked: conversionResult.toolDefinition.name,
        paramsPassed: {
          service_type: 'hydrafacial_deluxe',
          preferred_date: '2026-10-20T14:00:00Z',
          spending_limit_usd: 250,
          delegated_user: 'valentin2v2000@gmail.com'
        },
        proofAiReceipt: {
          confirmationCode: `ARK-CONF-${Math.floor(100000 + Math.random() * 900000)}`,
          merkleHash: '0x3bf92c...e84a',
          paymentStatus: 'Authorized via Stripe Agentic Card ($250.00)',
          humanInLoopRequired: false
        }
      });
      setSimRunning(false);
    }, 900);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div className="bg-[#1a1a1a] rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-gray-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D8FD49] rounded-full blur-[130px] opacity-15 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#343CED] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#D8FD49] border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            #1 Revenue Gem · The Picks-and-Shovels Play
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Agent-Native <span className="text-[#D8FD49]">Conversion Studio</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
            Take existing SaaS products, clinics, and B2B workflows and transform their highest-value actions into 
            <span className="text-white font-semibold"> ChatGPT-native tools, structured actions, and permissions layers</span>.
          </p>

          {/* Value Props Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-sm">
            <div>
              <div className="text-gray-400 text-xs">Customer Pain</div>
              <div className="font-bold text-white text-base">8 / 10</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Build Speed</div>
              <div className="font-bold text-[#D8FD49] text-base">9 / 10 (Fast)</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Solo Feasibility</div>
              <div className="font-bold text-white text-base">9 / 10</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Astra Advantage</div>
              <div className="font-bold text-[#D8FD49] text-base">10 / 10</div>
            </div>
          </div>
        </div>
      </div>

      {/* Commercial Monetization Ladder */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden group hover:border-[#343CED] transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#343CED] flex items-center justify-center mb-4 font-bold">
            01
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Smallest Sellable MVP</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">AgentReady Audit</h3>
          <div className="text-2xl font-black text-[#343CED] mb-3">$297 – $500</div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            "Can ChatGPT discover, understand, and safely operate your product?" Run 20–50 synthetic agent tasks and expose failure points.
          </p>
          <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 24-Hour Turnaround Deliverable
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-[#343CED] shadow-md relative overflow-hidden">
          <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#D8FD49] text-[#1a1a1a] text-[11px] font-black uppercase rounded-full">
            Core Service
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#343CED] text-white flex items-center justify-center mb-4 font-bold">
            02
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Transformation Implementation</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">AgentReady Conversion</h3>
          <div className="text-2xl font-black text-[#343CED] mb-3">$2,500 – $10,000</div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Build the machine-facing layer: authentication, tool definitions, structured actions, ChatGPT OpenAPI manifest, confirmation triggers, and payments.
          </p>
          <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Deployed to Production in 7 Days
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden group hover:border-[#343CED] transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 font-bold">
            03
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">High-Margin Recurring</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Agent Operations (AgentOps)</h3>
          <div className="text-2xl font-black text-emerald-600 mb-3">$299 – $1,500 <span className="text-xs text-gray-500 font-normal">/ month</span></div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Continuous synthetic monitoring, broken action repair, schema updates, agent analytics, rate limit protection, and agent compliance reporting.
          </p>
          <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Pure High-Retention MRR
          </div>
        </div>
      </div>

      {/* Before vs After Interactive Showcase */}
      <div className="bg-gradient-to-r from-gray-900 via-[#1a1a1a] to-gray-900 rounded-3xl p-8 text-white border border-gray-800">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">The 90-Second Conversion Proof</h2>
            <p className="text-sm text-gray-400 mt-1">
              "Before: User navigates menus & fills forms. After: User tells ChatGPT the outcome, agent calls product."
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-bold text-[#D8FD49] bg-white/10 px-3 py-1 rounded-full">
              Demo Preset: {selectedPreset.name}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Before Column */}
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md">
                  ❌ Legacy Web Experience (High Friction)
                </span>
                <span className="text-xs text-gray-400">~6 minutes avg</span>
              </div>
              <ul className="space-y-3">
                {selectedPreset.beforeSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-red-500/20 text-xs text-red-300 flex items-center justify-between">
              <span>Result: 43% Mobile Cart Abandonment</span>
              <span className="font-bold">Zero Agent Discovery</span>
            </div>
          </div>

          {/* After Column */}
          <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-lg relative">
            <div className="absolute -top-3 right-6 bg-[#D8FD49] text-gray-950 text-xs font-black px-3 py-0.5 rounded-full">
              Agent-Native
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                  ⚡ Converted ChatGPT Action (Zero Friction)
                </span>
                <span className="text-xs text-emerald-400 font-semibold">1.4s automated</span>
              </div>
              <ul className="space-y-3">
                {selectedPreset.afterSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="font-medium">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
              <span>Result: 100% Touchless Conversion</span>
              <span className="font-bold text-[#D8FD49]">Verifiable ProofAI Receipt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Studio Area */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-8">
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Workflow Transformation Engine</h2>
              <p className="text-sm text-gray-500">
                Select an industry template or paste your company's SOP / API workflow to compile production-ready agent artifacts.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {SAMPLE_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    selectedPreset.id === p.id
                      ? 'bg-[#343CED] text-white border-[#343CED]'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {p.name.split('&')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Text Area */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between">
            <span>Input SaaS / Business Workflow Description</span>
            <span className="text-gray-400 font-normal">Natural Language SOP, REST Endpoints, or Ticket Runbook</span>
          </label>
          <textarea
            rows={4}
            value={customWorkflow || selectedPreset.rawWorkflow}
            onChange={(e) => setCustomWorkflow(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 p-4 text-sm font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#343CED] bg-gray-50/50"
            placeholder="Describe the SaaS workflow (e.g., how customers find pricing, pick dates, enter details, and pay)..."
          />
          <div className="flex justify-end">
            <button
              onClick={handleConvert}
              disabled={isGenerating}
              className="bg-[#343CED] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#2b32c7] transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Synthesizing Agent-Native Specs...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Generate Agent-Native Layer (Gemini 3.8 Flash)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Specs Tabs */}
        <div className="space-y-4">
          <div className="flex border-b border-gray-200 gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('yaml')}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
                activeTab === 'yaml'
                  ? 'border-b-2 border-[#343CED] text-[#343CED] bg-blue-50/40'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <FileCode className="w-4 h-4" />
              ChatGPT Action (OpenAPI 3.1 YAML)
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
                activeTab === 'schema'
                  ? 'border-b-2 border-[#343CED] text-[#343CED] bg-blue-50/40'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Code2 className="w-4 h-4" />
              MCP & Function Calling Schema
            </button>
            <button
              onClick={() => setActiveTab('auth')}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
                activeTab === 'auth'
                  ? 'border-b-2 border-[#343CED] text-[#343CED] bg-blue-50/40'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Auth & Delegated Permissions
            </button>
            <button
              onClick={() => setActiveTab('guardrails')}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
                activeTab === 'guardrails'
                  ? 'border-b-2 border-[#343CED] text-[#343CED] bg-blue-50/40'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              Guardrails & Human-in-the-Loop
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ml-auto ${
                activeTab === 'simulator'
                  ? 'bg-[#D8FD49] text-gray-900 border-b-2 border-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Interactive Simulator
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="bg-gray-900 text-gray-100 rounded-2xl p-6 font-mono text-xs relative overflow-hidden">
            {/* Copy button */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => {
                  let txt = '';
                  if (activeTab === 'yaml') txt = conversionResult.chatGptActionYaml;
                  else if (activeTab === 'schema') txt = JSON.stringify(conversionResult.toolDefinition, null, 2);
                  else if (activeTab === 'auth') txt = JSON.stringify(conversionResult.authConfig, null, 2);
                  else if (activeTab === 'guardrails') txt = conversionResult.safetyGuardrails.join('\n');
                  handleCopy(txt);
                }}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#D8FD49]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            {activeTab === 'yaml' && (
              <pre className="overflow-x-auto max-h-[380px] leading-relaxed text-emerald-400">
                {conversionResult.chatGptActionYaml}
              </pre>
            )}

            {activeTab === 'schema' && (
              <div className="space-y-6 max-h-[380px] overflow-y-auto">
                <div>
                  <div className="text-gray-400 mb-2 font-sans font-bold text-xs uppercase tracking-wider">
                    Model Context Protocol (MCP) Tool Declaration
                  </div>
                  <pre className="text-blue-300 overflow-x-auto bg-black/40 p-4 rounded-xl">
                    {conversionResult.mcpToolDeclaration}
                  </pre>
                </div>
                <div>
                  <div className="text-gray-400 mb-2 font-sans font-bold text-xs uppercase tracking-wider">
                    OpenAI / Gemini Function Calling Parameter Schema
                  </div>
                  <pre className="text-amber-300 overflow-x-auto bg-black/40 p-4 rounded-xl">
                    {JSON.stringify(conversionResult.toolDefinition, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'auth' && (
              <div className="space-y-4 max-h-[380px] overflow-y-auto font-sans text-sm">
                <div className="border border-white/10 rounded-xl p-4 bg-white/5 space-y-2">
                  <div className="text-xs uppercase font-bold text-[#D8FD49]">Identity & Token Delegation</div>
                  <div className="text-white font-semibold">{conversionResult.authConfig.type}</div>
                  <div className="text-xs text-gray-300">
                    ChatGPT exchanges user session for a scoped, ephemeral Bearer Token with strictly bound capabilities.
                  </div>
                </div>

                <div className="border border-white/10 rounded-xl p-4 bg-white/5 space-y-2">
                  <div className="text-xs uppercase font-bold text-blue-400">Required OAuth Scopes</div>
                  <div className="flex flex-wrap gap-2">
                    {conversionResult.authConfig.scopes.map((s, idx) => (
                      <span key={idx} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-white/10 rounded-xl p-4 bg-white/5 space-y-2">
                  <div className="text-xs uppercase font-bold text-emerald-400">Spending Cap & Financial Safety</div>
                  <div className="text-white font-bold text-lg">{conversionResult.authConfig.spendingLimitPerAction}</div>
                  <div className="text-xs text-gray-400">
                    Any transaction above this threshold automatically pauses agent execution for interactive user PIN/touch verification.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'guardrails' && (
              <div className="space-y-4 max-h-[380px] overflow-y-auto font-sans text-sm">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                    Deterministic Safety Guardrails
                  </div>
                  <div className="space-y-2">
                    {conversionResult.safetyGuardrails.map((g, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-xl text-xs text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                    Human-in-the-Loop (HITL) Triggers
                  </div>
                  <div className="space-y-2">
                    {conversionResult.humanInLoopTriggers.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-amber-950/30 border border-amber-500/20 p-3 rounded-xl text-xs text-gray-200">
                        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'simulator' && (
              <div className="font-sans space-y-4 max-h-[380px] overflow-y-auto text-gray-200">
                <div className="text-xs text-gray-400">
                  Simulate an autonomous agent invocation from ChatGPT calling this newly converted SaaS tool:
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={simQuery}
                    onChange={(e) => setSimQuery(e.target.value)}
                    className="flex-1 bg-black/50 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#343CED]"
                    placeholder="Enter natural agent command..."
                  />
                  <button
                    onClick={handleRunSimulation}
                    disabled={simRunning}
                    className="bg-[#D8FD49] text-gray-950 px-5 py-2 rounded-xl font-bold text-xs hover:bg-[#cbf532] transition-all flex items-center gap-1.5"
                  >
                    {simRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    {simRunning ? 'Executing...' : 'Run Simulation'}
                  </button>
                </div>

                {simOutput && (
                  <div className="bg-black/60 border border-emerald-500/40 rounded-xl p-4 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between text-emerald-400 pb-2 border-b border-gray-800">
                      <span className="font-bold">STATUS: {simOutput.status}</span>
                      <span>Latency: {simOutput.executionDuration}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Tool Triggered: </span>
                      <span className="text-blue-300 font-bold">{simOutput.toolInvoked}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Structured Action Payload: </span>
                      <pre className="text-amber-300 mt-1 bg-black/40 p-2 rounded">
                        {JSON.stringify(simOutput.paramsPassed, null, 2)}
                      </pre>
                    </div>
                    <div className="pt-2 border-t border-gray-800">
                      <span className="text-gray-400">ProofAI Verifiable Receipt: </span>
                      <div className="text-[#D8FD49] font-bold mt-1">
                        Confirmation: {simOutput.proofAiReceipt.confirmationCode}
                      </div>
                      <div className="text-gray-400 text-[11px]">
                        Merkle: {simOutput.proofAiReceipt.merkleHash} · {simOutput.proofAiReceipt.paymentStatus}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 7-Day Founder Pitch Template */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              The 7-Day Founder Validation Pitch Script
            </span>
            <span className="text-xs font-bold text-[#343CED]">Cold Email & LinkedIn InMail Ready</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed italic bg-white p-4 rounded-xl border border-gray-100">
            "Hey [Founder Name], your product is killer, but right now ChatGPT users cannot book appointments or close tickets without jumping through 6 manual form fields and broken iFrames. 
            I recorded a 90-second video demonstrating your highest-value workflow converted into a native ChatGPT tool with delegated auth and zero cart abandonment. 
            Mind if I send the 90-second link?"
          </p>
        </div>
      </div>
    </div>
  );
};
export default ConversionStudio;
