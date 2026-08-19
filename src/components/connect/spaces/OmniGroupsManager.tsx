import React, { useState } from 'react';
import {
  Users,
  Lock,
  Globe,
  EyeOff,
  DollarSign,
  Building,
  Shield,
  Plus,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Search,
  CheckCircle,
  Clock,
  Briefcase,
  GraduationCap,
  Heart
} from 'lucide-react';
import { OmniGroup, OmniGroupType, OmniGroupCategory } from '../../../types/omni_community_spaces';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';

interface Props {
  engine: OmniConnectEngine;
  currentProfileId: string;
  onBackToSpaces: () => void;
}

export const OmniGroupsManager: React.FC<Props> = ({
  engine,
  currentProfileId,
  onBackToSpaces
}) => {
  const [groups, setGroups] = useState<OmniGroup[]>(() => engine.getOmniGroups());
  const [selectedGroupId, setSelectedGroupId] = useState<string>(() => groups[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Group Form State
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newGroupType, setNewGroupType] = useState<OmniGroupType>('public');
  const [newCategory, setNewCategory] = useState<OmniGroupCategory>('work_team');
  const [newPrice, setNewPrice] = useState<number>(0);

  const activeGroup = groups.find(g => g.id === selectedGroupId) || groups[0];

  const refreshGroups = () => {
    setGroups(engine.getOmniGroups());
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    engine.createOmniGroup({
      name: newName.trim(),
      description: newDescription.trim(),
      privacy: newGroupType,
      category: newCategory,
      avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300',
      bannerUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200',
      creatorProfileId: currentProfileId,
      moderatorProfileIds: [currentProfileId],
      memberProfileIds: [currentProfileId],
      monthlyFeeUsd: newGroupType === 'paid' ? newPrice : undefined,
      rules: ['Respect confidentiality', 'Stay on-topic and constructive', 'No spam']
    });

    setNewName('');
    setNewDescription('');
    setShowCreateModal(false);
    refreshGroups();
  };

  const handleJoinGroup = (groupId: string) => {
    engine.joinOmniGroup(groupId, currentProfileId);
    refreshGroups();
  };

  const filteredGroups = groups.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || g.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="omni-groups-manager" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 backdrop-blur-md shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={onBackToSpaces}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                ← Back to OMNI Spaces Hub
              </button>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-indigo-400" />
              <span>Special Purpose Groups & Circles</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Organize close-knit circles for families, enterprise work squads, private study clubs, paid mastermind syndicates, and faith fellowships.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2 self-start cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Group</span>
          </button>
        </div>

        {/* Search & Category Tabs */}
        <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-slate-800/80">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search groups by keyword or team..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            {['all', 'work_team', 'study_circle', 'family', 'faith_fellowship', 'project', 'hobby'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map(group => {
          const isMember = (group.memberProfileIds || []).includes(currentProfileId);
          return (
            <div
              key={group.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-32 w-full bg-slate-950">
                  <img src={group.bannerUrl || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200'} alt={group.name} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 ${
                      group.privacy === 'public' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      group.privacy === 'private' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                      group.privacy === 'secret' ? 'bg-slate-800/80 text-slate-300 border border-slate-700' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {group.privacy === 'public' && <Globe className="w-3 h-3" />}
                      {group.privacy === 'private' && <Lock className="w-3 h-3" />}
                      {group.privacy === 'secret' && <EyeOff className="w-3 h-3" />}
                      {group.privacy === 'paid' && <DollarSign className="w-3 h-3" />}
                      <span>{group.privacy}</span>
                    </span>
                  </div>
                  <img
                    src={group.avatarUrl}
                    alt={group.name}
                    className="absolute -bottom-4 left-5 w-14 h-14 rounded-2xl object-cover border-2 border-slate-900 shadow-lg"
                  />
                </div>

                <div className="p-6 pt-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 font-mono tracking-wider">
                      {group.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{group.membersCount || (group.memberProfileIds?.length ?? 1)} Members</span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{group.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{group.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  {group.privacy === 'paid' ? (
                    <div className="text-amber-400 font-bold">${group.monthlyFeeUsd || 29}/month</div>
                  ) : (
                    <span className="text-slate-400">{group.recentPostsCount || 0} Discussions logged</span>
                  )}

                  {isMember ? (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg font-bold text-xs flex items-center gap-1 border border-emerald-500/30">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Member</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      {group.privacy === 'paid' ? 'Subscribe' : 'Join Circle'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE GROUP MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-xl w-full space-y-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Create New Sovereign Group</h3>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Group Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Distributed Core Architects"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="What is the purpose of this group?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Group Privacy Type</label>
                  <select
                    value={newGroupType}
                    onChange={e => setNewGroupType(e.target.value as OmniGroupType)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="public">Public (Open)</option>
                    <option value="private">Private (Approval Required)</option>
                    <option value="secret">Secret (Hidden / Invitation Only)</option>
                    <option value="paid">Paid (Subscription Paywall)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as OmniGroupCategory)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="work_team">Work Team / Enterprise Squad</option>
                    <option value="study_circle">Study Circle / Learning</option>
                    <option value="family">Family Circle</option>
                    <option value="faith_fellowship">Faith Fellowship</option>
                    <option value="project">Special Project</option>
                    <option value="hobby">Hobby & Recreation</option>
                  </select>
                </div>
              </div>

              {newGroupType === 'paid' && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Monthly Subscription Price (USD)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    min={1}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Launch Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
