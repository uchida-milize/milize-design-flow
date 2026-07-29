'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance-corp';
const primaryColor = '#004A99';
const secondaryColor = '#0071BC';
const accentColor = '#F5A623';

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
    <div className="sharp-finance-corp-portal">
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
{`<button style={{ background: primaryColor, color: '#fff', borderRadius: 6, padding: '12px 28px' }}>
  詳しく見る
</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Button.Secondary</div>
              <div className="component-render-area">
                <button
                  style={{
                    background: secondaryColor,
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
{`<button style={{ background: secondaryColor, color: '#fff', borderRadius: 6, padding: '12px 28px' }}>
  お問い合わせ →
</button>`}
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
{`<button style={{ background: 'transparent', color: primaryColor, border: `1px solid ${primaryColor}`, borderRadius: 6 }}>
  もっと見る
</button>`}
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
                    サービス内容
                  </div>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>
                    お客様のライフプランに合わせた最適な金融サービスをご提供します。
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
                    お知らせ
                  </div>
                  <p style={{ fontSize: 13, color: '#bfdbfe', lineHeight: 1.7 }}>
                    最新のサービス情報・キャンペーン情報をお届けします。
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
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#333333',
                    marginBottom: 6,
                  }}>
                    お名前
                  </label>
                  <input
                    type="text"
                    placeholder="山田 太郎"
                    style={{
                      display: 'block',
                      width: '100%',
                      background: '#f0f4f8',
                      border: `1px solid #d1d5db`,
                      borderRadius: '6px',
                      height: '40px',
                      padding: '0 14px',
                      fontSize: '14px',
                      color: '#333',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
              <div className="component-code-block">
{`<label style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
  お名前
</label>
<input
  type="text"
  placeholder="山田 太郎"
  style={{
    background: '#f0f4f8',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    height: '40px',
    padding: '0 14px',
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
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#333333',
                    marginBottom: 6,
                  }}>
                    お問い合わせ内容
                  </label>
                  <textarea
                    placeholder="内容を入力してください"
                    rows={5}
                    style={{
                      display: 'block',
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      padding: '12px 14px',
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
    background: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    padding: '12px 14px',
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
                      background: '#f0f4f8',
                      border: '1px solid #d1d5db',
                      borderRadius: '20px',
                      height: '36px',
                      padding: '0 16px',
                      fontSize: '14px',
                      color: '#333',
                      outline: 'none',
                    }}
                  />
                  <button
                    style={{
                      flexShrink: 0,
                      background: primaryColor,
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 36,
                      height: 36,
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
      background: '#f0f4f8',
      border: '1px solid #d1d5db',
      borderRadius: '20px',
      height: '36px',
      padding: '0 16px',
      fontSize: '14px',
    }}
  />
  <button style={{ background: primaryColor, color: '#fff', borderRadius: '50%', width: 36, height: 36 }}>
    →
  </button>
</div>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.Dropdown</div>
              <div className="component-render-area">
                <div style={{ position: 'relative', display: 'inline-block', width: 220 }}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: 220,
                      height: 40,
                      padding: '0 14px',
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
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
                      width: 220,
                      background: '#fff',
                      border: '1px solid #d1d5db',
                      borderTop: 'none',
                      borderRadius: '0 0 6px 6px',
                      zIndex: 10,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}>
                      {['ローン', '保険', '資産運用'].map((opt) => (
                        <div
                          key={opt}
                          style={{ padding: '10px 14px', fontSize: 14, color: '#333', cursor: 'pointer' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f0f4f8'; }}
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
{`<div style={{ position: 'relative', width: 220 }}>
  <button style={{
    width: 220, height: 40,
    background: '#fff',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    fontSize: 14, color: '#333',
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
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#333333',
                    marginBottom: 10,
                    float: 'left',
                    width: '100%',
                  }}>
                    お問い合わせ種別
                  </legend>
                  {['新規申し込み', '変更・解約', 'その他'].map((opt) => (
                    <label key={opt} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 10,
                      fontSize: 14,
                      color: '#333333',
                      cursor: 'pointer',
                    }}>
                      <input
                        type="radio"
                        name="inquiry-type-demo"
                        value={opt}
                        style={{ accentColor: primaryColor, width: 16, height: 16 }}
                      />
                      {opt}
                    </label>
                  ))}
                </fieldset>
              </div>
              <div className="component-code-block">
{`{['新規申し込み', '変更・解約', 'その他'].map(opt => (
  <label key={opt} style={{ display: 'flex', gap: 8, fontSize: 14 }}>
    <input type="radio" name="inquiry-type" value={opt}
      style={{ accentColor: primaryColor }} />
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
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 14,
                      color: '#333333',
                      cursor: 'pointer',
                    }}>
                      <input type="checkbox" style={{ accentColor: primaryColor, width: 16, height: 16 }} />
                      {lbl}
                    </label>
                  ))}
                </div>
              </div>
              <div className="component-code-block">
{`<label style={{ display: 'flex', gap: 8, fontSize: 14, color: '#333' }}>
  <input type="checkbox"
    style={{ accentColor: primaryColor, width: 16, height: 16 }} />
  個人情報の取り扱いに同意する
</label>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Button.CTA</div>
              <div className="component-render-area">
                <button style={{
                  background: primaryColor,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 6,
                  minWidth: 200,
                  height: 52,
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  padding: '0 32px',
                }}>
                  入力内容を確認
                </button>
              </div>
              <div className="component-code-block">
{`<button style={{
  background: primaryColor,
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  minWidth: 200,
  height: 52,
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: '0.5px',
}}>
  入力内容を確認
</button>`}
              </div>
            </div>

            <div className="component-card">
              <div className="component-label-row">Pagination</div>
              <div className="component-render-area">
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {(['‹', 1, 2, 3, '…', 8, 9, 10, '›'] as const).map((p, i) => {
                    const isArrow = p === '‹' || p === '›';
                    const isEllipsis = p === '…';
                    const isActive = p === 1;
                    return (
                      <button key={i} style={{
                        background: isActive ? primaryColor : 'transparent',
                        color: isActive ? '#ffffff' : '#333333',
                        border: isArrow || isEllipsis ? 'none' : `1px solid ${isActive ? primaryColor : '#d1d5db'}`,
                        width: isArrow || isEllipsis ? 28 : 36,
                        height: 36,
                        fontSize: isArrow ? 18 : 13,
                        cursor: isEllipsis ? 'default' : 'pointer',
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="component-code-block">
{`<div style={{ display: 'flex', gap: 4 }}>
  <button>‹</button>
  {pages.map(p => (
    <button key={p} style={{
      background: active === p ? primaryColor : 'transparent',
      color: active === p ? '#fff' : '#333',
      border: '1px solid #d1d5db',
      width: 36, height: 36, borderRadius: 6,
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
