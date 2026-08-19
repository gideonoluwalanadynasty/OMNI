export type EnterpriseOrgSector = 'company' | 'school' | 'government' | 'ngo';

export type EnterpriseDeviceType = 'desktop_macos' | 'desktop_windows' | 'desktop_linux' | 'mobile_ios' | 'mobile_android' | 'sovereign_terminal';

export type EnterprisePolicyEnforcementLevel = 'strict_block' | 'warn_with_justification' | 'audit_only' | 'disabled';

export interface EnterpriseManagedDevice {
  id: string;
  name: string;
  assignedUser: string;
  userEmail: string;
  department: string;
  deviceType: EnterpriseDeviceType;
  osVersion: string;
  omniBrowserVersion: string;
  serialNumber: string;
  ipAddress: string;
  lastSyncTimestamp: string;
  complianceStatus: 'compliant' | 'warning' | 'non_compliant' | 'quarantined';
  appliedPolicyProfile: string;
  hardwareSecurityModule: boolean;
  pqcKyberActive: boolean;
  isRemoteLocked: boolean;
}

export interface EnterprisePolicyRule {
  id: string;
  category: 'dlp' | 'network' | 'ai_governance' | 'extensions' | 'identity' | 'media';
  name: string;
  description: string;
  enforcementLevel: EnterprisePolicyEnforcementLevel;
  isEnabled: boolean;
  value: string | boolean | number | string[];
}

export interface EnterprisePolicyProfile {
  id: string;
  name: string;
  targetSector: EnterpriseOrgSector;
  description: string;
  isDefault: boolean;
  assignedDeviceCount: number;
  rules: EnterprisePolicyRule[];
  lastModified: string;
}

export interface EnterpriseUserGroup {
  id: string;
  name: string;
  sector: EnterpriseOrgSector;
  clearanceLevel: 'unclassified' | 'restricted' | 'confidential' | 'secret' | 'top_secret';
  memberCount: number;
  policyProfileId: string;
  allowedInternalPortals: string[];
  aiExfiltrationProtection: boolean;
  watermarkOverlay: boolean;
  clipboardGuard: boolean;
  screenCaptureBlocked: boolean;
  sessionTimeoutMinutes: number;
}

export interface EnterpriseInternalPortalApp {
  id: string;
  name: string;
  category: 'operations' | 'finance' | 'defense' | 'research' | 'academics' | 'hr';
  icon: string;
  url: string;
  ssoEnabled: boolean;
  requiredClearance: string;
  description: string;
  badgeText?: string;
  isAirGapped: boolean;
}

export interface EnterpriseTrainingModule {
  id: string;
  title: string;
  category: 'phishing' | 'credential_hygiene' | 'ai_data_leakage' | 'sovereign_pqc' | 'compliance_fedramp';
  durationMinutes: number;
  completionRate: number; // percentage
  status: 'passed' | 'in_progress' | 'required';
  score?: number;
  description: string;
  interactiveDrillType?: 'phishing_email' | 'malicious_extension' | 'prompt_injection' | 'unauthorized_export';
}

export interface SecurityAuditResult {
  id: string;
  testVector: 
    | 'extension_abuse' 
    | 'malicious_websites' 
    | 'tenant_leakage' 
    | 'vpn_permissions' 
    | 'sync_security' 
    | 'password_vault' 
    | 'ai_privacy' 
    | 'data_leakage';
  title: string;
  status: 'passed' | 'running' | 'warning' | 'failed';
  score: number; // 0 - 100
  latencyMs: number;
  details: string;
  cryptographicProof: string;
  recommendations: string[];
  timestamp: string;
}

export interface PerformanceAuditMetric {
  id: string;
  area: 
    | 'browser_loading' 
    | 'sync' 
    | 'storage' 
    | 'ai_latency' 
    | 'media_handling' 
    | 'extensions';
  name: string;
  measuredValue: string;
  benchmarkTarget: string;
  unit: string;
  status: 'optimal' | 'good' | 'degraded';
  ratingScore: number; // 0 - 100
  breakdown: { label: string; value: string }[];
}
