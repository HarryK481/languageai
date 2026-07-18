# 08 — Hướng dẫn Audio (cách nghe phát âm)

Tài liệu này giải thích **audio phát âm hoạt động thế nào** và **làm sao để nghe được tiếng** trong từng trường hợp sử dụng.

---

## 1. Tổng quan (đọc cái này trước)

- Mỗi từ vựng, câu ví dụ, câu ngữ pháp và lượt hội thoại đều có một file **`.mp3`** phát âm giọng neural **Microsoft Edge TTS** (`zh-CN-XiaoxiaoNeural`).
- Tổng cộng ~**10.300 file mp3** (đủ 6 cấp HSK).
- **Các file `.mp3` KHÔNG nằm trong repo Git** (đã bị `.gitignore`). Nếu bạn vừa `git clone`, thư mục `public/audio/` gần như **trống** (chỉ có README). Đó là **bình thường**, không phải lỗi.
- File **`src/data/audio-manifest.json`** (ánh xạ *chữ Hán → tên file mp3*) thì **CÓ** trong repo — nhờ nó frontend biết cần tải file nào.

> **Vì sao không đưa mp3 vào repo?** Giọng sinh từ endpoint **không chính thức** của Microsoft → phát hành lại trên repo public là vùng xám điều khoản (ToS); ngoài ra 10k file/~107MB sẽ làm phình lịch sử Git. Xem thêm mục *TTS* trong tài liệu giải pháp phát triển.

---

## 2. Ba lớp đảm bảo có tiếng ("countermeasure")

Nút 🔊 luôn cố phát tiếng theo thứ tự ưu tiên sau:

| Ưu tiên | Nguồn tiếng | Khi nào dùng |
|--------|-------------|--------------|
| 1 | File `.mp3` neural trong `public/audio/` | Khi file tồn tại (deploy đã sinh, hoặc đã chạy `gen-audio` ở máy) |
| 2 | **Web Speech API** của trình duyệt | Khi không tìm thấy mp3 (fallback tự động trong `src/lib/tts.ts`) |

→ Kể cả khi thiếu mp3, người dùng **vẫn có thể** nghe được qua giọng của trình duyệt.

---

## 3. Cách nghe audio theo từng đối tượng

### 3a. Người dùng cuối — vào **website đã deploy** (vd Vercel)
Bạn **không cần làm gì cả**. Chỉ mở web và bấm nút 🔊.

- Lúc build/deploy, script `prebuild` tự chạy `gen-audio` **trên máy chủ build** → sinh sẵn toàn bộ mp3 vào bản deploy (nằm trên CDN, không nằm trong Git).
- Nếu vì lý do nào đó bản build thiếu mp3 → tự động rơi về **Web Speech API**.

**Trải nghiệm theo trình duyệt (khi phải dùng Web Speech):**
- ✅ **Chrome / Edge (có mạng):** phát tốt giọng tiếng Trung.
- ⚠️ **Firefox / máy không cài giọng tiếng Trung:** có thể **im lặng**. → nên dùng Chrome/Edge.

### 3b. Lập trình viên — **clone repo** về chạy máy mình
Sau khi clone, thư mục audio trống. Có 2 cách:

**Cách 1 — Sinh audio thật (khuyến nghị, để nghe giọng neural):**
```bash
npm install        # cài msedge-tts (devDependency)
npm run gen-audio  # sinh mp3 vào public/audio/ + cập nhật manifest
npm run dev        # chạy web ở http://localhost:3000
```
- Cần **Node.js + có mạng** (gọi endpoint Microsoft lúc sinh).
- Script **tăng dần**: chỉ tạo file còn thiếu; chạy lại rất nhanh.
- Lần đầu sinh đủ ~10k file sẽ mất một lúc (gọi mạng nhiều lần).

**Cách 2 — Không sinh mp3, chạy luôn:**
```bash
npm install
npm run dev
```
- Web vẫn chạy, nhưng nút 🔊 dùng **Web Speech API** (xem lưu ý trình duyệt ở trên).

---

## 4. Sinh / tạo lại audio

```bash
npm run gen-audio
```
- Script: [`scripts/generate-audio.mjs`](../scripts/generate-audio.mjs).
- Quét toàn bộ **từ vựng + câu ví dụ + câu ngữ pháp + lượt hội thoại** của mọi cấp có dữ liệu (HSK 1–6).
- Ghi mp3 vào `public/audio/` và cập nhật `src/data/audio-manifest.json`.
- Đặt tên file theo `sha1(text).slice(0,16).mp3`, nên cùng một câu luôn ra cùng tên → chạy lại không tạo trùng.

---

## 5. Xử lý sự cố (Troubleshooting)

| Triệu chứng | Nguyên nhân & cách khắc phục |
|---|---|
| `npm run gen-audio` báo lỗi `msedge-tts` / module hỏng | Nếu project nằm trên **ổ Google Drive**, `node_modules` hay bị hỏng (file 0 byte). Copy project ra ổ local (vd `C:\dev\LanguageAI`) rồi chạy; hoặc trỏ biến `LANGAI_ROOT` về project và chạy script bằng một bản `msedge-tts` cài ở ổ local. |
| Bấm 🔊 không ra tiếng trên Firefox | Firefox thiếu giọng tiếng Trung → dùng **Chrome/Edge**, hoặc chạy `gen-audio` để có mp3 thật. |
| Có file mp3 **0 byte** (rỗng) | Lỗi mạng lúc sinh. Xóa file rỗng đó rồi chạy lại `gen-audio` (nó sẽ tạo lại đúng file thiếu). |
| Web deploy không có tiếng neural | Bước build-gen có thể chậm/timeout khi sinh ~10k file. Cân nhắc hướng **GitHub Release (.zip)**: đóng gói sẵn audio, cho build tải về thay vì gọi TTS 10k lần. |

---

## 6. Muốn audio "có sẵn" không cần sinh lại?

Hai phương án (không bắt buộc):
- **GitHub Release (.zip):** đóng gói toàn bộ `public/audio/` thành 1 file zip đính vào Releases của repo → tải được, không làm phình lịch sử Git. Bước build/dev chỉ cần tải + giải nén.
- **Commit thẳng mp3 vào repo:** đơn giản nhất nhưng chấp nhận vùng xám ToS + phình Git (~107MB) khó gỡ về sau.

Mặc định dự án **không** dùng hai cách này, mà dựa vào **sinh-lúc-build + fallback Web Speech** (mục 2–3).

---

*Liên quan:* [`public/audio/README.md`](../public/audio/README.md) · [`scripts/generate-audio.mjs`](../scripts/generate-audio.mjs) · [`src/lib/tts.ts`](../src/lib/tts.ts)
