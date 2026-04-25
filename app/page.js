"use client";
import { useState } from "react";

/* =======================
黒歴史（フル）
======================= */
const blackHistories = [
`あなたの黒歴史

特異点として世界線に干渉した

別に何も変わってはない`,

`あなたの黒歴史

プロトコル違反で力が制限されてる状態だと思ってた

元々何もできない`,

`あなたの黒歴史

上位存在に監視されてると思い生活してた

特に誰も見てない`,

`あなたの黒歴史

コードネーム“Eclipse”として裏で動いてた

誰にも呼ばれてない`,

`あなたの黒歴史

能力の解放条件を満たしてないだけだと思ってた

能力なんてない`,

`あなたの黒歴史

観測されると能力が制限されるタイプだった

別に変わらない`,

`あなたの黒歴史

この世界は再構築される前提で動いてた

されてない`,

`あなたの黒歴史

選ばれし｢例外｣だった

全くそんなことはない`,

`あなたの黒歴史

全ての事象には裏ログがあると理解していた

ない`
];

/* =======================
言い訳（修正済み）
======================= */
const excuses = [
`品質最適化のための非常に高度な戦略的判断です`,
`外部要因の影響を鑑みた結果です`,
`想定内の大遅延です`,
`仕様上の制約です`,
`優先順位調整の一環です`
];

/* =======================
雑レビュー（統一）
======================= */
const roasts = [
`なんか良さそうではあるし

多分だれかは使いそう

知らんけど`,

`一瞬いいと思ったけど
どうでもいいかもしれない気もする`,

`普通にすごい気はする

気はするだけだし

知らんけど`,

`これ好きな人は好きそう

自分ではない

知らんけど`,

`ちゃんとしてるっぽさはありそうな気がする
よく分からんけど`,

`完成度は高いと思う

だから何って感じもする

知らんけど`,

`いい感じな気がする
理由？まあ…なんとなく`,

`使えば分かるタイプな気がする

別に使わないけど`,

`なんか惜しい

何がかは分からない`,

`見た目はいい

それ以外は知らない`,

`一応いいと思う

一応ね

知らんけど`,

`嫌いじゃない

でも好きでもない

知らんけど`,

`よくできてる気がする

ちゃんとは見てないけど`,

`方向性は合ってると思う

勘だけど`,

`これハマる人いると思う

多分遠くに`,

`俺一回見たら満足するタイプだから

まあいいんじゃね

知らんけど`,

`なんか前にも見た気がする

思い出せないけど`,

`悪くはない

よくもない

まぁいいんじゃね

知らんけど`,

`こういうのもいいのかもしれない

知らんけど`,

`とりあえず行けてる感はある

知らんけど`
];

/* ======================= */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* =======================
入力ちょい拾い
======================= */
function getPreview(input) {
  if (!input) return "";
  const t = input.trim();
  if (!t) return "";
  const len = Math.floor(Math.random() * 7) + 4;
  return t.slice(0, len);
}

function generateRoast(input) {
  const base = pick(roasts);
  if (!input || Math.random() < 0.5) return base;

  return `「${getPreview(input)}...」

${base}`;
}

function generateExcuse(input) {
  const base = pick(excuses);
  if (!input || Math.random() < 0.6) return base;

  return `「${getPreview(input)}...」については

${base}`;
}

/* =======================
UI
======================= */
export default function Page() {
  const [mode, setMode] = useState("black");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (mode === "black") setResult(pick(blackHistories));
    if (mode === "excuse") setResult(generateExcuse(input));
    if (mode === "roast") setResult(generateRoast(input));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const openX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(result)}`;
    window.open(url, "_blank");
  };

  return (
  <main className="min-h-screen bg-gradient-to-br from-[#022C22] via-[#064E3B] to-[#021412] flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-[#031B16]/80 backdrop-blur-xl border border-[#065F46] rounded-2xl shadow-2xl p-6">

      {/* タイトル */}
      <h1 className="text-2xl font-bold text-[#6EE7B7] tracking-wide">
        GenLab
      </h1>
      <p className="text-xs text-[#34D399] mt-1 opacity-80">
        なんかそれっぽい結果が出るやつ
      </p>

      {/* モード切替 */}
      <div className="flex gap-2 mt-6">
        {[
          { key: "black", label: "黒歴史" },
          { key: "excuse", label: "言い訳" },
          { key: "roast", label: "雑レビュー" }
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`flex-1 py-2 rounded-lg text-sm border transition-all duration-200 ${
              mode === m.key
                ? "bg-[#10B981] text-black border-[#10B981] shadow-lg shadow-green-500/30"
                : "bg-transparent text-[#6EE7B7] border-[#065F46] hover:bg-[#064E3B]"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* 入力欄 */}
      {mode !== "black" && (
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "excuse"
              ? "何に対する言い訳か一応書ける"
              : "レビューしてほしい内容（多分読まれない）"
          }
          className="w-full mt-4 p-3 rounded-lg bg-[#022C22] border border-[#065F46] text-[#D1FAE5] placeholder:text-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
        />
      )}

      {/* 生成ボタン */}
      <button
        onClick={generate}
        className="w-full mt-4 bg-gradient-to-r from-[#10B981] to-[#34D399] hover:opacity-90 text-black py-3 rounded-lg font-semibold tracking-wide shadow-lg shadow-green-500/30"
      >
        生成する
      </button>

      {/* 結果 */}
      {result && (
        <div className="mt-6">
          <div className="p-5 text-[#D1FAE5] whitespace-pre-line bg-[#021412] border border-[#065F46] rounded-xl shadow-inner text-sm leading-relaxed">
            {result}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={copy}
              className="flex-1 bg-[#10B981] hover:bg-[#059669] text-black py-2 rounded-lg font-medium"
            >
              {copied ? "コピーした" : "コピー"}
            </button>

            <button
              onClick={openX}
              className="flex-1 border border-[#065F46] text-[#6EE7B7] py-2 rounded-lg hover:bg-[#064E3B]"
            >
              Xで開く
            </button>
          </div>
        </div>
      )}

    </div>
  </main>
);
