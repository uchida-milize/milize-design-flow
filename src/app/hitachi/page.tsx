import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

const clientName = '日立製作所';
const basePath = '/hitachi';
const primaryColor = '#E60012';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <main className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            BRAND PORTAL
          </p>
          <h1 className="section-title">{clientName} ブランドポータル</h1>
          <p className="section-desc">
            信頼感・先進性・サステナビリティを軸とした、日立ブランドのガイドラインとコンポーネント一覧です。
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          <Link href={`${basePath}/guidelines`}>
            <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
              <p
                className="section-label"
                style={{ color: primaryColor, marginBottom: 8 }}
              >
                GUIDELINES
              </p>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                ブランドガイドライン
              </h2>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>
                ブランドカラー、タイポグラフィ、トンマナなど、日立ブランドの基本方針を確認できます。
              </p>
            </div>
          </Link>

          <Link href={`${basePath}/components`}>
            <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
              <p
                className="section-label"
                style={{ color: primaryColor, marginBottom: 8 }}
              >
                COMPONENTS
              </p>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                UIコンポーネント
              </h2>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>
                ボタンやカードなど、ブランドカラーを適用したUIコンポーネントのサンプル集です。
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}