import React, { useState } from 'react';
import { 
  ShieldCheck, Key, Plus, Check, X, Users, Lock, Unlock, 
  Crown, Sparkles, Edit3, Trash2, CheckCircle2, AlertCircle,
  HelpCircle, Eye, Sliders, ChevronRight
} from 'lucide-react';
import { WorksCustomRole, WorksWorkspaceMember, WorksRoleType } from '../../types/works';

interface WorksRolesPermissionsViewProps {
  customRoles: WorksCustomRole[];
  members: WorksWorkspaceMember[];
  workspaceName: string;
  onAddCustomRole: (newRole: Partial<WorksCustomRole>) => void;
  onUpdateCustomRole: (roleId: string, updatedRole: Partial<WorksCustomRole>) => void;
  onUpdateMemberRole: (userId: string, newRole: WorksRoleType) => void;
  triggerToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const SYSTEM_ROLES_INFO: { role: WorksRoleType; name: string; description: string; color: string }[] = [
  {
    role: 'workspace_owner',
    name: 'Workspace Owner',
    description: 'Ultimate sovereign authority. Full control over workspace lifecycle, billing, destruction, and root keys.',
    color: '#6366f1'
  },
  {
    role: 'workspace_admin',
    name: 'Workspace Administrator',
    description: 'Full administrative rights across departments, squads, security policies, and integrations.',
    color: '#06b6d4'
  },
  {
    role: 'project_lead',
    name: 'Project & Squad Lead',
    description: 'Manage sprints, assign issues, create project databases, and configure squad automations.',
    color: '#a855f7'
  },
  {
    role: 'editor',
    name: 'Workspace Editor',
    description: 'Create and edit documents, canvas boards, databases, and collaborate with real-time CRDT presence.',
    color: '#10b981'
  },
  {
    role: 'contributor',
    name: 'Contributor',
    description: 'Comment, suggest edits, update assigned sprint tasks, and access approved folders.',
    color: '#3b82f6'
  },
  {
    role: 'compliance_auditor',
    name: 'Compliance & Security Auditor',
    description: 'Read-only immutable access to audit trails, SOC2 reports, and zero-knowledge vault telemetry.',
    color: '#f59e0b'
  },
  {
    role: 'client_guest',
    name: 'Client Guest / Contractor',
    description: 'Restricted external collaborator access to assigned client spaces with token-gated DID verification.',
    color: '#ec4899'
  }
];

export const WorksRolesPermissionsView: React.FC<WorksRolesPermissionsViewProps> = ({
  customRoles,
  members,
  workspaceName,
  onAddCustomRole,
  onUpdateCustomRole,
  onUpdateMemberRole,
  triggerToast
}) => {
  const [activeTab, setActiveTab] = useState<'system' | 'custom' | 'matrix'>('system');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState<WorksCustomRole | null>(null);

  // Custom role form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    baseRole: 'editor' as WorksRoleType,
    color: '#6366f1',
    permissions: {
      canManageWorkspace: false,
      canManageBilling: false,
      canManageMembers: false,
      canManageDepartments: false,
      canManageTeams: false,
      canCreateDocs: true,
      canDeleteDocs: false,
      canCreateDatabases: true,
      canManageSprints: true,
      canTriggerAutomations: false,
      canAccessAiCopilot: true,
      canViewAuditLogs: false,
      canManageIntegrations: false
    }
  });

  const handleOpenCreateModal = () => {
    setFormData({
      name: '',
      description: '',
      baseRole: 'editor',
      color: '#6366f1',
      permissions: {
        canManageWorkspace: false,
        canManageBilling: false,
        canManageMembers: false,
        canManageDepartments: false,
        canManageTeams: true,
        canCreateDocs: true,
        canDeleteDocs: false,
        canCreateDatabases: true,
        canManageSprints: true,
        canTriggerAutomations: true,
        canAccessAiCopilot: true,
        canViewAuditLogs: false,
        canManageIntegrations: false
      }
    });
    setIsCreateModalOpen(true);
  };

  const handleSaveCustomRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      triggerToast?.('Validation Error', 'Role name is required.', 'error');
      return;
    }

    const newRole: Partial<WorksCustomRole> = {
      id: `role_${Date.now()}`,
      name: formData.name,
      description: formData.description,
      baseRole: formData.baseRole,
      color: formData.color,
      memberCount: 0,
      permissions: formData.permissions
    };

    onAddCustomRole(newRole);
    setIsCreateModalOpen(false);
    triggerToast?.('Custom Role Created', `Role ${newRole.name} is now available for assignment.`, 'success');
  };

  const togglePermission = (key: keyof typeof formData.permissions) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: !prev.permissions[key]
      }
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-amber-950/40 border border-neutral-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Governance &amp; RBAC
              </span>
              <span className="text-xs text-neutral-400 font-mono">Workspace: {workspaceName}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              Roles, Permissions &amp; Access Policies
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 max-w-2xl mt-0.5">
              Granular Role-Based (RBAC) and Attribute-Based (ABAC) access control matrices with custom enterprise role tailoring.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Role</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-neutral-800/80">
          <button
            onClick={() => setActiveTab('system')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'system'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            System Predefined Roles ({SYSTEM_ROLES_INFO.length})
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'custom'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Custom Enterprise Roles ({customRoles.length})
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Granular Capability Matrix
          </button>
        </div>
      </div>

      {/* System Roles Tab */}
      {activeTab === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SYSTEM_ROLES_INFO.map((sysRole) => {
            const roleMembers = members.filter(m => m.role === sysRole.role);

            return (
              <div
                key={sysRole.role}
                className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
                        style={{ backgroundColor: `${sysRole.color}25`, color: sysRole.color, border: `1px solid ${sysRole.color}40` }}
                      >
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-white text-sm">{sysRole.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                      System Core
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                    {sysRole.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    {roleMembers.length} Members Assigned
                  </span>

                  <div className="flex items-center -space-x-1.5 overflow-hidden">
                    {roleMembers.slice(0, 4).map(m => (
                      <img
                        key={m.id}
                        src={m.avatarUrl}
                        alt={m.name}
                        title={m.name}
                        className="w-6 h-6 rounded-full object-cover ring-2 ring-neutral-900"
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Custom Roles Tab */}
      {activeTab === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customRoles.map((cRole) => (
            <div
              key={cRole.id}
              className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-bold"
                      style={{ backgroundColor: `${cRole.color}25`, color: cRole.color, border: `1px solid ${cRole.color}40` }}
                    >
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-sm">{cRole.name}</span>
                      <div className="text-[10px] text-neutral-400">Base: {cRole.baseRole.replace(/_/g, ' ')}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Custom RBAC
                  </span>
                </div>

                <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                  {cRole.description}
                </p>

                {/* Enabled Permissions Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {Object.entries(cRole.permissions).filter(([_, val]) => val).map(([key]) => (
                    <span
                      key={key}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 border border-neutral-800"
                    >
                      {key.replace('can', '').replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>{cRole.memberCount} Users Linked</span>
                <span className="text-[10px] text-emerald-400 font-medium">Active Policy</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Granular Capability Matrix Tab */}
      {activeTab === 'matrix' && (
        <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Capability / Permission</th>
                  <th className="py-3 px-3 text-center">Owner</th>
                  <th className="py-3 px-3 text-center">Admin</th>
                  <th className="py-3 px-3 text-center">Lead</th>
                  <th className="py-3 px-3 text-center">Editor</th>
                  <th className="py-3 px-3 text-center">Contributor</th>
                  <th className="py-3 px-3 text-center">Auditor</th>
                  <th className="py-3 px-3 text-center">Guest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/70">
                {[
                  { name: 'Manage Workspace & Domain', perm: [true, true, false, false, false, false, false] },
                  { name: 'Manage Enterprise Billing & Escrow', perm: [true, false, false, false, false, true, false] },
                  { name: 'Manage Divisions & Department Units', perm: [true, true, false, false, false, false, false] },
                  { name: 'Create & Manage Team Squads', perm: [true, true, true, false, false, false, false] },
                  { name: 'Invite & Manage Member Directory', perm: [true, true, false, false, false, false, false] },
                  { name: 'Create & Delete Workspace Documents', perm: [true, true, true, true, false, false, false] },
                  { name: 'Create Relational Databases', perm: [true, true, true, true, false, false, false] },
                  { name: 'Manage Agile Sprints & Epics', perm: [true, true, true, true, true, false, false] },
                  { name: 'Trigger Automations & Webhooks', perm: [true, true, true, false, false, false, false] },
                  { name: 'Access AI Copilot & Vector Vault', perm: [true, true, true, true, true, false, true] },
                  { name: 'View Audit Logs & Compliance Stream', perm: [true, true, false, false, false, true, false] },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-neutral-200">
                      {row.name}
                    </td>
                    {row.perm.map((val, idx) => (
                      <td key={idx} className="py-3 px-3 text-center">
                        {val ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neutral-900 text-neutral-600">
                            <X className="w-3 h-3" />
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Custom Role Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Create Custom Enterprise Role</h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveCustomRole} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Role Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Treasury Operations Lead"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Description</label>
                <textarea
                  rows={2}
                  placeholder="Scope of permissions and functional authority..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Base Inheritance</label>
                  <select
                    value={formData.baseRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, baseRole: e.target.value as any }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="workspace_admin">Admin Base</option>
                    <option value="project_lead">Lead Base</option>
                    <option value="editor">Editor Base</option>
                    <option value="contributor">Contributor Base</option>
                    <option value="compliance_auditor">Auditor Base</option>
                    <option value="client_guest">Guest Base</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Badge Color</label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-9 mt-1 rounded-xl bg-neutral-950 border border-neutral-800 cursor-pointer"
                  />
                </div>
              </div>

              {/* Granular Permission Toggles */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Granular Capability Toggles
                </label>
                <div className="mt-2 space-y-1.5 p-3 rounded-xl bg-neutral-950 border border-neutral-800 max-h-48 overflow-y-auto">
                  {Object.entries(formData.permissions).map(([key, val]) => (
                    <div
                      key={key}
                      onClick={() => togglePermission(key as any)}
                      className="p-1.5 rounded-lg flex items-center justify-between text-xs cursor-pointer hover:bg-neutral-900 text-neutral-300"
                    >
                      <span>{key.replace('can', '').replace(/([A-Z])/g, ' $1').trim()}</span>
                      <input
                        type="checkbox"
                        checked={val}
                        onChange={() => {}}
                        className="rounded border-neutral-700 text-amber-600 focus:ring-0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-white shadow-md shadow-amber-600/30"
                >
                  Save Custom Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
