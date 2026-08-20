import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Star,
  ShieldCheck,
  Clock,
  DollarSign,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  BookOpen,
  ShoppingBag,
  UserCheck,
  CheckCircle2,
  Navigation,
  Sparkles,
  Calendar,
  Filter
} from 'lucide-react';
import { OmniBusinessDiscoveryCard } from '../../../types/omni_discovery';
import { SEED_BUSINESS_DISCOVERY } from './discoveryData';

interface OmniBusinessDiscoveryProps {
  onSelectBusiness?: (biz: OmniBusinessDiscoveryCard) => void;
}

export const OmniBusinessDiscovery: React.FC<OmniBusinessDiscoveryProps> = ({ onSelectBusiness }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'local_business' | 'service' | 'store' | 'professional' | 'course_provider'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [bookingModalBiz, setBookingModalBiz] = useState<OmniBusinessDiscoveryCard | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Business Categories' },
    { id: 'local_business', label: 'Local Businesses & Cafes' },
    { id: 'service', label: 'Verified Services & Audits' },
    { id: 'professional', label: 'Independent Experts & Mentors' },
    { id: 'course_provider', label: 'Accredited Course Providers' }
  ];

  const filteredBusinesses = SEED_BUSINESS_DISCOVERY.filter(biz => {
    if (activeTab !== 'all' && biz.type !== activeTab) return false;
    if (selectedLocation !== 'all' && !biz.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
    return true;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalBiz) return;
    setBookingSuccess(`Inquiry & consultation request dispatched to ${bookingModalBiz.name}. Escrow reservation created.`);
    setTimeout(() => {
      setBookingSuccess(null);
      setBookingModalBiz(null);
    }, 3000);
  };

  return (
    <div className="space-y-6" id="omni-business-discovery-container">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Business & Merchant Mesh
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300">
                Escrow Protected Direct Commerce
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">OMNI Business Discovery & Professional Directory</h2>
            <p className="text-xs text-slate-400">
              Discover verified local storefronts, professional consultants, cybersecurity auditors, and accredited course providers.
            </p>
          </div>

          {/* Quick Location Radius Filter */}
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-2xl border border-slate-800">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="all">Global (All Locations)</option>
              <option value="San Francisco">San Francisco, CA (&lt;10km)</option>
              <option value="London">London, UK (&lt;10km)</option>
              <option value="Zurich">Zurich, Switzerland</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Modal Notice */}
      {bookingSuccess && (
        <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-semibold px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          {bookingSuccess}
        </div>
      )}

      {/* Business Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="business-discovery-cards-grid">
        {filteredBusinesses.map(biz => (
          <div
            key={biz.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-all group space-y-4"
          >
            {/* Header & Badges */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={biz.avatarUrl}
                    alt={biz.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {biz.name}
                      </h3>
                      {biz.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" title="KYB Verified" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-medium">{biz.category}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {biz.rating} ({biz.reviewCount})
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {biz.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {biz.isOpenNow ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Open Now
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400">
                      Closed
                    </span>
                  )}
                  {biz.distanceKm > 0 && (
                    <span className="block text-[10px] text-slate-400 font-mono mt-1">
                      {biz.distanceKm} km away
                    </span>
                  )}
                </div>
              </div>

              {/* Tagline & Description */}
              <p className="text-xs font-semibold text-emerald-300/90">{biz.tagline}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{biz.description}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                {biz.badges.map(b => (
                  <span key={b} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 font-medium">
                    {b}
                  </span>
                ))}
              </div>

              {/* Services or Offerings */}
              {biz.servicesOffered && biz.servicesOffered.length > 0 && (
                <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Services & Specialties</span>
                  <div className="flex flex-wrap gap-2">
                    {biz.servicesOffered.map(s => (
                      <span key={s} className="text-[11px] text-slate-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price & Action Section */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">Pricing Estimate</span>
                <span className="text-sm font-bold text-white text-emerald-400">
                  {biz.priceEstimate || 'Contact for Quote'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBookingModalBiz(biz)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book / Inquire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking & Consultation Inquiry Modal */}
      {bookingModalBiz && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Direct Business Inquiry</h3>
              </div>
              <button
                onClick={() => setBookingModalBiz(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <img src={bookingModalBiz.avatarUrl} alt={bookingModalBiz.name} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <h4 className="text-sm font-bold text-white">{bookingModalBiz.name}</h4>
                <p className="text-xs text-slate-400">{bookingModalBiz.category} • {bookingModalBiz.priceEstimate}</p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Service / Consultation Required</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500">
                  {bookingModalBiz.servicesOffered.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="custom">Custom Enterprise Scoping</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Project Scope / Timeline</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your requirements, preferred timeframe, and target outcomes..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500"
                ></textarea>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-[11px] text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Protected by OMNI Finance Escrow. Funds are only released upon milestone verification.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingModalBiz(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
                >
                  Confirm & Dispatch Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
