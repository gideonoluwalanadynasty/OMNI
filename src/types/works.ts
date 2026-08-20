// ============================================================================
// OMNI WORKS — TYPES & ARCHITECTURE SPECIFICATION
// PART 1: Foundation, Core Registration, Tenant System & Ecosystem Integration
// ============================================================================

export type WorksTenantTier = 'free' | 'team_pro' | 'business' | 'enterprise_sovereign';

export type WorksDataResidency = 'eu-central' | 'us-east' | 'us-west' | 'ap-southeast' | 'af-south' | 'global-mesh';

export type WorksRole = 
  | 'workspace_owner'
  | 'workspace_admin'
  | 'project_lead'
  | 'editor'
  | 'contributor'
  | 'client_guest'
  | 'compliance_auditor';

export type WorksRoleType = WorksRole;

export type WorksSecurityClassification = 'public' | 'internal' | 'confidential' | 'restricted_sovereign';

export type WorksModuleId = 
  | 'docs_canvas'
  | 'relational_dbs'
  | 'agile_sprints'
  | 'knowledge_wiki'
  | 'cloud_drive'
  | 'forms_surveys'
  | 'workflow_automations'
  | 'ai_copilot'
  | 'time_billing'
  | 'client_portals'
  | 'templates_market'
  | 'calendar_sync'
  | 'security_audit';

export interface WorksModuleStatus {
  id: WorksModuleId;
  name: string;
  category: 'core_editor' | 'data_ops' | 'project_mgmt' | 'collaboration' | 'automation' | 'intelligence' | 'governance';
  version: string;
  status: 'active' | 'beta' | 'maintenance' | 'disabled';
  healthScore: number; // 0 - 100
  latencyMs: number;
  uptimePercent: number;
  dependencies: string[];
  capabilities: string[];
  activeInstances: number;
  route: string;
}

export type WorksWorkspaceType = 'personal' | 'company' | 'enterprise';

export interface WorksDepartment {
  id: string;
  workspaceId: string;
  name: string;
  code: string;
  description: string;
  headUserId: string;
  headUserName: string;
  headUserAvatar: string;
  headUserTitle: string;
  parentDepartmentId?: string;
  budgetAnnualUsd: number;
  budgetSpentUsd: number;
  memberCount: number;
  color: string;
  icon: string;
  teamsCount: number;
  objectives: string[];
  accessPolicy: 'open' | 'request_to_join' | 'restricted_invite_only';
  tags: string[];
}

export interface WorksTeam {
  id: string;
  workspaceId: string;
  departmentId: string;
  departmentName: string;
  name: string;
  slug: string;
  type: 'functional' | 'project_squad' | 'cross_department' | 'client_facing';
  description: string;
  leadUserId: string;
  leadUserName: string;
  leadUserAvatar: string;
  leadUserTitle: string;
  memberIds: string[];
  memberCount?: number;
  members?: any[];
  color: string;
  icon: string;
  huddleChannelId?: string;
  linkedSprintBoard?: string;
  linkedDriveFolder?: string;
  activeSprintId?: string;
  activeSprintName?: string;
  sprintVelocityAvg?: number;
  openIssuesCount?: number;
  isPrivate?: boolean;
  status: 'active' | 'archived' | 'forming';
  createdDate: string;
  tags: string[];
}

export interface WorksWorkspace {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  type: WorksWorkspaceType;
  description: string;
  icon: string;
  color: string;
  residency: WorksDataResidency;
  customDomain?: string;
  isDomainVerified: boolean;
  classification: WorksSecurityClassification;
  tier: WorksTenantTier;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  departments: string[];
  activeMembersCount: number;
  storageUsedBytes: number;
  storageLimitBytes: number;
  aiCreditsUsed: number;
  aiCreditsMonthlyLimit: number;
  automationsRunThisMonth: number;
  automationsMonthlyLimit: number;
  activeHuddlesCount: number;
  featureFlags: Record<string, boolean>;
  tags: string[];
  isArchived: boolean;
}

export interface WorksWorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl: string;
  title: string;
  role: WorksRole;
  customRoleName?: string;
  departmentId?: string;
  department?: string;
  teamIds?: string[];
  teams?: string[];
  managerId?: string;
  managerName?: string;
  location: string;
  timezone: string;
  skills: string[];
  phoneNumber?: string;
  workSchedule?: string;
  connectStatus: 'online' | 'busy' | 'away' | 'offline';
  did: string;
  kycVerified: boolean;
  kybVerified: boolean;
  identityVerificationTier: 'tier_1_basic' | 'tier_2_kyc_passed' | 'tier_3_kyb_enterprise_did';
  fido2KeysCount: number;
  twoFactorEnforced: boolean;
  ipWhitelist?: string[];
  lastActiveAt: string;
  joinedAt: string;
  status: 'active' | 'invited' | 'suspended';
  assignedSpaces: string[];
}

export interface WorksCustomRole {
  id: string;
  name: string;
  description: string;
  baseRole: WorksRole;
  color: string;
  memberCount: number;
  permissions: {
    canManageWorkspace: boolean;
    canManageBilling: boolean;
    canManageMembers: boolean;
    canManageDepartments: boolean;
    canManageTeams: boolean;
    canCreateDocs: boolean;
    canDeleteDocs: boolean;
    canCreateDatabases: boolean;
    canManageSprints: boolean;
    canTriggerAutomations: boolean;
    canAccessAiCopilot: boolean;
    canViewAuditLogs: boolean;
    canManageIntegrations: boolean;
  };
}

export interface WorksPermissionPolicy {
  role: WorksRole;
  label: string;
  description: string;
  scopes: {
    workspaces: ('read' | 'create' | 'update' | 'delete' | 'archive' | 'transfer_ownership')[];
    docs: ('read' | 'create' | 'update' | 'delete' | 'publish' | 'export' | 'version_restore')[];
    canvases: ('read' | 'create' | 'update' | 'delete' | 'export')[];
    databases: ('read' | 'create' | 'update' | 'delete' | 'schema_edit' | 'import_export')[];
    sprints: ('read' | 'create' | 'update' | 'delete' | 'assign' | 'close_sprint')[];
    automations: ('read' | 'create' | 'update' | 'delete' | 'execute_manual')[];
    finance: ('read_billables' | 'log_time' | 'approve_timesheets' | 'create_invoices' | 'release_escrow')[];
    ai: ('use_copilot' | 'trigger_agents' | 'fine_tune' | 'manage_keys')[];
    administration: ('manage_members' | 'manage_billing' | 'manage_sso' | 'view_audit_logs' | 'toggle_flags')[];
  };
}

export interface WorksSubscriptionTierInfo {
  tier: WorksTenantTier;
  name: string;
  monthlyPriceUsd: number;
  annualPriceUsd: number;
  maxMembers: number; // -1 for unlimited
  maxStorageGb: number;
  maxAiTokensMonthly: number;
  maxAutomationsMonthly: number;
  maxCustomDomains: number;
  slaUptime: string;
  supportLevel: 'community' | 'standard' | 'priority_24_7' | 'dedicated_tam';
  features: string[];
  isPopular?: boolean;
}

export interface WorksFeatureFlagDefinition {
  key: string;
  name: string;
  description: string;
  category: 'core' | 'ai' | 'security' | 'collaboration' | 'finance' | 'automation' | 'experimental';
  defaultValue: boolean;
  isKillSwitch: boolean;
  minTier: WorksTenantTier;
  lastUpdated: string;
}

export interface WorksEcosystemBridgeStatus {
  service: 'omni_core' | 'omni_identity' | 'omni_ai' | 'omni_connect' | 'omni_finance' | 'omni_cloud' | 'omni_notifications' | 'omni_analytics' | 'omni_white_label';
  displayName: string;
  status: 'connected' | 'synced' | 'degraded' | 'disconnected';
  latencyMs: number;
  lastSyncAt: string;
  activeEndpoints: number;
  eventsProcessed24h: number;
  description: string;
  primaryCapability: string;
}

export interface WorksApplicationManifest {
  manifestVersion: string;
  appId: string;
  appName: string;
  slug: string;
  version: string;
  category: string;
  license: string;
  author: {
    name: string;
    organization: string;
    email: string;
    website: string;
  };
  deployment: {
    routes: { primary: string; fallback: string; apiGateway: string };
    subdomains: string[];
    regions: string[];
  };
  security: {
    didRequired: boolean;
    fido2Supported: boolean;
    e2eeSyncSupported: boolean;
    soc2Compliant: boolean;
    hipaaReady: boolean;
    gdprZeroRetention: boolean;
  };
  requiredScopes: string[];
  optionalScopes: string[];
  apiEndpoints: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    description: string;
    auth: 'bearer_jwt' | 'did_signature' | 'api_key';
    rateLimit: string;
  }[];
  webhookTopics: {
    topic: string;
    description: string;
    samplePayloadSchema: string;
  }[];
  capabilities: string[];
  supportedFileFormats: string[];
  serviceDependencies: string[];
  crdtProtocol: string;
  storageAdapters: string[];
}

export interface WorksAuditLogEntry {
  id: string;
  workspaceId: string;
  actorId: string;
  actorName: string;
  actorRole: WorksRole;
  action: string;
  resourceType: 'workspace' | 'document' | 'canvas' | 'database' | 'sprint' | 'automation' | 'role' | 'integration';
  resourceId: string;
  resourceName: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  status: 'success' | 'denied' | 'flagged';
  details?: Record<string, any>;
}

// ==========================================
// OMNI DRIVE, DOCUMENTS & KNOWLEDGE TYPES
// ==========================================

export type WorksFileFormat = 
  | 'markdown' 
  | 'document' 
  | 'code' 
  | 'spreadsheet' 
  | 'pdf' 
  | 'image' 
  | 'audio' 
  | 'video' 
  | 'archive' 
  | 'ipfs_blob';

export type WorksFileAccessRole = 'owner' | 'editor' | 'commenter' | 'viewer';

export interface WorksDriveFolder {
  id: string;
  workspaceId: string;
  parentId: string | null; // null for root level
  name: string;
  color: string;
  icon?: string;
  description?: string;
  departmentId?: string;
  teamId?: string;
  isPinned: boolean;
  isEncryptedZeroKnowledge: boolean;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
  fileCount: number;
  subFolderCount: number;
  totalSizeBytes: number;
  tags: string[];
}

export interface WorksFileVersion {
  versionNumber: number;
  versionId: string;
  createdAt: string;
  createdBy: string;
  createdByName: string;
  createdByAvatar: string;
  changeSummary: string;
  sizeBytes: number;
  contentSnapshot: string;
  ipfsCid?: string;
  sha256Hash: string;
}

export interface WorksFileComment {
  id: string;
  fileId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  isResolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  taggedUserIds?: string[];
  reactions?: { emoji: string; count: number; userIds: string[] }[];
  replies?: {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    createdAt: string;
  }[];
}

export interface WorksFileSharePermission {
  id: string;
  targetType: 'user' | 'team' | 'department' | 'public_link' | 'workspace_wide';
  targetId?: string;
  targetName: string;
  targetAvatar?: string;
  role: WorksFileAccessRole;
  grantedBy: string;
  grantedAt: string;
  expiresAt?: string;
  requiresPassword?: boolean;
  passwordHash?: string;
  allowDownload: boolean;
  allowExport: boolean;
  didVerificationRequired?: boolean;
}

export interface WorksActiveCollaborator {
  userId: string;
  userName: string;
  userAvatar: string;
  color: string;
  activeCursorLine?: number;
  status: 'viewing' | 'editing' | 'commenting';
  lastPingAt: string;
}

export interface WorksDriveFile {
  id: string;
  workspaceId: string;
  folderId: string | null; // null for root
  title: string;
  extension: string;
  format: WorksFileFormat;
  mimeType: string;
  sizeBytes: number;
  content: string;
  summary?: string;
  aiTags: string[];
  userTags: string[];
  classification: WorksSecurityClassification;
  isPinned: boolean;
  isStarred: boolean;
  isArchived: boolean;
  isZeroKnowledgeEncrypted: boolean;
  encryptionAlgorithm?: string;
  
  // Storage & OMNI Cloud integration
  ipfsCid?: string;
  arweaveTxId?: string;
  sha256Checksum: string;
  cloudBucketId: string;
  storageReplicationNodes: number;
  downloadUrl?: string;

  // Department & Team attribution
  departmentId?: string;
  departmentName?: string;
  teamId?: string;
  teamName?: string;

  // Metadata & Ownership
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  ownerDid: string;
  createdDate: string;
  lastModifiedDate: string;
  lastModifiedById: string;
  lastModifiedByName: string;
  
  // Versions
  currentVersion: number;
  versions: WorksFileVersion[];

  // Sharing & RBAC
  accessScope: 'private' | 'team_only' | 'workspace_members' | 'public_link';
  shares: WorksFileSharePermission[];
  
  // Collaboration
  comments: WorksFileComment[];
  activeCollaborators?: WorksActiveCollaborator[];
  viewCount: number;
  downloadCount: number;

  // Parsed structured payload for previews
  metadata?: {
    wordCount?: number;
    readingTimeMinutes?: number;
    linesOfCode?: number;
    language?: string;
    dimensions?: { width: number; height: number };
    durationSeconds?: number;
    rowCount?: number;
    columnHeaders?: string[];
  };
}

export interface WorksCloudBucket {
  id: string;
  name: string;
  region: string;
  provider: 'omni_decentralized_mesh' | 'aws_s3_eu' | 'cloudflare_r2' | 'ipfs_filecoin';
  totalSizeBytes: number;
  usedSizeBytes: number;
  fileCount: number;
  encryptionKeyFingerprint: string;
  redundancyFactor: number;
  healthStatus: 'optimal' | 'syncing' | 'degraded';
}

export interface WorksAiDocAnalysisResult {
  fileId: string;
  executiveSummary: string;
  keyTakeaways: string[];
  actionItems: { task: string; suggestedAssignee?: string; priority: 'high' | 'medium' | 'low' }[];
  suggestedTags: string[];
  sentiment: 'constructive' | 'urgent' | 'neutral' | 'analytical';
  confidenceScore: number;
}

