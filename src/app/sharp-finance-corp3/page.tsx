import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

export default function SharpFinancePortalHome() {
  const clientName = 'シャープファイナンス株式会社';
  const basePath = '/sharp-finance';
  const primaryColor = '#005bac';

  return (
    <div className="min-h-screen bg-white">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="mb-14 text-center">
          <p
            className="inline-block text-xs font-bold tracking-widest px-4 py-1 rounded-full mb-4"
            style={{ backgroundColor: '#f5a62320', color: '#f5a623' }}
          >
            BRAND PORTAL
          </p>
          <h1 className="text-3xl md:text-4xl font-black mb-4" style={{ color: primaryColor }}>
            {clientName} ブランドポータル
          </h1>
          <p className="text-[#333333] text-base leading-relaxed max-w-2xl mx-auto">
            信頼感・先進性・誠実さを軸としたブランドガイドラインとUIコンポーネント集です。
            プロジェクトに関わる全てのメンバーが一貫したトーン&マナーを保てるよう、こちらのポータルをご活用ください。
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href={`${basePath}/guidelines`}
            className="group block rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, #ffffff 0%, #005bac08 100%)' }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white text-2xl font-black"
              style={{ backgroundColor: primaryColor }}
            >
              G
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
              ガイドライン
            </h2>
            <p className="text-sm text-[#333333] leading-relaxed mb-4">
              ブランドカラー、タイポグラフィ、トーン&マナーなど、ブランドの基本ルールを確認できます。
            </p>
            <span
              className="inline-flex items-center text-sm font-bold group-hover:gap-2 gap-1 transition-all"
              style={{ color: '#007acc' }}
            >
              詳しく見る →
            </span>
          </Link>

          <Link
            href={`${basePath}/components`}
            className="group block rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, #ffffff 0%, #007acc08 100%)' }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white text-2xl font-black"
              style={{ backgroundColor: '#007acc' }}
            >
              C
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
              コンポーネント
            </h2>
            <p className="text-sm text-[#333333] leading-relaxed mb-4">
              ボタン、カード、フォームなど実際のUIパーツをブランドカラーに沿って確認できます。
            </p>
            <span
              className="inline-flex items-center text-sm font-bold group-hover:gap-2 gap-1 transition-all"
              style={{ color: '#007acc' }}
            >
              詳しく見る →
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}