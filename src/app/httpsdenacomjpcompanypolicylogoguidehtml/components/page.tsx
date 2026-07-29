import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープ株式会社';
const basePath = '/sharp-corp';
const primaryColor = '#E60012';
const accentColor = '#0071BC';

export default function ComponentsPage() {
  return (
    <div className="sharp-corp-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />
      <div className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <div className="section-label" style={{ color: primaryColor }}>COMPONENTS</div>
          <div className="section-title">UIコンポーネント</div>
          <div className="section-desc">
            ブランドカラーを適用したボタン・カード・バッジなどの実装例です。
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          <div className="component-card">
            <div className="component-label">.btn-primary</div>
            <div className="component-render">
              <button style={{ background: primaryColor, color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                プライマリボタン
              </button>
              <button style={{ background: accentColor, color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                アクセントボタン
              </button>
              <button style={{ background: '#fff', color: primaryColor, border: `1px solid ${primaryColor}`, borderRadius: 6, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                アウトラインボタン
              </button>
            </div>
            <pre className="component-code">{`<button style={{ background: '${primaryColor}', color: '#fff' }}>
  プライマリボタン
</button>`}</pre>
          </div>

          <div className="component-card">
            <div className="component-label">.card-basic</div>
            <div className="component-render">
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, maxWidth: 280, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 8 }}>カードタイトル</div>
                <div style={{ fontSize: 14, color: '#6b7280' }}>カードの説明文がここに入ります。</div>
              </div>
            </div>
            <pre className="component-code">{`<div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
  <div>カードタイトル</div>
  <div>カードの説明文</div>
</div>`}</pre>
          </div>

          <div className="component-card">
            <div className="component-label">.badge</div>
            <div className="component-render">
              <span style={{ background: primaryColor, color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>NEW</span>
              <span style={{ background: accentColor, color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>INFO</span>
              <span style={{ background: '#F5F5F5', color: '#333333', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>DEFAULT</span>
            </div>
            <pre className="component-code">{`<span style={{ background: '${primaryColor}', color: '#fff', borderRadius: 999 }}>
  NEW
</span>`}</pre>
          </div>

          <div className="component-card">
            <div className="component-label">.alert-box</div>
            <div className="component-render" style={{ display: 'block' }}>
              <div style={{ background: '#F5F5F5', borderLeft: `4px solid ${primaryColor}`, padding: '12px 16px', borderRadius: 4, fontSize: 14, color: '#333333' }}>
                半歩先の体験をお届けします。
              </div>
            </div>
            <pre className="component-code">{`<div style={{ borderLeft: '4px solid ${primaryColor}', background: '#F5F5F5' }}>
  半歩先の体験をお届けします。
</div>`}</pre>
          </div>

        </div>
      </div>
    </div>
  );
}