// Định nghĩa kiểu dữ liệu — khớp với docs/02-mo-hinh-du-lieu.md

export interface Example {
  hanzi: string;
  pinyin: string;
  meaningVi: string;
}

export type PartOfSpeech =
  | "danh-tu"
  | "dong-tu"
  | "tinh-tu"
  | "dai-tu"
  | "so-tu"
  | "luong-tu"
  | "pho-tu"
  | "gioi-tu"
  | "lien-tu"
  | "tro-tu"
  | "nang-dong-tu"
  | "cum-chao";

export interface Word {
  id: string;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  partOfSpeech: PartOfSpeech;
  level: number;
  topic: string;
  examples: Example[];
  audio?: string | null;
}

export interface GrammarPoint {
  id: string;
  title: string;
  level: number;
  structure: string;
  explanationVi: string;
  examples: Example[];
  commonMistakes: string[];
}

export interface DialogueLine {
  speaker: string;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
}

export interface Dialogue {
  id: string;
  title: string;
  level: number;
  situationVi: string;
  lines: DialogueLine[];
  newWords: string[];
}

export interface Topic {
  code: string;
  name: string;
}

export interface Level {
  level: number;
  name: string;
  description: string;
  wordCount: number;
  topics: string[];
}

// Nhãn hiển thị loại từ
export const PART_OF_SPEECH_LABEL: Record<PartOfSpeech, string> = {
  "danh-tu": "Danh từ",
  "dong-tu": "Động từ",
  "tinh-tu": "Tính từ",
  "dai-tu": "Đại từ",
  "so-tu": "Số từ",
  "luong-tu": "Lượng từ",
  "pho-tu": "Phó từ",
  "gioi-tu": "Giới từ",
  "lien-tu": "Liên từ",
  "tro-tu": "Trợ từ",
  "nang-dong-tu": "Động từ năng nguyện",
  "cum-chao": "Cụm giao tiếp",
};
