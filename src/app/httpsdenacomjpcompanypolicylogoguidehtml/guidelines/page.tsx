import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープ株式会社';
const basePath = '/sharp-corp';
const primaryColor: string = '#E60012';

const colors = [
  { hex: '#E60012', name: 'プライマリレッド' },
  { hex: '#333333', name: 'セカンダリダークグレー' },
  { hex: '#0071BC', name: 'アクセントブルー' },
  { hex: '#FFFFFF', name: '背景ホワイト' },
  { hex: '#F5F5F5', name: 'ライトグレー' },
];

export default function GuidelinesPage() {
  return (
    <div className="sharp-corp-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />
      <div className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <div className="section-label" style={{ color: primaryColor }}>GUIDELINES</div>
          <div className="section-title">ブランドガイドライン</div>
          <div className="section-desc">
            シャープのブランドを構成するカラー、タイポグラフィ、トンマナを定義します。
          </div>
        </div>

        <section style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ color: primaryColor }}>COLORS</div>
          <div className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>ブランドカラー</div>
          <div className="swatch-grid">
            {colors.map((c) => (
              <div key={c.hex}>
                <div className="swatch-color" style={{ background: c.hex, border: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none' }} />
                <div className="swatch-info">
                  <div className="swatch-hex">{c.hex}</div>
                  <div className="swatch-name">{c.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ color: primaryColor }}>TYPOGRAPHY</div>
          <div className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>タイポグラフィ</div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="swatch-name" style={{ marginBottom: 8 }}>見出しフォント</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>
              ヒラギノ角ゴシック／游ゴシック体
            </div>
          </div>
          <div className="card">
            <div className="swatch-name" style={{ marginBottom: 8 }}>本文フォント</div>
            <div style={{ fontSize: 16, color: '#111827', lineHeight: 1.8 }}>
              ヒラギノ角ゴシック／游ゴシック体を用いた、読みやすく洗練された本文組みです。誠実で親しみやすい印象を実現します。
            </div>
          </div>
        </section>

        <section>
          <div className="section-label" style={{ color: primaryColor }}>TONE &amp; MANNER</div>
          <div className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>トンマナ</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
            {['誠意と創意', '先進性', '親近感'].map((kw) => (
              <div className="card" key={kw} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: primaryColor }}>{kw}</div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="section-desc" style={{ fontSize: 14, lineHeight: 1.8, color: '#374151' }}>
              シャープは「ひとの願いの、半歩先。」をコーポレートスローガンに掲げ、誠実で創造的な姿勢を強調しつつ、先進技術による新しい生活体験を提供するブランドイメージを持っています。色使いは情熱的な赤を基調にしながらも、シンプルで信頼感のあるダークグレーとブルーをアクセントに用い、クリーンでモダンなデザインを展開。フォントは読みやすく洗練されたゴシック体で統一し、堅実で親しみやすい印象を与えています。
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}