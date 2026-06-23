import Link from "next/link";
import { notFound } from "next/navigation";
import { getLevels, getLevel, getDialogues } from "@/lib/data";
import DialogueView from "@/components/DialogueView";

export function generateStaticParams() {
  return getLevels().map((l) => ({ level: String(l.level) }));
}

export default function DialoguePage({ params }: { params: { level: string } }) {
  const levelNum = Number(params.level);
  const level = getLevel(levelNum);
  if (!level) notFound();

  const dialogues = getDialogues(levelNum);

  return (
    <div className="space-y-5">
      <Link href={`/hsk/${levelNum}`} className="text-sm font-semibold text-gray-500 hover:underline">
        ← {level.name}
      </Link>
      <h1 className="text-2xl font-extrabold">Hội thoại {level.name}</h1>

      {dialogues.length === 0 ? (
        <p className="rounded-2xl bg-amber-50 p-6 text-center text-amber-700">
          ⏳ Nội dung hội thoại cấp này đang được cập nhật.
        </p>
      ) : (
        <div className="space-y-4">
          {dialogues.map((d) => (
            <DialogueView key={d.id} dialogue={d} />
          ))}
        </div>
      )}
    </div>
  );
}
