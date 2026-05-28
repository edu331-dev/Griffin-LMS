import { useEffect, useState } from "react";
import type { AppState } from "../types/lms";

interface Props {
  state: AppState;
  onToggleSidebar: () => void;
  onToggleDark: () => void;
  onToggleAI: () => void;
  onLogout: () => void;
  progressPct: number;
  totalHours: string;
}

function formatTime(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Header({ state, onToggleSidebar, onToggleDark, onToggleAI, onLogout, progressPct, totalHours }: Props) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      setElapsed(Math.floor((Date.now() - state.timeTracking.sessionStart) / 1000));
    }, 1000);
    return () => clearInterval(tick);
  }, [state.timeTracking.sessionStart]);

  return (
    <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-3 flex-shrink-0 z-30">
      <button
        onClick={onToggleSidebar}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
        title="Toggle sidebar"
      >
        <i className="fas fa-bars text-sm"></i>
      </button>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-griffin-500 to-griffin-700 flex items-center justify-center flex-shrink-0">
          <i className="fas fa-graduation-cap text-white text-xs"></i>
        </div>
        <span className="font-bold text-griffin-700 dark:text-griffin-400 text-sm hidden sm:block truncate">Griffin LMS</span>
        <span className="hidden md:flex items-center text-xs text-gray-400 gap-1">
          <i className="fas fa-chevron-right text-[10px]"></i>
          <span className="text-gray-600 dark:text-gray-400">Rising Stars</span>
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 rounded-full px-3 py-1.5">
        <i className="fas fa-timer text-griffin-500 text-xs"></i>
        <span className="text-xs font-mono text-gray-700 dark:text-gray-300">{formatTime(elapsed)}</span>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-griffin-500 rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500">{progressPct}%</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onToggleAI}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${state.aiOpen ? "bg-griffin-100 dark:bg-griffin-900/30 text-griffin-600" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
          title="AI Assistant"
        >
          <i className="fas fa-robot text-sm"></i>
        </button>

        <button
          onClick={onToggleDark}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
          title="Toggle dark mode"
        >
          <i className={`fas ${state.darkMode ? "fa-sun" : "fa-moon"} text-sm`}></i>
        </button>

        <div className="relative group">
          <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-griffin-400 to-griffin-600 flex items-center justify-center text-white text-xs font-bold">
              {state.user.avatar}
            </div>
          </button>
          <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-1 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{state.user.name}</p>
              <p className="text-xs text-gray-500 truncate">{state.user.email}</p>
            </div>
            <div className="px-1 py-1">
              <p className="text-xs text-gray-500 px-2 py-1">{totalHours}h invested</p>
              <button
                onClick={onLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fas fa-sign-out-alt text-xs"></i>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
