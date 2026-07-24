'use client';
import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const SF_PRIMARY = '#004A99';
const SF_SECONDARY = '#0071BC';
const SF_ACCENT = '#F5A623';

const CATEGORIES = [
  { id: 'buttons', label: 'ボタン' },
  { id: 'cards', label: 'カード' },
  { id: 'badges', label: 'バッジ・タグ' },
  { id: 'forms', label: 'フォーム要素' },
  { id: 'feedback', label: 'フィードバック' },
];

export default function SFComponentsPage() {
  const [selectedOption, setSelectedOption] = useState('a');
  const [inputValue, setInputValue] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      <ClientPortalHeader
        clientName="Sharp Finance"
        basePath="/sharp-finance"
        active="components"
        primaryColor={SF_PRIMARY}
      />

      <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <div className="mx-auto" style={{ maxWidth: 1120, padding: '48px 24px 32px' }}>
          <p className="text-sm font-bold mb-2" style={{ color: SF_PRIMARY }}>Components</p>
          <h1 className="font-bold" style={{ fontSize: 32, color: '#111827' }}>コンポーネントカタログ</h1>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 1120, padding: '32px 24px 96px' }}>
        {/* Anchor nav */}
        <nav className="flex flex-wrap sticky" style={{ gap: 8, top: 0, zIndex: 10, background: '#f7f9fc', padding: '8px 0 24px' }}>
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
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
              {c.label}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <Section id="buttons" title="ボタン">
          <Example label="Primary Button" code={`background: #004A99; color: #fff; border-radius: 8px; padding: 12px 24px;`}>
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
              }}
            >
              申込む
            </button>
          </Example>
          <Example label="Secondary Button" code={`border: 1.5px solid #004A99; color: #004A99; background: transparent;`}>
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
              }}
            >
              詳細を見る
            </button>
          </Example>
          <Example label="Accent Button" code={`background: #F5A623; color: #fff; font-weight: 700;`}>
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
              }}
            >
              今すぐ相談
            </button>
          </Example>
        </Section>

        {/* Cards */}
        <Section id="cards" title="カード">
          <Example label="Info Card" code={`background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,74,153,0.1);`}>
            <div
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                padding: 20,
                boxShadow: '0 4px 8px rgba(0,74,153,0.1)',
                width: 280,
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: SF_PRIMARY }}>医師向けローン</p>
              <p className="text-xs leading-relaxed" style={{ color: '#666666' }}>開業・設備投資に最適なファイナンシャルプランをご提案します。</p>
            </div>
          </Example>
          <Example label="Feature Card（左ボーダー）" code={`border-left: 4px solid #004A99;`}>
            <div
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderLeft: `4px solid ${SF_PRIMARY}`,
                borderRadius: '0 12px 12px 0',
                padding: 20,
                width: 280,
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: '#111827' }}>最短3日で審査完了</p>
              <p className="text-xs" style={{ color: '#666666' }}>必要書類のご提出から最短3営業日で審査結果をご連絡します。</p>
            </div>
          </Example>
          <Example label="Option Card（選択可能）" code={`border: 1.5px solid #004A99; border-radius: 8px; cursor: pointer;`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 280 }}>
              {['500万円', '1,000万円', '3,000万円'].map((label) => (
                <button
                  key={label}
                  onClick={() => setSelectedOption(label)}
                  style={{
                    background: selectedOption === label ? '#e8f0fb' : '#fff',
                    border: `1.5px solid ${selectedOption === label ? SF_PRIMARY : '#e0e0e0'}`,
                    borderRadius: 8,
                    padding: '12px 16px',
                    fontSize: 14,
                    fontWeight: selectedOption === label ? 600 : 400,
                    color: selectedOption === label ? SF_PRIMARY : '#333333',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </Example>
        </Section>

        {/* Badges */}
        <Section id="badges" title="バッジ・タグ">
          <Example label="Status Badge — 審査中" code={`background: #e8f0fb; color: #004A99;`}>
            <span
              className="text-xs font-semibold"
              style={{ background: '#e8f0fb', color: SF_PRIMARY, borderRadius: 999, padding: '5px 12px' }}
            >
              審査中
            </span>
          </Example>
          <Example label="Status Badge — 承認済み" code={`background: #dcfce7; color: #16a34a;`}>
            <span
              className="text-xs font-semibold"
              style={{ background: '#dcfce7', color: '#16a34a', borderRadius: 999, padding: '5px 12px' }}
            >
              承認済み
            </span>
          </Example>
          <Example label="Accent Tag" code={`background: #F5A623; color: #fff;`}>
            <span
              className="text-xs font-semibold"
              style={{ background: SF_ACCENT, color: '#fff', borderRadius: 4, padding: '4px 10px' }}
            >
              期間限定
            </span>
          </Example>
          <Example label="Category Tag" code={`background: #f0f0f0; color: #4d4d4d;`}>
            <span
              className="text-xs font-semibold"
              style={{ background: '#f0f0f0', color: '#4d4d4d', borderRadius: 4, padding: '4px 10px' }}
            >
              医師向け
            </span>
          </Example>
        </Section>

        {/* Forms */}
        <Section id="forms" title="フォーム要素">
          <Example label="テキスト入力" code={`border: 1px solid #cccccc; border-radius: 6px; padding: 10px 14px; focus: border-color: #004A99;`}>
            <input
              type="text"
              placeholder="お名前を入力してください"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                width: 280,
                border: `1px solid ${inputValue ? SF_PRIMARY : '#cccccc'}`,
                borderRadius: 6,
                padding: '10px 14px',
                fontSize: 14,
                color: '#333333',
                outline: 'none',
              }}
            />
          </Example>
          <Example label="セレクトボックス" code={`border: 1px solid #cccccc; border-radius: 6px;`}>
            <select
              style={{
                width: 280,
                border: '1px solid #cccccc',
                borderRadius: 6,
                padding: '10px 14px',
                fontSize: 14,
                color: '#333333',
                background: '#fff',
                outline: 'none',
              }}
            >
              <option>診療科目を選択</option>
              <option>内科</option>
              <option>外科</option>
              <option>眼科</option>
            </select>
          </Example>
        </Section>

        {/* Feedback */}
        <Section id="feedback" title="フィードバック">
          <Example label="Info Banner" code={`background: #e8f0fb; border-left: 4px solid #004A99;`}>
            <div
              style={{
                background: '#e8f0fb',
                borderLeft: `4px solid ${SF_PRIMARY}`,
                borderRadius: '0 8px 8px 0',
                padding: '14px 18px',
                width: 320,
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: SF_PRIMARY }}>ご確認ください</p>
              <p className="text-xs leading-relaxed" style={{ color: '#333333' }}>書類提出後、3営業日以内にご連絡いたします。</p>
            </div>
          </Example>
          <Example label="Success Banner" code={`background: #dcfce7; border-left: 4px solid #16a34a;`}>
            <div
              style={{
                background: '#dcfce7',
                borderLeft: '4px solid #16a34a',
                borderRadius: '0 8px 8px 0',
                padding: '14px 18px',
                width: 320,
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: '#16a34a' }}>申込み完了</p>
              <p className="text-xs leading-relaxed" style={{ color: '#333333' }}>申込みを受け付けました。担当者よりご連絡いたします。</p>
            </div>
          </Example>
        </Section>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 24, marginBottom: 56 }}>
      <h2 className="font-bold mb-5" style={{ fontSize: 20, color: '#111827' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>
    </section>
  );
}

function Example({ label, code, children }: { label: string; code: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '10px 20px', borderBottom: '1px solid #f0f0f0' }}>
        <span className="text-xs font-semibold" style={{ color: '#6b7280' }}>{label}</span>
      </div>
      <div style={{ padding: 24, display: 'flex', alignItems: 'center' }}>{children}</div>
      <pre style={{ margin: 0, padding: '12px 20px', background: '#0f1830', color: '#93c5fd', fontSize: 12, overflowX: 'auto' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
