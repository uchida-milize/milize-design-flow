'use client';
import { useEffect, useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import { MarkdownLite } from '@/components/MarkdownLite';
import { SourceLinks } from '@/components/SourceLinks';
import {
  fetchResources,
  parseHexColors,
  parseSelectedUrls,
  splitDesignMd,
  findSection,
  type ResourcesJson,
} from '@/lib/designExtract';

const clientName = '株式会社 日立製作所';
const basePath = '/hitachi';
const slug = basePath.replace(/^\//, '');
const primaryColor = 'var(--primary-color)';

export default function GuidelinesPage() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<ResourcesJson | null>(null);

  useEffect(() => {
    fetchResources(slug).then(setResources).finally(() => setLoading(false));
  }, []);

  const colors = parseHexColors(resources?.css_info?.hex_colors).slice(0, 8);
  const fonts = resources?.css_info?.fonts ?? [];
  const sourceUrls = parseSelectedUrls(resources?.selected_urls);
  const sections = splitDesignMd(resources?.design_md);
  const guidelineSection = findSection(sections, 'ガイドライン');
  const extraSections = sections.filter(
    (s) => s !== guidelineSection && !s.title.includes('コンポーネント'),
  );

  const hasAny = colors.length > 0 || fonts.length > 0 || !!guidelineSection || extraSections.length > 0;

  return (
    <div className="hitachi-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            GUIDELINES
          </p>
          <h1 className="section-title">リサーチガイドライン</h1>
          <p className="section-desc">
            対象サイトをスクレイピングして抽出したブランドカラー・タイポグラフィ・トンマナのまとめです。
          </p>
        </div>

        {loading ? (
          <p style={{ color: '#9ca3af', fontSize: 14 }}>読み込み中...</p>
        ) : !hasAny ? (
          <p style={{ color: '#9ca3af', fontSize: 14 }}>まだリサーチデータがありません。</p>
        ) : (
          <>
            {colors.length > 0 && (
              <section style={{ marginBottom: 48 }}>
                <p className="section-label" style={{ color: primaryColor }}>
                  COLOR
                </p>
                <h2 className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>
                  カラーパレット（抽出頻度順）
                </h2>
                <div className="swatch-grid">
                  {colors.map((c) => (
                    <div className="swatch" key={c.hex}>
                      <div
                        className="swatch-color"
                        style={{
                          background: c.hex,
                          borderBottom: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                        }}
                      />
                      <div className="swatch-info">
                        <div className="swatch-hex">{c.hex}</div>
                        <div className="swatch-name">
                          {c.usages.slice(0, 2).join(', ') || '—'} ・ 出現{c.count}回
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {fonts.length > 0 && (
              <section style={{ marginBottom: 48 }}>
                <p className="section-label" style={{ color: primaryColor }}>
                  TYPOGRAPHY
                </p>
                <h2 className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>
                  使用フォント
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {fonts.slice(0, 10).map((f) => (
                    <div className="card" key={f} style={{ padding: '16px 20px' }}>
                      <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>{f}</p>
                      <p style={{ fontSize: 20, color: '#111827', fontFamily: `${f}, sans-serif` }}>Aa あ亜</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {guidelineSection && (
              <section style={{ marginBottom: 48 }}>
                <p className="section-label" style={{ color: primaryColor }}>
                  TONE &amp; MANNER
                </p>
                <h2 className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>
                  トンマナ解説
                </h2>
                <div className="card">
                  <MarkdownLite text={guidelineSection.body} />
                </div>
              </section>
            )}

            {extraSections.map((s) => (
              <section key={s.title} style={{ marginBottom: 48 }}>
                <h2 className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>
                  {s.title}
                </h2>
                <div className="card">
                  <MarkdownLite text={s.body} />
                </div>
              </section>
            ))}

            <SourceLinks urls={sourceUrls} />
          </>
        )}
      </div>
    </div>
  );
}
