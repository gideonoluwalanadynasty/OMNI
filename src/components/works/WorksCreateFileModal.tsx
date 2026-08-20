import React, { useState } from 'react';
import {
  X, FileText, Code, Table, FolderPlus, Upload, Shield, Lock,
  Sparkles, Layers
} from 'lucide-react';
import {
  WorksDriveFolder,
  WorksDriveFile,
  WorksFileFormat,
  WorksSecurityClassification
} from '../../types/works';

interface WorksCreateFileModalProps {
  currentFolderId: string | null;
  folders: WorksDriveFolder[];
  onClose: () => void;
  onCreateFile: (newFile: Partial<WorksDriveFile>) => void;
  onCreateFolder: (newFolder: Partial<WorksDriveFolder>) => void;
  onTriggerToast?: (title: string, description: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

type CreateMode = 'doc' | 'code' | 'spreadsheet' | 'folder' | 'upload';

export const WorksCreateFileModal: React.FC<WorksCreateFileModalProps> = ({
  currentFolderId,
  folders,
  onClose,
  onCreateFile,
  onCreateFolder,
  onTriggerToast
}) => {
  const [mode, setMode] = useState<CreateMode>('doc');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedFolderId, setSelectedFolderId] = useState<string>(currentFolderId || 'root');
  const [classification, setClassification] = useState<WorksSecurityClassification>('internal');
  const [isZeroKnowledgeEncrypted, setIsZeroKnowledgeEncrypted] = useState<boolean>(false);
  const [codeLanguage, setCodeLanguage] = useState<string>('typescript');
  const [tagsInput, setTagsInput] = useState<string>('');
  const [folderColor, setFolderColor] = useState<string>('#6366f1');

  // Drag & drop upload state
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const handleFileUploadSimulated = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setTitle(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setContent(event.target?.result as string || '');
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const targetFolderId = selectedFolderId === 'root' ? null : selectedFolderId;
    const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    if (mode === 'folder') {
      if (!title.trim()) return;
      onCreateFolder({
        parentId: targetFolderId,
        name: title.trim(),
        color: folderColor,
        isPinned: false,
        isEncryptedZeroKnowledge: isZeroKnowledgeEncrypted,
        tags: parsedTags.length > 0 ? parsedTags : ['Folder']
      });
      onTriggerToast?.('Folder Created', `Created folder "${title.trim()}".`, 'success');
      onClose();
      return;
    }

    // Creating a file
    let finalTitle = title.trim();
    let format: WorksFileFormat = 'document';
    let mimeType = 'text/plain';
    let ext = 'txt';

    if (mode === 'doc') {
      format = 'markdown';
      mimeType = 'text/markdown';
      ext = 'md';
      if (!finalTitle.endsWith('.md')) finalTitle += '.md';
    } else if (mode === 'code') {
      format = 'code';
      ext = codeLanguage === 'typescript' ? 'ts' : codeLanguage === 'rust' ? 'rs' : 'py';
      mimeType = `text/x-${codeLanguage}`;
      if (!finalTitle.includes('.')) finalTitle += `.${ext}`;
    } else if (mode === 'spreadsheet') {
      format = 'spreadsheet';
      mimeType = 'text/csv';
      ext = 'csv';
      if (!finalTitle.endsWith('.csv')) finalTitle += '.csv';
      if (!content.trim()) {
        // default CSV template
        setContent('Item ID,Title,Category,Status,Estimated (Hrs)\nTASK-101,Core Protocol Upgrade,Engineering,In Progress,12\nTASK-102,Security Audit,Security,Planned,8\n');
      }
    } else if (mode === 'upload') {
      format = finalTitle.endsWith('.csv') ? 'spreadsheet' :
               finalTitle.endsWith('.ts') || finalTitle.endsWith('.rs') || finalTitle.endsWith('.py') ? 'code' :
               finalTitle.endsWith('.pdf') ? 'pdf' :
               finalTitle.endsWith('.svg') || finalTitle.endsWith('.png') ? 'image' : 'document';
      ext = finalTitle.split('.').pop() || 'dat';
      mimeType = 'application/octet-stream';
    }

    const sha256Checksum = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const ipfsCid = `bafybeih${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 12)}`;

    const newFile: Partial<WorksDriveFile> = {
      folderId: targetFolderId,
      title: finalTitle,
      extension: ext,
      format,
      mimeType,
      sizeBytes: new Blob([content]).size || 1024,
      content: content || `# ${finalTitle.replace(/\.[^/.]+$/, '')}\n\nDocument initialized on ${new Date().toLocaleDateString()}.`,
      classification,
      isZeroKnowledgeEncrypted,
      encryptionAlgorithm: isZeroKnowledgeEncrypted ? 'AES-256-GCM-ECDH-Curve25519' : undefined,
      ipfsCid,
      sha256Checksum,
      cloudBucketId: 'bucket_sovereign_eu',
      storageReplicationNodes: 5,
      currentVersion: 1,
      accessScope: 'workspace_members',
      aiTags: ['Sovereign', format.toUpperCase()],
      userTags: parsedTags.length > 0 ? parsedTags : ['New-Artifact'],
      versions: [
        {
          versionNumber: 1,
          versionId: `ver_${Date.now()}`,
          createdAt: new Date().toISOString(),
          createdBy: 'usr_gideon_01',
          createdByName: 'Gideon Oluwalana',
          createdByAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          changeSummary: 'Initial file creation and cryptographic anchoring.',
          sizeBytes: new Blob([content]).size || 1024,
          contentSnapshot: 'Initial draft genesis.',
          ipfsCid,
          sha256Hash: sha256Checksum
        }
      ],
      shares: [],
      comments: []
    };

    onCreateFile(newFile);
    onTriggerToast?.('Artifact Created', `Allocated "${finalTitle}" on OMNI Drive.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Create New Drive Artifact</h3>
              <p className="text-[11px] text-neutral-400">Anchored with cryptographic tamper proofing</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-950/40 grid grid-cols-5 gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setMode('doc')}
            className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
              mode === 'doc' ? 'bg-indigo-600 text-white font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-[10px]">Doc</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('code')}
            className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
              mode === 'code' ? 'bg-indigo-600 text-white font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span className="text-[10px]">Code</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('spreadsheet')}
            className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
              mode === 'spreadsheet' ? 'bg-indigo-600 text-white font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <Table className="w-4 h-4" />
            <span className="text-[10px]">CSV Grid</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('folder')}
            className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
              mode === 'folder' ? 'bg-indigo-600 text-white font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span className="text-[10px]">Folder</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
              mode === 'upload' ? 'bg-indigo-600 text-white font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span className="text-[10px]">Upload</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          
          {mode === 'upload' ? (
            <div className="p-6 rounded-2xl border-2 border-dashed border-neutral-700 bg-neutral-950/60 flex flex-col items-center justify-center text-center">
              <Upload className="w-8 h-8 text-indigo-400 mb-2 animate-bounce" />
              <p className="text-white font-bold text-xs mb-1">
                {uploadedFileName ? `Selected: ${uploadedFileName}` : 'Drag & drop file or browse'}
              </p>
              <p className="text-[10px] text-neutral-500 mb-3">Supports Markdown, Code, CSV, PDF, SVG, JSON</p>
              <input
                type="file"
                onChange={handleFileUploadSimulated}
                className="text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
              />
            </div>
          ) : (
            <div>
              <label className="block text-neutral-300 font-semibold mb-1">
                {mode === 'folder' ? 'Folder Name *' : 'Document Title *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  mode === 'folder' ? 'e.g. Q4 Security Specifications' :
                  mode === 'doc' ? 'e.g. Sovereign Architecture RFC' :
                  mode === 'code' ? 'e.g. crdt_mesh_router' : 'e.g. financial_model_q3'
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {/* Location & Folder Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-semibold mb-1">Destination Folder</label>
              <select
                value={selectedFolderId}
                onChange={(e) => setSelectedFolderId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="root">Root Level (/)</option>
                {folders.map(f => (
                  <option key={f.id} value={f.id}>📁 {f.name}</option>
                ))}
              </select>
            </div>

            {mode === 'code' ? (
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Language</label>
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="typescript">TypeScript (.ts)</option>
                  <option value="rust">Rust (.rs)</option>
                  <option value="python">Python (.py)</option>
                  <option value="json">JSON (.json)</option>
                  <option value="sql">SQL (.sql)</option>
                </select>
              </div>
            ) : mode === 'folder' ? (
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Folder Color</label>
                <div className="flex items-center gap-2 pt-1">
                  {['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'].map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFolderColor(c)}
                      className={`w-6 h-6 rounded-full transition-transform ${folderColor === c ? 'scale-125 ring-2 ring-white' : ''}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Classification</label>
                <select
                  value={classification}
                  onChange={(e) => setClassification(e.target.value as WorksSecurityClassification)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="internal">Internal</option>
                  <option value="confidential">Confidential</option>
                  <option value="restricted_sovereign">Restricted Sovereign</option>
                  <option value="public">Public</option>
                </select>
              </div>
            )}
          </div>

          {/* Zero Knowledge Toggle */}
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-white font-bold block">Zero-Knowledge Hardware Encryption</span>
                <span className="text-[10px] text-neutral-400">Keys never leave client enclaves</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isZeroKnowledgeEncrypted}
              onChange={(e) => setIsZeroKnowledgeEncrypted(e.target.checked)}
              className="w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-cyan-500 focus:ring-0 cursor-pointer"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-neutral-300 font-semibold mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Architecture, RFC, Phase-3, Sovereign"
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/30 transition-colors cursor-pointer"
            >
              {mode === 'folder' ? 'Create Folder' : 'Create & Anchor'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
