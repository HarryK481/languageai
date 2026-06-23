# LanguageAI — Learn Chinese the HSK Way

A web app that helps Vietnamese speakers **learn Chinese** following the official **HSK** standard (Hanyu Shuiping Kaoshi, the standardized Chinese proficiency exam). Content is organized around three pillars and split by level from **HSK 1 to HSK 6**:

- **Vocabulary** (词语)
- **Grammar** (语法)
- **Conversation** (会话)

> **Status:** Design phase. The `docs/` folder contains the full design spec (written in Vietnamese); a minimal Next.js scaffold is in place. **Phase 1** ships complete HSK 1 content plus a ready-made framework for HSK 2–6.

## Why this project

Most tools force learners to juggle several apps and explain everything in English. LanguageAI targets the gaps:

1. **Three pillars in one place** — vocabulary, grammar, and conversation per HSK level, no app-hopping.
2. **100% Vietnamese explanations** — every meaning, note, and example is in Vietnamese.
3. **Built-in SRS flashcards** — pre-made decks per HSK level with spaced repetition, so learners review just before forgetting without building their own decks.
4. **A clear level-by-level path** — something dictionaries don't offer.
5. **Free and web-based** — nothing to install.

## Target users

| Group | Main need |
|-------|-----------|
| Vietnamese beginners | Core vocabulary, pinyin, pronunciation, Vietnamese meanings |
| HSK test-takers | Study the exact official word/grammar lists per level |
| Self-reviewers | Flashcards, quizzes, conversation practice |

## Features

### P0 — Core (MVP)
- Home page with HSK 1–6 level selection
- Per-level overview (description, word count, links to the three sections)
- **Vocabulary** lists (hanzi, pinyin, Vietnamese meaning, examples)
- **Grammar** pages (structure + explanation + examples)
- **Conversation** pages (dialogue lines with pinyin and translation)
- **Text-to-speech** pronunciation for words/sentences (zh-CN voice)
- Basic vocabulary search
- Responsive (mobile + desktop)

### P1 — Important
- **SRS flashcards** (spaced repetition) with pre-built decks per level/topic
- Multiple-choice **quizzes** (pick meaning, pick pinyin, listen-and-choose)
- Learning **progress** saved in `localStorage`
- Filter vocabulary by topic
- Hide/show pinyin or meaning for active recall

### P2 — Future
- User accounts + progress sync (requires DB + auth)
- Hanzi handwriting practice (stroke order)
- Pronunciation recognition
- Leaderboards / daily streaks
- HSK 3.0 content (9 levels)

## Tech stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | **Next.js 14+ (App Router)** | Strong SEO, static rendering of study content, easy to add APIs later |
| Language | **TypeScript** | Type safety as the dataset grows |
| Styling | **Tailwind CSS** | Fast, consistent UI |
| Content data | **JSON/MDX files in the repo** (Phase 1) | No DB needed, easy versioning and contribution via Git |
| Audio | **Web Speech API (TTS)** + optional mp3 | Pronunciation without extra infrastructure |
| Progress | **localStorage** (Phase 1) → DB later | Simple first, extensible later |
| Deploy | **Vercel** | Optimized for Next.js, free tier |

Later phases (accounts, progress sync) would add a **database** (PostgreSQL/Prisma) and **auth** (NextAuth).

## Project structure (planned)

```
LanguageAI/
├─ docs/               # Design documents
├─ public/audio/       # Pronunciation files (if used)
├─ src/
│  ├─ app/             # Next.js App Router
│  │  ├─ page.tsx      # Home
│  │  ├─ hsk/[level]/  # /hsk/1 ... /hsk/6 (tu-vung, ngu-phap, hoi-thoai)
│  │  ├─ flashcard/    # SRS practice
│  │  └─ quiz/         # Quizzes
│  ├─ components/      # Reusable UI (WordCard, GrammarBlock, ...)
│  ├─ data/            # HSK content as JSON/MDX (hsk1 ... hsk6)
│  └─ lib/             # Utilities (data loading, pinyin, TTS, progress)
├─ package.json
└─ next.config.js
```

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint
```

## Documentation

The full design spec lives in [docs/](docs/) (in Vietnamese):

| # | Document | Contents |
|---|----------|----------|
| 00 | [Overview](docs/00-tong-quan.md) | Goals, scope, audience, content principles |
| 01 | [Architecture](docs/01-kien-truc.md) | Stack, folder structure, data flow |
| 02 | [Data model](docs/02-mo-hinh-du-lieu.md) | Vocabulary / grammar / conversation / progress schema |
| 03 | [HSK content](docs/03-noi-dung-hsk.md) | Detailed HSK 1 scope + HSK 2–6 framework |
| 04 | [Features & screens](docs/04-tinh-nang.md) | Priorities, P0/P1/P2 features, screen descriptions |
| 05 | [Roadmap](docs/05-lo-trinh.md) | Phased delivery plan |
| 06 | [Competitor analysis](docs/06-phan-tich-doi-thu.md) | Survey of Chinese-learning apps and opportunity gaps |
