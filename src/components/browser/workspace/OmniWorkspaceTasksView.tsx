import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  Plus,
  Clock,
  AlertCircle,
  Tag,
  Folder,
  Trash2,
  CheckCircle2,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronRight,
  Filter,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { OmniWorkspaceTask, TaskPriority, TaskStatus } from '../../../types/workspace';
import { omniWorkspaceService } from '../../../sdk/browser-services/OmniWorkspaceService';

export const OmniWorkspaceTasksView: React.FC<{ onOpenAiBriefing?: () => void }> = ({ onOpenAiBriefing }) => {
  const [tasks, setTasks] = useState<OmniWorkspaceTask[]>(omniWorkspaceService.getTasks());
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const [newDueDate, setNewDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [newEstimatedMinutes, setNewEstimatedMinutes] = useState(30);
  const [newTags, setNewTags] = useState('');

  useEffect(() => {
    return omniWorkspaceService.subscribe(() => {
      setTasks(omniWorkspaceService.getTasks());
    });
  }, []);

  const handleToggleTaskStatus = (task: OmniWorkspaceTask) => {
    const nextStatus: TaskStatus = task.status === 'done' ? 'todo' : 'done';
    omniWorkspaceService.updateTask(task.id, { status: nextStatus });
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    omniWorkspaceService.toggleSubtask(taskId, subtaskId);
  };

  const handleDeleteTask = (taskId: string) => {
    omniWorkspaceService.deleteTask(taskId);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    omniWorkspaceService.createTask({
      title: newTitle,
      description: newDesc,
      priority: newPriority,
      dueDate: newDueDate,
      estimatedMinutes: newEstimatedMinutes,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      subtasks: []
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewTags('');
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const priorityColors: Record<TaskPriority, { bg: string; text: string; border: string }> = {
    urgent: { bg: 'bg-rose-950/60', text: 'text-rose-300', border: 'border-rose-800' },
    high: { bg: 'bg-amber-950/60', text: 'text-amber-300', border: 'border-amber-800' },
    medium: { bg: 'bg-indigo-950/60', text: 'text-indigo-300', border: 'border-indigo-800' },
    low: { bg: 'bg-stone-900', text: 'text-stone-400', border: 'border-stone-800' }
  };

  return (
    <div className="space-y-6 text-stone-200">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
              tasks.workspace.omni
            </span>
            <span className="text-xs text-stone-400 font-mono">
              {tasks.filter(t => t.status === 'done').length}/{tasks.length} Completed
            </span>
          </div>
          <h2 className="text-xl font-bold text-stone-100 mt-1">Sovereign Tasks & Execution Engine</h2>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAiBriefing && (
            <button
              onClick={onOpenAiBriefing}
              className="px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI Prepare Today's Tasks</span>
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-stone-900/60 border border-stone-800 rounded-xl">
        <input
          type="text"
          placeholder="Filter tasks by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
        />

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="in_review">In Review</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map(task => {
          const isDone = task.status === 'done';
          const pStyle = priorityColors[task.priority];

          return (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all space-y-3 ${
                isDone
                  ? 'bg-stone-950/40 border-stone-800/50 opacity-70'
                  : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => handleToggleTaskStatus(task)}
                    className="mt-0.5 text-stone-400 hover:text-indigo-400 transition-colors"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-stone-500 hover:text-stone-300" />
                    )}
                  </button>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-bold ${isDone ? 'line-through text-stone-500' : 'text-stone-100'}`}>
                        {task.title}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${pStyle.bg} ${pStyle.text} ${pStyle.border}`}>
                        {task.priority}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-stone-950 text-stone-400 font-mono text-[10px] border border-stone-800">
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-xs text-stone-400 leading-relaxed">{task.description}</p>
                    )}

                    {/* Metadata tags & due date */}
                    <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-stone-400 flex-wrap">
                      {task.dueDate && (
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3 text-indigo-400" />
                          <span>Due: {task.dueDate} {task.dueTime}</span>
                        </span>
                      )}
                      {task.estimatedMinutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-500" />
                          <span>{task.estimatedMinutes} mins</span>
                        </span>
                      )}
                      {task.tags.map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-1.5 text-stone-500 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Subtasks if any */}
              {task.subtasks.length > 0 && (
                <div className="pl-8 pt-2 border-t border-stone-800/60 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-stone-500">Subtasks Checkpoints:</div>
                  {task.subtasks.map(sub => (
                    <div
                      key={sub.id}
                      onClick={() => handleToggleSubtask(task.id, sub.id)}
                      className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer hover:text-stone-100"
                    >
                      {sub.isCompleted ? (
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-stone-500" />
                      )}
                      <span className={sub.isCompleted ? 'line-through text-stone-500' : ''}>
                        {sub.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleCreateTask}
            className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 text-stone-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-400" />
                <span>Create New Sovereign Task</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Audit Zero-Knowledge Vault Security"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed deliverables, objectives, and acceptance criteria..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Estimated Duration (mins)</label>
                  <input
                    type="number"
                    min="5"
                    max="480"
                    value={newEstimatedMinutes}
                    onChange={(e) => setNewEstimatedMinutes(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="AI, Security, Architecture"
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
                Create Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
