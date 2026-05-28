import { useState, useEffect, useCallback } from "react";
import type { AppState, ActiveQuiz, SubtopicStep } from "../types/lms";
import { COURSES } from "../data/courses";

const STORAGE_KEY = "griffin_lms_state_v2";

function generateUserId(): string {
  return "GGT-" + Math.random().toString(36).substr(2, 8).toUpperCase();
}

function getInitialState(): AppState {
  return {
    loggedIn: false,
    user: { name: "", firstName: "", email: "", department: "", userId: "", avatar: "" },
    darkMode: false,
    sidebarOpen: true,
    currentView: "dashboard",
    currentModule: null,
    currentSubtopic: null,
    currentSubtopicStep: 0,
    completed: {
      intro: {},
      moduleIntros: {},
      content: {},
      practical: {},
      subtopics: {},
      modules: {},
      conclusion: {}
    },
    quizAttempts: {},
    quiz: { active: null, timeLeft: 0 },
    aiHistory: [],
    aiOpen: false,
    timeTracking: { sessionStart: Date.now(), totalSeconds: 0 }
  };
}

function loadFromStorage(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialState();
    const parsed = JSON.parse(raw);
    return {
      ...getInitialState(),
      ...parsed,
      quiz: { active: null, timeLeft: 0 },
      timeTracking: { sessionStart: Date.now(), totalSeconds: parsed.timeTracking?.totalSeconds ?? 0 }
    };
  } catch {
    return getInitialState();
  }
}

function saveToStorage(state: AppState) {
  try {
    const toSave = { ...state, quiz: { active: null, timeLeft: 0 } };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {}
}

export function useLMSStore() {
  const [state, setStateRaw] = useState<AppState>(loadFromStorage);

  const setState = useCallback((updater: (prev: AppState) => AppState) => {
    setStateRaw(prev => {
      const next = updater(prev);
      saveToStorage(next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.darkMode]);

  useEffect(() => {
    const handleUnload = () => {
      const sessionSeconds = Math.floor((Date.now() - state.timeTracking.sessionStart) / 1000);
      const updated = {
        ...state,
        timeTracking: {
          ...state.timeTracking,
          totalSeconds: state.timeTracking.totalSeconds + sessionSeconds
        }
      };
      saveToStorage(updated);
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [state]);

  const login = useCallback((firstName: string, surname: string, email: string) => {
    const name = `${firstName} ${surname}`;
    const avatar = (firstName[0] + surname[0]).toUpperCase();
    const userId = generateUserId();
    const dept = email.includes("griffinglobaltech.com") ? "Griffin Global Technologies" : "Professional Services";
    setState(prev => ({
      ...prev,
      loggedIn: true,
      user: { name, firstName, email, department: dept, userId, avatar }
    }));
  }, [setState]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setStateRaw(getInitialState());
  }, []);

  const navigate = useCallback((view: string) => {
    setState(prev => ({
      ...prev,
      currentView: view,
      currentModule: null,
      currentSubtopic: null,
      currentSubtopicStep: 0,
      quiz: { active: null, timeLeft: 0 }
    }));
  }, [setState]);

  const openModule = useCallback((moduleId: string) => {
    setState(prev => ({
      ...prev,
      currentView: "module",
      currentModule: moduleId,
      currentSubtopic: null,
      currentSubtopicStep: 0,
      quiz: { active: null, timeLeft: 0 }
    }));
  }, [setState]);

  const openSubtopic = useCallback((moduleId: string, subtopicId: string, step: SubtopicStep = 0) => {
    setState(prev => ({
      ...prev,
      currentView: "subtopic",
      currentModule: moduleId,
      currentSubtopic: subtopicId,
      currentSubtopicStep: step,
      quiz: { active: null, timeLeft: 0 }
    }));
  }, [setState]);

  const setSubtopicStep = useCallback((step: SubtopicStep) => {
    setState(prev => ({
      ...prev,
      currentSubtopicStep: step,
      quiz: step === 3 ? prev.quiz : { active: null, timeLeft: 0 }
    }));
  }, [setState]);

  const markIntroItemComplete = useCallback((itemId: string) => {
    setState(prev => ({
      ...prev,
      completed: { ...prev.completed, intro: { ...prev.completed.intro, [itemId]: Date.now() } }
    }));
  }, [setState]);

  const markModuleIntroWatched = useCallback((moduleId: string) => {
    setState(prev => ({
      ...prev,
      completed: { ...prev.completed, moduleIntros: { ...prev.completed.moduleIntros, [moduleId]: Date.now() } }
    }));
  }, [setState]);

  const markContentComplete = useCallback((subtopicId: string) => {
    setState(prev => ({
      ...prev,
      completed: { ...prev.completed, content: { ...prev.completed.content, [subtopicId]: Date.now() } }
    }));
  }, [setState]);

  const markPracticalComplete = useCallback((subtopicId: string) => {
    setState(prev => ({
      ...prev,
      completed: { ...prev.completed, practical: { ...prev.completed.practical, [subtopicId]: Date.now() } }
    }));
  }, [setState]);

  const checkAndMarkModuleComplete = useCallback((moduleId: string) => {
    const m = COURSES["rising-stars"].modules.find(x => x.id === moduleId);
    if (!m) return;
    setState(prev => {
      if (m.subtopics.every(s => prev.completed.subtopics[s.id]) && !prev.completed.modules[moduleId]) {
        return {
          ...prev,
          completed: { ...prev.completed, modules: { ...prev.completed.modules, [moduleId]: Date.now() } }
        };
      }
      return prev;
    });
  }, [setState]);

  const markSubtopicPassed = useCallback((subtopicId: string, score: number, moduleId: string) => {
    setState(prev => {
      const next: AppState = {
        ...prev,
        quizAttempts: { ...prev.quizAttempts, [subtopicId]: 0 },
        completed: {
          ...prev.completed,
          subtopics: { ...prev.completed.subtopics, [subtopicId]: { score, completedAt: Date.now() } }
        }
      };
      const m = COURSES["rising-stars"].modules.find(x => x.id === moduleId);
      if (m && m.subtopics.every(s => next.completed.subtopics[s.id]) && !next.completed.modules[moduleId]) {
        next.completed = { ...next.completed, modules: { ...next.completed.modules, [moduleId]: Date.now() } };
      }
      return next;
    });
  }, [setState]);

  const startQuizAttempt = useCallback((subtopicId: string): ActiveQuiz => {
    const course = COURSES["rising-stars"];
    let sub: import("../types/lms").Subtopic | undefined;
    for (const m of course.modules) {
      sub = m.subtopics.find(s => s.id === subtopicId);
      if (sub) break;
    }
    if (!sub) throw new Error("Subtopic not found");

    const prev = state.quizAttempts[subtopicId] || 0;
    const attemptNumber = prev + 1;

    let questions: import("../types/lms").QuizQuestion[];
    if (sub.quiz.questionBanks && sub.quiz.questionBanks.length > 0) {
      const bankIdx = (attemptNumber - 1) % sub.quiz.questionBanks.length;
      questions = [...sub.quiz.questionBanks[bankIdx]];
      if (attemptNumber > sub.quiz.questionBanks.length) {
        questions = questions.sort(() => Math.random() - 0.5).map(q => {
          const newOptions = [...q.options];
          const correctText = newOptions[q.correct];
          const shuffled = newOptions.sort(() => Math.random() - 0.5);
          return { ...q, options: shuffled, correct: shuffled.indexOf(correctText) };
        });
      }
    } else {
      questions = [...sub.quiz.questions];
      if (attemptNumber > 1) {
        questions = questions.sort(() => Math.random() - 0.5).map(q => {
          const newOptions = [...q.options];
          const correctText = newOptions[q.correct];
          const shuffled = newOptions.sort(() => Math.random() - 0.5);
          return { ...q, options: shuffled, correct: shuffled.indexOf(correctText) };
        });
      }
    }

    const activeQuiz: ActiveQuiz = {
      subtopicId,
      questions,
      passMark: sub.quiz.passMark,
      timeLimit: sub.quiz.timeLimit,
      currentQ: 0,
      answers: [],
      attemptNumber
    };

    setState(prev => ({
      ...prev,
      quizAttempts: { ...prev.quizAttempts, [subtopicId]: attemptNumber },
      quiz: { active: activeQuiz, timeLeft: sub!.quiz.timeLimit }
    }));

    return activeQuiz;
  }, [state.quizAttempts, setState]);

  const answerQuestion = useCallback((selectedIdx: number) => {
    setState(prev => {
      if (!prev.quiz.active) return prev;
      const q = prev.quiz.active;
      const current = q.questions[q.currentQ];
      const newAnswer = { qIdx: q.currentQ, selected: selectedIdx, correct: selectedIdx === current.correct };
      return {
        ...prev,
        quiz: {
          ...prev.quiz,
          active: {
            ...q,
            answers: [...q.answers, newAnswer],
            currentQ: q.currentQ + 1
          }
        }
      };
    });
  }, [setState]);

  const tickTimer = useCallback(() => {
    setState(prev => {
      if (!prev.quiz.active) return prev;
      return { ...prev, quiz: { ...prev.quiz, timeLeft: Math.max(0, prev.quiz.timeLeft - 1) } };
    });
  }, [setState]);

  const resetQuizAttempts = useCallback((subtopicId: string) => {
    setState(prev => ({
      ...prev,
      quizAttempts: { ...prev.quizAttempts, [subtopicId]: 0 },
      quiz: { active: null, timeLeft: 0 }
    }));
  }, [setState]);

  const markConclusionWatched = useCallback((itemId: string) => {
    setState(prev => ({
      ...prev,
      completed: { ...prev.completed, conclusion: { ...prev.completed.conclusion, [itemId]: Date.now() } }
    }));
  }, [setState]);

  const toggleDarkMode = useCallback(() => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  }, [setState]);

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, [setState]);

  const toggleAI = useCallback(() => {
    setState(prev => ({ ...prev, aiOpen: !prev.aiOpen }));
  }, [setState]);

  const addAIMessage = useCallback((role: "user" | "bot", text: string) => {
    setState(prev => ({
      ...prev,
      aiHistory: [...prev.aiHistory, { role, text, ts: Date.now() }]
    }));
  }, [setState]);

  const totalSubtopics = COURSES["rising-stars"].modules.reduce((a, m) => a + m.subtopics.length, 0);
  const completedSubtopics = Object.keys(state.completed.subtopics).length;
  const progressPct = Math.round((completedSubtopics / totalSubtopics) * 100);
  const totalHours = (state.timeTracking.totalSeconds / 3600).toFixed(1);

  return {
    state,
    login,
    logout,
    navigate,
    openModule,
    openSubtopic,
    setSubtopicStep,
    markIntroItemComplete,
    markModuleIntroWatched,
    markContentComplete,
    markPracticalComplete,
    markSubtopicPassed,
    startQuizAttempt,
    answerQuestion,
    tickTimer,
    resetQuizAttempts,
    markConclusionWatched,
    checkAndMarkModuleComplete,
    toggleDarkMode,
    toggleSidebar,
    toggleAI,
    addAIMessage,
    progressPct,
    completedSubtopics,
    totalSubtopics,
    totalHours
  };
}
