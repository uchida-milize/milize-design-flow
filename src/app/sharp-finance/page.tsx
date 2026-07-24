import Link from 'next/link';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const SF_PRIMARY = '#004A99';
const SF_SECONDARY = '#0071BC';
const SF_ACCENT = '#F5A623';

const NAV_CARDS = [
  {
    href: '/sharp-finance/guidelines',
    title: 'デザインガイドライン',
    desc: 'カラー・タイポグラフィ・スペーシングなど、シャープファイナンスのデザインルールをまとめています。',
    tag: 'Design rules',
  },
  {
    href: '/sharp-finance/components',
    title: 'コンポーネントカタログ',
    desc: 'ボタン・カード・バッジ・フォームなど、ブランドに合わせた実装済みUIパーツを一覧できます。',
    tag: 'UI catalog',
  },
];

export default function SharpFinanceHome() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      <ClientPortalHeader
        clientName="Sharp Finance"
        basePath="/sharp-finance"
        active="home"
        primaryColor={SF_PRIMARY}
      />

      {/* Hero */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <div className="mx-auto" style={{ maxWidth: 1120, padding: '64px 24px 56px' }}>
          <div
            style={{
              display: 'inline-block',
              background: SF_PRIMARY,
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              borderRadius: 4,
              padding: '4px 10px',
              marginBottom: 20,
            }}
          >
            SHARP FINANCE
          </div>
          <h1 className="font-bold mb-4" style={{ fontSize: 36, lineHeight: 1.3, color: '#111827' }}>
            デザインシステム<br />ポータル
          </h1>
          <p className="text-sm leading-relaxed" style={{ maxWidth: 560, color: '#6b7280' }}>
            シャープファイナンスのUIを構成するデザインルール・コンポーネントカタログをまとめたポータルです。
            医師・クリニック向け金融サービスにふさわしい、信頼感と明快さを両立したデザインシステムです。
          </p>
        </div>
      </div>

      {/* Color preview strip */}
      <div style={{ display: 'flex', height: 6 }}>
        <div style={{ flex: 3, background: SF_PRIMARY }} />
        <div style={{ flex: 2, background: SF_SECONDARY }} />
        <div style={{ flex: 1, background: SF_ACCENT }} />
      </div>

      {/* Nav cards */}
      <div className="mx-auto" style={{ maxWidth: 1120, padding: '48px 24px 96px' }}>
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}
        >
          {NAV_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="block"
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: 16,
                padding: 28,
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                textDecoration: 'none',
              }}
            >
              <span
                className="inline-block text-xs font-semibold mb-3"
                style={{
                  color: SF_PRIMARY,
                  background: '#e8f0fb',
                  borderRadius: 999,
                  padding: '4px 10px',
                }}
              >
                {card.tag}
              </span>
              <h2 className="font-bold mb-2" style={{ fontSize: 20, color: '#111827' }}>{card.title}</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b7280' }}>{card.desc}</p>
              <span
                className="text-sm font-semibold flex items-center"
                style={{ color: SF_PRIMARY, gap: 4 }}
              >
                詳しく見る
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M7 5l5 5-5 5" stroke={SF_PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Brand note */}
        <div
          style={{
            marginTop: 48,
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#e8f0fb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke={SF_PRIMARY} strokeWidth="1.5" />
              <path d="M10 9v5M10 7v1" stroke={SF_PRIMARY} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#111827' }}>ブランドについて</p>
            <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
              シャープファイナンスのデザイントークンはDifyパイプラインにより自動抽出・生成されています。
              コーポレートサイトのトンマナを基に、医療現場で使いやすいUI設計を反映しています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
