# 🔊 Thư mục audio phát âm — KHÔNG có trong repo

> **Nhắc quan trọng:** Các file `*.mp3` trong thư mục này **KHÔNG được commit lên GitHub** (đã bị `.gitignore`).
> Nếu bạn vừa clone repo, thư mục này **trống** (chỉ có mỗi file README này). Đó là bình thường.

## Vì sao không commit mp3?

- Các file mp3 được **sinh tự động** từ giọng neural **Microsoft Edge TTS** (`zh-CN-XiaoxiaoNeural`) qua thư viện `msedge-tts`.
- Endpoint này là **không chính thức cho lập trình**; đưa audio đó lên một **repo public** là *phát hành lại* giọng của Microsoft → **vùng xám về điều khoản (ToS)**.
- Vì vậy mp3 chỉ nằm ở máy dev, không đẩy lên repo. (Xem `docs/07-giai-phap-phat-trien.md` mục TTS để biết hướng chuyển sang **Azure Speech** free-tier khi phát hành thương mại.)

## Cách tạo lại audio

```bash
npm install          # cần msedge-tts (devDependency)
npm run gen-audio    # sinh mp3 vào public/audio/ + cập nhật src/data/audio-manifest.json
```

- **Cần Node + có mạng** (gọi tới endpoint Microsoft lúc tạo).
- Script **tăng dần**: chỉ tạo file còn thiếu; chạy lại rất nhanh.
- Script: [`scripts/generate-audio.mjs`](../../scripts/generate-audio.mjs).

> ⚠️ **Nếu chạy trên ổ Google Drive:** `node_modules` hay bị hỏng (file 0 byte). Nếu `npm run gen-audio` báo lỗi `msedge-tts`, hãy copy project ra ổ local (vd `C:\dev\LanguageAI`) rồi chạy, hoặc chạy script bằng một bản `msedge-tts` cài trên ổ local (đặt biến `LANGAI_ROOT` trỏ về project).

## Trạng thái audio hiện tại (tại máy dev)

| Cấp | Đã có audio |
|-----|-------------|
| HSK 1 | 150 từ + câu ví dụ |
| HSK 2 | 150 từ + câu ví dụ |
| HSK 3 | 300 từ + câu ví dụ |
| Tổng | ~1196 file mp3 (~10.6 MB), 0 file rỗng |

Manifest ánh xạ `text → file`: [`src/data/audio-manifest.json`](../../src/data/audio-manifest.json) — file này **có** trong repo.

## Khi KHÔNG có mp3 thì sao?

Nút 🔊 tự động **fallback sang Web Speech API** của trình duyệt ([`src/lib/tts.ts`](../../src/lib/tts.ts)):
- Edge/Chrome (có mạng): vẫn phát được (giọng online).
- Firefox / máy không cài giọng tiếng Trung: có thể **im lặng**.

→ Vì vậy: **bản deploy công khai (Vercel) sẽ dùng fallback** cho tới khi bước build chạy `gen-audio` (đã cấu hình ở script `prebuild` trong `package.json`).
