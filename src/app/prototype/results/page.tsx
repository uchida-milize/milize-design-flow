'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PhoneShell } from '@/components/PhoneShell';
import { ScoreNumber } from '@/components/ScoreDigits';
import { useApp } from '@/lib/store';
import { SCORE_MESSAGES, calculateCategoryScores, getWeakestCategories, getCategoryTip, getScoreTier, type CategoryKey } from '@/lib/questions';

const DEFAULT_CATEGORY_SCORES: Record<CategoryKey, number> = {
  '資金力': 69,
  '経営設計力': 78,
  '競合状況': 45,
  '市場性': 55,
  '人脈・ネットワーク': 40,
};

const STEPS = [
  {
    step: 'Step 1',
    image: '/img_step1.png',
    title: 'あなたに合った物件を選ぶ',
    bullets: ['診療科目と相性の良い立地', '競合医院との距離', '1日平均通行量 などの指標から、適した物件を選定しました。'],
    tags: [{ label: '物件候補数', value: '3件' }],
    action: '物件候補を確認する',
    path: '/prototype/properties',
  },
  {
    step: 'Step 2',
    image: '/img_step2.png',
    title: '事業計画書ドラフトを確認',
    desc: '開業予定地や診療科に応じた「融資通過率の高い構成」で事業計画書を作成しました。業種別・地域別の成功パターンに基づいたフォーマットを使用しています。',
    action: '事業計画書ドラフトを確認する',
    path: '/prototype/business-plan',
  },
  {
    step: 'Step 3',
    image: '/img_step3.png',
    title: '資金準備に向けて仮申請',
    desc: '事業計画書をもとに、提携金融機関への「仮審査フォーム」に進めます。',
    tags: [{ label: '所要時間', value: '約3分' }, { label: '入力内容', value: 'ご本人情報・計画書選択' }],
    action: '融資仮申請フォームへ進む',
    path: '/prototype/loan-plan',
  },
  {
    step: 'Step 4',
    image: '/img_step4.png',
    title: '人材と集患の支援体制を整える',
    desc: '開業前後で必要な業務をワンストップでサポートします。',
    tags: [{ label: '採用・集患サポートパック' }],
    bullets: ['看護師／受付スタッフの求人支援', 'ホームページ制作＋MEO／広告出稿支援', '開業イベント（内覧会）支援など'],
    action: '採用・集患サポートの詳細を見る',
    path: '/prototype',
  },
];

export default function ResultsPage() {
  const router = useRouter();
  const { score, scoreTier, answers, reset, resultsRevealed, setResultsRevealed } = useApp();
  const finalScore = score ?? 76;
  const [displayScore, setDisplayScore] = useState(resultsRevealed ? finalScore : 0);
  const [scoreRevealed, setScoreRevealed] = useState(resultsRevealed);
  const [introPhase, setIntroPhase] = useState(!resultsRevealed);

  const tier = scoreTier || getScoreTier(finalScore);
  const msg = SCORE_MESSAGES[tier];

  const hasAnswers = Object.keys(answers).length > 0;
  const categoryScores = hasAnswers ? calculateCategoryScores(answers) : DEFAULT_CATEGORY_SCORES;
  const weakest = getWeakestCategories(categoryScores, 2);

  useEffect(() => {
    if (resultsRevealed) return;
    let current = 0;
    const step = finalScore / 40;
    const timer = setInterval(() => {
      current = Math.min(current + step, finalScore);
      setDisplayScore(Math.round(current));
      if (current >= finalScore) {
        clearInterval(timer);
        setScoreRevealed(true);
        setIntroPhase(false);
        setResultsRevealed(true);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [finalScore, resultsRevealed, setResultsRevealed]);

  const scoreColor = '#2563EB';
  const scoreLabel = tier === 'high' ? '開業適性が高いです' : tier === 'medium' ? '着実に準備を進めましょう' : 'まず基盤を固めましょう';

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
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ background: '#ffffff', borderRadius: '20px 20px 0 0' }}>
          <button onClick={() => router.push('/prototype')} className="flex items-center gap-1 text-sm font-medium" style={{ color: '#2563eb' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            戻る
          </button>
          <span className="text-sm font-bold" style={{ color: '#111827' }}>診断結果</span>
          <button onClick={() => { reset(); router.push('/prototype/questions/1'); }}
            className="text-xs px-3 py-1.5 rounded-full font-semibold border"
            style={{ color: '#2563eb', borderColor: '#2563eb' }}>
            再診断
          </button>
        </div>

        <div className="flex-1" style={{ background: 'linear-gradient(160deg, #e8f0fe 0%, #f0f4ff 50%, #dbeafe 100%)' }}>
          <div className="px-5 pb-6" style={{ paddingTop: introPhase ? 160 : 0, transition: 'padding-top 0.6s ease' }}>
            {/* Score card */}
            <div className={`relative text-center animate-fade-in${introPhase ? '' : ' overflow-hidden'}`}
              style={{ background: 'linear-gradient(180deg, #dbeafe 0%, #eff6ff 100%)', padding: '28px 20px', marginLeft: -20, marginRight: -20 }}>
              <div className="absolute pointer-events-none opacity-60"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 380, height: 380 }}>
                <Image src="/circle.png" alt="" fill style={{ objectFit: 'contain' }} />
              </div>
              <div className="absolute" style={{ top: 0, left: -8 }}>
                <Image src="/mascot-1.png" alt="" width={132} height={132} />
              </div>
              <div className="absolute opacity-90" style={{ bottom: -30, right: -10 }}>
                <Image src="/mascot-2.png" alt="" width={120} height={120} />
              </div>
              <div className="relative">
                <p className="text-sm font-bold mb-2" style={{ color: '#374151' }}>あなたの開業スコア</p>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <ScoreNumber value={displayScore} height={76} color={scoreColor} />
                  <Image src="/100.svg" alt="/100" width={80} height={28} style={{ width: 56, height: 19.6, marginBottom: 4 }} />
                </div>
                <div className={scoreRevealed ? 'animate-fade-in' : ''} style={{ opacity: scoreRevealed ? 1 : 0 }}>
                  <div className="inline-block px-4 py-1.5 rounded-full mb-4"
                    style={{ color: scoreColor, fontSize: '1.14rem' }}>
                    <span style={{ fontWeight: 100 }}>［　</span>
                    <span className="font-bold">{scoreLabel}</span>
                    <span style={{ fontWeight: 100 }}>　］</span>
                  </div>
                  <p className="text-xs leading-relaxed mx-auto" style={{ color: '#374151', width: 220 }}>{msg.description}</p>
                </div>
              </div>
            </div>

            <div className={scoreRevealed ? 'animate-fade-in' : ''} style={{ opacity: scoreRevealed ? 1 : 0 }}>
            {/* Score breakdown */}
            <div className="glass-card p-5 mb-5">
              {(Object.keys(categoryScores) as CategoryKey[]).map((category) => {
                const val = categoryScores[category];
                const color = val >= 50 ? '#2563eb' : '#ef4444';
                return (
                  <div key={category} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium" style={{ color: '#111827' }}>{category}</span>
                      <span className="text-sm font-bold" style={{ color }}>{val}点</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
                      <div className="h-full rounded-full" style={{ width: `${val}%`, background: color }} />
                    </div>
                  </div>
                );
              })}

              <div className="rounded-2xl p-4 mt-5" style={{ background: '#f9fafb' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Image src="/face-persevering.svg" alt="" width={20} height={20} />
                  <span className="text-sm font-bold" style={{ color: '#111827' }}>あなたのウィークポイント</span>
                </div>
                <p className="text-xs" style={{ color: '#6b7280' }}>{weakest.join(' / ')}</p>

                <div className="flex items-center gap-2 mt-3 mb-1.5">
                  <Image src="/face-laugh-beam.svg" alt="" width={20} height={20} />
                  <span className="text-sm font-bold" style={{ color: '#111827' }}>改善策</span>
                </div>
                <p className="text-xs" style={{ color: '#6b7280' }}>{getCategoryTip(weakest[0])}</p>
              </div>
            </div>

            {/* Plan proposal intro */}
            <div className="text-center mb-5 animate-fade-in">
              <div className="flex justify-center mb-3">
                <Image src="/mascot-1.png" alt="" width={144} height={144} className="mascot-float" style={{ position: 'relative', left: 5, top: 20 }} />
              </div>
              <h2 className="text-lg font-bold mb-3" style={{ color: '#091946' }}>
                あなただけの<br />開業プラン提案
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: '#4b5563' }}>
                あなたのスコアは開業適性が非常に高い水準です。<br />
                この4つのステップを踏むことで、開業までの道のりをより安全・効率的に進められます。
              </p>
            </div>

            {/* Step cards */}
            {STEPS.map((s, i) => (
              <div key={s.step}>
                <div className="rounded-2xl overflow-hidden mb-3 animate-fade-in" style={{ background: '#ffffff' }}>
                  <div className="relative w-full" style={{ height: 150 }}>
                    <Image src={s.image} alt="" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="p-5">
                    <span className="text-sm" style={{ color: '#2563eb' }}>
                      <span style={{ fontWeight: 100 }}>[ </span>
                      <span className="font-bold">{s.step}</span>
                      <span style={{ fontWeight: 100 }}> ]</span>
                    </span>
                    <p className="text-lg font-bold mt-1 mb-2" style={{ color: '#111827' }}>{s.title}</p>
                    {s.desc && <p className="text-xs leading-relaxed mb-3" style={{ color: '#6b7280' }}>{s.desc}</p>}
                    {s.bullets && (
                      <ul className="mb-3">
                        {s.bullets.map((b) => (
                          <li key={b} className="text-xs leading-relaxed flex gap-1.5" style={{ color: '#6b7280' }}>
                            <span>・</span><span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.tags && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {s.tags.map((tag) => (
                          <span key={tag.label} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                            style={{ background: '#eff6ff', color: '#2563eb' }}>
                            {tag.label}{'value' in tag ? `　${tag.value}` : ''}
                          </span>
                        ))}
                      </div>
                    )}
                    <button onClick={() => router.push(s.path)}
                      className="w-full py-3 font-semibold text-sm text-white flex items-center justify-center gap-1"
                      style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: 22 }}>
                      {s.action} →
                    </button>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex justify-center mb-3" style={{ color: '#93c5fd' }}>
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                      <path d="M2 2L10 9L18 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                      <path d="M2 6L10 13L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {/* Re-diagnose */}
            <button onClick={() => { reset(); router.push('/prototype/questions/1'); }}
              className="py-3.5 rounded-full font-semibold text-sm mb-5 border-2 flex items-center justify-center gap-2 animate-fade-in mx-auto"
              style={{ color: '#2563eb', borderColor: '#2563eb', background: '#ffffff', width: 296 }}>
              ← もう一度診断する
            </button>

            {/* Trust section */}
            <div className="glass-card p-5 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Image src="/icon_trust.svg" alt="" width={28} height={28} style={{ width: 36.4, height: 36.4, position: 'relative', top: 5, left: -4 }} />
                <span className="text-sm font-bold" style={{ color: '#111827', position: 'relative', left: -10 }}>診断の信頼性について</span>
              </div>
              <ul className="flex flex-col gap-2">
                <li className="text-xs leading-relaxed flex gap-1.5" style={{ color: '#6b7280' }}>
                  <span>・</span><span>この診断は1,200件以上の医師データ＋開業後の結果データに基づいており、診断精度92%、開業成功率85%の実績があります。</span>
                </li>
                <li className="text-xs leading-relaxed flex gap-1.5" style={{ color: '#6b7280' }}>
                  <span>・</span><span>匿名化された情報に基づく統計推論を行っています。安心してご利用ください。</span>
                </li>
              </ul>
            </div>
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

        {/* Sticky next step bar */}
        <div className="sticky bottom-0 flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ background: '#091946', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => router.push('/prototype/business-plan')}
            className="flex-1 text-left text-xs font-medium px-4 py-2.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff' }}>
            <span className="block text-[10px] mb-0.5" style={{ color: '#93c5fd' }}>Next Step</span>
            事業計画書のドラフト確認
          </button>
          <button className="flex-shrink-0 flex items-center justify-center" style={{ width: 84, height: 84 }}>
            <Image src="/ai_chat.png" alt="AI Chat" width={84} height={87} style={{ width: 84, height: 'auto' }} />
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}
