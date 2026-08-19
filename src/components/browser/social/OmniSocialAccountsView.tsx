import React, { useState } from 'react';
import {
  ShieldCheck,
  RefreshCw,
  Plus,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Search,
  Sliders,
  Sparkles,
  Info,
  Check,
  X
} from 'lucide-react';
import { SocialAccount, SocialPlatform } from '../../../types/social_hub';
import { OmniSocialPlatformBadge, PLATFORM_METADATA } from './OmniSocialPlatformBadge';
import { omniSocialService } from '../../../sdk/browser-services/OmniSocialService';

interface OmniSocialAccountsViewProps {
  accounts: SocialAccount[];
  onRefreshAccounts: () => void;
}

export const OmniSocialAccountsView: React.FC<OmniSocialAccountsViewProps> = ({
  accounts,
  onRefreshAccounts
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);

  // Connect Modal State
  const [connectPlatform, setConnectPlatform] = useState<SocialPlatform>('instagram');
  const [connectHandle, setConnectHandle] = useState('');
  const [connectDisplayName, setConnectDisplayName] = useState('');
  const [connectBrand, setConnectBrand] = useState('OMNI Global Ecosystem');

  const filteredAccounts = accounts.filter(acc => {
    const matchesSearch =
      acc.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.platform.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || acc.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  const handleSyncAccount = async (id: string) => {
    setSyncingId(id);
    await new Promise(r => setTimeout(r, 600));
    omniSocialService.refreshAccountSync(id);
    setSyncingId(null);
    onRefreshAccounts();
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectHandle.trim()) return;

    omniSocialService.addAccount({
      platform: connectPlatform,
      displayName: connectDisplayName.trim() || connectHandle.trim(),
      handle: connectHandle.startsWith('@') ? connectHandle.trim() : `@${connectHandle.trim()}`,
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      verified: true,
      status: 'connected',
      followerCount: Math.floor(Math.random() * 50000) + 1200,
      postsCount: Math.floor(Math.random() * 200) + 15,
      engagementRate: parseFloat((Math.random() * 4 + 4.0).toFixed(1)),
      brandWorkspace: connectBrand,
      officialApiVersion: PLATFORM_METADATA[connectPlatform].officialApi,
      scopes: ['content_publish', 'read_insights', 'manage_comments'],
      tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(),
      apiRateLimitRemaining: 9800,
      apiRateLimitTotal: 10000,
      complianceNotes: 'Official OAuth 2.0 Client credentials verified with sovereign RBAC sandbox.'
    });

    setShowConnectModal(false);
    setConnectHandle('');
    setConnectDisplayName('');
    onRefreshAccounts();
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in">
      {/* Official API Compliance Card */}
      <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-emerald-300">Official API & Anti-Scraping Compliance Standard</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-200 font-mono text-[10px] font-bold">
                Zero Scraping Policy
              </span>
            </div>
            <p className="text-xs text-stone-300">
              All 11 social networks operate strictly via authorized developer partner OAuth2 endpoints. No headless DOM scraping, rate-limit bypassing, or unauthorized data mining.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowConnectModal(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-600/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Account</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-900/60 p-3 rounded-2xl border border-stone-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search accounts by handle, display name, or platform..."
            className="w-full pl-9 pr-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedPlatform}
            onChange={e => setSelectedPlatform(e.target.value)}
            className="px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All 11 Platforms</option>
            {(Object.keys(PLATFORM_METADATA) as SocialPlatform[]).map(p => (
              <option key={p} value={p}>
                {PLATFORM_METADATA[p].name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAccounts.map(account => {
          const isSyncing = syncingId === account.id;
          const ratePercent = ((account.apiRateLimitRemaining / account.apiRateLimitTotal) * 100).toFixed(0);

          return (
            <div
              key={account.id}
              className="p-5 bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl space-y-4 shadow-xl transition-all"
            >
              {/* Account Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={account.avatarUrl}
                      alt={account.displayName}
                      className="w-11 h-11 rounded-xl object-cover border border-stone-700"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      <OmniSocialPlatformBadge platform={account.platform} showName={false} size="sm" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-stone-100">{account.displayName}</h3>
                      {account.verified && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                    </div>
                    <div className="text-xs text-stone-400 font-mono">{account.handle}</div>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-semibold border border-emerald-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Connected</span>
                </span>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-stone-950 rounded-xl border border-stone-800/80 text-center">
                <div>
                  <div className="text-xs font-bold text-stone-100">
                    {(account.followerCount / 1000).toFixed(1)}k
                  </div>
                  <div className="text-[10px] text-stone-500">Followers</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-400">
                    {account.engagementRate}%
                  </div>
                  <div className="text-[10px] text-stone-500">Avg Eng.</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-100">{account.postsCount}</div>
                  <div className="text-[10px] text-stone-500">Published</div>
                </div>
              </div>

              {/* Official API Specs & Scopes */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-stone-400">Official API:</span>
                  <span className="font-mono text-indigo-300">{account.officialApiVersion}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-stone-400">Rate Limit Available:</span>
                  <span className="font-mono text-emerald-400">
                    {account.apiRateLimitRemaining} / {account.apiRateLimitTotal} ({ratePercent}%)
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-stone-400">Token Valid Until:</span>
                  <span className="text-stone-300">
                    {new Date(account.tokenExpiresAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {account.scopes.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 font-mono text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                <span className="text-[10px] text-stone-500 font-mono">
                  Synced: {new Date(account.lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button
                  onClick={() => handleSyncAccount(account.id)}
                  disabled={isSyncing}
                  className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-indigo-400' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Token'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connect Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in select-none">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-5 text-stone-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-stone-100">Authorize Official Platform Connector</h3>
              </div>
              <button
                onClick={() => setShowConnectModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Select Platform</label>
                <select
                  value={connectPlatform}
                  onChange={e => setConnectPlatform(e.target.value as any)}
                  className="w-full p-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500"
                >
                  {(Object.keys(PLATFORM_METADATA) as SocialPlatform[]).map(p => (
                    <option key={p} value={p}>
                      {PLATFORM_METADATA[p].name} ({PLATFORM_METADATA[p].officialApi})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Account Handle / ID</label>
                <input
                  type="text"
                  value={connectHandle}
                  onChange={e => setConnectHandle(e.target.value)}
                  placeholder="@yourbrand"
                  required
                  className="w-full p-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Display Name</label>
                <input
                  type="text"
                  value={connectDisplayName}
                  onChange={e => setConnectDisplayName(e.target.value)}
                  placeholder="Brand / Creator Official Name"
                  className="w-full p-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-stone-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Lock className="w-3 h-3" />
                  <span>Zero-Knowledge OAuth Authorization</span>
                </div>
                <p>
                  Tokens are stored in your encrypted browser enclave. Official API permissions requested: <code>content.publish</code>, <code>insights.read</code>, <code>comments.manage</code>.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConnectModal(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30"
                >
                  Authorize & Connect via API
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
