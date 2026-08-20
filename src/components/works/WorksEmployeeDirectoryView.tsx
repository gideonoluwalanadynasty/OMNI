import React, { useState } from 'react';
import { 
  Users, UserPlus, Search, Filter, Mail, Phone, MapPin, Clock, 
  ShieldCheck, Key, Video, MessageSquare, ExternalLink, CheckCircle2, 
  Grid, List, MoreVertical, Sparkles, Building2, Layers, Crown, 
  Copy, Check, ChevronRight, UserCheck, Smartphone, Shield, ArrowUpRight,
  DownloadCloud, Globe
} from 'lucide-react';
import { WorksWorkspaceMember, WorksDepartment, WorksTeam, WorksCustomRole } from '../../types/works';
import { SEED_OMNI_CONNECT_CONTACTS } from '../../data/omni_works_seed';

interface WorksEmployeeDirectoryViewProps {
  members: WorksWorkspaceMember[];
  departments: WorksDepartment[];
  teams: WorksTeam[];
  customRoles: WorksCustomRole[];
  workspaceName: string;
  onAddMember: (newMember: Partial<WorksWorkspaceMember>) => void;
  onUpdateMember: (memberId: string, updatedMember: Partial<WorksWorkspaceMember>) => void;
  onRemoveMember?: (memberId: string) => void;
  onStartDirectHuddle?: (userId: string, userName: string) => void;
  onStartDirectChat?: (userId: string, userName: string) => void;
  triggerToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const WorksEmployeeDirectoryView: React.FC<WorksEmployeeDirectoryViewProps> = ({
  members,
  departments,
  teams,
  customRoles,
  workspaceName,
  onAddMember,
  onUpdateMember,
  onRemoveMember,
  onStartDirectHuddle,
  onStartDirectChat,
  triggerToast
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<WorksWorkspaceMember | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [isConnectImportOpen, setIsConnectImportOpen] = useState<boolean>(false);
  const [copiedDid, setCopiedDid] = useState<string | null>(null);

  // Invite Form State
  const [inviteData, setInviteData] = useState({
    name: '',
    email: '',
    title: '',
    role: 'editor' as WorksWorkspaceMember['role'],
    departmentId: '',
    teamId: '',
    managerId: '',
    location: 'Remote Sovereign Node',
    timezone: 'UTC+0 (London / GMT)',
    skillsStr: 'Product, Strategy, Systems',
    phoneNumber: '+1 555 0192',
    did: 'did:omni:secp256k1:0x' + Math.random().toString(16).slice(2, 10)
  });

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      member.did?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = deptFilter === 'all' || member.departmentId === deptFilter || member.department === deptFilter;
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.connectStatus === statusFilter;

    return matchesSearch && matchesDept && matchesRole && matchesStatus;
  });

  const handleCopyDid = (didText: string) => {
    navigator.clipboard.writeText(didText);
    setCopiedDid(didText);
    triggerToast?.('DID Copied', 'Sovereign Decentralized Identifier copied to clipboard.', 'info');
    setTimeout(() => setCopiedDid(null), 2000);
  };

  const handleOpenInvite = () => {
    setInviteData({
      name: '',
      email: '',
      title: '',
      role: 'editor',
      departmentId: departments[0]?.id || '',
      teamId: teams[0]?.id || '',
      managerId: members[0]?.userId || '',
      location: 'Remote Sovereign Node',
      timezone: 'UTC+0 (London / GMT)',
      skillsStr: 'Product, Strategy, TypeScript',
      phoneNumber: '+1 555 0192',
      did: 'did:omni:secp256k1:0x' + Math.random().toString(16).slice(2, 12)
    });
    setIsInviteModalOpen(true);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteData.name || !inviteData.email) {
      triggerToast?.('Validation Error', 'Name and email are required.', 'error');
      return;
    }

    const dept = departments.find(d => d.id === inviteData.departmentId) || departments[0];
    const team = teams.find(t => t.id === inviteData.teamId);
    const mgr = members.find(m => m.userId === inviteData.managerId);

    const newMember: Partial<WorksWorkspaceMember> = {
      workspaceId: 'ws_dynasty_core',
      userId: `usr_${Date.now().toString().slice(-6)}`,
      name: inviteData.name,
      email: inviteData.email,
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
      title: inviteData.title || 'Specialist',
      role: inviteData.role,
      departmentId: dept?.id,
      department: dept?.name || 'Core Engineering',
      teamIds: team ? [team.id] : [],
      teams: team ? [team.name] : [],
      managerId: mgr?.userId,
      managerName: mgr?.name,
      location: inviteData.location,
      timezone: inviteData.timezone,
      skills: inviteData.skillsStr.split(',').map(s => s.trim()).filter(Boolean),
      phoneNumber: inviteData.phoneNumber,
      connectStatus: 'offline',
      did: inviteData.did,
      kycVerified: true,
      kybVerified: false,
      identityVerificationTier: 'tier_2_kyc_passed',
      fido2KeysCount: 1,
      twoFactorEnforced: true,
      lastActiveAt: 'Invited just now',
      joinedAt: new Date().toISOString(),
      status: 'active',
      assignedSpaces: ['General Workspace', dept?.name || 'Engineering']
    };

    onAddMember(newMember);
    setIsInviteModalOpen(false);
    triggerToast?.('Invitation Dispatched', `${newMember.name} invited with OMNI Identity DID credentials.`, 'success');
  };

  const handleImportConnectContact = (contact: typeof SEED_OMNI_CONNECT_CONTACTS[0]) => {
    const existing = members.find(m => m.email === contact.email);
    if (existing) {
      triggerToast?.('Already in Workspace', `${contact.name} is already a member of this workspace.`, 'warning');
      return;
    }

    const defaultDept = departments[1] || departments[0];
    const newMember: Partial<WorksWorkspaceMember> = {
      workspaceId: 'ws_dynasty_core',
      userId: contact.id.replace('conn_', ''),
      name: contact.name,
      email: contact.email,
      avatarUrl: contact.avatarUrl,
      title: contact.title,
      role: 'editor',
      departmentId: defaultDept?.id,
      department: defaultDept?.name || 'Core Engineering',
      teamIds: [],
      teams: [],
      managerId: members[0]?.userId,
      managerName: members[0]?.name,
      location: 'London, UK',
      timezone: 'UTC+0 (London / GMT)',
      skills: ['Distributed Systems', 'OMNI Connect', 'Solidity'],
      phoneNumber: '+44 20 7946 0888',
      connectStatus: contact.status as any,
      did: contact.did,
      kycVerified: true,
      kybVerified: true,
      identityVerificationTier: 'tier_3_kyb_enterprise_did',
      fido2KeysCount: 2,
      twoFactorEnforced: true,
      lastActiveAt: 'Active via OMNI Connect',
      joinedAt: new Date().toISOString(),
      status: 'active',
      assignedSpaces: ['General Workspace']
    };

    onAddMember(newMember);
    triggerToast?.('Contact Imported', `${contact.name} onboarded from OMNI Connect.`, 'success');
  };

  const getStatusDot = (status?: string) => {
    switch (status) {
      case 'online':
        return <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-900" title="Online" />;
      case 'busy':
        return <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-neutral-900" title="Busy / In Huddle" />;
      case 'away':
        return <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-neutral-900" title="Away" />;
      default:
        return <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 ring-2 ring-neutral-900" title="Offline" />;
    }
  };

  const getRoleBadge = (role: WorksWorkspaceMember['role']) => {
    switch (role) {
      case 'workspace_owner':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Owner</span>;
      case 'workspace_admin':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Admin</span>;
      case 'project_lead':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">Project Lead</span>;
      case 'editor':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Editor</span>;
      case 'contributor':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">Contributor</span>;
      case 'compliance_auditor':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">Auditor</span>;
      case 'client_guest':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-pink-500/10 text-pink-400 border border-pink-500/20">Client Guest</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-400">Viewer</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-purple-950/40 border border-neutral-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                People &amp; Identity Roster
              </span>
              <span className="text-xs text-neutral-400 font-mono">Workspace: {workspaceName}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              Employee &amp; Organization Directory
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 max-w-2xl mt-0.5">
              Google Workspace / M365-style enterprise directory with decentralized DID verifiable credentials, reporting lines, and direct OMNI Connect bridges.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsConnectImportOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs flex items-center gap-2 border border-neutral-700 transition-all cursor-pointer"
            >
              <DownloadCloud className="w-4 h-4 text-cyan-400" />
              <span>Import Connect Contacts</span>
            </button>

            <button
              onClick={handleOpenInvite}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite Member</span>
            </button>
          </div>
        </div>

        {/* Quick Roster Counts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-neutral-800/80">
          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Total Headcount</div>
            <div className="text-xl font-bold text-white mt-0.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" />
              {members.length}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Active directory profiles</div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Online In Connect</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {members.filter(m => m.connectStatus === 'online').length} Members
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Real-time collaboration ready</div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">KYB / DID Verified</div>
            <div className="text-xl font-bold text-cyan-400 mt-0.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              {members.filter(m => m.kybVerified || m.kycVerified).length} Passports
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">OMNI Identity anchored</div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">FIDO2 Hardware Keys</div>
            <div className="text-xl font-bold text-amber-400 mt-0.5 flex items-center gap-1.5">
              <Key className="w-4 h-4" />
              {members.reduce((acc, m) => acc + (m.fido2KeysCount || 0), 0)} Keys
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Zero-trust authentication</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-neutral-900/50 p-3 rounded-xl border border-neutral-800">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search name, email, skills, DID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Roles</option>
            <option value="workspace_owner">Owner</option>
            <option value="workspace_admin">Admin</option>
            <option value="project_lead">Project Lead</option>
            <option value="editor">Editor</option>
            <option value="contributor">Contributor</option>
            <option value="compliance_auditor">Compliance Auditor</option>
            <option value="client_guest">Client Guest</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="busy">Busy / In Huddle</option>
            <option value="away">Away</option>
            <option value="offline">Offline</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center p-1 rounded-lg bg-neutral-950 border border-neutral-800 ml-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded ${viewMode === 'table' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all p-5 flex flex-col justify-between group shadow-sm hover:shadow-xl relative"
            >
              <div>
                {/* Top Profile Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-neutral-800"
                      />
                      <div className="absolute -bottom-1 -right-1">
                        {getStatusDot(member.connectStatus)}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                          {member.name}
                        </span>
                        {member.kybVerified && (
                          <span title="Enterprise KYB Verified DID">
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-neutral-400 font-medium">{member.title}</div>
                      <div className="mt-1 flex items-center gap-1.5">
                        {getRoleBadge(member.role)}
                        <span className="text-[10px] text-neutral-400 font-medium px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                          {member.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMember(member)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Squads & Manager */}
                <div className="mt-4 space-y-1.5 text-xs text-neutral-400">
                  {member.teams && member.teams.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase text-neutral-500">Squads:</span>
                      {member.teams.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-950 text-neutral-300 border border-neutral-800 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {member.managerName && (
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className="text-[10px] font-bold uppercase text-neutral-500">Reports to:</span>
                      <span className="text-neutral-300 font-semibold">{member.managerName}</span>
                    </div>
                  )}

                  {member.location && (
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      <span>{member.location}</span>
                    </div>
                  )}

                  {member.timezone && (
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      <span>{member.timezone}</span>
                    </div>
                  )}
                </div>

                {/* Skills Chips */}
                {member.skills && member.skills.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-800 text-neutral-400">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons & OMNI Connect Bridge */}
              <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      if (onStartDirectChat) {
                        onStartDirectChat(member.userId, member.name);
                      } else {
                        triggerToast?.('OMNI Connect Encrypted Chat', `Opening sovereign P2P chat with ${member.name}...`, 'info');
                      }
                    }}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Start OMNI Connect Chat"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  </button>

                  <button
                    onClick={() => {
                      if (onStartDirectHuddle) {
                        onStartDirectHuddle(member.userId, member.name);
                      } else {
                        triggerToast?.('OMNI Connect Video Call', `Starting 1-on-1 video huddle with ${member.name}...`, 'info');
                      }
                    }}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Start 1-on-1 Video Huddle"
                  >
                    <Video className="w-3.5 h-3.5 text-emerald-400" />
                  </button>

                  <button
                    onClick={() => handleCopyDid(member.did || '')}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy Decentralized DID"
                  >
                    {copiedDid === member.did ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Key className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </button>
                </div>

                <button
                  onClick={() => setSelectedMember(member)}
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Passport</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Department &amp; Squads</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Location &amp; Timezone</th>
                  <th className="py-3 px-4">Identity Passport</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="w-9 h-9 rounded-xl object-cover ring-1 ring-neutral-700"
                          />
                          <div className="absolute -bottom-1 -right-1">
                            {getStatusDot(member.connectStatus)}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{member.name}</span>
                            {member.kybVerified && <ShieldCheck className="w-3 h-3 text-cyan-400" />}
                          </div>
                          <div className="text-[11px] text-neutral-400">{member.title}</div>
                          <div className="text-[10px] text-neutral-500">{member.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-neutral-200">{member.department}</div>
                      {member.teams && member.teams.length > 0 && (
                        <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                          {member.teams.join(', ')}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {getRoleBadge(member.role)}
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-neutral-300 font-medium">{member.location}</div>
                      <div className="text-[10px] text-neutral-500">{member.timezone}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                          {member.did ? `${member.did.slice(0, 16)}...` : 'DID Pending'}
                        </span>
                        <button
                          onClick={() => handleCopyDid(member.did || '')}
                          className="p-1 text-neutral-500 hover:text-white"
                          title="Copy DID"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">
                        {member.fido2KeysCount || 1} FIDO2 Passkeys Registered
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            if (onStartDirectChat) {
                              onStartDirectChat(member.userId, member.name);
                            } else {
                              triggerToast?.('OMNI Connect Encrypted Chat', `Opening chat with ${member.name}...`, 'info');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                          title="Chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                        </button>

                        <button
                          onClick={() => {
                            if (onStartDirectHuddle) {
                              onStartDirectHuddle(member.userId, member.name);
                            } else {
                              triggerToast?.('OMNI Connect Video Huddle', `Calling ${member.name}...`, 'info');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                          title="Video Huddle"
                        >
                          <Video className="w-3.5 h-3.5 text-emerald-400" />
                        </button>

                        <button
                          onClick={() => setSelectedMember(member)}
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                          title="Profile Passport"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Member Passport / Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-neutral-800 flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <img
                    src={selectedMember.avatarUrl}
                    alt={selectedMember.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-neutral-700"
                  />
                  <div className="absolute -bottom-1 -right-1">
                    {getStatusDot(selectedMember.connectStatus)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedMember.name}</h3>
                    {selectedMember.kybVerified && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        Enterprise KYB Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">{selectedMember.title} • {selectedMember.department}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* OMNI Identity DID Passport Card */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    OMNI Identity Sovereign Passport
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                    {selectedMember.identityVerificationTier || 'Tier 3 Enterprise KYB'}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase">Decentralized Identifier (DID)</div>
                  <div className="mt-1 p-2 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-xs text-neutral-300 flex items-center justify-between">
                    <span className="truncate">{selectedMember.did}</span>
                    <button
                      onClick={() => handleCopyDid(selectedMember.did || '')}
                      className="text-neutral-400 hover:text-white ml-2 shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
                    <span className="text-[10px] text-neutral-500">Hardware Security</span>
                    <div className="text-white font-semibold mt-0.5 flex items-center gap-1">
                      <Key className="w-3 h-3 text-amber-400" />
                      {selectedMember.fido2KeysCount || 2} FIDO2 Security Keys
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
                    <span className="text-[10px] text-neutral-500">Zero-Trust 2FA</span>
                    <div className="text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Enforced &amp; Active
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact & Location Info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase">Corporate Email</span>
                  <div className="text-white font-semibold mt-1 truncate">{selectedMember.email}</div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase">Encrypted VoIP / Phone</span>
                  <div className="text-white font-semibold mt-1">{selectedMember.phoneNumber || '+44 20 7946 0912'}</div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase">Location Node</span>
                  <div className="text-white font-semibold mt-1">{selectedMember.location || 'Global Mesh Node'}</div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase">Work Schedule</span>
                  <div className="text-white font-semibold mt-1">{selectedMember.workSchedule || 'Full-Time Sovereign'}</div>
                </div>
              </div>

              {/* Skills */}
              {selectedMember.skills && (
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Verified Competencies &amp; Technical Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMember.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Assigned Spaces */}
              {selectedMember.assignedSpaces && (
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Active Spaces &amp; Vaults Access
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedMember.assignedSpaces.map((space, i) => (
                      <div key={i} className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">{space}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onStartDirectChat) {
                      onStartDirectChat(selectedMember.userId, selectedMember.name);
                    } else {
                      triggerToast?.('OMNI Connect', `Opening encrypted chat with ${selectedMember.name}...`, 'info');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Start Chat</span>
                </button>

                <button
                  onClick={() => {
                    if (onStartDirectHuddle) {
                      onStartDirectHuddle(selectedMember.userId, selectedMember.name);
                    } else {
                      triggerToast?.('OMNI Connect', `Calling ${selectedMember.name}...`, 'info');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video Huddle</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Invite New Organization Member</h3>
              </div>
              <button onClick={() => setIsInviteModalOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSendInvite} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Hayes"
                    value={inviteData.name}
                    onChange={(e) => setInviteData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jordan.h@dynasty.network"
                    value={inviteData.email}
                    onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Corporate Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Staff Security Engineer"
                    value={inviteData.title}
                    onChange={(e) => setInviteData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Role &amp; Permissions</label>
                  <select
                    value={inviteData.role}
                    onChange={(e) => setInviteData(prev => ({ ...prev, role: e.target.value as any }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="workspace_admin">Workspace Admin</option>
                    <option value="project_lead">Project Lead</option>
                    <option value="editor">Editor</option>
                    <option value="contributor">Contributor</option>
                    <option value="compliance_auditor">Compliance Auditor</option>
                    <option value="client_guest">Client Guest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Department</label>
                  <select
                    value={inviteData.departmentId}
                    onChange={(e) => setInviteData(prev => ({ ...prev, departmentId: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Reporting Manager</label>
                  <select
                    value={inviteData.managerId}
                    onChange={(e) => setInviteData(prev => ({ ...prev, managerId: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {members.map(m => (
                      <option key={m.userId} value={m.userId}>{m.name} ({m.title})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Skills (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="Rust, CRDT, Zero-Knowledge, React"
                  value={inviteData.skillsStr}
                  onChange={(e) => setInviteData(prev => ({ ...prev, skillsStr: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-md shadow-purple-600/30"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OMNI Connect Contacts Import Drawer/Modal */}
      {isConnectImportOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DownloadCloud className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Import from OMNI Connect Contacts</h3>
              </div>
              <button onClick={() => setIsConnectImportOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <div className="p-5 space-y-3 max-h-96 overflow-y-auto">
              <p className="text-xs text-neutral-400">
                1-click import sovereign contacts from your OMNI Connect address book into this workspace:
              </p>

              {SEED_OMNI_CONNECT_CONTACTS.map((contact) => {
                const isAlreadyMember = members.some(m => m.email === contact.email);

                return (
                  <div
                    key={contact.id}
                    className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={contact.avatarUrl}
                        alt={contact.name}
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-neutral-700"
                      />
                      <div>
                        <div className="font-bold text-white text-xs">{contact.name}</div>
                        <div className="text-[11px] text-neutral-400">{contact.title} • {contact.company}</div>
                        <div className="text-[10px] font-mono text-neutral-500 mt-0.5">{contact.email}</div>
                      </div>
                    </div>

                    {isAlreadyMember ? (
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-neutral-800 text-neutral-400 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-400" /> Added
                      </span>
                    ) : (
                      <button
                        onClick={() => handleImportConnectContact(contact)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-end">
              <button
                onClick={() => setIsConnectImportOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
