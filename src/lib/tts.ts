// Phát âm tiếng Trung — chạy phía client.
// Ưu tiên file mp3 tạo sẵn (giọng neural Edge, chạy được cả khi máy không có giọng zh
// và cả khi offline). Nếu không có mp3 thì fallback sang Web Speech API (TTS trình duyệt).

import manifest from "@/data/audio-manifest.json";

const audioMap = manifest as Record<string, string>;

// ----- Web Speech API (fallback) -----

let cachedVoices: SpeechSynthesisVoice[] = [];

function refreshVoices(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const v = window.speechSynthesis.getVoices();
  if (v.length) cachedVoices = v;
}

// Danh sách giọng nạp bất đồng bộ: nạp sẵn + lắng nghe voiceschanged
// để tránh lỗi "lần bấm đầu tiên chưa có giọng".
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  refreshVoices();
  window.speechSynthesis.addEventListener("voiceschanged", refreshVoices);
}

export function speakChinese(text: string): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel(); // tránh chồng tiếng

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  utter.rate = 0.9;

  const voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices();
  const zhVoice = voices.find((v) => v.lang.toLowerCase().startsWith("zh"));
  if (zhVoice) utter.voice = zhVoice;

  window.speechSynthesis.speak(utter);
}

// ----- mp3 tạo sẵn -----

/** Có file phát âm tạo sẵn cho chuỗi này không? */
export function hasAudioClip(text: string): boolean {
  return Boolean(audioMap[text]);
}

/** Phát mp3 tạo sẵn; nếu lỗi (mất file...) thì fallback Web Speech. Trả về true nếu có mp3. */
function playAudioClip(text: string): boolean {
  const rel = audioMap[text];
  if (!rel) return false;
  try {
    const audio = new Audio("/" + rel);
    audio.play().catch(() => speakChinese(text));
    return true;
  } catch {
    return false;
  }
}

// ----- API dùng chung -----

/** Phát âm: ưu tiên mp3 tạo sẵn, không có thì dùng Web Speech API. */
export function speak(text: string): void {
  if (!playAudioClip(text)) speakChinese(text);
}

/** Trình duyệt có phát âm được không (có mp3 hoặc có Web Speech API). */
export function ttsSupported(text?: string): boolean {
  if (text && hasAudioClip(text)) return true;
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
