"use client";
import { useState } from "react";

const blackHistories = [
  `あなたの黒歴史\n\n特異点として世界線に干渉した\n\n別に何も変わってはない`,
  `あなたの黒歴史\n\nプロトコル違反で力が制限されてる状態だと思ってた\n\n元々何もできない`,
  `あなたの黒歴史\n\n上位存在に監視されてると思い生活してた\n\n特に誰も見てない`,
  `あなたの黒歴史\n\nコードネーム"Eclipse"として裏で動いてた\n\n誰にも呼ばれてない`,
  `あなたの黒歴史\n\n能力の解放条件を満たしてないだけだと思ってた\n\n能力なんてない`,
  `あなたの黒歴史\n\n観測されると能力が制限されるタイプだった\n\n別に変わらない`,
  `あなたの黒歴史\n\nこの世界は再構築される前提で動いてた\n\nされてない`,
  `あなたの黒歴史\n\n選ばれし｢例外｣だった\n\n全くそんなことはない`,
  `あなたの黒歴史\n\n全ての事象には裏ログがあると理解していた\n\nない`,
];

const excuses = [
  `品質最適化のための非常に高度な戦略的判断です`,
  `外部要因の影響を鑑みた結果です`,
  `想定内の大遅延です`,
  `仕様上の制約です`,
  `優先順位調整の一環です`,
];

const roasts = [
  `なんか良さそうではあるし\n\n多分だれかは使いそう\n\n知らんけど`,
  `一瞬いいと思ったけど\nどうでもいいかもしれない気もする`,
  `普通にすごい気はする\n\n気はするだけだし\n\n知らんけど`,
  `これ好きな人は好きそう\n\n自分ではない\n\n知らんけど`,
  `ちゃんとしてるっぽさはありそうな気がする\nよく分からんけど`,
  `完成度は高いと思う\n\nだから何って感じもする\n\n知らんけど`,
  `いい感じな気がする\n理由？まあ…なんとなく`,
  `使えば分かるタイプな気がする\n\n別に使わないけど`,
  `なんか惜しい\n\n何がかは分からない`,
  `見た目はいい\n\nそれ以外は知らない`,
  `一応いいと思う\n\n一応ね\n\n知らんけど`,
  `嫌いじゃない\n\nでも好きでもない\n\n知らんけど`,
  `よくできてる気がする\n\nちゃんとは見てないけど`,
  `方向性は合ってると思う\n\n勘だけど`,
  `これハマる人いると思う\n\n多分遠くに`,
  `俺一回見たら満足するタイプだから\n\nまあいいんじゃね\n\n知らんけど`,
  `なんか前にも見た気がする\n\n思い出せないけど`,
  `悪くはない\n\nよくもない\n\nまぁいいんじゃね\n\n知らんけど`,
  `こういうのもいいのかもしれない\n\n知らんけど`,
  `とりあえず行けてる感はある\n\n知らんけど`,
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
  return `「${getPreview(input)}...」\n\n${base}`;
}
function generateExcuse(input) {
  const base = pick(excuses);
  if (!input || Math.random() < 0.6) return base;
  return `「${getPreview(input)}...」については\n\n${base}`;
}

const MODES = [
  { key: "black", label: "黒歴史メーカー", emoji: "📓", placeholder: "" },
  { key: "excuse", label: "言い訳",          emoji: "🪄", placeholder: "何に対する言い訳か一応書ける" },
  { key: "roast", label: "くそ雑レビュー",  emoji: "🔥", placeholder: "レビューしてほしい内容（多分読まれない）" },
];

export default function Page() {
  const [mode, setMode]       = useState("black");
  const [input, setInput]     = useState("");
  const [result, setResult]   = useState("");
  const [copied, setCopied]   = useState(false);
  const [loading, setLoading] = useState(false);
  const current = MODES.find(m => m.key === mode) || MODES[0];

  const generate = async () => {
    setLoading(true); setResult("");
    await new Promise(r => setTimeout(r, 500));
    if (mode === "black")  setResult(pick(blackHistories));
    if (mode === "excuse") setResult(generateExcuse(input));
    if (mode === "roast")  setResult(generateRoast(input));
    setLoading(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const openX = () => window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(result)}`, "_blank"
  );

  return (
    <>
      <style>{`
        :root {
          --T:   #a03c28;
          --T1:  #b84e38;
          --T2:  #7e2e1c;
          --C:   #f0dcc8;
          --C1:  #faf3e8;
          --C2:  #e0c8a8;
          --C3:  #cdb48c;
          --tx:  #2a1008;
          --txm: #7a4830;
          --txd: #b09070;
        }
        .hero {
          background: var(--T);
          padding: 52px 28px 44px;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          border: 60px solid rgba(240,220,200,0.08);
          top: -80px; right: -80px;
          pointer-events: none;
        }
        .hero::after {
          content: '';
          position: absolute;
          width: 180px; height: 180px;
          border-radius: 50%;
          border: 40px solid rgba(240,220,200,0.06);
          bottom: -40px; left: 40px;
          pointer-events: none;
        }
        .hero-inner {
          max-width: 520px; margin: 0 auto;
          position: relative; z-index: 1;
        }
        .logo-name {
          font-family: 'DM Serif Display', serif;
          font-size: 38px; font-weight: 400;
          color: var(--C);
          letter-spacing: -0.5px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.15);
        }
        .tagline {
          font-size: 16px;
          font-family: 'DM Serif Display', serif;
          color: rgba(240,220,200,0.92);
          line-height: 1.6; font-weight: 400;
          margin-top: 8px;
        }
        .hero-link {
          display: inline-block;
          margin-top: 16px;
          font-family: 'Space Mono', monospace;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.05em;
          text-decoration: none;
          background: linear-gradient(90deg, #ff9a9a, #ffcc80, #fff176, #a5d6a7, #90caf9, #ce93d8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          padding-bottom: 2px;
          transition: opacity 0.15s;
        }
        .hero-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0; right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #ff9a9a, #ffcc80, #fff176, #a5d6a7, #90caf9, #ce93d8);
          border-radius: 2px;
        }
        .hero-link:hover { opacity: 0.75; }
        .body {
          max-width: 520px; margin: 0 auto;
          padding: 36px 28px 96px;
        }
        .notice {
          background: #fffaf7;
          border: 1px solid #e8cfc4;
          border-left: 3px solid var(--T);
          border-radius: 10px;
          padding: 16px 20px; margin-bottom: 36px;
        }
        .notice-title {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.14em;
          color: var(--T); text-transform: uppercase;
          margin-bottom: 10px;
        }
        .notice ul { list-style: none; }
        .notice li { font-size: 13px; color: var(--txm); line-height: 1.6; }
        .tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
        .tab {
          padding: 9px 18px;
          border: 1.5px solid var(--C3);
          background: var(--C1);
          color: var(--txm);
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 13px; font-weight: 500;
          border-radius: 100px; cursor: pointer;
          transition: all 0.15s ease; white-space: nowrap;
        }
        .tab:hover { border-color: var(--T); color: var(--T); background: white; }
        .tab.active {
          background: var(--T); border-color: var(--T);
          color: var(--C);
          box-shadow: 0 3px 12px rgba(160,60,40,0.28);
        }
        .card {
          background: #fffaf7;
          border: 1.5px solid #e8cfc4;
          border-radius: 16px; padding: 30px;
          box-shadow: 0 1px 0 rgba(255,255,255,0.8) inset, 0 4px 24px rgba(160,60,40,0.08);
        }
        .panel-title {
          font-family: 'DM Serif Display', serif;
          font-size: 19px; font-weight: 400;
          color: var(--T2); margin-bottom: 8px;
          display: flex; align-items: center; gap: 8px;
        }
        .panel-desc {
          font-size: 12.5px; color: var(--txm);
          line-height: 1.85; font-weight: 300; margin-bottom: 24px;
        }
        .field-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.13em;
          color: var(--txd); text-transform: uppercase;
          display: block; margin-bottom: 7px;
        }
        .input-wrap { position: relative; margin-bottom: 18px; }
        textarea {
          width: 100%;
          background: #e8cfc6;
          border: 1.5px solid var(--C2);
          border-radius: 10px; color: var(--tx);
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 14px; line-height: 1.75;
          padding: 12px 14px 30px;
          resize: none; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          min-height: 88px;
        }
        textarea::placeholder { color: var(--txd); }
        textarea:focus {
          border-color: var(--T);
          box-shadow: 0 0 0 3px rgba(160,60,40,0.12);
          background: white;
        }
        .char-count {
          position: absolute; bottom: 9px; right: 11px;
          font-family: 'Space Mono', monospace;
          font-size: 9px; color: var(--txd); pointer-events: none;
        }
        .btn-generate {
          width: 100%; padding: 14px;
          background: var(--T); color: var(--C);
          border: none; border-radius: 10px;
          font-family: 'DM Serif Display', serif;
          font-size: 16px; font-weight: 400;
          cursor: pointer; transition: all 0.15s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-bottom: 22px;
          box-shadow: 0 4px 18px rgba(160,60,40,0.30);
          letter-spacing: 0.02em;
        }
        .btn-generate:hover:not(:disabled) {
          background: var(--T1);
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(160,60,40,0.38);
        }
        .btn-generate:active:not(:disabled) { transform: none; box-shadow: 0 2px 8px rgba(160,60,40,0.2); }
        .btn-generate:disabled { opacity: 0.55; cursor: default; }
        .sep {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--C2), transparent);
          margin-bottom: 20px;
        }
        .result-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .result-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.13em;
          color: var(--T); text-transform: uppercase;
        }
        .result-line { flex: 1; height: 1px; background: rgba(160,60,40,0.15); }
        .result-box {
          background: #e8cfc6;
          border: 1px solid var(--C2);
          border-radius: 10px; padding: 18px 20px;
          min-height: 72px;
        }
        .result-text {
          font-size: 14px; line-height: 2;
          color: var(--txd); white-space: pre-wrap;
        }
        .result-text.filled { color: var(--tx); }
        .actions { display: flex; gap: 8px; margin-top: 14px; }
        .btn-copy {
          flex: 1; padding: 11px; border-radius: 8px;
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 13px; font-weight: 500; cursor: pointer;
          background: var(--T); color: var(--C); border: none;
          transition: background 0.14s;
        }
        .btn-copy:hover { background: var(--T1); }
        .btn-x {
          flex: 1; padding: 11px; border-radius: 8px;
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 13px; font-weight: 500; cursor: pointer;
          background: transparent; color: var(--txm);
          border: 1.5px solid var(--C2); transition: all 0.14s;
        }
        .btn-x:hover { border-color: var(--T); color: var(--T); }
        .disclaimer {
          margin-top: 16px; padding: 13px 17px;
          background: #e8cfc6; border: 1px solid var(--C2);
          border-radius: 10px;
          font-size: 11px; color: var(--txd); line-height: 1.8;
        }
        .footer {
          margin-top: 60px;
          padding: 24px 0 0;
          border-top: 1px solid #e0c8c0;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          flex-wrap: wrap;
        }
        .footer-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--T); opacity: 0.35; }
        .footer-text {
          font-family: 'Space Mono', monospace;
          font-size: 10px; color: var(--txd); letter-spacing: 0.05em;
        }
        .footer-link {
          font-family: 'Space Mono', monospace;
          font-size: 11px; letter-spacing: 0.05em; font-weight: 700;
          text-decoration: none;
          background: linear-gradient(90deg, #e05a5a, #e08c2a, #d4c020, #4caf50, #2196f3, #9c27b0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative; padding-bottom: 2px;
          transition: opacity 0.15s;
        }
        .footer-link::after {
          content: '';
          position: absolute; left: 0; bottom: 0; right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #e05a5a, #e08c2a, #d4c020, #4caf50, #2196f3, #9c27b0);
          border-radius: 2px;
        }
        .footer-link:hover { opacity: 0.8; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(240,220,200,0.4);
          border-top-color: var(--C);
          border-radius: 50%; animation: spin 0.7s linear infinite;
        }
      `}</style>

      <div className="hero">
        <div className="hero-inner">
          <div className="logo-name">GenLab</div>
          <p className="tagline">生成には人工無能を使用しています</p>
          <a className="hero-link" href="https://salescast.vercel.app" target="_blank" rel="noopener noreferrer">
            同じ作者の別サービス → SalesCast
          </a>
        </div>
      </div>

      <div className="body">
        <div className="notice">
          <div className="notice-title">ご利用の作法</div>
          <ul>
            <li>入力、出力内容に関するトラブルは受け付けません。</li>
          </ul>
        </div>

        <div className="tabs">
          {MODES.map(m => (
            <button
              key={m.key}
              className={`tab${mode === m.key ? " active" : ""}`}
              onClick={() => { setMode(m.key); setResult(""); setInput(""); }}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        <div className="card">
          <div className="panel-title">
            <span>{current.emoji}</span>{current.label}
          </div>

          {mode === "black"  && <p className="panel-desc">あなたの黒歴史を捏造します</p>}
          {mode === "excuse" && <p className="panel-desc">誤魔化すことが得意な人工無能が言い訳を錬成します</p>}
          {mode === "roast"  && <p className="panel-desc">何でも雑にレビューします。何か書いてもいいですが1行くらいしか読みません</p>}

          {mode !== "black" && (
            <>
              <label className="field-label">{mode === "excuse" ? "言い訳が必要な状況" : "レビュー対象"}</label>
              <div className="input-wrap">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value.slice(0, 140))}
                  placeholder={current.placeholder}
                  rows={3}
                />
                <span className="char-count">{input.length} / 140</span>
              </div>
            </>
          )}

          <button className="btn-generate" onClick={generate} disabled={loading}>
            {loading ? <><div className="spinner" />&nbsp;実験中...</> : "⚡ 生成する"}
          </button>

          <div className="sep" />
          <div className="result-header">
            <span className="result-label">生成結果</span>
            <div className="result-line" />
          </div>
          <div className="result-box">
            <div className={`result-text${result ? " filled" : ""}`}>
              {result || "ここに生成結果が表示されます。お試しあれ。"}
            </div>
          </div>

          {result && (
            <div className="actions">
              <button className="btn-copy" onClick={copy}>{copied ? "コピーした ✓" : "コピー"}</button>
              <button className="btn-x" onClick={openX}>X でシェア</button>
            </div>
          )}
        </div>

        <div className="disclaimer">
          入力、出力内容に関するトラブルは受け付けません。
        </div>

        <footer className="footer">
          <span className="footer-text">GenLab</span>
          <div className="footer-dot" />
          <span className="footer-text">テンプレートベース生成・AI不使用</span>
          <div className="footer-dot" />
          <a className="footer-link" href="https://salescast.vercel.app" target="_blank" rel="noopener noreferrer">
            同じ作者の別サービス → SalesCast
          </a>
        </footer>
      </div>
    </>
  );
}
