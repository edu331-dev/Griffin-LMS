export type VoiceCategory = "technical" | "culture" | string;

const FEMALE_PRIORITY = [
  "Microsoft Aria Online (Natural)",
  "Microsoft Jenny Online (Natural)",
  "Google US English",
  "Samantha",
  "Karen",
  "Victoria",
  "Google UK English Female",
  "Microsoft Zira",
];

const MALE_PRIORITY = [
  "Microsoft Guy Online (Natural)",
  "Microsoft Davis Online (Natural)",
  "Google UK English Male",
  "Daniel",
  "Alex",
  "Fred",
  "Microsoft David",
];

export function pickBestVoice(category: VoiceCategory): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const isMale = category === "technical";
  const priority = isMale ? MALE_PRIORITY : FEMALE_PRIORITY;

  for (const name of priority) {
    const match = voices.find(v => v.name.includes(name));
    if (match) return match;
  }

  const fallback = voices.find(v =>
    v.lang.startsWith("en") && (isMale
      ? v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("guy") || v.name.toLowerCase().includes("david")
      : v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("aria") || v.name.toLowerCase().includes("jenny"))
  );
  if (fallback) return fallback;
  return voices.find(v => v.lang.startsWith("en")) || null;
}

export function makeUtterance(text: string, category: VoiceCategory, voice: SpeechSynthesisVoice | null): SpeechSynthesisUtterance {
  const isMale = category === "technical";
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.84;
  utter.pitch = isMale ? 0.93 : 1.06;
  utter.volume = 1.0;
  if (voice) utter.voice = voice;
  return utter;
}

export function withVoice(category: VoiceCategory, cb: (voice: SpeechSynthesisVoice | null) => void) {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) {
    cb(pickBestVoice(category));
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      cb(pickBestVoice(category));
    };
  }
}

export function cleanSlideText(raw: string): string {
  return raw
    .replace(/\s+/g, " ")
    .replace(/[•●▪▸►◆◇]/g, "")
    .replace(/([.!?])\s+([A-Z])/g, "$1 $2")
    .replace(/(\w)-(\w)/g, "$1 $2")
    .trim();
}
