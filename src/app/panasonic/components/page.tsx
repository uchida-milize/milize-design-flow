'use client';
import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function ComponentsPage() {
  const clientName = 'パナソニック株式会社';
  const basePath = '/panasonic';
  const primaryColor: string = '#003DA5';

  const [activeTab, setActiveTab] = useState<'confirmed' | 'derived'>('confirmed');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const tokens = {
    inputBg: '#FFFFFF',
    inputRadius: '6px',
    inputHeight: '40px',
    borderColor: '#E6E6E6',
    ctaBg: '#003DA5',
    ctaColor: '#FFFFFF',
    ctaHeight: '44px',
    textColor: '#333333',
    labelSize: '12px',
    bodySize: '14px',
  };

  return (
    <div>
      <ClientPortalHeader clientName={clientName} basePath={basePath} active="components" primaryColor={primaryColor} />
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
          <h1 className="section-title" style={{ fontSize: 28 }}>コンポーネント</h1>
          <p className="section-desc">
            {clientName}のガイドラインリサーチに基づくコンポーネント集です。
          </p>
        </div>

        <div className="tab-nav">
          <button
            className="tab-btn"
            style={{
              background: activeTab === 'confirmed' ? primaryColor : '#f3f4f6',
              color: activeTab === 'confirmed' ? '#ffffff' : '#6b7280',
            }}
            onClick={() => setActiveTab('confirmed')}
          >
            実装確認済み
          </button>
          <button
            className="tab-btn"
            style={{
              background: activeTab === 'derived' ? primaryColor : '#f3f4f6',
              color: activeTab === 'derived' ? '#ffffff' : '#6b7280',
            }}
            onClick={() => setActiveTab('derived')}
          >
            派生デザイン（想定）
          </button>
        </div>

        {activeTab === 'derived' && (
          <p style={{
            borderLeft: `3px solid ${primaryColor}`,
            background: '#f8f8f8',
            padding: '10px 14px',
            fontSize: 13,
            color: '#888',
            marginBottom: 24,
          }}>
            以下は実サイトには存在しないコンポーネントですが、このクライアントのデザイン言語を踏襲した想定実装です。
          </p>
        )}

        {activeTab === 'confirmed' && (
          <div>
            {/* Form.TextInput */}
            <div className="component-card">
              <div className="component-label">Form.TextInput</div>
              <div className="component-render">
                <input
                  type="text"
                  placeholder="お名前を入力してください"
                  style={{
                    background: tokens.inputBg,
                    borderRadius: tokens.inputRadius,
                    height: tokens.inputHeight,
                    border: `1px solid ${tokens.borderColor}`,
                    padding: '0 12px',
                    fontSize: tokens.bodySize,
                    width: '100%',
                    maxWidth: 320,
                    fontFamily: 'Noto Sans JP, sans-serif',
                    color: tokens.textColor,
                  }}
                />
              </div>
              <div className="component-code">
{`// bg:#FFFFFF / radius:6px / height:40px（推定値）
<input style={{
  background: '#FFFFFF',
  borderRadius: '6px',
  height: '40px',
  border: '1px solid #E6E6E6',
  padding: '0 12px',
}} />`}
              </div>
            </div>

            {/* Form.Textarea */}
            <div className="component-card">
              <div className="component-label">Form.Textarea</div>
              <div className="component-render">
                <textarea
                  placeholder="お問い合わせ内容をご記入ください"
                  rows={4}
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    padding: 12,
                    fontSize: tokens.bodySize,
                    width: '100%',
                    maxWidth: 320,
                    resize: 'vertical',
                    fontFamily: 'Noto Sans JP, sans-serif',
                    color: tokens.textColor,
                  }}
                />
              </div>
              <div className="component-code">
{`// bg:#FFFFFF / border:1px solid #E6E6E6 / resize:vertical
<textarea style={{
  background: '#FFFFFF',
  border: '1px solid #E6E6E6',
  borderRadius: '6px',
  resize: 'vertical',
}} />`}
              </div>
            </div>

            {/* Form.SearchInput */}
            <div className="component-card">
              <div className="component-label">Form.SearchInput</div>
              <div className="component-render">
                <div style={{ display: 'flex', alignItems: 'center', maxWidth: 320 }}>
                  <input
                    type="text"
                    placeholder="商品を検索"
                    style={{
                      flex: 1,
                      height: tokens.inputHeight,
                      borderRadius: '999px 0 0 999px',
                      border: `1px solid ${tokens.borderColor}`,
                      borderRight: 'none',
                      padding: '0 16px',
                      fontSize: tokens.bodySize,
                      fontFamily: 'Noto Sans JP, sans-serif',
                      color: tokens.textColor,
                    }}
                  />
                  <button
                    style={{
                      width: 40,
                      height: tokens.inputHeight,
                      borderRadius: '0 999px 999px 0',
                      background: primaryColor,
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    検索
                  </button>
                </div>
              </div>
              <div className="component-code">
{`// 丸型input + 円形ボタン（primaryColor: #003DA5）
<input style={{ borderRadius: '999px 0 0 999px' }} />
<button style={{ background: '#003DA5', borderRadius: '0 999px 999px 0' }} />`}
              </div>
            </div>

            {/* Form.Dropdown */}
            <div className="component-card">
              <div className="component-label">Form.Dropdown</div>
              <div className="component-render">
                <div style={{ position: 'relative', maxWidth: 320 }}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                      width: '100%',
                      height: tokens.inputHeight,
                      border: `1px solid ${tokens.borderColor}`,
                      borderRadius: tokens.inputRadius,
                      background: '#fff',
                      padding: '0 12px',
                      textAlign: 'left',
                      fontSize: tokens.bodySize,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'Noto Sans JP, sans-serif',
                      color: tokens.textColor,
                    }}
                  >
                    都道府県を選択
                    <span style={{
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      display: 'inline-block',
                    }}>▾</span>
                  </button>
                  {dropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '44px',
                      left: 0,
                      right: 0,
                      background: '#fff',
                      border: `1px solid ${tokens.borderColor}`,
                      borderRadius: tokens.inputRadius,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      zIndex: 10,
                    }}>
                      {['東京都', '大阪府', '愛知県'].map((pref) => (
                        <div key={pref} style={{ padding: '10px 12px', fontSize: tokens.bodySize, cursor: 'pointer' }}>
                          {pref}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="component-code">
{`// height:40px / borderColor:#E6E6E6 / useStateで開閉制御
const [dropdownOpen, setDropdownOpen] = useState(false);
<button onClick={() => setDropdownOpen(!dropdownOpen)}>...</button>`}
              </div>
            </div>

            {/* Form.RadioGroup */}
            <div className="component-card">
              <div className="component-label">Form.RadioGroup</div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 24 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                    <input type="radio" name="gender" style={{ accentColor: primaryColor }} defaultChecked />
                    男性
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                    <input type="radio" name="gender" style={{ accentColor: primaryColor }} />
                    女性
                  </label>
                </div>
              </div>
              <div className="component-code">
{`// accentColor: #003DA5（primaryColor）
<input type="radio" style={{ accentColor: '#003DA5' }} />`}
              </div>
            </div>

            {/* Form.Checkbox */}
            <div className="component-card">
              <div className="component-label">Form.Checkbox</div>
              <div className="component-render">
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                  <input type="checkbox" style={{ accentColor: primaryColor }} defaultChecked />
                  利用規約に同意する
                </label>
              </div>
              <div className="component-code">
{`// accentColor: #003DA5（primaryColor）
<input type="checkbox" style={{ accentColor: '#003DA5' }} />`}
              </div>
            </div>

            {/* Button.CTA */}
            <div className="component-card">
              <div className="component-label">Button.CTA</div>
              <div className="component-render">
                <button
                  style={{
                    background: tokens.ctaBg,
                    color: tokens.ctaColor,
                    height: tokens.ctaHeight,
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0 32px',
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Noto Sans JP, sans-serif',
                  }}
                >
                  ログイン
                </button>
              </div>
              <div className="component-code">
{`// bg:#003DA5 / color:#FFFFFF / height:44px（推定値）
<button style={{
  background: '#003DA5',
  color: '#FFFFFF',
  height: '44px',
  borderRadius: '6px',
}}>ログイン</button>`}
              </div>
            </div>

            {/* Pagination */}
            <div className="component-card">
              <div className="component-label">Pagination</div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      style={{
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        background: n === 1 ? primaryColor : '#fff',
                        color: n === 1 ? '#fff' : tokens.textColor,
                        border: n === 1 ? 'none' : `1px solid ${tokens.borderColor}`,
                        fontSize: 14,
                        cursor: 'pointer',
                      }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>
              <div className="component-code">
{`// active: background #003DA5 / inactive: border 1px solid #E6E6E6
<div style={{ background: active ? '#003DA5' : '#fff' }}>{n}</div>`}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'derived' && (
          <div>
            {/* Card.Article */}
            <div className="component-card">
              <div className="component-label">
                Card.Article <span style={{ fontSize: 10, color: primaryColor, border: `1px solid ${primaryColor}`, borderRadius: 4, padding: '1px 6px', marginLeft: 8 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ border: `1px solid ${tokens.borderColor}`, borderRadius: 8, overflow: 'hidden', maxWidth: 320 }}>
                  <div style={{ height: 6, background: primaryColor }} />
                  <div style={{ padding: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>新製品ニュース</h3>
                    <p style={{ fontSize: 14, color: '#6b7280' }}>最新のエアコン製品情報をお届けします。</p>
                  </div>
                </div>
              </div>
              <div className="component-code">
{`// borderColor:#E6E6E6 / アクセントバー height:6px primaryColor
<div style={{ borderTop: '6px solid #003DA5' }}>...</div>`}
              </div>
            </div>

            {/* Badge.Category */}
            <div className="component-card">
              <div className="component-label">
                Badge.Category <span style={{ fontSize: 10, color: primaryColor, border: `1px solid ${primaryColor}`, borderRadius: 4, padding: '1px 6px', marginLeft: 8 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ background: primaryColor, color: '#fff', padding: '4px 12px', borderRadius: 999, fontSize: 12 }}>
                    キッチン家電
                  </span>
                  <span style={{ border: `1px solid ${tokens.borderColor}`, color: tokens.textColor, padding: '4px 12px', borderRadius: 999, fontSize: 12 }}>
                    AV機器
                  </span>
                </div>
              </div>
              <div className="component-code">
{`// filled: background #003DA5 / outline: border 1px solid #E6E6E6
<span style={{ background: '#003DA5', color: '#fff' }}>キッチン家電</span>`}
              </div>
            </div>

            {/* Table.Basic */}
            <div className="component-card">
              <div className="component-label">
                Table.Basic <span style={{ fontSize: 10, color: primaryColor, border: `1px solid ${primaryColor}`, borderRadius: 4, padding: '1px 6px', marginLeft: 8 }}>想定</span>
              </div>
              <div className="component-render">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                      <th style={{ padding: 10, textAlign: 'left' }}>製品名</th>
                      <th style={{ padding: 10, textAlign: 'left' }}>カテゴリ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                      <td style={{ padding: 10 }}>エアコン CS-X</td>
                      <td style={{ padding: 10 }}>エアコン</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                      <td style={{ padding: 10 }}>洗濯機 NA-V</td>
                      <td style={{ padding: 10 }}>生活家電</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="component-code">
{`// thead bg:#FFFFFF / borderBottom: 2px solid #003DA5 / 行区切り: 1px solid #E6E6E6
<thead style={{ borderBottom: '2px solid #003DA5' }}>...</thead>`}
              </div>
            </div>

            {/* Nav.Tabs */}
            <div className="component-card">
              <div className="component-label">
                Nav.Tabs <span style={{ fontSize: 10, color: primaryColor, border: `1px solid ${primaryColor}`, borderRadius: 4, padding: '1px 6px', marginLeft: 8 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 24, borderBottom: `1px solid ${tokens.borderColor}` }}>
                  <div style={{ paddingBottom: 8, borderBottom: `2px solid ${primaryColor}`, color: primaryColor, fontWeight: 700, fontSize: 14 }}>
                    製品情報
                  </div>
                  <div style={{ paddingBottom: 8, color: '#6b7280', fontSize: 14 }}>
                    サポート
                  </div>
                </div>
              </div>
              <div className="component-code">
{`// active: borderBottom 2px solid #003DA5 / color #003DA5
<div style={{ borderBottom: '2px solid #003DA5', color: '#003DA5' }}>製品情報</div>`}
              </div>
            </div>

            {/* Toast.Notification */}
            <div className="component-card">
              <div className="component-label">
                Toast.Notification <span style={{ fontSize: 10, color: primaryColor, border: `1px solid ${primaryColor}`, borderRadius: 4, padding: '1px 6px', marginLeft: 8 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
                  <div style={{ borderLeft: `4px solid ${primaryColor}`, background: '#f0f4fa', padding: '10px 14px', borderRadius: 6, fontSize: 14 }}>
                    登録が完了しました。
                  </div>
                  <div style={{ borderLeft: '4px solid #999999', background: '#f8f8f8', padding: '10px 14px', borderRadius: 6, fontSize: 14 }}>
                    入力内容をご確認ください。
                  </div>
                </div>
              </div>
              <div className="component-code">
{`// success: borderLeft #003DA5 / warning: borderLeft #999999 / radius:6px
<div style={{ borderLeft: '4px solid #003DA5', borderRadius: '6px' }}>登録が完了しました。</div>`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}