import { useEffect, useRef, useState } from "react";
import { COURSES } from "../data/courses";
import type { AppState, SubtopicStep, ActiveQuiz } from "../types/lms";
import PDFViewer from "../components/PDFViewer";
import { pickBestVoice, makeUtterance, withVoice } from "../utils/voiceover";

interface Props {
  state: AppState;
  moduleId: string;
  subtopicId: string;
  onSetStep: (step: SubtopicStep) => void;
  onMarkContent: (id: string) => void;
  onMarkPractical: (id: string) => void;
  onMarkSubtopicPassed: (subtopicId: string, score: number, moduleId: string) => void;
  onStartQuiz: (subtopicId: string) => ActiveQuiz;
  onAnswerQ: (idx: number) => void;
  onTickTimer: () => void;
  onResetAttempts: (id: string) => void;
  onOpenSubtopic: (moduleId: string, subtopicId: string) => void;
  onOpenModule: (moduleId: string) => void;
  onNavigate: (view: string) => void;
}

function VideoFrame({ url }: { url: string }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ paddingTop: "56.25%" }}>
      <iframe
        src={url}
        className="absolute inset-0 w-full h-full"
        allowFullScreen
        allow="autoplay; encrypted-media"
        title="Video"
      ></iframe>
    </div>
  );
}


const STEPS = [
  { key: 0, label: "Slides", icon: "fa-tv" },
  { key: 1, label: "Content", icon: "fa-book" },
  { key: 2, label: "Practical", icon: "fa-hands" },
  { key: 3, label: "Quiz", icon: "fa-question-circle" },
];

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function SubtopicView({
  state, moduleId, subtopicId,
  onSetStep, onMarkContent, onMarkPractical,
  onMarkSubtopicPassed, onStartQuiz, onAnswerQ,
  onTickTimer, onResetAttempts, onOpenSubtopic, onOpenModule, onNavigate
}: Props) {
  const course = COURSES["rising-stars"];
  const module = course.modules.find(m => m.id === moduleId);
  const subtopic = module?.subtopics.find(s => s.id === subtopicId);

  const { currentSubtopicStep: step, completed, quiz: quizState } = state;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [voiceoverPlaying, setVoiceoverPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [quizResult, setQuizResult] = useState<{
    score: number; passed: boolean; outOfAttempts: boolean; timedOut: boolean;
    correctCount: number; total: number; passMark: number; attemptNumber: number;
  } | null>(null);
  const [pendingAnswer, setPendingAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!module || !subtopic) return null;

  const isSubtopicDone = !!completed.subtopics[subtopicId];

  function getStepUnlocked(s: number): boolean {
    if (s === 0) return true;
    if (s === 1) return true;
    if (s === 2) return !!completed.content[subtopicId];
    if (s === 3) return !!completed.practical[subtopicId] || (!subtopic!.practical.video && !subtopic!.practical.videos?.length);
    return false;
  }

  // Timer for quiz
  useEffect(() => {
    if (step === 3 && quizState.active && !quizResult) {
      timerRef.current = setInterval(() => {
        onTickTimer();
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, !!quizState.active, !!quizResult]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (quizState.timeLeft === 0 && quizState.active && step === 3 && !quizResult) {
      handleSubmitQuiz(true);
    }
  }, [quizState.timeLeft]);

  function handleStartQuiz() {
    setQuizResult(null);
    setPendingAnswer(null);
    setShowFeedback(false);
    onStartQuiz(subtopicId);
    if (step !== 3) onSetStep(3);
  }

  function handleAnswer(idx: number) {
    if (pendingAnswer !== null) return;
    setPendingAnswer(idx);
    onAnswerQ(idx);
    setTimeout(() => {
      const q = quizState.active!;
      const nextQ = q.currentQ + 1;
      if (nextQ >= q.questions.length) {
        handleSubmitQuiz(false);
      } else {
        setPendingAnswer(null);
      }
    }, 500);
  }

  function handleSubmitQuiz(timedOut: boolean) {
    if (timerRef.current) clearInterval(timerRef.current);
    const q = quizState.active;
    if (!q) return;
    const correctCount = q.answers.filter(a => a.correct).length;
    const score = Math.round((correctCount / q.questions.length) * 100);
    const passed = score >= q.passMark;
    const outOfAttempts = !passed && q.attemptNumber >= 3;

    if (passed) {
      onMarkSubtopicPassed(subtopicId, score, moduleId);
    }
    if (outOfAttempts) {
      onResetAttempts(subtopicId);
    }

    setQuizResult({ score, passed, outOfAttempts, timedOut, correctCount, total: q.questions.length, passMark: q.passMark, attemptNumber: q.attemptNumber });

    if (passed && typeof window !== "undefined" && (window as any).confetti) {
      (window as any).confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  }

  function handleAfterPass() {
    const currentIdx = module!.subtopics.findIndex(s => s.id === subtopicId);
    if (currentIdx < module!.subtopics.length - 1) {
      onOpenSubtopic(moduleId, module!.subtopics[currentIdx + 1].id);
    } else {
      onOpenModule(moduleId);
    }
  }

  function handleRestartSubtopic() {
    setQuizResult(null);
    setPendingAnswer(null);
    onSetStep(0);
  }

  // Voiceover using Web Speech API (shared utility)
  function toggleVoiceover() {
    if (!window.speechSynthesis) return;
    if (voiceoverPlaying) {
      window.speechSynthesis.cancel();
      setVoiceoverPlaying(false);
      setActiveSection(0);
    } else {
      setVoiceoverPlaying(true);
      speakSections(0);
    }
  }

  function speakSections(idx: number) {
    const sections = subtopic!.content.sections;
    if (idx >= sections.length) {
      setVoiceoverPlaying(false);
      setActiveSection(0);
      return;
    }
    setActiveSection(idx);

    withVoice(subtopic!.category, (voice) => {
      const utter = makeUtterance(sections[idx].audioText, subtopic!.category, voice);
      utter.onend = () => {
        setTimeout(() => speakSections(idx + 1), 350);
      };
      utter.onerror = (e) => {
        if ((e as SpeechSynthesisErrorEvent).error !== "interrupted" &&
            (e as SpeechSynthesisErrorEvent).error !== "canceled") {
          speakSections(idx + 1);
        }
      };
      window.speechSynthesis.speak(utter);
    });
  }


  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [subtopicId, step]);

  const currentQ = quizState.active ? quizState.active.questions[quizState.active.currentQ] : null;
  const timerPct = quizState.active ? quizState.timeLeft / quizState.active.timeLimit : 1;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-4 flex-wrap">
        <button onClick={() => onNavigate("dashboard")} className="text-griffin-600 hover:text-griffin-700">Dashboard</button>
        <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
        <button onClick={() => onOpenModule(moduleId)} className="text-griffin-600 hover:text-griffin-700">{module.title}</button>
        <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{subtopic.title}</span>
      </div>

      {/* Title */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${subtopic.category === "culture" ? "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400" : "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"}`}>
              <i className={`fas ${subtopic.icon} mr-1 text-[10px]`}></i>
              {subtopic.category}
            </span>
            {isSubtopicDone && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-medium">
                <i className="fas fa-check mr-1 text-[10px]"></i>Complete
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">{subtopic.title}</h1>
        </div>
      </div>

      {/* Step navigator */}
      <div className="flex items-center gap-1 mb-6 bg-gray-50 dark:bg-gray-800 rounded-2xl p-1">
        {STEPS.map((s) => {
          const unlocked = getStepUnlocked(s.key);
          const isActive = step === s.key;
          const isDone = s.key === 0 ? true :
            s.key === 1 ? !!completed.content[subtopicId] :
            s.key === 2 ? !!completed.practical[subtopicId] :
            isSubtopicDone;

          return (
            <button
              key={s.key}
              onClick={() => unlocked && onSetStep(s.key as SubtopicStep)}
              disabled={!unlocked}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium transition-all
                ${isActive ? "bg-white dark:bg-gray-900 shadow text-griffin-700 dark:text-griffin-400" :
                  !unlocked ? "text-gray-400 cursor-not-allowed" :
                  "text-gray-600 dark:text-gray-400 hover:text-griffin-600"}`}
            >
              <i className={`fas ${isDone && !isActive ? "fa-check text-green-500" : s.icon} text-xs`}></i>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Step 0: Presentation */}
      {step === 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <i className="fas fa-tv text-griffin-500"></i>
              Presentation
            </h3>
            <p className="text-sm text-gray-500 mt-1">Duration: {subtopic.presentation.duration}</p>
          </div>
          <div className="p-5 space-y-4">
            {/* Video section */}
            {subtopic.presentation.video && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <i className="fas fa-play-circle text-griffin-500"></i> Video Presentation
                </p>
                <VideoFrame url={subtopic.presentation.video} />
              </div>
            )}

            {/* PDF Slides section */}
            {subtopic.presentation.pdf ? (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <i className="fas fa-file-powerpoint text-griffin-500"></i> PDF Slide Deck
                </p>
                <PDFViewer url={subtopic.presentation.pdf} category={subtopic.category} />
              </div>
            ) : subtopic.presentation.pdf !== undefined ? (
              <div className="bg-amber-50 dark:bg-amber-900/10 border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-file-powerpoint text-4xl mb-3 text-amber-400"></i>
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">PDF Slide Deck — Coming Soon</p>
                  <p className="text-xs mt-1 text-amber-600 dark:text-amber-500">The presentation slides for this topic will appear here once uploaded.</p>
                </div>
              </div>
            ) : null}

            {/* If neither video nor PDF, show placeholder */}
            {!subtopic.presentation.video && subtopic.presentation.pdf === undefined && (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl aspect-video flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <i className="fas fa-film text-4xl mb-3"></i>
                  <p className="text-sm font-medium">Presentation coming soon</p>
                  <p className="text-xs mt-1">Proceed to the Content tab to read the material</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => onOpenModule(moduleId)}
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <i className="fas fa-arrow-left mr-1"></i> Back to Module
              </button>
              <button
                onClick={() => onSetStep(1)}
                className="px-5 py-2.5 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-medium transition-colors text-sm"
              >
                Go to Content <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Content */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <i className="fas fa-book-open text-griffin-500"></i>
                  Content
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">Estimated: {subtopic.content.estimatedDuration} min · {subtopic.content.sections.length} sections</p>
              </div>
              <button
                onClick={toggleVoiceover}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${voiceoverPlaying ? "bg-red-100 dark:bg-red-900/20 text-red-700 hover:bg-red-200" : "bg-griffin-100 dark:bg-griffin-900/20 text-griffin-700 hover:bg-griffin-200 dark:hover:bg-griffin-900/30"}`}
              >
                <i className={`fas ${voiceoverPlaying ? "fa-stop" : "fa-play"} text-xs`}></i>
                <span className="hidden sm:inline">{voiceoverPlaying ? "Stop Voiceover" : "Play Voiceover"}</span>
              </button>
            </div>

            <div className="p-5 space-y-5">
              {subtopic.content.sections.map((section, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-xl border-2 transition-all ${voiceoverPlaying && activeSection === i ? "border-griffin-400 bg-griffin-50 dark:bg-griffin-900/10" : "border-transparent bg-gray-50 dark:bg-gray-800"}`}
                >
                  <h4 className={`font-bold mb-2 ${voiceoverPlaying && activeSection === i ? "text-griffin-700 dark:text-griffin-400" : "text-gray-900 dark:text-white"}`}>
                    {section.heading}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{section.text}</p>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <button
                onClick={() => onSetStep(0)}
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
              >
                <i className="fas fa-arrow-left text-xs"></i> Back to Slides
              </button>
              <button
                onClick={() => {
                  if (window.speechSynthesis) window.speechSynthesis.cancel();
                  setVoiceoverPlaying(false);
                  onMarkContent(subtopicId);
                  onSetStep(2);
                }}
                className="px-5 py-2.5 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-medium transition-colors text-sm"
              >
                Content Complete <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Practical */}
      {step === 2 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <i className="fas fa-hands text-blue-500"></i>
              Practical Demonstration
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {(subtopic.practical.video || subtopic.practical.videos?.length)
                ? `Duration: ${subtopic.practical.duration} · Watch before taking the quiz.`
                : "Read through the content above, then take the quiz."}
            </p>
          </div>
          <div className="p-5">
            {subtopic.practical.videos && subtopic.practical.videos.length > 0 ? (
              <>
                {subtopic.practical.videos.map((url, idx) => (
                  <div key={url} className="mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <i className="fas fa-play-circle text-blue-500"></i>
                      {subtopic.practical.videos!.length > 1 ? `Part ${idx + 1}` : "Video"}
                    </p>
                    <VideoFrame url={url} />
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <button onClick={() => onSetStep(1)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <i className="fas fa-arrow-left text-xs"></i> Back to Content
                  </button>
                  <button
                    onClick={() => { onMarkPractical(subtopicId); handleStartQuiz(); }}
                    className="px-5 py-2.5 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-medium transition-colors text-sm"
                  >
                    Mark Watched &amp; Take Quiz <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </>
            ) : subtopic.practical.video ? (
              <>
                <VideoFrame url={subtopic.practical.video} />
                <div className="flex justify-between items-center">
                  <button onClick={() => onSetStep(1)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <i className="fas fa-arrow-left text-xs"></i> Back to Content
                  </button>
                  <button
                    onClick={() => { onMarkPractical(subtopicId); handleStartQuiz(); }}
                    className="px-5 py-2.5 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-medium transition-colors text-sm"
                  >
                    Mark Watched &amp; Take Quiz <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <i className="fas fa-info-circle mr-2"></i>
                    No practical video for this subtopic. Review the content, then take the quiz when ready.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <button onClick={() => onSetStep(1)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <i className="fas fa-arrow-left text-xs"></i> Back to Content
                  </button>
                  <button
                    onClick={() => { onMarkPractical(subtopicId); handleStartQuiz(); }}
                    className="px-5 py-2.5 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-medium transition-colors text-sm"
                  >
                    Take Quiz <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Quiz */}
      {step === 3 && (
        <>
          {/* Quiz result screen */}
          {quizResult && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className={`p-8 text-white text-center ${quizResult.passed ? "bg-gradient-to-r from-green-500 to-green-600" : quizResult.outOfAttempts ? "bg-gradient-to-r from-gray-700 to-gray-900" : "bg-gradient-to-r from-red-500 to-red-600"}`}>
                  <i className={`fas ${quizResult.passed ? "fa-trophy" : quizResult.outOfAttempts ? "fa-rotate-left" : "fa-times-circle"} text-6xl mb-3`}></i>
                  <h2 className="text-3xl font-bold font-display mb-1">
                    {quizResult.passed ? "Passed!" : quizResult.outOfAttempts ? "No Attempts Left" : quizResult.timedOut ? "Time Up" : "Not Quite"}
                  </h2>
                  <p className="text-xl opacity-90">{quizResult.score}% &mdash; {quizResult.correctCount}/{quizResult.total} correct</p>
                  {!quizResult.passed && <p className="mt-1 text-sm opacity-80">Required: {quizResult.passMark}% to advance</p>}
                </div>

                <div className="p-6">
                  {quizResult.passed ? (
                    <>
                      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Subtopic complete. The next subtopic is unlocked.</p>
                      <button
                        onClick={handleAfterPass}
                        className="w-full py-3 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-semibold transition-colors"
                      >
                        Continue <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    </>
                  ) : quizResult.outOfAttempts ? (
                    <>
                      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                        You've used all three quiz attempts for this subtopic. Restart from the presentation, work through the content and practical again, and your attempts will reset.
                      </p>
                      <button
                        onClick={handleRestartSubtopic}
                        className="w-full py-3 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-semibold transition-colors"
                      >
                        Restart Subtopic <i className="fas fa-rotate-left ml-2"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                        Review the presentation, content, and practical, then try again. You have {3 - quizResult.attemptNumber} attempt{(3 - quizResult.attemptNumber) !== 1 ? "s" : ""} remaining.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => onSetStep(1)}
                          className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                        >
                          Review Material
                        </button>
                        <button
                          onClick={() => { setQuizResult(null); handleStartQuiz(); }}
                          className="flex-1 py-3 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-semibold transition-colors text-sm"
                        >
                          Retake Quiz
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Active quiz */}
          {!quizResult && quizState.active && currentQ && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <i className="fas fa-question-circle text-purple-500"></i>
                    Question {quizState.active.currentQ + 1} of {quizState.active.questions.length}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Pass mark: {quizState.active.passMark}% &bull; Attempt {quizState.active.attemptNumber} of 3
                    {3 - quizState.active.attemptNumber > 0 && ` (${3 - quizState.active.attemptNumber} remaining after this)`}
                  </p>
                </div>

                {/* Timer */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-gray-200 dark:text-gray-700" />
                    <circle
                      cx="50" cy="50" r="45" fill="none"
                      stroke={quizState.timeLeft < 60 ? "#ef4444" : "#16a34a"}
                      strokeWidth="6"
                      strokeDasharray="283"
                      strokeDashoffset={`${283 * (1 - timerPct)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-sm font-bold font-mono ${quizState.timeLeft < 60 ? "text-red-500" : "text-gray-700 dark:text-gray-300"}`}>
                      {formatTime(quizState.timeLeft)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-6 leading-relaxed">
                  {currentQ.q}
                </p>
                <div className="space-y-2">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={pendingAnswer !== null}
                      className={`w-full p-4 text-left border-2 rounded-xl transition-all flex items-center gap-3 text-sm
                        ${pendingAnswer === idx
                          ? "border-griffin-500 bg-griffin-50 dark:bg-griffin-900/20"
                          : pendingAnswer !== null
                          ? "border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed"
                          : "border-gray-200 dark:border-gray-700 hover:border-griffin-300 hover:bg-griffin-50 dark:hover:bg-griffin-900/10 cursor-pointer"}`}
                    >
                      <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-semibold flex-shrink-0
                        ${pendingAnswer === idx ? "border-griffin-500 text-griffin-600" : "border-gray-300 dark:border-gray-600 text-gray-500"}`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-6 pb-4">
                <div className="flex gap-1">
                  {quizState.active.questions.map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full ${i < quizState.active!.currentQ ? "bg-griffin-500" : i === quizState.active!.currentQ ? "bg-griffin-300" : "bg-gray-200 dark:bg-gray-700"}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading state */}
          {!quizResult && !quizState.active && (
            <div className="text-center py-12 text-gray-500">
              <i className="fas fa-circle-notch fa-spin text-3xl text-griffin-500 mb-3"></i>
              <p>Loading quiz...</p>
              <button
                onClick={handleStartQuiz}
                className="mt-4 px-5 py-2.5 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-medium text-sm"
              >
                Start Quiz
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
