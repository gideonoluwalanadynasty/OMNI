import React, { useState } from 'react';
import { 
  Building2, Globe, Shield, Plus, Check, ExternalLink, RefreshCw, 
  MapPin, Users, Database, Layers, CheckCircle2, AlertCircle, Trash2, Edit3, X,
  User, Briefcase, Crown, Sparkles, Filter
} from 'lucide-react';
import { WorksWorkspace, WorksWorkspaceType, WorksDataResidency, WorksSecurityClassification, WorksTenantTier } from '../../types/works';

interface WorksTenantManagerViewProps {
  workspaces: WorksWorkspace[];
  currentWorkspaceId: string;
  onSelectWorkspace: (wsId: string) => void;
  onCreateWorkspace: (newWs: Partial<WorksWorkspace>) => void;
}

export const WorksTenantManagerView: React.FC<WorksTenantManagerViewProps> = ({
  workspaces,
  currentWorkspaceId,
  onSelectWorkspace,
  onCreateWorkspace
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [verifyingDomainWsId, setVerifyingDomainWsId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // New Workspace form state
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<WorksWorkspaceType>('company');
  const [newDescription, setNewDescription] = useState('');
  const [newResidency, setNewResidency] = useState<WorksDataResidency>('eu-central');
  const [newClassification, setNewClassification] = useState<WorksSecurityClassification>('confidential');
  const [newTier, setNewTier] = useState<WorksTenantTier>('team_pro');
  const [newCustomDomain, setNewCustomDomain] = useState('');
  const [newDepartments, setNewDepartments] = useState('Engineering, Product, Operations');

  const residencyOptions: { id: WorksDataResidency; label: string; flag: string; latency: string }[] = [
    { id: 'eu-central', label: 'Frankfurt / Europe Central (GDPR-Sovereign)', flag: '🇪🇺', latency: '12ms' },
    { id: 'us-east', label: 'N. Virginia / US East (FedRAMP-Ready)', flag: '🇺🇸', latency: '18ms' },
    { id: 'us-west', label: 'Oregon / US West (Silicon Edge)', flag: '🇺🇸', latency: '24ms' },
    { id: 'ap-southeast', label: 'Singapore / APAC Hub (MAS-Compliant)', flag: '🇸🇬', latency: '42ms' },
    { id: 'af-south', label: 'Johannesburg / Africa South', flag: '🇿🇦', latency: '65ms' },
    { id: 'global-mesh', label: 'Omni Global Anycast Mesh (Decentralized)', flag: '🌐', latency: '9ms' }
  ];

  const filteredWorkspaces = workspaces.filter(ws => {
    if (typeFilter === 'all') return true;
    return ws.type === typeFilter;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const depts = newDepartments.split(',').map(d => d.trim()).filter(Boolean);

    onCreateWorkspace({
      name: newName,
      slug: newName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type: newType,
      description: newDescription,
      residency: newResidency,
      classification: newClassification,
      tier: newType === 'personal' ? 'team_pro' : newType === 'company' ? 'business' : 'enterprise_sovereign',
      customDomain: newCustomDomain.trim() || undefined,
      isDomainVerified: false,
      departments: depts.length > 0 ? depts : ['General'],
      color: newType === 'personal' ? '#8b5cf6' : newType === 'company' ? '#06b6d4' : '#6366f1',
      icon: newType === 'personal' ? 'Sparkles' : newType === 'company' ? 'Briefcase' : 'Crown'
    });

    setNewName('');
    setNewDescription('');
    setNewCustomDomain('');
    setShowCreateModal(false);
  };

  const handleVerifyDns = (wsId: string) => {
    setVerifyingDomainWsId(wsId);
    setTimeout(() => {
      setVerifyingDomainWsId(null);
    }, 1200);
  };

  const getTypeBadge = (type?: WorksWorkspaceType) => {
    switch (type) {
      case 'personal':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
            <User className="w-3 h-3" /> Personal Sandbox
          </span>
        );
      case 'company':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
            <Briefcase className="w-3 h-3" /> Company Space
          </span>
        );
      case 'enterprise':
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
            <Crown className="w-3 h-3" /> Enterprise Sovereign
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 backdrop-blur-sm shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Multi-Tenant &amp; Sovereign Data Residency</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Personal, Company &amp; Enterprise Workspaces</h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            Google Workspace / M365-style multi-tenant organization grid. Switch seamlessly between personal sandboxes, company spaces, and air-gapped enterprise sovereign vaults.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/30 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Workspace</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between bg-neutral-900/40 p-3 rounded-xl border border-neutral-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-semibold text-neutral-300">Filter Workspace Type:</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              typeFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            All ({workspaces.length})
          </button>
          <button
            onClick={() => setTypeFilter('personal')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              typeFilter === 'personal' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Personal ({workspaces.filter(w => w.type === 'personal').length})
          </button>
          <button
            onClick={() => setTypeFilter('company')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              typeFilter === 'company' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Company ({workspaces.filter(w => w.type === 'company').length})
          </button>
          <button
            onClick={() => setTypeFilter('enterprise')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              typeFilter === 'enterprise' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Enterprise ({workspaces.filter(w => w.type === 'enterprise').length})
          </button>
        </div>
      </div>

      {/* Workspaces Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredWorkspaces.map((ws) => {
          const isSelected = ws.id === currentWorkspaceId;
          const storagePercent = Math.round((ws.storageUsedBytes / ws.storageLimitBytes) * 100);

          return (
            <div
              key={ws.id}
              onClick={() => onSelectWorkspace(ws.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-neutral-900 via-neutral-900 to-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-950/40'
                  : 'bg-neutral-900/60 border-neutral-800/80 hover:bg-neutral-900 hover:border-neutral-700'
              }`}
            >
              <div className="space-y-4">
                {/* Top badge line */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-inner shrink-0"
                      style={{ backgroundColor: ws.color || '#6366f1' }}
                    >
                      {ws.type === 'personal' ? <Sparkles className="w-5 h-5" /> : ws.type === 'company' ? <Briefcase className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white tracking-tight">{ws.name}</h3>
                        {isSelected && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500 text-white uppercase tracking-wider">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400">/{ws.slug}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {getTypeBadge(ws.type)}
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                      ws.classification === 'restricted_sovereign' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      ws.classification === 'confidential' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {ws.classification.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  {ws.description}
                </p>

                {/* Region & Domain Pill */}
                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Residency</span>
                    </span>
                    <span className="font-mono text-neutral-200 text-[11px]">
                      {ws.residency.toUpperCase()}
                    </span>
                  </div>

                  {ws.customDomain && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Domain</span>
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-cyan-400 text-[11px] truncate max-w-[140px]">
                          {ws.customDomain}
                        </span>
                        {ws.isDomainVerified ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="CNAME Verified & SSL Active" />
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVerifyDns(ws.id);
                            }}
                            className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5"
                          >
                            <RefreshCw className={`w-3 h-3 ${verifyingDomainWsId === ws.id ? 'animate-spin' : ''}`} />
                            Verify
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Storage gauge */}
                  <div className="pt-2">
                    <div className="flex justify-between text-[11px] text-neutral-400 mb-1 font-mono">
                      <span>Storage: {(ws.storageUsedBytes / (1024 * 1024 * 1024)).toFixed(1)} GB</span>
                      <span>{storagePercent}% of {(ws.storageLimitBytes / (1024 * 1024 * 1024)).toFixed(0)} GB</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          storagePercent > 80 ? 'bg-amber-400' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${Math.min(storagePercent, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Departments Tag Cloud */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {ws.departments.map((dept, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 text-[10px] font-mono border border-neutral-800"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer selection button */}
              <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Users className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{ws.activeMembersCount} Collaborators</span>
                </div>
                <span className={`font-semibold ${isSelected ? 'text-indigo-400 font-bold' : 'text-neutral-500'}`}>
                  {isSelected ? 'Currently Selected' : 'Switch Workspace →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Provision Workspace Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl shadow-2xl p-6 text-neutral-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Provision Sovereign Workspace</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-lg hover:bg-neutral-800 flex items-center justify-center text-neutral-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 pt-4 text-xs">
              {/* Workspace Type Selector */}
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Workspace Category *</label>
                <div className="grid grid-cols-3 gap-2">
                  <div
                    onClick={() => {
                      setNewType('personal');
                      setNewDepartments('Personal Projects, Secret Vault, Investments');
                    }}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      newType === 'personal'
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <User className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                    <div className="font-bold">Personal</div>
                    <div className="text-[10px] text-neutral-500">Individual Sandbox</div>
                  </div>

                  <div
                    onClick={() => {
                      setNewType('company');
                      setNewDepartments('Engineering, Product, Operations, Marketing');
                    }}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      newType === 'company'
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                    <div className="font-bold">Company</div>
                    <div className="text-[10px] text-neutral-500">Team Collaboration</div>
                  </div>

                  <div
                    onClick={() => {
                      setNewType('enterprise');
                      setNewDepartments('Executive, Core Engineering, Product Strategy, Treasury, Security');
                    }}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      newType === 'enterprise'
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <Crown className="w-4 h-4 mx-auto mb-1 text-indigo-400" />
                    <div className="font-bold">Enterprise</div>
                    <div className="text-[10px] text-neutral-500">Multi-Division Grid</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Workspace Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Global Innovation Lab"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Scope, objectives and operational domain..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Data Residency Region</label>
                  <select
                    value={newResidency}
                    onChange={(e) => setNewResidency(e.target.value as WorksDataResidency)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                  >
                    {residencyOptions.map((r) => (
                      <option key={r.id} value={r.id}>{r.flag} {r.id}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Security Classification</label>
                  <select
                    value={newClassification}
                    onChange={(e) => setNewClassification(e.target.value as WorksSecurityClassification)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                  >
                    <option value="public">Public</option>
                    <option value="internal">Internal</option>
                    <option value="confidential">Confidential</option>
                    <option value="restricted_sovereign">Restricted Sovereign</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Custom Domain CNAME (Optional)</label>
                <input
                  type="text"
                  value={newCustomDomain}
                  onChange={(e) => setNewCustomDomain(e.target.value)}
                  placeholder="works.yourdomain.com"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Departments / Organizational Units (Comma-separated)</label>
                <input
                  type="text"
                  value={newDepartments}
                  onChange={(e) => setNewDepartments(e.target.value)}
                  placeholder="Engineering, Design, Operations, Legal"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/30 cursor-pointer"
                >
                  Provision Partition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

