import { COURSES } from "../data/courses";
import type { AppState } from "../types/lms";

interface Props {
  state: AppState;
  onNavigate: (view: string) => void;
}

export default function CertificatesView({ state, onNavigate }: Props) {
  const course = COURSES["rising-stars"];
  const { completed, user } = state;

  const earned = course.modules.every(m => completed.modules[m.id]) && !!completed.conclusion["conclusion-video"];
  const verificationUrl = `${course.conclusion.badge.verificationBase}${user.userId}`;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => onNavigate("dashboard")}
        className="text-griffin-600 hover:text-griffin-700 text-sm mb-4 inline-flex items-center gap-1"
      >
        <i className="fas fa-arrow-left text-xs"></i> Dashboard
      </button>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-display mb-6">Certificates</h1>

      {earned ? (
        <div className="bg-gradient-to-br from-gray-900 via-griffin-950 to-gray-900 rounded-3xl p-8 text-white">
          <p className="text-xs uppercase tracking-widest text-gold-400 mb-4">Rising Stars Certified</p>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-medal text-white text-2xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold font-display">{user.name}</p>
              <p className="text-gray-400">{user.department}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase mb-0.5">Issued</p>
              <p className="font-semibold text-sm">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase mb-0.5">User ID</p>
              <p className="font-mono text-sm font-semibold">{user.userId}</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
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
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 text-center">
          <i className="fas fa-certificate text-5xl text-gray-300 mb-4"></i>
          <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2 font-display">No certificates yet</h3>
          <p className="text-gray-500 text-sm mb-6">
            Complete all 5 modules and watch the conclusion video to earn your Rising Stars verified badge.
          </p>
          <button
            onClick={() => onNavigate("dashboard")}
            className="px-6 py-3 bg-griffin-600 hover:bg-griffin-700 text-white rounded-xl font-medium text-sm transition-colors"
          >
            Continue Learning
          </button>
        </div>
      )}
    </div>
  );
}
