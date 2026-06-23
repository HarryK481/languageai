import type { GrammarPoint } from "@/lib/types";
import SpeakButton from "./SpeakButton";

export default function GrammarBlock({ point }: { point: GrammarPoint }) {
  return (
    <article className="card-3d">
      <h3 className="text-lg font-bold text-gray-800">{point.title}</h3>

      <div className="mt-2 inline-block rounded-xl bg-brand-light px-4 py-2 font-hanzi text-lg font-semibold text-brand-dark">
        {point.structure}
      </div>

      <p className="mt-3 text-gray-700">{point.explanationVi}</p>

      {point.examples.length > 0 && (
        <div className="mt-3 space-y-2">
          <div className="text-sm font-semibold text-gray-500">Ví dụ</div>
          {point.examples.map((ex, i) => (
            <div key={i} className="rounded-xl bg-gray-50 p-3">
              <div className="flex items-center gap-2">
                <span className="font-hanzi text-lg">{ex.hanzi}</span>
                <SpeakButton text={ex.hanzi} className="h-7 w-7" />
              </div>
              <div className="text-sm text-brand">{ex.pinyin}</div>
              <div className="text-sm text-gray-600">{ex.meaningVi}</div>
            </div>
          ))}
        </div>
      )}

      {point.commonMistakes.length > 0 && (
        <div className="mt-3 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-3">
          <div className="text-sm font-semibold text-amber-700">⚠️ Lỗi thường gặp</div>
          <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-amber-800">
            {point.commonMistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
