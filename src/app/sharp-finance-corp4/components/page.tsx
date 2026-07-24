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

export default function ComponentsPage() {
  return (
    <>
      <ClientPortalHeader active="components" />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="mb-16">
          <h1 className="text-3xl font-bold text-[#333333] mb-3">
            コンポーネント
          </h1>
          <p className="text-[#333333]/70 leading-relaxed">
            ブランドカラーを反映した、実装にそのまま利用できるUIコンポーネント集です。
          </p>
        </section>

        {/* カラー参照セクション */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-[#333333] mb-6 pb-2 border-b-2 border-[#005BAC]/20">
            カラー
          </h2>
          <ColorRatioBar />
        </section>

        {/* ボタン */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-[#333333] mb-6 pb-2 border-b-2 border-[#005BAC]/20">
            ボタン
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#005BAC" }}
            >
              プライマリボタン
            </button>
            <button
              className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#F58220" }}
            >
              セカンダリボタン
            </button>
            <button
              className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#00A99D" }}
            >
              アクセントボタン
            </button>
            <button
              className="px-6 py-3 rounded-lg font-semibold border-2 transition-colors hover:bg-[#005BAC] hover:text-white"
              style={{ borderColor: "#005BAC", color: "#005BAC" }}
            >
              アウトラインボタン
            </button>
            <button
              className="px-6 py-3 rounded-lg font-semibold text-[#333333]/40 bg-gray-100 cursor-not-allowed"
              disabled
            >
              無効ボタン
            </button>
          </div>
        </section>

        {/* バッジ */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-[#333333] mb-6 pb-2 border-b-2 border-[#005BAC]/20">
            バッジ
          </h2>
          <div className="flex flex-wrap gap-3">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: "#005BAC" }}
            >
              信頼感
            </span>
            <span
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: "#00A99D" }}
            >
              成長
            </span>
            <span
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: "#F58220" }}
            >
              挑戦
            </span>
            <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-[#333333]">
              ニュートラル
            </span>
          </div>
        </section>

        {/* カード */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-[#333333] mb-6 pb-2 border-b-2 border-[#005BAC]/20">
            カード
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-lg transition-shadow">
              <div
                className="w-10 h-10 rounded-full mb-4"
                style={{ backgroundColor: "#005BAC" }}
              />
              <h3 className="font-bold text-[#333333] mb-2">法人向けサービス</h3>
              <p className="text-sm text-[#333333]/70 leading-relaxed">
                信頼性の高い金融ソリューションを提供します。
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-lg transition-shadow">
              <div
                className="w-10 h-10 rounded-full mb-4"
                style={{ backgroundColor: "#00A99D" }}
              />
              <h3 className="font-bold text-[#333333] mb-2">成長支援プラン</h3>
              <p className="text-sm text-[#333333]/70 leading-relaxed">
                事業の成長を後押しする柔軟なプランをご用意。
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-lg transition-shadow">
              <div
                className="w-10 h-10 rounded-full mb-4"
                style={{ backgroundColor: "#F58220" }}
              />
              <h3 className="font-bold text-[#333333] mb-2">新規事業支援</h3>
              <p className="text-sm text-[#333333]/70 leading-relaxed">
                新たな挑戦を全力でサポートいたします。
              </p>
            </div>
          </div>
        </section>

        {/* フォーム要素 */}
        <section>
          <h2 className="text-2xl font-bold text-[#333333] mb-6 pb-2 border-b-2 border-[#005BAC]/20">
            フォーム
          </h2>
          <div className="max-w-md rounded-xl border border-gray-200 p-8 bg-white space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                会社名
              </label>
              <input
                type="text"
                placeholder="株式会社サンプル"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#005BAC]/30 focus:border-[#005BAC] text-[#333333]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#333333] mb-2">
                お問い合わせ内容
              </label>
              <textarea
                placeholder="ご相談内容をご記入ください"
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#005BAC]/30 focus:border-[#005BAC] text-[#333333]"
              />
            </div>
            <button
              className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#005BAC" }}
            >
              送信する
            </button>
          </div>
        </section>
      </main>
    </>
  );
}