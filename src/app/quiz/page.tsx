"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getLevels, getVocabulary } from "@/lib/data";
import type { Word } from "@/lib/types";
import { useProgress } from "@/lib/useProgress";
import SpeakButton from "@/components/SpeakButton";

const QUIZ_SIZE = 10;

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

function buildQuiz(words: Word[]): Question[] {
  const picked = shuffle(words).slice(0, Math.min(QUIZ_SIZE, words.length));
  return picked.map((word) => {
    const distractors = shuffle(words.filter((w) => w.id !== word.id))
      .slice(0, 3)
      .map((w) => w.meaningVi);
    const options = shuffle([word.meaningVi, ...distractors]);
    return { word, options, answer: word.meaningVi };
  });
}

function QuizInner() {
  const params = useSearchParams();
  const initialLevel = Number(params.get("level")) || 1;
  const { saveQuizScore } = useProgress();

  const [level, setLevel] = useState(initialLevel);
  const [questions, setQuestions] = useState<Question[]>(() => buildQuiz(getVocabulary(initialLevel)));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const levelsWithContent = useMemo(
    () => getLevels().filter((l) => getVocabulary(l.level).length > 0),
    []
  );

  const reset = (lvl: number) => {
    setLevel(lvl);
    setQuestions(buildQuiz(getVocabulary(lvl)));
    setIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const q = questions[idx];

  const choose = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      const pct = Math.round((score / questions.length) * 100);
      saveQuizScore(`hsk${level}`, pct);
      setFinished(true);
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
    }
  };

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-gray-500 hover:underline">
          ← Trang chủ
        </Link>
        <select
          value={level}
          onChange={(e) => reset(Number(e.target.value))}
          className="rounded-xl border-2 border-gray-200 px-3 py-1 text-sm font-semibold"
        >
          {levelsWithContent.map((l) => (
            <option key={l.level} value={l.level}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-2xl font-extrabold">✏️ Quiz — chọn nghĩa đúng</h1>

      {finished ? (
        <div className="card-3d text-center">
          <div className="text-5xl">{score / questions.length >= 0.8 ? "🏆" : "📚"}</div>
          <p className="mt-2 text-xl font-bold">
            {score}/{questions.length} câu đúng
          </p>
          <p className="text-gray-500">Điểm: {Math.round((score / questions.length) * 100)}</p>
          <button onClick={() => reset(level)} className="btn-green mt-4">
            Làm lại
          </button>
        </div>
      ) : q ? (
        <>
          <div className="text-center text-sm font-semibold text-gray-400">
            Câu {idx + 1} / {questions.length} · Điểm: {score}
          </div>

          <div className="card-3d flex flex-col items-center gap-2 py-8">
            <div className="flex items-center gap-2">
              <span className="font-hanzi text-5xl font-bold">{q.word.hanzi}</span>
              <SpeakButton text={q.word.hanzi} className="h-9 w-9" />
            </div>
            <span className="text-lg text-brand">{q.word.pinyin}</span>
          </div>

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
                  className={`rounded-2xl border-2 border-b-4 px-4 py-3 text-left font-semibold transition ${cls}`}
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
