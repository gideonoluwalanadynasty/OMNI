import React, { useState } from 'react';
import { 
  Building2, Users, Plus, Search, Filter, Coins, CheckCircle2, 
  Target, Shield, ChevronRight, Crown, Code2, Sparkles, 
  ShieldCheck, Globe2, MoreVertical, Edit3, Trash2, ArrowUpRight,
  TrendingUp, Layers, UserCheck, Lock, Unlock, AlertCircle
} from 'lucide-react';
import { WorksDepartment, WorksWorkspaceMember, WorksTeam } from '../../types/works';

interface WorksDepartmentsViewProps {
  departments: WorksDepartment[];
  members: WorksWorkspaceMember[];
  teams: WorksTeam[];
  workspaceName: string;
  onAddDepartment: (newDept: Partial<WorksDepartment>) => void;
  onUpdateDepartment: (deptId: string, updatedDept: Partial<WorksDepartment>) => void;
  onDeleteDepartment?: (deptId: string) => void;
  onSelectDepartmentMembers?: (deptId: string) => void;
  triggerToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const WorksDepartmentsView: React.FC<WorksDepartmentsViewProps> = ({
  departments,
  members,
  teams,
  workspaceName,
  onAddDepartment,
  onUpdateDepartment,
  onDeleteDepartment,
  onSelectDepartmentMembers,
  triggerToast
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [policyFilter, setPolicyFilter] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<WorksDepartment | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    headUserId: '',
    budgetAnnualUsd: 1000000,
    color: '#6366f1',
    accessPolicy: 'open' as 'open' | 'request_to_join' | 'restricted_invite_only',
    objectivesStr: '',
    tagsStr: ''
  });

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dept.headUserName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPolicy = policyFilter === 'all' || dept.accessPolicy === policyFilter;
    return matchesSearch && matchesPolicy;
  });

  const totalBudget = departments.reduce((acc, d) => acc + d.budgetAnnualUsd, 0);
  const totalSpent = departments.reduce((acc, d) => acc + d.budgetSpentUsd, 0);
  const totalHeadcount = members.length;

  const handleOpenCreateModal = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      headUserId: members[0]?.userId || '',
      budgetAnnualUsd: 500000,
      color: '#6366f1',
      accessPolicy: 'open',
      objectivesStr: 'Streamline team velocity\nExpand technical infrastructure',
      tagsStr: 'Core, Product, Agile'
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (dept: WorksDepartment) => {
    setSelectedDepartment(dept);
    setFormData({
      name: dept.name,
      code: dept.code,
      description: dept.description,
      headUserId: dept.headUserId,
      budgetAnnualUsd: dept.budgetAnnualUsd,
      color: dept.color,
      accessPolicy: dept.accessPolicy,
      objectivesStr: dept.objectives.join('\n'),
      tagsStr: dept.tags.join(', ')
    });
    setIsEditModalOpen(true);
  };

  const handleSaveCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      triggerToast?.('Validation Error', 'Department name and code are required.', 'error');
      return;
    }

    const headMember = members.find(m => m.userId === formData.headUserId) || members[0];
    const newDept: Partial<WorksDepartment> = {
      name: formData.name,
      code: formData.code.toUpperCase(),
      description: formData.description,
      headUserId: headMember?.userId || 'usr_unknown',
      headUserName: headMember?.name || 'Assigned Lead',
      headUserAvatar: headMember?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      headUserTitle: headMember?.title || 'Department Head',
      budgetAnnualUsd: Number(formData.budgetAnnualUsd),
      budgetSpentUsd: 0,
      memberCount: 1,
      color: formData.color,
      icon: 'Building2',
      teamsCount: 0,
      objectives: formData.objectivesStr.split('\n').map(s => s.trim()).filter(Boolean),
      accessPolicy: formData.accessPolicy,
      tags: formData.tagsStr.split(',').map(s => s.trim()).filter(Boolean)
    };

    onAddDepartment(newDept);
    setIsCreateModalOpen(false);
    triggerToast?.('Department Created', `${newDept.name} (${newDept.code}) initialized in ${workspaceName}.`, 'success');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDepartment) return;

    const headMember = members.find(m => m.userId === formData.headUserId);
    const updated: Partial<WorksDepartment> = {
      name: formData.name,
      code: formData.code.toUpperCase(),
      description: formData.description,
      headUserId: headMember?.userId || selectedDepartment.headUserId,
      headUserName: headMember?.name || selectedDepartment.headUserName,
      headUserAvatar: headMember?.avatarUrl || selectedDepartment.headUserAvatar,
      headUserTitle: headMember?.title || selectedDepartment.headUserTitle,
      budgetAnnualUsd: Number(formData.budgetAnnualUsd),
      color: formData.color,
      accessPolicy: formData.accessPolicy,
      objectives: formData.objectivesStr.split('\n').map(s => s.trim()).filter(Boolean),
      tags: formData.tagsStr.split(',').map(s => s.trim()).filter(Boolean)
    };

    onUpdateDepartment(selectedDepartment.id, updated);
    setIsEditModalOpen(false);
    triggerToast?.('Department Updated', `${formData.name} configurations persisted.`, 'success');
  };

  const getDeptIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Coins': return <Coins className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Globe2': return <Globe2 className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner & Metrics */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-indigo-950/40 border border-neutral-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Organisation Hierarchy
              </span>
              <span className="text-xs text-neutral-400 font-mono">Workspace: {workspaceName}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              Departments &amp; Functional Divisions
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 max-w-2xl mt-0.5">
              Structured organizational units with sovereign budget controls, assigned department leads, team squads, and granular access governance.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Department</span>
          </button>
        </div>

        {/* Aggregate KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-neutral-800/80">
          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Total Divisions</div>
            <div className="text-xl font-bold text-white mt-0.5 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-indigo-400" />
              {departments.length}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Active organizational units</div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Total Headcount</div>
            <div className="text-xl font-bold text-cyan-400 mt-0.5 flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {totalHeadcount} Members
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Assigned to divisions</div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Annual Budget Pool</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
              <Coins className="w-4 h-4" />
              ${(totalBudget / 1000000).toFixed(2)}M
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Allocated capital</div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Budget Utilization</div>
            <div className="text-xl font-bold text-amber-400 mt-0.5 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              {totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">${(totalSpent / 1000).toFixed(0)}k spent YTD</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-900/50 p-3 rounded-xl border border-neutral-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search departments, codes, leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-xs text-neutral-400">Access:</span>
          <select
            value={policyFilter}
            onChange={(e) => setPolicyFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Access Policies</option>
            <option value="open">Open Access</option>
            <option value="request_to_join">Request to Join</option>
            <option value="restricted_invite_only">Restricted / Invite Only</option>
          </select>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDepartments.map((dept) => {
          const deptMembers = members.filter(m => m.departmentId === dept.id || m.department === dept.name);
          const deptTeams = teams.filter(t => t.departmentId === dept.id || t.departmentName === dept.name);
          const budgetPercent = dept.budgetAnnualUsd > 0 ? (dept.budgetSpentUsd / dept.budgetAnnualUsd) * 100 : 0;

          return (
            <div
              key={dept.id}
              className="rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all p-5 flex flex-col justify-between group shadow-sm hover:shadow-xl"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
                      style={{ backgroundColor: `${dept.color}25`, color: dept.color, border: `1px solid ${dept.color}40` }}
                    >
                      {getDeptIcon(dept.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors">
                          {dept.name}
                        </span>
                        <span className="text-[10px] font-mono font-black px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                          {dept.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {dept.accessPolicy === 'open' ? (
                          <span className="text-[10px] flex items-center gap-1 text-emerald-400">
                            <Unlock className="w-2.5 h-2.5" /> Open Access
                          </span>
                        ) : dept.accessPolicy === 'request_to_join' ? (
                          <span className="text-[10px] flex items-center gap-1 text-amber-400">
                            <UserCheck className="w-2.5 h-2.5" /> Request Approval
                          </span>
                        ) : (
                          <span className="text-[10px] flex items-center gap-1 text-rose-400">
                            <Lock className="w-2.5 h-2.5" /> Restricted / Invite Only
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenEditModal(dept)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Edit Department Settings"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-400 mt-3 line-clamp-2 leading-relaxed">
                  {dept.description}
                </p>

                {/* Department Head */}
                <div className="mt-4 p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 truncate">
                    <img
                      src={dept.headUserAvatar}
                      alt={dept.headUserName}
                      className="w-7 h-7 rounded-lg object-cover ring-1 ring-neutral-700 shrink-0"
                    />
                    <div className="truncate">
                      <div className="text-xs font-semibold text-neutral-200 truncate">{dept.headUserName}</div>
                      <div className="text-[10px] text-neutral-400 truncate">{dept.headUserTitle}</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                    Lead
                  </span>
                </div>

                {/* Department Objectives */}
                {dept.objectives && dept.objectives.length > 0 && (
                  <div className="mt-3.5 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                      <Target className="w-3 h-3 text-indigo-400" />
                      Key Objectives
                    </div>
                    {dept.objectives.slice(0, 2).map((obj, i) => (
                      <div key={i} className="text-[11px] text-neutral-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{obj}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Budget Progress */}
                <div className="mt-4 pt-3 border-t border-neutral-800/60">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Annual Budget</span>
                    <span className="font-mono text-neutral-300">
                      ${(dept.budgetSpentUsd / 1000).toFixed(0)}k / ${(dept.budgetAnnualUsd / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        budgetPercent > 90 ? 'bg-rose-500' : budgetPercent > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(budgetPercent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Footer Details */}
              <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
                  <span className="flex items-center gap-1 font-semibold text-neutral-300">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    {deptMembers.length || dept.memberCount} Members
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-neutral-300">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    {deptTeams.length || dept.teamsCount} Squads
                  </span>
                </div>

                <button
                  onClick={() => setSelectedDepartment(dept)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Detail Modal */}
      {selectedDepartment && !isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-neutral-800 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
                  style={{ backgroundColor: `${selectedDepartment.color}30`, color: selectedDepartment.color, border: `1px solid ${selectedDepartment.color}50` }}
                >
                  {getDeptIcon(selectedDepartment.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedDepartment.name}</h3>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {selectedDepartment.code}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">{selectedDepartment.description}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDepartment(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              
              {/* Department Head & Access Policy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Department Leadership</div>
                  <div className="flex items-center gap-3 mt-2">
                    <img
                      src={selectedDepartment.headUserAvatar}
                      alt={selectedDepartment.headUserName}
                      className="w-9 h-9 rounded-lg object-cover ring-1 ring-neutral-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{selectedDepartment.headUserName}</div>
                      <div className="text-[11px] text-neutral-400">{selectedDepartment.headUserTitle}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Access Governance</div>
                  <div className="text-xs font-bold text-white mt-2 capitalize flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {selectedDepartment.accessPolicy.replace(/_/g, ' ')}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Role-based assignment with sovereign encryption</div>
                </div>
              </div>

              {/* Objectives */}
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-indigo-400" />
                  Quarterly Objectives &amp; Milestones
                </div>
                <div className="space-y-1.5">
                  {selectedDepartment.objectives.map((obj, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-teams in Department */}
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Assigned Teams &amp; Squads
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {teams.filter(t => t.departmentId === selectedDepartment.id || t.departmentName === selectedDepartment.name).map((team) => (
                    <div key={team.id} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{team.name}</div>
                        <div className="text-[10px] text-neutral-400">{team.memberIds.length} Squad Members</div>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {team.type}
                      </span>
                    </div>
                  ))}
                  {teams.filter(t => t.departmentId === selectedDepartment.id || t.departmentName === selectedDepartment.name).length === 0 && (
                    <div className="col-span-2 p-3 text-center text-xs text-neutral-500 bg-neutral-950 rounded-xl border border-neutral-800">
                      No standalone squads configured for this division yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Department Roster Members */}
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-400" />
                  Department Members ({members.filter(m => m.departmentId === selectedDepartment.id || m.department === selectedDepartment.name).length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {members.filter(m => m.departmentId === selectedDepartment.id || m.department === selectedDepartment.name).map((member) => (
                    <div key={member.id} className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-7 h-7 rounded-lg object-cover ring-1 ring-neutral-700"
                      />
                      <div className="truncate">
                        <div className="text-xs font-semibold text-white truncate">{member.name}</div>
                        <div className="text-[10px] text-neutral-400 truncate">{member.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
              <button
                onClick={() => {
                  handleOpenEditModal(selectedDepartment);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Edit Configuration</span>
              </button>

              <button
                onClick={() => setSelectedDepartment(null)}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Department Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">
                  {isCreateModalOpen ? 'Create New Department' : `Edit Department: ${selectedDepartment?.name}`}
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
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Department Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Core Engineering"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Code</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    placeholder="e.g. ENG"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono font-bold text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Description</label>
                <textarea
                  rows={2}
                  placeholder="Primary focus and functional scope..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Department Head</label>
                  <select
                    value={formData.headUserId}
                    onChange={(e) => setFormData(prev => ({ ...prev, headUserId: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {members.map(m => (
                      <option key={m.userId} value={m.userId}>
                        {m.name} ({m.title})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Access Governance</label>
                  <select
                    value={formData.accessPolicy}
                    onChange={(e) => setFormData(prev => ({ ...prev, accessPolicy: e.target.value as any }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="open">Open Access</option>
                    <option value="request_to_join">Request Approval</option>
                    <option value="restricted_invite_only">Restricted / Invite Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Annual Budget ($ USD)</label>
                  <input
                    type="number"
                    min={0}
                    step={10000}
                    value={formData.budgetAnnualUsd}
                    onChange={(e) => setFormData(prev => ({ ...prev, budgetAnnualUsd: Number(e.target.value) }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Brand Color Accent</label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-9 mt-1 rounded-xl bg-neutral-950 border border-neutral-800 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Key Objectives (One per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="Deploy multi-region cloud mesh&#10;Reduce latency to sub-5ms"
                  value={formData.objectivesStr}
                  onChange={(e) => setFormData(prev => ({ ...prev, objectivesStr: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500"
                />
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
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-colors"
                >
                  {isCreateModalOpen ? 'Create Division' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
