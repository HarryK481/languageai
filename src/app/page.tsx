import Link from "next/link";
import { getLevels, getLevelStats, hasContent } from "@/lib/data";

const LEVEL_COLORS = [
  "bg-green-500 border-green-700",
  "bg-blue-500 border-blue-700",
  "bg-amber-500 border-amber-700",
  "bg-purple-500 border-purple-700",
  "bg-rose-500 border-rose-700",
  "bg-teal-500 border-teal-700",
];

export default function HomePage() {
  const levels = getLevels();

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="rounded-3xl bg-brand px-6 py-10 text-center text-white sm:py-14">
        <div className="text-5xl">🐼</div>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Học tiếng Trung theo chuẩn HSK</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Từ vựng · Ngữ pháp · Hội thoại — giải thích hoàn toàn bằng tiếng Việt. Học vui như chơi,
          ôn tập thông minh với flashcard.
        </p>
        <Link href="/hsk/1" className="btn-3d mt-6 bg-white text-brand border-gray-200 hover:bg-gray-50">
          Bắt đầu với HSK 1 →
        </Link>
      </section>

      {/* Lộ trình các cấp */}
      <section>
        <h2 className="mb-5 text-center text-xl font-bold text-gray-700">Lộ trình học của bạn</h2>
        <div className="relative mx-auto max-w-md space-y-4">
          {levels.map((lvl, idx) => {
            const stats = getLevelStats(lvl.level);
            const ready = hasContent(lvl.level);
            const color = LEVEL_COLORS[idx % LEVEL_COLORS.length];
            // Lệch trái/phải tạo cảm giác đường đi uốn lượn
            const offset = idx % 2 === 0 ? "sm:mr-16" : "sm:ml-16";
            return (
              <Link
                key={lvl.level}
                href={`/hsk/${lvl.level}`}
                className={`block ${offset} rounded-3xl border-b-4 ${color} p-5 text-white shadow-sm transition hover:brightness-105 active:translate-y-1 active:border-b-0`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-extrabold">{lvl.name}</div>
                    <div className="text-sm text-white/90">{lvl.description}</div>
                  </div>
                  <div className="ml-3 text-3xl font-black opacity-80">{lvl.level}</div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  {ready ? (
                    <>
                      <span className="rounded-full bg-white/25 px-2 py-1">{stats.vocab} từ vựng</span>
                      <span className="rounded-full bg-white/25 px-2 py-1">{stats.grammar} ngữ pháp</span>
                      <span className="rounded-full bg-white/25 px-2 py-1">{stats.dialogues} hội thoại</span>
                    </>
                  ) : (
                    <span className="rounded-full bg-white/25 px-2 py-1">⏳ Đang cập nhật</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Công cụ học */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Link href="/flashcard" className="card-3d-hover flex items-center gap-4">
          <span className="text-4xl">🃏</span>
          <div>
            <div className="text-lg font-bold">Flashcard SRS</div>
            <div className="text-sm text-gray-500">Ôn từ vựng bằng lặp lại ngắt quãng</div>
          </div>
        </Link>
        <Link href="/quiz" className="card-3d-hover flex items-center gap-4">
          <span className="text-4xl">✏️</span>
          <div>
            <div className="text-lg font-bold">Quiz trắc nghiệm</div>
            <div className="text-sm text-gray-500">Kiểm tra từ vựng theo cấp</div>
          </div>
        </Link>
      </section>
    </div>
  );
}
