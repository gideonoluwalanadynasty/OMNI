import {
  PlayGameItem,
  PlayAchievement,
  LearnCourse,
  LearnCertification,
  LearningPath,
  OfflineCachePackage,
  AiTutorMessage,
  PlayGameCategory
} from '../../types/play_learn_ecosystem';
import { omniAiSdk } from '../omni-ai-sdk';

const INITIAL_GAMES: PlayGameItem[] = [
  {
    id: 'game_cypher_grid',
    title: 'Sovereign Cypher Grid',
    subtitle: 'Post-Quantum lattice & hash-inversion logic puzzles',
    description: 'Master NIST ML-KEM lattice cryptography and cryptographic hash chaining through interactive grid manipulation. Solve mathematical parity puzzles to decrypt sovereign memory enclaves.',
    category: 'cyber_logic',
    ageRating: '10+',
    estimatedMinutes: 8,
    difficulty: 'Intermediate',
    xpReward: 350,
    rating: 4.9,
    playersCount: 'Single / Turn-based',
    iconName: 'ShieldAlert',
    thumbnail: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80',
    tags: ['Cryptography', 'Lattice PQC', 'Math Puzzle', 'Logic'],
    offlineSupported: true,
    offlinePackSizeMb: 12.4,
    achievements: ['Quantum Breaker', 'Parity Master', 'Zero Telemetry Cryptographer'],
    playableType: 'cypher_grid'
  },
  {
    id: 'game_logic_circuit',
    title: 'Silicon Logic Gate Builder',
    subtitle: 'Boolean circuit architect & truth-table simulator',
    description: 'Design digital logic circuits from foundational AND, OR, XOR, and NAND gates up to full adders, multiplexers, and ALU arithmetic blocks. Validate live signal propagation in real-time.',
    category: 'stem_sim',
    ageRating: 'All Ages',
    estimatedMinutes: 10,
    difficulty: 'Beginner',
    xpReward: 300,
    rating: 4.95,
    playersCount: 'Single Player',
    iconName: 'Cpu',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    tags: ['Boolean Logic', 'Computer Engineering', 'Circuit Sim', 'STEM'],
    offlineSupported: true,
    offlinePackSizeMb: 8.5,
    achievements: ['NAND Architect', 'Adder Artisan', 'Full ALU Complete'],
    playableType: 'logic_circuit'
  },
  {
    id: 'game_family_trivia',
    title: 'Trivia Sovereign: Science & Tech Challenge',
    subtitle: 'Family & multiplayer global knowledge & computer history quiz',
    description: 'Compete in fast-paced knowledge rounds covering computer science milestones, internet architecture, sovereign cryptography, astrophysics, and world discoveries. Great for solo study or family game night!',
    category: 'family',
    ageRating: 'All Ages',
    estimatedMinutes: 5,
    difficulty: 'Beginner',
    xpReward: 250,
    rating: 4.85,
    playersCount: '1 - 6 Players',
    iconName: 'Sparkles',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    tags: ['Family Fun', 'Computer History', 'General Science', 'Multiplayer'],
    offlineSupported: true,
    offlinePackSizeMb: 4.2,
    achievements: ['Trivia Champion', 'Silicon Historian', 'Perfect Score Streak'],
    playableType: 'family_trivia'
  },
  {
    id: 'game_neural_weights_puzzle',
    title: 'Neural Matrix Optimizer',
    subtitle: 'Quantized tensor weights & latency balance game',
    description: 'Tune neural activation paths, prune redundant neuron weights, and optimize token generation throughput without degrading perceptual benchmark accuracy.',
    category: 'educational',
    ageRating: '12+',
    estimatedMinutes: 12,
    difficulty: 'Intermediate',
    xpReward: 400,
    rating: 4.8,
    playersCount: 'Single Player',
    iconName: 'Network',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    tags: ['Machine Learning', 'Tensor Optimization', 'AI Systems'],
    offlineSupported: true,
    offlinePackSizeMb: 15.0,
    achievements: ['Quantization Master', 'Zero Perplexity Loss'],
    playableType: 'quick_puzzle'
  }
];

const INITIAL_ACHIEVEMENTS: PlayAchievement[] = [
  {
    id: 'ach_first_lesson',
    title: 'Initiate of Knowledge',
    description: 'Complete your first interactive lesson in OMNI Learn.',
    category: 'learning',
    xp: 100,
    icon: 'BookOpen',
    unlocked: true,
    unlockedAt: '2026-08-16',
    progressPercent: 100,
    cryptographicProofHash: '0x9a88c21a4f001'
  },
  {
    id: 'ach_pqc_cryptography',
    title: 'Post-Quantum Shield Master',
    description: 'Solve 3 levels of Sovereign Cypher Grid without hints.',
    category: 'gaming',
    xp: 250,
    icon: 'ShieldCheck',
    unlocked: true,
    unlockedAt: '2026-08-16',
    progressPercent: 100,
    cryptographicProofHash: '0x33b1e7790ac21'
  },
  {
    id: 'ach_logic_architect',
    title: 'Silicon Circuit Architect',
    description: 'Construct a validated 2-bit Half Adder in Logic Gate Builder.',
    category: 'gaming',
    xp: 300,
    icon: 'Cpu',
    unlocked: false,
    progressPercent: 65
  },
  {
    id: 'ach_airgap_cert',
    title: 'Offline Sovereign Scholar',
    description: 'Complete a full certification course while disconnected in Offline Mode.',
    category: 'mastery',
    xp: 500,
    icon: 'WifiOff',
    unlocked: false,
    progressPercent: 40
  },
  {
    id: 'ach_learning_streak',
    title: '7-Day Synapse Streak',
    description: 'Maintain a 7-day continuous study or puzzle solving streak.',
    category: 'streak',
    xp: 450,
    icon: 'Flame',
    unlocked: true,
    unlockedAt: '2026-08-15',
    progressPercent: 100,
    cryptographicProofHash: '0x7e8890bcaf442'
  }
];

const INITIAL_COURSES: LearnCourse[] = [
  {
    id: 'course_ai_systems_engineering',
    title: 'Sovereign AI Systems & Local LLM Optimization',
    subtitle: 'From quantized weights to hardware TPU acceleration and private inference',
    description: 'A comprehensive deep-dive into sovereign artificial intelligence. Learn how to run 70B+ parameter models on local hardware without cloud telemetry, master KV-cache optimization, tensor parallelism, and zero-leakage prompt fencing.',
    category: 'ai_engineering',
    level: 'Intermediate',
    totalDurationHours: 12,
    rating: 4.96,
    enrolledStudentsCount: 4820,
    instructor: {
      name: 'Dr. Evelyn Vance',
      role: 'Principal AI Architect & Research Fellow',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      nodeLocation: 'Geneva Sovereign Lab'
    },
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    tags: ['Local LLMs', 'Quantization', 'Inference Optimization', 'TPUs', 'Sovereign AI'],
    xpReward: 1200,
    certificationTitle: 'Certified Sovereign AI Systems Architect (CSASA)',
    prerequisites: ['Basic Python or Rust knowledge', 'Understanding of matrix algebra'],
    offlineAvailable: true,
    offlineSizeMb: 142.5,
    modules: [
      {
        id: 'mod_1',
        title: 'Module 1: Foundations of Sovereign & Offline Machine Learning',
        description: 'Why cloud dependency creates systemic privacy hazards and how local accelerators operate.',
        lessons: [
          {
            id: 'les_1_1',
            title: '1.1 The Architecture of Zero-Telemetry Inference',
            durationMinutes: 25,
            type: 'reading_lab',
            completed: true,
            contentMarkdown: `# Zero-Telemetry Inference Architecture

In conventional cloud AI architectures, every prompt and token travels through centralized servers, exposing confidential research, medical files, and enterprise code.

## The Sovereign Alternative
By deploying local tensor processing units (like OMNI Neural Accelerators) with INT4/INT8 quantization, we achieve:
1. **Zero Data Egress**: Memory bounds are enforced at the silicon hardware level.
2. **Deterministic Latency**: Sub-15ms time-to-first-token independent of ISP speeds.
3. **Cryptographic Memory Fencing**: Prevents multi-tenant side-channel inspection.

\`\`\`rust
// Zero-leakage enclave inference executor
pub struct SovereignEnclaveExecutor {
    npu_handle: Arc<HardwareNpuDevice>,
    memory_fence: EnclaveGuard,
}

impl SovereignEnclaveExecutor {
    pub fn execute_tokens(&self, prompt_tokens: &[u32]) -> Result<Vec<u32>, EnclaveError> {
        self.memory_fence.verify_isolated_pages()?;
        self.npu_handle.run_forward_pass(prompt_tokens)
    }
}
\`\`\`
`
          },
          {
            id: 'les_1_2',
            title: '1.2 Model Quantization: AWQ vs GPTQ vs GGUF',
            durationMinutes: 35,
            type: 'coding_sandbox',
            completed: true,
            contentMarkdown: `# Quantization Mechanics: AWQ, GPTQ & GGUF

Quantization compresses 16-bit floating point model weights into 4-bit or 8-bit integer representations, drastically reducing VRAM memory requirements while preserving 99.2% benchmark reasoning accuracy.

### Key Trade-offs:
- **AWQ (Activation-aware Weight Quantization)**: Preserves salient outlier weights for superior reasoning.
- **GGUF (Unified File Format)**: Enables seamless unified memory sharing across CPU and GPU cores.
`,
            quizQuestion: {
              question: 'Why does AWQ (Activation-aware Weight Quantization) maintain higher perplexity scores compared to naive round-to-nearest quantization?',
              options: [
                'It ignores activation distributions and truncates randomly',
                'It identifies and protects the top 1% salient weight channels that have large activation magnitudes',
                'It converts all weights to 1-bit binary representations',
                'It requires a continuous cloud connection to calibrate weights'
              ],
              correctIndex: 1,
              explanation: 'AWQ selectively protects the small fraction (0.5-1%) of critical weights that experience large activation magnitudes, minimizing quantization distortion.'
            }
          }
        ]
      },
      {
        id: 'mod_2',
        title: 'Module 2: KV Cache Optimization & High-Throughput Batching',
        description: 'Managing memory footprints during long-context 128k inference runs.',
        lessons: [
          {
            id: 'les_2_1',
            title: '2.1 PagedAttention & Continuous Batching Mechanics',
            durationMinutes: 30,
            type: 'reading_lab',
            completed: false,
            contentMarkdown: `# PagedAttention in Practice

Managing dynamic key-value cache memory without memory fragmentation.

PagedAttention partitions KV cache tensors into fixed-size blocks similar to virtual memory pages in an operating system, eliminating up to 96% of memory waste.
`
          }
        ]
      }
    ]
  },
  {
    id: 'course_post_quantum_crypto',
    title: 'Applied Post-Quantum Cryptography & Zero-Knowledge Proofs',
    subtitle: 'NIST Standards (ML-KEM, ML-DSA, SLH-DSA), zk-SNARKs & FIDO3 authentication',
    description: 'Future-proof your software against quantum Shor algorithm threats. Learn how to implement lattice-based cryptography, construct zk-SNARK proof circuits, and configure hardware security passkeys.',
    category: 'cryptography',
    level: 'Advanced',
    totalDurationHours: 14,
    rating: 4.98,
    enrolledStudentsCount: 3190,
    instructor: {
      name: 'Dr. Michael Chen',
      role: 'Head of Cryptography, Aegis Labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      nodeLocation: 'Zurich Security Enclave'
    },
    thumbnail: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
    tags: ['Post-Quantum', 'NIST PQC', 'zk-SNARKs', 'FIDO3', 'Lattices'],
    xpReward: 1400,
    certificationTitle: 'Certified Post-Quantum Cryptographic Engineer (CPQCE)',
    prerequisites: ['Discrete mathematics & modular arithmetic', 'Familiarity with elliptic curves'],
    offlineAvailable: true,
    offlineSizeMb: 118.0,
    modules: [
      {
        id: 'mod_pqc_1',
        title: 'Module 1: The Quantum Threat & NIST Standard Algorithms',
        description: 'How Shor algorithm renders RSA and ECC obsolete, and the math of ML-KEM lattice cryptography.',
        lessons: [
          {
            id: 'les_pqc_1_1',
            title: '1.1 NIST ML-KEM (Kyber) Key Encapsulation Explained',
            durationMinutes: 40,
            type: 'reading_lab',
            completed: false,
            contentMarkdown: `# NIST ML-KEM (Module-Lattice Key Encapsulation Mechanism)

ML-KEM relies on the hardness of the Module Learning With Errors (M-LWE) problem over polynomial rings.

Unlike RSA whose security collapses under quantum period-finding algorithms, high-dimensional lattice vector problems remain computationally intractable even for fault-tolerant quantum computers.
`,
            quizQuestion: {
              question: 'Which mathematical problem guarantees the post-quantum security of NIST ML-KEM (formerly Kyber)?',
              options: [
                'Prime Integer Factorization',
                'Discrete Logarithm on Elliptic Curves',
                'Module Learning With Errors (M-LWE) over polynomial rings',
                'SHA-256 Preimage Resistance'
              ],
              correctIndex: 2,
              explanation: 'ML-KEM security rests on the Module Learning With Errors problem, which resists polynomial-time quantum algorithms.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course_sovereign_web_engineering',
    title: 'Building Sovereign Full-Stack Web Applications',
    subtitle: 'Decentralized state, double-entry financial ledgers, and zero-trust browser runtimes',
    description: 'Learn modern full-stack web architecture without centralized vendor lock-in. Master React, TypeScript, cryptographic local persistence, and sovereign API proxies.',
    category: 'web_development',
    level: 'Beginner',
    totalDurationHours: 10,
    rating: 4.91,
    enrolledStudentsCount: 6540,
    instructor: {
      name: 'Sarah Jenkins',
      role: 'Senior Systems Architect, OMNI Runtime',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      nodeLocation: 'Reykjavik Node'
    },
    thumbnail: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'TypeScript', 'Ledger Systems', 'Zero Trust', 'Web Architecture'],
    xpReward: 1000,
    certificationTitle: 'Certified Sovereign Web Developer (CSWD)',
    prerequisites: ['HTML, CSS & basic JavaScript familiarity'],
    offlineAvailable: true,
    offlineSizeMb: 95.0,
    modules: [
      {
        id: 'mod_web_1',
        title: 'Module 1: Principles of Sovereign Web Engineering',
        description: 'Client-first architecture, local encryption, and zero-telemetry design.',
        lessons: [
          {
            id: 'les_web_1_1',
            title: '1.1 The Anatomy of Double-Entry Web Ledgers',
            durationMinutes: 30,
            type: 'reading_lab',
            completed: true,
            contentMarkdown: `# Double-Entry Financial Ledgers in Web Applications

Every financial transaction must have equal and opposite debit and credit entries, guaranteeing that accounts always balance with zero floating point drift.
`
          }
        ]
      }
    ]
  }
];

const INITIAL_CERTIFICATIONS: LearnCertification[] = [
  {
    id: 'cert_sovereign_dev_1',
    courseId: 'course_sovereign_web_engineering',
    title: 'Certified Sovereign Web Developer (CSWD)',
    issuer: 'OMNI Sovereign Academic Foundation',
    credentialId: 'OMNI-CERT-2026-99412',
    recipientName: 'Alex Thorne',
    issueDate: '2026-08-10',
    expiryDate: '2029-08-10',
    cryptographicSignature: '0x8fba7811902ec5611099bcda88419200384b127',
    badgeUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    skillsVerified: ['React & TypeScript Architecture', 'Double-Entry Ledgers', 'Client-Side Cryptography', 'Zero-Trust UI'],
    gradeScore: 98.5,
    verifiedOnChain: true
  }
];

const INITIAL_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path_sovereign_ai_engineer',
    title: 'Sovereign AI Systems & ML Architecture',
    subtitle: 'From offline LLMs to hardware tensor enclaves and zero-telemetry agents',
    description: 'Master the full stack of private, air-gapped artificial intelligence. Build high-throughput inference engines and deploy sovereign autonomous agents.',
    targetRole: 'Senior Sovereign AI Systems Engineer',
    estimatedWeeks: 8,
    totalCoursesCount: 4,
    completedCoursesCount: 1,
    totalXp: 4500,
    courseIds: ['course_ai_systems_engineering', 'course_post_quantum_crypto'],
    capstoneProject: 'Deploy a 70B parameter quantized model on a private neural enclave with 100% verified zero-egress telemetry.',
    progressPercentage: 45,
    status: 'in_progress'
  },
  {
    id: 'path_cybersecurity_cryptographer',
    title: 'Post-Quantum Cryptography & Zero-Trust Defense',
    subtitle: 'NIST PQC, FIDO3 hardware tokens, and zero-knowledge identity enclaves',
    description: 'Protect institutional and sovereign data from quantum decryption attacks and surveillance telemetry.',
    targetRole: 'Post-Quantum Cryptographic Engineer',
    estimatedWeeks: 10,
    totalCoursesCount: 3,
    completedCoursesCount: 0,
    totalXp: 3800,
    courseIds: ['course_post_quantum_crypto'],
    capstoneProject: 'Implement a zero-knowledge verifiable credential system with NIST ML-DSA hardware signing.',
    progressPercentage: 15,
    status: 'enrolled'
  }
];

const INITIAL_OFFLINE_PACKAGES: OfflineCachePackage[] = [
  {
    id: 'pkg_ai_course_full',
    type: 'course',
    title: 'Sovereign AI Systems & Local LLM Optimization (Full Course + Lab Data)',
    sizeMb: 142.5,
    version: '2.4.0',
    lastSynced: '2026-08-16',
    status: 'downloaded',
    integrityChecksum: 'sha256:7f8832a0c918bb12948e',
    offlineReady: true
  },
  {
    id: 'pkg_pqc_crypto_course',
    type: 'course',
    title: 'Applied Post-Quantum Cryptography & Zero-Knowledge Proofs',
    sizeMb: 118.0,
    version: '1.9.2',
    lastSynced: '2026-08-15',
    status: 'downloaded',
    integrityChecksum: 'sha256:4901bca98129ef88012e',
    offlineReady: true
  },
  {
    id: 'pkg_cypher_grid_game',
    type: 'game',
    title: 'Sovereign Cypher Grid (All 50 Levels & Offline Lattice Engine)',
    sizeMb: 12.4,
    version: '3.1.0',
    lastSynced: '2026-08-16',
    status: 'downloaded',
    integrityChecksum: 'sha256:399081bb20aaef771239',
    offlineReady: true
  },
  {
    id: 'pkg_logic_gate_game',
    type: 'game',
    title: 'Silicon Logic Gate Builder (Full Circuit Simulator)',
    sizeMb: 8.5,
    version: '2.0.1',
    lastSynced: '2026-08-14',
    status: 'downloaded',
    integrityChecksum: 'sha256:119844bbcf3388a10029',
    offlineReady: true
  },
  {
    id: 'pkg_family_trivia_pack',
    type: 'game',
    title: 'Trivia Sovereign: 1,000+ Offline Tech & Science Questions',
    sizeMb: 4.2,
    version: '4.0.0',
    lastSynced: '2026-08-16',
    status: 'downloaded',
    integrityChecksum: 'sha256:901991a0ccf448119283',
    offlineReady: true
  }
];

class OmniPlayLearnService {
  private games: PlayGameItem[] = [...INITIAL_GAMES];
  private achievements: PlayAchievement[] = [...INITIAL_ACHIEVEMENTS];
  private courses: LearnCourse[] = [...INITIAL_COURSES];
  private certifications: LearnCertification[] = [...INITIAL_CERTIFICATIONS];
  private paths: LearningPath[] = [...INITIAL_LEARNING_PATHS];
  private offlinePackages: OfflineCachePackage[] = [...INITIAL_OFFLINE_PACKAGES];
  private isAirGappedOfflineMode: boolean = false;

  // 1. OMNI PLAY METHODS
  public getGames(category?: PlayGameCategory): PlayGameItem[] {
    if (!category || category === 'all') return this.games;
    return this.games.filter(g => g.category === category);
  }

  public getGameById(id: string): PlayGameItem | undefined {
    return this.games.find(g => g.id === id);
  }

  public getAchievements(): PlayAchievement[] {
    return this.achievements;
  }

  public unlockAchievement(id: string): PlayAchievement | undefined {
    const ach = this.achievements.find(a => a.id === id);
    if (ach && !ach.unlocked) {
      ach.unlocked = true;
      ach.unlockedAt = new Date().toISOString().split('T')[0];
      ach.progressPercent = 100;
      ach.cryptographicProofHash = `0x${Date.now().toString(16)}${Math.random().toString(16).substring(2, 6)}`;
    }
    return ach;
  }

  public getUserTotalXp(): number {
    const courseXp = 1200; // base completed course xp
    const achXp = this.achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);
    return courseXp + achXp;
  }

  // 2. OMNI LEARN METHODS
  public getCourses(category?: string, searchQuery?: string): LearnCourse[] {
    let list = [...this.courses];
    if (category && category !== 'all') {
      list = list.filter(c => c.category === category);
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }

  public getCourseById(id: string): LearnCourse | undefined {
    return this.courses.find(c => c.id === id);
  }

  public markLessonComplete(courseId: string, lessonId: string): boolean {
    const course = this.getCourseById(courseId);
    if (!course) return false;

    for (const mod of course.modules) {
      const les = mod.lessons.find(l => l.id === lessonId);
      if (les) {
        les.completed = true;
        this.unlockAchievement('ach_first_lesson');
        return true;
      }
    }
    return false;
  }

  public getCertifications(): LearnCertification[] {
    return this.certifications;
  }

  public issueCertification(courseId: string, recipientName: string, grade: number): LearnCertification {
    const course = this.getCourseById(courseId);
    const newCert: LearnCertification = {
      id: `cert_${Date.now()}`,
      courseId,
      title: course?.certificationTitle || 'Certified Sovereign Specialist',
      issuer: 'OMNI Sovereign Academic Foundation',
      credentialId: `OMNI-CERT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      recipientName,
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      cryptographicSignature: `0x${Date.now().toString(16)}${Math.random().toString(16).substring(2, 10)}`,
      badgeUrl: course?.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      skillsVerified: course?.tags || ['Sovereign Architecture', 'Zero Telemetry'],
      gradeScore: grade,
      verifiedOnChain: true
    };

    this.certifications.unshift(newCert);
    return newCert;
  }

  public getLearningPaths(): LearningPath[] {
    return this.paths;
  }

  // 3. AI SOCRATIC TUTOR
  public async queryAiTutor(params: {
    userMessage: string;
    courseContext?: string;
    lessonTitle?: string;
    history?: { role: 'user' | 'assistant'; text: string }[];
  }): Promise<{
    reply: string;
    codeSnippet?: { language: string; code: string };
    followupQuestions?: string[];
  }> {
    const prompt = `You are OMNI Socratic AI Tutor, an expert pedagogical mentor in sovereign systems, artificial intelligence, computer science, and cryptography.
Current Course Context: ${params.courseContext || 'General Sovereign Computer Science'}
Current Lesson: ${params.lessonTitle || 'Interactive Socratic Guidance'}

Student Question: "${params.userMessage}"

Provide a clear, engaging, step-by-step Socratic explanation. Encourage deep first-principles intuition.
If appropriate, provide a clean code snippet.
Respond in strict JSON with schema:
{
  "reply": "Clear, friendly, educational explanation with markdown formatting",
  "codeSnippet": { "language": "rust/python/ts", "code": "optional clean code" },
  "followupQuestions": ["insightful question 1", "insightful question 2"]
}`;

    try {
      const response = await omniAiSdk.complete({
        prompt,
        taskType: 'reasoning',
        temperature: 0.6,
        maxTokens: 1000
      });

      const parsed = JSON.parse(response.text.replace(/```json/g, '').replace(/```/g, '').trim());
      return {
        reply: parsed.reply || response.text,
        codeSnippet: parsed.codeSnippet?.code ? parsed.codeSnippet : undefined,
        followupQuestions: parsed.followupQuestions || [
          'How does this prevent side-channel memory leaks?',
          'What happens if we double the tensor batch size?'
        ]
      };
    } catch {
      return {
        reply: `Great question! In sovereign computing, we ensure that computation occurs entirely within local cryptographic enclaves. When analyzing "${params.userMessage}", the key insight is to minimize communication overhead and isolate state partitions.`,
        followupQuestions: [
          'Would you like a step-by-step numerical walkthrough?',
          'How does this compare to traditional cloud architectures?'
        ]
      };
    }
  }

  // 4. OFFLINE ARCHITECTURE & CACHE MANAGER
  public getOfflinePackages(): OfflineCachePackage[] {
    return this.offlinePackages;
  }

  public isOfflineModeActive(): boolean {
    return this.isAirGappedOfflineMode;
  }

  public setOfflineModeActive(active: boolean): void {
    this.isAirGappedOfflineMode = active;
  }

  public downloadPackage(packageId: string): void {
    const pkg = this.offlinePackages.find(p => p.id === packageId);
    if (pkg) {
      pkg.status = 'downloaded';
      pkg.lastSynced = new Date().toISOString().split('T')[0];
      pkg.offlineReady = true;
    }
  }

  public deleteOfflinePackage(packageId: string): void {
    const pkg = this.offlinePackages.find(p => p.id === packageId);
    if (pkg) {
      pkg.status = 'available_to_download';
      pkg.offlineReady = false;
    }
  }

  public getTotalOfflineStorageUsedMb(): number {
    return this.offlinePackages
      .filter(p => p.status === 'downloaded')
      .reduce((sum, p) => sum + p.sizeMb, 0);
  }
}

export const omniPlayLearnService = new OmniPlayLearnService();
