import React, { useState, useEffect } from 'react';
import { 
  OmniPresentation, OmniSlide, OmniSlideTheme, OmniSlideLayout, OmniSlideChartData 
} from '../../../types';
import { SEED_OMNI_PRESENTATIONS, SEED_SLIDE_THEMES } from '../../../ai_store_data';
import { omniAi } from '../../../lib/omniAiSdk';
import { 
  Layers, Plus, Play, Download, Sparkles, MoveUp, MoveDown, 
  Copy, Trash2, Edit3, Palette, Clock, Check, ChevronLeft, 
  ChevronRight, Maximize2, Minimize2, X, RefreshCw, BarChart2, 
  Quote, LayoutGrid, Split, Type, Shield, FileText, ArrowRight,
  TrendingUp, TrendingDown, HelpCircle, Share2
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

interface OmniSlideStudioProps {
  initialPresentationId?: string;
  onOpenDocument?: (docId?: string) => void;
  onOpenSpreadsheet?: (sheetId?: string) => void;
}

export const OmniSlideStudio: React.FC<OmniSlideStudioProps> = ({
  initialPresentationId,
  onOpenDocument,
  onOpenSpreadsheet
}) => {
  const [presentations, setPresentations] = useState<OmniPresentation[]>(SEED_OMNI_PRESENTATIONS);
  const [activePresId, setActivePresId] = useState<string>(initialPresentationId || SEED_OMNI_PRESENTATIONS[0].id);
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [themes] = useState<OmniSlideTheme[]>(SEED_SLIDE_THEMES);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [presentationTimerSeconds, setPresentationTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // AI Presentation Generator Modal State
  const [isAiGenModalOpen, setIsAiGenModalOpen] = useState(false);
  const [genStep, setGenStep] = useState<'prompt' | 'outline' | 'theme' | 'generating'>('prompt');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTargetAudience, setAiTargetAudience] = useState('Enterprise Executive Board');
  const [aiSlideCount, setAiSlideCount] = useState(6);
  const [aiOutline, setAiOutline] = useState<string[]>([
    'Executive Vision & Market Strategy',
    'Core Problem: Fragmented Cloud Silos',
    'OMNI Unified Architecture',
    'Financial Milestones & Unit Economics',
    'Product Suite: Documents, Slides, Sheets',
    'Strategic Expansion Roadmap 2026-2027'
  ]);
  const [selectedThemeId, setSelectedThemeId] = useState('theme_sovereign');
  const [isGenerating, setIsGenerating] = useState(false);

  // Slide Redesign AI State
  const [redesignPrompt, setRedesignPrompt] = useState('');
  const [isRedesigning, setIsRedesigning] = useState(false);

  // Active Presentation & Slide
  const activePres = presentations.find(p => p.id === activePresId) || presentations[0];
  const activeTheme = themes.find(t => t.id === activePres.themeId) || themes[0];
  const currentSlide = activePres.slides[activeSlideIdx] || activePres.slides[0];

  // Timer Effect for Presenter Mode
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setPresentationTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Keyboard navigation in Fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        if (activeSlideIdx < activePres.slides.length - 1) {
          setActiveSlideIdx(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (activeSlideIdx > 0) {
          setActiveSlideIdx(prev => prev - 1);
        }
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
        setIsTimerRunning(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, activeSlideIdx, activePres.slides.length]);

  const updateActivePresentation = (updates: Partial<OmniPresentation>) => {
    setPresentations(prev => prev.map(p => {
      if (p.id === activePres.id) {
        return { ...p, ...updates, updatedAt: new Date().toISOString() };
      }
      return p;
    }));
  };

  const updateCurrentSlide = (updates: Partial<OmniSlide>) => {
    const updatedSlides = [...activePres.slides];
    updatedSlides[activeSlideIdx] = {
      ...updatedSlides[activeSlideIdx],
      ...updates
    };
    updateActivePresentation({ slides: updatedSlides });
  };

  // Reorder / Slide Actions
  const handleMoveSlide = (direction: 'up' | 'down') => {
    if (direction === 'up' && activeSlideIdx === 0) return;
    if (direction === 'down' && activeSlideIdx === activePres.slides.length - 1) return;

    const targetIdx = direction === 'up' ? activeSlideIdx - 1 : activeSlideIdx + 1;
    const slides = [...activePres.slides];
    const [moved] = slides.splice(activeSlideIdx, 1);
    slides.splice(targetIdx, 0, moved);

    // Re-index slide numbers
    const reindexed = slides.map((s, idx) => ({ ...s, slideNumber: idx + 1 }));
    updateActivePresentation({ slides: reindexed });
    setActiveSlideIdx(targetIdx);
  };

  const handleDuplicateSlide = () => {
    const newSlide: OmniSlide = {
      ...JSON.parse(JSON.stringify(currentSlide)),
      id: `slide_${Date.now()}`,
      title: `${currentSlide.title} (Copy)`,
      slideNumber: activeSlideIdx + 2
    };
    const slides = [...activePres.slides];
    slides.splice(activeSlideIdx + 1, 0, newSlide);
    const reindexed = slides.map((s, idx) => ({ ...s, slideNumber: idx + 1 }));
    updateActivePresentation({ slides: reindexed });
    setActiveSlideIdx(activeSlideIdx + 1);
  };

  const handleDeleteSlide = () => {
    if (activePres.slides.length <= 1) {
      alert('A presentation must contain at least one slide.');
      return;
    }
    const slides = activePres.slides.filter((_, idx) => idx !== activeSlideIdx);
    const reindexed = slides.map((s, idx) => ({ ...s, slideNumber: idx + 1 }));
    updateActivePresentation({ slides: reindexed });
    setActiveSlideIdx(Math.max(0, activeSlideIdx - 1));
  };

  const handleAddBlankSlide = () => {
    const newSlide: OmniSlide = {
      id: `slide_${Date.now()}`,
      slideNumber: activePres.slides.length + 1,
      layout: 'title',
      title: 'New Slide Title',
      subtitle: 'Add subtitle or core takeaway message',
      speakerNotes: 'Enter speaker notes here...'
    };
    const updated = [...activePres.slides, newSlide];
    updateActivePresentation({ slides: updated });
    setActiveSlideIdx(updated.length - 1);
  };

  // AI Redesign for Current Slide
  const handleRedesignSlide = async () => {
    if (!redesignPrompt.trim()) return;
    setIsRedesigning(true);
    try {
      const resp = await omniAi.redesignSlide({
        slide: currentSlide,
        instruction: redesignPrompt,
        themeId: activePres.themeId
      });
      if (resp.updatedSlide) {
        updateCurrentSlide(resp.updatedSlide);
      }
      setRedesignPrompt('');
    } catch (err: any) {
      alert(`Redesign note: ${err.message}`);
    } finally {
      setIsRedesigning(false);
    }
  };

  // AI Workflow Generator Execution
  const handleExecuteAIGeneration = async () => {
    setIsGenerating(true);
    setGenStep('generating');
    try {
      const resp = await omniAi.generatePresentation({
        prompt: aiPrompt || 'Sovereign Enterprise Strategy 2026',
        slideCount: aiSlideCount,
        themeId: selectedThemeId,
        targetAudience: aiTargetAudience
      });
      if (resp.presentation) {
        setPresentations(prev => [resp.presentation, ...prev]);
        setActivePresId(resp.presentation.id);
        setActiveSlideIdx(0);
        setIsAiGenModalOpen(false);
      }
    } catch (err: any) {
      alert(`Generation failed: ${err.message}`);
      setGenStep('prompt');
    } finally {
      setIsGenerating(false);
    }
  };

  // Real Export Utilities
  const handleExport = (format: 'html' | 'json' | 'md') => {
    if (format === 'html') {
      const slidesHtml = activePres.slides.map(s => `
        <section style="min-height: 500px; padding: 40px; margin-bottom: 30px; border-radius: 12px; background: #111; color: #fff; border: 1px solid #333;">
          <h2 style="font-size: 26px; color: #d4af37; margin-bottom: 8px;">${s.title}</h2>
          ${s.subtitle ? `<p style="font-size: 16px; color: #9ca3af; margin-bottom: 20px;">${s.subtitle}</p>` : ''}
          ${s.bullets ? `<ul>${s.bullets.map(b => `<li style="margin-bottom: 8px; color: #e5e7eb;">${b}</li>`).join('')}</ul>` : ''}
          ${s.speakerNotes ? `<div style="margin-top: 24px; padding: 12px; background: #1f2937; border-left: 4px solid #6366f1; font-size: 13px; color: #9ca3af;"><strong>Speaker Notes:</strong> ${s.speakerNotes}</div>` : ''}
        </section>
      `).join('');

      const htmlDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${activePres.title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 900px; margin: 40px auto; padding: 20px; background: #000; color: #fff; }
    h1 { text-align: center; color: #d4af37; font-size: 32px; margin-bottom: 8px; }
    .subtitle { text-align: center; color: #818cf8; margin-bottom: 40px; }
  </style>
</head>
<body>
  <h1>${activePres.title}</h1>
  <div class="subtitle">${activePres.subtitle || 'Sovereign Presentation Deck'}</div>
  <div>${slidesHtml}</div>
</body>
</html>`;
      const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activePres.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}_deck.html`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const blob = new Blob([JSON.stringify(activePres, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activePres.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'md') {
      const mdContent = `# ${activePres.title}\n\n${activePres.subtitle || ''}\n\n---\n\n` + 
        activePres.slides.map(s => `## Slide ${s.slideNumber}: ${s.title}\n\n${s.subtitle || ''}\n\n` + 
          (s.bullets ? s.bullets.map(b => `- ${b}`).join('\n') : '') + 
          (s.speakerNotes ? `\n\n> **Speaker Notes:** ${s.speakerNotes}` : '') + '\n\n---\n').join('\n');
      const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activePres.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Render Layouts inside Slide Canvas
  const renderSlideContent = (slide: OmniSlide, theme: OmniSlideTheme) => {
    switch (slide.layout) {
      case 'title':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center p-12 space-y-6">
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Sovereign Strategic Deck
            </span>
            <input
              type="text"
              value={slide.title}
              onChange={e => updateCurrentSlide({ title: e.target.value })}
              className={`w-full bg-transparent text-center text-4xl lg:text-5xl font-bold tracking-tight focus:outline-none focus:border-b border-indigo-500 ${theme.textColor}`}
            />
            {slide.subtitle !== undefined && (
              <input
                type="text"
                value={slide.subtitle}
                onChange={e => updateCurrentSlide({ subtitle: e.target.value })}
                className="w-full max-w-2xl bg-transparent text-center text-lg text-neutral-400 focus:outline-none focus:border-b border-neutral-700"
                placeholder="Slide Subtitle"
              />
            )}
            <div className="pt-8 flex items-center space-x-3 text-xs text-neutral-500">
              <span>Presented by Gideon Oluwalana</span>
              <span>•</span>
              <span>OMNI Sovereign Cloud 2026</span>
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="h-full flex flex-col p-10 justify-between">
            <div>
              <input
                type="text"
                value={slide.title}
                onChange={e => updateCurrentSlide({ title: e.target.value })}
                className={`w-full bg-transparent text-3xl font-bold tracking-tight focus:outline-none ${theme.textColor}`}
              />
              <input
                type="text"
                value={slide.subtitle || ''}
                onChange={e => updateCurrentSlide({ subtitle: e.target.value })}
                className="w-full bg-transparent text-sm text-neutral-400 mt-1 focus:outline-none"
                placeholder="Metric subtitle..."
              />
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-4 gap-4 my-6">
              {(slide.kpis || [
                { label: 'Settlement Vol', value: '$2.68M', change: '+88.7% QoQ', positive: true },
                { label: 'Token Efficiency', value: '43.7%', change: 'Optimized', positive: true },
                { label: 'Uptime SLA', value: '99.99%', change: 'Zero Faults', positive: true },
                { label: 'Active Tenants', value: '1,890+', change: '+52.4%', positive: true }
              ]).map((kpi, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 shadow-sm flex flex-col justify-between">
                  <span className="text-xs text-neutral-400 font-medium">{kpi.label}</span>
                  <span className="text-2xl font-bold text-white my-2">{kpi.value}</span>
                  <div className="flex items-center space-x-1 text-xs text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{kpi.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Bullets */}
            {slide.bullets && (
              <ul className="space-y-2 text-sm text-neutral-300">
                {slide.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'split':
        return (
          <div className="h-full flex flex-col p-10 justify-between">
            <div>
              <input
                type="text"
                value={slide.title}
                onChange={e => updateCurrentSlide({ title: e.target.value })}
                className={`w-full bg-transparent text-3xl font-bold tracking-tight focus:outline-none ${theme.textColor}`}
              />
              <input
                type="text"
                value={slide.subtitle || ''}
                onChange={e => updateCurrentSlide({ subtitle: e.target.value })}
                className="w-full bg-transparent text-sm text-neutral-400 mt-1 focus:outline-none"
              />
            </div>

            {/* 2-Column Split */}
            <div className="grid grid-cols-2 gap-6 my-6 flex-1">
              {(slide.columns || [
                { title: 'Legacy Fragmented Stack', badge: 'High Risk', content: '• Vendor lock-in\n• Vulnerable data egress' },
                { title: 'OMNI Sovereign Stack', badge: 'Sovereign', content: '• Provider-neutral routing\n• Zero-egress private RAG' }
              ]).map((col, idx) => (
                <div key={idx} className={`p-6 rounded-xl border flex flex-col justify-between ${
                  idx === 1 ? 'bg-indigo-950/30 border-indigo-500/30' : 'bg-neutral-900/60 border-neutral-800'
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-bold text-white">{col.title}</h4>
                      {col.badge && (
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                          idx === 1 ? 'bg-indigo-500/20 text-indigo-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {col.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
                      {col.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'chart':
        return (
          <div className="h-full flex flex-col p-10 justify-between">
            <div>
              <input
                type="text"
                value={slide.title}
                onChange={e => updateCurrentSlide({ title: e.target.value })}
                className={`w-full bg-transparent text-3xl font-bold tracking-tight focus:outline-none ${theme.textColor}`}
              />
              <input
                type="text"
                value={slide.subtitle || ''}
                onChange={e => updateCurrentSlide({ subtitle: e.target.value })}
                className="w-full bg-transparent text-sm text-neutral-400 mt-1 focus:outline-none"
              />
            </div>

            {/* Recharts Visualizer */}
            <div className="h-64 my-4 p-4 bg-neutral-900/80 rounded-xl border border-neutral-800">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Q1 2026', grossVolume: 1.2, costPerTrans: 0.05 },
                  { name: 'Q2 2026', grossVolume: 1.8, costPerTrans: 0.03 },
                  { name: 'Q3 2026', grossVolume: 2.7, costPerTrans: 0.02 },
                  { name: 'Q4 2026 (Est)', grossVolume: 3.8, costPerTrans: 0.015 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px', color: '#fff' }} />
                  <Legend />
                  <Bar dataKey="grossVolume" fill="#D4AF37" name="Gross Volume ($M)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="costPerTrans" fill="#6366F1" name="Cost / Trans ($)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {slide.bullets && (
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {slide.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'quote':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center p-12 space-y-6">
            <Quote className="w-12 h-12 text-amber-400/40" />
            <blockquote className="text-2xl lg:text-3xl font-serif italic text-neutral-100 max-w-2xl leading-relaxed">
              "{slide.quote?.text || 'True sovereignty is the freedom to orchestrate any intelligence and settle any currency without compromise.'}"
            </blockquote>
            <div className="pt-4">
              <span className="text-base font-bold text-white block">{slide.quote?.author || 'Gideon Oluwalana'}</span>
              <span className="text-xs text-neutral-400">{slide.quote?.role || 'Founder & Chief Architect, OMNI'}</span>
            </div>
          </div>
        );

      case 'bento':
      default:
        return (
          <div className="h-full flex flex-col p-10 justify-between">
            <div>
              <input
                type="text"
                value={slide.title}
                onChange={e => updateCurrentSlide({ title: e.target.value })}
                className={`w-full bg-transparent text-3xl font-bold tracking-tight focus:outline-none ${theme.textColor}`}
              />
              <input
                type="text"
                value={slide.subtitle || ''}
                onChange={e => updateCurrentSlide({ subtitle: e.target.value })}
                className="w-full bg-transparent text-sm text-neutral-400 mt-1 focus:outline-none"
              />
            </div>

            {/* 3-Card Bento Grid */}
            <div className="grid grid-cols-3 gap-4 my-6 flex-1">
              {(slide.columns || [
                { title: 'Q4 2026', content: 'Omni Create Studio & Live Presence Launch' },
                { title: 'Q1 2027', content: 'Regional Edge Compute Nodes in 4 Global Hubs' },
                { title: 'Q2 2027', content: 'Cross-Border FX Clearing Rails Integration' }
              ]).map((bento, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-400 block mb-1">0{idx + 1}</span>
                    <h4 className="text-base font-bold text-white mb-2">{bento.title}</h4>
                    <p className="text-xs text-neutral-300 leading-relaxed">{bento.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div id="omni-slide-studio-container" className="flex flex-col h-full bg-neutral-950 text-neutral-100 min-h-[750px]">
      {/* Header Bar */}
      <header id="slide-studio-header" className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={activePres.title}
                onChange={e => updateActivePresentation({ title: e.target.value })}
                className="bg-transparent text-lg font-semibold text-white focus:outline-none focus:border-b border-amber-500 hover:border-b hover:border-neutral-700 transition-colors"
                placeholder="Presentation Title"
              />
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                {activePres.slides.length} SLIDES
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-neutral-400 mt-0.5">
              <span>Theme: <strong className="text-neutral-300">{activeTheme.name}</strong></span>
              <span>•</span>
              <span>Audience: <strong className="text-neutral-300">{activePres.targetAudience}</strong></span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* AI Generate Deck Button */}
          <button
            id="ai-generate-deck-btn"
            onClick={() => {
              setGenStep('prompt');
              setIsAiGenModalOpen(true);
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Presentation Wizard</span>
          </button>

          {/* Present / Fullscreen */}
          <button
            id="start-presentation-btn"
            onClick={() => {
              setIsFullscreen(true);
              setIsTimerRunning(true);
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Present Deck</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative group">
            <button
              id="export-slide-deck-btn"
              className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <div className="absolute right-0 mt-1 w-44 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl py-1 hidden group-hover:block z-50">
              <button
                onClick={() => handleExport('html')}
                className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center justify-between"
              >
                <span>Standalone Deck</span>
                <span className="text-neutral-500 font-mono">.html</span>
              </button>
              <button
                onClick={() => handleExport('json')}
                className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center justify-between"
              >
                <span>Presentation JSON</span>
                <span className="text-neutral-500 font-mono">.json</span>
              </button>
              <button
                onClick={() => handleExport('md')}
                className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center justify-between"
              >
                <span>Markdown Slides</span>
                <span className="text-neutral-500 font-mono">.md</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Studio Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Slide Carousel & Sorter */}
        <aside id="slide-sorter-sidebar" className="w-60 border-r border-neutral-800 bg-neutral-900/50 flex flex-col shrink-0">
          <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-300">Slide Sequence</span>
            <button
              onClick={handleAddBlankSlide}
              className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center space-x-1"
              title="Add Slide"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {activePres.slides.map((slide, idx) => {
              const isSelected = idx === activeSlideIdx;
              return (
                <div
                  key={slide.id}
                  onClick={() => setActiveSlideIdx(idx)}
                  className={`group relative p-2.5 rounded-lg cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-neutral-800 border-amber-500/60 shadow-lg ring-1 ring-amber-500/40'
                      : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-neutral-400">
                      {idx + 1}. {slide.layout.toUpperCase()}
                    </span>
                    {/* Action Overlay */}
                    <div className="hidden group-hover:flex items-center space-x-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveSlide('up'); }}
                        disabled={idx === 0}
                        className="p-0.5 text-neutral-400 hover:text-white disabled:opacity-30"
                        title="Move Up"
                      >
                        <MoveUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveSlide('down'); }}
                        disabled={idx === activePres.slides.length - 1}
                        className="p-0.5 text-neutral-400 hover:text-white disabled:opacity-30"
                        title="Move Down"
                      >
                        <MoveDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDuplicateSlide(); }}
                        className="p-0.5 text-neutral-400 hover:text-white"
                        title="Duplicate"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteSlide(); }}
                        className="p-0.5 text-neutral-400 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Slide Mini-Thumbnail */}
                  <div className="h-20 rounded bg-neutral-950/80 border border-neutral-800 p-2 flex flex-col justify-center overflow-hidden">
                    <span className="text-[11px] font-semibold text-neutral-200 truncate">{slide.title}</span>
                    <span className="text-[9px] text-neutral-500 truncate mt-0.5">{slide.subtitle || `${slide.bullets?.length || 0} bullets`}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Cross-Studio Navigation */}
          <div className="p-3 border-t border-neutral-800 bg-neutral-900/80">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">Connected Studios</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onOpenDocument && onOpenDocument()}
                className="px-2 py-1.5 text-xs rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 flex items-center justify-center space-x-1"
              >
                <FileText className="w-3 h-3 text-indigo-400" />
                <span>Documents</span>
              </button>
              <button
                onClick={() => onOpenSpreadsheet && onOpenSpreadsheet()}
                className="px-2 py-1.5 text-xs rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 flex items-center justify-center space-x-1"
              >
                <BarChart2 className="w-3 h-3 text-emerald-400" />
                <span>Sheets</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Center Presentation Stage & Canvas */}
        <main id="slide-stage-canvas" className="flex-1 flex flex-col bg-neutral-950 p-6 overflow-y-auto">
          {/* Top Controls: Layout Selector & Theme Selector */}
          <div className="flex items-center justify-between mb-4 bg-neutral-900/50 p-2 rounded-xl border border-neutral-800">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-neutral-400 font-medium">Layout:</span>
              {(['title', 'metrics', 'split', 'chart', 'quote', 'bento'] as OmniSlideLayout[]).map(layout => (
                <button
                  key={layout}
                  onClick={() => updateCurrentSlide({ layout })}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    currentSlide.layout === layout
                      ? 'bg-amber-600 text-white font-semibold shadow-sm'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {layout.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Picker Dropdown */}
            <div className="flex items-center space-x-2">
              <Palette className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={activePres.themeId}
                onChange={e => updateActivePresentation({ themeId: e.target.value })}
                className="px-2.5 py-1 text-xs bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-amber-500"
              >
                {themes.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Slide 16:9 Canvas */}
          <div className="flex-1 flex items-center justify-center">
            <div className={`w-full max-w-4xl aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden border border-neutral-800 bg-gradient-to-br ${activeTheme.bgGradient} transition-all duration-300 relative`}>
              {renderSlideContent(currentSlide, activeTheme)}
            </div>
          </div>

          {/* Bottom Toolbar: Slide AI Redesign Bar & Speaker Notes */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* AI Redesign Box */}
            <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <input
                type="text"
                value={redesignPrompt}
                onChange={e => setRedesignPrompt(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRedesignSlide()}
                placeholder="AI Redesign Slide (e.g. 'Convert into 4 KPI metric cards with growth stats')..."
                className="flex-1 text-xs bg-transparent text-white focus:outline-none placeholder-neutral-500"
              />
              <button
                onClick={handleRedesignSlide}
                disabled={isRedesigning || !redesignPrompt.trim()}
                className="px-3 py-1 text-xs font-semibold rounded bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-50 flex items-center space-x-1"
              >
                {isRedesigning ? <RefreshCw className="w-3 h-3 animate-spin" /> : <span>Enhance</span>}
              </button>
            </div>

            {/* Speaker Notes */}
            <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 flex items-center space-x-2">
              <span className="text-xs font-semibold text-neutral-400 shrink-0">Speaker Notes:</span>
              <input
                type="text"
                value={currentSlide.speakerNotes || ''}
                onChange={e => updateCurrentSlide({ speakerNotes: e.target.value })}
                placeholder="Key talking points for this slide..."
                className="flex-1 text-xs bg-transparent text-neutral-300 focus:outline-none placeholder-neutral-600"
              />
            </div>
          </div>
        </main>
      </div>

      {/* Fullscreen Presenter Mode Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-8">
          {/* Top Presenter Bar */}
          <div className="flex items-center justify-between text-neutral-400 text-sm">
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-white">{activePres.title}</span>
              <span>•</span>
              <span>Slide {activeSlideIdx + 1} of {activePres.slides.length}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 font-mono text-amber-400 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
                <Clock className="w-4 h-4" />
                <span>
                  {Math.floor(presentationTimerSeconds / 60).toString().padStart(2, '0')}:
                  {(presentationTimerSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <button
                onClick={() => {
                  setIsFullscreen(false);
                  setIsTimerRunning(false);
                }}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Fullscreen Slide Canvas */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className={`w-full max-w-6xl aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden border border-neutral-800 bg-gradient-to-br ${activeTheme.bgGradient}`}>
              {renderSlideContent(currentSlide, activeTheme)}
            </div>
          </div>

          {/* Bottom Presenter Controls */}
          <div className="flex items-center justify-between text-neutral-400">
            <button
              onClick={() => setActiveSlideIdx(prev => Math.max(0, prev - 1))}
              disabled={activeSlideIdx === 0}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {currentSlide.speakerNotes && (
              <div className="max-w-xl text-center text-xs text-neutral-300 bg-neutral-900/80 px-4 py-2 rounded-lg border border-neutral-800">
                <strong className="text-amber-400">Notes:</strong> {currentSlide.speakerNotes}
              </div>
            )}

            <button
              onClick={() => setActiveSlideIdx(prev => Math.min(activePres.slides.length - 1, prev + 1))}
              disabled={activeSlideIdx === activePres.slides.length - 1}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white disabled:opacity-30"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* AI Presentation Generator Wizard Modal (Workflow: Prompt/Doc -> Outline -> Theme -> Slides) */}
      {isAiGenModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">AI Presentation Generator</h3>
                  <p className="text-xs text-neutral-400">Multi-step synthesis: Prompt/Doc → Outline → Theme → Slides</p>
                </div>
              </div>
              <button onClick={() => setIsAiGenModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between text-xs font-semibold px-2">
              <div className={`flex items-center space-x-1.5 ${genStep === 'prompt' ? 'text-amber-400' : 'text-neutral-500'}`}>
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center">1</span>
                <span>Topic & Scope</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-700" />
              <div className={`flex items-center space-x-1.5 ${genStep === 'outline' ? 'text-amber-400' : 'text-neutral-500'}`}>
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center">2</span>
                <span>Outline Review</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-700" />
              <div className={`flex items-center space-x-1.5 ${genStep === 'theme' ? 'text-amber-400' : 'text-neutral-500'}`}>
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center">3</span>
                <span>Theme & Generate</span>
              </div>
            </div>

            {/* Step 1: Prompt & Scope */}
            {genStep === 'prompt' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Presentation Topic or Key Objectives</label>
                  <textarea
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    placeholder="e.g., Strategic overview of Q3 ledger settlement volumes, AI token cost optimization, and our global multi-tenant expansion roadmap..."
                    className="w-full p-3 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 resize-none h-24"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Target Audience</label>
                    <input
                      type="text"
                      value={aiTargetAudience}
                      onChange={e => setAiTargetAudience(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">Number of Slides</label>
                    <select
                      value={aiSlideCount}
                      onChange={e => setAiSlideCount(parseInt(e.target.value))}
                      className="w-full px-3 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value={4}>4 Slides (Executive Brief)</option>
                      <option value={6}>6 Slides (Standard Pitch)</option>
                      <option value={8}>8 Slides (Deep Dive)</option>
                      <option value={10}>10 Slides (Comprehensive Strategy)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setGenStep('outline')}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-white flex items-center space-x-1.5"
                  >
                    <span>Proceed to Outline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Outline Builder */}
            {genStep === 'outline' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-400">Review and re-order the synthesized presentation outline:</p>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {aiOutline.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-2 bg-neutral-800/80 rounded-lg border border-neutral-700">
                      <span className="text-xs font-mono font-bold text-amber-400 w-5">0{idx + 1}</span>
                      <input
                        type="text"
                        value={item}
                        onChange={e => {
                          const updated = [...aiOutline];
                          updated[idx] = e.target.value;
                          setAiOutline(updated);
                        }}
                        className="flex-1 text-xs bg-transparent text-white focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => setGenStep('prompt')}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setGenStep('theme')}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-white flex items-center space-x-1.5"
                  >
                    <span>Choose Theme & Generate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Theme Selection & Generate */}
            {genStep === 'theme' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-400">Select a design theme for the deck:</p>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedThemeId(t.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedThemeId === t.id
                          ? 'border-amber-500 bg-neutral-800 ring-2 ring-amber-500/30'
                          : 'border-neutral-800 bg-neutral-800/40 hover:bg-neutral-800'
                      }`}
                    >
                      <div className={`h-12 rounded-lg bg-gradient-to-br ${t.bgGradient} mb-2 border border-neutral-700/50 flex items-center justify-center`}>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.primaryColor }} />
                      </div>
                      <span className="text-xs font-semibold text-white block">{t.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setGenStep('outline')}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleExecuteAIGeneration}
                    disabled={isGenerating}
                    className="px-6 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white shadow-lg flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Presentation Deck</span>
                  </button>
                </div>
              </div>
            )}

            {/* Generating Loading State */}
            {genStep === 'generating' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
                <div>
                  <h4 className="text-sm font-bold text-white">Synthesizing Presentation Deck...</h4>
                  <p className="text-xs text-neutral-400 mt-1">Orchestrating multi-agent layouts, charts, and executive speaker notes.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
