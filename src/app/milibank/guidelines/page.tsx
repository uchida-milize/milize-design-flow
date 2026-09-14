import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName: string = 'みらいバンク';
const basePath: string = '/milibank';
const primaryColor: string = '#2a5ca8';

const swatches: { hex: string | null; name: string; note: string }[] = [
  { hex: null, name: 'プライマリカラー', note: '実測データなし（SVGロゴのため色抽出不可）' },
  { hex: null, name: 'セカンダリカラー', note: '実測データなし' },
  { hex: null, name: 'アクセントカラー', note: '実測データなし' },
  { hex: null, name: 'テキストカラー', note: '実測データなし（CSS未取得）' },
  { hex: '#eef4fb', name: '背景色', note: '複数ページで共通検出' },
];

export default function GuidelinesPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <section style={{ marginTop: '40px', marginBottom: '48px' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: primaryColor,
            letterSpacing: '0.05em',
            marginBottom: '8px',
          }}
        >
          GUIDELINES
        </p>
        <h1
          style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}
        >
          ガイドラインリサーチ
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          スクレイピングデータをもとにしたカラー・タイポグラフィ・トンマナのリサーチ結果です。
        </p>
      </section>

      {/* カラー */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
          カラー
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '12px',
          }}
        >
          {swatches.map((s) => (
            <div
              key={s.name}
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '80px',
                  background: s.hex ?? '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  fontSize: '12px',
                  border: s.hex ? 'none' : '1px dashed #d1d5db',
                }}
              >
                {!s.hex && 'NO DATA'}
              </div>
              <div style={{ padding: '10px 12px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#111827' }}>
                  {s.hex ?? '未実測'}
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{s.name}</p>
                <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* タイポグラフィ */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
          タイポグラフィ
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            padding: '24px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#111827', marginBottom: '8px', fontWeight: 700 }}>
            日本語フォント
          </p>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Noto Sans JP（ウェイト: 300, 400, 500, 700）
          </p>
          <p style={{ fontSize: '14px', color: '#111827', marginBottom: '8px', fontWeight: 700 }}>
            英数フォント
          </p>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            milizeBarlow-L / milizeBarlow-M / milizeBarlow-R / milizeBarlow-R-ttl（Typekit経由）、
            Barlow（Google Fonts, 400/700）、din-condensed
          </p>
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>
            h1〜captionのフォントサイズ・行間は実測データなし。
          </p>
        </div>
      </section>

      {/* トンマナ */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
          トンマナ
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            padding: '24px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
            角丸パターン: 実測不可（border_radiiが空、CSSソース未取得）
          </p>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            シャドウ／グロー: 実測データなし
          </p>
        </div>
      </section>

      {/* その他 */}
      <section>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
          その他
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            padding: '24px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#111827', fontWeight: 700, marginBottom: '8px' }}>
            キーワード
          </p>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            「未来」「安心感」「ネオバンク」
          </p>
          <p style={{ fontSize: '14px', color: '#111827', fontWeight: 700, marginBottom: '8px' }}>
            全体の印象
          </p>
          <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7 }}>
            「みらいバンク」はドコモSMTBネット銀行の専用支店として、淡いブルー系（#eef4fb）を基調とした、
            クリーンで信頼感のあるデジタルバンキングサービスの世界観を打ち出しています。詳細なコンポーネントの
            具体的な数値（角丸・シャドウ・カラーコード等）はスクレイピングデータからは十分に取得できておらず、
            実装への反映には追加のCSS実測調査が必要です。
          </p>
        </div>
      </section>
    </div>
  );
}