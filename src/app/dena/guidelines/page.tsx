import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'DeNA株式会社';
const basePath = '/dena';
const primaryColor = '#000000';

const brandColors = [
  { hex: '#000000', name: 'プライマリ（ブラック）' },
  { hex: '#FFFFFF', name: 'セカンダリ（ホワイト）' },
  { hex: '#00B3E6', name: 'ブランドブルー' },
  { hex: '#00C5CD', name: 'シアン系' },
  { hex: '#00D193', name: 'グリーン系' },
  { hex: '#FF6B6B', name: 'レッド系' },
];

export default function GuidelinesPage() {
  return (
    <div className="dena-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />
      <div className="portal-container">
        <div className="page-header">
          <div className="section-label" style={{ color: primaryColor }}>
            GUIDELINES
          </div>
          <h1 className="page-title">ブランドガイドライン</h1>
          <p className="page-sub">
            {clientName}のブランドカラー・タイポグラフィ・トンマナを掲載しています。
          </p>
        </div>

        <div className="content-section">
          <div className="section-label" style={{ color: primaryColor }}>
            COLOR
          </div>
          <div className="section-title">ブランドカラー</div>
          <p className="section-desc">
            ブラック＆ホワイトを基調に、4色のアクセントカラーを組み合わせて使用します。
          </p>
          <div className="swatch-grid">
            {brandColors.map((c) => (
              <div className="swatch-item" key={c.hex}>
                <div
                  className="swatch-color"
                  style={{
                    backgroundColor: c.hex,
                    borderBottom: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                  }}
                />
                <div className="swatch-info">
                  <div className="swatch-hex">{c.hex}</div>
                  <div className="swatch-name">{c.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <div className="section-label" style={{ color: primaryColor }}>
            TYPOGRAPHY
          </div>
          <div className="section-title">タイポグラフィ</div>
          <p className="section-desc">
            見出し・本文ともにシンプルでモダンなサンセリフ系フォントを使用し、読みやすさを重視します。
          </p>
          <div className="card">
            <div style={{ fontSize: '32px', fontWeight: 900, marginBottom: '12px' }}>
              見出しテキスト Aa
            </div>
            <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '12px', color: '#374151' }}>
              サブ見出しテキスト Aa
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.8 }}>
              本文テキストです。読みやすさを重視したサンセリフ系フォントを採用し、スマートかつ実直な印象を与えるデザインを実現しています。
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="section-label" style={{ color: primaryColor }}>
            TONE &amp; MANNER
          </div>
          <div className="section-title">トンマナ</div>
          <p className="section-desc">
            ブランドの核となるキーワードと全体的な印象について。
          </p>
          <div className="card">
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {['スマート', 'ユニーク', '実直'].map((kw) => (
                <span
                  key={kw}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '999px',
                    background: '#000000',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.9 }}>
              柔軟性と実直さを兼ね備えたスマートなデザイン。ブラック＆ホワイトのシンプルな基調に4色のアクセントカラーを加えることで、活き活きとした印象を与え、エンターテインメントと社会課題の両軸を表現します。ロゴやブランドカラーの使用は厳格に管理されており、統一感と識別性を重視したブランド運用がなされています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}