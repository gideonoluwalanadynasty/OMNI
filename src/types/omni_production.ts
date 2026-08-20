export type ModuleStatus = 'active' | 'degraded' | 'maintenance' | 'disabled';

export type SubscriptionTierRequirement = 'all' | 'verified_plus' | 'pro' | 'enterprise_sovereign';

export interface GlobalModuleControl {
  id: string;
  name: string;
  category:
    | 'identity'
    | 'social_feed'
    | 'messaging'
    | 'communities'
    | 'commerce'
    | 'crm'
    | 'creator_economy'
    | 'ai_engine'
    | 'ads_network'
    | 'white_label'
    | 'developer_platform';
  status: ModuleStatus;
  description: string;
  version: string;
  globalEnabled: boolean;
  minSubscriptionTier: SubscriptionTierRequirement;
  geoRestrictions: {
    mode: 'allow_all' | 'whitelist' | 'blacklist';
    countryCodes: string[];
  };
  tenantRestrictions: {
    allowAllTenants: boolean;
    excludedTenantIds: string[];
    isolatedTenantOnly: boolean;
  };
  rateLimitPerMinute: number;
  circuitBreakerThresholdPct: number;
  lastHealthCheck: string;
  slaUptime30d: number;
}

export type SecurityCategory =
  | 'authentication'
  | 'authorization'
  | 'privacy_controls'
  | 'messaging_security'
  | 'tenant_isolation'
  | 'api_security'
  | 'file_media_security'
  | 'ai_security'
  | 'anti_fraud_commerce'
  | 'anti_bot_spam';

export interface SecurityAuditVector {
  id: string;
  name: string;
  category: SecurityCategory;
  description: string;
  riskSeverity: 'low' | 'medium' | 'high' | 'critical';
  testMethod: string;
  expectedDefense: string;
  status: 'passed' | 'failed' | 'warning' | 'running' | 'untested';
  executionTimeMs: number;
  lastTestedAt: string;
  details: string;
  mitigationProtocol: string;
}

export interface SecurityIncident {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: SecurityCategory;
  detectedAt: string;
  sourceIpOrActor: string;
  targetSubsystem: string;
  mitigationApplied: string;
  status: 'resolved' | 'mitigating' | 'investigating';
}

export interface LoadTestVector {
  id: string;
  name: string;
  targetSubsystem:
    | 'millions_of_users_login'
    | 'high_volume_messaging'
    | 'large_community_broadcast'
    | 'ranking_feed_generation'
    | 'webrtc_video_traffic'
    | 'global_search_indexing';
  concurrencyRps: number;
  simulatedUsers: number;
  durationSeconds: number;
  status: 'idle' | 'running' | 'completed' | 'failed';
  metrics: {
    p50LatencyMs: number;
    p95LatencyMs: number;
    p99LatencyMs: number;
    throughputRps: number;
    errorRatePct: number;
    cpuUtilizationPct: number;
    memoryUtilizationPct: number;
    databaseLagMs: number;
  };
}

export interface ScalingSubsystemNode {
  id: string;
  name: string;
  type: 'edge_cdn' | 'redis_cluster' | 'sharded_db' | 'kafka_queue' | 'webrtc_sfu' | 'search_cluster' | 'ai_inference_mesh';
  clusterCount: number;
  activeNodes: number;
  capacityUtilizationPct: number;
  health: 'healthy' | 'warning' | 'critical';
  trafficThroughput: string;
  autoScalingGroup: {
    min: number;
    max: number;
    desired: number;
  };
}

export interface DisasterRecoveryDrill {
  id: string;
  name: string;
  scenario: 'cross_region_failover' | 'wal_point_in_time_recovery' | 'redis_cache_evacuation' | 'split_brain_mitigation' | 'tenant_data_reconstruction';
  rpoTargetMinutes: number;
  rtoTargetMinutes: number;
  achievedRpoMinutes: number;
  achievedRtoMinutes: number;
  lastDrillDate: string;
  status: 'passed' | 'warning' | 'scheduled';
  summary: string;
}

export interface ObservabilityMetricPoint {
  timestamp: string;
  messagesPerSec: number;
  apiRequestsPerSec: number;
  aiTokensPerSec: number;
  storageIops: number;
  settlementVolumeUsdPerMin: number;
  threatsBlockedPerMin: number;
  averageLatencyMs: number;
}
