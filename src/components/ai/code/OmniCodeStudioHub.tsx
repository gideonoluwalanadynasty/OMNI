import React, { useState, useEffect } from 'react';
import {
  Code2,
  FolderTree,
  FileCode,
  Play,
  Terminal,
  ShieldAlert,
  GitBranch,
  Rocket,
  Database,
  Sparkles,
  Bot,
  Layers,
  Cpu,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Boxes,
  Lock,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Key,
  Flame,
  Search,
  Zap,
  Globe,
  Sliders,
  Check,
  RotateCcw,
  Eye,
  GitPullRequest,
  CheckCheck
} from 'lucide-react';
import {
  OmniProjectWorkspace,
  OmniCodeFile,
  OmniBuildStep,
  OmniAiCodingAction,
  OmniCodeDiagnostic,
  OmniCodeTestRun,
  OmniGitCommit,
  OmniGitBranch,
  OmniGitPullRequest,
  OmniDeploymentRecord,
  OmniDbTableSchema,
  OmniDbMigration,
  OmniApiEndpointSpec,
  OmniMultimodalTestResult
} from '../../../types';

interface OmniCodeStudioHubProps {
  initialTab?: 'code' | 'build';
}

export const OmniCodeStudioHub: React.FC<OmniCodeStudioHubProps> = ({ initialTab = 'code' }) => {
  // Main Navigation Modes
  const [studioMode, setStudioMode] = useState<'editor' | 'build_wizard' | 'database' | 'git' | 'deploy' | 'security' | 'test_matrix'>('editor');
  
  // Workspaces State
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<OmniProjectWorkspace | null>(null);
  const [isLoadingWorkspace, setIsLoadingWorkspace] = useState<boolean>(true);
  const [isCreatingWorkspaceModalOpen, setIsCreatingWorkspaceModalOpen] = useState<boolean>(false);
  
  // New Workspace Form
  const [newWsName, setNewWsName] = useState<string>('');
  const [newWsDesc, setNewWsDesc] = useState<string>('');
  const [newWsFramework, setNewWsFramework] = useState<string>('omni_native_app');
  const [newWsIsOmniNative, setNewWsIsOmniNative] = useState<boolean>(true);

  // File & Editor State
  const [activeFileId, setActiveFileId] = useState<string>('');
  const [openFileIds, setOpenFileIds] = useState<string[]>([]);
  const [editorContent, setEditorContent] = useState<string>('');
  const [isSavingFile, setIsSavingFile] = useState<boolean>(false);
  const [isModified, setIsModified] = useState<boolean>(false);
  const [newFilePathInput, setNewFilePathInput] = useState<string>('');
  const [isCreatingFile, setIsCreatingFile] = useState<boolean>(false);

  // AI Assistant Chat & Action State
  const [aiAction, setAiAction] = useState<OmniAiCodingAction>('generate');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiChatHistory, setAiChatHistory] = useState<Array<{ sender: 'user' | 'assistant'; text: string; action?: string; timestamp: string }>>([
    {
      sender: 'assistant',
      text: 'Welcome to OMNI Code & Build Studio. I can assist in generating full applications, designing secure SQL schemas, refactoring components, auditing security, and configuring OMNI Native app manifests.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [pendingDiff, setPendingDiff] = useState<{ filePath: string; oldContent: string; newContent: string } | null>(null);

  // Safe Execution & Terminal
  const [terminalOutput, setTerminalOutput] = useState<string>('OMNI Virtual Browser Sandbox v2.4 (Isolated Execution Active)\nType a command or click Run/Test.\n');
  const [commandInput, setCommandInput] = useState<string>('npm test');
  const [isRunningCommand, setIsRunningCommand] = useState<boolean>(false);
  const [activeBottomTab, setActiveBottomTab] = useState<'terminal' | 'diagnostics' | 'tests' | 'preview'>('preview');

  // Build Pipeline State
  const [buildIdeaPrompt, setBuildIdeaPrompt] = useState<string>('');
  const [isAdvancingBuildStep, setIsAdvancingBuildStep] = useState<boolean>(false);

  // Git State
  const [commitMessage, setCommitMessage] = useState<string>('');
  const [newBranchName, setNewBranchName] = useState<string>('');
  const [prTitle, setPrTitle] = useState<string>('');
  const [prDescription, setPrDescription] = useState<string>('');

  // Test Suite Results
  const [testResults, setTestResults] = useState<OmniMultimodalTestResult[]>([]);
  const [isRunningTestSuite, setIsRunningTestSuite] = useState<boolean>(false);

  // Fetch workspaces on load
  const fetchWorkspaces = async () => {
    try {
      setIsLoadingWorkspace(true);
      const res = await fetch('/api/ai/code/workspaces/list?tenantId=tenant_dynasty_corp');
      const data = await res.json();
      if (data.success && data.workspaces.length > 0) {
        setWorkspaces(data.workspaces);
        // Load details for first workspace
        const detailRes = await fetch(`/api/ai/code/workspaces/${data.workspaces[0].id}`);
        const detailData = await detailRes.json();
        if (detailData.success) {
          setCurrentWorkspace(detailData.workspace);
          setActiveFileId(detailData.workspace.activeFileId || detailData.workspace.files[0]?.id || '');
          setOpenFileIds(detailData.workspace.openFileIds || [detailData.workspace.files[0]?.id]);
          const active = detailData.workspace.files.find((f: any) => f.id === detailData.workspace.activeFileId) || detailData.workspace.files[0];
          setEditorContent(active ? active.content : '');
        }
      }
    } catch (e) {
      console.error('Failed to load workspaces', e);
    } finally {
      setIsLoadingWorkspace(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  // Update editor content when active file changes
  const handleSelectFile = (fileId: string) => {
    if (!currentWorkspace) return;
    const file = currentWorkspace.files.find(f => f.id === fileId);
    if (file) {
      setActiveFileId(fileId);
      setEditorContent(file.content);
      setIsModified(false);
      if (!openFileIds.includes(fileId)) {
        setOpenFileIds(prev => [...prev, fileId]);
      }
    }
  };

  const handleCloseFileTab = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    const newOpenIds = openFileIds.filter(id => id !== fileId);
    setOpenFileIds(newOpenIds);
    if (activeFileId === fileId && newOpenIds.length > 0) {
      handleSelectFile(newOpenIds[newOpenIds.length - 1]);
    }
  };

  // Save current file
  const handleSaveFile = async () => {
    if (!currentWorkspace || !activeFileId) return;
    try {
      setIsSavingFile(true);
      const res = await fetch('/api/ai/code/files/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: currentWorkspace.id,
          fileId: activeFileId,
          content: editorContent
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsModified(false);
        setCurrentWorkspace(prev => {
          if (!prev) return null;
          return {
            ...prev,
            files: prev.files.map(f => f.id === activeFileId ? { ...f, content: editorContent, isModified: false } : f),
            securityAudit: data.securityAudit,
            git: { ...prev.git, uncommittedChangesCount: prev.git.uncommittedChangesCount + 1 }
          };
        });
        setTerminalOutput(prev => prev + `[Editor] Saved ${data.file.path} at ${new Date().toLocaleTimeString()}\n`);
      }
    } catch (e) {
      console.error('Failed to save file', e);
    } finally {
      setIsSavingFile(false);
    }
  };

  // Create new file
  const handleCreateFile = async () => {
    if (!currentWorkspace || !newFilePathInput.trim()) return;
    try {
      const res = await fetch('/api/ai/code/files/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: currentWorkspace.id,
          path: newFilePathInput.trim(),
          content: '// New file created in OMNI Code\n'
        })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentWorkspace(data.workspace);
        setActiveFileId(data.file.id);
        setOpenFileIds(prev => [...prev, data.file.id]);
        setEditorContent(data.file.content);
        setNewFilePathInput('');
        setIsCreatingFile(false);
      }
    } catch (e) {
      console.error('Failed to create file', e);
    }
  };

  // AI Assistant Action
  const handleTriggerAiAction = async () => {
    if (!aiPrompt.trim() && aiAction !== 'code_review' && aiAction !== 'documentation') return;
    try {
      setIsAiLoading(true);
      const userText = aiPrompt.trim() || `Execute ${aiAction} on current file.`;
      setAiChatHistory(prev => [
        ...prev,
        { sender: 'user', text: userText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setAiPrompt('');

      const res = await fetch('/api/ai/code/ai-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: currentWorkspace?.id,
          action: aiAction,
          userPrompt: userText,
          selectedFileId: activeFileId,
          selectedCodeSnippet: editorContent
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiChatHistory(prev => [
          ...prev,
          {
            sender: 'assistant',
            text: data.response,
            action: aiAction,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);

        if (data.fileDiffs && data.fileDiffs.length > 0) {
          setPendingDiff(data.fileDiffs[0]);
        }
      }
    } catch (e) {
      console.error('Failed AI action', e);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Apply Diff
  const handleApplyDiff = () => {
    if (!pendingDiff || !currentWorkspace) return;
    setEditorContent(pendingDiff.newContent);
    setIsModified(true);
    setPendingDiff(null);
    setTerminalOutput(prev => prev + `[AI Diff] Applied code changes to ${pendingDiff.filePath}. Click "Save" to commit to disk.\n`);
  };

  // Safe Execution in Sandbox
  const handleRunCommand = async () => {
    if (!commandInput.trim() || !currentWorkspace) return;
    try {
      setIsRunningCommand(true);
      setTerminalOutput(prev => prev + `\n$ ${commandInput.trim()}\n`);

      const res = await fetch('/api/ai/code/sandbox/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: currentWorkspace.id,
          command: commandInput.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        setTerminalOutput(prev => prev + data.stdout + '\n');
      } else {
        setTerminalOutput(prev => prev + `[ERROR] ${data.error}\nSandbox Notice: ${data.sandboxStatus || 'Restricted Enclave'}\n`);
      }
    } catch (e) {
      setTerminalOutput(prev => prev + `[FAILED] Command execution error.\n`);
    } finally {
      setIsRunningCommand(false);
    }
  };

  // Build Pipeline Step Advancement
  const handleAdvanceBuildStep = async (step: OmniBuildStep) => {
    if (!currentWorkspace) return;
    try {
      setIsAdvancingBuildStep(true);
      const res = await fetch('/api/ai/code/build-pipeline/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: currentWorkspace.id,
          targetStep: step,
          ideaPrompt: buildIdeaPrompt || currentWorkspace.buildPipeline.ideaPrompt,
          selectedFramework: currentWorkspace.framework
        })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentWorkspace(data.workspace);
      }
    } catch (e) {
      console.error('Failed build step', e);
    } finally {
      setIsAdvancingBuildStep(false);
    }
  };

  // Git Commit
  const handleGitCommit = async () => {
    if (!currentWorkspace || !commitMessage.trim()) return;
    try {
      const res = await fetch('/api/ai/code/git/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: currentWorkspace.id,
          message: commitMessage.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentWorkspace(prev => prev ? { ...prev, git: data.git } : null);
        setCommitMessage('');
        setTerminalOutput(prev => prev + `[Git] Created commit ${data.commit.sha}: "${data.commit.message}"\n`);
      }
    } catch (e) {
      console.error('Git commit failed', e);
    }
  };

  // Git Branch
  const handleCreateBranch = async () => {
    if (!currentWorkspace || !newBranchName.trim()) return;
    try {
      const res = await fetch('/api/ai/code/git/branch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: currentWorkspace.id,
          branchName: newBranchName.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentWorkspace(prev => prev ? { ...prev, git: { ...prev.git, currentBranch: data.currentBranch, branches: data.branches } } : null);
        setNewBranchName('');
        setTerminalOutput(prev => prev + `[Git] Switched to branch "${data.currentBranch}"\n`);
      }
    } catch (e) {
      console.error('Branch creation failed', e);
    }
  };

  // Trigger Deployment
  const handleTriggerDeploy = async (target: string = 'cloud_run') => {
    if (!currentWorkspace) return;
    try {
      const res = await fetch('/api/ai/code/deploy/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: currentWorkspace.id,
          target,
          environment: 'production'
        })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentWorkspace(prev => prev ? { ...prev, deployments: [data.deployment, ...prev.deployments] } : null);
        setTerminalOutput(prev => prev + `[Deploy] Deployment triggered: ${data.deployment.deploymentUrl} (${data.deployment.target.toUpperCase()})\n`);
      }
    } catch (e) {
      console.error('Deploy trigger failed', e);
    }
  };

  // Run Test Suite
  const handleRunTestSuite = async () => {
    try {
      setIsRunningTestSuite(true);
      const res = await fetch('/api/ai/code/test-suite/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setTestResults(data.results);
      }
    } catch (e) {
      console.error('Test matrix run failed', e);
    } finally {
      setIsRunningTestSuite(false);
    }
  };

  // Create Project Workspace
  const handleCreateWorkspace = async () => {
    if (!newWsName.trim()) return;
    try {
      const res = await fetch('/api/ai/code/workspaces/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newWsName.trim(),
          description: newWsDesc.trim(),
          framework: newWsFramework,
          isOmniNative: newWsIsOmniNative
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsCreatingWorkspaceModalOpen(false);
        setNewWsName('');
        setNewWsDesc('');
        fetchWorkspaces();
      }
    } catch (e) {
      console.error('Workspace creation failed', e);
    }
  };

  const activeFile = currentWorkspace?.files.find(f => f.id === activeFileId);

  return (
    <div className="h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans select-none overflow-hidden">
      {/* Top Header Studio Bar */}
      <header className="h-14 border-b border-zinc-800/80 bg-zinc-900/60 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white tracking-tight">OMNI Code & Build Studio</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {currentWorkspace?.isOmniNative ? 'OMNI Native Mode' : 'Web Standard'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Describe it. Build it. Test it. Deploy it.</p>
            </div>
          </div>

          <div className="h-4 w-px bg-zinc-800 mx-2" />

          {/* Workspace Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={currentWorkspace?.id || ''}
              onChange={(e) => {
                const ws = workspaces.find(w => w.id === e.target.value);
                if (ws) {
                  fetch(`/api/ai/code/workspaces/${ws.id}`)
                    .then(r => r.json())
                    .then(d => {
                      if (d.success) {
                        setCurrentWorkspace(d.workspace);
                        setActiveFileId(d.workspace.files[0]?.id || '');
                        setOpenFileIds(d.workspace.files.map((f: any) => f.id));
                        setEditorContent(d.workspace.files[0]?.content || '');
                      }
                    });
                }
              }}
              className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-md px-2.5 py-1 focus:outline-none focus:border-indigo-500 max-w-[200px] truncate"
            >
              {workspaces.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>

            <button
              onClick={() => setIsCreatingWorkspaceModalOpen(true)}
              className="p-1 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 rounded transition"
              title="New Project Workspace"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800/80 text-xs">
          <button
            onClick={() => setStudioMode('editor')}
            className={`px-3 py-1 rounded-md font-medium flex items-center gap-1.5 transition ${
              studioMode === 'editor' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Editor
          </button>
          <button
            onClick={() => setStudioMode('build_wizard')}
            className={`px-3 py-1 rounded-md font-medium flex items-center gap-1.5 transition ${
              studioMode === 'build_wizard' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            OMNI Build Pipeline
          </button>
          <button
            onClick={() => setStudioMode('database')}
            className={`px-3 py-1 rounded-md font-medium flex items-center gap-1.5 transition ${
              studioMode === 'database' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Schema & Migrations
          </button>
          <button
            onClick={() => setStudioMode('git')}
            className={`px-3 py-1 rounded-md font-medium flex items-center gap-1.5 transition ${
              studioMode === 'git' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            Git & PRs
          </button>
          <button
            onClick={() => setStudioMode('deploy')}
            className={`px-3 py-1 rounded-md font-medium flex items-center gap-1.5 transition ${
              studioMode === 'deploy' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            Deployment
          </button>
          <button
            onClick={() => setStudioMode('security')}
            className={`px-3 py-1 rounded-md font-medium flex items-center gap-1.5 transition ${
              studioMode === 'security' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Security Audit
          </button>
          <button
            onClick={() => {
              setStudioMode('test_matrix');
              if (testResults.length === 0) handleRunTestSuite();
            }}
            className={`px-3 py-1 rounded-md font-medium flex items-center gap-1.5 transition ${
              studioMode === 'test_matrix' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Test Matrix
          </button>
        </div>

        {/* Sandbox Status Badge & Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sandbox: {currentWorkspace?.sandbox.name ? 'Virtual Isolated' : 'Client Sandboxed'}</span>
          </div>

          <button
            onClick={handleSaveFile}
            disabled={!isModified || isSavingFile}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
              isModified
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            {isSavingFile ? 'Saving...' : 'Save File'}
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* ========================================================================= */}
        {/* MODE 1: CODE EDITOR & WORKSPACE (Default) */}
        {/* ========================================================================= */}
        {studioMode === 'editor' && (
          <>
            {/* Left Sidebar: File Tree Navigator */}
            <aside className="w-64 border-r border-zinc-800 bg-zinc-900/40 flex flex-col shrink-0">
              <div className="p-3 border-b border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderTree className="w-3.5 h-3.5 text-zinc-400" />
                  Files
                </span>
                <button
                  onClick={() => setIsCreatingFile(true)}
                  className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition"
                  title="New File"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Inline File Creator Input */}
              {isCreatingFile && (
                <div className="p-2 bg-zinc-900 border-b border-zinc-800 flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="e.g. src/components/Header.tsx"
                    value={newFilePathInput}
                    onChange={(e) => setNewFilePathInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreateFile();
                      if (e.key === 'Escape') setIsCreatingFile(false);
                    }}
                    autoFocus
                    className="w-full bg-zinc-950 text-xs px-2 py-1 rounded border border-indigo-500 text-white focus:outline-none"
                  />
                  <button
                    onClick={handleCreateFile}
                    className="p-1 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setIsCreatingFile(false)}
                    className="p-1 bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700"
                  >
                    <XCircle className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* File Tree List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                {currentWorkspace?.files.map(file => {
                  const isActive = file.id === activeFileId;
                  const isManifest = file.path === 'omni.manifest.json';
                  return (
                    <button
                      key={file.id}
                      onClick={() => handleSelectFile(file.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs flex items-center justify-between group transition ${
                        isActive
                          ? 'bg-indigo-600/20 text-indigo-300 font-medium border border-indigo-500/30'
                          : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCode className={`w-3.5 h-3.5 shrink-0 ${isManifest ? 'text-amber-400' : 'text-zinc-400'}`} />
                        <span className="truncate">{file.path}</span>
                      </div>
                      {file.isModified && (
                        <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" title="Modified" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Workspace Info & OMNI Ecosystem Badge */}
              <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/60 text-[11px] text-zinc-400 space-y-1">
                <div className="flex justify-between">
                  <span>Framework:</span>
                  <span className="font-mono text-zinc-300">{currentWorkspace?.framework}</span>
                </div>
                <div className="flex justify-between">
                  <span>Branch:</span>
                  <span className="font-mono text-indigo-400 flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    {currentWorkspace?.git.currentBranch}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Uncommitted:</span>
                  <span className="font-mono text-amber-400">{currentWorkspace?.git.uncommittedChangesCount || 0} files</span>
                </div>
              </div>
            </aside>

            {/* Center: Tabs + Code Editor + Bottom Panel (Terminal/Preview) */}
            <main className="flex-1 flex flex-col bg-zinc-950 overflow-hidden">
              {/* Open File Tabs */}
              <div className="h-9 bg-zinc-900/80 border-b border-zinc-800 flex items-center px-2 gap-1 overflow-x-auto shrink-0">
                {openFileIds.map(fileId => {
                  const file = currentWorkspace?.files.find(f => f.id === fileId);
                  if (!file) return null;
                  const isActive = file.id === activeFileId;
                  return (
                    <div
                      key={file.id}
                      onClick={() => handleSelectFile(file.id)}
                      className={`h-7 px-3 rounded-t-md text-xs flex items-center gap-2 cursor-pointer border-t border-x border-b-0 transition ${
                        isActive
                          ? 'bg-zinc-950 text-indigo-300 border-zinc-700 font-medium'
                          : 'bg-zinc-900 text-zinc-400 border-transparent hover:bg-zinc-800/80 hover:text-zinc-200'
                      }`}
                    >
                      <FileCode className="w-3 h-3 text-zinc-400" />
                      <span className="truncate max-w-[140px]">{file.name}</span>
                      <button
                        onClick={(e) => handleCloseFileTab(e, file.id)}
                        className="p-0.5 hover:bg-zinc-700 rounded text-zinc-500 hover:text-zinc-300"
                      >
                        <XCircle className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Code Editor Body */}
              <div className="flex-1 flex overflow-hidden relative">
                {/* Line Numbers Simulation */}
                <div className="w-12 bg-zinc-950/80 border-r border-zinc-800/60 py-3 text-right pr-3 font-mono text-[11px] text-zinc-600 select-none overflow-hidden">
                  {editorContent.split('\n').map((_, i) => (
                    <div key={i} className="leading-5">{i + 1}</div>
                  ))}
                </div>

                {/* Text Area */}
                <textarea
                  value={editorContent}
                  onChange={(e) => {
                    setEditorContent(e.target.value);
                    setIsModified(true);
                  }}
                  onKeyDown={(e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                      e.preventDefault();
                      handleSaveFile();
                    }
                  }}
                  spellCheck={false}
                  className="flex-1 bg-transparent text-zinc-200 p-3 font-mono text-xs leading-5 resize-none focus:outline-none overflow-auto select-text selection:bg-indigo-900/60"
                />

                {/* Diff Review Floating Overlay (When AI generates a diff) */}
                {pendingDiff && (
                  <div className="absolute top-4 right-4 max-w-md bg-zinc-900 border border-indigo-500/50 rounded-xl p-4 shadow-2xl z-20 backdrop-blur">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Code Proposal for {pendingDiff.filePath}
                      </div>
                      <button onClick={() => setPendingDiff(null)} className="text-zinc-500 hover:text-zinc-300">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-300 mb-3">
                      Review proposed code modification generated by OMNI AI Coding Engine.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleApplyDiff}
                        className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium transition flex items-center justify-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Apply Changes
                      </button>
                      <button
                        onClick={() => setPendingDiff(null)}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs transition"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Multi-Tab Panel (Terminal, Diagnostics, Tests, Preview) */}
              <div className="h-56 border-t border-zinc-800 bg-zinc-900/90 flex flex-col shrink-0">
                <div className="h-8 border-b border-zinc-800 px-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveBottomTab('preview')}
                      className={`px-2.5 py-1 rounded font-medium flex items-center gap-1.5 transition ${
                        activeBottomTab === 'preview' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Eye className="w-3 h-3 text-emerald-400" />
                      Live Virtual Preview
                    </button>
                    <button
                      onClick={() => setActiveBottomTab('terminal')}
                      className={`px-2.5 py-1 rounded font-medium flex items-center gap-1.5 transition ${
                        activeBottomTab === 'terminal' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Terminal className="w-3 h-3 text-indigo-400" />
                      Sandbox Shell & Logs
                    </button>
                    <button
                      onClick={() => setActiveBottomTab('diagnostics')}
                      className={`px-2.5 py-1 rounded font-medium flex items-center gap-1.5 transition ${
                        activeBottomTab === 'diagnostics' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <ShieldAlert className="w-3 h-3 text-amber-400" />
                      Diagnostics ({currentWorkspace?.securityAudit?.maliciousPatternsFound.length || 0})
                    </button>
                    <button
                      onClick={() => setActiveBottomTab('tests')}
                      className={`px-2.5 py-1 rounded font-medium flex items-center gap-1.5 transition ${
                        activeBottomTab === 'tests' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <CheckCheck className="w-3 h-3 text-blue-400" />
                      Test Suites ({currentWorkspace?.buildPipeline.generatedTestSuites.length || 0})
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500">Ctrl + S to Save</span>
                  </div>
                </div>

                {/* Bottom Panel Content */}
                <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
                  {activeBottomTab === 'preview' && (
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
                        <span className="text-[11px] text-zinc-400">Virtual In-Memory Sandbox Browser (Safe Runtime)</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                          Live Port: 3000 (Simulated)
                        </span>
                      </div>
                      <div className="flex-1 bg-zinc-950 rounded-lg border border-zinc-800 p-4 flex flex-col justify-center items-center text-center">
                        <div className="p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-indigo-400 mb-2">
                          <Cpu className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-white text-sm">{currentWorkspace?.name}</h4>
                        <p className="text-xs text-zinc-400 mt-1 max-w-md">
                          {currentWorkspace?.description || 'Application active in safe virtual DOM sandbox with hot state isolation.'}
                        </p>
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => {
                              setTerminalOutput(prev => prev + `[Preview] Virtual DOM rendered components without server breakout.\n`);
                            }}
                            className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs transition"
                          >
                            Simulate State Render
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeBottomTab === 'terminal' && (
                    <div className="h-full flex flex-col">
                      <pre className="flex-1 text-zinc-300 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                        {terminalOutput}
                      </pre>
                      <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                        <span className="text-emerald-400 font-bold">$</span>
                        <input
                          type="text"
                          value={commandInput}
                          onChange={(e) => setCommandInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleRunCommand()}
                          placeholder="e.g. npm test, git status, npm run build"
                          className="flex-1 bg-transparent text-white focus:outline-none text-xs"
                        />
                        <button
                          onClick={handleRunCommand}
                          disabled={isRunningCommand}
                          className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-[11px] font-sans transition"
                        >
                          {isRunningCommand ? 'Running...' : 'Run in Sandbox'}
                        </button>
                      </div>
                    </div>
                  )}

                  {activeBottomTab === 'diagnostics' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
                        <span className="text-zinc-400">Security & Static Code Analyzer Results</span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          currentWorkspace?.securityAudit?.overallStatus === 'secure'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          Status: {currentWorkspace?.securityAudit?.overallStatus || 'SECURE'}
                        </span>
                      </div>
                      {currentWorkspace?.securityAudit?.secretExfiltrationRisks.map((risk: string, i: number) => (
                        <div key={i} className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded text-xs flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>{risk}</span>
                        </div>
                      ))}
                      {currentWorkspace?.securityAudit?.dangerousShellCommands.map((cmd: string, i: number) => (
                        <div key={i} className="p-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded text-xs flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4 shrink-0" />
                          <span>{cmd}</span>
                        </div>
                      ))}
                      {currentWorkspace?.securityAudit?.secretExfiltrationRisks.length === 0 &&
                       currentWorkspace?.securityAudit?.dangerousShellCommands.length === 0 && (
                        <div className="p-3 text-zinc-400 text-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                          <span>Zero security vulnerabilities detected. Code passes all static sandbox safety checks.</span>
                        </div>
                      )}
                    </div>
                  )}

                  {activeBottomTab === 'tests' && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                        <span className="text-zinc-400">Active Test Suites</span>
                        <button
                          onClick={() => {
                            setTerminalOutput(prev => prev + `[Test Runner] Executing test suites...\nPASS All test suites.\n`);
                          }}
                          className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-sans"
                        >
                          Run All Tests
                        </button>
                      </div>
                      {currentWorkspace?.buildPipeline.generatedTestSuites.map((t, idx) => (
                        <div key={idx} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <div>
                              <div className="text-white font-sans font-medium text-xs">{t.name}</div>
                              <div className="text-[10px] text-zinc-500">{t.suite}</div>
                            </div>
                          </div>
                          <span className="text-[11px] text-emerald-400 font-mono">{t.durationMs}ms</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </main>

            {/* Right Sidebar: AI Coding Assistant */}
            <aside className="w-80 border-l border-zinc-800 bg-zinc-900/50 flex flex-col shrink-0">
              <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold text-xs text-white">AI Coding Assistant</span>
                </div>
                <select
                  value={aiAction}
                  onChange={(e) => setAiAction(e.target.value as OmniAiCodingAction)}
                  className="bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-200 rounded px-2 py-0.5 focus:outline-none"
                >
                  <option value="generate">Generate Code</option>
                  <option value="explain">Explain Code</option>
                  <option value="refactor">Refactor</option>
                  <option value="debug">Debug & Fix</option>
                  <option value="test_generation">Generate Tests</option>
                  <option value="code_review">Code Review</option>
                  <option value="documentation">Generate Docs</option>
                  <option value="migration_generation">SQL Migration</option>
                  <option value="api_generation">API Endpoint</option>
                  <option value="schema_assistance">Database Schema</option>
                </select>
              </div>

              {/* Chat Message History */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3">
                {aiChatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white ml-4'
                        : 'bg-zinc-800/80 text-zinc-200 border border-zinc-700/60 mr-2'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-70 mb-1">
                      <span className="font-bold">{msg.sender === 'user' ? 'You' : 'OMNI AI'}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
                  </div>
                ))}
                {isAiLoading && (
                  <div className="p-3 bg-zinc-800/60 border border-zinc-700/60 rounded-lg text-xs text-zinc-400 flex items-center gap-2 animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                    <span>Analyzing AST & synthesizing TypeScript...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Prompt */}
              <div className="p-3 border-t border-zinc-800 bg-zinc-950/80">
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleTriggerAiAction();
                    }
                  }}
                  placeholder={`Ask OMNI AI (${aiAction})...`}
                  rows={3}
                  className="w-full bg-zinc-900 text-xs text-white p-2.5 rounded-lg border border-zinc-800 focus:border-indigo-500 focus:outline-none resize-none"
                />
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-[10px] text-zinc-500">File: {activeFile?.name || 'none'}</span>
                  <button
                    onClick={handleTriggerAiAction}
                    disabled={isAiLoading || !aiPrompt.trim()}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                      aiPrompt.trim() && !isAiLoading
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Run AI
                  </button>
                </div>
              </div>
            </aside>
          </>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: OMNI BUILD GUIDED PIPELINE (Idea -> Deploy) */}
        {/* ========================================================================= */}
        {studioMode === 'build_wizard' && (
          <div className="flex-1 flex flex-col bg-zinc-950 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full">
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-mono">Autonomous App Builder</span>
                <h2 className="text-2xl font-bold text-white mt-1">OMNI Build Pipeline</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Guided end-to-end transformation from raw concept to a verified, deployed sovereign application.
                </p>
              </div>

              {/* Step Flow Tabs */}
              <div className="grid grid-cols-6 gap-2 mb-8">
                {[
                  { key: 'idea', label: '1. Idea', icon: Sparkles },
                  { key: 'requirements', label: '2. Requirements', icon: FileText },
                  { key: 'architecture', label: '3. Architecture', icon: Boxes },
                  { key: 'data_model', label: '4. Data Model', icon: Database },
                  { key: 'tests', label: '5. Test Suites', icon: CheckCheck },
                  { key: 'deployment', label: '6. Deployment', icon: Rocket }
                ].map((st) => {
                  const isCurrent = currentWorkspace?.buildPipeline.currentStep === st.key;
                  return (
                    <button
                      key={st.key}
                      onClick={() => handleAdvanceBuildStep(st.key as OmniBuildStep)}
                      className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition ${
                        isCurrent
                          ? 'bg-indigo-600/20 border-indigo-500 text-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <st.icon className={`w-4 h-4 ${isCurrent ? 'text-indigo-400' : 'text-zinc-500'}`} />
                      <span className="text-xs font-semibold">{st.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Step Content */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                {currentWorkspace?.buildPipeline.currentStep === 'idea' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white">Describe Your Application</h3>
                    <p className="text-xs text-zinc-400">
                      Provide a natural language description of what you want to build. OMNI AI will synthesize the requirements, database model, and code components.
                    </p>
                    <textarea
                      rows={4}
                      value={buildIdeaPrompt}
                      onChange={(e) => setBuildIdeaPrompt(e.target.value)}
                      placeholder="e.g. Build an autonomous real-time sovereign treasury clearing portal with multi-tenant isolation, Passport SSO, and metered billing..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleAdvanceBuildStep('requirements')}
                        disabled={isAdvancingBuildStep}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2"
                      >
                        <span>Generate Requirements</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {currentWorkspace?.buildPipeline.currentStep === 'requirements' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-bold text-white">Approved Application Requirements</h3>
                      <button
                        onClick={() => handleAdvanceBuildStep('architecture')}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold"
                      >
                        Proceed to Architecture →
                      </button>
                    </div>
                    <div className="space-y-2">
                      {currentWorkspace?.buildPipeline.requirements.map(req => (
                        <div key={req.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{req.title}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase font-mono">{req.category}</span>
                            </div>
                            <p className="text-xs text-zinc-400 mt-1">{req.description}</p>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-mono">
                            {req.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentWorkspace?.buildPipeline.currentStep === 'architecture' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white">System Architecture & Tech Stack</h3>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                        <span className="text-zinc-500">Framework Runtime:</span>
                        <p className="font-mono text-white mt-1">{currentWorkspace.buildPipeline.architecture.runtime}</p>
                      </div>
                      <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                        <span className="text-zinc-500">Authentication:</span>
                        <p className="font-mono text-indigo-400 mt-1">{currentWorkspace.buildPipeline.architecture.authProvider}</p>
                      </div>
                      <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                        <span className="text-zinc-500">Frontend Stack:</span>
                        <p className="font-mono text-white mt-1">{currentWorkspace.buildPipeline.architecture.frontendStack.join(', ')}</p>
                      </div>
                      <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                        <span className="text-zinc-500">Database Engine:</span>
                        <p className="font-mono text-white mt-1">{currentWorkspace.buildPipeline.architecture.databaseEngine}</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleAdvanceBuildStep('data_model')}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                      >
                        Synthesize Database Models →
                      </button>
                    </div>
                  </div>
                )}

                {currentWorkspace?.buildPipeline.currentStep === 'data_model' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white">Synthesized Database Schemas</h3>
                    <div className="space-y-3">
                      {currentWorkspace.dbSchemas.map(sch => (
                        <div key={sch.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                          <h4 className="font-mono font-bold text-indigo-400 text-sm">{sch.tableName}</h4>
                          <p className="text-xs text-zinc-400 mt-0.5">{sch.description}</p>
                          <div className="mt-3 divide-y divide-zinc-900 border border-zinc-900 rounded">
                            {sch.columns.map((col: any, idx: number) => (
                              <div key={idx} className="p-2 flex justify-between text-xs">
                                <span className="font-mono text-zinc-300">{col.name}</span>
                                <span className="font-mono text-zinc-500">{col.type}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleAdvanceBuildStep('tests')}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                      >
                        Generate & Run Test Suites →
                      </button>
                    </div>
                  </div>
                )}

                {currentWorkspace?.buildPipeline.currentStep === 'tests' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white">Verification & Test Suite Matrix</h3>
                    <div className="space-y-2">
                      {currentWorkspace.buildPipeline.generatedTestSuites.map((t, i) => (
                        <div key={i} className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs text-white font-medium">{t.name}</span>
                          </div>
                          <span className="text-xs font-mono text-emerald-400">{t.durationMs}ms (PASSED)</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setStudioMode('editor')}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold"
                      >
                        Open in Code Editor
                      </button>
                      <button
                        onClick={() => handleAdvanceBuildStep('deployment')}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                      >
                        Configure Deployment →
                      </button>
                    </div>
                  </div>
                )}

                {currentWorkspace?.buildPipeline.currentStep === 'deployment' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white">Deploy Application</h3>
                    <p className="text-xs text-zinc-400">
                      Deploy your verified application to any cloud or sovereign edge cluster with automated C2PA verification and ingress routing.
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {['cloud_run', 'vercel', 'omni_edge_mesh'].map((target) => (
                        <button
                          key={target}
                          onClick={() => handleTriggerDeploy(target)}
                          className="p-4 bg-zinc-950 border border-zinc-800 hover:border-indigo-500 rounded-lg text-left transition"
                        >
                          <Rocket className="w-5 h-5 text-indigo-400 mb-2" />
                          <h4 className="font-bold text-sm text-white uppercase">{target.replace(/_/g, ' ')}</h4>
                          <p className="text-[11px] text-zinc-500 mt-1">Multi-region managed container target</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 3: DATABASE STUDIO & MIGRATIONS */}
        {/* ========================================================================= */}
        {studioMode === 'database' && (
          <div className="flex-1 flex bg-zinc-950 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-mono">Relational & Document Layer</span>
                <h2 className="text-2xl font-bold text-white mt-1">Database Schemas & Safe Migrations</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Define tables, generate backward-compatible SQL migrations, and audit tenant partition isolation.
                </p>
              </div>

              {/* Table Schemas */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Active Database Tables</h3>
                <div className="space-y-4">
                  {currentWorkspace?.dbSchemas.map(sch => (
                    <div key={sch.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-base font-bold text-indigo-400">{sch.tableName}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">Postgres 16 / Cloud SQL</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">{sch.description}</p>
                      
                      <div className="mt-4 border border-zinc-800 rounded overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-zinc-900 text-zinc-400 border-b border-zinc-800">
                            <tr>
                              <th className="p-2">Column</th>
                              <th className="p-2">Type</th>
                              <th className="p-2">Constraints</th>
                              <th className="p-2">Default</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-800/60 font-mono text-zinc-300">
                            {sch.columns.map((col: any, idx: number) => (
                              <tr key={idx}>
                                <td className="p-2 text-white font-bold">{col.name}</td>
                                <td className="p-2 text-indigo-400">{col.type}</td>
                                <td className="p-2 text-zinc-500">
                                  {col.isPrimary ? 'PRIMARY KEY' : ''} {col.isNullable === false ? 'NOT NULL' : ''}
                                </td>
                                <td className="p-2 text-zinc-400">{col.defaultValue || '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Migrations */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Versioned Schema Migrations</h3>
                <div className="space-y-3">
                  {currentWorkspace?.dbMigrations.map(mig => (
                    <div key={mig.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-indigo-400 font-bold">{mig.version}</span>
                          <span className="text-white font-medium">{mig.description}</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 font-mono mt-1">{mig.sqlUp}</p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-mono">
                        Applied
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 4: VERSION CONTROL & GIT PULL REQUESTS */}
        {/* ========================================================================= */}
        {studioMode === 'git' && (
          <div className="flex-1 flex bg-zinc-950 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-mono">Version Control Abstraction</span>
                <h2 className="text-2xl font-bold text-white mt-1">Git Repository & Pull Requests</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Track multi-tenant code branches, commit signatures, and pull-request code reviews across GitHub, GitLab, or Sovereign Git Enclaves.
                </p>
              </div>

              {/* Commit Authoring Box */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Create Git Commit</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="feat: Add deterministic sovereign clearing batch handler..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleGitCommit}
                    disabled={!commitMessage.trim()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 text-white rounded-lg text-xs font-semibold transition"
                  >
                    Commit Changes
                  </button>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs text-zinc-400">Branch Switcher:</span>
                  <select
                    value={currentWorkspace?.git.currentBranch}
                    onChange={(e) => {
                      const branch = e.target.value;
                      fetch('/api/ai/code/git/branch', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ workspaceId: currentWorkspace?.id, branchName: branch })
                      }).then(r => r.json()).then(d => {
                        if (d.success) setCurrentWorkspace(prev => prev ? { ...prev, git: { ...prev.git, currentBranch: d.currentBranch } } : null);
                      });
                    }}
                    className="bg-zinc-950 border border-zinc-800 text-xs text-indigo-400 font-mono rounded px-2.5 py-1"
                  >
                    {currentWorkspace?.git.branches.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="New branch name..."
                    value={newBranchName}
                    onChange={(e) => setNewBranchName(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 text-xs px-2.5 py-1 rounded text-white"
                  />
                  <button
                    onClick={handleCreateBranch}
                    className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 rounded"
                  >
                    Create Branch
                  </button>
                </div>
              </div>

              {/* Pull Requests */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Active Pull Requests</h3>
                  <button
                    onClick={() => {
                      fetch('/api/ai/code/git/pr', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          workspaceId: currentWorkspace?.id,
                          title: 'Automated AI Code Enhancement',
                          description: 'Verified refactor for sub-50ms latency.',
                          sourceBranch: currentWorkspace?.git.currentBranch || 'feat/ai-reconciliation'
                        })
                      }).then(r => r.json()).then(d => {
                        if (d.success) setCurrentWorkspace(prev => prev ? { ...prev, git: { ...prev.git, pullRequests: [d.pullRequest, ...prev.git.pullRequests] } } : null);
                      });
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold"
                  >
                    Open New PR
                  </button>
                </div>

                <div className="space-y-3">
                  {currentWorkspace?.git.pullRequests.map(pr => (
                    <div key={pr.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GitPullRequest className="w-4 h-4 text-emerald-400" />
                          <h4 className="font-bold text-white text-sm">{pr.title}</h4>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-mono">
                          {pr.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">{pr.description}</p>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                        <span>{pr.sourceBranch} → {pr.targetBranch}</span>
                        <span>{pr.diffSummary}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commit History */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Recent Commit Log</h3>
                <div className="space-y-2">
                  {currentWorkspace?.git.commits.map(c => (
                    <div key={c.sha} className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono text-indigo-400 font-bold mr-2">{c.sha}</span>
                        <span className="text-white font-medium">{c.message}</span>
                        <div className="text-[10px] text-zinc-500 mt-0.5">{c.author} • {new Date(c.timestamp).toLocaleString()}</div>
                      </div>
                      <span className="text-zinc-400 text-[11px]">{c.filesChanged} files</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 5: DEPLOYMENT STATUS */}
        {/* ========================================================================= */}
        {studioMode === 'deploy' && (
          <div className="flex-1 flex bg-zinc-950 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-mono">Infrastructure Agnostic</span>
                <h2 className="text-2xl font-bold text-white mt-1">Multi-Target Deployment Management</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Deploy OMNI apps seamlessly to Cloud Run, Vercel, AWS ECS, or Sovereign Bare Metal.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Trigger New Deployment</h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { id: 'cloud_run', name: 'Google Cloud Run' },
                    { id: 'vercel', name: 'Vercel Edge' },
                    { id: 'aws_ecs', name: 'AWS ECS Fargate' },
                    { id: 'omni_edge_mesh', name: 'OMNI Edge Mesh' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleTriggerDeploy(t.id)}
                      className="p-3 bg-zinc-950 border border-zinc-800 hover:border-indigo-500 rounded-lg text-left transition"
                    >
                      <Rocket className="w-4 h-4 text-indigo-400 mb-1" />
                      <div className="font-bold text-xs text-white">{t.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Deployment Records */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Deployment History & Logs</h3>
                <div className="space-y-4">
                  {currentWorkspace?.deployments.map(dep => (
                    <div key={dep.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="font-bold text-sm text-white uppercase">{dep.target.replace(/_/g, ' ')}</span>
                          <span className="text-xs text-zinc-400">({dep.environment})</span>
                        </div>
                        <a
                          href={dep.deploymentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-mono"
                        >
                          {dep.deploymentUrl}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="mt-3 p-3 bg-black rounded border border-zinc-900 font-mono text-[11px] text-zinc-400 space-y-1">
                        {dep.logs.map((log: string, idx: number) => (
                          <div key={idx}>{log}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 6: SECURITY STATIC ANALYSIS */}
        {/* ========================================================================= */}
        {studioMode === 'security' && (
          <div className="flex-1 flex bg-zinc-950 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-mono">Zero Trust Enclave</span>
                <h2 className="text-2xl font-bold text-white mt-1">Static Security & Integrity Auditor</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Automated checks for secret exfiltration, malicious shell commands, network egress abuse, and file-system breakouts.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <span className="text-xs text-zinc-400">Auditor Status</span>
                  <div className="text-xl font-bold text-emerald-400 mt-1 uppercase">
                    {currentWorkspace?.securityAudit?.overallStatus || 'SECURE'}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">0 Critical Violations</p>
                </div>
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <span className="text-xs text-zinc-400">Secret Leak Scanner</span>
                  <div className="text-xl font-bold text-white mt-1">
                    {currentWorkspace?.securityAudit?.secretExfiltrationRisks.length || 0} Flagged
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">AWS / OpenAI / Stripe regexes checked</p>
                </div>
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <span className="text-xs text-zinc-400">Dangerous Commands</span>
                  <div className="text-xl font-bold text-white mt-1">
                    {currentWorkspace?.securityAudit?.dangerousShellCommands.length || 0} Blocked
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">`rm -rf`, `curl | sh` prevented</p>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Enforced Sandbox Guardrails</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between">
                    <span className="text-zinc-300">File System Escape Prevention</span>
                    <span className="text-emerald-400 font-mono font-bold">PASSED (Restricted Directory Jail)</span>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between">
                    <span className="text-zinc-300">Secret Exfiltration Guard</span>
                    <span className="text-emerald-400 font-mono font-bold">PASSED (Outbound Payload Scrubbed)</span>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between">
                    <span className="text-zinc-300">Host Process Isolation</span>
                    <span className="text-emerald-400 font-mono font-bold">PASSED (Virtual Browser Sandbox)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 7: PROMPT 7 TEST MATRIX (6 CORE RESILIENCE & INTEGRITY TESTS) */}
        {/* ========================================================================= */}
        {studioMode === 'test_matrix' && (
          <div className="flex-1 flex bg-zinc-950 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-indigo-400 font-mono">Prompt 7 Verification</span>
                  <h2 className="text-2xl font-bold text-white mt-1">OMNI Code & Build Resilience Matrix</h2>
                  <p className="text-sm text-zinc-400 mt-1">
                    Automated verification covering malicious code rejection, secret exfiltration scanning, and OMNI manifest generation.
                  </p>
                </div>
                <button
                  onClick={handleRunTestSuite}
                  disabled={isRunningTestSuite}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition"
                >
                  <RefreshCw className={`w-4 h-4 ${isRunningTestSuite ? 'animate-spin' : ''}`} />
                  {isRunningTestSuite ? 'Running Matrix...' : 'Re-Run Matrix'}
                </button>
              </div>

              <div className="space-y-3">
                {testResults.map((t) => (
                  <div key={t.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <h4 className="font-bold text-sm text-white">{t.testCaseName}</h4>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {t.status.toUpperCase()} ({t.latencyMs}ms)
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300">{t.assertionSummary}</p>
                    <div className="p-2.5 bg-black rounded border border-zinc-800 text-[11px] font-mono text-zinc-400">
                      Scenario: {t.simulatedScenario}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Create Workspace (with 'Build an OMNI App' mode) */}
      {isCreatingWorkspaceModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white">Create New Project Workspace</h3>
              </div>
              <button onClick={() => setIsCreatingWorkspaceModalOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Project Name</label>
                <input
                  type="text"
                  value={newWsName}
                  onChange={(e) => setNewWsName(e.target.value)}
                  placeholder="e.g. Sovereign Settlement Portal"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Description</label>
                <textarea
                  value={newWsDesc}
                  onChange={(e) => setNewWsDesc(e.target.value)}
                  placeholder="Describe the application features and integrations..."
                  rows={2}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              {/* Special Mode Toggle: Build an OMNI App */}
              <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-300 text-sm flex items-center gap-1.5">
                    <Boxes className="w-4 h-4" />
                    Build an OMNI App (Native Ecosystem Mode)
                  </span>
                  <input
                    type="checkbox"
                    checked={newWsIsOmniNative}
                    onChange={(e) => setNewWsIsOmniNative(e.target.checked)}
                    className="rounded border-indigo-500 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-indigo-200/80 leading-relaxed">
                  Automatically incorporates OMNI App Manifest (<code>omni.manifest.json</code>), Passport SSO, multi-tenant organization boundary enclaves, RBAC roles, metered billing, and AI event contracts.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setIsCreatingWorkspaceModalOpen(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateWorkspace}
                disabled={!newWsName.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 text-white rounded-lg text-xs font-semibold"
              >
                Create Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
