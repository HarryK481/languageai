# Tổng quan dự án — Website dạy & học tiếng Trung

> Tài liệu thiết kế (chưa code). Mục tiêu: thống nhất phạm vi, nội dung, kiến trúc và lộ trình trước khi triển khai.

## 1. Mục tiêu

Xây dựng website giúp người Việt **học tiếng Trung** theo chuẩn **HSK** (Hanyu Shuiping Kaoshi — kỳ thi năng lực Hán ngữ tiêu chuẩn), tổ chức nội dung theo 3 trụ cột:

- **Từ vựng** (词语 / từ ngữ)
- **Ngữ pháp** (语法)
- **Hội thoại** (会话)

Phân theo **trình độ tiêu chuẩn HSK 1 → 6**.

## 2. Phạm vi giai đoạn 1 (đã chốt)

- **HSK 1**: nội dung đầy đủ (từ vựng, ngữ pháp, hội thoại) — làm mẫu chuẩn.
- **HSK 2–6**: dựng sẵn khung (cấu trúc dữ liệu + trang) để bổ sung nội dung sau, không để trống gây lỗi.

## 3. Đối tượng người dùng

| Nhóm | Nhu cầu chính |
|------|---------------|
| Người mới bắt đầu (VN) | Học từ vựng cơ bản, pinyin, phát âm, nghĩa tiếng Việt |
| Người luyện thi HSK | Học theo đúng danh sách từ/ngữ pháp từng cấp |
| Người tự ôn | Flashcard, quiz, luyện hội thoại |

## 4. Giá trị cốt lõi

1. **Đúng chuẩn HSK** — bám sát danh sách từ vựng & ngữ pháp chính thức từng cấp.
2. **Hỗ trợ tiếng Việt** — mọi giải thích, nghĩa, ghi chú bằng tiếng Việt.
3. **Học chủ động** — không chỉ đọc, mà có flashcard, quiz, luyện nghe/nói.
4. **Phát âm chuẩn** — pinyin + audio (TTS hoặc file thu) cho từng từ/câu.

## 5. Nguyên tắc thiết kế nội dung

- Mỗi **bài học (lesson)** thuộc một **cấp HSK** và một **chủ đề (topic)**.
- Mỗi từ vựng có: Hán tự, pinyin, nghĩa tiếng Việt, loại từ, ví dụ câu.
- Mỗi điểm ngữ pháp có: tên, công thức/cấu trúc, giải thích, ví dụ, lỗi thường gặp.
- Mỗi hội thoại có: tình huống, lượt thoại (Hán + pinyin + dịch), từ mới liên quan.

## 6. Tài liệu liên quan

- [01 — Kiến trúc kỹ thuật](01-kien-truc.md)
- [02 — Mô hình dữ liệu nội dung](02-mo-hinh-du-lieu.md)
- [03 — Cấu trúc nội dung HSK](03-noi-dung-hsk.md)
- [04 — Tính năng & màn hình](04-tinh-nang.md)
- [05 — Lộ trình triển khai](05-lo-trinh.md)
