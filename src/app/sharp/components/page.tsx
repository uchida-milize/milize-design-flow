'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance-corp';
const primaryColor = '#FF0000';

const tabs = [
  { key: 'buttons', label: 'Buttons' },
  { key: 'cards', label: 'Cards' },
  { key: 'forms', label: 'Forms' },
];

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState('buttons');

  return (
    <div className="sharp-finance-corp-portal">
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
          <div className="section-title">UIコンポーネント</div>
          <div className="section-desc">
            ブランドガイドラインに基づいたUIコンポーネント集です。
          </div>
        </div>

        <div className="tab-nav">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`tab-item ${activeTab === t.key ? 'active' : ''}`}
              style={activeTab === t.key ? { background: primaryColor } : {}}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'buttons' && (
          <>
            <div className="component-card">
              <div className="component-label-row">.btn-primary</div>
              <div className="component-render-area">
                <button
                  style={{
                    background: primaryColor,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  お申し込みはこちら
                </button>
              </div>
              <div className="component-code-block">
                {`<button className="btn-primary">お申し込みはこちら</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">.btn-secondary</div>
              <div className="component-render-area">
                <button
                  style={{
                    background: '#000000',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  詳しく見る
                </button>
              </div>
              <div className="component-code-block">
                {`<button className="btn-secondary">詳しく見る</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">.btn-accent</div>
              <div className="component-render-area">
                <button
                  style={{
                    background: '#F5A623',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  キャンペーン詳細
                </button>
              </div>
              <div className="component-code-block">
                {`<button className="btn-accent">キャンペーン詳細</button>`}
              </div>
            </div>
          </>
        )}

        {activeTab === 'cards' && (
          <div className="component-card">
            <div className="component-label-row">.info-card</div>
            <div className="component-render-area">
              <div
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 12,
                  padding: 24,
                  maxWidth: 320,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: primaryColor, marginBottom: 8 }}>
                  NEWS
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                  新サービスのお知らせ
                </div>
                <div style={{ fontSize: 14, color: '#6b7280' }}>
                  ひとの願いの、半歩先を行くサービスを提供します。
                </div>
              </div>
            </div>
            <div className="component-code-block">
              {`<div className="info-card">
  <span className="tag">NEWS</span>
  <h3>新サービスのお知らせ</h3>
  <p>ひとの願いの、半歩先を行くサービスを提供します。</p>
</div>`}
            </div>
          </div>
        )}

        {activeTab === 'forms' && (
          <div className="component-card">
            <div className="component-label-row">.form-input</div>
            <div className="component-render-area">
              <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ fontSize: 13, color: '#333333', fontWeight: 500 }}>
                  お名前
                </label>
                <input
                  type="text"
                  placeholder="山田 太郎"
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 6,
                    padding: '10px 12px',
                    fontSize: 14,
                    color: '#333333',
                    outline: 'none',
                  }}
                />
                <button
                  style={{
                    background: primaryColor,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: 8,
                  }}
                >
                  送信する
                </button>
              </div>
            </div>
            <div className="component-code-block">
              {`<label>お名前</label>
<input type="text" className="form-input" placeholder="山田 太郎" />
<button className="btn-primary">送信する</button>`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}