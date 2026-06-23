// Phát âm tiếng Trung bằng Web Speech API (TTS) — chạy phía client.

export function speakChinese(text: string): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }
  // Dừng phát âm đang chạy để tránh chồng tiếng
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-CN";
  utter.rate = 0.9;

  // Ưu tiên chọn giọng tiếng Trung nếu trình duyệt có
  const voices = window.speechSynthesis.getVoices();
  const zhVoice = voices.find((v) => v.lang.toLowerCase().startsWith("zh"));
  if (zhVoice) utter.voice = zhVoice;

  window.speechSynthesis.speak(utter);
}

export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
