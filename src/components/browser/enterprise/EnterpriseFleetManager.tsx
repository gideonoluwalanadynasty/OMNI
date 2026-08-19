import React, { useState } from 'react';
import { EnterpriseManagedDevice, EnterpriseOrgSector } from '../../../types/enterprise_audit';
import { INITIAL_ENTERPRISE_DEVICES } from '../../../data/mockEnterpriseAuditData';
import {
  Laptop,
  Smartphone,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  RefreshCw,
  Search,
  Filter,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap
} from 'lucide-react';

export const EnterpriseFleetManager: React.FC = () => {
  const [devices, setDevices] = useState<EnterpriseManagedDevice[]>(INITIAL_ENTERPRISE_DEVICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState<'all' | EnterpriseOrgSector>('all');
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>(INITIAL_ENTERPRISE_DEVICES[0].id);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filteredDevices = devices.filter(d => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.assignedUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const selectedDevice = devices.find(d => d.id === selectedDeviceId) || devices[0];

  const handleToggleLock = (deviceId: string) => {
    setDevices(prev =>
      prev.map(d => {
        if (d.id === deviceId) {
          const nextState = !d.isRemoteLocked;
          setActionNotice(`Device "${d.name}" ${nextState ? 'REMOTE LOCKED' : 'UNLOCKED'} via OMNI MDM Gateway.`);
          setTimeout(() => setActionNotice(null), 3000);
          return {
            ...d,
            isRemoteLocked: nextState,
            complianceStatus: nextState ? 'quarantined' : 'compliant'
          };
        }
        return d;
      })
    );
  };

  const handleRemoteWipe = (deviceId: string) => {
    setDevices(prev =>
      prev.map(d => {
        if (d.id === deviceId) {
          setActionNotice(`Device "${d.name}" memory wiped and reset to factory un-enrolled state.`);
          setTimeout(() => setActionNotice(null), 3000);
          return {
            ...d,
            complianceStatus: 'quarantined',
            isRemoteLocked: true
          };
        }
        return d;
      })
    );
  };

  const handleEnrollDevice = () => {
    const newDev: EnterpriseManagedDevice = {
      id: `dev-${Date.now()}`,
      name: 'New-Enterprise-Fleet-Node',
      assignedUser: 'New Enterprise Operator',
      userEmail: 'operator@enterprise.omni',
      department: 'Global Operations',
      deviceType: 'desktop_linux',
      osVersion: 'Sovereign Linux 6.10',
      omniBrowserVersion: 'v4.2.0-enterprise-pqc',
      serialNumber: `OMNI-FLEET-${Math.floor(Math.random() * 90000) + 10000}`,
      ipAddress: '10.240.50.88',
      lastSyncTimestamp: 'Just now',
      complianceStatus: 'compliant',
      appliedPolicyProfile: 'corp-zero-trust',
      hardwareSecurityModule: true,
      pqcKyberActive: true,
      isRemoteLocked: false
    };
    setDevices([newDev, ...devices]);
    setSelectedDeviceId(newDev.id);
    setActionNotice(`Enrolled new managed node "${newDev.name}" with Kyber-1024 attestation.`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const getDeviceIcon = (type: EnterpriseManagedDevice['deviceType']) => {
    if (type.includes('mobile')) return Smartphone;
    return Laptop;
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner & Action Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-100">Enterprise Managed Browser Fleet</h2>
          <p className="text-xs text-stone-400">
            Real-time MDM device posture checking, remote session kill-switches, and zero-touch deployment.
          </p>
        </div>

        <button
          onClick={handleEnrollDevice}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Enroll New Device</span>
        </button>
      </div>

      {actionNotice && (
        <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>{actionNotice}</span>
          </div>
          <span className="font-mono text-[10px]">MDM Sync 200 OK</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by device name, user, department or serial..."
            className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-stone-100 placeholder-stone-500 outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-stone-400">Fleet Nodes: <strong className="text-stone-200">{filteredDevices.length}</strong></span>
        </div>
      </div>

      {/* Grid: Device List + Device Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Device List */}
        <div className="lg:col-span-6 space-y-2.5">
          <div className="space-y-2">
            {filteredDevices.map((device) => {
              const Icon = getDeviceIcon(device.deviceType);
              const isSelected = selectedDeviceId === device.id;

              return (
                <div
                  key={device.id}
                  onClick={() => setSelectedDeviceId(device.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-stone-800/90 border-indigo-500 shadow-md'
                      : 'bg-stone-900/90 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-xl ${
                      isSelected ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' : 'bg-stone-950 text-stone-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs font-bold text-stone-100 truncate flex items-center gap-2">
                        <span>{device.name}</span>
                        {device.isRemoteLocked && (
                          <span className="px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[9px] font-mono">
                            LOCKED
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-400 truncate mt-0.5">
                        {device.assignedUser} • <span className="text-stone-500 font-mono">{device.department}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {device.complianceStatus === 'compliant' ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                        COMPLIANT
                      </span>
                    ) : device.complianceStatus === 'warning' ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-mono">
                        PATCH NEEDED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-mono">
                        QUARANTINED
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Device Detail Inspector */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono">
                  {selectedDevice.serialNumber}
                </span>
                <h3 className="text-base font-bold text-stone-100 mt-1">{selectedDevice.name}</h3>
                <div className="text-stone-400 mt-0.5">
                  Assigned to: <strong className="text-stone-200">{selectedDevice.assignedUser}</strong> ({selectedDevice.userEmail})
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleLock(selectedDevice.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    selectedDevice.isRemoteLocked
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                      : 'bg-rose-950 text-rose-300 border-rose-800 hover:bg-rose-900'
                  }`}
                >
                  {selectedDevice.isRemoteLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>{selectedDevice.isRemoteLocked ? 'Unlock Node' : 'Remote Lock'}</span>
                </button>

                <button
                  onClick={() => handleRemoteWipe(selectedDevice.id)}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Remote Wipe</span>
                </button>
              </div>
            </div>

            {/* Spec breakdown table */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-stone-950 border border-stone-800 font-mono text-[11px]">
              <div>
                <div className="text-stone-500 text-[10px]">OS VERSION</div>
                <div className="text-stone-200 font-bold">{selectedDevice.osVersion}</div>
              </div>

              <div>
                <div className="text-stone-500 text-[10px]">OMNI BROWSER ENGINE</div>
                <div className="text-cyan-300 font-bold">{selectedDevice.omniBrowserVersion}</div>
              </div>

              <div>
                <div className="text-stone-500 text-[10px]">IP / MESH ADDRESS</div>
                <div className="text-stone-300">{selectedDevice.ipAddress}</div>
              </div>

              <div>
                <div className="text-stone-500 text-[10px]">LAST HEARTBEAT</div>
                <div className="text-emerald-400 font-bold">{selectedDevice.lastSyncTimestamp}</div>
              </div>
            </div>

            {/* Hardware & Cryptographic Posture */}
            <div className="space-y-2">
              <div className="font-bold text-stone-300">Hardware & Cryptographic Attestation</div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-bold text-stone-200">Hardware Security Module (HSM / TPM 2.0)</div>
                    <div className="text-[10px] text-stone-500">Hardware-bound cryptographic keys & secure boot verified.</div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  selectedDevice.hardwareSecurityModule
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-stone-800 text-stone-500'
                }`}>
                  {selectedDevice.hardwareSecurityModule ? 'ACTIVE' : 'NONE'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="font-bold text-stone-200">Kyber-1024 Post-Quantum Handshake</div>
                    <div className="text-[10px] text-stone-500">NIST FIPS 203 level post-quantum key encapsulation.</div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  selectedDevice.pqcKyberActive
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                    : 'bg-stone-800 text-stone-500'
                }`}>
                  {selectedDevice.pqcKyberActive ? 'ENFORCED' : 'LEGACY'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
