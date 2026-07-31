'use client';
import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function ComponentsPage() {
  const clientName: string = '株式会社MILIZE';
  const basePath: string = '/testrin';
  const primaryColor: string = '#4B5563';

  const [activeTab, setActiveTab] = useState<'confirmed' | 'derived'>('confirmed');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const tokens = {
    inputBg: '#ffffff', // データなし（実測未取得）のため一般的な白背景を仮定
    inputRadius: '6px', // データなし、汎用値を仮定
    inputHeight: '40px', // データなし、汎用値を仮定
    borderColor: '#d1d5db', // データなし、汎用グレーを仮定
    ctaBg: '#4B5563', // 実サイトのボタン色は未取得のためprimaryColorを仮定使用
    ctaColor: '#ffffff',
    ctaHeight: '48px',
    textColor: '#333333',
    labelSize: '14px',
    bodySize: '14px',
  };

  return (
    <div>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />
      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
        <h1 className="section-title" style={{ fontSize: 28 }}>コンポーネント</h1>
        <p className="section-desc">
          design.mdに記載された実サイトのUI（お問い合わせページ・ニュースリリースページ・ヘッダ検索窓等）から確認できたコンポーネントと、
          そのデザイン言語を踏襲した想定コンポーネントをまとめています。フォーム類の角丸・サイズ・フォントの実測値は未取得のため、
          下記トークンは一般的なパターンによる暫定値です。
        </p>

        <div className="tab-nav">
          <button
            className={`tab-btn ${activeTab === 'confirmed' ? 'active' : ''}`}
            style={activeTab === 'confirmed' ? { background: primaryColor } : {}}
            onClick={() => setActiveTab('confirmed')}
          >
            実装確認済み
          </button>
          <button
            className={`tab-btn ${activeTab === 'derived' ? 'active' : ''}`}
            style={activeTab === 'derived' ? { background: primaryColor } : {}}
            onClick={() => setActiveTab('derived')}
          >
            派生デザイン（想定）
          </button>
        </div>

        {activeTab === 'confirmed' && (
          <div>
            {/* TextInput */}
            <div className="component-card">
              <div className="component-label">Form.TextInput</div>
              <div className="component-render">
                <input
                  type="text"
                  placeholder="お名前"
                  style={{
                    background: tokens.inputBg,
                    borderRadius: tokens.inputRadius,
                    height: tokens.inputHeight,
                    border: `1px solid ${tokens.borderColor}`,
                    padding: '0 12px',
                    fontSize: tokens.bodySize,
                    width: '100%',
                    maxWidth: 320,
                  }}
                />
              </div>
              <div className="component-code">
{`// bg:${tokens.inputBg} / radius:${tokens.inputRadius} / height:${tokens.inputHeight}
// ※実測データなし、一般的なフォーム仕様に基づく暫定値
<input style={{
  background: '${tokens.inputBg}',
  borderRadius: '${tokens.inputRadius}',
  height: '${tokens.inputHeight}',
  border: '1px solid ${tokens.borderColor}',
}} />`}
              </div>
            </div>

            {/* Textarea */}
            <div className="component-card">
              <div className="component-label">Form.Textarea</div>
              <div className="component-render">
                <textarea
                  placeholder="お問い合わせ内容"
                  style={{
                    background: '#ffffff',
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    resize: 'vertical',
                    padding: 12,
                    fontSize: tokens.bodySize,
                    width: '100%',
                    maxWidth: 320,
                    minHeight: 100,
                  }}
                />
              </div>
              <div className="component-code">
{`// bg:#ffffff / border:${tokens.borderColor} / resize:vertical
// ※実測データなし、一般的なフォーム仕様に基づく暫定値
<textarea style={{ background: '#ffffff', border: '1px solid ${tokens.borderColor}', resize: 'vertical' }} />`}
              </div>
            </div>

            {/* SearchInput */}
            <div className="component-card">
              <div className="component-label">Form.SearchInput</div>
              <div className="component-render">
                <div style={{ display: 'flex', alignItems: 'center', maxWidth: 320 }}>
                  <input
                    type="text"
                    placeholder="サイト内検索"
                    style={{
                      flex: 1,
                      height: 40,
                      borderRadius: '999px 0 0 999px',
                      border: `1px solid ${tokens.borderColor}`,
                      borderRight: 'none',
                      padding: '0 16px',
                      fontSize: tokens.bodySize,
                    }}
                  />
                  <button
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '0 999px 999px 0',
                      background: primaryColor,
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>
              <div className="component-code">
{`// 丸型input + 円形ボタン（primaryColor: ${primaryColor}）
// ※ヘッダ検索窓の実測CSSは未取得、一般的な検索UIパターンに基づく暫定値
<input style={{ borderRadius: '999px 0 0 999px' }} />
<button style={{ borderRadius: '0 999px 999px 0', background: '${primaryColor}' }}>▶</button>`}
              </div>
            </div>

            {/* Dropdown */}
            <div className="component-card">
              <div className="component-label">Form.Dropdown</div>
              <div className="component-render">
                <div style={{ position: 'relative', maxWidth: 320 }}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                      width: '100%',
                      height: 40,
                      border: `1px solid ${tokens.borderColor}`,
                      borderRadius: tokens.inputRadius,
                      background: '#ffffff',
                      textAlign: 'left',
                      padding: '0 12px',
                      fontSize: tokens.bodySize,
                      cursor: 'pointer',
                    }}
                  >
                    都道府県を選択 {dropdownOpen ? '▲' : '▼'}
                  </button>
                  {dropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 44,
                        left: 0,
                        right: 0,
                        background: '#ffffff',
                        border: `1px solid ${tokens.borderColor}`,
                        borderRadius: tokens.inputRadius,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                        zIndex: 10,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {['東京都', '大阪府', '福岡県'].map((pref) => (
                        <div key={pref} style={{ padding: '8px 12px', fontSize: tokens.bodySize }}>
                          {pref}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="component-code">
{`// height:40px / border:${tokens.borderColor} / 開閉アニメーション付き（useState）
// ※実測データなし、汎用ドロップダウン仕様に基づく暫定値
const [dropdownOpen, setDropdownOpen] = useState(false);
<button onClick={() => setDropdownOpen(!dropdownOpen)}>都道府県を選択</button>
{dropdownOpen && <div>選択肢...</div>}`}
              </div>
            </div>

            {/* RadioGroup */}
            <div className="component-card">
              <div className="component-label">Form.RadioGroup</div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 16, fontSize: tokens.bodySize }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="radio" name="gender" style={{ accentColor: primaryColor }} /> 男性
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="radio" name="gender" style={{ accentColor: primaryColor }} /> 女性
                  </label>
                </div>
              </div>
              <div className="component-code">
{`// accentColor: ${primaryColor}
// ※性別選択の実測データなし、一般的なラジオボタンUIに基づく暫定値
<input type="radio" style={{ accentColor: '${primaryColor}' }} />`}
              </div>
            </div>

            {/* Checkbox */}
            <div className="component-card">
              <div className="component-label">Form.Checkbox</div>
              <div className="component-render">
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                  <input type="checkbox" style={{ accentColor: primaryColor }} /> プライバシーポリシーに同意する
                </label>
              </div>
              <div className="component-code">
{`// accentColor: ${primaryColor}
// ※実測データなし、一般的なチェックボックスUIに基づく暫定値
<input type="checkbox" style={{ accentColor: '${primaryColor}' }} />`}
              </div>
            </div>

            {/* CTA Button */}
            <div className="component-card">
              <div className="component-label">Button.CTA</div>
              <div className="component-render">
                <button
                  style={{
                    background: tokens.ctaBg,
                    color: tokens.ctaColor,
                    height: tokens.ctaHeight,
                    border: 'none',
                    borderRadius: tokens.inputRadius,
                    padding: '0 32px',
                    fontSize: 16,
                    cursor: 'pointer',
                  }}
                >
                  資料請求・お問い合わせ
                </button>
              </div>
              <div className="component-code">
{`// bg:${tokens.ctaBg} / color:${tokens.ctaColor} / height:${tokens.ctaHeight}
// 実サイトに「資料請求・お問い合わせ」ボタンの存在は確認済み（リンク先: https://milize.co.jp/contact）
// ただし角丸・サイズ・フォント等のCSS実測値は未取得のため暫定値
<button style={{ background: '${tokens.ctaBg}', color: '${tokens.ctaColor}', height: '${tokens.ctaHeight}' }}>
  資料請求・お問い合わせ
</button>`}
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
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        background: n === 1 ? primaryColor : 'transparent',
                        color: n === 1 ? '#ffffff' : tokens.textColor,
                        border: n === 1 ? 'none' : `1px solid ${tokens.borderColor}`,
                      }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>
              <div className="component-code">
{`// active: ${primaryColor}(bg) / inactive: border ${tokens.borderColor}
// ※ページネーションの実測データなし、一般的なUIパターンに基づく暫定値
<div style={{ background: '${primaryColor}', color: '#fff' }}>1</div>
<div style={{ border: '1px solid ${tokens.borderColor}' }}>2</div>`}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'derived' && (
          <div>
            <p
              style={{
                borderLeft: `3px solid ${primaryColor}`,
                background: '#f8f8f8',
                padding: '10px 14px',
                fontSize: 13,
                color: '#888',
                marginBottom: 24,
              }}
            >
              以下は実サイトには存在しないコンポーネントですが、このクライアントのデザイン言語を踏襲した想定実装です。
            </p>

            {/* Card.Article */}
            <div className="component-card">
              <div className="component-label">
                Card.Article <span style={{ color: '#c084fc' }}>想定</span>
              </div>
              <div className="component-render">
                <div
                  style={{
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: 8,
                    overflow: 'hidden',
                    maxWidth: 320,
                  }}
                >
                  <div style={{ height: 6, background: primaryColor }} />
                  <div style={{ padding: 16 }}>
                    <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>2026.2.18</p>
                    <p style={{ fontSize: 14, fontWeight: 700 }}>
                      MILIZE、日本経済新聞社・金融庁主催『FIN/SUM NEXT 2026』に登壇
                    </p>
                  </div>
                </div>
              </div>
              <div className="component-code">
{`// border:${tokens.borderColor} / accent bar height:6px / primaryColor:${primaryColor}
<div style={{ borderTop: '6px solid ${primaryColor}' }}>...</div>`}
              </div>
            </div>

            {/* Badge.Category */}
            <div className="component-card">
              <div className="component-label">
                Badge.Category <span style={{ color: '#c084fc' }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 8 }}>
                  <span
                    style={{
                      background: primaryColor,
                      color: '#ffffff',
                      fontSize: 12,
                      padding: '4px 12px',
                      borderRadius: 999,
                    }}
                  >
                    金融
                  </span>
                  <span
                    style={{
                      border: `1px solid ${tokens.borderColor}`,
                      color: tokens.textColor,
                      fontSize: 12,
                      padding: '4px 12px',
                      borderRadius: 999,
                    }}
                  >
                    AI
                  </span>
                </div>
              </div>
              <div className="component-code">
{`// filled: ${primaryColor} / outline border:${tokens.borderColor}
<span style={{ background: '${primaryColor}', color: '#fff' }}>金融</span>
<span style={{ border: '1px solid ${tokens.borderColor}' }}>AI</span>`}
              </div>
            </div>

            {/* Table.Basic */}
            <div className="component-card">
              <div className="component-label">
                Table.Basic <span style={{ color: '#c084fc' }}>想定</span>
              </div>
              <div className="component-render">
                <table>
                  <thead>
                    <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                      <th>項目</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                      <td>社名</td>
                      <td>株式会社MILIZE</td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                      <td>設立</td>
                      <td>データなし</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="component-code">
{`// thead bg:${tokens.inputBg} / borderBottom(head):2px ${primaryColor} / row border:${tokens.borderColor}
<thead style={{ background: '${tokens.inputBg}', borderBottom: '2px solid ${primaryColor}' }} />`}
              </div>
            </div>

            {/* Nav.Tabs */}
            <div className="component-card">
              <div className="component-label">
                Nav.Tabs <span style={{ color: '#c084fc' }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 24, borderBottom: `1px solid ${tokens.borderColor}` }}>
                  <div
                    style={{
                      paddingBottom: 8,
                      borderBottom: `2px solid ${primaryColor}`,
                      color: primaryColor,
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    会社概要
                  </div>
                  <div style={{ paddingBottom: 8, color: tokens.textColor, fontSize: 14 }}>沿革</div>
                  <div style={{ paddingBottom: 8, color: tokens.textColor, fontSize: 14 }}>採用情報</div>
                </div>
              </div>
              <div className="component-code">
{`// active: borderBottom ${primaryColor} / color:${primaryColor}
<div style={{ borderBottom: '2px solid ${primaryColor}', color: '${primaryColor}' }}>会社概要</div>`}
              </div>
            </div>

            {/* Toast.Notification */}
            <div className="component-card">
              <div className="component-label">
                Toast.Notification <span style={{ color: '#c084fc' }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    style={{
                      borderLeft: `4px solid ${primaryColor}`,
                      background: '#ffffff',
                      borderRadius: tokens.inputRadius,
                      padding: '12px 16px',
                      fontSize: 14,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    }}
                  >
                    送信が完了しました
                  </div>
                  <div
                    style={{
                      borderLeft: `4px solid ${tokens.borderColor}`,
                      background: '#ffffff',
                      borderRadius: tokens.inputRadius,
                      padding: '12px 16px',
                      fontSize: 14,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    }}
                  >
                    入力内容をご確認ください
                  </div>
                </div>
              </div>
              <div className="component-code">
{`// success: borderLeft ${primaryColor} / warning: borderLeft ${tokens.borderColor} / radius:${tokens.inputRadius}
<div style={{ borderLeft: '4px solid ${primaryColor}' }}>送信が完了しました</div>`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}