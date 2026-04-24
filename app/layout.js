export const metadata = {
  title: "GenLab",
  description: "なんかそれっぽい結果が出るやつ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
