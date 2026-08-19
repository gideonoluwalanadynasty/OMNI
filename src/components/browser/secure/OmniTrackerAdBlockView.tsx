import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Filter,
  Plus,
  Trash2,
  CheckCircle2,
  Coins,
  Globe,
  Lock,
  Search,
  ExternalLink,
  Code,
  HeartHandshake,
  Building
} from 'lucide-react';
import {
  OmniTrackerItem,
  OmniTrackerCategory,
  OmniAdBlockRule,
  OmniPublisherMonetizationConfig
} from '../../../types';

interface OmniTrackerAdBlockViewProps {
  trackers: OmniTrackerItem[];
  adBlockRules: OmniAdBlockRule[];
  monetizationConfig: OmniPublisherMonetizationConfig;
  onToggleRule: (ruleId: string) => void;
  onAddCustomRule: (name: string, ruleText: string, targetDomains: string[]) => void;
  onDeleteRule: (ruleId: string) => void;
  onUpdateMonetization: (config: Partial<OmniPublisherMonetizationConfig>) => void;
  onTogglePublisherAllowlist: (domain: string) => void;
}

export const OmniTrackerAdBlockView: React.FC<OmniTrackerAdBlockViewProps> = ({
  trackers,
  adBlockRules,
  monetizationConfig,
  onToggleRule,
  onAddCustomRule,
  onDeleteRule,
  onUpdateMonetization,
  onTogglePublisherAllowlist
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddRuleModal, setShowAddRuleModal] = useState<boolean>(false);
  const [newRuleName, setNewRuleName] = useState<string>('');
  const [newRuleText, setNewRuleText] = useState<string>('');
  const [newRuleDomain, setNewRuleDomain] = useState<string>('*');
  const [newPublisherInput, setNewPublisherInput] = useState<string>('');

  // Filter trackers
  const filteredTrackers = trackers.filter(t => {
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.domain.toLowerCase().includes(q) ||
        t.companyName.toLowerCase().includes(q) ||
        t.siteUrl.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalDeflections = trackers.reduce((acc, t) => acc + t.blockedCount, 0);

  const getCategoryBadge = (cat: OmniTrackerCategory) => {
    switch (cat) {
      case 'fingerprinting':
        return 'bg-purple-950 text-purple-300 border-purple-800';
      case 'cryptomining':
        return 'bg-rose-950 text-rose-300 border-rose-800';
      case 'social_pixel':
        return 'bg-pink-950 text-pink-300 border-pink-800';
      case 'advertising':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      default:
        return 'bg-cyan-950 text-cyan-300 border-cyan-800';
    }
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim() || !newRuleText.trim()) return;
    onAddCustomRule(newRuleName.trim(), newRuleText.trim(), [newRuleDomain.trim() || '*']);
    setNewRuleName('');
    setNewRuleText('');
    setShowAddRuleModal(false);
  };

  return (
    <div id="omni-tracker-adblock-view" className="space-y-6">
      {/* 1. Top Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
          <span className="text-xs text-stone-400">Total Deflections (24h)</span>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {totalDeflections.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-500">Tracking scripts, pixel beacons & web bugs</p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
          <span className="text-xs text-stone-400">Active Filter Rules</span>
          <div className="text-3xl font-black text-indigo-400 font-mono">
            {adBlockRules.filter(r => r.isEnabled).length} / {adBlockRules.length}
          </div>
          <p className="text-[11px] text-stone-500">EasyList, EasyPrivacy, and Enterprise blocklists</p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
          <span className="text-xs text-stone-400">Publisher Monetisation Support</span>
          <div className="text-lg font-bold text-amber-400 flex items-center gap-1.5 pt-1">
            <HeartHandshake className="w-4 h-4" />
            <span>{monetizationConfig.allowAcceptableAds ? 'Acceptable Ads Active' : 'Strict Total Block'}</span>
          </div>
          <p className="text-[11px] text-stone-500">Respects non-intrusive ads from verified creators</p>
        </div>
      </div>

      {/* 2. Detected Trackers Live Stream Inspector */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-800">
          <div>
            <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              Real-Time Tracker & Telemetry Interceptor
            </h2>
            <p className="text-xs text-stone-400">Inspecting network requests for cross-site behavioral telemetry</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
              <input
                type="text"
                placeholder="Search domain or company..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500 w-48"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="analytics">Analytics</option>
              <option value="advertising">Advertising</option>
              <option value="social_pixel">Social Pixels</option>
              <option value="fingerprinting">Fingerprinting</option>
              <option value="cryptomining">Cryptomining</option>
              <option value="telemetry">Telemetry</option>
            </select>
          </div>
        </div>

        {/* Tracker Cards Feed */}
        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {filteredTrackers.map(trk => (
            <div
              key={trk.id}
              className="p-4 bg-stone-800/40 border border-stone-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-100 font-mono">{trk.domain}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getCategoryBadge(trk.category)}`}>
                    {trk.category.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-stone-400">• {trk.companyName}</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">{trk.purposeDescription}</p>
                <div className="text-[11px] text-stone-500 font-mono truncate max-w-md" title={trk.scriptUrl}>
                  Script: {trk.scriptUrl}
                </div>
              </div>

              <div className="text-right font-mono shrink-0">
                <div className="text-emerald-400 font-bold">{trk.blockedCount.toLocaleString()} Deflected</div>
                <div className="text-[10px] text-stone-500">Blocked on {trk.siteUrl.replace('https://', '')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Ad Blocking Architecture: Rule Lists & Enterprise Policies */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div>
            <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-400" />
              Ad Blocking Rules & Enterprise Policy Engine
            </h2>
            <p className="text-xs text-stone-400">Manage user custom cosmetic filters, EasyList feeds, and enterprise policy blocks</p>
          </div>

          <button
            onClick={() => setShowAddRuleModal(true)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Rule</span>
          </button>
        </div>

        <div className="space-y-3">
          {adBlockRules.map(rule => (
            <div
              key={rule.id}
              className="p-4 bg-stone-800/40 border border-stone-800 rounded-xl flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-100">{rule.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase ${
                      rule.ruleType === 'enterprise_policy'
                        ? 'bg-purple-950 text-purple-300 border border-purple-800'
                        : rule.ruleType === 'easylist'
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                        : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {rule.ruleType.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-stone-500 font-mono">
                    {rule.blockedElementsCount.toLocaleString()} elements blocked
                  </span>
                </div>

                <pre className="p-2 bg-stone-950/70 rounded-lg text-[11px] font-mono text-stone-400 overflow-x-auto max-h-20 border border-stone-800">
                  {rule.ruleText}
                </pre>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-1">
                <button
                  onClick={() => onToggleRule(rule.id)}
                  className={`w-10 h-6 rounded-full p-1 transition-colors ${
                    rule.isEnabled ? 'bg-indigo-600' : 'bg-stone-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      rule.isEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>

                {rule.ruleType === 'user_custom' && (
                  <button
                    onClick={() => onDeleteRule(rule.id)}
                    className="p-1 rounded text-stone-500 hover:text-rose-400 hover:bg-stone-800"
                    title="Delete custom rule"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Respecting Legitimate Publisher Monetisation */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div>
            <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              Publisher Monetisation & Sustainable Web Settings
            </h2>
            <p className="text-xs text-stone-400">Support independent journalism and open knowledge platforms</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-stone-800/40 rounded-xl border border-stone-800 gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-stone-100">Acceptable Ads Standard (Non-Intrusive)</div>
              <p className="text-xs text-stone-400">
                Allows non-tracking, non-animated, text/image ads that do not interrupt your reading experience.
              </p>
            </div>
            <button
              onClick={() => onUpdateMonetization({ allowAcceptableAds: !monetizationConfig.allowAcceptableAds })}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                monetizationConfig.allowAcceptableAds ? 'bg-amber-600' : 'bg-stone-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  monetizationConfig.allowAcceptableAds ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-stone-800/40 rounded-xl border border-stone-800 gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-stone-100">Direct Sovereign Creator Micro-Rewards</div>
              <p className="text-xs text-stone-400">
                Stream cryptographic attention micro-tokens directly to verified open-web publishers.
              </p>
            </div>
            <button
              onClick={() =>
                onUpdateMonetization({ directPublisherRewards: !monetizationConfig.directPublisherRewards })
              }
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                monetizationConfig.directPublisherRewards ? 'bg-indigo-600' : 'bg-stone-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  monetizationConfig.directPublisherRewards ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Verified Publisher Allowlist */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-semibold text-stone-300">Verified Publisher Allowlist</div>
            <div className="flex flex-wrap gap-2">
              {monetizationConfig.verifiedPublisherAllowlist.map(domain => (
                <div
                  key={domain}
                  className="px-3 py-1 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 flex items-center gap-2"
                >
                  <Globe className="w-3 h-3 text-emerald-400" />
                  <span>{domain}</span>
                  <button
                    onClick={() => onTogglePublisherAllowlist(domain)}
                    className="text-stone-500 hover:text-rose-400"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="e.g. theguardian.com"
                value={newPublisherInput}
                onChange={e => setNewPublisherInput(e.target.value)}
                className="px-3 py-1.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500 w-56"
              />
              <button
                onClick={() => {
                  if (newPublisherInput.trim()) {
                    onTogglePublisherAllowlist(newPublisherInput.trim());
                    setNewPublisherInput('');
                  }
                }}
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold"
              >
                Add Publisher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateRule}
            className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-sm font-bold text-stone-100">Add Custom Ad Block / Cosmetic Rule</h3>
              <button
                type="button"
                onClick={() => setShowAddRuleModal(false)}
                className="text-stone-400 hover:text-stone-200 text-xs"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g. Block Sidebar Banners on Reddit"
                  value={newRuleName}
                  onChange={e => setNewRuleName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Rule Syntax (EasyList / CSS)</label>
                <textarea
                  rows={4}
                  placeholder="||sponsor.com/ad/* or ##div.banner-ad"
                  value={newRuleText}
                  onChange={e => setNewRuleText(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs font-mono text-stone-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Target Domain (* for all)</label>
                <input
                  type="text"
                  placeholder="*"
                  value={newRuleDomain}
                  onChange={e => setNewRuleDomain(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setShowAddRuleModal(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Save Rule
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
