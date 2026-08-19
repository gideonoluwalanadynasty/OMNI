import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Clock,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { OmniWorkspaceReminder } from '../../../types/workspace';
import { omniWorkspaceService } from '../../../sdk/browser-services/OmniWorkspaceService';

export const OmniWorkspaceRemindersView: React.FC = () => {
  const [reminders, setReminders] = useState<OmniWorkspaceReminder[]>(
    omniWorkspaceService.getReminders()
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDueDateTime, setNewDueDateTime] = useState('2026-08-16T17:00');
  const [newPriority, setNewPriority] = useState<OmniWorkspaceReminder['priority']>('medium');

  useEffect(() => {
    return omniWorkspaceService.subscribe(() => {
      setReminders(omniWorkspaceService.getReminders());
    });
  }, []);

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    omniWorkspaceService.createReminder(newTitle, newDueDateTime, newPriority);
    setShowAddModal(false);
    setNewTitle('');
  };

  const handleToggle = (id: string) => {
    omniWorkspaceService.toggleReminderComplete(id);
  };

  const handleDelete = (id: string) => {
    omniWorkspaceService.deleteReminder(id);
  };

  return (
    <div className="space-y-6 text-stone-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
              reminders.workspace.omni
            </span>
            <span className="text-xs text-stone-400 font-mono">
              {reminders.filter(r => !r.isCompleted).length} Active Reminders
            </span>
          </div>
          <h2 className="text-xl font-bold text-stone-100 mt-1">Sovereign Reminders & Nudges</h2>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Reminder</span>
        </button>
      </div>

      {/* Reminders list */}
      <div className="space-y-3">
        {reminders.map(rem => (
          <div
            key={rem.id}
            className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
              rem.isCompleted
                ? 'bg-stone-950/40 border-stone-800/50 opacity-60'
                : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggle(rem.id)}
                className={`p-1 rounded-lg ${rem.isCompleted ? 'text-emerald-400' : 'text-stone-500 hover:text-stone-300'}`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>

              <div>
                <h4 className={`text-xs font-bold ${rem.isCompleted ? 'line-through text-stone-500' : 'text-stone-100'}`}>
                  {rem.title}
                </h4>
                <div className="text-[11px] text-stone-400 font-mono flex items-center gap-2 mt-0.5">
                  <Clock className="w-3 h-3 text-indigo-400" />
                  <span>Due: {rem.dueDateTime.replace('T', ' ')}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-bold ${
                    rem.priority === 'urgent' ? 'bg-rose-950 text-rose-300' : rem.priority === 'high' ? 'bg-amber-950 text-amber-300' : 'bg-stone-950 text-stone-400'
                  }`}>
                    {rem.priority}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDelete(rem.id)}
              className="p-1.5 text-stone-500 hover:text-rose-400 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleCreateReminder}
            className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 text-stone-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-400" />
                <span>Create Time-Based Reminder</span>
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-200">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Reminder Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10:00 AM Architect Sync — Have research ready"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Due Date & Time</label>
                  <input
                    type="datetime-local"
                    value={newDueDateTime}
                    onChange={(e) => setNewDueDateTime(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
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
                Set Reminder
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
