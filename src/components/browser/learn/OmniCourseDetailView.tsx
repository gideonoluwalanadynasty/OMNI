import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Lock,
  PlayCircle,
  Award,
  Sparkles,
  ShieldCheck,
  Brain,
  Download,
  Clock,
  User,
  Share2,
  Check,
  AlertTriangle,
  Code
} from 'lucide-react';
import { LearnCourse, CourseLesson } from '../../../types/play_learn_ecosystem';
import { omniPlayLearnService } from '../../../sdk/browser-services/OmniPlayLearnService';
import { OmniAiTutorDrawer } from './OmniAiTutorDrawer';

interface OmniCourseDetailViewProps {
  courseId: string;
  onBack: () => void;
}

export const OmniCourseDetailView: React.FC<OmniCourseDetailViewProps> = ({
  courseId,
  onBack
}) => {
  const course = omniPlayLearnService.getCourseById(courseId);
  const [activeLessonId, setActiveLessonId] = useState<string>(
    course?.modules[0]?.lessons[0]?.id || ''
  );
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [certIssued, setCertIssued] = useState(false);

  if (!course) {
    return (
      <div className="p-8 text-center text-stone-400">
        Course not found.
        <button onClick={onBack} className="block mx-auto mt-4 px-4 py-2 bg-stone-800 rounded-xl text-white">
          Back
        </button>
      </div>
    );
  }

  // Find active lesson
  let activeLesson: CourseLesson | undefined;
  for (const m of course.modules) {
    const found = m.lessons.find(l => l.id === activeLessonId);
    if (found) {
      activeLesson = found;
      break;
    }
  }

  // Count total and completed lessons
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (sum, m) => sum + m.lessons.filter(l => l.completed).length,
    0
  );
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  const handleQuizSubmit = () => {
    if (selectedQuizAnswer === null || isQuizSubmitted || !activeLesson?.quizQuestion) return;
    setIsQuizSubmitted(true);

    if (selectedQuizAnswer === activeLesson.quizQuestion.correctIndex) {
      omniPlayLearnService.markLessonComplete(course.id, activeLesson.id);
    }
  };

  const handleMarkComplete = () => {
    if (activeLesson) {
      omniPlayLearnService.markLessonComplete(course.id, activeLesson.id);
    }
  };

  const handleClaimCertification = () => {
    omniPlayLearnService.issueCertification(course.id, 'Sovereign Scholar', 97.4);
    setCertIssued(true);
  };

  return (
    <div id="omni-course-detail-view" className="flex-1 flex flex-col bg-stone-950 text-stone-100 overflow-hidden">
      {/* Top Bar */}
      <div className="p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Courses</span>
          </button>
          <div>
            <h2 className="text-sm font-bold text-stone-100 truncate max-w-md">
              {course.title}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-stone-400">
              <span>{course.level}</span>
              <span>•</span>
              <span>{progressPercent}% Complete ({completedLessons}/{totalLessons} Lessons)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAiTutorOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 text-xs font-bold transition-colors"
          >
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>Summon AI Tutor</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Left Lessons Syllabus + Right Lesson Reader */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar: Syllabus */}
        <div className="w-full md:w-80 border-r border-stone-800 bg-stone-950/80 p-4 overflow-y-auto shrink-0 space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Course Syllabus
            </span>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {course.modules.map((m, mIdx) => (
              <div key={m.id} className="space-y-2">
                <div className="text-xs font-bold text-stone-300">
                  {m.title}
                </div>

                <div className="space-y-1">
                  {m.lessons.map((les) => {
                    const isActive = les.id === activeLessonId;
                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveLessonId(les.id);
                          setSelectedQuizAnswer(null);
                          setIsQuizSubmitted(false);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left text-xs flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-stone-900/60 hover:bg-stone-800 text-stone-300 border border-stone-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {les.completed ? (
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                          ) : (
                            <PlayCircle className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className={`text-[10px] shrink-0 font-mono ${isActive ? 'text-indigo-200' : 'text-stone-500'}`}>
                          {les.durationMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Certificate Claim Button if finished */}
          {progressPercent >= 100 && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 space-y-2 text-center">
              <Award className="w-8 h-8 text-amber-400 mx-auto" />
              <div className="text-xs font-bold text-amber-200">Course Complete!</div>
              <p className="text-[10px] text-amber-400/80">
                You qualify for the verifiable on-chain credential.
              </p>
              <button
                onClick={handleClaimCertification}
                disabled={certIssued}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                {certIssued ? '✓ Credential Claimed' : 'Claim Verifiable Certificate'}
              </button>
            </div>
          )}
        </div>

        {/* Right Area: Lesson Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
          {activeLesson ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Lesson Header */}
              <div className="space-y-2 pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono font-bold uppercase">
                    {activeLesson.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-stone-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activeLesson.durationMinutes} minutes reading & lab
                  </span>
                </div>
                <h1 className="text-xl font-extrabold text-white">{activeLesson.title}</h1>
              </div>

              {/* Lesson Markdown Content */}
              <div className="prose prose-invert prose-stone max-w-none text-xs md:text-sm leading-relaxed space-y-4">
                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 whitespace-pre-wrap font-sans text-stone-200">
                  {activeLesson.contentMarkdown}
                </div>
              </div>

              {/* Interactive Comprehension Quiz Check */}
              {activeLesson.quizQuestion && (
                <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Check for Understanding Quiz</span>
                  </div>

                  <h3 className="text-sm font-bold text-stone-100">
                    {activeLesson.quizQuestion.question}
                  </h3>

                  <div className="space-y-2">
                    {activeLesson.quizQuestion.options.map((opt, idx) => {
                      const isSelected = selectedQuizAnswer === idx;
                      const isCorrect = isQuizSubmitted && idx === activeLesson!.quizQuestion!.correctIndex;
                      const isWrong = isQuizSubmitted && isSelected && idx !== activeLesson!.quizQuestion!.correctIndex;

                      return (
                        <button
                          key={idx}
                          onClick={() => !isQuizSubmitted && setSelectedQuizAnswer(idx)}
                          className={`w-full p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${
                            isCorrect
                              ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                              : isWrong
                              ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                              : isSelected
                              ? 'bg-indigo-950 border-2 border-indigo-500 text-white'
                              : 'bg-stone-950 border border-stone-800 text-stone-300 hover:bg-stone-850'
                          }`}
                        >
                          <span>{opt}</span>
                          {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {isWrong && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isQuizSubmitted && (
                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-1">
                      <span className="font-bold text-indigo-400">Explanation:</span>
                      <p>{activeLesson.quizQuestion.explanation}</p>
                    </div>
                  )}

                  {!isQuizSubmitted && (
                    <div className="flex justify-end">
                      <button
                        onClick={handleQuizSubmit}
                        disabled={selectedQuizAnswer === null}
                        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs shadow-md transition-colors"
                      >
                        Submit Check
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Lesson Completion Actions */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <button
                  onClick={handleMarkComplete}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark Lesson Complete</span>
                </button>

                <button
                  onClick={() => setIsAiTutorOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-indigo-400 text-xs font-semibold border border-stone-800 transition-colors"
                >
                  <Brain className="w-4 h-4" />
                  <span>Ask AI Tutor about this</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-500">
              Select a lesson from the syllabus to begin learning.
            </div>
          )}
        </div>
      </div>

      {/* AI Tutor Drawer */}
      <OmniAiTutorDrawer
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        courseTitle={course.title}
        lessonTitle={activeLesson?.title}
      />
    </div>
  );
};
