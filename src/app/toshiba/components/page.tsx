import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = '株式会社東芝';
const basePath = '/toshiba';
const primaryColor: string = '#C0C0C0';

export default function ComponentsPage() {
  return (
    <div className="toshiba-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>

        {/* SAMPLEバナー */}
        <div style={{
          background: '#fff7ed',
          border: '1px solid #fed7aa',
          borderRadius: 10,
          padding: '12px 20px',
          marginBottom: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{
            background: '#f97316',
            color: '#fff',
            borderRadius: 4,
            padding: '2px 10px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}>SAMPLE</span>
          <span style={{ fontSize: 13, color: '#9a3412', lineHeight: 1.6 }}>
            このページはテンプレートのサンプルです。実際のクライアントポータルでは、Difyによって自動生成されたコンテンツが表示されます。
          </span>
        </div>

        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            COMPONENTS
          </p>
          <h1 className="section-title">コンポーネント集</h1>
          <p className="section-desc">
            リサーチカラーとタイポグラフィを反映したUIコンポーネントのサンプル集です。
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
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                サンプルボタン
              </button>
            </div>
            <div className="component-code">{`<button className="btn-primary">サンプルボタン</button>`}</div>
          </div>

          <div className="component-card">
            <div className="component-label">Button / Secondary</div>
            <div className="component-render">
              <button
                style={{
                  background: primaryColor,
                  color: '#000000',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                サンプルボタン
              </button>
            </div>
            <div className="component-code">{`<button className="btn-secondary">サンプルボタン</button>`}</div>
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
                タグ A
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
                タグ B
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
                タグ C
              </span>
            </div>
            <div className="component-code">{`<span className="badge">タグ A</span>`}</div>
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
                    fontSize: 18,
                    marginBottom: 8,
                    color: '#111827',
                  }}
                >
                  カードタイトル（サンプル）
                </h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8 }}>
                  カードの本文テキストのサンプルです。実際のポータルではクライアント情報が表示されます。
                </p>
              </div>
            </div>
            <div className="component-code">{`<div className="card">...</div>`}</div>
          </div>

          <div className="component-card">
            <div className="component-label">Divider</div>
            <div className="component-render">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 160 }}>
                <div style={{ height: 4, background: '#000000', borderRadius: 2 }} />
                <div style={{ height: 4, background: '#444444', borderRadius: 2 }} />
              </div>
            </div>
            <div className="component-code">{`<div className="divider" />`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
