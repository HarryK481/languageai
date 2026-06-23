# Mô hình dữ liệu nội dung

> Định nghĩa cấu trúc (schema) cho từ vựng, ngữ pháp, hội thoại. Dùng làm chuẩn khi nhập liệu. Chưa code — đây là đặc tả.

## 1. Cấp HSK (Level)

```jsonc
{
  "level": 1,                 // 1..6
  "name": "HSK 1",
  "description": "Cấp cơ bản nhất, ~150 từ vựng",
  "wordCount": 150,
  // Mã chủ đề lấy từ bảng trong 03-noi-dung-hsk.md (mục 2.1)
  "topics": ["chao-hoi", "gia-dinh", "so-dem", "thoi-gian", "do-vat",
             "an-uong", "hoat-dong", "dia-diem", "dac-diem", "nghi-van"]
}
```

## 2. Từ vựng (Word)

```jsonc
{
  "id": "hsk1-001",
  "hanzi": "你好",            // Hán tự (giản thể — xem mục 8)
  "pinyin": "nǐ hǎo",         // Pinyin có dấu thanh
  "meaningVi": "xin chào",    // Nghĩa tiếng Việt
  "partOfSpeech": "cum-chao", // Mã loại từ — bắt buộc thuộc danh sách ở mục 9
  "level": 1,
  "topic": "chao-hoi",        // Mã chủ đề — bắt buộc thuộc bảng trong 03-noi-dung-hsk.md
  "examples": [
    {
      "hanzi": "你好，我是小明。",
      "pinyin": "nǐ hǎo, wǒ shì Xiǎomíng.",
      "meaningVi": "Xin chào, tôi là Tiểu Minh."
    }
  ],
  "audio": null               // hoặc đường dẫn "/audio/hsk1-001.mp3"
}
```

## 3. Ngữ pháp (GrammarPoint)

```jsonc
{
  "id": "hsk1-gp-001",
  "title": "Câu khẳng định với 是 (shì)",
  "level": 1,
  "structure": "A + 是 + B",           // Công thức
  "explanationVi": "Dùng 是 để nối chủ ngữ với danh từ/đại từ chỉ định danh tính.",
  "examples": [
    {
      "hanzi": "我是学生。",
      "pinyin": "wǒ shì xuéshēng.",
      "meaningVi": "Tôi là học sinh."
    }
  ],
  "commonMistakes": [
    "Không dùng 是 trước tính từ: ❌ 我是高 → ✓ 我很高"
  ]
}
```

## 4. Hội thoại (Dialogue)

```jsonc
{
  "id": "hsk1-dlg-001",
  "title": "Lần đầu gặp mặt",
  "level": 1,
  "situationVi": "Hai người mới quen chào hỏi nhau.",
  "lines": [
    {
      "speaker": "A",
      "hanzi": "你好！",
      "pinyin": "nǐ hǎo!",
      "meaningVi": "Xin chào!"
    },
    {
      "speaker": "B",
      "hanzi": "你好！你叫什么名字？",
      "pinyin": "nǐ hǎo! nǐ jiào shénme míngzi?",
      "meaningVi": "Xin chào! Bạn tên là gì?"
    }
  ],
  "newWords": ["hsk1-001", "hsk1-045"]   // tham chiếu id từ vựng
}
```

## 5. Tiến độ học (Progress — lưu localStorage giai đoạn 1)

```jsonc
{
  "learnedWords": ["hsk1-001", "hsk1-002"],
  "quizScores": { "hsk1": 85 },
  "lastVisited": "/hsk/1/tu-vung",
  // Lịch lặp lại ngắt quãng (SRS) cho từng thẻ từ vựng
  "srs": {
    "hsk1-001": {
      "repetitions": 3,        // số lần nhớ đúng liên tiếp
      "intervalDays": 7,       // khoảng cách đến lần ôn kế
      "easeFactor": 2.5,       // hệ số dễ (SM-2), giảm khi hay quên
      "dueDate": "2026-06-21"  // ngày đến hạn ôn
    }
  }
}
```

> Thuật toán SRS đề xuất: **SM-2 rút gọn**. Đánh giá Quên → reset `repetitions=0`, ôn lại ngay; Khó/Tốt/Dễ → tăng `intervalDays` theo `easeFactor`.

## 6. Quy ước file dữ liệu

```
src/data/
├─ levels.json                  # Danh sách 6 cấp + metadata
├─ hsk1/
│  ├─ vocabulary.json           # mảng Word
│  ├─ grammar.json              # mảng GrammarPoint
│  └─ dialogues.json            # mảng Dialogue
├─ hsk2/ ... hsk6/              # khung tương tự (có thể mảng rỗng ban đầu)
```

## 7. Quy tắc nhập liệu

- Pinyin **bắt buộc có dấu thanh** (ā á ǎ à) — không dùng số (a1, a2).
- Nghĩa tiếng Việt ngắn gọn, ưu tiên nghĩa thông dụng nhất.
- Mỗi từ nên có ≥ 1 câu ví dụ.
- `id` theo định dạng `hsk{level}-{loại}-{số thứ tự}` để tránh trùng.
  - Từ vựng: `hsk1-001` · Ngữ pháp: `hsk1-gp-001` · Hội thoại: `hsk1-dlg-001`.
- `topic` phải là một **mã** trong bảng chủ đề tại [03-noi-dung-hsk.md](03-noi-dung-hsk.md) (mục 2.1).
- `partOfSpeech` phải là một **mã** trong danh sách ở mục 9 bên dưới.

## 8. Quy ước chữ Hán: chỉ dùng giản thể

- Giai đoạn 1 **chỉ dùng chữ giản thể (简体)** trong trường `hanzi`, đúng chuẩn HSK đại lục.
- Chưa hỗ trợ phồn thể (繁体). Nếu cần sau này, bổ sung trường tùy chọn `hanziTraditional` thay vì sửa `hanzi`.

## 9. Danh sách mã loại từ (`partOfSpeech`)

Bắt buộc dùng đúng một trong các mã sau (tránh nhập tự do "đt" vs "động từ"):

| Mã | Loại từ | Ví dụ |
|----|---------|-------|
| `danh-tu` | Danh từ | 书, 学校 |
| `dong-tu` | Động từ | 吃, 学习 |
| `tinh-tu` | Tính từ | 大, 高兴 |
| `dai-tu` | Đại từ | 我, 什么 |
| `so-tu` | Số từ | 一, 三 |
| `luong-tu` | Lượng từ | 个, 块 |
| `pho-tu` | Phó từ | 很, 不 |
| `gioi-tu` | Giới từ | 在, 从 |
| `lien-tu` | Liên từ | 和 |
| `tro-tu` | Trợ từ | 的, 了, 吗 |
| `nang-dong-tu` | Động từ năng nguyện | 想, 会, 能 |
| `cum-chao` | Cụm chào hỏi / thành ngữ giao tiếp | 你好, 再见 |
