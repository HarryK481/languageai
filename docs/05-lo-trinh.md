# Lộ trình triển khai

> Kế hoạch theo giai đoạn. Chưa code — dùng để thống nhất thứ tự công việc.

## Giai đoạn 0 — Tài liệu (hiện tại) ✅
- [x] Chốt stack (Next.js) & phạm vi (HSK 1 đầy đủ + khung 2–6).
- [x] Viết tài liệu: tổng quan, kiến trúc, mô hình dữ liệu, nội dung HSK, tính năng, lộ trình.
- [ ] Người dùng duyệt tài liệu trước khi code.

## Giai đoạn 1 — Khởi tạo dự án
- [ ] Tạo project Next.js + TypeScript + Tailwind.
- [ ] Cấu trúc thư mục theo [01-kien-truc.md](01-kien-truc.md).
- [ ] Tạo `levels.json` và file dữ liệu rỗng cho HSK 1–6.
- [ ] Layout chung (header, nav, footer) + trang chủ tĩnh.

## Giai đoạn 2 — Khung hiển thị nội dung
- [ ] Hàm load dữ liệu từ `src/data`.
- [ ] Trang tổng quan cấp `/hsk/[level]`.
- [ ] Trang từ vựng / ngữ pháp / hội thoại (đọc từ JSON).
- [ ] Component: WordCard, GrammarBlock, DialogueView.
- [ ] Tích hợp TTS phát âm.

## Giai đoạn 3 — Nội dung HSK 1
- [ ] Biên soạn ~150 từ vựng HSK 1 (10 chủ đề).
- [ ] Biên soạn ~15 điểm ngữ pháp.
- [ ] Biên soạn ~10 bài hội thoại.
- [ ] Rà soát pinyin & nghĩa tiếng Việt.

## Giai đoạn 4 — Học chủ động
- [ ] Flashcard **SRS** (lặp lại ngắt quãng, thuật toán SM-2 rút gọn).
- [ ] Quiz trắc nghiệm.
- [ ] Lưu tiến độ + lịch ôn SRS (localStorage).
- [ ] Tìm kiếm & lọc theo chủ đề.

## Giai đoạn 5 — Hoàn thiện & triển khai
- [ ] Responsive & kiểm thử đa thiết bị.
- [ ] Tối ưu SEO + metadata.
- [ ] Deploy lên Vercel.
- [ ] Viết hướng dẫn đóng góp nội dung.

## Giai đoạn 6+ — Mở rộng (tùy chọn)
- [ ] Nội dung HSK 2 → 6.
- [ ] Tài khoản người dùng + DB đồng bộ tiến độ.
- [ ] Luyện viết Hán tự, nhận diện phát âm.

## Ước lượng quy mô nội dung HSK 1

| Hạng mục | Số lượng |
|----------|----------|
| Từ vựng | ~150 |
| Câu ví dụ | ~150+ |
| Điểm ngữ pháp | ~15 |
| Bài hội thoại | ~10 |

> Đây là phần tốn công nhất (biên soạn), nên tách riêng giai đoạn 3.
