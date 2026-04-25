import "./globals.css";

export const metadata = {
  title: "GenLab — ネタ文章の実験室",
  description:
    "黒歴史メーカー・言い訳・くそ雑レビュー。遊び心と配慮を両立するテンプレートベースのテキスト生成ツール。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
