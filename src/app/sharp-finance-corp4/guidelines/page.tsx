import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const colorRatios = [
  { hex: "#005BAC", label: "Primary Blue", ratio: 45 },
  { hex: "#F58220", label: "Accent Orange", ratio: 15 },
  { hex: "#00A99D", label: "Secondary Green", ratio: 10 },
  { hex: "#333333", label: "Text Black", ratio: 20 },
  { hex: "#FFFFFF", label: "Background White", ratio: 10 },
];

function ColorRatioBar() {
  return (
    <div className="w-full mb-10">
      <div className="w-full flex rounded-lg overflow-hidden h-16 border border-gray-200">
        {colorRatios.map((c) => (
          <div
            key={c.hex}
            style={{
              width: `${c.ratio}%`,
              backgroundColor: c.hex,
            }}
            className="h-full"
            title={`${c.label} ${c.ratio}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-3">
        {colorRatios.map((c) => (
          <div key={c.hex} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full border border-gray-300"
              style={{ backgroundColor: c.hex }}
            />
            <span className="font-mono text-[#333333]/80">{c.hex}</span>
            <span className="text-[#333333]/50">{c.ratio}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const colorCards = [
  {
    name: "プライマリカラー",
    hex: "#005BAC",
    desc: "コーポレートロゴの青系統。信頼感と堅実さを象徴するメインカラー。",
  },
  {
    name: "セカンダリカラー",
    hex: "#F58220",
    desc: "ロゴの橙色寄りアクセントカラー。親しみやすさと活力を演出。",
  },
  {
    name: "アクセントカラー",
    hex: "#00A99D",
    desc: "補助的に使われる明るいグリーン系。成長と挑戦を表現。",
  },
  {
    name: "テキストカラー",
    hex: "#333333",
    desc: "標準的な濃いグレー／黒。可読性を重視した本文用カラー。",
  },
  {
    name: "背景色",
    hex: "#FFFFFF",
    desc: "白を基調とした背景。清潔感と余白の美しさを演出。",
  },
];

export default function GuidelinesPage() {
  return (
    <>
      <ClientPortalHeader active="guidelines" />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="mb-16">
          <h1 className="text-3xl font-bold text-[#333333] mb-3">
            ガイドライン
          </h1>
          <p className="text-[#333333]/70 leading-relaxed">
            ブランドの一貫性を保つための、カラー・タイポグラフィ・トンマナの基本方針をまとめています。
          </p>
        </section>

        {/* カラーセクション */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-[#333333] mb-6 pb-2 border-b-2 border-[#005BAC]/20">
            ブランドカラー
          </h2>

          <ColorRatioBar />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colorCards.map((c) => (
              <div
                key={c.hex}
                className="rounded-xl border border-gray-200 overflow-hidden bg-white"
              >
                <div
                  className="h-24 w-full"
                  style={{
                    backgroundColor: c.hex,
                    borderBottom: c.hex === "#FFFFFF" ? "1px solid #e5e7eb" : "none",
                  }}
                />
                <div className="p-5">
                  <h3 className="font-bold text-[#333333] mb-1">{c.name}</h3>
                  <p className="font-mono text-sm text-[#333333]/60 mb-2">{c.hex}</p>
                  <p className="text-sm text-[#333333]/70 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* タイポグラフィ */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-[#333333] mb-6 pb-2 border-b-2 border-[#005BAC]/20">
            タイポグラフィ
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 p-8 bg-white">
              <p className="text-sm text-[#005BAC] font-semibold mb-2">見出しフォント</p>
              <p className="text-3xl font-bold text-[#333333] mb-3">
                成長と挑戦、その先へ
              </p>
              <p className="text-sm text-[#333333]/60">
                モダンで読みやすいサンセリフ体（ヒラギノ角ゴシック等）
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-8 bg-white">
              <p className="text-sm text-[#F58220] font-semibold mb-2">本文フォント</p>
              <p className="text-base text-[#333333] mb-3 leading-relaxed">
                私たちは信頼と成長を大切にし、お客様とともに新しい挑戦を続けてまいります。木の年輪のように、着実に社会へ広がる価値を提供します。
              </p>
              <p className="text-sm text-[#333333]/60">
                読みやすさ重視のサンセリフ体（メイリオ等）
              </p>
            </div>
          </div>
        </section>

        {/* トンマナ */}
        <section>
          <h2 className="text-2xl font-bold text-[#333333] mb-6 pb-2 border-b-2 border-[#005BAC]/20">
            トンマナ
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {["信頼感", "成長", "挑戦"].map((word, i) => (
              <div
                key={word}
                className="rounded-xl p-8 text-center text-white font-bold text-xl"
                style={{
                  backgroundColor: [
                    "#005BAC",
                    "#00A99D",
                    "#F58220",
                  ][i],
                }}
              >
                {word}
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-gray-200 p-8 bg-white">
            <p className="text-[#333333]/80 leading-relaxed">
              先進的かつ堅実なイメージ。木の年輪や三方よしの哲学を反映した「成長」と「社会貢献」を重視したデザインで、
              親しみやすさと誠実さを兼ね備える。法人向け金融サービスとして高級感とわかりやすさを両立し、
              時とともに広がる輪を象徴する円形モチーフが特徴的。
            </p>
          </div>
        </section>
      </main>
    </>
  );
}