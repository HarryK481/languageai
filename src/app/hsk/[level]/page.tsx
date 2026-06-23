import Link from "next/link";
import { notFound } from "next/navigation";
import { getLevels, getLevel, getLevelStats } from "@/lib/data";

export function generateStaticParams() {
  return getLevels().map((l) => ({ level: String(l.level) }));
}

const SECTIONS = [
  { slug: "tu-vung", title: "Từ vựng", icon: "📚", desc: "Hán tự, pinyin, nghĩa Việt", key: "vocab" as const, color: "btn-green" },
  { slug: "ngu-phap", title: "Ngữ pháp", icon: "🧩", desc: "Cấu trúc & cách dùng", key: "grammar" as const, color: "btn-blue" },
  { slug: "hoi-thoai", title: "Hội thoại", icon: "💬", desc: "Mẫu câu giao tiếp", key: "dialogues" as const, color: "btn-amber" },
];

export default function LevelPage({ params }: { params: { level: string } }) {
  const levelNum = Number(params.level);
  const level = getLevel(levelNum);
  if (!level) notFound();

  const stats = getLevelStats(levelNum);

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm font-semibold text-gray-500 hover:underline">
        ← Lộ trình
      </Link>

      <header className="rounded-3xl bg-brand px-6 py-8 text-white">
        <h1 className="text-3xl font-extrabold">{level.name}</h1>
        <p className="mt-2 max-w-2xl text-white/90">{level.description}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {SECTIONS.map((s) => {
          const count = stats[s.key];
          const disabled = count === 0;
          const inner = (
            <div className={`card-3d h-full ${disabled ? "opacity-60" : "hover:border-brand"}`}>
              <div className="text-4xl">{s.icon}</div>
              <div className="mt-2 text-xl font-bold">{s.title}</div>
              <div className="text-sm text-gray-500">{s.desc}</div>
              <div className="mt-3 text-sm font-semibold text-brand">
                {disabled ? "⏳ Đang cập nhật" : `${count} mục →`}
              </div>
            </div>
          );
          return disabled ? (
            <div key={s.slug}>{inner}</div>
          ) : (
            <Link key={s.slug} href={`/hsk/${levelNum}/${s.slug}`}>
              {inner}
            </Link>
          );
        })}
      </div>

      {stats.vocab > 0 && (
        <div className="flex flex-wrap gap-3">
          <Link href={`/flashcard?level=${levelNum}`} className="btn-green">
            🃏 Luyện Flashcard
          </Link>
          <Link href={`/quiz?level=${levelNum}`} className="btn-blue">
            ✏️ Làm Quiz
          </Link>
        </div>
      )}
    </div>
  );
}
