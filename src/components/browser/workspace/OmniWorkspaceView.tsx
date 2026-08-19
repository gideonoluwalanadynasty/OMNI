import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Bookmark,
  FileText,
  CheckSquare,
  Calendar,
  Files,
  BookOpen,
  Key,
  Bell,
  FolderKanban,
  Sparkles,
  LayoutDashboard,
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  TrendingUp,
  ExternalLink,
  Plus
} from 'lucide-react';
import { WorkspaceTabType, WorkspaceAiQueryResponse } from '../../../types/workspace';
import { omniWorkspaceService } from '../../../sdk/browser-services/OmniWorkspaceService';
import { OmniWorkspacePasswordManagerView } from './OmniWorkspacePasswordManagerView';
import { OmniWorkspaceTasksView } from './OmniWorkspaceTasksView';
import { OmniWorkspaceNotesView } from './OmniWorkspaceNotesView';
import { OmniWorkspaceDocsView } from './OmniWorkspaceDocsView';
import { OmniWorkspaceCalendarView } from './OmniWorkspaceCalendarView';
import { OmniWorkspaceResearchView } from './OmniWorkspaceResearchView';
import { OmniWorkspaceFilesView } from './OmniWorkspaceFilesView';
import { OmniWorkspaceProjectsView } from './OmniWorkspaceProjectsView';
import { OmniWorkspaceBookmarksView } from './OmniWorkspaceBookmarksView';
import { OmniWorkspaceRemindersView } from './OmniWorkspaceRemindersView';
import { OmniWorkspaceAiModal } from './OmniWorkspaceAiModal';

interface OmniWorkspaceViewProps {
  initialTab?: WorkspaceTabType;
  currentTabUrl?: string;
  onNavigateToUrl?: (url: string) => void;
}

export const OmniWorkspaceView: React.FC<OmniWorkspaceViewProps> = ({
  initialTab = 'overview',
  currentTabUrl = 'https://omni.com',
  onNavigateToUrl
}) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTabType>(initialTab);
  const [aiInputPrompt, setAiInputPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<WorkspaceAiQueryResponse | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Workspace live stats
  const [notesCount, setNotesCount] = useState(omniWorkspaceService.getNotes().length);
  const [tasksCount, setTasksCount] = useState(omniWorkspaceService.getTasks().length);
  const [eventsCount, setEventsCount] = useState(omniWorkspaceService.getCalendarEvents().length);
  const [docsCount, setDocsCount] = useState(omniWorkspaceService.getDocuments().length);
  const [filesCount, setFilesCount] = useState(omniWorkspaceService.getFiles().length);
  const [researchCount, setResearchCount] = useState(omniWorkspaceService.getResearchItems().length);
  const [passwordsCount, setPasswordsCount] = useState(omniWorkspaceService.getPasswords().length);
  const [remindersCount, setRemindersCount] = useState(omniWorkspaceService.getReminders().length);
  const [projectsCount, setProjectsCount] = useState(omniWorkspaceService.getProjects().length);
  const [bookmarksCount, setBookmarksCount] = useState(omniWorkspaceService.getBookmarks().length);

  const [vaultAudit, setVaultAudit] = useState(omniWorkspaceService.getVaultSecurityAudit());

  useEffect(() => {
    return omniWorkspaceService.subscribe(() => {
      setNotesCount(omniWorkspaceService.getNotes().length);
      setTasksCount(omniWorkspaceService.getTasks().length);
      setEventsCount(omniWorkspaceService.getCalendarEvents().length);
      setDocsCount(omniWorkspaceService.getDocuments().length);
      setFilesCount(omniWorkspaceService.getFiles().length);
      setResearchCount(omniWorkspaceService.getResearchItems().length);
      setPasswordsCount(omniWorkspaceService.getPasswords().length);
      setRemindersCount(omniWorkspaceService.getReminders().length);
      setProjectsCount(omniWorkspaceService.getProjects().length);
      setBookmarksCount(omniWorkspaceService.getBookmarks().length);
      setVaultAudit(omniWorkspaceService.getVaultSecurityAudit());
    });
  }, []);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleAskAi = (promptToAsk: string) => {
    const q = promptToAsk.trim() || aiInputPrompt.trim();
    if (!q) return;
    const res = omniWorkspaceService.askWorkspaceAi(q);
    setAiResponse(res);
    setIsAiModalOpen(true);
    setAiInputPrompt('');
  };

  const handleExecuteAiAction = (actionType: string, payload?: any) => {
    if (actionType === 'open_vault_audit') {
      setActiveTab('passwords');
    } else if (actionType === 'open_doc' || actionType === 'create_doc_from_research' || actionType === 'new_doc') {
      setActiveTab('documents');
    } else if (actionType === 'start_task') {
      setActiveTab('tasks');
    } else if (actionType === 'schedule_deep_work') {
      setActiveTab('calendar');
    } else if (actionType === 'export_citations') {
      setActiveTab('research');
    } else if (actionType === 'join_meeting' && payload) {
      if (onNavigateToUrl) onNavigateToUrl(payload);
    }
  };

  const tabs: { id: WorkspaceTabType; label: string; icon: any; count?: number; badgeColor?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, count: bookmarksCount },
    { id: 'notes', label: 'Notes', icon: FileText, count: notesCount },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, count: tasksCount },
    { id: 'calendar', label: 'Calendar', icon: Calendar, count: eventsCount },
    { id: 'documents', label: 'Documents', icon: FileText, count: docsCount },
    { id: 'files', label: 'Files & Vault', icon: Files, count: filesCount },
    { id: 'research', label: 'Research Library', icon: BookOpen, count: researchCount },
    { id: 'passwords', label: 'Password Manager', icon: Key, count: passwordsCount, badgeColor: vaultAudit.criticalAlerts.length > 0 ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-emerald-950 text-emerald-300 border-emerald-800' },
    { id: 'reminders', label: 'Reminders', icon: Bell, count: remindersCount },
    { id: 'projects', label: 'Projects', icon: FolderKanban, count: projectsCount }
  ];

  return (
    <div className="min-h-full bg-stone-950 text-stone-100 p-4 sm:p-6 lg:p-8 space-y-6 select-none font-sans">
      
      {/* Top Brand Banner & AI Copilot Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/60 border border-stone-800 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                workspace.browser.omni.com
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Sovereign Zero-Knowledge Productivity
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight">
              OMNI Digital Workspace
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
              Unified sovereign productivity environment for high-agency knowledge work: Notes, Tasks, Docs, Calendar, Academic Research, Files, and Cryptographic Password Vault.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right font-mono text-xs hidden sm:block">
              <span className="text-stone-400 block">Security Vault Score</span>
              <span className={`text-base font-bold ${vaultAudit.overallScore > 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {vaultAudit.overallScore}/100 Safe
              </span>
            </div>
          </div>
        </div>

        {/* OMNI AI Contextual Prompt Bar with 1-Click Action Pills */}
        <div className="p-4 bg-stone-950/90 border border-indigo-800/40 rounded-2xl space-y-3 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 font-mono">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>OMNI Sovereign Workspace Copilot</span>
            </div>
            <span className="text-[10px] font-mono text-stone-500">Local-First WASM Execution</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskAi(aiInputPrompt);
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Ask OMNI AI across your notes, research, calendar, and documents..."
                value={aiInputPrompt}
                onChange={(e) => setAiInputPrompt(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-500 font-sans"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all shrink-0"
            >
              <span>Ask AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Explicit User Prompt Examples (One-Click Pills) */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[11px] font-mono text-stone-400 mr-1">Quick Prompts:</span>

            <button
              onClick={() => handleAskAi('Summarise my saved research.')}
              className="px-3 py-1.5 bg-indigo-950/40 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm group"
            >
              <BookOpen className="w-3 h-3 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>"Summarise my saved research."</span>
            </button>

            <button
              onClick={() => handleAskAi('Find my document.')}
              className="px-3 py-1.5 bg-indigo-950/40 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm group"
            >
              <FileText className="w-3 h-3 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>"Find my document."</span>
            </button>

            <button
              onClick={() => handleAskAi("Prepare today's tasks.")}
              className="px-3 py-1.5 bg-indigo-950/40 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm group"
            >
              <CheckSquare className="w-3 h-3 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>"Prepare today's tasks."</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-1.5 border-b border-stone-800/80 pb-1 overflow-x-auto scrollbar-none text-xs">
        {tabs.map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`py-3 px-3.5 font-bold border-b-2 rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'border-indigo-500 text-indigo-300 bg-indigo-950/20'
                  : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-stone-900/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
              {t.count !== undefined && (
                <span className={`px-1.5 py-0.5 rounded-full font-mono text-[10px] border ${
                  t.badgeColor ? t.badgeColor : 'bg-stone-900 border-stone-800 text-stone-400'
                }`}>
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab View Content */}
      <div className="min-h-[500px]">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Active Tasks', count: tasksCount, icon: CheckSquare, tab: 'tasks', color: 'text-amber-400' },
                { label: 'Calendar Events', count: eventsCount, icon: Calendar, tab: 'calendar', color: 'text-indigo-400' },
                { label: 'Documents & Specs', count: docsCount, icon: FileText, tab: 'documents', color: 'text-sky-400' },
                { label: 'Research Papers', count: researchCount, icon: BookOpen, tab: 'research', color: 'text-purple-400' },
                { label: 'Encrypted Vault Logins', count: passwordsCount, icon: Key, tab: 'passwords', color: 'text-emerald-400' },
                { label: 'Active Projects', count: projectsCount, icon: FolderKanban, tab: 'projects', color: 'text-rose-400' }
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveTab(card.tab as WorkspaceTabType)}
                    className="p-4 bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-5 h-5 ${card.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-lg font-bold font-mono text-stone-100">{card.count}</span>
                    </div>
                    <div className="text-xs font-semibold text-stone-400">{card.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Quick Multi-Module Dashboard Rows */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tasks & Schedule Preview */}
              <div className="p-5 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-sm text-stone-100">Priority Task Queue</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('tasks')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    View All Tasks →
                  </button>
                </div>
                <div className="space-y-2.5">
                  {omniWorkspaceService.getTasks().slice(0, 3).map(task => (
                    <div key={task.id} className="p-3 bg-stone-950 border border-stone-800/80 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-stone-200">{task.title}</span>
                        <div className="text-[10px] text-stone-500 font-mono">Due: {task.dueDate} • Priority: {task.priority.toUpperCase()}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-stone-900 text-stone-400 font-mono text-[10px] border border-stone-800">
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Password Manager & Vault Status */}
              <div className="p-5 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-sm text-stone-100">Zero-Plaintext Vault Status</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('passwords')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Manage Vault →
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl flex items-center justify-between">
                    <span>Cryptographic Cipher:</span>
                    <strong className="text-emerald-400 font-mono">AES-256-GCM + PBKDF2 (600k)</strong>
                  </div>
                  <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl flex items-center justify-between">
                    <span>Security Score:</span>
                    <strong className="text-indigo-300 font-mono">{vaultAudit.overallScore}/100 Safe</strong>
                  </div>
                  <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl flex items-center justify-between">
                    <span>Critical Alerts:</span>
                    <strong className="text-rose-400 font-mono">{vaultAudit.criticalAlerts.length} Action Needed</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Research & Docs Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Research */}
              <div className="p-5 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <h3 className="font-bold text-sm text-stone-100">Recent Academic Research</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('research')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Open Library →
                  </button>
                </div>
                <div className="space-y-2.5">
                  {omniWorkspaceService.getResearchItems().slice(0, 2).map(r => (
                    <div key={r.id} className="p-3 bg-stone-950 border border-stone-800/80 rounded-xl space-y-1 text-xs">
                      <div className="font-bold text-stone-200">{r.title}</div>
                      <div className="text-[10px] text-stone-400 font-mono">{r.authors.join(', ')} ({r.publishedYear})</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="p-5 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-400" />
                    <h3 className="font-bold text-sm text-stone-100">Sovereign Documents</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Open Docs →
                  </button>
                </div>
                <div className="space-y-2.5">
                  {omniWorkspaceService.getDocuments().slice(0, 2).map(d => (
                    <div key={d.id} className="p-3 bg-stone-950 border border-stone-800/80 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-stone-200">{d.title}</div>
                        <div className="text-[10px] text-stone-500 font-mono">{d.wordCount} words • v{d.versions.length}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-stone-900 text-stone-400 font-mono text-[9px] uppercase border border-stone-800">
                        {d.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOOKMARKS */}
        {activeTab === 'bookmarks' && (
          <OmniWorkspaceBookmarksView onNavigateToUrl={onNavigateToUrl} />
        )}

        {/* NOTES */}
        {activeTab === 'notes' && <OmniWorkspaceNotesView />}

        {/* TASKS */}
        {activeTab === 'tasks' && (
          <OmniWorkspaceTasksView onOpenAiBriefing={() => handleAskAi("Prepare today's tasks.")} />
        )}

        {/* CALENDAR */}
        {activeTab === 'calendar' && (
          <OmniWorkspaceCalendarView onOpenAiBriefing={() => handleAskAi("Prepare today's tasks.")} />
        )}

        {/* DOCUMENTS */}
        {activeTab === 'documents' && <OmniWorkspaceDocsView />}

        {/* FILES */}
        {activeTab === 'files' && <OmniWorkspaceFilesView />}

        {/* RESEARCH */}
        {activeTab === 'research' && (
          <OmniWorkspaceResearchView onOpenAiSummary={() => handleAskAi('Summarise my saved research.')} />
        )}

        {/* PASSWORD MANAGER */}
        {activeTab === 'passwords' && (
          <OmniWorkspacePasswordManagerView
            currentTabUrl={currentTabUrl}
            onAutofillCredentials={(u, p) => {
              alert(`Autofilled credentials for ${u} into active frame.`);
            }}
          />
        )}

        {/* REMINDERS */}
        {activeTab === 'reminders' && <OmniWorkspaceRemindersView />}

        {/* PROJECTS */}
        {activeTab === 'projects' && <OmniWorkspaceProjectsView />}
      </div>

      {/* Workspace AI Modal */}
      <OmniWorkspaceAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        response={aiResponse}
        onExecuteAction={handleExecuteAiAction}
      />
    </div>
  );
};
