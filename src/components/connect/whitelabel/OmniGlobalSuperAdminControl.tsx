import React, { useState } from 'react';
import {
  Globe,
  Building2,
  DollarSign,
  Shield,
  Layers,
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  Server,
  Zap
} from 'lucide-react';
import {
  WhiteLabelTenant,
  WhiteLabelCustomerType,
  EcosystemMode
} from '../../../types/omni_white_label';

interface OmniGlobalSuperAdminControlProps {
  tenants: WhiteLabelTenant[];
  onSelectTenant: (tenant: WhiteLabelTenant) => void;
  onCreateTenant: (newTenant: WhiteLabelTenant) => void;
}

export const OmniGlobalSuperAdminControl: React.FC<OmniGlobalSuperAdminControlProps> = ({
  tenants,
  onSelectTenant,
  onCreateTenant,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newTenantModal, setNewTenantModal] = useState(false);

  // New tenant state
  const [newBrandName, setNewBrandName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newType, setNewType] = useState<WhiteLabelCustomerType>('company');
  const [newEcosystemMode, setNewEcosystemMode] = useState<EcosystemMode>('isolated_private');
  const [newDomain, setNewDomain] = useState('');
  const [newOwnerEmail, setNewOwnerEmail] = useState('');

  const filteredTenants = tenants.filter(t => {
    const matchesType = filterType === 'all' || t.customerType === filterType;
    const matchesSearch =
      t.branding.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.domains[0]?.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalMembers = tenants.reduce((acc, t) => acc + t.memberCount, 0);
  const totalARR = tenants.reduce((acc, t) => acc + t.billing.monthlyBaseFee * 12, 0);

  const handleCreateTenantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim() || !newDomain.trim()) return;

    const brandSlug = newSlug.trim() || newBrandName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const created: WhiteLabelTenant = {
      id: `tenant-${Date.now()}`,
      slug: brandSlug,
      customerType: newType,
      ecosystemMode: newEcosystemMode,
      branding: {
        brandName: newBrandName.trim(),
        tagline: `Official sovereign portal for ${newBrandName.trim()}`,
        logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        faviconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&auto=format&fit=crop&q=80',
        primaryColor: '#6366f1',
        secondaryColor: '#4338ca',
        accentColor: '#a5b4fc',
        surfaceColor: '#0f172a',
        borderRadius: 'lg',
        fontFamily: 'Plus Jakarta Sans',
      },
      domains: [
        {
          domain: newDomain.trim().toLowerCase(),
          status: 'verified',
          cnameRecord: 'cname.omni.network',
          txtVerificationToken: `omni-verify=${Math.random().toString(36).substring(2, 8)}`,
          sslIssued: true,
          sslExpiresAt: '2027-08-30',
          primaryRedirect: true,
        },
      ],
      features: {
        socialFeed: true,
        messagingDirect: true,
        spacesCommunities: true,
        commerceMarketplace: false,
        crmDirectory: true,
        creatorMonetization: false,
        aiAssistant: true,
        adsCampaigns: false,
        eventsWebinars: true,
        learningLms: true,
        voiceVideoMeetings: true,
        knowledgeWiki: true,
      },
      aiConfig: {
        assistantName: `${newBrandName.trim()} Copilot`,
        assistantAvatar: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=120&auto=format&fit=crop&q=80',
        personaTone: 'executive',
        knowledgeSources: [],
        customInstructions: `You are the sovereign enterprise AI assistant for ${newBrandName.trim()}.`,
        allowedRoles: ['super_admin', 'dept_admin', 'employee', 'member'],
        publicCustomerFacing: false,
        tokenMonthlyQuota: 50000000,
        tokensConsumedThisMonth: 0,
      },
      departments: [
        {
          id: `dept-${Date.now()}-1`,
          name: 'Executive & Core Operations',
          leadName: 'Chief Administrator',
          leadAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
          memberCount: 12,
          privateSpaceId: 'space-core-ops',
          unreadCount: 0,
        },
      ],
      billing: {
        planId: 'enterprise_sovereign',
        planName: 'Enterprise Sovereign Shield',
        monthlyBaseFee: 4950,
        billingCycle: 'annual',
        revenueSharePercentToOMNI: 0,
        usageMeters: {
          activeUsersCount: 1,
          userLimit: 1000,
          storageUsedGb: 2,
          storageLimitGb: 5000,
          aiTokensUsed: 0,
          aiTokenLimit: 50000000,
          bandwidthGb: 10,
        },
        invoices: [],
      },
      status: 'active',
      createdAt: '2026-08-20',
      ownerEmail: newOwnerEmail.trim() || 'admin@sovereign-org.com',
      memberCount: 1,
      activeCommunitiesCount: 1,
      securityCompliance: {
        soc2Compliant: true,
        hipaaCompliant: false,
        gdprCompliant: true,
        dataResidencyRegion: 'US-East',
        dataRetentionDays: 365,
      },
    };

    onCreateTenant(created);
    setNewTenantModal(false);
    setNewBrandName('');
    setNewDomain('');
    setNewOwnerEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Super Admin Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                GLOBAL OMNI OVERSEER
              </span>
              <h1 className="text-xl font-bold text-white">White Label & Enterprise Federation Control</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Global management of all enterprise tenants, domain routing tables, licensing contracts, and revenue splits.
            </p>
          </div>

          <button
            onClick={() => setNewTenantModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/20 transition"
          >
            <Plus className="w-4 h-4" />
            Provision New White Label Tenant
          </button>
        </div>

        {/* Global Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-800/80">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Active Tenants</span>
            <span className="text-xl font-bold text-white font-mono">{tenants.length}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Federated Users</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">{totalMembers.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Contracted ARR</span>
            <span className="text-xl font-bold text-sky-400 font-mono">${(totalARR / 1000).toFixed(1)}k/yr</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">DNS Edge P95</span>
            <span className="text-xl font-bold text-purple-400 font-mono">12.4ms</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Tenants' },
            { id: 'company', label: 'Enterprises' },
            { id: 'university', label: 'Universities' },
            { id: 'church', label: 'Churches' },
            { id: 'ngo', label: 'NGOs' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                filterType === f.id
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search tenant name or domain..."
            className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500 w-64"
          />
        </div>
      </div>

      {/* Tenant Portfolio Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTenants.map(t => (
          <div
            key={t.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.branding.logoUrl}
                    alt={t.branding.brandName}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{t.branding.brandName}</h3>
                    <span className="text-xs text-slate-400 font-mono">{t.domains[0]?.domain}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 bg-slate-800 text-purple-300 rounded text-[10px] font-bold uppercase tracking-wider">
                  {t.customerType}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    t.ecosystemMode === 'isolated_private'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                  }`}
                >
                  {t.ecosystemMode === 'isolated_private' ? 'AIR-GAPPED' : 'FEDERATED'}
                </span>
                <span className="text-slate-400 font-mono">{t.memberCount.toLocaleString()} Members</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-mono">${t.billing.monthlyBaseFee}/mo</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">Region: {t.securityCompliance.dataResidencyRegion}</span>
              <button
                onClick={() => onSelectTenant(t)}
                className="px-3.5 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold transition flex items-center gap-1"
              >
                Manage Tenant
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Tenant Modal */}
      {newTenantModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-400" />
              Provision New White Label Tenant
            </h3>

            <form onSubmit={handleCreateTenantSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / Brand Name</label>
                <input
                  type="text"
                  required
                  value={newBrandName}
                  onChange={e => setNewBrandName(e.target.value)}
                  placeholder="e.g. Apex Global Biotech"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Customer Category</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="company">Company</option>
                    <option value="university">University</option>
                    <option value="church">Church</option>
                    <option value="government">Government</option>
                    <option value="ngo">NGO</option>
                    <option value="media">Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ecosystem Mode</label>
                  <select
                    value={newEcosystemMode}
                    onChange={e => setNewEcosystemMode(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="isolated_private">Private Isolated</option>
                    <option value="omni_ecosystem_federated">Federated OMNI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Custom Domain</label>
                <input
                  type="text"
                  required
                  value={newDomain}
                  onChange={e => setNewDomain(e.target.value)}
                  placeholder="e.g. connect.apexbiotech.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Owner Admin Email</label>
                <input
                  type="email"
                  required
                  value={newOwnerEmail}
                  onChange={e => setNewOwnerEmail(e.target.value)}
                  placeholder="admin@apexbiotech.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewTenantModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/20"
                >
                  Provision & Deploy Edge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
