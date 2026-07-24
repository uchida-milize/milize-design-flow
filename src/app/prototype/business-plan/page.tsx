'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PhoneShell } from '@/components/PhoneShell';

export default function BusinessPlanPage() {
  const router = useRouter();
  const [openSections, setOpenSections] = useState<string[]>(['事業概要']);

  const toggleSection = (s: string) => {
    setOpenSections((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const sections = [
    { icon: '📋', title: '事業概要', content: [
      { label: '【事業名】', value: '内科クリニック 開業計画' },
      { label: '【事業目的】', value: '地域住民の健康増進と疾病予防に貢献する、患者中心の医療機関を開設する。' },
      { label: '【開業地】', value: '東京都港区周辺エリア' },
      { label: '【診療科目】', value: '内科（専門外来を含む）' },
      { label: '【開業形態】', value: '個人クリニック（将来的な医療法人化を視野に入れる）' },
    ]},
    { icon: '📊', title: '市場分析', content: [
      { label: '商圏人口', value: '約15万人（半径1km）' },
      { label: '高齢化率', value: '28.3%（全国平均を上回る）' },
      { label: '競合クリニック数', value: '半径500m以内：3院' },
    ]},
    { icon: '💰', title: '収支計画', content: [
      { label: '初期投資', value: '約6,500万円（内装4,000万円、医療機器2,000万円、他）' },
      { label: '月間目標患者数', value: '50名/日（開業6ヶ月後目標）' },
      { label: '損益分岐点', value: '患者数40名/日（月収約335万円）' },
    ]},
    { icon: '⚙️', title: '運営計画', content: [
      { label: '診療時間', value: '月〜土 9:00-13:00 / 15:00-18:00' },
      { label: 'スタッフ', value: '看護師2名、受付1名、医事1名' },
      { label: '予約システム', value: 'オンライン予約・AI問診導入予定' },
    ]},
    { icon: '🛡️', title: 'リスク管理', content: [
      { label: '患者数不足リスク', value: 'SNS・地域広報で開業前からブランド構築' },
      { label: '競合リスク', value: '専門外来で差別化、予防医療に注力' },
      { label: '資金リスク', value: '運転資金6ヶ月分を確保' },
    ]},
  ];

  const revenueData = [
    { year: '1年目', monthly: '約250万円', patients: '30名/日', pct: 45 },
    { year: '2年目', monthly: '約420万円', patients: '50名/日', pct: 76 },
    { year: '3年目', monthly: '約550万円', patients: '65名/日', pct: 100 },
  ];

  return (
    <PhoneShell>
      <div className="relative w-full min-h-[844px] flex flex-col">
        {/* Navy identity bar */}
        <div className="flex items-center px-5 py-4 flex-shrink-0" style={{ background: '#091946' }}>
          <button onClick={() => router.push('/prototype')}>
            <Image src="/logo.svg" alt="DOCTORCOMPASS" width={68} height={28} />
          </button>
        </div>

        {/* White nav bar */}
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ background: '#ffffff', borderRadius: '20px 20px 0 0' }}>
          <button onClick={() => router.back()} className="flex items-center gap-1 text-sm font-medium" style={{ color: '#2563eb' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            戻る
          </button>
          <span className="text-sm font-bold" style={{ color: '#111827' }}>事業計画書</span>
          <div className="w-8" />
        </div>

        <div className="flex-1" style={{ background: 'linear-gradient(160deg, #e8f0fe 0%, #f0f4ff 50%, #dbeafe 100%)' }}>
        <div className="px-5 py-6">
          {/* Badge */}
          <div className="flex gap-2 mb-4">
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#eff6ff', color: '#2563eb' }}>AI自動生成</span>
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#fef9c3', color: '#b45309' }}>ドラフト版</span>
          </div>

          <h1 className="text-xl font-bold mb-1" style={{ color: '#111827' }}>事業計画書ドラフト</h1>
          <p className="text-sm mb-5" style={{ color: '#6b7280' }}>診断結果をもとにAIが自動生成しました。内容を確認・編集してください。</p>

          {/* Action tabs */}
          <div className="flex gap-2 mb-5">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
              ✓ 確認
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border"
              style={{ color: '#6b7280', borderColor: '#e5e7eb' }}>
              ✎ 編集
            </button>
          </div>

          {/* Plan header card */}
          <div className="rounded-2xl p-4 mb-4 text-white"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #1e40af)' }}>
            <p className="text-xs mb-1 opacity-80">DOCTOR COMPASS Ver 2</p>
            <p className="text-xl font-bold">内科クリニック</p>
            <p className="text-lg font-bold mb-1">開業事業計画書</p>
            <p className="text-xs opacity-70">2026年7月15日 作成</p>
          </div>

          {/* Collapsible sections */}
          {sections.map(({ icon, title, content }) => (
            <div key={title} className="glass-card mb-3 overflow-hidden">
              <button className="w-full flex items-center justify-between p-4"
                onClick={() => toggleSection(title)}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{icon}</span>
                  <span className="font-semibold text-sm" style={{ color: '#111827' }}>{title}</span>
                </div>
                <span style={{ color: '#6b7280' }}>{openSections.includes(title) ? '∧' : '∨'}</span>
              </button>
              {openSections.includes(title) && (
                <div className="px-4 pb-4 space-y-2">
                  {content.map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: '#4b5563' }}>{label}</p>
                      <p className="text-sm" style={{ color: '#374151' }}>{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Revenue simulation */}
          <div className="glass-card p-5 mb-5">
            <h3 className="font-bold text-sm mb-4" style={{ color: '#111827' }}>収益推移シミュレーション</h3>
            {revenueData.map(({ year, monthly, patients, pct }) => (
              <div key={year} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium" style={{ color: '#374151' }}>{year}</span>
                  <span className="text-sm font-bold" style={{ color: '#2563eb' }}>月収 {monthly}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>患者数 {patients}</p>
              </div>
            ))}
            <div className="rounded-xl p-3 mt-3" style={{ background: '#fef9c3', border: '1px solid #fde68a' }}>
              <p className="text-xs font-semibold" style={{ color: '#b45309' }}>
                損益分岐点：患者数40人/日（月収約335万円）
              </p>
            </div>
          </div>

          {/* Actions */}
          <button className="btn-primary mb-3" style={{}}>
            ⬇ 事業計画書をダウンロード
          </button>
          <button onClick={() => router.push('/prototype/loan-plan')} className="btn-secondary">
            融資プランを確認する →
          </button>

          {/* Expert review */}
          <div className="glass-card p-5 mt-4">
            <h3 className="font-bold text-sm mb-2" style={{ color: '#111827' }}>専家によるレビュー</h3>
            <p className="text-xs mb-4" style={{ color: '#6b7280' }}>
              事業計画書を専門のコンサルタントがレビューし、融資申請に最適化します。
            </p>
            <button className="btn-secondary" style={{ fontSize: 14, padding: '12px 24px' }}>
              無料レビューを申し込む
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-10 text-center" style={{ background: '#091946' }}>
          <div className="flex justify-center mb-6">
            <Image src="/logo_yoko.svg" alt="DOCTORCOMPASS" width={240} height={25} />
          </div>
          <div className="flex flex-col gap-4 mb-8">
            {['よくある質問', 'お問い合わせ', '運営会社'].map((item) => (
              <button key={item} className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{item}</button>
            ))}
          </div>
          <div className="flex justify-center mb-3">
            <Image src="/sfc_white.png" alt="SHARP FINANCE" width={139} height={24} style={{ width: 139, height: 24 }} />
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>© SHARP FINANCE CORPORATION</p>
        </div>
        </div>
      </div>
    </PhoneShell>
  );
}
