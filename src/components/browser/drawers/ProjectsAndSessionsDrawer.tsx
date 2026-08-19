import React, { useState } from 'react';
import {
  FolderKanban,
  Save,
  RotateCcw,
  Sparkles,
  Layers,
  Plus,
  Trash2,
  ExternalLink,
  Tag,
  CheckCircle2,
  Calendar,
  Clock,
  Pin,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import {
  OmniBrowserProjectSpace,
  OmniBrowserSavedSession,
  OmniBrowserTab,
  OmniBrowserTabGroup,
  OmniBrowserWorkspace
} from '../../../types';
import { tabsService } from '../../../sdk/browser-services/TabsService';

interface ProjectsAndSessionsDrawerProps {
  projectSpaces: OmniBrowserProjectSpace[];
  savedSessions: OmniBrowserSavedSession[];
  workspaces: OmniBrowserWorkspace[];
  activeWorkspaceId: string;
  tabs: OmniBrowserTab[];
  tabGroups: OmniBrowserTabGroup[];
  onUpdateProjectSpaces: (spaces: OmniBrowserProjectSpace[]) => void;
  onUpdateSavedSessions: (sessions: OmniBrowserSavedSession[]) => void;
  onRestoreSession: (session: OmniBrowserSavedSession) => void;
  onSelectWorkspace: (workspaceId: string) => void;
  onNavigate: (url: string) => void;
}

export const ProjectsAndSessionsDrawer: React.FC<ProjectsAndSessionsDrawerProps> = ({
  projectSpaces,
  savedSessions,
  workspaces,
  activeWorkspaceId,
  tabs,
  tabGroups,
  onUpdateProjectSpaces,
  onUpdateSavedSessions,
  onRestoreSession,
  onSelectWorkspace,
  onNavigate
}) => {
  const [activeTabSubmenu, setActiveTabSubmenu] = useState<'sessions' | 'projects'>('sessions');

  // New Session Snapshot Form
  const [isSnapshotting, setIsSnapshotting] = useState(false);
  const [sessionNameInput, setSessionNameInput] = useState('');

  // New Project Space Form
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectColor, setProjectColor] = useState('#6366f1');
  const [projectPrompt, setProjectPrompt] = useState('');

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  const handleSaveCurrentSession = () => {
    const name = sessionNameInput.trim() || `${activeWorkspace.name} Session (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
    const newSession = tabsService.createSavedSession(
      name,
      activeWorkspaceId,
      tabs,
      tabGroups,
      false
    );
    onUpdateSavedSessions([newSession, ...savedSessions]);
    setSessionNameInput('');
    setIsSnapshotting(false);
  };

  const handleDeleteSession = (id: string) => {
    onUpdateSavedSessions(savedSessions.filter(s => s.id !== id));
  };

  const handleCreateProject = () => {
    if (!projectTitle.trim()) return;
    const newProject = tabsService.createProjectSpace(
      projectTitle.trim(),
      projectDesc.trim() || 'Sovereign project workspace with dedicated research context.',
      'FolderKanban',
      projectColor,
      activeWorkspaceId,
      ['https://omni.com', 'https://ai.omni.com'],
      'Initialized sovereign research log.',
      projectPrompt.trim()
    );
    onUpdateProjectSpaces([newProject, ...projectSpaces]);
    setProjectTitle('');
    setProjectDesc('');
    setProjectPrompt('');
    setIsCreatingProject(false);
  };

  const handleDeleteProject = (id: string) => {
    onUpdateProjectSpaces(projectSpaces.filter(p => p.id !== id));
  };

  return (
    <div id="projects-sessions-drawer" className="space-y-4 text-stone-100">
      {/* Sub-navigation tabs */}
      <div className="flex items-center p-1 bg-stone-950 border border-stone-800 rounded-xl gap-1">
        <button
          onClick={() => setActiveTabSubmenu('sessions')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTabSubmenu === 'sessions'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Saved Sessions ({savedSessions.length})</span>
        </button>
        <button
          onClick={() => setActiveTabSubmenu('projects')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTabSubmenu === 'projects'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <FolderKanban className="w-3.5 h-3.5" />
          <span>Project Spaces ({projectSpaces.length})</span>
        </button>
      </div>

      {/* 1. SAVED SESSIONS SUBMENU */}
      {activeTabSubmenu === 'sessions' && (
        <div className="space-y-3">
          {/* Quick Snapshot Action Bar */}
          <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-stone-200 flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Snapshot Active Workspace</span>
                </div>
                <div className="text-[11px] text-stone-400">
                  Save all {tabs.filter(t => t.workspaceId === activeWorkspaceId).length} tabs & groups for instant restoration
                </div>
              </div>
              {!isSnapshotting && (
                <button
                  id="btn-trigger-snapshot"
                  onClick={() => setIsSnapshotting(true)}
                  className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                >
                  Snapshot Now
                </button>
              )}
            </div>

            {isSnapshotting && (
              <div className="pt-2 border-t border-stone-800 space-y-2">
                <input
                  type="text"
                  placeholder={`Session name (e.g., ${activeWorkspace.name} Research Sprint)`}
                  value={sessionNameInput}
                  onChange={e => setSessionNameInput(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 text-xs focus:outline-none focus:border-indigo-500"
                />
                <div className="flex justify-end gap-1.5">
                  <button
                    onClick={() => setIsSnapshotting(false)}
                    className="px-2.5 py-1 text-stone-400 hover:text-stone-200 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCurrentSession}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                  >
                    Confirm Save
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sessions List */}
          <div className="space-y-2.5">
            {savedSessions.map(session => (
              <div
                key={session.id}
                id={`session-card-${session.id}`}
                className="p-3 bg-stone-950 border border-stone-800 hover:border-stone-700 rounded-xl space-y-2.5 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-stone-100 flex items-center gap-1.5">
                      <span>{session.name}</span>
                      {session.isAutoSaved && (
                        <span className="px-1.5 py-0.2 bg-amber-950/60 border border-amber-800 text-amber-300 rounded text-[9px] font-mono">
                          Auto-Recovery
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-stone-400 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {new Date(session.createdAt).toLocaleDateString()} at {new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-indigo-400">{session.tabCount} tabs</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onRestoreSession(session)}
                      className="px-2 py-1 bg-indigo-600/20 border border-indigo-700 hover:bg-indigo-600 hover:text-white text-indigo-300 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all"
                      title="Restore tabs into workspace"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore</span>
                    </button>
                    <button
                      onClick={() => handleDeleteSession(session.id)}
                      className="p-1 text-stone-500 hover:text-rose-400 hover:bg-stone-800 rounded"
                      title="Delete saved session"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Tabs Preview Strip */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {session.tabsSnapshot.slice(0, 5).map((snap, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-[10px] text-stone-300 max-w-[130px] truncate shrink-0"
                      title={snap.title}
                    >
                      {snap.title}
                    </span>
                  ))}
                  {session.tabsSnapshot.length > 5 && (
                    <span className="text-[10px] text-stone-500 font-mono">
                      +{session.tabsSnapshot.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. PROJECT SPACES SUBMENU */}
      {activeTabSubmenu === 'projects' && (
        <div className="space-y-3">
          {/* Create Project Button */}
          <div className="flex items-center justify-between p-3 bg-stone-950 border border-stone-800 rounded-xl">
            <div>
              <div className="text-xs font-semibold text-stone-200">Sovereign Project Spaces</div>
              <div className="text-[11px] text-stone-400">Contextualized workspaces with AI prompts</div>
            </div>
            {!isCreatingProject && (
              <button
                onClick={() => setIsCreatingProject(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Space</span>
              </button>
            )}
          </div>

          {/* Create Project Form */}
          {isCreatingProject && (
            <div className="p-3 bg-stone-950 border border-indigo-700/60 rounded-xl space-y-2.5 text-xs">
              <div className="font-semibold text-stone-200 text-xs">Create Project Space</div>
              <input
                type="text"
                placeholder="Project Name (e.g. Quantum Cryptography RFC)"
                value={projectTitle}
                onChange={e => setProjectTitle(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 text-xs focus:outline-none focus:border-indigo-500"
              />
              <textarea
                placeholder="Project description and objectives..."
                value={projectDesc}
                onChange={e => setProjectDesc(e.target.value)}
                rows={2}
                className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 text-xs focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="AI Context Prompt (e.g. Always evaluate papers with rigorous zero-knowledge proof standards)"
                value={projectPrompt}
                onChange={e => setProjectPrompt(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 text-xs focus:outline-none focus:border-indigo-500"
              />
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  {['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'].map(c => (
                    <button
                      key={c}
                      onClick={() => setProjectColor(c)}
                      className={`w-5 h-5 rounded-full transition-transform ${
                        projectColor === c ? 'scale-125 ring-2 ring-white' : ''
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsCreatingProject(false)}
                    className="px-2.5 py-1 text-stone-400 hover:text-stone-200 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateProject}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Project Spaces List */}
          <div className="space-y-3">
            {projectSpaces.map(proj => (
              <div
                key={proj.id}
                id={`project-space-${proj.id}`}
                className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white shadow-sm"
                      style={{ backgroundColor: proj.color }}
                    >
                      <FolderKanban className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-100">{proj.title}</div>
                      <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">{proj.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-1 text-stone-500 hover:text-rose-400 hover:bg-stone-800 rounded"
                    title="Delete Project Space"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* AI Prompt Context Pill */}
                {proj.aiContextPrompt && (
                  <div className="p-2 bg-indigo-950/30 border border-indigo-900/40 rounded-lg text-[11px] text-indigo-300 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="italic leading-snug">{proj.aiContextPrompt}</span>
                  </div>
                )}

                {/* Pinned Resource Links */}
                {proj.pinnedUrls.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-[10px] font-semibold text-stone-400 flex items-center gap-1">
                      <Pin className="w-2.5 h-2.5 text-indigo-400" />
                      <span>Pinned Knowledge URLs</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {proj.pinnedUrls.map((url, idx) => (
                        <button
                          key={idx}
                          onClick={() => onNavigate(url)}
                          className="px-2 py-0.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 text-stone-300 rounded text-[10px] flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="w-2.5 h-2.5 text-stone-500" />
                          <span className="truncate max-w-[140px]">{url.replace('https://', '')}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
