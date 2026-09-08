'use client';
import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function ComponentsPage() {
  const clientName: string = 'Sony Pictures';
  const basePath: string = '/sonypictures';
  const primaryColor: string = '#000000';

  const [activeTab, setActiveTab] = useState<'implemented' | 'derived'>('implemented');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [radioValue, setRadioValue] = useState('trailer');
  const [checked, setChecked] = useState(true);

  const tokens = {
    inputBg: '#FFFFFF',
    inputRadius: '6px',
    inputHeight: '40px',
    borderColor: '#CCCCCC',
    ctaBg: '#000000',
    ctaColor: '#FFFFFF',
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
    <div>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />
      <div className="portal-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <p className="portal-section-label" style={{ color: primaryColor }}>COMPONENTS</p>
        <h1 className="portal-section-title" style={{ fontSize: 32 }}>コンポーネント</h1>
        <p className="portal-section-desc">
          お問い合わせページ・ニュースリリースページ・ヘッダ検索窓等から確認したフォーム／ボタン等のコンポーネントです。
        </p>

        <p
          style={{
            borderLeft: `3px solid ${primaryColor}`,
            background: '#f8f8f8',
            padding: '10px 14px',
            fontSize: 13,
            color: '#888',
            marginTop: 32,
            marginBottom: 24,
          }}
        >
          以下は実サイトには存在しないコンポーネントですが、このクライアントのデザイン言語を踏襲した想定実装です。
        </p>

        <div className="portal-tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              className="portal-tab"
              onClick={() => setActiveTab(t.key)}
              style={{
                background: activeTab === t.key ? primaryColor : '#f3f4f6',
                color: activeTab === t.key ? '#ffffff' : '#6b7280',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

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
                    width: '100%',
                    height: tokens.inputHeight,
                    background: tokens.inputBg,
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    padding: '0 12px',
                    fontSize: tokens.bodySize,
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                />
              </div>
              <div className="component-code">
{`// bg:${tokens.inputBg} / radius:${tokens.inputRadius} / height:${tokens.inputHeight}
<input style={{
  height: '${tokens.inputHeight}',
  background: '${tokens.inputBg}',
  border: '1px solid ${tokens.borderColor}',
  borderRadius: '${tokens.inputRadius}',
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
                  rows={4}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    padding: '10px 12px',
                    fontSize: tokens.bodySize,
                    resize: 'vertical',
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                />
              </div>
              <div className="component-code">
{`// bg:#FFFFFF / border:${tokens.borderColor} / resize:vertical
<textarea style={{
  background: '#FFFFFF',
  border: '1px solid ${tokens.borderColor}',
  borderRadius: '${tokens.inputRadius}',
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
                    placeholder="検索"
                    style={{
                      flex: 1,
                      height: tokens.inputHeight,
                      border: `1px solid ${tokens.borderColor}`,
                      borderRadius: '999px 0 0 999px',
                      padding: '0 16px',
                      fontSize: tokens.bodySize,
                      borderRight: 'none',
                      fontFamily: "'Noto Sans JP', sans-serif",
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
                    🔍
                  </button>
                </div>
              </div>
              <div className="component-code">
{`// 丸型input + 円形ボタン(primaryColor:${primaryColor})
<input style={{ borderRadius: '999px 0 0 999px' }} />
<button style={{ background: '${primaryColor}', borderRadius: '0 999px 999px 0' }} />`}
              </div>
            </div>

            {/* Dropdown */}
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
                      background: '#ffffff',
                      padding: '0 12px',
                      textAlign: 'left',
                      fontSize: tokens.bodySize,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>カテゴリを選択</span>
                    <span style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                  </button>
                  {dropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '44px',
                        left: 0,
                        right: 0,
                        background: '#ffffff',
                        border: `1px solid ${tokens.borderColor}`,
                        borderRadius: tokens.inputRadius,
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      {['映画', 'TV', 'ニュース'].map((item) => (
                        <div key={item} style={{ padding: '10px 12px', fontSize: tokens.bodySize, cursor: 'pointer' }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="component-code">
{`// height:${tokens.inputHeight} / border:${tokens.borderColor} / 開閉アニメーション(useState)
const [dropdownOpen, setDropdownOpen] = useState(false);
<button onClick={() => setDropdownOpen(!dropdownOpen)}>...</button>`}
              </div>
            </div>

            {/* RadioGroup */}
            <div className="component-card">
              <div className="component-label">Form.RadioGroup</div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 20 }}>
                  {['trailer', 'tickets'].map((v) => (
                    <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                      <input
                        type="radio"
                        name="radio-demo"
                        checked={radioValue === v}
                        onChange={() => setRadioValue(v)}
                        style={{ accentColor: primaryColor }}
                      />
                      {v === 'trailer' ? '予告編を観る' : 'Get Tickets'}
                    </label>
                  ))}
                </div>
              </div>
              <div className="component-code">
{`// accentColor: ${primaryColor}
<input type="radio" style={{ accentColor: '${primaryColor}' }} />`}
              </div>
            </div>

            {/* Checkbox */}
            <div className="component-card">
              <div className="component-label">Form.Checkbox</div>
              <div className="component-render">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: tokens.bodySize }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    style={{ accentColor: primaryColor, width: 16, height: 16 }}
                  />
                  メールマガジンを受け取る
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
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button
                    style={{
                      height: tokens.ctaHeight,
                      background: tokens.ctaBg,
                      color: tokens.ctaColor,
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0 24px',
                      fontSize: tokens.bodySize,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    詳細はこちら
                  </button>
                  <button
                    style={{
                      height: tokens.ctaHeight,
                      background: 'transparent',
                      color: tokens.ctaBg,
                      border: `1px solid ${tokens.ctaBg}`,
                      borderRadius: '6px',
                      padding: '0 24px',
                      fontSize: tokens.bodySize,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
              <div className="component-code">
{`// ctaBg:${tokens.ctaBg} / ctaColor:${tokens.ctaColor} / height:${tokens.ctaHeight} / radius:6px(想定)
<button style={{
  height: '${tokens.ctaHeight}',
  background: '${tokens.ctaBg}',
  color: '${tokens.ctaColor}',
  borderRadius: '6px',
}}>詳細はこちら</button>`}
              </div>
            </div>

            {/* Pagination */}
            <div className="component-card">
              <div className="component-label">Pagination</div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      style={{
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        fontSize: 13,
                        cursor: 'pointer',
                        background: n === 1 ? primaryColor : 'transparent',
                        color: n === 1 ? '#ffffff' : '#333333',
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
<div style={{ background: '${primaryColor}', color: '#fff' }}>1</div>
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
                Card.Article <span style={{ color: '#f59e0b', fontSize: 11 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ border: `1px solid ${tokens.borderColor}`, borderRadius: '8px', overflow: 'hidden', maxWidth: 280 }}>
                  <div style={{ height: 6, background: primaryColor }} />
                  <div style={{ padding: 16 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700 }}>映画タイトル サンプル</h4>
                    <p style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>
                      2026年 全国公開予定。詳細情報はオフィシャルサイトをご覧ください。
                    </p>
                  </div>
                </div>
              </div>
              <div className="component-code">
{`// border:${tokens.borderColor} / accentBar height:6px / accentColor:${primaryColor}
<div style={{ borderTop: '6px solid ${primaryColor}' }}>...</div>`}
              </div>
            </div>

            {/* Badge.Category */}
            <div className="component-card">
              <div className="component-label">
                Badge.Category <span style={{ color: '#f59e0b', fontSize: 11 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 10 }}>
                  <span
                    style={{
                      background: primaryColor,
                      color: '#ffffff',
                      fontSize: 12,
                      padding: '4px 12px',
                      borderRadius: '999px',
                    }}
                  >
                    映画
                  </span>
                  <span
                    style={{
                      background: 'transparent',
                      color: '#333333',
                      border: `1px solid ${tokens.borderColor}`,
                      fontSize: 12,
                      padding: '4px 12px',
                      borderRadius: '999px',
                    }}
                  >
                    TV
                  </span>
                </div>
              </div>
              <div className="component-code">
{`// filled:${primaryColor} / outline border:${tokens.borderColor}
<span style={{ background: '${primaryColor}', color: '#fff' }}>映画</span>
<span style={{ border: '1px solid ${tokens.borderColor}' }}>TV</span>`}
              </div>
            </div>

            {/* Table.Basic */}
            <div className="component-card">
              <div className="component-label">
                Table.Basic <span style={{ color: '#f59e0b', fontSize: 11 }}>想定</span>
              </div>
              <div className="component-render">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                      <th style={{ textAlign: 'left', padding: '8px 12px' }}>タイトル</th>
                      <th style={{ textAlign: 'left', padding: '8px 12px' }}>公開日</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                      <td style={{ padding: '8px 12px' }}>Merrily We Roll Along</td>
                      <td style={{ padding: '8px 12px' }}>2026.08</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px 12px' }}>Spider-Man: Brand New Day</td>
                      <td style={{ padding: '8px 12px' }}>2026.04</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="component-code">
{`// thead bg:${tokens.inputBg} / borderBottom:2px solid ${primaryColor} / row border:${tokens.borderColor}
<thead style={{ background: '${tokens.inputBg}', borderBottom: '2px solid ${primaryColor}' }} />`}
              </div>
            </div>

            {/* Nav.Tabs */}
            <div className="component-card">
              <div className="component-label">
                Nav.Tabs <span style={{ color: '#f59e0b', fontSize: 11 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', gap: 24, borderBottom: `1px solid ${tokens.borderColor}` }}>
                  <div style={{ paddingBottom: 8, borderBottom: `2px solid ${primaryColor}`, color: primaryColor, fontWeight: 700, fontSize: 14 }}>
                    映画
                  </div>
                  <div style={{ paddingBottom: 8, color: '#6b7280', fontSize: 14 }}>TV</div>
                  <div style={{ paddingBottom: 8, color: '#6b7280', fontSize: 14 }}>ニュース</div>
                </div>
              </div>
              <div className="component-code">
{`// active borderBottom:${primaryColor} / active color:${primaryColor}
<div style={{ borderBottom: '2px solid ${primaryColor}', color: '${primaryColor}' }}>映画</div>`}
              </div>
            </div>

            {/* Toast.Notification */}
            <div className="component-card">
              <div className="component-label">
                Toast.Notification <span style={{ color: '#f59e0b', fontSize: 11 }}>想定</span>
              </div>
              <div className="component-render">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    style={{
                      borderLeft: `4px solid ${primaryColor}`,
                      background: '#ffffff',
                      border: `1px solid ${tokens.borderColor}`,
                      borderLeftWidth: 4,
                      borderRadius: tokens.inputRadius,
                      padding: '10px 14px',
                      fontSize: 13,
                    }}
                  >
                    送信が完了しました。
                  </div>
                  <div
                    style={{
                      borderLeft: '4px solid #E60012',
                      background: '#ffffff',
                      border: `1px solid ${tokens.borderColor}`,
                      borderLeftWidth: 4,
                      borderRadius: tokens.inputRadius,
                      padding: '10px 14px',
                      fontSize: 13,
                    }}
                  >
                    入力内容をご確認ください。
                  </div>
                </div>
              </div>
              <div className="component-code">
{`// success borderLeft:${primaryColor} / warning borderLeft:#E60012 / radius:${tokens.inputRadius}
<div style={{ borderLeft: '4px solid ${primaryColor}', borderRadius: '${tokens.inputRadius}' }} />`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}