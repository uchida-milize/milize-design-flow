import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'Milize Asset Portal';
const basePath = '/milize-asset-portal';
const primaryColor: string = '#C0C0C0';

export default function ComponentsPage() {
  return (
    <div className="milize-asset-portal-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            COMPONENTS
          </p>
          <h1 className="section-title">コンポーネント集</h1>
          <p className="section-desc">
            ブランドカラーとタイポグラフィを反映したUIコンポーネントのサンプル集です。
          </p>
        </div>

        <div style={{ display: 'grid', gap: 24 }}>
          <div className="component-card">
            <div className="component-label">Button / Primary</div>
            <div className="component-render">
              <button
                style={{
                  background: '#000000',
                  color: '#ffffff',
                  border: `1px solid ${primaryColor}`,
                  padding: '10px 24px',
                  borderRadius: 6,
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                詳細を見る
              </button>
            </div>
            <div className="component-code">{`<button className="btn-primary">詳細を見る</button>`}</div>
          </div>

          <div className="component-card">
            <div className="component-label">Button / Secondary (Silver)</div>
            <div className="component-render">
              <button
                style={{
                  background: primaryColor,
                  color: '#000000',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: 6,
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                資料請求
              </button>
            </div>
            <div className="component-code">{`<button className="btn-silver">資料請求</button>`}</div>
          </div>

          <div className="component-card">
            <div className="component-label">Badge</div>
            <div className="component-render" style={{ display: 'flex', gap: 12 }}>
              <span
                style={{
                  background: '#f3f4f6',
                  color: '#444444',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                情報革命
              </span>
              <span
                style={{
                  background: primaryColor,
                  color: '#000000',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                未来志向
              </span>
              <span
                style={{
                  background: '#000000',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                誠実さ
              </span>
            </div>
            <div className="component-code">{`<span className="badge">情報革命</span>`}</div>
          </div>

          <div className="component-card">
            <div className="component-label">Card</div>
            <div className="component-render">
              <div
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  maxWidth: 360,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Shippori Mincho', serif",
                    fontSize: 18,
                    marginBottom: 8,
                    color: '#111827',
                  }}
                >
                  海援隊の精神
                </h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8 }}>
                  伝統と革新が融合した、時代を超えて輝くブランドの姿勢を表現します。
                </p>
              </div>
            </div>
            <div className="component-code">{`<div className="card">...</div>`}</div>
          </div>

          <div className="component-card">
            <div className="component-label">Divider (Equal Mark Motif)</div>
            <div className="component-render">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 160 }}>
                <div style={{ height: 4, background: '#000000', borderRadius: 2 }} />
                <div style={{ height: 4, background: '#444444', borderRadius: 2 }} />
              </div>
            </div>
            <div className="component-code">{`<div className="equal-divider" />`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}