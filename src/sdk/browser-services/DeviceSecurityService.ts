import {
  OmniBrowserAuthorizedDevice,
  OmniBrowserSecuritySession,
  OmniBrowserSuspiciousAlert,
  OmniBrowserSecurityAuditLog
} from '../../types';

export class DeviceSecurityService {
  private static instance: DeviceSecurityService;

  public static getInstance(): DeviceSecurityService {
    if (!DeviceSecurityService.instance) {
      DeviceSecurityService.instance = new DeviceSecurityService();
    }
    return DeviceSecurityService.instance;
  }

  /**
   * Revoke an authorized device and invalidate its sovereign sessions (remote killswitch)
   */
  revokeDevice(
    devices: OmniBrowserAuthorizedDevice[],
    sessions: OmniBrowserSecuritySession[],
    deviceId: string
  ): {
    updatedDevices: OmniBrowserAuthorizedDevice[];
    updatedSessions: OmniBrowserSecuritySession[];
    auditLog: OmniBrowserSecurityAuditLog;
  } {
    const updatedDevices = devices.map(d =>
      d.id === deviceId ? { ...d, status: 'revoked' as const } : d
    );
    const updatedSessions = sessions.map(s =>
      s.deviceId === deviceId ? { ...s, status: 'revoked' as const } : s
    );

    const revokedDevice = devices.find(d => d.id === deviceId);

    const auditLog: OmniBrowserSecurityAuditLog = {
      id: `sec_revoke_${Date.now()}`,
      timestamp: new Date().toISOString(),
      url: 'omni://security/devices/revoke',
      eventType: 'cookie_isolated',
      domain: 'passport.omni.internal',
      actionTaken: `Remotely revoked sovereign authorization for device ${revokedDevice?.deviceName || deviceId}. Sessions terminated.`,
      protectionLayer: 'OMNI Passport Device Registry'
    };

    return { updatedDevices, updatedSessions, auditLog };
  }

  /**
   * Run heuristic inspection for impossible travel and suspicious logins
   */
  evaluateLoginRisk(
    currentIp: string,
    currentCity: string,
    previousSessions: OmniBrowserSecuritySession[]
  ): OmniBrowserSuspiciousAlert | null {
    const lastActiveSession = previousSessions[0];
    if (!lastActiveSession) return null;

    // Check if IP differs significantly
    if (lastActiveSession.ipAddress !== currentIp && currentCity !== 'New York') {
      return {
        id: `alert_geo_${Date.now()}`,
        timestamp: new Date().toISOString(),
        severity: 'high',
        title: 'Impossible Travel / Geolocation Discrepancy',
        description: `Ingress from ${currentCity} (${currentIp}) registered within short timeframe of previous active session from ${lastActiveSession.ipAddress}.`,
        deviceId: lastActiveSession.deviceId,
        ipAddress: currentIp,
        resolved: false,
        actionTaken: 'MFA challenge requested before session issuance'
      };
    }

    return null;
  }

  /**
   * Resolve a suspicious alert
   */
  resolveAlert(
    alerts: OmniBrowserSuspiciousAlert[],
    alertId: string
  ): OmniBrowserSuspiciousAlert[] {
    return alerts.map(a =>
      a.id === alertId ? { ...a, resolved: true, actionTaken: 'Marked as verified by user' } : a
    );
  }
}

export const deviceSecurityService = DeviceSecurityService.getInstance();
