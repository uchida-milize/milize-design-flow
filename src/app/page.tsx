import Link from 'next/link';

const CLIENTS = [
  {
    slug: 'sharp-finance',
    name: 'Sharp Finance',
    nameJa: 'シャープファイナンス',
    desc: '医師・クリニック向け金融サービスのデザインシステム。コーポレートブルーを基調とした信頼感のあるUI。',
    primaryColor: '#004A99',
    tag: '金融・医療',
    status: 'live',
  },
];

export default function ClientsIndex() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      {/* Header */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <div className="mx-auto flex items-center" style={{ maxWidth: 1120, padding: '16px 24px', gap: 12 }}>
          <span className="font-bold text-sm" style={{ color: '#111827', letterSpacing: '-0.01em' }}>
            MILIZE Design Flow
          </span>
          <span style={{ color: '#e5e7eb' }}>|</span>
          <span className="text-xs font-medium" style={{ color: '#9ca3af' }}>
            クライアント設計システム管理ポータル
          </span>
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: '#f7f9fc' }}>
        <div className="mx-auto" style={{ maxWidth: 1120, padding: '64px 24px 48px' }}>
          <p className="text-sm font-bold mb-3" style={{ color: '#2563eb' }}>Design Flow Portal</p>
          <h1 className="font-bold mb-4" style={{ fontSize: 36, lineHeight: 1.3, color: '#111827' }}>
            クライアント別<br />デザインシステム一覧
          </h1>
          <p className="text-sm leading-relaxed" style={{ maxWidth: 560, color: '#6b7280' }}>
            各クライアントのデザインガイドライン・コンポーネントカタログを管理します。
            プロジェクトを選択して詳細を確認してください。
          </p>
        </div>
      </div>

      {/* Client cards */}
      <div className="mx-auto" style={{ maxWidth: 1120, padding: '0 24px 96px' }}>
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}
        >
          {CLIENTS.map((client) => (
            <Link
              key={client.slug}
              href={`/${client.slug}`}
              className="block"
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: 16,
                padding: 28,
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 6,
                  borderRadius: 999,
                  background: client.primaryColor,
                  marginBottom: 16,
                }}
              />
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold" style={{ fontSize: 18, color: '#111827' }}>{client.name}</p>
                  <p className="text-xs" style={{ color: '#9ca3af', marginTop: 2 }}>{client.nameJa}</p>
                </div>
                {client.status === 'live' && (
                  <span
                    className="text-xs font-semibold"
                    style={{
                      background: '#dcfce7',
                      color: '#16a34a',
                      borderRadius: 999,
                      padding: '3px 10px',
                    }}
                  >
                    Live
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b7280' }}>{client.desc}</p>
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold"
                  style={{
                    background: '#f0f4ff',
                    color: '#4b5563',
                    borderRadius: 999,
                    padding: '4px 10px',
                  }}
                >
                  {client.tag}
                </span>
                <span className="text-sm font-semibold flex items-center" style={{ color: client.primaryColor, gap: 4 }}>
                  開く
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M7 5l5 5-5 5" stroke={client.primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}

          {/* Add new client placeholder */}
          <div
            style={{
              background: '#f9fafb',
              border: '2px dashed #d1d5db',
              borderRadius: 16,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 200,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-medium" style={{ color: '#6b7280' }}>新規クライアント</p>
            <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>Difyで自動生成</p>
          </div>
        </div>
      </div>
    </div>
  );
}
