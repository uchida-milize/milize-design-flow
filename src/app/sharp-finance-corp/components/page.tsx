'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance-corp';
const primaryColor: string = '#004A99';
const secondaryColor = '#0071BC';
const accentColor = '#F5A623';

// クライアントサイトから実測したデザイントークン
// ※ Difyによるスクレーピング後に実値に置き換えてください
const tokens = {
  inputBg: '#f0f4f8',
  inputRadius: '6px',
  inputHeight: '40px',
  borderColor: '#d1d5db',
  ctaBg: primaryColor,
  ctaColor: '#ffffff',
  ctaRadius: '6px',
  ctaHeight: '52px',
  textColor: '#333333',
  labelSize: '14px',
  bodySize: '14px',
};

const tabs = [
  { key: 'verified', label: '実装確認済み' },
  { key: 'derived', label: '派生デザイン（想定）' },
] as const;

type TabKey = typeof tabs[number]['key'];

const CodeBlock = ({ code }: { code: string }) => (
  <div className="component-code-block">{code}</div>
);

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('verified');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="sharp-finance-corp-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <p className="section-label" style={{ color: primaryColor }}>COMPONENTS</p>
          <h1 className="section-title">コンポーネント</h1>
          <p className="section-desc">
            実装確認済みはサイトから実測したコンポーネントです。派生デザインはそのデザイン言語を元にした想定実装です。
          </p>
        </div>

        <div className="tab-nav">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab-item ${activeTab === tab.key ? 'active' : ''}`}
              style={activeTab === tab.key ? { background: primaryColor } : {}}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== 実装確認済み ===== */}
        {activeTab === 'verified' && (
          <div style={{ display: 'grid', gap: 24 }}>

            <div className="component-card">
              <div className="component-label-row">Form.TextInput</div>
              <div className="component-render-area">
                <div style={{ maxWidth: 420 }}>
                  <label style={{ display: 'block', fontSize: tokens.labelSize, fontWeight: 600, color: tokens.textColor, marginBottom: 6 }}>
                    お名前
                  </label>
                  <input type="text" placeholder="山田 太郎" style={{
                    display: 'block', width: '100%',
                    background: tokens.inputBg,
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    height: tokens.inputHeight,
                    padding: '0 14px', fontSize: tokens.bodySize,
                    color: tokens.textColor, boxSizing: 'border-box', outline: 'none',
                  }} />
                </div>
              </div>
              <CodeBlock code={`<input style={{\n  background: tokens.inputBg,\n  border: '1px solid ' + tokens.borderColor,\n  borderRadius: tokens.inputRadius,\n  height: tokens.inputHeight,\n  padding: '0 14px',\n  fontSize: '14px',\n}} />`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.Textarea</div>
              <div className="component-render-area">
                <div style={{ maxWidth: 520 }}>
                  <label style={{ display: 'block', fontSize: tokens.labelSize, fontWeight: 600, color: tokens.textColor, marginBottom: 6 }}>
                    お問い合わせ内容
                  </label>
                  <textarea placeholder="内容を入力してください" rows={5} style={{
                    display: 'block', width: '100%',
                    background: '#ffffff',
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: tokens.inputRadius,
                    fontSize: tokens.bodySize, padding: '12px 14px',
                    color: tokens.textColor, boxSizing: 'border-box', resize: 'vertical', outline: 'none',
                  }} />
                </div>
              </div>
              <CodeBlock code={`<textarea style={{\n  background: '#fff',\n  border: '1px solid ' + tokens.borderColor,\n  borderRadius: tokens.inputRadius,\n  padding: '12px 14px',\n  fontSize: '14px',\n}} />`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.SearchInput</div>
              <div className="component-render-area">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, maxWidth: 380 }}>
                  <input type="text" placeholder="検索する" style={{
                    flex: 1, background: tokens.inputBg,
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: '20px', height: '36px',
                    padding: '0 16px', fontSize: tokens.bodySize,
                    color: tokens.textColor, outline: 'none',
                  }} />
                  <button style={{
                    flexShrink: 0, background: primaryColor, color: '#ffffff',
                    border: 'none', borderRadius: '50%', width: 36, height: 36,
                    fontSize: 16, cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}>→</button>
                </div>
              </div>
              <CodeBlock code={`<input style={{ background: tokens.inputBg, borderRadius:'20px', height:'36px' }} />\n<button style={{ background: primaryColor, borderRadius:'50%', width:36, height:36 }}>→</button>`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.Dropdown</div>
              <div className="component-render-area">
                <div style={{ position: 'relative', display: 'inline-block', width: 220 }}>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: 220, height: 40, padding: '0 14px',
                    background: '#ffffff',
                    border: `1px solid ${tokens.borderColor}`,
                    borderRadius: parseInt(tokens.inputRadius),
                    fontSize: 14, color: tokens.textColor, cursor: 'pointer',
                  }}>
                    <span>カテゴリを選択</span>
                    <span style={{ fontSize: 10, display: 'inline-block', transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                  </button>
                  {dropdownOpen && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, width: 220, background: '#fff', border: `1px solid ${tokens.borderColor}`, borderTop: 'none', borderRadius: '0 0 6px 6px', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                      {['ローン', '保険', '資産運用'].map((opt) => (
                        <div key={opt} style={{ padding: '10px 14px', fontSize: 14, color: tokens.textColor, cursor: 'pointer' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = tokens.inputBg; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                          onClick={() => setDropdownOpen(false)}
                        >{opt}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <CodeBlock code={`<button style={{ width:220, height:40, background:'#fff', border:'1px solid ' + tokens.borderColor, borderRadius: tokens.inputRadius }}>カテゴリ ▼</button>`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.RadioGroup</div>
              <div className="component-render-area">
                <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                  <legend style={{ fontSize: 14, fontWeight: 600, color: tokens.textColor, marginBottom: 10, float: 'left', width: '100%' }}>お問い合わせ種別</legend>
                  {['新規申し込み', '変更・解約', 'その他'].map((opt) => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 14, color: tokens.textColor, cursor: 'pointer' }}>
                      <input type="radio" name="inquiry-demo" value={opt} style={{ accentColor: primaryColor, width: 16, height: 16 }} />
                      {opt}
                    </label>
                  ))}
                </fieldset>
              </div>
              <CodeBlock code={`<input type="radio" style={{ accentColor: primaryColor, width:16, height:16 }} />`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.Checkbox</div>
              <div className="component-render-area">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['個人情報の取り扱いに同意する', '入力内容を確認しました'].map((lbl) => (
                    <label key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: tokens.textColor, cursor: 'pointer' }}>
                      <input type="checkbox" style={{ accentColor: primaryColor, width: 16, height: 16 }} />
                      {lbl}
                    </label>
                  ))}
                </div>
              </div>
              <CodeBlock code={`<input type="checkbox" style={{ accentColor: primaryColor, width:16, height:16 }} />`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Button.CTA</div>
              <div className="component-render-area">
                <button style={{ background: tokens.ctaBg, color: tokens.ctaColor, border: 'none', borderRadius: tokens.ctaRadius, minWidth: 200, height: tokens.ctaHeight, fontSize: 16, fontWeight: 600, letterSpacing: '0.5px', cursor: 'pointer', padding: '0 32px' }}>
                  入力内容を確認
                </button>
              </div>
              <CodeBlock code={`<button style={{ background: primaryColor, color:'#fff', borderRadius: tokens.ctaRadius, minWidth:200, height: tokens.ctaHeight, fontSize:16, fontWeight:600 }}>入力内容を確認</button>`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Pagination</div>
              <div className="component-render-area">
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {(['‹', 1, 2, 3, '…', 8, 9, 10, '›'] as const).map((p, i) => {
                    const isArrow = p === '‹' || p === '›';
                    const isEllipsis = p === '…';
                    const isActive = p === 1;
                    return (
                      <button key={i} style={{
                        background: isActive ? primaryColor : 'transparent',
                        color: isActive ? '#ffffff' : tokens.textColor,
                        border: isArrow || isEllipsis ? 'none' : `1px solid ${isActive ? primaryColor : tokens.borderColor}`,
                        width: isArrow || isEllipsis ? 28 : 36, height: 36,
                        fontSize: isArrow ? 18 : 13,
                        cursor: isEllipsis ? 'default' : 'pointer',
                        borderRadius: parseInt(tokens.inputRadius),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{p}</button>
                    );
                  })}
                </div>
              </div>
              <CodeBlock code={`<button style={{ background: active ? primaryColor : 'transparent', border:'1px solid ' + tokens.borderColor, borderRadius: tokens.inputRadius, width:36, height:36 }}>{page}</button>`} />
            </div>

          </div>
        )}

        {/* ===== 派生デザイン（想定） ===== */}
        {activeTab === 'derived' && (
          <div>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 24, padding: '10px 14px', background: '#f8f8f8', borderLeft: `3px solid ${primaryColor}` }}>
              以下は実サイトには存在しないコンポーネントですが、このクライアントのデザイン言語を踏襲した想定実装です。
            </p>
            <div style={{ display: 'grid', gap: 24 }}>

              <div className="component-card">
                <div className="component-label-row">Card.Article <span style={{ fontSize: 11, color: '#aaa', marginLeft: 6 }}>想定</span></div>
                <div className="component-render-area">
                  <div style={{ maxWidth: 340, background: '#fff', border: `1px solid ${tokens.borderColor}`, borderRadius: parseInt(tokens.inputRadius) * 2, overflow: 'hidden' }}>
                    <div style={{ background: primaryColor, height: 6 }} />
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: 11, color: '#888', marginBottom: 6, letterSpacing: '0.5px' }}>2024.01.15 — カテゴリ</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#111', lineHeight: 1.5, marginBottom: 10 }}>
                        サービスタイトルがここに入ります
                      </div>
                      <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>
                        サービスの説明テキストがここに入ります。
                      </div>
                      <div style={{ marginTop: 14, fontSize: 13, color: primaryColor, fontWeight: 600, borderTop: `1px solid ${tokens.borderColor}`, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                        <span>詳しく見る</span><span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CodeBlock code={`<div style={{ border:'1px solid ' + tokens.borderColor }}>\n  <div style={{ background: primaryColor, height:6 }} />\n  <div style={{ padding:'16px 20px' }}>...</div>\n</div>`} />
              </div>

              <div className="component-card">
                <div className="component-label-row">Badge.Category <span style={{ fontSize: 11, color: '#aaa', marginLeft: 6 }}>想定</span></div>
                <div className="component-render-area">
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['プライマリ', 'セカンダリ', 'アクセント', 'ニュートラル'].map((tag, i) => {
                      const bgs = [primaryColor, secondaryColor, accentColor, tokens.inputBg];
                      const colors = ['#fff', '#fff', '#fff', tokens.textColor];
                      return (
                        <span key={tag} style={{ display: 'inline-block', background: bgs[i], color: colors[i], fontSize: 12, padding: '4px 12px', borderRadius: 4, letterSpacing: '0.3px' }}>{tag}</span>
                      );
                    })}
                  </div>
                </div>
                <CodeBlock code={`<span style={{ background: primaryColor, color:'#fff', fontSize:12, padding:'4px 12px', borderRadius:4 }}>プライマリ</span>`} />
              </div>

              <div className="component-card">
                <div className="component-label-row">Table.Basic <span style={{ fontSize: 11, color: '#aaa', marginLeft: 6 }}>想定</span></div>
                <div className="component-render-area">
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, color: tokens.textColor }}>
                    <thead>
                      <tr style={{ background: tokens.inputBg }}>
                        {['項目', '詳細', '状態'].map(h => (
                          <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: 13, borderBottom: `2px solid ${primaryColor}` }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[['商品名', 'フリーローン', '申込可'], ['金利', '年3.0〜18.0%', '確定'], ['限度額', '最大500万円', '確定']].map(([a, b, c], i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${tokens.borderColor}`, background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                          <td style={{ padding: '10px 14px' }}>{a}</td>
                          <td style={{ padding: '10px 14px' }}>{b}</td>
                          <td style={{ padding: '10px 14px' }}>
                            <span style={{ fontSize: 11, background: c === '申込可' ? primaryColor : tokens.inputBg, color: c === '申込可' ? '#fff' : tokens.textColor, padding: '2px 8px', borderRadius: 4 }}>{c}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CodeBlock code={`<thead><tr style={{ background: tokens.inputBg, borderBottom:'2px solid ' + primaryColor }}>...</tr></thead>\n<tr style={{ borderBottom:'1px solid ' + tokens.borderColor }}>...</tr>`} />
              </div>

              <div className="component-card">
                <div className="component-label-row">Nav.Tabs <span style={{ fontSize: 11, color: '#aaa', marginLeft: 6 }}>想定</span></div>
                <div className="component-render-area">
                  <div>
                    <div style={{ display: 'flex', borderBottom: `2px solid ${tokens.borderColor}` }}>
                      {['概要', 'サービス一覧', 'よくある質問', 'お問い合わせ'].map((tab, i) => (
                        <button key={tab} style={{
                          padding: '10px 20px', fontSize: 14,
                          color: i === 0 ? primaryColor : '#666',
                          background: 'transparent', border: 'none',
                          borderBottom: i === 0 ? `2px solid ${primaryColor}` : 'none',
                          marginBottom: -2, cursor: 'pointer', fontWeight: i === 0 ? 600 : 400,
                        }}>{tab}</button>
                      ))}
                    </div>
                    <div style={{ padding: '16px 4px', fontSize: 13, color: '#555' }}>タブコンテンツエリア</div>
                  </div>
                </div>
                <CodeBlock code={`<button style={{ borderBottom: active ? '2px solid ' + primaryColor : 'none', color: active ? primaryColor : '#666', marginBottom:-2 }}>{tab}</button>`} />
              </div>

              <div className="component-card">
                <div className="component-label-row">Toast.Notification <span style={{ fontSize: 11, color: '#aaa', marginLeft: 6 }}>想定</span></div>
                <div className="component-render-area">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 380 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#fff', border: `1px solid ${tokens.borderColor}`, borderLeft: `4px solid ${primaryColor}`, borderRadius: parseInt(tokens.inputRadius), fontSize: 14, color: tokens.textColor }}>
                      <span>✓</span><span>申し込みが完了しました。</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#fff', border: `1px solid ${tokens.borderColor}`, borderLeft: `4px solid ${accentColor}`, borderRadius: parseInt(tokens.inputRadius), fontSize: 14, color: '#555' }}>
                      <span>⚠</span><span>必須項目を入力してください。</span>
                    </div>
                  </div>
                </div>
                <CodeBlock code={`<div style={{ border:'1px solid ' + tokens.borderColor, borderLeft:'4px solid ' + primaryColor, borderRadius: tokens.inputRadius, padding:'12px 16px' }}>✓ 完了</div>`} />
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
