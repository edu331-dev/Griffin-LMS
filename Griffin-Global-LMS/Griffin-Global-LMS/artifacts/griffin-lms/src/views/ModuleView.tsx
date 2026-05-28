import { COURSES } from "../data/courses";
import type { AppState } from "../types/lms";

interface Props {
  state: AppState;
  moduleId: string;
  onOpenSubtopic: (moduleId: string, subtopicId: string) => void;
  onMarkIntroWatched: (moduleId: string) => void;
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
        title="Module intro video"
      ></iframe>
    </div>
  );
}

export default function ModuleView({ state, moduleId, onOpenSubtopic, onMarkIntroWatched, onNavigate }: Props) {
  const course = COURSES["rising-stars"];
  const module = course.modules.find(m => m.id === moduleId);
  if (!module) return null;

  const { completed } = state;
  const introWatched = !!completed.moduleIntros[moduleId];
  const modComplete = !!completed.modules[moduleId];

  function getSubtopicStatus(subtopicId: string, idx: number) {
    if (completed.subtopics[subtopicId]) return "done";
    if (idx === 0) return introWatched ? "available" : "locked";
    const prevId = module!.subtopics[idx - 1].id;
    return completed.subtopics[prevId] ? "available" : "locked";
  }

  const subsDone = module.subtopics.filter(s => completed.subtopics[s.id]).length;
  const pct = Math.round((subsDone / module.subtopics.length) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => onNavigate("dashboard")}
        className="text-griffin-600 hover:text-griffin-700 text-sm mb-4 inline-flex items-center gap-1"
      >
        <i className="fas fa-arrow-left text-xs"></i> Back to Dashboard
      </button>

      {/* Module header */}
      <div className="bg-gradient-to-r from-griffin-700 to-griffin-900 rounded-3xl p-8 text-white mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <i className={`fas ${module.icon} text-2xl text-white`}></i>
          </div>
          <div className="flex-1">
            <p className="text-griffin-200 text-sm mb-1">Module {module.number} of 5</p>
            <h1 className="text-3xl font-bold font-display mb-2">{module.title}</h1>
            <p className="text-griffin-200 text-sm mb-4">{module.introDescription}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${pct}%` }}></div>
              </div>
              <span className="text-sm font-bold">{pct}%</span>
            </div>
            <p className="text-griffin-200 text-xs mt-1">{subsDone} of {module.subtopics.length} subtopics complete</p>
          </div>
        </div>
      </div>

      {/* Intro video */}
      {module.introVideo && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
            <i className="fas fa-play-circle text-griffin-500"></i>
            Module Introduction Video
          </h2>
          <p className="text-sm text-gray-500 mb-4">Watch this before starting the subtopics.</p>
          <VideoFrame url={module.introVideo} />
          <button
            onClick={() => onMarkIntroWatched(moduleId)}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${introWatched ? "bg-green-600 text-white" : "bg-griffin-600 hover:bg-griffin-700 text-white"}`}
          >
            {introWatched ? <><i className="fas fa-check mr-2"></i>Watched</> : "Mark as Watched"}
          </button>
        </div>
      )}

      {/* Subtopics list */}
      <div className="space-y-3">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">Subtopics</h2>
        {module.subtopics.map((sub, idx) => {
          const status = getSubtopicStatus(sub.id, idx);
          const isDone = status === "done";
          const isAvail = status === "available";
          const isLocked = status === "locked";

          const stepsDone = isDone ? 4 :
            completed.practical[sub.id] ? 3 :
            completed.content[sub.id] ? 2 : 0;

          return (
            <div
              key={sub.id}
              className={`bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden transition-all
                ${isLocked ? "opacity-50 border-gray-100 dark:border-gray-800" :
                  isDone ? "border-green-200 dark:border-green-900/30" :
                  "border-gray-200 dark:border-gray-800 hover:shadow-md cursor-pointer"}
              `}
              onClick={() => isAvail && onOpenSubtopic(moduleId, sub.id)}
            >
              <div className="p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                  ${isDone ? "bg-green-100 dark:bg-green-900/30" : isLocked ? "bg-gray-100 dark:bg-gray-800" : "bg-griffin-100 dark:bg-griffin-900/20"}`}>
                  <i className={`fas ${isLocked ? "fa-lock" : isDone ? "fa-check" : sub.icon} text-sm
                    ${isDone ? "text-green-600" : isLocked ? "text-gray-400" : "text-griffin-600"}`}></i>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{sub.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${sub.category === "culture" ? "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400" : "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"}`}>
                      {sub.category}
                    </span>
                    <span className="text-xs text-gray-400">~{sub.content.estimatedDuration} min reading</span>
                  </div>

                  {/* Step indicators */}
                  {!isLocked && (
                    <div className="flex items-center gap-1 mt-2">
                      {["Slides", "Content", "Practical", "Quiz"].map((label, i) => (
                        <div key={i} className="flex items-center gap-0.5">
                          <div className={`h-1 w-8 rounded-full transition-colors ${i < stepsDone ? "bg-griffin-500" : "bg-gray-200 dark:bg-gray-700"}`}></div>
                          {i < 3 && <div className="w-1"></div>}
                        </div>
                      ))}
                      {isDone && <span className="text-xs text-green-600 ml-1 font-medium">Complete</span>}
                    </div>
                  )}
                </div>

                {isDone && <i className="fas fa-check-circle text-green-500 flex-shrink-0"></i>}
                {isLocked && <i className="fas fa-lock text-gray-400 flex-shrink-0 text-xs"></i>}
                {isAvail && !isDone && <i className="fas fa-chevron-right text-griffin-500 flex-shrink-0 text-xs"></i>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Module conclusion note */}
      {modComplete && (
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center">
          <i className="fas fa-check-circle text-green-500 text-3xl mb-3"></i>
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-1">Module {module.number} Complete!</h3>
          <p className="text-sm text-green-600 dark:text-green-400">Excellent work. The next module is unlocked.</p>
        </div>
      )}
    </div>
  );
}
