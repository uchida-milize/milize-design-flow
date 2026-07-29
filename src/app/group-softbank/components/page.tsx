'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ソフトバンクグループ株式会社';
const basePath = '/group-softbank';
const primaryColor = '#000000';
const accentColor = '#FF0000';

const tabs = [
  { key: 'buttons', label: 'ボタン' },
  { key: 'cards', label: 'カード' },
  { key: 'forms', label: 'フォーム' },
] as const;

type TabKey = typeof tabs[number]['key'];

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('buttons');

  return (
    <div className="group-softbank-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
          <h1 className="section-title">コンポーネント</h1>
          <p className="section-desc">
            ブランドガイドラインに基づいた実装済みUIコンポーネント集です。
          </p>
        </div>

        <div className="tab-nav">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab-item ${activeTab === tab.key ? 'active' : ''}`}
              style={activeTab === tab.key ? { background: primaryColor } : {}}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'buttons' && (
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="component-card">
              <div className="component-label-row">Button.Primary</div>
              <div className="component-render-area">
                <button
                  style={{
                    background: primaryColor,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '12px 28px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  詳しく見る
                </button>
              </div>
              <div className="component-code-block">
                {`<button className="btn-primary">詳しく見る</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Button.Accent</div>
              <div className="component-render-area">
                <button
                  style={{
                    background: accentColor,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '12px 28px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  お問い合わせ →
                </button>
              </div>
              <div className="component-code-block">
                {`<button className="btn-accent">お問い合わせ →</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Button.Outline</div>
              <div className="component-render-area">
                <button
                  style={{
                    background: 'transparent',
                    color: primaryColor,
                    border: `1px solid ${primaryColor}`,
                    borderRadius: 6,
                    padding: '12px 28px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  もっと見る
                </button>
              </div>
              <div className="component-code-block">
                {`<button className="btn-outline">もっと見る</button>`}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="component-card">
              <div className="component-label-row">Card.Basic</div>
              <div className="component-render-area">
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: 24,
                    maxWidth: 320,
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#111827' }}>
                    事業内容
                  </div>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>
                    通信、インターネット、AI分野など幅広い領域でサービスを展開しています。
                  </p>
                  <div style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: accentColor }}>
                    詳しく見る →
                  </div>
                </div>
              </div>
              <div className="component-code-block">
                {`<div className="card-basic">...</div>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Card.Highlight</div>
              <div className="component-render-area">
                <div
                  style={{
                    background: primaryColor,
                    color: '#ffffff',
                    borderRadius: 12,
                    padding: 24,
                    maxWidth: 320,
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                    ニュース・リリース
                  </div>
                  <p style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>
                    最新の企業情報・プレスリリースをお届けします。
                  </p>
                  <div style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: accentColor }}>
                    一覧を見る →
                  </div>
                </div>
              </div>
              <div className="component-code-block">
                {`<div className="card-highlight">...</div>`}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forms' && (
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="component-card">
              <div className="component-label-row">Form.Input</div>
              <div className="component-render-area">
                <div style={{ maxWidth: 320 }}>
                  <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 6 }}>
                    お名前
                  </label>
                  <input
                    type="text"
                    placeholder="山田 太郎"
                    style={{
                      width: '100%',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      padding: '10px 12px',
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>
              <div className="component-code-block">
                {`<input className="form-input" placeholder="山田 太郎" />`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.Checkbox</div>
              <div className="component-render-area">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#374151' }}>
                  <input type="checkbox" style={{ accentColor: accentColor }} />
                  利用規約に同意する
                </label>
              </div>
              <div className="component-code-block">
                {`<input type="checkbox" className="form-checkbox" />`}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}