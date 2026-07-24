'use client';
import { useState } from 'react';
import Image from 'next/image';
import { PortalHeader } from '@/components/PortalHeader';
import { ScoreNumber } from '@/components/ScoreDigits';

const CATEGORIES = [
  { id: 'buttons', label: 'ボタン' },
  { id: 'cards', label: 'カード' },
  { id: 'badges', label: 'バッジ・タグ' },
  { id: 'progress', label: 'プログレス・スコア' },
  { id: 'icons', label: 'アイコン・マスコット' },
  { id: 'forms', label: 'フォーム要素' },
];

export default function ComponentsPage() {
  const [selected, setSelected] = useState('a');
  const [progress, setProgress] = useState(65);

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      <PortalHeader active="components" />

      <div style={{ background: '#f7f9fc' }}>
        <div className="mx-auto" style={{ maxWidth: 1120, padding: '48px 24px 32px' }}>
          <p className="text-sm font-bold mb-2" style={{ color: '#2563eb' }}>Components</p>
          <h1 className="font-bold" style={{ fontSize: 32, color: '#091946' }}>コンポーネントカタログ</h1>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 1120, padding: '32px 24px 96px' }}>
        <nav className="flex flex-wrap sticky" style={{ gap: 8, top: 0, zIndex: 10, background: '#f7f9fc', padding: '8px 0 24px' }}>
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="text-sm font-medium"
              style={{ color: '#2563eb', background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 999, padding: '6px 14px' }}>
              {c.label}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <Section id="buttons" title="ボタン">
          <Example label="btn-primary" code={`<button className="btn-primary">診断を開始する</button>`}>
            <button className="btn-primary" style={{ width: 240 }}>診断を開始する</button>
          </Example>
          <Example label="btn-primary（disabled）" code={`<button className="btn-primary" disabled>次へ</button>`}>
            <button className="btn-primary" disabled style={{ width: 240 }}>次へ</button>
          </Example>
          <Example label="btn-secondary" code={`<button className="btn-secondary">戻る</button>`}>
            <button className="btn-secondary" style={{ width: 240 }}>戻る</button>
          </Example>
        </Section>

        {/* Cards */}
        <Section id="cards" title="カード">
          <Example label="glass-card" code={`<div className="glass-card" style={{ padding: 20 }}>...</div>`}>
            <div className="glass-card" style={{ padding: 20, width: 280 }}>
              <p className="text-sm font-semibold mb-1" style={{ color: '#091946' }}>glass-card</p>
              <p className="text-xs" style={{ color: '#6b7280' }}>半透明・ぼかし背景の基本カード</p>
            </div>
          </Example>
          <Example label="option-card" code={`<button className="option-card">選択肢テキスト</button>`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 280 }}>
              <button className="option-card" onClick={() => setSelected('a')}>
                <span className="text-sm" style={{ color: '#111827' }}>選択肢A</span>
              </button>
              <button className={`option-card${selected === 'b' ? ' selected' : ''}`} onClick={() => setSelected('b')}>
                <span className="text-sm" style={{ color: selected === 'b' ? '#2563eb' : '#111827' }}>選択肢B（クリックで選択）</span>
              </button>
            </div>
          </Example>
          <Example label="Step card" code={`<div className="p-5 rounded-2xl text-center" style={{ background: '#fff' }}>...</div>`}>
            <div className="p-5 rounded-2xl text-center" style={{ background: '#fff', border: '1px solid #eef2ff', width: 220 }}>
              <div className="w-8 h-8 mx-auto mb-2 rounded-full border-2 flex items-center justify-center text-sm font-bold"
                style={{ borderColor: '#2563eb', color: '#2563eb' }}>1</div>
              <p className="font-bold text-sm mb-1" style={{ color: '#2563eb' }}>簡単な質問に回答</p>
              <p className="text-xs" style={{ color: '#6b7280' }}>数分で完了する質問に回答</p>
            </div>
          </Example>
        </Section>

        {/* Badges */}
        <Section id="badges" title="Badges & Tags">
          <Example label="Tier badge（高評価）" code={`<span style={{ background: '#eff6ff', color: '#2563eb' }}>開業適性が高いです</span>`}>
            <span className="text-sm font-semibold" style={{ background: '#eff6ff', color: '#2563eb', borderRadius: 999, padding: '6px 14px' }}>
              開業適性が高いです
            </span>
          </Example>
          <Example label="Success badge" code={`<span style={{ background: '#dcfce7', color: '#16a34a' }}>審査通過</span>`}>
            <span className="text-sm font-semibold" style={{ background: '#dcfce7', color: '#16a34a', borderRadius: 999, padding: '6px 14px' }}>
              審査通過
            </span>
          </Example>
          <Example label="Matching % tag" code={`<span style={{ background: '#2563eb', color: '#fff' }}>マッチ度 92%</span>`}>
            <span className="text-sm font-semibold" style={{ background: '#2563eb', color: '#fff', borderRadius: 999, padding: '6px 14px' }}>
              マッチ度 92%
            </span>
          </Example>
        </Section>

        {/* Progress & Score */}
        <Section id="progress" title="Progress & Score">
          <Example label="progress-bar" code={`<div className="progress-bar"><div className="progress-bar-fill" style={{ width: '65%' }} /></div>`}>
            <div style={{ width: 280 }}>
              <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${progress}%` }} /></div>
              <input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="mt-3 w-full" />
            </div>
          </Example>
          <Example label="ScoreNumber" code={`<ScoreNumber value={78} height={72} color="#2563eb" />`}>
            <ScoreNumber value={78} height={64} color="#2563eb" />
          </Example>
        </Section>

        {/* Icons & Mascots */}
        <Section id="icons" title="Icons & Mascots">
          <Example label="Mascots" code={`<Image src="/mascot-1.png" width={80} height={80} />`}>
            <div className="flex items-center" style={{ gap: 16 }}>
              <Image src="/mascot-1.png" alt="" width={72} height={72} className="mascot-float" />
              <Image src="/mascot-2.png" alt="" width={64} height={64} className="mascot-float" />
            </div>
          </Example>
          <Example label="Custom icons" code={`<Image src="/location-pin-eye.svg" width={20} height={20} />`}>
            <div className="flex" style={{ gap: 16 }}>
              {['location-pin-eye', 'watch-circle', 'phone-flip', 'icon_trust', 'check', 'face-laugh-beam'].map((n) => (
                <div key={n} className="flex items-center justify-center" style={{ width: 40, height: 40, background: '#eff6ff', borderRadius: 10 }}>
                  <Image src={`/${n}.svg`} alt={n} width={18} height={18} />
                </div>
              ))}
            </div>
          </Example>
        </Section>

        {/* Form Elements */}
        <Section id="forms" title="Form Elements">
          <Example label="Radio option group" code={`{options.map(o => <button className="option-card">...</button>)}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 300 }}>
              {['SNSや広告を強化', '診療時間や内容を見直す', '立地や競合を再分析'].map((label) => (
                <button key={label} className={`option-card${selected === label ? ' selected' : ''}`} onClick={() => setSelected(label)}>
                  <span className="text-sm" style={{ color: selected === label ? '#2563eb' : '#111827' }}>{label}</span>
                </button>
              ))}
            </div>
          </Example>
          <Example label="Textarea" code={`<textarea className="option-card" style={{ minHeight: 96 }} />`}>
            <textarea
              placeholder="自由にご記入ください"
              className="option-card"
              style={{ minHeight: 96, width: 300, resize: 'none' }}
            />
          </Example>
        </Section>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 24, marginBottom: 56 }}>
      <h2 className="font-bold mb-5" style={{ fontSize: 20, color: '#091946' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>
    </section>
  );
}

function Example({ label, code, children }: { label: string; code: string; children: React.ReactNode }) {
  return (
    <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '10px 20px', borderBottom: '1px solid #f0f2f7' }}>
        <span className="text-xs font-semibold" style={{ color: '#6b7280' }}>{label}</span>
      </div>
      <div style={{ padding: 24, display: 'flex', alignItems: 'center' }}>{children}</div>
      <pre style={{ margin: 0, padding: '12px 20px', background: '#0f1830', color: '#93c5fd', fontSize: 12, overflowX: 'auto' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
