import { COURSES } from "../data/courses";
import type { AppState } from "../types/lms";

interface Props {
  state: AppState;
  progressPct: number;
  totalHours: string;
  onNavigate: (view: string) => void;
}

export default function ProfileView({ state, progressPct, totalHours, onNavigate }: Props) {
  const course = COURSES["rising-stars"];
  const { completed, user } = state;

  const doneSubs = Object.keys(completed.subtopics).length;
  const doneModules = Object.keys(completed.modules).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => onNavigate("dashboard")}
        className="text-griffin-600 hover:text-griffin-700 text-sm mb-4 inline-flex items-center gap-1"
      >
        <i className="fas fa-arrow-left text-xs"></i> Dashboard
      </button>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
        <div className="h-28 bg-gradient-to-r from-griffin-500 to-griffin-700 relative">
          <div className="absolute inset-0 opacity-10 flex items-center justify-end pr-8">
            <i className="fas fa-star text-9xl text-white"></i>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-900 p-1 shadow-lg flex-shrink-0">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-griffin-400 to-griffin-600 flex items-center justify-center text-white text-3xl font-bold">
                {user.avatar}
              </div>
            </div>
            <div className="pb-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.department}</p>
              <p className="text-xs text-gray-400 font-mono">{user.userId}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-2xl font-bold text-griffin-600">{progressPct}%</p>
              <p className="text-xs text-gray-500 mt-0.5">Course Progress</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-2xl font-bold text-purple-600">{totalHours}h</p>
              <p className="text-xs text-gray-500 mt-0.5">Time Invested</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-2xl font-bold text-gold-600">{doneModules}/5</p>
              <p className="text-xs text-gray-500 mt-0.5">Modules Done</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 font-display">Module Breakdown</h3>
        <div className="space-y-4">
          {course.modules.map(m => {
            const subsDone = m.subtopics.filter(s => completed.subtopics[s.id]).length;
            const pct = Math.round((subsDone / m.subtopics.length) * 100);
            const done = !!completed.modules[m.id];

            return (
              <div key={m.id}>
                <div className="flex justify-between items-center text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <i className={`fas ${m.icon} text-xs ${done ? "text-green-500" : "text-gray-400"}`}></i>
                    <span className={`font-medium ${done ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                      M{m.number}: {m.title}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">{subsDone}/{m.subtopics.length}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${done ? "bg-green-500" : "bg-griffin-500"}`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiz scores */}
        {Object.keys(completed.subtopics).length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Quiz Scores</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {course.modules.flatMap(m => m.subtopics).map(sub => {
                const result = completed.subtopics[sub.id];
                if (!result) return null;
                return (
                  <div key={sub.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-500 truncate">{sub.title}</p>
                    <p className={`font-bold text-lg ${result.score >= 90 ? "text-green-600" : result.score >= 80 ? "text-griffin-600" : "text-yellow-600"}`}>
                      {result.score}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
