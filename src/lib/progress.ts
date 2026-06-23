// Lưu tiến độ học + lịch ôn SRS trong localStorage (giai đoạn 1).
// Thuật toán SRS: SM-2 rút gọn.

export type SrsGrade = "quen" | "kho" | "tot" | "de";

export interface SrsCard {
  repetitions: number; // số lần nhớ đúng liên tiếp
  intervalDays: number; // khoảng cách tới lần ôn kế
  easeFactor: number; // hệ số dễ
  dueDate: string; // YYYY-MM-DD
}

export interface ProgressData {
  learnedWords: string[];
  quizScores: Record<string, number>;
  lastVisited: string;
  srs: Record<string, SrsCard>;
}

const KEY = "languageai-progress";

const EMPTY: ProgressData = {
  learnedWords: [],
  quizScores: {},
  lastVisited: "",
  srs: {},
};

export function loadProgress(): ProgressData {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<ProgressData>;
    return { ...EMPTY, ...parsed, srs: parsed.srs ?? {} };
  } catch {
    return { ...EMPTY };
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(data));
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

// Cập nhật một thẻ theo SM-2 rút gọn dựa trên đánh giá độ nhớ.
export function gradeCard(card: SrsCard | undefined, grade: SrsGrade): SrsCard {
  const today = todayStr();
  let { repetitions, easeFactor } = card ?? {
    repetitions: 0,
    intervalDays: 0,
    easeFactor: 2.5,
    dueDate: today,
  };

  // Điều chỉnh easeFactor
  const delta: Record<SrsGrade, number> = { quen: -0.2, kho: -0.05, tot: 0, de: 0.1 };
  easeFactor = Math.max(1.3, easeFactor + delta[grade]);

  let intervalDays: number;
  if (grade === "quen") {
    repetitions = 0;
    intervalDays = 0; // ôn lại ngay trong phiên / hôm nay
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.round((card?.intervalDays || 3) * easeFactor);
    if (grade === "kho") intervalDays = Math.max(1, Math.round(intervalDays * 0.6));
  }

  return {
    repetitions,
    intervalDays,
    easeFactor: Math.round(easeFactor * 100) / 100,
    dueDate: addDays(today, intervalDays),
  };
}

export function isDue(card: SrsCard): boolean {
  return card.dueDate <= todayStr();
}

// Lấy danh sách id thẻ đến hạn ôn từ tập id cho trước.
export function dueCardIds(srs: Record<string, SrsCard>, candidateIds: string[]): string[] {
  return candidateIds.filter((id) => {
    const c = srs[id];
    return !c || isDue(c); // chưa học hoặc đã đến hạn
  });
}
