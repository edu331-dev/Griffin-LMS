import { useCallback } from "react";
import { useLMSStore } from "./store/lmsStore";
import type { SubtopicStep, ActiveQuiz } from "./types/lms";
import LoginScreen from "./components/LoginScreen";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AIPanel from "./components/AIPanel";
import DashboardView from "./views/DashboardView";
import IntroView from "./views/IntroView";
import ModuleView from "./views/ModuleView";
import SubtopicView from "./views/SubtopicView";
import ConclusionView from "./views/ConclusionView";
import ProfileView from "./views/ProfileView";
import CertificatesView from "./views/CertificatesView";

export default function App() {
  const store = useLMSStore();
  const { state } = store;

  if (!state.loggedIn) {
    return <LoginScreen onLogin={store.login} />;
  }

  function renderView() {
    const { currentView, currentModule, currentSubtopic } = state;

    if (currentView === "subtopic" && currentModule && currentSubtopic) {
      return (
        <SubtopicView
          state={state}
          moduleId={currentModule}
          subtopicId={currentSubtopic}
          onSetStep={(step: SubtopicStep) => store.setSubtopicStep(step)}
          onMarkContent={store.markContentComplete}
          onMarkPractical={store.markPracticalComplete}
          onMarkSubtopicPassed={store.markSubtopicPassed}
          onStartQuiz={(id: string): ActiveQuiz => store.startQuizAttempt(id)}
          onAnswerQ={store.answerQuestion}
          onTickTimer={store.tickTimer}
          onResetAttempts={store.resetQuizAttempts}
          onOpenSubtopic={store.openSubtopic}
          onOpenModule={store.openModule}
          onNavigate={store.navigate}
        />
      );
    }

    if (currentView === "module" && currentModule) {
      return (
        <ModuleView
          state={state}
          moduleId={currentModule}
          onOpenSubtopic={store.openSubtopic}
          onMarkIntroWatched={store.markModuleIntroWatched}
          onNavigate={store.navigate}
        />
      );
    }

    if (currentView === "introduction") {
      return (
        <IntroView
          state={state}
          onMarkComplete={store.markIntroItemComplete}
          onNavigate={store.navigate}
        />
      );
    }

    if (currentView === "conclusion") {
      return (
        <ConclusionView
          state={state}
          onMarkConclusionWatched={store.markConclusionWatched}
          onNavigate={store.navigate}
        />
      );
    }

    if (currentView === "profile") {
      return (
        <ProfileView
          state={state}
          progressPct={store.progressPct}
          totalHours={store.totalHours}
          onNavigate={store.navigate}
        />
      );
    }

    if (currentView === "certificates") {
      return (
        <CertificatesView
          state={state}
          onNavigate={store.navigate}
        />
      );
    }

    // Dashboard (default)
    return (
      <DashboardView
        state={state}
        onNavigate={store.navigate}
        onOpenModule={store.openModule}
        onOpenSubtopic={store.openSubtopic}
        progressPct={store.progressPct}
        totalHours={store.totalHours}
      />
    );
  }

  return (
    <div className={`flex flex-col h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white overflow-hidden`}>
      <Header
        state={state}
        onToggleSidebar={store.toggleSidebar}
        onToggleDark={store.toggleDarkMode}
        onToggleAI={store.toggleAI}
        onLogout={store.logout}
        progressPct={store.progressPct}
        totalHours={store.totalHours}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          state={state}
          onNavigate={store.navigate}
          onOpenModule={store.openModule}
          onOpenSubtopic={store.openSubtopic}
          progressPct={store.progressPct}
          completedSubtopics={store.completedSubtopics}
          totalSubtopics={store.totalSubtopics}
        />

        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${state.aiOpen ? "mr-80" : ""}`}>
          {renderView()}
        </main>

        <AIPanel
          state={state}
          onClose={store.toggleAI}
          onAddMessage={store.addAIMessage}
        />
      </div>
    </div>
  );
}
