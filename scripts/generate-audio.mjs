// Tạo sẵn file phát âm tiếng Trung (mp3) cho từ vựng + câu ví dụ,
// dùng giọng neural MIỄN PHÍ của Microsoft Edge (msedge-tts) — không cần API key, không tốn phí.
//
// Chạy:  node scripts/generate-audio.mjs
// Kết quả: public/audio/<hash>.mp3  +  src/data/audio-manifest.json  ({ "你好": "audio/xxxx.mp3", ... })
// Mang tính tăng dần: file đã có thì bỏ qua, nên chạy lại rất nhanh.

import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { createHash } from "node:crypto";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Mặc định: thư mục cha của scripts/. Có thể ghi đè bằng LANGAI_ROOT
// (hữu ích khi chạy script từ nơi khác, ví dụ khi node_modules trên ổ đồng bộ bị lỗi).
const ROOT = process.env.LANGAI_ROOT || join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = join(ROOT, "src", "data");
const AUDIO_DIR = join(ROOT, "public", "audio");
const MANIFEST = join(DATA_DIR, "audio-manifest.json");

const VOICE = "zh-CN-XiaoxiaoNeural"; // giọng nữ phổ thông, tự nhiên
const LEVELS = [1, 2, 3, 4, 5, 6];

const hash = (t) => createHash("sha1").update(t).digest("hex").slice(0, 16);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => stat(p).then(() => true).catch(() => false);

// Gom tất cả chuỗi Hán tự cần phát âm (từ vựng + ví dụ), khử trùng lặp.
async function collectTexts() {
  const set = new Set();
  for (const lv of LEVELS) {
    const file = join(DATA_DIR, `hsk${lv}`, "vocabulary.json");
    if (!(await exists(file))) continue;
    const words = JSON.parse(await readFile(file, "utf8"));
    for (const w of words) {
      if (w.hanzi) set.add(w.hanzi);
      for (const ex of w.examples ?? []) if (ex.hanzi) set.add(ex.hanzi);
    }
  }
  return [...set];
}

async function synthesize(tts, text, outPath) {
  const { audioStream } = tts.toStream(text);
  await new Promise((resolve, reject) => {
    const out = createWriteStream(outPath);
    audioStream.pipe(out);
    audioStream.on("end", resolve);
    audioStream.on("error", reject);
    out.on("error", reject);
  });
}

async function main() {
  await mkdir(AUDIO_DIR, { recursive: true });
  const texts = await collectTexts();
  console.log(`Có ${texts.length} chuỗi cần phát âm (giọng ${VOICE}).`);

  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  const manifest = {};
  let made = 0, skipped = 0;
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];
    const rel = `audio/${hash(text)}.mp3`;
    manifest[text] = rel;
    const outPath = join(ROOT, "public", rel);
    if (await exists(outPath)) { skipped++; continue; }

    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        await synthesize(tts, text, outPath);
        ok = true;
      } catch (e) {
        if (attempt === 3) console.warn(`  ✗ "${text}" lỗi: ${e.message}`);
        else await sleep(500 * attempt);
      }
    }
    if (ok) { made++; if (made % 20 === 0) console.log(`  ...${made} file`); }
    await sleep(120); // lịch sự với dịch vụ
  }

  // Manifest có thứ tự ổn định để diff git gọn
  const ordered = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  await writeFile(MANIFEST, JSON.stringify(ordered, null, 2) + "\n", "utf8");
  console.log(`Xong: tạo mới ${made}, bỏ qua ${skipped}. Manifest: ${MANIFEST}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
