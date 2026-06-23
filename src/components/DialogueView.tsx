"use client";

import { useState } from "react";
import type { Dialogue } from "@/lib/types";
import { speakChinese } from "@/lib/tts";
import SpeakButton from "./SpeakButton";

export default function DialogueView({ dialogue }: { dialogue: Dialogue }) {
  const [showPinyin, setShowPinyin] = useState(true);
  const [showMeaning, setShowMeaning] = useState(true);

  const playAll = () => {
    // Phát lần lượt từng câu, cách nhau theo độ dài
    let delay = 0;
    dialogue.lines.forEach((line) => {
      setTimeout(() => speakChinese(line.hanzi), delay);
      delay += Math.max(1500, line.hanzi.length * 350);
    });
  };

  return (
    <section className="card-3d">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{dialogue.title}</h3>
          <p className="text-sm text-gray-500">{dialogue.situationVi}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <button onClick={() => setShowPinyin((v) => !v)} className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200">
            {showPinyin ? "Ẩn pinyin" : "Hiện pinyin"}
          </button>
          <button onClick={() => setShowMeaning((v) => !v)} className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200">
            {showMeaning ? "Ẩn dịch" : "Hiện dịch"}
          </button>
          <button onClick={playAll} className="rounded-full bg-brand-light px-3 py-1 text-brand hover:brightness-95">
            ▶ Phát cả bài
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {dialogue.lines.map((line, i) => {
          const isA = line.speaker === "A";
          return (
            <div key={i} className={`flex ${isA ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  isA ? "bg-gray-100" : "bg-brand-light"
                }`}
              >
                <div className="mb-1 text-xs font-bold text-gray-400">{line.speaker}</div>
                <div className="flex items-center gap-2">
                  <span className="font-hanzi text-xl">{line.hanzi}</span>
                  <SpeakButton text={line.hanzi} className="h-7 w-7" />
                </div>
                {showPinyin && <div className="text-sm text-brand">{line.pinyin}</div>}
                {showMeaning && <div className="text-sm text-gray-600">{line.meaningVi}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
