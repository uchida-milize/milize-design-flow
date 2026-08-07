import { ClientCardGrid } from '@/components/ClientCardGrid';

const EXCLUDED_DIRS = new Set([
  'components',
  'guidelines',
  'prototype',
  'screens',
  'client-template',  // 汎用テンプレートディレクトリ
  'milize-asset-Portal',  // ポータルテンプレート（一覧非表示）
  'hitachi',
  'sony_corp',
  'sharp-finance-corp',
  'api',
  'dena',
  'group-softbank',
  'httpsdenacomjpcompanypolicylogoguidehtml',
  'panasonic',
  'sharp',
]);

/** CSSから全カラー変数を抽出し、ブランドカラーとして適切なものだけ返す */
function extractBrandColors(css: string): Array<{ hex: string; ratio: number }> {
  // design.md由来の明示的なカラーバー変数を優先（--brand-color-1〜3）
  const explicit: Array<{ hex: string; ratio: number }> = [];
  for (let i = 1; i <= 5; i++) {
    const hexMatch = css.match(new RegExp(`--brand-color-${i}:\\s*(#[0-9a-fA-F]{6})`));
    const ratioMatch = css.match(new RegExp(`--brand-ratio-${i}:\\s*(\\d+)`));
    if (hexMatch) {
      explicit.push({
        hex: hexMatch[1].toLowerCase(),
        ratio: ratioMatch ? parseInt(ratioMatch[1]) : 0,
      });
    }
  }
  if (explicit.length > 0) {
    // 比率が全て0なら均等分配
    const total = explicit.reduce((s, c) => s + c.ratio, 0);
    if (total === 0) {
      const even = [100, 65, 60];
      const rest = [0, 35, 25, 15];
      return explicit.map((c, i) => ({
        hex: c.hex,
        ratio: i === 0 ? (even[explicit.length - 1] ?? 60) : (rest[i] ?? 15),
      }));
    }
    return explicit;
  }

  const varRe = /--([\w-]+):\s*(#[0-9a-fA-F]{3,8}|rgb[a]?\([^)]+\))/g;
  const allVars: Array<{ name: string; hex: string }> = [];
  let m: RegExpExecArray | null;

  while ((m = varRe.exec(css)) !== null) {
    let hex = m[2];
    // rgb/rgba → hex 変換
    if (hex.startsWith('rgb')) {
      const nums = hex.match(/\d+/g);
      if (nums && nums.length >= 3) {
        hex = '#' + nums.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
      } else continue;
    }
    // 3桁 → 6桁
    if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    // 8桁は先頭6桁を使用
    if (/^#[0-9a-fA-F]{8}$/.test(hex)) hex = hex.slice(0, 7);
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      allVars.push({ name: m[1], hex: hex.toLowerCase() });
    }
  }

  if (allVars.length === 0) return [{ hex: '#004A99', ratio: 100 }];

  // 輝度を計算（0=黒, 1=白）
  const lum = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  // 近黒（<10%）・近白（>92%）を除外
  const meaningful = allVars.filter(v => { const l = lum(v.hex); return l > 0.10 && l < 0.92; });

  // 色が近すぎるもの（RGB差の合計<60）を重複除外
  const unique: typeof allVars = [];
  for (const v of meaningful) {
    const dup = unique.some(u => {
      const dr = parseInt(v.hex.slice(1, 3), 16) - parseInt(u.hex.slice(1, 3), 16);
      const dg = parseInt(v.hex.slice(3, 5), 16) - parseInt(u.hex.slice(3, 5), 16);
      const db = parseInt(v.hex.slice(5, 7), 16) - parseInt(u.hex.slice(5, 7), 16);
      return Math.abs(dr) + Math.abs(dg) + Math.abs(db) < 60;
    });
    if (!dup) unique.push(v);
  }

  // 変数名でスコアリング（primary系を優先）
  const scored = unique.map(v => {
    let score = 0;
    if (/primary|main|brand/.test(v.name))     score += 100;
    else if (/secondary|sub/.test(v.name))      score += 50;
    else if (/accent|highlight/.test(v.name))   score += 30;
    else if (/text|fore/.test(v.name))          score += 10;
    else if (/bg|back|light/.test(v.name))      score -= 20;
    return { ...v, score };
  }).sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 4);
  if (top.length === 0) {
    // meaningfulが全て除外された場合は最初のカラーをそのまま使用
    const fallback = allVars[0];
    return fallback ? [{ hex: fallback.hex, ratio: 100 }] : [{ hex: '#004A99', ratio: 100 }];
  }

  const ratios = [50, 25, 15, 10];
  return top.map((v, i) => ({ hex: v.hex, ratio: ratios[i] }));
}

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
        let colors: Array<{ hex: string; ratio: number }> = [{ hex: '#004A99', ratio: 100 }];
        let description = '';
        let name = slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        try {
          const [cssRes, guideRes, pageRes] = await Promise.all([
            fetch(`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/globals.css`, { next: { revalidate: 60 } }),
            fetch(`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/guidelines/page.tsx`, { next: { revalidate: 60 } }),
            fetch(`https://raw.githubusercontent.com/uchida-milize/milize-design-flow/main/src/app/${slug}/page.tsx`, { next: { revalidate: 60 } }),
          ]);
          if (pageRes.ok) {
            const pageSrc = await pageRes.text();
            const m = pageSrc.match(/const clientName\s*(?::\s*string)?\s*=\s*['"`]([^'"`]+)['"`]/);
            if (m) name = m[1];
          }
          if (cssRes.ok) {
            colors = extractBrandColors(await cssRes.text());
          }
          if (guideRes.ok) {
            const src = await guideRes.text();
            const toneIdx = src.search(/TONE\s*[&＆]\s*MANNER/);
            const searchSrc = toneIdx > -1 ? src.slice(toneIdx) : src;
            const m = searchSrc.match(/lineHeight:\s*1\.8[^}]*\}}>([^<\n]+)/);
            if (m) description = m[1].trim();
          }
        } catch { /* ignore */ }
        return { slug, name, colors, description };
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

