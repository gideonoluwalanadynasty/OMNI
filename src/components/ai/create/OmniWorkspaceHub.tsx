import React, { useState } from 'react';
import { 
  OmniWorkspace, OmniWorkspaceScope, OmniCollaboratorRole 
} from '../../../types';
import { 
  SEED_OMNI_WORKSPACES, SEED_OMNI_DOCUMENTS, 
  SEED_OMNI_PRESENTATIONS, SEED_OMNI_SPREADSHEETS 
} from '../../../ai_store_data';
import { 
  FolderKanban, Users, Shield, Clock, FileText, Layers, 
  BarChart2, Search, Plus, Sparkles, Filter, ExternalLink, 
  Activity, CheckCircle2, User, MoreVertical, Globe, Lock, 
  Share2, ArrowUpRight, Cpu, BookOpen, Check, Database, X
} from 'lucide-react';

interface OmniWorkspaceHubProps {
  onOpenDocument: (docId?: string) => void;
  onOpenSlideDeck: (deckId?: string) => void;
  onOpenSpreadsheet: (sheetId?: string) => void;
  onOpenKnowledgeSpace?: (spaceId?: string) => void;
  onOpenAgent?: (agentId?: string) => void;
}

export const OmniWorkspaceHub: React.FC<OmniWorkspaceHubProps> = ({
  onOpenDocument,
  onOpenSlideDeck,
  onOpenSpreadsheet,
  onOpenKnowledgeSpace,
  onOpenAgent
}) => {
  const [workspaces, setWorkspaces] = useState<OmniWorkspace[]>(SEED_OMNI_WORKSPACES);
  const [activeWsId, setActiveWsId] = useState<string>(SEED_OMNI_WORKSPACES[0].id);
  const [activeFilter, setActiveFilter] = useState<'all' | 'documents' | 'slides' | 'sheets' | 'research' | 'agents'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<OmniCollaboratorRole>('editor');

  const activeWs = workspaces.find(w => w.id === activeWsId) || workspaces[0];

  const handleInviteMember = () => {
    if (!inviteEmail.trim()) return;
    const newMember = {
      userId: `usr_${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail.trim(),
      role: inviteRole,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
      status: 'active' as const,
      joinedAt: new Date().toISOString(),
      currentActiveItemId: 'doc_sovereign_spec'
    };

    const updatedMembers = [...activeWs.members, newMember];
    setWorkspaces(prev => prev.map(w => w.id === activeWs.id ? { ...w, members: updatedMembers } : w));
    setInviteEmail('');
    setIsInviteModalOpen(false);
  };

  return (
    <div id="omni-workspace-hub-container" className="flex flex-col h-full bg-neutral-950 text-neutral-100 min-h-[750px]">
      {/* Top Workspace Navigation Bar */}
      <header id="workspace-header" className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md z-10">
        <div className="flex items-center space-x-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              {/* Workspace Scope Switcher */}
              <select
                id="workspace-scope-select"
                value={activeWs.id}
                onChange={e => setActiveWsId(e.target.value)}
                className="bg-neutral-800 text-base font-bold text-white px-3 py-1 rounded-lg border border-neutral-700 focus:outline-none focus:border-indigo-500"
              >
                {workspaces.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.scope.toUpperCase()})
                  </option>
                ))}
              </select>

              <span className={`px-2.5 py-0.5 text-xs font-semibold uppercase rounded-full ${
                activeWs.scope === 'organization' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                activeWs.scope === 'team' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {activeWs.scope}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">{activeWs.description}</p>
          </div>
        </div>

        {/* Presence & Invite Action */}
        <div className="flex items-center space-x-3">
          {/* Active Presence Indicators */}
          <div className="flex items-center -space-x-2 mr-2">
            {activeWs.members.map((member, idx) => (
              <div key={member.userId} className="relative group cursor-pointer" title={`${member.name} (${member.role})`}>
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-8 h-8 rounded-full border-2 border-neutral-900 object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-900" />
              </div>
            ))}
          </div>

          <button
            id="invite-member-btn"
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Manage Access</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Filter & Categories Navigation */}
        <aside id="workspace-sidebar" className="w-64 border-r border-neutral-800 bg-neutral-900/50 flex flex-col shrink-0 p-4 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search artifacts..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Filter Categories */}
          <div>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">Artifact Containers</span>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Artifacts', count: (activeWs.documents?.length || 0) + (activeWs.presentations?.length || 0) + (activeWs.spreadsheets?.length || 0) + (activeWs.researchSessions?.length || 0), icon: FolderKanban },
                { id: 'documents', label: 'Documents', count: activeWs.documents?.length || 0, icon: FileText },
                { id: 'slides', label: 'Slide Decks', count: activeWs.presentations?.length || 0, icon: Layers },
                { id: 'sheets', label: 'Spreadsheets', count: activeWs.spreadsheets?.length || 0, icon: BarChart2 },
                { id: 'research', label: 'Research Deep Dives', count: activeWs.researchSessions?.length || 0, icon: BookOpen },
                { id: 'agents', label: 'Autonomous Agents', count: activeWs.agents?.length || 0, icon: Cpu }
              ].map(cat => {
                const Icon = cat.icon;
                const isActive = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                      isActive ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-indigo-700 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Create Buttons */}
          <div>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">Quick Studio Launch</span>
            <div className="space-y-1.5">
              <button
                onClick={() => onOpenDocument()}
                className="w-full text-left px-3 py-2 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Draft Document</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white" />
              </button>
              <button
                onClick={() => onOpenSlideDeck()}
                className="w-full text-left px-3 py-2 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Generate Slides</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white" />
              </button>
              <button
                onClick={() => onOpenSpreadsheet()}
                className="w-full text-left px-3 py-2 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2">
                  <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Analyse Sheet</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white" />
              </button>
            </div>
          </div>
        </aside>

        {/* Center Artifact Grid & Activity Stream */}
        <main id="workspace-main-content" className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
          {/* Artifact Cards Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Active Artifacts ({activeFilter.toUpperCase()})
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Documents */}
              {(activeFilter === 'all' || activeFilter === 'documents') && 
                SEED_OMNI_DOCUMENTS.map(doc => (
                  <div
                    key={doc.id}
                    onClick={() => onOpenDocument(doc.id)}
                    className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-800/80 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] px-2 py-0.5 font-mono rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                          {doc.documentType}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{doc.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1">{doc.subtitle || 'Executive Sovereign Document'}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
                      <span>{doc.wordCount} words</span>
                      <span className="text-indigo-400 flex items-center space-x-0.5 group-hover:underline">
                        <span>Open Doc</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))
              }

              {/* Slide Decks */}
              {(activeFilter === 'all' || activeFilter === 'slides') && 
                SEED_OMNI_PRESENTATIONS.map(pres => (
                  <div
                    key={pres.id}
                    onClick={() => onOpenSlideDeck(pres.id)}
                    className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/50 hover:bg-neutral-800/80 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                          <Layers className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] px-2 py-0.5 font-mono rounded bg-amber-950/80 text-amber-400 border border-amber-800/60">
                          {pres.slides.length} SLIDES
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-1">{pres.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1">{pres.subtitle || 'AI Generated Executive Deck'}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
                      <span>Audience: {pres.targetAudience.slice(0, 16)}...</span>
                      <span className="text-amber-400 flex items-center space-x-0.5 group-hover:underline">
                        <span>Present</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))
              }

              {/* Spreadsheets */}
              {(activeFilter === 'all' || activeFilter === 'sheets') && 
                SEED_OMNI_SPREADSHEETS.map(sheet => (
                  <div
                    key={sheet.id}
                    onClick={() => onOpenSpreadsheet(sheet.id)}
                    className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-800/80 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                          <BarChart2 className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] px-2 py-0.5 font-mono rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                          DETERMINISTIC
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">{sheet.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1">{sheet.description || 'Calculated Data Model'}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
                      <span>R² Forecast: {sheet.forecast?.rSquared || 0.984}</span>
                      <span className="text-emerald-400 flex items-center space-x-0.5 group-hover:underline">
                        <span>Analyse</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Activity Audit Timeline */}
          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cryptographic Activity Log</h4>
              </div>
              <span className="text-[11px] text-neutral-500">Real-time collaborative audit trail</span>
            </div>

            <div className="space-y-2.5">
              {(activeWs.activityAudit || [
                { id: 'act_1', userId: 'usr_gideon', userName: 'Gideon Oluwalana', action: 'Created presentation deck "OMNI Sovereign Cloud 2026"', timestamp: '10 minutes ago', artifactType: 'presentation' },
                { id: 'act_2', userId: 'usr_elena', userName: 'Elena Vance', action: 'Approved draft "OMNI Architecture Whitepaper v4.2"', timestamp: '24 minutes ago', artifactType: 'document' },
                { id: 'act_3', userId: 'usr_marcus', userName: 'Marcus Thorne', action: 'Uploaded settlement spreadsheet and ran ARIMA forecast model', timestamp: '1 hour ago', artifactType: 'spreadsheet' }
              ]).map((log, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800/80 text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                      {log.userName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-white">{log.userName} </span>
                      <span className="text-neutral-300">{log.action}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Manage Access / Invite Collaborator Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-white">Manage Workspace Collaborators</h3>
              <button onClick={() => setIsInviteModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="collaborator@dynastytrust.com"
                  className="w-full px-3 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Assigned Role</label>
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="owner">Owner (Full Governance)</option>
                  <option value="admin">Admin (Manage Members & Settings)</option>
                  <option value="editor">Editor (Create & Edit Artifacts)</option>
                  <option value="commenter">Commenter (Review & Suggest)</option>
                  <option value="viewer">Viewer (Read-only Audit)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteMember}
                disabled={!inviteEmail.trim()}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50"
              >
                Grant Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
