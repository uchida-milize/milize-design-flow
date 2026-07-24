import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const primaryColor = '#004A99';
const clientName = 'サンプル株式会社';
const basePath = '/sample-client';

export default function ClientHomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F0F0F0' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <main
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '64px 24px',
        }}
      >
        <section style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h1
            style={{
              fontSize: '32px',
              color: '#004A99',
              marginBottom: '16px',
              letterSpacing: '0.02em',
            }}
          >
            {clientName} ブランドポータル
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: '#333333',
              lineHeight: 1.8,
            }}
          >
            信頼感・成長・挑戦を軸としたブランド資産をこちらから確認いただけます。
          </p>
        </section>

        <section
          style={{
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <NavCard
            href={`${basePath}/guidelines`}
            title="ガイドライン"
            description="ブランドカラー・タイポグラフィ・トンマナなど、ブランドの基本方針をご確認いただけます。"
            color="#004A99"
          />
          <NavCard
            href={`${basePath}/components`}
            title="コンポーネント"
            description="UIパーツやボタン、カードなど、実装に使えるコンポーネント集をご覧いただけます。"
            color="#0071BC"
          />
        </section>
      </main>
    </div>
  );
}

function NavCard({
  href,
  title,
  description,
  color,
}: {
  href: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        width: '360px',
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        borderTop: `5px solid ${color}`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className="nav-card"
    >
      <h2 style={{ fontSize: '20px', color, marginBottom: '12px' }}>
        {title}
      </h2>
      <p style={{ fontSize: '14px', color: '#333333', lineHeight: 1.7 }}>
        {description}
      </p>
      <div
        style={{
          marginTop: '20px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 700,
          color: '#F5A623',
        }}
      >
        詳しく見る →
      </div>
    </a>
  );
}