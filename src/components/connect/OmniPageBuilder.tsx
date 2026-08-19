import React, { useState } from 'react';
import {
  Layers,
  Layout,
  Globe,
  ExternalLink,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  Sparkles,
  Sliders,
  Palette,
  Check,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Save,
  Send,
  ShoppingBag,
  Calendar,
  Heart,
  MessageSquare,
  BookOpen,
  DollarSign,
  Phone,
  Mail,
  Share2,
  Star,
  Building,
  GraduationCap
} from 'lucide-react';
import {
  OmniPageConfig,
  PageTemplateCategory,
  PageSectionType,
  PageSectionConfig,
  UniversalOmniProfile
} from '../../types/omni_identity';
import { SEED_PAGE_TEMPLATES } from '../../data/omni_identity_seed';

interface OmniPageBuilderProps {
  pageConfig: OmniPageConfig;
  activeProfile: UniversalOmniProfile;
  onUpdatePage: (pageId: string, updates: Partial<OmniPageConfig>) => void;
  onPublishPage: (pageId: string, isPublished: boolean) => void;
}

export const OmniPageBuilder: React.FC<OmniPageBuilderProps> = ({
  pageConfig,
  activeProfile,
  onUpdatePage,
  onPublishPage
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'builder' | 'templates' | 'theme' | 'seo'>('builder');
  const [sections, setSections] = useState<PageSectionConfig[]>(pageConfig.sections);
  const [siteTitle, setSiteTitle] = useState(pageConfig.siteTitle);
  const [tagline, setTagline] = useState(pageConfig.tagline);
  const [primaryColor, setPrimaryColor] = useState(pageConfig.theme.primaryColor);
  const [bannerVariant, setBannerVariant] = useState(pageConfig.theme.heroBannerVariant);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Toggle section visibility
  const handleToggleSection = (sectionId: string) => {
    const updated = sections.map(sec =>
      sec.id === sectionId ? { ...sec, isVisible: !sec.isVisible } : sec
    );
    setSections(updated);
    onUpdatePage(pageConfig.id, { sections: updated });
  };

  // Reorder sections
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    setSections(updated);
    onUpdatePage(pageConfig.id, { sections: updated });
  };

  // Switch Template
  const handleSelectTemplate = (category: PageTemplateCategory) => {
    const tmpl = SEED_PAGE_TEMPLATES.find(t => t.category === category);
    if (!tmpl) return;

    const newSections: PageSectionConfig[] = tmpl.defaultSections.map((secType, idx) => ({
      id: `sec_${secType}`,
      type: secType,
      title: secType.charAt(0).toUpperCase() + secType.slice(1),
      isVisible: true,
      order: idx + 1
    }));

    setSections(newSections);
    setPrimaryColor(tmpl.defaultPrimaryColor);
    onUpdatePage(pageConfig.id, {
      templateCategory: category,
      sections: newSections,
      theme: {
        ...pageConfig.theme,
        primaryColor: tmpl.defaultPrimaryColor,
        accentColor: tmpl.defaultAccentColor
      }
    });
  };

  // Save changes
  const handleSavePage = () => {
    onUpdatePage(pageConfig.id, {
      siteTitle,
      tagline,
      sections,
      theme: {
        ...pageConfig.theme,
        primaryColor,
        heroBannerVariant: bannerVariant
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Publishing Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              OMNI PAGES ENGINE
            </span>
            {pageConfig.isPublished ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                LIVE & PUBLISHED
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                DRAFT
              </span>
            )}
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white">
            Omni Page Builder — Turn Profile into a Sovereign Website
          </h2>
          <p className="text-xs text-slate-400">
            Publishing live to: <strong className="text-indigo-400 font-mono">{pageConfig.publishedUrl}</strong>
            {pageConfig.customDomain && <span> / <strong className="text-amber-400 font-mono">https://{pageConfig.customDomain}</strong></span>}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onPublishPage(pageConfig.id, !pageConfig.isPublished)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              pageConfig.isPublished
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 hover:bg-amber-600/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{pageConfig.isPublished ? 'Unpublish Website' : 'Publish Live Website'}</span>
          </button>

          <button
            onClick={handleSavePage}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Omni Page updated and deployed to edge nodes successfully!</span>
        </div>
      )}

      {/* Editor & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Builder Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Subtabs Bar */}
          <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab('builder')}
              className={`flex-1 py-2 rounded-xl font-bold transition-colors text-center ${
                activeTab === 'builder' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sections
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-2 rounded-xl font-bold transition-colors text-center ${
                activeTab === 'templates' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Templates (9)
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`flex-1 py-2 rounded-xl font-bold transition-colors text-center ${
                activeTab === 'theme' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Theme & Style
            </button>
          </div>

          {/* TAB 1: SECTIONS MANAGER */}
          {activeTab === 'builder' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Website Header Title</label>
                <input
                  type="text"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Tagline / Mission Statement</label>
                <textarea
                  rows={2}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Page Sections (WYSIWYG Reorder)</span>
                  <span className="text-[10px] text-slate-500">{sections.filter(s => s.isVisible).length} Active</span>
                </div>

                <div className="space-y-2">
                  {sections.map((sec, idx) => (
                    <div
                      key={sec.id}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-2 transition-all ${
                        sec.isVisible
                          ? 'bg-slate-950 border-slate-800 text-white'
                          : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={sec.isVisible}
                          onChange={() => handleToggleSection(sec.id)}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                        />
                        <div>
                          <div className="text-xs font-bold capitalize">{sec.title}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{sec.type} section</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveSection(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveSection(idx, 'down')}
                          disabled={idx === sections.length - 1}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEMPLATES SELECTOR (9 ADAPTABLE TEMPLATES) */}
          {activeTab === 'templates' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 max-h-[600px] overflow-y-auto">
              <div className="text-xs font-bold text-slate-300">Choose from 9 Sovereign Templates</div>

              <div className="space-y-3">
                {SEED_PAGE_TEMPLATES.map(tmpl => {
                  const isSelected = pageConfig.templateCategory === tmpl.category;
                  return (
                    <div
                      key={tmpl.category}
                      onClick={() => handleSelectTemplate(tmpl.category)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 shadow-lg'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-900 border border-slate-800 text-indigo-300 rounded">
                          {tmpl.badge}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-indigo-400 font-bold" />}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white">{tmpl.name}</h4>
                        <p className="text-[11px] text-slate-400 leading-snug">{tmpl.description}</p>
                      </div>

                      <div className="text-[10px] text-slate-500">
                        Default Sections: <span className="text-slate-300 capitalize">{tmpl.defaultSections.join(', ')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: THEME & STYLE */}
          {activeTab === 'theme' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 text-xs">
              <div className="space-y-2">
                <label className="text-slate-300 font-bold">Primary Brand Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 font-bold">Hero Banner Layout Style</label>
                <select
                  value={bannerVariant}
                  onChange={(e) => setBannerVariant(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                >
                  <option value="gradient_minimal">Minimalist Gradient with Display Typography</option>
                  <option value="split_showcase">Split Column with Callout Cards</option>
                  <option value="full_cover">Full Bleed Cinematic Sanctuary Cover</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Real-Time Device Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {/* Device Switcher Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`p-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  deviceView === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDeviceView('tablet')}
                className={`p-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  deviceView === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`p-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  deviceView === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live WYSIWYG Edge Preview</span>
            </div>
          </div>

          {/* Device Frame Viewport */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 min-h-[600px] flex items-center justify-center overflow-hidden">
            <div
              className={`bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-y-auto transition-all duration-300 max-h-[650px] w-full ${
                deviceView === 'mobile'
                  ? 'max-w-[340px] border-4 border-slate-800'
                  : deviceView === 'tablet'
                  ? 'max-w-[600px]'
                  : 'max-w-full'
              }`}
            >
              {/* Simulated Browser Bar */}
              <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 bg-slate-900 px-3 py-1 rounded-lg text-center truncate text-indigo-300">
                  https://{pageConfig.publishedUrl.replace('https://', '')}
                </div>
              </div>

              {/* Rendered Live Website Content */}
              <div className="divide-y divide-slate-800/80">
                {/* 1. HERO BANNER SECTION */}
                {sections.find(s => s.type === 'home' && s.isVisible) && (
                  <div
                    className="p-6 lg:p-10 space-y-4 text-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(180deg, ${primaryColor}22 0%, #0f172a 100%)`
                    }}
                  >
                    <img
                      src={activeProfile.avatarUrl}
                      alt={activeProfile.displayName}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-white/20 shadow-xl"
                    />
                    <h1 className="text-xl lg:text-3xl font-extrabold text-white leading-tight">
                      {siteTitle}
                    </h1>
                    <p className="text-xs lg:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                      {tagline}
                    </p>
                    <div className="flex justify-center gap-3 pt-2">
                      <button
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Get Started / Connect
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. ABOUT SECTION */}
                {sections.find(s => s.type === 'about' && s.isVisible) && (
                  <div className="p-6 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      About & Mission
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeProfile.bio}
                    </p>
                  </div>
                )}

                {/* 3. SERVICES SECTION */}
                {sections.find(s => s.type === 'services' && s.isVisible) && (
                  <div className="p-6 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-amber-400" />
                      Services & Enterprise Offerings
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(activeProfile.businessData?.services || [
                        { id: '1', title: 'Advisory & Consulting', startingPriceUsd: 2500, description: 'Direct strategic guidance.' },
                        { id: '2', title: 'Architecture Review', startingPriceUsd: 5000, description: 'Full stack security audit.' }
                      ]).map((srv: any) => (
                        <div key={srv.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                          <div className="font-bold text-white">{srv.title}</div>
                          <div className="text-[11px] text-slate-400">{srv.description}</div>
                          <div className="text-indigo-400 font-mono font-bold mt-2">From ${srv.startingPriceUsd}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. DONATIONS & TITHES SECTION */}
                {sections.find(s => s.type === 'donations' && s.isVisible) && (
                  <div className="p-6 space-y-3 bg-emerald-950/20">
                    <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Missions, Tithes & Humanitarian Giving
                    </h3>
                    <p className="text-xs text-slate-300">
                      Direct transparent giving powered by OMNI Finance OS multi-currency ledger with zero platform fees.
                    </p>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg">
                      Give Instant Tithe / Donation
                    </button>
                  </div>
                )}

                {/* 5. CONTACT SECTION */}
                {sections.find(s => s.type === 'contact' && s.isVisible) && (
                  <div className="p-6 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Mail className="w-4 h-4 text-indigo-400" />
                      Contact & Inquiries
                    </h3>
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
                      <div>Official Email: <span className="text-white font-mono">contact@{activeProfile.username}.omni.com</span></div>
                      <div>Universal Handle: <span className="text-indigo-400 font-mono font-bold">@{activeProfile.username}</span></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
