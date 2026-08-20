import React, { useState } from 'react';
import {
  Globe,
  Send,
  Sparkles,
  CheckCircle,
  MessageSquare,
  Languages,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniTranslationSession } from '../../../types/omni_social_ai';

export const OmniAiTranslationView: React.FC = () => {
  const [session, setSession] = useState<OmniTranslationSession>(omniSocialAiEngine.getTranslationSession());
  const [activeUser, setActiveUser] = useState(session.participants[0]);
  const [inputText, setInputText] = useState('');
  const [viewLanguage, setViewLanguage] = useState<'en' | 'es' | 'fr'>('en');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    omniSocialAiEngine.sendTranslatedMessage(
      activeUser.userId,
      inputText,
      `${activeUser.preferredLanguage} (${activeUser.langCode})`
    );
    setSession({ ...omniSocialAiEngine.getTranslationSession() });
    setInputText('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">OMNI AI Multilingual Translation Gateway</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full">
                  Zero-Barrier Global Chat
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Live multi-party translation across 45+ languages with original text preservation, dialect nuance & tone fidelity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <Languages className="w-4 h-4 text-blue-400" /> View Chat In:
            </span>
            {(['en', 'es', 'fr'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setViewLanguage(lang)}
                className={`px-2.5 py-1 text-xs font-bold rounded uppercase transition-all ${
                  viewLanguage === lang
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tri-Party Translation Interactive Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Participants Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Chat Participants</h3>
          <div className="space-y-3">
            {session.participants.map(p => (
              <div
                key={p.userId}
                onClick={() => setActiveUser(p)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  activeUser.userId === p.userId
                    ? 'bg-blue-950/50 border-blue-500'
                    : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={p.avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{p.name}</h4>
                    <div className="text-[11px] text-blue-300 font-semibold">
                      Speaks: {p.preferredLanguage}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-slate-300 block mb-1">Architecture Guarantee:</span>
            <p>✓ Untampered original text stored in cryptographic ledger.</p>
            <p>✓ Sub-50ms streaming neural translations.</p>
            <p>✓ Professional tone preservation.</p>
          </div>
        </div>

        {/* Live Translated Chat Stream */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between space-y-4 min-h-[500px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Synchronized Session • Viewing as <strong className="text-white uppercase">{viewLanguage}</strong></span>
            </div>
            <span className="text-xs text-blue-400 font-semibold">Preserving Original Integrity</span>
          </div>

          {/* Messages */}
          <div className="space-y-4 overflow-y-auto max-h-96 pr-2">
            {session.messages.map(msg => {
              const sender = session.participants.find(p => p.userId === msg.senderId) || session.participants[0];
              const isMe = activeUser.userId === msg.senderId;
              const displayText =
                viewLanguage === sender.langCode
                  ? msg.originalText
                  : msg.translations[viewLanguage] || msg.originalText;

              return (
                <div key={msg.id} className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                  <img src={sender.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-700" />
                  <div className={`max-w-[75%] space-y-1 ${isMe ? 'items-end' : ''}`}>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="font-bold text-white">{sender.name}</span>
                      <span>({msg.originalLanguage})</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Main translated text bubble */}
                    <div
                      className={`p-3 rounded-xl text-xs ${
                        isMe
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'
                      }`}
                    >
                      <p className="leading-relaxed font-medium">{displayText}</p>
                    </div>

                    {/* Original text expandable toggle if translated */}
                    {viewLanguage !== sender.langCode && (
                      <div className="text-[10px] text-slate-500 px-2 py-0.5 bg-slate-950/80 rounded border border-slate-800/80 inline-block">
                        <span className="font-semibold text-slate-400">Original ({sender.langCode}):</span> "{msg.originalText}"
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Type a message as ${activeUser.name} in ${activeUser.preferredLanguage}...`}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" /> Send ({activeUser.preferredLanguage})
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
