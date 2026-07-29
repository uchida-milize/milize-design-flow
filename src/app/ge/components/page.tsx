import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ゼネラル・エレクトリック';
const basePath = '/ge';
const primaryColor: string = '#3B73B9';
const accentRed = '#B7282E';

export default function ComponentsPage() {
  return (
    <div className="ge-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <div className="hi-container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <div className="hi-section-label" style={{ color: primaryColor }}>
            COMPONENTS
          </div>
          <h1 className="hi-section-title">コンポーネント集</h1>
          <p className="hi-section-desc">
            ブランドガイドラインに準拠したUIコンポーネントのサンプルです。
          </p>
        </div>

        <div className="hi-tabs">
          <span className="hi-tab active" style={{ background: primaryColor }}>
            Buttons
          </span>
          <span className="hi-tab">Cards</span>
          <span className="hi-tab">Tags</span>
        </div>

        <section style={{ marginBottom: 32 }}>
          <h2 className="hi-section-title" style={{ fontSize: 18 }}>
            ボタン
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            <div className="hi-component-card">
              <div className="hi-component-label">.btn-primary</div>
              <div className="hi-component-render">
                <button
                  style={{
                    background: primaryColor,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  お問い合わせ
                </button>
              </div>
              <pre className="hi-code-block">{`<button className="btn-primary">
  お問い合わせ
</button>`}</pre>
            </div>

            <div className="hi-component-card">
              <div className="hi-component-label">.btn-secondary</div>
              <div className="hi-component-render">
                <button
                  style={{
                    background: '#000000',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  社内ポータル
                </button>
              </div>
              <pre className="hi-code-block">{`<button className="btn-secondary">
  社内ポータル
</button>`}</pre>
            </div>

            <div className="hi-component-card">
              <div className="hi-component-label">.btn-accent</div>
              <div className="hi-component-render">
                <button
                  style={{
                    background: accentRed,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  特別イベント詳細
                </button>
              </div>
              <pre className="hi-code-block">{`<button className="btn-accent">
  特別イベント詳細
</button>`}</pre>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 className="hi-section-title" style={{ fontSize: 18 }}>
            カード
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            <div className="hi-component-card">
              <div className="hi-component-label">.info-card</div>
              <div className="hi-component-render">
                <div
                  style={{
                    border: `1px solid #e5e7eb`,
                    borderTop: `4px solid ${primaryColor}`,
                    borderRadius: 8,
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 4, color: '#111827' }}>
                    製品情報
                  </div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>
                    先進技術による信頼性の高いソリューション。
                  </div>
                </div>
              </div>
              <pre className="hi-code-block">{`<div className="info-card">
  <h3>製品情報</h3>
  <p>先進技術による信頼性の高いソリューション。</p>
</div>`}</pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="hi-section-title" style={{ fontSize: 18 }}>
            タグ
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            <div className="hi-component-card">
              <div className="hi-component-label">.tag</div>
              <div className="hi-component-render" style={{ display: 'flex', gap: 8 }}>
                <span
                  style={{
                    background: `${primaryColor}1A`,
                    color: primaryColor,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  信頼感
                </span>
                <span
                  style={{
                    background: '#0000001A',
                    color: '#000000',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  先進性
                </span>
                <span
                  style={{
                    background: `${accentRed}1A`,
                    color: accentRed,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  誠実さ
                </span>
              </div>
              <pre className="hi-code-block">{`<span className="tag tag-primary">信頼感</span>
<span className="tag tag-secondary">先進性</span>
<span className="tag tag-accent">誠実さ</span>`}</pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}