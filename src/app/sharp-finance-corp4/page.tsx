import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

export default function Page() {
  const clientName = "三和商事株式会社";
  const basePath = "/sanwa-corp";
  const primaryColor = "#005BAC";

  return (
    <>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="text-center mb-16">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-6"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, #00A99D)`,
            }}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
            {clientName} ブランドポータル
          </h1>
          <p className="text-[#333333]/70 text-lg max-w-2xl mx-auto leading-relaxed">
            信頼感、成長、挑戦をキーワードに、木の年輪のように広がり続けるブランドの一貫性を保つための、
            ガイドラインとコンポーネント集です。
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <Link
            href={`${basePath}/guidelines`}
            className="group block rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300 bg-white relative overflow-hidden"
          >
            <div
              className="absolute -right-10 -top-10 w-36 h-36 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: primaryColor }}
            />
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-white font-bold text-xl"
                style={{ backgroundColor: primaryColor }}
              >
                G
              </div>
              <h2 className="text-2xl font-bold text-[#333333] mb-3">
                ガイドライン
              </h2>
              <p className="text-[#333333]/70 mb-6 leading-relaxed">
                ブランドカラー、タイポグラフィ、トンマナなど、デザインの基本方針を確認できます。
              </p>
              <span
                className="inline-flex items-center gap-1 font-semibold"
                style={{ color: primaryColor }}
              >
                詳しく見る
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>

          <Link
            href={`${basePath}/components`}
            className="group block rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300 bg-white relative overflow-hidden"
          >
            <div
              className="absolute -right-10 -top-10 w-36 h-36 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: "#F58220" }}
            />
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-white font-bold text-xl"
                style={{ backgroundColor: "#F58220" }}
              >
                C
              </div>
              <h2 className="text-2xl font-bold text-[#333333] mb-3">
                コンポーネント
              </h2>
              <p className="text-[#333333]/70 mb-6 leading-relaxed">
                ボタンやカードなど、実装にそのまま利用できるUIコンポーネント集です。
              </p>
              <span className="inline-flex items-center gap-1 font-semibold text-[#F58220]">
                詳しく見る
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}