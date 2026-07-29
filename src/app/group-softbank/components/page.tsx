'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ソフトバンクグループ株式会社';
const basePath = '/group-softbank';
const primaryColor = '#000000';

// SoftBankサイトから実測したデザイントークン
const tokens = {
  inputBg: '#DEE2E5',
  inputRadius: '15px',
  inputHeight: '30px',
  borderColor: '#DEE2E5',
  ctaBg: '#DEE2E5',
  ctaColor: '#333333',
  ctaHeight: '58px',
  ctaWidth: '250px',
  textColor: '#333333',
  labelSize: '20px',
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
  const [derivedDropOpen, setDerivedDropOpen] = useState(false);

  return (
    <div className="group-softbank-portal">
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
                  <label style={{ display: 'block', fontSize: tokens.labelSize, color: tokens.textColor, letterSpacing: '0.5px', marginBottom: 8 }}>
                    お名前
                  </label>
                  <input type="text" placeholder="山田 太郎" style={{
                    display: 'block', width: '100%',
                    background: tokens.inputBg, border: 'none',
                    borderRadius: tokens.inputRadius, height: tokens.inputHeight,
                    padding: '0 20px 0 19px', fontSize: tokens.bodySize,
                    color: tokens.textColor, boxSizing: 'border-box', outline: 'none',
                  }} />
                </div>
              </div>
              <CodeBlock code={`// bg:#DEE2E5 / radius:15px / height:30px / padding:0 20px 0 19px\n<input style={{ background:'#DEE2E5', border:'none', borderRadius:'15px', height:'30px', padding:'0 20px 0 19px', fontSize:'14px' }} />`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.Textarea</div>
              <div className="component-render-area">
                <div style={{ maxWidth: 520 }}>
                  <label style={{ display: 'block', fontSize: tokens.labelSize, color: tokens.textColor, letterSpacing: '0.5px', marginBottom: 8 }}>
                    お問い合わせ内容
                  </label>
                  <textarea placeholder="内容を入力してください" rows={5} style={{
                    display: 'block', width: '100%',
                    background: '#FFFFFF', border: '1px solid #DEE2E5', borderRadius: '0',
                    fontSize: tokens.bodySize, padding: '20px',
                    color: tokens.textColor, boxSizing: 'border-box', resize: 'vertical', outline: 'none',
                  }} />
                </div>
              </div>
              <CodeBlock code={`// bg:#fff / border:1px solid #DEE2E5 / radius:0 / padding:20px\n<textarea style={{ background:'#fff', border:'1px solid #DEE2E5', borderRadius:0, fontSize:'14px', padding:'20px' }} />`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.SearchInput</div>
              <div className="component-render-area">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, maxWidth: 380 }}>
                  <input type="text" placeholder="検索する" style={{
                    flex: 1, background: tokens.inputBg, border: 'none',
                    borderRadius: tokens.inputRadius, height: tokens.inputHeight,
                    padding: '0 20px 0 19px', fontSize: tokens.bodySize,
                    color: tokens.textColor, outline: 'none',
                  }} />
                  <button style={{
                    flexShrink: 0, background: '#000000', color: '#ffffff',
                    border: 'none', borderRadius: '50%', width: 30, height: 30,
                    fontSize: 16, cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}>→</button>
                </div>
              </div>
              <CodeBlock code={`// 入力: bg:#DEE2E5 / radius:15px  ボタン: bg:#000 / radius:50%\n<input style={{ background:'#DEE2E5', borderRadius:'15px', height:'30px' }} />\n<button style={{ background:'#000', borderRadius:'50%', width:30, height:30 }}>→</button>`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.Dropdown</div>
              <div className="component-render-area">
                <div style={{ position: 'relative', display: 'inline-block', width: 200 }}>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: 200, height: 40, padding: '0 14px',
                    background: 'transparent', border: '1px solid #DEE2E5', borderRadius: 0,
                    fontSize: 14, color: tokens.textColor, cursor: 'pointer',
                  }}>
                    <span>カテゴリを選択</span>
                    <span style={{ fontSize: 10, display: 'inline-block', transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                  </button>
                  {dropdownOpen && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, width: 200, background: '#fff', border: '1px solid #DEE2E5', borderTop: 'none', zIndex: 10 }}>
                      {['テクノロジー', 'ファイナンス', 'グローバル'].map((opt) => (
                        <div key={opt} style={{ padding: '10px 14px', fontSize: 14, color: tokens.textColor, cursor: 'pointer' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f5f5f5'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                          onClick={() => setDropdownOpen(false)}
                        >{opt}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <CodeBlock code={`// bg:transparent / border:1px solid #DEE2E5 / radius:0 / height:40px\n<button style={{ width:200, height:40, background:'transparent', border:'1px solid #DEE2E5', borderRadius:0 }}>カテゴリ ▼</button>`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.RadioGroup</div>
              <div className="component-render-area">
                <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                  <legend style={{ fontSize: tokens.labelSize, color: tokens.textColor, letterSpacing: '0.5px', marginBottom: 12, float: 'left', width: '100%' }}>職種</legend>
                  {['個人投資家', '機関投資家', 'アナリスト'].map((opt) => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 14, color: tokens.textColor, cursor: 'pointer' }}>
                      <input type="radio" name="job-type-demo" value={opt} style={{ accentColor: '#000000', width: 16, height: 16 }} />
                      {opt}
                    </label>
                  ))}
                </fieldset>
              </div>
              <CodeBlock code={`// accentColor:#000\n<input type="radio" style={{ accentColor:'#000', width:16, height:16 }} />`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Form.Checkbox</div>
              <div className="component-render-area">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['個人情報の取り扱いに同意する', '入力内容を確認しました'].map((lbl) => (
                    <label key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: tokens.textColor, cursor: 'pointer' }}>
                      <input type="checkbox" style={{ accentColor: '#000000', width: 16, height: 16 }} />
                      {lbl}
                    </label>
                  ))}
                </div>
              </div>
              <CodeBlock code={`// accentColor:#000\n<input type="checkbox" style={{ accentColor:'#000', width:16, height:16 }} />`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Button.CTA</div>
              <div className="component-render-area">
                <button style={{ background: tokens.ctaBg, color: tokens.ctaColor, border: 'none', borderRadius: 0, width: tokens.ctaWidth, height: tokens.ctaHeight, fontSize: 16, letterSpacing: '0.5px', cursor: 'pointer' }}>
                  入力内容を確認
                </button>
              </div>
              <CodeBlock code={`// bg:#DEE2E5 / color:#333 / radius:0 / w:250px / h:58px\n<button style={{ background:'#DEE2E5', color:'#333', border:'none', borderRadius:0, width:250, height:58, fontSize:16 }}>入力内容を確認</button>`} />
            </div>

            <div className="component-card">
              <div className="component-label-row">Pagination</div>
              <div className="component-render-area">
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {(['‹', 1, 2, 3, '…', 8, 9, 10, '›'] as const).map((p, i) => {
                    const isArrow = p === '‹' || p === '›';
                    const isEllipsis = p === '…';
                    const isActive = p === 1;
                    return (
                      <button key={i} style={{
                        background: isActive ? '#000000' : 'transparent',
                        color: isActive ? '#ffffff' : tokens.textColor,
                        border: isArrow || isEllipsis ? 'none' : `1px solid ${isActive ? '#000000' : '#DEE2E5'}`,
                        width: isArrow || isEllipsis ? 24 : 32, height: 32,
                        fontSize: isArrow ? 18 : 13,
                        cursor: isEllipsis ? 'default' : 'pointer', borderRadius: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{p}</button>
                    );
                  })}
                </div>
              </div>
              <CodeBlock code={`// active: bg:#000 color:#fff  inactive: border:1px solid #DEE2E5 / radius:0\n<button style={{ background: active ? '#000' : 'transparent', border:'1px solid #DEE2E5', borderRadius:0, width:32, height:32 }}>{page}</button>`} />
            </div>

          </div>
        )}

        {/* ===== 派生デザイン（想定） ===== */}
        {activeTab === 'derived' && (
          <div>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 24, padding: '10px 14px', background: '#f8f8f8', borderLeft: '3px solid #DEE2E5' }}>
              以下は実サイトには存在しないコンポーネントですが、SoftBankのデザイン言語（#DEE2E5・角丸なし・#333テキスト）を踏襲した想定実装です。
            </p>
            <div style={{ display: 'grid', gap: 24 }}>

              <div className="component-card">
                <div className="component-label-row">Card.Article <span style={{ fontSize: 11, color: '#aaa', marginLeft: 6 }}>想定</span></div>
                <div className="component-render-area">
                  <div style={{ maxWidth: 340, background: '#fff', border: '1px solid #DEE2E5', borderRadius: 0, overflow: 'hidden' }}>
                    <div style={{ background: '#DEE2E5', height: 6 }} />
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: 11, color: '#888', marginBottom: 6, letterSpacing: '0.5px' }}>2024.01.15 — テクノロジー</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#111', lineHeight: 1.5, marginBottom: 10 }}>
                        AI技術を活用した次世代通信インフラの整備について
                      </div>
                      <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>
                        ソフトバンクグループは2024年度を通じて…
                      </div>
                      <div style={{ marginTop: 14, fontSize: 13, color: '#333', fontWeight: 600, borderTop: '1px solid #DEE2E5', paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                        <span>続きを読む</span><span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CodeBlock code={`// border:1px solid #DEE2E5 / radius:0 / top accent bar: bg:#DEE2E5 h:6px\n<div style={{ border:'1px solid #DEE2E5', borderRadius:0 }}>\n  <div style={{ background:'#DEE2E5', height:6 }} />\n  <div style={{ padding:'16px 20px' }}>...</div>\n</div>`} />
              </div>

              <div className="component-card">
                <div className="component-label-row">Badge.Category <span style={{ fontSize: 11, color: '#aaa', marginLeft: 6 }}>想定</span></div>
                <div className="component-render-area">
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['テクノロジー', 'AI・DX', 'ファイナンス', 'グローバル', 'IR情報'].map((tag) => (
                      <span key={tag} style={{ display: 'inline-block', background: '#DEE2E5', color: '#333', fontSize: 12, padding: '4px 12px', borderRadius: 0, letterSpacing: '0.3px' }}>{tag}</span>
                    ))}
                    <span style={{ display: 'inline-block', background: 'transparent', color: '#333', fontSize: 12, padding: '4px 12px', border: '1px solid #DEE2E5', borderRadius: 0 }}>アウトライン</span>
                  </div>
                </div>
                <CodeBlock code={`// filled: bg:#DEE2E5 / radius:0  outline: border:1px solid #DEE2E5 / radius:0\n<span style={{ background:'#DEE2E5', fontSize:12, padding:'4px 12px', borderRadius:0 }}>テクノロジー</span>`} />
              </div>

              <div className="component-card">
                <div className="component-label-row">Table.Basic <span style={{ fontSize: 11, color: '#aaa', marginLeft: 6 }}>想定</span></div>
                <div className="component-render-area">
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, color: '#333' }}>
                    <thead>
                      <tr style={{ background: '#DEE2E5' }}>
                        {['項目', '詳細', '状態'].map(h => (
                          <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: 13, letterSpacing: '0.3px' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[['売上高', '¥6.9兆円', '確定'], ['営業利益', '¥1.2兆円', '確定'], ['純利益', '¥0.8兆円', '見込']].map(([a, b, c], i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #DEE2E5', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                          <td style={{ padding: '10px 14px' }}>{a}</td>
                          <td style={{ padding: '10px 14px' }}>{b}</td>
                          <td style={{ padding: '10px 14px' }}>
                            <span style={{ fontSize: 11, background: c === '確定' ? '#DEE2E5' : 'transparent', border: c === '確定' ? 'none' : '1px solid #DEE2E5', padding: '2px 8px' }}>{c}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CodeBlock code={`// thead: bg:#DEE2E5  row border: 1px solid #DEE2E5\n<table style={{ borderCollapse:'collapse' }}>\n  <thead><tr style={{ background:'#DEE2E5' }}>...</tr></thead>\n  <tbody><tr style={{ borderBottom:'1px solid #DEE2E5' }}>...</tr></tbody>\n</table>`} />
              </div>

              <div className="component-card">
                <div className="component-label-row">Nav.Tabs <span style={{ fontSize: 11, color: '#aaa', marginLeft: 6 }}>想定</span></div>
                <div className="component-render-area">
                  <div>
                    <div style={{ display: 'flex', borderBottom: '2px solid #DEE2E5' }}>
                      {['概要', 'ニュース', 'IR情報', 'サステナビリティ'].map((tab, i) => (
                        <button key={tab} style={{
                          padding: '10px 20px', fontSize: 14, color: i === 0 ? '#000' : '#666',
                          background: 'transparent', border: 'none',
                          borderBottom: i === 0 ? '2px solid #000' : 'none',
                          marginBottom: -2, cursor: 'pointer', fontWeight: i === 0 ? 600 : 400,
                        }}>{tab}</button>
                      ))}
                    </div>
                    <div style={{ padding: '16px 4px', fontSize: 13, color: '#555' }}>
                      タブコンテンツエリア
                    </div>
                  </div>
                </div>
                <CodeBlock code={`// active: borderBottom:2px solid #000 / fontWeight:600  inactive: color:#666\n<div style={{ borderBottom:'2px solid #DEE2E5' }}>\n  <button style={{ borderBottom: active ? '2px solid #000' : 'none', marginBottom:-2 }}>{tab}</button>\n</div>`} />
              </div>

              <div className="component-card">
                <div className="component-label-row">Toast.Notification <span style={{ fontSize: 11, color: '#aaa', marginLeft: 6 }}>想定</span></div>
                <div className="component-render-area">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 380 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#fff', border: '1px solid #DEE2E5', borderLeft: '4px solid #000', borderRadius: 0, fontSize: 14, color: '#333' }}>
                      <span>✓</span><span>送信が完了しました。</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#fff', border: '1px solid #DEE2E5', borderLeft: '4px solid #DEE2E5', borderRadius: 0, fontSize: 14, color: '#555' }}>
                      <span>ℹ</span><span>確認メールを送信しました。</span>
                    </div>
                  </div>
                </div>
                <CodeBlock code={`// radius:0 / borderLeft:4px solid #000(primary) or #DEE2E5(info)\n<div style={{ border:'1px solid #DEE2E5', borderLeft:'4px solid #000', borderRadius:0, padding:'12px 16px' }}>✓ 送信完了</div>`} />
              </div>

              <div className="component-card">
                <div className="component-label-row">Form.InputGroup <span style={{ fontSize: 11, color: '#aaa', marginLeft: 6 }}>想定</span></div>
                <div className="component-render-area">
                  <div style={{ maxWidth: 460, display: 'grid', gap: 16 }}>
                    {[{ label: 'お名前', ph: '山田 太郎' }, { label: 'メールアドレス', ph: 'yamada@example.com' }, { label: '会社名', ph: '株式会社サンプル' }].map(({ label, ph }) => (
                      <div key={label}>
                        <label style={{ display: 'block', fontSize: 13, color: '#555', marginBottom: 4 }}>{label}</label>
                        <input type="text" placeholder={ph} style={{
                          display: 'block', width: '100%', background: '#DEE2E5', border: 'none',
                          borderRadius: '15px', height: '30px', padding: '0 19px',
                          fontSize: '14px', color: '#333', boxSizing: 'border-box', outline: 'none',
                        }} />
                      </div>
                    ))}
                    <button style={{ background: '#DEE2E5', color: '#333', border: 'none', borderRadius: 0, width: '100%', height: 52, fontSize: 15, letterSpacing: '0.5px', cursor: 'pointer', marginTop: 8 }}>
                      送信する
                    </button>
                  </div>
                </div>
                <CodeBlock code={`// 複数input + CTAボタンのフォームセット\n// input: bg:#DEE2E5 / radius:15px / h:30px\n// CTA: bg:#DEE2E5 / radius:0 / w:100% / h:52px`} />
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
