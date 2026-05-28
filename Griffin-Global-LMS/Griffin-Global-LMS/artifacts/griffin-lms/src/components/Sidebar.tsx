import { COURSES } from "../data/courses";
import type { AppState } from "../types/lms";

interface Props {
  state: AppState;
  onNavigate: (view: string) => void;
  onOpenModule: (moduleId: string) => void;
  onOpenSubtopic: (moduleId: string, subtopicId: string) => void;
  progressPct: number;
  completedSubtopics: number;
  totalSubtopics: number;
}

const STEP_LABELS = ["Slides", "Content", "Practical", "Quiz"];
const STEP_ICONS = ["fa-tv", "fa-book", "fa-hands", "fa-question-circle"];

export default function Sidebar({ state, onNavigate, onOpenModule, onOpenSubtopic, progressPct, completedSubtopics, totalSubtopics }: Props) {
  const course = COURSES["rising-stars"];
  const { currentView, currentModule, currentSubtopic, completed } = state;

  const isIntroComplete = course.introduction.items.every(i => completed.intro[i.id]);

  function isModuleLocked(moduleIdx: number): boolean {
    if (moduleIdx === 0) return !isIntroComplete;
    const prevModule = course.modules[moduleIdx - 1];
    return !completed.modules[prevModule.id];
  }

  function isSubtopicLocked(moduleIdx: number, subtopicIdx: number): boolean {
    if (isModuleLocked(moduleIdx)) return true;
    if (subtopicIdx === 0) return false;
    const prevSub = course.modules[moduleIdx].subtopics[subtopicIdx - 1];
    return !completed.subtopics[prevSub.id];
  }

  function getStepProgress(subtopicId: string): number {
    if (completed.subtopics[subtopicId]) return 4;
    if (completed.practical[subtopicId]) return 3;
    if (completed.content[subtopicId]) return 2;
    return 0;
  }

  const conclusionUnlocked = course.modules.every(m => completed.modules[m.id]);

  return (
    <aside className={`
      flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
      flex flex-col transition-all duration-300 overflow-hidden
      ${state.sidebarOpen ? "w-72" : "w-0"}
    `}>
      <div className="flex flex-col h-full min-w-72 overflow-y-auto">
        {/* Progress bar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span className="font-medium">Programme Progress</span>
            <span className="font-bold text-griffin-600">{progressPct}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
            <div className="bg-griffin-500 h-1.5 rounded-full transition-all duration-700" style={{ width: `${progressPct}%` }}></div>
          </div>
          <p className="text-xs text-gray-400">
            {progressPct === 0 ? "Begin your journey" : progressPct === 100 ? "Programme complete" : `${completedSubtopics} of ${totalSubtopics} subtopics`}
          </p>
        </div>

        <nav className="flex-1 py-2 px-2">
          {/* Dashboard */}
          <button
            onClick={() => onNavigate("dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-colors
              ${currentView === "dashboard" ? "bg-griffin-50 dark:bg-griffin-900/20 text-griffin-700 dark:text-griffin-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <i className="fas fa-home w-4 text-center text-xs"></i>
            Dashboard
          </button>

          {/* Introduction */}
          <button
            onClick={() => onNavigate("introduction")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-colors
              ${currentView === "introduction" ? "bg-griffin-50 dark:bg-griffin-900/20 text-griffin-700 dark:text-griffin-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <i className="fas fa-play-circle w-4 text-center text-xs"></i>
            <span className="flex-1 text-left">Introduction</span>
            {isIntroComplete && <i className="fas fa-check-circle text-green-500 text-xs"></i>}
          </button>

          {/* Separator */}
          <div className="px-3 py-1 mb-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Modules</p>
          </div>

          {/* Modules */}
          {course.modules.map((module, mIdx) => {
            const locked = isModuleLocked(mIdx);
            const modComplete = !!completed.modules[module.id];
            const isActive = currentModule === module.id;

            return (
              <div key={module.id} className="mb-1">
                <button
                  onClick={() => !locked && onOpenModule(module.id)}
                  disabled={locked}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                    ${locked ? "opacity-40 cursor-not-allowed text-gray-500 dark:text-gray-600" :
                      isActive && currentView === "module" ? "bg-griffin-50 dark:bg-griffin-900/20 text-griffin-700 dark:text-griffin-400" :
                      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                  <i className={`fas ${module.icon} w-4 text-center text-xs ${locked ? "text-gray-400" : modComplete ? "text-griffin-500" : "text-gray-500"}`}></i>
                  <span className="flex-1 text-left text-xs leading-tight">M{module.number}: {module.title}</span>
                  {locked && <i className="fas fa-lock text-gray-400 text-[10px]"></i>}
                  {modComplete && !locked && <i className="fas fa-check-circle text-green-500 text-[10px]"></i>}
                </button>

                {/* Subtopics */}
                {isActive && !locked && (
                  <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-griffin-100 dark:border-griffin-900/30 pl-3">
                    {module.subtopics.map((sub, sIdx) => {
                      const subLocked = isSubtopicLocked(mIdx, sIdx);
                      const subComplete = !!completed.subtopics[sub.id];
                      const isCurrent = currentSubtopic === sub.id;
                      const stepProg = getStepProgress(sub.id);

                      return (
                        <div key={sub.id}>
                          <button
                            onClick={() => !subLocked && onOpenSubtopic(module.id, sub.id)}
                            disabled={subLocked}
                            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors
                              ${subLocked ? "opacity-40 cursor-not-allowed" :
                                isCurrent ? "bg-griffin-100 dark:bg-griffin-900/30 text-griffin-700 dark:text-griffin-300 font-medium" :
                                "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                          >
                            <i className={`fas ${sub.icon} w-3 text-center text-[10px] ${subComplete ? "text-green-500" : "text-gray-400"}`}></i>
                            <span className="flex-1 text-left leading-tight">{sub.title}</span>
                            {subLocked && <i className="fas fa-lock text-gray-400 text-[10px]"></i>}
                            {subComplete && <i className="fas fa-check text-green-500 text-[10px]"></i>}
                          </button>
                          {/* Mini step progress */}
                          {isCurrent && !subComplete && (
                            <div className="flex gap-0.5 px-2 pb-1">
                              {STEP_LABELS.map((label, i) => (
                                <div
                                  key={i}
                                  title={label}
                                  className={`flex-1 h-1 rounded-full transition-colors ${i < stepProg ? "bg-griffin-500" : i === state.currentSubtopicStep ? "bg-griffin-300" : "bg-gray-200 dark:bg-gray-700"}`}
                                ></div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Conclusion */}
          <div className="mt-1">
            <button
              onClick={() => conclusionUnlocked && onNavigate("conclusion")}
              disabled={!conclusionUnlocked}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${!conclusionUnlocked ? "opacity-40 cursor-not-allowed text-gray-500" :
                  currentView === "conclusion" ? "bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400" :
                  "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              <i className={`fas fa-medal w-4 text-center text-xs ${conclusionUnlocked ? "text-gold-500" : "text-gray-400"}`}></i>
              <span className="flex-1 text-left">Conclusion & Badge</span>
              {!conclusionUnlocked && <i className="fas fa-lock text-gray-400 text-[10px]"></i>}
              {completed.conclusion["conclusion-video"] && <i className="fas fa-check-circle text-green-500 text-xs"></i>}
            </button>
          </div>
        </nav>

        {/* Bottom links */}
        <div className="border-t border-gray-100 dark:border-gray-800 p-2">
          <button
            onClick={() => onNavigate("profile")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors
              ${currentView === "profile" ? "bg-griffin-50 dark:bg-griffin-900/20 text-griffin-700" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <i className="fas fa-user w-4 text-center text-xs"></i>
            Profile
          </button>
          <button
            onClick={() => onNavigate("certificates")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors
              ${currentView === "certificates" ? "bg-griffin-50 dark:bg-griffin-900/20 text-griffin-700" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <i className="fas fa-certificate w-4 text-center text-xs"></i>
            Certificates
          </button>
        </div>
      </div>
    </aside>
  );
}
