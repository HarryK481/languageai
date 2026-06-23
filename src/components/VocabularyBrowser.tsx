"use client";

import { useMemo, useState } from "react";
import type { Word, Topic } from "@/lib/types";
import { useProgress } from "@/lib/useProgress";
import WordCard from "./WordCard";

export default function VocabularyBrowser({
  words,
  topics,
}: {
  words: Word[];
  topics: Topic[];
}) {
  const { data, toggleLearned } = useProgress();
  const [topic, setTopic] = useState<string>("all");
  const [query, setQuery] = useState("");

  // Chỉ hiển thị các chủ đề thực sự có trong danh sách từ
  const usedTopics = useMemo(() => {
    const set = new Set(words.map((w) => w.topic));
    return topics.filter((t) => set.has(t.code));
  }, [words, topics]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      if (topic !== "all" && w.topic !== topic) return false;
      if (!q) return true;
      return (
        w.hanzi.includes(q) ||
        w.pinyin.toLowerCase().includes(q) ||
        w.meaningVi.toLowerCase().includes(q)
      );
    });
  }, [words, topic, query]);

  const learnedSet = new Set(data?.learnedWords ?? []);
  const learnedCount = words.filter((w) => learnedSet.has(w.id)).length;

  return (
    <div className="space-y-4">
      {/* Thanh tiến độ */}
      <div className="card-3d">
        <div className="mb-1 flex items-center justify-between text-sm font-semibold">
          <span>Đã thuộc</span>
          <span className="text-brand">
            {learnedCount}/{words.length}
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-green-500 transition-all"
            style={{ width: `${words.length ? (learnedCount / words.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="space-y-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm từ (Hán tự, pinyin, nghĩa)…"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-brand focus:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTopic("all")}
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              topic === "all" ? "bg-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Tất cả
          </button>
          {usedTopics.map((t) => (
            <button
              key={t.code}
              onClick={() => setTopic(t.code)}
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                topic === t.code ? "bg-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Danh sách từ */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((w) => (
          <WordCard
            key={w.id}
            word={w}
            learned={learnedSet.has(w.id)}
            onToggleLearned={toggleLearned}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-8 text-center text-gray-400">Không tìm thấy từ nào.</p>
      )}
    </div>
  );
}
