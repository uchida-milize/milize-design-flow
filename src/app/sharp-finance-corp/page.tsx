import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance-corp';
const primaryColor: string = '#004A99';

export default function Home() {
  return (
    <div>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            BRAND PORTAL
          </p>
          <h1 className="section-title" style={{ fontSize: 32 }}>
            {clientName} ブランドポータル
          </h1>
          <p className="section-desc">
            信頼感・高級感・わかりやすさを軸としたブランドガイドラインとUIコンポーネント集です。
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          <a href={`${basePath}/guidelines`}>
            <div className="portal-card" style={{ height: '100%', cursor: 'pointer' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: primaryColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <span style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>G</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)' }}>
                Guidelines
              </h2>
              <p className="section-desc" style={{ marginTop: 8 }}>
                ブランドカラー、タイポグラフィ、トーン&マナーなどのガイドラインを確認できます。
              </p>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 500,
                  color: primaryColor,
                }}
              >
                詳しく見る →
              </span>
            </div>
          </a>

          <a href={`${basePath}/components`}>
            <div className="portal-card" style={{ height: '100%', cursor: 'pointer' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: '#F5A623',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <span style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>C</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)' }}>
                Components
              </h2>
              <p className="section-desc" style={{ marginTop: 8 }}>
                ボタンやカードなど、実装済みのUIコンポーネントをサンプルコード付きで確認できます。
              </p>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 500,
                  color: primaryColor,
                }}
              >
                詳しく見る →
              </span>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}