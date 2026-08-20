import React, { useState, useMemo } from 'react';
import { 
  Network, Search, ZoomIn, ZoomOut, RotateCcw, ChevronDown, 
  ChevronUp, Users, Crown, ShieldCheck, Mail, MessageSquare, 
  Video, Copy, Check, Sparkles, Building2, Eye, EyeOff, Key,
  ExternalLink, Layers, ArrowDown
} from 'lucide-react';
import { WorksWorkspaceMember, WorksDepartment, WorksTeam } from '../../types/works';

interface WorksOrgChartViewProps {
  members: WorksWorkspaceMember[];
  departments: WorksDepartment[];
  teams: WorksTeam[];
  workspaceName: string;
  onStartDirectHuddle?: (userId: string, userName: string) => void;
  onStartDirectChat?: (userId: string, userName: string) => void;
  triggerToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

interface OrgNode {
  member: WorksWorkspaceMember;
  department?: WorksDepartment;
  children: OrgNode[];
}

export const WorksOrgChartView: React.FC<WorksOrgChartViewProps> = ({
  members,
  departments,
  teams,
  workspaceName,
  onStartDirectHuddle,
  onStartDirectChat,
  triggerToast
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  const [selectedMember, setSelectedMember] = useState<WorksWorkspaceMember | null>(null);
  const [departmentHighlight, setDepartmentHighlight] = useState<string>('all');
  const [copiedDid, setCopiedDid] = useState<string | null>(null);

  // Build the hierarchical tree structure
  const orgTree = useMemo(() => {
    // Map of userId to OrgNode
    const nodeMap = new Map<string, OrgNode>();

    members.forEach(member => {
      const dept = departments.find(d => d.id === member.departmentId || d.name === member.department);
      nodeMap.set(member.userId, {
        member,
        department: dept,
        children: []
      });
    });

    const roots: OrgNode[] = [];

    members.forEach(member => {
      const node = nodeMap.get(member.userId)!;
      if (member.managerId && nodeMap.has(member.managerId) && member.managerId !== member.userId) {
        const parentNode = nodeMap.get(member.managerId)!;
        parentNode.children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }, [members, departments]);

  const toggleCollapse = (userId: string) => {
    setCollapsedNodes(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const expandAll = () => setCollapsedNodes({});
  const collapseAll = () => {
    const collapsed: Record<string, boolean> = {};
    members.forEach(m => {
      collapsed[m.userId] = true;
    });
    setCollapsedNodes(collapsed);
  };

  const handleCopyDid = (didText: string) => {
    navigator.clipboard.writeText(didText);
    setCopiedDid(didText);
    triggerToast?.('DID Copied', 'Decentralized identifier copied.', 'info');
    setTimeout(() => setCopiedDid(null), 2000);
  };

  // Node Component for recursive rendering
  const renderOrgNode = (node: OrgNode, level: number = 0) => {
    const isCollapsed = !!collapsedNodes[node.member.userId];
    const hasChildren = node.children.length > 0;
    const isHighlighted = searchQuery && (
      node.member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.member.department?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const isDeptMatched = departmentHighlight === 'all' || 
      node.member.departmentId === departmentHighlight || 
      node.department?.id === departmentHighlight;

    const deptColor = node.department?.color || '#6366f1';

    return (
      <div key={node.member.userId} className="flex flex-col items-center">
        {/* The Card Element */}
        <div
          className={`relative p-3.5 rounded-2xl transition-all duration-200 border w-64 text-left shadow-lg ${
            isHighlighted
              ? 'ring-2 ring-purple-500 bg-neutral-900 border-purple-500 shadow-purple-500/20'
              : !isDeptMatched
              ? 'opacity-40 bg-neutral-950 border-neutral-900'
              : 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700 hover:shadow-xl'
          }`}
          style={{
            borderTop: `3px solid ${deptColor}`
          }}
        >
          {/* Top Row: Avatar + Name + Title */}
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <img
                src={node.member.avatarUrl}
                alt={node.member.name}
                className="w-11 h-11 rounded-xl object-cover ring-1 ring-neutral-700"
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-neutral-900 ${
                  node.member.connectStatus === 'online'
                    ? 'bg-emerald-500'
                    : node.member.connectStatus === 'busy'
                    ? 'bg-rose-500'
                    : node.member.connectStatus === 'away'
                    ? 'bg-amber-500'
                    : 'bg-neutral-600'
                }`}
              />
            </div>

            <div className="truncate flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-white text-xs truncate">
                  {node.member.name}
                </span>
                {node.member.role === 'workspace_owner' && (
                  <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" title="Workspace Owner / CEO" />
                )}
              </div>
              <div className="text-[11px] text-neutral-400 truncate mt-0.5">{node.member.title}</div>
              <div className="flex items-center gap-1 mt-1">
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded font-mono"
                  style={{
                    backgroundColor: `${deptColor}20`,
                    color: deptColor,
                    border: `1px solid ${deptColor}40`
                  }}
                >
                  {node.department?.code || node.member.department || 'GEN'}
                </span>
                {node.member.kybVerified && (
                  <span title="Enterprise KYB Verified">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Connect & Passport Action */}
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  if (onStartDirectChat) {
                    onStartDirectChat(node.member.userId, node.member.name);
                  } else {
                    triggerToast?.('OMNI Connect', `Opening chat with ${node.member.name}...`, 'info');
                  }
                }}
                className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Chat"
              >
                <MessageSquare className="w-3 h-3 text-purple-400" />
              </button>

              <button
                onClick={() => {
                  if (onStartDirectHuddle) {
                    onStartDirectHuddle(node.member.userId, node.member.name);
                  } else {
                    triggerToast?.('OMNI Connect', `Starting video call with ${node.member.name}...`, 'info');
                  }
                }}
                className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Huddle"
              >
                <Video className="w-3 h-3 text-emerald-400" />
              </button>

              <button
                onClick={() => setSelectedMember(node.member)}
                className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Profile Details"
              >
                <Users className="w-3 h-3 text-indigo-400" />
              </button>
            </div>

            {hasChildren && (
              <button
                onClick={() => toggleCollapse(node.member.userId)}
                className="flex items-center gap-1 text-[10px] font-bold text-neutral-400 hover:text-white px-2 py-0.5 rounded-full bg-neutral-950 border border-neutral-800 transition-colors cursor-pointer"
              >
                <span>{node.children.length} {node.children.length === 1 ? 'Report' : 'Reports'}</span>
                {isCollapsed ? <ChevronDown className="w-3 h-3 text-purple-400" /> : <ChevronUp className="w-3 h-3 text-purple-400" />}
              </button>
            )}
          </div>
        </div>

        {/* Child Nodes and Connecting Lines */}
        {hasChildren && !isCollapsed && (
          <div className="flex flex-col items-center">
            {/* Vertical connector line down from parent */}
            <div className="w-0.5 h-6 bg-neutral-700" />

            {/* Horizontal connector bar if more than 1 child */}
            {node.children.length > 1 && (
              <div
                className="h-0.5 bg-neutral-700"
                style={{
                  width: `${(node.children.length - 1) * 280}px`
                }}
              />
            )}

            {/* Child columns */}
            <div className="flex items-start gap-6 pt-0">
              {node.children.map((childNode) => (
                <div key={childNode.member.userId} className="flex flex-col items-center">
                  {/* Vertical connector line down into child */}
                  <div className="w-0.5 h-6 bg-neutral-700" />
                  {renderOrgNode(childNode, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-emerald-950/40 border border-neutral-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Reporting Topology
              </span>
              <span className="text-xs text-neutral-400 font-mono">Workspace: {workspaceName}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              Visual Organisation Chart &amp; Hierarchy
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 max-w-2xl mt-0.5">
              Live tree structure displaying executive reporting lines, division heads, staff architects, and autonomous squads with real-time OMNI Connect presence.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 text-center">
              <div className="text-[10px] font-bold uppercase text-neutral-500">Hierarchy Depth</div>
              <div className="text-base font-bold text-white mt-0.5">3 Levels</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 text-center">
              <div className="text-[10px] font-bold uppercase text-neutral-500">Span of Control</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">3.8 Avg</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search person or title to highlight..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* Department Filter */}
          <select
            value={departmentHighlight}
            onChange={(e) => setDepartmentHighlight(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Divisions Highlighted</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
            ))}
          </select>

          {/* Expand / Collapse All */}
          <button
            onClick={expandAll}
            className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Expand All</span>
          </button>

          <button
            onClick={collapseAll}
            className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <EyeOff className="w-3.5 h-3.5 text-neutral-400" />
            <span>Collapse All</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center p-1 rounded-lg bg-neutral-950 border border-neutral-800">
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.1))}
              className="p-1 text-neutral-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-neutral-400 px-1.5 font-bold">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.1))}
              className="p-1 text-neutral-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 text-neutral-400 hover:text-white ml-1"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas View Area */}
      <div className="w-full overflow-x-auto overflow-y-auto p-8 rounded-2xl bg-neutral-950/80 border border-neutral-800 min-h-[560px] shadow-inner relative flex justify-center items-start">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div
          className="transition-transform duration-200 origin-top pt-4"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <div className="flex flex-col items-center gap-12">
            {orgTree.map(rootNode => renderOrgNode(rootNode))}
          </div>
        </div>
      </div>

      {/* Member Details Popover Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMember.avatarUrl}
                  alt={selectedMember.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-neutral-700"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{selectedMember.name}</h3>
                  <p className="text-xs text-neutral-400">{selectedMember.title}</p>
                  <p className="text-[11px] text-purple-400 font-semibold mt-0.5">{selectedMember.department}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMember(null)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-500 font-bold uppercase">Decentralized DID</div>
                <div className="font-mono text-neutral-300 truncate mt-0.5">{selectedMember.did}</div>
              </div>

              {selectedMember.managerName && (
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-[10px] text-neutral-500 font-bold uppercase">Direct Reporting Line</div>
                  <div className="font-semibold text-white mt-0.5">{selectedMember.managerName}</div>
                </div>
              )}

              {selectedMember.skills && (
                <div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Skills &amp; Capabilities</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedMember.skills.map((s, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  if (onStartDirectChat) {
                    onStartDirectChat(selectedMember.userId, selectedMember.name);
                  } else {
                    triggerToast?.('OMNI Connect', `Opening chat with ${selectedMember.name}...`, 'info');
                  }
                  setSelectedMember(null);
                }}
                className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Encrypted Chat</span>
              </button>

              <button
                onClick={() => {
                  if (onStartDirectHuddle) {
                    onStartDirectHuddle(selectedMember.userId, selectedMember.name);
                  } else {
                    triggerToast?.('OMNI Connect', `Calling ${selectedMember.name}...`, 'info');
                  }
                  setSelectedMember(null);
                }}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center justify-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video Huddle</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
