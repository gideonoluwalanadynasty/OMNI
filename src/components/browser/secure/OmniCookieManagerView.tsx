import React, { useState } from 'react';
import {
  Cookie,
  Trash2,
  Lock,
  Globe,
  Search,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Shield,
  Layers,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { OmniCookieItem, OmniCookiePolicy } from '../../../types';

interface OmniCookieManagerViewProps {
  cookies: OmniCookieItem[];
  cookiePolicy: OmniCookiePolicy;
  onUpdatePolicy: (policy: Partial<OmniCookiePolicy>) => void;
  onClearCookie: (cookieId: string) => void;
  onClearDomainCookies: (domain: string) => void;
  onClearAllThirdParty: () => void;
}

export const OmniCookieManagerView: React.FC<OmniCookieManagerViewProps> = ({
  cookies,
  cookiePolicy,
  onUpdatePolicy,
  onClearCookie,
  onClearDomainCookies,
  onClearAllThirdParty
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('All');
  const [newExceptionInput, setNewExceptionInput] = useState<string>('');

  const filteredCookies = cookies.filter(c => {
    if (filterType === 'ThirdParty' && !c.isThirdParty) return false;
    if (filterType === 'Tracking' && !c.isTrackingCookie) return false;
    if (filterType === 'Partitioned' && !c.isPartitioned) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.domain.toLowerCase().includes(q) ||
        c.value.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const thirdPartyCount = cookies.filter(c => c.isThirdParty || c.isTrackingCookie).length;

  return (
    <div id="omni-cookie-manager-view" className="space-y-6">
      {/* 1. Top Policy Controls & Privacy Automation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Block 3rd-party */}
        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-stone-200">Block 3rd-Party Cookies</div>
            <div className="text-[11px] text-stone-400">Prevent cross-site tracking</div>
          </div>
          <button
            onClick={() => onUpdatePolicy({ blockThirdPartyCookies: !cookiePolicy.blockThirdPartyCookies })}
            className={`w-10 h-6 rounded-full p-1 transition-colors ${
              cookiePolicy.blockThirdPartyCookies ? 'bg-indigo-600' : 'bg-stone-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                cookiePolicy.blockThirdPartyCookies ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Auto-Reject Consent Banners */}
        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-stone-200">Auto-Reject Consent Popups</div>
            <div className="text-[11px] text-stone-400">Auto decline GDPR/CCPA banners</div>
          </div>
          <button
            onClick={() => onUpdatePolicy({ autoRejectConsentBanners: !cookiePolicy.autoRejectConsentBanners })}
            className={`w-10 h-6 rounded-full p-1 transition-colors ${
              cookiePolicy.autoRejectConsentBanners ? 'bg-indigo-600' : 'bg-stone-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                cookiePolicy.autoRejectConsentBanners ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Isolate Cookies Per Workspace */}
        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-stone-200">Workspace Jar Partition</div>
            <div className="text-[11px] text-stone-400">Isolate cookies by context</div>
          </div>
          <button
            onClick={() => onUpdatePolicy({ isolateCookiesPerWorkspace: !cookiePolicy.isolateCookiesPerWorkspace })}
            className={`w-10 h-6 rounded-full p-1 transition-colors ${
              cookiePolicy.isolateCookiesPerWorkspace ? 'bg-indigo-600' : 'bg-stone-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                cookiePolicy.isolateCookiesPerWorkspace ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Auto-Clear On Session Close */}
        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-stone-200">Auto-Clear On Close</div>
            <div className="text-[11px] text-stone-400">Purge session storage on exit</div>
          </div>
          <button
            onClick={() => onUpdatePolicy({ autoClearOnClose: !cookiePolicy.autoClearOnClose })}
            className={`w-10 h-6 rounded-full p-1 transition-colors ${
              cookiePolicy.autoClearOnClose ? 'bg-indigo-600' : 'bg-stone-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                cookiePolicy.autoClearOnClose ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 2. Detailed Cookie Inspector & Jar Cleaner */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-800">
          <div>
            <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Cookie className="w-4 h-4 text-amber-400" />
              Sovereign Cookie Jar & Storage Inspector
            </h2>
            <p className="text-xs text-stone-400">Audit, filter, and purge tracking identifiers and state tokens</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onClearAllThirdParty}
              className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Purge {thirdPartyCount} Tracking Cookies</span>
            </button>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
              <input
                type="text"
                placeholder="Search cookie or domain..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500 w-44"
              />
            </div>

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-3 py-1.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none"
            >
              <option value="All">All Cookies</option>
              <option value="ThirdParty">3rd-Party</option>
              <option value="Tracking">Tracking</option>
              <option value="Partitioned">Partitioned</option>
            </select>
          </div>
        </div>

        {/* Cookie Table Cards */}
        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {filteredCookies.map(cookie => (
            <div
              key={cookie.id}
              className="p-3.5 bg-stone-800/40 border border-stone-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-stone-100 font-mono">{cookie.name}</span>
                  <span className="text-stone-400 font-mono text-[11px]">@{cookie.domain}</span>
                  {cookie.isTrackingCookie && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                      Tracker
                    </span>
                  )}
                  {cookie.isThirdParty && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                      3rd Party
                    </span>
                  )}
                  {cookie.isHttpOnly && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                      HttpOnly
                    </span>
                  )}
                  {cookie.isPartitioned && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                      Partitioned (CHIPS)
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-stone-500 font-mono truncate max-w-lg" title={cookie.value}>
                  Value: {cookie.value}
                </div>

                <div className="flex items-center gap-4 text-[10px] text-stone-400 font-mono pt-0.5">
                  <span>Expires: {cookie.expires}</span>
                  <span>SameSite: {cookie.sameSite}</span>
                  <span>Path: {cookie.path}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onClearDomainCookies(cookie.domain)}
                  className="px-2 py-1 text-[11px] text-stone-400 hover:text-stone-200 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors"
                  title="Purge all cookies for this domain"
                >
                  Clear Domain
                </button>
                <button
                  onClick={() => onClearCookie(cookie.id)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-rose-400 hover:bg-stone-800 transition-colors"
                  title="Delete cookie"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Domain Exceptions White-list */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div>
            <h2 className="text-sm font-bold text-stone-100">Cookie Domain Whitelist Exceptions</h2>
            <p className="text-xs text-stone-400">Domains allowed to store essential authentication tokens without strict auto-clearing</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {cookiePolicy.domainExceptions.map(domain => (
            <div
              key={domain}
              className="px-3 py-1 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 flex items-center gap-2"
            >
              <span>{domain}</span>
              <button
                onClick={() =>
                  onUpdatePolicy({
                    domainExceptions: cookiePolicy.domainExceptions.filter(d => d !== domain)
                  })
                }
                className="text-stone-500 hover:text-rose-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            placeholder="e.g. sso.corporate.com"
            value={newExceptionInput}
            onChange={e => setNewExceptionInput(e.target.value)}
            className="px-3 py-1.5 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500 w-56"
          />
          <button
            onClick={() => {
              if (newExceptionInput.trim()) {
                onUpdatePolicy({
                  domainExceptions: [...cookiePolicy.domainExceptions, newExceptionInput.trim()]
                });
                setNewExceptionInput('');
              }
            }}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold"
          >
            Add Exception
          </button>
        </div>
      </div>
    </div>
  );
};
