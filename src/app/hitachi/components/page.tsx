'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const tokens = {
  inputBg: '#FFFFFF',
  inputRadius: '4px',
  inputHeight: '40px',
  borderColor: '#D9D9D9',
  ctaBg: '#CC0000',
  ctaColor: '#FFFFFF',
  ctaHeight: '44px',
  textColor: '#333333',
  labelSize: '14px',
  bodySize: '14px',
};

export default function ComponentsPage() {
  const clientName: string = '日立製作所';
  const basePath: string = '/hitachi';
  const primaryColor: string = '#CC0000';

  const [activeTab, setActiveTab] = useState<'implemented' | 'derived'>('implemented');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('選択してください');
  const [activePage, setActivePage] = useState(2);

  const tabs = [
    { key: 'implemented', label: '実装確認済み' },
    { key: 'derived', label: '派生デザイン（想定）' },
  ] as const;

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <section style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: primaryColor, marginBottom: '8px' }}>
          COMPONENTS
        </p>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
          コンポーネント
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          日立製作所のUIパーツの実装確認済みコンポーネントと、派生デザイン（想定）を掲載しています。
        </p>
      </section>

      <p
        style={{
          borderLeft: `3px solid ${primaryColor}`,
          background: '#f8f8f8',
          padding: '10px 14px',
          fontSize: '13px',
          color: '#888',
          marginBottom: '24px',
        }}
      >
        以下は実サイトには存在しないコンポーネントですが、このクライアントのデザイン言語を踏襲した想定実装です。
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={{
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 500,
              border: 'none',
              background: activeTab === t.key ? primaryColor : '#f3f4f6',
              color: activeTab === t.key ? '#ffffff' : '#6b7280',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'implemented' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* TextInput */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>Form.TextInput</p>
            </div>
            <div style={{ padding: '24px' }}>
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
                  color: tokens.textColor,
                }}
              />
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// border:1px solid #d9d9d9 / radius:4px / font:Noto Sans JP 14px
<input style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }} />`}
            </pre>
          </div>

          {/* Textarea */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>Form.Textarea</p>
            </div>
            <div style={{ padding: '24px' }}>
              <textarea
                placeholder="お問い合わせ内容を入力してください"
                rows={4}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  padding: '12px',
                  fontSize: tokens.bodySize,
                  color: tokens.textColor,
                  resize: 'vertical',
                }}
              />
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// border:1px solid #d9d9d9 / radius:4px / resize:vertical
<textarea style={{ border: '1px solid #d9d9d9', borderRadius: '4px', resize: 'vertical' }} />`}
            </pre>
          </div>

          {/* SearchInput */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>Form.SearchInput</p>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', maxWidth: '320px' }}>
                <input
                  type="text"
                  placeholder="サイト内検索"
                  style={{
                    flex: 1,
                    height: '40px',
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: '20px 0 0 20px',
                    padding: '0 16px',
                    fontSize: tokens.bodySize,
                    color: tokens.textColor,
                    borderRight: 'none',
                  }}
                />
                <button
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '0 20px 20px 0',
                    background: primaryColor,
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '14px',
                  }}
                >
                  検索
                </button>
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// 丸型input + 円形ボタン(primaryColor:#CC0000) / height:40px
<div style={{ borderRadius: '20px', background: '#CC0000' }} />`}
            </pre>
          </div>

          {/* Dropdown */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>Form.Dropdown</p>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ position: 'relative', maxWidth: '240px' }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    width: '100%',
                    height: tokens.inputHeight,
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    background: '#ffffff',
                    padding: '0 12px',
                    fontSize: tokens.bodySize,
                    color: tokens.textColor,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{dropdownValue}</span>
                  <span style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    ▼
                  </span>
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
                    }}
                  >
                    {['東京都', '大阪府', '愛知県'].map((v) => (
                      <div
                        key={v}
                        onClick={() => {
                          setDropdownValue(v);
                          setDropdownOpen(false);
                        }}
                        style={{ padding: '10px 12px', fontSize: '14px', cursor: 'pointer' }}
                      >
                        {v}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// height:40px / border:1px solid #d9d9d9 / radius:4px / useState開閉制御
const [dropdownOpen, setDropdownOpen] = useState(false);`}
            </pre>
          </div>

          {/* RadioGroup */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>Form.RadioGroup</p>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                <input type="radio" name="gender" style={{ accentColor: primaryColor }} defaultChecked />
                男性
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                <input type="radio" name="gender" style={{ accentColor: primaryColor }} />
                女性
              </label>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// accentColor: #CC0000 / 円形・選択時ドット表示
<input type="radio" style={{ accentColor: '#CC0000' }} />`}
            </pre>
          </div>

          {/* Checkbox */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>Form.Checkbox</p>
            </div>
            <div style={{ padding: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="checkbox" style={{ accentColor: primaryColor, borderRadius: '2px' }} defaultChecked />
                利用規約に同意する
              </label>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// accentColor: #CC0000 / radius:2px
<input type="checkbox" style={{ accentColor: '#CC0000' }} />`}
            </pre>
          </div>

          {/* Button.CTA */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>Button.CTA</p>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '16px' }}>
              <button
                style={{
                  background: tokens.ctaBg,
                  color: tokens.ctaColor,
                  height: tokens.ctaHeight,
                  borderRadius: '4px',
                  border: 'none',
                  padding: '0 24px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                お問い合わせ
              </button>
              <button
                style={{
                  background: '#ffffff',
                  color: '#0C0C0C',
                  height: tokens.ctaHeight,
                  borderRadius: '4px',
                  border: '1px solid #0C0C0C',
                  padding: '0 24px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                詳しく見る
              </button>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// bg:#CC0000 / color:#FFFFFF / radius:4px / padding:12px 24px
<button style={{ background: '#CC0000', color: '#FFFFFF', borderRadius: '4px' }} />`}
            </pre>
          </div>

          {/* Pagination */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>Pagination</p>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePage(p)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    border: activePage === p ? 'none' : `1px solid ${tokens.borderColor}`,
                    background: activePage === p ? primaryColor : '#ffffff',
                    color: activePage === p ? '#ffffff' : tokens.textColor,
                    fontSize: '14px',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// active: bg #CC0000 color #FFFFFF / inactive: border 1px solid #d9d9d9
<button style={{ background: active ? '#CC0000' : '#ffffff' }} />`}
            </pre>
          </div>
        </div>
      )}

      {activeTab === 'derived' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Card.Article */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                Card.Article <span style={{ fontSize: '10px', color: '#9ca3af', border: '1px solid #d1d5db', borderRadius: '4px', padding: '1px 6px', marginLeft: '6px' }}>想定</span>
              </p>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ border: `1px solid ${tokens.borderColor}`, borderRadius: '8px', overflow: 'hidden', maxWidth: '320px' }}>
                <div style={{ height: '6px', background: primaryColor }} />
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>記事タイトルサンプル</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>記事の要約テキストがここに入ります。</p>
                </div>
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// border:1px solid #d9d9d9 / accent bar height:6px bg:#CC0000
<div style={{ height: '6px', background: '#CC0000' }} />`}
            </pre>
          </div>

          {/* Badge.Category */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                Badge.Category <span style={{ fontSize: '10px', color: '#9ca3af', border: '1px solid #d1d5db', borderRadius: '4px', padding: '1px 6px', marginLeft: '6px' }}>想定</span>
              </p>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '12px' }}>
              <span style={{ background: primaryColor, color: '#ffffff', borderRadius: '4px', padding: '4px 12px', fontSize: '12px' }}>
                New
              </span>
              <span style={{ background: 'transparent', border: `1px solid ${tokens.borderColor}`, color: tokens.textColor, borderRadius: '4px', padding: '4px 12px', fontSize: '12px' }}>
                Topics
              </span>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// filled: bg #CC0000 color #fff / outline: border 1px solid #d9d9d9
<span style={{ background: '#CC0000', color: '#fff', borderRadius: '4px' }} />`}
            </pre>
          </div>

          {/* Table.Basic */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                Table.Basic <span style={{ fontSize: '10px', color: '#9ca3af', border: '1px solid #d1d5db', borderRadius: '4px', padding: '1px 6px', marginLeft: '6px' }}>想定</span>
              </p>
            </div>
            <div style={{ padding: '24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                    <th style={{ textAlign: 'left', padding: '8px' }}>項目</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: '8px' }}>会社名</td>
                    <td style={{ padding: '8px' }}>株式会社日立製作所</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: '8px' }}>設立</td>
                    <td style={{ padding: '8px' }}>1920年</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// thead bg:#FFFFFF / borderBottom:2px solid #CC0000 / 行区切り:1px solid #d9d9d9
<thead style={{ borderBottom: '2px solid #CC0000' }} />`}
            </pre>
          </div>

          {/* Nav.Tabs */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                Nav.Tabs <span style={{ fontSize: '10px', color: '#9ca3af', border: '1px solid #d1d5db', borderRadius: '4px', padding: '1px 6px', marginLeft: '6px' }}>想定</span>
              </p>
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '24px', borderBottom: `1px solid ${tokens.borderColor}` }}>
              <span style={{ paddingBottom: '8px', borderBottom: `2px solid ${primaryColor}`, color: primaryColor, fontSize: '14px', fontWeight: 700 }}>
                概要
              </span>
              <span style={{ paddingBottom: '8px', color: '#6b7280', fontSize: '14px' }}>
                製品情報
              </span>
              <span style={{ paddingBottom: '8px', color: '#6b7280', fontSize: '14px' }}>
                お知らせ
              </span>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// active: borderBottom:2px solid #CC0000 / color:#CC0000
<span style={{ borderBottom: '2px solid #CC0000', color: '#CC0000' }} />`}
            </pre>
          </div>

          {/* Toast.Notification */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                Toast.Notification <span style={{ fontSize: '10px', color: '#9ca3af', border: '1px solid #d1d5db', borderRadius: '4px', padding: '1px 6px', marginLeft: '6px' }}>想定</span>
              </p>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ borderLeft: `4px solid ${primaryColor}`, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', borderRadius: '4px', padding: '12px 16px', fontSize: '14px' }}>
                送信が完了しました
              </div>
              <div style={{ borderLeft: `4px solid #FA000F`, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', borderRadius: '4px', padding: '12px 16px', fontSize: '14px' }}>
                入力内容をご確認ください
              </div>
            </div>
            <pre style={{ background: '#efefef', color: '#333333', fontFamily: 'monospace', fontSize: '12px', padding: '12px 16px', margin: 0, whiteSpace: 'pre-wrap' }}>
{`// success: borderLeft:4px solid #CC0000 / warning: borderLeft:4px solid #FA000F
<div style={{ borderLeft: '4px solid #CC0000', borderRadius: '4px' }} />`}
            </pre>
          </div>
        </div>
      )}
    </main>
  );
}