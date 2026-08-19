/**
 * OMNI VOICE, VIDEO, MEETINGS AND WEBINAR PLATFORM TYPES
 * Sovereign Real-Time Media, AI Assistant, CRM, Education & Cloud Recording Architecture
 */

export type CallType = 'one_to_one_voice' | 'one_to_one_video' | 'group_voice' | 'group_video';
export type CallDirection = 'incoming' | 'outgoing' | 'missed';
export type CallState = 'idle' | 'ringing' | 'connecting' | 'active' | 'reconnecting' | 'ended' | 'declined';

export interface CallParticipant {
  profileId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  verificationBadge?: string;
  isMutedAudio: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
  isSpeaking: boolean;
  virtualBackground: VirtualBackground;
  noiseSuppression: NoiseSuppressionMode;
  networkQuality: 'excellent' | 'good' | 'poor' | 'reconnecting';
  bitrateKbps: number;
  packetLossPercent: number;
  joinedAt: string;
}

export interface CallHistoryRecord {
  id: string;
  callType: CallType;
  direction: CallDirection;
  initiatorProfileId: string;
  participants: {
    profileId: string;
    displayName: string;
    avatarUrl: string;
  }[];
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
  status: 'completed' | 'missed' | 'rejected' | 'busy' | 'failed';
  recordingId?: string;
  isE2EE: boolean;
}

export type MediaProviderType = 'webrtc_mesh' | 'sfu_livekit' | 'sfu_mediasoup' | 'mcu_janus' | 'rtmp_egress';

export type VirtualBackground =
  | 'none'
  | 'blur_light'
  | 'blur_heavy'
  | 'office_luxury'
  | 'studio_minimal'
  | 'cyber_matrix'
  | 'nature_sunset';

export type NoiseSuppressionMode = 'off' | 'standard_dsp' | 'ai_krisp_neural' | 'studio_voice';

export type MeetingLayoutMode = 'grid' | 'speaker' | 'presentation' | 'sidebar';

export type MeetingStatus = 'scheduled' | 'waiting_room' | 'active' | 'ended';

export interface OmniMeetingSession {
  id: string;
  tenantId: string;
  slug: string;
  roomTitle: string;
  description: string;
  hostProfileId: string;
  hostName: string;
  hostAvatar: string;
  coHostProfileIds: string[];
  scheduledStartTime: string;
  scheduledEndTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  status: MeetingStatus;
  isLocked: boolean;
  passcode?: string;
  waitingRoomEnabled: boolean;
  e2eeEnabled: boolean;
  maxParticipants: number;
  allowScreenShare: boolean;
  allowChat: boolean;
  allowUnmuteSelf: boolean;
  muteParticipantsOnEntry: boolean;
  layoutMode: MeetingLayoutMode;
  activeParticipants: CallParticipant[];
  waitingRoomParticipants: {
    profileId: string;
    name: string;
    avatar: string;
    requestedAt: string;
  }[];
  activeBreakoutRooms?: {
    id: string;
    name: string;
    participantIds: string[];
  }[];
  associatedEventId?: string;
  associatedCrmDealId?: string;
  associatedCourseLessonId?: string;
  isCloudRecordingActive: boolean;
  isAiTranscribingActive: boolean;
}

export interface MeetingChatMessage {
  id: string;
  meetingId: string;
  senderProfileId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isDirect: boolean;
  targetProfileId?: string;
  targetName?: string;
  fileAttachment?: {
    name: string;
    sizeBytes: number;
    url: string;
    type: string;
  };
}

export interface WebinarSpeaker {
  profileId: string;
  name: string;
  role: 'keynote_speaker' | 'panelist' | 'moderator' | 'host';
  headline: string;
  avatarUrl: string;
  bio?: string;
}

export interface WebinarRegistration {
  id: string;
  webinarId: string;
  profileId: string;
  name: string;
  email: string;
  registeredAt: string;
  ticketType: 'free' | 'vip' | 'early_bird' | 'enterprise';
  paidAmountUsd: number;
  attended: boolean;
  joinedAt?: string;
  leaveAt?: string;
}

export interface WebinarQaItem {
  id: string;
  webinarId: string;
  authorProfileId: string;
  authorName: string;
  authorAvatar: string;
  questionText: string;
  timestamp: string;
  upvotes: number;
  upvotedByProfileIds: string[];
  isAnswered: boolean;
  answeredByName?: string;
  answerText?: string;
}

export interface WebinarLivePoll {
  id: string;
  webinarId: string;
  question: string;
  options: {
    id: string;
    text: string;
    voteCount: number;
  }[];
  isLive: boolean;
  totalVotes: number;
  votedUserIds: string[];
  createdAt: string;
}

export interface OmniWebinarSession {
  id: string;
  tenantId: string;
  title: string;
  subtitle: string;
  coverBannerUrl: string;
  hostProfileId: string;
  hostName: string;
  speakers: WebinarSpeaker[];
  scheduledStartTime: string;
  durationMinutes: number;
  maxAudienceCapacity: number;
  isTicketed: boolean;
  ticketPriceUsd: number;
  currency: string;
  status: 'draft' | 'published' | 'live' | 'ended';
  registrationsCount: number;
  liveAudienceCount: number;
  streamRtmpEgressUrl?: string;
  broadcastQuality: '1080p60' | '4k30' | '720p30';
  qaItems: WebinarQaItem[];
  polls: WebinarLivePoll[];
  chatAllowed: boolean;
  recordingId?: string;
}

export interface OmniVirtualClassroom {
  id: string;
  tenantId: string;
  courseId: string;
  courseTitle: string;
  lessonNumber: number;
  lessonTitle: string;
  teacherProfileId: string;
  teacherName: string;
  teacherAvatar: string;
  enrolledStudentsCount: number;
  presentStudentsCount: number;
  status: 'scheduled' | 'live_lesson' | 'completed';
  scheduledTime: string;
  lessonOutline: {
    id: string;
    topic: string;
    durationMinutes: number;
    isCompleted: boolean;
  }[];
  attendanceLedger: {
    studentProfileId: string;
    studentName: string;
    studentAvatar: string;
    status: 'present' | 'late' | 'absent';
    joinTime?: string;
    attentionScorePercent: number;
    certificateIssued: boolean;
  }[];
  activeQuiz?: {
    id: string;
    question: string;
    options: string[];
    correctOptionIndex: number;
    timeRemainingSec: number;
    studentAnswers: { studentId: string; selectedIndex: number; isCorrect: boolean }[];
  };
  whiteboardSnapshots: string[];
}

export interface AiMeetingLiveTranscriptItem {
  id: string;
  meetingId: string;
  speakerProfileId: string;
  speakerName: string;
  speakerAvatar: string;
  timestamp: string;
  originalText: string;
  detectedLanguage: string;
  translations: {
    es?: string;
    fr?: string;
    zh?: string;
    de?: string;
    ja?: string;
    ar?: string;
  };
  sentiment: 'positive' | 'neutral' | 'constructive' | 'action_driven';
}

export interface AiMeetingActionItem {
  id: string;
  meetingId: string;
  taskTitle: string;
  assigneeProfileId: string;
  assigneeName: string;
  assigneeAvatar: string;
  dueDate: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  crmSynced: boolean;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface AiMeetingExecutiveDigest {
  meetingId: string;
  generatedAt: string;
  executiveSummary: string;
  keyAgreements: string[];
  blockersAndRisks: string[];
  overallSentiment: 'optimistic' | 'collaborative' | 'tense' | 'productive';
  sentimentScorePercent: number;
  topicsDiscussed: { topic: string; durationMinutes: number }[];
  crmFollowUpNotes: string;
  crmLeadStageRecommended?: 'presentation' | 'contract_review' | 'closed_won';
}

export interface OmniCloudRecording {
  id: string;
  tenantId: string;
  meetingId: string;
  roomTitle: string;
  hostProfileId: string;
  hostName: string;
  durationSeconds: number;
  fileSizeBytes: number;
  cloudStorageUrl: string;
  thumbnailUrl: string;
  resolution: '1080p' | '720p' | '4k';
  recordedAt: string;
  expiresAt: string;
  isPasswordProtected: boolean;
  passcode?: string;
  accessPermission: 'public' | 'organization' | 'invited_only' | 'private';
  viewCount: number;
  downloadCount: number;
  smartChapters: {
    timestampSec: number;
    title: string;
  }[];
  sha256ProofHash: string;
}

export interface MediaPlatformAdminPolicies {
  maxMeetingDurationMinutes: number;
  maxParticipantsStandard: number;
  maxParticipantsEnterprise: number;
  maxWebinarAudience: number;
  e2eeMandatoryForEnterprise: boolean;
  cloudRecordingRetentionDays: number;
  autoTranscribeAllMeetings: boolean;
  watermarkScreenshares: boolean;
  tenantCloudStorageQuotaGb: number;
  tenantCloudStorageUsedGb: number;
  totalBandwidthConsumedGb: number;
  activeConcurrentRooms: number;
}

export interface MediaTestStep {
  stepId: string;
  name: string;
  passed: boolean;
  details: string;
  executionTimeMs: number;
  extraProof?: string;
}

export interface MediaTestSuiteResult {
  passed: boolean;
  totalTests: number;
  totalPassed: number;
  totalFailed: number;
  benchmarkDurationMs: number;
  timestamp: string;
  steps: MediaTestStep[];
}
