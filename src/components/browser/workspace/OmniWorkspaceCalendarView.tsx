import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Video,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { OmniWorkspaceCalendarEvent } from '../../../types/workspace';
import { omniWorkspaceService } from '../../../sdk/browser-services/OmniWorkspaceService';

export const OmniWorkspaceCalendarView: React.FC<{ onOpenAiBriefing?: () => void }> = ({ onOpenAiBriefing }) => {
  const [events, setEvents] = useState<OmniWorkspaceCalendarEvent[]>(
    omniWorkspaceService.getCalendarEvents()
  );
  const [currentView, setCurrentView] = useState<'month' | 'agenda'>('agenda');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Event Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newStartTime, setNewStartTime] = useState('10:00');
  const [newEndTime, setNewEndTime] = useState('11:00');
  const [newCategory, setNewCategory] = useState<OmniWorkspaceCalendarEvent['category']>('work');
  const [newMeetingUrl, setNewMeetingUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    return omniWorkspaceService.subscribe(() => {
      setEvents(omniWorkspaceService.getCalendarEvents());
    });
  }, []);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    omniWorkspaceService.createCalendarEvent({
      title: newTitle,
      startDate: newDate,
      startTime: newStartTime,
      endDate: newDate,
      endTime: newEndTime,
      category: newCategory,
      meetingUrl: newMeetingUrl.trim() || undefined,
      description: newDesc
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewMeetingUrl('');
    setNewDesc('');
  };

  const handleDeleteEvent = (id: string) => {
    omniWorkspaceService.deleteCalendarEvent(id);
  };

  const categoryColors: Record<OmniWorkspaceCalendarEvent['category'], { bg: string; text: string; border: string }> = {
    work: { bg: 'bg-indigo-950/60', text: 'text-indigo-300', border: 'border-indigo-800' },
    meeting: { bg: 'bg-emerald-950/60', text: 'text-emerald-300', border: 'border-emerald-800' },
    deep_work: { bg: 'bg-purple-950/60', text: 'text-purple-300', border: 'border-purple-800' },
    personal: { bg: 'bg-sky-950/60', text: 'text-sky-300', border: 'border-sky-800' },
    deadline: { bg: 'bg-rose-950/60', text: 'text-rose-300', border: 'border-rose-800' },
    research: { bg: 'bg-amber-950/60', text: 'text-amber-300', border: 'border-amber-800' }
  };

  return (
    <div className="space-y-6 text-stone-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
              calendar.workspace.omni
            </span>
            <span className="text-xs text-stone-400 font-mono">{events.length} Scheduled Events</span>
          </div>
          <h2 className="text-xl font-bold text-stone-100 mt-1">Calendar & Deep Work Time-Blocking</h2>
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
            <span>New Event</span>
          </button>
        </div>
      </div>

      {/* Events List / Agenda */}
      <div className="space-y-3">
        {events.map(event => {
          const style = categoryColors[event.category] || categoryColors.work;
          return (
            <div
              key={event.id}
              className="p-4 bg-stone-900/60 border border-stone-800 hover:border-stone-700 rounded-2xl transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-stone-100">{event.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${style.bg} ${style.text} ${style.border}`}>
                      {event.category.replace('_', ' ')}
                    </span>
                  </div>

                  {event.description && (
                    <p className="text-xs text-stone-400 leading-relaxed">{event.description}</p>
                  )}

                  <div className="flex items-center gap-4 pt-1 text-[11px] font-mono text-stone-400 flex-wrap">
                    <span className="flex items-center gap-1 text-indigo-300">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.startDate} • {event.startTime} - {event.endTime}</span>
                    </span>

                    {event.location && (
                      <span className="flex items-center gap-1 text-stone-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{event.location}</span>
                      </span>
                    )}

                    {event.attendees && event.attendees.length > 0 && (
                      <span className="flex items-center gap-1 text-stone-400">
                        <Users className="w-3.5 h-3.5" />
                        <span>{event.attendees.length} Attendees</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {event.meetingUrl && (
                    <a
                      href={event.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Call</span>
                    </a>
                  )}

                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-1.5 text-stone-500 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleCreateEvent}
            className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 text-stone-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-indigo-400" />
                <span>Schedule Calendar Event / Deep Work</span>
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-200">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OMNI Architecture Sync"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Start Time</label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">End Time</label>
                  <input
                    type="time"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs"
                  >
                    <option value="work">Work</option>
                    <option value="meeting">Meeting</option>
                    <option value="deep_work">Deep Work</option>
                    <option value="research">Research</option>
                    <option value="deadline">Deadline</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Meeting URL</label>
                  <input
                    type="text"
                    placeholder="https://meet.omni.com/room"
                    value={newMeetingUrl}
                    onChange={(e) => setNewMeetingUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Description</label>
                <textarea
                  rows={2}
                  placeholder="Notes, discussion points, or agenda..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs"
                />
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
                Save Event
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
