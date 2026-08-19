import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  Plus,
  ArrowRight,
  Sparkles,
  Link,
  CheckCircle2,
  Clock,
  Trash2,
  Tag
} from 'lucide-react';
import { OmniWorkspaceProject } from '../../../types/workspace';
import { omniWorkspaceService } from '../../../sdk/browser-services/OmniWorkspaceService';

export const OmniWorkspaceProjectsView: React.FC = () => {
  const [projects, setProjects] = useState<OmniWorkspaceProject[]>(
    omniWorkspaceService.getProjects()
  );
  const [showAddModal, setShowAddModal] = useState(false);

  // New project state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLead, setNewLead] = useState('Chief Architect');
  const [newTags, setNewTags] = useState('AI, Architecture');

  useEffect(() => {
    return omniWorkspaceService.subscribe(() => {
      setProjects(omniWorkspaceService.getProjects());
    });
  }, []);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    omniWorkspaceService.createProject({
      title: newTitle,
      description: newDesc,
      leadName: newLead,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      progressPercent: 10,
      status: 'active'
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete project space?')) {
      omniWorkspaceService.deleteProject(id);
    }
  };

  return (
    <div className="space-y-6 text-stone-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
              projects.workspace.omni
            </span>
            <span className="text-xs text-stone-400 font-mono">{projects.length} Active Project Spaces</span>
          </div>
          <h2 className="text-xl font-bold text-stone-100 mt-1">Sovereign Project Spaces & Unified Canvases</h2>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Project Space</span>
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map(proj => (
          <div
            key={proj.id}
            className="p-5 bg-stone-900/60 border border-stone-800 hover:border-stone-700 rounded-2xl transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-stone-100">{proj.title}</h3>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px] uppercase font-bold">
                      {proj.status}
                    </span>
                  </div>
                  <div className="text-xs text-stone-400 font-mono">Lead: {proj.leadName}</div>
                </div>

                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-1.5 text-stone-500 hover:text-rose-400 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">{proj.description}</p>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-stone-400">
                  <span>Milestone Completion</span>
                  <span className="text-indigo-400 font-bold">{proj.progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all"
                    style={{ width: `${proj.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Connected Assets Chips */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-stone-400">
                <div className="p-2 bg-stone-950 border border-stone-800 rounded-lg text-center">
                  <strong className="text-indigo-300 text-xs block">{proj.associatedDocIds.length}</strong>
                  <span>Docs Linked</span>
                </div>
                <div className="p-2 bg-stone-950 border border-stone-800 rounded-lg text-center">
                  <strong className="text-emerald-300 text-xs block">{proj.associatedTaskIds.length}</strong>
                  <span>Tasks Linked</span>
                </div>
                <div className="p-2 bg-stone-950 border border-stone-800 rounded-lg text-center">
                  <strong className="text-amber-300 text-xs block">{proj.associatedResearchIds.length}</strong>
                  <span>Papers Linked</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
              <div className="flex items-center gap-1.5 flex-wrap">
                {proj.tags.map(t => (
                  <span key={t} className="px-1.5 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-stone-500">{proj.targetEndDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleCreateProject}
            className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 text-stone-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-indigo-400" />
                <span>Create Sovereign Project Space</span>
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-200">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OMNI Autonomous Agent Mesh"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Project Objective / Description</label>
                <textarea
                  rows={3}
                  placeholder="Summary of project deliverables and goals..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Lead Architect / Name</label>
                  <input
                    type="text"
                    value={newLead}
                    onChange={(e) => setNewLead(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Tags</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
              >
                Launch Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
