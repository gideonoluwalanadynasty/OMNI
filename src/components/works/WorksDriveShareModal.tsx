import React, { useState } from 'react';
import {
  X, Share2, Link, Lock, Users, Shield, Copy, Check,
  Clock, Eye, MessageSquare, Edit3, Globe
} from 'lucide-react';
import { WorksDriveFile, WorksFileAccessRole } from '../../types/works';

interface WorksDriveShareModalProps {
  file: WorksDriveFile;
  onClose: () => void;
  onUpdateFile: (fileId: string, updated: Partial<WorksDriveFile>) => void;
  onTriggerToast?: (title: string, description: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const WorksDriveShareModal: React.FC<WorksDriveShareModalProps> = ({
  file,
  onClose,
  onUpdateFile,
  onTriggerToast
}) => {
  const [targetName, setTargetName] = useState<string>('');
  const [role, setRole] = useState<WorksFileAccessRole>('editor');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isPublicLinkEnabled, setIsPublicLinkEnabled] = useState<boolean>(
    file.accessScope === 'public_link'
  );
  const [requiresPassword, setRequiresPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [allowDownload, setAllowDownload] = useState<boolean>(true);

  const publicUrl = `https://works.dynastyholdings.com/drive/s/${file.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    onTriggerToast?.('Link Copied', 'Encrypted sharing link copied to clipboard.', 'success');
  };

  const handleAddPermission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetName.trim()) return;

    const newShare = {
      id: `sh_${Date.now()}`,
      targetType: (targetName.includes('@') ? 'user' : 'team') as 'user' | 'team',
      targetName: targetName.trim(),
      role,
      grantedBy: 'usr_gideon_01',
      grantedAt: 'Just now',
      allowDownload,
      allowExport: true,
      requiresPassword,
      passwordHash: requiresPassword && password ? 'sha256_secured' : undefined
    };

    onUpdateFile(file.id, {
      shares: [...file.shares, newShare]
    });
    setTargetName('');
    onTriggerToast?.('Invite Dispatched', `Access granted to ${targetName} as ${role}.`, 'success');
  };

  const handleTogglePublic = (enabled: boolean) => {
    setIsPublicLinkEnabled(enabled);
    onUpdateFile(file.id, {
      accessScope: enabled ? 'public_link' : 'workspace_members'
    });
    onTriggerToast?.('Access Scope Updated', enabled ? 'Public link access enabled' : 'Restricted to workspace members', 'info');
  };

  const handleRemoveShare = (shareId: string) => {
    onUpdateFile(file.id, {
      shares: file.shares.filter(s => s.id !== shareId)
    });
    onTriggerToast?.('Grant Revoked', 'Collaborator removed.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Share "{file.title}"</h3>
              <p className="text-[11px] text-neutral-400">Manage cryptographic access and guest permissions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          
          {/* Quick Copy Link Box */}
          <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-neutral-300 font-bold flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-indigo-400" />
                <span>Shareable Link</span>
              </span>
              <label className="flex items-center gap-1.5 text-[11px] text-neutral-400 cursor-pointer">
                <span>Public Link:</span>
                <input
                  type="checkbox"
                  checked={isPublicLinkEnabled}
                  onChange={(e) => handleTogglePublic(e.target.checked)}
                  className="rounded bg-neutral-900 border-neutral-700 text-indigo-600 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono select-all focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Add Collaborator Form */}
          <form onSubmit={handleAddPermission} className="space-y-3">
            <label className="block text-neutral-300 font-semibold">Invite People or Squads</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                placeholder="User email, DID, or Squad name..."
                className="flex-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as WorksFileAccessRole)}
                className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="viewer">Viewer</option>
                <option value="commenter">Commenter</option>
                <option value="editor">Editor</option>
              </select>
            </div>

            {/* Extra Options */}
            <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
              <label className="flex items-center justify-between text-neutral-300 cursor-pointer">
                <span>Allow file download & offline export</span>
                <input
                  type="checkbox"
                  checked={allowDownload}
                  onChange={(e) => setAllowDownload(e.target.checked)}
                  className="rounded bg-neutral-900 border-neutral-700 text-indigo-600 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between text-neutral-300 cursor-pointer">
                <span>Enforce passkey password for guests</span>
                <input
                  type="checkbox"
                  checked={requiresPassword}
                  onChange={(e) => setRequiresPassword(e.target.checked)}
                  className="rounded bg-neutral-900 border-neutral-700 text-indigo-600 focus:ring-0"
                />
              </label>

              {requiresPassword && (
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set guest access password..."
                  className="w-full px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 text-xs"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors cursor-pointer shadow-md shadow-indigo-600/30"
            >
              Send Invitation
            </button>
          </form>

          {/* Current Collaborators */}
          <div className="space-y-2 pt-2 border-t border-neutral-800">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Who has access</span>
            
            {/* Owner */}
            <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={file.ownerAvatar} alt={file.ownerName} className="w-6 h-6 rounded-full" />
                <span className="text-white font-semibold">{file.ownerName}</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-md">Owner</span>
            </div>

            {file.shares.map(sh => (
              <div key={sh.id} className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-300">
                    {sh.targetName.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-neutral-200">{sh.targetName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-indigo-400 capitalize">{sh.role}</span>
                  <button
                    onClick={() => handleRemoveShare(sh.id)}
                    className="p-1 text-neutral-500 hover:text-rose-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
