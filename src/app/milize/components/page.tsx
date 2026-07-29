'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'Milize';
const basePath = '/milize';
const primaryColor: string = '#0055A4';
const secondaryColor = '#00A0E9';
const accentColor = '#F5A623';

const tabs = [
  { key: 'buttons', label: 'ボタン' },
  { key: 'cards', label: 'カード' },
  { key: 'badges', label: 'バッジ' },
];

export default function ComponentsPage() {
  const [tab, setTab] = useState('buttons');

  return (
    <div className="milize-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <div className="section-label" style={{ color: primaryColor }}>
            COMPONENTS
          </div>
          <div className="section-title">UIコンポーネント</div>
          <div className="section-desc">
            実装済みのUIコンポーネントの一覧です。
          </div>
        </div>

        <div className="tab-nav">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`tab ${tab === t.key ? 'active' : ''}`}
              style={tab === t.key ? { background: primaryColor } : {}}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'buttons' && (
          <>
            <div className="component-card">
              <div className="component-label">Button / Primary</div>
              <div className="component-render">
                <button
                  className="btn"
                  style={{ background: primaryColor, color: '#fff' }}
                >
                  プライマリボタン
                </button>
              </div>
              <div className="component-code">
                {`<button style={{ background: '${primaryColor}', color: '#fff' }}>プライマリボタン</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label">Button / Secondary</div>
              <div className="component-render">
                <button
                  className="btn"
                  style={{ background: secondaryColor, color: '#fff' }}
                >
                  セカンダリボタン
                </button>
              </div>
              <div className="component-code">
                {`<button style={{ background: '${secondaryColor}', color: '#fff' }}>セカンダリボタン</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label">Button / Accent</div>
              <div className="component-render">
                <button
                  className="btn"
                  style={{ background: accentColor, color: '#fff' }}
                >
                  アクセントボタン
                </button>
              </div>
              <div className="component-code">
                {`<button style={{ background: '${accentColor}', color: '#fff' }}>アクセントボタン</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label">Button / Outline</div>
              <div className="component-render">
                <button
                  className="btn"
                  style={{
                    background: 'transparent',
                    color: primaryColor,
                    border: `1px solid ${primaryColor}`,
                  }}
                >
                  アウトラインボタン
                </button>
              </div>
              <div className="component-code">
                {`<button style={{ border: '1px solid ${primaryColor}', color: '${primaryColor}' }}>アウトラインボタン</button>`}
              </div>
            </div>
          </>
        )}

        {tab === 'cards' && (
          <div className="component-card">
            <div className="component-label">Card / Basic</div>
            <div className="component-render">
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 12,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  padding: 24,
                  maxWidth: 320,
                }}
              >
                <div style={{ fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                  カードタイトル
                </div>
                <div style={{ fontSize: 14, color: '#6b7280' }}>
                  カードの説明文がここに入ります。
                </div>
              </div>
            </div>
            <div className="component-code">
              {`<div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>...</div>`}
            </div>
          </div>
        )}

        {tab === 'badges' && (
          <div className="component-card">
            <div className="component-label">Badge / Status</div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: 12 }}>
                <span
                  style={{
                    background: '#f0f7ff',
                    color: primaryColor,
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  信頼感
                </span>
                <span
                  style={{
                    background: '#fff7ed',
                    color: accentColor,
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  先進的
                </span>
              </div>
            </div>
            <div className="component-code">
              {`<span style={{ background: '#f0f7ff', color: '${primaryColor}', borderRadius: 999, padding: '4px 12px' }}>信頼感</span>`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
