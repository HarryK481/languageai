# Kiến trúc kỹ thuật

> Stack đã chốt: **Next.js**. Tài liệu này mô tả cấu trúc dự định, chưa code.

## 1. Công nghệ

| Lớp | Lựa chọn | Lý do |
|-----|----------|-------|
| Framework | **Next.js 14+ (App Router)** | SEO tốt, render tĩnh nội dung học, dễ thêm API sau |
| Ngôn ngữ | **TypeScript** | An toàn kiểu, dễ bảo trì khi dữ liệu lớn |
| UI | **Tailwind CSS** | Dựng giao diện nhanh, nhất quán |
| Component | **shadcn/ui** (tùy chọn) | Bộ component sẵn, accessible |
| Dữ liệu nội dung | **File JSON/MDX trong repo** (giai đoạn 1) | Không cần DB, dễ versioning, dễ đóng góp |
| Audio phát âm | **Web Speech API (TTS)** + file mp3 (tùy chọn) | Phát âm pinyin/câu không tốn hạ tầng |
| Lưu tiến độ | **localStorage** (giai đoạn 1) → DB (giai đoạn sau) | Đơn giản trước, mở rộng sau |
| Triển khai | **Vercel** | Tối ưu cho Next.js, free tier |

> Giai đoạn sau (nếu cần tài khoản, đồng bộ tiến độ): bổ sung **database** (PostgreSQL/Prisma) + **auth** (NextAuth).

## 2. Cấu trúc thư mục dự kiến

```
LanguageAI/
├─ docs/                      # Tài liệu thiết kế (file này)
├─ public/
│  └─ audio/                  # File phát âm (nếu dùng)
├─ src/
│  ├─ app/                    # Next.js App Router
│  │  ├─ page.tsx             # Trang chủ
│  │  ├─ hsk/
│  │  │  └─ [level]/          # /hsk/1 ... /hsk/6
│  │  │     ├─ page.tsx       # Tổng quan cấp
│  │  │     ├─ tu-vung/       # Từ vựng cấp đó
│  │  │     ├─ ngu-phap/      # Ngữ pháp
│  │  │     └─ hoi-thoai/     # Hội thoại
│  │  ├─ flashcard/           # Luyện flashcard
│  │  └─ quiz/                # Kiểm tra
│  ├─ components/             # UI tái sử dụng (WordCard, GrammarBlock...)
│  ├─ data/                   # Nội dung HSK dạng JSON/MDX
│  │  ├─ hsk1/
│  │  ├─ hsk2/ ... hsk6/
│  └─ lib/                    # Tiện ích (load data, pinyin, TTS, progress)
├─ package.json
└─ next.config.js
```

## 3. Luồng dữ liệu

1. Nội dung học lưu dạng **JSON/MDX** trong `src/data/`.
2. Khi build, Next.js đọc file → render trang tĩnh (SSG) cho từng cấp/chủ đề.
3. Tương tác (flashcard, quiz, tiến độ) xử lý phía client, lưu **localStorage**.
4. Phát âm gọi **TTS** ngay trên trình duyệt (giọng `zh-CN`).

## 4. Lý do chọn file thay vì DB ở giai đoạn 1

- Nội dung HSK gần như tĩnh, ít thay đổi → không cần DB.
- Dễ review, dễ đóng góp qua Git.
- Triển khai đơn giản, miễn phí.
- Khi cần tính năng người dùng (đăng nhập, bảng xếp hạng) mới thêm DB.
