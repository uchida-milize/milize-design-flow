'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function ComponentsPage() {
  const clientName: string = 'T&Dフィナンシャル生命保険株式会社';
  const basePath: string = '/tdf';
  const primaryColor: string = '#1B3A6B'; // design.md上は「未取得」のため暫定値

  const [activeTab, setActiveTab] = useState<'implemented' | 'derived'>('implemented');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // design.mdでは input_css / button_css / border_radii / heights のいずれも
  // 「未取得」のため、以下tokensは実装上必要な暫定値とし、各所にコメントで明記する。
  const tokens = {
    inputBg: '#ffffff', // design.md未取得のため暫定
    inputRadius: '4px', // design.md未取得のため暫定
    inputHeight: '40px', // design.md未取得のため暫定
    borderColor: '#d1d5db', // design.md未取得のため暫定
    ctaBg: primaryColor, // design.md未取得のため暫定（primaryColor自体も暫定）
    ctaColor: '#ffffff',
    ctaHeight: '44px', // design.md未取得のため暫定
    textColor: '#333333',
    labelSize: '13px', // design.md未取得のため暫定
    bodySize: '14px',
  };

  const tabs: { key: 'implemented' | 'derived'; label: string }[] = [
    { key: 'implemented', label: '実装確認済み' },
    { key: 'derived', label: '派生デザイン（想定）' },
  ];

  return (
    <div className="tdf-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40, marginBottom: 24 }}>
        <p className="tdf-section-label" style={{ color: primaryColor }}>COMPONENTS</p>
        <h1 className="tdf-section-title">コンポーネント</h1>
        <p className="tdf-section-desc">
          design.md記載の実測データ（多くが未取得）を踏まえ、実装確認済みコンポーネントと派生デザイン（想定）を掲載しています。数値が未取得の項目は暫定値をコメントで明記しています。
        </p>
      </div>

      <div className="tdf-tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`tdf-tab ${activeTab === t.key ? 'active' : ''}`}
            style={activeTab === t.key ? { background: primaryColor } : {}}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'implemented' && (
        <div>
          {/* 1. TextInput */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">Form.TextInput</div>
            <div className="tdf-component-preview">
              <label style={{ display: 'block', fontSize: tokens.labelSize, color: '#6b7280', marginBottom: 6 }}>
                お名前
              </label>
              <input
                type="text"
                placeholder="山田 太郎"
                style={{
                  width: '100%',
                  maxWidth: 320,
                  height: tokens.inputHeight,
                  background: tokens.inputBg,
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  padding: '0 12px',
                  fontSize: tokens.bodySize,
                  color: tokens.textColor,
                }}
              />
            </div>
            <div className="tdf-component-code">
{`// bg:#ffffff(未取得・暫定) / radius:4px(未取得・暫定) / height:40px(未取得・暫定)
<input type="text" style={{
  height: '40px',
  background: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  padding: '0 12px',
}} />`}
            </div>
          </div>

          {/* 2. Textarea */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">Form.Textarea</div>
            <div className="tdf-component-preview">
              <label style={{ display: 'block', fontSize: tokens.labelSize, color: '#6b7280', marginBottom: 6 }}>
                お問い合わせ内容
              </label>
              <textarea
                placeholder="お問い合わせ内容をご記入ください"
                rows={4}
                style={{
                  width: '100%',
                  maxWidth: 480,
                  background: '#ffffff',
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  padding: 12,
                  fontSize: tokens.bodySize,
                  color: tokens.textColor,
                  resize: 'vertical',
                }}
              />
            </div>
            <div className="tdf-component-code">
{`// bg:#ffffff / border:1px solid #d1d5db(未取得・暫定) / resize:vertical
<textarea style={{
  background: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  resize: 'vertical',
}} />`}
            </div>
          </div>

          {/* 3. SearchInput */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">Form.SearchInput</div>
            <div className="tdf-component-preview">
              <div style={{ display: 'flex', alignItems: 'center', maxWidth: 320 }}>
                <input
                  type="text"
                  placeholder="サイト内検索"
                  style={{
                    flex: 1,
                    height: '40px',
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
                  aria-label="検索"
                >
                  🔍
                </button>
              </div>
            </div>
            <div className="tdf-component-code">
{`// 丸型input + 円形ボタン(primaryColor未取得・暫定 #1B3A6B)
<input style={{ borderRadius: '999px 0 0 999px', height: '40px' }} />
<button style={{ borderRadius: '0 999px 999px 0', background: '#1B3A6B' }} />`}
            </div>
          </div>

          {/* 4. Dropdown */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">Form.Dropdown</div>
            <div className="tdf-component-preview">
              <div style={{ position: 'relative', maxWidth: 240 }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    width: '100%',
                    height: '40px',
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    background: '#ffffff',
                    padding: '0 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: tokens.bodySize,
                    cursor: 'pointer',
                  }}
                >
                  都道府県を選択
                  <span
                    style={{
                      display: 'inline-block',
                      transition: 'transform 0.2s ease',
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    ▾
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: dropdownOpen ? 120 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.2s ease',
                    border: dropdownOpen ? `1px solid ${tokens.borderColor}` : 'none',
                    borderRadius: tokens.inputRadius,
                    marginTop: dropdownOpen ? 4 : 0,
                    background: '#ffffff',
                  }}
                >
                  {['東京都', '大阪府', '愛知県'].map((pref) => (
                    <div key={pref} style={{ padding: '8px 12px', fontSize: tokens.bodySize, color: tokens.textColor }}>
                      {pref}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="tdf-component-code">
{`// height:40px / borderColor:#d1d5db(未取得・暫定)
const [dropdownOpen, setDropdownOpen] = useState(false);
<button onClick={() => setDropdownOpen(!dropdownOpen)}>...</button>`}
            </div>
          </div>

          {/* 5. RadioGroup */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">Form.RadioGroup</div>
            <div className="tdf-component-preview">
              <p style={{ fontSize: tokens.labelSize, color: '#6b7280', marginBottom: 8 }}>性別</p>
              <div style={{ display: 'flex', gap: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                  <input type="radio" name="gender" style={{ accentColor: primaryColor }} />
                  男性
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                  <input type="radio" name="gender" style={{ accentColor: primaryColor }} />
                  女性
                </label>
              </div>
            </div>
            <div className="tdf-component-code">
{`// accentColor: primaryColor(未取得・暫定 #1B3A6B)
<input type="radio" style={{ accentColor: '#1B3A6B' }} />`}
            </div>
          </div>

          {/* 6. Checkbox */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">Form.Checkbox</div>
            <div className="tdf-component-preview">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: tokens.bodySize }}>
                <input type="checkbox" style={{ accentColor: primaryColor }} />
                個人情報の取扱いに同意する
              </label>
            </div>
            <div className="tdf-component-code">
{`// accentColor: primaryColor(未取得・暫定 #1B3A6B)
<input type="checkbox" style={{ accentColor: '#1B3A6B' }} />`}
            </div>
          </div>

          {/* 7. Button CTA */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">Button.CTA</div>
            <div className="tdf-component-preview">
              <button
                style={{
                  height: tokens.ctaHeight,
                  padding: '0 32px',
                  background: tokens.ctaBg,
                  color: tokens.ctaColor,
                  border: 'none',
                  borderRadius: tokens.inputRadius,
                  fontSize: tokens.bodySize,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                詳しくはこちら
              </button>
            </div>
            <div className="tdf-component-code">
{`// bg:primaryColor(未取得・暫定 #1B3A6B) / color:#ffffff / height:44px(未取得・暫定)
// 実サイトでは「詳しくはこちら」というテキストリンク型導線を確認（角丸・サイズは未取得）
<button style={{ height: '44px', background: '#1B3A6B', color: '#ffffff' }}>
  詳しくはこちら
</button>`}
            </div>
          </div>

          {/* 8. Pagination */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">Pagination</div>
            <div className="tdf-component-preview">
              <div style={{ display: 'flex', gap: 8 }}>
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: tokens.inputRadius,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      background: n === 1 ? primaryColor : 'transparent',
                      color: n === 1 ? '#ffffff' : tokens.textColor,
                      border: n === 1 ? 'none' : `1px solid ${tokens.borderColor}`,
                      cursor: 'pointer',
                    }}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
            <div className="tdf-component-code">
{`// active: bg primaryColor(未取得・暫定) / inactive: border #d1d5db(未取得・暫定)
<div style={{ background: '#1B3A6B', color: '#fff' }}>1</div>
<div style={{ border: '1px solid #d1d5db' }}>2</div>`}
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

          {/* 1. Card.Article */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">
              Card.Article <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>想定</span>
            </div>
            <div className="tdf-component-preview">
              <div style={{ border: `1px solid ${tokens.borderColor}`, borderRadius: 8, overflow: 'hidden', maxWidth: 320 }}>
                <div style={{ height: 6, background: primaryColor }} />
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>2024.01.10 お知らせ</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: tokens.textColor }}>重要なお知らせについて</p>
                </div>
              </div>
            </div>
            <div className="tdf-component-code">
{`// borderColor:#d1d5db(未取得・暫定) / accent bar height:6px / primaryColor(暫定)
<div style={{ border: '1px solid #d1d5db' }}>
  <div style={{ height: '6px', background: '#1B3A6B' }} />
</div>`}
            </div>
          </div>

          {/* 2. Badge.Category */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">
              Badge.Category <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>想定</span>
            </div>
            <div className="tdf-component-preview">
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ background: primaryColor, color: '#fff', fontSize: 12, padding: '4px 10px', borderRadius: 999 }}>
                  重要
                </span>
                <span style={{ border: `1px solid ${tokens.borderColor}`, color: tokens.textColor, fontSize: 12, padding: '4px 10px', borderRadius: 999 }}>
                  お知らせ
                </span>
              </div>
            </div>
            <div className="tdf-component-code">
{`// filled: bg primaryColor(暫定) / outline: border #d1d5db(未取得・暫定)
<span style={{ background: '#1B3A6B', color: '#fff' }}>重要</span>
<span style={{ border: '1px solid #d1d5db' }}>お知らせ</span>`}
            </div>
          </div>

          {/* 3. Table.Basic */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">
              Table.Basic <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>想定</span>
            </div>
            <div className="tdf-component-preview">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                    <th style={{ textAlign: 'left', padding: 8 }}>書類種別</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>お届け時期</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>お届け方法</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: 8 }}>契約内容のお知らせ</td>
                    <td style={{ padding: 8 }}>毎年1回</td>
                    <td style={{ padding: 8 }}>郵送</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 8 }}>ご契約者様配当金のお知らせ</td>
                    <td style={{ padding: 8 }}>随時</td>
                    <td style={{ padding: 8 }}>郵送・Web</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="tdf-component-code">
{`// thead bg:inputBg(#ffffff未取得・暫定) / borderBottom:primaryColor 2px(暫定)
<thead style={{ background: '#ffffff', borderBottom: '2px solid #1B3A6B' }} />`}
            </div>
          </div>

          {/* 4. Nav.Tabs */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">
              Nav.Tabs <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>想定</span>
            </div>
            <div className="tdf-component-preview">
              <div style={{ display: 'flex', gap: 24, borderBottom: `1px solid ${tokens.borderColor}` }}>
                <div style={{ paddingBottom: 8, borderBottom: `2px solid ${primaryColor}`, color: primaryColor, fontWeight: 700, fontSize: 14 }}>
                  商品案内
                </div>
                <div style={{ paddingBottom: 8, color: '#6b7280', fontSize: 14 }}>お手続き</div>
                <div style={{ paddingBottom: 8, color: '#6b7280', fontSize: 14 }}>よくあるご質問</div>
              </div>
            </div>
            <div className="tdf-component-code">
{`// active: borderBottom primaryColor(暫定) / color primaryColor(暫定)
<div style={{ borderBottom: '2px solid #1B3A6B', color: '#1B3A6B' }}>商品案内</div>`}
            </div>
          </div>

          {/* 5. Toast.Notification */}
          <div className="tdf-component-card">
            <div className="tdf-component-label">
              Toast.Notification <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>想定</span>
            </div>
            <div className="tdf-component-preview">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
                <div style={{ borderLeft: `4px solid ${primaryColor}`, background: '#f8f9fb', borderRadius: tokens.inputRadius, padding: '10px 14px', fontSize: 13 }}>
                  お手続きが完了しました
                </div>
                <div style={{ borderLeft: '4px solid #d97706', background: '#fffaf0', borderRadius: tokens.inputRadius, padding: '10px 14px', fontSize: 13 }}>
                  ご入力内容をご確認ください（アクセントカラー未取得のため暫定色）
                </div>
              </div>
            </div>
            <div className="tdf-component-code">
{`// success: borderLeft primaryColor(暫定) / warning: accentColor(未取得のため暫定 #d97706)
<div style={{ borderLeft: '4px solid #1B3A6B' }}>完了</div>
<div style={{ borderLeft: '4px solid #d97706' }}>警告</div>`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}