import React, { useState, useMemo } from 'react';
import {
  GitMerge, Server, Shield, Link2, Terminal, Layers, FileCheck, CheckCircle2,
  XCircle, AlertTriangle, Play, RefreshCw, Copy, Download, Search, Settings, HelpCircle,
  Database, Users, CreditCard, ChevronRight, CheckCircle, FileText, ArrowRight
} from 'lucide-react';
import { OMNIState } from '../types';

interface OMNIMigrationPageProps {
  state: OMNIState;
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

type MigrationMode = 'MODE_A' | 'MODE_B' | 'MODE_C' | 'MODE_D';

export default function OMNIMigrationPage({ state, triggerToast }: OMNIMigrationPageProps) {
  const [activeMode, setActiveMode] = useState<MigrationMode>('MODE_A');
  const [searchQuery, setSearchQuery] = useState('');

  // Migration Analyzer state
  const [appName, setAppName] = useState('Acme Marketing Suite');
  const [userCount, setUserCount] = useState(1500);
  const [legacyAuth, setLegacyAuth] = useState('Auth0');
  const [legacyDb, setLegacyDb] = useState('PostgreSQL');
  const [legacyBilling, setLegacyBilling] = useState('Stripe (Custom Connect)');
  const [legacyNotifications, setLegacyNotifications] = useState('Twilio/SendGrid');
  const [legacyAnalytics, setLegacyAnalytics] = useState('Mixpanel');
  const [selectedRegion, setSelectedRegion] = useState('US');

  // Interactive sandbox state
  const [dryRunProgress, setDryRunProgress] = useState<number | null>(null);
  const [dryRunLogs, setDryRunLogs] = useState<string[]>([]);
  const [dryRunSuccess, setDryRunSuccess] = useState<boolean | null>(null);
  const [identityMappings, setIdentityMappings] = useState<Array<{ legacy: string; passport: string; status: string }>>([
    { legacy: 'usr_legacy_99182', passport: 'pass_omni_881920', status: 'Mapped & Reconciled' },
    { legacy: 'usr_legacy_33120', passport: 'pass_omni_442190', status: 'Mapped & Reconciled' }
  ]);
  const [newLegacyId, setNewLegacyId] = useState('');
  const [newPassportId, setNewPassportId] = useState('');

  // Authentication & Payment strategy states
  const [authApproach, setAuthApproach] = useState('email-based-matching');
  const [paymentGateway, setPaymentGateway] = useState('stripe-aware-intent');

  // CLI execution simulation states
  const [cliOutput, setCliOutput] = useState<string>('OMNI Migration CLI v1.0.0\nReady. Select a migration routine command below to run tests.');
  const [cliIsRunning, setCliIsRunning] = useState(false);

  // 1. Analyze duplicate services & issue structural recommendations
  const analyzerRecommendations = useMemo(() => {
    return [
      {
        service: 'Authentication',
        legacy: legacyAuth,
        omniEquivalent: 'OMNI Passport OAuth',
        recommendation: 'Replace & Bridge',
        details: 'Transition credentials using email-based matching on first log-in to preserve profiles without exposing cleartext credentials.'
      },
      {
        service: 'Payments & Gateways',
        legacy: legacyBilling,
        omniEquivalent: 'OMNI Sovereign Payments API',
        recommendation: 'Bridge (Gateway Token Export)',
        details: 'Do NOT blindly migrate active subscription agreements. Export gateway transaction tokens or route billing via the OMNI webhook bridge.'
      },
      {
        service: 'Ecosystem Database',
        legacy: legacyDb,
        omniEquivalent: 'OMNI Regional Tenancy Storage',
        recommendation: activeMode === 'MODE_C' ? 'Migrate Fully' : 'Retain & Connect',
        details: activeMode === 'MODE_C' 
          ? 'Import table schemas directly into OMNI central relational node.'
          : 'Keep data isolated. Establish secure DB tunnel and synchronize delta changes daily.'
      },
      {
        service: 'Notification Delivery',
        legacy: legacyNotifications,
        omniEquivalent: 'OMNI Shared Broadcast Services',
        recommendation: 'Replace with native API',
        details: 'Adopt native OMNI templates to save operational Twilio API costs instantly.'
      },
      {
        service: 'Audited Analytics',
        legacy: legacyAnalytics,
        omniEquivalent: 'OMNI Core Event Log Engine',
        recommendation: 'Replace',
        details: 'OMNI core audit-ledger logging registers every transaction natively with SHA-256 validation seals.'
      }
    ];
  }, [legacyAuth, legacyBilling, legacyDb, legacyNotifications, legacyAnalytics, activeMode]);

  // 2. Perform interactive Dry Run Simulation
  const runDryRunSimulation = () => {
    setDryRunProgress(10);
    setDryRunSuccess(null);
    setDryRunLogs(['[04:31:01] INITIALIZING DRY RUN: Acme Marketing Suite Migration Pipeline...', '[04:31:02] VALIDATING TARGET MANIFEST: checking integration compliance...']);

    let progress = 10;
    const interval = setInterval(() => {
      progress += 25;
      if (progress >= 100) {
        clearInterval(interval);
        setDryRunProgress(100);
        setDryRunSuccess(true);
        setDryRunLogs(prev => [
          ...prev,
          `[04:31:04] COMPARING AUTH ENTITIES: Scanned ${userCount} customer profiles.`,
          `[04:31:06] AUDITING DUPLICATES: Detected 0 duplicate email collisions.`,
          `[04:31:08] VALIDATING SECURE CREDENTIALS: Password hashes verified against cryptographic PBKDF2 templates.`,
          `[04:31:10] DRY RUN COMPLETE: 100% data integrity matches. 0 errors, 1 warning (billing gateway tokens must be manually co-signed).`
        ]);
        triggerToast('Dry Run Successful', 'All schema and integration checks passed without duplicate collision errors.', 'success');
      } else {
        setDryRunProgress(progress);
        if (progress === 35) {
          setDryRunLogs(prev => [...prev, '[04:31:03] CHECKING CONFLICTS: Verifying user account email tables against OMNI database...']);
        } else if (progress === 60) {
          setDryRunLogs(prev => [...prev, '[04:31:05] PAYMENT RECONCILIATION: Verifying stripe plan structures matches OMNI ledger maps...']);
        } else if (progress === 85) {
          setDryRunLogs(prev => [...prev, '[04:31:07] DRIZZLE DRY-RUN: Simulating database schema modification migrations...']);
        }
      }
    }, 600);
  };

  const rollbackSimulation = () => {
    setDryRunProgress(null);
    setDryRunSuccess(null);
    setDryRunLogs(['[04:31:15] ROLLBACK INITIATED: Reverting dry-run staging tables...', '[04:31:16] RECONCILIATION RESTORED: All production database logs matched successfully.']);
    triggerToast('Rollback Complete', 'State fully reverted to previous transaction index safely.', 'info');
  };

  const addIdentityMapping = () => {
    if (!newLegacyId || !newPassportId) {
      triggerToast('Validation Error', 'Please supply both original legacy and target OMNI Passport IDs.', 'error');
      return;
    }
    setIdentityMappings(prev => [
      ...prev,
      { legacy: newLegacyId, passport: newPassportId, status: 'Active Link Created' }
    ]);
    setNewLegacyId('');
    setNewPassportId('');
    triggerToast('Identity Link Configured', 'Legacy user mapping record registered.', 'success');
  };

  // 3. CLI Simulator Command executor
  const runCliCommand = (cmd: string) => {
    setCliIsRunning(true);
    setCliOutput(`$ omni-cli migrate ${cmd}\nRunning targeted diagnostic sequence...\n`);

    setTimeout(() => {
      setCliIsRunning(false);
      switch (cmd) {
        case 'validate-manifest':
          setCliOutput(prev => prev + `[PASS] Manifest structure conforms to OMNI App Store v1.2 specification.\n[INFO] App Identifier: app_acme_marketing\n[INFO] Supported Regions: [${selectedRegion}]\n[SUCCESS] Manifest audit validation complete.`);
          break;
        case 'inspect-config':
          setCliOutput(prev => prev + `[AUDIT] Auth Service provider matches: ${legacyAuth}\n[AUDIT] Database node configuration: ${legacyDb}\n[AUDIT] Revenue framework detected: ${legacyBilling}\n[SUCCESS] No invalid un-sandboxed configuration scopes.`);
          break;
        case 'test-endpoints':
          setCliOutput(prev => prev + `[TEST] ping -> https://api.acme.omni.io ... SUCCESS (42ms)\n[TEST] auth-bridge -> https://auth.acme.omni.io ... SUCCESS (60ms)\n[TEST] webhook-ack -> https://webhooks.acme.omni.io ... SUCCESS (35ms)\n[SUCCESS] Endpoints verified.`);
          break;
        case 'test-scopes':
          setCliOutput(prev => prev + `[SCOPES] requested_scopes: ["passport.read", "billing.write", "notifications.broadcast"]\n[STATUS] Verification: APPROVED BY SUPER ADMIN CO-SIGNER\n[SUCCESS] Scopes matches policy boundaries.`);
          break;
        case 'verify-webhooks':
          setCliOutput(prev => prev + `[SEND] Simulating ping event on webhook gateway...\n[RECEIVE] Received valid SHA-256 HMAC signature.\n[SUCCESS] Endpoint correctly validates OMNI payload integrity.`);
          break;
        case 'generate-report':
          setCliOutput(prev => prev + `[BUILD] Formulating OMNI_APP_INTEGRATION_REPORT.md file template...\n[SUCCESS] Report created successfully. See down below to review the template.`);
          break;
        default:
          setCliOutput('Unknown routine.');
      }
    }, 500);
  };

  // 4. Generate Markdown report template based on form state
  const generatedReportMarkdown = useMemo(() => {
    return `# OMNI APP INTEGRATION REPORT (MIGRATION STAGE)
**App Name:** ${appName}
**Target Region:** ${selectedRegion}
**Migration Mode:** ${activeMode}
**Generated Date:** ${new Date().toISOString().substring(0,10)}
**System Watchdog Sign-off:** APPROVED (Pending Dry Run deployment)

## 1. Current Architecture & Environment Summary
- **Legacy Identity system:** ${legacyAuth}
- **Legacy Persistence Database:** ${legacyDb}
- **Billing & Subscriptions Provider:** ${legacyBilling}
- **Telemetry Analytics:** ${legacyAnalytics}
- **Notifications Hub:** ${legacyNotifications}
- **Estimated User Registry Scale:** ${userCount} active users

## 2. Duplicate Services Analysis & Resolution Action Plan
${analyzerRecommendations.map((r, i) => `
### ${i+1}. Service: ${r.service}
- **Legacy System:** \`${r.legacy}\`
- **OMNI Equivalent:** \`${r.omniEquivalent}\`
- **Recommended Strategy:** **${r.recommendation}**
- **Implementation Strategy:** ${r.details}`).join('\n')}

## 3. Data & Identity Migration Roadmap
### A. Cryptographic Password Preservation
- Do NOT import cleartext passwords.
- **Approach Chosen:** \`${authApproach.toUpperCase()}\`
- **Strategy:** Map legacy accounts dynamically using email verification loops during authentication transitions. Original third-party legacy IDs are retained in the master map without loss.

### B. Gateway Subscription Preservation
- **Approach Chosen:** \`${paymentGateway.toUpperCase()}\`
- **Strategy:** Prevent subscription double-charging by utilizing Stripe gateway key handshakes. Retain legacy billing tokens and proxy webhook notifications through OMNI.

## 4. Compliance, Risks & Mitigations
- **Fraud Vector:** Duplicate self-referral accounts during conversion loops. Enforced verification guards.
- **Downtime Mitigation:** API Bridge keeps legacy app operational with zero transition delay.

## 5. Deployment Test Plan
- Run \`omni-cli migrate validate-manifest\` to confirm manifest boundaries.
- Run Dry-Run schema migrations on standard sandbox DB first.
- Reconcile transaction ledger totals using SHA-256 seals.
`;
  }, [appName, selectedRegion, activeMode, legacyAuth, legacyDb, legacyBilling, legacyAnalytics, legacyNotifications, userCount, analyzerRecommendations, authApproach, paymentGateway]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReportMarkdown);
    triggerToast('Report Copied', 'Markdown content copied to clipboard successfully.', 'success');
  };

  const downloadReportFile = () => {
    const blob = new Blob([generatedReportMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'OMNI_APP_INTEGRATION_REPORT.md';
    link.click();
    URL.revokeObjectURL(url);
    triggerToast('Report Exported', 'OMNI_APP_INTEGRATION_REPORT.md downloaded successfully.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-neutral-900 pb-20">
      {/* Top Header Banner */}
      <div className="bg-neutral-950 text-white py-12 px-6 sm:px-12 relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-rose-600/10 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold text-rose-400 tracking-wider uppercase mb-3">
              <GitMerge className="w-3.5 h-3.5 animate-pulse" />
              OMNI Integration Engine
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-display text-white">
              Application Migration &amp; Integration Suite
            </h1>
            <p className="text-neutral-400 text-sm mt-1 max-w-3xl">
              Integrate, map, and translate external projects safely into the OMNI ecosystem. Configure provider-aware payment migrations, dynamic identity bindings, dry-run simulations, and automated integration report engines.
            </p>
          </div>
        </div>
      </div>

      {/* Main Workspace Column */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">

        {/* SECTION 1: Migration Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              id: 'MODE_A',
              title: 'Mode A — API Bridge',
              desc: 'Keep existing app separately deployed. Integrate Passport, Billing, Analytics via high-integrity APIs.',
              badge: 'Safest / Zero Risk'
            },
            {
              id: 'MODE_B',
              title: 'Mode B — Hybrid Migration',
              desc: 'Keep legacy backend services active but swap the frontend to consume shared OMNI services.',
              badge: 'Balanced Scope'
            },
            {
              id: 'MODE_C',
              title: 'Mode C — Native Migration',
              desc: 'Re-author or import fully into the OMNI monorepo. Full performance and shared compliance benefits.',
              badge: 'Maximum Optimization'
            },
            {
              id: 'MODE_D',
              title: 'Mode D — External App',
              desc: 'Third-party independent developer connects using OMNI API scopes with user authorizations.',
              badge: 'Connected Sandbox'
            }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setActiveMode(mode.id as MigrationMode);
                triggerToast('Mode Selected', `Active migration context switched to ${mode.title}`, 'info');
              }}
              className={`text-left p-5 rounded-2xl border transition-all relative ${
                activeMode === mode.id
                  ? 'bg-white border-rose-500 shadow-md ring-1 ring-rose-500'
                  : 'bg-white border-neutral-200/80 hover:border-neutral-400 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  activeMode === mode.id ? 'bg-rose-100 text-rose-800' : 'bg-neutral-100 text-neutral-800'
                }`}>
                  {mode.badge}
                </span>
                {activeMode === mode.id && <CheckCircle2 className="w-4.5 h-4.5 text-rose-500" />}
              </div>
              <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">{mode.title}</h4>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{mode.desc}</p>
            </button>
          ))}
        </div>

        {/* SECTION 2: Dynamic Migration Analyzer & Strategy Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Legacy App Metadata Entry Form (Analyzer inputs) */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-bold border-b border-neutral-100 pb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-rose-500" />
              1. Legacy Architecture Profiler
            </h3>

            <div className="space-y-3.5 text-xs font-medium">
              <div>
                <label className="block text-neutral-500 mb-1">Target Application Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-500 mb-1">User Base Count</label>
                  <input
                    type="number"
                    value={userCount}
                    onChange={(e) => setUserCount(Number(e.target.value))}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Sovereign Region</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    <option value="US">United States (US)</option>
                    <option value="GB">United Kingdom (GB)</option>
                    <option value="NG">Nigeria (NG)</option>
                    <option value="DE">Germany (DE)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Authentication system</label>
                <select
                  value={legacyAuth}
                  onChange={(e) => setLegacyAuth(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="Auth0">Auth0</option>
                  <option value="Firebase Auth (un-consolidated)">Firebase Auth (un-consolidated)</option>
                  <option value="Direct Database BCrypt Hashes">Direct Database BCrypt Hashes</option>
                  <option value="Clerk Platform">Clerk Platform</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Active Database Technology</label>
                <select
                  value={legacyDb}
                  onChange={(e) => setLegacyDb(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="PostgreSQL">PostgreSQL</option>
                  <option value="MySQL / Aurora">MySQL / Aurora</option>
                  <option value="MongoDB / DocumentDB">MongoDB / DocumentDB</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Revenue / Subscriptions Platform</label>
                <select
                  value={legacyBilling}
                  onChange={(e) => setLegacyBilling(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="Stripe (Custom Connect)">Stripe (Custom Connect)</option>
                  <option value="PayPal Standard Agreements">PayPal Standard Agreements</option>
                  <option value="Paddle Merchant of Record">Paddle Merchant of Record</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-500 mb-1">Notifications Hub</label>
                  <input
                    type="text"
                    value={legacyNotifications}
                    onChange={(e) => setLegacyNotifications(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Telemetry Tool</label>
                  <input
                    type="text"
                    value={legacyAnalytics}
                    onChange={(e) => setLegacyAnalytics(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* OMNI Analyzer Recommendations Engine Output */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold border-b border-neutral-100 pb-3 flex items-center justify-between">
                <span>2. OMNI Analyzer Service Recommendations</span>
                <span className="text-[10px] bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full uppercase font-bold">Dynamic Audit</span>
              </h3>

              <div className="space-y-4 mt-4">
                {analyzerRecommendations.map((rec, idx) => (
                  <div key={idx} className="flex gap-4 p-3 border border-neutral-100 rounded-xl bg-neutral-50/50 hover:bg-neutral-50 transition-colors">
                    <div className="p-2 bg-white rounded-lg border border-neutral-200 flex items-center justify-center shrink-0 w-10 h-10">
                      {rec.service === 'Authentication' && <Shield className="w-5 h-5 text-rose-600" />}
                      {rec.service === 'Payments & Gateways' && <CreditCard className="w-5 h-5 text-rose-600" />}
                      {rec.service === 'Ecosystem Database' && <Database className="w-5 h-5 text-rose-600" />}
                      {rec.service === 'Notification Delivery' && <GitMerge className="w-5 h-5 text-rose-600" />}
                      {rec.service === 'Audited Analytics' && <Layers className="w-5 h-5 text-rose-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-neutral-900">{rec.service}</h4>
                        <span className="text-[9px] bg-neutral-900 text-white font-extrabold px-1.5 py-0.5 rounded uppercase">
                          {rec.recommendation}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Duplicate: <strong className="text-neutral-800">{rec.legacy}</strong> matches OMNI's <strong className="text-neutral-800">{rec.omniEquivalent}</strong>.
                      </p>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-1">{rec.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 text-[10px] text-neutral-400 font-semibold uppercase flex items-center justify-between">
              <span>Secure isolation boundary fully preserved.</span>
              <span className="text-rose-600">Pending dry run execution</span>
            </div>
          </div>

        </div>

        {/* SECTION 3: Identity & Authentication Transition Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Identity Mappings registry */}
          <div className="lg:col-span-6 bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold border-b border-neutral-100 pb-3 flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-rose-600" />
                3. Identity Translation &amp; Passport Registry
              </h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Map existing user IDs to newly assigned OMNI Passport credentials dynamically. Original developer IDs remain perfectly preserved in the secure routing dictionary.
              </p>

              {/* Input builder */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-medium">
                <div>
                  <label className="block text-neutral-500 mb-1">Original Legacy ID</label>
                  <input
                    type="text"
                    placeholder="e.g. legacy_acme_u91"
                    value={newLegacyId}
                    onChange={(e) => setNewLegacyId(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Target Passport ID</label>
                  <input
                    type="text"
                    placeholder="e.g. passport_omni_721"
                    value={newPassportId}
                    onChange={(e) => setNewPassportId(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1"
                  />
                </div>
              </div>

              <button
                onClick={addIdentityMapping}
                className="w-full bg-neutral-950 text-white hover:bg-neutral-800 transition-colors text-xs font-bold py-2 rounded-xl mt-3 uppercase tracking-wider"
              >
                Register Translation Binding
              </button>

              {/* Mapping table display */}
              <div className="mt-6 space-y-2.5">
                <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block">Currently Mapped Keys</span>
                {identityMappings.map((map, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200/60 font-mono text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500">{map.legacy}</span>
                      <ArrowRight className="w-3 h-3 text-neutral-400" />
                      <span className="text-neutral-950 font-bold">{map.passport}</span>
                    </div>
                    <span className="text-emerald-600 font-bold text-[9px] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">{map.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 text-[10px] text-rose-600 font-extrabold uppercase tracking-wider">
              No plaintext passwords stored or imported.
            </div>
          </div>

          {/* Authentication Transition Strategies */}
          <div className="lg:col-span-6 bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold border-b border-neutral-100 pb-3 flex items-center gap-2">
                <Shield className="w-4.5 h-4.5 text-rose-600" />
                4. Dynamic Authentication Transitions
              </h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Select your preferred compliance workflow to transition active users dynamically onto OMNI Passport services.
              </p>

              <div className="mt-4 space-y-3.5 text-xs font-medium">
                {[
                  {
                    id: 'email-based-matching',
                    label: 'A. Email-Based Matching',
                    desc: 'Preserves previous data records of matching emails. Triggers a secure link confirmation message when logging in first time.'
                  },
                  {
                    id: 'account-linking',
                    label: 'B. Direct Account Linking',
                    desc: 'Enforces explicit linking. Shows legacy customers a prompt requesting they connect their previous credentials.'
                  },
                  {
                    id: 'forced-relogin',
                    label: 'C. Forced Relogin',
                    desc: 'Flags entire user cohort session state as expired, requiring instant MFA credential setup on OMNI passport routing.'
                  },
                  {
                    id: 'oauth-transition',
                    label: 'D. OAuth / SAML Gateway Handshake',
                    desc: 'Redirects corporate authentication flows dynamically to your federated directory system without modifications.'
                  }
                ].map((strat) => (
                  <label
                    key={strat.id}
                    onClick={() => setAuthApproach(strat.id)}
                    className={`block p-3.5 border rounded-xl cursor-pointer transition-all ${
                      authApproach === strat.id
                        ? 'bg-rose-50/50 border-rose-400'
                        : 'bg-neutral-50/50 border-neutral-200/60 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={authApproach === strat.id}
                        onChange={() => {}}
                        className="accent-rose-600"
                      />
                      <span className="font-bold text-neutral-900">{strat.label}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed pl-5">{strat.desc}</p>
                  </label>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 4: Reconciled Data & Payment Gateway Pipeline Simulator */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-100 pb-4 mb-6">
            <div>
              <h3 className="text-sm font-bold">5. Provider-Aware Data Reconciliation &amp; Staging pipeline</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Simulate end-to-end user importing dry runs, active subscription gateway linking, and instant safety rolls.</p>
            </div>
            <div className="flex gap-2 mt-3 md:mt-0">
              <button
                onClick={runCliCommand.bind(null, 'verify-webhooks')}
                className="bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 text-xs font-bold px-3 py-2 rounded-xl transition-all"
              >
                Verify Billing Webhooks
              </button>
              <button
                onClick={rollbackSimulation}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold px-3 py-2 rounded-xl transition-all"
              >
                Instant Safety Rollback
              </button>
              <button
                onClick={runDryRunSimulation}
                className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Run Dynamic Dry Run
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Payment gateway logic rules (Provider aware) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl">
                <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider">Gateway Integrity Alert</span>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Never blindly migrate raw customer subscription plans between active Stripe/PayPal payment gateway keys! Double charging occurs during mismatch intervals.
                </p>
              </div>

              <div className="space-y-2.5 text-xs font-medium">
                <label className="block text-neutral-500">Select Provider Tokenization Strategy</label>
                {[
                  { id: 'stripe-aware-intent', label: 'Stripe Gateway Key Mirroring', desc: 'Securely proxy legacy metadata mappings to match identical billing cycles.' },
                  { id: 'manual-re-register', label: 'Accredited Verification Re-sign', desc: 'Notify clients at end of current billing duration to confirm new security tokens.' }
                ].map((gate) => (
                  <label
                    key={gate.id}
                    onClick={() => setPaymentGateway(gate.id)}
                    className={`block p-3 border rounded-xl cursor-pointer transition-all ${
                      paymentGateway === gate.id ? 'bg-white border-neutral-900 shadow-sm' : 'bg-neutral-50/50 border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input type="radio" checked={paymentGateway === gate.id} onChange={() => {}} className="accent-neutral-900" />
                      <span className="font-bold text-neutral-900">{gate.label}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1.5 pl-5">{gate.desc}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Dry Run Console screen */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                <span>Staging Pipeline Console Logger</span>
                {dryRunProgress !== null && (
                  <span className="text-rose-600 animate-pulse">{dryRunProgress}% Completed</span>
                )}
              </div>

              {/* Progress bar visual */}
              {dryRunProgress !== null && (
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div className="bg-rose-600 h-2 rounded-full transition-all duration-300" style={{ width: `${dryRunProgress}%` }} />
                </div>
              )}

              {/* Terminal screen */}
              <div className="bg-neutral-950 text-emerald-400 font-mono text-[10px] p-4 rounded-xl overflow-y-auto h-44 border border-neutral-800 shadow-inner">
                {dryRunLogs.length === 0 ? (
                  <span className="text-neutral-500">Console silent. Trigger a dynamic dry run to view schema auditing logs...</span>
                ) : (
                  dryRunLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">{log}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: OMNI Migration CLI Simulation & Dynamic Report Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CLI Panel */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold border-b border-neutral-100 pb-3 flex items-center gap-2">
                <Terminal className="w-4.5 h-4.5 text-rose-600 animate-pulse" />
                6. OMNI CLI Developer Toolkit
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Execute core diagnostic CLI commands to audit integration compliance configurations, test API paths, and register app webhooks.
              </p>

              <div className="mt-5 space-y-2">
                {[
                  { cmd: 'validate-manifest', label: 'validate-manifest', desc: 'Inspect config properties of the JSON schema manifest.' },
                  { cmd: 'inspect-config', label: 'inspect-config', desc: 'Verify third-party database keys scopes.' },
                  { cmd: 'test-endpoints', label: 'test-endpoints', desc: 'Ping endpoints connection velocities.' },
                  { cmd: 'test-scopes', label: 'test-scopes', desc: 'Audit OMNI passport authorization keys.' },
                  { cmd: 'verify-webhooks', label: 'verify-webhooks', desc: 'Generate HMAC signed testing payload webhook verification.' },
                  { cmd: 'generate-report', label: 'generate-report', desc: 'Compile OMNI_APP_INTEGRATION_REPORT.md structure.' }
                ].map((action) => (
                  <button
                    key={action.cmd}
                    onClick={() => runCliCommand(action.cmd)}
                    disabled={cliIsRunning}
                    className="w-full text-left p-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl transition-all flex items-center justify-between text-xs"
                  >
                    <div>
                      <strong className="font-mono text-neutral-900 bg-neutral-200 px-1.5 py-0.5 rounded mr-2">
                        {action.label}
                      </strong>
                      <span className="text-neutral-500 text-[10px]">{action.desc}</span>
                    </div>
                    <ChevronRight className="w-4.5 h-4.5 text-neutral-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* CLI Output window */}
            <div className="mt-4 pt-3 border-t border-neutral-100">
              <span className="text-[9px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1.5">CLI Execution Stream Output</span>
              <div className="bg-neutral-950 text-emerald-400 font-mono text-[10px] p-3.5 rounded-lg h-32 overflow-y-auto border border-neutral-800">
                {cliOutput}
              </div>
            </div>
          </div>

          {/* Dynamic Integration Report View Deck */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold">7. OMNI_APP_INTEGRATION_REPORT.md (Compiled Report)</h3>
                  <p className="text-xs text-neutral-500">Live generated markdown document matching your Analyzer setup above.</p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-600 transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadReportFile}
                    className="p-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-600 transition-colors"
                    title="Download Markdown Report file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Markdown Display */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 h-96 overflow-y-auto font-mono text-[10px] text-neutral-700 whitespace-pre-wrap leading-relaxed shadow-inner">
                {generatedReportMarkdown}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-neutral-500">File is compliant with OMNI deployment criteria.</span>
              <button
                onClick={downloadReportFile}
                className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-bold text-xs"
              >
                Download Report File
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
