'use client';
import { useEffect, useState } from 'react';
import { fetchResources, type BrandIdentity } from '@/lib/designExtract';

interface BrandIdentitySectionProps {
  slug: string;
  primaryColor?: string;
}

const FIELD_LABELS: Array<{ key: keyof BrandIdentity; en: string; ja: string }> = [
  { key: 'mission', en: 'MISSION', ja: 'ミッション' },
  { key: 'vision', en: 'VISION', ja: 'ビジョン' },
  { key: 'value', en: 'VALUE', ja: 'バリュー' },
  { key: 'brand_concept', en: 'BRAND CONCEPT', ja: 'ブランドコンセプト' },
  { key: 'purpose', en: 'PURPOSE', ja: 'パーパス' },
  { key: 'brand_promise', en: 'BRAND PROMISE', ja: 'ブランドプロミス' },
  { key: 'tagline', en: 'TAGLINE', ja: 'タグライン' },
  { key: 'brand_statement', en: 'BRAND STATEMENT', ja: 'ブランドステートメント' },
];

/**
 * GUIDELINES/COMPONENTS/RESOURCESの3カードの下に置く、企業理念セクション。
 * resources.json の brand_identity（Mission/Vision/Value等、公式情報源から調査済みのもの）を
 * 実行時にfetchして描画する。項目が存在しない企業ではセクションごと非表示にする。
 */
export function BrandIdentitySection({ slug, primaryColor = '#111827' }: BrandIdentitySectionProps) {
  const [identity, setIdentity] = useState<BrandIdentity | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchResources(slug).then((data) => {
      if (cancelled) return;
      setIdentity(data?.brand_identity ?? null);
      setLoaded(true);
    });
    return () => { cancelled = true; };
  }, [slug]);

  const entries = FIELD_LABELS
    .map((f) => ({ ...f, value: identity?.[f.key] }))
    .filter((f) => f.value && (Array.isArray(f.value) ? f.value.length > 0 : true));

  if (!loaded || entries.length === 0) return null;

  return (
    <div style={{ marginTop: 40 }}>
      <p className="section-label" style={{ color: primaryColor }}>
        BRAND IDENTITY
      </p>
      <h2 className="section-title" style={{ fontSize: 20, marginBottom: 20 }}>
        企業理念・ブランド指針
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
        }}
      >
        {entries.map((f) => (
          <div
            key={f.key}
            style={{
              background: '#ffffff',
              borderRadius: 20,
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              padding: 24,
            }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: '0.05em', margin: '0 0 4px' }}>
              {f.en}
            </p>
            <p style={{ fontSize: 13, color: '#9ca3af', margin: '0 0 12px' }}>{f.ja}</p>
            {Array.isArray(f.value) ? (
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: '#374151', lineHeight: 1.8 }}>
                {f.value.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>
                {f.value}
              </p>
            )}
          </div>
        ))}
      </div>
      {identity?.sources && identity.sources.length > 0 && (
        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 16 }}>
          出典:{' '}
          {identity.sources.map((url, i) => (
            <span key={url}>
              {i > 0 && ', '}
              <a href={url} target="_blank" rel="noreferrer" style={{ color: '#9ca3af', textDecoration: 'underline' }}>
                {url}
              </a>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
