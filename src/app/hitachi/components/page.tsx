'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = '日立製作所';
const basePath = '/hitachi';
const primaryColor: string = '#E60012';
const accentColor = '#0071BC';

const tabs = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'cards', label: 'Cards' },
  { id: 'forms', label: 'Forms' },
  { id: 'badges', label: 'Badges' },
];

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState('buttons');

  return (
    <div style={{ minHeight: '100vh' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <main className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            COMPONENTS
          </p>
          <h1 className="section-title">UIコンポーネント</h1>
          <p className="section-desc">
            ブランドカラーを適用したUIコンポーネントのサンプル集です。
          </p>
        </div>

        <div className="tab-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
              style={activeTab === tab.id ? { background: primaryColor } : {}}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'buttons' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="component-card">
              <div className="component-label-row">.btn-primary</div>
              <div className="component-render-area">
                <button
                  style={{
                    background: primaryColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  プライマリボタン
                </button>
              </div>
              <div className="component-code">
                {`<button style={{ background: '${primaryColor}', color: '#fff' }}>\n  プライマリボタン\n</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">.btn-secondary</div>
              <div className="component-render-area">
                <button
                  style={{
                    background: '#000000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  セカンダリボタン
                </button>
              </div>
              <div className="component-code">
                {`<button style={{ background: '#000000', color: '#fff' }}>\n  セカンダリボタン\n</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">.btn-outline</div>
              <div className="component-render-area">
                <button
                  style={{
                    background: 'transparent',
                    color: primaryColor,
                    border: `2px solid ${primaryColor}`,
                    borderRadius: 6,
                    padding: '9px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  アウトラインボタン
                </button>
              </div>
              <div className="component-code">
                {`<button style={{ border: '2px solid ${primaryColor}', color: '${primaryColor}' }}>\n  アウトラインボタン\n</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">.btn-accent</div>
              <div className="component-render-area">
                <button
                  style={{
                    background: accentColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  アクセントボタン
                </button>
              </div>
              <div className="component-code">
                {`<button style={{ background: '${accentColor}', color: '#fff' }}>\n  アクセントボタン\n</button>`}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="component-card">
              <div className="component-label-row">.info-card</div>
              <div className="component-render-area">
                <div
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: 20,
                    width: 280,
                    borderTop: `4px solid ${primaryColor}`,
                  }}
                >
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                    サステナビリティ
                  </p>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>
                    社会課題解決に向けた日立の取り組みをご紹介します。
                  </p>
                </div>
              </div>
              <div className="component-code">
                {`<div style={{ borderTop: '4px solid ${primaryColor}' }}>\n  ...\n</div>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">.stat-card</div>
              <div className="component-render-area">
                <div
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: 20,
                    width: 200,
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: 28, fontWeight: 900, color: primaryColor }}>112</p>
                  <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>YEARS OF TRUST</p>
                </div>
              </div>
              <div className="component-code">
                {`<p style={{ color: '${primaryColor}', fontWeight: 900 }}>112</p>`}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="component-card">
              <div className="component-label-row">.input-text</div>
              <div className="component-render-area">
                <input
                  type="text"
                  placeholder="お名前を入力"
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    padding: '10px 14px',
                    fontSize: 14,
                    width: 240,
                  }}
                />
              </div>
              <div className="component-code">
                {`<input style={{ border: '1px solid #d1d5db', borderRadius: 6 }} />`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">.checkbox</div>
              <div className="component-render-area">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                  <input type="checkbox" style={{ accentColor: primaryColor }} />
                  利用規約に同意する
                </label>
              </div>
              <div className="component-code">
                {`<input type="checkbox" style={{ accentColor: '${primaryColor}' }} />`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">.select</div>
              <div className="component-render-area">
                <select
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    padding: '10px 14px',
                    fontSize: 14,
                    width: 240,
                  }}
                >
                  <option>お問い合わせ種別を選択</option>
                  <option>製品について</option>
                  <option>採用について</option>
                </select>
              </div>
              <div className="component-code">
                {`<select style={{ border: '1px solid #d1d5db' }}>...</select>`}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="component-card">
              <div className="component-label-row">.badge-primary</div>
              <div className="component-render-area">
                <span
                  style={{
                    background: primaryColor,
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  NEW
                </span>
                <span
                  style={{
                    background: accentColor,
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  TECHNOLOGY
                </span>
                <span
                  style={{
                    background: '#000000',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  OFFICIAL
                </span>
              </div>
              <div className="component-code">
                {`<span style={{ background: '${primaryColor}', borderRadius: 999 }}>NEW</span>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">.badge-outline</div>
              <div className="component-render-area">
                <span
                  style={{
                    background: 'transparent',
                    color: primaryColor,
                    border: `1px solid ${primaryColor}`,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  SUSTAINABILITY
                </span>
              </div>
              <div className="component-code">
                {`<span style={{ border: '1px solid ${primaryColor}', color: '${primaryColor}' }}>\n  SUSTAINABILITY\n</span>`}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}