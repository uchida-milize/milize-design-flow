import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance';
const primaryColor = '#004A99';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
        <section style={{ marginBottom: 56 }}>
          <h1
            style={{
              fontSize: 32,
              color: '#004A99',
              marginBottom: 16,
              letterSpacing: '0.02em',
            }}
          >
            {clientName} ブランドポータル
          </h1>
          <p style={{ fontSize: 16, color: '#333333', maxWidth: 640 }}>
            信頼感・成長・挑戦をキーワードに、ブランドガイドラインとUIコンポーネントをこちらから確認いただけます。
          </p>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          <Link href={`${basePath}/guidelines`}>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 40,
                height: '100%',
                boxShadow: '0 4px 16px rgba(0,74,153,0.1)',
                borderTop: `4px solid #004A99`,
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#004A99',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                G
              </div>
              <h2 style={{ fontSize: 22, color: '#004A99', marginBottom: 12 }}>
                ブランドガイドライン
              </h2>
              <p style={{ fontSize: 14, color: '#333333' }}>
                カラー・タイポグラフィ・トンマナなど、ブランドの基本方針を確認できます。
              </p>
            </div>
          </Link>

          <Link href={`${basePath}/components`}>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 40,
                height: '100%',
                boxShadow: '0 4px 16px rgba(0,74,153,0.1)',
                borderTop: `4px solid #0071BC`,
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#0071BC',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                C
              </div>
              <h2 style={{ fontSize: 22, color: '#0071BC', marginBottom: 12 }}>
                UIコンポーネント
              </h2>
              <p style={{ fontSize: 14, color: '#333333' }}>
                ボタン・カード・フォームなど、実装に使えるUIパーツ集を確認できます。
              </p>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}