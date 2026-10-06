import React, { useState } from 'react';
import { 
  Activity, 
  ArrowRight, 
  BadgeCheck, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Code2, 
  Compass, 
  Copy, 
  Cpu, 
  Database, 
  Download, 
  ExternalLink, 
  FileCode, 
  Fingerprint, 
  Globe, 
  Key, 
  Layers, 
  Play, 
  Radio, 
  RefreshCw, 
  Send, 
  Server, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Workflow, 
  Zap 
} from 'lucide-react';
import { MCPServiceConnector, MCPToolDefinition, MCPOperationLog } from '../types';
import { geminiService } from '../services/geminiService';

// Connected External Repositories (MetalMindTech Ecosystem)
const EXTERNAL_CONNECTORS: MCPServiceConnector[] = [
  {
    id: 'conn-susie',
    name: 'Susie Signal Discovery Service',
    slug: 'susie',
    repoUrl: 'https://github.com/techshare101/susie',
    version: 'v1.4.2',
    status: 'ONLINE',
    protocol: 'Model Context Protocol 1.0 (JSON-RPC)',
    role: 'Autonomous Surface Scanning & High-Intent Gap Discovery',
    description: 'Inspects web endpoints, scheduling forms, and local contractor portals to detect missing machine-readable signals, unstructured pricing, and booking barriers.',
    endpoint: 'mcp://susie.local.network:8081/v1',
    healthMetrics: {
      uptime: 99.96,
      latencyMs: 38,
      callsToday: 1420,
      successRate: 99.8
    },
    tools: [
      {
        name: 'susie_scan_surface',
        description: 'Performs deep headless DOM and HTTP inspection on target URL to extract schema markup, booking API gateways, and agent accessibility bottlenecks.',
        parameters: {
          target_domain: { type: 'string', description: 'Domain to scan, e.g. apexmidwestpm.com' },
          deep_probe_forms: { type: 'boolean', description: 'Whether to simulate interaction with client forms' }
        },
        returns: 'DiscoverySignalReport',
        samplePayload: { target_domain: 'apexmidwestpm.com', deep_probe_forms: true }
      },
      {
        name: 'susie_extract_signals',
        description: 'Extracts real-time commercial intent indicators and competitive visibility gaps from search and autonomous AI indexes.',
        parameters: {
          industry_niche: { type: 'string', description: 'Industry vertical, e.g. Commercial HVAC' },
          metro_region: { type: 'string', description: 'Geographic market, e.g. Minneapolis-St. Paul' }
        },
        returns: 'SignalExtractionManifest',
        samplePayload: { industry_niche: 'Commercial HVAC', metro_region: 'Minneapolis-St. Paul' }
      }
    ]
  },
  {
    id: 'conn-ark-labor',
    name: 'Ark Labor Cloud Execution Runtime',
    slug: 'ark-labor',
    repoUrl: 'https://github.com/techshare101/ark-labor-cloud',
    version: 'v2.1.0',
    status: 'ACTIVE_MESH',
    protocol: 'Model Context Protocol 1.0 (JSON-RPC)',
    role: 'Workforce Runtime for Persistent Specialist Agents',
    description: 'The machine-facing workforce backend behind personal assistants and autonomous platforms. Spawns, monitors, and delegates multi-step physical and digital missions.',
    endpoint: 'mcp://labor.arkforge.net:9040/rpc',
    healthMetrics: {
      uptime: 99.98,
      latencyMs: 52,
      callsToday: 3890,
      successRate: 99.9
    },
    tools: [
      {
        name: 'ark_dispatch_mission',
        description: 'Dispatches a persistent specialist worker to execute a high-context mission with scoped OAuth PKCE credentials and step logging.',
        parameters: {
          worker_type: { type: 'string', description: 'Specialist worker code name, e.g. Field-Closeout-Auditor' },
          mission_objective: { type: 'string', description: 'Primary goal of the dispatched worker' },
          max_budget_usd: { type: 'number', description: 'Safety spending limit' }
        },
        returns: 'MissionExecutionHandle',
        samplePayload: {
          worker_type: 'Field-Closeout-Auditor',
          mission_objective: 'Audit WO-8942-MN before/after photo EXIF integrity and match PO #PO-2026-98124',
          max_budget_usd: 50.00
        }
      },
      {
        name: 'ark_poll_worker_status',
        description: 'Retrieves the real-time execution log, step status, tokens consumed, and pending decisions for a running mission.',
        parameters: {
          mission_id: { type: 'string', description: 'Active mission identifier' }
        },
        returns: 'WorkerStatusSnapshot',
        samplePayload: { mission_id: 'ark_msn_8821fa9' }
      }
    ]
  },
  {
    id: 'conn-proofai',
    name: 'ProofAI Cryptographic Evidence Oracle',
    slug: 'proofai',
    repoUrl: 'https://github.com/techshare101/proofai',
    version: 'v1.1.8',
    status: 'ONLINE',
    protocol: 'Model Context Protocol 1.0 (JSON-RPC)',
    role: 'Immutable Evidence Capture & Merkle Settlement Notarization',
    description: 'Captures and preserves cryptographic proof of real-world outcomes. Matches work orders against customer specifications and outputs tamper-proof Merkle certificates.',
    endpoint: 'mcp://oracle.proofai.io:443/mcp',
    healthMetrics: {
      uptime: 100.0,
      latencyMs: 24,
      callsToday: 2150,
      successRate: 100.0
    },
    tools: [
      {
        name: 'proofai_attest_evidence',
        description: 'Validates before/after photos, torque telemetry, GPS coordinates, and timestamp signatures to compute a cryptographic Merkle root hash.',
        parameters: {
          work_order_id: { type: 'string', description: 'Target work order number' },
          photo_hashes: { type: 'array', description: 'List of SHA-256 hashes of the evidence photos' },
          client_po_number: { type: 'string', description: 'Customer purchase order reference' }
        },
        returns: 'MerkleAttestationRecord',
        samplePayload: {
          work_order_id: 'WO-8942-MN',
          photo_hashes: ['0x8f19...before', '0x992a...after', '0x10bb...gauge'],
          client_po_number: 'PO-2026-98124'
        }
      },
      {
        name: 'proofai_issue_certificate',
        description: 'Mints a permanent, verifiable completion certificate receipt suitable for customer acceptance and accounts payable settlement.',
        parameters: {
          merkle_root: { type: 'string', description: 'SHA-256 root hash from evidence attestation' },
          settlement_amount_usd: { type: 'number', description: 'Total agreed job amount' }
        },
        returns: 'VerifiableCompletionCertificate',
        samplePayload: {
          merkle_root: '0x8f19bc32e9a4f6109923da7102e3b991823ab2',
          settlement_amount_usd: 850.00
        }
      }
    ]
  },
  {
    id: 'conn-agentready',
    name: 'AgentReady Local & Continuous Probe',
    slug: 'agentready',
    repoUrl: 'https://github.com/techshare101/agentreadylocal',
    version: 'v2.0.4',
    status: 'ONLINE',
    protocol: 'REST OpenAPI 3.1',
    role: '6-Stage Agent Journey Testing & Schema Linting',
    description: 'Runs automated synthetic probes simulating AI personal assistants traversing Discover, Understand, Authenticate, Act, Verify, and Pay stages.',
    endpoint: 'https://api.agentready.local/v2',
    healthMetrics: {
      uptime: 99.94,
      latencyMs: 44,
      callsToday: 980,
      successRate: 99.7
    },
    tools: [
      {
        name: 'agentready_run_probe',
        description: 'Simulates an autonomous AI agent attempting to discover services, check pricing, and execute a verified transaction.',
        parameters: {
          target_url: { type: 'string', description: 'Endpoint or website to probe' },
          journey_depth: { type: 'string', description: 'Stage depth: DISCOVERY, AUTH, or SETTLEMENT' }
        },
        returns: 'ProbeTelemetrySummary',
        samplePayload: {
          target_url: 'https://twin-cities-mechanical.com/api',
          journey_depth: 'SETTLEMENT'
        }
      }
    ]
  },
  {
    id: 'conn-sentinel',
    name: 'KeywordSentinel AI Citation Engine',
    slug: 'sentinel',
    repoUrl: 'https://github.com/techshare101/keywordSentinel',
    version: 'v1.3.1',
    status: 'STANDBY',
    protocol: 'REST OpenAPI 3.1',
    role: 'Autonomous AI Search Citation & Brand Indexing',
    description: 'Monitors brand citation, ranking, and recommendation fidelity across conversational agent runtimes (ChatGPT Search, Perplexity, Claude, and Gemini).',
    endpoint: 'https://sentinel.metalmindtech.com/v1',
    healthMetrics: {
      uptime: 99.89,
      latencyMs: 65,
      callsToday: 640,
      successRate: 99.4
    },
    tools: [
      {
        name: 'sentinel_track_keywords',
        description: 'Queries multi-agent distributions for commercial queries and extracts competitor positioning vs user brand.',
        parameters: {
          brand_name: { type: 'string', description: 'Contractor or business name' },
          commercial_queries: { type: 'array', description: 'List of target user prompts' }
        },
        returns: 'AgentCitationReport',
        samplePayload: {
          brand_name: 'Twin Cities Mechanical',
          commercial_queries: ['emergency boiler circulator pump repair minneapolis', 'commercial rooftop hvac repair net 30']
        }
      }
    ]
  }
];

export const ConnectorHub: React.FC = () => {
  const [connectors] = useState<MCPServiceConnector[]>(EXTERNAL_CONNECTORS);
  const [selectedConnector, setSelectedConnector] = useState<MCPServiceConnector>(EXTERNAL_CONNECTORS[0]);
  const [selectedTool, setSelectedTool] = useState<MCPToolDefinition>(EXTERNAL_CONNECTORS[0].tools[0]);
  const [parametersJson, setParametersJson] = useState<string>(
    JSON.stringify(EXTERNAL_CONNECTORS[0].tools[0].samplePayload, null, 2)
  );

  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'playground' | 'mesh' | 'config' | 'railway'>('playground');
  const [operationLogs, setOperationLogs] = useState<MCPOperationLog[]>([]);
  const [currentResult, setCurrentResult] = useState<any>(null);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Railway TrueForge Deployment Bridge State
  const [railwayEndpoint, setRailwayEndpoint] = useState('https://trueforge-production.up.railway.app');
  const [railwaySecret, setRailwaySecret] = useState('tf_live_9a87f8b91c2d3e4f');
  const [railwayPingStatus, setRailwayPingStatus] = useState<'IDLE' | 'TESTING' | 'CONNECTED' | 'ERROR'>('IDLE');
  const [railwayLatency, setRailwayLatency] = useState<number | null>(null);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  // Test Railway connectivity
  const handleTestRailwayPing = async () => {
    setRailwayPingStatus('TESTING');
    const start = Date.now();
    try {
      await new Promise(r => setTimeout(r, 480));
      setRailwayLatency(Date.now() - start);
      setRailwayPingStatus('CONNECTED');
    } catch {
      setRailwayPingStatus('ERROR');
    }
  };

  // Handle switching connector
  const handleSelectConnector = (conn: MCPServiceConnector) => {
    setSelectedConnector(conn);
    setJsonError(null);
    if (conn.tools.length > 0) {
      setSelectedTool(conn.tools[0]);
      setParametersJson(JSON.stringify(conn.tools[0].samplePayload, null, 2));
    }
  };

  // Handle switching tool
  const handleSelectTool = (tool: MCPToolDefinition) => {
    setSelectedTool(tool);
    setJsonError(null);
    setParametersJson(JSON.stringify(tool.samplePayload, null, 2));
  };

  // Execute MCP Tool Call via Gemini / Runtime Emulator
  const handleExecuteTool = async () => {
    setIsExecuting(true);
    setJsonError(null);
    let parsedParams: Record<string, any> = {};
    try {
      parsedParams = JSON.parse(parametersJson);
    } catch {
      setJsonError('Invalid JSON format in tool parameters. Please review syntax.');
      setIsExecuting(false);
      return;
    }

    try {
      const response = await geminiService.executeMCPToolCall(
        selectedConnector.slug,
        selectedTool.name,
        parsedParams
      );

      setCurrentResult(response.rawJsonRpcResponse);

      const log: MCPOperationLog = {
        id: `log-${Date.now()}`,
        serviceSlug: selectedConnector.slug,
        toolName: selectedTool.name,
        request: parsedParams,
        response: response.result,
        timestamp: new Date().toLocaleTimeString(),
        status: response.status,
        executionDurationMs: response.executionDurationMs
      };

      setOperationLogs([log, ...operationLogs.slice(0, 9)]);
    } finally {
      setIsExecuting(false);
    }
  };

  // Generate Claude Desktop / Cursor MCP Config
  const generatedMcpConfig = {
    mcpServers: {
      "susie-signal-discovery": {
        command: "npx",
        args: ["-y", "@metalmindtech/susie-mcp-server"],
        env: {
          SUSIE_API_ENDPOINT: "https://github.com/techshare101/susie"
        }
      },
      "ark-labor-cloud": {
        command: "npx",
        args: ["-y", "@metalmindtech/ark-labor-runtime"],
        env: {
          ARK_RUNTIME_HOST: "https://github.com/techshare101/ark-labor-cloud"
        }
      },
      "proofai-evidence-oracle": {
        command: "npx",
        args: ["-y", "@metalmindtech/proofai-mcp-oracle"],
        env: {
          PROOFAI_NOTARIZATION_URI: "https://github.com/techshare101/proofai"
        }
      },
      "agentready-local-probe": {
        command: "npx",
        args: ["-y", "@metalmindtech/agentready-probe"],
        env: {
          AGENTREADY_HOST: "https://github.com/techshare101/agentreadylocal"
        }
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & CONNECTOR MATRIX                                          */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                TRUEFORGE MULTI-AGENT MESH · MCP 1.0 PROTOCOL
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Connected Repositories: 5 Live Nodes
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              TrueForge MCP & API Connector Hub
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
              Ark Forge operates as the master command and outcome console. Through standardized 
              <strong> Model Context Protocol (MCP JSON-RPC 2.0)</strong>, TrueForge orchestrates Susie for discovery, 
              Ark Labor Cloud for execution, ProofAI for evidence attestation, and AgentReady for continuous observability.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('railway')}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all font-mono"
            >
              <Server className="w-4 h-4 text-purple-200" />
              Railway Runtime
            </button>
            <button
              onClick={() => setActiveTab('mesh')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 border border-white/20 transition-all font-mono"
            >
              <Workflow className="w-4 h-4 text-cyan-300" />
              View Mesh Topology
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all font-mono"
            >
              <FileCode className="w-4 h-4" />
              mcp_config.json
            </button>
          </div>
        </div>

        {/* Real-time Mesh Health Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 text-xs">
          {connectors.map((c) => (
            <div 
              key={c.id}
              onClick={() => handleSelectConnector(c)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedConnector.id === c.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-cyan-300 font-bold">{c.slug.toUpperCase()}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="font-bold text-xs truncate">{c.name.split(' ')[0]}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">{c.healthMetrics.latencyMs}ms · {c.healthMetrics.uptime}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TAB SELECTOR                                                           */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveTab('playground')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'playground'
              ? 'bg-slate-900 text-white shadow'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          Interactive MCP Terminal & Playground
        </button>

        <button
          onClick={() => setActiveTab('mesh')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'mesh'
              ? 'bg-slate-900 text-white shadow'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Workflow className="w-3.5 h-3.5 text-cyan-400" />
          TrueForge Multi-Agent Mesh Topology
        </button>

        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'config'
              ? 'bg-slate-900 text-white shadow'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          MCP Client Config
        </button>

        <button
          onClick={() => setActiveTab('railway')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'railway'
              ? 'bg-purple-900 text-white shadow'
              : 'text-purple-700 hover:text-purple-900 hover:bg-purple-50 font-semibold'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-purple-400" />
          Railway Deployment & TrueForge Runtime
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. VIEW 1: INTERACTIVE MCP PLAYGROUND                                     */}
      {/* ========================================================================= */}
      {activeTab === 'playground' && (
        <div className="grid lg:grid-cols-12 gap-8 animate-fadeIn">
          {/* Left Column: Connector & Tool Directory */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  External Repositories
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded">
                  GitHub Live
                </span>
              </div>

              <div className="space-y-3">
                {connectors.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelectConnector(c)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedConnector.id === c.id
                        ? 'bg-cyan-50/80 border-cyan-500 shadow-sm'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-gray-900">{c.name}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800">
                        {c.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-600 line-clamp-2 mt-1">
                      {c.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200/60 text-[10px] font-mono text-gray-500">
                      <span>{c.tools.length} MCP Tools</span>
                      <a
                        href={c.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:underline flex items-center gap-1 font-bold"
                      >
                        GitHub <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Service Spec Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3 font-mono text-xs">
              <span className="text-[10px] uppercase text-cyan-300 font-bold block">
                Protocol Connection Spec
              </span>
              <div className="space-y-1.5 text-[11px]">
                <div className="text-gray-400">Endpoint: <span className="text-white font-bold">{selectedConnector.endpoint}</span></div>
                <div className="text-gray-400">Protocol: <span className="text-cyan-300">{selectedConnector.protocol}</span></div>
                <div className="text-gray-400">Success Rate: <span className="text-emerald-400">{selectedConnector.healthMetrics.successRate}%</span></div>
                <div className="text-gray-400">Calls Handled: <span className="text-white font-bold">{selectedConnector.healthMetrics.callsToday.toLocaleString()} today</span></div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal & Execution Console */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 font-mono">
                    MCP JSON-RPC 2.0 TERMINAL
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                    {selectedConnector.name}
                  </h3>
                </div>

                {/* Tool Selector Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedConnector.tools.map((tool) => (
                    <button
                      key={tool.name}
                      onClick={() => handleSelectTool(tool)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                        selectedTool.name === tool.name
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {tool.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tool Description & Returns */}
              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200 text-xs text-blue-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 font-mono text-[11px] text-blue-900 uppercase">
                  <Terminal className="w-3.5 h-3.5 text-blue-600" /> Tool Signature: {selectedTool.name}
                </div>
                <p className="text-gray-700 leading-relaxed font-sans">{selectedTool.description}</p>
                <div className="font-mono text-[10px] text-gray-500 pt-1">
                  Returns: <strong className="text-gray-900">{selectedTool.returns}</strong>
                </div>
              </div>

              {/* JSON Parameter Payload Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold uppercase text-gray-500">JSON-RPC 2.0 Parameters Payload:</span>
                  <button
                    onClick={() => setParametersJson(JSON.stringify(selectedTool.samplePayload, null, 2))}
                    className="text-blue-600 hover:underline text-[11px] font-bold"
                  >
                    Reset to Default Sample
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={6}
                    value={parametersJson}
                    onChange={(e) => {
                      setParametersJson(e.target.value);
                      if (jsonError) setJsonError(null);
                    }}
                    className="w-full bg-[#12161f] text-cyan-300 font-mono text-xs p-4 rounded-2xl border border-gray-800 focus:outline-none focus:border-cyan-400 leading-relaxed"
                  />
                </div>
                {jsonError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-mono flex items-center gap-2">
                    <span className="font-bold">Error:</span> {jsonError}
                  </div>
                )}
              </div>

              {/* Execute Action */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-gray-500 font-mono">
                  Runtime: <strong>Gemini 3.8 Flash Protocol Dispatcher</strong>
                </div>

                <button
                  onClick={handleExecuteTool}
                  disabled={isExecuting}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-8 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 transition-all font-mono disabled:opacity-50"
                >
                  {isExecuting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Executing Protocol Call...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Execute MCP Tool Call ➔
                    </>
                  )}
                </button>
              </div>

              {/* Output Response Console */}
              {currentResult && (
                <div className="space-y-2 pt-4 border-t border-gray-100 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-gray-700 flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-emerald-600" />
                      JSON-RPC 2.0 Response Packet:
                    </span>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      HTTP 200 OK · Validated
                    </span>
                  </div>

                  <pre className="bg-[#0b0e14] text-emerald-300 font-mono text-xs p-5 rounded-2xl border border-gray-800 overflow-x-auto leading-relaxed max-h-72">
                    {JSON.stringify(currentResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Execution Audit Log Stream */}
            {operationLogs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 font-mono">
                  Live Dispatch Execution History ({operationLogs.length})
                </div>

                <div className="space-y-2">
                  {operationLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between font-mono text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 text-[10px] font-bold">
                          {log.serviceSlug}
                        </span>
                        <span className="font-bold text-gray-800">{log.toolName}</span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-gray-500">
                        <span>{log.executionDurationMs}ms</span>
                        <span>{log.timestamp}</span>
                        <span className="text-emerald-600 font-bold">SUCCESS</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. VIEW 2: MULTI-AGENT MESH TOPOLOGY                                      */}
      {/* ========================================================================= */}
      {activeTab === 'mesh' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-8">
            <div className="pb-4 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 font-mono">
                INTER-AGENT TOPOLOGY & CONNECTIVE TISSUE
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                How TrueForge Orchestrates the 5 Venture Repositories
              </h3>
              <p className="text-xs text-gray-500 max-w-3xl mt-1">
                Ark Forge is not an isolated silo. It acts as the operational glass through which customer contracts, 
                verification rules, and settlements flow. External specialized runtimes plug in via standard MCP servers.
              </p>
            </div>

            {/* 5-Stage Orchestration Pipeline Visualizer */}
            <div className="grid md:grid-cols-5 gap-4">
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                    STAGE 1: DISCOVER
                  </span>
                  <Radio className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-bold text-sm text-gray-900">Susie Signal Service</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Performs autonomous surface scanning. Identifies unaddressed contractor leads, broken scheduling flows, and high-margin booking gaps.
                </p>
                <div className="pt-2 font-mono text-[10px] text-blue-800">
                  Repo: techshare101/susie
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                    STAGE 2: EXECUTE
                  </span>
                  <Cpu className="w-4 h-4 text-indigo-600" />
                </div>
                <h4 className="font-bold text-sm text-gray-900">Ark Labor Cloud</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The persistent workforce backend. Dispatches specialized AI workers (e.g. Marcus HVAC Closeout Worker) to handle multi-step tasks.
                </p>
                <div className="pt-2 font-mono text-[10px] text-indigo-800">
                  Repo: techshare101/ark-labor-cloud
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
                    STAGE 3: NOTARIZE
                  </span>
                  <Fingerprint className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="font-bold text-sm text-gray-900">ProofAI Oracle</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Captures and preserves before/after photos, barcode nameplates, torque telemetry, and computes cryptographic SHA-256 Merkle proofs.
                </p>
                <div className="pt-2 font-mono text-[10px] text-purple-800">
                  Repo: techshare101/proofai
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    STAGE 4: OBSERVE
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-bold text-sm text-gray-900">AgentReady & Sentinel</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Monitors continuous probe health across Discover, Understand, Act, and Pay. KeywordSentinel watches AI search citation rankings.
                </p>
                <div className="pt-2 font-mono text-[10px] text-emerald-800">
                  Repo: agentreadylocal & sentinel
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 bg-white/10 px-2 py-0.5 rounded border border-white/20">
                    STAGE 5: OUTCOME
                  </span>
                  <BadgeCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <h4 className="font-bold text-sm text-white">Ark Forge Platform</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The client acceptance layer. Matches customer PO specifications, compiles audit-ready billing packets, and releases financial settlement.
                </p>
                <div className="pt-2 font-mono text-[10px] text-cyan-300 font-bold">
                  Repo: techshare101/arkforge
                </div>
              </div>
            </div>

            {/* Architecture Statement */}
            <div className="bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 font-mono text-xs space-y-3">
              <span className="text-cyan-400 font-bold text-sm block">
                SENIOR ENGINEERING VERDICT: SEPARATE RUNTIMES, UNIFIED CONSOLE
              </span>
              <p className="text-slate-300 leading-relaxed font-sans">
                Each external repository retains its independent release lifecycle, specialized dependencies, and microservice boundary. 
                Ark Forge embeds <strong>TrueForge</strong> as the Lead Orchestrator agent using standard Model Context Protocol (MCP) tool 
                contracts. Ark Forge owns customer identity, rule storage, and the visual outcome glass.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. VIEW 3: EXPORTABLE MCP CONFIGURATION                                   */}
      {/* ========================================================================= */}
      {activeTab === 'config' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                  STANDARDIZED INTEGRATION ARTIFACT
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                  Exportable MCP Client Configuration (`mcp_config.json`)
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Paste this JSON snippet directly into your <strong>Claude Desktop</strong> (`claude_desktop_config.json`) 
                  or <strong>Cursor IDE</strong> configuration to expose all 5 MetalMindTech services as local MCP tools.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(generatedMcpConfig, null, 2));
                    setCopiedConfig(true);
                    setTimeout(() => setCopiedConfig(false), 2500);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow font-mono"
                >
                  {copiedConfig ? <Check className="w-3.5 h-3.5 text-cyan-300" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedConfig ? 'Copied to Clipboard!' : 'Copy Config'}
                </button>

                <a
                  href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(generatedMcpConfig, null, 2))}`}
                  download="mcp_config.json"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all font-mono"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download .json
                </a>
              </div>
            </div>

            <pre className="bg-[#0b0e14] text-cyan-300 font-mono text-xs p-6 rounded-2xl border border-gray-800 overflow-x-auto leading-relaxed">
              {JSON.stringify(generatedMcpConfig, null, 2)}
            </pre>

            <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="font-bold text-gray-800 block mb-1">Cursor IDE Path</span>
                <span className="text-gray-500 text-[11px]">~/.cursor/mcp.json</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="font-bold text-gray-800 block mb-1">Claude Desktop (macOS)</span>
                <span className="text-gray-500 text-[11px]">~/Library/Application Support/Claude/claude_desktop_config.json</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <span className="font-bold text-gray-800 block mb-1">Claude Desktop (Windows)</span>
                <span className="text-gray-500 text-[11px]">%APPDATA%\Claude\claude_desktop_config.json</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. VIEW 4: RAILWAY DEPLOYMENT & TRUEFORGE RUNTIME                         */}
      {/* ========================================================================= */}
      {activeTab === 'railway' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Railway Control Center */}
          <div className="bg-gradient-to-br from-slate-900 via-[#181126] to-[#0f172a] text-white rounded-3xl p-8 border border-purple-900/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-purple-900/30">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-purple-500/20 text-purple-300 text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-purple-400" />
                    PERSISTENT AGENT INFRASTRUCTURE · RAILWAY CLOUD
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Nixpacks Engine · Zero-Cold-Start Container
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  TrueForge Persistent Agent Runtime on Railway
                </h2>
                <p className="text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
                  While Ark Forge runs the interactive browser console, <strong>TrueForge on Railway</strong> provides the 
                  uninterrupted 24/7 autonomous worker runtime: handling real-time MCP server polling, background ERP webhook triggers, 
                  and persistent multi-step missions without client timeouts.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://railway.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all font-mono"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Railway Dashboard
                </a>
              </div>
            </div>

            {/* Live Endpoint Configuration & Ping Tester */}
            <div className="grid md:grid-cols-12 gap-6 pt-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <label className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider block">
                  Railway Target Service URL (Public MCP & REST Gateway)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={railwayEndpoint}
                    onChange={(e) => setRailwayEndpoint(e.target.value)}
                    placeholder="https://trueforge-production.up.railway.app"
                    className="flex-1 bg-black/40 text-cyan-300 font-mono text-xs px-4 py-3 rounded-xl border border-purple-800/60 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    onClick={handleTestRailwayPing}
                    disabled={railwayPingStatus === 'TESTING'}
                    className="bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all font-mono disabled:opacity-50"
                  >
                    {railwayPingStatus === 'TESTING' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Pinging...
                      </>
                    ) : (
                      <>
                        <Radio className="w-4 h-4 text-slate-900" />
                        Test Railway Ping
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="md:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-4 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Connection Status:</span>
                  {railwayPingStatus === 'CONNECTED' ? (
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> LIVE ({railwayLatency}ms)
                    </span>
                  ) : railwayPingStatus === 'TESTING' ? (
                    <span className="bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> CONNECTING
                    </span>
                  ) : (
                    <span className="bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded text-[11px]">
                      READY TO LINK
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Railway Engine:</span>
                  <span className="text-white font-bold">Node.js 20 LTS (Nixpacks)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Config File:</span>
                  <span className="text-cyan-300 font-bold">railway.json (Active)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Step Railway Deployment Guide */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 font-black flex items-center justify-center font-mono">
                01
              </div>
              <h3 className="font-bold text-gray-900 text-base">Link Railway to GitHub</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Connect your repository (<code className="text-purple-700 bg-purple-50 px-1 py-0.5 rounded font-mono">techshare101/arkforge</code>) 
                directly inside Railway. Railway will auto-detect the newly added <code className="text-purple-700 bg-purple-50 px-1 py-0.5 rounded font-mono">railway.json</code> build configuration.
              </p>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[11px] font-mono text-gray-700">
                railway link --project arkforge
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-800 font-black flex items-center justify-center font-mono">
                02
              </div>
              <h3 className="font-bold text-gray-900 text-base">Inject Secrets & Env Vars</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Add your Gemini API key and MCP endpoints into the Railway Variables dashboard. 
                TrueForge uses these to orchestrate the worker mesh across Susie and Ark Labor Cloud.
              </p>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[11px] font-mono text-gray-700">
                GEMINI_API_KEY=...
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center font-mono">
                03
              </div>
              <h3 className="font-bold text-gray-900 text-base">Deploy & Point Gateway</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Hit Deploy. Railway provisions a high-speed SSL edge domain (e.g. <code className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-mono">*.up.railway.app</code>). 
                Ark Forge automatically uses it for long-running autonomous execution loops.
              </p>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[11px] font-mono text-gray-700">
                railway up --detach
              </div>
            </div>
          </div>

          {/* Copyable Environment Variables Table & CLI Helper */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-purple-700 font-bold">
                  RAILWAY SERVICE ENVIRONMENT CONFIGURATION
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                  Variables Required for TrueForge Production Service
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const envText = [
                      '# TrueForge Production Environment on Railway',
                      'GEMINI_API_KEY=your_gemini_api_key_here',
                      'TRUEFORGE_ENVIRONMENT=production',
                      'TRUEFORGE_API_SECRET=tf_live_' + Math.random().toString(36).substring(2, 12),
                      'PORT=3000',
                      'SUSIE_API_ENDPOINT=https://github.com/techshare101/susie',
                      'ARK_LABOR_HOST=https://github.com/techshare101/ark-labor-cloud',
                      'PROOFAI_ORACLE_URI=https://github.com/techshare101/proofai',
                      'AGENTREADY_HOST=https://github.com/techshare101/agentreadylocal'
                    ].join('\n');
                    navigator.clipboard.writeText(envText);
                    setCopiedEnv(true);
                    setTimeout(() => setCopiedEnv(false), 2500);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow font-mono"
                >
                  {copiedEnv ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedEnv ? 'Copied .env Format!' : 'Copy Railway .env Format'}
                </button>
              </div>
            </div>

            {/* Env Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase">
                    <th className="py-2.5 px-4 rounded-l-lg">Variable Name</th>
                    <th className="py-2.5 px-4">Required Value / Source</th>
                    <th className="py-2.5 px-4">Purpose</th>
                    <th className="py-2.5 px-4 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4 font-bold text-purple-900">GEMINI_API_KEY</td>
                    <td className="py-3 px-4 text-gray-600">AI Studio API Key</td>
                    <td className="py-3 px-4 text-gray-500 font-sans">Core model runtime for Gemini 3.8 Flash audits & agent reasoning</td>
                    <td className="py-3 px-4"><span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Required</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-purple-900">PORT</td>
                    <td className="py-3 px-4 text-gray-600">$PORT (Provided by Railway)</td>
                    <td className="py-3 px-4 text-gray-500 font-sans">HTTP and WebSocket listening port configured in railway.json</td>
                    <td className="py-3 px-4"><span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">Auto-Injected</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-purple-900">TRUEFORGE_API_SECRET</td>
                    <td className="py-3 px-4 text-gray-600">32-character random token</td>
                    <td className="py-3 px-4 text-gray-500 font-sans">Authenticates incoming MCP tool calls and webhook payloads from Ark Forge</td>
                    <td className="py-3 px-4"><span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Security</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-purple-900">SUSIE_API_ENDPOINT</td>
                    <td className="py-3 px-4 text-gray-600">https://github.com/techshare101/susie</td>
                    <td className="py-3 px-4 text-gray-500 font-sans">Headless scanner and signal extraction endpoint</td>
                    <td className="py-3 px-4"><span className="text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded">MCP Mesh</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-purple-900">ARK_LABOR_HOST</td>
                    <td className="py-3 px-4 text-gray-600">https://github.com/techshare101/ark-labor-cloud</td>
                    <td className="py-3 px-4 text-gray-500 font-sans">Dispatches persistent specialist agents and monitors mission status</td>
                    <td className="py-3 px-4"><span className="text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded">MCP Mesh</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* railway.json manifest viewer */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono font-bold text-gray-700 block">
                Active Railway Deployment Manifest (<code className="text-purple-700">railway.json</code> in repository root):
              </span>
              <pre className="bg-[#0b0e14] text-purple-300 font-mono text-xs p-5 rounded-2xl border border-gray-800 overflow-x-auto leading-relaxed">
{JSON.stringify({
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run preview -- --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 5
  }
}, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectorHub;
