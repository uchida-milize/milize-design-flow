'use client';
import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

export default function ComponentsPage() {
  const clientName: string = 'Apple';
  const basePath: string = '/apple';
  const primaryColor: string = '#0071e3';

  const [activeTab, setActiveTab] = useState<'confirmed' | 'derived'>('confirmed');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState(2);
  const [activeNavTab, setActiveNavTab] = useState('overview');

  const tokens = {
    inputBg: '#ffffff',
    inputRadius: '8px',
    inputHeight: '40px',
    borderColor: '#d2d2d7',
    ctaBg: '#0071e3',
    ctaColor: '#ffffff',
    ctaHeight: '44px',
    textColor: '#333333',
    labelSize: '12px',
    bodySize: '14px',
  };

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40, marginBottom: 24 }}>
        <p className="section-label">COMPONENTS</p>
        <h1 className="section-title" style={{ fontSize: 32 }}>コンポーネント</h1>
        <p className="section-desc">
          {clientName} の実サイトから取得したコンポーネントと、デザイントークンを踏襲した派生デザインです。
        </p>
      </div>

      {/* タブナビゲーション */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        <button
          onClick={() => setActiveTab('confirmed')}
          style={{
            padding: '6px 16px',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            background: activeTab === 'confirmed' ? primaryColor : '#f3f4f6',
            color: activeTab === 'confirmed' ? '#ffffff' : '#6b7280',
          }}
        >
          実装確認済み
        </button>
        <button
          onClick={() => setActiveTab('derived')}
          style={{
            padding: '6px 16px',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            background: activeTab === 'derived' ? primaryColor : '#f3f4f6',
            color: activeTab === 'derived' ? '#ffffff' : '#6b7280',
          }}
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

      {activeTab === 'confirmed' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* TextInput */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.TextInput</div>
            <div style={{ padding: 24 }}>
              <input
                type="text"
                placeholder="お名前を入力"
                style={{
                  width: '100%',
                  maxWidth: 320,
                  height: tokens.inputHeight,
                  borderRadius: tokens.inputRadius,
                  border: `1px solid ${tokens.borderColor}`,
                  background: tokens.inputBg,
                  padding: '0 12px',
                  fontSize: tokens.bodySize,
                  outline: 'none',
                }}
              />
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// bg:#ffffff / radius:8px / height:40px / border:1px solid #d2d2d7
<input style={{ height: '40px', borderRadius: '8px', border: '1px solid #d2d2d7' }} />`}
            </pre>
          </div>

          {/* Textarea */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.Textarea</div>
            <div style={{ padding: 24 }}>
              <textarea
                placeholder="お問い合わせ内容"
                rows={4}
                style={{
                  width: '100%',
                  maxWidth: 400,
                  borderRadius: tokens.inputRadius,
                  border: `1px solid ${tokens.borderColor}`,
                  background: '#ffffff',
                  padding: 12,
                  fontSize: tokens.bodySize,
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// bg:#ffffff / border:1px solid #d2d2d7 / resize:vertical
<textarea style={{ resize: 'vertical', border: '1px solid #d2d2d7' }} />`}
            </pre>
          </div>

          {/* SearchInput */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.SearchInput</div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', maxWidth: 320 }}>
                <input
                  type="text"
                  placeholder="検索"
                  style={{
                    flex: 1,
                    height: tokens.inputHeight,
                    borderRadius: '20px',
                    border: `1px solid ${tokens.borderColor}`,
                    background: '#ffffff',
                    padding: '0 16px',
                    fontSize: tokens.bodySize,
                    outline: 'none',
                  }}
                />
                <button
                  style={{
                    marginLeft: -40,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: primaryColor,
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  →
                </button>
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// radius:20px(pill) / button: circle bg:${primaryColor}
<input style={{ borderRadius: '20px' }} />
<button style={{ borderRadius: '50%', background: '${primaryColor}' }} />`}
            </pre>
          </div>

          {/* Dropdown */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.Dropdown</div>
            <div style={{ padding: 24 }}>
              <div style={{ position: 'relative', maxWidth: 320 }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    width: '100%',
                    height: tokens.inputHeight,
                    borderRadius: tokens.inputRadius,
                    border: `1px solid ${tokens.borderColor}`,
                    background: '#ffffff',
                    padding: '0 12px',
                    fontSize: tokens.bodySize,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>製品を選択</span>
                  <span style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▾</span>
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
                      overflow: 'hidden',
                      zIndex: 10,
                    }}
                  >
                    {['iPhone', 'iPad', 'Mac', 'Apple Watch'].map((item) => (
                      <div key={item} style={{ padding: '10px 12px', fontSize: tokens.bodySize, cursor: 'pointer' }}>
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// height:40px / border:#d2d2d7 / open-close via useState
const [dropdownOpen, setDropdownOpen] = useState(false);`}
            </pre>
          </div>

          {/* RadioGroup */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.RadioGroup</div>
            <div style={{ padding: 24, display: 'flex', gap: 16 }}>
              {['GB 128', 'GB 256', 'GB 512'].map((v, i) => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                  <input type="radio" name="storage" defaultChecked={i === 0} style={{ accentColor: primaryColor }} />
                  {v}
                </label>
              ))}
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// accentColor:${primaryColor}
<input type="radio" style={{ accentColor: '${primaryColor}' }} />`}
            </pre>
          </div>

          {/* Checkbox */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.Checkbox</div>
            <div style={{ padding: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                <input type="checkbox" defaultChecked style={{ accentColor: primaryColor }} />
                最新情報をメールで受け取る
              </label>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// accentColor:${primaryColor}
<input type="checkbox" style={{ accentColor: '${primaryColor}' }} />`}
            </pre>
          </div>

          {/* CTA Button */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Button.CTA</div>
            <div style={{ padding: 24, display: 'flex', gap: 16 }}>
              <a
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: tokens.ctaHeight,
                  padding: '0 22px',
                  borderRadius: '980px',
                  background: 'transparent',
                  color: tokens.ctaBg,
                  fontSize: 17,
                  cursor: 'pointer',
                }}
              >
                さらに詳しく &gt;
              </a>
              <a
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: tokens.ctaHeight,
                  padding: '0 22px',
                  borderRadius: '980px',
                  background: tokens.ctaBg,
                  color: tokens.ctaColor,
                  fontSize: 17,
                  cursor: 'pointer',
                }}
              >
                価格を見る
              </a>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// bg:${primaryColor} / color:#ffffff / height:44px / radius:980px(pill)
<a style={{ background: '${primaryColor}', height: '44px', borderRadius: '980px' }} />`}
            </pre>
          </div>

          {/* Pagination */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Pagination</div>
            <div style={{ padding: 24, display: 'flex', gap: 8 }}>
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setActivePage(n)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: n === activePage ? 'none' : `1px solid ${tokens.borderColor}`,
                    background: n === activePage ? primaryColor : 'transparent',
                    color: n === activePage ? '#ffffff' : '#333333',
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// active: bg:${primaryColor} / inactive: border:#d2d2d7
<button style={{ background: '${primaryColor}' }} />`}
            </pre>
          </div>
        </div>
      )}

      {activeTab === 'derived' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Card.Article */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>
              Card.Article <span style={{ color: primaryColor, fontSize: 11, marginLeft: 6 }}>想定</span>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ border: `1px solid ${tokens.borderColor}`, borderRadius: 12, overflow: 'hidden', maxWidth: 320 }}>
                <div style={{ height: 6, background: primaryColor }} />
                <div style={{ padding: 16 }}>
                  <h3 style={{ fontSize: 16, marginBottom: 8 }}>iPhone 18 Pro</h3>
                  <p style={{ fontSize: 13, color: '#6b7280' }}>チタニウムデザインと新チップ搭載の最新モデル。</p>
                </div>
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// accent bar height:6px bg:${primaryColor} / border:${tokens.borderColor}
<div style={{ borderTop: '6px solid ${primaryColor}' }} />`}
            </pre>
          </div>

          {/* Badge.Category */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>
              Badge.Category <span style={{ color: primaryColor, fontSize: 11, marginLeft: 6 }}>想定</span>
            </div>
            <div style={{ padding: 24, display: 'flex', gap: 12 }}>
              <span style={{ padding: '4px 12px', borderRadius: 999, background: primaryColor, color: '#ffffff', fontSize: 12 }}>
                New
              </span>
              <span style={{ padding: '4px 12px', borderRadius: 999, border: `1px solid ${tokens.borderColor}`, color: '#333333', fontSize: 12 }}>
                Featured
              </span>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// filled: bg:${primaryColor} / outline: border:${tokens.borderColor}
<span style={{ background: '${primaryColor}' }} />`}
            </pre>
          </div>

          {/* Table.Basic */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>
              Table.Basic <span style={{ color: primaryColor, fontSize: 11, marginLeft: 6 }}>想定</span>
            </div>
            <div style={{ padding: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                    <th style={{ textAlign: 'left', padding: 8 }}>モデル</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>価格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: 8 }}>iPhone 18 Pro</td>
                    <td style={{ padding: 8 }}>¥159,800〜</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: 8 }}>iPhone 18</td>
                    <td style={{ padding: 8 }}>¥124,800〜</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// thead bg:${tokens.inputBg} / borderBottom:2px solid ${primaryColor}
<thead style={{ borderBottom: '2px solid ${primaryColor}' }} />`}
            </pre>
          </div>

          {/* Nav.Tabs */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>
              Nav.Tabs <span style={{ color: primaryColor, fontSize: 11, marginLeft: 6 }}>想定</span>
            </div>
            <div style={{ padding: 24, display: 'flex', gap: 24 }}>
              {['overview', 'tech specs', 'compare'].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveNavTab(t)}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: activeNavTab === t ? `2px solid ${primaryColor}` : '2px solid transparent',
                    color: activeNavTab === t ? primaryColor : '#6b7280',
                    padding: '8px 0',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// active borderBottom:2px solid ${primaryColor} / color:${primaryColor}
<button style={{ borderBottom: '2px solid ${primaryColor}' }} />`}
            </pre>
          </div>

          {/* Toast.Notification */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>
              Toast.Notification <span style={{ color: primaryColor, fontSize: 11, marginLeft: 6 }}>想定</span>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ borderLeft: `4px solid ${primaryColor}`, background: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', borderRadius: 8, padding: '12px 16px', fontSize: 13 }}>
                注文が正常に完了しました。
              </div>
              <div style={{ borderLeft: '4px solid #000000', background: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', borderRadius: 8, padding: '12px 16px', fontSize: 13 }}>
                在庫が残りわずかです。
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', margin: 0, overflowX: 'auto' }}>
{`// success: borderLeft:4px solid ${primaryColor} / warning: borderLeft:4px solid #000000
<div style={{ borderLeft: '4px solid ${primaryColor}', borderRadius: '8px' }} />`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}