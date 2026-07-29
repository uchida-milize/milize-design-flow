import Link from 'next/link';
import { NewClientButton } from '@/components/NewClientButton';

// クライアントディレクトリから除外するディレクトリ名（旧DC残骸 + Next.js予約名）
const EXCLUDED_DIRS = new Set([
  'components',
  'guidelines',
  'prototype',
  'screens',
]);


const BRAND_COLORS: Record<string, Array<{ hex: string; ratio: number }>> = {
  'hitachi': [
    { hex: '#E60012', ratio: 40 },
    { hex: '#000000', ratio: 20 },
    { hex: '#0071BC', ratio: 15 },
    { hex: '#333333', ratio: 15 },
    { hex: '#FFFFFF', ratio: 10 },
  ],
  'sharp-finance-corp': [
    { hex: '#004A99', ratio: 40 },
    { hex: '#0071BC', ratio: 25 },
    { hex: '#F5A623', ratio: 15 },
    { hex: '#333333', ratio: 12 },
    { hex: '#f0f0f0', ratio: 8 },
  ],
  'sony_corp': [
    { hex: '#000000', ratio: 40 },
    { hex: '#0071BC', ratio: 25 },
    { hex: '#FFFFFF', ratio: 25 },
    { hex: '#F5A623', ratio: 5 },
    { hex: '#333333', ratio: 5 },
  ],
  'milize': [
    { hex: '#0055A4', ratio: 38 },
    { hex: '#00A0E9', ratio: 22 },
    { hex: '#F5A623', ratio: 12 },
    { hex: '#333333', ratio: 18 },
    { hex: '#FFFFFF', ratio: 10 },
  ],
  'group-softbank': [
    { hex: '#0f172a', ratio: 50 },
    { hex: '#374151', ratio: 20 },
    { hex: '#94a3b8', ratio: 15 },
    { hex: '#FFFFFF', ratio: 15 },
  ],
};
type ClientInfo = {
  slug: string;
  name: string;
  primaryColor: string;
};

function slugToName(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

async function getClients(): Promise<ClientInfo[]> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/uchida-milize/milize-design-flow/contents/src/app',
      {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];

    const contents = (await res.json()) as Array<{ name: string; type: string }>;
    const clientSlugs = contents
      .filter((item) => item.type === 'dir' && !EXCLUDED_DIRS.has(item.name))
      .map((item) => item.name)
      .sort((a, b) => {
        const ORDER = ['hitachi', 'sony_corp', 'sharp-finance-corp', 'milize', 'api'];
        const ai = ORDER.indexOf(a);
        const bi = ORDER.indexOf(b);
        if (ai === -1 && bi === -1) return a.localeCompare(b);
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      });

    const clients = await Promise.all(
      clientSlugs.map(async (slug): Promise<ClientInfo> => {
        let primaryColor = '#004A99'; // デフォルトカラー
        try {
          const cssRes = await fetch(
            `https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/globals.css`,
            { next: { revalidate: 60 } }
          );
          if (cssRes.ok) {
            const css = await cssRes.text();
            // --color-secondary（より暗い主カラー）を優先
            const match = css.match(/--color-secondary:\s*(#[0-9a-fA-F]{3,6})/);
            if (match) primaryColor = match[1];
          }
        } catch {
          // globals.css がなければデフォルト色を使用（手動作成クライアント等）
        }
        return { slug, name: slugToName(slug), primaryColor };
      })
    );

    return clients;
  } catch {
    return [];
  }
}

export default async function ClientsIndex() {
  const clients = await getClients();

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      {/* Header */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <div className="mx-auto flex items-center" style={{ maxWidth: 1120, padding: '16px 24px', gap: 12 }}>
          <span className="font-bold text-sm" style={{ color: '#111827', letterSpacing: '-0.01em' }}>
            MILIZE Asset Portal
          </span>
          <span style={{ color: '#e5e7eb' }}>|</span>
          <span className="text-xs font-medium" style={{ color: '#9ca3af' }}>
            クライアント別アセット管理
          </span>
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: '#f7f9fc' }}>
        <div className="mx-auto" style={{ maxWidth: 1120, padding: '64px 24px 48px' }}>
          <p className="text-sm font-bold mb-3" style={{ color: '#999' }}>Client Production Portal</p>
          <h1 className="font-bold mb-4" style={{ fontSize: 36, lineHeight: 1.3, color: '#111827' }}>
            クライアント別<br />プロダクト＆セールスアセットポータル
          </h1>
          <p className="text-sm leading-relaxed" style={{ maxWidth: 560, color: '#6b7280' }}>
            WEB・アプリのリサーチから開発仕様の参照、営業資料（PPTX）作成時のトンマナ確認やサンプル出力まで対応。
            クライアントごとの全デジタル資産を統合管理します。
          </p>
        </div>
      </div>

      {/* Client cards */}
      <div className="mx-auto" style={{ maxWidth: 1120, padding: '0 24px 96px' }}>
        {clients.length === 0 ? (
          <p className="text-sm" style={{ color: '#9ca3af' }}>クライアントが見つかりませんでした。</p>
        ) : (
          <div
            className="grid"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}
          >
            <NewClientButton />
            {clients.map((client) => (
              <Link
                key={client.slug}
                href={`/${client.slug}`}
                className="block"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 16,
                  padding: 0,
                  overflow: 'hidden',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  textDecoration: 'none',
                }}
              >
                <div style={{ display: 'flex', height: 40 }}>
                  {(BRAND_COLORS[client.slug] || [{ hex: client.primaryColor, ratio: 100 }]).map((c) => (
                    <div
                      key={c.hex}
                      style={{
                        flex: c.ratio,
                        backgroundColor: c.hex,
                        border: (c.hex.toUpperCase() === '#FFFFFF' || c.hex === '#f0f0f0') ? '1px solid #e0e0e0' : 'none',
                      }}
                    />
                  ))}
                </div>
                <div style={{ padding: 28 }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold" style={{ fontSize: 18, color: '#111827' }}>{client.name}</p>
                    <p className="text-xs" style={{ color: '#9ca3af', marginTop: 2 }}>{client.slug}</p>
                  </div>
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
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b7280' }}>
                  デザインガイドライン・コンポーネントカタログを確認できます。
                </p>
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
                    デザインシステム
                  </span>
                  <span className="text-sm font-semibold flex items-center" style={{ color: client.primaryColor, gap: 4 }}>
                    開く
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path d="M7 5l5 5-5 5" stroke={client.primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
