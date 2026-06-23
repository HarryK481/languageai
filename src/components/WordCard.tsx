"use client";

import { useState } from "react";
import type { Word } from "@/lib/types";
import { PART_OF_SPEECH_LABEL } from "@/lib/types";
import SpeakButton from "./SpeakButton";

export default function WordCard({
  word,
  learned,
  onToggleLearned,
}: {
  word: Word;
  learned?: boolean;
  onToggleLearned?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`card-3d ${learned ? "border-green-300 bg-green-50/50" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="font-hanzi text-4xl font-bold leading-none">{word.hanzi}</span>
            <SpeakButton text={word.hanzi} className="h-9 w-9" />
          </div>
          <div className="mt-2 text-lg text-brand">{word.pinyin}</div>
          <div className="text-gray-700">{word.meaningVi}</div>
          <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
            {PART_OF_SPEECH_LABEL[word.partOfSpeech]}
          </span>
        </div>

        {onToggleLearned && (
          <button
            type="button"
            onClick={() => onToggleLearned(word.id)}
            className={`shrink-0 rounded-xl border-2 border-b-4 px-3 py-2 text-sm font-bold transition active:translate-y-0.5 active:border-b-2 ${
              learned
                ? "border-green-600 bg-green-500 text-white"
                : "border-gray-300 bg-white text-gray-500 hover:border-green-400"
            }`}
          >
            {learned ? "✓ Đã thuộc" : "Đánh dấu"}
          </button>
        )}
      </div>

      {word.examples.length > 0 && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            {open ? "Ẩn ví dụ" : "Xem ví dụ"}
          </button>
          {open && (
            <ul className="mt-2 space-y-2">
              {word.examples.map((ex, i) => (
                <li key={i} className="rounded-xl bg-gray-50 p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-hanzi text-lg">{ex.hanzi}</span>
                    <SpeakButton text={ex.hanzi} className="h-7 w-7" />
                  </div>
                  <div className="text-sm text-brand">{ex.pinyin}</div>
                  <div className="text-sm text-gray-600">{ex.meaningVi}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
