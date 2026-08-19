import React, { useState } from 'react';
import {
  Sparkles, Shield, User, RefreshCw, Layers, CreditCard, Wallet,
  Gift, Bell, BarChart2, Activity, Globe, Lock, AlertTriangle,
  Play, CheckCircle2, XCircle, ChevronRight, HelpCircle, Server
} from 'lucide-react';
import { OMNIState } from '../types';

interface OMNIDemoAppPageProps {
  state: OMNIState;
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

export default function OMNIDemoAppPage({ state, triggerToast }: OMNIDemoAppPageProps) {
  // Simulator configuration states
  const [selectedTenant, setSelectedTenant] = useState('ten_dynasty_99');
  const [tenantBranding, setTenantBranding] = useState({
    color: '#e11d48', // rose-600
    name: 'Dynasty Holding Corp',
    domain: 'dynasty.omni.io'
  });

  const [activeTestFlow, setActiveTestFlow] = useState<string | null>(null);
  const [testLogs, setTestLogs] = useState<string[]>([
    'OMNI Integration Sandbox Initialized.',
    'System ready. Select a test flow on the left to verify architectural integrity.'
  ]);
  const [testSuccess, setTestSuccess] = useState<boolean | null>(null);

  // States to simulate system actions
  const [isAppDisabledByAdmin, setIsAppDisabledByAdmin] = useState(false);
  const [activeUserSession, setActiveUserSession] = useState({
    userId: 'usr_gideon',
    email: 'gideonoluwalanadynasty@gmail.com',
    role: 'superadmin',
    scope: 'passport.read billing.write notifications.broadcast ai.autonomy'
  });

  const handleTenantChange = (tenantId: string) => {
    setSelectedTenant(tenantId);
    if (tenantId === 'ten_dynasty_99') {
      setTenantBranding({ color: '#e11d48', name: 'Dynasty Holding Corp', domain: 'dynasty.omni.io' });
    } else {
      setTenantBranding({ color: '#2563eb', name: 'Artisan Sovereign Resale', domain: 'cloud.oluwalana.tech' });
    }
    triggerToast('Tenant Context Updated', 'Organization branding and custom routing modified.', 'info');
  };

  // SUCCESS PATH TEST SUITE
  const triggerSuccessTest = (flow: string) => {
    setActiveTestFlow(flow);
    setTestSuccess(null);
    setTestLogs([`[EXECUTE] Launching success flow: ${flow.toUpperCase()}`]);

    let step = 0;
    const logsMap: Record<string, string[]> = {
      sso_registration: [
        'Connecting to OMNI Passport Auth Gateway...',
        'User verified: gideonoluwalanadynasty@gmail.com matches SHA-256 seal.',
        'Active Single Sign-On (SSO) session created for Demo App context.',
        'OAuth scope validation: SUCCESS ("passport.read", "billing.write").',
        'Organization context transferred: Dynasty Holding Corp (ID: ten_dynasty_99).',
        'SUCCESS: Democratic verification token locked into memory.'
      ],
      billing_upgrade: [
        'Initiating user subscription upgrade event...',
        'Provider-Aware gateway handshake triggered: Stripe key mirror matches.',
        'Sovereign billing event generated: Ledger index #88219 (Amount: $250.00 USD).',
        'Double-entry checking: VALID (Balance assets updated +$250.00, credit record created).',
        'Affiliate system matching: Referral code "adebayo_dynasty" matched.',
        'Wallet balance updated: 15% commission ($37.50 USD) assigned to affiliate ledger.',
        'Ecosystem notification dispatched to user: "Subscription Upgraded Successfully".',
        'Telemetry telemetry capture: Event logged as OMNI_USER_UPGRADED with SHA-256 seal.',
        'SUCCESS: Integration pipeline fully satisfied.'
      ],
      ai_autonomy: [
        'Deploying AI Copilot with permission boundary checks...',
        'AI scope context verification: "ai.autonomy" detected inside OMNI Passport.',
        'Sovereign domain limits checked: Verified spending budget is within allocated $200.00/mo.',
        'Processing request: Gemini-2.5-Flash analyzes double-entry ledgers.',
        'AI output generated within sandboxed memory block. No cross-tenant data leaked.',
        'SUCCESS: Cognitive autonomy operates strictly within specified security scopes.'
      ]
    };

    const runLogs = logsMap[flow] || [];
    const interval = setInterval(() => {
      if (step < runLogs.length) {
        setTestLogs(prev => [...prev, `[STEP ${step+1}] ${runLogs[step]}`]);
        step++;
      } else {
        clearInterval(interval);
        setTestSuccess(true);
        triggerToast('Test Passed', `Integration sequence ${flow} fully verified.`, 'success');
      }
    }, 400);
  };

  // FAILURE PATH TEST SUITE
  const triggerFailureTest = (flow: string) => {
    setActiveTestFlow(flow);
    setTestSuccess(null);
    setTestLogs([`[EXECUTE] Simulating failure attack vector: ${flow.toUpperCase()}`]);

    let step = 0;
    const logsMap: Record<string, string[]> = {
      invalid_token: [
        'Attempting OMNI Passport API request with altered JWT payload...',
        'Error: Cryptographic signature mismatch. SHA-256 validation failed.',
        'Audit alert logged: Unauthorized connection attempt flagged from Demo App.',
        'FAILURE: API response code 401 Unauthorized. Access correctly blocked.'
      ],
      wrong_tenant: [
        'Attempting to fetch Ledger balance of tenant "ten_dynasty_99" from session "ten_artisan_dynasty"...',
        'Sandbox barrier triggered: Access denied.',
        'Security threat warning: Cross-tenant data leak attempt detected and logged.',
        'FAILURE: Isolation rules correctly prevented neighbor tenant query access.'
      ],
      expired_session: [
        'Simulating OAuth token expiry threshold limit check...',
        'OMNI gateway session timestamp: Expired (2026-08-15T04:00:00).',
        'Forcing user relogin challenge redirect to Passport screen.',
        'FAILURE: Access rejected due to token expiration.'
      ],
      incorrect_scope: [
        'Demo App tries to dispatch direct SMS using notification gateway...',
        'OAuth check: Requesting "notifications.sms" ... NOT FOUND in Passport scope list.',
        'Security context blocked: Insufficient permission scopes authorized.',
        'FAILURE: Request rejected. Scopes boundary correctly enforced.'
      ],
      duplicate_webhook: [
        'Receiving webhook event transaction callback ID: "evt_payout_881920"...',
        'Checking anti-replay index log: ID "evt_payout_881920" already exists (Processed at 04:30:10).',
        'Duplicate transaction replay hazard caught.',
        'FAILURE: Replayed payment event safely ignored and rejected.'
      ],
      rate_abuse: [
        'Spamming 200 consecutive API endpoint requests in 500ms...',
        'Rate limiter check: Rate of 400req/sec exceeds safe threshold (120req/min).',
        'Temporary IP firewall quarantine applied.',
        'FAILURE: Endpoint throttled with status code 429 Too Many Requests.'
      ]
    };

    const runLogs = logsMap[flow] || [];
    const interval = setInterval(() => {
      if (step < runLogs.length) {
        setTestLogs(prev => [...prev, `[STEP ${step+1}] ${runLogs[step]}`]);
        step++;
      } else {
        clearInterval(interval);
        setTestSuccess(false);
        triggerToast('Threat Mitigation Validated', `Failure vector ${flow} was successfully blocked.`, 'error');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-neutral-900 pb-20">
      {/* Sovereign Integration Banner */}
      <div className="bg-neutral-950 text-white py-12 px-6 sm:px-12 relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-600/10 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Proving Standard integration
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-display text-white">
              OMNI Demo Integration App
            </h1>
            <p className="text-neutral-400 text-sm mt-1 max-w-3xl">
              An independent reference app built purely to prove and validate OMNI’s SSO, multi-tenant sandboxing, double-entry financial events, and cryptographic threat-defense boundaries.
            </p>
          </div>
        </div>
      </div>

      {/* Main Workspace Column */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        
        {/* Dynamic Tenant Configuration Header */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-sm transition-colors"
              style={{ backgroundColor: tenantBranding.color }}
            >
              {tenantBranding.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-950 flex items-center gap-2">
                {tenantBranding.name}
                <span className="text-[10px] font-mono bg-neutral-100 border border-neutral-200 text-neutral-500 px-2 py-0.5 rounded-full">
                  {selectedTenant}
                </span>
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Resolved Custom Domain Routing: <strong className="font-mono text-neutral-800">{tenantBranding.domain}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Switch Tenant Profile:</span>
            <select
              value={selectedTenant}
              onChange={(e) => handleTenantChange(e.target.value)}
              className="bg-neutral-50 border border-neutral-200 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
            >
              <option value="ten_dynasty_99">Dynasty Holding Corp (US)</option>
              <option value="ten_artisan_dynasty">Artisan Sovereign Resale (NG)</option>
            </select>
          </div>
        </div>

        {/* Workspace Matrix grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: Tests lists */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Success test list */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <div>
                <h4 className="text-xs font-extrabold uppercase text-neutral-400 tracking-wider">Success Integration Flows</h4>
                <p className="text-xs text-neutral-500 mt-1">Simulate operational workflows to verify compliant API bindings and SSO.</p>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'sso_registration', label: '1. Passport Registration & SSO', desc: 'Checks user registration, SSO creation, and org transfers.' },
                  { id: 'billing_upgrade', label: '2. Billing Upgrade & Commissions', desc: 'Validates Double-Entry accounts ledger, affiliate payouts, and triggers notifications.' },
                  { id: 'ai_autonomy', label: '3. Scoped AI Co-Sign Sandbox', desc: 'Checks Gemini operations within specified budget scopes.' }
                ].map((test) => (
                  <button
                    key={test.id}
                    onClick={() => triggerSuccessTest(test.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs font-medium flex items-center justify-between gap-4 ${
                      activeTestFlow === test.id && testSuccess === true
                        ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                        : 'bg-neutral-50/50 border-neutral-200/60 hover:bg-neutral-50'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-neutral-900 block">{test.label}</span>
                      <span className="text-[11px] text-neutral-500 block mt-1 leading-relaxed">{test.desc}</span>
                    </div>
                    <Play className="w-4 h-4 text-emerald-600 shrink-0 fill-emerald-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Failure test list */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <div>
                <h4 className="text-xs font-extrabold uppercase text-rose-500 tracking-wider">Failure Mitigation Tests</h4>
                <p className="text-xs text-neutral-500 mt-1">Audit security triggers and threat isolation barriers.</p>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'invalid_token', label: 'A. Malformed Token Attack', desc: 'Blocks altered JWT key payloads.' },
                  { id: 'wrong_tenant', label: 'B. Cross-Tenant Leak Attack', desc: 'Attempts unauthorized neighbor ledger queries.' },
                  { id: 'expired_session', label: 'C. Expired Session Gate', desc: 'Requires instant re-validation on expiry.' },
                  { id: 'incorrect_scope', label: 'D. Forbidden Scope Bypass', desc: 'Rejects requests lacking certified Passport keys.' },
                  { id: 'duplicate_webhook', label: 'E. Replayed Webhook Vector', desc: 'Detects duplicate IDs to prevent double credits.' },
                  { id: 'rate_abuse', label: 'F. Endpoint Rate Limiting', desc: 'Safely blocks rate-abuse spammers with code 429.' }
                ].map((test) => (
                  <button
                    key={test.id}
                    onClick={() => triggerFailureTest(test.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs font-medium flex items-center justify-between gap-4 ${
                      activeTestFlow === test.id && testSuccess === false
                        ? 'bg-rose-50 border-rose-400 shadow-sm'
                        : 'bg-neutral-50/50 border-neutral-200/60 hover:bg-neutral-50'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-rose-950 block">{test.label}</span>
                      <span className="text-[11px] text-neutral-500 block mt-1 leading-relaxed">{test.desc}</span>
                    </div>
                    <Play className="w-4 h-4 text-rose-600 shrink-0 fill-rose-600" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT CENTRAL COMPONENT: Live Console Simulator */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-6">
            
            {/* Flow status banner */}
            <div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4">
                <div>
                  <h3 className="text-sm font-bold">Ecosystem Test Console Logger</h3>
                  <p className="text-xs text-neutral-500">Telemetry logs compiled by OMNI API Gateway routers.</p>
                </div>
                {testSuccess !== null && (
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                    testSuccess 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {testSuccess ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {testSuccess ? 'TEST PASSED' : 'MITIGATION VALIDATED'}
                  </span>
                )}
              </div>

              {/* Console Screen */}
              <div className="bg-neutral-950 text-emerald-400 font-mono text-[11px] p-5 rounded-xl h-[420px] overflow-y-auto border border-neutral-800 shadow-inner space-y-2">
                {testLogs.map((log, i) => {
                  let colorClass = 'text-emerald-400';
                  if (log.startsWith('[EXECUTE]')) colorClass = 'text-white font-bold border-b border-neutral-800 pb-1.5 block mt-2';
                  if (log.includes('SUCCESS') || log.includes('Passed')) colorClass = 'text-emerald-300 font-bold';
                  if (log.includes('Error') || log.includes('FAILURE') || log.includes('denied')) colorClass = 'text-rose-400 font-bold';
                  return (
                    <div key={i} className={`leading-relaxed ${colorClass}`}>
                      {log}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Extra manual configuration simulation details */}
            <div className="border-t border-neutral-100 pt-4 grid grid-cols-2 gap-4 text-xs font-medium text-neutral-600">
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
                <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1">Active Passport User</span>
                <p className="text-neutral-900 font-bold">{activeUserSession.email}</p>
                <p className="text-[10px] text-neutral-500 mt-1">Role: {activeUserSession.role.toUpperCase()}</p>
              </div>

              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
                <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1">Passport API Scopes</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activeUserSession.scope.split(' ').map((sc, i) => (
                    <span key={i} className="bg-neutral-200/80 text-neutral-700 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded">
                      {sc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
