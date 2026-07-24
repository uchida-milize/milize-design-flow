import Link from 'next/link';
import { PortalHeader } from '@/components/PortalHeader';
import { QUESTIONS } from '@/lib/questions';

const SCREENS = [
  { path: '/prototype', openPath: '/prototype', label: 'トップ', desc: '診断への入口となるランディング画面' },
  ...QUESTIONS.map((q) => ({
    path: `/prototype/questions/${q.id}`,
    openPath: `/prototype/questions/${q.id}`,
    label: `質問 ${q.qLabel}`,
    desc: q.category,
  })),
  { path: '/prototype/loading', openPath: '/prototype/loading', label: '診断中', desc: 'スコア算出中のローディング演出' },
  { path: '/prototype/results', openPath: '/prototype/results', label: '結果', desc: 'スコア・開業適性・カテゴリ別評価' },
  { path: '/prototype/properties', openPath: '/prototype/properties', label: '物件', desc: 'おすすめ開業物件の一覧' },
  { path: '/prototype/business-plan', openPath: '/prototype/business-plan', label: '事業計画書', desc: '自動生成された事業計画書プレビュー' },
  { path: '/prototype/loan-plan', openPath: '/prototype/loan-plan', label: '融資プラン', desc: '融資シミュレーションと審査サポート' },
];

export default function ScreensPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      <PortalHeader active="screens" />

      <div style={{ background: '#f7f9fc' }}>
        <div className="mx-auto" style={{ maxWidth: 1120, padding: '48px 24px 32px' }}>
          <p className="text-sm font-bold mb-2" style={{ color: '#2563eb' }}>Screens</p>
          <h1 className="font-bold" style={{ fontSize: 32, color: '#091946' }}>スクリーン一覧</h1>
          <p className="text-sm mt-3" style={{ color: '#6b7280', maxWidth: 560 }}>
            プロトタイプ全画面のプレビューです（質問はQ1〜Q10まで全て表示）。各カード下部のリンクから実際にタップ操作できます。
          </p>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 1120, padding: '48px 24px 96px' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
          {SCREENS.map((s) => (
            <div key={s.path} className="glass-card" style={{ padding: 20 }}>
              <div
                style={{
                  width: '100%',
                  height: 420,
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#444444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <div style={{ width: 195, height: 422, overflow: 'hidden', position: 'relative' }}>
                  <iframe
                    src={`${s.path}${s.path.includes('?') ? '&' : '?'}embed=1`}
                    title={s.label}
                    style={{
                      width: 390,
                      height: 844,
                      border: 'none',
                      transform: 'scale(0.5)',
                      transformOrigin: 'top left',
                      pointerEvents: 'none',
                    }}
                    scrolling="no"
                    tabIndex={-1}
                  />
                </div>
              </div>
              <p className="font-bold text-sm mb-1" style={{ color: '#091946' }}>{s.label}</p>
              <p className="text-xs mb-3" style={{ color: '#6b7280' }}>{s.desc}</p>
              <Link href={s.openPath} className="text-sm font-semibold flex items-center gap-1" style={{ color: '#2563eb' }}>
                プロトタイプを開く
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M7 5l5 5-5 5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
