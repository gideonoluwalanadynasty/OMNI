import React, { useState } from 'react';
import {
  Compass,
  Search,
  Star,
  Users,
  Award,
  DollarSign,
  GraduationCap,
  Package,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Filter,
  ArrowUpRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { CreatorMarketplaceProfile } from '../../../types/omni_creator';

interface Props {
  creators: CreatorMarketplaceProfile[];
  onOpenConsultingModal: (creator: CreatorMarketplaceProfile) => void;
  onOpenDirectChat?: (creatorId: string, creatorName: string) => void;
}

export const OmniCreatorMarketplaceView: React.FC<Props> = ({
  creators,
  onOpenConsultingModal,
  onOpenDirectChat
}) => {
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedCreator, setBookedCreator] = useState<CreatorMarketplaceProfile | null>(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');

  const niches = [
    'all',
    'AI & Engineering',
    'Finance & Web3',
    'Design & Creative',
    'Faith & Leadership',
    'Business & Marketing'
  ];

  const filteredCreators = creators.filter(c => {
    const matchesNiche = selectedNiche === 'all' || c.niche === selectedNiche;
    const matchesSearch =
      c.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.badges.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesNiche && matchesSearch;
  });

  const handleBookSession = (c: CreatorMarketplaceProfile) => {
    setBookedCreator(c);
    setBookingSuccessMsg(`Consultation booked with ${c.displayName} at $${c.hourlyConsultingRateUsd}/hr! Session details sent to your OMNI Calendar & Inbox.`);
    setTimeout(() => setBookingSuccessMsg(''), 6000);
  };

  return (
    <div id="omni-creator-marketplace-view" className="space-y-6">
      {/* Marketplace Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              OMNI CREATOR DISCOVERY MARKETPLACE
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              GLOBAL EXPERT ROSTER
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Discover Verified Experts, Teachers & Creators
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Connect directly with verified software architects, quantitative traders, design leaders, and spiritual fellowship mentors. Book 1-on-1 advisory or enroll in exclusive masterclasses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search experts, topics, badges..."
              className="bg-slate-950 border border-slate-800 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 w-64"
            />
          </div>
        </div>
      </div>

      {bookingSuccessMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-300 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{bookingSuccessMsg}</span>
        </div>
      )}

      {/* Niche Categories Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {niches.map(niche => (
          <button
            key={niche}
            onClick={() => setSelectedNiche(niche)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedNiche === niche
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {niche === 'all' ? 'All Niches' : niche}
          </button>
        ))}
      </div>

      {/* Creator Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredCreators.map(creator => (
          <div
            key={creator.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden shadow-xl transition flex flex-col justify-between"
          >
            <div>
              {/* Profile Cover Banner */}
              <div className="relative h-32 bg-slate-950 overflow-hidden">
                <img
                  src={creator.bannerUrl}
                  alt={creator.displayName}
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {creator.verificationLevel.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6 pt-0 space-y-4">
                <div className="flex items-start justify-between -mt-10 mb-2">
                  <img
                    src={creator.avatarUrl}
                    alt={creator.displayName}
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-slate-900 shadow-xl"
                  />
                  <div className="text-right pt-12">
                    <span className="text-xs text-slate-400 block">Consulting Rate</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">
                      ${creator.hourlyConsultingRateUsd}/hr
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{creator.displayName}</h3>
                    <span className="text-xs text-slate-400 font-mono">@{creator.handle}</span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-400 mt-0.5">{creator.headline}</p>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">{creator.bio}</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {creator.badges.map((b, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800 text-center text-xs">
                  <div>
                    <div className="font-bold text-white">{creator.followersCount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">Followers</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">{creator.subscribersCount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">Patrons</div>
                  </div>
                  <div>
                    <div className="font-bold text-amber-400 flex items-center justify-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {creator.rating}
                    </div>
                    <div className="text-[10px] text-slate-400">({creator.reviewsCount} reviews)</div>
                  </div>
                </div>

                {/* Featured Products/Courses */}
                {creator.featuredCourseTitle && (
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="text-slate-300 truncate font-semibold">{creator.featuredCourseTitle}</span>
                    </div>
                    <span className="text-[10px] text-purple-400 font-bold uppercase shrink-0">Masterclass</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-6 pt-0 flex items-center justify-between gap-3">
              {onOpenDirectChat && (
                <button
                  onClick={() => onOpenDirectChat(creator.profileId, creator.displayName)}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                  title="Send Direct Message"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => handleBookSession(creator)}
                className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Advisory Session (${creator.hourlyConsultingRateUsd}/hr)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
