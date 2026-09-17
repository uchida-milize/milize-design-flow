'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function ComponentsPage() {
  const clientName: string = 'NVIDIA';
  const basePath: string = '/nvidia';
  const primaryColor: string = '#77B801';

  const [tab, setTab] = useState<'confirmed' | 'derived'>('confirmed');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('DRIVE Platform');

  const tokens = {
    inputBg: '#FFFFFF',
    inputRadius: '2px',
    inputHeight: '40px',
    borderColor: '#CCCCCC',
    ctaBg: '#77B801',
    ctaColor: '#FFFFFF',
    ctaHeight: '44px',
    textColor: '#333333',
    labelSize: '14px',
    bodySize: '14px',
  };

  const tabs = [
    { key: 'confirmed', label: '実装確認済み' },
    { key: 'derived', label: '派生デザイン（想定）' },
  ] as const;

  return (
    <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <section style={{ marginTop: 40, marginBottom: 32 }}>
        <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
        <h1 className="section-title" style={{ fontSize: 32 }}>コンポーネント</h1>
        <p className="section-desc">
          {clientName}のサイトから取得した実装確認済みコンポーネントと、デザイントークンを踏襲した派生デザインを掲載しています。
        </p>
      </section>

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

      <div className="tab-nav">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`tab-item ${tab === t.key ? 'active' : ''}`}
            style={tab === t.key ? { backgroundColor: primaryColor } : {}}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'confirmed' && (
        <div>
          {/* Form.TextInput */}
          <div className="component-card">
            <div className="component-label">Form.TextInput</div>
            <div className="component-render">
              <label style={{ display: 'block', fontSize: tokens.labelSize, marginBottom: 6, color: tokens.textColor }}>
                Email
              </label>
              <input
                type="text"
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  maxWidth: 360,
                  height: tokens.inputHeight,
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  padding: '0 12px',
                  fontSize: 14,
                  backgroundColor: tokens.inputBg,
                  outline: 'none',
                }}
              />
            </div>
            <div className="component-code">
{`// bg:#FFFFFF / border:#CCCCCC / radius:2px / height:40px
// focus時ボーダー:#003EFF
<input style={{
  height: '40px',
  border: '1px solid #CCCCCC',
  borderRadius: '2px',
  padding: '0 12px',
}} />`}
            </div>
          </div>

          {/* Form.Textarea */}
          <div className="component-card">
            <div className="component-label">Form.Textarea</div>
            <div className="component-render">
              <label style={{ display: 'block', fontSize: tokens.labelSize, marginBottom: 6, color: tokens.textColor }}>
                Message
              </label>
              <textarea
                placeholder="Your message"
                style={{
                  width: '100%',
                  maxWidth: 360,
                  height: '120px',
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  padding: '12px',
                  fontSize: 14,
                  resize: 'vertical',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>
            <div className="component-code">
{`// bg:#FFFFFF / border:#CCCCCC / radius:2px / height:120px / resize:vertical
<textarea style={{
  height: '120px',
  border: '1px solid #CCCCCC',
  borderRadius: '2px',
  resize: 'vertical',
}} />`}
            </div>
          </div>

          {/* Form.SearchInput */}
          <div className="component-card">
            <div className="component-label">Form.SearchInput</div>
            <div className="component-render">
              <div style={{ display: 'flex', alignItems: 'center', maxWidth: 320, border: `1px solid ${tokens.borderColor}`, borderRadius: 20, overflow: 'hidden' }}>
                <input
                  type="text"
                  placeholder="Search"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '0 16px',
                    height: 40,
                    fontSize: 14,
                  }}
                />
                <button
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: primaryColor,
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  ⌕
                </button>
              </div>
            </div>
            <div className="component-code">
{`// 丸型input + 円形ボタン(primaryColor:#77B801)
<div style={{ borderRadius: '20px', border: '1px solid #CCCCCC' }}>
  <input />
  <button style={{ borderRadius: '50%', background: '#77B801' }}>⌕</button>
</div>`}
            </div>
          </div>

          {/* Form.Dropdown */}
          <div className="component-card">
            <div className="component-label">Form.Dropdown</div>
            <div className="component-render">
              <div style={{ position: 'relative', maxWidth: 280 }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    width: '100%',
                    height: tokens.inputHeight,
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    background: '#FFFFFF',
                    padding: '0 12px',
                    fontSize: 14,
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {selectedOption}
                  <span style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                    ▾
                  </span>
                </button>
                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '44px',
                      left: 0,
                      right: 0,
                      border: `1px solid ${tokens.borderColor}`,
                      borderRadius: tokens.inputRadius,
                      background: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      zIndex: 10,
                    }}
                  >
                    {['DRIVE Platform', 'Documentation Feedback', 'Other'].map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setSelectedOption(opt);
                          setDropdownOpen(false);
                        }}
                        style={{ padding: '10px 12px', fontSize: 14, cursor: 'pointer' }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="component-code">
{`// height:40px / border:#CCCCCC / radius:2px / 開閉時 useState 管理
const [dropdownOpen, setDropdownOpen] = useState(false);
<button onClick={() => setDropdownOpen(!dropdownOpen)}>...</button>`}
            </div>
          </div>

          {/* Form.RadioGroup */}
          <div className="component-card">
            <div className="component-label">Form.RadioGroup</div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
                  <input type="radio" name="human-check" style={{ accentColor: primaryColor, width: 16, height: 16 }} defaultChecked />
                  I am human
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
                  <input type="radio" name="human-check" style={{ accentColor: primaryColor, width: 16, height: 16 }} />
                  Other
                </label>
              </div>
            </div>
            <div className="component-code">
{`// accentColor: #77B801 / hCaptcha "I am human" 型UI
<input type="radio" style={{ accentColor: '#77B801' }} />`}
            </div>
          </div>

          {/* Form.Checkbox */}
          <div className="component-card">
            <div className="component-label">Form.Checkbox</div>
            <div className="component-render">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                <input type="checkbox" style={{ accentColor: primaryColor, width: 16, height: 16, borderRadius: 2 }} />
                I consent to NVIDIA contacting me regarding this inquiry.
              </label>
            </div>
            <div className="component-code">
{`// accentColor:#77B801 / size:16px / radius:2px
<input type="checkbox" style={{ accentColor: '#77B801', width: 16, height: 16 }} />`}
            </div>
          </div>

          {/* Button.CTA */}
          <div className="component-card">
            <div className="component-label">Button.CTA</div>
            <div className="component-render">
              <button
                style={{
                  backgroundColor: tokens.ctaBg,
                  color: tokens.ctaColor,
                  height: tokens.ctaHeight,
                  border: 'none',
                  borderRadius: '2px',
                  padding: '0 24px',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Register Now
              </button>
            </div>
            <div className="component-code">
{`// bg:#77B801 / color:#FFFFFF / radius:2px / padding:12px 24px
<button style={{
  backgroundColor: '#77B801',
  color: '#FFFFFF',
  borderRadius: '2px',
  padding: '12px 24px',
}}>Register Now</button>`}
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
                      fontSize: 14,
                      borderRadius: 2,
                      backgroundColor: n === 1 ? primaryColor : 'transparent',
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
{`// active: bg:#77B801 / inactive: border:#CCCCCC
<div style={{ backgroundColor: '#77B801', color: '#fff' }}>1</div>
<div style={{ border: '1px solid #CCCCCC' }}>2</div>`}
            </div>
          </div>
        </div>
      )}

      {tab === 'derived' && (
        <div>
          {/* Card.Article */}
          <div className="component-card">
            <div className="component-label">
              Card.Article <span style={{ fontSize: 11, color: '#b45309', marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ maxWidth: 320, border: `1px solid ${tokens.borderColor}`, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: 6, backgroundColor: primaryColor }} />
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>2024.06.01</p>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>New GPU Architecture Announced</h4>
                  <p style={{ fontSize: 13, color: '#666666', marginBottom: 8 }}>
                    次世代アーキテクチャの詳細が公開されました。
                  </p>
                  <a style={{ fontSize: 13, color: primaryColor, fontWeight: 700 }} href="#">Read Blog →</a>
                </div>
              </div>
            </div>
            <div className="component-code">
{`// border:#CCCCCC / accent bar height:6px bg:#77B801
<div style={{ borderTop: '6px solid #77B801' }}>...</div>`}
            </div>
          </div>

          {/* Badge.Category */}
          <div className="component-card">
            <div className="component-label">
              Badge.Category <span style={{ fontSize: 11, color: '#b45309', marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: 12 }}>
                <span
                  style={{
                    backgroundColor: primaryColor,
                    color: '#fff',
                    fontSize: 12,
                    padding: '4px 12px',
                    borderRadius: 12,
                  }}
                >
                  Keynote
                </span>
                <span
                  style={{
                    backgroundColor: 'transparent',
                    color: tokens.textColor,
                    fontSize: 12,
                    padding: '4px 12px',
                    borderRadius: 12,
                    border: `1px solid ${tokens.borderColor}`,
                  }}
                >
                  HPC
                </span>
              </div>
            </div>
            <div className="component-code">
{`// filled: bg:#77B801 / outline: border:#CCCCCC / radius:12px
<span style={{ backgroundColor: '#77B801', borderRadius: '12px' }}>Keynote</span>
<span style={{ border: '1px solid #CCCCCC', borderRadius: '12px' }}>HPC</span>`}
            </div>
          </div>

          {/* Table.Basic */}
          <div className="component-card">
            <div className="component-label">
              Table.Basic <span style={{ fontSize: 11, color: '#b45309', marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ backgroundColor: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>Product</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left' }}>Category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: '8px 12px' }}>H100</td>
                    <td style={{ padding: '8px 12px' }}>HPC</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: '8px 12px' }}>RTX 5090</td>
                    <td style={{ padding: '8px 12px' }}>Gaming</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="component-code">
{`// thead bg:#FFFFFF / borderBottom:2px solid #77B801 / row border:#CCCCCC
<thead style={{ borderBottom: '2px solid #77B801' }} />`}
            </div>
          </div>

          {/* Nav.Tabs */}
          <div className="component-card">
            <div className="component-label">
              Nav.Tabs <span style={{ fontSize: 11, color: '#b45309', marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: 24, borderBottom: `1px solid ${tokens.borderColor}` }}>
                <div style={{ paddingBottom: 8, borderBottom: `2px solid ${primaryColor}`, color: primaryColor, fontWeight: 700, fontSize: 14 }}>
                  Overview
                </div>
                <div style={{ paddingBottom: 8, color: tokens.textColor, fontSize: 14 }}>
                  Specifications
                </div>
                <div style={{ paddingBottom: 8, color: tokens.textColor, fontSize: 14 }}>
                  Reviews
                </div>
              </div>
            </div>
            <div className="component-code">
{`// active: borderBottom:2px solid #77B801 / color:#77B801
<div style={{ borderBottom: '2px solid #77B801', color: '#77B801' }}>Overview</div>`}
            </div>
          </div>

          {/* Toast.Notification */}
          <div className="component-card">
            <div className="component-label">
              Toast.Notification <span style={{ fontSize: 11, color: '#b45309', marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  borderLeft: `4px solid ${primaryColor}`,
                  backgroundColor: '#F7F7F7',
                  borderRadius: 4,
                  padding: '12px 16px',
                  fontSize: 14,
                }}
              >
                登録が完了しました。
              </div>
              <div
                style={{
                  borderLeft: '4px solid #003EFF',
                  backgroundColor: '#F7F7F7',
                  borderRadius: 4,
                  padding: '12px 16px',
                  fontSize: 14,
                }}
              >
                入力内容をご確認ください。
              </div>
            </div>
            <div className="component-code">
{`// success: borderLeft:#77B801 / warning: borderLeft:#003EFF / radius:4px
<div style={{ borderLeft: '4px solid #77B801', borderRadius: '4px' }}>...</div>`}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}