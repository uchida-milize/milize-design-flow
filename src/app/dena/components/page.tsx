'use client';
import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'DeNA株式会社';
const basePath = '/dena';
const primaryColor: string = '#000000';

const tabs = ['ボタン', 'バッジ', 'カード', 'フォーム'];

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState('ボタン');

  return (
    <div className="dena-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />
      <div className="portal-container">
        <div className="page-header">
          <div className="section-label" style={{ color: primaryColor }}>
            COMPONENTS
          </div>
          <h1 className="page-title">コンポーネント集</h1>
          <p className="page-sub">
            ブランドガイドラインに基づいたUIコンポーネントのサンプルです。
          </p>
        </div>

        <div className="content-section">
          <div className="tab-nav">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                style={activeTab === tab ? { background: primaryColor } : {}}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'ボタン' && (
            <>
              <div className="component-card">
                <div className="component-label">.btn-primary</div>
                <div className="component-preview">
                  <button
                    style={{
                      padding: '10px 24px',
                      borderRadius: '6px',
                      background: '#000000',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    プライマリボタン
                  </button>
                </div>
                <div className="component-code">{`<button style={{ background: '#000000', color: '#fff' }}>\n  プライマリボタン\n</button>`}</div>
              </div>

              <div className="component-card">
                <div className="component-label">.btn-accent</div>
                <div className="component-preview">
                  <button
                    style={{
                      padding: '10px 24px',
                      borderRadius: '6px',
                      background: '#00B3E6',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    アクセントボタン
                  </button>
                  <button
                    style={{
                      padding: '10px 24px',
                      borderRadius: '6px',
                      background: '#ffffff',
                      color: '#000000',
                      fontWeight: 700,
                      fontSize: '14px',
                      border: '1px solid #000000',
                      cursor: 'pointer',
                    }}
                  >
                    アウトラインボタン
                  </button>
                </div>
                <div className="component-code">{`<button style={{ background: '#00B3E6', color: '#fff' }}>\n  アクセントボタン\n</button>`}</div>
              </div>
            </>
          )}

          {activeTab === 'バッジ' && (
            <div className="component-card">
              <div className="component-label">.badge</div>
              <div className="component-preview">
                {[
                  { bg: '#000000', label: 'Default' },
                  { bg: '#00B3E6', label: 'Blue' },
                  { bg: '#00C5CD', label: 'Cyan' },
                  { bg: '#00D193', label: 'Green' },
                  { bg: '#FF6B6B', label: 'Red' },
                ].map((b) => (
                  <span
                    key={b.label}
                    style={{
                      padding: '4px 14px',
                      borderRadius: '999px',
                      background: b.bg,
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
              <div className="component-code">{`<span style={{ background: '#00B3E6', color: '#fff', borderRadius: '999px' }}>\n  Blue\n</span>`}</div>
            </div>
          )}

          {activeTab === 'カード' && (
            <div className="component-card">
              <div className="component-label">.info-card</div>
              <div className="component-preview" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div className="card">
                  <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#111827' }}>
                    カードタイトル
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    カードコンポーネントの説明テキストがここに入ります。
                  </div>
                </div>
              </div>
              <div className="component-code">{`<div className="card">\n  <div>カードタイトル</div>\n  <div>説明テキスト</div>\n</div>`}</div>
            </div>
          )}

          {activeTab === 'フォーム' && (
            <div className="component-card">
              <div className="component-label">.form-input</div>
              <div className="component-preview" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '16px' }}>
                <input
                  type="text"
                  placeholder="テキストを入力"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    fontSize: '14px',
                    width: '100%',
                  }}
                />
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151' }}>
                  <input type="checkbox" />
                  チェックボックス
                </label>
              </div>
              <div className="component-code">{`<input type="text" placeholder="テキストを入力" />`}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}