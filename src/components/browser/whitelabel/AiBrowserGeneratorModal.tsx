import React, { useState } from 'react';
import {
  WhiteLabelBrowserConfig
} from '../../../types/whitelabel_browser';
import {
  Sparkles,
  X,
  Wand2,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Cpu,
  GraduationCap,
  ShoppingBag,
  Stethoscope,
  Code2
} from 'lucide-react';

interface AiBrowserGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (config: WhiteLabelBrowserConfig) => void;
}

export const AiBrowserGeneratorModal: React.FC<AiBrowserGeneratorModalProps> = ({
  isOpen,
  onClose,
  onGenerated
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  if (!isOpen) return null;

  const quickTemplates = [
    {
      title: 'MedSecure Clinic Browser',
      desc: 'HIPAA compliant medical workstation with dark teal theme, EHR intranet search, zero-data retention, and medical dictionary AI assistant.',
      icon: Stethoscope,
      accent: '#0d9488'
    },
    {
      title: 'Nexus Dev Studio Browser',
      desc: 'High-performance engineering browser with dark obsidian theme, GitHub PR copilot, live terminal shortcuts, and WireGuard dev tunneling.',
      icon: Code2,
      accent: '#8b5cf6'
    },
    {
      title: 'Aura Luxury Commerce Browser',
      desc: 'Brand-focused customer shopping browser with champagne gold aesthetics, live coupon assistant, affiliate product speed dials, and OMNI Pay escrow.',
      icon: ShoppingBag,
      accent: '#f59e0b'
    },
    {
      title: 'Sovereign Defense Enclave',
      desc: 'Air-gapped military grade browser with post-quantum lattice encryption, multi-hop onion routing, and strict zero-telemetry enforcement.',
      icon: ShieldCheck,
      accent: '#ef4444'
    }
  ];

  const handleGenerate = (customPromptText?: string) => {
    const textToUse = customPromptText || prompt;
    if (!textToUse.trim()) return;

    setIsGenerating(true);
    setGenerationStep('Synthesizing brand typography, color palettes & assets...');

    setTimeout(() => {
      setGenerationStep('Architecting enterprise intranet search & bang shortcuts...');
    }, 500);

    setTimeout(() => {
      setGenerationStep('Configuring post-quantum VPN tunnels & zero-retention AI assistant...');
    }, 1000);

    setTimeout(() => {
      setGenerationStep('Generating double-entry billing ledgers & DNS verification records...');
    }, 1400);

    setTimeout(() => {
      // Determine theme & name based on prompt
      const isMed = textToUse.toLowerCase().includes('med') || textToUse.toLowerCase().includes('health') || textToUse.toLowerCase().includes('clinic');
      const isDev = textToUse.toLowerCase().includes('dev') || textToUse.toLowerCase().includes('code') || textToUse.toLowerCase().includes('tech');
      const isFin = textToUse.toLowerCase().includes('fin') || textToUse.toLowerCase().includes('trade') || textToUse.toLowerCase().includes('crypto');
      const isLuxury = textToUse.toLowerCase().includes('lux') || textToUse.toLowerCase().includes('shop') || textToUse.toLowerCase().includes('aura');

      const companyName = isMed ? 'MedSecure Global' : isDev ? 'Nexus Dev Labs' : isFin ? 'Apex Horizon Capital' : isLuxury ? 'Aura Maison' : 'Vanguard Technologies';
      const brandName = `${companyName} Browser`;
      const slug = companyName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const accent = isMed ? '#0d9488' : isDev ? '#8b5cf6' : isFin ? '#10b981' : isLuxury ? '#d97706' : '#6366f1';
      const surface = isMed ? '#042f2e' : isDev ? '#09090b' : isFin ? '#052e16' : isLuxury ? '#1c1917' : '#0f172a';

      const newConfig: WhiteLabelBrowserConfig = {
        id: `wl-${slug}-${Date.now().toString().slice(-4)}`,
        tenantId: `tenant-${slug}`,
        name: brandName,
        slug: slug,
        tagline: `AI-Accelerated Sovereign Enterprise Workspace for ${companyName}`,
        status: 'live',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

        brand: {
          companyName,
          brandName,
          tagline: `Engineered for sovereign security and seamless productivity at ${companyName}.`,
          accentColor: accent,
          surfaceColor: surface,
          fontFamily: isDev ? 'JetBrains Mono, monospace' : 'Inter, system-ui, sans-serif',
          borderRadius: 'smooth',
          themeMode: 'dark',
          poweredByOmniBadge: true,
          splashScreenTitle: `Welcome to ${brandName}`,
          supportEmail: `support@${slug}.com`,
          copyrightNotice: `© 2026 ${companyName}. Powered by OMNI Platform.`
        },

        logos: {
          logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          logoDarkUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          faviconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&auto=format&fit=crop&q=80',
          watermarkUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
          appIconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80'
        },

        domain: {
          subdomain: slug.replace('-labs', '').replace('-global', ''),
          customDomain: `browser.${slug}.com`,
          dnsStatus: 'verified',
          cnameTarget: 'ingress.omnibrowser.com',
          txtVerificationKey: `omni-verify=${slug}-pqc-${Date.now().toString().slice(-4)}`,
          sslStatus: 'issued',
          sslExpiresAt: '2027-08-17T00:00:00Z',
          sslIssuer: 'OMNI ZeroSSL Automated ECC TLS',
          autoDnsManagedByOmni: true
        },

        homepage: {
          heroTitle: `${companyName} Sovereign Portal`,
          heroSubtitle: `Connected to encrypted private cloud nodes with zero data retention.`,
          wallpaperType: 'cosmic',
          customWallpaperUrl: '',
          pinnedSpeedDials: [
            { id: 'psd-1', name: `${companyName} Intranet`, url: `https://intranet.${slug}.com`, iconName: 'Building2', category: 'Internal', color: 'text-indigo-400 bg-indigo-950 border-indigo-800' },
            { id: 'psd-2', name: 'Knowledge Vault', url: `https://wiki.${slug}.com`, iconName: 'HardDrive', category: 'Docs', color: 'text-emerald-400 bg-emerald-950 border-emerald-800' },
            { id: 'psd-3', name: 'OMNI Pay Escrow', url: 'https://pay.omni.com', iconName: 'Wallet', category: 'Finance', isAffiliate: true, color: 'text-cyan-400 bg-cyan-950 border-cyan-800' },
            { id: 'psd-4', name: 'Cloud Infrastructure', url: `https://cloud.${slug}.com`, iconName: 'Cloud', category: 'DevOps', color: 'text-amber-400 bg-amber-950 border-amber-800' }
          ],
          announcementBanner: {
            isEnabled: true,
            title: `${companyName} System Security Policy Active`,
            text: 'All traffic is routed through encrypted WireGuard nodes with automated passkey handshakes.',
            ctaUrl: `https://${slug}.com/security`,
            ctaLabel: 'Learn More',
            type: 'info'
          },
          widgets: {
            quickSearch: true,
            dailyNews: true,
            aiCopilotBar: true,
            weatherCrypto: isFin,
            corporateShortcuts: true,
            workspaceTray: true
          }
        },

        searchEngine: {
          defaultEngine: 'custom_intranet',
          customSearchEndpoint: `https://search.${slug}.internal/api/v1?q=%s`,
          searchAutosuggestApi: `https://search.${slug}.internal/api/v1/suggest?q=%s`,
          strictSafeSearch: true,
          enterpriseIntranetIndexing: true,
          customBangShortcuts: [
            { prefix: '!doc', name: 'Company Docs', urlTemplate: `https://docs.${slug}.internal/search?q=%s` },
            { prefix: '!team', name: 'Team Directory', urlTemplate: `https://people.${slug}.internal/find?q=%s` }
          ]
        },

        newsFeed: {
          enabled: true,
          sources: [
            { id: 'ns-gen-1', name: `${companyName} Corporate Press`, rssUrl: `https://news.${slug}.com/feed`, category: 'Company', enabled: true },
            { id: 'ns-gen-2', name: 'Industry Intelligence Brief', rssUrl: 'https://feeds.feedburner.com/industry-news', category: 'Market', enabled: true }
          ],
          aiDigestCadence: 'daily_morning',
          corporateInternalFeedUrl: `https://news.${slug}.com/api/v1/feed`,
          bannedCategories: ['gambling', 'clickbait']
        },

        aiAssistant: {
          aiAssistantName: `${companyName.split(' ')[0]} AI Copilot`,
          aiAvatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
          modelTier: 'enterprise-fine-tuned',
          systemPrompt: `You are the designated AI assistant for ${companyName}. Assist authorized personnel with technical architecture, policy queries, and workspace tasks under zero data retention policies.`,
          knowledgeBases: [
            { id: 'kb-g1', name: `${companyName} Master Knowledge Base.pdf`, type: 'pdf', docCount: 220, status: 'indexed', lastSyncedAt: '2026-08-16' },
            { id: 'kb-g2', name: 'Compliance & Security Guidelines', type: 'wiki', docCount: 450, status: 'indexed', lastSyncedAt: '2026-08-16' }
          ],
          zeroDataRetentionEnforced: true,
          allowedModes: {
            chat: true,
            codeExplain: true,
            pageSummarizer: true,
            autoEmailDraft: true,
            enterpriseDataSearch: true
          }
        },

        vpn: {
          vpnBundled: true,
          tunnelMode: 'enterprise_wireguard',
          customWireguardConfig: `[Interface]\nPrivateKey = [REDACTED_PQC_KEY]\nAddress = 10.200.0.8/24\n\n[Peer]\nPublicKey = sovereignGatewayKey==\nEndpoint = vpn.${slug}.com:51820\nAllowedIPs = 10.0.0.0/8`,
          allowedCountries: ['US', 'CA', 'DE', 'GB', 'CH'],
          killSwitchEnforced: true,
          splitTunnelingDomains: ['spotify.com'],
          zeroLogsPolicyAuditSignature: `AUDIT-${slug.toUpperCase()}-2026`
        },

        extensions: {
          storeMode: 'curated_whitelist',
          preInstalled: [
            { id: 'ext-sec-1', name: `${companyName} SSO Auth Bridge`, icon: 'ShieldCheck', version: '2.0.0', mandatory: true, description: 'Single sign-on helper for internal apps.', publisher: companyName, category: 'Security' },
            { id: 'ext-sec-2', name: 'OMNI Privacy Shield', icon: 'Shield', version: '4.5.1', mandatory: true, description: 'Anti-tracking and ad-stripping.', publisher: 'OMNI Foundation', category: 'Privacy' }
          ],
          allowCustomSideloading: false
        },

        monetization: {
          model: 'seat_subscription',
          pricingTiers: [
            { id: 't-1', name: 'Basic Team', priceMonthly: 15, priceAnnual: 150, seatCap: 20, features: ['Subdomain Access', 'Basic Copilot', 'Standard Intranet Search'] },
            { id: 't-2', name: 'Enterprise Sovereign', priceMonthly: 32, priceAnnual: 320, seatCap: 250, features: ['Custom Domain + SSL', 'Zero-Retention Copilot', 'WireGuard Tunnel', 'SSO Authentication'], isPopular: true }
          ],
          currency: 'USD',
          paywallTrigger: 'seat_limit_exceeded',
          trialDays: 14,
          billingProvider: 'OMNI Billing'
        },

        advertising: {
          adNetworkEnabled: false,
          adTypes: {
            sponsoredSpeedDials: false,
            sidebarDeals: false,
            newTabWallpaperSponsor: false,
            inFeedSponsoredNews: false
          },
          customerPayoutSplit: 80,
          sponsoredBids: [],
          currentMonthAdRevenue: 0
        },

        analytics: {
          activeDailyUsers: 1240,
          activeMonthlyUsers: 5890,
          retention30d: 92.4,
          totalSearches24h: 18400,
          bandwidthSavedGb: 540.0,
          trackersBlockedTotal: 412000,
          totalRevenueGenerated: 28400,
          userPlatformBreakdown: { desktop: 82, mobile: 14, tablet: 4 }
        },

        usersPermissions: {
          seatsAllocated: 250,
          seatsUsed: 142,
          ssoProvider: 'omni_passport',
          rbacPoliciesEnforced: true,
          auditLogsRetentionDays: 180,
          teamMembers: [
            { id: 'mem-1', name: 'Alex Rivera', email: `alex@${slug}.com`, role: 'Owner', addedAt: '2026-08-01', lastActive: '1 min ago', ssoEnabled: true, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80' }
          ]
        },

        resellerAffiliate: {
          isReseller: true,
          resellerTier: 'Gold Solution Provider',
          wholesaleDiscountPercent: 30,
          affiliateReferralCode: `${slug.toUpperCase()}-2026`,
          affiliateCommissionRate: 25,
          totalAffiliateClicks: 3420,
          totalAffiliateConversions: 88,
          totalCommissionEarned: 4120.00,
          payoutMethod: 'OMNI Pay'
        },

        billingLedger: {
          billingCycle: 'monthly',
          currentInvoice: {
            invoiceNumber: `INV-${slug.toUpperCase()}-001`,
            amountDue: 4544.00,
            dueDate: '2026-09-01',
            status: 'paid',
            lineItems: [
              { desc: `${brandName} - 142 Active Enterprise Seats ($32/seat)`, qty: 142, unitPrice: 32, total: 4544.00 }
            ]
          },
          transactions: [
            { id: 'tx-init-1', timestamp: '2026-08-16 12:00:00', type: 'subscription_charge', description: 'Initial Enterprise Provisioning Settled', debit: 4544.00, credit: 0, balance: 0, referenceId: `INV-${slug.toUpperCase()}-001` }
          ]
        }
      };

      setIsGenerating(false);
      onGenerated(newConfig);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-100 flex items-center gap-2">
                <span>AI White Label Browser Architect</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono text-[10px]">
                  Gemini Flash 2.5
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Describe your company, use case, or security rules. OMNI AI will construct your complete branded browser engine.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Prompt Box */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300">
              Describe Your Desired Custom Browser
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Build a high-security cyber intelligence browser for fintech firm QuantumCapital with emerald accents, Bloomberg terminal speed dials, WireGuard Swiss VPN, and algorithmic options calculator AI..."
              className="w-full bg-stone-950 border border-stone-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-stone-200 placeholder:text-stone-600 outline-none transition-colors resize-none"
            />
          </div>

          {/* Quick Preset Templates */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
              Or Choose an Enterprise Industry Preset
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickTemplates.map((tpl, i) => {
                const IconComponent = tpl.icon;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setPrompt(tpl.desc);
                      handleGenerate(tpl.desc);
                    }}
                    className="p-3 rounded-xl bg-stone-950/60 hover:bg-stone-800/80 border border-stone-800 hover:border-indigo-700/80 cursor-pointer transition-all space-y-1 group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-indigo-400 group-hover:text-indigo-300">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div className="font-bold text-xs text-stone-200 group-hover:text-indigo-300">
                        {tpl.title}
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2">
                      {tpl.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Loading Animation during generation */}
          {isGenerating && (
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800 flex items-center gap-3">
              <Wand2 className="w-5 h-5 text-indigo-400 animate-spin" />
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-indigo-200">
                  Synthesizing Complete White Label Architecture...
                </div>
                <div className="text-[11px] font-mono text-indigo-300/80">
                  {generationStep}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!prompt.trim() || isGenerating}
            onClick={() => handleGenerate()}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate & Launch Browser</span>
          </button>
        </div>
      </div>
    </div>
  );
};
