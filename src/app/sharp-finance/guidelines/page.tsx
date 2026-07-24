import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const SF_PRIMARY = '#004A99';
const SF_SECONDARY = '#0071BC';
const SF_ACCENT = '#F5A623';
const SF_PRIMARY_LIGHT = '#1a5fa8';
const SF_PRIMARY_DARK = '#003570';

const COLORS = [
  { name: 'Primary', hex: SF_PRIMARY, text: '#fff' },
  { name: 'Primary Dark', hex: SF_PRIMARY_DARK, text: '#fff' },
  { name: 'Primary Light', hex: SF_PRIMARY_LIGHT, text: '#fff' },
  { name: 'Secondary', hex: SF_SECONDARY, text: '#fff' },
  { name: 'Secondary Light', hex: '#2589cc', text: '#fff' },
  { name: 'Accent', hex: SF_ACCENT, text: '#fff' },
  { name: 'Accent Light', hex: '#f7b850', text: '#333' },
  { name: 'Background', hex: '#FFFFFF', text: '#333' },
  { name: 'Gray 50', hex: '#f9f9f9', text: '#333' },
  { name: 'Gray 100', hex: '#f0f0f0', text: '#333' },
  { name: 'Gray 200', hex: '#e0e0e0', text: '#333' },
];

const TEXT_COLORS = [
  { name: 'Text Primary', hex: '#333333' },
  { name: 'Text Muted', hex: '#666666' },
  { name: 'Text Disabled', hex: '#999999' },
];

const TYPE_SCALE = [
  { label: 'Hero (h1)', size: 32, weight: 700, font: '"Hiragino Kaku Gothic ProN", sans-serif' },
  { label: 'Section Title (h2)', size: 20, weight: 700, font: '"Hiragino Kaku Gothic ProN", sans-serif' },
  { label: 'Card Title', size: 16, weight: 600, font: '"Hiragino Sans", sans-serif' },
  { label: 'Body', size: 14, weight: 400, font: '"Hiragino Sans", sans-serif' },
  { label: 'Caption', size: 12, weight: 500, font: '"Hiragino Sans", sans-serif' },
];

const SECTIONS = [
  { id: 'color', label: 'カラー' },
  { id: 'typography', label: 'タイポグラフィ' },
  { id: 'buttons', label: 'ボタン' },
  { id: 'spacing', label: 'スペーシング' },
  { id: 'accessibility', label: 'アクセシビリティ' },
];

export default function SFGuidelinesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      <ClientPortalHeader
        clientName="Sharp Finance"
        basePath="/sharp-finance"
        active="guidelines"
        primaryColor={SF_PRIMARY}
      />

      <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <div className="mx-auto" style={{ maxWidth: 1120, padding: '48px 24px 32px' }}>
          <p className="text-sm font-bold mb-2" style={{ color: SF_PRIMARY }}>Guidelines</p>
          <h1 className="font-bold" style={{ fontSize: 32, color: '#111827' }}>デザインガイドライン</h1>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 1120, padding: '32px 24px 96px' }}>
        {/* Anchor nav */}
        <nav
          className="flex flex-wrap sticky"
          style={{ gap: 8, top: 0, zIndex: 10, background: '#f7f9fc', padding: '8px 0 24px' }}
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm font-medium"
              style={{
                color: SF_PRIMARY,
                background: '#e8f0fb',
                border: `1px solid #c0d4ef`,
                borderRadius: 999,
                padding: '6px 14px',
                textDecoration: 'none',
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* Color */}
        <Section id="color" title="カラー" desc="コーポレートブルーを主軸に、アクセントオレンジで重要な情報を強調します。" primaryColor={SF_PRIMARY}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {COLORS.map((c) => (
              <div key={c.hex} style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
                <div style={{ height: 60, background: c.hex, display: 'flex', alignItems: 'flex-end', padding: 8 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: c.text }}>{c.hex}</span>
                </div>
                <div style={{ padding: '8px 10px' }}>
                  <p className="text-xs font-semibold" style={{ color: '#111827' }}>{c.name}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#111827' }}>テキストカラー</p>
          <div className="flex flex-wrap" style={{ gap: 12 }}>
            {TEXT_COLORS.map((c) => (
              <div
                key={c.hex}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: '8px 14px',
                }}
              >
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: c.hex, display: 'inline-block', border: '1px solid #e5e7eb' }} />
                <span className="text-sm" style={{ color: '#374151' }}>{c.name}</span>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#9ca3af' }}>{c.hex}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section id="typography" title="タイポグラフィ" desc="見出しは游ゴシック・Hiragino Kaku Gothic ProNを使用。本文はHiragino Sansで可読性を確保します。" primaryColor={SF_PRIMARY}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
            {TYPE_SCALE.map((t) => (
              <div key={t.label} className="flex items-baseline justify-between" style={{ padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: t.size, fontWeight: t.weight, color: '#333333', fontFamily: t.font }}>
                  {t.label} サンプルテキスト
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#9ca3af' }}>{t.size}px / {t.weight}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Buttons */}
        <Section id="buttons" title="ボタン・インタラクション" desc="プライマリアクションはブルー塗りつぶし、セカンダリはアウトライン、アクセントはオレンジを使用します。" primaryColor={SF_PRIMARY}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p className="text-xs font-semibold mb-1" style={{ color: '#9ca3af' }}>Primary</p>
                <button
                  style={{
                    background: SF_PRIMARY,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: 200,
                  }}
                >
                  申込む
                </button>
                <button
                  style={{
                    background: '#cccccc',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'not-allowed',
                    width: 200,
                  }}
                  disabled
                >
                  申込む（disabled）
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p className="text-xs font-semibold mb-1" style={{ color: '#9ca3af' }}>Secondary (Outline)</p>
                <button
                  style={{
                    background: 'transparent',
                    color: SF_PRIMARY,
                    border: `1.5px solid ${SF_PRIMARY}`,
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: 200,
                  }}
                >
                  詳細を見る
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p className="text-xs font-semibold mb-1" style={{ color: '#9ca3af' }}>Accent</p>
                <button
                  style={{
                    background: SF_ACCENT,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: 200,
                  }}
                >
                  今すぐ相談
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* Spacing */}
        <Section id="spacing" title="スペーシング・シャドウ" desc="4の倍数を基準とした余白システムと、ブルー系の影を使用します。" primaryColor={SF_PRIMARY}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
            <div className="flex flex-wrap" style={{ gap: 20, alignItems: 'flex-end' }}>
              {[4, 8, 16, 24, 32, 48].map((n) => (
                <div key={n} className="flex flex-col items-center" style={{ gap: 6 }}>
                  <div style={{ width: n, height: n, background: '#e8f0fb', border: `1px solid ${SF_PRIMARY}`, borderRadius: 2 }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#9ca3af' }}>{n}px</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6" style={{ gap: 16 }}>
              {[
                { label: 'shadow-sm', shadow: '0 1px 2px rgba(0,0,0,0.06)' },
                { label: 'shadow-md', shadow: '0 4px 8px rgba(0,74,153,0.1)' },
                { label: 'shadow-lg', shadow: '0 10px 24px rgba(0,74,153,0.14)' },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    width: 120,
                    height: 64,
                    background: '#fff',
                    borderRadius: 8,
                    boxShadow: s.shadow,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#9ca3af' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Accessibility */}
        <Section id="accessibility" title="アクセシビリティ" desc="医療従事者が素早く判断できる、コントラストと操作性を重視したデザインルールです。" primaryColor={SF_PRIMARY}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
            <ul className="text-sm leading-relaxed" style={{ color: '#374151', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>・タップ領域は最小44×44pxを確保する</li>
              <li>・本文テキスト（#333333）と白背景のコントラスト比はAA基準（4.5:1）以上を維持する</li>
              <li>・プライマリカラー（#004A99）と白のコントラスト比は9.7:1でAAAを満たす</li>
              <li>・重要な情報は色だけでなく、アイコン・ラベル・形状でも伝える</li>
              <li>・フォーカス状態は2pxのアウトラインを使用して視認性を確保する</li>
            </ul>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  id, title, desc, children, primaryColor,
}: {
  id: string; title: string; desc: string; children: React.ReactNode; primaryColor: string;
}) {
  return (
    <section id={id} style={{ scrollMarginTop: 24, marginBottom: 48 }}>
      <h2 className="font-bold mb-1" style={{ fontSize: 20, color: '#111827' }}>{title}</h2>
      <p className="text-sm mb-4" style={{ color: '#6b7280' }}>{desc}</p>
      {children}
    </section>
  );
}
