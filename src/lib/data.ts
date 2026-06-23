// Loader dữ liệu nội dung — đọc từ các file JSON tĩnh trong src/data.
// Dùng import tĩnh để Next.js bundle sẵn (SSG), không cần fs.

import type { Word, GrammarPoint, Dialogue, Level, Topic } from "./types";

import levelsData from "@/data/levels.json";
import topicsData from "@/data/topics.json";

import hsk1Vocab from "@/data/hsk1/vocabulary.json";
import hsk1Grammar from "@/data/hsk1/grammar.json";
import hsk1Dialogues from "@/data/hsk1/dialogues.json";

import hsk2Vocab from "@/data/hsk2/vocabulary.json";
import hsk2Grammar from "@/data/hsk2/grammar.json";
import hsk2Dialogues from "@/data/hsk2/dialogues.json";

import hsk3Vocab from "@/data/hsk3/vocabulary.json";
import hsk3Grammar from "@/data/hsk3/grammar.json";
import hsk3Dialogues from "@/data/hsk3/dialogues.json";

import hsk4Vocab from "@/data/hsk4/vocabulary.json";
import hsk4Grammar from "@/data/hsk4/grammar.json";
import hsk4Dialogues from "@/data/hsk4/dialogues.json";

import hsk5Vocab from "@/data/hsk5/vocabulary.json";
import hsk5Grammar from "@/data/hsk5/grammar.json";
import hsk5Dialogues from "@/data/hsk5/dialogues.json";

import hsk6Vocab from "@/data/hsk6/vocabulary.json";
import hsk6Grammar from "@/data/hsk6/grammar.json";
import hsk6Dialogues from "@/data/hsk6/dialogues.json";

interface LevelContent {
  vocabulary: Word[];
  grammar: GrammarPoint[];
  dialogues: Dialogue[];
}

const CONTENT: Record<number, LevelContent> = {
  1: { vocabulary: hsk1Vocab as Word[], grammar: hsk1Grammar as GrammarPoint[], dialogues: hsk1Dialogues as Dialogue[] },
  2: { vocabulary: hsk2Vocab as Word[], grammar: hsk2Grammar as GrammarPoint[], dialogues: hsk2Dialogues as Dialogue[] },
  3: { vocabulary: hsk3Vocab as Word[], grammar: hsk3Grammar as GrammarPoint[], dialogues: hsk3Dialogues as Dialogue[] },
  4: { vocabulary: hsk4Vocab as Word[], grammar: hsk4Grammar as GrammarPoint[], dialogues: hsk4Dialogues as Dialogue[] },
  5: { vocabulary: hsk5Vocab as Word[], grammar: hsk5Grammar as GrammarPoint[], dialogues: hsk5Dialogues as Dialogue[] },
  6: { vocabulary: hsk6Vocab as Word[], grammar: hsk6Grammar as GrammarPoint[], dialogues: hsk6Dialogues as Dialogue[] },
};

export const LEVELS = levelsData as Level[];
export const TOPICS = topicsData as Topic[];

export function getLevels(): Level[] {
  return LEVELS;
}

export function getLevel(level: number): Level | undefined {
  return LEVELS.find((l) => l.level === level);
}

export function getVocabulary(level: number): Word[] {
  return CONTENT[level]?.vocabulary ?? [];
}

export function getGrammar(level: number): GrammarPoint[] {
  return CONTENT[level]?.grammar ?? [];
}

export function getDialogues(level: number): Dialogue[] {
  return CONTENT[level]?.dialogues ?? [];
}

export function getWordById(id: string): Word | undefined {
  for (const lvl of Object.values(CONTENT)) {
    const w = lvl.vocabulary.find((x) => x.id === id);
    if (w) return w;
  }
  return undefined;
}

export function getTopicName(code: string): string {
  return TOPICS.find((t) => t.code === code)?.name ?? code;
}

// Số liệu phục vụ hiển thị (số nội dung thực có)
export function getLevelStats(level: number) {
  return {
    vocab: getVocabulary(level).length,
    grammar: getGrammar(level).length,
    dialogues: getDialogues(level).length,
  };
}

export function hasContent(level: number): boolean {
  const s = getLevelStats(level);
  return s.vocab + s.grammar + s.dialogues > 0;
}
