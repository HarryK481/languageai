import Link from "next/link";
import { notFound } from "next/navigation";
import { getLevels, getLevel, getVocabulary, TOPICS } from "@/lib/data";
import VocabularyBrowser from "@/components/VocabularyBrowser";

export function generateStaticParams() {
  return getLevels().map((l) => ({ level: String(l.level) }));
}

export default function VocabularyPage({ params }: { params: { level: string } }) {
  const levelNum = Number(params.level);
  const level = getLevel(levelNum);
  if (!level) notFound();

  const words = getVocabulary(levelNum);

  return (
    <div className="space-y-5">
      <Link href={`/hsk/${levelNum}`} className="text-sm font-semibold text-gray-500 hover:underline">
        ← {level.name}
      </Link>
      <h1 className="text-2xl font-extrabold">Từ vựng {level.name}</h1>

      {words.length === 0 ? (
        <p className="rounded-2xl bg-amber-50 p-6 text-center text-amber-700">
          ⏳ Nội dung từ vựng cấp này đang được cập nhật.
        </p>
      ) : (
        <VocabularyBrowser words={words} topics={TOPICS} />
      )}
    </div>
  );
}
