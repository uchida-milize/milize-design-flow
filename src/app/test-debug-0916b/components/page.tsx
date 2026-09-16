'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const tokens = {
  inputBg: '#FFFFFF',
  inputRadius: '2px',
  inputHeight: '40px',
  borderColor: '#E8E8E8',
  ctaBg: '#BE0026',
  ctaColor: '#FFFFFF',
  ctaHeight: '48px',
  textColor: '#333333',
  labelSize: '13px',
  bodySize: '14px',
};

export default function ComponentsPage() {
  const clientName: string = 'test-debug-0916b株式会社';
  const basePath: string = '/test-debug-0916b';
  const primaryColor: string = '#BE0026';

  const [activeTab, setActiveTab] = useState<'implemented' | 'derived'>('implemented');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('企画・開発');
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('A');
  const [activeTabDemo, setActiveTabDemo] = useState('tab1');

  const dropdownOptions = [
    '企画・開発', 'アート制作(3DCG)', 'アート制作(2DCG)', '映像制作',
    'ローカライズ', 'ゲームデバッグ・テスト', 'アプリ運用',
    '撮影・動画制作・動画解析', 'ソフトウェアテスト', 'ゲーム専門エージェント', 'その他',
  ];

  return (
    <div className="portal-content" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <div style={{ marginTop: 40, marginBottom: 32 }}>
        <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
        <h1 className="section-title" style={{ fontSize: 32, marginTop: 8 }}>
          コンポーネント
        </h1>
        <p className="section-desc" style={{ marginTop: 8 }}>
          実サイトから確認できたコンポーネントと、デザイン言語を踏襲した派生デザイン（想定）です。
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        <button
          onClick={() => setActiveTab('implemented')}
          style={{
            padding: '6px 16px',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            background: activeTab === 'implemented' ? primaryColor : '#f3f4f6',
            color: activeTab === 'implemented' ? '#ffffff' : '#6b7280',
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

      {activeTab === 'implemented' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Form.TextInput */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.TextInput</div>
            <div style={{ padding: 24 }}>
              <label style={{ fontSize: tokens.labelSize, color: tokens.textColor, display: 'block', marginBottom: 6 }}>
                企業名<span style={{ color: primaryColor, fontSize: 11, marginLeft: 4 }}>必須</span>
              </label>
              <input
                type="text"
                placeholder="株式会社サンプル"
                style={{
                  width: '100%',
                  height: tokens.inputHeight,
                  background: tokens.inputBg,
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  padding: '0 12px',
                  fontSize: tokens.bodySize,
                  fontFamily: 'Noto Sans JP, sans-serif',
                }}
              />
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// bg:#FFFFFF / radius:2px / height:40px / border:#E8E8E8
<input type="text" style={{
  height: '40px', borderRadius: '2px',
  border: '1px solid #E8E8E8', background: '#FFFFFF'
}} />`}
            </pre>
          </div>

          {/* Form.Textarea */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.Textarea</div>
            <div style={{ padding: 24 }}>
              <label style={{ fontSize: tokens.labelSize, color: tokens.textColor, display: 'block', marginBottom: 6 }}>
                お問い合わせ内容
              </label>
              <textarea
                rows={4}
                placeholder="お問い合わせ内容をご記入ください"
                style={{
                  width: '100%',
                  background: '#FFFFFF',
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  padding: 12,
                  fontSize: tokens.bodySize,
                  fontFamily: 'Noto Sans JP, sans-serif',
                  resize: 'vertical',
                }}
              />
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// bg:#FFFFFF / border:#E8E8E8 / radius:2px / resize:vertical
<textarea style={{ resize: 'vertical', border: '1px solid #E8E8E8' }} />`}
            </pre>
          </div>

          {/* Form.SearchInput */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.SearchInput</div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', maxWidth: 320 }}>
                <input
                  type="text"
                  placeholder="検索"
                  style={{
                    flex: 1,
                    height: 40,
                    borderRadius: '999px 0 0 999px',
                    border: `1px solid ${tokens.borderColor}`,
                    borderRight: 'none',
                    padding: '0 16px',
                    fontSize: tokens.bodySize,
                    fontFamily: 'Noto Sans JP, sans-serif',
                    outline: 'none',
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
                  🔍
                </button>
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// 丸型input + 円形ボタン(primaryColor:#BE0026) / height:40px
<input style={{ borderRadius: '999px 0 0 999px' }} />
<button style={{ borderRadius: '0 999px 999px 0', background: '#BE0026' }} />`}
            </pre>
          </div>

          {/* Form.Dropdown */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.Dropdown</div>
            <div style={{ padding: 24 }}>
              <label style={{ fontSize: tokens.labelSize, color: tokens.textColor, display: 'block', marginBottom: 6 }}>
                お問い合わせ種別
              </label>
              <div style={{ position: 'relative', maxWidth: 320 }}>
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    height: 40,
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 12px',
                    fontSize: tokens.bodySize,
                    cursor: 'pointer',
                    background: '#FFFFFF',
                  }}
                >
                  <span>{dropdownValue}</span>
                  <span
                    style={{
                      transition: 'transform 0.2s ease',
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    ▾
                  </span>
                </div>
                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 44,
                      left: 0,
                      right: 0,
                      background: '#FFFFFF',
                      border: `1px solid ${tokens.borderColor}`,
                      borderRadius: tokens.inputRadius,
                      maxHeight: 200,
                      overflowY: 'auto',
                      zIndex: 10,
                    }}
                  >
                    {dropdownOptions.map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setDropdownValue(opt);
                          setDropdownOpen(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          fontSize: tokens.bodySize,
                          cursor: 'pointer',
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// height:40px / border:#E8E8E8 / radius:2px / useState開閉アニメーション
const [dropdownOpen, setDropdownOpen] = useState(false);`}
            </pre>
          </div>

          {/* Form.RadioGroup */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.RadioGroup</div>
            <div style={{ padding: 24, display: 'flex', gap: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                <input
                  type="radio"
                  name="demo-radio"
                  checked={radioValue === 'A'}
                  onChange={() => setRadioValue('A')}
                  style={{ accentColor: primaryColor }}
                />
                個人
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: tokens.bodySize }}>
                <input
                  type="radio"
                  name="demo-radio"
                  checked={radioValue === 'B'}
                  onChange={() => setRadioValue('B')}
                  style={{ accentColor: primaryColor }}
                />
                法人
              </label>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// accentColor: #BE0026
<input type="radio" style={{ accentColor: '#BE0026' }} />`}
            </pre>
          </div>

          {/* Form.Checkbox */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Form.Checkbox</div>
            <div style={{ padding: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: tokens.bodySize }}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  style={{ accentColor: primaryColor, width: 16, height: 16 }}
                />
                個人情報の取扱いに同意する
              </label>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// accentColor: #BE0026
<input type="checkbox" style={{ accentColor: '#BE0026' }} />`}
            </pre>
          </div>

          {/* Button.CTA */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Button.CTA</div>
            <div style={{ padding: 24 }}>
              <button
                style={{
                  height: tokens.ctaHeight,
                  padding: '0 32px',
                  background: tokens.ctaBg,
                  color: tokens.ctaColor,
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                お問い合わせ
              </button>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// bg:#BE0026 / color:#FFFFFF / height:48px / radius:4px
<button style={{ background: '#BE0026', height: '48px', borderRadius: '4px' }} />`}
            </pre>
          </div>

          {/* Pagination */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>Pagination</div>
            <div style={{ padding: 24, display: 'flex', gap: 8 }}>
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    fontSize: 13,
                    background: n === 1 ? primaryColor : '#FFFFFF',
                    color: n === 1 ? '#ffffff' : '#333333',
                    border: n === 1 ? 'none' : `1px solid ${tokens.borderColor}`,
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// active: bg #BE0026 / inactive: border #E8E8E8
<div style={{ background: active ? '#BE0026' : '#FFFFFF' }} />`}
            </pre>
          </div>

        </div>
      )}

      {activeTab === 'derived' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Card.Article */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>
              Card.Article <span style={{ color: '#9ca3af', fontSize: 11, marginLeft: 6 }}>想定</span>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ border: `1px solid ${tokens.borderColor}`, borderRadius: 8, overflow: 'hidden', maxWidth: 320 }}>
                <div style={{ height: 6, background: primaryColor }} />
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>お知らせ</p>
                  <h3 style={{ fontSize: 16, marginBottom: 6 }}>記事タイトルのサンプル</h3>
                  <p style={{ fontSize: 13, color: '#585858' }}>記事の概要テキストがここに入ります。</p>
                </div>
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// border:#E8E8E8 / accent bar height:6px / bg:#BE0026
<div style={{ borderTop: '6px solid #BE0026' }} />`}
            </pre>
          </div>

          {/* Badge.Category */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>
              Badge.Category <span style={{ color: '#9ca3af', fontSize: 11, marginLeft: 6 }}>想定</span>
            </div>
            <div style={{ padding: 24, display: 'flex', gap: 12 }}>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 12,
                  background: primaryColor,
                  color: '#ffffff',
                }}
              >
                お知らせ
              </span>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 12,
                  background: 'transparent',
                  color: '#333333',
                  border: `1px solid ${tokens.borderColor}`,
                }}
              >
                実績更新
              </span>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// filled: bg #BE0026 / outline: border #E8E8E8
<span style={{ background: '#BE0026', borderRadius: '999px' }} />`}
            </pre>
          </div>

          {/* Table.Basic */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>
              Table.Basic <span style={{ color: '#9ca3af', fontSize: 11, marginLeft: 6 }}>想定</span>
            </div>
            <div style={{ padding: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                    <th style={{ textAlign: 'left', padding: 8 }}>項目</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: 8 }}>企業名</td>
                    <td style={{ padding: 8 }}>株式会社サンプル</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: 8 }}>担当者</td>
                    <td style={{ padding: 8 }}>山田 太郎</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// thead bg:#FFFFFF / borderBottom(head): 2px solid #BE0026 / row border:#E8E8E8
<thead style={{ borderBottom: '2px solid #BE0026' }} />`}
            </pre>
          </div>

          {/* Nav.Tabs */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>
              Nav.Tabs <span style={{ color: '#9ca3af', fontSize: 11, marginLeft: 6 }}>想定</span>
            </div>
            <div style={{ padding: 24, display: 'flex', gap: 24, borderBottom: `1px solid ${tokens.borderColor}` }}>
              {['tab1', 'tab2', 'tab3'].map((t) => (
                <div
                  key={t}
                  onClick={() => setActiveTabDemo(t)}
                  style={{
                    paddingBottom: 12,
                    cursor: 'pointer',
                    fontSize: 14,
                    color: activeTabDemo === t ? primaryColor : '#585858',
                    borderBottom: activeTabDemo === t ? `2px solid ${primaryColor}` : '2px solid transparent',
                  }}
                >
                  {t === 'tab1' ? '会社概要' : t === 'tab2' ? '事業内容' : 'お知らせ'}
                </div>
              ))}
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// active: borderBottom 2px solid #BE0026 / color:#BE0026
<div style={{ borderBottom: '2px solid #BE0026', color: '#BE0026' }} />`}
            </pre>
          </div>

          {/* Toast.Notification */}
          <div className="portal-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 24px 0', fontSize: 12, color: '#9ca3af' }}>
              Toast.Notification <span style={{ color: '#9ca3af', fontSize: 11, marginLeft: 6 }}>想定</span>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div
                style={{
                  borderLeft: `4px solid ${primaryColor}`,
                  background: '#FFFFFF',
                  border: `1px solid ${tokens.borderColor}`,
                  borderLeftWidth: 4,
                  borderRadius: 4,
                  padding: '12px 16px',
                  fontSize: 13,
                }}
              >
                送信が完了しました。
              </div>
              <div
                style={{
                  borderLeft: '4px solid #FAE5EB',
                  background: '#FFFFFF',
                  border: `1px solid ${tokens.borderColor}`,
                  borderLeftWidth: 4,
                  borderLeftColor: '#FAE5EB',
                  borderRadius: 4,
                  padding: '12px 16px',
                  fontSize: 13,
                }}
              >
                入力内容をご確認ください。
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: 12, padding: '12px 16px', overflowX: 'auto' }}>
{`// success: borderLeft #BE0026 / warning: borderLeft #FAE5EB / radius:4px
<div style={{ borderLeft: '4px solid #BE0026', borderRadius: '4px' }} />`}
            </pre>
          </div>

        </div>
      )}
    </div>
  );
}