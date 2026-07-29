import { ClientCardGrid } from '@/components/ClientCardGrid';

// クライアントディレクトリから除外するディレクトリ名（旧DC残骸 + Next.js予約名 + 削除済みクライアント）
const EXCLUDED_DIRS = new Set([
  'components',
  'guidelines',
  'prototype',
  'screens',
  'hitachi',
  'sony_corp',
  'sharp-finance-corp',
  'milize',
  'api',
  'dena',
  'group-softbank',
  'httpsdenacomjpcompanypolicylogoguidehtml',
  'panasonic',
  'sharp',
  'toyota',
]);

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
      .sort((a, b) => a.localeCompare(b));

    const clients = await Promise.all(
      clientSlugs.map(async (slug): Promise<ClientInfo> => {
        let primaryColor = '#004A99';
        try {
          const cssRes = await fetch(
            `https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/globals.css`,
            { next: { revalidate: 60 } }
          );
          if (cssRes.ok) {
            const css = await cssRes.text();
            const match = css.match(/--color-secondary:\s*(#[0-9a-fA-F]{3,6})/);
            if (match) primaryColor = match[1];
          }
        } catch {
          // ignore
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
            {`クライアント別アセット管理`}
          </span>
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: '#f7f9fc' }}>
        <div className="mx-auto" style={{ maxWidth: 1120, padding: '64px 24px 48px' }}>
          <p className="text-sm font-bold mb-3" style={{ color: '#999' }}>Client Production Portal</p>
          <h1 className="font-bold mb-4" style={{ fontSize: 36, lineHeight: 1.3, color: '#111827' }}>
            {`クライアント別`}<br />
            {`プロダクト＆セールスアセットポータル`}
          </h1>
          <p className="text-sm leading-relaxed" style={{ maxWidth: 560, color: '#6b7280' }}>
            {`WEB・アプリのリサーチから開発仕様の参照、営業資料（PPTX）作成時のトンマナ確認やサンプル出力まで対応。クライアントごとの全デジタル資産を統合管理します。`}
          </p>
        </div>
      </div>

      {/* Client cards */}
      <div className="mx-auto" style={{ maxWidth: 1120, padding: '0 24px 96px' }}>
        {clients.length === 0 ? (
          <p className="text-sm" style={{ color: '#9ca3af' }}>{`クライアントが見つかりませんでした。`}</p>
        ) : (
          <ClientCardGrid clients={clients} />
        )}
      </div>
    </div>
  );
}
