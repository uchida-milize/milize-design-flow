'use client';
import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const tokens = {
  inputBg: '#FFFFFF',
  inputRadius: '0px',
  inputHeight: '40px',
  borderColor: '#000000',
  ctaBg: '#000000',
  ctaColor: '#FFFFFF',
  ctaHeight: '44px',
  textColor: '#333333',
  labelSize: '12px',
  bodySize: '14px',
};

export default function ComponentsPage() {
  const clientName: string = 'ソニー・ミュージックグループ';
  const basePath: string = '/smecojpcompany';
  const primaryColor: string = '#000000';

  const [activeTab, setActiveTab] = useState<'implemented' | 'derived'>('implemented');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40 }}>
        <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
        <h1 className="section-title">コンポーネント</h1>
        <p className="section-desc">
          実サイトから確認できたコンポーネントと、デザイントークンを踏襲した派生デザイン（想定）を掲載しています。
        </p>
      </div>

      <div className="tab-nav" style={{ marginTop: 32 }}>
        <button
          className={`tab-btn ${activeTab === 'implemented' ? 'active' : ''}`}
          style={activeTab === 'implemented' ? { background: primaryColor } : {}}
          onClick={() => setActiveTab('implemented')}
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
          {/* TextInput */}
          <div className="component-card">
            <div className="component-label">Form.TextInput</div>
            <div className="component-render">
              <input
                type="text"
                placeholder="お名前"
                style={{
                  width: '100%',
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
            <div className="component-code">
{`// bg:${tokens.inputBg} / radius:${tokens.inputRadius} / height:${tokens.inputHeight}
<input style={{ height: '${tokens.inputHeight}', background: '${tokens.inputBg}', border: '1px solid ${tokens.borderColor}', borderRadius: '${tokens.inputRadius}' }} />`}
            </div>
          </div>

          {/* Textarea */}
          <div className="component-card">
            <div className="component-label">Form.Textarea</div>
            <div className="component-render">
              <textarea
                placeholder="お問い合わせ内容"
                rows={4}
                style={{
                  width: '100%',
                  background: '#FFFFFF',
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  padding: '12px',
                  fontSize: tokens.bodySize,
                  color: tokens.textColor,
                  resize: 'vertical',
                }}
              />
            </div>
            <div className="component-code">
{`// bg:#FFFFFF / border:1px solid ${tokens.borderColor} / resize:vertical`}
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
                    height: '40px',
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
                  ⌕
                </button>
              </div>
            </div>
            <div className="component-code">
{`// 丸型input + 円形ボタン / accent:${primaryColor}`}
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
                    height: '40px',
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    background: '#fff',
                    padding: '0 12px',
                    textAlign: 'left',
                    fontSize: tokens.bodySize,
                    cursor: 'pointer',
                  }}
                >
                  カテゴリを選択 {dropdownOpen ? '▲' : '▼'}
                </button>
                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '44px',
                      left: 0,
                      right: 0,
                      border: `1px solid ${tokens.borderColor}`,
                      background: '#fff',
                      zIndex: 10,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {['ニュース', '事業紹介', '採用情報'].map((item) => (
                      <div key={item} style={{ padding: '10px 12px', fontSize: tokens.bodySize, cursor: 'pointer' }}>
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="component-code">
{`// height:40px / border:${tokens.borderColor} / useState開閉アニメーション`}
            </div>
          </div>

          {/* RadioGroup */}
          <div className="component-card">
            <div className="component-label">Form.RadioGroup</div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: 24 }}>
                {['男性', '女性', '回答しない'].map((item) => (
                  <label key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                    <input type="radio" name="gender" style={{ accentColor: primaryColor }} />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <div className="component-code">
{`// accentColor:${primaryColor}`}
            </div>
          </div>

          {/* Checkbox */}
          <div className="component-card">
            <div className="component-label">Form.Checkbox</div>
            <div className="component-render">
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                <input type="checkbox" style={{ accentColor: primaryColor }} />
                プライバシーポリシーに同意する
              </label>
            </div>
            <div className="component-code">
{`// accentColor:${primaryColor}`}
            </div>
          </div>

          {/* CTA Button */}
          <div className="component-card">
            <div className="component-label">Button.CTA</div>
            <div className="component-render">
              <button
                style={{
                  height: tokens.ctaHeight,
                  padding: '0 32px',
                  background: tokens.ctaBg,
                  color: tokens.ctaColor,
                  border: 'none',
                  borderRadius: tokens.inputRadius,
                  fontSize: tokens.bodySize,
                  cursor: 'pointer',
                }}
              >
                送信する
              </button>
            </div>
            <div className="component-code">
{`// bg:${tokens.ctaBg} / color:${tokens.ctaColor} / height:${tokens.ctaHeight}`}
            </div>
          </div>

          {/* Pagination */}
          <div className="component-card">
            <div className="component-label">Pagination</div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: 8 }}>
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: `1px solid ${tokens.borderColor}`,
                      background: page === n ? primaryColor : '#fff',
                      color: page === n ? '#fff' : tokens.textColor,
                      cursor: 'pointer',
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="component-code">
{`// active:bg ${primaryColor} / inactive:border ${tokens.borderColor}`}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'derived' && (
        <div>
          {/* Card.Article */}
          <div className="component-card">
            <div className="component-label">
              Card.Article <span style={{ fontSize: 10, color: '#fff', background: '#9ca3af', padding: '1px 6px', borderRadius: 4, marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ border: `1px solid ${tokens.borderColor}`, borderRadius: 8, overflow: 'hidden', maxWidth: 320 }}>
                <div style={{ height: 6, background: primaryColor }} />
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 12, color: '#9ca3af' }}>2024.05.01</p>
                  <p style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>新しいニュースリリースのタイトル</p>
                  <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>ソニー・ミュージックグループ</p>
                </div>
              </div>
            </div>
            <div className="component-code">
{`// border:${tokens.borderColor} / accent-bar height:6px / bg:${primaryColor}`}
            </div>
          </div>

          {/* Badge.Category */}
          <div className="component-card">
            <div className="component-label">
              Badge.Category <span style={{ fontSize: 10, color: '#fff', background: '#9ca3af', padding: '1px 6px', borderRadius: 4, marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ padding: '4px 12px', borderRadius: 999, background: primaryColor, color: '#fff', fontSize: 12 }}>NEW</span>
                <span style={{ padding: '4px 12px', borderRadius: 999, border: `1px solid ${tokens.borderColor}`, color: tokens.textColor, fontSize: 12 }}>NEWS</span>
              </div>
            </div>
            <div className="component-code">
{`// filled:${primaryColor} / outline:${tokens.borderColor}`}
            </div>
          </div>

          {/* Table.Basic */}
          <div className="component-card">
            <div className="component-label">
              Table.Basic <span style={{ fontSize: 10, color: '#fff', background: '#9ca3af', padding: '1px 6px', borderRadius: 4, marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                    <th style={{ textAlign: 'left', padding: 8 }}>項目</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: 8 }}>会社名</td>
                    <td style={{ padding: 8 }}>ソニー・ミュージックグループ</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: 8 }}>設立</td>
                    <td style={{ padding: 8 }}>1968年</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="component-code">
{`// thead-bg:${tokens.inputBg} / border-bottom:2px solid ${primaryColor} / row-divider:${tokens.borderColor}`}
            </div>
          </div>

          {/* Nav.Tabs */}
          <div className="component-card">
            <div className="component-label">
              Nav.Tabs <span style={{ fontSize: 10, color: '#fff', background: '#9ca3af', padding: '1px 6px', borderRadius: 4, marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid #e5e7eb' }}>
                {['会社情報', '事業紹介', 'ニュース'].map((item, i) => (
                  <div
                    key={item}
                    style={{
                      paddingBottom: 8,
                      fontSize: 14,
                      color: i === 0 ? primaryColor : '#6b7280',
                      borderBottom: i === 0 ? `2px solid ${primaryColor}` : 'none',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="component-code">
{`// active: borderBottom ${primaryColor} / color ${primaryColor}`}
            </div>
          </div>

          {/* Toast.Notification */}
          <div className="component-card">
            <div className="component-label">
              Toast.Notification <span style={{ fontSize: 10, color: '#fff', background: '#9ca3af', padding: '1px 6px', borderRadius: 4, marginLeft: 6 }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ borderLeft: `4px solid ${primaryColor}`, background: '#fff', border: '1px solid #e5e7eb', borderLeftWidth: 4, padding: '12px 16px', borderRadius: 6, fontSize: 13 }}>
                  送信が完了しました
                </div>
                <div style={{ borderLeft: '4px solid #9ca3af', background: '#fff', border: '1px solid #e5e7eb', borderLeftWidth: 4, padding: '12px 16px', borderRadius: 6, fontSize: 13 }}>
                  入力内容をご確認ください
                </div>
              </div>
            </div>
            <div className="component-code">
{`// success:borderLeft ${primaryColor} / warning:borderLeft #9ca3af / radius:6px`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}