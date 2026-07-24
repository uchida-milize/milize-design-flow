import Link from 'next/link';
import { PortalHeader } from '@/components/PortalHeader';

const NAV_CARDS = [
  {
    href: '/prototype',
    title: 'プロトタイプ',
    desc: '開業スコア診断の全画面を実際にタップして体験できる、動作するプロトタイプです。',
    tag: '7 screens',
  },
  {
    href: '/guidelines',
    title: 'ガイドライン',
    desc: 'カラー・タイポグラフィ・ボタン・アイコン運用など、デザインの基本ルールをまとめています。',
    tag: 'Design rules',
  },
  {
    href: '/components',
    title: 'コンポーネント',
    desc: 'ボタン・カード・バッジ・フォームなど、実装済みUIパーツをカテゴリ別に一覧できます。',
    tag: 'UI catalog',
  },
  {
    href: '/screens',
    title: 'スクリーン',
    desc: '全画面のプレビューをグリッドで一覧表示。画面遷移の全体像を俯瞰できます。',
    tag: 'Screen gallery',
  },
];

export default function PortalHome() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      <PortalHeader active="home" />

      {/* Hero */}
      <div style={{ background: '#f7f9fc' }}>
        <div className="mx-auto" style={{ maxWidth: 1120, padding: '72px 24px 64px' }}>
          <p className="text-sm font-bold mb-3" style={{ color: '#2563eb' }}>DoctorCompass Design System</p>
          <h1 className="font-bold mb-5" style={{ fontSize: 40, lineHeight: 1.3, color: '#091946' }}>
            開業診断アプリの<br />デザインシステム・ポータル
          </h1>
          <p className="text-sm leading-relaxed" style={{ maxWidth: 620, color: '#6b7280' }}>
            DoctorCompassのUIを構成するプロトタイプ、デザインルール、コンポーネント、画面一覧、
            スタイル早見表をひとつにまとめました。左のナビゲーションから各セクションをご覧ください。
          </p>
        </div>
      </div>

      {/* Nav cards */}
      <div className="mx-auto" style={{ maxWidth: 1120, padding: '48px 24px 96px' }}>
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}
        >
          {NAV_CARDS.map((card) => (
            <Link key={card.href} href={card.href} className="glass-card block" style={{ padding: 28 }}>
              <span
                className="inline-block text-xs font-semibold mb-3"
                style={{ color: '#2563eb', background: '#eff6ff', borderRadius: 999, padding: '4px 10px' }}
              >
                {card.tag}
              </span>
              <h2 className="font-bold mb-2" style={{ fontSize: 20, color: '#091946' }}>{card.title}</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b7280' }}>{card.desc}</p>
              <span className="text-sm font-semibold flex items-center gap-1" style={{ color: '#2563eb' }}>
                詳しく見る
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M7 5l5 5-5 5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
