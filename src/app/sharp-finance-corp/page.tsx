import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ã·ã£ã¼ããã¡ã¤ãã³ã¹æ ªå¼ä¼ç¤¾';
const basePath = '/sharp-finance-corp';
const primaryColor = '#004A99';

export default function Home() {
  return (
    <div>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="home"
        primaryColor={primaryColor}
      />

      <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            BRAND PORTAL
          </p>
          <h1 className="section-title" style={{ fontSize: 32 }}>
            {clientName} ãã©ã³ããã¼ã¿ã«
          </h1>
          <p className="section-desc">
            ä¿¡é ¼æã»é«ç´æã»ãããããããè»¸ã¨ãããã©ã³ãã¬ã¤ãã©ã¤ã³ã¨UIã³ã³ãã¼ãã³ãéã§ãã
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          <a href={`${basePath}/guidelines`}>
            <div className="portal-card" style={{ height: '100%', cursor: 'pointer' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: primaryColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <span style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>G</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)' }}>
                Guidelines
              </h2>
              <p className="section-desc" style={{ marginTop: 8 }}>
                ãã©ã³ãã«ã©ã¼ãã¿ã¤ãã°ã©ãã£ããã¼ã³&ããã¼ãªã©ã®ã¬ã¤ãã©ã¤ã³ãç¢ºèªã§ãã¾ãã
              </p>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 500,
                  color: primaryColor,
                }}
              >
                è©³ããè¦ã â
              </span>
            </div>
          </a>

          <a href={`${basePath}/components`}>
            <div className="portal-card" style={{ height: '100%', cursor: 'pointer' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: '#F5A623',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <span style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>C</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)' }}>
                Components
              </h2>
              <p className="section-desc" style={{ marginTop: 8 }}>
                ãã¿ã³ãã«ã¼ããªã©ãå®è£æ¸ã¿ã®UIã³ã³ãã¼ãã³ãããµã³ãã«ã³ã¼ãä»ãã§ç¢ºèªã§ãã¾ãã
              </p>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 500,
                  color: primaryColor,
                }}
              >
                è©³ããè¦ã â
              </span>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}