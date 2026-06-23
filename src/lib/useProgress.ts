"use client";

import { useCallback, useEffect, useState } from "react";
import {
  loadProgress,
  saveProgress,
  gradeCard,
  type ProgressData,
  type SrsGrade,
} from "./progress";

// Hook quản lý tiến độ học, đồng bộ với localStorage.
export function useProgress() {
  const [data, setData] = useState<ProgressData | null>(null);

  useEffect(() => {
    setData(loadProgress());
  }, []);

  const update = useCallback((updater: (prev: ProgressData) => ProgressData) => {
    setData((prev) => {
      const base = prev ?? loadProgress();
      const next = updater(base);
      saveProgress(next);
      return next;
    });
  }, []);

  const toggleLearned = useCallback(
    (wordId: string) => {
      update((prev) => {
        const has = prev.learnedWords.includes(wordId);
        return {
          ...prev,
          learnedWords: has
            ? prev.learnedWords.filter((id) => id !== wordId)
            : [...prev.learnedWords, wordId],
        };
      });
    },
    [update]
  );

  const reviewCard = useCallback(
    (wordId: string, grade: SrsGrade) => {
      update((prev) => {
        const card = gradeCard(prev.srs[wordId], grade);
        const learned =
          grade !== "quen" && !prev.learnedWords.includes(wordId)
            ? [...prev.learnedWords, wordId]
            : prev.learnedWords;
        return { ...prev, srs: { ...prev.srs, [wordId]: card }, learnedWords: learned };
      });
    },
    [update]
  );

  const saveQuizScore = useCallback(
    (key: string, score: number) => {
      update((prev) => ({
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [key]: Math.max(prev.quizScores[key] ?? 0, score),
        },
      }));
    },
    [update]
  );

  return { data, ready: data !== null, toggleLearned, reviewCard, saveQuizScore };
}
