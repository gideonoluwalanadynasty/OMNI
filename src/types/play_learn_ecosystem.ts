export type PlayGameCategory =
  | 'all'
  | 'educational'
  | 'puzzles'
  | 'family'
  | 'cyber_logic'
  | 'stem_sim';

export interface PlayGameItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: PlayGameCategory;
  ageRating: string; // e.g. "All Ages", "8+", "14+"
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Master';
  xpReward: number;
  rating: number;
  playersCount: string;
  iconName: string;
  thumbnail: string;
  tags: string[];
  offlineSupported: boolean;
  offlinePackSizeMb: number;
  achievements: string[];
  playableType: 'cypher_grid' | 'logic_circuit' | 'family_trivia' | 'quick_puzzle';
}

export interface PlayAchievement {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'gaming' | 'streak' | 'mastery';
  xp: number;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progressPercent: number;
  cryptographicProofHash?: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'video_interactive' | 'reading_lab' | 'coding_sandbox' | 'quiz_check';
  contentMarkdown: string;
  completed: boolean;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export interface LearnCourse {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'ai_engineering' | 'cryptography' | 'sovereign_systems' | 'web_development' | 'cybersecurity';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDurationHours: number;
  rating: number;
  enrolledStudentsCount: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    nodeLocation: string;
  };
  thumbnail: string;
  tags: string[];
  xpReward: number;
  certificationTitle: string;
  modules: CourseModule[];
  prerequisites: string[];
  offlineAvailable: boolean;
  offlineSizeMb: number;
}

export interface LearnCertification {
  id: string;
  courseId: string;
  title: string;
  issuer: string;
  credentialId: string;
  recipientName: string;
  issueDate: string;
  expiryDate: string;
  cryptographicSignature: string;
  badgeUrl: string;
  skillsVerified: string[];
  gradeScore: number;
  verifiedOnChain: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  targetRole: string;
  estimatedWeeks: number;
  totalCoursesCount: number;
  completedCoursesCount: number;
  totalXp: number;
  courseIds: string[];
  capstoneProject: string;
  progressPercentage: number;
  status: 'in_progress' | 'completed' | 'enrolled' | 'not_started';
}

export interface OfflineCachePackage {
  id: string;
  type: 'course' | 'game' | 'certification_prep' | 'ai_model_weights';
  title: string;
  sizeMb: number;
  version: string;
  lastSynced: string;
  status: 'downloaded' | 'syncing' | 'available_to_download' | 'update_available';
  downloadProgress?: number;
  integrityChecksum: string;
  offlineReady: boolean;
}

export interface AiTutorMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  quizPrompt?: {
    question: string;
    choices: string[];
  };
}
