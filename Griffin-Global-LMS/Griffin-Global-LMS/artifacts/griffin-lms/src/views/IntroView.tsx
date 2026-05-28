import { COURSES } from "../data/courses";
import type { AppState } from "../types/lms";

interface Props {
  state: AppState;
  onMarkComplete: (itemId: string) => void;
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

export default function IntroView({ state, onMarkComplete, onNavigate }: Props) {
  const intro = COURSES["rising-stars"].introduction;
  const { completed } = state;

  const allDone = intro.items.every(i => completed.intro[i.id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => onNavigate("dashboard")}
        className="text-griffin-600 hover:text-griffin-700 text-sm mb-4 inline-flex items-center gap-1"
      >
        <i className="fas fa-arrow-left text-xs"></i> Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-display mb-2">{intro.title}</h1>
        <p className="text-gray-500">Before diving into the modules, watch these introduction items to understand what the Rising Stars programme covers and how to use the platform.</p>
      </div>

      <div className="space-y-6">
        {intro.items.map((item, idx) => {
          const done = !!completed.intro[item.id];
          const prevDone = idx === 0 || !!completed.intro[intro.items[idx - 1].id];

          return (
            <div
              key={item.id}
              className={`bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden transition-all
                ${!prevDone ? "opacity-50" : ""}
                ${done ? "border-green-200 dark:border-green-900/30" : "border-gray-200 dark:border-gray-800"}`}
            >
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${done ? "bg-green-100 dark:bg-green-900/30" : "bg-griffin-100 dark:bg-griffin-900/20"}`}>
                  {done
                    ? <i className="fas fa-check text-green-600"></i>
                    : <i className="fas fa-play text-griffin-600 text-sm"></i>
                  }
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.duration}</p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>

                {item.video ? (
                  <>
                    <VideoFrame url={item.video} />
                    <button
                      onClick={() => onMarkComplete(item.id)}
                      disabled={!prevDone}
                      className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${done ? "bg-green-600 text-white" : "bg-griffin-600 hover:bg-griffin-700 text-white disabled:opacity-50"}`}
                    >
                      {done ? <><i className="fas fa-check mr-2"></i>Marked Watched</> : "Mark as Watched"}
                    </button>
                  </>
                ) : item.isExternalReference ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <i className="fas fa-info-circle mr-2"></i>
                      This tutorial is available within the platform. Explore the sidebar, modules, and quizzes on your own, then mark it complete.
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl aspect-video flex items-center justify-center mb-4">
                    <div className="text-center text-gray-400">
                      <i className="fas fa-clock text-3xl mb-2"></i>
                      <p className="text-sm">Video coming soon</p>
                    </div>
                  </div>
                )}

                {(item.isExternalReference || !item.video) && (
                  <button
                    onClick={() => onMarkComplete(item.id)}
                    disabled={!prevDone}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${done ? "bg-green-600 text-white" : "bg-griffin-600 hover:bg-griffin-700 text-white disabled:opacity-50"}`}
                  >
                    {done ? <><i className="fas fa-check mr-2"></i>Complete</> : "Mark Complete"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {allDone && (
        <div className="mt-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center">
          <i className="fas fa-check-circle text-green-500 text-3xl mb-3"></i>
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">Introduction Complete!</h3>
          <p className="text-sm text-green-700 dark:text-green-400 mb-4">Module 1 is now unlocked. Begin your journey.</p>
          <button
            onClick={() => onNavigate("dashboard")}
            className="px-6 py-2.5 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-medium text-sm transition-colors"
          >
            Go to Dashboard <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      )}
    </div>
  );
}
