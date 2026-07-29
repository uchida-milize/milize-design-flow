'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'パナソニック株式会社';
const basePath = '/panasonic';
const primaryColor: string = '#003d7c';
const secondaryColor = '#0071bc';
const accentColor = '#f5a623';

type Tab = 'buttons' | 'cards' | 'forms';

export default function ComponentsPage() {
  const [tab, setTab] = useState<Tab>('buttons');

  return (
    <>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />
      <div className="portal-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <p className="section-label" style={{ color: primaryColor }}>
          COMPONENTS
        </p>
        <h1 className="section-title">UIコンポーネント</h1>
        <p className="section-description">
          ブランドカラーを適用した基本的なUIコンポーネントのサンプルです。
        </p>

        <div className="tab-nav">
          <button
            className={`tab-item ${tab === 'buttons' ? 'active' : ''}`}
            style={{ background: tab === 'buttons' ? primaryColor : undefined }}
            onClick={() => setTab('buttons')}
          >
            ボタン
          </button>
          <button
            className={`tab-item ${tab === 'cards' ? 'active' : ''}`}
            style={{ background: tab === 'cards' ? primaryColor : undefined }}
            onClick={() => setTab('cards')}
          >
            カード
          </button>
          <button
            className={`tab-item ${tab === 'forms' ? 'active' : ''}`}
            style={{ background: tab === 'forms' ? primaryColor : undefined }}
            onClick={() => setTab('forms')}
          >
            フォーム
          </button>
        </div>

        {tab === 'buttons' && (
          <>
            <div className="component-card">
              <div className="component-label">.btn-primary</div>
              <div className="component-render">
                <button
                  style={{
                    background: primaryColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  お問い合わせ
                </button>
              </div>
              <div className="component-code">
                {`<button style={{ background: '${primaryColor}', color: '#fff' }}>\n  お問い合わせ\n</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label">.btn-secondary</div>
              <div className="component-render">
                <button
                  style={{
                    background: '#fff',
                    color: secondaryColor,
                    border: `1px solid ${secondaryColor}`,
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  詳しく見る
                </button>
              </div>
              <div className="component-code">
                {`<button style={{ border: '1px solid ${secondaryColor}', color: '${secondaryColor}' }}>\n  詳しく見る\n</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label">.btn-accent</div>
              <div className="component-render">
                <button
                  style={{
                    background: accentColor,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 24px',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  キャンペーン詳細
                </button>
              </div>
              <div className="component-code">
                {`<button style={{ background: '${accentColor}', color: '#fff' }}>\n  キャンペーン詳細\n</button>`}
              </div>
            </div>
          </>
        )}

        {tab === 'cards' && (
          <div className="component-card">
            <div className="component-label">.info-card</div>
            <div className="component-render" style={{ display: 'block' }}>
              <div
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 12,
                  padding: 20,
                  maxWidth: 320,
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: primaryColor, marginBottom: 8 }}>
                  新製品のお知らせ
                </div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>
                  先進技術と親しみやすさを兼ね備えた新製品を発表しました。
                </div>
              </div>
            </div>
            <div className="component-code">
              {`<div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>\n  <div style={{ color: '${primaryColor}' }}>新製品のお知らせ</div>\n  <div style={{ color: '#6b7280' }}>説明文...</div>\n</div>`}
            </div>
          </div>
        )}

        {tab === 'forms' && (
          <div className="component-card">
            <div className="component-label">.form-input</div>
            <div className="component-render" style={{ display: 'block' }}>
              <label style={{ fontSize: 13, color: '#333333', display: 'block', marginBottom: 6 }}>
                メールアドレス
              </label>
              <input
                type="email"
                placeholder="example@panasonic.co.jp"
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 6,
                  padding: '10px 12px',
                  fontSize: 14,
                  width: '100%',
                  maxWidth: 320,
                  outline: 'none',
                }}
              />
            </div>
            <div className="component-code">
              {`<input type="email" style={{ border: '1px solid #e5e7eb', borderRadius: 6 }} />`}
            </div>
          </div>
        )}
      </div>
    </>
  );
}