import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import Link from 'next/link';

const clientName = 'パナソニック株式会社';
const basePath = '/panasonic';
const primaryColor: string = '#003d7c';

const colorRatios = [
  { hex: '#003d7c', name: 'Primary Blue', percent: 40 },
  { hex: '#0071bc', name: 'Secondary Blue', percent: 20 },
  { hex: '#f5a623', name: 'Accent Orange', percent: 10 },
  { hex: '#333333', name: 'Text Black', percent: 15 },
  { hex: '#f0f0f0', name: 'Background Gray', percent: 15 },
];

export default function Home() {
  return (
    <>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />
      <div className="portal-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <p className="section-label" style={{ color: primaryColor }}>
          BRAND PORTAL
        </p>
        <h1 className="section-title">{clientName} ブランドポータル</h1>
        <p className="section-description">
          ブランドガイドラインとUIコンポーネントを確認できるポータルサイトです。
        </p>

        <div className="color-bar">
          {colorRatios.map((c) => (
            <div
              key={c.hex}
              className="color-bar-segment"
              style={{
                flex: c.percent / 100,
                background: c.hex,
                border: c.hex.toLowerCase() === '#ffffff' ? '1px solid #e5e7eb' : undefined,
              }}
            />
          ))}
        </div>

        <div className="color-legend">
          {colorRatios.map((c) => (
            <div key={c.hex} className="color-legend-item">
              <span
                className="color-legend-swatch"
                style={{
                  background: c.hex,
                  border: c.hex.toLowerCase() === '#ffffff' ? '1px solid #e5e7eb' : undefined,
                }}
              />
              <span>
                {c.hex}（{c.name}）{c.percent}%
              </span>
            </div>
          ))}
        </div>

        <div className="nav-card-grid">
          <Link href={`${basePath}/guidelines`} className="nav-card">
            <div className="nav-card-title" style={{ color: primaryColor }}>
              ガイドライン
            </div>
            <div className="nav-card-desc">
              ブランドカラー、タイポグラフィ、トンマナなどのデザイン原則を確認できます。
            </div>
          </Link>
          <Link href={`${basePath}/components`} className="nav-card">
            <div className="nav-card-title" style={{ color: primaryColor }}>
              コンポーネント
            </div>
            <div className="nav-card-desc">
              ブランドカラーを適用したUIコンポーネントのサンプルを確認できます。
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}