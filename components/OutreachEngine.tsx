import React, { useState } from 'react';
import { 
  AlertCircle, 
  ArrowRight, 
  BadgeCheck, 
  Building2, 
  Calculator, 
  Calendar, 
  Check, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Copy, 
  DollarSign, 
  Download, 
  ExternalLink, 
  FileCheck, 
  FileText, 
  Globe, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Plus, 
  Printer, 
  RefreshCw, 
  Send, 
  Share2,
  Sparkles, 
  Target, 
  TrendingUp, 
  UserCheck, 
  Users, 
  Wrench, 
  Zap 
} from 'lucide-react';
import { CommercialLeadProfile } from '../types';
import { geminiService } from '../services/geminiService';

// 5 Specific Twin Cities Commercial Operators & Property Managers
const TWIN_CITIES_LEADS: CommercialLeadProfile[] = [
  {
    id: 'lead-1',
    companyName: 'Twin Cities Mechanical & Heating Co.',
    category: 'Commercial HVAC',
    metroLocation: 'Minneapolis, MN (Northeast Industrial)',
    decisionMaker: 'Craig Olson',
    title: 'Managing Principal & Founder',
    email: 'craig@twincitiesmechanical.com',
    phone: '(612) 555-8841',
    annualInvoicedEstimate: 3800000,
    currentARDelayDays: 35,
    potentialAnnualSavings: 38400,
    primaryPainPoint: 'Invoices stalled 30+ days in customer portals over missing before/after boiler photos and unreadable serial tags.',
    recommendedOffer: '$750 10-Job Pilot',
    outreachStatus: 'NOT_CONTACTED',
    emailPitch: `Hi Craig,\n\nMost commercial mechanical contractors we work with in the Twin Cities tell us their single biggest cash-flow bottleneck is invoices sitting in property management portals for 30–45 days because of missing before/after photos or unverified customer PO numbers.\n\nWe built Ark Forge right here in the Twin Cities to solve this before the invoice ever leaves your accounting desk. Our AI closeout workers cross-reference your technician field logs, photos, and client PO rules into an audit-proof billing packet with a 0% rejection guarantee.\n\nWe are taking 5 Twin Cities mechanical operators through our 10-Job Closeout Pilot ($750 fixed). If we don't accelerate your average invoice approval to under 48 hours, the pilot is 100% refunded.\n\nDo you have 7 minutes for a quick run-through this Thursday?`,
    linkedInPitch: `Craig — impressive seeing Twin Cities Mechanical's footprint across Midwest properties. We're launching a 10-job closeout pilot with local commercial contractors to cut payment approval from 35 days down to 48 hours by auto-verifying proof before customer AP submission. Open to seeing the 2-minute overview?`,
    phoneScript: `"Hi Craig, this is Valentin with Ark Forge in Minneapolis. The reason for my call: we help Twin Cities commercial HVAC contractors eliminate the 3-week payment lag caused by customer AP portals rejecting invoices over missing photos or sign-offs. We're launching a 10-job pilot this week with 5 local operators—do you have two minutes to see how this fits your billing workflow?"`
  },
  {
    id: 'lead-2',
    companyName: 'Apex Midwest Property Management',
    category: 'Property Management',
    metroLocation: 'Minneapolis, MN (Downtown / North Loop)',
    decisionMaker: 'Dave Lindholm',
    title: 'Vice President of Facilities',
    email: 'dlindholm@apexmidwestpm.com',
    phone: '(612) 555-4020',
    annualInvoicedEstimate: 6200000,
    currentARDelayDays: 28,
    potentialAnnualSavings: 62000,
    primaryPainPoint: 'Property managers spend 14 hours/week chasing contractors for missing resident sign-off slips and photo proof before approving payments.',
    recommendedOffer: '$2,500/mo Retainer',
    outreachStatus: 'NOT_CONTACTED',
    emailPitch: `Hi Dave,\n\nManaging 400+ units across the Twin Cities usually means your facilities team spends 15+ hours every week chasing contractors for missing work order photos, incomplete notes, or absent resident sign-offs before accounts payable can cut a check.\n\nArk Forge provides an automated acceptance layer between your maintenance tickets and invoice payout. Contractors submit field work; our AI verifies 100% of your compliance specifications, flags missing evidence instantly, and produces a billing-ready handoff.\n\nWould you be open to seeing how our intake gate eliminates manual closeout reviews for property managers?`,
    linkedInPitch: `Dave — noticed your team managing major properties across Minneapolis. We built an automated acceptance gate that verifies contractor work order evidence before invoices hit your accounts payable desk. Would love to share how local property groups cut closeout review time by 80%.`,
    phoneScript: `"Hi Dave, Valentin with Ark Forge. Calling because property managers in the Twin Cities tell us their teams lose hours chasing contractors for missing before/after photos and resident sign-offs. We built an automated gate that catches missing proof before invoices reach AP. Do you have two minutes to see how this works?"`
  },
  {
    id: 'lead-3',
    companyName: 'NorthStar Commercial Roofing',
    category: 'Commercial Roofing',
    metroLocation: 'St. Paul, MN (Midway District)',
    decisionMaker: 'Sarah Vance',
    title: 'Director of Commercial Operations',
    email: 'svance@northstarcommercialroofing.com',
    phone: '(651) 555-3390',
    annualInvoicedEstimate: 4500000,
    currentARDelayDays: 42,
    potentialAnnualSavings: 45000,
    primaryPainPoint: 'Commercial accounts (Target, Best Buy) reject 22% of roofing invoices due to strict safety harness & curb flashing photo guidelines.',
    recommendedOffer: '$750 10-Job Pilot',
    outreachStatus: 'NOT_CONTACTED',
    emailPitch: `Hi Sarah,\n\nSubmitting commercial roofing closeouts to enterprise portals like ServiceChannel or Verisae often feels like navigating a minefield—one missing curb photo or harness verification and your invoice gets rejected for another 30-day payment cycle.\n\nArk Forge compiles your technician photos, safety logs, and customer PO numbers into an audit-proof packet that matches corporate FM rules before submission.\n\nWe are running a 10-Job Pilot with St. Paul contractors to prove we can eliminate invoice rejections completely. Worth a 5-minute conversation?`,
    linkedInPitch: `Sarah — saw NorthStar's commercial work across the Twin Cities. Enterprise AP portals like ServiceChannel reject too many roofing invoices over minor photo technicalities. We built a closeout engine that verifies compliance before submission. Open to a quick look?`,
    phoneScript: `"Hi Sarah, Valentin with Ark Forge in the Twin Cities. Calling because enterprise retailers are notoriously slow paying roofing contractors when minor photo proof is missing. We built an AI closeout desk that pre-audits packets to guarantee zero AP rejection. Could I take two minutes to explain our 10-job pilot?"`
  },
  {
    id: 'lead-4',
    companyName: 'Gopher State Commercial Plumbing',
    category: 'Plumbing & Mechanical',
    metroLocation: 'Minneapolis, MN (Cedar-Riverside)',
    decisionMaker: 'Markus Holmgren',
    title: 'Master Plumber Lead & VP Field Operations',
    email: 'mholmgren@gopherstateplumbing.com',
    phone: '(612) 555-1209',
    annualInvoicedEstimate: 2900000,
    currentARDelayDays: 32,
    potentialAnnualSavings: 29000,
    primaryPainPoint: 'Municipal and public housing jobs require certified backflow tags and inspector permits that frequently get lost between field technicians and billing.',
    recommendedOffer: '$750 10-Job Pilot',
    outreachStatus: 'NOT_CONTACTED',
    emailPitch: `Hi Markus,\n\nPublic housing and municipal plumbing contracts are great for steady volume, but accounts payable delays are painful when municipal backflow tags or inspector sign-offs get misplaced between the field and your billing office.\n\nArk Forge automatically matches municipal permit tags, serial barcodes, and supervisor signatures into audit-ready billing packets that clear city accounting on the first submission.\n\nWe'd love to run your next 10 municipal tickets through our $750 pilot. Do you have a few minutes this week?`,
    linkedInPitch: `Markus — noticed Gopher State's heavy commercial and municipal footprint in Minneapolis. We help plumbing contractors eliminate public sector invoice delays by pre-verifying permit tags and inspector sign-offs. Would love to share our 10-job pilot overview.`,
    phoneScript: `"Hi Markus, Valentin from Ark Forge. We're working with Minneapolis commercial plumbers to eliminate the municipal payment hold-ups caused by missing permit tags and inspection slips. We have a 10-job pilot running this week—do you have two minutes to see how it works?"`
  },
  {
    id: 'lead-5',
    companyName: 'FirstService Residential Minnesota',
    category: 'HOA & High-Rise',
    metroLocation: 'Edina & Minneapolis (Mill City Lofts)',
    decisionMaker: 'Elena Rostova',
    title: 'Senior Regional Portfolio Manager',
    email: 'elena.rostova@fsresidential.com',
    phone: '(952) 555-7710',
    annualInvoicedEstimate: 8400000,
    currentARDelayDays: 25,
    potentialAnnualSavings: 84000,
    primaryPainPoint: 'HOA boards challenge emergency repair invoices due to lack of transparent before-and-after photo records.',
    recommendedOffer: '$2,500/mo Retainer',
    outreachStatus: 'NOT_CONTACTED',
    emailPitch: `Hi Elena,\n\nManaging premier high-rise properties like Mill City Lofts often means board members push back on mechanical and boiler invoices because contractor documentation is vague or missing clear before-and-after evidence.\n\nArk Forge notarizes contractor completion evidence into shareable, board-ready completion certificates with tamper-proof timestamps and thermal sensor readings.\n\nCan I show you a sample 1-page certificate from a Minneapolis mechanical overhaul?`,
    linkedInPitch: `Elena — noticed your leadership managing premier Minneapolis residential communities. We help portfolio managers prevent HOA board invoice disputes by turning contractor work orders into transparent, certified completion records. Open to seeing a sample?`,
    phoneScript: `"Hi Elena, Valentin with Ark Forge. Calling because condo and HOA boards frequently dispute emergency contractor bills when before-and-after proof is vague. We create verified completion receipts that boards approve immediately. Do you have two minutes to see a sample?"`
  }
];

export const OutreachEngine: React.FC = () => {
  const [leads, setLeads] = useState<CommercialLeadProfile[]>(TWIN_CITIES_LEADS);
  const [selectedLead, setSelectedLead] = useState<CommercialLeadProfile>(TWIN_CITIES_LEADS[0]);
  const [activeChannel, setActiveChannel] = useState<'email' | 'linkedin' | 'phone' | 'agreement'>('email');
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Calculator State
  const [calcMonthlyInvoicing, setCalcMonthlyInvoicing] = useState(150000);
  const [calcCurrentDSO, setCalcCurrentDSO] = useState(35);
  const [calcRejectionRate, setCalcRejectionRate] = useState(18);

  // Custom Lead Generator State
  const [customCompany, setCustomCompany] = useState('');
  const [customContact, setCustomContact] = useState('');
  const [customTrade, setCustomTrade] = useState('Commercial HVAC');
  const [customPainPoint, setCustomPainPoint] = useState('Customer AP holds invoices for missing photos');
  const [customVolume, setCustomVolume] = useState('2500000');
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);

  // Calculate ROI
  const daysSaved = Math.max(calcCurrentDSO - 3, 10);
  const workingCapitalUnlocked = Math.round((calcMonthlyInvoicing / 30) * daysSaved);
  const annualDisputesEliminated = Math.round((calcMonthlyInvoicing * 12 * (calcRejectionRate / 100)) * 0.12);

  // Handle Copy
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  // Update Status
  const handleUpdateStatus = (status: CommercialLeadProfile['outreachStatus']) => {
    const updated = leads.map(l => l.id === selectedLead.id ? { ...l, outreachStatus: status } : l);
    setLeads(updated);
    setSelectedLead({ ...selectedLead, outreachStatus: status });
  };

  // Generate Custom Pitch via Gemini
  const handleGenerateCustom = async () => {
    if (!customCompany || !customContact) return;
    setIsGeneratingCustom(true);
    try {
      const res = await geminiService.generateCommercialPilotPitch({
        companyName: customCompany,
        decisionMaker: customContact,
        title: 'Managing Principal',
        category: customTrade,
        metroLocation: 'Minneapolis-St. Paul, MN',
        primaryPainPoint: customPainPoint,
        annualInvoicedEstimate: parseFloat(customVolume) || 2000000,
        currentARDelayDays: 32
      });

      const newLead: CommercialLeadProfile = {
        id: `lead-${Date.now()}`,
        companyName: customCompany,
        category: customTrade as any,
        metroLocation: 'Minneapolis-St. Paul, MN',
        decisionMaker: customContact,
        title: 'Managing Principal',
        email: `contact@${customCompany.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        phone: '(612) 555-0199',
        annualInvoicedEstimate: parseFloat(customVolume) || 2000000,
        currentARDelayDays: 32,
        potentialAnnualSavings: 28000,
        primaryPainPoint: customPainPoint,
        recommendedOffer: '$750 10-Job Pilot',
        outreachStatus: 'PITCH_GENERATED',
        emailPitch: res.emailPitch,
        linkedInPitch: res.linkedInPitch,
        phoneScript: res.phoneScript
      };

      setLeads([newLead, ...leads]);
      setSelectedLead(newLead);
      setCustomCompany('');
      setCustomContact('');
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ========================================================================= */}
      {/* 1. EXECUTIVE MISSION BANNER                                               */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                48-HOUR COMMERCIAL ENGINE · VALIDATE WILLINGNESS TO PAY
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Market: Twin Cities Commercial Operators & Property Managers
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              48-Hour Field Outreach & Pilot Generator
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
              Show the proof-of-completion concept to five Twin Cities commercial operators. 
              Eliminate accounts payable delays, quantify working capital recovery, and secure initial <strong>$750 10-Job Pilot agreements</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveChannel('agreement')}
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all font-mono"
            >
              <FileCheck className="w-4 h-4" />
              1-Page Pilot Agreement ($750)
            </button>
          </div>
        </div>

        {/* 48-Hour Execution Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">Target Commercial Cohort</span>
            <span className="text-2xl font-black text-white font-mono">{leads.length} Operators</span>
            <span className="text-[10px] text-cyan-300 block mt-1">Twin Cities Metro Verified</span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">Target Pilot Revenue</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">$3,750 USD</span>
            <span className="text-[10px] text-slate-400 block mt-1">5 Pilots @ $750 each</span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">Cash Velocity Acceleration</span>
            <span className="text-2xl font-black text-cyan-300 font-mono">35d ➔ 48h</span>
            <span className="text-[10px] text-slate-400 block mt-1">Zero AP rejection cycle</span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-400 block mb-1">SLA Retainer Potential</span>
            <span className="text-2xl font-black text-purple-300 font-mono">$5,000 / mo</span>
            <span className="text-[10px] text-slate-400 block mt-1">Converting pilots into MRR</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ROI & WORKING CAPITAL ACCELERATION CALCULATOR                           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
              COMMERCIAL ROI ENGINE
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">
              Twin Cities Contractor Working Capital Calculator
            </h3>
            <p className="text-xs text-gray-500">
              Quantify the immediate financial return of pre-verifying work order evidence before customer AP submission.
            </p>
          </div>
          <div className="text-xs font-mono bg-blue-50 text-blue-900 px-3 py-1.5 rounded-xl font-bold border border-blue-200">
            0% Invoice Rejection Guarantee
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-500">Monthly Invoiced Volume:</span>
              <span className="font-bold text-gray-900 text-sm">${calcMonthlyInvoicing.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={30000}
              max={500000}
              step={10000}
              value={calcMonthlyInvoicing}
              onChange={(e) => setCalcMonthlyInvoicing(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-500">Current Payment Delay (DSO):</span>
              <span className="font-bold text-gray-900 text-sm">{calcCurrentDSO} Days</span>
            </div>
            <input
              type="range"
              min={15}
              max={60}
              step={1}
              value={calcCurrentDSO}
              onChange={(e) => setCalcCurrentDSO(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-500">Average AP Rejection Rate:</span>
              <span className="font-bold text-red-600 text-sm">{calcRejectionRate}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={35}
              step={1}
              value={calcRejectionRate}
              onChange={(e) => setCalcRejectionRate(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Calculated Output Cards */}
        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] font-mono uppercase text-emerald-800 font-bold block mb-1">
              Working Capital Unlocked
            </span>
            <div className="text-3xl font-black text-emerald-700 font-mono">
              ${workingCapitalUnlocked.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-700 block mt-1">
              Accelerated by {daysSaved} calendar days
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
            <span className="text-[11px] font-mono uppercase text-blue-800 font-bold block mb-1">
              Annual AR Leakage Prevented
            </span>
            <div className="text-3xl font-black text-blue-700 font-mono">
              ${annualDisputesEliminated.toLocaleString()}
            </div>
            <span className="text-[11px] text-blue-700 block mt-1">
              Eliminates write-downs and dispute audits
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200">
            <span className="text-[11px] font-mono uppercase text-purple-800 font-bold block mb-1">
              Pilot Return on Investment (ROI)
            </span>
            <div className="text-3xl font-black text-purple-700 font-mono">
              {Math.round((workingCapitalUnlocked / 750) * 100)}%
            </div>
            <span className="text-[11px] text-purple-700 block mt-1">
              $750 pilot paid back on job #1
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TWIN CITIES OPERATOR DIRECTORY & OUTREACH DESK                         */}
      {/* ========================================================================= */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column (5 Cols): 5 Twin Cities Operators */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                Twin Cities Target Roster ({leads.length})
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded">
                48-Hour Wave
              </span>
            </div>

            <div className="space-y-3">
              {leads.map((l) => (
                <div
                  key={l.id}
                  onClick={() => setSelectedLead(l)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedLead.id === l.id
                      ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-200'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-700">
                      {l.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      l.outreachStatus === 'PILOT_AGREED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : l.outreachStatus === 'OUTREACH_SENT'
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {l.outreachStatus.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-gray-900">{l.companyName}</h4>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {l.decisionMaker} · <span className="text-gray-400">{l.title}</span>
                  </div>

                  <p className="text-[11px] text-gray-500 line-clamp-2 mt-2 italic bg-white/70 p-2 rounded-lg border border-gray-200/60">
                    "{l.primaryPainPoint}"
                  </p>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200/60 text-[10px] font-mono text-gray-500">
                    <span>{l.metroLocation}</span>
                    <span className="font-bold text-blue-700">{l.recommendedOffer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Custom Lead Creator */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4">
            <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold block">
              Generate Bespoke Operator Proposal
            </span>
            <h4 className="font-bold text-sm text-white">Target Another Twin Cities Business</h4>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-mono uppercase text-gray-400 block mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Standard Heating & Air Conditioning"
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-gray-400 block mb-1">Decision Maker Name</label>
                <input
                  type="text"
                  placeholder="e.g. Brian Miller (Operations VP)"
                  value={customContact}
                  onChange={(e) => setCustomContact(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                onClick={handleGenerateCustom}
                disabled={isGeneratingCustom || !customCompany || !customContact}
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all font-mono shadow disabled:opacity-50"
              >
                {isGeneratingCustom ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating Custom Pitch...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate AI Pitch with Gemini ➔
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Multi-Channel Outreach Dispatch */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                  OUTREACH DISPATCH CONSOLE
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                  {selectedLead.companyName}
                </h3>
                <div className="text-xs text-gray-500 mt-0.5">
                  Target: <strong>{selectedLead.decisionMaker}</strong> ({selectedLead.title}) · {selectedLead.email}
                </div>
              </div>

              {/* Status Updater */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedLead.outreachStatus}
                  onChange={(e) => handleUpdateStatus(e.target.value as any)}
                  className="border border-gray-200 rounded-xl p-2 text-xs font-mono font-bold bg-white text-gray-800 focus:outline-none"
                >
                  <option value="NOT_CONTACTED">NOT CONTACTED</option>
                  <option value="PITCH_GENERATED">PITCH GENERATED</option>
                  <option value="OUTREACH_SENT">OUTREACH SENT</option>
                  <option value="PILOT_AGREED">PILOT AGREED ($750)</option>
                </select>
              </div>
            </div>

            {/* Communication Channel Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
              <button
                onClick={() => setActiveChannel('email')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeChannel === 'email'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                Cold Executive Email
              </button>

              <button
                onClick={() => setActiveChannel('linkedin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeChannel === 'linkedin'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                LinkedIn DM
              </button>

              <button
                onClick={() => setActiveChannel('phone')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeChannel === 'phone'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                Phone Script
              </button>

              <button
                onClick={() => setActiveChannel('agreement')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeChannel === 'agreement'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5 text-cyan-300" />
                1-Page Pilot Agreement
              </button>
            </div>

            {/* CHANNEL 1: COLD EMAIL */}
            {activeChannel === 'email' && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 font-mono space-y-1">
                  <div><span className="text-gray-400">To:</span> <span className="text-gray-800 font-bold">{selectedLead.email}</span></div>
                  <div><span className="text-gray-400">Subject:</span> <span className="text-blue-900 font-bold">{selectedLead.companyName}: Eliminating Net 30 payment hold-ups on completed field work</span></div>
                </div>

                <div className="relative">
                  <textarea
                    rows={12}
                    value={selectedLead.emailPitch}
                    onChange={(e) => {
                      const updated = { ...selectedLead, emailPitch: e.target.value };
                      setSelectedLead(updated);
                    }}
                    className="w-full bg-[#12161f] text-gray-200 font-mono text-xs p-5 rounded-2xl border border-gray-800 focus:outline-none focus:border-cyan-400 leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleCopy(selectedLead.emailPitch)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all font-mono"
                  >
                    {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedPitch ? 'Copied to Clipboard!' : 'Copy Email Text'}
                  </button>

                  <a
                    href={`mailto:${selectedLead.email}?subject=${encodeURIComponent(`${selectedLead.companyName}: Eliminating Net 30 payment hold-ups`)}&body=${encodeURIComponent(selectedLead.emailPitch)}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow font-mono"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Open in Mail Client
                  </a>
                </div>
              </div>
            )}

            {/* CHANNEL 2: LINKEDIN DM */}
            {activeChannel === 'linkedin' && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 text-blue-950 font-sans space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-blue-700" />
                    Direct Message for {selectedLead.decisionMaker}
                  </div>
                  <p className="text-gray-600 text-[11px]">
                    High-conviction, peer-to-peer executive tone tailored for LinkedIn InMail or 1st-degree connection message.
                  </p>
                </div>

                <div className="bg-[#12161f] text-gray-200 font-mono text-xs p-5 rounded-2xl border border-gray-800 leading-relaxed">
                  {selectedLead.linkedInPitch}
                </div>

                <button
                  onClick={() => handleCopy(selectedLead.linkedInPitch)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow font-mono"
                >
                  {copiedPitch ? <Check className="w-3.5 h-3.5 text-cyan-300" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPitch ? 'Copied to Clipboard!' : 'Copy LinkedIn Message'}
                </button>
              </div>
            )}

            {/* CHANNEL 3: PHONE SCRIPT */}
            {activeChannel === 'phone' && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-emerald-950 font-sans space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-700" />
                    30-Second Conversational Phone Hook
                  </div>
                  <p className="text-gray-600 text-[11px]">
                    Direct call track for reaching the principal or VP of field operations on their direct line: <strong>{selectedLead.phone}</strong>.
                  </p>
                </div>

                <div className="bg-[#12161f] text-emerald-300 font-mono text-xs p-5 rounded-2xl border border-gray-800 leading-relaxed italic">
                  {selectedLead.phoneScript}
                </div>

                <button
                  onClick={() => handleCopy(selectedLead.phoneScript)}
                  className="bg-slate-900 hover:bg-black text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow font-mono"
                >
                  {copiedPitch ? <Check className="w-3.5 h-3.5 text-cyan-300" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPitch ? 'Copied Script!' : 'Copy Phone Script'}
                </button>
              </div>
            )}

            {/* CHANNEL 4: 1-PAGE COMMERCIAL PILOT AGREEMENT */}
            {activeChannel === 'agreement' && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-300 font-sans text-gray-900 space-y-6">
                  {/* Agreement Header */}
                  <div className="flex items-center justify-between border-b-2 border-gray-900 pb-4">
                    <div>
                      <h3 className="font-black text-lg uppercase tracking-tight text-gray-900">
                        10-Job Closeout Pilot Agreement
                      </h3>
                      <div className="text-[11px] font-mono text-gray-600">
                        Ark Forge / MetalMindTech · Twin Cities Commercial Validation Wave
                      </div>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <div className="font-bold text-blue-700">$750.00 USD (Fixed)</div>
                      <div className="text-gray-500 text-[10px]">100% Refund Guarantee</div>
                    </div>
                  </div>

                  {/* Scope of Agreement */}
                  <div className="space-y-3 leading-relaxed text-xs">
                    <p>
                      This Commercial Pilot Agreement is entered into between <strong>MetalMindTech (Ark Forge)</strong> and <strong>{selectedLead.companyName}</strong>.
                    </p>

                    <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2">
                      <div className="font-bold text-gray-900 uppercase font-mono text-[11px]">Pilot Deliverables:</div>
                      <ul className="space-y-1.5 text-gray-700">
                        <li>• <strong>10 Completed Field Work Orders:</strong> Contractor forwards 10 field tickets and photos via portal, email, or WhatsApp.</li>
                        <li>• <strong>Audit-Ready Billing Packets:</strong> TrueForge pre-verifies customer PO numbers, matches before/after photos, and checks municipal permits.</li>
                        <li>• <strong>48-Hour Approval SLA:</strong> Average customer invoice review time reduced from {selectedLead.currentARDelayDays} days to under 48 hours.</li>
                        <li>• <strong>0% Rejection Guarantee:</strong> If any verified packet is rejected by your client accounts payable department, the pilot is 100% refunded.</li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between font-mono bg-blue-50 p-3 rounded-xl border border-blue-200 text-blue-950">
                      <span>Total Pilot Fee:</span>
                      <span className="font-bold text-sm">$750.00 Fixed Setup</span>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200 font-mono text-[11px]">
                    <div>
                      <span className="text-gray-400 block mb-1">Contractor Acceptance:</span>
                      <div className="font-bold text-gray-900">{selectedLead.decisionMaker}</div>
                      <div className="text-gray-500">{selectedLead.companyName}</div>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-gray-400 block mb-1">Executed on behalf of Ark Forge:</span>
                      <div className="font-bold text-blue-700">Valentin / MetalMindTech</div>
                      <div className="text-gray-500">Minneapolis, MN</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow font-mono"
                  >
                    <Printer className="w-4 h-4 text-cyan-300" />
                    Print Agreement Letter (PDF)
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('PILOT_AGREED')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow font-mono"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Pilot Executed ($750)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachEngine;
