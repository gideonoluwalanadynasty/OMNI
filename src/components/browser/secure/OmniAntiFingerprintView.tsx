import React from 'react';
import {
  Fingerprint,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Tv,
  Volume2,
  Type,
  Maximize2,
  Radio,
  Battery,
  AlertTriangle,
  Info,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { OmniAntiFingerprintConfig } from '../../../types';

interface OmniAntiFingerprintViewProps {
  config: OmniAntiFingerprintConfig;
  onUpdateConfig: (config: Partial<OmniAntiFingerprintConfig>) => void;
}

export const OmniAntiFingerprintView: React.FC<OmniAntiFingerprintViewProps> = ({
  config,
  onUpdateConfig
}) => {
  const protections = [
    {
      key: 'canvasNoiseInjection',
      title: 'Canvas 2D Rendering Noise Jitter',
      description: 'Injects imperceptible pseudo-random sub-pixel jitter into HTML5 Canvas readbacks to poison hash generation.',
      icon: <Tv className="w-4 h-4 text-purple-400" />
    },
    {
      key: 'webGlVendorMasking',
      title: 'WebGL GPU Vendor & Renderer Masking',
      description: 'Replaces specific graphics driver strings (e.g. Apple M3 Max, NVIDIA RTX 4090) with standardized generic renderer profiles.',
      icon: <Cpu className="w-4 h-4 text-cyan-400" />
    },
    {
      key: 'audioBufferFuzzing',
      title: 'Web Audio API Oscillator Fuzzing',
      description: 'Adds nanosecond acoustic drift to AudioContext synthesis channels to disrupt audio buffer fingerprinting.',
      icon: <Volume2 className="w-4 h-4 text-indigo-400" />
    },
    {
      key: 'fontEnumerationSpoofing',
      title: 'Font Enumeration Cloaking',
      description: 'Restricts document font-probe queries to a sanitized baseline set, concealing locally installed bespoke fonts.',
      icon: <Type className="w-4 h-4 text-emerald-400" />
    },
    {
      key: 'clientHintsStandardization',
      title: 'Client Hints (Sec-CH-UA) Uniformity',
      description: 'Standardizes HTTP request headers to mimic the most common global browser cohort distribution.',
      icon: <Sliders className="w-4 h-4 text-amber-400" />
    },
    {
      key: 'screenResolutionLetterboxing',
      title: 'Screen Resolution Letterboxing',
      description: 'Pads inner viewport dimensions with subtle margins to prevent fingerprinting by exact monitor aspect ratios.',
      icon: <Maximize2 className="w-4 h-4 text-pink-400" />
    },
    {
      key: 'webRtcIpLeakShield',
      title: 'WebRTC STUN / Host Candidate Shield',
      description: 'Prevents JavaScript from querying local network adapter IPs via unauthenticated WebRTC peer handshakes.',
      icon: <Radio className="w-4 h-4 text-rose-400" />
    },
    {
      key: 'batteryStatusSpoofing',
      title: 'Battery & Hardware Concurrency Fuzzing',
      description: 'Masks battery level, charging status, and CPU core counts (navigator.hardwareConcurrency) from third-party scripts.',
      icon: <Battery className="w-4 h-4 text-teal-400" />
    }
  ];

  return (
    <div id="omni-anti-fingerprint-view" className="space-y-6">
      {/* 1. Transparent Anonymity Notice (Anti-Overclaiming Requirement) */}
      <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-800/80 space-y-2.5">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
          <Info className="w-4 h-4 shrink-0" />
          <span>IMPORTANT PRIVACY TRANSPARENCY NOTICE: DEFENSE-IN-DEPTH VS. PERFECT ANONYMITY</span>
        </div>
        <p className="text-xs text-amber-200/90 leading-relaxed">
          OMNI Secure employs defense-in-depth entropy reduction, cryptographic VPN tunneling, and hardware noise injection to severely hinder passive tracking and cross-site correlation. However, <strong>no single software layer provides absolute mathematical anonymity</strong>. Targeted adversaries with nation-state traffic analysis capabilities or browser-level 0-day exploits require decentralized multi-hop onion routing (e.g. Tor) and extreme operational security. We do not claim perfect anonymity.
        </p>
      </div>

      {/* 2. Fingerprint Jitter Controls Deck */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div>
            <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-purple-400" />
              Active Anti-Fingerprinting Defense Enclave
            </h2>
            <p className="text-xs text-stone-400">Poisoning hardware entropy and homogenizing browser identity metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {protections.map(item => {
            const isEnabled = (config as any)[item.key] ?? false;
            return (
              <div
                key={item.key}
                className={`p-4 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
                  isEnabled
                    ? 'bg-stone-800/40 border-stone-700 text-stone-200'
                    : 'bg-stone-900/40 border-stone-800 text-stone-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-stone-800 shrink-0 mt-0.5">{item.icon}</div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-stone-100">{item.title}</div>
                    <p className="text-xs text-stone-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="shrink-0 pt-1">
                  <button
                    onClick={() => onUpdateConfig({ [item.key]: !isEnabled } as any)}
                    className={`w-10 h-6 rounded-full p-1 transition-colors ${
                      isEnabled ? 'bg-purple-600' : 'bg-stone-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        isEnabled ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
