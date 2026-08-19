import React, { useState } from 'react';
import {
  Laptop,
  Smartphone,
  ShieldAlert,
  ShieldCheck,
  Key,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Globe,
  Clock,
  LogOut,
  MapPin,
  Fingerprint,
  Zap
} from 'lucide-react';
import {
  OmniBrowserAuthorizedDevice,
  OmniBrowserSecuritySession,
  OmniBrowserSuspiciousAlert,
  OmniBrowserSecurityAuditLog
} from '../../../types';
import { deviceSecurityService } from '../../../sdk/browser-services/DeviceSecurityService';

interface DeviceRegistryDrawerProps {
  devices: OmniBrowserAuthorizedDevice[];
  sessions: OmniBrowserSecuritySession[];
  suspiciousAlerts: OmniBrowserSuspiciousAlert[];
  onRevokeDevice: (deviceId: string) => void;
  onResolveAlert: (alertId: string) => void;
}

export const DeviceRegistryDrawer: React.FC<DeviceRegistryDrawerProps> = ({
  devices,
  sessions,
  suspiciousAlerts,
  onRevokeDevice,
  onResolveAlert
}) => {
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const unresolvedAlerts = suspiciousAlerts.filter(a => !a.resolved);

  const handleRevoke = (deviceId: string) => {
    setRevokingId(deviceId);
    setTimeout(() => {
      onRevokeDevice(deviceId);
      setRevokingId(null);
    }, 400);
  };

  return (
    <div id="device-registry-drawer" className="space-y-4 text-stone-100">
      {/* 1. Suspicious Login Alerts Banner if active */}
      {unresolvedAlerts.length > 0 && (
        <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-300">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Suspicious Ingress Detected</span>
          </div>
          {unresolvedAlerts.map(alert => (
            <div key={alert.id} className="p-2 bg-stone-950/80 border border-rose-900/60 rounded-lg space-y-1.5 text-xs">
              <div className="font-semibold text-stone-100">{alert.title}</div>
              <p className="text-[11px] text-stone-300 leading-snug">{alert.description}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-rose-400">{alert.ipAddress}</span>
                <button
                  onClick={() => onResolveAlert(alert.id)}
                  className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[10px] font-semibold transition-colors"
                >
                  Verify & Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. OMNI Passport Hardware Enclave Header */}
      <div className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-indigo-400" />
            <div className="text-xs font-semibold text-stone-100">OMNI Passport Sovereign Registry</div>
          </div>
          <span className="px-2 py-0.5 bg-indigo-950 border border-indigo-800 text-indigo-300 rounded-full text-[10px] font-mono">
            {devices.filter(d => d.status === 'trusted').length} Active Enclaves
          </span>
        </div>
        <p className="text-[11px] text-stone-400 leading-snug">
          Cryptographically registered hardware enclaves authorized for end-to-end synced workspace decryption.
        </p>
      </div>

      {/* 3. Authorized Hardware Devices List */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-stone-400 px-1">Authorized Sovereign Nodes</div>

        <div className="space-y-2.5">
          {devices.map(device => {
            const isRevoked = device.status === 'revoked';
            const isProcessing = revokingId === device.id;

            return (
              <div
                key={device.id}
                id={`device-card-${device.id}`}
                className={`p-3.5 bg-stone-950 border rounded-xl space-y-2.5 transition-all ${
                  isRevoked
                    ? 'border-stone-800/50 opacity-60'
                    : 'border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 shrink-0">
                      {device.platform === 'ios' || device.platform === 'android' ? (
                        <Smartphone className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Laptop className="w-4 h-4 text-indigo-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-100 flex items-center gap-2">
                        <span>{device.deviceName}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] font-mono uppercase ${
                            device.status === 'trusted'
                              ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                              : 'bg-rose-950/80 border border-rose-800 text-rose-300'
                          }`}
                        >
                          {device.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-stone-400 flex items-center gap-2 mt-0.5">
                        <span className="capitalize">{device.deviceType}</span>
                        <span>•</span>
                        <span>Trust Score: {device.trustScore}/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Remote Killswitch / Revoke */}
                  {!isRevoked && (
                    <button
                      id={`btn-revoke-device-${device.id}`}
                      onClick={() => handleRevoke(device.id)}
                      disabled={isProcessing}
                      className="px-2.5 py-1 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800 text-rose-300 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all"
                      title="Remotely terminate device authorization and purge session keys"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>{isProcessing ? 'Revoking...' : 'Revoke'}</span>
                    </button>
                  )}
                </div>

                {/* Device Security Metadata Strip */}
                <div className="p-2 bg-stone-900/90 border border-stone-800/80 rounded text-[10px] text-stone-400 grid grid-cols-2 gap-2 font-mono">
                  <div className="flex items-center gap-1 truncate">
                    <MapPin className="w-2.5 h-2.5 text-stone-500 shrink-0" />
                    <span className="truncate">{device.lastLocation}</span>
                  </div>
                  <div className="flex items-center gap-1 truncate justify-end">
                    <Key className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                    <span className="truncate">{device.enclaveKeyFingerprint.substring(0, 16)}...</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Active Sovereign Sessions */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-stone-400 px-1">Active Sovereign Sessions</div>
        <div className="space-y-2">
          {sessions.slice(0, 4).map(session => (
            <div
              key={session.id}
              className="p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-stone-200 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${session.status === 'active' ? 'bg-emerald-400' : 'bg-stone-600'}`} />
                  {session.ipAddress}
                </span>
                <span className="text-[10px] text-stone-400">{session.location}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono">
                <span>Enclave: {session.enclaveEncrypted ? 'Isolated' : 'Standard'}</span>
                <span>Last active: {new Date(session.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
