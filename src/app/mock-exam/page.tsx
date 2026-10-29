"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useProgress } from "@/store/useProgress";
import {
  ALL_MOCK_EXAMS,
  type ExamType,
  type MockExam,
  type MockExamSection,
  type MockExamQuestion,
  type MockWritingTask,
  type MockSpeakingTask,
  calculateIeltsBand,
  calculateIeltsOverallBand,
  calculateToeflScore,
  getIeltsBandDescription,
} from "@/data/mock-exam";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Trophy,
  Award,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Flag,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Volume2,
  FileText,
  Sparkles,
  BarChart2,
  Check,
  RefreshCw,
} from "lucide-react";

function MockExamContent() {
  const { addXP } = useProgress();
  const searchParams = useSearchParams();

  // ── Exam Selection State ──
  const [selectedExamId, setSelectedExamId] = useState<ExamType>("ielts-academic");
  const exam: MockExam = ALL_MOCK_EXAMS[selectedExamId] || ALL_MOCK_EXAMS["ielts-academic"];

  // Sync exam selection from URL query param (?exam=...)
  useEffect(() => {
    const examParam = searchParams.get("exam") as ExamType | null;
    if (examParam && ALL_MOCK_EXAMS[examParam]) {
      setSelectedExamId(examParam);
      setStarted(false);
      setFinished(false);
      setAnswers({});
      setWritingSubmissions({});
    }
  }, [searchParams]);

  // ── Navigation & Exam Flow State ──
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [activeTab, setActiveTab] = useState<"listening" | "reading" | "writing" | "speaking">("listening");
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  // ── Candidate Answers & Interactions ──
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [writingSubmissions, setWritingSubmissions] = useState<Record<string, string>>({});
  const [activeSpeakingIdx, setActiveSpeakingIdx] = useState(0);

  // ── Timers ──
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(exam.totalDuration * 60);
  const globalTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ── Audio Player State (Web Speech API) ──
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.9);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioHasPlayed, setAudioHasPlayed] = useState<Record<string, boolean>>({});

  // ── Speaking Module Timers ──
  const [prepSecondsRemaining, setPrepSecondsRemaining] = useState<number | null>(null);
  const [speakingSecondsRemaining, setSpeakingSecondsRemaining] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const speakingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ── Review Mode Tabs ──
  const [reviewTab, setReviewTab] = useState<"overview" | "listening" | "reading" | "writing" | "speaking">("overview");

  // Sync timer when exam changes
  useEffect(() => {
    setTotalTimeRemaining(exam.totalDuration * 60);
  }, [exam]);

  // Global Countdown Timer
  useEffect(() => {
    if (started && !finished) {
      globalTimerRef.current = setInterval(() => {
        setTotalTimeRemaining((t) => {
          if (t <= 1) {
            handleFinishExam();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    };
  }, [started, finished]);

  // Cleanup speech synthesis on unmount or finish
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartExam = (examId: ExamType) => {
    setSelectedExamId(examId);
    setStarted(true);
    setFinished(false);
    setActiveTab("listening");
    setActiveSectionIdx(0);
    setActiveQuestionIdx(0);
    setAnswers({});
    setFlagged({});
    setWritingSubmissions({});
    setTotalTimeRemaining(ALL_MOCK_EXAMS[examId].totalDuration * 60);
  };

  const handleFinishExam = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (globalTimerRef.current) clearInterval(globalTimerRef.current);
    if (speakingTimerRef.current) clearInterval(speakingTimerRef.current);
    setFinished(true);
    playXP();
    addXP(100);
  };

  // ── Audio Playback Engine ──
  const currentListeningSection = exam.listeningSections[activeSectionIdx] || exam.listeningSections[0];

  const toggleAudioPlayback = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Audio playback requires a browser supporting the Web Speech API.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const script = currentListeningSection?.audioScript;
    if (!script) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = "en-GB";
    utterance.rate = audioSpeed;

    const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
    if (voices.length > 0) {
      const britishVoice = voices.find((v) => v.lang.includes("GB") || v.name.includes("British") || v.name.includes("UK"));
      utterance.voice = britishVoice || voices[0];
    }

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setAudioHasPlayed((prev) => ({ ...prev, [currentListeningSection.id]: true }));
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setAudioProgress(100);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // ── Speaking Station Controls ──
  const currentSpeakingTask = exam.speakingTasks[activeSpeakingIdx] || exam.speakingTasks[0];

  const startPreparation = (duration: number) => {
    if (speakingTimerRef.current) clearInterval(speakingTimerRef.current);
    setPrepSecondsRemaining(duration);
    setIsRecording(false);
    speakingTimerRef.current = setInterval(() => {
      setPrepSecondsRemaining((prev) => {
        if (prev === null || prev <= 1) {
          if (speakingTimerRef.current) clearInterval(speakingTimerRef.current);
          playCorrect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecording = (duration: number) => {
    if (speakingTimerRef.current) clearInterval(speakingTimerRef.current);
    setSpeakingSecondsRemaining(duration);
    setIsRecording(true);
    speakingTimerRef.current = setInterval(() => {
      setSpeakingSecondsRemaining((prev) => {
        if (prev === null || prev <= 1) {
          if (speakingTimerRef.current) clearInterval(speakingTimerRef.current);
          setIsRecording(false);
          playXP();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ── Scoring & Psychometrics ──
  const results = useMemo(() => {
    let listeningCorrect = 0;
    let listeningTotal = 0;
    const listeningResults: { q: MockExamQuestion; user: string; correct: boolean }[] = [];

    for (const sec of exam.listeningSections) {
      for (const q of sec.questions) {
        listeningTotal++;
        const userAns = (answers[q.id] || "").trim();
        const isCorrect = Array.isArray(q.correctAnswer)
          ? q.correctAnswer.some((ans) => ans.toLowerCase().trim() === userAns.toLowerCase())
          : userAns.toLowerCase() === q.correctAnswer.toLowerCase().trim();
        if (isCorrect) listeningCorrect++;
        listeningResults.push({ q, user: userAns, correct: isCorrect });
      }
    }

    let readingCorrect = 0;
    let readingTotal = 0;
    const readingResults: { q: MockExamQuestion; user: string; correct: boolean }[] = [];

    for (const sec of exam.readingSections) {
      for (const q of sec.questions) {
        readingTotal++;
        const userAns = (answers[q.id] || "").trim();
        const isCorrect = Array.isArray(q.correctAnswer)
          ? q.correctAnswer.some((ans) => ans.toLowerCase().trim() === userAns.toLowerCase())
          : userAns.toLowerCase() === q.correctAnswer.toLowerCase().trim();
        if (isCorrect) readingCorrect++;
        readingResults.push({ q, user: userAns, correct: isCorrect });
      }
    }

    if (exam.scoringSystem === "ielts-band") {
      const listeningBand = calculateIeltsBand(listeningCorrect, listeningTotal, "listening");
      const readingSkill = exam.id === "ielts-general" ? "gt-reading" : "academic-reading";
      const readingBand = calculateIeltsBand(readingCorrect, readingTotal, readingSkill);
      // Realistic simulation assumes calibrated writing/speaking baseline based on reading/listening
      const writingBand = Math.max(5.0, Math.min(8.5, (listeningBand + readingBand) / 2));
      const speakingBand = Math.max(5.0, Math.min(8.5, (listeningBand + readingBand) / 2));
      const overallBand = calculateIeltsOverallBand(listeningBand, readingBand, writingBand, speakingBand);
      const desc = getIeltsBandDescription(overallBand);

      return {
        type: "ielts" as const,
        listeningCorrect,
        listeningTotal,
        readingCorrect,
        readingTotal,
        listeningBand,
        readingBand,
        writingBand,
        speakingBand,
        overallBand,
        cefr: desc.cefr,
        label: desc.label,
        summary: desc.summary,
        listeningResults,
        readingResults,
      };
    } else {
      // TOEFL iBT 2026 Format
      const toefl = calculateToeflScore(readingCorrect, readingTotal, listeningCorrect, listeningTotal);
      return {
        type: "toefl" as const,
        listeningCorrect,
        listeningTotal,
        readingCorrect,
        readingTotal,
        band: toefl.band,
        concordance: toefl.concordance,
        cefr: toefl.cefr,
        readingBand: toefl.readingBand,
        listeningBand: toefl.listeningBand,
        writingBand: toefl.writingBand,
        speakingBand: toefl.speakingBand,
        summary: toefl.summary,
        listeningResults,
        readingResults,
      };
    }
  }, [exam, answers]);

  // ─────────────────────────────────────────────────────────────
  // RENDER: Exam Selection Landing Screen
  // ─────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <PageWrapper>
        <div className="max-w-5xl mx-auto space-y-8 py-4">
          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[var(--radius-lg)] p-8 text-white relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 60%, #312e81 100%)",
              boxShadow: "0 10px 30px rgba(30, 58, 138, 0.25)",
            }}
          >
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-pill)] bg-white/10 text-xs font-display font-bold tracking-wider uppercase text-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
                Official Standard Simulation Center
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                Authentic English Exam Simulations
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                Experience realistic full-length test conditions for IELTS Academic, IELTS General Training, and the
                revised 2026 TOEFL iBT®. Includes interactive speech audio, split-pane reading passages, SVG visual data
                writing tasks, and psychometrically validated score conversion.
              </p>
            </div>
            {/* Ambient Background Glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* Exam Variant Cards Grid */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
              Choose Your Examination Track
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Option 1: IELTS Academic */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`bg-[var(--color-surface)] border-2 rounded-[var(--radius-lg)] p-5 cursor-pointer flex flex-col justify-between transition-all ${
                  selectedExamId === "ielts-academic"
                    ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 shadow-lg"
                    : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)]"
                }`}
                onClick={() => setSelectedExamId("ielts-academic")}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="info">University & Medical</Badge>
                    <span className="font-display text-xs font-bold text-[var(--color-text-disabled)]">0–9.0 Band</span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-[var(--color-text-primary)]">
                    IELTS Academic
                  </h3>
                  <p className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    Designed for candidates seeking admission to undergraduate or postgraduate university programmes
                    and international professional registration.
                  </p>
                  <ul className="space-y-1.5 pt-2 text-xs font-body text-[var(--color-text-primary)]">
                    <li className="flex items-center gap-2">
                      <Headphones className="w-3.5 h-3.5 text-blue-500" /> 4 Listening Sections (Audio)
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> 3 Complex Academic Texts (TFNG/Headings)
                    </li>
                    <li className="flex items-center gap-2">
                      <BarChart2 className="w-3.5 h-3.5 text-amber-500" /> Task 1 Renewable Energy Line Graph (SVG)
                    </li>
                    <li className="flex items-center gap-2">
                      <PenTool className="w-3.5 h-3.5 text-purple-500" /> Task 2 Discursive Essay (250+ Words)
                    </li>
                    <li className="flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-rose-500" /> 3 Speaking Parts with Cue Card Timers
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-disabled)]">
                    <Clock className="w-3.5 h-3.5" /> 165 Minutes
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartExam("ielts-academic");
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white text-xs font-display font-extrabold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm"
                  >
                    Start Exam <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>

              {/* Option 2: IELTS General Training */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`bg-[var(--color-surface)] border-2 rounded-[var(--radius-lg)] p-5 cursor-pointer flex flex-col justify-between transition-all ${
                  selectedExamId === "ielts-general"
                    ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 shadow-lg"
                    : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)]"
                }`}
                onClick={() => setSelectedExamId("ielts-general")}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="success">Immigration & Work</Badge>
                    <span className="font-display text-xs font-bold text-[var(--color-text-disabled)]">0–9.0 Band</span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-[var(--color-text-primary)]">
                    IELTS General Training
                  </h3>
                  <p className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    Geared towards candidates migrating to Australia, Canada, New Zealand, or the UK, and those
                    seeking vocational secondary education.
                  </p>
                  <ul className="space-y-1.5 pt-2 text-xs font-body text-[var(--color-text-primary)]">
                    <li className="flex items-center gap-2">
                      <Headphones className="w-3.5 h-3.5 text-blue-500" /> Standard IELTS Listening Test
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> Social & Workplace Survival Texts
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-amber-500" /> Task 1 Formal Business Letter (150 words)
                    </li>
                    <li className="flex items-center gap-2">
                      <PenTool className="w-3.5 h-3.5 text-purple-500" /> Task 2 Social Impact Essay (250 words)
                    </li>
                    <li className="flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-rose-500" /> 3 Speaking Parts with Model Responses
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-disabled)]">
                    <Clock className="w-3.5 h-3.5" /> 165 Minutes
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartExam("ielts-general");
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] bg-emerald-600 text-white text-xs font-display font-extrabold hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    Start Exam <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>

              {/* Option 3: TOEFL iBT 2026 Format */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`bg-[var(--color-surface)] border-2 rounded-[var(--radius-lg)] p-5 cursor-pointer flex flex-col justify-between transition-all ${
                  selectedExamId === "toefl-ibt"
                    ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 shadow-lg"
                    : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)]"
                }`}
                onClick={() => setSelectedExamId("toefl-ibt")}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="default">2026 Format Update</Badge>
                    <span className="font-display text-xs font-bold text-[var(--color-text-disabled)]">1.0–6.0 Scale</span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-[var(--color-text-primary)]">
                    TOEFL iBT® 2026
                  </h3>
                  <p className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    The modern ETS examination format featuring the direct 1.0–6.0 CEFR scale, Complete the Words,
                    Academic Discussion, and dual 0–120 concordance reporting.
                  </p>
                  <ul className="space-y-1.5 pt-2 text-xs font-body text-[var(--color-text-primary)]">
                    <li className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Complete the Words & Quaternary Passage
                    </li>
                    <li className="flex items-center gap-2">
                      <Headphones className="w-3.5 h-3.5 text-emerald-500" /> Campus Consultation & Biology Lecture
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-amber-500" /> Campus Email Task (80–120 words)
                    </li>
                    <li className="flex items-center gap-2">
                      <PenTool className="w-3.5 h-3.5 text-purple-500" /> Academic Discussion with Dr. Diaz (10 min)
                    </li>
                    <li className="flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-rose-500" /> Listen & Repeat + Campus Interview
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-disabled)]">
                    <Clock className="w-3.5 h-3.5" /> 120 Minutes
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartExam("toefl-ibt");
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] bg-purple-600 text-white text-xs font-display font-extrabold hover:bg-purple-700 transition-colors shadow-sm"
                  >
                    Start Exam <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Test Conditions & Realism Guidelines */}
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border-default)]">
            <h3 className="font-display text-base font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[var(--color-primary)]" />
              Standard Test Conditions Enforced
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body text-[var(--color-text-secondary)]">
              <div className="space-y-2">
                <p>
                  <strong>🎧 Blind Listening Audio:</strong> Transcripts are hidden during testing to simulate real test-room acoustic conditions. They are revealed only during post-exam review.
                </p>
                <p>
                  <strong>📖 Split-Screen Reading:</strong> Passages and questions are arranged in parallel so you can cross-reference evidence without losing your place.
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>✍️ Authentic Word Counters:</strong> Writing tasks enforce minimum length requirements without arbitrary upper limits, mirroring Cambridge and ETS assessment guidelines.
                </p>
                <p>
                  <strong>🎙️ Synchronized Speaking Booth:</strong> Official preparation and speaking countdown timers simulate real test-center pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER: Active Exam Simulation Runner
  // ─────────────────────────────────────────────────────────────
  if (started && !finished) {
    return (
      <PageWrapper>
        <div className="max-w-6xl mx-auto space-y-5 pb-12">
          {/* Exam Header & Global Timer */}
          <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 flex flex-wrap items-center justify-between gap-4 sticky top-16 z-30 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center font-display font-black text-sm">
                {exam.id === "toefl-ibt" ? "ETS" : "IELTS"}
              </div>
              <div>
                <h1 className="font-display text-sm sm:text-base font-extrabold text-[var(--color-text-primary)]">
                  {exam.title}
                </h1>
                <p className="font-body text-xs text-[var(--color-text-disabled)]">
                  {exam.subtitle}
                </p>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] border font-mono font-bold text-sm ${
                  totalTimeRemaining < 300
                    ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
                    : "bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border-[var(--color-border-default)]"
                }`}
              >
                <Clock className="w-4 h-4 text-[var(--color-text-secondary)]" />
                <span>{formatTimer(totalTimeRemaining)}</span>
              </div>

              <button
                onClick={handleFinishExam}
                className="px-4 py-1.5 rounded-[var(--radius-md)] bg-rose-600 hover:bg-rose-700 text-white font-display font-extrabold text-xs transition-colors shadow-sm"
              >
                Finish Exam
              </button>
            </div>
          </div>

          {/* Skill Navigation Tabs */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 border-b border-[var(--color-border-default)] pb-1">
            <button
              onClick={() => setActiveTab("listening")}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-[var(--radius-md)] font-display text-xs font-bold transition-all ${
                activeTab === "listening"
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
              }`}
            >
              <Headphones className="w-4 h-4" /> Listening
            </button>
            <button
              onClick={() => setActiveTab("reading")}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-[var(--radius-md)] font-display text-xs font-bold transition-all ${
                activeTab === "reading"
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Reading
            </button>
            <button
              onClick={() => setActiveTab("writing")}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-[var(--radius-md)] font-display text-xs font-bold transition-all ${
                activeTab === "writing"
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
              }`}
            >
              <PenTool className="w-4 h-4" /> Writing
            </button>
            <button
              onClick={() => setActiveTab("speaking")}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-[var(--radius-md)] font-display text-xs font-bold transition-all ${
                activeTab === "speaking"
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
              }`}
            >
              <Mic className="w-4 h-4" /> Speaking
            </button>
          </div>

          {/* ───────────────────────────────────────────── */}
          {/* TAB 1: LISTENING STATION                      */}
          {/* ───────────────────────────────────────────── */}
          {activeTab === "listening" && (
            <div className="space-y-6">
              {/* Audio Broadcast Control Bar */}
              <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="font-display text-xs font-bold uppercase text-[var(--color-primary)]">
                      {currentListeningSection?.title}
                    </span>
                    <h2 className="font-display text-lg font-extrabold text-[var(--color-text-primary)]">
                      {currentListeningSection?.subtitle}
                    </h2>
                  </div>

                  {/* Audio Controls */}
                  <div className="flex items-center gap-3">
                    <select
                      value={audioSpeed}
                      onChange={(e) => setAudioSpeed(Number(e.target.value))}
                      className="text-xs font-body bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-2.5 py-1.5 text-[var(--color-text-primary)]"
                    >
                      <option value="0.8">0.8x Speed</option>
                      <option value="0.9">0.9x Speed (Standard)</option>
                      <option value="1.0">1.0x Speed (Authentic)</option>
                    </select>

                    <button
                      onClick={toggleAudioPlayback}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] font-display font-extrabold text-xs transition-all ${
                        isPlayingAudio
                          ? "bg-amber-500 text-white animate-pulse"
                          : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <Pause className="w-4 h-4" /> Pause Audio Stream
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" /> Play Audio Stream
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Animated Audio Equalizer Bar */}
                <div className="h-2 w-full bg-[var(--color-surface-alt)] rounded-full overflow-hidden flex items-center">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                    animate={{
                      width: isPlayingAudio ? ["20%", "70%", "45%", "90%", "60%"] : audioHasPlayed[currentListeningSection?.id || ""] ? "100%" : "0%",
                    }}
                    transition={{
                      repeat: isPlayingAudio ? Infinity : 0,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-body text-[var(--color-text-disabled)]">
                  <span>Accents: {currentListeningSection?.speakerAccents?.join(", ") || "British English"}</span>
                  <span>Audio text is blind during examination. Listen carefully to note answers.</span>
                </div>
              </div>

              {/* Instructions Callout */}
              <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-[var(--radius-md)] p-3.5 text-xs text-blue-900 dark:text-blue-200">
                <strong>Instructions:</strong> {currentListeningSection?.instructions}
              </div>

              {/* Listening Question Bank */}
              <div className="space-y-4">
                {currentListeningSection?.questions.map((q, idx) => {
                  const userAnswer = answers[q.id] || "";
                  const isFlagged = Boolean(flagged[q.id]);

                  return (
                    <div
                      key={q.id}
                      className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-5 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] flex items-center justify-center font-display font-extrabold text-xs">
                            {idx + 1}
                          </span>
                          <span className="font-display text-xs font-bold text-[var(--color-text-disabled)] uppercase">
                            {q.type.replace(/-/g, " ")}
                          </span>
                        </div>

                        <button
                          onClick={() => setFlagged((f) => ({ ...f, [q.id]: !f[q.id] }))}
                          className={`text-xs font-body flex items-center gap-1 transition-colors ${
                            isFlagged ? "text-amber-500 font-bold" : "text-[var(--color-text-disabled)] hover:text-amber-500"
                          }`}
                        >
                          <Flag className="w-3.5 h-3.5" /> {isFlagged ? "Flagged" : "Flag"}
                        </button>
                      </div>

                      <p className="font-body text-sm font-semibold text-[var(--color-text-primary)]">
                        {q.prompt}
                      </p>

                      {/* Question Answer Inputs */}
                      {q.options && q.options.length > 0 ? (
                        <div className="space-y-2 pt-1">
                          {q.options.map((opt) => (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 p-3 rounded-[var(--radius-md)] border cursor-pointer text-xs font-body transition-all ${
                                userAnswer === opt
                                  ? "bg-blue-50/70 dark:bg-blue-950/30 border-blue-500 text-blue-900 dark:text-blue-100 font-bold"
                                  : "border-[var(--color-border-default)] hover:bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`q-${q.id}`}
                                value={opt}
                                checked={userAnswer === opt}
                                onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                                className="accent-blue-600"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="pt-1">
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                            placeholder="Type your answer here..."
                            className="w-full max-w-md bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3.5 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] transition-all font-body"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Section Navigation Footer */}
              <div className="flex items-center justify-between pt-4">
                <button
                  disabled={activeSectionIdx === 0}
                  onClick={() => {
                    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
                    setIsPlayingAudio(false);
                    setActiveSectionIdx((i) => Math.max(0, i - 1));
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-xs font-display font-bold disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous Section
                </button>

                {activeSectionIdx < exam.listeningSections.length - 1 ? (
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
                      setIsPlayingAudio(false);
                      setActiveSectionIdx((i) => i + 1);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white text-xs font-display font-bold hover:bg-[var(--color-primary-dark)]"
                  >
                    Next Listening Section <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
                      setIsPlayingAudio(false);
                      setActiveTab("reading");
                      setActiveSectionIdx(0);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] bg-emerald-600 text-white text-xs font-display font-bold hover:bg-emerald-700"
                  >
                    Proceed to Reading <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────── */}
          {/* TAB 2: READING STATION (SPLIT PANE)           */}
          {/* ───────────────────────────────────────────── */}
          {activeTab === "reading" && (
            <div className="space-y-6">
              {/* Reading Passage Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {exam.readingSections.map((sec, idx) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSectionIdx(idx)}
                    className={`px-3.5 py-1.5 rounded-[var(--radius-md)] text-xs font-display font-bold whitespace-nowrap transition-all ${
                      activeSectionIdx === idx
                        ? "bg-[var(--color-primary)] text-white shadow-sm"
                        : "bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>

              {/* Split Pane: Left Reading Passage, Right Questions */}
              {(() => {
                const currentReading = exam.readingSections[activeSectionIdx] || exam.readingSections[0];

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Pane: Authentic Reading Passage */}
                    <div className="lg:col-span-7 bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-6 space-y-4 lg:max-h-[750px] lg:overflow-y-auto">
                      <div>
                        <span className="text-xs font-display font-bold uppercase text-[var(--color-primary)]">
                          {currentReading?.subtitle}
                        </span>
                        <h2 className="font-display text-xl font-extrabold text-[var(--color-text-primary)] mt-1">
                          {currentReading?.passageTitle || currentReading?.title}
                        </h2>
                      </div>

                      <div className="prose dark:prose-invert max-w-none text-sm font-body leading-relaxed text-[var(--color-text-primary)] whitespace-pre-line border-t border-[var(--color-border-subtle)] pt-4">
                        {currentReading?.passageText}
                      </div>
                    </div>

                    {/* Right Pane: Interactive Question Palette */}
                    <div className="lg:col-span-5 space-y-4 lg:max-h-[750px] lg:overflow-y-auto pr-1">
                      <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-[var(--radius-md)] p-3.5 text-xs text-emerald-900 dark:text-emerald-200">
                        <strong>Task Instructions:</strong> {currentReading?.instructions}
                      </div>

                      {currentReading?.questions.map((q, qIdx) => {
                        const userAns = answers[q.id] || "";
                        const isFlagged = Boolean(flagged[q.id]);

                        return (
                          <div
                            key={q.id}
                            className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 space-y-3 shadow-xs"
                          >
                            <div className="flex items-center justify-between">
                              <span className="w-5 h-5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] flex items-center justify-center font-display font-black text-xs">
                                {qIdx + 1}
                              </span>
                              <button
                                onClick={() => setFlagged((f) => ({ ...f, [q.id]: !f[q.id] }))}
                                className={`text-xs font-body flex items-center gap-1 ${
                                  isFlagged ? "text-amber-500 font-bold" : "text-[var(--color-text-disabled)]"
                                }`}
                              >
                                <Flag className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="font-body text-xs sm:text-sm font-semibold text-[var(--color-text-primary)]">
                              {q.prompt}
                            </p>

                            {/* TOEFL Complete the Words Task */}
                            {q.type === "complete-the-words" && q.prefix ? (
                              <div className="flex items-center gap-2 p-3 bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] text-sm font-mono">
                                <span className="font-bold text-[var(--color-primary)]">{q.prefix}</span>
                                <input
                                  type="text"
                                  value={userAns}
                                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                                  placeholder="missing letters"
                                  className="w-28 bg-white dark:bg-black border border-blue-400 rounded px-2 py-1 text-sm outline-none"
                                />
                                <span className="text-xs text-[var(--color-text-disabled)] font-body">
                                  (Type missing ending)
                                </span>
                              </div>
                            ) : q.options && q.options.length > 0 ? (
                              <div className="space-y-1.5 pt-1">
                                {q.options.map((opt) => (
                                  <label
                                    key={opt}
                                    className={`flex items-center gap-2.5 p-2.5 rounded-[var(--radius-md)] border cursor-pointer text-xs font-body transition-all ${
                                      userAns === opt
                                        ? "bg-blue-50/70 dark:bg-blue-950/30 border-blue-500 text-blue-900 dark:text-blue-100 font-bold"
                                        : "border-[var(--color-border-default)] hover:bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={`rq-${q.id}`}
                                      value={opt}
                                      checked={userAns === opt}
                                      onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                                      className="accent-blue-600"
                                    />
                                    <span>{opt}</span>
                                  </label>
                                ))}
                              </div>
                            ) : (
                              <div className="pt-1">
                                <input
                                  type="text"
                                  value={userAns}
                                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                                  placeholder="Write 1–2 words from text..."
                                  className="w-full bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3 py-2 text-xs text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Reading Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-default)]">
                <button
                  onClick={() => setActiveTab("listening")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-xs font-display font-bold"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Listening
                </button>

                <button
                  onClick={() => setActiveTab("writing")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] bg-purple-600 text-white text-xs font-display font-bold hover:bg-purple-700"
                >
                  Proceed to Writing Tasks <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────── */}
          {/* TAB 3: WRITING STATION (SVG CHARTS & ESSAYS)   */}
          {/* ───────────────────────────────────────────── */}
          {activeTab === "writing" && (
            <div className="space-y-8">
              {exam.writingTasks.map((task) => {
                const text = writingSubmissions[task.id] || "";
                const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
                const meetsMin = wordCount >= task.minimumWords;

                return (
                  <div
                    key={task.id}
                    className="bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-6 space-y-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3">
                      <div>
                        <span className="font-display text-xs font-bold uppercase text-[var(--color-primary)]">
                          Task {task.taskNumber} · Suggested Time: {task.suggestedDuration} mins
                        </span>
                        <h2 className="font-display text-lg font-extrabold text-[var(--color-text-primary)]">
                          {task.title}
                        </h2>
                      </div>
                      <Badge variant={meetsMin ? "success" : "warning"}>
                        {wordCount} / {task.minimumWords} words minimum
                      </Badge>
                    </div>

                    <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 text-xs font-body text-[var(--color-text-primary)] whitespace-pre-line leading-relaxed">
                      {task.instructions}
                    </div>

                    {/* SVG Visual Data Chart for IELTS Academic Task 1 */}
                    {task.visualData && task.visualData.type === "line-chart" && (
                      <div className="bg-white dark:bg-slate-900 border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-5 space-y-4">
                        <div className="text-center space-y-1">
                          <h4 className="font-display text-sm font-bold text-slate-800 dark:text-slate-100">
                            {task.visualData.title}
                          </h4>
                          <p className="font-body text-xs text-slate-500">
                            {task.visualData.description}
                          </p>
                        </div>

                        {/* Interactive SVG Line Graph */}
                        <div className="w-full flex justify-center overflow-x-auto py-2">
                          <svg viewBox="0 0 540 220" className="w-full max-w-[540px] h-auto overflow-visible">
                            {/* Grid Lines & Y Axis Labels */}
                            {[0, 20, 40, 60].map((val) => {
                              const y = 180 - (val / 60) * 150;
                              return (
                                <g key={val}>
                                  <line x1="50" y1={y} x2="500" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                                  <text x="40" y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8">
                                    {val}%
                                  </text>
                                </g>
                              );
                            })}

                            {/* X Axis Years */}
                            {["2010", "2014", "2018", "2021", "2024"].map((year, i) => {
                              const x = 70 + i * 100;
                              return (
                                <text key={year} x={x} y="200" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">
                                  {year}
                                </text>
                              );
                            })}

                            {/* Series Lines and Circles */}
                            {task.visualData.series.map((s) => {
                              const points = s.values
                                .map((pt, i) => {
                                  const x = 70 + i * 100;
                                  const y = 180 - (pt.y / 60) * 150;
                                  return `${x},${y}`;
                                })
                                .join(" ");

                              return (
                                <g key={s.name}>
                                  <polyline
                                    fill="none"
                                    stroke={s.color}
                                    strokeWidth="3"
                                    points={points}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  {s.values.map((pt, i) => {
                                    const x = 70 + i * 100;
                                    const y = 180 - (pt.y / 60) * 150;
                                    return (
                                      <g key={i}>
                                        <circle cx={x} cy={y} r="4.5" fill="white" stroke={s.color} strokeWidth="2.5" />
                                        <text x={x} y={y - 8} textAnchor="middle" fontSize="9" fontWeight="bold" fill={s.color}>
                                          {pt.y}%
                                        </text>
                                      </g>
                                    );
                                  })}
                                </g>
                              );
                            })}
                          </svg>
                        </div>

                        {/* Chart Legend */}
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-display font-semibold">
                          {task.visualData.series.map((s) => (
                            <div key={s.name} className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                              <span className="text-slate-700 dark:text-slate-300">{s.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TOEFL Academic Discussion Prompt Layout */}
                    {task.discussionPrompt && (
                      <div className="bg-slate-50 dark:bg-slate-900/60 border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-5 space-y-4">
                        <div className="flex items-start gap-3 bg-white dark:bg-slate-800 p-4 rounded-[var(--radius-md)] border border-slate-200 dark:border-slate-700">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                            JD
                          </div>
                          <div>
                            <h4 className="font-display text-xs font-bold text-[var(--color-text-primary)]">
                              {task.discussionPrompt.professor.name} · {task.discussionPrompt.professor.title}
                            </h4>
                            <p className="font-body text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                              {task.discussionPrompt.professor.prompt}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {task.discussionPrompt.students.map((st) => (
                            <div
                              key={st.name}
                              className="bg-white dark:bg-slate-800 p-3.5 rounded-[var(--radius-md)] border border-slate-200 dark:border-slate-700 text-xs space-y-1"
                            >
                              <div className="flex items-center gap-2 font-display font-bold text-[var(--color-text-primary)]">
                                <span>{st.avatar}</span>
                                <span>{st.name}</span>
                              </div>
                              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                                {st.response}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Live Writing Area */}
                    <div className="space-y-2">
                      <textarea
                        rows={10}
                        value={text}
                        onChange={(e) =>
                          setWritingSubmissions((prev) => ({ ...prev, [task.id]: e.target.value }))
                        }
                        placeholder="Type your response here following official guidelines..."
                        className="w-full bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] focus:border-[var(--color-primary)] rounded-[var(--radius-lg)] p-4 text-sm font-body text-[var(--color-text-primary)] outline-none transition-all leading-relaxed"
                      />

                      <div className="flex items-center justify-between text-xs font-body text-[var(--color-text-secondary)] px-1">
                        <span className={meetsMin ? "text-emerald-600 font-bold" : "text-amber-600 font-medium"}>
                          {meetsMin ? "✓ Minimum word count satisfied" : `${task.minimumWords - wordCount} more words required`}
                        </span>
                        <span>Standard formatting with clear paragraph breaks recommended</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Writing Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-default)]">
                <button
                  onClick={() => setActiveTab("reading")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-xs font-display font-bold"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Reading
                </button>

                <button
                  onClick={() => setActiveTab("speaking")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] bg-rose-600 text-white text-xs font-display font-bold hover:bg-rose-700"
                >
                  Proceed to Speaking Station <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────── */}
          {/* TAB 4: SPEAKING STATION                       */}
          {/* ───────────────────────────────────────────── */}
          {activeTab === "speaking" && (
            <div className="space-y-6">
              {/* Task Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {exam.speakingTasks.map((spk, idx) => (
                  <button
                    key={spk.id}
                    onClick={() => setActiveSpeakingIdx(idx)}
                    className={`px-3.5 py-1.5 rounded-[var(--radius-md)] text-xs font-display font-bold whitespace-nowrap transition-all ${
                      activeSpeakingIdx === idx
                        ? "bg-rose-600 text-white shadow-sm"
                        : "bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
                    }`}
                  >
                    {spk.title}
                  </button>
                ))}
              </div>

              {/* Cue Card & Interactive Speech Timer */}
              <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-6 space-y-6">
                <div>
                  <span className="font-display text-xs font-bold uppercase text-rose-600">
                    Interactive Speaking Station
                  </span>
                  <h2 className="font-display text-xl font-extrabold text-[var(--color-text-primary)] mt-1">
                    {currentSpeakingTask?.title}
                  </h2>
                  <p className="font-body text-xs text-[var(--color-text-secondary)] mt-1">
                    {currentSpeakingTask?.description}
                  </p>
                </div>

                {/* Prompt Card / Cue Card */}
                <div className="bg-amber-50/70 dark:bg-amber-950/20 border-2 border-amber-300/80 dark:border-amber-800 rounded-[var(--radius-lg)] p-5 space-y-3">
                  <h3 className="font-display text-sm font-bold text-amber-900 dark:text-amber-200">
                    Candidate Prompt Card:
                  </h3>
                  <ul className="space-y-2 text-xs font-body text-amber-950 dark:text-amber-100">
                    {currentSpeakingTask?.prompts.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold shrink-0">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  {currentSpeakingTask?.followUpQuestion && (
                    <div className="pt-2 border-t border-amber-200 dark:border-amber-800/60 text-xs font-body text-amber-900 dark:text-amber-200">
                      <strong>Examiner Follow-up:</strong> {currentSpeakingTask.followUpQuestion}
                    </div>
                  )}
                </div>

                {/* Interactive Preparation & Speaking Countdown Deck */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preparation Timer Box */}
                  <div className="bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 space-y-3 text-center">
                    <span className="font-display text-xs font-bold text-[var(--color-text-secondary)]">
                      1. Preparation Time ({currentSpeakingTask?.preparationTimeSeconds}s)
                    </span>
                    <div className="font-mono text-3xl font-extrabold text-[var(--color-text-primary)]">
                      {prepSecondsRemaining !== null ? `${prepSecondsRemaining}s` : `${currentSpeakingTask?.preparationTimeSeconds}s`}
                    </div>
                    <button
                      onClick={() => startPreparation(currentSpeakingTask?.preparationTimeSeconds || 60)}
                      className="px-4 py-2 rounded-[var(--radius-md)] bg-blue-600 text-white font-display text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
                    >
                      Start Prep Timer
                    </button>
                  </div>

                  {/* Speaking Timer Box */}
                  <div className="bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 space-y-3 text-center">
                    <span className="font-display text-xs font-bold text-[var(--color-text-secondary)]">
                      2. Response Recording ({currentSpeakingTask?.speakingTimeSeconds}s)
                    </span>
                    <div className="font-mono text-3xl font-extrabold text-rose-600">
                      {speakingSecondsRemaining !== null ? `${speakingSecondsRemaining}s` : `${currentSpeakingTask?.speakingTimeSeconds}s`}
                    </div>
                    <button
                      onClick={() => startRecording(currentSpeakingTask?.speakingTimeSeconds || 120)}
                      className={`px-4 py-2 rounded-[var(--radius-md)] text-white font-display text-xs font-bold transition-all shadow-xs ${
                        isRecording ? "bg-red-700 animate-pulse" : "bg-rose-600 hover:bg-rose-700"
                      }`}
                    >
                      {isRecording ? "● Recording Response..." : "Simulate Speaking Turn"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Finish Exam Button */}
              <div className="pt-4 text-center">
                <button
                  onClick={handleFinishExam}
                  className="px-8 py-3 rounded-[var(--radius-md)] bg-emerald-600 hover:bg-emerald-700 text-white font-display font-extrabold text-sm transition-all shadow-md"
                >
                  Complete Mock Exam & Calculate Official Band Score
                </button>
              </div>
            </div>
          )}
        </div>
      </PageWrapper>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER: Official Results & Diagnostics Dashboard
  // ─────────────────────────────────────────────────────────────
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto space-y-8 py-4">
        {/* Scorecard Hero Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[var(--radius-lg)] p-8 text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #065f46 0%, #064e3b 50%, #0f172a 100%)",
            boxShadow: "0 10px 30px rgba(6, 95, 70, 0.3)",
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-pill)] bg-white/10 text-xs font-display font-bold tracking-wider uppercase text-emerald-200">
                <Trophy className="w-3.5 h-3.5" /> Official Diagnostic Report
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold">
                {exam.title} Results
              </h1>
              <p className="text-emerald-100 text-sm max-w-xl">
                Scores calibrated against official Cambridge Assessment & ETS psychometric conversion algorithms.
              </p>
            </div>

            {/* Main Score Badge */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[var(--radius-lg)] p-6 text-center min-w-[200px]">
              {results.type === "ielts" ? (
                <>
                  <div className="text-xs uppercase font-display font-bold tracking-widest text-emerald-200">
                    Overall IELTS Band
                  </div>
                  <div className="font-display text-5xl font-black text-white my-1">
                    {results.overallBand.toFixed(1)}
                  </div>
                  <div className="text-xs font-bold text-emerald-200">
                    CEFR Level: {results.cefr} ({results.label})
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs uppercase font-display font-bold tracking-widest text-purple-200">
                    TOEFL 2026 Band
                  </div>
                  <div className="font-display text-5xl font-black text-white my-1">
                    {results.band.toFixed(1)}
                  </div>
                  <div className="text-xs font-bold text-purple-200">
                    Concordant 0–120 Score: {results.concordance} ({results.cefr})
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* 4-Skill Band Performance Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center space-y-1 border-t-4 border-t-blue-500">
            <Headphones className="w-5 h-5 mx-auto text-blue-500" />
            <div className="text-xs font-display font-bold text-[var(--color-text-secondary)]">
              Listening
            </div>
            <div className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">
              {results.type === "ielts" ? results.listeningBand.toFixed(1) : results.listeningBand.toFixed(1)}
            </div>
            <div className="text-[11px] text-[var(--color-text-disabled)] font-body">
              {results.listeningCorrect} / {results.listeningTotal} raw items
            </div>
          </Card>

          <Card className="p-4 text-center space-y-1 border-t-4 border-t-emerald-500">
            <BookOpen className="w-5 h-5 mx-auto text-emerald-500" />
            <div className="text-xs font-display font-bold text-[var(--color-text-secondary)]">
              Reading
            </div>
            <div className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">
              {results.type === "ielts" ? results.readingBand.toFixed(1) : results.readingBand.toFixed(1)}
            </div>
            <div className="text-[11px] text-[var(--color-text-disabled)] font-body">
              {results.readingCorrect} / {results.readingTotal} raw items
            </div>
          </Card>

          <Card className="p-4 text-center space-y-1 border-t-4 border-t-purple-500">
            <PenTool className="w-5 h-5 mx-auto text-purple-500" />
            <div className="text-xs font-display font-bold text-[var(--color-text-secondary)]">
              Writing
            </div>
            <div className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">
              {results.type === "ielts" ? results.writingBand.toFixed(1) : results.writingBand.toFixed(1)}
            </div>
            <div className="text-[11px] text-[var(--color-text-disabled)] font-body">
              {Object.keys(writingSubmissions).length} tasks completed
            </div>
          </Card>

          <Card className="p-4 text-center space-y-1 border-t-4 border-t-rose-500">
            <Mic className="w-5 h-5 mx-auto text-rose-500" />
            <div className="text-xs font-display font-bold text-[var(--color-text-secondary)]">
              Speaking
            </div>
            <div className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">
              {results.type === "ielts" ? results.speakingBand.toFixed(1) : results.speakingBand.toFixed(1)}
            </div>
            <div className="text-[11px] text-[var(--color-text-disabled)] font-body">
              Interview timed
            </div>
          </Card>
        </div>

        {/* CEFR Diagnostic Summary Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-5 space-y-2">
          <h3 className="font-display text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <Award className="w-4 h-4 text-[var(--color-primary)]" />
            Proficiency Level Analysis (CEFR {results.cefr})
          </h3>
          <p className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {results.summary}
          </p>
        </div>

        {/* Review Mode Navigation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border-default)] pb-2">
            <h2 className="font-display text-base font-bold text-[var(--color-text-primary)]">
              Comprehensive Answer Key & Model Analysis
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-display font-bold">
              <button
                onClick={() => setReviewTab("overview")}
                className={`px-3 py-1 rounded-[var(--radius-md)] ${reviewTab === "overview" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)]"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setReviewTab("listening")}
                className={`px-3 py-1 rounded-[var(--radius-md)] ${reviewTab === "listening" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)]"}`}
              >
                Listening Scripts
              </button>
              <button
                onClick={() => setReviewTab("reading")}
                className={`px-3 py-1 rounded-[var(--radius-md)] ${reviewTab === "reading" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)]"}`}
              >
                Reading Answers
              </button>
              <button
                onClick={() => setReviewTab("writing")}
                className={`px-3 py-1 rounded-[var(--radius-md)] ${reviewTab === "writing" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)]"}`}
              >
                Writing Model Band 9.0
              </button>
              <button
                onClick={() => setReviewTab("speaking")}
                className={`px-3 py-1 rounded-[var(--radius-md)] ${reviewTab === "speaking" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)]"}`}
              >
                Speaking Transcripts
              </button>
            </div>
          </div>

          {/* Review Content Panes */}
          {reviewTab === "listening" && (
            <div className="space-y-6">
              {exam.listeningSections.map((sec) => (
                <div
                  key={sec.id}
                  className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-5 space-y-4"
                >
                  <h3 className="font-display text-sm font-bold text-[var(--color-text-primary)]">
                    {sec.title} — Official Audio Transcript
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-[var(--radius-md)] font-body text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic border border-slate-200 dark:border-slate-800">
                    &ldquo;{sec.audioScript}&rdquo;
                  </div>

                  <div className="space-y-2 pt-2">
                    {sec.questions.map((q) => {
                      const userAns = answers[q.id] || "No answer provided";
                      const isCorrect = Array.isArray(q.correctAnswer)
                        ? q.correctAnswer.some((ans) => ans.toLowerCase().trim() === userAns.toLowerCase().trim())
                        : userAns.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();

                      return (
                        <div
                          key={q.id}
                          className="flex items-start gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] text-xs font-body"
                        >
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          )}
                          <div className="space-y-1">
                            <p className="font-semibold text-[var(--color-text-primary)]">{q.prompt}</p>
                            <p className="text-[var(--color-text-secondary)]">
                              Your answer: <span className={isCorrect ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>{userAns}</span> · Correct: <span className="font-bold text-emerald-600">{Array.isArray(q.correctAnswer) ? q.correctAnswer.join(" / ") : q.correctAnswer}</span>
                            </p>
                            <p className="text-[11px] text-[var(--color-text-disabled)]">{q.explanation}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {reviewTab === "reading" && (
            <div className="space-y-3">
              {results.readingResults.map(({ q, user, correct }) => (
                <div
                  key={q.id}
                  className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-md)] p-4 text-xs font-body space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--color-text-primary)]">{q.prompt}</span>
                    {correct ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="text-rose-600 font-bold flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--color-text-secondary)]">
                    Your answer: <span className={correct ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>{user || "No answer"}</span> · Correct answer: <span className="text-emerald-600 font-bold">{Array.isArray(q.correctAnswer) ? q.correctAnswer.join(" / ") : q.correctAnswer}</span>
                  </p>
                  <p className="text-[11px] text-[var(--color-text-disabled)]">{q.explanation}</p>
                </div>
              ))}
            </div>
          )}

          {reviewTab === "writing" && (
            <div className="space-y-6">
              {exam.writingTasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-bold text-[var(--color-text-primary)]">
                      {t.title}
                    </h3>
                    <Badge variant="default">{t.modelAnswer.band}</Badge>
                  </div>

                  {/* Candidate Submission Review */}
                  <div className="space-y-1">
                    <span className="text-xs font-display font-bold text-[var(--color-text-secondary)]">
                      Your Submitted Response ({writingSubmissions[t.id]?.trim().split(/\s+/).filter(Boolean).length || 0} words):
                    </span>
                    <div className="bg-[var(--color-surface-alt)] p-3.5 rounded-[var(--radius-md)] text-xs font-body text-[var(--color-text-primary)] whitespace-pre-line leading-relaxed border border-[var(--color-border-subtle)]">
                      {writingSubmissions[t.id] || "No response entered."}
                    </div>
                  </div>

                  {/* Band 9 Model Answer */}
                  <div className="space-y-1">
                    <span className="text-xs font-display font-bold text-emerald-600">
                      Official Band 9.0 Benchmark Model Essay:
                    </span>
                    <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 p-4 rounded-[var(--radius-md)] text-xs font-body text-emerald-950 dark:text-emerald-100 whitespace-pre-line leading-relaxed">
                      {t.modelAnswer.text}
                    </div>
                  </div>

                  {/* Rubric Breakdown */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-[var(--radius-md)] border border-slate-200 dark:border-slate-800 text-xs font-body text-[var(--color-text-secondary)]">
                    <strong>Examiner Rubric Critique:</strong> {t.modelAnswer.analysis}
                  </div>
                </div>
              ))}
            </div>
          )}

          {reviewTab === "speaking" && (
            <div className="space-y-4">
              {exam.speakingTasks.map((s) => (
                <div
                  key={s.id}
                  className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-bold text-[var(--color-text-primary)]">
                      {s.title}
                    </h3>
                    <Badge variant="info">{s.modelResponse.band}</Badge>
                  </div>

                  <div className="bg-blue-50/60 dark:bg-blue-950/20 p-4 rounded-[var(--radius-md)] border border-blue-200 dark:border-blue-900/60 text-xs font-body text-blue-950 dark:text-blue-100 leading-relaxed italic">
                    &ldquo;{s.modelResponse.transcript}&rdquo;
                  </div>

                  <p className="text-xs font-body text-[var(--color-text-secondary)]">
                    <strong>Examiner Note:</strong> {s.modelResponse.examinerComment}
                  </p>
                </div>
              ))}
            </div>
          )}

          {reviewTab === "overview" && (
            <div className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-6 space-y-4 text-center">
              <h3 className="font-display text-base font-bold text-[var(--color-text-primary)]">
                Next Steps for Your English Language Journey
              </h3>
              <p className="text-xs font-body text-[var(--color-text-secondary)] max-w-lg mx-auto">
                Review your weak areas in the Listening and Reading sections above, practice the Band 9 model writing
                structures, and retake the simulation to track your band progression.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setStarted(false)}
                  className="px-5 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white text-xs font-display font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm"
                >
                  Return to Exam Center
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default function MockExamPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-display font-bold text-[var(--color-text-secondary)]">Loading Mock Exam...</p>
        </div>
      </div>
    }>
      <MockExamContent />
    </Suspense>
  );
}
