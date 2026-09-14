'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName: string = 'みらいバンク';
const basePath: string = '/milibank';
const primaryColor: string = '#2a5ca8';

const tokens = {
  inputBg: '#ffffff',
  inputRadius: '4px',
  inputHeight: '40px',
  borderColor: '#cccccc',
  ctaBg: '#2a5ca8',
  ctaColor: '#ffffff',
  ctaHeight: '48px',
  textColor: '#333333',
  labelSize: '14px',
  bodySize: '14px',
};

const tabs = [
  { key: 'implemented', label: '実装確認済み' },
  { key: 'derived', label: '派生デザイン（想定）' },
];

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState<'implemented' | 'derived'>('implemented');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState('弊社についてお問合せ');
  const [agree, setAgree] = useState(false);
  const [radio, setRadio] = useState('a');
  const [page, setPage] = useState(2);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <section style={{ marginTop: '40px', marginBottom: '32px' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: primaryColor,
            letterSpacing: '0.05em',
            marginBottom: '8px',
          }}
        >
          COMPONENTS
        </p>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
          コンポーネント
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          お問い合わせページ・ニュースリリースページ・ヘッダ検索窓等から確認できたコンポーネントと、
          同じデザイン言語を踏襲した派生デザイン（想定）を掲載しています。
        </p>
      </section>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as 'implemented' | 'derived')}
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

      {activeTab === 'derived' && (
        <p
          style={{
            borderLeft: `3px solid ${primaryColor}`,
            background: '#f8f8f8',
            padding: '10px 14px',
            fontSize: '13px',
            color: '#888888',
            marginBottom: '24px',
          }}
        >
          以下は実サイトには存在しないコンポーネントですが、このクライアントのデザイン言語を踏襲した想定実装です。
        </p>
      )}

      {activeTab === 'implemented' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* TextInput */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Form.TextInput</span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff' }}>
              <label style={{ fontSize: tokens.labelSize, color: tokens.textColor, display: 'block', marginBottom: '6px' }}>
                氏名
              </label>
              <input
                type="text"
                placeholder="山田 太郎"
                style={{
                  width: '100%',
                  maxWidth: '320px',
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
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// お問い合わせページ 氏名・会社名・メール・電話番号 入力欄
// bg:#ffffff / radius:4px(推定) / height:40px(推定) / border:#cccccc(推定)
<input type="text" style={{ height: '40px', borderRadius: '4px' }} />`}
            </pre>
          </div>

          {/* Textarea */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Form.Textarea</span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff' }}>
              <label style={{ fontSize: tokens.labelSize, color: tokens.textColor, display: 'block', marginBottom: '6px' }}>
                お問い合わせ内容
              </label>
              <textarea
                placeholder="お問い合わせ内容をご記入ください"
                rows={4}
                style={{
                  width: '100%',
                  maxWidth: '480px',
                  background: '#ffffff',
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: tokens.inputRadius,
                  padding: '10px 12px',
                  fontSize: tokens.bodySize,
                  color: tokens.textColor,
                  resize: 'vertical',
                }}
              />
            </div>
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// お問い合わせ内容欄
// bg:#ffffff / border:#cccccc(推定) / resize:vertical`}
            </pre>
          </div>

          {/* SearchInput */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Form.SearchInput</span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', maxWidth: '320px' }}>
                <input
                  type="text"
                  placeholder="検索する"
                  style={{
                    flex: 1,
                    height: '40px',
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
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: primaryColor,
                    color: '#ffffff',
                    border: 'none',
                    marginLeft: '-1px',
                    flexShrink: 0,
                  }}
                >
                  検索
                </button>
              </div>
            </div>
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// ヘッダ検索窓（丸型input + 円形ボタン）
// input radius:999px / button:円形・primaryColor背景`}
            </pre>
          </div>

          {/* Dropdown */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Form.Dropdown</span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff' }}>
              <label style={{ fontSize: tokens.labelSize, color: tokens.textColor, display: 'block', marginBottom: '6px' }}>
                お問い合わせ種別
              </label>
              <div style={{ position: 'relative', maxWidth: '320px' }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    width: '100%',
                    height: '40px',
                    background: tokens.inputBg,
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    padding: '0 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: tokens.bodySize,
                    color: tokens.textColor,
                  }}
                >
                  <span>{inquiryType}</span>
                  <span
                    style={{
                      transition: 'transform 0.2s',
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
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
                      overflow: 'hidden',
                      zIndex: 10,
                    }}
                  >
                    {['弊社についてお問合せ', '資料請求', 'お打ち合わせ希望', '概算お見積希望'].map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setInquiryType(opt);
                          setDropdownOpen(false);
                        }}
                        style={{
                          padding: '10px 12px',
                          fontSize: tokens.bodySize,
                          color: tokens.textColor,
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
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// お問い合わせ種別ドロップダウン
// height:40px / border:#cccccc(推定) / radius:4px(推定)
// useState による開閉アニメーション`}
            </pre>
          </div>

          {/* RadioGroup */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Form.RadioGroup</span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                {[
                  { key: 'a', label: '法人のお客様' },
                  { key: 'b', label: '個人のお客様' },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: tokens.bodySize, color: tokens.textColor }}
                  >
                    <input
                      type="radio"
                      name="radio-group"
                      checked={radio === opt.key}
                      onChange={() => setRadio(opt.key)}
                      style={{ accentColor: primaryColor, width: '16px', height: '16px' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// ラジオボタン想定実装（口座開設フォーム系）
// accentColor: primaryColor(#2a5ca8)`}
            </pre>
          </div>

          {/* Checkbox */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Form.Checkbox</span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: tokens.bodySize, color: tokens.textColor }}>
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  style={{ accentColor: primaryColor, width: '16px', height: '16px' }}
                />
                個人情報の取り扱いに関する同意事項に同意する
              </label>
            </div>
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// お問い合わせフォーム 個人情報同意チェックボックス
// accentColor: primaryColor(#2a5ca8)`}
            </pre>
          </div>

          {/* CTA Button */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Button.CTA</span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff' }}>
              <button
                style={{
                  height: tokens.ctaHeight,
                  padding: '0 32px',
                  background: tokens.ctaBg,
                  color: tokens.ctaColor,
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '15px',
                  fontWeight: 700,
                }}
              >
                送信する
              </button>
            </div>
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// お問い合わせフォーム 送信ボタン
// bg:primaryColor(#2a5ca8) / color:#ffffff / height:48px(推定) / radius:4px(推定)`}
            </pre>
          </div>

          {/* Pagination */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Pagination</span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      border: page === n ? 'none' : `1px solid ${tokens.borderColor}`,
                      background: page === n ? primaryColor : '#ffffff',
                      color: page === n ? '#ffffff' : tokens.textColor,
                      fontSize: '13px',
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// ニュースリリース一覧 ページネーション想定
// active: primaryColor bg / inactive: border #cccccc(推定)`}
            </pre>
          </div>
        </div>
      )}

      {activeTab === 'derived' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Card.Article */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Card.Article</span>
              <span
                style={{
                  fontSize: '10px',
                  color: '#ffffff',
                  background: '#9ca3af',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginLeft: '6px',
                }}
              >
                想定
              </span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff' }}>
              <div
                style={{
                  border: `1px solid ${tokens.borderColor}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  maxWidth: '320px',
                }}
              >
                <div style={{ height: '6px', background: primaryColor }} />
                <div style={{ padding: '16px' }}>
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>2024.06.01</p>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: tokens.textColor, marginBottom: '8px' }}>
                    ミライの豊かさを、つよく
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>
                    ネオバンクとしての取り組みに関するお知らせ記事のカード表示イメージです。
                  </p>
                </div>
              </div>
            </div>
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// 想定コンポーネント：NEWS記事カード
// border:#cccccc(推定) / accentBar:primaryColor height:6px`}
            </pre>
          </div>

          {/* Badge.Category */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Badge.Category</span>
              <span
                style={{
                  fontSize: '10px',
                  color: '#ffffff',
                  background: '#9ca3af',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginLeft: '6px',
                }}
              >
                想定
              </span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff', display: 'flex', gap: '12px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#ffffff',
                  background: primaryColor,
                  padding: '4px 12px',
                  borderRadius: '999px',
                }}
              >
                お知らせ
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: primaryColor,
                  background: 'transparent',
                  border: `1px solid ${tokens.borderColor}`,
                  padding: '4px 12px',
                  borderRadius: '999px',
                }}
              >
                キャンペーン
              </span>
            </div>
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// 想定コンポーネント：カテゴリバッジ（filled / outline）
// filled: primaryColor bg / outline: border #cccccc(推定)`}
            </pre>
          </div>

          {/* Table.Basic */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Table.Basic</span>
              <span
                style={{
                  fontSize: '10px',
                  color: '#ffffff',
                  background: '#9ca3af',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginLeft: '6px',
                }}
              >
                想定
              </span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: tokens.inputBg, borderBottom: `2px solid ${primaryColor}` }}>
                    <th style={{ textAlign: 'left', padding: '8px 12px', color: tokens.textColor }}>項目</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', color: tokens.textColor }}>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: '8px 12px', color: tokens.textColor }}>金利</td>
                    <td style={{ padding: '8px 12px', color: tokens.textColor }}>年0.02%</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${tokens.borderColor}` }}>
                    <td style={{ padding: '8px 12px', color: tokens.textColor }}>手数料</td>
                    <td style={{ padding: '8px 12px', color: tokens.textColor }}>無料</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// 想定コンポーネント：基本テーブル
// thead bg:inputBg(#ffffff) / borderBottom:primaryColor 2px / 行区切り:#cccccc(推定)`}
            </pre>
          </div>

          {/* Nav.Tabs */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Nav.Tabs</span>
              <span
                style={{
                  fontSize: '10px',
                  color: '#ffffff',
                  background: '#9ca3af',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginLeft: '6px',
                }}
              >
                想定
              </span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff' }}>
              <div style={{ display: 'flex', gap: '24px', borderBottom: `1px solid ${tokens.borderColor}` }}>
                <span
                  style={{
                    paddingBottom: '10px',
                    borderBottom: `2px solid ${primaryColor}`,
                    color: primaryColor,
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  サービス
                </span>
                <span style={{ paddingBottom: '10px', color: '#6b7280', fontSize: '14px' }}>
                  ニュース
                </span>
                <span style={{ paddingBottom: '10px', color: '#6b7280', fontSize: '14px' }}>
                  よくある質問
                </span>
              </div>
            </div>
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// 想定コンポーネント：ページ内タブナビゲーション
// active: borderBottom primaryColor / color:primaryColor`}
            </pre>
          </div>

          {/* Toast.Notification */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Toast.Notification</span>
              <span
                style={{
                  fontSize: '10px',
                  color: '#ffffff',
                  background: '#9ca3af',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginLeft: '6px',
                }}
              >
                想定
              </span>
            </div>
            <div style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  borderLeft: `4px solid ${primaryColor}`,
                  background: '#f8f8f8',
                  borderRadius: tokens.inputRadius,
                  padding: '12px 16px',
                  fontSize: '13px',
                  color: tokens.textColor,
                  maxWidth: '360px',
                }}
              >
                お問い合わせを受け付けました。
              </div>
              <div
                style={{
                  borderLeft: '4px solid #cccccc',
                  background: '#f8f8f8',
                  borderRadius: tokens.inputRadius,
                  padding: '12px 16px',
                  fontSize: '13px',
                  color: tokens.textColor,
                  maxWidth: '360px',
                }}
              >
                入力内容をご確認ください。
              </div>
            </div>
            <pre
              style={{
                background: '#efefef',
                color: '#333333',
                fontFamily: 'monospace',
                fontSize: '12px',
                padding: '12px 16px',
                margin: 0,
                overflowX: 'auto',
              }}
            >
{`// 想定コンポーネント：トースト通知
// success: borderLeft primaryColor / warning: borderLeft #cccccc(推定) / radius:4px(推定)`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}