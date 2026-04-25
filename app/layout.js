import "./globals.css";

export const metadata = {
  title: "GenLab",
  description: "遊び心のある文章を、配慮を持って生成する小さなテキスト実験室",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
