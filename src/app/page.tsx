import { ClientCardGrid } from '@/components/ClientCardGrid';

const EXCLUDED_DIRS = new Set([
  'components',
  'guidelines',
  'prototype',
  'screens',
  'client-template',  // 汎用テンプレートディレクトリ
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
]);

async function getClients() {
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
      clientSlugs.map(async (slug) => {
        const defaultColors = [{ hex: '#004A99', ratio: 100 }];
        let colors = defaultColors;
        let description = '';
        try {
          const [cssRes, guideRes] = await Promise.all([
            fetch(`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/globals.css`, { next: { revalidate: 60 } }),
            fetch(`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/guidelines/page.tsx`, { next: { revalidate: 60 } }),
          ]);
          if (cssRes.ok) {
            const css = await cssRes.text();
            const vars = [
              { key: '--primary-color',   ratio: 35 },
              { key: '--secondary-color', ratio: 25 },
              { key: '--accent-color',    ratio: 20 },
              { key: '--text-color',      ratio: 15 },
              { key: '--bg-color',        ratio: 5  },
              { key: '--color-secondary', ratio: 100 },
            ];
            const extracted: { hex: string; ratio: number }[] = [];
            for (const v of vars) {
              const m = css.match(new RegExp(v.key.replace(/-/g, '\\-') + ':\\s*(#[0-9a-fA-F]{3,6})'));
              if (m) extracted.push({ hex: m[1], ratio: v.ratio });
            }
            if (extracted.length === 1 && extracted[0].ratio === 100) {
              colors = extracted;
            } else if (extracted.length > 1) {
              colors = extracted.filter(c => c.ratio !== 100);
            }
          }
          if (guideRes.ok) {
            const src = await guideRes.text();
            // TONE & MANNER セクション内の説明文を抽出
            const toneIdx = src.search(/TONE\s*[&＆]\s*MANNER/);
            const searchSrc = toneIdx > -1 ? src.slice(toneIdx) : src;
            const m = searchSrc.match(/lineHeight:\s*1\.8[^}]*\}}>([^<\n]+)/);
            if (m) description = m[1].trim();
          }
        } catch { /* ignore */ }
        return { slug, name: slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), colors, description };
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

      <div style={{ background: '#f7f9fc' }}>
        <div className="mx-auto" style={{ maxWidth: 1120, padding: '64px 24px 48px' }}>
          <p className="text-sm font-bold mb-3" style={{ color: '#999' }}>Client Production Portal</p>
          <h1 className="font-bold mb-4" style={{ fontSize: 36, lineHeight: 1.3, color: '#111827' }}>
            {`クライアント別`}<br />
            {`プロダクト＆セールスアセットポータル`}
          </h1>
          <p className="text-sm leading-relaxed" style={{ maxWidth: 560, color: '#6b7280' }}>
            {`WEB・アプリのリサーチから開発仕様の参照、営業資料（PPTX）作成時のトンマナ確認やサンプル出力まで対応。クライアントごとの全デジタル資産の管理を推進します。`}
          </p>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 1120, padding: '0 24px 96px' }}>
        <ClientCardGrid clients={clients} />
      </div>
    </div>
  );
}

