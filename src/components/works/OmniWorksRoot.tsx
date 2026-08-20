import React, { useState } from 'react';
import { 
  Layers, Building2, Server, ShieldCheck, CreditCard, Sliders, 
  GitMerge, Terminal, Sparkles, Video, Wallet, Globe, Compass, 
  Search, ChevronDown, Check, Plus, ExternalLink, Activity,
  Users, Network, Key, UserCheck, Briefcase
} from 'lucide-react';
import { 
  WorksWorkspace, 
  WorksTenantTier, 
  WorksDepartment, 
  WorksTeam, 
  WorksWorkspaceMember, 
  WorksCustomRole,
  WorksRoleType 
} from '../../types/works';
import { 
  SEED_WORKS_WORKSPACES, 
  SEED_WORKS_MODULE_STATUSES, 
  SEED_WORKS_ECOSYSTEM_BRIDGES,
  SEED_WORKS_DEPARTMENTS,
  SEED_WORKS_TEAMS,
  SEED_WORKS_MEMBERS,
  SEED_WORKS_CUSTOM_ROLES
} from '../../data/omni_works_seed';
import { WorksWorkspaceOverview } from './WorksWorkspaceOverview';
import { WorksServiceArchitectureView } from './WorksServiceArchitectureView';
import { WorksTenantManagerView } from './WorksTenantManagerView';
import { WorksPermissionsRbacView } from './WorksPermissionsRbacView';
import { WorksSubscriptionQuotaView } from './WorksSubscriptionQuotaView';
import { WorksFeatureActivationView } from './WorksFeatureActivationView';
import { WorksEcosystemIntegrationView } from './WorksEcosystemIntegrationView';
import { WorksManifestInspectorModal } from './WorksManifestInspectorModal';
import { WorksDepartmentsView } from './WorksDepartmentsView';
import { WorksTeamsView } from './WorksTeamsView';
import { WorksEmployeeDirectoryView } from './WorksEmployeeDirectoryView';
import { WorksOrgChartView } from './WorksOrgChartView';
import { WorksRolesPermissionsView } from './WorksRolesPermissionsView';

interface OmniWorksRootProps {
  onNavigateApp?: (appId: string) => void;
  triggerToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const OmniWorksRoot: React.FC<OmniWorksRootProps> = ({
  onNavigateApp,
  triggerToast
}) => {
  const [workspaces, setWorkspaces] = useState<WorksWorkspace[]>(SEED_WORKS_WORKSPACES);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string>(workspaces[0].id);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isManifestOpen, setIsManifestOpen] = useState<boolean>(false);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState<boolean>(false);

  // Management & Org Hierarchy state
  const [departments, setDepartments] = useState<WorksDepartment[]>(SEED_WORKS_DEPARTMENTS);
  const [teams, setTeams] = useState<WorksTeam[]>(SEED_WORKS_TEAMS);
  const [members, setMembers] = useState<WorksWorkspaceMember[]>(SEED_WORKS_MEMBERS);
  const [customRoles, setCustomRoles] = useState<WorksCustomRole[]>(SEED_WORKS_CUSTOM_ROLES);

  // Local feature flags state for active workspace
  const [workspaceFlags, setWorkspaceFlags] = useState<Record<string, Record<string, boolean>>>({
    ws_dynasty_core: { ...workspaces[0].featureFlags },
    ws_acme_engineering: { ...workspaces[1].featureFlags },
    ws_client_ventures: { ...workspaces[2].featureFlags }
  });

  const currentWorkspace = workspaces.find(w => w.id === currentWorkspaceId) || workspaces[0];
  const currentFlags = workspaceFlags[currentWorkspaceId] || currentWorkspace.featureFlags;

  const handleSelectWorkspace = (wsId: string) => {
    setCurrentWorkspaceId(wsId);
    setIsWorkspaceDropdownOpen(false);
    triggerToast?.('Workspace Switched', `Active workspace switched to ${workspaces.find(w => w.id === wsId)?.name}.`, 'info');
  };

  const handleCreateWorkspace = (newWsData: Partial<WorksWorkspace>) => {
    const newWs: WorksWorkspace = {
      id: `ws_${Date.now()}`,
      tenantId: 'tenant_dynasty_99',
      name: newWsData.name || 'New Workspace',
      slug: newWsData.slug || 'new-workspace',
      type: newWsData.type || 'company',
      description: newWsData.description || '',
      icon: newWsData.icon || 'Layers',
      color: newWsData.color || '#6366f1',
      residency: newWsData.residency || 'eu-central',
      customDomain: newWsData.customDomain,
      isDomainVerified: false,
      classification: newWsData.classification || 'internal',
      tier: newWsData.tier || 'team_pro',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: 'usr_gideon_01',
      ownerName: 'Gideon Oluwalana',
      ownerEmail: 'gideonoluwalanadynasty@gmail.com',
      departments: newWsData.departments || ['Engineering', 'Operations'],
      activeMembersCount: 1,
      storageUsedBytes: 10485760, // 10MB
      storageLimitBytes: 107374182400, // 100GB
      aiCreditsUsed: 0,
      aiCreditsMonthlyLimit: 500000,
      automationsRunThisMonth: 0,
      automationsMonthlyLimit: 5000,
      activeHuddlesCount: 0,
      featureFlags: { ...currentWorkspace.featureFlags },
      tags: ['New', 'Sovereign'],
      isArchived: false
    };

    setWorkspaces(prev => [newWs, ...prev]);
    setWorkspaceFlags(prev => ({ ...prev, [newWs.id]: { ...newWs.featureFlags } }));
    setCurrentWorkspaceId(newWs.id);
    triggerToast?.('Workspace Provisioned', `New sovereign partition ${newWs.name} allocated.`, 'success');
  };

  // Department Handlers
  const handleAddDepartment = (newDeptData: Partial<WorksDepartment>) => {
    const newDept: WorksDepartment = {
      id: newDeptData.id || `dept_${Date.now()}`,
      workspaceId: currentWorkspaceId,
      name: newDeptData.name || 'New Department',
      code: newDeptData.code || 'DEPT',
      description: newDeptData.description || '',
      headUserId: newDeptData.headUserId || 'usr_gideon_01',
      headUserName: newDeptData.headUserName || 'Gideon Oluwalana',
      headUserAvatar: newDeptData.headUserAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      headUserTitle: newDeptData.headUserTitle || 'Department Head',
      budgetAnnualUsd: newDeptData.budgetAnnualUsd || 500000,
      budgetSpentUsd: newDeptData.budgetSpentUsd || 0,
      memberCount: newDeptData.memberCount || 1,
      color: newDeptData.color || '#6366f1',
      icon: newDeptData.icon || 'Building2',
      teamsCount: 0,
      objectives: newDeptData.objectives || ['Establish strategic operational milestones'],
      accessPolicy: newDeptData.accessPolicy || 'open',
      tags: newDeptData.tags || ['Organization']
    };
    setDepartments(prev => [newDept, ...prev]);
  };

  const handleUpdateDepartment = (deptId: string, updatedData: Partial<WorksDepartment>) => {
    setDepartments(prev => prev.map(d => d.id === deptId ? { ...d, ...updatedData } : d));
  };

  // Team Handlers
  const handleAddTeam = (newTeamData: Partial<WorksTeam>) => {
    const newTeam: WorksTeam = {
      id: newTeamData.id || `team_${Date.now()}`,
      workspaceId: currentWorkspaceId,
      departmentId: newTeamData.departmentId || departments[0]?.id || 'dept_eng',
      departmentName: newTeamData.departmentName || departments[0]?.name || 'Core Engineering',
      name: newTeamData.name || 'New Squad',
      slug: newTeamData.slug || 'new-squad',
      type: newTeamData.type || 'functional',
      description: newTeamData.description || '',
      leadUserId: newTeamData.leadUserId || 'usr_sarah_chen',
      leadUserName: newTeamData.leadUserName || 'Dr. Sarah Chen',
      leadUserAvatar: newTeamData.leadUserAvatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      leadUserTitle: newTeamData.leadUserTitle || 'Squad Lead',
      memberIds: newTeamData.memberIds || ['usr_sarah_chen'],
      memberCount: newTeamData.memberCount || 1,
      members: newTeamData.members || [],
      color: newTeamData.color || '#06b6d4',
      icon: newTeamData.icon || 'Code',
      activeSprintId: 'spr_active',
      activeSprintName: 'Sprint 1: Genesis',
      sprintVelocityAvg: 45,
      openIssuesCount: 6,
      huddleChannelId: `huddle_team_${Date.now()}`,
      isPrivate: newTeamData.isPrivate || false,
      status: newTeamData.status || 'active',
      createdDate: newTeamData.createdDate || new Date().toISOString(),
      tags: newTeamData.tags || ['Squad']
    };
    setTeams(prev => [newTeam, ...prev]);
  };

  const handleUpdateTeam = (teamId: string, updatedData: Partial<WorksTeam>) => {
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, ...updatedData } : t));
  };

  // Member Handlers
  const handleAddMember = (newMemberData: Partial<WorksWorkspaceMember>) => {
    const newMember: WorksWorkspaceMember = {
      id: `wm_${Date.now()}`,
      workspaceId: currentWorkspaceId,
      userId: newMemberData.userId || `usr_${Date.now()}`,
      name: newMemberData.name || 'Anonymous Sovereign',
      email: newMemberData.email || 'user@dynasty.network',
      avatarUrl: newMemberData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: newMemberData.title || 'Collaborator',
      role: newMemberData.role || 'editor',
      departmentId: newMemberData.departmentId,
      department: newMemberData.department || 'Core Engineering',
      teamIds: newMemberData.teamIds || [],
      teams: newMemberData.teams || [],
      managerId: newMemberData.managerId,
      managerName: newMemberData.managerName,
      location: newMemberData.location || 'Remote Mesh Node',
      timezone: newMemberData.timezone || 'UTC+0',
      skills: newMemberData.skills || ['Systems', 'Collaboration'],
      phoneNumber: newMemberData.phoneNumber,
      connectStatus: newMemberData.connectStatus || 'online',
      did: newMemberData.did || `did:omni:secp256k1:0x${Math.random().toString(16).slice(2, 10)}`,
      kycVerified: newMemberData.kycVerified ?? true,
      kybVerified: newMemberData.kybVerified ?? false,
      identityVerificationTier: newMemberData.identityVerificationTier || 'tier_2_kyc_passed',
      fido2KeysCount: newMemberData.fido2KeysCount || 1,
      twoFactorEnforced: true,
      lastActiveAt: 'Just now',
      joinedAt: new Date().toISOString(),
      status: 'active',
      assignedSpaces: newMemberData.assignedSpaces || ['General Workspace']
    };
    setMembers(prev => [newMember, ...prev]);
  };

  const handleUpdateMember = (memberId: string, updatedData: Partial<WorksWorkspaceMember>) => {
    setMembers(prev => prev.map(m => (m.id === memberId || m.userId === memberId) ? { ...m, ...updatedData } : m));
  };

  const handleUpdateMemberRole = (userId: string, newRole: WorksRoleType) => {
    setMembers(prev => prev.map(m => m.userId === userId ? { ...m, role: newRole } : m));
    triggerToast?.('Role Reassigned', `Updated member role to ${newRole.replace(/_/g, ' ')}.`, 'success');
  };

  // Custom Roles Handlers
  const handleAddCustomRole = (newRoleData: Partial<WorksCustomRole>) => {
    const newRole: WorksCustomRole = {
      id: newRoleData.id || `role_${Date.now()}`,
      name: newRoleData.name || 'Custom Role',
      description: newRoleData.description || '',
      baseRole: newRoleData.baseRole || 'editor',
      color: newRoleData.color || '#6366f1',
      memberCount: 0,
      permissions: newRoleData.permissions || {
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
    };
    setCustomRoles(prev => [newRole, ...prev]);
  };

  const handleToggleFlag = (key: string, enabled: boolean) => {
    setWorkspaceFlags(prev => ({
      ...prev,
      [currentWorkspaceId]: {
        ...prev[currentWorkspaceId],
        [key]: enabled
      }
    }));
    triggerToast?.('Feature Flag Propagated', `${key} set to ${enabled ? 'ENABLED' : 'DISABLED'} across active edge mesh.`, 'info');
  };

  const handleUpgradeTier = (newTier: WorksTenantTier) => {
    setWorkspaces(prev => prev.map(w => {
      if (w.id === currentWorkspaceId) {
        return { ...w, tier: newTier };
      }
      return w;
    }));
    triggerToast?.('Tier Upgraded', `Workspace plan updated to ${newTier.replace('_', ' ').toUpperCase()}.`, 'success');
  };

  const navTabs = [
    { id: 'overview', label: 'Workspace Hub', icon: <Layers className="w-4 h-4" /> },
    { id: 'departments', label: 'Departments', icon: <Building2 className="w-4 h-4" /> },
    { id: 'teams', label: 'Teams & Squads', icon: <Users className="w-4 h-4" /> },
    { id: 'directory', label: 'People Directory', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'orgchart', label: 'Org Chart', icon: <Network className="w-4 h-4" /> },
    { id: 'roles', label: 'Roles & RBAC', icon: <Key className="w-4 h-4" /> },
    { id: 'tenants', label: 'Workspaces', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'architecture', label: '13 Sub-Engines', icon: <Server className="w-4 h-4" /> },
    { id: 'subscription', label: 'Quotas & Tiers', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'features', label: 'Feature Flags', icon: <Sliders className="w-4 h-4" /> },
    { id: 'ecosystem', label: 'Ecosystem Bridges (9)', icon: <GitMerge className="w-4 h-4" /> }
  ];

  return (
    <div id="omni-works-root" className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col">
      
      {/* Top Application Bar */}
      <header className="px-4 md:px-6 py-3.5 border-b border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
        
        {/* Left: Brand + Workspace Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-indigo-600/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm tracking-tight">OMNI Works</span>
                <span className="text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-400 px-1.5 py-0.2 rounded border border-indigo-500/30">
                  OS
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 hidden sm:inline">Productivity &amp; Operations Layer</span>
            </div>
          </div>

          {/* Workspace Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsWorkspaceDropdownOpen(prev => !prev)}
              className="px-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: currentWorkspace.color || '#6366f1' }}
              />
              <span className="truncate max-w-[140px]">{currentWorkspace.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {isWorkspaceDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 px-2 py-1">
                  Select Workspace
                </div>
                <div className="space-y-1">
                  {workspaces.map((ws) => (
                    <button
                      key={ws.id}
                      onClick={() => handleSelectWorkspace(ws.id)}
                      className={`w-full px-2.5 py-2 rounded-xl text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        ws.id === currentWorkspaceId
                          ? 'bg-indigo-600/20 text-indigo-400 font-bold border border-indigo-500/30'
                          : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: ws.color || '#6366f1' }}
                        />
                        <span className="truncate">{ws.name}</span>
                      </div>
                      {ws.id === currentWorkspaceId && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                    </button>
                  ))}
                </div>

                <div className="pt-2 mt-2 border-t border-neutral-800">
                  <button
                    onClick={() => {
                      setIsWorkspaceDropdownOpen(false);
                      setActiveTab('tenants');
                    }}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 text-[11px] font-semibold text-neutral-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Provision New Workspace</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick App Switchers & Actions */}
        <div className="flex items-center gap-2">
          
          {/* Ecosystem App Quick Switches */}
          <div className="hidden lg:flex items-center gap-1.5 bg-neutral-950 px-2.5 py-1 rounded-xl border border-neutral-800 text-xs">
            <button
              onClick={() => onNavigateApp?.('ai')}
              className="px-2 py-1 rounded-lg text-neutral-400 hover:text-indigo-400 flex items-center gap-1 transition-colors cursor-pointer"
              title="Switch to OMNI AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI</span>
            </button>
            <button
              onClick={() => onNavigateApp?.('connect')}
              className="px-2 py-1 rounded-lg text-neutral-400 hover:text-purple-400 flex items-center gap-1 transition-colors cursor-pointer"
              title="Switch to OMNI Connect"
            >
              <Video className="w-3.5 h-3.5 text-purple-400" />
              <span>Connect</span>
            </button>
            <button
              onClick={() => onNavigateApp?.('finance')}
              className="px-2 py-1 rounded-lg text-neutral-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
              title="Switch to OMNI Finance"
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Finance</span>
            </button>
            <button
              onClick={() => onNavigateApp?.('browser')}
              className="px-2 py-1 rounded-lg text-neutral-400 hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
              title="Switch to OMNI Browser"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Browser</span>
            </button>
          </div>

          <button
            onClick={() => setIsManifestOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors border border-neutral-700 shadow-sm cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Application Manifest</span>
          </button>
        </div>

      </header>

      {/* Navigation Sub-Header Tabs */}
      <nav className="px-4 md:px-6 py-2 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm overflow-x-auto scrollbar-none flex items-center gap-1.5">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-bold'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto space-y-6">
        {activeTab === 'overview' && (
          <WorksWorkspaceOverview
            workspace={currentWorkspace}
            modules={SEED_WORKS_MODULE_STATUSES}
            bridges={SEED_WORKS_ECOSYSTEM_BRIDGES}
            onNavigateTab={setActiveTab}
            onOpenManifest={() => setIsManifestOpen(true)}
            onTriggerToast={triggerToast || (() => {})}
          />
        )}

        {activeTab === 'departments' && (
          <WorksDepartmentsView
            departments={departments}
            workspaceName={currentWorkspace.name}
            onAddDepartment={handleAddDepartment}
            onUpdateDepartment={handleUpdateDepartment}
            onSelectDepartment={(dept) => triggerToast?.('Department Selected', `Viewing ${dept.name} budget & objectives`, 'info')}
            triggerToast={triggerToast}
          />
        )}

        {activeTab === 'teams' && (
          <WorksTeamsView
            teams={teams}
            departments={departments}
            workspaceName={currentWorkspace.name}
            onAddTeam={handleAddTeam}
            onUpdateTeam={handleUpdateTeam}
            onSelectTeam={(team) => triggerToast?.('Squad Selected', `Inspecting ${team.name} active sprint`, 'info')}
            onLaunchHuddle={(channelId, teamName) => {
              triggerToast?.('OMNI Connect Huddle Initiated', `Opening sovereign squad huddle for ${teamName}...`, 'info');
              onNavigateApp?.('connect');
            }}
            triggerToast={triggerToast}
          />
        )}

        {activeTab === 'directory' && (
          <WorksEmployeeDirectoryView
            members={members}
            departments={departments}
            teams={teams}
            customRoles={customRoles}
            workspaceName={currentWorkspace.name}
            onAddMember={handleAddMember}
            onUpdateMember={handleUpdateMember}
            onStartDirectHuddle={(userId, userName) => {
              triggerToast?.('OMNI Connect Video Call', `Starting P2P video huddle with ${userName}...`, 'info');
              onNavigateApp?.('connect');
            }}
            onStartDirectChat={(userId, userName) => {
              triggerToast?.('OMNI Connect Direct Chat', `Opening encrypted chat with ${userName}...`, 'info');
              onNavigateApp?.('connect');
            }}
            triggerToast={triggerToast}
          />
        )}

        {activeTab === 'orgchart' && (
          <WorksOrgChartView
            members={members}
            departments={departments}
            teams={teams}
            workspaceName={currentWorkspace.name}
            onStartDirectHuddle={(userId, userName) => {
              triggerToast?.('OMNI Connect Video Call', `Calling ${userName}...`, 'info');
              onNavigateApp?.('connect');
            }}
            onStartDirectChat={(userId, userName) => {
              triggerToast?.('OMNI Connect Direct Chat', `Opening chat with ${userName}...`, 'info');
              onNavigateApp?.('connect');
            }}
            triggerToast={triggerToast}
          />
        )}

        {activeTab === 'roles' && (
          <WorksRolesPermissionsView
            customRoles={customRoles}
            members={members}
            workspaceName={currentWorkspace.name}
            onAddCustomRole={handleAddCustomRole}
            onUpdateCustomRole={(rId, data) => setCustomRoles(prev => prev.map(r => r.id === rId ? { ...r, ...data } : r))}
            onUpdateMemberRole={handleUpdateMemberRole}
            triggerToast={triggerToast}
          />
        )}

        {activeTab === 'tenants' && (
          <WorksTenantManagerView
            workspaces={workspaces}
            currentWorkspaceId={currentWorkspaceId}
            onSelectWorkspace={handleSelectWorkspace}
            onCreateWorkspace={handleCreateWorkspace}
          />
        )}

        {activeTab === 'architecture' && (
          <WorksServiceArchitectureView
            onSelectModule={(modId) => triggerToast?.('Sub-Engine Selected', `Inspecting ${modId}`, 'info')}
          />
        )}

        {activeTab === 'permissions' && (
          <WorksPermissionsRbacView
            currentWorkspaceId={currentWorkspaceId}
          />
        )}

        {activeTab === 'subscription' && (
          <WorksSubscriptionQuotaView
            currentWorkspace={currentWorkspace}
            onUpgradeTier={handleUpgradeTier}
          />
        )}

        {activeTab === 'features' && (
          <WorksFeatureActivationView
            currentFlags={currentFlags}
            onToggleFlag={handleToggleFlag}
          />
        )}

        {activeTab === 'ecosystem' && (
          <WorksEcosystemIntegrationView
            onTriggerToast={triggerToast}
            onNavigateConnectHuddle={() => onNavigateApp?.('connect')}
            onNavigateFinanceEscrow={() => onNavigateApp?.('finance')}
          />
        )}
      </main>

      {/* Application Manifest Inspector Modal */}
      <WorksManifestInspectorModal
        isOpen={isManifestOpen}
        onClose={() => setIsManifestOpen(false)}
      />

    </div>
  );
};

