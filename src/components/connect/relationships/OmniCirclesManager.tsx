import React, { useState, useMemo } from 'react';
import {
  Layers,
  Users,
  Plus,
  Lock,
  Globe,
  Shield,
  Eye,
  Edit2,
  Trash2,
  Share2,
  MessageSquare,
  Search,
  CheckCircle2,
  UserPlus,
  UserMinus,
  Sparkles,
  X,
  Send,
  Heart,
  Briefcase,
  Building,
  GraduationCap
} from 'lucide-react';
import {
  OmniCircle,
  OmniUniversalContact,
  CircleCategory,
  RelationshipVisibility
} from '../../../types/omni_relationship_graph';

interface OmniCirclesManagerProps {
  circles: OmniCircle[];
  contacts: OmniUniversalContact[];
  onCreateCircle: (circle: Omit<OmniCircle, 'id' | 'createdAt' | 'updatedAt' | 'memberCount'>) => void;
  onUpdateCircle: (circleId: string, updates: Partial<OmniCircle>) => void;
  onDeleteCircle: (circleId: string) => void;
  onAddContactToCircle: (circleId: string, contactId: string) => void;
  onRemoveContactFromCircle: (circleId: string, contactId: string) => void;
}

export const OmniCirclesManager: React.FC<OmniCirclesManagerProps> = ({
  circles,
  contacts,
  onCreateCircle,
  onUpdateCircle,
  onDeleteCircle,
  onAddContactToCircle,
  onRemoveContactFromCircle
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CircleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCircle, setSelectedCircle] = useState<OmniCircle | null>(circles[0] || null);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  // New Circle Form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CircleCategory>('business');
  const [color, setColor] = useState('#4F46E5');
  const [privacyLevel, setPrivacyLevel] = useState<RelationshipVisibility>('circle_only');

  // Broadcast Form
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Filtered Circles
  const filteredCircles = useMemo(() => {
    return circles.filter(c => {
      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchDesc = c.description.toLowerCase().includes(q);
        if (!matchName && !matchDesc) return false;
      }
      return true;
    });
  }, [circles, selectedCategory, searchQuery]);

  // Circle Members
  const circleMembers = useMemo(() => {
    if (!selectedCircle) return [];
    return contacts.filter(c => selectedCircle.memberContactIds.includes(c.id));
  }, [selectedCircle, contacts]);

  // Non-members for adding
  const nonMembers = useMemo(() => {
    if (!selectedCircle) return [];
    return contacts.filter(c => !selectedCircle.memberContactIds.includes(c.id));
  }, [selectedCircle, contacts]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreateCircle({
      tenantId: 'tenant_primary_001',
      ownerProfileId: 'prof_gideon_001',
      name,
      description,
      category,
      color,
      icon: category === 'personal' ? 'Heart' : category === 'business' ? 'Briefcase' : 'Building',
      privacyLevel,
      memberProfileIds: ['prof_gideon_001'],
      memberContactIds: [],
      allowTargetedBroadcast: true,
      autoSyncFromTags: [name.toLowerCase()]
    });

    setIsCreateModalOpen(false);
    setName('');
    setDescription('');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim() || !selectedCircle) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setIsBroadcastModalOpen(false);
      setBroadcastText('');
    }, 1500);
  };

  const getCategoryIcon = (cat: CircleCategory) => {
    switch (cat) {
      case 'personal':
        return <Heart className="w-4 h-4 text-rose-400" />;
      case 'business':
        return <Briefcase className="w-4 h-4 text-indigo-400" />;
      case 'organisation':
        return <Building className="w-4 h-4 text-amber-400" />;
      case 'faith_community':
        return <Globe className="w-4 h-4 text-purple-400" />;
      default:
        return <Layers className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Sovereign Circles Architecture
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              {circles.length} Circles Active
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            OMNI Circles & Targeted Privacy System
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Organize personal, enterprise, and community networks into sovereign circles. Every post, message, or broadcast can be precisely targeted to specific circles without cross-circle data leakage.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Sovereign Circle</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'personal', 'business', 'organisation', 'faith_community', 'custom'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Circles' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter circles by name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Main Grid & Member Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Circles Grid (2 Cols) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCircles.map(circle => {
            const isSelected = selectedCircle?.id === circle.id;
            return (
              <div
                key={circle.id}
                onClick={() => setSelectedCircle(circle)}
                className={`bg-slate-900 border rounded-2xl p-5 shadow-lg transition-all cursor-pointer hover:border-indigo-500/80 space-y-4 ${
                  isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md"
                      style={{ backgroundColor: `${circle.color}20`, borderColor: `${circle.color}50` }}
                    >
                      {getCategoryIcon(circle.category)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{circle.name}</h3>
                      <span className="text-[10px] uppercase font-bold text-slate-400 capitalize">
                        {circle.category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 font-mono">
                    {circle.memberCount} Members
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">
                  {circle.description}
                </p>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    {circle.privacyLevel === 'circle_only' ? (
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Globe className="w-3.5 h-3.5 text-sky-400" />
                    )}
                    <span className="text-[10px] capitalize">{circle.privacyLevel.replace('_', ' ')}</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCircle(circle);
                      setIsBroadcastModalOpen(true);
                    }}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Send className="w-3 h-3 text-indigo-400" />
                    <span>Broadcast</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Circle Members & Detail Panel (1 Col) */}
        <div className="space-y-4">
          {selectedCircle ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-white">{selectedCircle.name}</h3>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedCircle.color }}></span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedCircle.description}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsAddMemberModalOpen(true)}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add Members</span>
                </button>

                <button
                  onClick={() => setIsBroadcastModalOpen(true)}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>Targeted Post</span>
                </button>
              </div>

              {/* Members List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Roster ({circleMembers.length} Contacts)
                  </h4>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {circleMembers.length > 0 ? (
                    circleMembers.map(member => (
                      <div
                        key={member.id}
                        className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="w-8 h-8 rounded-xl object-cover"
                          />
                          <div>
                            <div className="font-bold text-white">{member.name}</div>
                            <div className="text-[10px] text-slate-400">{member.organisation}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveContactFromCircle(selectedCircle.id, member.id)}
                          title="Remove from Circle"
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-slate-500">
                      No contacts in this circle yet. Click 'Add Members' above to populate.
                    </div>
                  )}
                </div>
              </div>

              {/* Privacy Rules Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  <span>Circle-Targeted Privacy Gating</span>
                </div>
                <p>
                  Content broadcast to this circle is encrypted with key material restricted strictly to authorized circle members.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 space-y-3">
              <Layers className="w-10 h-10 mx-auto text-slate-600 animate-pulse" />
              <p className="text-xs">Select any sovereign circle to inspect member roster, execute circle-targeted broadcasts, or configure custom privacy rules.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: CREATE SOVEREIGN CIRCLE */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                Create Sovereign Circle
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Circle Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Executive Board Advisors"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Purpose of this circle..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="business">Business / Commercial</option>
                    <option value="personal">Personal / Family</option>
                    <option value="organisation">Organisation / Non-Profit</option>
                    <option value="faith_community">Faith / Diocese</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Privacy Level</label>
                  <select
                    value={privacyLevel}
                    onChange={e => setPrivacyLevel(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="circle_only">Circle Only (Encrypted)</option>
                    <option value="mutual_only">Mutual Only</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Theme Color</label>
                <div className="flex items-center gap-2">
                  {['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'].map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        color === c ? 'scale-110 border-white' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Save Circle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD MEMBERS TO CIRCLE */}
      {isAddMemberModalOpen && selectedCircle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-400" />
                Add Members to {selectedCircle.name}
              </h3>
              <button onClick={() => setIsAddMemberModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {nonMembers.length > 0 ? (
                nonMembers.map(c => (
                  <div
                    key={c.id}
                    className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.avatarUrl} alt={c.name} className="w-8 h-8 rounded-xl object-cover" />
                      <div>
                        <div className="font-bold text-white">{c.name}</div>
                        <div className="text-[10px] text-slate-400">{c.organisation}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddContactToCircle(selectedCircle.id, c.id)}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-500">
                  All universal contacts are already in this circle.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsAddMemberModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BROADCAST TO CIRCLE */}
      {isBroadcastModalOpen && selectedCircle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-400" />
                Targeted Broadcast to {selectedCircle.name}
              </h3>
              <button onClick={() => setIsBroadcastModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {broadcastSent ? (
              <div className="text-center py-8 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Broadcast Successfully Gated</h4>
                <p className="text-xs text-slate-400">
                  Sent securely to {selectedCircle.memberCount} members of {selectedCircle.name}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendBroadcast} className="space-y-4">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">Target Audience:</div>
                  <div className="font-bold text-indigo-400">{selectedCircle.name} ({selectedCircle.memberCount} Recipients)</div>
                  <div className="text-[10px] text-slate-500">Only members in this circle will have cryptographic decrypt privileges.</div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message Content</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Compose announcement, update, or executive briefing..."
                    value={broadcastText}
                    onChange={e => setBroadcastText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  ></textarea>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBroadcastModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20"
                  >
                    Send Encrypted Broadcast
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
