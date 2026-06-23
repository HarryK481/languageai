import Link from "next/link";
import { notFound } from "next/navigation";
import { getLevels, getLevel, getGrammar } from "@/lib/data";
import GrammarBlock from "@/components/GrammarBlock";

export function generateStaticParams() {
  return getLevels().map((l) => ({ level: String(l.level) }));
}

export default function GrammarPage({ params }: { params: { level: string } }) {
  const levelNum = Number(params.level);
  const level = getLevel(levelNum);
  if (!level) notFound();

  const points = getGrammar(levelNum);

  return (
    <div className="space-y-5">
      <Link href={`/hsk/${levelNum}`} className="text-sm font-semibold text-gray-500 hover:underline">
        ← {level.name}
      </Link>
      <h1 className="text-2xl font-extrabold">Ngữ pháp {level.name}</h1>

      {points.length === 0 ? (
        <p className="rounded-2xl bg-amber-50 p-6 text-center text-amber-700">
          ⏳ Nội dung ngữ pháp cấp này đang được cập nhật.
        </p>
      ) : (
        <div className="space-y-4">
          {points.map((p) => (
            <GrammarBlock key={p.id} point={p} />
          ))}
        </div>
      )}
    </div>
  );
}
