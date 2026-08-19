import React, { useState, useEffect } from 'react';
import {
  Folder,
  File,
  Shield,
  Upload,
  Download,
  Trash2,
  Lock,
  Search,
  CheckCircle2,
  FileText,
  FileCode,
  Image as ImageIcon
} from 'lucide-react';
import { OmniWorkspaceFile, FileCategoryType } from '../../../types/workspace';
import { omniWorkspaceService } from '../../../sdk/browser-services/OmniWorkspaceService';

export const OmniWorkspaceFilesView: React.FC = () => {
  const [files, setFiles] = useState<OmniWorkspaceFile[]>(omniWorkspaceService.getFiles());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New file state
  const [newFileName, setNewFileName] = useState('');
  const [newFolderPath, setNewFolderPath] = useState('/Research');
  const [newCategory, setNewCategory] = useState<FileCategoryType>('pdf');
  const [newSnippet, setNewSnippet] = useState('');

  useEffect(() => {
    return omniWorkspaceService.subscribe(() => {
      setFiles(omniWorkspaceService.getFiles());
    });
  }, []);

  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    omniWorkspaceService.addFile({
      name: newFileName,
      category: newCategory,
      folderPath: newFolderPath,
      sizeBytes: Math.floor(Math.random() * 2000000 + 100000),
      isEncrypted: true,
      encryptionAlgorithm: 'AES-256-GCM',
      previewSnippet: newSnippet,
      tags: ['Encrypted', newCategory]
    });

    setShowUploadModal(false);
    setNewFileName('');
    setNewSnippet('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this encrypted file from sovereign storage?')) {
      omniWorkspaceService.deleteFile(id);
    }
  };

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || f.folderPath.includes(selectedFolder);
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="space-y-6 text-stone-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
              files.workspace.omni
            </span>
            <span className="text-xs text-stone-400 font-mono">{files.length} Encrypted Sovereign Files</span>
          </div>
          <h2 className="text-xl font-bold text-stone-100 mt-1">Sovereign File Hub & Encrypted Vault</h2>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Encrypted File</span>
        </button>
      </div>

      {/* Search & Folder filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-stone-900/60 border border-stone-800 rounded-xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search files by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Folders</option>
          <option value="Research">/Research</option>
          <option value="Security">/Security</option>
          <option value="Finance">/Finance</option>
          <option value="Brand">/Brand</option>
        </select>
      </div>

      {/* File Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredFiles.map(file => (
          <div
            key={file.id}
            className="p-4 bg-stone-900/60 border border-stone-800 hover:border-stone-700 rounded-2xl transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-indigo-400">
                  {file.category === 'pdf' ? (
                    <FileText className="w-5 h-5 text-rose-400" />
                  ) : file.category === 'data' ? (
                    <FileCode className="w-5 h-5 text-amber-400" />
                  ) : file.category === 'image' ? (
                    <ImageIcon className="w-5 h-5 text-sky-400" />
                  ) : (
                    <File className="w-5 h-5 text-indigo-400" />
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {file.isEncrypted && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[9px] font-bold flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> AES-256
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="p-1 text-stone-500 hover:text-rose-400 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-100 truncate" title={file.name}>
                  {file.name}
                </h4>
                <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                  {file.folderPath} • {(file.sizeBytes / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>

              {file.previewSnippet && (
                <p className="text-[11px] text-stone-400 line-clamp-2 font-mono bg-stone-950/80 p-2 rounded border border-stone-800/80">
                  {file.previewSnippet}
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between text-[10px] font-mono text-stone-500">
              <span>{file.uploadedAt}</span>
              <button
                onClick={() => alert(`Decrypted download stream initiated for ${file.name}`)}
                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded font-sans font-semibold flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Decrypt & Export</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleUploadFile}
            className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 text-stone-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>Upload Encrypted Sovereign File</span>
              </h3>
              <button type="button" onClick={() => setShowUploadModal(false)} className="text-stone-400 hover:text-stone-200">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">File Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. sovereign_agent_benchmark.pdf"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="data">JSON / Data</option>
                    <option value="document">Docx / Spec</option>
                    <option value="code">Source Code</option>
                    <option value="image">Image Asset</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Folder Path</label>
                  <input
                    type="text"
                    value={newFolderPath}
                    onChange={(e) => setNewFolderPath(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">File Summary / Snippet</label>
                <textarea
                  rows={2}
                  placeholder="Brief description of the document contents..."
                  value={newSnippet}
                  onChange={(e) => setNewSnippet(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
              >
                Encrypt & Upload
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
