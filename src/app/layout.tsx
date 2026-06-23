import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "HanyuViet — Học tiếng Trung theo HSK",
  description:
    "Học tiếng Trung theo chuẩn HSK: từ vựng, ngữ pháp, hội thoại. Giải thích bằng tiếng Việt, flashcard, quiz, phát âm chuẩn.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <header className="sticky top-0 z-50 border-b-2 border-gray-100 bg-white">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-brand">
              <span className="text-2xl">🐼</span>
              <span>HanyuViet</span>
            </Link>
            <div className="flex items-center gap-1 text-sm font-semibold sm:gap-3">
              <Link href="/" className="rounded-xl px-3 py-2 text-gray-600 hover:bg-gray-100">
                Lộ trình
              </Link>
              <Link href="/flashcard" className="rounded-xl px-3 py-2 text-gray-600 hover:bg-gray-100">
                Flashcard
              </Link>
              <Link href="/quiz" className="rounded-xl px-3 py-2 text-gray-600 hover:bg-gray-100">
                Quiz
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="mt-12 border-t-2 border-gray-100 bg-white py-6 text-center text-sm text-gray-400">
          HanyuViet · Học tiếng Trung theo chuẩn HSK · Dữ liệu HSK 1 đầy đủ, HSK 2–6 đang cập nhật
        </footer>
      </body>
    </html>
  );
}
