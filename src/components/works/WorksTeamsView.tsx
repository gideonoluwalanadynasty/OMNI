import React, { useState } from 'react';
import { 
  Users, Plus, Search, Filter, Video, Layout, FolderGit2, 
  ExternalLink, Sparkles, Network, Palette, Handshake, Lock, 
  Bot, ChevronRight, CheckCircle, Clock, ShieldCheck, Tag,
  MoreVertical, Edit3, Trash2, ArrowRight
} from 'lucide-react';
import { WorksTeam, WorksDepartment, WorksWorkspaceMember } from '../../types/works';

interface WorksTeamsViewProps {
  teams: WorksTeam[];
  departments: WorksDepartment[];
  members: WorksWorkspaceMember[];
  workspaceName: string;
  onAddTeam: (newTeam: Partial<WorksTeam>) => void;
  onUpdateTeam: (teamId: string, updatedTeam: Partial<WorksTeam>) => void;
  onDeleteTeam?: (teamId: string) => void;
  onStartHuddle?: (channelId: string, teamName: string) => void;
  onOpenSprintBoard?: (boardId: string) => void;
  triggerToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const WorksTeamsView: React.FC<WorksTeamsViewProps> = ({
  teams,
  departments,
  members,
  workspaceName,
  onAddTeam,
  onUpdateTeam,
  onDeleteTeam,
  onStartHuddle,
  onOpenSprintBoard,
  triggerToast
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<WorksTeam | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    departmentId: '',
    type: 'functional' as 'functional' | 'cross_department' | 'project_squad' | 'client_facing',
    description: '',
    leadUserId: '',
    memberIds: [] as string[],
    color: '#6366f1',
    icon: 'Layout',
    huddleChannelId: '',
    linkedSprintBoard: '',
    linkedDriveFolder: '',
    tagsStr: ''
  });

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          team.leadUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          team.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDept = deptFilter === 'all' || team.departmentId === deptFilter || team.departmentName === deptFilter;
    const matchesType = typeFilter === 'all' || team.type === typeFilter;
    return matchesSearch && matchesDept && matchesType;
  });

  const handleOpenCreateModal = () => {
    const defaultDept = departments[0];
    const defaultLead = members[0];
    setFormData({
      name: '',
      slug: '',
      departmentId: defaultDept?.id || '',
      type: 'functional',
      description: '',
      leadUserId: defaultLead?.userId || '',
      memberIds: [defaultLead?.userId].filter(Boolean) as string[],
      color: '#6366f1',
      icon: 'Layout',
      huddleChannelId: `huddle_team_${Date.now().toString().slice(-4)}`,
      linkedSprintBoard: 'sprint_board_active',
      linkedDriveFolder: 'drive_folder_specs',
      tagsStr: 'Sprint, High-Velocity, Agile'
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (team: WorksTeam) => {
    setSelectedTeam(team);
    setFormData({
      name: team.name,
      slug: team.slug,
      departmentId: team.departmentId,
      type: team.type,
      description: team.description,
      leadUserId: team.leadUserId,
      memberIds: team.memberIds,
      color: team.color,
      icon: team.icon,
      huddleChannelId: team.huddleChannelId || '',
      linkedSprintBoard: team.linkedSprintBoard || '',
      linkedDriveFolder: team.linkedDriveFolder || '',
      tagsStr: team.tags.join(', ')
    });
    setIsEditModalOpen(true);
  };

  const handleSaveCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      triggerToast?.('Validation Error', 'Team name is required.', 'error');
      return;
    }

    const dept = departments.find(d => d.id === formData.departmentId) || departments[0];
    const lead = members.find(m => m.userId === formData.leadUserId) || members[0];

    const newTeam: Partial<WorksTeam> = {
      workspaceId: 'ws_dynasty_core',
      departmentId: dept?.id || 'dept_eng',
      departmentName: dept?.name || 'Core Engineering',
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
      type: formData.type,
      description: formData.description,
      leadUserId: lead?.userId || 'usr_unknown',
      leadUserName: lead?.name || 'Assigned Squad Lead',
      leadUserAvatar: lead?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      leadUserTitle: lead?.title || 'Squad Architect',
      memberIds: Array.from(new Set([lead?.userId, ...formData.memberIds])).filter(Boolean) as string[],
      color: formData.color,
      icon: formData.icon,
      huddleChannelId: formData.huddleChannelId || `huddle_${Date.now().toString().slice(-4)}`,
      linkedSprintBoard: formData.linkedSprintBoard,
      linkedDriveFolder: formData.linkedDriveFolder,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
      tags: formData.tagsStr.split(',').map(t => t.trim()).filter(Boolean)
    };

    onAddTeam(newTeam);
    setIsCreateModalOpen(false);
    triggerToast?.('Team Squad Created', `${newTeam.name} is now active in ${dept?.name}.`, 'success');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeam) return;

    const dept = departments.find(d => d.id === formData.departmentId);
    const lead = members.find(m => m.userId === formData.leadUserId);

    const updated: Partial<WorksTeam> = {
      name: formData.name,
      slug: formData.slug,
      departmentId: dept?.id || selectedTeam.departmentId,
      departmentName: dept?.name || selectedTeam.departmentName,
      type: formData.type,
      description: formData.description,
      leadUserId: lead?.userId || selectedTeam.leadUserId,
      leadUserName: lead?.name || selectedTeam.leadUserName,
      leadUserAvatar: lead?.avatarUrl || selectedTeam.leadUserAvatar,
      leadUserTitle: lead?.title || selectedTeam.leadUserTitle,
      memberIds: formData.memberIds,
      color: formData.color,
      icon: formData.icon,
      huddleChannelId: formData.huddleChannelId,
      linkedSprintBoard: formData.linkedSprintBoard,
      linkedDriveFolder: formData.linkedDriveFolder,
      tags: formData.tagsStr.split(',').map(t => t.trim()).filter(Boolean)
    };

    onUpdateTeam(selectedTeam.id, updated);
    setIsEditModalOpen(false);
    triggerToast?.('Team Squad Updated', `${formData.name} updated successfully.`, 'success');
  };

  const toggleMemberSelection = (userId: string) => {
    setFormData(prev => {
      const exists = prev.memberIds.includes(userId);
      return {
        ...prev,
        memberIds: exists ? prev.memberIds.filter(id => id !== userId) : [...prev.memberIds, userId]
      };
    });
  };

  const getTeamIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Handshake': return <Handshake className="w-5 h-5" />;
      case 'Lock': return <Lock className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  const getTypeBadge = (type: WorksTeam['type']) => {
    switch (type) {
      case 'functional':
        return <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Functional Squad</span>;
      case 'cross_department':
        return <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Cross-Department Taskforce</span>;
      case 'project_squad':
        return <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Project Squad</span>;
      case 'client_facing':
        return <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">Client Facing</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-cyan-950/40 border border-neutral-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                Squad &amp; Team Topology
              </span>
              <span className="text-xs text-neutral-400 font-mono">Workspace: {workspaceName}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              Teams, Squads &amp; Cross-Functional Units
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 max-w-2xl mt-0.5">
              High-velocity collaborative execution squads with integrated OMNI Connect huddle channels, agile sprint linkages, and role rosters.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Squad</span>
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-neutral-800/80">
          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Active Squads</div>
            <div className="text-xl font-bold text-white mt-0.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              {teams.length}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Autonomous workgroups</div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Live Huddles</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              {teams.filter(t => t.huddleChannelId).length} Channels
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">OMNI Connect bridged</div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Sprint Linked</div>
            <div className="text-xl font-bold text-indigo-400 mt-0.5 flex items-center gap-1.5">
              <Layout className="w-4 h-4" />
              {teams.filter(t => t.linkedSprintBoard).length} Boards
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Agile backlog synced</div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Avg Squad Size</div>
            <div className="text-xl font-bold text-amber-400 mt-0.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              {teams.length > 0 ? (teams.reduce((acc, t) => acc + t.memberIds.length, 0) / teams.length).toFixed(1) : 0}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Members per squad</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-900/50 p-3 rounded-xl border border-neutral-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search teams, squads, leads, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-neutral-400">Division:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Divisions</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-neutral-400">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Types</option>
              <option value="functional">Functional</option>
              <option value="cross_department">Cross-Department</option>
              <option value="project_squad">Project Squad</option>
              <option value="client_facing">Client Facing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map((team) => {
          const squadMembers = members.filter(m => team.memberIds.includes(m.userId) || m.teamIds?.includes(team.id));

          return (
            <div
              key={team.id}
              className="rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all p-5 flex flex-col justify-between group shadow-sm hover:shadow-xl"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shadow-md shrink-0"
                      style={{ backgroundColor: `${team.color}25`, color: team.color, border: `1px solid ${team.color}40` }}
                    >
                      {getTeamIcon(team.icon)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {team.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-neutral-400 font-medium">
                          {team.departmentName}
                        </span>
                        <span>•</span>
                        {getTypeBadge(team.type)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenEditModal(team)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-400 mt-3 line-clamp-2 leading-relaxed">
                  {team.description}
                </p>

                {/* Squad Lead */}
                <div className="mt-4 p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 truncate">
                    <img
                      src={team.leadUserAvatar}
                      alt={team.leadUserName}
                      className="w-7 h-7 rounded-lg object-cover ring-1 ring-neutral-700 shrink-0"
                    />
                    <div className="truncate">
                      <div className="text-xs font-semibold text-neutral-200 truncate">{team.leadUserName}</div>
                      <div className="text-[10px] text-neutral-400 truncate">{team.leadUserTitle}</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    Lead
                  </span>
                </div>

                {/* Squad Roster Avatars */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center -space-x-2 overflow-hidden">
                    {squadMembers.slice(0, 5).map((member) => (
                      <img
                        key={member.id}
                        src={member.avatarUrl}
                        alt={member.name}
                        title={`${member.name} (${member.title})`}
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-neutral-900 object-cover"
                      />
                    ))}
                    {squadMembers.length > 5 && (
                      <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-800 text-[10px] font-bold text-neutral-300 ring-2 ring-neutral-900">
                        +{squadMembers.length - 5}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-neutral-400 font-mono font-medium">
                    {squadMembers.length} Members
                  </span>
                </div>

                {/* Tags */}
                {team.tags && team.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {team.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-950 text-neutral-400 border border-neutral-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons & Integration Bridges */}
              <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                {team.huddleChannelId ? (
                  <button
                    onClick={() => {
                      if (onStartHuddle) {
                        onStartHuddle(team.huddleChannelId!, team.name);
                      } else {
                        triggerToast?.('OMNI Connect Huddle', `Joining ${team.name} live voice & video huddle...`, 'info');
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Huddle</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  {team.linkedSprintBoard && (
                    <button
                      onClick={() => {
                        if (onOpenSprintBoard) {
                          onOpenSprintBoard(team.linkedSprintBoard!);
                        } else {
                          triggerToast?.('Agile Sprint Board', `Opening sprint backlog for ${team.name}...`, 'info');
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Open Sprint Board"
                    >
                      <Layout className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Sprint</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedTeam(team)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Squad Overview"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Detail Modal */}
      {selectedTeam && !isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-neutral-800 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
                  style={{ backgroundColor: `${selectedTeam.color}30`, color: selectedTeam.color, border: `1px solid ${selectedTeam.color}50` }}
                >
                  {getTeamIcon(selectedTeam.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedTeam.name}</h3>
                    {getTypeBadge(selectedTeam.type)}
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">{selectedTeam.description}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTeam(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Linked Ecosystem Bridges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">OMNI Connect Huddle</div>
                  <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" />
                    {selectedTeam.huddleChannelId || 'Not Configured'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Agile Sprint Board</div>
                  <div className="text-xs font-bold text-indigo-400 mt-1 flex items-center gap-1">
                    <Layout className="w-3.5 h-3.5" />
                    {selectedTeam.linkedSprintBoard || 'Default Board'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Cloud Drive Folder</div>
                  <div className="text-xs font-bold text-cyan-400 mt-1 flex items-center gap-1">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    {selectedTeam.linkedDriveFolder || 'Team Specs'}
                  </div>
                </div>
              </div>

              {/* Squad Members */}
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Squad Roster ({selectedTeam.memberIds.length} Members)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {members.filter(m => selectedTeam.memberIds.includes(m.userId)).map((member) => (
                    <div key={member.id} className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 truncate">
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-8 h-8 rounded-lg object-cover ring-1 ring-neutral-700"
                        />
                        <div className="truncate">
                          <div className="text-xs font-semibold text-white truncate">{member.name}</div>
                          <div className="text-[10px] text-neutral-400 truncate">{member.title}</div>
                        </div>
                      </div>
                      {member.userId === selectedTeam.leadUserId && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          Lead
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
              <button
                onClick={() => handleOpenEditModal(selectedTeam)}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Edit Squad</span>
              </button>

              <button
                onClick={() => setSelectedTeam(null)}
                className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Team Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  {isCreateModalOpen ? 'Create New Squad' : `Edit Squad: ${selectedTeam?.name}`}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={isCreateModalOpen ? handleSaveCreate : handleSaveEdit} className="p-5 space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Squad Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed CRDT & Mesh Squad"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Department</label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => setFormData(prev => ({ ...prev, departmentId: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Squad Topology</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="functional">Functional Squad</option>
                    <option value="cross_department">Cross-Department Taskforce</option>
                    <option value="project_squad">Project Squad</option>
                    <option value="client_facing">Client Facing Squad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Description</label>
                <textarea
                  rows={2}
                  placeholder="Primary mission and technical scope..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Squad Lead</label>
                <select
                  value={formData.leadUserId}
                  onChange={(e) => setFormData(prev => ({ ...prev, leadUserId: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {members.map(m => (
                    <option key={m.userId} value={m.userId}>
                      {m.name} ({m.title})
                    </option>
                  ))}
                </select>
              </div>

              {/* Members Multi-select */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Assign Members ({formData.memberIds.length} Selected)
                </label>
                <div className="mt-1 p-2 max-h-32 overflow-y-auto rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  {members.map(m => {
                    const isSelected = formData.memberIds.includes(m.userId);
                    return (
                      <div
                        key={m.userId}
                        onClick={() => toggleMemberSelection(m.userId)}
                        className={`p-1.5 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-colors ${
                          isSelected ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300' : 'hover:bg-neutral-900 text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img src={m.avatarUrl} alt={m.name} className="w-5 h-5 rounded-full object-cover" />
                          <span>{m.name}</span>
                          <span className="text-[10px] text-neutral-500">({m.title})</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="rounded border-neutral-700 text-cyan-600 focus:ring-0"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-md shadow-cyan-600/30 transition-colors"
                >
                  {isCreateModalOpen ? 'Create Squad' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
