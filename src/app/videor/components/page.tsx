'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function ComponentsPage() {
  const clientName: string = '株式会社ビデオリサーチ';
  const basePath: string = '/videor';
  const primaryColor: string = '#202945';

  const [activeTab, setActiveTab] = useState<'implemented' | 'derived'>('implemented');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2026年');

  const tokens = {
    inputBg: '#FFFFFF',
    inputRadius: '4px',
    inputHeight: '40px',
    borderColor: '#d1d5db',
    ctaBg: '#202945',
    ctaColor: '#FFFFFF',
    ctaHeight: '44px',
    textColor: '#333333',
    labelSize: '13px',
    bodySize: '14px',
  };

  return (
    <div>
      <ClientPortalHeader clientName={clientName} basePath={basePath} active="components" primaryColor={primaryColor} />

      <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="section-label" style={{ color: primaryColor }}>COMPONENTS</div>
        <h1 className="section-title">コンポーネント</h1>
        <p className="section-desc">
          videor.co.jp のページから確認できたコンポーネントと、デザイントークンを踏襲した派生デザインです。
        </p>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'implemented' ? 'active' : ''}`}
            style={activeTab === 'implemented' ? { background: primaryColor } : {}}
            onClick={() => setActiveTab('implemented')}
          >
            実装確認済み
          </button>
          <button
            className={`tab ${activeTab === 'derived' ? 'active' : ''}`}
            style={activeTab === 'derived' ? { background: primaryColor } : {}}
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

        {activeTab === 'implemented' && (
          <div>
            {/* TextInput */}
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
                  }}
                />
              </div>
              <div className="component-code">
{`// bg:#FFFFFF / radius:4px(推定) / height:40px(推定)
<input style={{
  background: '#FFFFFF',
  borderRadius: '4px',
  height: '40px',
  border: '1px solid #d1d5db',
  padding: '0 12px',
}} />`}
              </div>
            </div>

            {/* Textarea */}
            <div className="component-card">
              <div className="component-label">Form.Textarea</div>
              <div className="component-render">
                <textarea
                  placeholder="お問い合わせ内容をご記入ください"
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    padding: 12,
                    fontSize: tokens.bodySize,
                    width: '100%',
                    maxWidth: 320,
                    minHeight: 100,
                    resize: 'vertical',
                  }}
                />
              </div>
              <div className="component-code">
{`// bg:#FFFFFF / border:#d1d5db(推定) / resize:vertical
<textarea style={{
  background: '#FFFFFF',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  resize: 'vertical',
}} />`}
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
                      borderRadius: '20px 0 0 20px',
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
                      borderRadius: '0 20px 20px 0',
                      background: primaryColor,
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    🔍
                  </button>
                </div>
              </div>
              <div className="component-code">
{`// 丸型input + 円形ボタン(primaryColor:#202945)
<input style={{ borderRadius: '20px 0 0 20px' }} />
<button style={{ background: '#202945', borderRadius: '0 20px 20px 0' }} />`}
              </div>
            </div>

            {/* Dropdown */}
            <div className="component-card">
              <div className="component-label">Form.Dropdown</div>
              <div className="component-render">
                <div style={{ position: 'relative', maxWidth: 200 }}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                      width: '100%',
                      height: 40,
                      border: `1px solid ${tokens.borderColor}`,
                      borderRadius: tokens.inputRadius,
                      background: '#fff',
                      padding: '0 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontSize: tokens.bodySize,
                    }}
                  >
                    {selectedYear}
                    <span style={{
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      display: 'inline-block',
                    }}>▼</span>
                  </button>
                  {dropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: 44,
                      left: 0,
                      right: 0,
                      background: '#fff',
                      border: `1px solid ${tokens.borderColor}`,
                      borderRadius: tokens.inputRadius,
                      zIndex: 10,
                    }}>
                      {['2026年', '2025年', '2024年'].map((y) => (
                        <div
                          key={y}
                          onClick={() => { setSelectedYear(y); setDropdownOpen(false); }}
                          style={{ padding: '8px 12px', cursor: 'pointer', fontSize: tokens.bodySize }}
                        >
                          {y}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="component-code">
{`// height:40px / border:#d1d5db / 開閉アニメーション(useState)
const [dropdownOpen, setDropdownOpen] = useState(false);
<button onClick={() => setDropdownOpen(!dropdownOpen)}>年別 ▼</button>`}
              </div>
            </div>

            {/* RadioGroup */}
            <div className="component-card">
              <div className="component-label">Form.RadioGroup</div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 16 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                    <input type="radio" name="cat" style={{ accentColor: primaryColor }} defaultChecked />
                    プレスリリース
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                    <input type="radio" name="cat" style={{ accentColor: primaryColor }} />
                    お知らせ
                  </label>
                </div>
              </div>
              <div className="component-code">
{`// accentColor: primaryColor(#202945)
<input type="radio" style={{ accentColor: '#202945' }} />`}
              </div>
            </div>

            {/* Checkbox */}
            <div className="component-card">
              <div className="component-label">Form.Checkbox</div>
              <div className="component-render">
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                  <input type="checkbox" style={{ accentColor: primaryColor }} defaultChecked />
                  プレスリリース（調査結果）
                </label>
              </div>
              <div className="component-code">
{`// accentColor: primaryColor(#202945)
<input type="checkbox" style={{ accentColor: '#202945' }} />`}
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
                    borderRadius: '4px',
                    padding: '0 32px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  お問い合わせ
                </button>
              </div>
              <div className="component-code">
{`// bg:#202945 / color:#FFFFFF / height:44px(推定)
<button style={{
  background: '#202945',
  color: '#FFFFFF',
  height: '44px',
  borderRadius: '4px',
}}>お問い合わせ</button>`}
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
                        borderRadius: '4px',
                        fontSize: 14,
                        background: n === 1 ? primaryColor : '#fff',
                        color: n === 1 ? '#fff' : tokens.textColor,
                        border: n === 1 ? 'none' : `1px solid ${tokens.borderColor}`,
                        cursor: 'pointer',
                      }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>
              <div className="component-code">
{`// active: bg primaryColor(#202945) / inactive: border #d1d5db
<div style={{ background: '#202945', color: '#fff' }}>1</div>
<div style={{ border: '1px solid #d1d5db' }}>2</div>`}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'derived' && (
          <div>
            {/* Card.Article */}
            <div className="component-card">
              <div className="component-label">
                Card.Article <span style={{ fontSize: 10, color: '#fff', background: '#9ca3af', padding: '2px 6px', borderRadius: 4, marginLeft: 6 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ border: `1px solid ${tokens.borderColor}`, borderRadius: 8, overflow: 'hidden', maxWidth: 320 }}>
                  <div style={{ height: 6, background: primaryColor }} />
                  <div style={{ padding: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 8 }}>視聴率データ分析レポート</h3>
                    <p style={{ fontSize: 13, color: '#6b7280' }}>最新の視聴傾向を分析したレポートを公開しました。</p>
                  </div>
                </div>
              </div>
              <div className="component-code">
{`// borderColor:#d1d5db枠 / accentバー height:6px primaryColor(#202945)
<div style={{ borderTop: '6px solid #202945', border: '1px solid #d1d5db' }} />`}
              </div>
            </div>

            {/* Badge.Category */}
            <div className="component-card">
              <div className="component-label">
                Badge.Category <span style={{ fontSize: 10, color: '#fff', background: '#9ca3af', padding: '2px 6px', borderRadius: 4, marginLeft: 6 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ background: primaryColor, color: '#fff', fontSize: 12, padding: '4px 12px', borderRadius: 999 }}>プレスリリース</span>
                  <span style={{ border: `1px solid ${tokens.borderColor}`, color: primaryColor, fontSize: 12, padding: '4px 12px', borderRadius: 999 }}>お知らせ</span>
                </div>
              </div>
              <div className="component-code">
{`// filled: primaryColor(#202945) / outline: borderColor(#d1d5db)
<span style={{ background: '#202945', color: '#fff' }}>filled</span>
<span style={{ border: '1px solid #d1d5db', color: '#202945' }}>outline</span>`}
              </div>
            </div>

            {/* Table.Basic */}
            <div className="component-card">
              <div className="component-label">
                Table.Basic <span style={{ fontSize: 10, color: '#fff', background: '#9ca3af', padding: '2px 6px', borderRadius: 4, marginLeft: 6 }}>想定</span>
              </div>
              <div className="component-render">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                      <th style={{ padding: 8, textAlign: 'left' }}>項目</th>
                      <th style={{ padding: 8, textAlign: 'left' }}>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                      <td style={{ padding: 8 }}>設立</td>
                      <td style={{ padding: 8 }}>1962年</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 8 }}>本社</td>
                      <td style={{ padding: 8 }}>東京都千代田区</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="component-code">
{`// thead bg:#FFFFFF / borderBottom:2px solid primaryColor(#202945) / 行区切り: #d1d5db
<thead style={{ borderBottom: '2px solid #202945' }} />`}
              </div>
            </div>

            {/* Nav.Tabs */}
            <div className="component-card">
              <div className="component-label">
                Nav.Tabs <span style={{ fontSize: 10, color: '#fff', background: '#9ca3af', padding: '2px 6px', borderRadius: 4, marginLeft: 6 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 24, borderBottom: `1px solid ${tokens.borderColor}` }}>
                  <div style={{ paddingBottom: 8, borderBottom: `2px solid ${primaryColor}`, color: primaryColor, fontWeight: 700, fontSize: 14 }}>会社情報</div>
                  <div style={{ paddingBottom: 8, color: '#6b7280', fontSize: 14 }}>サービス</div>
                  <div style={{ paddingBottom: 8, color: '#6b7280', fontSize: 14 }}>採用情報</div>
                </div>
              </div>
              <div className="component-code">
{`// active: borderBottom primaryColor(#202945) / color: primaryColor
<div style={{ borderBottom: '2px solid #202945', color: '#202945' }}>active</div>`}
              </div>
            </div>

            {/* Toast.Notification */}
            <div className="component-card">
              <div className="component-label">
                Toast.Notification <span style={{ fontSize: 10, color: '#fff', background: '#9ca3af', padding: '2px 6px', borderRadius: 4, marginLeft: 6 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
                  <div style={{ borderLeft: `4px solid ${primaryColor}`, background: '#f5f7fa', borderRadius: 4, padding: '10px 14px', fontSize: 13, color: '#111827' }}>
                    お問い合わせを受け付けました
                  </div>
                  <div style={{ borderLeft: '4px solid #9ca3af', background: '#f5f7fa', borderRadius: 4, padding: '10px 14px', fontSize: 13, color: '#111827' }}>
                    入力内容をご確認ください
                  </div>
                </div>
              </div>
              <div className="component-code">
{`// success: borderLeft primaryColor(#202945) / warning: borderLeft accentColor(#9ca3af)
<div style={{ borderLeft: '4px solid #202945', borderRadius: '4px' }} />`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}