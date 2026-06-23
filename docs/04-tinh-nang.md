# Tính năng & màn hình

> Danh sách tính năng theo mức ưu tiên và mô tả các màn hình chính. Chưa code.

## 0. Định hướng khác biệt (từ phân tích đối thủ)

Dựa trên khảo sát đối thủ ([06-phan-tich-doi-thu.md](06-phan-tich-doi-thu.md)), dự án nhắm vào các **khoảng trống** sau:

1. **Gộp 3 trụ cột** (từ vựng + ngữ pháp + hội thoại) theo từng cấp HSK trong một web — không phải dùng nhiều app rời.
2. **Giải thích 100% bằng tiếng Việt** — lợi thế so với app quốc tế (HelloChinese, Ninchanese... dùng tiếng Anh).
3. **Flashcard SRS dựng sẵn theo HSK** — ôn đúng lúc sắp quên (kiểu Anki) nhưng không bắt người học tự tạo bộ thẻ.
4. **Lộ trình theo cấp rõ ràng** — điều mà từ điển (Hanzii) không có.
5. **Miễn phí, chạy trên web** — không cần cài đặt.

## 1. Tính năng theo mức ưu tiên

### P0 — Bắt buộc (MVP)
- [ ] Trang chủ giới thiệu + chọn cấp HSK 1–6
- [ ] Trang tổng quan từng cấp (mô tả, số từ, dẫn vào 3 mục)
- [ ] Danh sách **từ vựng** theo cấp (Hán tự, pinyin, nghĩa Việt, ví dụ)
- [ ] Trang **ngữ pháp** theo cấp (cấu trúc + giải thích + ví dụ)
- [ ] Trang **hội thoại** theo cấp (lượt thoại có pinyin & dịch)
- [ ] **Phát âm** từ/câu bằng TTS (giọng zh-CN)
- [ ] Tìm kiếm từ vựng cơ bản
- [ ] Responsive (điện thoại + máy tính)

### P1 — Quan trọng
- [ ] **Flashcard SRS** (lặp lại ngắt quãng) — bộ thẻ dựng sẵn theo cấp/chủ đề HSK, lên lịch ôn theo độ nhớ ⭐ *khoảng trống cơ hội*
- [ ] **Quiz** trắc nghiệm (chọn nghĩa, chọn pinyin, nghe chọn từ)
- [ ] Lưu **tiến độ** học (localStorage)
- [ ] Lọc từ vựng theo chủ đề
- [ ] Chế độ ẩn/hiện pinyin hoặc nghĩa (luyện nhớ)

### P2 — Mở rộng
- [ ] Tài khoản người dùng + đồng bộ tiến độ (cần DB + auth)
- [ ] Luyện viết Hán tự (thứ tự nét)
- [ ] Nhận diện phát âm (so sánh giọng người học)
- [ ] Bảng xếp hạng / streak học mỗi ngày
- [ ] Nội dung HSK 3.0 (9 cấp)

## 2. Các màn hình chính

### 2.1. Trang chủ `/`
- Hero giới thiệu mục tiêu website.
- Lưới 6 thẻ cấp HSK (hiển thị số từ, trạng thái có nội dung / đang cập nhật).
- CTA: "Bắt đầu với HSK 1".

### 2.2. Tổng quan cấp `/hsk/[level]`
- Mô tả cấp, số từ vựng, mục tiêu.
- 3 nút lớn: Từ vựng · Ngữ pháp · Hội thoại.
- Thanh tiến độ học của cấp (từ localStorage).

### 2.3. Từ vựng `/hsk/[level]/tu-vung`
- Bộ lọc theo chủ đề.
- Danh sách thẻ từ: Hán tự (lớn), pinyin, nghĩa Việt, loại từ, nút phát âm 🔊, nút "Đã thuộc".
- Mở chi tiết từ → xem ví dụ câu.
- Nút chuyển sang chế độ Flashcard.

### 2.4. Ngữ pháp `/hsk/[level]/ngu-phap`
- Danh sách điểm ngữ pháp (accordion hoặc trang riêng).
- Mỗi điểm: tiêu đề, công thức nổi bật, giải thích, ví dụ, lỗi thường gặp.

### 2.5. Hội thoại `/hsk/[level]/hoi-thoai`
- Danh sách bài hội thoại theo tình huống.
- Trang bài: lượt thoại dạng bong bóng chat (Hán + pinyin + dịch), nút phát âm từng câu / cả bài.
- Khối "Từ mới trong bài".

### 2.6. Flashcard SRS `/flashcard`
- Chọn cấp + chủ đề (hoặc "ôn các thẻ đến hạn").
- Thẻ lật: mặt trước Hán tự, mặt sau pinyin + nghĩa + nút phát âm 🔊.
- Đánh giá độ nhớ: **Quên / Khó / Tốt / Dễ** → thuật toán SRS tính ngày ôn kế tiếp.
- Thuật toán: SM-2 rút gọn (interval tăng dần theo lần nhớ đúng; quên → reset). Lưu lịch ôn trong `srs` của Progress (xem [02-mo-hinh-du-lieu.md](02-mo-hinh-du-lieu.md)).
- Hiển thị số thẻ **đến hạn hôm nay**.

### 2.7. Quiz `/quiz`
- Chọn cấp + loại câu hỏi.
- Câu hỏi trắc nghiệm, chấm điểm cuối bài, lưu điểm cao nhất.

## 3. Yêu cầu phi chức năng

- **Hiệu năng**: render tĩnh (SSG), tải nhanh.
- **Khả dụng**: hỗ trợ bàn phím, contrast đủ đọc, font hiển thị Hán tự rõ.
- **Đa thiết bị**: mobile-first.
- **Mở rộng nội dung**: thêm từ/ngữ pháp chỉ bằng sửa file JSON, không đụng code.
