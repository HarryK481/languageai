"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getLevels, getVocabulary } from "@/lib/data";
import { dueCardIds, type SrsGrade } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";
import SpeakButton from "@/components/SpeakButton";

const GRADES: { grade: SrsGrade; label: string; cls: string }[] = [
  { grade: "quen", label: "Quên", cls: "bg-rose-500 border-rose-700" },
  { grade: "kho", label: "Khó", cls: "bg-amber-500 border-amber-700" },
  { grade: "tot", label: "Tốt", cls: "bg-blue-500 border-blue-700" },
  { grade: "de", label: "Dễ", cls: "bg-green-500 border-green-700" },
];

function FlashcardInner() {
  const params = useSearchParams();
  const initialLevel = Number(params.get("level")) || 1;
  const { data, ready, reviewCard } = useProgress();

  const [level, setLevel] = useState(initialLevel);
  const [flipped, setFlipped] = useState(false);
  const [pos, setPos] = useState(0);
  const [done, setDone] = useState(0);

  const words = useMemo(() => getVocabulary(level), [level]);

  // Deck các thẻ đến hạn (hoặc chưa học). Tính 1 lần khi data sẵn sàng / đổi cấp.
  const deck = useMemo(() => {
    if (!ready || !data) return [];
    const dueIds = dueCardIds(data.srs, words.map((w) => w.id));
    return words.filter((w) => dueIds.includes(w.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, level, words]);

  if (!ready) {
    return <p className="py-10 text-center text-gray-400">Đang tải…</p>;
  }

  const levelsWithContent = getLevels().filter((l) => getVocabulary(l.level).length > 0);
  const current = deck[pos];

  const handleGrade = (grade: SrsGrade) => {
    if (!current) return;
    reviewCard(current.id, grade);
    setDone((d) => d + 1);
    setFlipped(false);
    setPos((p) => p + 1);
  };

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-gray-500 hover:underline">
          ← Trang chủ
        </Link>
        <select
          value={level}
          onChange={(e) => {
            setLevel(Number(e.target.value));
            setPos(0);
            setDone(0);
            setFlipped(false);
          }}
          className="rounded-xl border-2 border-gray-200 px-3 py-1 text-sm font-semibold"
        >
          {levelsWithContent.map((l) => (
            <option key={l.level} value={l.level}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-2xl font-extrabold">🃏 Flashcard SRS</h1>

      {deck.length === 0 ? (
        <div className="card-3d text-center">
          <div className="text-4xl">🎉</div>
          <p className="mt-2 font-semibold">Bạn đã ôn hết các thẻ đến hạn của cấp này!</p>
          <p className="text-sm text-gray-500">Quay lại sau để ôn tiếp theo lịch.</p>
        </div>
      ) : !current ? (
        <div className="card-3d text-center">
          <div className="text-4xl">✅</div>
          <p className="mt-2 font-semibold">Hoàn thành phiên ôn — {done} thẻ.</p>
          <button
            onClick={() => {
              setPos(0);
              setDone(0);
            }}
            className="btn-green mt-4"
          >
            Ôn lại
          </button>
        </div>
      ) : (
        <>
          <div className="text-center text-sm font-semibold text-gray-400">
            Thẻ {pos + 1} / {deck.length}
          </div>

          {/* Thẻ lật */}
          <div
            className="flip-card mx-auto h-64 w-full cursor-pointer"
            onClick={() => setFlipped((v) => !v)}
          >
            <div className={`flip-inner ${flipped ? "flipped" : ""}`}>
              <div className="flip-face card-3d flex-col gap-3 border-b-4">
                <span className="font-hanzi text-6xl font-bold">{current.hanzi}</span>
                <span className="text-sm text-gray-400">Nhấn để lật</span>
              </div>
              <div className="flip-face flip-back card-3d flex-col gap-2 border-b-4 bg-brand-light">
                <span className="text-2xl font-bold text-brand">{current.pinyin}</span>
                <span className="text-lg text-gray-700">{current.meaningVi}</span>
                <SpeakButton text={current.hanzi} label="Nghe" className="mt-1 px-2 py-1" />
              </div>
            </div>
          </div>

          {flipped ? (
            <div className="grid grid-cols-4 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g.grade}
                  onClick={() => handleGrade(g.grade)}
                  className={`btn-3d px-2 py-2 text-xs ${g.cls}`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          ) : (
            <button onClick={() => setFlipped(true)} className="btn-blue w-full">
              Lật thẻ
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default function FlashcardPage() {
  return (
    <Suspense fallback={<p className="py-10 text-center text-gray-400">Đang tải…</p>}>
      <FlashcardInner />
    </Suspense>
  );
}
