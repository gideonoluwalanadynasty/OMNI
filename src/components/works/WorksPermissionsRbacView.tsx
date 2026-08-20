import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, UserCheck, Key, Eye, Edit, Trash2, Plus, 
  Check, AlertCircle, Fingerprint, Shield, Users, Globe, Terminal
} from 'lucide-react';
import { WorksRole, WorksWorkspaceMember, WorksPermissionPolicy } from '../../types/works';
import { SEED_WORKS_PERMISSION_POLICIES, SEED_WORKS_MEMBERS } from '../../data/omni_works_seed';

interface WorksPermissionsRbacViewProps {
  currentWorkspaceId: string;
}

export const WorksPermissionsRbacView: React.FC<WorksPermissionsRbacViewProps> = ({
  currentWorkspaceId
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'members' | 'abac'>('matrix');
  const [policies, setPolicies] = useState<WorksPermissionPolicy[]>(SEED_WORKS_PERMISSION_POLICIES);
  const [members, setMembers] = useState<WorksWorkspaceMember[]>(SEED_WORKS_MEMBERS);
  const [selectedRole, setSelectedRole] = useState<WorksRole>('workspace_owner');

  const roleList: { role: WorksRole; label: string; color: string }[] = [
    { role: 'workspace_owner', label: 'Owner', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { role: 'workspace_admin', label: 'Admin', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    { role: 'project_lead', label: 'Project Lead', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    { role: 'editor', label: 'Editor', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { role: 'contributor', label: 'Contributor', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { role: 'client_guest', label: 'Client / Guest', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
    { role: 'compliance_auditor', label: 'Auditor', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
  ];

  const currentPolicy = policies.find(p => p.role === selectedRole) || policies[0];

  const scopeCategories: { key: keyof WorksPermissionPolicy['scopes']; label: string; icon: string }[] = [
    { key: 'workspaces', label: 'Workspaces', icon: 'Building2' },
    { key: 'docs', label: 'Block Docs & Markdown', icon: 'FileText' },
    { key: 'canvases', label: 'Infinite Canvas Whiteboards', icon: 'Layers' },
    { key: 'databases', label: 'Relational DBs & Sheets', icon: 'Database' },
    { key: 'sprints', label: 'Agile Sprints & Epics', icon: 'ListOrdered' },
    { key: 'automations', label: 'Low-Code Automations', icon: 'Zap' },
    { key: 'finance', label: 'Time Tracking & Escrow', icon: 'DollarSign' },
    { key: 'ai', label: 'AI Copilot & Agents', icon: 'Sparkles' },
    { key: 'administration', label: 'System & Security Admin', icon: 'ShieldCheck' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Role-Based (RBAC) &amp; Attribute-Based (ABAC) Access Control</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Security &amp; Permissions Matrix</h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            Granular capability mapping, decentralized DID credentials, passkey verification, and air-gapped tenant privilege separation.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 shrink-0">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'matrix' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            RBAC Matrix
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'members' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Team Roster ({members.length})
          </button>
          <button
            onClick={() => setActiveTab('abac')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'abac' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            ABAC Policies
          </button>
        </div>
      </div>

      {/* Tab 1: RBAC Matrix */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Role selector column */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 px-1">Configured Roles</div>
            {roleList.map((r) => (
              <button
                key={r.role}
                onClick={() => setSelectedRole(r.role)}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  selectedRole === r.role
                    ? 'bg-neutral-900 border-indigo-500 shadow-md shadow-indigo-950/40 text-white'
                    : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:bg-neutral-900/80 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-white">{r.label}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${r.color}`}>
                    {r.role}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-1">
                  {policies.find(p => p.role === r.role)?.description}
                </p>
              </button>
            ))}
          </div>

          {/* Scopes Grid for Selected Role */}
          <div className="lg:col-span-3 space-y-4">
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">{currentPolicy.label} Scopes</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{currentPolicy.description}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {selectedRole}
                </span>
              </div>

              {/* Scopes Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {scopeCategories.map((cat) => {
                  const allowedScopes = currentPolicy.scopes[cat.key] || [];

                  return (
                    <div key={cat.key} className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-200">{cat.label}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                          {allowedScopes.length} scopes
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {allowedScopes.length > 0 ? (
                          allowedScopes.map((scope: string) => (
                            <span
                              key={scope}
                              className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/20 flex items-center gap-1"
                            >
                              <Check className="w-2.5 h-2.5" />
                              {scope}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-neutral-500 italic">No access permitted</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Team Roster with DID & Passport Indicators */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/60 backdrop-blur-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 font-semibold border-b border-neutral-800">
                <tr>
                  <th className="p-3.5">Member &amp; DID</th>
                  <th className="p-3.5">Assigned Role</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Identity Badges</th>
                  <th className="p-3.5">Security Posture</th>
                  <th className="p-3.5">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-sans">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={m.avatarUrl}
                          alt={m.name}
                          className="w-8 h-8 rounded-full object-cover border border-neutral-700"
                        />
                        <div>
                          <div className="font-bold text-white text-xs">{m.name}</div>
                          <div className="text-[10px] font-mono text-neutral-400 truncate max-w-[180px]">{m.did}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                        roleList.find(r => r.role === m.role)?.color || 'bg-neutral-800 text-neutral-300'
                      }`}>
                        {m.role.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-3.5 text-neutral-300 font-medium">{m.department}</td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        {m.kycVerified && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20" title="Passport KYC Verified">
                            KYC
                          </span>
                        )}
                        {m.kybVerified && (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20" title="Business KYB Verified">
                            KYB
                          </span>
                        )}
                        {!m.kycVerified && !m.kybVerified && (
                          <span className="text-[10px] text-neutral-500 font-mono">Standard</span>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        {m.twoFactorEnforced ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <Fingerprint className="w-3.5 h-3.5" />
                            2FA / Passkey Active
                          </span>
                        ) : (
                          <span className="text-amber-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Password Only
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5 text-neutral-400 font-mono text-[11px]">{m.lastActiveAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: ABAC Dynamic Policy Engine */}
      {activeTab === 'abac' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>IP CIDR Whitelist Restrictions</span>
            </div>
            <p className="text-xs text-neutral-400">
              Only allow workspace write access if caller request originates from configured corporate or VPN CIDR subnets.
            </p>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-emerald-400 space-y-1">
              <div>192.168.1.0/24 (HQ Sovereign Gateway)</div>
              <div>10.0.0.0/8 (Omni Internal Mesh)</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Security Classification Gating</span>
            </div>
            <p className="text-xs text-neutral-400">
              Enforces step-up FIDO2 biometric authentication whenever opening documents or sheets tagged as <code>restricted_sovereign</code>.
            </p>
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
              <span className="text-neutral-300 font-semibold">Automatic WebAuthn Step-Up</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[10px]">
                ENFORCED
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
