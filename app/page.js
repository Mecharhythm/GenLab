"use client";

import { useMemo, useState } from "react";

const MODES = [
  {
    key: "story",
    label: "黒歴史メーカー",
    accent: "mode-story",
    title: "盛りすぎた思い出を、フィクションとして整える",
    description:
      "誇張された過去エピソードを、ネタとして軽く楽しめる文章にします。実在の人物名や団体名は入れない前提です。",
    placeholder: "例: 中学の文化祭でギターを弾こうとして失敗した",
  },
  {
    key: "excuse",
    label: "やわらか言い換え",
    accent: "mode-excuse",
    title: "角を立てずに事情を伝える",
    description:
      "遅刻や返信遅れなどを、言い訳ではなくやわらかい説明文として整えます。",
    placeholder: "例: 返信が遅くなった / 締切に少し遅れそう",
  },
  {
    key: "tease",
    label: "軽口ジェネレーター",
    accent: "mode-tease",
    title: "攻撃ではなく、冗談で返す",
    description:
      "相手を傷つけにくい、軽めのツッコミ文を作ります。個人攻撃や差別的な内容は出さない方針です。",
    placeholder: "例: いつも準備がギリギリ / 机の上だけ異世界",
  },
];

const storyTemplates = [
  "あのときの私は、{preview}だけで人生の主役になれると本気で信じていた。今思うと勢いだけは完璧だった。",
  "{preview}の件、当時は伝説の始まりだと思っていたけれど、今なら穏やかに黒歴史フォルダへ保存できる。",
  "{preview}をやった日の自分、自己評価だけは世界大会クラスだった。反省より先に懐かしさがくるタイプの思い出。",
  "昔の私は{preview}で空気を変えられると思っていた。結果として変わったのは周囲の表情だった。",
  "{preview}に全力投球していた頃の自分へ。熱量は本物だったし、今見ると少しだけ愛おしい。",
];

const excuseTemplates = [
  "{preview}の件、確認に少し時間がかかっていました。お待たせしてしまいすみません。",
  "{preview}については、急ぎつつも正確さを優先していました。共有が遅れてしまって失礼しました。",
  "{preview}の対応を進めていたため、ご連絡が後ろ倒しになりました。ここから巻き返します。",
  "{preview}に想定より時間を使ってしまい、反応が遅くなりました。以後は先に一報を入れます。",
  "{preview}を優先していた影響で遅れが出ました。ご迷惑をおかけした分、次の動きは早めます。",
];

const teaseTemplates = [
  "{preview}って、もはや様式美なんですよね。毎回ちょっとだけ期待してしまう。",
  "{preview}の安定感、逆に才能かもしれません。ここまで来ると芸風です。",
  "{preview}を見るたびに、時間の流れって自由なんだなと思わされます。",
  "{preview}、雑さではなく独自の美学として受け取ると急に味が出ますね。",
  "{preview}の破壊力、怒るより先に笑ってしまうちょうどよさがあります。",
];

const blockedTerms = [
  "殺",
  "死",
  "自殺",
  "暴力",
  "レイプ",
  "差別",
  "障害者",
  "黒人",
  "白人",
  "住所",
  "電話",
  "学校名",
  "会社名",
  "@",
  "http://",
  "https://",
];

function getPreview(input) {
  return input.trim().replace(/\s+/g, " ").slice(0, 36);
}

function containsBlockedTerm(input) {
  return blockedTerms.some((term) => input.includes(term));
}

function detectPersonalInfo(input) {
  const hasPhone = /\d{2,4}-\d{2,4}-\d{3,4}/.test(input);
  const hasLongNumber = /\d{7,}/.test(input);
  return hasPhone || hasLongNumber;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function buildResult(mode, input) {
  const preview = getPreview(input || "うまく言葉にしづらい出来事");
  const map = {
    story: storyTemplates,
    excuse: excuseTemplates,
    tease: teaseTemplates,
  };

  return pickRandom(map[mode]).replaceAll("{preview}", preview);
}

export default function Page() {
  const [mode, setMode] = useState("story");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [warning, setWarning] = useState("");

  const currentMode = useMemo(
    () => MODES.find((item) => item.key === mode) ?? MODES[0],
    [mode],
  );

  const handleGenerate = () => {
    const trimmed = input.trim();

    if (!trimmed) {
      setWarning("短い状況説明を入れると、自然な文章になりやすいです。");
      setResult(buildResult(mode, ""));
      return;
    }

    if (detectPersonalInfo(trimmed) || containsBlockedTerm(trimmed)) {
      setWarning(
        "個人情報や攻撃的な表現が含まれる可能性があるため、そのままでは生成しません。内容をぼかして入力してください。",
      );
      setResult("");
      return;
    }

    setWarning("");
    setResult(buildResult(mode, trimmed));
  };

  const handleCopy = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const handlePost = () => {
    if (!result) return;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(result)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Creative text lab</p>
          <h1>GenLab</h1>
          <p className="lead">
            ネタ文章をつくる小さな実験室。遊び心は残しつつ、実在の誰かを傷つけにくい出力に寄せています。
          </p>
        </div>

        <div className="hero-panel">
          <p className="panel-label">Safety note</p>
          <ul className="safety-list">
            <li>実名、連絡先、学校名や会社名は入れない</li>
            <li>誹謗中傷や差別的な表現には使わない</li>
            <li>公開前に自分で文面を確認する</li>
          </ul>
        </div>
      </section>

      <section className="workspace-card">
        <div className="mode-grid" role="tablist" aria-label="generation modes">
          {MODES.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`mode-button ${mode === item.key ? `${item.accent} active` : ""}`}
              onClick={() => {
                setMode(item.key);
                setWarning("");
              }}
              aria-pressed={mode === item.key}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mode-copy">
          <h2>{currentMode.title}</h2>
          <p>{currentMode.description}</p>
        </div>

        <label className="input-label" htmlFor="prompt">
          元になる状況
        </label>
        <textarea
          id="prompt"
          className="prompt-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={currentMode.placeholder}
          maxLength={140}
        />

        <div className="toolbar">
          <p className="char-count">{input.trim().length}/140</p>
          <button type="button" className="primary-button" onClick={handleGenerate}>
            文章をつくる
          </button>
        </div>

        {warning ? <p className="warning-box">{warning}</p> : null}

        <div className="result-card" aria-live="polite">
          <p className="result-label">生成結果</p>
          <p className="result-text">
            {result || "ここに生成結果が表示されます。入力がなくても試作文は出せます。"}
          </p>
        </div>

        <div className="action-row">
          <button type="button" className="secondary-button" onClick={handleCopy} disabled={!result}>
            {copied ? "コピーしました" : "コピー"}
          </button>
          <button type="button" className="secondary-button" onClick={handlePost} disabled={!result}>
            X に下書きを開く
          </button>
        </div>

        <div className="notice-card">
          <p className="result-label">利用上の注意</p>
          <p className="notice-text">
            これは創作補助ツールです。実在の個人や団体を特定できる文面、名誉を傷つける表現、差別的な表現、虚偽の断定表現には使わないでください。
            公開前に必ず内容を見直してください。
          </p>
        </div>
      </section>
    </main>
  );
}
