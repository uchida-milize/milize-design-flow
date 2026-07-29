import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance-corp';
const primaryColor = '#FF0000';

const colors = [
  { hex: '#FF0000', name: 'Primary Red' },
  { hex: '#000000', name: 'Black' },
  { hex: '#F5A623', name: 'Accent Orange' },
  { hex: '#333333', name: 'Text Dark Gray' },
  { hex: '#FFFFFF', name: 'Background White' },
];

export default function GuidelinesPage() {
  return (
    <div className="sharp-finance-corp-portal">
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
          <div className="section-title">ブランドガイドライン</div>
          <div className="section-desc">
            シャープファイナンスのブランドカラー・タイポグラフィ・トンマナをまとめています。
          </div>
        </div>

        <section style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ color: primaryColor }}>
            COLOR
          </div>
          <div className="section-title">カラー</div>
          <div className="section-desc" style={{ marginBottom: 24 }}>
            ブランドを象徴するカラーパレットです。
          </div>
          <div className="swatch-grid">
            {colors.map((c) => (
              <div key={c.hex} className="swatch-item">
                <div
                  className="swatch-color-block"
                  style={{
                    background: c.hex,
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
        </section>

        <section style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ color: primaryColor }}>
            TYPOGRAPHY
          </div>
          <div className="section-title">タイポグラフィ</div>
          <div className="section-desc" style={{ marginBottom: 24 }}>
            見出しと本文で使用するフォントです。
          </div>
          <div className="portal-card" style={{ marginBottom: 16 }}>
            <div className="swatch-name" style={{ marginBottom: 8 }}>
              見出しフォント
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>
              ヒラギノ角ゴシック体 Hiragino Kaku Gothic
            </div>
          </div>
          <div className="portal-card">
            <div className="swatch-name" style={{ marginBottom: 8 }}>
              本文フォント
            </div>
            <div style={{ fontSize: 16, color: '#333333' }}>
              游ゴシック体 Yu Gothic
              　ひとの願いの、半歩先。誠意・創意・先進性を大切にしたものづくりを行っています。
            </div>
          </div>
        </section>

        <section>
          <div className="section-label" style={{ color: primaryColor }}>
            TONE &amp; MANNER
          </div>
          <div className="section-title">トンマナ</div>
          <div className="section-desc" style={{ marginBottom: 24 }}>
            ブランドを表す3つのキーワードと、全体の印象です。
          </div>
          <div className="nav-grid" style={{ marginBottom: 16 }}>
            {['誠意', '創意', '先進性'].map((k) => (
              <div
                key={k}
                className="portal-card"
                style={{ textAlign: 'center', fontWeight: 700, fontSize: 18, color: primaryColor }}
              >
                {k}
              </div>
            ))}
          </div>
          <div className="portal-card">
            <div className="section-desc" style={{ color: '#333333', lineHeight: 1.8 }}>
              シャープは「ひとの願いの、半歩先。」をブランドスローガンに掲げ、誠実かつ創造的に顧客の日常に寄り添う姿勢を大切にしています。デザインはシンプルでありながら力強さを感じさせ、赤を基調としたカラーリングがブランドの先進性と信頼感を象徴。フォントは現代的で読みやすく、清潔感のある白背景とダークテキストのコントラストで情報を明確に伝えます。トーンは温かみと堅実さを兼ね備え、生活者に寄り添いながら新しい価値を提供するブランドイメージを強く表現しています。
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}