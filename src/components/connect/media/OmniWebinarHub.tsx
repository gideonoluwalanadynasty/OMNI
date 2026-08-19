import React, { useState } from 'react';
import {
  Radio,
  Users,
  MessageSquare,
  ThumbsUp,
  BarChart3,
  Calendar,
  Clock,
  Ticket,
  Sparkles,
  CheckCircle2,
  Share2,
  ExternalLink,
  Shield,
  HelpCircle,
  Video,
  Send,
  Plus
} from 'lucide-react';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';
import { OmniWebinarSession } from '../../../types/omni_media_meetings';

interface Props {
  engine: OmniConnectEngine;
  currentProfileId: string;
}

export const OmniWebinarHub: React.FC<Props> = ({ engine, currentProfileId }) => {
  const webinars = engine.getWebinars();
  const [selectedWebinarId, setSelectedWebinarId] = useState<string>(webinars[0]?.id || 'webinar_global_dev_2026');
  const [activeTab, setActiveTab] = useState<'qa' | 'polls' | 'speakers' | 'register'>('qa');
  const [questionText, setQuestionText] = useState('');
  const [hasRegistered, setHasRegistered] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState<'free' | 'vip' | 'enterprise'>('vip');

  const webinar = engine.getWebinar(selectedWebinarId) || webinars[0];

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !webinar) return;
    engine.askWebinarQuestion(
      webinar.id,
      currentProfileId,
      'Gideon Sovereign',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      questionText.trim()
    );
    setQuestionText('');
    setSelectedWebinarId(webinar.id); // re-trigger render
  };

  const handleUpvote = (questionId: string) => {
    if (webinar) {
      engine.upvoteWebinarQuestion(webinar.id, questionId, currentProfileId);
      setSelectedWebinarId(webinar.id);
    }
  };

  const handleVotePoll = (pollId: string, optionId: string) => {
    if (webinar) {
      engine.voteInWebinarPoll(webinar.id, pollId, optionId, currentProfileId);
      setSelectedWebinarId(webinar.id);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (webinar) {
      engine.registerForWebinar(
        webinar.id,
        currentProfileId,
        'Gideon Sovereign',
        'gideon@omni.network',
        selectedTicketType
      );
      setHasRegistered(true);
      setSelectedWebinarId(webinar.id);
    }
  };

  if (!webinar) return null;

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-900/90 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">OMNI Global Webinars & Townhalls</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                <Radio className="w-2.5 h-2.5" /> LIVE BROADCAST
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Ultra-Low Latency RTMP/HLS Broadcast • 10,000+ Capacity • Interactive Real-time Q&A
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>
              <strong className="text-white">{webinar.liveAudienceCount.toLocaleString()}</strong> Live Viewers / {webinar.maxAudienceCapacity.toLocaleString()} Max
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Body: Video Stream & Interactive Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Broadcast Screen & Key Details */}
        <div className="flex-1 flex flex-col overflow-y-auto p-4 lg:p-6 space-y-4">
          {/* Live Video Broadcast Player */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col justify-between p-6 group">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200"
              alt={webinar.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Top Player Badges */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-600/40 animate-pulse">
                  <Radio className="w-3.5 h-3.5" /> LIVE
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs font-mono border border-slate-700">
                  4K UHD 60fps • 48kHz Audio
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-emerald-400 text-xs font-semibold border border-slate-700 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Verified Broadcast
              </span>
            </div>

            {/* Bottom Player Overlay Info */}
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Keynote Presentation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {webinar.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl line-clamp-2">
                {webinar.description}
              </p>
            </div>
          </div>

          {/* Keynote Speakers Banner */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Featured Speakers & Panellists
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(webinar.speakers || []).map(spk => (
                <div
                  key={spk.profileId}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80"
                >
                  <img
                    src={spk.avatarUrl}
                    alt={spk.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-indigo-500/40"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {spk.name}
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-indigo-500/30 text-indigo-300 font-semibold uppercase">
                        {spk.role}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400">{spk.title} • {spk.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive Audience Panel (Q&A, Live Polls, Tickets) */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/80 flex flex-col shrink-0">
          {/* Panel Selector Tabs */}
          <div className="flex items-center border-b border-slate-800 bg-slate-900/90 px-3 py-2 gap-1">
            {[
              { id: 'qa', label: 'Live Q&A', icon: HelpCircle },
              { id: 'polls', label: 'Audience Polls', icon: BarChart3 },
              { id: 'register', label: 'Tickets & Access', icon: Ticket }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: Live Q&A with Upvoting */}
          {activeTab === 'qa' && (
            <div className="flex-1 flex flex-col p-4 overflow-hidden space-y-3">
              {/* Question Input */}
              <form onSubmit={handleAskQuestion} className="flex items-center gap-2">
                <input
                  type="text"
                  value={questionText}
                  onChange={e => setQuestionText(e.target.value)}
                  placeholder="Ask a question to the speakers..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Scrollable Questions List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {(webinar.qaItems || []).map(qa => (
                  <div
                    key={qa.id}
                    className={`bg-slate-950 border rounded-2xl p-3.5 space-y-2 transition-all ${
                      qa.isAnswered ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={qa.authorAvatar}
                          alt={qa.authorName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-200">{qa.authorName}</div>
                          <div className="text-[10px] text-slate-500">{qa.timestamp}</div>
                        </div>
                      </div>

                      {/* Upvote Button */}
                      <button
                        onClick={() => handleUpvote(qa.id)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-colors ${
                          (qa.upvotedByProfileIds || []).includes(currentProfileId)
                            ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{qa.upvotes}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">{qa.questionText}</p>

                    {qa.isAnswered && (
                      <div className="pt-2 border-t border-slate-800/80 bg-slate-900/50 -mx-3.5 -mb-3.5 p-3 rounded-b-2xl">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 mb-1">
                          <CheckCircle2 className="w-3 h-3" /> Answered live by {qa.answeredByName}
                        </div>
                        <p className="text-xs text-slate-300 italic">{qa.answerText}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Audience Polls */}
          {activeTab === 'polls' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {(webinar.polls || []).map(poll => (
                <div
                  key={poll.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      LIVE POLL
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {poll.totalVotes} Total Votes
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white leading-relaxed">
                    {poll.question}
                  </h4>

                  <div className="space-y-2">
                    {(poll.options || []).map(opt => {
                      const percentage =
                        poll.totalVotes > 0
                          ? Math.round((opt.voteCount / poll.totalVotes) * 100)
                          : 0;

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleVotePoll(poll.id, opt.id)}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 relative overflow-hidden transition-all group"
                        >
                          {/* Progress fill */}
                          <div
                            className="absolute inset-0 bg-indigo-600/20 group-hover:bg-indigo-600/30 transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                          <div className="relative z-10 flex items-center justify-between text-xs">
                            <span className="font-medium text-slate-200">{opt.text}</span>
                            <span className="font-bold text-indigo-400 font-mono">
                              {percentage}% ({opt.voteCount})
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Ticket Registration */}
          {activeTab === 'register' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-indigo-400" /> Webinar Pass & Ticket Tiers
                </h4>

                {hasRegistered ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h5 className="text-sm font-bold text-emerald-300">Registration Confirmed!</h5>
                    <p className="text-xs text-slate-300">
                      Your VIP pass is stored in your OMNI Identity & calendar.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3">
                    <div className="space-y-2">
                      {[
                        { id: 'free', name: 'General Free Pass', price: '$0 USD', desc: 'Standard 1080p stream + live chat' },
                        { id: 'vip', name: 'VIP Pass (Backstage Q&A)', price: '$149 USD', desc: '4K Ultra stream + priority live voice Q&A' },
                        { id: 'enterprise', name: 'Enterprise Delegation (5 Seats)', price: '$499 USD', desc: 'Full cloud recordings archive & AI summary' }
                      ].map(ticket => (
                        <div
                          key={ticket.id}
                          onClick={() => setSelectedTicketType(ticket.id as any)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedTicketType === ticket.id
                              ? 'bg-indigo-600/20 border-indigo-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{ticket.name}</span>
                            <span className="text-xs font-bold text-emerald-400">{ticket.price}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">{ticket.desc}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4" /> 1-Click Register with OMNI Passport
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
