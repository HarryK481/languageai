"use client";

import { speakChinese } from "@/lib/tts";

export default function SpeakButton({
  text,
  className = "",
  label,
}: {
  text: string;
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => speakChinese(text)}
      aria-label={`Phát âm ${text}`}
      title="Phát âm"
      className={`inline-flex items-center justify-center rounded-full text-brand transition hover:bg-brand-light active:scale-90 ${className}`}
    >
      <span className="text-xl">🔊</span>
      {label && <span className="ml-1 text-sm font-semibold">{label}</span>}
    </button>
  );
}
