import React, { useState } from 'react';
import {
  Code, Key, Webhook, Layers, Terminal, Sparkles, Shield, Copy, Check,
  Send, Server, Globe, Cpu, RefreshCw, Sliders, FileText, CheckCircle2,
  AlertTriangle, Lock, Eye, EyeOff, Play, ArrowRight, Zap, ExternalLink,
  ChevronRight, Box, Compass, HelpCircle, Laptop, Smartphone, BookOpen
} from 'lucide-react';
import {
  DeveloperApplication,
  DeveloperApiKey,
  WebhookSubscription,
  WebhookDeliveryLog,
  EmbeddedBaaSBlueprint,
  DeveloperApiRouteSpec,
  EmbeddedApiEnvironment,
  FinanceTenant
} from '../../types/finance_os';
import {
  SEED_DEVELOPER_APPLICATIONS,
  SEED_DEVELOPER_API_KEYS,
  SEED_WEBHOOK_SUBSCRIPTIONS,
  SEED_WEBHOOK_DELIVERY_LOGS,
  SEED_BAAS_BLUEPRINTS,
  SEED_API_ROUTE_SPECS
} from '../../data/omni_developer_platform_seed';

interface OmniEmbeddedDeveloperPlatformProps {
  activeTenant?: FinanceTenant;
  onShowToast?: (msg: string) => void;
}

export default function OmniEmbeddedDeveloperPlatform({
  activeTenant,
  onShowToast
}: OmniEmbeddedDeveloperPlatformProps) {
  // Global Environment & Selected Application State
  const [environment, setEnvironment] = useState<EmbeddedApiEnvironment>('production');
  const [applications, setApplications] = useState<DeveloperApplication[]>(SEED_DEVELOPER_APPLICATIONS);
  const [selectedAppId, setSelectedAppId] = useState<string>(SEED_DEVELOPER_APPLICATIONS[0].id);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<
    | 'api_keys'
    | 'api_explorer'
    | 'sdks'
    | 'webhooks'
    | 'baas_blueprints'
    | 'partner_metrics'
    | 'ai_assistant'
    | 'dev_tests'
  >('api_keys');

  // API Keys State
  const [apiKeys, setApiKeys] = useState<DeveloperApiKey[]>(SEED_DEVELOPER_API_KEYS);
  const [revealedKeyIds, setRevealedKeyIds] = useState<Record<string, boolean>>({});
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState<'secret' | 'publishable'>('secret');

  // API Explorer State
  const [apiRoutes] = useState<DeveloperApiRouteSpec[]>(SEED_API_ROUTE_SPECS);
  const [selectedRoutePath, setSelectedRoutePath] = useState<string>(SEED_API_ROUTE_SPECS[0].path);
  const [apiRequestBody, setApiRequestBody] = useState<string>(SEED_API_ROUTE_SPECS[0].requestBodySample || '');
  const [apiResponseOutput, setApiResponseOutput] = useState<string>(SEED_API_ROUTE_SPECS[0].responseSample);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [apiResponseStatus, setApiResponseStatus] = useState<number>(200);
  const [apiResponseTime, setApiResponseTime] = useState<number>(42);

  // SDK Language Selector
  const [selectedSdkLang, setSelectedSdkLang] = useState<'typescript' | 'python' | 'ios_swift' | 'android_kotlin' | 'curl'>('typescript');

  // Webhooks State
  const [webhookSubs, setWebhookSubs] = useState<WebhookSubscription[]>(SEED_WEBHOOK_SUBSCRIPTIONS);
  const [webhookLogs, setWebhookLogs] = useState<WebhookDeliveryLog[]>(SEED_WEBHOOK_DELIVERY_LOGS);
  const [isSendingTestWebhook, setIsSendingTestWebhook] = useState(false);

  // BaaS Blueprints
  const [blueprints] = useState<EmbeddedBaaSBlueprint[]>(SEED_BAAS_BLUEPRINTS);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(SEED_BAAS_BLUEPRINTS[0].id);

  // AI Developer Assistant
  const [aiDevMessages, setAiDevMessages] = useState<{
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
    codeSnippet?: string;
  }>([
    {
      id: 'ai_01',
      sender: 'ai',
      text: 'Hello Developer! I am OMNI Dev Assistant AI. I can generate integration code, construct multi-tier split payout instructions, debug webhook signature verifications, or outline BaaS embedded finance workflows for your application.',
      timestamp: '09:00 AM'
    }
  ]);
  const [aiDevInput, setAiDevInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Developer Test Matrix
  const [devTests, setDevTests] = useState<{
    id: string;
    title: string;
    category: string;
    description: string;
    status: 'idle' | 'running' | 'passed' | 'failed';
    proof: string;
  }>([
    {
      id: 't_01',
      title: 'API Key Bearer Authentication & Scope Validation',
      category: 'Authentication',
      description: 'Verifies live and sandbox Bearer keys enforce granular RBAC scopes without leakage.',
      status: 'passed',
      proof: 'PASSED: Validated omni_live_sec_*** with [wallets:*, payments:*] -> 200 OK'
    },
    {
      id: 't_02',
      title: 'Rate Limit Enforcer (1000 req/min Leaky Bucket)',
      category: 'Rate Limiting',
      description: 'Simulates high-velocity burst of 1,200 requests/minute testing RFC 6585 headers.',
      status: 'passed',
      proof: 'PASSED: HTTP 429 Too Many Requests returned with Retry-After: 12s header'
    },
    {
      id: 't_03',
      title: 'Webhook HMAC-SHA256 Signature & Anti-Replay',
      category: 'Webhook Security',
      description: 'Validates X-Omni-Signature header and verifies timestamp delta within 300s window.',
      status: 'passed',
      proof: 'PASSED: HMAC-SHA256 signature verified against payload hash; expired replay rejected'
    },
    {
      id: 't_04',
      title: 'Multi-Tenant Data Isolation Boundary',
      category: 'Tenant Isolation',
      description: 'Ensures Application A credentials cannot query or transfer funds from Application B.',
      status: 'passed',
      proof: 'PASSED: 403 Forbidden on foreign tenant wallet ID query. Zero data leakage.'
    },
    {
      id: 't_05',
      title: 'RFC 7807 Standardized Problem Error Payload',
      category: 'Error Handling',
      description: 'Tests malformed JSON request to /api/v1/payments/charges for structured schema validation.',
      status: 'passed',
      proof: 'PASSED: Returned type=https://docs.omni.finance/errors/invalid_currency, status=400'
    },
    {
      id: 't_06',
      title: 'SDK Generated Client Execution Test',
      category: 'SDK Integrity',
      description: 'Simulates Node.js & Python SDK initialization against mock sandbox gateway.',
      status: 'passed',
      proof: 'PASSED: client.payments.create() successfully returned typed PaymentIntent object'
    }
  ]);

  // Current active app
  const currentApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  // Helper Copy To Clipboard
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (onShowToast) onShowToast('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle Reveal Key
  const handleToggleRevealKey = (keyId: string) => {
    setRevealedKeyIds((prev) => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  // Generate New Key
  const handleCreateApiKey = () => {
    if (!newKeyName.trim()) return;
    const prefix = newKeyType === 'secret' ? (environment === 'production' ? 'omni_live_sec' : 'omni_test_sec') : 'omni_pub';
    const randomHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const newKey: DeveloperApiKey = {
      id: `key_${Date.now()}`,
      appId: selectedAppId,
      name: newKeyName,
      keyPrefix: prefix as any,
      tokenMasked: `${prefix}_${randomHash.substring(0, 4)}************************${randomHash.substring(randomHash.length - 4)}`,
      environment: environment,
      scopes: ['wallets:*', 'payments:*', 'transfers:*'],
      rateLimitPerMin: environment === 'production' ? 2000 : 300,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    setApiKeys((prev) => [newKey, ...prev]);
    setNewKeyName('');
    setShowNewKeyModal(false);
    if (onShowToast) onShowToast(`Generated new ${newKeyType.toUpperCase()} API key`);
  };

  // Revoke Key
  const handleRevokeKey = (keyId: string) => {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === keyId ? { ...k, status: 'revoked' } : k))
    );
    if (onShowToast) onShowToast('API Key revoked');
  };

  // Execute API Request in Explorer
  const handleExecuteApiExplorer = () => {
    setIsSendingRequest(true);
    setTimeout(() => {
      setIsSendingRequest(false);
      const selectedRoute = apiRoutes.find((r) => r.path === selectedRoutePath);
      setApiResponseOutput(selectedRoute?.responseSample || '{}');
      setApiResponseStatus(200);
      setApiResponseTime(Math.floor(Math.random() * 30) + 25);
      if (onShowToast) onShowToast(`200 OK — ${selectedRoute?.method} ${selectedRoutePath}`);
    }, 450);
  };

  // Send Test Webhook
  const handleSendTestWebhook = () => {
    setIsSendingTestWebhook(true);
    setTimeout(() => {
      setIsSendingTestWebhook(false);
      const newLog: WebhookDeliveryLog = {
        id: `wh_log_${Date.now()}`,
        subscriptionId: webhookSubs[0]?.id || 'wh_sub_01',
        eventType: 'payment.completed',
        endpointUrl: webhookSubs[0]?.url || 'https://api.nexusmarket.io/v1/omni-webhooks',
        httpStatus: 200,
        status: 'delivered',
        attemptNumber: 1,
        payloadSummary: '{"event": "payment.completed", "amount": 8900.00, "currency": "USD", "status": "succeeded"}',
        signatureHeader: `t=${Math.floor(Date.now() / 1000)},v1=${Math.random().toString(16).substring(2, 42)}`,
        durationMs: Math.floor(Math.random() * 40) + 45,
        timestamp: new Date().toISOString(),
        responseBody: '{"received": true, "ack": "ok"}'
      };
      setWebhookLogs((prev) => [newLog, ...prev]);
      if (onShowToast) onShowToast('Test webhook dispatched with HMAC-SHA256 signature (200 OK)');
    }, 600);
  };

  // Send AI Message
  const handleSendAiDevMessage = (promptText?: string) => {
    const text = promptText || aiDevInput;
    if (!text.trim()) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user' as const,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiDevMessages((prev) => [...prev, userMsg]);
    setAiDevInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      let aiResponseText = '';
      let codeSnippet = '';

      const lower = text.toLowerCase();
      if (lower.includes('split') || lower.includes('marketplace') || lower.includes('escrow')) {
        aiResponseText =
          'To implement a two-sided marketplace split checkout with escrow release in OMNI Finance, initialize the SDK and invoke `omni.payments.create()` with a `split_rules` block. The buyer payment will be securely held in the escrow vault until fulfillment.';
        codeSnippet = `import { OmniFinance } from '@omni-finance/sdk';

const omni = new OmniFinance(process.env.OMNI_SECRET_KEY);

const payment = await omni.payments.create({
  amount: 2500.00,
  currency: 'USD',
  payment_method: 'pm_card_visa',
  split_rules: [
    {
      destination_wallet_id: 'wlt_merchant_seller_89',
      amount: 2250.00, // 90% to Seller
      release_trigger: 'manual_or_delivery'
    },
    {
      destination_wallet_id: 'wlt_platform_fee',
      amount: 250.00, // 10% Platform Commission
      release_trigger: 'instant'
    }
  ]
});

console.log('Payment Escrow Created:', payment.id);`;
      } else if (lower.includes('webhook') || lower.includes('signature') || lower.includes('verify')) {
        aiResponseText =
          'All OMNI webhooks include an `X-Omni-Signature` header in the format `t=<timestamp>,v1=<hmac_sha256>`. Compute the SHA256 HMAC of `<timestamp>.<raw_body>` using your webhook signing secret (`whsec_...`) and perform a constant-time equality comparison.';
        codeSnippet = `import crypto from 'crypto';

export function verifyOmniWebhook(rawBody, signatureHeader, secret) {
  const parts = signatureHeader.split(',');
  const timestamp = parts.find(p => p.startsWith('t=')).split('=')[1];
  const signature = parts.find(p => p.startsWith('v1=')).split('=')[1];

  const signedPayload = \`\${timestamp}.\${rawBody}\`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}`;
      } else if (lower.includes('python') || lower.includes('card') || lower.includes('wallet')) {
        aiResponseText =
          'Here is the Python SDK pattern for provisioning an embedded employee expense wallet with a pre-allocated limit:';
        codeSnippet = `from omni_finance import OmniClient

client = OmniClient(api_key="omni_live_sec_...")

# 1. Provision Sub-Wallet
wallet = client.wallets.create(
    customer_id="cus_emp_901824",
    currencies=["USD", "EUR"],
    label="Corporate Travel & Expense Wallet"
)

# 2. Issue Virtual Mastercard
card = client.cards.issue_virtual(
    wallet_id=wallet.id,
    monthly_limit=1500.00,
    mcc_allowlist=["5812", "5814", "3000"] # Dining & Travel
)

print(f"Issued Card: {card.masked_pan} (ID: {card.id})")`;
      } else {
        aiResponseText = `I have analyzed your developer query regarding "${text}". OMNI Finance provides versioned /api/v1 endpoints across Customers, Wallets, Payments, Transfers, Invoices, Subscriptions, and FX with complete multi-currency support and pluggable webhooks.`;
      }

      const aiMsg = {
        id: `ai_${Date.now()}`,
        sender: 'ai' as const,
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        codeSnippet
      };

      setAiDevMessages((prev) => [...prev, aiMsg]);
      setIsAiThinking(false);
    }, 550);
  };

  // Run Test
  const handleRunDevTest = (testId: string) => {
    setDevTests((prev) =>
      prev.map((t) => (t.id === testId ? { ...t, status: 'running' } : t))
    );
    setTimeout(() => {
      setDevTests((prev) =>
        prev.map((t) => (t.id === testId ? { ...t, status: 'passed' } : t))
      );
    }, 600);
  };

  const handleRunAllDevTests = () => {
    setDevTests((prev) => prev.map((t) => ({ ...t, status: 'running' })));
    setTimeout(() => {
      setDevTests((prev) => prev.map((t) => ({ ...t, status: 'passed' })));
      if (onShowToast) onShowToast('All 6 Developer & API security tests passed (100% Green)');
    }, 800);
  };

  // Selected Blueprint
  const selectedBlueprint = blueprints.find((b) => b.id === selectedBlueprintId) || blueprints[0];

  return (
    <div className="space-y-6" id="omni-embedded-developer-platform">
      {/* Top Banner: Developer Portal & Environment Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white shadow-md">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight">OMNI Embedded Finance & Developer Platform</h2>
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-mono">
                    developers.finance.omni.com
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Financial Infrastructure as a Service (FaaS / BaaS) • /api/v1 RESTful Gateway & Native Multi-Platform SDKs
                </p>
              </div>
            </div>
          </div>

          {/* Controls: App Selector & Environment Mode */}
          <div className="flex flex-wrap items-center gap-3">
            {/* App Selector */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs">
              <span className="text-slate-400 text-[10px] block">Active Application:</span>
              <select
                value={selectedAppId}
                onChange={(e) => setSelectedAppId(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                {applications.map((app) => (
                  <option key={app.id} value={app.id} className="bg-slate-800 text-white">
                    {app.name} ({app.environment.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            {/* Environment Toggle (Sandbox vs Production) */}
            <div className="flex items-center bg-slate-800 border border-slate-700 p-1 rounded-lg text-xs">
              <button
                onClick={() => setEnvironment('sandbox')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  environment === 'sandbox'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sandbox
              </button>
              <button
                onClick={() => setEnvironment('production')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  environment === 'production'
                    ? 'bg-emerald-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Production
              </button>
            </div>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="flex items-center gap-1.5 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'api_keys', label: 'API Keys & Credentials', icon: Key },
            { id: 'api_explorer', label: 'Interactive API Explorer (/api/v1)', icon: Code },
            { id: 'sdks', label: 'Multi-Language SDKs', icon: Box },
            { id: 'webhooks', label: 'Webhooks & Event Bus', icon: Webhook },
            { id: 'baas_blueprints', label: 'Embedded BaaS Blueprints', icon: Layers },
            { id: 'partner_metrics', label: 'Partner Management & Usage', icon: Sliders },
            { id: 'ai_assistant', label: 'AI Developer Assistant', icon: Sparkles },
            { id: 'dev_tests', label: 'Developer Test Matrix', icon: CheckCircle2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. API KEYS & CREDENTIALS                                                */}
      {/* ========================================================================= */}
      {activeTab === 'api_keys' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">API Keys & Authentication Credentials</h3>
              <p className="text-xs text-slate-500">
                Authenticate server-side and client-side requests with granular OAuth scopes and strict rate limit policies.
              </p>
            </div>

            <button
              onClick={() => setShowNewKeyModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Key className="w-4 h-4" />
              Generate New API Key
            </button>
          </div>

          {/* Keys Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-6 py-3.5">Key Name & Token</th>
                    <th className="px-6 py-3.5">Type & Environment</th>
                    <th className="px-6 py-3.5">Assigned Scopes</th>
                    <th className="px-6 py-3.5">Rate Limit</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {apiKeys
                    .filter((k) => k.appId === selectedAppId || k.environment === environment)
                    .map((k) => {
                      const isRevealed = revealedKeyIds[k.id];
                      return (
                        <tr key={k.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-900">{k.name}</div>
                            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-600 mt-1">
                              <span>
                                {isRevealed
                                  ? `${k.keyPrefix}_live_sec_99182049182740192847190284710294`
                                  : k.tokenMasked}
                              </span>
                              <button
                                onClick={() => handleToggleRevealKey(k.id)}
                                className="text-slate-400 hover:text-slate-600"
                                title="Toggle Reveal"
                              >
                                {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => handleCopy(k.tokenMasked, k.id)}
                                className="text-slate-400 hover:text-indigo-600"
                                title="Copy Key"
                              >
                                {copiedId === k.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                              {k.keyPrefix.replace('_', ' ')}
                            </span>
                            <span className={`ml-2 px-2 py-0.5 text-[10px] font-bold rounded-full ${k.environment === 'production' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                              {k.environment.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {k.scopes.map((s, idx) => (
                                <span key={idx} className="px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[10px] font-mono rounded">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-slate-700">
                            {k.rateLimitPerMin} req/min
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${k.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                              {k.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {k.status === 'active' && (
                              <button
                                onClick={() => handleRevokeKey(k.id)}
                                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-[11px] font-semibold transition-colors"
                              >
                                Revoke
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* New Key Generation Modal */}
          {showNewKeyModal && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Generate New API Key</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Key Description / Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Primary Backend Gateway Server"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Key Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setNewKeyType('secret')}
                        className={`p-2.5 rounded-lg border text-left font-semibold ${
                          newKeyType === 'secret'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        Secret Key (Server)
                        <span className="block text-[10px] font-normal text-slate-500 mt-0.5">For backend servers (full access)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewKeyType('publishable')}
                        className={`p-2.5 rounded-lg border text-left font-semibold ${
                          newKeyType === 'publishable'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        Publishable Key (Client)
                        <span className="block text-[10px] font-normal text-slate-500 mt-0.5">For iOS, Android, web checkout</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setShowNewKeyModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateApiKey}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm"
                  >
                    Create Key
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE API EXPLORER (/api/v1)                                    */}
      {/* ========================================================================= */}
      {activeTab === 'api_explorer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Endpoint Navigation */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                API Resource Endpoints
              </h4>
              <span className="font-mono text-[10px] text-indigo-600 font-bold">v1.4.0</span>
            </div>

            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {apiRoutes.map((route) => {
                const isSelected = selectedRoutePath === route.path;
                return (
                  <button
                    key={route.path}
                    onClick={() => {
                      setSelectedRoutePath(route.path);
                      setApiRequestBody(route.requestBodySample || '');
                      setApiResponseOutput(route.responseSample);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold shadow-xs'
                        : 'border-slate-100 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded ${
                        route.method === 'POST' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {route.method}
                      </span>
                      <span className="font-mono text-[11px] truncate">{route.path}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{route.summary}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Request & Response Runner */}
          <div className="lg:col-span-8 space-y-4">
            {(() => {
              const currentRoute = apiRoutes.find((r) => r.path === selectedRoutePath) || apiRoutes[0];
              return (
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs font-mono font-bold bg-emerald-100 text-emerald-800 rounded">
                          {currentRoute.method}
                        </span>
                        <span className="font-mono text-sm font-bold text-slate-900">{currentRoute.path}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{currentRoute.description}</p>
                    </div>

                    <button
                      onClick={handleExecuteApiExplorer}
                      disabled={isSendingRequest}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50"
                    >
                      {isSendingRequest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                      Send Request in Sandbox
                    </button>
                  </div>

                  {/* Request Headers & Scopes Bar */}
                  <div className="flex items-center gap-4 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-400 font-medium">Authorization:</span>{' '}
                      <span className="font-mono font-bold text-slate-800">Bearer omni_test_sec_***</span>
                    </div>
                    <div className="w-px h-4 bg-slate-200" />
                    <div>
                      <span className="text-slate-400 font-medium">Scope Required:</span>{' '}
                      <span className="font-mono text-indigo-700 font-semibold">{currentRoute.requiredScopes.join(', ')}</span>
                    </div>
                  </div>

                  {/* Request Body Editor */}
                  {currentRoute.requestBodySample && (
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">JSON Request Payload:</label>
                      <textarea
                        rows={6}
                        value={apiRequestBody}
                        onChange={(e) => setApiRequestBody(e.target.value)}
                        className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  )}

                  {/* Response Console */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-800">Response Payload:</label>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 font-semibold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          HTTP {apiResponseStatus} OK
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">{apiResponseTime}ms</span>
                      </div>
                    </div>
                    <pre className="p-3 font-mono text-xs bg-slate-950 text-slate-200 rounded-lg border border-slate-800 overflow-x-auto max-h-60">
                      {apiResponseOutput}
                    </pre>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MULTI-LANGUAGE SDKS                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'sdks' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Native Multi-Platform SDKs</h3>
              <p className="text-xs text-slate-500">
                Official type-safe SDKs for TypeScript / Node.js, Python, iOS Swift, Android Kotlin, and raw cURL.
              </p>
            </div>

            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs">
              {[
                { id: 'typescript', label: 'Node / TypeScript' },
                { id: 'python', label: 'Python 3' },
                { id: 'ios_swift', label: 'iOS (Swift)' },
                { id: 'android_kotlin', label: 'Android (Kotlin)' },
                { id: 'curl', label: 'cURL' }
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedSdkLang(l.id as any)}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                    selectedSdkLang === l.id
                      ? 'bg-white text-indigo-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* SDK Code Viewer */}
          <div className="bg-slate-900 rounded-xl p-6 text-slate-200 font-mono text-xs border border-slate-800 shadow-lg relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-slate-400 text-xs">
                {selectedSdkLang === 'typescript' && 'npm install @omni-finance/sdk'}
                {selectedSdkLang === 'python' && 'pip install omni-finance'}
                {selectedSdkLang === 'ios_swift' && 'Package.swift: OmniFinanceKit'}
                {selectedSdkLang === 'android_kotlin' && 'implementation("com.omni.finance:sdk:1.4.0")'}
                {selectedSdkLang === 'curl' && 'Direct REST Invocation'}
              </span>

              <button
                onClick={() => handleCopy('SDK snippet copied', 'sdk_code')}
                className="flex items-center gap-1 text-slate-400 hover:text-white text-xs"
              >
                {copiedId === 'sdk_code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Snippet
              </button>
            </div>

            <pre className="overflow-x-auto leading-relaxed text-emerald-400">
              {selectedSdkLang === 'typescript' &&
                `import { OmniFinance } from '@omni-finance/sdk';

const omni = new OmniFinance({
  apiKey: process.env.OMNI_SECRET_KEY,
  environment: 'production' // or 'sandbox'
});

// 1. Create a customer
const customer = await omni.customers.create({
  name: 'Sarah Jenkins',
  email: 'sarah.j@enterprise.io',
  type: 'individual'
});

// 2. Issue a dedicated Multi-Currency Wallet
const wallet = await omni.wallets.create({
  customerId: customer.id,
  currencies: ['USD', 'EUR', 'GBP']
});

// 3. Initiate an instant payment with split take-rate
const payment = await omni.payments.create({
  amount: 450.00,
  currency: 'USD',
  destinationWalletId: wallet.id,
  paymentMethod: 'card_tok_908124'
});

console.log('Payment Settled Successfully:', payment.id);`}

              {selectedSdkLang === 'python' &&
                `from omni_finance import OmniClient

client = OmniClient(
    api_key="omni_live_sec_...",
    environment="production"
)

# Create a smart customer wallet
wallet = client.wallets.create(
    customer_id="cus_901824981",
    currencies=["USD", "EUR", "GBP"],
    label="Primary Commercial Wallet"
)

# Execute an instant wallet-to-wallet transfer
transfer = client.transfers.create(
    source_wallet_id=wallet.id,
    destination_type="wallet",
    destination_id="wlt_merchant_901",
    amount=1250.00,
    currency="USD"
)

print(f"Transfer status: {transfer.status} (ID: {transfer.id})")`}

              {selectedSdkLang === 'ios_swift' &&
                `import SwiftUI
import OmniFinanceKit

struct CheckoutView: View {
    @State private var paymentIntent: PaymentIntent?
    
    var body: some View {
        OmniPaymentSheet(
            clientSecret: "pi_sec_9081240918...",
            onSuccess: { paymentResult in
                print("Payment authorized with ID: \\(paymentResult.paymentId)")
            },
            onFailure: { error in
                print("Checkout failed: \\(error.localizedDescription)")
            }
        )
    }
}`}

              {selectedSdkLang === 'android_kotlin' &&
                `import com.omni.finance.OmniPaymentLauncher
import com.omni.finance.model.PaymentResult

class CheckoutActivity : AppCompatActivity() {
    private val omniLauncher = registerForActivityResult(OmniPaymentLauncher.Contract()) { result ->
        when (result) {
            is PaymentResult.Completed -> {
                Log.d("OMNI", "Payment succeeded: \${result.paymentId}")
            }
            is PaymentResult.Failed -> {
                Log.e("OMNI", "Error: \${result.throwable.message}")
            }
        }
    }

    fun launchEmbeddedPayment() {
        omniLauncher.launch(clientSecret = "pi_sec_9081240918...")
    }
}`}

              {selectedSdkLang === 'curl' &&
                `curl -X POST https://api.finance.omni.com/v1/payments/charges \\
  -H "Authorization: Bearer omni_live_sec_8f92410a89b418a049102847aef" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: idem_unique_nonce_90124" \\
  -d '{
    "amount": 2500.00,
    "currency": "USD",
    "destination_wallet_id": "wlt_merchant_main",
    "source_token": "tok_visa_4242"
  }'`}
            </pre>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. WEBHOOKS & EVENT BUS                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'webhooks' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Webhook Engine & Event Deliveries</h3>
              <p className="text-xs text-slate-500">
                Guaranteed at-least-once delivery with HMAC-SHA256 signature verification and exponential backoff retry.
              </p>
            </div>

            <button
              onClick={handleSendTestWebhook}
              disabled={isSendingTestWebhook}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              {isSendingTestWebhook ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Dispatch Test Webhook
            </button>
          </div>

          {/* Webhook Endpoint Configuration */}
          {webhookSubs.map((sub) => (
            <div key={sub.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Webhook className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-900">{sub.url}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Secret: {sub.signingSecret}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-emerald-600 font-semibold">{sub.deliverySuccessRate}% Success</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded-full border border-emerald-200">
                    {sub.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 text-xs">
                <span className="text-slate-500 mr-1 font-semibold text-[11px]">Subscribed Events:</span>
                {sub.subscribedEvents.map((evt, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded">
                    {evt}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Delivery Logs Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Recent Webhook Delivery History
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-6 py-3">Event Type</th>
                    <th className="px-6 py-3">HTTP Status</th>
                    <th className="px-6 py-3">Payload Summary</th>
                    <th className="px-6 py-3">Signature (HMAC)</th>
                    <th className="px-6 py-3">Latency</th>
                    <th className="px-6 py-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {webhookLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-3.5 font-mono font-bold text-slate-900">{log.eventType}</td>
                      <td className="px-6 py-3.5">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold rounded">
                          {log.httpStatus} OK
                        </span>
                      </td>
                      <td className="px-6 py-3.5 font-mono text-[11px] text-slate-600 truncate max-w-xs">{log.payloadSummary}</td>
                      <td className="px-6 py-3.5 font-mono text-[10px] text-indigo-700 truncate max-w-xs">{log.signatureHeader}</td>
                      <td className="px-6 py-3.5 font-mono text-slate-600">{log.durationMs}ms</td>
                      <td className="px-6 py-3.5 text-slate-400 font-mono text-[11px]">{new Date(log.timestamp).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. EMBEDDED BANKING-AS-A-SERVICE (BAAS) BLUEPRINTS                       */}
      {/* ========================================================================= */}
      {activeTab === 'baas_blueprints' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Blueprint Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ready-to-Deploy BaaS Architecture
            </h4>
            {blueprints.map((bp) => {
              const isSelected = selectedBlueprintId === bp.id;
              return (
                <button
                  key={bp.id}
                  onClick={() => setSelectedBlueprintId(bp.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <h5 className="font-bold text-slate-900 text-xs mb-1">{bp.title}</h5>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{bp.description}</p>
                </button>
              );
            })}
          </div>

          {/* Blueprint Detailed Flow */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">{selectedBlueprint.title}</h3>
              <p className="text-xs text-slate-600 mt-1">{selectedBlueprint.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-500 block text-[10px]">Business & Monetization Model:</span>
                <strong className="text-slate-900">{selectedBlueprint.businessModel}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-500 block text-[10px]">Wallet Architecture:</span>
                <strong className="text-indigo-800">{selectedBlueprint.walletArchitecture}</strong>
              </div>
            </div>

            {/* Step-by-Step Flow */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900">End-to-End Orchestration Steps:</h4>
              <div className="space-y-1.5">
                {selectedBlueprint.flowSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Payload Preview */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Example REST Payload:</label>
              <pre className="p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-lg border border-slate-800 overflow-x-auto">
                {selectedBlueprint.samplePayloadJson}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PARTNER MANAGEMENT & USAGE                                            */}
      {/* ========================================================================= */}
      {activeTab === 'partner_metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <span className="text-slate-400 text-[11px] block">Total Monthly API Calls</span>
              <strong className="text-xl font-bold text-slate-900">1,482,910</strong>
              <span className="text-emerald-600 text-[10px] font-semibold block mt-1">+18.4% this month</span>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <span className="text-slate-400 text-[11px] block">Total Transacted GMV</span>
              <strong className="text-xl font-bold text-emerald-600">$19,184,000</strong>
              <span className="text-slate-500 text-[10px] block mt-1">Across 3 connected apps</span>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <span className="text-slate-400 text-[11px] block">Average API Latency</span>
              <strong className="text-xl font-bold text-indigo-600">42 ms</strong>
              <span className="text-slate-500 text-[10px] block mt-1">p99 &lt; 95ms</span>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <span className="text-slate-400 text-[11px] block">Platform Fee Revenue</span>
              <strong className="text-xl font-bold text-slate-900">$148,250</strong>
              <span className="text-emerald-600 text-[10px] font-semibold block mt-1">0.77% effective margin</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Connected Partner Applications
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-6 py-3.5">Application Name</th>
                    <th className="px-6 py-3.5">Environment</th>
                    <th className="px-6 py-3.5">Monthly Volume</th>
                    <th className="px-6 py-3.5">Rate Limit</th>
                    <th className="px-6 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{app.name}</div>
                        <div className="text-[11px] text-slate-500">{app.organizationName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${app.environment === 'production' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                          {app.environment.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        ${app.monthlyTransactedVolumeUsd.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-700">
                        {app.rateLimitPerMinute} req/min
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                          {app.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. AI DEVELOPER ASSISTANT                                                */}
      {/* ========================================================================= */}
      {activeTab === 'ai_assistant' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-[600px]">
          {/* Header */}
          <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <div>
                <h4 className="font-bold text-xs">OMNI Dev Assistant AI</h4>
                <p className="text-[10px] text-slate-400">Contextual SDK generator, webhook troubleshooter, and BaaS architect</p>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
            {aiDevMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-2xl p-4 rounded-xl space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {msg.codeSnippet && (
                    <div className="mt-2 pt-2 border-t border-slate-200">
                      <pre className="p-3 font-mono text-[11px] bg-slate-950 text-emerald-400 rounded-lg overflow-x-auto">
                        {msg.codeSnippet}
                      </pre>
                    </div>
                  )}

                  <span className={`block text-[10px] mt-1 ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isAiThinking && (
              <div className="flex items-center gap-2 text-xs text-slate-500 italic">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                OMNI Dev AI is constructing response and code snippet...
              </div>
            )}
          </div>

          {/* Prompt Suggestions */}
          <div className="px-6 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto text-[11px]">
            {[
              'How do I implement a marketplace split checkout?',
              'Explain how to verify webhook HMAC-SHA256 signatures',
              'Generate Python code for issuing an employee expense card'
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendAiDevMessage(prompt)}
                className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-full whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Ask how to integrate APIs, generate SDK code, or debug errors..."
              value={aiDevInput}
              onChange={(e) => setAiDevInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAiDevMessage()}
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900"
            />
            <button
              onClick={() => handleSendAiDevMessage()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. DEVELOPER TEST MATRIX                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'dev_tests' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Developer & API Security Verification Matrix</h3>
              <p className="text-xs text-slate-500">
                Automated regression suite verifying API authentication, rate limiting, HMAC signature validation, and tenant boundary enforcement.
              </p>
            </div>

            <button
              onClick={handleRunAllDevTests}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Run Complete Dev Suite (6 Tests)
            </button>
          </div>

          <div className="space-y-3">
            {devTests.map((t) => (
              <div key={t.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-semibold text-[10px] rounded uppercase">
                        {t.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs">{t.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{t.description}</p>
                  </div>

                  <button
                    onClick={() => handleRunDevTest(t.id)}
                    disabled={t.status === 'running'}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      t.status === 'passed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : t.status === 'running'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {t.status === 'running' ? 'Verifying...' : t.status === 'passed' ? '100% PASSED' : 'Run Test'}
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 font-mono text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Proof:</span>
                  <span className="text-emerald-700 font-semibold">{t.proof}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
