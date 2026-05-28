import { COURSES } from "../data/courses";
import type { AppState } from "../types/lms";

interface Props {
  state: AppState;
  onNavigate: (view: string) => void;
  onOpenModule: (moduleId: string) => void;
  onOpenSubtopic: (moduleId: string, subtopicId: string) => void;
  progressPct: number;
  totalHours: string;
}

export default function DashboardView({ state, onNavigate, onOpenModule, onOpenSubtopic, progressPct, totalHours }: Props) {
  const course = COURSES["rising-stars"];
  const { completed } = state;

  const totalSubs = course.modules.reduce((a, m) => a + m.subtopics.length, 0);
  const doneSubs = Object.keys(completed.subtopics).length;
  const doneModules = Object.keys(completed.modules).length;

  const introComplete = course.introduction.items.every(i => completed.intro[i.id]);

  function getNextAction(): { label: string; icon: string; action: () => void } | null {
    if (!introComplete) return { label: "Watch introduction video", icon: "fa-play-circle", action: () => onNavigate("introduction") };
    for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
      const m = course.modules[mIdx];
      if (mIdx > 0 && !completed.modules[course.modules[mIdx - 1].id]) break;
      for (let sIdx = 0; sIdx < m.subtopics.length; sIdx++) {
        const s = m.subtopics[sIdx];
        if (sIdx > 0 && !completed.subtopics[m.subtopics[sIdx - 1].id]) break;
        if (!completed.subtopics[s.id]) {
          return { label: `Continue: ${s.title}`, icon: "fa-arrow-right", action: () => onOpenSubtopic(m.id, s.id) };
        }
      }
      if (!completed.modules[m.id]) {
        return { label: `Open Module ${m.number}: ${m.title}`, icon: "fa-book-open", action: () => onOpenModule(m.id) };
      }
    }
    if (course.modules.every(m => completed.modules[m.id]) && !completed.conclusion["conclusion-video"]) {
      return { label: "Watch conclusion & earn badge", icon: "fa-medal", action: () => onNavigate("conclusion") };
    }
    return null;
  }

  const nextAction = getNextAction();

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Hero welcome */}
      <div className="bg-gradient-to-r from-griffin-600 to-griffin-800 rounded-3xl p-8 text-white mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 text-8xl">
            <i className="fas fa-star"></i>
          </div>
        </div>
        <div className="relative">
          <div className="mb-2">
            <p className="text-griffin-300 text-xs font-semibold tracking-widest uppercase">Griffin LMS · Professional Services</p>
          </div>
          <p className="text-griffin-200 text-sm mb-1">Welcome back,</p>
          <h1 className="text-3xl font-bold font-display mb-1">{state.user.name}</h1>
          <p className="text-griffin-200 text-sm mb-6">{state.user.department}</p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-white/10 rounded-xl px-4 py-2">
              <p className="text-griffin-200 text-xs">Progress</p>
              <p className="font-bold text-xl">{progressPct}%</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2">
              <p className="text-griffin-200 text-xs">Subtopics Done</p>
              <p className="font-bold text-xl">{doneSubs}/{totalSubs}</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2">
              <p className="text-griffin-200 text-xs">Modules Complete</p>
              <p className="font-bold text-xl">{doneModules}/5</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2">
              <p className="text-griffin-200 text-xs">Time Invested</p>
              <p className="font-bold text-xl">{totalHours}h</p>
            </div>
          </div>

          {nextAction && (
            <button
              onClick={nextAction.action}
              className="mt-6 inline-flex items-center gap-2 bg-white text-griffin-700 hover:bg-griffin-50 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              <i className={`fas ${nextAction.icon}`}></i>
              {nextAction.label}
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-gray-900 dark:text-white text-sm">Overall Progress</h2>
          <span className="text-griffin-600 font-bold text-sm">{progressPct}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div className="bg-gradient-to-r from-griffin-500 to-griffin-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${progressPct}%` }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {progressPct === 0 ? "Begin your Rising Stars journey" : progressPct === 100 ? "🎉 Programme complete!" : `${doneSubs} of ${totalSubs} subtopics complete`}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Introduction */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <i className="fas fa-play-circle text-blue-600 text-sm"></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Programme Introduction</h3>
              {introComplete && <p className="text-xs text-green-600">Complete</p>}
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-500 mb-3">Welcome videos and platform navigation tutorial.</p>
            <button
              onClick={() => onNavigate("introduction")}
              className="text-sm text-griffin-600 hover:text-griffin-700 font-medium flex items-center gap-1"
            >
              {introComplete ? "Review Introduction" : "Start Introduction"}
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>

        {/* Modules grid */}
        {course.modules.map((m, mIdx) => {
          const locked = mIdx === 0 ? !introComplete : !completed.modules[course.modules[mIdx - 1].id];
          const modComplete = !!completed.modules[m.id];
          const subsDone = m.subtopics.filter(s => completed.subtopics[s.id]).length;
          const subsPct = Math.round((subsDone / m.subtopics.length) * 100);

          return (
            <div
              key={m.id}
              className={`bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden transition-all
                ${locked ? "border-gray-100 dark:border-gray-800 opacity-60" : "border-gray-200 dark:border-gray-800 hover:shadow-md cursor-pointer"}
                ${modComplete ? "border-green-200 dark:border-green-900/30" : ""}`}
              onClick={() => !locked && onOpenModule(m.id)}
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${modComplete ? "bg-green-100 dark:bg-green-900/30" : "bg-griffin-100 dark:bg-griffin-900/20"}`}>
                  <i className={`fas ${locked ? "fa-lock" : m.icon} text-sm ${modComplete ? "text-green-600" : "text-griffin-600"}`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">M{m.number}: {m.title}</h3>
                  <p className="text-xs text-gray-500">{subsDone}/{m.subtopics.length} subtopics</p>
                </div>
                {modComplete && <i className="fas fa-check-circle text-green-500 flex-shrink-0"></i>}
              </div>
              <div className="px-4 py-3">
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                  <div className="bg-griffin-500 h-1.5 rounded-full transition-all" style={{ width: `${subsPct}%` }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">{m.introDescription}</p>
              </div>
            </div>
          );
        })}

        {/* Conclusion card */}
        <div
          className={`bg-gradient-to-br from-gray-900 to-griffin-950 rounded-2xl overflow-hidden border border-gray-800 transition-all
            ${course.modules.every(m => completed.modules[m.id]) ? "cursor-pointer hover:shadow-xl" : "opacity-50"}`}
          onClick={() => course.modules.every(m => completed.modules[m.id]) && onNavigate("conclusion")}
        >
          <div className="p-6 text-center text-white">
            <i className="fas fa-medal text-gold-400 text-3xl mb-3"></i>
            <h3 className="font-bold text-white">Conclusion & Badge</h3>
            <p className="text-xs text-gray-400 mt-1">
              {course.modules.every(m => completed.modules[m.id])
                ? completed.conclusion["conclusion-video"] ? "Badge earned!" : "All modules complete — claim your badge"
                : "Complete all 5 modules to unlock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
