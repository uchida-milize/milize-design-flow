import Image from 'next/image';
import { PortalHeader } from '@/components/PortalHeader';

const COLORS = [
  { name: 'Navy (Primary Dark)', hex: '#091946', text: '#fff' },
  { name: 'Blue (Primary)', hex: '#2563eb', text: '#fff' },
  { name: 'Blue Light', hex: '#3b82f6', text: '#fff' },
  { name: 'Blue 50', hex: '#eff6ff', text: '#091946' },
  { name: 'Blue 100', hex: '#dbeafe', text: '#091946' },
  { name: 'Blue 200', hex: '#bfdbfe', text: '#091946' },
  { name: 'Success Green', hex: '#16a34a', text: '#fff' },
  { name: 'Success Green BG', hex: '#dcfce7', text: '#16a34a' },
  { name: 'Alert Red', hex: '#ef4444', text: '#fff' },
];

const TEXT_COLORS = [
  { name: 'Text Primary', hex: '#111827' },
  { name: 'Text Secondary', hex: '#374151' },
  { name: 'Text Muted', hex: '#6b7280' },
];

const TYPE_SCALE = [
  { label: 'Hero (h1)', size: 32, weight: 700 },
  { label: 'Section Title (h2)', size: 20, weight: 700 },
  { label: 'Card Title', size: 16, weight: 600 },
  { label: 'Body', size: 14, weight: 400 },
  { label: 'Caption', size: 12, weight: 500 },
];

const SECTIONS = [
  { id: 'color', label: 'カラー' },
  { id: 'typography', label: 'タイポグラフィ' },
  { id: 'buttons', label: 'ボタン・インタラクション' },
  { id: 'icons', label: 'アイコン・マスコット' },
  { id: 'accessibility', label: 'アクセシビリティ' },
];

export default function GuidelinesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      <PortalHeader active="guidelines" />

      <div style={{ background: '#f7f9fc' }}>
        <div className="mx-auto" style={{ maxWidth: 1120, padding: '48px 24px 32px' }}>
          <p className="text-sm font-bold mb-2" style={{ color: '#2563eb' }}>Guidelines</p>
          <h1 className="font-bold" style={{ fontSize: 32, color: '#091946' }}>デザインガイドライン</h1>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 1120, padding: '32px 24px 96px' }}>
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
                color: '#2563eb',
                background: '#eff6ff',
                border: '1px solid #dbeafe',
                borderRadius: 999,
                padding: '6px 14px',
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <Section id="color" title="カラー" desc="紺（Navy）と青（Blue）を基調に、意味づけされた補助色を最小限に使用します。">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {COLORS.map((c) => (
              <div key={c.hex} className="glass-card overflow-hidden" style={{ padding: 0 }}>
                <div style={{ height: 64, background: c.hex, display: 'flex', alignItems: 'flex-end', padding: 10 }}>
                  <span className="text-xs font-mono" style={{ color: c.text }}>{c.hex}</span>
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>{c.name}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm font-semibold mt-6 mb-2" style={{ color: '#111827' }}>テキストカラー</p>
          <div className="flex flex-wrap" style={{ gap: 14 }}>
            {TEXT_COLORS.map((c) => (
              <div key={c.hex} className="glass-card flex items-center" style={{ padding: '10px 16px', gap: 10 }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', background: c.hex, display: 'inline-block' }} />
                <span className="text-sm" style={{ color: '#374151' }}>{c.name}</span>
                <span className="text-xs font-mono" style={{ color: '#9ca3af' }}>{c.hex}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="typography" title="タイポグラフィ" desc="フォントは Inter を使用。見出しは太字、本文はグレー系で可読性を確保します。">
          <div className="glass-card" style={{ padding: 24 }}>
            {TYPE_SCALE.map((t) => (
              <div key={t.label} className="flex items-baseline justify-between" style={{ padding: '14px 0', borderBottom: '1px solid #f0f2f7' }}>
                <span style={{ fontSize: t.size, fontWeight: t.weight, color: '#091946', fontFamily: 'Inter' }}>
                  {t.label} サンプルテキスト
                </span>
                <span className="text-xs font-mono" style={{ color: '#9ca3af' }}>{t.size}px / {t.weight}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="buttons" title="ボタン・インタラクション" desc="主要アクションは btn-primary（グラデーション）、副次アクションは btn-secondary（アウトライン）。">
          <div className="glass-card" style={{ padding: 24 }}>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div>
                <button className="btn-primary mb-2">btn-primary</button>
                <button className="btn-primary" disabled>disabled</button>
              </div>
              <div>
                <button className="btn-secondary mb-2">btn-secondary</button>
              </div>
              <div>
                <button className="option-card" style={{ maxWidth: 260 }}>
                  <span className="text-sm" style={{ color: '#111827' }}>option-card（未選択）</span>
                </button>
              </div>
              <div>
                <button className="option-card selected" style={{ maxWidth: 260 }}>
                  <span className="text-sm font-medium" style={{ color: '#2563eb' }}>option-card（選択済）</span>
                </button>
              </div>
            </div>
          </div>
        </Section>

        <Section id="icons" title="アイコン・マスコット運用ルール" desc="コンパスをモチーフにした2体のマスコットと、線画スタイルのカスタムSVGアイコンを使用します。">
          <div className="glass-card" style={{ padding: 24 }}>
            <div className="flex items-center gap-6 mb-6">
              <Image src="/mascot-1.png" alt="mascot 1" width={80} height={80} />
              <Image src="/mascot-2.png" alt="mascot 2" width={80} height={80} />
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280', maxWidth: 480 }}>
                mascot-1（大）を主役として手前に、mascot-2（小）を後方に重ねて配置するのが基本形。
                浮遊アニメーション（mascot-float）で親しみやすさを演出します。
              </p>
            </div>
            <p className="text-sm font-semibold mb-3" style={{ color: '#111827' }}>カスタムアイコン</p>
            <div className="flex flex-wrap" style={{ gap: 20 }}>
              {['location-pin-eye', 'watch-circle', 'phone-flip', 'icon_trust', 'check'].map((name) => (
                <div key={name} className="flex flex-col items-center" style={{ gap: 6 }}>
                  <div className="flex items-center justify-center" style={{ width: 44, height: 44, background: '#eff6ff', borderRadius: 12 }}>
                    <Image src={`/${name}.svg`} alt={name} width={20} height={20} />
                  </div>
                  <span className="text-xs font-mono" style={{ color: '#9ca3af' }}>{name}.svg</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="accessibility" title="アクセシビリティ" desc="医師・スタッフを含む幅広いユーザーが迷わず操作できることを重視します。">
          <div className="glass-card" style={{ padding: 24 }}>
            <ul className="text-sm leading-relaxed" style={{ color: '#374151', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>・タップ領域は最小44×44pxを確保する（btn-primary/secondaryは高さ48px以上）</li>
              <li>・本文テキストと背景のコントラスト比はAA基準（4.5:1）以上を維持する</li>
              <li>・選択状態は色だけでなく枠線・背景の変化でも示す（option-card.selected参照）</li>
              <li>・重要な数値（スコア等）はサイズ・太さ・色の3点で強調し、単色のみに依存しない</li>
            </ul>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ id, title, desc, children }: { id: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 24, marginBottom: 48 }}>
      <h2 className="font-bold mb-1" style={{ fontSize: 20, color: '#091946' }}>{title}</h2>
      <p className="text-sm mb-4" style={{ color: '#6b7280' }}>{desc}</p>
      {children}
    </section>
  );
}
