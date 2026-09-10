'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function ComponentsPage() {
  const clientName: string = 'ソニー・ミュージックエンタテインメント';
  const basePath: string = '/httpswwwsmecojp';
  const primaryColor: string = '#1a1a1a';

  const [activeTab, setActiveTab] = useState<'implemented' | 'derived'>('implemented');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const tokens = {
    inputBg: '#ffffff',
    inputRadius: '4px',
    inputHeight: '40px',
    borderColor: '#d1d5db',
    ctaBg: '#1a1a1a',
    ctaColor: '#ffffff',
    ctaHeight: '44px',
    textColor: '#333333',
    labelSize: '12px',
    bodySize: '14px',
  };

  const tabs = [
    { key: 'implemented', label: '実装確認済み' },
    { key: 'derived', label: '派生デザイン（想定）' },
  ] as const;

  return (
    <div className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40, marginBottom: 32 }}>
        <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
        <h1 className="section-title">コンポーネント</h1>
        <p className="section-desc">
          design.mdの実測データに基づく実装確認済みコンポーネントと、
          同一のデザイン言語を踏襲した派生デザインを掲載しています。
        </p>
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

      {activeTab === 'derived' && (
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
      )}

      {activeTab === 'implemented' && (
        <div>
          {/* Form.TextInput */}
          <div className="component-card">
            <div className="component-label">Form.TextInput</div>
            <div className="component-render">
              <input
                type="text"
                placeholder="お名前をご入力ください"
                style={{
                  background: tokens.inputBg,
                  borderRadius: tokens.inputRadius,
                  height: tokens.inputHeight,
                  border: `1px solid ${tokens.borderColor}`,
                  padding: '0 12px',
                  fontSize: tokens.bodySize,
                  width: '100%',
                  maxWidth: 320,
                  color: tokens.textColor,
                }}
              />
            </div>
            <div className="component-code">
{`// bg:${tokens.inputBg} / radius:${tokens.inputRadius} / height:${tokens.inputHeight}
// border: 1px solid ${tokens.borderColor}
<input type="text" style={{ background: '${tokens.inputBg}', borderRadius: '${tokens.inputRadius}', height: '${tokens.inputHeight}' }} />`}
            </div>
          </div>

          {/* Form.Textarea */}
          <div className="component-card">
            <div className="component-label">Form.Textarea</div>
            <div className="component-render">
              <textarea
                placeholder="お問い合わせ内容をご入力ください"
                style={{
                  background: '#ffffff',
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  resize: 'vertical',
                  width: '100%',
                  maxWidth: 400,
                  minHeight: 100,
                  padding: 12,
                  fontSize: tokens.bodySize,
                  color: tokens.textColor,
                }}
              />
            </div>
            <div className="component-code">
{`// bg:#ffffff / border: 1px solid ${tokens.borderColor} / resize:vertical
<textarea style={{ resize: 'vertical', border: '1px solid ${tokens.borderColor}' }} />`}
            </div>
          </div>

          {/* Form.SearchInput */}
          <div className="component-card">
            <div className="component-label">Form.SearchInput</div>
            <div className="component-render">
              <div style={{ display: 'flex', alignItems: 'center', maxWidth: 320 }}>
                <input
                  type="text"
                  placeholder="サイト内検索"
                  style={{
                    flex: 1,
                    height: tokens.inputHeight,
                    borderRadius: '999px 0 0 999px',
                    border: `1px solid ${tokens.borderColor}`,
                    borderRight: 'none',
                    padding: '0 16px',
                    fontSize: tokens.bodySize,
                    color: tokens.textColor,
                  }}
                />
                <button
                  style={{
                    width: 40,
                    height: tokens.inputHeight,
                    borderRadius: '0 999px 999px 0',
                    background: primaryColor,
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  検索
                </button>
              </div>
            </div>
            <div className="component-code">
{`// 丸型input + 円形ボタン（primaryColor: ${primaryColor}）
<input style={{ borderRadius: '999px 0 0 999px' }} />
<button style={{ background: '${primaryColor}', borderRadius: '0 999px 999px 0' }} />`}
            </div>
          </div>

          {/* Form.Dropdown */}
          <div className="component-card">
            <div className="component-label">Form.Dropdown</div>
            <div className="component-render">
              <div style={{ position: 'relative', maxWidth: 240 }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    width: '100%',
                    height: tokens.inputHeight,
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    background: tokens.inputBg,
                    padding: '0 12px',
                    textAlign: 'left',
                    fontSize: tokens.bodySize,
                    color: tokens.textColor,
                    cursor: 'pointer',
                  }}
                >
                  カテゴリを選択 {dropdownOpen ? '▲' : '▼'}
                </button>
                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '110%',
                      left: 0,
                      right: 0,
                      background: '#ffffff',
                      border: `1px solid ${tokens.borderColor}`,
                      borderRadius: tokens.inputRadius,
                      overflow: 'hidden',
                      zIndex: 10,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {['ニュース', 'アーティスト', 'IR情報'].map((item) => (
                      <div
                        key={item}
                        style={{
                          padding: '8px 12px',
                          fontSize: tokens.bodySize,
                          color: tokens.textColor,
                          cursor: 'pointer',
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="component-code">
{`// height:${tokens.inputHeight} / border:${tokens.borderColor} / 開閉:useState
const [dropdownOpen, setDropdownOpen] = useState(false);
<button onClick={() => setDropdownOpen(!dropdownOpen)}>...</button>`}
            </div>
          </div>

          {/* Form.RadioGroup */}
          <div className="component-card">
            <div className="component-label">Form.RadioGroup</div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: 16, fontSize: tokens.bodySize, color: tokens.textColor }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input type="radio" name="gender" style={{ accentColor: primaryColor }} />
                  男性
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input type="radio" name="gender" style={{ accentColor: primaryColor }} />
                  女性
                </label>
              </div>
            </div>
            <div className="component-code">
{`// accentColor: ${primaryColor}
<input type="radio" style={{ accentColor: '${primaryColor}' }} />`}
            </div>
          </div>

          {/* Form.Checkbox */}
          <div className="component-card">
            <div className="component-label">Form.Checkbox</div>
            <div className="component-render">
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize, color: tokens.textColor }}>
                <input type="checkbox" style={{ accentColor: primaryColor }} />
                プライバシーポリシーに同意する
              </label>
            </div>
            <div className="component-code">
{`// accentColor: ${primaryColor}
<input type="checkbox" style={{ accentColor: '${primaryColor}' }} />`}
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
                  borderRadius: '4px',
                  padding: '0 32px',
                  fontSize: tokens.bodySize,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                送信する
              </button>
            </div>
            <div className="component-code">
{`// bg:${tokens.ctaBg} / color:${tokens.ctaColor} / height:${tokens.ctaHeight}
<button style={{ background: '${tokens.ctaBg}', color: '${tokens.ctaColor}', height: '${tokens.ctaHeight}' }}>送信する</button>`}
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
                      fontSize: tokens.bodySize,
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
{`// active bg:${primaryColor} / inactive border:${tokens.borderColor}
<div style={{ background: '${primaryColor}', color: '#ffffff' }}>1</div>
<div style={{ border: '1px solid ${tokens.borderColor}' }}>2</div>`}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'derived' && (
        <div>
          {/* Card.Article */}
          <div className="component-card">
            <div className="component-label">
              Card.Article <span style={{ fontSize: 11, color: primaryColor, marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <div
                style={{
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  maxWidth: 300,
                }}
              >
                <div style={{ height: 6, background: primaryColor }} />
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>2026.8.28 NEW</p>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: tokens.textColor }}>
                    ニュースリリースのタイトルが入ります
                  </h3>
                </div>
              </div>
            </div>
            <div className="component-code">
{`// border:${tokens.borderColor} / accent-bar height:6px / bg:${primaryColor}
<div style={{ border: '1px solid ${tokens.borderColor}' }}>
  <div style={{ height: 6, background: '${primaryColor}' }} />
  ...
</div>`}
            </div>
          </div>

          {/* Badge.Category */}
          <div className="component-card">
            <div className="component-label">
              Badge.Category <span style={{ fontSize: 11, color: primaryColor, marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: 8 }}>
                <span
                  style={{
                    background: primaryColor,
                    color: '#ffffff',
                    fontSize: 12,
                    padding: '4px 12px',
                    borderRadius: '999px',
                  }}
                >
                  ニュース
                </span>
                <span
                  style={{
                    border: `1px solid ${tokens.borderColor}`,
                    color: tokens.textColor,
                    fontSize: 12,
                    padding: '4px 12px',
                    borderRadius: '999px',
                  }}
                >
                  アーティスト
                </span>
              </div>
            </div>
            <div className="component-code">
{`// filled bg:${primaryColor} / outline border:${tokens.borderColor}
<span style={{ background: '${primaryColor}', color: '#fff' }}>ニュース</span>
<span style={{ border: '1px solid ${tokens.borderColor}' }}>アーティスト</span>`}
            </div>
          </div>

          {/* Table.Basic */}
          <div className="component-card">
            <div className="component-label">
              Table.Basic <span style={{ fontSize: 11, color: primaryColor, marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: tokens.bodySize }}>
                <thead>
                  <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                    <th style={{ textAlign: 'left', padding: 8 }}>項目</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: 8 }}>種類</td>
                    <td style={{ padding: 8 }}>株式会社</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: 8 }}>本社所在地</td>
                    <td style={{ padding: 8 }}>東京都</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="component-code">
{`// thead bg:${tokens.inputBg} / borderBottom(2px):${primaryColor} / row border:${tokens.borderColor}
<thead style={{ background: '${tokens.inputBg}', borderBottom: '2px solid ${primaryColor}' }} />`}
            </div>
          </div>

          {/* Nav.Tabs */}
          <div className="component-card">
            <div className="component-label">
              Nav.Tabs <span style={{ fontSize: 11, color: primaryColor, marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: 24, fontSize: tokens.bodySize }}>
                <div style={{ borderBottom: `2px solid ${primaryColor}`, color: primaryColor, paddingBottom: 8, fontWeight: 700 }}>
                  会社情報
                </div>
                <div style={{ color: '#6b7280', paddingBottom: 8 }}>事業内容</div>
                <div style={{ color: '#6b7280', paddingBottom: 8 }}>採用情報</div>
              </div>
            </div>
            <div className="component-code">
{`// active borderBottom: ${primaryColor} / active color: ${primaryColor}
<div style={{ borderBottom: '2px solid ${primaryColor}', color: '${primaryColor}' }}>会社情報</div>`}
            </div>
          </div>

          {/* Toast.Notification */}
          <div className="component-card">
            <div className="component-label">
              Toast.Notification <span style={{ fontSize: 11, color: primaryColor, marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  borderLeft: `4px solid ${primaryColor}`,
                  background: '#f9fafb',
                  borderRadius: tokens.inputRadius,
                  padding: '12px 16px',
                  fontSize: tokens.bodySize,
                  color: tokens.textColor,
                }}
              >
                送信が完了しました
              </div>
              <div
                style={{
                  borderLeft: `4px solid #9ca3af`,
                  background: '#f9fafb',
                  borderRadius: tokens.inputRadius,
                  padding: '12px 16px',
                  fontSize: tokens.bodySize,
                  color: tokens.textColor,
                }}
              >
                入力内容をご確認ください
              </div>
            </div>
            <div className="component-code">
{`// success borderLeft:${primaryColor} / warning borderLeft:#9ca3af / radius:${tokens.inputRadius}
<div style={{ borderLeft: '4px solid ${primaryColor}', borderRadius: '${tokens.inputRadius}' }} />`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}