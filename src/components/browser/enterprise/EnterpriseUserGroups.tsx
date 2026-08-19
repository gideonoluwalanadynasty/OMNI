import React, { useState } from 'react';
import { EnterpriseUserGroup } from '../../../types/enterprise_audit';
import { INITIAL_USER_GROUPS } from '../../../data/mockEnterpriseAuditData';
import {
  Users,
  Shield,
  Lock,
  Clock,
  Eye,
  CheckCircle2,
  Plus,
  Trash2,
  Building2,
  Landmark,
  GraduationCap,
  HeartHandshake
} from 'lucide-react';

export const EnterpriseUserGroups: React.FC = () => {
  const [groups, setGroups] = useState<EnterpriseUserGroup[]>(INITIAL_USER_GROUPS);
  const [selectedGroupId, setSelectedGroupId] = useState<string>(INITIAL_USER_GROUPS[0].id);

  const selectedGroup = groups.find(g => g.id === selectedGroupId) || groups[0];

  const handleToggleFeature = (field: keyof Pick<EnterpriseUserGroup, 'aiExfiltrationProtection' | 'watermarkOverlay' | 'clipboardGuard' | 'screenCaptureBlocked'>) => {
    setGroups(prev =>
      prev.map(g => (g.id === selectedGroup.id ? { ...g, [field]: !g[field] } : g))
    );
  };

  const getClearanceBadge = (level: EnterpriseUserGroup['clearanceLevel']) => {
    switch (level) {
      case 'top_secret':
        return { label: 'TOP SECRET // SCI', color: 'text-rose-400 bg-rose-950/80 border-rose-800' };
      case 'secret':
        return { label: 'SECRET', color: 'text-amber-400 bg-amber-950/80 border-amber-800' };
      case 'confidential':
        return { label: 'CONFIDENTIAL', color: 'text-indigo-400 bg-indigo-950/80 border-indigo-800' };
      case 'restricted':
        return { label: 'RESTRICTED R&D', color: 'text-cyan-400 bg-cyan-950/80 border-cyan-800' };
      default:
        return { label: 'UNCLASSIFIED', color: 'text-stone-400 bg-stone-900 border-stone-800' };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-100">Enterprise User Groups & Clearance Tiers (RBAC)</h2>
          <p className="text-xs text-stone-400">
            Segment organization departments with granular clearance classifications, dynamic watermarking, and clipboard guards.
          </p>
        </div>

        <button
          onClick={() => {
            const newGrp: EnterpriseUserGroup = {
              id: `grp-${Date.now()}`,
              name: 'New Department Unit',
              sector: 'company',
              clearanceLevel: 'confidential',
              memberCount: 1,
              policyProfileId: 'corp-zero-trust',
              allowedInternalPortals: ['portal-erp'],
              aiExfiltrationProtection: true,
              watermarkOverlay: false,
              clipboardGuard: true,
              screenCaptureBlocked: false,
              sessionTimeoutMinutes: 60
            };
            setGroups([...groups, newGrp]);
            setSelectedGroupId(newGrp.id);
          }}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add User Group</span>
        </button>
      </div>

      {/* Grid: Group List + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Group Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-semibold text-stone-400 px-1">ACTIVE USER GROUPS ({groups.length})</div>

          <div className="space-y-2">
            {groups.map((group) => {
              const cl = getClearanceBadge(group.clearanceLevel);
              const isSelected = selectedGroupId === group.id;

              return (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroupId(group.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-stone-800/90 border-indigo-500 shadow-md'
                      : 'bg-stone-900/90 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold ${cl.color}`}>
                      {cl.label}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">{group.memberCount} members</span>
                  </div>

                  <div className="font-bold text-xs text-stone-200">{group.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Group Clearance Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
              <div>
                <h3 className="text-sm font-bold text-stone-100">{selectedGroup.name}</h3>
                <div className="text-stone-400 text-[11px] mt-0.5">
                  Sector: <strong className="text-stone-200 uppercase font-mono">{selectedGroup.sector}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-300 font-mono text-[11px]">Timeout: {selectedGroup.sessionTimeoutMinutes} min</span>
              </div>
            </div>

            {/* Clearance & Security Controls Switches */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-200">AI Prompt Secret & PII Masking</div>
                  <div className="text-[10px] text-stone-500">Auto-redact API tokens and client confidential data before LLM dispatch.</div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedGroup.aiExfiltrationProtection}
                  onChange={() => handleToggleFeature('aiExfiltrationProtection')}
                  className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-200">Dynamic Forensic Watermarking Overlay</div>
                  <div className="text-[10px] text-stone-500">Stamp user ID, timestamp, and IP hash across all browser tab viewports.</div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedGroup.watermarkOverlay}
                  onChange={() => handleToggleFeature('watermarkOverlay')}
                  className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-200">Clipboard & Print Screen Guard</div>
                  <div className="text-[10px] text-stone-500">Block copying sensitive corporate text to unverified personal applications.</div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedGroup.clipboardGuard}
                  onChange={() => handleToggleFeature('clipboardGuard')}
                  className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-200">Screen Capture & Window Sharing Block</div>
                  <div className="text-[10px] text-stone-500">Prevent third-party screen recorders or video call window capture.</div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedGroup.screenCaptureBlocked}
                  onChange={() => handleToggleFeature('screenCaptureBlocked')}
                  className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
