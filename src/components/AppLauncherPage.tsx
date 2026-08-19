import { useState, FormEvent } from 'react';
import { Send, ShoppingBag, Megaphone, Server, CodeXml, Plus, Globe, CheckCircle } from 'lucide-react';
import { OMNIState, AppRegistration } from '../types';

interface AppLauncherPageProps {
  state: OMNIState;
  appId: string;
  addTransaction: (amount: number, type: 'credit' | 'debit', description: string) => boolean;
  registerApp: (name: string, category: 'core' | 'finance' | 'productivity' | 'developer' | 'infrastructure', description: string) => boolean;
  triggerToast: (title: string, description: string, type: 'success' | 'info' | 'error') => void;
}

export function AppLauncherPage({ state, appId, addTransaction, registerApp, triggerToast }: AppLauncherPageProps) {
  const currentApp = state.apps?.find((a) => a.id === appId);
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

  // Micro-app internal form states
  // Pay App State
  const [payTargetSlug, setPayTargetSlug] = useState('oluwalana');
  const [payAmount, setPayAmount] = useState('1500');
  const [payDescription, setPayDescription] = useState('Payment for API cluster integration overhead');

  // Ads App State
  const [adBudget, setAdBudget] = useState('5000');
  const [adCampaignName, setAdCampaignName] = useState('Global Edge Campaign');

  // Cloud App State
  const [cloudNodes, setCloudNodes] = useState<number>(3);

  // Dev App State
  const [newAppName, setNewAppName] = useState('');
  const [newAppDesc, setNewAppDesc] = useState('');
  const [newAppCategory, setNewAppCategory] = useState<'core' | 'finance' | 'productivity' | 'developer' | 'infrastructure'>('productivity');

  if (!currentApp) {
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center text-xs text-neutral-400 font-normal">
        Application sandbox runtime crashed. Invalid app binding.
      </div>
    );
  }

  // Handle Pay App Submit
  const handlePay = (e: FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(payAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const targetOrg = state.organizations.find((o) => o.slug === payTargetSlug);
    if (!targetOrg) {
      triggerToast('Target Organization Not Found', 'Check organization routing slug in workspace.', 'error');
      return;
    }

    const success = addTransaction(amountNum, 'debit', `P2P Transfer to ${targetOrg.name}: ${payDescription}`);
    if (success) {
      // Simulate receipt inside target ledger (handled by hook)
      triggerToast('Settlement Cleared', `Direct settlement with ${targetOrg.name} verified on the blockchain.`, 'success');
      setPayAmount('');
    }
  };

  // Handle Ad deployment
  const handleDeployAd = (e: FormEvent) => {
    e.preventDefault();
    const budgetNum = parseFloat(adBudget);
    if (isNaN(budgetNum) || budgetNum <= 0) return;

    const success = addTransaction(budgetNum, 'debit', `Deploys OMNI Ad Campaign [${adCampaignName}]`);
    if (success) {
      triggerToast('Ad Campaign Active', `Your AI Bidding campaign "${adCampaignName}" is broadcasting.`, 'success');
    }
  };

  // Handle Cloud Scale Up
  const handleCloudScale = (diff: number) => {
    const nextNodes = Math.max(1, cloudNodes + diff);
    const cost = Math.abs(diff) * 1200;
    if (diff > 0) {
      const success = addTransaction(cost, 'debit', `Allocated additional serverless Spanner containers (+${diff} node)`);
      if (success) {
        setCloudNodes(nextNodes);
      }
    } else {
      addTransaction(cost, 'credit', `Released node cluster containers and recycled core bandwidth (-${Math.abs(diff)} node)`);
      setCloudNodes(nextNodes);
    }
  };

  // Handle Developer New App creation
  const handleRegisterApp = (e: FormEvent) => {
    e.preventDefault();
    if (!newAppName.trim() || !newAppDesc.trim()) return;

    const success = registerApp(newAppName, newAppCategory, newAppDesc);
    if (success) {
      setNewAppName('');
      setNewAppDesc('');
    }
  };

  return (
    <div id="omni-app-sandbox-root" className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6 font-sans">
      
      {/* App Shell Frame Chrome */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
            {currentApp.slug === 'pay' && <Send className="w-5 h-5" />}
            {currentApp.slug === 'market' && <ShoppingBag className="w-5 h-5" />}
            {currentApp.slug === 'ads' && <Megaphone className="w-5 h-5" />}
            {currentApp.slug === 'cloud' && <Server className="w-5 h-5" />}
            {currentApp.slug === 'apps' && <CodeXml className="w-5 h-5" />}
            {['pay', 'market', 'ads', 'cloud', 'apps'].indexOf(currentApp.slug) === -1 && <Globe className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-950 flex items-center gap-2">
              <span>{currentApp.name}</span>
              <span className="text-[10px] uppercase font-mono bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded">
                Interactive Module
              </span>
            </h2>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed mt-0.5">
              {currentApp.description}
            </p>
          </div>
        </div>

        <div className="text-right flex flex-col gap-0.5 font-mono text-[10px] text-neutral-400">
          <span>SENDER ORG: {currentOrg?.name}</span>
          <span>WALLET BAL: ${currentOrg?.walletBalance.toLocaleString()} USD</span>
        </div>
      </div>

      {/* Dynamic App View Rendering */}
      <div className="py-2">
        {/* PAY APP */}
        {currentApp.slug === 'pay' && (
          <form onSubmit={handlePay} className="max-w-md flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Select Recipient Tenant</label>
              <select
                value={payTargetSlug}
                onChange={(e) => setPayTargetSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-neutral-200 rounded-xl text-xs font-semibold outline-none text-neutral-800"
              >
                {state.organizations.map((org) => (
                  <option key={org.id} value={org.slug}>
                    {org.name} ({org.slug}.omni.io)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Ledger Amount to Settle (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-neutral-400 font-bold">$</span>
                <input
                  type="number"
                  required
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder="1500"
                  className="w-full pl-8 pr-4 py-3 border border-neutral-200 rounded-xl text-xs font-bold font-mono outline-none text-neutral-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Payment Reference Description</label>
              <input
                type="text"
                required
                value={payDescription}
                onChange={(e) => setPayDescription(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-xs outline-none text-neutral-800 font-medium"
              />
            </div>

            <button
              type="submit"
              className="bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-semibold py-3.5 rounded-xl uppercase tracking-wider transition-colors mt-2"
            >
              Dispatch Instant Ledger Settlement
            </button>
          </form>
        )}

        {/* MARKET APP */}
        {currentApp.slug === 'market' && (
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Procure Enterprise Systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border border-neutral-200 rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Custom routing SSL IP mapping</h4>
                    <span className="text-[10px] text-neutral-400 font-mono">Infrastructure Resource</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-950 font-mono">$1,200</span>
                </div>
                <p className="text-xs text-neutral-500 font-normal leading-relaxed">
                  Map high throughput direct paths with Cloudflare proxy sync on target subdomains.
                </p>
                <button
                  onClick={() => addTransaction(1200, 'debit', 'Acquired Subdomain SSL Proxy IP tunnel')}
                  className="bg-neutral-900 text-white hover:bg-neutral-800 text-[10px] font-bold py-2.5 rounded-lg uppercase tracking-wider text-center"
                >
                  Procure Resource
                </button>
              </div>

              <div className="border border-neutral-200 rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Cold-chain Temperature IoT Telemetry</h4>
                    <span className="text-[10px] text-neutral-400 font-mono">Logistics Asset</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-950 font-mono">$4,500</span>
                </div>
                <p className="text-xs text-neutral-500 font-normal leading-relaxed">
                  Integrated telemetry node tracking active temperature margins via OMNI Logistics core.
                </p>
                <button
                  onClick={() => addTransaction(4500, 'debit', 'Acquired IoT Logistics cold-chain sensor license')}
                  className="bg-neutral-900 text-white hover:bg-neutral-800 text-[10px] font-bold py-2.5 rounded-lg uppercase tracking-wider text-center"
                >
                  Procure Resource
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADS APP */}
        {currentApp.slug === 'ads' && (
          <form onSubmit={handleDeployAd} className="max-w-md flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Ad Campaign Name</label>
              <input
                type="text"
                required
                value={adCampaignName}
                onChange={(e) => setAdCampaignName(e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-xs outline-none text-neutral-800 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Target Segment Routing Channel</label>
              <select className="w-full px-3.5 py-2.5 border border-neutral-200 rounded-xl text-xs font-semibold outline-none text-neutral-800">
                <option>Enterprise B2B Technology Directors</option>
                <option>Multi-tenant white-label software builders</option>
                <option>Global cross-border retail directories</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Allocated Ledger Budget (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-neutral-400 font-bold">$</span>
                <input
                  type="number"
                  required
                  value={adBudget}
                  onChange={(e) => setAdBudget(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 border border-neutral-200 rounded-xl text-xs font-bold font-mono outline-none text-neutral-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-semibold py-3.5 rounded-xl uppercase tracking-wider transition-colors mt-2"
            >
              Deploy Campaign on OMNI Network
            </button>
          </form>
        )}

        {/* CLOUD APP */}
        {currentApp.slug === 'cloud' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-neutral-50 border border-neutral-200 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <Server className="w-6 h-6 text-neutral-800" />
                <div>
                  <span className="text-xs font-bold block text-neutral-900">Virtual Container Spanner Nodes</span>
                  <span className="text-[10px] text-neutral-400 block font-mono">Isolated multi-tenant infrastructure load</span>
                </div>
              </div>
              <span className="text-3xl font-bold text-neutral-950 font-mono">{cloudNodes} Nodes</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleCloudScale(1)}
                className="flex-1 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold py-3.5 rounded-xl uppercase tracking-wider transition-colors"
              >
                Scale Up Core Node (+$1,200/TX)
              </button>
              <button
                onClick={() => handleCloudScale(-1)}
                disabled={cloudNodes <= 1}
                className="flex-1 border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50 text-neutral-700 text-xs font-semibold py-3.5 rounded-xl uppercase tracking-wider transition-colors"
              >
                Scale Down Core Node (-$1,200/TX)
              </button>
            </div>
          </div>
        )}

        {/* APPS APP (DEVELOPER REGISTRATION PLATFORM) */}
        {currentApp.slug === 'apps' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <form onSubmit={handleRegisterApp} className="flex flex-col gap-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Register Third-Party Application</h3>
              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Application Name</label>
                <input
                  type="text"
                  required
                  value={newAppName}
                  onChange={(e) => setNewAppName(e.target.value)}
                  placeholder="e.g. OMNI Telemetry Tracker"
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-xs outline-none font-medium"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Application Category</label>
                <select
                  value={newAppCategory}
                  onChange={(e) => setNewAppCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border border-neutral-200 rounded-xl text-xs font-semibold outline-none text-neutral-800"
                >
                  <option value="productivity">Productivity</option>
                  <option value="finance">Finance</option>
                  <option value="developer">Developer Utility</option>
                  <option value="infrastructure">Infrastructure Layer</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={newAppDesc}
                  onChange={(e) => setNewAppDesc(e.target.value)}
                  placeholder="Summarize the interoperability features mapped by your platform service."
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-xs outline-none font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-semibold py-3 rounded-xl uppercase tracking-wider transition-colors"
              >
                Register & Bind Application
              </button>
            </form>

            {/* List of custom non-native registered apps */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Registered Tenant Apps</h3>
              <div className="flex flex-col gap-3">
                {state.apps.filter(a => !a.isNative).length === 0 ? (
                  <div className="border border-neutral-200/50 p-6 rounded-2xl text-center text-xs text-neutral-400 font-normal">
                    No custom apps registered yet. Fill the form to map one.
                  </div>
                ) : (
                  state.apps.filter(a => !a.isNative).map((app) => (
                    <div key={app.id} id={`custom-app-${app.id}`} className="border border-neutral-200 rounded-2xl p-4 flex gap-3 items-start bg-neutral-50">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                        {app.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold block text-neutral-900">{app.name}</span>
                        <span className="text-[10px] text-neutral-500 block truncate">{app.description}</span>
                        <span className="text-[9px] font-mono text-neutral-400 block mt-1">Slug: {app.slug} · Status: Active</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* DEFAULT FALLBACK */}
        {['pay', 'market', 'ads', 'cloud', 'apps'].indexOf(currentApp.slug) === -1 && (
          <div className="py-12 text-center max-w-sm mx-auto flex flex-col items-center gap-3">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Application Active & Sandboxed</h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-normal">
              Sovereign identity and Organization context validated. Webhook propagation active for telemetry tracking.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
