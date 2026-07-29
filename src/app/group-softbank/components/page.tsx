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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
              <div className="component-label-row">Form.TextInput</div>
              <div className="component-render-area">
                <div style={{ maxWidth: 420 }}>
                  <label style={{
                    display: 'block',
                    fontSize: 20,
                    color: '#333333',
                    letterSpacing: '0.5px',
                    marginBottom: 8,
                  }}>
                    お名前
                  </label>
                  <input
                    type="text"
                    placeholder="山田 太郎"
                    style={{
                      display: 'block',
                      width: '100%',
                      background: '#DEE2E5',
                      border: 'none',
                      borderRadius: '15px',
                      height: '30px',
                      padding: '0 20px 0 19px',
                      fontSize: '14px',
                      color: '#333',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
              <div className="component-code-block">
{`<label style={{ fontSize: 20, color: '#333', letterSpacing: '0.5px' }}>
  お名前
</label>
<input
  type="text"
  placeholder="山田 太郎"
  style={{
    background: '#DEE2E5',
    border: 'none',
    borderRadius: '15px',
    height: '30px',
    padding: '0 20px 0 19px',
    fontSize: '14px',
  }}
/>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.Textarea</div>
              <div className="component-render-area">
                <div style={{ maxWidth: 520 }}>
                  <label style={{
                    display: 'block',
                    fontSize: 20,
                    color: '#333333',
                    letterSpacing: '0.5px',
                    marginBottom: 8,
                  }}>
                    お問い合わせ内容
                  </label>
                  <textarea
                    placeholder="内容を入力してください"
                    rows={5}
                    style={{
                      display: 'block',
                      width: '100%',
                      background: '#FFFFFF',
                      border: '1px solid #DEE2E5',
                      borderRadius: '0',
                      fontSize: '14px',
                      padding: '20px',
                      color: '#333',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
              <div className="component-code-block">
{`<textarea
  rows={5}
  style={{
    background: '#FFFFFF',
    border: '1px solid #DEE2E5',
    borderRadius: 0,
    fontSize: '14px',
    padding: '20px',
    resize: 'vertical',
  }}
/>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.SearchInput</div>
              <div className="component-render-area">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, maxWidth: 380 }}>
                  <input
                    type="text"
                    placeholder="検索する"
                    style={{
                      flex: 1,
                      background: '#DEE2E5',
                      border: 'none',
                      borderRadius: '15px',
                      height: '30px',
                      padding: '0 20px 0 19px',
                      fontSize: '14px',
                      color: '#333',
                      outline: 'none',
                    }}
                  />
                  <button
                    style={{
                      flexShrink: 0,
                      background: '#000000',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 30,
                      height: 30,
                      fontSize: 16,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="component-code-block">
{`<div style={{ display: 'flex', gap: 8 }}>
  <input
    type="text"
    placeholder="検索する"
    style={{
      background: '#DEE2E5',
      border: 'none',
      borderRadius: '15px',
      height: '30px',
      padding: '0 20px 0 19px',
      fontSize: '14px',
    }}
  />
  <button style={{
    background: '#000', color: '#fff',
    borderRadius: '50%', width: 30, height: 30,
  }}>→</button>
</div>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.Dropdown</div>
              <div className="component-render-area">
                <div style={{ position: 'relative', display: 'inline-block', width: 200 }}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: 200,
                      height: 40,
                      padding: '0 14px',
                      background: 'transparent',
                      border: '1px solid #DEE2E5',
                      borderRadius: 0,
                      fontSize: 14,
                      color: '#333',
                      cursor: 'pointer',
                    }}
                  >
                    <span>カテゴリを選択</span>
                    <span style={{
                      fontSize: 10,
                      display: 'inline-block',
                      transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}>▼</span>
                  </button>
                  {dropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: 200,
                      background: '#fff',
                      border: '1px solid #DEE2E5',
                      borderTop: 'none',
                      zIndex: 10,
                    }}>
                      {['テクノロジー', 'ファイナンス', 'グローバル'].map((opt) => (
                        <div
                          key={opt}
                          style={{ padding: '10px 14px', fontSize: 14, color: '#333', cursor: 'pointer' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f5f5f5'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                          onClick={() => setDropdownOpen(false)}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="component-code-block">
{`<div style={{ position: 'relative', width: 200 }}>
  <button style={{
    width: 200, height: 40,
    background: 'transparent',
    border: '1px solid #DEE2E5',
    borderRadius: 0, fontSize: 14, color: '#333',
  }}>
    カテゴリを選択 ▼
  </button>
</div>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.RadioGroup</div>
              <div className="component-render-area">
                <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                  <legend style={{
                    fontSize: 20, color: '#333333', letterSpacing: '0.5px',
                    marginBottom: 12, float: 'left', width: '100%',
                  }}>
                    職種
                  </legend>
                  {['個人投資家', '機関投資家', 'アナリスト'].map((opt) => (
                    <label key={opt} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      marginBottom: 10, fontSize: 14, color: '#333333', cursor: 'pointer',
                    }}>
                      <input
                        type="radio"
                        name="job-type-demo"
                        value={opt}
                        style={{ accentColor: '#000000', width: 16, height: 16 }}
                      />
                      {opt}
                    </label>
                  ))}
                </fieldset>
              </div>
              <div className="component-code-block">
{`{['個人投資家', '機関投資家', 'アナリスト'].map(opt => (
  <label key={opt} style={{ display: 'flex', gap: 8, fontSize: 14 }}>
    <input type="radio" name="job-type" value={opt}
      style={{ accentColor: '#000' }} />
    {opt}
  </label>
))}`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.Checkbox</div>
              <div className="component-render-area">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['個人情報の取り扱いに同意する', '入力内容を確認しました'].map((lbl) => (
                    <label key={lbl} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontSize: 14, color: '#333333', cursor: 'pointer',
                    }}>
                      <input type="checkbox" style={{ accentColor: '#000000', width: 16, height: 16 }} />
                      {lbl}
                    </label>
                  ))}
                </div>
              </div>
              <div className="component-code-block">
{`<label style={{ display: 'flex', gap: 8, fontSize: 14, color: '#333' }}>
  <input type="checkbox"
    style={{ accentColor: '#000', width: 16, height: 16 }} />
  個人情報の取り扱いに同意する
</label>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Button.CTA</div>
              <div className="component-render-area">
                <button style={{
                  background: '#DEE2E5',
                  color: '#333333',
                  border: 'none',
                  borderRadius: 0,
                  width: 250,
                  height: 58,
                  fontSize: 16,
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                }}>
                  入力内容を確認
                </button>
              </div>
              <div className="component-code-block">
{`<button style={{
  background: '#DEE2E5',
  color: '#333333',
  border: 'none',
  borderRadius: 0,
  width: 250,
  height: 58,
  fontSize: 16,
  letterSpacing: '0.5px',
}}>
  入力内容を確認
</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Pagination</div>
              <div className="component-render-area">
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {(['‹', 1, 2, 3, '…', 8, 9, 10, '›'] as const).map((p, i) => {
                    const isArrow = p === '‹' || p === '›';
                    const isEllipsis = p === '…';
                    const isActive = p === 1;
                    return (
                      <button key={i} style={{
                        background: isActive ? '#000000' : 'transparent',
                        color: isActive ? '#ffffff' : '#333333',
                        border: isArrow || isEllipsis ? 'none' : `1px solid ${isActive ? '#000000' : '#DEE2E5'}`,
                        width: isArrow || isEllipsis ? 24 : 32,
                        height: 32,
                        fontSize: isArrow ? 18 : 13,
                        cursor: isEllipsis ? 'default' : 'pointer',
                        borderRadius: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="component-code-block">
{`<div style={{ display: 'flex', gap: 2 }}>
  <button>‹</button>
  {pages.map(p => (
    <button key={p} style={{
      background: active === p ? '#000' : 'transparent',
      color: active === p ? '#fff' : '#333',
      border: '1px solid #DEE2E5',
      width: 32, height: 32, borderRadius: 0,
    }}>{p}</button>
  ))}
  <button>›</button>
</div>`}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
