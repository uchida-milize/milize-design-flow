'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance';
const primaryColor = '#004A99';
const secondaryColor = '#0071BC';
const accentColor = '#F5A623';

const tabs = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'badges', label: 'Badges' },
  { id: 'cards', label: 'Cards' },
  { id: 'forms', label: 'Forms' },
];

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState('buttons');

  return (
    <div>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            COMPONENTS
          </p>
          <h1 className="section-title">UIコンポーネント</h1>
          <p className="section-desc">
            ブランドカラーを適用した実装済みコンポーネントのサンプル集です。
          </p>
        </div>

        <div className="tab-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="tab-item"
              onClick={() => setActiveTab(tab.id)}
              style={
                activeTab === tab.id
                  ? { background: primaryColor, color: '#ffffff' }
                  : undefined
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'buttons' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="component-card">
              <div className="component-card-label">.btn-primary</div>
              <div className="component-card-render">
                <button
                  style={{
                    background: primaryColor,
                    color: '#fff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  お申し込みはこちら
                </button>
              </div>
              <div className="code-block">{`<button className="btn-primary">
  お申し込みはこちら
</button>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.btn-secondary</div>
              <div className="component-card-render">
                <button
                  style={{
                    background: secondaryColor,
                    color: '#fff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  詳細を見る
                </button>
              </div>
              <div className="code-block">{`<button className="btn-secondary">
  詳細を見る
</button>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.btn-accent</div>
              <div className="component-card-render">
                <button
                  style={{
                    background: accentColor,
                    color: '#fff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  今すぐ相談する
                </button>
              </div>
              <div className="code-block">{`<button className="btn-accent">
  今すぐ相談する
</button>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.btn-outline</div>
              <div className="component-card-render">
                <button
                  style={{
                    background: 'transparent',
                    color: primaryColor,
                    border: `1px solid ${primaryColor}`,
                    padding: '10px 24px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  資料をダウンロード
                </button>
              </div>
              <div className="code-block">{`<button className="btn-outline">
  資料をダウンロード
</button>`}</div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="component-card">
              <div className="component-card-label">.badge-primary</div>
              <div className="component-card-render">
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
                  法人向け
                </span>
              </div>
              <div className="code-block">{`<span className="badge-primary">法人向け</span>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.badge-accent</div>
              <div className="component-card-render">
                <span
                  style={{
                    background: '#FFF4E0',
                    color: accentColor,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  おすすめ
                </span>
              </div>
              <div className="code-block">{`<span className="badge-accent">おすすめ</span>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.badge-outline</div>
              <div className="component-card-render">
                <span
                  style={{
                    background: 'transparent',
                    color: secondaryColor,
                    border: `1px solid ${secondaryColor}`,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  NEW
                </span>
              </div>
              <div className="code-block">{`<span className="badge-outline">NEW</span>`}</div>
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="component-card">
              <div className="component-card-label">.service-card</div>
              <div className="component-card-render" style={{ display: 'block' }}>
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: 24,
                    maxWidth: 360,
                    borderTop: `4px solid ${primaryColor}`,
                  }}
                >
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>
                    法人向け融資プラン
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--text-sub)', marginTop: 8 }}>
                    信頼と実績に基づいた柔軟な資金調達をサポートします。
                  </p>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 16,
                      fontSize: 13,
                      fontWeight: 500,
                      color: primaryColor,
                    }}
                  >
                    詳しく見る →
                  </span>
                </div>
              </div>
              <div className="code-block">{`<div className="service-card">
  <h3>法人向け融資プラン</h3>
  <p>信頼と実績に基づいた柔軟な資金調達をサポートします。</p>
  <a href="#">詳しく見る →</a>
</div>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.highlight-card</div>
              <div className="component-card-render" style={{ display: 'block' }}>
                <div
                  style={{
                    background: primaryColor,
                    borderRadius: 12,
                    padding: 24,
                    maxWidth: 360,
                    color: '#fff',
                  }}
                >
                  <p style={{ fontSize: 12, fontWeight: 700, color: accentColor }}>PREMIUM</p>
                  <p style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>
                    プレミアムサポートプラン
                  </p>
                  <p style={{ fontSize: 14, marginTop: 8, opacity: 0.85 }}>
                    専任担当者による手厚いサポートをご提供します。
                  </p>
                </div>
              </div>
              <div className="code-block">{`<div className="highlight-card">
  <span className="label">PREMIUM</span>
  <h3>プレミアムサポートプラン</h3>
  <p>専任担当者による手厚いサポートをご提供します。</p>
</div>`}</div>
            </div>
          </div>
        )}

        {activeTab === 'forms' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="component-card">
              <div className="component-card-label">.form-input</div>
              <div className="component-card-render" style={{ display: 'block', maxWidth: 360 }}>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-main)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  会社名
                </label>
                <input
                  type="text"
                  placeholder="株式会社サンプル"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>
              <div className="code-block">{`<label>会社名</label>
<input type="text" placeholder="株式会社サンプル" className="form-input" />`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.form-select</div>
              <div className="component-card-render" style={{ display: 'block', maxWidth: 360 }}>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-main)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  ご相談内容
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: 14,
                    outline: 'none',
                    background: '#fff',
                  }}
                >
                  <option>資金調達について</option>
                  <option>リースについて</option>
                  <option>その他</option>
                </select>
              </div>
              <div className="code-block">{`<label>ご相談内容</label>
<select className="form-select">
  <option>資金調達について</option>
</select>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.form-checkbox</div>
              <div className="component-card-render">
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 14,
                    color: 'var(--text-main)',
                  }}
                >
                  <input type="checkbox" style={{ accentColor: primaryColor }} />
                  プライバシーポリシーに同意する
                </label>
              </div>
              <div className="code-block">{`<label>
  <input type="checkbox" />
  プライバシーポリシーに同意する
</label>`}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}