import { COURSES } from "../data/courses";
import type { AppState } from "../types/lms";

interface Props {
  state: AppState;
  onMarkConclusionWatched: (itemId: string) => void;
  onNavigate: (view: string) => void;
}

export default function ConclusionView({ state, onMarkConclusionWatched, onNavigate }: Props) {
  const course = COURSES["rising-stars"];
  const { completed } = state;

  const modulesDone = course.modules.every(m => completed.modules[m.id]);

  if (!modulesDone) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-6">
        <i className="fas fa-lock text-5xl text-gray-300 mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-2">Conclusion Locked</h2>
        <p className="text-gray-500 mb-6">Complete all 5 modules to unlock the conclusion and your verified badge.</p>
        <button
          onClick={() => onNavigate("dashboard")}
          className="px-6 py-3 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-medium transition-colors"
        >
          Continue Programme
        </button>
      </div>
    );
  }

  const conclusionItem = course.conclusion.items[0];
  const watched = !!completed.conclusion[conclusionItem.id];
  const verificationUrl = `${course.conclusion.badge.verificationBase}${state.user.userId}`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => onNavigate("dashboard")}
        className="text-griffin-600 hover:text-griffin-700 text-sm mb-4 inline-flex items-center gap-1"
      >
        <i className="fas fa-arrow-left text-xs"></i> Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-display mb-2">{course.conclusion.title}</h1>
      <p className="text-gray-500 mb-8">You have completed all five modules. Here is the closing message and your badge.</p>

      {/* Conclusion video */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white">{conclusionItem.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{conclusionItem.description}</p>
        </div>
        <div className="p-5">
          {conclusionItem.video ? (
            <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={conclusionItem.video}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title="Conclusion video"
              ></iframe>
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl aspect-video flex items-center justify-center mb-4">
              <div className="text-center text-gray-400">
                <i className="fas fa-clock text-3xl mb-2"></i>
                <p className="text-sm">Conclusion video coming soon</p>
              </div>
            </div>
          )}
          <button
            onClick={() => onMarkConclusionWatched(conclusionItem.id)}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${watched ? "bg-green-600 text-white cursor-default" : "bg-griffin-600 hover:bg-griffin-700 text-white"}`}
            disabled={watched}
          >
            {watched ? <><i className="fas fa-check mr-2"></i>Watched</> : "Mark Watched"}
          </button>
        </div>
      </div>

      {/* Badge card */}
      <div className={`bg-gradient-to-br from-gray-900 via-griffin-950 to-gray-900 rounded-3xl p-8 text-white text-center transition-opacity ${watched ? "opacity-100" : "opacity-60"}`}>
        <p className="text-sm uppercase tracking-widest text-gold-400 mb-6">Verified Achievement</p>

        <div className="inline-block mb-6 relative">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 p-1 mx-auto">
            <div className="w-full h-full rounded-full bg-gray-900 flex flex-col items-center justify-center">
              <i className="fas fa-medal text-gold-400 text-5xl mb-2"></i>
              <p className="text-xs uppercase tracking-wider text-gold-300 font-medium">Rising Stars</p>
              <p className="text-sm font-bold text-white font-display">Certified</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold font-display mb-1">{state.user.name}</h2>
        <p className="text-gray-400 mb-8">{state.user.department} &bull; Griffin Global Technologies</p>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6 text-left">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-gray-400 uppercase mb-0.5">Issued</p>
            <p className="font-semibold text-sm">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-gray-400 uppercase mb-0.5">User ID</p>
            <p className="font-mono text-sm font-semibold">{state.user.userId}</p>
          </div>
        </div>

        {watched ? (
          <>
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <p className="text-xs text-gray-400 uppercase mb-1">Verification Link</p>
              <a
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300 underline break-all text-sm"
              >
                {verificationUrl}
              </a>
            </div>
            <button
              onClick={() => alert(`Congratulations, ${state.user.name}! Your Rising Stars badge has been recorded.`)}
              className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-gray-900 rounded-xl font-bold transition-colors"
            >
              <i className="fas fa-download mr-2"></i>
              Download Badge
            </button>
          </>
        ) : (
          <p className="text-sm text-gray-400 italic">Watch the conclusion video to reveal your verification link.</p>
        )}
      </div>
    </div>
  );
}
