import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  Sparkles,
  Search,
  Brain,
  WifiOff,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Flame,
  Layers,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { LearnCourse, LearningPath, LearnCertification } from '../../../types/play_learn_ecosystem';
import { omniPlayLearnService } from '../../../sdk/browser-services/OmniPlayLearnService';
import { OmniCourseDetailView } from './OmniCourseDetailView';
import { OmniAiTutorDrawer } from './OmniAiTutorDrawer';
import { OmniOfflineCacheManager } from './OmniOfflineCacheManager';

type LearnTab = 'courses' | 'paths' | 'certifications';

export const OmniLearnRoot: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LearnTab>('courses');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isOfflineManagerOpen, setIsOfflineManagerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = omniPlayLearnService.getCourses(selectedCategory, searchQuery);
  const learningPaths = omniPlayLearnService.getLearningPaths();
  const certifications = omniPlayLearnService.getCertifications();
  const totalXp = omniPlayLearnService.getUserTotalXp();

  if (isOfflineManagerOpen) {
    return <OmniOfflineCacheManager onBack={() => setIsOfflineManagerOpen(false)} />;
  }

  if (selectedCourseId) {
    return (
      <OmniCourseDetailView
        courseId={selectedCourseId}
        onBack={() => setSelectedCourseId(null)}
      />
    );
  }

  return (
    <div id="omni-learn-root" className="flex-1 flex flex-col bg-stone-950 text-stone-100 overflow-hidden">
      {/* Top Hub Banner */}
      <div className="p-6 bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border-b border-stone-800 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>OMNI Learn Sovereign Academy</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Sovereign Engineering, Cryptography & AI Certifications
            </h1>
            <p className="text-xs text-stone-400 max-w-xl">
              Air-gapped interactive courses, cryptographically verified credentials, AI Socratic tutoring, and structured engineering paths.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOfflineManagerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-semibold transition-colors"
            >
              <WifiOff className="w-4 h-4 text-indigo-400" />
              <span>Offline Enclave</span>
            </button>

            <button
              onClick={() => setIsAiTutorOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <Brain className="w-4 h-4" />
              <span>Socratic AI Tutor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="px-6 bg-stone-900/60 border-b border-stone-800 flex items-center justify-between gap-4">
        <div className="flex gap-6 max-w-6xl mx-auto w-full">
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'courses'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Interactive Courses</span>
          </button>

          <button
            onClick={() => setActiveTab('paths')}
            className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'paths'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Learning Paths</span>
          </button>

          <button
            onClick={() => setActiveTab('certifications')}
            className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'certifications'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Verifiable Certifications</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {activeTab === 'courses' && (
            <div className="space-y-6">
              {/* Search & Filter Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {[
                    { id: 'all', label: 'All Courses' },
                    { id: 'ai_engineering', label: 'AI Engineering' },
                    { id: 'cryptography', label: 'Cryptography & PQC' },
                    { id: 'web_development', label: 'Sovereign Web Dev' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedCategory === c.id
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search courses, modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-5 rounded-3xl bg-stone-900 border border-stone-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
                  >
                    <div className="space-y-3">
                      <div className="h-40 rounded-2xl overflow-hidden border border-stone-800 relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-stone-950/80 backdrop-blur-md border border-stone-800 text-[10px] font-mono font-bold text-stone-200">
                          {course.level}
                        </div>
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-[10px] font-mono font-bold text-indigo-300">
                          +{course.xpReward} XP
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-stone-100 group-hover:text-indigo-400 transition-colors leading-snug">
                          {course.title}
                        </h3>
                        <p className="text-xs text-stone-400 line-clamp-2">
                          {course.subtitle}
                        </p>
                      </div>

                      {/* Instructor */}
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-400">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-5 h-5 rounded-full object-cover border border-stone-700"
                          referrerPolicy="no-referrer"
                        />
                        <span>{course.instructor.name}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.totalDurationHours} hrs</span>
                      </div>

                      <button
                        onClick={() => setSelectedCourseId(course.id)}
                        className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 shadow-md transition-colors"
                      >
                        <span>Start Learning</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'paths' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-stone-200">Curated Sovereign Engineering Roles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningPaths.map((path) => (
                  <div
                    key={path.id}
                    className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 shadow-lg"
                  >
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono font-bold uppercase">
                        {path.targetRole}
                      </span>
                      <h3 className="text-base font-extrabold text-white">{path.title}</h3>
                      <p className="text-xs text-stone-400">{path.description}</p>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-stone-400">Path Progress</span>
                        <span className="text-indigo-400">{path.progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800">
                        <div
                          className="bg-indigo-500 h-full transition-all"
                          style={{ width: `${path.progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 text-xs space-y-1">
                      <span className="text-stone-500 font-bold text-[10px] uppercase">Capstone Project</span>
                      <p className="text-stone-300">{path.capstoneProject}</p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        +{path.totalXp} Total XP
                      </span>
                      <button
                        onClick={() => setSelectedCourseId(path.courseIds[0])}
                        className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs transition-colors"
                      >
                        Continue Path →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-stone-200">Verifiable Cryptographic Credentials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-6 rounded-3xl bg-stone-900 border border-amber-500/40 space-y-4 shadow-xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                        <Award className="w-4 h-4" />
                        <span>Verifiable Credential</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                        On-Chain Verified
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-white">{cert.title}</h3>
                      <p className="text-xs text-stone-400">Awarded to: <strong className="text-stone-200">{cert.recipientName}</strong></p>
                    </div>

                    <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between text-stone-400">
                        <span>Credential ID:</span>
                        <span className="text-stone-200">{cert.credentialId}</span>
                      </div>
                      <div className="flex justify-between text-stone-400">
                        <span>Signature:</span>
                        <span className="text-emerald-400 truncate max-w-[180px]">{cert.cryptographicSignature}</span>
                      </div>
                      <div className="flex justify-between text-stone-400">
                        <span>Exam Grade:</span>
                        <span className="text-amber-400 font-bold">{cert.gradeScore}%</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsVerified.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-stone-950 text-stone-400 text-[10px] border border-stone-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Tutor Drawer */}
      <OmniAiTutorDrawer
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
      />
    </div>
  );
};
