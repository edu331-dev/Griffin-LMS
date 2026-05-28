import { useState, useRef, useEffect } from "react";
import { COURSES } from "../data/courses";
import type { AppState } from "../types/lms";

interface Props {
  state: AppState;
  onClose: () => void;
  onAddMessage: (role: "user" | "bot", text: string) => void;
}

function getCurrentSubtopic(state: AppState) {
  if (!state.currentModule || !state.currentSubtopic) return null;
  const rs = COURSES["rising-stars"];
  const mod = rs.modules.find(m => m.id === state.currentModule);
  if (!mod) return null;
  return { module: mod, subtopic: mod.subtopics.find(s => s.id === state.currentSubtopic) ?? null };
}

function generateContextSuggestions(state: AppState): string[] {
  const ctx = getCurrentSubtopic(state);
  if (ctx?.subtopic) {
    return ctx.subtopic.content.sections.slice(0, 3).map(s => `Explain: ${s.heading}`);
  }
  return [
    "Explain Module 1",
    "What does SOP mean?",
    "How do quizzes work?",
    "How do I earn the badge?",
    "What are GGT values?",
  ];
}

function generateAIResponse(query: string, state: AppState): string {
  const q = query.toLowerCase().trim();
  const rs = COURSES["rising-stars"];
  const ctx = getCurrentSubtopic(state);

  // ── Context-aware: questions about "this", "current", "topic I'm studying" ──
  const currentKeywords = ["this topic", "current topic", "what i'm studying", "this module", "this section", "here", "this subtopic", "current subtopic"];
  if (currentKeywords.some(k => q.includes(k))) {
    if (ctx?.subtopic) {
      const s = ctx.subtopic;
      const headings = s.content.sections.map((sec, i) => `${i + 1}. **${sec.heading}**`).join("\n");
      return `You are currently studying **${s.title}** in **Module ${ctx.module.number}: ${ctx.module.title}**.\n\nThis subtopic covers:\n${headings}\n\nAsk me to explain any of these sections and I'll walk you through the content.`;
    }
    return "You're on the dashboard. Open a module and subtopic, then ask me about the content you're studying.";
  }

  // ── "Explain [section heading]" — search current subtopic's sections first ──
  const explainMatch = q.match(/^(?:explain|what is|tell me about|summarise|summarize|describe|what are|elaborate on|what does .+ mean in)\s+(.+)/);
  const searchTerm = explainMatch ? explainMatch[1] : q;

  if (ctx?.subtopic) {
    const s = ctx.subtopic;
    for (const sec of s.content.sections) {
      const headingLower = sec.heading.toLowerCase();
      if (headingLower.includes(searchTerm) || searchTerm.includes(headingLower.split(" ").slice(0, 3).join(" "))) {
        return `**${sec.heading}** _(${s.title})_\n\n${sec.audioText ?? sec.text.slice(0, 500)}`;
      }
    }
  }

  // ── Search ALL subtopic sections across all modules ──
  if (searchTerm.length > 4) {
    for (const mod of rs.modules) {
      for (const sub of mod.subtopics) {
        for (const sec of sub.content.sections) {
          const headingLower = sec.heading.toLowerCase();
          if (headingLower.includes(searchTerm) || searchTerm.includes(headingLower.split(" ").slice(0, 3).join(" "))) {
            return `**${sec.heading}** _(${sub.title}, Module ${mod.number})_\n\n${sec.audioText ?? sec.text.slice(0, 500)}\n\n_Open Module ${mod.number} → ${sub.title} → Content tab to read the full section._`;
          }
        }
      }
    }
  }

  // ── Module lookups ──
  for (const m of rs.modules) {
    if (q.includes(`module ${m.number}`) || q.includes(m.title.toLowerCase())) {
      const subList = m.subtopics.map(s => `• ${s.title}`).join("\n");
      return `**Module ${m.number}: ${m.title}**\n\n${m.introDescription}\n\n**Subtopics:**\n${subList}`;
    }
  }

  // ── Platform / feature questions ──
  if (q.includes("sop")) return "SOPs are standardized procedures that ensure consistency. Module 3 covers understanding, following, and updating SOPs. Open Module 3 from the sidebar.";

  if (q.includes("quiz") || q.includes("attempt") || q.includes("retake")) return "Each subtopic ends with a timed quiz. You need 80% to pass, with up to three attempts. Questions reshuffle on attempts two and three. If you fail all three, you return to the presentation step and your attempts reset.";

  if (q.includes("pdf") || q.includes("slides") || q.includes("slide deck")) return "The Slides tab shows the PDF deck for the subtopic. Use the arrows to page through slides. The voiceover button reads the current slide aloud and auto-advances. You can also jump directly to any slide from the thumbnail strip.";

  if (q.includes("voiceover") || q.includes("voice") || q.includes("narrator") || q.includes("audio")) return "The narrator voice matches the subtopic category — technical subtopics use a male narrator, culture subtopics use a female narrator. Hit **Play Voiceover** on the Content tab to start it, or use the voiceover button on the Slides tab to read through the PDF.";

  if (q.includes("badge") || q.includes("certificate") || q.includes("verif")) return `Once you complete all modules and the conclusion video, you receive a verified digital badge. Your verification ID is **${state.user.userId}** and it's resolvable at griffinglobaltech.com/verify/.`;

  if (q.includes("practical")) return "The Practical tab comes after Content. It shows demonstration video(s) for the subtopic. Watch them, then hit 'Mark Watched & Take Quiz' to unlock the quiz.";

  if (q.includes("navigate") || q.includes("sidebar") || q.includes("menu")) return "The sidebar on the left holds the full course tree. Click the menu icon in the top bar to collapse it for a wider learning view. Each subtopic shows a checkmark when passed.";

  if (q.includes("time") || q.includes("how long") || q.includes("hour")) {
    const h = (state.timeTracking.totalSeconds / 3600).toFixed(1);
    return `Your session timer is in the top bar. You have invested **${h} hours** in total. Each subtopic estimates reading time in the Content tab.`;
  }

  if (q.includes("dark") || q.includes("theme")) return "Toggle dark mode using the moon/sun icon in the top-right of the header.";

  if (q.includes("value") || q.includes("culture") || q.includes("ggt")) return "GGT's core values include: **Predictable Delivery, Accountability, Talent, Innovation, Honesty, Communication, Team Collaboration, Punctuality, Quality, Oneness, Growth, Going Beyond Expectations, Whatever It Takes,** and **Wellness**.";

  if (q.includes("hello") || q.includes("hi ") || q === "hi" || q.includes("hey")) {
    const ctx2 = getCurrentSubtopic(state);
    const where = ctx2?.subtopic ? `You're currently on **${ctx2.subtopic.title}**.` : "You're on the dashboard.";
    return `Hi ${state.user.firstName}! ${where} Ask me to explain any section, module, or platform feature.`;
  }

  if (q.includes("help")) return `I can:\n• Explain any subtopic section — try "Explain Leave Policy"\n• Summarise a module — try "Explain Module 2"\n• Answer platform questions — quiz format, voiceover, badge\n• Tell you what your current topic covers\n\nWhat would you like to know?`;

  // ── Context-aware fallback ──
  if (ctx?.subtopic) {
    const headings = ctx.subtopic.content.sections.map(s => `"${s.heading}"`).join(", ");
    return `I didn't find a match for that. You're currently on **${ctx.subtopic.title}**. I can explain its sections: ${headings}. Try asking "Explain [section name]".`;
  }

  return `I cover the Rising Stars course content. Try:\n• "Explain [topic]" — e.g. "Explain Leave Policy"\n• "Explain Module 2"\n• "What is the quiz format?"\n• "What am I currently studying?"`;
}

function renderMessage(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(/•/g, "·")
    .replace(/\n/g, "<br>");
}

export default function AIPanel({ state, onClose, onAddMessage }: Props) {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const suggestions = generateContextSuggestions(state);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [state.aiHistory, thinking]);

  useEffect(() => {
    if (state.aiOpen && state.aiHistory.length === 0) {
      const ctx = getCurrentSubtopic(state);
      const where = ctx?.subtopic
        ? `You're on **${ctx.subtopic.title}**. Ask me to explain any section of this topic.`
        : "Ask me about any module, subtopic, or how to use the platform.";
      onAddMessage("bot", `Hi ${state.user.firstName}! I'm your Griffin AI course assistant. ${where}`);
    }
  }, [state.aiOpen]);

  function send() {
    const text = input.trim();
    if (!text) return;
    onAddMessage("user", text);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const response = generateAIResponse(text, state);
      onAddMessage("bot", response);
      setThinking(false);
    }, 600);
  }

  function sendSuggestion(s: string) {
    onAddMessage("user", s);
    setThinking(true);
    setTimeout(() => {
      onAddMessage("bot", generateAIResponse(s, state));
      setThinking(false);
    }, 600);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  if (!state.aiOpen) return null;

  const ctx = getCurrentSubtopic(state);

  return (
    <div className="fixed right-0 top-14 bottom-0 w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col z-40 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-griffin-500 to-griffin-700 flex items-center justify-center">
            <i className="fas fa-robot text-white text-xs"></i>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Griffin AI</p>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
              {ctx?.subtopic ? `On: ${ctx.subtopic.title.slice(0, 22)}…` : "Course assistant"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
        >
          <i className="fas fa-times text-sm"></i>
        </button>
      </div>

      {/* Context banner — shows current subtopic */}
      {ctx?.subtopic && (
        <div className="px-3 py-2 bg-griffin-50 dark:bg-griffin-900/20 border-b border-griffin-100 dark:border-griffin-900/30 flex items-start gap-2">
          <i className={`fas ${ctx.subtopic.icon} text-griffin-500 text-xs mt-0.5`}></i>
          <p className="text-[11px] text-griffin-700 dark:text-griffin-400 leading-snug">
            <span className="font-semibold">Current topic:</span> {ctx.subtopic.title}
            <br />
            <span className="text-griffin-500">Ask me anything about this content.</span>
          </p>
        </div>
      )}

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {state.aiHistory.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "bot" && (
              <div className="w-6 h-6 rounded-full bg-griffin-100 dark:bg-griffin-900/30 flex items-center justify-center flex-shrink-0 mt-1 mr-2">
                <i className="fas fa-robot text-griffin-600 text-[10px]"></i>
              </div>
            )}
            <div
              className={`px-3 py-2 rounded-2xl max-w-[85%] text-sm leading-relaxed
                ${msg.role === "user"
                  ? "bg-griffin-600 text-white rounded-br-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm"}`}
              dangerouslySetInnerHTML={{
                __html: msg.role === "bot"
                  ? renderMessage(msg.text)
                  : msg.text.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] ?? c))
              }}
            />
          </div>
        ))}
        {thinking && (
          <div className="flex justify-start">
            <div className="w-6 h-6 rounded-full bg-griffin-100 dark:bg-griffin-900/30 flex items-center justify-center flex-shrink-0 mt-1 mr-2">
              <i className="fas fa-robot text-griffin-600 text-[10px]"></i>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {state.aiHistory.length <= 1 && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => sendSuggestion(s)}
              className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-griffin-100 dark:hover:bg-griffin-900/30 text-gray-700 dark:text-gray-300 rounded-full transition-colors text-left"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={ctx?.subtopic ? `Ask about ${ctx.subtopic.title}…` : "Ask about the course…"}
            rows={1}
            className="flex-1 resize-none bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-griffin-500 max-h-24 transition"
          />
          <button
            onClick={send}
            disabled={!input.trim() || thinking}
            className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-griffin-600 hover:bg-griffin-700 disabled:opacity-50 text-white rounded-xl transition-colors"
          >
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-1 text-center">Course content only · Confidential</p>
      </div>
    </div>
  );
}
