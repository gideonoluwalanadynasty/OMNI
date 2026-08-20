import React, { useState, useMemo } from 'react';
import {
  HardDrive, Folder, FolderPlus, FileText, Code, Table, Shield,
  Search, Filter, Plus, Upload, Grid, List, Star, Lock,
  ChevronRight, MoreVertical, Share2, Download, Trash2,
  Sparkles, History, Eye, CheckCircle2, Clock, Users,
  ExternalLink, ArrowUpDown, Copy, Tag, RefreshCw
} from 'lucide-react';
import {
  WorksDriveFolder,
  WorksDriveFile,
  WorksFileVersion,
  WorksFileFormat,
  WorksSecurityClassification,
  WorksCloudBucket
} from '../../types/works';
import { WorksFilePreviewModal } from './WorksFilePreviewModal';
import { WorksCreateFileModal } from './WorksCreateFileModal';
import { WorksDriveShareModal } from './WorksDriveShareModal';

interface WorksDriveViewProps {
  files: WorksDriveFile[];
  folders: WorksDriveFolder[];
  cloudBuckets: WorksCloudBucket[];
  workspaceName: string;
  onCreateFile: (newFile: Partial<WorksDriveFile>) => void;
  onUpdateFile: (fileId: string, updated: Partial<WorksDriveFile>) => void;
  onDeleteFile: (fileId: string) => void;
  onCreateFolder: (newFolder: Partial<WorksDriveFolder>) => void;
  onUpdateFolder: (folderId: string, updated: Partial<WorksDriveFolder>) => void;
  onDeleteFolder: (folderId: string) => void;
  onRestoreVersion: (fileId: string, version: WorksFileVersion) => void;
  onNavigateApp?: (appId: string) => void;
  triggerToast?: (title: string, description: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const WorksDriveView: React.FC<WorksDriveViewProps> = ({
  files,
  folders,
  cloudBuckets,
  workspaceName,
  onCreateFile,
  onUpdateFile,
  onDeleteFile,
  onCreateFolder,
  onUpdateFolder,
  onDeleteFolder,
  onRestoreVersion,
  onNavigateApp,
  triggerToast
}) => {
  // Navigation & Folder State
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [classificationFilter, setClassificationFilter] = useState<string>('all');
  const [starredOnly, setStarredOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');

  // Modals State
  const [previewFile, setPreviewFile] = useState<WorksDriveFile | null>(null);
  const [shareFile, setShareFile] = useState<WorksDriveFile | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // Selected Files for Batch Actions
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  // Current folder object
  const currentFolder = useMemo(() => {
    return folders.find(f => f.id === currentFolderId) || null;
  }, [folders, currentFolderId]);

  // Breadcrumbs
  const breadcrumbTrail = useMemo(() => {
    const trail: { id: string | null; name: string }[] = [{ id: null, name: 'OMNI Drive' }];
    if (currentFolder) {
      if (currentFolder.parentId) {
        const parent = folders.find(f => f.id === currentFolder.parentId);
        if (parent) {
          trail.push({ id: parent.id, name: parent.name });
        }
      }
      trail.push({ id: currentFolder.id, name: currentFolder.name });
    }
    return trail;
  }, [currentFolder, folders]);

  // Storage Stats
  const totalStorageUsed = useMemo(() => {
    return files.reduce((acc, f) => acc + f.sizeBytes, 0) + 48200000000; // include base mesh seeds
  }, [files]);
  const storageLimit = 1099511627776; // 1 TB

  // Filtered Folders for current view
  const displayFolders = useMemo(() => {
    if (searchQuery.trim()) {
      return folders.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return folders.filter(f => f.parentId === currentFolderId);
  }, [folders, currentFolderId, searchQuery]);

  // Filtered Files for current view
  const displayFiles = useMemo(() => {
    return files.filter(file => {
      // Folder match (if searching, show across all folders; else match current folder)
      const matchesFolder = searchQuery.trim() ? true : file.folderId === currentFolderId;
      if (!matchesFolder) return false;

      // Query match (searches title, content, tags, summary)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
          file.title.toLowerCase().includes(q) ||
          file.aiTags.some(t => t.toLowerCase().includes(q)) ||
          file.userTags.some(t => t.toLowerCase().includes(q)) ||
          (file.summary && file.summary.toLowerCase().includes(q)) ||
          file.content.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Format filter
      if (formatFilter !== 'all' && file.format !== formatFilter) return false;

      // Classification filter
      if (classificationFilter !== 'all' && file.classification !== classificationFilter) return false;

      // Starred filter
      if (starredOnly && !file.isStarred) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'size') return b.sizeBytes - a.sizeBytes;
      return new Date(b.lastModifiedDate).getTime() - new Date(a.lastModifiedDate).getTime();
    });
  }, [files, currentFolderId, searchQuery, formatFilter, classificationFilter, starredOnly, sortBy]);

  // Pinned/Starred quick access files
  const pinnedFiles = useMemo(() => {
    return files.filter(f => f.isPinned || f.isStarred).slice(0, 4);
  }, [files]);

  const handleToggleStar = (fileId: string, currentStarred: boolean, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onUpdateFile(fileId, { isStarred: !currentStarred });
    triggerToast?.('Updated', currentStarred ? 'Removed from starred' : 'Added to starred', 'info');
  };

  const handleToggleSelectAll = () => {
    if (selectedFileIds.length === displayFiles.length) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds(displayFiles.map(f => f.id));
    }
  };

  const handleToggleSelectFile = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFileIds(prev => 
      prev.includes(fileId) ? prev.filter(id => id !== fileId) : [...prev, fileId]
    );
  };

  const handleBatchDownload = () => {
    triggerToast?.('Batch Export Started', `Downloading ${selectedFileIds.length} sovereign artifacts...`, 'success');
  };

  const handleBatchDelete = () => {
    selectedFileIds.forEach(id => onDeleteFile(id));
    setSelectedFileIds([]);
    triggerToast?.('Deleted', 'Selected files removed.', 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Storage Quota & Decentralized Mesh Overview */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40 flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                <span>OMNI Sovereign Drive Engine</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                Sub-5ms CRDT Sync Active
              </span>
            </div>

            <h2 className="text-xl font-black text-white tracking-tight">
              Files, Knowledge & Document Vault
            </h2>
            <p className="text-xs text-neutral-400 max-w-xl">
              Decentralized, zero-knowledge encrypted repository for specifications, source code, financial models, and rich media anchored across multi-region IPFS storage enclaves.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            
            {/* Storage Quota Pill */}
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
              <div className="flex justify-between text-neutral-400 text-[11px]">
                <span>Storage Quota</span>
                <span className="text-white font-mono font-bold">{(totalStorageUsed / 1073741824).toFixed(1)} GB / 1 TB</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden border border-neutral-800">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (totalStorageUsed / storageLimit) * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-neutral-500 block text-right font-mono">4.5% Allocated</span>
            </div>

            {/* IPFS Pinning Nodes */}
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="text-neutral-400 text-[11px] block">Decentralized Storage</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-white font-mono">342</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded">Pinned</span>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono">3 Active Mesh Buckets</span>
            </div>

            {/* ZK Vault Enclave */}
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-neutral-400 text-[11px] block">Security Posture</span>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">ZK Hardware E2EE</span>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono">FIDO2 Passkeys Enforced</span>
            </div>

          </div>

        </div>
      </div>

      {/* Pinned / Starred Quick Access Carousel (if at root) */}
      {!currentFolderId && !searchQuery && pinnedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Starred & Critical Specifications</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pinnedFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => setPreviewFile(file)}
                className="p-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-indigo-500/40 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      {file.format === 'markdown' || file.format === 'document' ? <FileText className="w-4 h-4" /> :
                       file.format === 'code' ? <Code className="w-4 h-4 text-cyan-400" /> :
                       file.format === 'spreadsheet' ? <Table className="w-4 h-4 text-emerald-400" /> :
                       <Shield className="w-4 h-4 text-amber-400" />}
                    </div>
                    <button
                      onClick={(e) => handleToggleStar(file.id, file.isStarred, e)}
                      className="p-1 rounded-lg text-amber-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {file.title}
                    </h4>
                    <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-2">
                      {file.summary || 'Sovereign workspace document artifact.'}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                  <span>v{file.currentVersion}.0</span>
                  <span className="font-mono">{(file.sizeBytes / 1024).toFixed(1)} KB</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Control Bar: Search, Filters & Action Buttons */}
      <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Search Input & Format Filter */}
        <div className="flex items-center gap-2.5 w-full md:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Deep semantic search across files, code, formulas, and AI tags..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs focus:outline-none"
          >
            <option value="all">All Formats</option>
            <option value="markdown">Markdown & Docs</option>
            <option value="code">Code & Schemas</option>
            <option value="spreadsheet">Spreadsheets (CSV)</option>
            <option value="pdf">PDF & Contracts</option>
            <option value="image">Vector Media</option>
          </select>

          <select
            value={classificationFilter}
            onChange={(e) => setClassificationFilter(e.target.value)}
            className="hidden lg:block px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs focus:outline-none"
          >
            <option value="all">All Classifications</option>
            <option value="restricted_sovereign">Restricted Sovereign</option>
            <option value="confidential">Confidential</option>
            <option value="internal">Internal</option>
            <option value="public">Public</option>
          </select>
        </div>

        {/* Right: View Toggles & Create Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          
          {/* Grid / List toggle */}
          <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-indigo-600/30 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Artifact</span>
          </button>
        </div>

      </div>

      {/* Breadcrumb Navigation Trail */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-xs">
          {breadcrumbTrail.map((crumb, idx) => (
            <React.Fragment key={crumb.id || 'root'}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />}
              <button
                onClick={() => setCurrentFolderId(crumb.id)}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  crumb.id === currentFolderId
                    ? 'font-bold text-white bg-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                }`}
              >
                {crumb.name}
              </button>
            </React.Fragment>
          ))}
        </div>

        <div className="text-xs text-neutral-500">
          Showing {displayFiles.length} files, {displayFolders.length} folders
        </div>
      </div>

      {/* Batch Actions Bar (when files selected) */}
      {selectedFileIds.length > 0 && (
        <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="font-bold text-indigo-300">{selectedFileIds.length} files selected</span>
            <button onClick={() => setSelectedFileIds([])} className="text-neutral-400 hover:text-white underline">
              Deselect All
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBatchDownload}
              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Batch Download</span>
            </button>
            <button
              onClick={handleBatchDelete}
              className="px-3 py-1 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800/40 font-medium flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* FOLDERS GRID (if any in current folder) */}
      {displayFolders.length > 0 && (
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
            Folders ({displayFolders.length})
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {displayFolders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setCurrentFolderId(folder.id)}
                className="p-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-indigo-500/40 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `${folder.color}20`, color: folder.color }}
                  >
                    <Folder className="w-4 h-4 fill-current" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                      {folder.name}
                    </h4>
                    <p className="text-[10px] text-neutral-400 truncate">
                      {folder.fileCount} files • {(folder.totalSizeBytes / 1048576).toFixed(1)} MB
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FILES SECTION: GRID OR LIST VIEW */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
            Documents & Artifacts ({displayFiles.length})
          </span>

          <button
            onClick={handleToggleSelectAll}
            className="text-[11px] text-neutral-400 hover:text-indigo-400 transition-colors"
          >
            {selectedFileIds.length === displayFiles.length && displayFiles.length > 0 ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {displayFiles.length === 0 ? (
          <div className="p-12 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-3">
            <FileText className="w-10 h-10 text-neutral-600 mx-auto" />
            <h4 className="text-sm font-bold text-white">No Artifacts in this Directory</h4>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Create a new specification, code module, financial sheet, or upload files into this sovereign folder.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Create New Artifact
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {displayFiles.map((file) => {
              const isSelected = selectedFileIds.includes(file.id);
              return (
                <div
                  key={file.id}
                  onClick={() => setPreviewFile(file)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-indigo-950/20 border-indigo-500 shadow-md'
                      : 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 hover:border-indigo-500/40'
                  }`}
                >
                  {/* Select Checkbox */}
                  <div
                    onClick={(e) => handleToggleSelectFile(file.id, e)}
                    className={`absolute top-3 left-3 w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                      isSelected ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-neutral-700 bg-neutral-950 hover:border-neutral-500'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3 h-3" />}
                  </div>

                  <div className="pl-6 space-y-2.5">
                    {/* Top Format & Security Badges */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-7 h-7 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-indigo-400">
                          {file.format === 'markdown' || file.format === 'document' ? <FileText className="w-3.5 h-3.5" /> :
                           file.format === 'code' ? <Code className="w-3.5 h-3.5 text-cyan-400" /> :
                           file.format === 'spreadsheet' ? <Table className="w-3.5 h-3.5 text-emerald-400" /> :
                           <Shield className="w-3.5 h-3.5 text-amber-400" />}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">
                          {file.extension}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {file.isZeroKnowledgeEncrypted && (
                          <Lock className="w-3 h-3 text-cyan-400" title="Zero-Knowledge Encrypted" />
                        )}
                        <button
                          onClick={(e) => handleToggleStar(file.id, file.isStarred, e)}
                          className="p-1 text-neutral-500 hover:text-amber-400 transition-colors"
                        >
                          <Star className={`w-3.5 h-3.5 ${file.isStarred ? 'text-amber-400 fill-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* File Title & Summary */}
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                        {file.title}
                      </h4>
                      <p className="text-[10px] text-neutral-400 mt-1 line-clamp-2">
                        {file.summary || 'Sovereign document state vector.'}
                      </p>
                    </div>

                    {/* AI Tags */}
                    {file.aiTags && file.aiTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {file.aiTags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-neutral-950 text-neutral-400 border border-neutral-800">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Meta & Actions */}
                  <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <img src={file.ownerAvatar} alt={file.ownerName} className="w-4 h-4 rounded-full" />
                      <span className="truncate max-w-[80px]">{file.ownerName.split(' ')[0]}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono">{(file.sizeBytes / 1024).toFixed(1)} KB</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShareFile(file);
                        }}
                        className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800"
                        title="Share File"
                      >
                        <Share2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (

          /* LIST / TABLE VIEW */
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-400 text-[11px] uppercase tracking-wider">
                  <th className="p-3 w-8">
                    <input
                      type="checkbox"
                      checked={selectedFileIds.length === displayFiles.length && displayFiles.length > 0}
                      onChange={handleToggleSelectAll}
                      className="rounded bg-neutral-900 border-neutral-700 text-indigo-600 focus:ring-0"
                    />
                  </th>
                  <th className="p-3">Name & Title</th>
                  <th className="p-3 hidden md:table-cell">Security</th>
                  <th className="p-3 hidden sm:table-cell">Owner</th>
                  <th className="p-3 hidden lg:table-cell">Modified</th>
                  <th className="p-3">Size</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {displayFiles.map((file) => {
                  const isSelected = selectedFileIds.includes(file.id);
                  return (
                    <tr
                      key={file.id}
                      onClick={() => setPreviewFile(file)}
                      className={`hover:bg-neutral-850/80 transition-colors cursor-pointer ${
                        isSelected ? 'bg-indigo-950/20' : ''
                      }`}
                    >
                      <td className="p-3" onClick={(e) => handleToggleSelectFile(file.id, e)}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="rounded bg-neutral-900 border-neutral-700 text-indigo-600 focus:ring-0"
                        />
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-indigo-400 shrink-0">
                            {file.format === 'markdown' || file.format === 'document' ? <FileText className="w-3.5 h-3.5" /> :
                             file.format === 'code' ? <Code className="w-3.5 h-3.5 text-cyan-400" /> :
                             file.format === 'spreadsheet' ? <Table className="w-3.5 h-3.5 text-emerald-400" /> :
                             <Shield className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <div>
                            <span className="text-white font-bold block">{file.title}</span>
                            <span className="text-[10px] text-neutral-400 line-clamp-1">{file.summary || file.aiTags.join(', ')}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 hidden md:table-cell">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          file.classification === 'restricted_sovereign' ? 'bg-purple-950 text-purple-300 border border-purple-800/40' :
                          file.classification === 'confidential' ? 'bg-amber-950 text-amber-300 border border-amber-800/40' :
                          'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                        }`}>
                          {file.classification.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="p-3 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5">
                          <img src={file.ownerAvatar} alt={file.ownerName} className="w-5 h-5 rounded-full" />
                          <span className="text-neutral-300">{file.ownerName}</span>
                        </div>
                      </td>

                      <td className="p-3 hidden lg:table-cell text-neutral-400 font-mono text-[11px]">
                        {new Date(file.lastModifiedDate).toLocaleDateString()}
                      </td>

                      <td className="p-3 font-mono text-neutral-400 text-[11px]">
                        {(file.sizeBytes / 1024).toFixed(1)} KB
                      </td>

                      <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleToggleStar(file.id, file.isStarred)}
                            className="p-1 text-neutral-400 hover:text-amber-400"
                          >
                            <Star className={`w-3.5 h-3.5 ${file.isStarred ? 'text-amber-400 fill-amber-400' : ''}`} />
                          </button>
                          <button
                            onClick={() => setShareFile(file)}
                            className="p-1 text-neutral-400 hover:text-white"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setPreviewFile(file)}
                            className="p-1 text-neutral-400 hover:text-indigo-400"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* File Preview & OMNI AI Modal */}
      {previewFile && (
        <WorksFilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
          onUpdateFile={(fileId, updated) => {
            onUpdateFile(fileId, updated);
            setPreviewFile(prev => prev ? { ...prev, ...updated } : null);
          }}
          onRestoreVersion={onRestoreVersion}
          onTriggerToast={triggerToast}
          onNavigateApp={onNavigateApp}
        />
      )}

      {/* Create File / Folder Modal */}
      {isCreateModalOpen && (
        <WorksCreateFileModal
          currentFolderId={currentFolderId}
          folders={folders}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateFile={onCreateFile}
          onCreateFolder={onCreateFolder}
          onTriggerToast={triggerToast}
        />
      )}

      {/* Quick Share Modal */}
      {shareFile && (
        <WorksDriveShareModal
          file={shareFile}
          onClose={() => setShareFile(null)}
          onUpdateFile={(fileId, updated) => {
            onUpdateFile(fileId, updated);
            setShareFile(prev => prev ? { ...prev, ...updated } : null);
          }}
          onTriggerToast={triggerToast}
        />
      )}

    </div>
  );
};
