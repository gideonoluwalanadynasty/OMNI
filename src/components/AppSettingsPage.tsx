import { useState, FormEvent } from 'react';
import { ShieldCheck, Key, RefreshCw, Trash2, Link, ToggleLeft, ToggleRight, CheckCircle2 } from 'lucide-react';
import { OMNIState, ApiCredential, Webhook } from '../types';

interface AppSettingsPageProps {
  state: OMNIState;
  toggleMfa: () => void;
  addApiCredential: (label: string, scopes: string[]) => void;
  deleteApiCredential: (id: string) => void;
  addWebhook: (url: string, events: string[]) => void;
  deleteWebhook: (id: string) => void;
}

export function AppSettingsPage({ state, toggleMfa, addApiCredential, deleteApiCredential, addWebhook, deleteWebhook }: AppSettingsPageProps) {
  // Local forms state
  const [apiKeyLabel, setApiKeyLabel] = useState('');
  const [apiScopes, setApiScopes] = useState<string[]>(['identity.read']);

  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookEvents, setWebhookEvents] = useState<string[]>(['wallet.transaction.completed']);

  const currentOrg = state.organizations?.find((o) => o.id === state.currentOrgId) || state.organizations?.[0] || {
    id: 'org_dynasty',
    name: 'Dynasty Global Holdings',
    slug: 'dynasty',
    tenantId: 'tenant_dynasty_99',
    status: 'active' as const,
    orgType: 'company' as const,
    billingPlan: 'enterprise' as const,
    walletBalance: 4280550.00,
    apiKey: 'omni_live_api_dyn_k8s_9v02l4k1a7s90f8',
    webhookUrl: 'https://api.dynastyholdings.com/omni-webhook',
    subdomains: ['dynasty.omni.io'],
    createdAt: '2026-01-05T00:00:00Z',
    kybVerified: true
  };

  const handleCreateApiKey = (e: FormEvent) => {
    e.preventDefault();
    if (!apiKeyLabel.trim()) return;
    addApiCredential(apiKeyLabel, apiScopes);
    setApiKeyLabel('');
  };

  const handleCreateWebhook = (e: FormEvent) => {
    e.preventDefault();
    if (!webhookUrl.trim()) return;
    addWebhook(webhookUrl, webhookEvents);
    setWebhookUrl('');
  };

  const toggleScope = (scope: string) => {
    setApiScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const toggleEvent = (event: string) => {
    setWebhookEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  };

  const orgCredentials = state.apiCredentials.filter((c) => c.organizationId === currentOrg?.id);
  const orgWebhooks = state.webhooks.filter((w) => w.organizationId === currentOrg?.id);

  return (
    <div id="omni-settings-container" className="flex flex-col gap-10 font-sans">
      {/* Settings Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
          Organization Settings & Credentials
        </h1>
        <p className="text-xs text-neutral-500 font-normal mt-1">
          Identity management, multi-tenant API client keys, and real-time webhook propagation listeners.
        </p>
      </div>

      {/* Identity & MFA Layer Card */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1 max-w-xl">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-neutral-800" />
            <span>Master Sovereign Key Identity & MFA</span>
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed font-normal mt-1">
            Toggle secure Multi-Factor Authentication. Toggling MFA deploys a simulated virtual TOTP authenticator context, guarding distributed ledger balance transfers.
          </p>
        </div>

        <button
          onClick={toggleMfa}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
            state.user?.isMfaEnabled
              ? 'bg-neutral-950 text-white border-neutral-800'
              : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200'
          }`}
        >
          {state.user?.isMfaEnabled ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>MFA Secured (AA+)</span>
            </>
          ) : (
            <span>Enable MFA Protection</span>
          )}
        </button>
      </div>

      {/* Split grid for API credentials generator and Webhooks setups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: API credentials keyrings generator */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <Key className="w-4.5 h-4.5 text-neutral-400" />
            <span>Multi-Tenant API Clients</span>
          </h3>

          {/* Generator Form */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
            <form onSubmit={handleCreateApiKey} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Client Label Name</label>
                <input
                  type="text"
                  required
                  value={apiKeyLabel}
                  onChange={(e) => setApiKeyLabel(e.target.value)}
                  placeholder="e.g. Staging Server POS Integration"
                  className="w-full px-4 py-2.5 border border-neutral-200 focus:border-neutral-900 rounded-xl text-xs outline-none font-medium"
                />
              </div>

              {/* Scopes choice check items */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Request Access Scopes</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {['identity.read', 'wallet.ledger.read', 'wallet.ledger.write', 'apps.manage'].map((scope) => (
                    <label key={scope} className="flex items-center gap-2 text-xs text-neutral-600 font-mono select-none">
                      <input
                        type="checkbox"
                        checked={apiScopes.includes(scope)}
                        onChange={() => toggleScope(scope)}
                        className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                      />
                      <span>{scope}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-semibold py-3 rounded-xl uppercase tracking-wider transition-colors mt-2"
              >
                Generate API Keypair
              </button>
            </form>
          </div>

          {/* Keys list */}
          <div className="flex flex-col gap-3">
            {orgCredentials.length === 0 ? (
              <div className="bg-neutral-50 border border-neutral-200/50 p-6 rounded-2xl text-center text-xs text-neutral-400 font-normal">
                No active API credentials for this workspace.
              </div>
            ) : (
              orgCredentials.map((cred) => (
                <div key={cred.id} id={`cred-${cred.id}`} className="bg-white border border-neutral-200 rounded-2xl p-4 flex justify-between items-start shadow-sm">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-neutral-900 truncate">{cred.label}</h4>
                    <span className="text-[10px] font-mono text-neutral-400 block mt-1">Client ID: {cred.clientId}</span>
                    <span className="text-[10px] font-mono text-neutral-400 block mt-0.5">Secret: {cred.clientSecret}</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {cred.scopes.map((s) => (
                        <span key={s} className="text-[9px] font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteApiCredential(cred.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer ml-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Webhooks listener registry setups */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <Link className="w-4.5 h-4.5 text-neutral-400" />
            <span>Developer Webhooks</span>
          </h3>

          {/* Webhook Form */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
            <form onSubmit={handleCreateWebhook} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Target Webhook Endpoint URL</label>
                <input
                  type="url"
                  required
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://api.yourdomain.com/omni-webhook"
                  className="w-full px-4 py-2.5 border border-neutral-200 focus:border-neutral-900 rounded-xl text-xs outline-none font-medium"
                />
              </div>

              {/* Events selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Subscribe Events Trigger</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {['wallet.transaction.completed', 'security.mfa.alert', 'user.joined', 'app.registered'].map((event) => (
                    <label key={event} className="flex items-center gap-2 text-xs text-neutral-600 font-mono select-none">
                      <input
                        type="checkbox"
                        checked={webhookEvents.includes(event)}
                        onChange={() => toggleEvent(event)}
                        className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                      />
                      <span>{event}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-semibold py-3 rounded-xl uppercase tracking-wider transition-colors mt-2"
              >
                Register Webhook
              </button>
            </form>
          </div>

          {/* Webhooks list */}
          <div className="flex flex-col gap-3">
            {orgWebhooks.length === 0 ? (
              <div className="bg-neutral-50 border border-neutral-200/50 p-6 rounded-2xl text-center text-xs text-neutral-400 font-normal">
                No active Webhooks configured for this organization.
              </div>
            ) : (
              orgWebhooks.map((w) => (
                <div key={w.id} id={`webhook-${w.id}`} className="bg-white border border-neutral-200 rounded-2xl p-4 flex justify-between items-start shadow-sm">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-neutral-900 truncate">{w.url}</h4>
                    <span className="text-[10px] font-mono text-neutral-400 block mt-1">Secret Key: {w.secret}</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {w.events.map((e) => (
                        <span key={e} className="text-[9px] font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteWebhook(w.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer ml-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
