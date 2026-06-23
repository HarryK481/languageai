# Phân tích đối thủ & khoảng trống cơ hội

> Khảo sát các website/app dạy tiếng Trung (06/2026) để định vị dự án. Dùng làm căn cứ chọn tính năng khác biệt.

## 1. Đối thủ quốc tế

| Tên | Loại | Điểm mạnh | Hạn chế (với người Việt) |
|-----|------|-----------|--------------------------|
| HelloChinese | App | Game hóa, bám sát HSK (đến HSK 4), nghe-nói-đọc-viết, nhận diện phát âm | Giải thích bằng tiếng Anh |
| SuperTest (HSK Online) | App | Đề thi thử sát cấu trúc HSK mới, theo dõi tiến độ | Thiên về luyện thi, ít dạy nền |
| DuChinese / The Chairman's Bao | App/Web | Bài đọc phân cấp theo HSK, tin tức graded | Tập trung đọc hiểu, trả phí |
| Skritter | App | Luyện viết Hán tự theo thứ tự nét | Chỉ mảng viết |
| Pleco / Anki | App | Từ điển + flashcard SRS (lặp lại ngắt quãng) | Anki cần tự dựng bộ thẻ; giao diện khó |
| Zizzle | App | Học Hán tự HSK 1–6 qua truyện/hình minh họa | Chủ yếu nhớ mặt chữ |
| Ninchanese | App | Chuyên ngữ pháp tiếng Trung | Tiếng Anh |
| italki | Web/App | Gia sư 1-1 | Tốn phí theo giờ |

## 2. Đối thủ cho người Việt

| Tên | Điểm mạnh | Hạn chế |
|-----|-----------|---------|
| Hanzii Dict | Từ điển Hán–Việt + từ vựng/ngữ pháp phong phú, rất phổ biến | Là từ điển, không phải lộ trình học theo cấp |
| HeyChina | Do người Việt làm, cho người mới bắt đầu | Phạm vi nội dung còn hạn chế |
| SuperTest | Được người Việt dùng nhiều để luyện thi | Như trên |

## 3. Nhận định chung

- **Không app nào phủ hết** — mỗi app mạnh một mảng (đọc / viết / flashcard / thi).
- Phần lớn app quốc tế **giải thích bằng tiếng Anh** → rào cản với người Việt mới bắt đầu.
- Công cụ Việt mạnh nhất (Hanzii) là **từ điển**, không phải **lộ trình học có cấu trúc theo cấp**.

## 4. Khoảng trống cơ hội (định hướng khác biệt của dự án)

1. **Gộp 3 trụ cột trong một nơi** — từ vựng + ngữ pháp + hội thoại theo từng cấp HSK, thay vì phải dùng nhiều app rời rạc.
2. **Giải thích chuẩn tiếng Việt** — toàn bộ nghĩa, ngữ pháp, lỗi thường gặp bằng tiếng Việt (lợi thế so với app quốc tế).
3. **Flashcard SRS (lặp lại ngắt quãng)** — ôn từ đúng thời điểm sắp quên (kiểu Anki) nhưng **bộ thẻ dựng sẵn theo HSK**, không bắt người học tự tạo.
4. **Lộ trình theo cấp rõ ràng** — biết đang ở đâu, học gì tiếp theo (điều Hanzii/từ điển không có).
5. **Miễn phí & truy cập web** — không cần cài app, học ngay trên trình duyệt.

> Các mục 1, 2, 4, 5 đã phản ánh trong thiết kế hiện tại. **Mục 3 (SRS) là bổ sung mới** — xem cập nhật trong [04-tinh-nang.md](04-tinh-nang.md).

## 5. Tính năng nên cân nhắc thêm (từ điểm mạnh đối thủ)

| Học từ ai | Tính năng | Mức ưu tiên đề xuất |
|-----------|-----------|---------------------|
| Anki/Pleco | Flashcard **SRS** dựng sẵn theo HSK | P1 |
| HelloChinese | Nhận diện phát âm (chấm điểm giọng) | P2 |
| Skritter | Luyện viết Hán tự theo nét | P2 (đã có trong docs) |
| DuChinese | Bài đọc phân cấp theo HSK | P2 (mở rộng) |
| SuperTest | Đề thi thử mô phỏng HSK | P2 |
