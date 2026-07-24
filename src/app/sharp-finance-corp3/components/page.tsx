import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const colorRatios = [
  { hex: '#005bac', label: 'Primary Blue', ratio: 38 },
  { hex: '#007acc', label: 'Secondary Blue', ratio: 22 },
  { hex: '#f5a623', label: 'Accent Orange', ratio: 12 },
  { hex: '#333333', label: 'Text Black', ratio: 18 },
  { hex: '#ffffff', label: 'Background White', ratio: 10 },
];

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <ClientPortalHeader
        clientName="シャープファイナンス株式会社"
        basePath="/sharp-finance"
        active="components"
        primaryColor="#005bac"
      />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="mb-16 text-center">
          <p
            className="inline-block text-xs font-bold tracking-widest px-4 py-1 rounded-full mb-4"
            style={{ backgroundColor: '#007acc15', color: '#007acc' }}
          >
            UI COMPONENTS
          </p>
          <h1 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#005bac' }}>
            コンポーネント集
          </h1>
          <p className="text-[#333333] max-w-2xl mx-auto leading-relaxed">
            ブランドカラーを反映した基本UIパーツのサンプルです。
          </p>
        </section>

        {/* カラーセクション（共通横帯） */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 border-l-4 pl-4" style={{ borderColor: '#005bac', color: '#005bac' }}>
            カラー使用比率
          </h2>
          <div className="w-full mb-4">
            <div className="w-full h-16 flex rounded-lg overflow-hidden shadow-sm">
              {colorRatios.map((c) => (
                <div
                  key={c.hex}
                  style={{
                    width: `${c.ratio}%`,
                    backgroundColor: c.hex,
                    border: c.hex === '#ffffff' ? '1px solid #e5e5e5' : 'none',
                  }}
                />
              ))}
            </div>
            <div className="flex w-full mt-3">
              {colorRatios.map((c) => (
                <div key={c.hex} style={{ width: `${c.ratio}%` }} className="px-1 text-center">
                  <p className="text-xs font-bold text-[#333333]">{c.hex}</p>
                  <p className="text-[10px] text-gray-500">{c.ratio}%</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ボタン */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 border-l-4 pl-4" style={{ borderColor: '#005bac', color: '#005bac' }}>
            ボタン
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              className="px-6 py-3 rounded-lg text-white font-bold text-sm shadow-sm hover:opacity-90 transition"
              style={{ backgroundColor: '#005bac' }}
            >
              プライマリボタン
            </button>
            <button
              className="px-6 py-3 rounded-lg text-white font-bold text-sm shadow-sm hover:opacity-90 transition"
              style={{ backgroundColor: '#007acc' }}
            >
              セカンダリボタン
            </button>
            <button
              className="px-6 py-3 rounded-lg text-white font-bold text-sm shadow-sm hover:opacity-90 transition"
              style={{ backgroundColor: '#f5a623' }}
            >
              アクセントボタン
            </button>
            <button
              className="px-6 py-3 rounded-lg font-bold text-sm border-2 hover:bg-gray-50 transition"
              style={{ borderColor: '#005bac', color: '#005bac' }}
            >
              アウトラインボタン
            </button>
            <button
              className="px-6 py-3 rounded-lg font-bold text-sm text-gray-400 bg-gray-100 cursor-not-allowed"
              disabled
            >
              無効ボタン
            </button>
          </div>
        </section>

        {/* カード */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 border-l-4 pl-4" style={{ borderColor: '#005bac', color: '#005bac' }}>
            カード
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="w-10 h-10 rounded-lg mb-4" style={{ backgroundColor: '#005bac' }} />
              <h3 className="font-bold mb-2" style={{ color: '#005bac' }}>
                サービスカード
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                信頼感を軸としたコンテンツ表示に使用するカードコンポーネントです。
              </p>
            </div>
            <div
              className="rounded-xl p-6 text-white hover:shadow-lg transition"
              style={{ background: 'linear-gradient(135deg, #005bac 0%, #007acc 100%)' }}
            >
              <div className="w-10 h-10 rounded-lg mb-4 bg-white/20" />
              <h3 className="font-bold mb-2">ハイライトカード</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                グラデーション背景を使用した強調用カードです。
              </p>
            </div>
            <div className="rounded-xl border-2 p-6 hover:shadow-lg transition" style={{ borderColor: '#f5a623' }}>
              <div className="w-10 h-10 rounded-lg mb-4" style={{ backgroundColor: '#f5a623' }} />
              <h3 className="font-bold mb-2" style={{ color: '#333333' }}>
                アクセントカード
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                キャンペーンや重要通知など目立たせたい要素に使用します。
              </p>
            </div>
          </div>
        </section>

        {/* バッジ / タグ */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 border-l-4 pl-4" style={{ borderColor: '#005bac', color: '#005bac' }}>
            バッジ / タグ
          </h2>
          <div className="flex flex-wrap gap-3">
            <span
              className="px-4 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: '#005bac' }}
            >
              New
            </span>
            <span
              className="px-4 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: '#007acc' }}
            >
              Popular
            </span>
            <span
              className="px-4 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: '#f5a623' }}
            >
              Recommended
            </span>
            <span
              className="px-4 py-1 rounded-full text-xs font-bold border-2"
              style={{ borderColor: '#005bac', color: '#005bac' }}
            >
              Outline
            </span>
          </div>
        </section>

        {/* フォーム */}
        <section>
          <h2 className="text-2xl font-bold mb-8 border-l-4 pl-4" style={{ borderColor: '#005bac', color: '#005bac' }}>
            フォーム
          </h2>
          <div className="max-w-md rounded-xl border border-gray-200 p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#333333' }}>
                会社名
              </label>
              <input
                type="text"
                placeholder="株式会社サンプル"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 text-sm"
                style={{ borderColor: '#ccc' }}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#333333' }}>
                メールアドレス
              </label>
              <input
                type="email"
                placeholder="example@sharp-finance.co.jp"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: '#333333' }}>
                お問い合わせ内容
              </label>
              <textarea
                rows={4}
                placeholder="ご質問・ご相談内容をご記入ください"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 text-sm"
              />
            </div>
            <button
              className="w-full py-3 rounded-lg text-white font-bold text-sm shadow-sm hover:opacity-90 transition"
              style={{ backgroundColor: '#005bac' }}
            >
              送信する
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}