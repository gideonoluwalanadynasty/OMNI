import React, { useState } from 'react';
import {
  Users,
  Lock,
  EyeOff,
  DollarSign,
  Building,
  Plus,
  Send,
  FileText,
  HelpCircle,
  Calendar,
  Bell,
  Shield,
  ThumbsUp,
  MessageSquare,
  CheckCircle2,
  Share2,
  Vote,
  Sparkles,
  Download,
  Clock
} from 'lucide-react';
import { OmniGroup, OmniGroupType, OmniGroupPost } from '../../../types/omni_spaces';
import { SEED_OMNI_GROUPS } from '../../../data/omni_spaces_seed';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  groups?: OmniGroup[];
  activeProfile: ConnectProfile;
}

export const OmniGroupsHub: React.FC<Props> = ({
  groups = SEED_OMNI_GROUPS,
  activeProfile
}) => {
  const [allGroups, setAllGroups] = useState<OmniGroup[]>(groups);
  const [selectedGroupId, setSelectedGroupId] = useState<string>(groups[0]?.id || 'grp_public_rust_core');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [joinedGroupIds, setJoinedGroupIds] = useState<string[]>(['grp_public_rust_core', 'grp_org_security_auditors']);

  // Posts State
  const [posts, setPosts] = useState<OmniGroupPost[]>([
    {
      id: 'gp_1',
      groupId: 'grp_public_rust_core',
      authorId: 'prof_usr_001',
      authorName: 'Gideon Oluwalana',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      authorBadge: 'Group Moderator',
      content: '📢 Announcement: The SIMD memory ring buffer benchmark results have been published in the files tab. We achieved 4.2M tx/sec with 0 heap allocation in WASM.',
      poll: {
        question: 'Should we standardize SIMD-128 or AVX-512 for the production crypto-hasher?',
        options: [
          { id: 'opt_1', text: 'SIMD-128 (Universal Web & Mobile support)', votes: 84 },
          { id: 'opt_2', text: 'AVX-512 (Bare-metal Enterprise servers only)', votes: 32 },
          { id: 'opt_3', text: 'Hybrid dynamic feature detection', votes: 142 }
        ],
        totalVotes: 258,
        hasVoted: true
      },
      attachments: [
        { fileName: 'SIMD_Benchmark_Report_v2.pdf', fileSize: '2.4 MB', fileType: 'pdf' }
      ],
      reactionsCount: 94,
      commentsCount: 22,
      isAnnouncement: true,
      isPinned: true,
      createdAt: '2026-08-19T10:00:00Z'
    }
  ]);
  const [postInput, setPostInput] = useState('');
  const [showPollComposer, setShowPollComposer] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  const activeGroup = allGroups.find(g => g.id === selectedGroupId) || allGroups[0];
  const isJoined = joinedGroupIds.includes(activeGroup.id);

  const filteredGroups = allGroups.filter(g => {
    if (selectedTypeFilter === 'all') return true;
    return g.groupType === selectedTypeFilter;
  });

  const groupTypeBadge = (type: OmniGroupType) => {
    switch (type) {
      case 'public_group':
        return { label: 'Public Group', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: Users };
      case 'private_group':
        return { label: 'Private Group', bg: 'bg-slate-500/20 text-slate-300 border-slate-500/30', icon: Lock };
      case 'secret_group':
        return { label: 'Secret Group', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: EyeOff };
      case 'paid_group':
        return { label: 'Paid Group', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: DollarSign };
      case 'organisation_group':
        return { label: 'Org Group', bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', icon: Building };
    }
  };

  const handleJoinToggle = (groupId: string) => {
    if (joinedGroupIds.includes(groupId)) {
      setJoinedGroupIds(prev => prev.filter(id => id !== groupId));
    } else {
      setJoinedGroupIds(prev => [...prev, groupId]);
    }
  };

  const handleCreatePost = () => {
    if (!postInput.trim()) return;
    const newPost: OmniGroupPost = {
      id: `gp_${Date.now()}`,
      groupId: activeGroup.id,
      authorId: activeProfile.id,
      authorName: activeProfile.displayName,
      authorAvatar: activeProfile.avatarUrl,
      content: postInput.trim(),
      reactionsCount: 0,
      commentsCount: 0,
      isAnnouncement: false,
      isPinned: false,
      createdAt: new Date().toISOString()
    };

    if (showPollComposer && pollQuestion.trim() && pollOptions.filter(o => o.trim()).length >= 2) {
      newPost.poll = {
        question: pollQuestion.trim(),
        options: pollOptions.filter(o => o.trim()).map((opt, idx) => ({ id: `opt_${idx}`, text: opt, votes: 0 })),
        totalVotes: 0,
        hasVoted: false
      };
    }

    setPosts(prev => [newPost, ...prev]);
    setPostInput('');
    setShowPollComposer(false);
    setPollQuestion('');
    setPollOptions(['', '']);
  };

  return (
    <div id="omni-groups-hub" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              OMNI GROUP SYSTEM
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              5 GROUP TYPES ACTIVE
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white">
            Sovereign Working Groups, Circles & Squads
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Support for Public, Private, Secret (unlisted), Paid (subscription/one-time), and Organisation groups with rich Posts, Messages, Files, Polls, Events, Announcements, and Moderator Rule Governance.
          </p>
        </div>

        {/* Group Type Selector */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto">
          {[
            { id: 'all', label: 'All Groups' },
            { id: 'public_group', label: 'Public' },
            { id: 'private_group', label: 'Private' },
            { id: 'secret_group', label: 'Secret' },
            { id: 'paid_group', label: 'Paid' },
            { id: 'organisation_group', label: 'Org' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedTypeFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedTypeFilter === f.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Groups Drawer + Active Group Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Groups List (Col 4) */}
        <div className="lg:col-span-4 space-y-3">
          {filteredGroups.map(grp => {
            const isSelected = grp.id === selectedGroupId;
            const meta = groupTypeBadge(grp.groupType);
            const isJoinedThis = joinedGroupIds.includes(grp.id);

            return (
              <div
                key={grp.id}
                onClick={() => setSelectedGroupId(grp.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500/80 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img src={grp.avatarUrl} alt={grp.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-white truncate">{grp.name}</h4>
                      {isJoinedThis && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
                          JOINED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{grp.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center gap-1 ${meta.bg}`}>
                        <meta.icon className="w-3 h-3" />
                        {meta.label}
                      </span>
                      <span className="text-[10px] text-slate-400">👥 {grp.membersCount}</span>
                      {grp.isPaid && (
                        <span className="text-[10px] text-amber-400 font-bold">${grp.membershipFeeUsd}/mo</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Group Container (Col 8) */}
        {activeGroup && (
          <div className="lg:col-span-8 space-y-5">
            {/* Group Banner Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img src={activeGroup.avatarUrl} alt={activeGroup.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{activeGroup.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${groupTypeBadge(activeGroup.groupType).bg}`}>
                        {groupTypeBadge(activeGroup.groupType).label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{activeGroup.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span>👥 {activeGroup.membersCount} members</span>
                      <span>•</span>
                      <span>🛡️ {activeGroup.moderatorsCount} moderators</span>
                      <span>•</span>
                      <span>📁 {activeGroup.filesCount} files</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleJoinToggle(activeGroup.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                    isJoined
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {isJoined ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{isJoined ? 'Member' : 'Join Group'}</span>
                </button>
              </div>

              {/* Group Rules Accordion */}
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-amber-400" />
                  Group Rules & Moderator Directives
                </div>
                <div className="space-y-1">
                  {activeGroup.rules.map((rule, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Post / Poll Composer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <img src={activeProfile.avatarUrl} alt={activeProfile.displayName} className="w-9 h-9 rounded-xl object-cover" />
                <input
                  type="text"
                  value={postInput}
                  onChange={e => setPostInput(e.target.value)}
                  placeholder={`Post message, share file, or launch poll in ${activeGroup.name}...`}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => setShowPollComposer(!showPollComposer)}
                  className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                    showPollComposer ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                  title="Create Poll"
                >
                  <Vote className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post</span>
                </button>
              </div>

              {/* Poll Creation Tray */}
              {showPollComposer && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-indigo-400">Interactive Community Poll</div>
                  <input
                    type="text"
                    value={pollQuestion}
                    onChange={e => setPollQuestion(e.target.value)}
                    placeholder="Poll Question (e.g. Which consensus mechanism should we adopt?)"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500"
                  />
                  {pollOptions.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={opt}
                      onChange={e => {
                        const next = [...pollOptions];
                        next[idx] = e.target.value;
                        setPollOptions(next);
                      }}
                      placeholder={`Option ${idx + 1}`}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500"
                    />
                  ))}
                  <button
                    onClick={() => setPollOptions([...pollOptions, ''])}
                    className="text-[11px] font-bold text-indigo-400 hover:underline"
                  >
                    + Add another option
                  </button>
                </div>
              )}
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.authorAvatar} alt={post.authorName} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{post.authorName}</span>
                          {post.authorBadge && (
                            <span className="px-2 py-0.2 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-300">
                              {post.authorBadge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500">{new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    {post.isAnnouncement && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Bell className="w-3 h-3" />
                        ANNOUNCEMENT
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed">{post.content}</p>

                  {/* Poll Render */}
                  {post.poll && (
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Vote className="w-4 h-4 text-indigo-400" />
                        {post.poll.question}
                      </div>
                      <div className="space-y-1.5">
                        {post.poll.options.map(opt => {
                          const pct = post.poll!.totalVotes > 0 ? Math.round((opt.votes / post.poll!.totalVotes) * 100) : 0;
                          return (
                            <div
                              key={opt.id}
                              className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:border-indigo-500/50"
                            >
                              <div
                                className="absolute left-0 top-0 bottom-0 bg-indigo-600/20 transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                              <span className="relative z-10 text-xs font-medium text-slate-200">{opt.text}</span>
                              <span className="relative z-10 text-xs font-bold text-indigo-400">{pct}% ({opt.votes})</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="text-[10px] text-slate-500">{post.poll.totalVotes} total community votes</div>
                    </div>
                  )}

                  {/* File Attachment */}
                  {post.attachments && post.attachments[0] && (
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <div>
                          <div className="text-xs font-bold text-white">{post.attachments[0].fileName}</div>
                          <div className="text-[10px] text-slate-500">{post.attachments[0].fileSize}</div>
                        </div>
                      </div>
                      <button className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  )}

                  {/* Reaction Bar */}
                  <div className="flex items-center gap-4 pt-2 border-t border-slate-800 text-xs text-slate-400">
                    <button className="flex items-center gap-1.5 hover:text-indigo-400">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.reactionsCount} Likes</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-indigo-400">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.commentsCount} Comments</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-indigo-400 ml-auto">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
