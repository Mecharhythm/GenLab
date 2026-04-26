import "./globals.css";

export const metadata = {
title: "GenLab － 人工無能による謎文章生成サイト",
description:
"黒歴史メーカー・言い訳・くそ雑レビュー。テンプレートベースのテキスト生成ツール。”,
};

export default function RootLayout({ children }) {
return (
<html lang=“ja” style={{ background: "#e8cfc6” }}>
<body style={{ background: "#e8cfc6”, margin: 0 }}>{children}</body>
</html>
);
}
