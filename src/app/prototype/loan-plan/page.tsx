'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PhoneShell } from '@/components/PhoneShell';

const PLANS = [
  {
    tags: ['低金利', '長期返済', '政府系'],
    approvalRate: 92,
    name: '日本政策金融公庫 医療・福祉貸付',
    type: '政府系金融機関',
    maxAmount: '最大7,200万円',
    rate: '年1.16%〜',
    term: '最長20年',
    barColor: '#2563eb',
  },
  {
    tags: ['医師専用', 'スピード審査', '柔軟対応'],
    approvalRate: 87,
    name: '医師信用組合 開業支援ローン',
    type: '医師専用金融機関',
    maxAmount: '最大5,000万円',
    rate: '年1.45%〜',
    term: '最長15年',
    barColor: '#3b82f6',
  },
  {
    tags: ['大型融資', '長期', '実績重視'],
    approvalRate: 78,
    name: 'メガバンク 医療機関向けローン',
    type: '民間金融機関',
    maxAmount: '最大1億円',
    rate: '年1.80%〜',
    term: '最長25年',
    barColor: '#60a5fa',
  },
];

export default function LoanPlanPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'融資プラン' | '開業費用目安'>('融資プラン');

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
          <span className="text-sm font-bold" style={{ color: '#111827' }}>融資プラン</span>
          <div className="w-8" />
        </div>

        <div className="flex-1" style={{ background: 'linear-gradient(160deg, #e8f0fe 0%, #f0f4ff 50%, #dbeafe 100%)' }}>
        <div className="px-5 py-6">
          {/* Badges + Title */}
          <div className="flex gap-2 mb-3">
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#eff6ff', color: '#2563eb' }}>AI分析</span>
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#dcfce7', color: '#16a34a' }}>承認率92%</span>
          </div>
          <h1 className="text-xl font-bold mb-1" style={{ color: '#111827' }}>融資プランの提案</h1>
          <p className="text-sm mb-5" style={{ color: '#6b7280' }}>あなたのスコアに最適化された融資プランです</p>

          {/* Tabs */}
          <div className="flex gap-2 mb-5 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.6)' }}>
            {(['融資プラン', '開業費用目安'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: activeTab === tab ? 'white' : 'transparent',
                  color: activeTab === tab ? '#2563eb' : '#6b7280',
                  boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                }}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === '融資プラン' && (
            <>
              {/* Approval prediction card */}
              <div className="glass-card p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: '#eff6ff' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2L12.4 7.6L18.5 8.3L14 12.6L15.3 18.5L10 15.5L4.7 18.5L6 12.6L1.5 8.3L7.6 7.6L10 2Z"
                        fill="#2563eb" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#111827' }}>あなたの融資承認予測</p>
                    <p className="text-xs" style={{ color: '#6b7280' }}>診断スコアをもとに、最適な融資プランを提案します</p>
                  </div>
                </div>
              </div>

              {/* Plan cards */}
              {PLANS.map((plan, i) => (
                <div key={plan.name} className="glass-card mb-4 overflow-hidden">
                  <div className="p-4">
                    {/* Tags + approval */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-1 flex-wrap">
                        {plan.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: '#eff6ff', color: '#2563eb' }}>{tag}</span>
                        ))}
                      </div>
                      <span className="text-sm font-bold" style={{ color: plan.barColor }}>
                        {plan.approvalRate}%<br />
                        <span className="text-xs font-normal" style={{ color: '#9ca3af' }}>承認率</span>
                      </span>
                    </div>

                    {/* Name */}
                    <p className="font-bold text-sm mb-0.5" style={{ color: '#111827' }}>{plan.name}</p>
                    <p className="text-xs mb-3" style={{ color: '#9ca3af' }}>{plan.type}</p>

                    {/* Details */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[
                        { label: '融資額', value: plan.maxAmount },
                        { label: '金利', value: plan.rate },
                        { label: '期間', value: plan.term },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-center p-2 rounded-lg" style={{ background: '#f8faff' }}>
                          <p className="text-xs mb-1" style={{ color: '#9ca3af' }}>{label}</p>
                          <p className="text-xs font-bold" style={{ color: '#111827' }}>{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Approval bar */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: '#6b7280' }}>承認確率</span>
                      <span className="text-xs font-bold" style={{ color: plan.barColor }}>{plan.approvalRate}%</span>
                    </div>
                    <div className="progress-bar mb-3">
                      <div className="progress-bar-fill" style={{ width: `${plan.approvalRate}%`, background: `linear-gradient(90deg, ${plan.barColor}, ${plan.barColor}cc)` }} />
                    </div>

                    <button onClick={() => setExpanded(expanded === i ? null : i)}
                      className="text-sm font-medium flex items-center gap-1" style={{ color: '#2563eb' }}>
                      詳細を見る {expanded === i ? '∧' : '∨'}
                    </button>

                    {expanded === i && (
                      <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: '#e5e7eb' }}>
                        <p className="text-xs" style={{ color: '#374151' }}>・連帯保証人不要（一定条件あり）</p>
                        <p className="text-xs" style={{ color: '#374151' }}>・据置期間最大2年</p>
                        <p className="text-xs" style={{ color: '#374151' }}>・開業前から相談可能</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Consultation CTA */}
              <div className="glass-card p-5 mt-2">
                <h3 className="font-bold text-sm mb-2" style={{ color: '#111827' }}>融資に関するご相談</h3>
                <p className="text-xs mb-4" style={{ color: '#6b7280' }}>
                  融資条件の詳細や申請書類について、専任担当者が丁寧にご説明します。
                </p>
                <button className="btn-secondary" style={{ fontSize: 14, padding: '12px 24px' }}>
                  無料相談を予約する
                </button>
              </div>
            </>
          )}

          {activeTab === '開業費用目安' && (
            <div className="glass-card p-5">
              <h3 className="font-bold text-sm mb-4" style={{ color: '#111827' }}>内科クリニック 開業費用目安</h3>
              {[
                { item: '内装工事費', amount: '2,000〜4,000万円' },
                { item: '医療機器', amount: '1,500〜3,000万円' },
                { item: '電子カルテ・システム', amount: '200〜500万円' },
                { item: '保証金・敷金', amount: '500〜1,500万円' },
                { item: '運転資金（6ヶ月）', amount: '1,000〜2,000万円' },
                { item: '広告・開業準備費', amount: '100〜300万円' },
              ].map(({ item, amount }) => (
                <div key={item} className="flex justify-between items-center py-3 border-b"
                  style={{ borderColor: '#f3f4f6' }}>
                  <span className="text-sm" style={{ color: '#374151' }}>{item}</span>
                  <span className="text-sm font-semibold" style={{ color: '#111827' }}>{amount}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 mt-1">
                <span className="font-bold" style={{ color: '#111827' }}>合計目安</span>
                <span className="font-bold text-lg" style={{ color: '#2563eb' }}>5,300〜1億1,300万円</span>
              </div>
            </div>
          )}
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
