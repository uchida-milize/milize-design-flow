'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const tokens = {
  inputBg: '#FFFFFF', // 実測値なし、一般的な白背景を想定
  inputRadius: '6px', // 実測 border_radii 取得不可のため推定値
  inputHeight: '40px', // 実測値なし、一般的な金融サイト基準を想定
  borderColor: '#D1D5DB', // 実測値なし、一般的なグレーボーダーを想定
  ctaBg: '#C8102E', // MUFGレッド参考値（実測HEX不可）
  ctaColor: '#FFFFFF',
  ctaHeight: '48px', // 実測値なし、推定
  textColor: '#333333',
  labelSize: '12px',
  bodySize: '14px',
};

export default function ComponentsPage() {
  const clientName: string = '三菱UFJフィナンシャル・グループ';
  const basePath: string = '/mufg';
  const primaryColor: string = '#C8102E';

  const [activeTab, setActiveTab] = useState<'implemented' | 'derived'>('implemented');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <section style={{ marginTop: '48px' }}>
        <div className="section-label" style={{ color: primaryColor }}>
          COMPONENTS
        </div>
        <h1 className="section-title" style={{ fontSize: '32px' }}>
          コンポーネント
        </h1>
        <p className="section-desc">
          スクレイピングデータから確認できた実装済みコンポーネントと、デザイントークンを踏襲した想定コンポーネントの一覧です。
        </p>
      </section>

      <div className="tabs" style={{ marginTop: '32px' }}>
        <button
          className="tab"
          style={{
            background: activeTab === 'implemented' ? primaryColor : '#f3f4f6',
            color: activeTab === 'implemented' ? '#ffffff' : '#6b7280',
          }}
          onClick={() => setActiveTab('implemented')}
        >
          実装確認済み
        </button>
        <button
          className="tab"
          style={{
            background: activeTab === 'derived' ? primaryColor : '#f3f4f6',
            color: activeTab === 'derived' ? '#ffffff' : '#6b7280',
          }}
          onClick={() => setActiveTab('derived')}
        >
          派生デザイン（想定）
        </button>
      </div>

      {activeTab === 'implemented' && (
        <section>
          {/* 1. TextInput */}
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
                  maxWidth: '320px',
                  color: tokens.textColor,
                }}
              />
            </div>
            <div className="component-code">
{`// bg:${tokens.inputBg} / radius:${tokens.inputRadius} / height:${tokens.inputHeight}
// border:1px solid ${tokens.borderColor} (実測値なし、推定)
<input type="text" style={{
  background: '${tokens.inputBg}',
  borderRadius: '${tokens.inputRadius}',
  height: '${tokens.inputHeight}',
  border: '1px solid ${tokens.borderColor}',
  padding: '0 12px'
}} />`}
            </div>
          </div>

          {/* 2. Textarea */}
          <div className="component-card">
            <div className="component-label">Form.Textarea</div>
            <div className="component-render">
              <textarea
                placeholder="お問い合わせ内容をご記入ください"
                style={{
                  background: '#FFFFFF',
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  padding: '12px',
                  fontSize: tokens.bodySize,
                  width: '100%',
                  maxWidth: '400px',
                  minHeight: '100px',
                  resize: 'vertical',
                  color: tokens.textColor,
                }}
              />
            </div>
            <div className="component-code">
{`// bg:#FFFFFF / border:1px solid ${tokens.borderColor} / radius:${tokens.inputRadius}
// resize: vertical（実測値なし、一般的な問い合わせフォーム仕様を想定）
<textarea style={{
  background: '#FFFFFF',
  border: '1px solid ${tokens.borderColor}',
  borderRadius: '${tokens.inputRadius}',
  resize: 'vertical'
}} />`}
            </div>
          </div>

          {/* 3. SearchInput */}
          <div className="component-card">
            <div className="component-label">Form.SearchInput</div>
            <div className="component-render">
              <div style={{ display: 'flex', alignItems: 'center', maxWidth: '320px' }}>
                <input
                  type="text"
                  placeholder="検索キーワード"
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
                    width: '40px',
                    height: '40px',
                    borderRadius: '0 999px 999px 0',
                    background: primaryColor,
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                  aria-label="検索"
                >
                  🔍
                </button>
              </div>
            </div>
            <div className="component-code">
{`// icon: icon-header-search-close.svg（am.mufg.jpヘッダー検索アイコン確認済み）
// サイズ・角丸のCSS実測値は未取得のため丸型形状を推定で実装
<div style={{ display: 'flex' }}>
  <input style={{ borderRadius: '999px 0 0 999px' }} />
  <button style={{ background: '${primaryColor}', borderRadius: '0 999px 999px 0' }} />
</div>`}
            </div>
          </div>

          {/* 4. Dropdown */}
          <div className="component-card">
            <div className="component-label">Form.Dropdown</div>
            <div className="component-render">
              <div style={{ position: 'relative', maxWidth: '240px' }}>
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
                    cursor: 'pointer',
                    color: tokens.textColor,
                  }}
                >
                  都道府県を選択 {dropdownOpen ? '▲' : '▼'}
                </button>
                {dropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '44px',
                      left: 0,
                      right: 0,
                      background: '#fff',
                      border: `1px solid ${tokens.borderColor}`,
                      borderRadius: tokens.inputRadius,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      zIndex: 10,
                    }}
                  >
                    {['東京都', '大阪府', '愛知県'].map((pref) => (
                      <div key={pref} style={{ padding: '8px 12px', fontSize: tokens.bodySize }}>
                        {pref}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="component-code">
{`// height:${tokens.inputHeight} / border:${tokens.borderColor}（実測値なし、推定）
// useState による開閉アニメーション制御
const [dropdownOpen, setDropdownOpen] = useState(false);
<button onClick={() => setDropdownOpen(!dropdownOpen)} style={{
  height: '${tokens.inputHeight}',
  border: '1px solid ${tokens.borderColor}',
  borderRadius: '${tokens.inputRadius}'
}} />`}
            </div>
          </div>

          {/* 5. RadioGroup */}
          <div className="component-card">
            <div className="component-label">Form.RadioGroup</div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: tokens.bodySize }}>
                  <input type="radio" name="gender" style={{ accentColor: primaryColor }} /> 男性
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: tokens.bodySize }}>
                  <input type="radio" name="gender" style={{ accentColor: primaryColor }} /> 女性
                </label>
              </div>
            </div>
            <div className="component-code">
{`// accentColor: ${primaryColor}（MUFGレッド参考値、実測不可）
<input type="radio" style={{ accentColor: '${primaryColor}' }} />`}
            </div>
          </div>

          {/* 6. Checkbox */}
          <div className="component-card">
            <div className="component-label">Form.Checkbox</div>
            <div className="component-render">
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: tokens.bodySize }}>
                <input type="checkbox" style={{ accentColor: primaryColor }} /> 利用規約に同意する
              </label>
            </div>
            <div className="component-code">
{`// accentColor: ${primaryColor}（実測値なし、参考値）
<input type="checkbox" style={{ accentColor: '${primaryColor}' }} />`}
            </div>
          </div>

          {/* 7. CTA Button */}
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
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                お問い合わせはこちら
              </button>
            </div>
            <div className="component-code">
{`// bg:${tokens.ctaBg} / color:${tokens.ctaColor} / height:${tokens.ctaHeight}
// button_css は実測値未取得のためMUFGレッド参考値で実装
<button style={{
  background: '${tokens.ctaBg}',
  color: '${tokens.ctaColor}',
  height: '${tokens.ctaHeight}',
  borderRadius: '${tokens.inputRadius}'
}}>お問い合わせはこちら</button>`}
            </div>
          </div>

          {/* 8. Pagination */}
          <div className="component-card">
            <div className="component-label">Pagination</div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: tokens.inputRadius,
                      background: n === 1 ? primaryColor : 'transparent',
                      color: n === 1 ? '#fff' : tokens.textColor,
                      border: n === 1 ? 'none' : `1px solid ${tokens.borderColor}`,
                      fontSize: tokens.bodySize,
                    }}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
            <div className="component-code">
{`// active: bg ${primaryColor} / inactive: border ${tokens.borderColor}
// 実測ページネーションデータなし、一般的な実装を想定
<div style={{ background: '${primaryColor}', color: '#fff' }}>1</div>
<div style={{ border: '1px solid ${tokens.borderColor}' }}>2</div>`}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'derived' && (
        <section>
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

          {/* 1. Card.Article */}
          <div className="component-card">
            <div className="component-label">
              Card.Article <span style={{ color: primaryColor, fontSize: '11px', marginLeft: '8px' }}>想定</span>
            </div>
            <div className="component-render">
              <div
                style={{
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  overflow: 'hidden',
                  maxWidth: '320px',
                }}
              >
                <div style={{ height: '6px', background: primaryColor }} />
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: tokens.textColor }}>
                    ブランドストーリー記事タイトル
                  </h3>
                  <p style={{ fontSize: tokens.bodySize, color: '#6b7280', marginTop: '8px' }}>
                    未来を捉え挑戦し続ける情熱について紹介する記事の抜粋テキストです。
                  </p>
                </div>
              </div>
            </div>
            <div className="component-code">
{`// アクセントバー height:6px, 色:${primaryColor}
// border:${tokens.borderColor} / radius:${tokens.inputRadius}
<div style={{ borderTop: '6px solid ${primaryColor}' }}>
  <h3>記事タイトル</h3>
</div>`}
            </div>
          </div>

          {/* 2. Badge.Category */}
          <div className="component-card">
            <div className="component-label">
              Badge.Category <span style={{ color: primaryColor, fontSize: '11px', marginLeft: '8px' }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: '8px' }}>
                <span
                  style={{
                    background: primaryColor,
                    color: '#fff',
                    fontSize: '12px',
                    padding: '4px 12px',
                    borderRadius: '999px',
                  }}
                >
                  総合金融
                </span>
                <span
                  style={{
                    border: `1px solid ${tokens.borderColor}`,
                    color: tokens.textColor,
                    fontSize: '12px',
                    padding: '4px 12px',
                    borderRadius: '999px',
                  }}
                >
                  グローバル
                </span>
              </div>
            </div>
            <div className="component-code">
{`// filled: bg ${primaryColor} / outline: border ${tokens.borderColor}
<span style={{ background: '${primaryColor}', color: '#fff' }}>総合金融</span>
<span style={{ border: '1px solid ${tokens.borderColor}' }}>グローバル</span>`}
            </div>
          </div>

          {/* 3. Table.Basic */}
          <div className="component-card">
            <div className="component-label">
              Table.Basic <span style={{ color: primaryColor, fontSize: '11px', marginLeft: '8px' }}>想定</span>
            </div>
            <div className="component-render">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: tokens.bodySize }}>
                <thead>
                  <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                    <th style={{ textAlign: 'left', padding: '8px' }}>項目</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: '8px' }}>設立</td>
                    <td style={{ padding: '8px' }}>2005年</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}>本社</td>
                    <td style={{ padding: '8px' }}>東京都千代田区</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="component-code">
{`// thead bg:${tokens.inputBg} / borderBottom:2px solid ${primaryColor}
// 行区切り: 1px solid ${tokens.borderColor}
<thead style={{ background: '${tokens.inputBg}', borderBottom: '2px solid ${primaryColor}' }} />`}
            </div>
          </div>

          {/* 4. Nav.Tabs */}
          <div className="component-card">
            <div className="component-label">
              Nav.Tabs <span style={{ color: primaryColor, fontSize: '11px', marginLeft: '8px' }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ display: 'flex', gap: '24px', borderBottom: `1px solid ${tokens.borderColor}` }}>
                <div
                  style={{
                    paddingBottom: '8px',
                    borderBottom: `2px solid ${primaryColor}`,
                    color: primaryColor,
                    fontWeight: 700,
                    fontSize: tokens.bodySize,
                  }}
                >
                  会社情報
                </div>
                <div style={{ paddingBottom: '8px', color: '#6b7280', fontSize: tokens.bodySize }}>
                  ニュースリリース
                </div>
                <div style={{ paddingBottom: '8px', color: '#6b7280', fontSize: tokens.bodySize }}>
                  お問い合わせ
                </div>
              </div>
            </div>
            <div className="component-code">
{`// active: borderBottom 2px solid ${primaryColor}, color:${primaryColor}
<div style={{ borderBottom: '2px solid ${primaryColor}', color: '${primaryColor}' }}>会社情報</div>`}
            </div>
          </div>

          {/* 5. Toast.Notification */}
          <div className="component-card">
            <div className="component-label">
              Toast.Notification <span style={{ color: primaryColor, fontSize: '11px', marginLeft: '8px' }}>想定</span>
            </div>
            <div className="component-render">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div
                  style={{
                    borderLeft: `4px solid ${primaryColor}`,
                    background: '#fff',
                    borderRadius: tokens.inputRadius,
                    padding: '12px 16px',
                    fontSize: tokens.bodySize,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                >
                  お問い合わせを受け付けました。
                </div>
                <div
                  style={{
                    borderLeft: '4px solid #9CA3AF',
                    background: '#fff',
                    borderRadius: tokens.inputRadius,
                    padding: '12px 16px',
                    fontSize: tokens.bodySize,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                >
                  入力内容をご確認ください。
                </div>
              </div>
            </div>
            <div className="component-code">
{`// success: borderLeft 4px solid ${primaryColor}
// warning: borderLeft 4px solid #9CA3AF（アクセントカラー実測値なしのため代用）
// radius: ${tokens.inputRadius}
<div style={{ borderLeft: '4px solid ${primaryColor}', borderRadius: '${tokens.inputRadius}' }} />`}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}