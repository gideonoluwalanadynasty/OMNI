import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Users,
  Clock,
  HelpCircle,
  Sparkles,
  FileCheck,
  Video,
  Shield,
  Layers,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';

interface Props {
  engine: OmniConnectEngine;
  currentProfileId: string;
}

export const OmniClassroomView: React.FC<Props> = ({ engine, currentProfileId }) => {
  const classroom = engine.getVirtualClassroom();
  const [selectedTopicId, setSelectedTopicId] = useState<string>(classroom?.lessonOutline?.[0]?.id || 'top_01');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [issuedCertificates, setIssuedCertificates] = useState<string[]>([]);

  if (!classroom) return null;

  const handleToggleTopic = (topicId: string) => {
    engine.toggleLessonTopicComplete(classroom.id, topicId);
    setSelectedTopicId(topicId);
  };

  const handleSubmitQuiz = () => {
    if (selectedQuizAnswer !== null && classroom.activeQuiz) {
      engine.submitClassroomQuizAnswer(classroom.id, classroom.activeQuiz.id, currentProfileId, selectedQuizAnswer);
      setQuizSubmitted(true);
    }
  };

  const handleIssueCertificate = (studentId: string) => {
    engine.issueClassroomCertificate(classroom.id, studentId);
    setIssuedCertificates(prev => [...prev, studentId]);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Classroom Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-900/90 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">OMNI Learn • Virtual Classroom</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Course: {classroom.courseTitle}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Instructor: <strong className="text-slate-200">{classroom.instructorName}</strong> • Real-time Interactive Quizzes & Dynamic Certifications
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>{(classroom.attendanceLedger || []).length} Enrolled Students</span>
          </div>
        </div>
      </div>

      {/* Classroom Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-5 p-5 overflow-y-auto">
        {/* Left Column: Lesson Outline & Video Feed */}
        <div className="lg:col-span-2 space-y-5">
          {/* Main Whiteboard / Lesson Player */}
          <div className="aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative flex flex-col justify-between p-6 group">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000"
              alt={(classroom.lessonOutline || []).find(l => l.id === selectedTopicId)?.title || 'Lesson Stream'}
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-indigo-600/90 text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" /> Interactive Lecture Stream
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-emerald-400 text-xs font-mono border border-slate-700">
                1080p60 • AI Live Subtitles Active
              </span>
            </div>

            <div className="relative z-10 space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                Current Topic
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {(classroom.lessonOutline || []).find(l => l.id === selectedTopicId)?.title || 'Select a topic'}
              </h2>
            </div>
          </div>

          {/* Interactive Lesson Outline */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" /> Syllabus Modules & Learning Objectives
            </h3>

            <div className="space-y-2.5">
              {(classroom.lessonOutline || []).map((topic, idx) => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedTopicId === topic.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-indigo-300">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{topic.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {topic.durationMinutes} minutes
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleToggleTopic(topic.id);
                    }}
                    className={`p-1.5 rounded-xl border transition-colors ${
                      topic.isCompleted
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Quiz & Attendance / Certifications */}
        <div className="space-y-5">
          {/* Active Live Quiz Card */}
          {classroom.activeQuiz && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400" /> Interactive Knowledge Check
                </h3>
                <span className="text-[10px] text-amber-400 font-mono">20s Quiz Timer</span>
              </div>

              <p className="text-xs font-bold text-white leading-relaxed">
                {classroom.activeQuiz.question}
              </p>

              <div className="space-y-2">
                {(classroom.activeQuiz.options || []).map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => setSelectedQuizAnswer(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                      selectedQuizAnswer === idx
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    } ${
                      quizSubmitted && idx === classroom.activeQuiz?.correctOptionIndex
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                        : ''
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </button>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={selectedQuizAnswer === null}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
                  <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Answer Recorded
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {selectedQuizAnswer === classroom.activeQuiz.correctOptionIndex
                      ? 'Correct! +50 OMNI Learn XP awarded to your profile.'
                      : 'Incorrect. Review Module 01 for the answer.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Student Roster & On-Chain Verifiable Certifications */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" /> Attendance & Course Certificates
            </h3>

            <div className="space-y-3">
              {(classroom.attendanceLedger || []).map(student => {
                const isIssued =
                  student.certificateIssued || issuedCertificates.includes(student.studentProfileId);

                return (
                  <div
                    key={student.studentProfileId}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={student.avatarUrl}
                          alt={student.displayName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{student.displayName}</div>
                          <div className="text-[10px] text-indigo-400 font-mono">
                            Attention Score: {student.attentionScore}%
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] text-slate-400 font-mono">
                        {student.joinTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                      <span className="text-[10px] text-slate-400">
                        {isIssued ? 'Certificate Verified' : 'Eligible for Certificate'}
                      </span>

                      <button
                        onClick={() => handleIssueCertificate(student.studentProfileId)}
                        disabled={isIssued}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                          isIssued
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            : 'bg-indigo-600/30 border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/40'
                        }`}
                      >
                        <FileCheck className="w-3 h-3" />
                        {isIssued ? 'Issued' : 'Issue NFT Cert'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
