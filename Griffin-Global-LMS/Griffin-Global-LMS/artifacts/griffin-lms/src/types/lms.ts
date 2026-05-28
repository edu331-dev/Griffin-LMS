export interface ContentSection {
  heading: string;
  text: string;
  audioText: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Quiz {
  timeLimit: number;
  passMark: number;
  questions: QuizQuestion[];
  questionBanks?: QuizQuestion[][];
}

export interface Subtopic {
  id: string;
  title: string;
  category: "culture" | "technical";
  icon: string;
  presentation: {
    video?: string;
    pdf?: string;
    duration: string;
  };
  content: {
    sections: ContentSection[];
    estimatedDuration: number;
  };
  practical: {
    video: string;
    videos?: string[];
    duration: string;
  };
  quiz: Quiz;
}

export interface ModuleConclusion {
  id: string;
  title: string;
  description: string;
  video: string;
  duration: string;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  icon: string;
  introVideo: string;
  introDescription: string;
  subtopics: Subtopic[];
  conclusion: ModuleConclusion;
}

export interface IntroItem {
  id: string;
  type: string;
  title: string;
  description: string;
  video: string;
  duration: string;
  isExternalReference?: boolean;
}

export interface CourseConclusion {
  title: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    video: string;
    duration: string;
  }>;
  badge: {
    verificationBase: string;
  };
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  status: string;
  estimatedHours: number;
  introduction: {
    title: string;
    items: IntroItem[];
  };
  modules: Module[];
  conclusion: CourseConclusion;
}

export type SubtopicStep = 0 | 1 | 2 | 3;

export interface CompletedSubtopic {
  score: number;
  completedAt: number;
}

export interface AppState {
  loggedIn: boolean;
  user: {
    name: string;
    firstName: string;
    email: string;
    department: string;
    userId: string;
    avatar: string;
  };
  darkMode: boolean;
  sidebarOpen: boolean;
  currentView: string;
  currentModule: string | null;
  currentSubtopic: string | null;
  currentSubtopicStep: SubtopicStep;
  completed: {
    intro: Record<string, number>;
    moduleIntros: Record<string, number>;
    content: Record<string, number>;
    practical: Record<string, number>;
    subtopics: Record<string, CompletedSubtopic>;
    modules: Record<string, number>;
    conclusion: Record<string, number>;
  };
  quizAttempts: Record<string, number>;
  quiz: {
    active: ActiveQuiz | null;
    timeLeft: number;
  };
  aiHistory: Array<{ role: "user" | "bot"; text: string; ts: number }>;
  aiOpen: boolean;
  timeTracking: {
    sessionStart: number;
    totalSeconds: number;
  };
}

export interface ActiveQuiz {
  subtopicId: string;
  questions: QuizQuestion[];
  passMark: number;
  timeLimit: number;
  currentQ: number;
  answers: Array<{ qIdx: number; selected: number; correct: boolean }>;
  attemptNumber: number;
}
