'use client';
import { useEffect, useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';
import { MarkdownLite } from '@/components/MarkdownLite';
import { SourceLinks, SourceTag } from '@/components/SourceLinks';
import {
  fetchResources,
  parseSelectedUrls,
  splitDesignMd,
  findSection,
  type StyleBlock,
  type ResourcesJson,
} from '@/lib/designExtract';
import { toReactStyle, toCssVarStyle, isLightCssColor } from '@/lib/cssStyle';

const clientName = '株式会社 日立製作所';
const basePath = '/hitachi';
const slug = basePath.replace(/^\//, '');
const primaryColor = 'var(--primary-color)';

/** selectorの語彙から、どのフォーム部品として描画するか推測する */
function renderFormPreview(f: StyleBlock) {
  const s = f.selector.toLowerCase();
  const style = toReactStyle(f.properties);
  if (s.includes('textarea')) {
    return <textarea readOnly rows={2} placeholder="入力例" style={{ font: 'inherit', ...style }} />;
  }
  if (s.includes('select')) {
    return (
      <select style={{ font: 'inherit', ...style }} defaultValue="">
        <option value="" disabled>
          選択してください
        </option>
        <option>選択肢A</option>
      </select>
    );
  }
  if (s.includes('checkbox')) {
    return (
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <input type="checkbox" style={style} />
        チェックボックス
      </label>
    );
  }
  if (s.includes('radio')) {
    return (
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <input type="radio" style={style} />
        ラジオボタン
      </label>
    );
  }
  return <input type="text" readOnly placeholder="入力例" style={{ font: 'inherit', ...style }} />;
}

export default function ComponentsPage() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<ResourcesJson | null>(null);

  useEffect(() => {
    fetchResources(slug).then(setResources).finally(() => setLoading(false));
  }, []);

  const cssInfo = resources?.css_info;
  const borderRadii = Array.from(new Set(cssInfo?.border_radii ?? [])).slice(0, 8);
  const buttonStyles = (cssInfo?.button_styles ?? []).slice(0, 8);
  const cardStyles = (cssInfo?.card_styles ?? []).slice(0, 8);
  const formStyles = (cssInfo?.form_styles ?? []).slice(0, 8);
  const sourceUrls = parseSelectedUrls(resources?.selected_urls);
  const sections = splitDesignMd(resources?.design_md);
  const componentSection = findSection(sections, 'コンポーネント');

  const hasAny =
    borderRadii.length > 0 ||
    buttonStyles.length > 0 ||
    cardStyles.length > 0 ||
    formStyles.length > 0 ||
    !!componentSection;

  return (
    <div className="hitachi-portal" style={toCssVarStyle(cssInfo?.css_variables)}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            COMPONENTS
          </p>
          <h1 className="section-title">コンポーネント集</h1>
          <p className="section-desc">
            対象サイトから抽出したボタン・フォーム・カード・角丸などのUI要素の一覧です。実サイトのCSSプロパティをそのまま適用して表示しています。
          </p>
        </div>

        {loading ? (
          <p style={{ color: '#9ca3af', fontSize: 14 }}>読み込み中...</p>
        ) : !hasAny ? (
          <p style={{ color: '#9ca3af', fontSize: 14 }}>まだリサーチデータがありません。</p>
        ) : (
          <div style={{ display: 'grid', gap: 24 }}>
            {borderRadii.length > 0 && (
              <div className="component-card">
                <div className="component-label">角丸（border-radius）</div>
                <div className="component-render" style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                  {borderRadii.map((r) => (
                    <div key={r} style={{ textAlign: 'center' }}>
                      <div style={{ width: 64, height: 64, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: r }} />
                      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {buttonStyles.map((b, i) => {
              // 濃い背景（ヘッダー等）の上で使う前提の白文字・白枠ボタンは、背景色が
              // 指定されていないことが多い。白いプレビュー面にそのまま置くと文字も枠線も
              // 見えなくなるため、その場合だけプレビュー背景を自動的に暗くする。
              const needsDarkBackdrop =
                !b.properties['background-color'] && !b.properties.background &&
                (isLightCssColor(b.properties.color) || isLightCssColor(b.properties['border-color']));
              return (
                <div className="component-card" key={`btn-${i}`}>
                  <div className="component-label" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                    <span>Button {i + 1}</span>
                    <SourceTag url={b.sourceUrl} />
                  </div>
                  <div
                    className="component-render"
                    style={{ maxHeight: 220, overflow: 'auto', background: needsDarkBackdrop ? '#1f2937' : undefined }}
                  >
                    <button style={{ padding: '10px 24px', fontSize: 14, cursor: 'pointer', ...toReactStyle(b.properties) }}>
                      サンプルボタン
                    </button>
                  </div>
                  {needsDarkBackdrop && (
                    <p style={{ fontSize: 11, color: '#9ca3af', padding: '6px 16px 0' }}>
                      ※ 濃い背景の上で使うボタンのため、プレビュー背景を暗くしています
                    </p>
                  )}
                  <div className="component-code">
                    {`${b.selector}\n${Object.entries(b.properties).map(([k, v]) => `${k}: ${v};`).join('\n')}`}
                  </div>
                </div>
              );
            })}

            {formStyles.map((f, i) => (
              <div className="component-card" key={`form-${i}`}>
                <div className="component-label" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                  <span>Form {i + 1}</span>
                  <SourceTag url={f.sourceUrl} />
                </div>
                <div className="component-render" style={{ maxHeight: 220, overflow: 'auto' }}>
                  {renderFormPreview(f)}
                </div>
                <div className="component-code">
                  {`${f.selector}\n${Object.entries(f.properties).map(([k, v]) => `${k}: ${v};`).join('\n')}`}
                </div>
              </div>
            ))}

            {cardStyles.map((c, i) => (
              <div className="component-card" key={`card-${i}`}>
                <div className="component-label" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                  <span>Card {i + 1}</span>
                  <SourceTag url={c.sourceUrl} />
                </div>
                <div className="component-render" style={{ maxHeight: 220, overflow: 'auto' }}>
                  <div style={{ border: '1px solid #e5e7eb', padding: 20, maxWidth: 360, ...toReactStyle(c.properties) }}>
                    <p style={{ margin: 0, fontSize: 14 }}>カードサンプル</p>
                  </div>
                </div>
                <div className="component-code">
                  {`${c.selector}\n${Object.entries(c.properties).map(([k, v]) => `${k}: ${v};`).join('\n')}`}
                </div>
              </div>
            ))}

            {componentSection && (
              <div className="component-card">
                <div className="component-label">抽出サマリー</div>
                <div className="component-render">
                  <MarkdownLite text={componentSection.body} />
                </div>
              </div>
            )}
          </div>
        )}

        <SourceLinks urls={sourceUrls} />
      </div>
    </div>
  );
}
