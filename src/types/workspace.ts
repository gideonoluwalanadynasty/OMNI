// ==========================================
// OMNI DIGITAL WORKSPACE TYPE DEFINITIONS
// ==========================================

export type WorkspaceTabType =
  | 'overview'
  | 'bookmarks'
  | 'notes'
  | 'tasks'
  | 'calendar'
  | 'documents'
  | 'files'
  | 'research'
  | 'passwords'
  | 'reminders'
  | 'projects';

// 1. NOTES
export interface OmniWorkspaceNote {
  id: string;
  title: string;
  content: string; // Markdown supported
  tags: string[];
  folder?: string;
  isPinned: boolean;
  color?: string; // hex
  createdAt: string;
  updatedAt: string;
  projectId?: string;
  linkedUrl?: string;
  aiSummary?: string;
  actionItems?: string[];
}

// 2. TASKS
export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done';

export interface OmniWorkspaceSubtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface OmniWorkspaceTask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  projectId?: string;
  tags: string[];
  subtasks: OmniWorkspaceSubtask[];
  estimatedMinutes?: number;
  completedAt?: string;
  createdAt: string;
  linkedUrl?: string;
  assignedTo?: string;
}

// 3. CALENDAR
export interface OmniWorkspaceCalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endDate: string; // YYYY-MM-DD
  endTime: string; // HH:mm
  isAllDay: boolean;
  category: 'work' | 'meeting' | 'deep_work' | 'personal' | 'deadline' | 'research';
  color: string;
  location?: string;
  meetingUrl?: string;
  attendees?: string[];
  projectId?: string;
  linkedTaskId?: string;
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
  reminderMinutesBefore?: number;
}

// 4. DOCUMENTS
export interface OmniWorkspaceDocVersion {
  version: number;
  savedAt: string;
  author: string;
  summary: string;
}

export interface OmniWorkspaceDocument {
  id: string;
  title: string;
  category: 'specification' | 'meeting_notes' | 'research_paper' | 'security_brief' | 'general';
  content: string;
  tags: string[];
  projectId?: string;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  versions: OmniWorkspaceDocVersion[];
  collaborators?: string[];
}

// 5. FILES
export type FileCategoryType = 'document' | 'pdf' | 'image' | 'code' | 'archive' | 'data' | 'audio';

export interface OmniWorkspaceFile {
  id: string;
  name: string;
  sizeBytes: number;
  category: FileCategoryType;
  extension: string;
  uploadedAt: string;
  folderPath: string; // e.g. "/Research/Whitepapers"
  isEncrypted: boolean;
  encryptionAlgorithm?: string; // e.g. "AES-256-GCM"
  tags: string[];
  projectId?: string;
  previewSnippet?: string;
  downloadUrl?: string;
}

// 6. RESEARCH LIBRARY
export interface OmniWorkspaceResearchItem {
  id: string;
  title: string;
  authors: string[];
  publicationOrSource: string;
  publishedYear?: number;
  url: string;
  doi?: string;
  category: 'academic_paper' | 'web_clip' | 'market_report' | 'technical_spec' | 'patent';
  abstract: string;
  keyTakeaways: string[];
  citations: {
    apa: string;
    mla: string;
    bibtex: string;
    chicago: string;
  };
  tags: string[];
  projectId?: string;
  readingProgressPercent: number;
  savedAt: string;
  aiSynthesis?: string;
}

// 7. PASSWORD MANAGER (ZERO PLAINTEXT STORAGE)
export interface EncryptedPasswordPayload {
  cipherText: string; // Base64 AES-256-GCM encrypted payload
  iv: string; // Initialization Vector (Hex)
  salt: string; // PBKDF2 Salt (Hex)
  tag: string; // Auth tag
}

export type PasswordItemType = 'login' | 'secure_note' | 'credit_card' | 'api_credential' | 'ssh_key';

export interface OmniWorkspacePasswordItem {
  id: string;
  title: string;
  itemType: PasswordItemType;
  username: string; // can be email/user (not secret)
  // Strict Security: Stored in encrypted representation
  encryptedPassword: EncryptedPasswordPayload;
  url: string; // Origin domain for autofill matching
  matchingDomains: string[];
  notesEncrypted?: EncryptedPasswordPayload | string;
  twoFactorSecretEncrypted?: EncryptedPasswordPayload | string; // Encrypted TOTP secret
  totpDigits?: number;
  totpPeriodSeconds?: number;
  strengthScore: number; // 0 to 100
  isCompromisedInBreach: boolean;
  isReused: boolean;
  isWeak: boolean;
  has2Fa: boolean;
  lastRotatedDate: string;
  folder?: string;
  favorite: boolean;
}

export interface PasswordGeneratorOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  avoidAmbiguous: boolean; // e.g. l, 1, I, O, 0
  mode: 'random' | 'passphrase';
  wordCount?: number;
}

export interface VaultSecurityAuditReport {
  totalItems: number;
  overallScore: number; // 0-100
  weakPasswordsCount: number;
  reusedPasswordsCount: number;
  compromisedBreachCount: number;
  missing2FaCount: number;
  oldPasswordsCount: number; // >90 days
  criticalAlerts: {
    id: string;
    itemId: string;
    title: string;
    severity: 'critical' | 'warning' | 'info';
    message: string;
    recommendation: string;
  }[];
}

// 8. REMINDERS
export interface OmniWorkspaceReminder {
  id: string;
  title: string;
  dueDateTime: string; // ISO string
  isCompleted: boolean;
  priority: TaskPriority;
  projectId?: string;
  linkedUrl?: string;
  isSnoozed?: boolean;
  createdAt: string;
}

// 9. PROJECTS
export interface OmniWorkspaceProject {
  id: string;
  title: string;
  description: string;
  color: string;
  status: 'active' | 'in_planning' | 'paused' | 'completed';
  progressPercent: number;
  startDate: string;
  targetEndDate: string;
  tags: string[];
  pinnedTabUrls: string[];
  associatedDocIds: string[];
  associatedTaskIds: string[];
  associatedResearchIds: string[];
  leadName: string;
}

// 10. BOOKMARKS (Enhanced)
export interface OmniWorkspaceBookmarkItem {
  id: string;
  title: string;
  url: string;
  folder: string;
  tags: string[];
  faviconUrl?: string;
  isFavorite: boolean;
  createdAt: string;
  visitCount: number;
  aiDescription?: string;
}

// WORKSPACE AI CONTEXT & QUERY RESPONSE
export interface WorkspaceAiQueryResponse {
  queryType: 'summarise_research' | 'find_document' | 'prepare_tasks' | 'general';
  title: string;
  summaryMarkdown: string;
  relevantItemIds?: string[];
  suggestedActions?: {
    label: string;
    actionType: string;
    payload?: any;
  }[];
}
