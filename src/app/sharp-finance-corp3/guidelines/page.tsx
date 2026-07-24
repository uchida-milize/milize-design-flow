import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const colorRatios = [
  { hex: '#005bac', label: 'Primary Blue', ratio: 38 },
  { hex: '#007acc', label: 'Secondary Blue', ratio: 22 },
  { hex: '#f5a623', label: 'Accent Orange', ratio: 12 },
  { hex: '#333333', label: 'Text Black', ratio: 18 },
  { hex: '#ffffff', label: 'Background White', ratio: 10 },
];

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-white">
      <ClientPortalHeader
        clientName="シャープファイナンス株式会社"
        basePath="/sharp-finance"
        active="guidelines"
        primaryColor="#005bac"
      />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="mb-16 text-center">
          <p
            className="inline-block text-xs font-bold tracking-widest px-4 py-1 rounded-full mb-4"
            style={{ backgroundColor: '#005bac15', color: '#005bac' }}
          >
            BRAND GUIDELINES
          </p>
          <h1 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#005bac' }}>
            ブランドガイドライン
          </h1>
          <p className="text-[#333333] max-w-2xl mx-auto leading-relaxed">
            信頼感・先進性・誠実さを体現するビジュアルルールをまとめています。
          </p>
        </section>

        {/* カラーセクション */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 border-l-4 pl-4" style={{ borderColor: '#005bac', color: '#005bac' }}>
            ブランドカラー
          </h2>

          {/* 使用比率横帯 */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
            {[
              { name: 'プライマリカラー', hex: '#005bac', desc: 'ロゴの円3つの基調色。リンクや見出しに多用。' },
              { name: 'セカンダリカラー', hex: '#007acc', desc: '明るめブルー。Web広告や強調箇所に使用。' },
              { name: 'アクセントカラー', hex: '#f5a623', desc: 'オレンジ系。ボタンや強調テキストに使用。' },
              { name: 'テキストカラー', hex: '#333333', desc: 'ダークグレー。本文や説明文のメインテキスト。' },
              { name: '背景色', hex: '#ffffff', desc: 'ホワイト。全体の背景色。' },
            ].map((color) => (
              <div key={color.hex} className="rounded-xl border border-gray-200 overflow-hidden">
                <div
                  className="h-24 w-full"
                  style={{
                    backgroundColor: color.hex,
                    border: color.hex === '#ffffff' ? '1px solid #eee' : 'none',
                  }}
                />
                <div className="p-4">
                  <p className="font-bold text-sm mb-1" style={{ color: '#005bac' }}>
                    {color.name}
                  </p>
                  <p className="text-xs font-mono text-[#333333] mb-2">{color.hex}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{color.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* タイポグラフィ */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 border-l-4 pl-4" style={{ borderColor: '#005bac', color: '#005bac' }}>
            タイポグラフィ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-gray-200 p-8">
              <p className="text-xs font-bold tracking-widest text-gray-400 mb-2">HEADING FONT</p>
              <p className="text-3xl font-black mb-4" style={{ color: '#333333' }}>
                Noto Sans JP
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                サンセリフ系、日本語可読性重視。見出しや強調箇所に使用します。
              </p>
              <div className="mt-6 space-y-2">
                <p className="text-2xl font-bold">見出しサンプル テキスト</p>
                <p className="text-xl font-bold">Sample Heading Text</p>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-8">
              <p className="text-xs font-bold tracking-widest text-gray-400 mb-2">BODY FONT</p>
              <p className="text-3xl font-medium mb-4" style={{ color: '#333333' }}>
                Noto Sans JP / System
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                読みやすさと親しみやすさを両立した本文用フォント。
              </p>
              <div className="mt-6 space-y-2">
                <p className="text-base">本文サンプルテキストです。信頼感と先進性を大切にしています。</p>
                <p className="text-sm text-gray-500">Sample body text for general description use.</p>
              </div>
            </div>
          </div>
        </section>

        {/* トンマナ */}
        <section>
          <h2 className="text-2xl font-bold mb-8 border-l-4 pl-4" style={{ borderColor: '#005bac', color: '#005bac' }}>
            トーン&マナー
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {['信頼感', '先進性', '誠実さ'].map((kw) => (
              <div
                key={kw}
                className="rounded-xl p-8 text-center text-white font-bold text-xl"
                style={{ background: 'linear-gradient(135deg, #005bac 0%, #007acc 100%)' }}
              >
                {kw}
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-gray-200 p-8">
            <p className="text-sm md:text-base text-[#333333] leading-loose">
              シャープファイナンス株式会社のデザインは、落ち着いたブルーを基調に、安定感と信頼感を強調。
              三つの円を象徴的に用いたロゴは「三方よし」の理念を表現し、社会や人を支え成長していく姿勢を示しています。
              高級感とわかりやすさを両立したWebランディングページや広告は、法人向けサービスの専門性を感じさせつつ
              親しみやすさも兼ね備えています。全体として未来志向でありながら堅実なブランドイメージを持ち、
              金融サービス企業としての誠実さと挑戦的な姿勢をトーン&マナーとしています。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}