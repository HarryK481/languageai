# Cấu trúc nội dung HSK

> Mô tả phạm vi nội dung từng cấp. HSK 1 chi tiết đầy đủ; HSK 2–6 nêu khung để bổ sung sau.

## 1. Tổng quan các cấp (chuẩn HSK 2.0)

| Cấp | Số từ vựng (lũy kế) | Trình độ tương ứng | Mục tiêu |
|-----|--------------------|--------------------|----------|
| HSK 1 | ~150 | Sơ cấp 1 | Giao tiếp đơn giản hằng ngày |
| HSK 2 | ~300 | Sơ cấp 2 | Trao đổi thông tin quen thuộc |
| HSK 3 | ~600 | Trung cấp 1 | Giao tiếp công việc/học tập cơ bản |
| HSK 4 | ~1200 | Trung cấp 2 | Thảo luận nhiều chủ đề |
| HSK 5 | ~2500 | Cao cấp 1 | Đọc báo, xem phim, thuyết trình |
| HSK 6 | ~5000 | Cao cấp 2 | Hiểu & diễn đạt trôi chảy |

> Ghi chú: HSK đã có phiên bản 3.0 (9 cấp). Giai đoạn 1 dùng chuẩn **HSK 2.0 (6 cấp)** vì phổ biến và tài liệu dồi dào. Có thể nâng cấp sau.

## 2. HSK 1 — nội dung đầy đủ (làm mẫu)

### 2.1. Chủ đề từ vựng — bảng mã chuẩn (nguồn chân lý)

Đây là **nguồn chân lý** cho mã `topic` dùng trong `levels.json` và mỗi từ vựng (xem [02-mo-hinh-du-lieu.md](02-mo-hinh-du-lieu.md)). Khi nhập liệu, trường `topic` **bắt buộc** là một mã trong cột dưới.

| # | Mã `topic` | Tên chủ đề | Từ ví dụ |
|---|-----------|------------|----------|
| 1 | `chao-hoi` | Chào hỏi & xưng hô | 你好, 谢谢, 再见, 我, 你, 他 |
| 2 | `gia-dinh` | Gia đình & người | 爸爸, 妈妈, 儿子, 女儿, 朋友 |
| 3 | `so-dem` | Số đếm & lượng từ | 一…十, 个, 岁, 块 |
| 4 | `thoi-gian` | Thời gian | 今天, 明天, 昨天, 年, 月, 日, 星期, 点, 分钟 |
| 5 | `do-vat` | Đồ vật quanh ta | 书, 桌子, 椅子, 电脑, 电视, 杯子 |
| 6 | `an-uong` | Ăn uống | 米饭, 菜, 水, 茶, 苹果, 吃, 喝 |
| 7 | `hoat-dong` | Hoạt động hằng ngày | 看, 听, 说, 读, 写, 工作, 学习, 睡觉 |
| 8 | `dia-diem` | Địa điểm & phương hướng | 家, 学校, 商店, 医院, 中国 |
| 9 | `dac-diem` | Tính chất & cảm xúc (tính từ cơ bản) | 大, 小, 多, 少, 好, 冷, 热, 高兴 |
| 10 | `nghi-van` | Đại từ nghi vấn | 什么, 谁, 哪, 几, 多少, 怎么样 |

### 2.2. Điểm ngữ pháp HSK 1 (gợi ý ~15 điểm)

- Câu với 是: A 是 B
- Câu có 有 (sở hữu / tồn tại)
- Câu hỏi với 吗
- Câu hỏi với từ để hỏi (什么, 谁, 哪儿, 几, 多少)
- Phủ định với 不 và 没
- Trợ từ ngữ khí 了 (cơ bản)
- Lượng từ 个 và cấu trúc Số + Lượng từ + Danh từ
- Câu với 的 (sở hữu / định ngữ)
- Trạng ngữ thời gian & địa điểm (vị trí trong câu)
- Câu với 很 + tính từ
- 在 chỉ vị trí / đang diễn ra
- Động từ năng nguyện 想, 会, 能
- Câu cầu khiến / mời 请
- Số đếm, ngày tháng, giờ giấc
- Cấu trúc 喜欢 + danh từ/động từ

### 2.3. Hội thoại HSK 1 (gợi ý ~10 bài)

1. Lần đầu gặp mặt (chào, hỏi tên)
2. Giới thiệu bản thân (quốc tịch, nghề nghiệp)
3. Gia đình tôi
4. Hỏi giờ & thời gian
5. Đi mua sắm (hỏi giá, số tiền)
6. Trong nhà hàng (gọi món, gọi nước)
7. Hỏi đường đơn giản
8. Số điện thoại & liên lạc
9. Sở thích (thích gì, làm gì)
10. Tạm biệt & hẹn gặp lại

## 3. HSK 2–6 — khung bổ sung sau

Mỗi cấp giữ **cùng cấu trúc** (từ vựng / ngữ pháp / hội thoại). Giai đoạn 1 chỉ cần:

- Tạo file dữ liệu rỗng hợp lệ (mảng `[]`) cho mỗi cấp.
- Trang hiển thị trạng thái "Đang cập nhật" khi chưa có nội dung.
- Bổ sung nội dung dần theo thứ tự ưu tiên: HSK 2 → 3 → ...

## 4. Nguồn tham khảo nội dung (để biên soạn)

- Danh sách từ vựng HSK chính thức (Hanban / Chinese Testing International).
- Giáo trình Standard Course HSK (Bắc Kinh ngữ ngôn đại học).
- Đối chiếu nghĩa tiếng Việt từ từ điển Hán–Việt uy tín.

> ⚠️ Lưu ý bản quyền: tự biên soạn nghĩa & ví dụ, không sao chép nguyên văn giáo trình có bản quyền.
