import React from 'react';
import {
  OmniBrowserPrivacyShield,
  OmniBrowserVpnState,
  OmniBrowserVpnNode,
  OmniBrowserSecurityAuditLog
} from '../../types';
import { OmniSecurePlatform } from './secure/OmniSecurePlatform';

interface OmniBrowserSecurityCentreProps {
  privacyShields?: OmniBrowserPrivacyShield[];
  vpnState?: OmniBrowserVpnState;
  vpnNodes?: OmniBrowserVpnNode[];
  auditLogs?: OmniBrowserSecurityAuditLog[];
  onToggleShield?: (shieldId: string) => void;
  onSelectVpnNode?: (nodeId: string) => void;
  onToggleVpn?: () => void;
  onToggleKillSwitch?: () => void;
  onToggleTorBridge?: () => void;
  onSelectDohProvider?: (provider: string) => void;
  onClose: () => void;
}

export const OmniBrowserSecurityCentre: React.FC<OmniBrowserSecurityCentreProps> = ({
  onClose
}) => {
  return (
    <div
      id="browser-security-centre"
      className="flex-1 overflow-y-auto bg-stone-950 text-stone-100 select-none"
    >
      <OmniSecurePlatform onClose={onClose} />
    </div>
  );
};
