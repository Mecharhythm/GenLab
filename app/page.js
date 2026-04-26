"use client";
import { useState } from "react";

const blackHistories = [
あなたの黒歴史\n\n特異点として世界線に干渉した\n\n別に何も変わってはない,
あなたの黒歴史\n\nプロトコル違反で力が制限されてる状態だと思ってた\n\n元々何もできない,
あなたの黒歴史\n\n上位存在に監視されてると思い生活してた\n\n特に誰も見てない,
あなたの黒歴史\n\nコードネーム"Eclipse"として裏で動いてた\n\n誰にも呼ばれてない,
あなたの黒歴史\n\n能力の解放条件を満たしてないだけだと思ってた\n\n能力なんてない,
あなたの黒歴史\n\n観測されると能力が制限されるタイプだった\n\n別に変わらない,
あなたの黒歴史\n\nこの世界は再構築される前提で動いてた\n\nされてない,
あなたの黒歴史\n\n選ばれし｢例外｣だった\n\n全くそんなことはない,
あなたの黒歴史\n\n全ての事象には裏ログがあると理解していた\n\nない,
];

const excuses = [
品質最適化のための非常に高度な戦略的判断です,
外部要因の影響を鑑みた結果です,
想定内の大遅延です,
仕様上の制約です,
優先順位調整の一環です,
];

const roasts = [
なんか良さそうではあるし\n\n多分だれかは使いそう\n\n知らんけど,
一瞬いいと思ったけど\nどうでもいいかもしれない気もする,
普通にすごい気はする\n\n気はするだけだし\n\n知らんけど,
これ好きな人は好きそう\n\n自分ではない\n\n知らんけど,
ちゃんとしてるっぽさはありそうな気がする\nよく分からんけど,
完成度は高いと思う\n\nだから何って感じもする\n\n知らんけど,
いい感じな気がする\n理由？まあ…なんとなく,
使えば分かるタイプな気がする\n\n別に使わないけど,
なんか惜しい\n\n何がかは分からない,
見た目はいい\n\nそれ以外は知らない,
一応いいと思う\n\n一応ね\n\n知らんけど,
嫌いじゃない\n\nでも好きでもない\n\n知らんけど,
よくできてる気がする\n\nちゃんとは見てないけど,
方向性は合ってると思う\n\n勘だけど,
これハマる人いると思う\n\n多分遠くに,
俺一回見たら満足するタイプだから\n\nまあいいんじゃね\n\n知らんけど,
なんか前にも見た気がする\n\n思い出せないけど,
悪くはない\n\nよくもない\n\nまぁいいんじゃね\n\n知らんけど,
こういうのもいいのかもしれない\n\n知らんけど,
とりあえず行けてる感はある\n\n知らんけど,
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getPreview(input) {
  const t = input.trim();
  if (!t) return "";
  return t.slice(0, Math.floor(Math.random() * 7) + 4);
}

function generateRoast(input) {
  const base = pick(roasts);
  if (!input || Math.random() < 0.5) return base;
  return 「${getPreview(input)}...」\n\n${base};
}

function generateExcuse(input) {
  const base = pick(excuses);
  if (!input || Math.random() < 0.6) return base;
  return 「${getPreview(input)}...」については\n\n${base};
}

const MODES = [
  { key: "black", label: "黒歴史メーカー", emoji: "📓", placeholder: "" },
  { key: "excuse", label: "言い訳", emoji: "🪄", placeholder: "何に対する言い訳か一応書ける" },
  { key: "roast", label: "くそ雑レビュー", emoji: "🔥", placeholder: "レビューしてほしい内容（多分読まれない）" },
];

const LOGO = "";

export default function Page() {
  const [mode, setMode] = useState("black");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const current = MODES.find(m => m.key === mode) || MODES[0];

  const generate = async () => {
    setLoading(true);
    setResult("");
    await new Promise(r => setTimeout(r, 500));
    if (mode === "black") setResult(pick(blackHistories));
    if (mode === "excuse") setResult(generateExcuse(input));
    if (mode === "roast") setResult(generateRoast(input));
    setLoading(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const openX = () => {
    window.open(
      https://twitter.com/intent/tweet?text=${encodeURIComponent(result)},
      "_blank"
    );
  };

  return (
    <>
      <style>{@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Noto+Sans+JP:wght@300;400;500&family=Space+Mono&display=swap'); *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } body { font-family: 'Noto Sans JP', sans-serif; background: #e8cfc6; } .hero { background: #a03c28; padding: 40px; color: white; } .body { max-width: 520px; margin: auto; padding: 24px; } .btn-generate { width: 100%; padding: 12px; margin-top: 10px; } .result-box { margin-top: 20px; padding: 16px; background: #fff; }      }</style>

      <div className="hero">
        <h1>GenLab</h1>
        <p>生成には人工無能を使用しています</p>
      </div>

      <div className="body">
        <div>
          {MODES.map(m => (
            <button key={m.key} onClick={() => setMode(m.key)}>
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        {mode !== "black" && (
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={current.placeholder}
          />
        )}

        <button className="btn-generate" onClick={generate}>
          生成する
        </button>

        <div className="result-box">
          <pre>{result}</pre>
        </div>

        {result && (
          <>
            <button onClick={copy}>
              {copied ? "コピーした" : "コピー"}
            </button>
            <button onClick={openX}>
              Xでシェア
            </button>
          </>
        )}
      </div>
    </>
  );
}
