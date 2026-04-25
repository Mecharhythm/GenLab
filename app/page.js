"use client";

import { useMemo, useState } from "react";

const MODES = [
  {
    key: "story",
    label: "黒歴史メーカー",
    icon: "📓",
    accent: "mode-story",
    title: "あの頃の全力、フィクションにして成仏させます",
    description:
      "誰にでもある「なぜあの時の自分はあんなに輝いていたのか」という記憶。実話ベースのフィクションとして、笑えるかたちに昇華します。※実在の人物名・団体名はご遠慮ください。",
    placeholder: "例: 中学の文化祭でバンドのボーカルに立候補して音程が全部行方不明だった",
  },
  {
    key: "excuse",
    label: "言い訳",
    icon: "🪄",
    accent: "mode-excuse",
    title: "あなたの「やらかし」に、文学的カバーをかけます",
    description:
      "遅刻、既読スルー、締切ブレイク。人類が繰り返してきた過ちに、ほんの少しの知性と誠意をトッピング。言い訳だとバレない言い訳、それが最高の言い訳です。",
    placeholder: "例: 寝坊して午前の会議を完全にすっ飛ばした",
  },
  {
    key: "review",
    label: "くそ雑レビュー",
    icon: "🔥",
    accent: "mode-review",
    title: "愛ゆえの雑さ、それがこのレビューの流儀",
    description:
      "映画、飯、日常、なんでもOK。語彙力の限界に挑みつつ、どこか愛を感じる雑レビューを生成します。悪意ゼロ、語彙力もゼロ。でも熱量だけは本物です。",
    placeholder: "例: 近所にできたラーメン屋 / 最近観た映画 / 今日の自分の仕事ぶり",
  },
];

const storyTemplates = [
  "あのときの私は、「{preview}」だけで人生のピークを迎えられると本気で信じていた。実際、勢いだけなら歴代トップだったと思う。",
  "「{preview}」の件、当時は伝説の第1話だと思っていた。今振り返ると、打ち切りエンドだった。でも連載していた事実は消えない。",
  "「{preview}」をやった日の自分、自己評価だけはバロンドール級だった。反省するより先に拍手したくなる、そういう黒歴史もある。",
  "昔の私は「{preview}」で世界を変えられると思っていた。変わったのは周囲の表情だけだったけど、あの熱量は今でも尊い。",
  "「{preview}」に命を懸けていた頃の自分へ。結果はさておき、お前のフルスイングは確かにかっこよかった。空振りだったけど。",
];

const excuseTemplates = [
  "「{preview}」の件ですが、私なりに宇宙の真理と向き合っておりました。その結果として対応が遅れた次第です。深くお詫び申し上げます。",
  "「{preview}」について、実は裏側で壮大な段取りを組んでおりました。表面上は何も動いていないように見えたかもしれませんが、水面下はかなり忙しかったんです。たぶん。",
  "「{preview}」の対応が遅れましたこと、心よりお詫びします。言い訳ではないのですが、時空の歪みのようなものがありまして。以後、歪みには気をつけます。",
  "「{preview}」に想定の3倍くらい時間を使ってしまいました。丁寧にやっていたと言えば聞こえはいいですが、正直に言うと段取りが下手でした。巻き返します。",
  "「{preview}」を優先していた関係で、すべてが後ろ倒しになりました。ご迷惑をおかけした分、ここから先は人が変わったかのように迅速に動きます。",
];

const reviewTemplates = [
  "「{preview}」、もうね、語彙力が追いつかない。「すごい」と「やばい」の無限ループ。でもそれでいいんです。感動に語彙力は要らない。",
  "「{preview}」の安定感がもはや国宝級。毎回同じ感想しか出てこないのは、それだけ完成されているということ。異論は認めるけど聞かない。",
  "「{preview}」を体験するたびに、言語化できない感情が胸に溜まる。レビューとしては最低の文章だが、好きなものに理由を求めるな。",
  "「{preview}」、正直に言うと「まあまあかな」と思って始めたら気づいたら3時間経ってた。これが沼というやつか。星は5つ中7です。",
  "「{preview}」のレビューを書こうとして20分経ったけど「よかった」しか出てこない。これは私の語彙力の問題ではなく、対象が良すぎるせいです。",
];

const blockedTerms = [
  "殺", "死ね", "自殺", "暴力",
  "レイプ", "差別", "障害者",
  "住所", "電話番号", "学校名", "会社名",
  "@", "http://", "https://",
];

function getPreview(input) {
  return input.trim().replace(/\s+/g, " ").slice(0, 40);
}

function containsBlockedTerm(input) {
  return blockedTerms.some((term) => input.includes(term));
}

function detectPersonalInfo(input) {
  const hasPhone = /\d{2,4}[-ー]\d{2,4}[-ー]\d{3,4}/.test(input);
  const hasLongNumber = /\d{7,}/.test(input);
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/.test(input);
  return hasPhone || hasLongNumber || hasEmail;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function buildResult(mode, input) {
  const preview = getPreview(input || "うまく言葉にしづらい何か");
  const map = {
    story: storyTemplates,
    excuse: excuseTemplates,
    review: reviewTemplates,
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
      setWarning("何か入力すると、もっといい感じの文章が出ます。空でも動きはしますが。");
      setResult(buildResult(mode, ""));
      return;
    }

    if (detectPersonalInfo(trimmed) || containsBlockedTerm(trimmed)) {
      setWarning(
        "⚠ 個人情報や不適切な表現が含まれている可能性があります。内容をぼかして入力してください。楽しく使うための唯一のルールです。",
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
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handlePost = () => {
    if (!result) return;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(result)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="page-shell">
      <header className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Creative Text Lab</p>
          <h1>
            Gen<span className="accent-text">Lab</span>
          </h1>
          <p className="lead">
            ネタ文章の小さな実験室。
            <br />
            遊び心は忘れず、でも誰かを傷つけない。
            <br />
            そのバランスを大事にしています。
          </p>
        </div>

        <div className="hero-panel">
          <p className="panel-label">⚗️ ご利用の作法</p>
          <ul className="safety-list">
            <li>
              <strong>実名・連絡先・団体名</strong>は入れない
            </li>
            <li>
              <strong>誹謗中傷・差別表現</strong>には使わない
            </li>
            <li>
              <strong>公開前に自分の目</strong>で必ず確認する
            </li>
          </ul>
        </div>
      </header>

      <section className="workspace-card">
        <div className="mode-grid" role="tablist" aria-label="生成モード選択">
          {MODES.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`mode-button ${mode === item.key ? `${item.accent} active` : ""}`}
              onClick={() => {
                setMode(item.key);
                setResult("");
                setWarning("");
              }}
              role="tab"
              aria-selected={mode === item.key}
            >
              <span className="mode-icon">{item.icon}</span>
              <span className="mode-label-text">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mode-copy">
          <h2>{currentMode.title}</h2>
          <p>{currentMode.description}</p>
        </div>

        <label className="input-label" htmlFor="prompt">
          ネタの種（お題を入力）
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
          <p className="char-count">
            <span className={input.trim().length > 120 ? "count-warn" : ""}>
              {input.trim().length}
            </span>
            /140
          </p>
          <button
            type="button"
            className="primary-button"
            onClick={handleGenerate}
          >
            <span className="btn-icon">⚡</span>
            生成する
          </button>
        </div>

        {warning ? <p className="warning-box">{warning}</p> : null}

        <div className={`result-card ${result ? "has-result" : ""}`} aria-live="polite">
          <p className="result-label">— 生成結果 —</p>
          <p className="result-text">
            {result || "ここに生成結果が表示されます。入力が空でもとりあえず動きます。お試しあれ。"}
          </p>
        </div>

        {result && (
          <div className="action-row">
            <button
              type="button"
              className="secondary-button"
              onClick={handleCopy}
            >
              {copied ? "✓ コピー完了" : "📋 コピー"}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={handlePost}
            >
              𝕏 にポストする
            </button>
          </div>
        )}

        <footer className="notice-card">
          <p className="notice-label">📌 利用上の注意</p>
          <p className="notice-text">
            これは創作補助ツールです。生成された文章はテンプレートベースのフィクションであり、事実を反映するものではありません。
            実在の個人・団体を特定できる文面、名誉を傷つける表現、差別的な表現、虚偽を事実として断定する用途には使用しないでください。
            <strong>公開前に必ず自分の目で内容をご確認ください。</strong>
          </p>
        </footer>
      </section>

      <p className="site-footer">
        GenLab — ネタ文章実験室 / テンプレートベース生成・AI不使用
      </p>
    </main>
  );
}
