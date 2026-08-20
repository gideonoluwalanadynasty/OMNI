import React, { useState } from 'react';
import {
  DollarSign,
  Award,
  Users,
  GraduationCap,
  Package,
  Calendar,
  Radio,
  Share2,
  Lock,
  Plus,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Zap,
  Tag
} from 'lucide-react';
import {
  CreatorSubscriptionTier,
  CreatorCourse,
  CreatorDigitalProduct,
  CreatorConsultingSlot
} from '../../../types/omni_creator';

interface Props {
  subscriptionTiers: CreatorSubscriptionTier[];
  courses: CreatorCourse[];
  digitalProducts: CreatorDigitalProduct[];
  consultingSlots: CreatorConsultingSlot[];
  onCreateCourse: (course: CreatorCourse) => void;
  onCreateProduct: (prod: CreatorDigitalProduct) => void;
  onCreateTier: (tier: CreatorSubscriptionTier) => void;
}

export const OmniCreatorMonetizationView: React.FC<Props> = ({
  subscriptionTiers,
  courses,
  digitalProducts,
  consultingSlots,
  onCreateCourse,
  onCreateProduct,
  onCreateTier
}) => {
  const [activeTab, setActiveTab] = useState<'tiers' | 'courses' | 'products' | 'consulting'>('tiers');
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(49);
  const [newProdFormat, setNewProdFormat] = useState<'PDF' | 'ZIP' | 'CODE_BUNDLE' | 'TEMPLATE'>('CODE_BUNDLE');

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdTitle.trim()) return;

    const newProd: CreatorDigitalProduct = {
      id: `prod-${Date.now()}`,
      creatorId: 'prof-001',
      title: newProdTitle.trim(),
      description: 'Production-ready sovereign digital asset created in OMNI Studio.',
      coverImageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
      fileFormat: newProdFormat,
      fileSizeBytes: 24000000,
      downloadUrl: 'https://omni-cdn.network/products/download.zip',
      priceUsd: Number(newProdPrice),
      salesCount: 0,
      totalRevenueUsd: 0,
      rating: 5.0,
      tags: ['Sovereign', 'Asset', 'OMNI']
    };

    onCreateProduct(newProd);
    setIsNewProductModalOpen(false);
    setNewProdTitle('');
  };

  const totalCourseRev = courses.reduce((acc, c) => acc + c.totalRevenueUsd, 0);
  const totalProductRev = digitalProducts.reduce((acc, p) => acc + p.totalRevenueUsd, 0);
  const totalSubscriptionRev = subscriptionTiers.reduce((acc, t) => acc + t.monthlyRevenueUsd * 12, 0);
  const totalConsultingRev = consultingSlots.reduce((acc, s) => acc + s.totalRevenueUsd, 0);

  return (
    <div id="omni-creator-monetization-view" className="space-y-6">
      {/* Monetization Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              9-STREAM MONETIZATION ENGINE
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              DIRECT SETTLEMENT
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Creator Monetization & Commercial Catalogues
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Configure subscriber tier pricing, launch interactive masterclasses, sell digital code bundles, and accept high-ticket consulting bookings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewProductModalOpen(true)}
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Digital Product</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400">Patron Memberships (ARR)</span>
          <div className="text-2xl font-bold text-white">${totalSubscriptionRev.toLocaleString()}</div>
          <div className="text-xs text-indigo-400 font-semibold">{subscriptionTiers.reduce((a, b) => a + b.activeSubscribersCount, 0)} Active Patrons</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400">Masterclass Sales</span>
          <div className="text-2xl font-bold text-white">${totalCourseRev.toLocaleString()}</div>
          <div className="text-xs text-purple-400 font-semibold">{courses.reduce((a, b) => a + b.enrolledStudentsCount, 0)} Students Enrolled</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400">Digital Asset Downloads</span>
          <div className="text-2xl font-bold text-white">${totalProductRev.toLocaleString()}</div>
          <div className="text-xs text-teal-400 font-semibold">{digitalProducts.reduce((a, b) => a + b.salesCount, 0)} Units Sold</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400">1-on-1 Consulting Revenue</span>
          <div className="text-2xl font-bold text-emerald-400">${totalConsultingRev.toLocaleString()}</div>
          <div className="text-xs text-slate-400">{consultingSlots.reduce((a, b) => a + b.bookedSlotsCount, 0)} Completed Sessions</div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'tiers' as const, label: 'Fan Subscription Tiers', icon: Award, count: subscriptionTiers.length },
            { id: 'courses' as const, label: 'Courses & Masterclasses', icon: GraduationCap, count: courses.length },
            { id: 'products' as const, label: 'Digital Products', icon: Package, count: digitalProducts.length },
            { id: 'consulting' as const, label: 'Consulting Slots', icon: Users, count: consultingSlots.length }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950 font-mono">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Subscription Tiers */}
        {activeTab === 'tiers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionTiers.map(tier => (
              <div
                key={tier.id}
                className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5 flex flex-col justify-between hover:border-emerald-500/40 transition shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{tier.badgeIcon}</span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300">
                      {tier.activeSubscribersCount} Active Patrons
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white">{tier.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{tier.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white font-mono">${tier.priceMonthlyUsd}</span>
                    <span className="text-xs text-slate-400">/ month</span>
                    <span className="text-xs text-emerald-400 font-mono ml-2">(${tier.priceAnnualUsd}/yr)</span>
                  </div>

                  {/* Perks list */}
                  <div className="space-y-2 pt-3 border-t border-slate-800">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Perks Included:</span>
                    {tier.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Monthly Run Rate:</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">${tier.monthlyRevenueUsd.toLocaleString()}/mo</span>
                  </div>
                  <button className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold">
                    Edit Tier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Courses */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div
                key={course.id}
                className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div>
                  <img src={course.thumbnailUrl} alt={course.title} className="w-full h-44 object-cover" />
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                        {course.level} Masterclass
                      </span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">${course.priceUsd}</span>
                    </div>

                    <h4 className="text-base font-bold text-white">{course.title}</h4>
                    <p className="text-xs text-slate-300 line-clamp-2">{course.description}</p>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                      <span>{course.chaptersCount} Chapters • {course.totalDurationHours} hrs</span>
                      <span className="text-amber-400 font-bold">★ {course.ratingAverage} ({course.reviewsCount} reviews)</span>
                    </div>

                    {/* Chapters List */}
                    <div className="space-y-1.5 pt-2">
                      {course.chapters.slice(0, 3).map(ch => (
                        <div key={ch.id} className="p-2 bg-slate-900 rounded-xl text-xs flex items-center justify-between">
                          <span className="text-slate-300 truncate">{ch.title}</span>
                          <span className="text-slate-500 font-mono text-[10px]">{ch.durationMinutes}m</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Course Revenue</span>
                    <span className="text-base font-bold text-emerald-400 font-mono">${course.totalRevenueUsd.toLocaleString()}</span>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">
                    Manage Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Digital Products */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {digitalProducts.map(prod => (
              <div
                key={prod.id}
                className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-4 flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-3">
                  <img src={prod.coverImageUrl} alt={prod.title} className="w-full h-36 object-cover rounded-2xl" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
                      {prod.fileFormat}
                    </span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">${prod.priceUsd}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{prod.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2">{prod.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{prod.salesCount} Downloads</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">${prod.totalRevenueUsd.toLocaleString()}</span>
                  </div>
                  <button className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold">
                    Edit Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Consulting */}
        {activeTab === 'consulting' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consultingSlots.map(slot => (
              <div
                key={slot.id}
                className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 font-mono">
                      {slot.durationMinutes} Minutes 1-on-1 Session
                    </span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">${slot.priceUsd}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{slot.title}</h4>
                  <p className="text-xs text-slate-300">{slot.description}</p>
                  
                  <div className="text-xs text-slate-400">
                    <span className="font-bold text-slate-300">Available Days: </span>
                    {slot.availableDays.join(', ')}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Sessions Booked: {slot.bookedSlotsCount}</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">${slot.totalRevenueUsd.toLocaleString()} Earned</span>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold">
                    Manage Availability
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Create New Digital Product</h3>
            <form onSubmit={handleCreateProductSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProdTitle}
                  onChange={e => setNewProdTitle(e.target.value)}
                  placeholder="e.g. Masterclass Terraform Bundle"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Price (USD)</label>
                  <input
                    type="number"
                    min="1"
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">File Format</label>
                  <select
                    value={newProdFormat}
                    onChange={e => setNewProdFormat(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="CODE_BUNDLE">CODE_BUNDLE (ZIP)</option>
                    <option value="PDF">PDF E-Book</option>
                    <option value="TEMPLATE">Template / Notion</option>
                    <option value="ZIP">Archive (ZIP)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
