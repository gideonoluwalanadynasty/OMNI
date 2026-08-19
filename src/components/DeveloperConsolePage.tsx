import { useState } from 'react';
import { 
  CodeXml, Server, Terminal, ShieldCheck, Cpu, Database, 
  RefreshCw, Check, AlertCircle, Play, Send, Plus, 
  Eye, FileCode, CheckCircle2, RefreshCw as LoopIcon, HelpCircle, Copy, Check as CopyCheck
} from 'lucide-react';
import { OMNIState, AppRegistration, WebhookEventTopic, WebhookDeliveryLog } from '../types';

interface DeveloperConsolePageProps {
  state: OMNIState;
  validateAndRegisterAppFromManifest: (manifestJson: string) => { success: boolean; error?: string };
  dispatchDomainEvent: (topic: WebhookEventTopic, payload: any) => void;
  replayWebhookDelivery: (logId: string) => void;
  retryWebhookDelivery: (logId: string) => void;
}

const SAMPLE_MANIFESTS = {
  family: `{
  "omniManifestVersion": "1.0",
  "appId": "family-heritage",
  "name": "OMNI Family Heritage",
  "description": "Secure genealogical ledger vault tracking legacy digital trusts and multi-generation heritage trusts.",
  "category": "productivity",
  "icon": "BookOpen",
  "owner": "Gideon Oluwalana",
  "subdomain": "family.omni.com",
  "routes": {
    "primary": "https://family.omni.com",
    "path": "/family"
  },
  "capabilities": {
    "identity": true,
    "wallet": true,
    "billing": true,
    "affiliate": true,
    "reseller": true,
    "whiteLabel": true,
    "ai": true,
    "ads": true,
    "notifications": true,
    "analytics": true,
    "mobile": true
  },
  "scopes": ["identity.read", "wallet.ledger.read"],
  "apiVersion": "v1",
  "apiEndpoints": [
    "/api/v1/family/trusts",
    "/api/v1/family/ancestors"
  ],
  "webhookConfig": {
    "deliveryUrl": "https://family.omni.com/webhooks/omni",
    "subscribedEvents": ["user.created", "payment.completed"]
  },
  "featureFlags": ["enable-heir-verification", "enable-legacy-payouts"]
}`,
  crm: `{
  "omniManifestVersion": "1.0",
  "appId": "omni-crm-edge",
  "name": "OMNI CRM Edge",
  "description": "Automated sales pipelines, deal ledger tracking, and AI-driven conversion scoring.",
  "category": "productivity",
  "icon": "TrendingUp",
  "owner": "Dynasty Systems Division",
  "subdomain": "crm.omni.com",
  "routes": {
    "primary": "https://crm.omni.com",
    "path": "/crm"
  },
  "capabilities": {
    "identity": true,
    "wallet": false,
    "billing": true,
    "affiliate": true,
    "reseller": false,
    "whiteLabel": true,
    "ai": true,
    "ads": true,
    "notifications": true,
    "analytics": true
  },
  "scopes": ["identity.read", "notifications.send"],
  "apiVersion": "v2",
  "apiEndpoints": [
    "/api/v2/contacts",
    "/api/v2/deals"
  ],
  "webhookConfig": {
    "deliveryUrl": "https://crm.omni.com/api/omni-callback",
    "subscribedEvents": ["organization.created", "affiliate.conversion"]
  },
  "featureFlags": ["enable-ai-scoring", "enable-lead-routing"]
}`
};

const MANIFEST_SCHEMA_JSON = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "OMNIManifest",
  "type": "object",
  "required": ["omniManifestVersion", "appId", "name", "category", "routes"],
  "properties": {
    "omniManifestVersion": { "type": "string", "enum": ["1.0"] },
    "appId": { "type": "string", "pattern": "^[a-z0-9-]+$" },
    "name": { "type": "string", "maxLength": 50 },
    "description": { "type": "string" },
    "category": { "type": "string", "enum": ["core", "finance", "productivity", "developer", "infrastructure"] },
    "icon": { "type": "string" },
    "owner": { "type": "string" },
    "subdomain": { "type": "string" },
    "routes": {
      "type": "object",
      "required": ["primary", "path"],
      "properties": {
        "primary": { "type": "string", "format": "uri" },
        "path": { "type": "string" }
      }
    },
    "capabilities": {
      "type": "object",
      "properties": {
        "identity": { "type": "boolean" },
        "wallet": { "type": "boolean" },
        "billing": { "type": "boolean" },
        "affiliate": { "type": "boolean" },
        "reseller": { "type": "boolean" },
        "whiteLabel": { "type": "boolean" },
        "ai": { "type": "boolean" },
        "ads": { "type": "boolean" },
        "notifications": { "type": "boolean" },
        "analytics": { "type": "boolean" },
        "mobile": { "type": "boolean" }
      }
    },
    "scopes": { "type": "array", "items": { "type": "string" } },
    "apiVersion": { "type": "string" }
  }
}`;

const SDK_CODE_SAMPLES = {
  typescript: `import { OmniSDK } from '@omni/sdk-ts';

// Initialize the OMNI Core Client
const omni = new OmniSDK({
  clientId: process.env.OMNI_CLIENT_ID,
  clientSecret: process.env.OMNI_CLIENT_SECRET,
  environment: 'production'
});

// 1. Unified Authentication Protocol
const session = await omni.auth.verifyToken(token);

// 2. Query Sovereign Identity Context
const user = await omni.user.current();
console.log(\`Logged in as: \${user.fullName} (\${user.preferredCurrency})\`);

// 3. Organization tenant isolation
const org = await omni.organization.get(user.currentTenantId);

// 4. Assert RBAC Isolation and permissions
const canTransact = await omni.permissions.evaluate({
  userId: user.id,
  organizationId: org.id,
  permission: 'wallet.ledger.write'
});

if (canTransact) {
  // 5. Atomic balance transfers via the OMNI Ledger
  const tx = await omni.wallet.transfer({
    amount: 25000,
    currency: 'USD',
    destinationOrgSlug: 'oluwalana',
    description: 'B2B Settlement via SDK'
  });
  console.log(\`Settled on ledger. Hash: \${tx.referenceId}\`);
}

// 6. Direct serverless notification streams
await omni.notifications.send({
  userId: user.id,
  title: 'Service Activated',
  content: 'SaaS licensing provisioned via developer API endpoint.',
  type: 'billing'
});`,
  javascript: `const { OmniSDK } = require('@omni/sdk-js');

const omni = new OmniSDK({
  clientId: process.env.OMNI_CLIENT_ID,
  clientSecret: process.env.OMNI_CLIENT_SECRET
});

async function run() {
  const user = await omni.user.current();
  const balance = await omni.wallet.balance(user.currentTenantId);
  console.log("Current Ledger Liquidity:", balance.amount);
}`,
  python: `from omni_sdk import OmniClient

# Initialize OMNI Client
omni = OmniClient(
    client_id="omni_cid_...",
    client_secret="omni_sec_..."
)

# Fetch Current Identity and Context
user = omni.user.current()
print(f"Auth Success: {user.full_name}")

# Evaluate permissions and log tracking
can_manage = omni.permissions.evaluate(
    user_id=user.id,
    permission="apps.manage"
)

if can_manage:
    omni.analytics.track(
        event_name="sdk_access_granted",
        properties={"user": user.email}
    )`,
  php: `<?php
require 'vendor/autoload.php';

use Omni\\SDK\\OmniClient;

$omni = new OmniClient([
    'client_id' => getenv('OMNI_CLIENT_ID'),
    'client_secret' => getenv('OMNI_CLIENT_SECRET')
]);

$user = $omni->user()->current();
$wallet = $omni->wallet()->balance($user->currentTenantId);
echo "Sovereign Ledger Balance: " . $wallet->balance . " USD";`,
  java: `import io.omni.sdk.OmniClient;
import io.omni.sdk.models.*;

public class OmniIntegration {
    public static void main(String[] args) {
        OmniClient omni = new OmniClient(
            System.getenv("OMNI_CLIENT_ID"),
            System.getenv("OMNI_CLIENT_SECRET")
        );

        User user = omni.user().current();
        System.out.println("Sovereign Context Established: " + user.getFullName());
        
        omni.notifications().send(
            user.getId(),
            "System Alarm",
            "SDK Access Logged",
            NotificationType.SECURITY
        );
    }
}`,
  swift: `import OmniSDK

let omni = OmniSDK(
    clientId: ProcessInfo.processInfo.environment["OMNI_CLIENT_ID"] ?? "",
    clientSecret: ProcessInfo.processInfo.environment["OMNI_CLIENT_SECRET"] ?? ""
)

Task {
    do {
        let user = try await omni.user.current()
        let balance = try await omni.wallet.balance(tenantId: user.currentTenantId)
        print("Omni Wallet Balance: \\(balance.amount) USD")
    } catch {
        print("Handshake failed: \\(error)")
    }
}`,
  kotlin: `import io.omni.sdk.OmniClient

val omni = OmniClient(
    clientId = System.getenv("OMNI_CLIENT_ID"),
    clientSecret = System.getenv("OMNI_CLIENT_SECRET")
)

suspend fun authenticateUser() {
    val user = omni.user.current()
    println("Welcome to OMNI: \${user.fullName}")
    
    val billing = omni.billing.subscribe(
        plan = "growth",
        organizationId = user.currentTenantId
    )
}`,
  csharp: `using Omni.SDK;

var omni = new OmniClient(
    Environment.GetEnvironmentVariable("OMNI_CLIENT_ID"),
    Environment.GetEnvironmentVariable("OMNI_CLIENT_SECRET")
);

var user = await omni.User.CurrentAsync();
Console.WriteLine($"OMNI Context verified: {user.FullName}");

await omni.Analytics.TrackAsync("user_sync_csharp", new Dictionary<string, object> {
    { "email", user.Email },
    { "platform", "C# Core SDK" }
});`
};

export function DeveloperConsolePage({ 
  state, 
  validateAndRegisterAppFromManifest, 
  dispatchDomainEvent, 
  replayWebhookDelivery, 
  retryWebhookDelivery 
}: DeveloperConsolePageProps) {
  
  const [activeTab, setActiveTab] = useState<'registry' | 'manifest' | 'events' | 'sdk'>('registry');
  
  // Registry state
  const [selectedApp, setSelectedApp] = useState<AppRegistration | null>(state.apps?.[0] || null);
  
  // Manifest schema validator state
  const [manifestText, setManifestText] = useState(SAMPLE_MANIFESTS.family);
  const [manifestError, setManifestError] = useState<string | null>(null);
  const [manifestSuccess, setManifestSuccess] = useState(false);
  
  // Webhook and event dispatch state
  const [eventTopic, setEventTopic] = useState<WebhookEventTopic>('user.created');
  const [eventPayloadText, setEventPayloadText] = useState(`{
  "userId": "usr_gideon",
  "email": "gideonoluwalanadynasty@gmail.com",
  "fullName": "Gideon Oluwalana",
  "metadata": {
    "onboardingCompleted": true,
    "kybChecked": true
  }
}`);
  const [eventError, setEventError] = useState<string | null>(null);

  // SDK selector state
  const [selectedSdkLang, setSelectedSdkLang] = useState<keyof typeof SDK_CODE_SAMPLES>('typescript');
  const [copiedText, setCopiedText] = useState(false);

  // Trigger loading a sample manifest
  const handleLoadSample = (key: 'family' | 'crm') => {
    setManifestText(SAMPLE_MANIFESTS[key]);
    setManifestError(null);
    setManifestSuccess(false);
  };

  // Submit manifest validation
  const handleValidateManifest = () => {
    setManifestError(null);
    setManifestSuccess(false);
    const result = validateAndRegisterAppFromManifest(manifestText);
    if (result.success) {
      setManifestSuccess(true);
      // Automatically focus on the newly registered app
      try {
        const parsed = JSON.parse(manifestText);
        const registered = state.apps.find(a => a.id === parsed.appId);
        if (registered) setSelectedApp(registered);
      } catch (e) {}
    } else {
      setManifestError(result.error || 'Schema validation rejected: check formatting rules.');
    }
  };

  // Trigger dispatching manual event
  const handleDispatchEvent = () => {
    setEventError(null);
    try {
      const payload = JSON.parse(eventPayloadText);
      dispatchDomainEvent(eventTopic, payload);
    } catch (e: any) {
      setEventError(`Payload must be valid JSON: ${e.message}`);
    }
  };

  // Copy helper
  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div id="omni-developer-portal" className="w-full max-w-7xl mx-auto flex flex-col gap-8 py-2 px-1 font-sans">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/60 pb-6">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono block">
            OMNI ENGINE PLATFORM
          </span>
          <h1 className="text-2xl font-bold text-neutral-950 tracking-tight mt-1 flex items-center gap-2">
            <CodeXml className="w-7 h-7 text-neutral-900" />
            <span>Developer Core Console</span>
          </h1>
          <p className="text-xs text-neutral-500 font-normal leading-relaxed mt-1">
            Universal App Registry, signed OIDC authorization flow manifest validation, event-driven webhooks, and multi-language SDK playground.
          </p>
        </div>

        {/* Live system status badges */}
        <div className="flex flex-wrap gap-2 font-mono text-[10px]">
          <div className="bg-emerald-50 border border-emerald-150 px-2.5 py-1.5 rounded-lg text-emerald-800 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>GATEWAY: ONLINE</span>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 px-2.5 py-1.5 rounded-lg text-neutral-700 flex items-center gap-1.5 font-bold">
            <Database className="w-3.5 h-3.5 text-neutral-500" />
            <span>REGISTRY: {state.apps.length} ACTIVE APPS</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-neutral-200 gap-1 overflow-x-auto pb-px">
        <button
          id="tab-registry"
          onClick={() => setActiveTab('registry')}
          className={`px-5 py-3.5 text-xs font-bold tracking-wide uppercase border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'registry'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>OMNI App Registry</span>
        </button>
        <button
          id="tab-manifest"
          onClick={() => setActiveTab('manifest')}
          className={`px-5 py-3.5 text-xs font-bold tracking-wide uppercase border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'manifest'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>Manifest Gateway</span>
        </button>
        <button
          id="tab-events"
          onClick={() => setActiveTab('events')}
          className={`px-5 py-3.5 text-xs font-bold tracking-wide uppercase border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'events'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Event Bus & Webhooks</span>
        </button>
        <button
          id="tab-sdk"
          onClick={() => setActiveTab('sdk')}
          className={`px-5 py-3.5 text-xs font-bold tracking-wide uppercase border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'sdk'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>OMNI SDK Standard</span>
        </button>
      </div>

      {/* Dynamic Tab Contents */}
      <div className="flex flex-col gap-6">

        {/* 1. APP REGISTRY VIEWER */}
        {activeTab === 'registry' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* App Sidebar List */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Registry Applications
              </span>
              <div className="flex flex-col gap-2.5 max-h-[580px] overflow-y-auto pr-1">
                {state.apps.map((app) => (
                  <button
                    key={app.id}
                    id={`reg-btn-${app.id}`}
                    onClick={() => setSelectedApp(app)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                      selectedApp?.id === app.id
                        ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      selectedApp?.id === app.id ? 'bg-white/15 text-white' : 'bg-neutral-100 text-neutral-900'
                    }`}>
                      {app.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-xs font-bold truncate">{app.name}</span>
                        <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                          app.isNative 
                            ? 'bg-neutral-900 border border-white/20 text-white' 
                            : 'bg-indigo-50 border border-indigo-150 text-indigo-700'
                        }`}>
                          {app.isNative ? 'Native' : 'Custom'}
                        </span>
                      </div>
                      <p className={`text-[11px] font-normal leading-normal mt-1 line-clamp-2 ${
                        selectedApp?.id === app.id ? 'text-neutral-300' : 'text-neutral-500'
                      }`}>
                        {app.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* App Detail Pane */}
            <div className="lg:col-span-8">
              {selectedApp ? (
                <div id="registry-details-pane" className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
                  
                  {/* Detail Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center text-lg font-bold">
                        {selectedApp.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-lg font-bold text-neutral-950">{selectedApp.name}</h2>
                          <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                            selectedApp.status === 'active' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                              : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            {selectedApp.status}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5">
                          ID: {selectedApp.id} · Domain: {selectedApp.subdomain || `${selectedApp.slug}.omni.com`}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                        BILLING ARCHETYPE
                      </span>
                      <span className="text-xs font-bold text-neutral-800 bg-neutral-100 px-2 py-1 rounded-lg">
                        {selectedApp.billingModel ? selectedApp.billingModel.toUpperCase() : 'FREE / STANDARD'}
                      </span>
                    </div>
                  </div>

                  {/* Core Attributes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Routes Configuration</span>
                      <div className="bg-neutral-50 border border-neutral-150 p-3.5 rounded-xl font-mono text-[11px] text-neutral-700 flex flex-col gap-1">
                        <div><strong className="text-neutral-500 font-semibold">Primary:</strong> {selectedApp.url || 'Internal OMNI State'}</div>
                        <div><strong className="text-neutral-500 font-semibold">Path:</strong> {selectedApp.routes?.path || `/${selectedApp.slug}`}</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Owner & Category</span>
                      <div className="bg-neutral-50 border border-neutral-150 p-3.5 rounded-xl text-xs text-neutral-800 flex flex-col gap-1 font-medium">
                        <div><span className="text-neutral-400">Owner Account:</span> {selectedApp.owner || selectedApp.author}</div>
                        <div><span className="text-neutral-400">Primary Core Category:</span> <span className="font-semibold uppercase tracking-wider font-mono text-[10px] text-indigo-700">{selectedApp.category}</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Scopes & Permissions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Required OAuth Scopes</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedApp.requiredScopes && selectedApp.requiredScopes.length > 0 ? (
                          selectedApp.requiredScopes.map(scope => (
                            <span key={scope} className="bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100">
                              {scope}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] text-neutral-400 font-normal">None requested (Internal Trust context).</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Supported Locales & Countries</span>
                      <div className="flex flex-wrap gap-1.5">
                        {(selectedApp.supportedCountries || ['US', 'CA', 'GB']).map(c => (
                          <span key={c} className="bg-neutral-50 text-neutral-600 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-200">
                            {c}
                          </span>
                        ))}
                        <span className="text-neutral-300">|</span>
                        {(selectedApp.supportedLanguages || ['en', 'fr']).map(l => (
                          <span key={l} className="bg-neutral-50 text-neutral-600 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-200">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Capability Grid */}
                  <div className="border border-neutral-100 rounded-2xl p-5 bg-neutral-50/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-3.5">
                      OMNI System Capability matrix
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {[
                        { label: 'Sovereign Identity', active: selectedApp.isNative || selectedApp.requiredScopes?.includes('identity.read') },
                        { label: 'Ledger Wallet', active: selectedApp.isNative || selectedApp.requiredScopes?.includes('wallet.ledger.write') },
                        { label: 'OMNI Billing', active: selectedApp.isNative || selectedApp.subscriptionRequirements !== undefined },
                        { label: 'Affiliate Pipeline', active: selectedApp.affiliateCapability ?? selectedApp.isNative },
                        { label: 'Reseller Channel', active: selectedApp.resellerCapability ?? selectedApp.isNative },
                        { label: 'White-Label Engine', active: selectedApp.whiteLabelCapability ?? selectedApp.isNative },
                        { label: 'AI Intelligence', active: selectedApp.aiCapability ?? selectedApp.isNative },
                        { label: 'Context Ads Network', active: selectedApp.slug === 'ads' || selectedApp.isNative },
                        { label: 'Serverless Push', active: true },
                        { label: 'Mobile Optimized', active: selectedApp.mobileCapability ?? true },
                      ].map((cap, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${cap.active ? 'text-emerald-500' : 'text-neutral-200'}`} />
                          <span className={`text-[11px] font-semibold ${cap.active ? 'text-neutral-800' : 'text-neutral-400 font-normal'}`}>
                            {cap.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* API & Webhook Endpoints */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-neutral-100 pt-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Developer API Integration</span>
                      <div className="flex flex-col gap-1 font-mono text-[10px] text-neutral-600 bg-neutral-50 border border-neutral-150 rounded-xl p-3">
                        <div className="font-bold text-neutral-900 mb-1 uppercase text-[9px]">API Endpoints ({selectedApp.apiInfo?.version || 'v1'})</div>
                        {(selectedApp.apiInfo?.endpoints || ['/api/v1/health', '/api/v1/user']).map(ep => (
                          <div key={ep} className="truncate">GET {ep}</div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Webhook Sync Configuration</span>
                      <div className="flex flex-col gap-1 font-mono text-[10px] text-neutral-600 bg-neutral-50 border border-neutral-150 rounded-xl p-3">
                        <div className="font-bold text-neutral-900 mb-1 uppercase text-[9px] truncate">Delivery URL</div>
                        <div className="text-neutral-700 font-semibold truncate mb-1.5">{selectedApp.webhookConfig?.deliveryUrl || 'None Configured'}</div>
                        <div className="font-bold text-neutral-900 mb-1 uppercase text-[9px]">Subscribed Events</div>
                        <div className="flex flex-wrap gap-1">
                          {(selectedApp.webhookConfig?.subscribedEvents || ['user.created']).map(ev => (
                            <span key={ev} className="bg-neutral-200 text-neutral-800 text-[8px] font-bold px-1 rounded">{ev}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white border border-neutral-200 rounded-3xl p-8 text-center text-xs text-neutral-400 font-normal">
                  No applications found in active registry. Register a custom app via the Manifest Gateway.
                </div>
              )}
            </div>

          </div>
        )}

        {/* 2. MANIFEST SCHEMATICS & VALIDATOR */}
        {activeTab === 'manifest' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* JSON Schema rules (Left) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  OMNI App Manifest Standard Schema
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Our system-wide **OMNI App Manifest v1.0** enables instant white-label scaling, direct decentralized wallet connections, and event propagation. Every native and custom OMNI app strictly validates against this structured schema definition:
                </p>

                <div className="relative">
                  <pre className="bg-neutral-900 text-neutral-200 p-4 rounded-xl text-[10px] font-mono overflow-x-auto max-h-[380px] leading-relaxed select-text">
                    {MANIFEST_SCHEMA_JSON}
                  </pre>
                </div>
              </div>
            </div>

            {/* Live Validator Form (Right) */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-150 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">
                      Live Manifest Verification Gateway
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Paste your app configuration manifest below to execute real-time JSON validation.
                    </p>
                  </div>
                  
                  {/* Sample buttons */}
                  <div className="flex gap-2 font-mono text-[9px] font-bold shrink-0">
                    <button 
                      onClick={() => handleLoadSample('family')}
                      className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg cursor-pointer"
                    >
                      Preload OMNI Family
                    </button>
                    <button 
                      onClick={() => handleLoadSample('crm')}
                      className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg cursor-pointer"
                    >
                      Preload OMNI CRM Edge
                    </button>
                  </div>
                </div>

                {/* Textarea Editor */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Manifest JSON Payload
                  </label>
                  <textarea
                    rows={12}
                    value={manifestText}
                    onChange={(e) => setManifestText(e.target.value)}
                    className="w-full font-mono text-[11px] p-4 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none focus:bg-white focus:border-neutral-900 transition-all text-neutral-900 leading-relaxed"
                  />
                </div>

                {/* Message alerts */}
                {manifestError && (
                  <div className="bg-red-50 border border-red-150 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-red-800 block">Schema Validation Rejected</span>
                      <p className="text-[11px] text-red-700 font-normal leading-normal mt-0.5">{manifestError}</p>
                    </div>
                  </div>
                )}

                {manifestSuccess && (
                  <div className="bg-emerald-50 border border-emerald-150 p-4 rounded-xl flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-emerald-800 block">Manifest Verified & Registered</span>
                      <p className="text-[11px] text-emerald-700 font-normal leading-normal mt-0.5">
                        The application has passed strict JSON Schema validation. Routes, scopes, capabilities, and API endpoints are successfully mapped into the **OMNI Core App Registry**.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  onClick={handleValidateManifest}
                  className="w-full bg-neutral-950 hover:bg-neutral-900 text-white font-semibold text-xs uppercase py-3.5 rounded-xl tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4.5 h-4.5" />
                  <span>Execute Verification Handshake</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* 3. EVENT BUS & WEBHOOK PLAYGROUND */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Event Dispatcher Panel */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    System-Wide Domain Event Dispatcher
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                    Trigger a simulated internal domain event. Applications are loosely coupled through the OMNI Event Bus without writing to direct databases.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Select Event Topic Key
                  </label>
                  <select
                    value={eventTopic}
                    onChange={(e) => setEventTopic(e.target.value as WebhookEventTopic)}
                    className="w-full px-3.5 py-2.5 border border-neutral-200 rounded-xl text-xs font-semibold outline-none text-neutral-800 bg-white"
                  >
                    <option value="user.created">user.created (User Account Onboarded)</option>
                    <option value="organization.created">organization.created (New Entity Registered)</option>
                    <option value="subscription.started">subscription.started (SaaS License Cleared)</option>
                    <option value="payment.completed">payment.completed (P2P Ledger Settlement)</option>
                    <option value="affiliate.conversion">affiliate.conversion (Partner Conversion Commission)</option>
                    <option value="reseller.created">reseller.created (Reseller Portal Registered)</option>
                    <option value="order.completed">order.completed (Decentralized Wholesale Order)</option>
                    <option value="domain.connected">domain.connected (Cloud DNS Propagated)</option>
                    <option value="user.deleted">user.deleted (User Purged/Revoked)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Event JSON Payload (Data Attributes)
                  </label>
                  <textarea
                    rows={6}
                    value={eventPayloadText}
                    onChange={(e) => setEventPayloadText(e.target.value)}
                    className="w-full font-mono text-[11px] p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:bg-white text-neutral-900"
                  />
                </div>

                {eventError && (
                  <p className="text-[10px] font-bold text-red-600 bg-red-50 p-2.5 rounded-lg">
                    {eventError}
                  </p>
                )}

                <button
                  onClick={handleDispatchEvent}
                  className="bg-neutral-950 hover:bg-neutral-900 text-white font-semibold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Broadcast to Event Bus</span>
                </button>
              </div>

              {/* Internal Event Log list */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Active Internal Event Bus Logs
                </h3>
                <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-1">
                  {state.domainEvents.length === 0 ? (
                    <span className="text-xs text-neutral-400 font-normal italic text-center py-4">No events processed yet.</span>
                  ) : (
                    state.domainEvents.map(evt => (
                      <div key={evt.id} className="border border-neutral-100 p-3 rounded-xl bg-neutral-50 flex flex-col gap-1 font-mono text-[10px]">
                        <div className="flex justify-between items-center text-neutral-900 font-bold">
                          <span className="text-indigo-700">{evt.topic}</span>
                          <span className="text-neutral-400 font-normal">{new Date(evt.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="text-neutral-400 text-[9px]">ID: {evt.id}</div>
                        <pre className="text-neutral-600 bg-white border border-neutral-200/40 p-1.5 rounded mt-1 overflow-x-auto text-[9px] max-h-[80px]">
                          {JSON.stringify(evt.payload, null, 2)}
                        </pre>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Webhook Delivery Logs Panel */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Signed Webhook Delivery Ledger & Retries
              </span>

              <div className="flex flex-col gap-4">
                {state.webhookLogs.length === 0 ? (
                  <div className="bg-white border border-neutral-200 rounded-3xl p-8 text-center text-xs text-neutral-400 font-normal">
                    No webhooks sent. Use the Broadcast console to trigger event-driven webhooks.
                  </div>
                ) : (
                  state.webhookLogs.map((log) => (
                    <div 
                      key={log.id} 
                      id={`webhook-log-${log.id}`}
                      className="bg-white border border-neutral-200 rounded-3xl p-5 shadow-sm flex flex-col gap-4.5"
                    >
                      {/* Webhook Title bar */}
                      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-neutral-100 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full ${
                            log.status === 'success' 
                              ? 'bg-emerald-500' 
                              : log.status === 'retrying' 
                                ? 'bg-amber-400 animate-pulse' 
                                : 'bg-red-500'
                          }`} />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold font-mono text-neutral-900">{log.eventTopic}</span>
                              <span className="text-[9px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded uppercase font-mono">
                                APP: {log.appId.replace('app_', '')}
                              </span>
                            </div>
                            <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                              ID: {log.id} · {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>

                        {/* Status tag */}
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs font-bold px-2 py-1 rounded ${
                            log.statusCode === 200 
                              ? 'bg-emerald-50 text-emerald-800' 
                              : 'bg-red-50 text-red-800'
                          }`}>
                            HTTP {log.statusCode}
                          </span>
                          
                          {/* Replay / Retry Button */}
                          {log.status === 'success' ? (
                            <button
                              onClick={() => replayWebhookDelivery(log.id)}
                              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <LoopIcon className="w-3 h-3" />
                              <span>Replay</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => retryWebhookDelivery(log.id)}
                              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-550 text-neutral-900 hover:bg-amber-500 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              <span>Retry Now</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Webhook Core metadata details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] font-mono text-neutral-600 leading-relaxed">
                        <div className="flex flex-col gap-1.5">
                          <div>
                            <span className="text-neutral-400">Endpoint:</span> <span className="font-semibold text-neutral-800 break-all">{log.endpoint}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400">X-Omni-Signature:</span> <span className="font-mono text-neutral-800 text-[9px] break-all">{log.deliverySecretSigned}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <div>
                            <span className="text-neutral-400">X-Idempotency-Key:</span> <span className="font-semibold text-neutral-800">{log.idempotencyKey}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400">Retries Policy:</span> <span className="font-semibold text-neutral-800">Exponential (Attempt {log.attemptNumber}/5)</span>
                          </div>
                          {log.nextRetryAt && (
                            <div className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block font-bold">
                              Auto Retrying in: 20 seconds
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Collapsed payload & response */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-100">
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-bold uppercase text-neutral-400">Payload dispatched</span>
                          <pre className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-150 font-mono text-[9px] text-neutral-700 overflow-x-auto max-h-[100px]">
                            {JSON.stringify(log.payload, null, 2)}
                          </pre>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-bold uppercase text-neutral-400">Endpoint response body</span>
                          <pre className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-150 font-mono text-[9px] text-neutral-700 overflow-x-auto max-h-[100px]">
                            {log.responseBody}
                          </pre>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* 4. MULTI-LANGUAGE SDK REFERENCE */}
        {activeTab === 'sdk' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left instructions block */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  OMNI SDK Integration Standard
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Convert existing codebases into OMNI-native clients effortlessly using our versioned SDK drivers. 
                </p>
                
                <div className="flex flex-col gap-2 border-t border-neutral-150 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Select Target Language Architecture
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { key: 'typescript', label: 'TypeScript / Node.js' },
                      { key: 'javascript', label: 'Vanilla JS' },
                      { key: 'python', label: 'Python Core Client' },
                      { key: 'php', label: 'PHP Composer package' },
                      { key: 'java', label: 'Java SDK (Maven)' },
                      { key: 'swift', label: 'Swift Core Package' },
                      { key: 'kotlin', label: 'Kotlin (Gradle Mobile)' },
                      { key: 'csharp', label: 'C# .NET Standard' },
                    ].map((lang) => (
                      <button
                        key={lang.key}
                        id={`sdk-lang-btn-${lang.key}`}
                        onClick={() => setSelectedSdkLang(lang.key as any)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex justify-between items-center transition-all cursor-pointer ${
                          selectedSdkLang === lang.key
                            ? 'bg-neutral-950 text-white'
                            : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                        }`}
                      >
                        <span>{lang.label}</span>
                        {selectedSdkLang === lang.key && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right code viewer block */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 uppercase">
                      OMNI Core SDK Source Sandbox: {selectedSdkLang}
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Standard initialized clients for auth, ledger transactions, unified settings, and micro-app routing hooks.
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyCode(SDK_CODE_SAMPLES[selectedSdkLang])}
                    className="p-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all flex items-center gap-1.5 text-xs text-neutral-700 font-bold cursor-pointer"
                  >
                    {copiedText ? (
                      <>
                        <CopyCheck className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy SDK Sample</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <pre className="bg-neutral-900 text-neutral-200 p-5 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed select-text">
                    <code>{SDK_CODE_SAMPLES[selectedSdkLang]}</code>
                  </pre>
                </div>

                <div className="bg-neutral-50 border border-neutral-150 p-4 rounded-xl flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-neutral-500 font-normal leading-relaxed">
                    Refer to the authoritative **OMNI_INTEGRATION_STANDARD.md** documentation in the workspace root for guidelines, token caching protocols, Webhook secret encryption verification algorithms, and live developer migration checklists.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
