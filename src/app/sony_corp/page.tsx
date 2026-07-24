import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ã½ãã¼æ ªå¼ä¼ç¤¾';
const basePath = '/sony_corp';
const primaryColor = '#000000';

export default function HomePage() {
  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <main className="portal-container" style={{ padding: '48px 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: primaryColor,
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}
          >
            BRAND PORTAL
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: 0 }}>
            {clientName} ãã©ã³ããã¼ã¿ã«
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
            ãã©ã³ãã¬ã¤ãã©ã¤ã³ã¨UIã³ã³ãã¼ãã³ãããç¢ºèªããã ãã¾ãã
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          <a href={`${basePath}/guidelines`}>
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                padding: '32px 24px',
                height: '100%',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: primaryColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>G</span>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
                Guidelines
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                ãã©ã³ãã«ã©ã¼ãã¿ã¤ãã°ã©ãã£ããã³ãããªã©ã®ã¬ã¤ãã©ã¤ã³ãç¢ºèªã§ãã¾ãã
              </p>
            </div>
          </a>

          <a href={`${basePath}/components`}>
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                padding: '32px 24px',
                height: '100%',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#0071bc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>C</span>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
                Components
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                UIã³ã³ãã¼ãã³ãã®å®è£ä¾ã¨ã³ã¼ãã¹ãããããç¢ºèªã§ãã¾ãã
              </p>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}