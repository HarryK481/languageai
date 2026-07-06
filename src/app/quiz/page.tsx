"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getLevels, getVocabulary } from "@/lib/data";
import type { Word } from "@/lib/types";
import { useProgress } from "@/lib/useProgress";
import { speak } from "@/lib/tts";
import SpeakButton from "@/components/SpeakButton";

const QUIZ_SIZE = 10;

// 3 chế độ, tất cả trắc nghiệm 4 đáp án:
// - meaning: nhìn chữ Hán → chọn nghĩa tiếng Việt
// - hanzi:   nhìn nghĩa tiếng Việt → chọn chữ Hán đúng
// - listen:  nghe phát âm (ẩn chữ) → chọn nghĩa tiếng Việt
type QuizMode = "meaning" | "hanzi" | "listen";

const MODES: { mode: QuizMode; label: string; icon: string }[] = [
  { mode: "meaning", label: "Trung → Việt", icon: "📖" },
  { mode: "hanzi", label: "Việt → Trung", icon: "✍️" },
  { mode: "listen", label: "Nghe → Việt", icon: "🎧" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Question {
  word: Word;
  options: string[];
  answer: string;
}

// Đáp án + phương án nhiễu lấy theo trường phù hợp với chế độ.
function fieldOf(mode: QuizMode) {
  return (w: Word) => (mode === "hanzi" ? w.hanzi : w.meaningVi);
}

function buildQuiz(words: Word[], mode: QuizMode): Question[] {
  const field = fieldOf(mode);
  const picked = shuffle(words).slice(0, Math.min(QUIZ_SIZE, words.length));
  return picked.map((word) => {
    const answer = field(word);
    // Chọn 3 nhiễu khác đáp án và không trùng nhau
    const distractors: string[] = [];
    for (const w of shuffle(words.filter((x) => x.id !== word.id))) {
      const v = field(w);
      if (v !== answer && !distractors.includes(v)) distractors.push(v);
      if (distractors.length === 3) break;
    }
    return { word, options: shuffle([answer, ...distractors]), answer };
  });
}

function QuizInner() {
  const params = useSearchParams();
  const initialLevel = Number(params.get("level")) || 1;
  const { saveQuizScore } = useProgress();

  const [level, setLevel] = useState(initialLevel);
  const [mode, setMode] = useState<QuizMode>("meaning");
  const [questions, setQuestions] = useState<Question[]>(() =>
    buildQuiz(getVocabulary(initialLevel), "meaning")
  );
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const levelsWithContent = useMemo(
    () => getLevels().filter((l) => getVocabulary(l.level).length > 0),
    []
  );

  const q = questions[idx];

  const reset = (lvl: number, m: QuizMode) => {
    setLevel(lvl);
    setMode(m);
    setQuestions(buildQuiz(getVocabulary(lvl), m));
    setIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  // Chế độ Nghe: tự phát âm mỗi khi sang câu mới
  useEffect(() => {
    if (mode === "listen" && q && !finished) speak(q.word.hanzi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, idx, questions, finished]);

  const choose = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      const pct = Math.round((score / questions.length) * 100);
      saveQuizScore(`hsk${level}-${mode}`, pct);
      setFinished(true);
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
    }
  };

  const optionIsHanzi = mode === "hanzi";

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-gray-500 hover:underline">
          ← Trang chủ
        </Link>
        <select
          value={level}
          onChange={(e) => reset(Number(e.target.value), mode)}
          className="rounded-xl border-2 border-gray-200 px-3 py-1 text-sm font-semibold"
        >
          {levelsWithContent.map((l) => (
            <option key={l.level} value={l.level}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-2xl font-extrabold">✏️ Quiz trắc nghiệm</h1>

      {/* Chọn chế độ */}
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.mode}
            onClick={() => reset(level, m.mode)}
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              mode === m.mode ? "bg-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {finished ? (
        <div className="card-3d text-center">
          <div className="text-5xl">{score / questions.length >= 0.8 ? "🏆" : "📚"}</div>
          <p className="mt-2 text-xl font-bold">
            {score}/{questions.length} câu đúng
          </p>
          <p className="text-gray-500">Điểm: {Math.round((score / questions.length) * 100)}</p>
          <button onClick={() => reset(level, mode)} className="btn-green mt-4">
            Làm lại
          </button>
        </div>
      ) : q ? (
        <>
          <div className="text-center text-sm font-semibold text-gray-400">
            Câu {idx + 1} / {questions.length} · Điểm: {score}
          </div>

          {/* Đề bài — thay đổi theo chế độ */}
          <div className="card-3d flex flex-col items-center gap-2 py-8">
            {mode === "meaning" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="font-hanzi text-5xl font-bold">{q.word.hanzi}</span>
                  <SpeakButton text={q.word.hanzi} className="h-9 w-9" />
                </div>
                <span className="text-lg text-brand">{q.word.pinyin}</span>
              </>
            )}

            {mode === "hanzi" && (
              <>
                <span className="text-sm font-semibold text-gray-400">Chọn chữ Hán đúng cho:</span>
                <span className="text-2xl font-bold text-gray-800">{q.word.meaningVi}</span>
              </>
            )}

            {mode === "listen" && (
              <>
                <button
                  type="button"
                  onClick={() => speak(q.word.hanzi)}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-brand text-5xl text-white transition hover:brightness-105 active:scale-90"
                  aria-label="Nghe lại"
                >
                  🔊
                </button>
                <span className="text-sm font-semibold text-gray-400">
                  {selected ? `${q.word.hanzi} · ${q.word.pinyin}` : "Nghe rồi chọn nghĩa đúng"}
                </span>
              </>
            )}
          </div>

          {/* 4 đáp án */}
          <div className="grid gap-2">
            {q.options.map((opt) => {
              let cls = "border-gray-300 bg-white hover:border-brand";
              if (selected) {
                if (opt === q.answer) cls = "border-green-600 bg-green-100 text-green-800";
                else if (opt === selected) cls = "border-rose-500 bg-rose-100 text-rose-700";
                else cls = "border-gray-200 bg-white opacity-60";
              }
              return (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  disabled={!!selected}
                  className={`rounded-2xl border-2 border-b-4 px-4 py-3 font-semibold transition ${
                    optionIsHanzi ? "text-center font-hanzi text-2xl" : "text-left"
                  } ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selected && (
            <button onClick={next} className="btn-blue w-full">
              {idx + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp →"}
            </button>
          )}
        </>
      ) : (
        <p className="py-8 text-center text-gray-400">Cấp này chưa có từ vựng để làm quiz.</p>
      )}
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<p className="py-10 text-center text-gray-400">Đang tải…</p>}>
      <QuizInner />
    </Suspense>
  );
}
