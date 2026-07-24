'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PhoneShell } from '@/components/PhoneShell';
import { useApp } from '@/lib/store';

export default function TopPage() {
  const router = useRouter();
  const { reset } = useApp();

  const handleStart = () => {
    reset();
    router.push('/prototype/questions/1');
  };

  return (
    <PhoneShell>
      <div className="relative w-full min-h-[844px] overflow-hidden" style={{ background: '#091946' }}>
        {/* Header */}
        <div className="flex items-center px-5 py-4" style={{ background: '#091946' }}>
          <Image src="/logo.svg" alt="DOCTORCOMPASS" width={68} height={28} />
        </div>

        {/* Content sheet */}
        <div className="relative" style={{ background: '#ffffff', borderRadius: '20px 20px 0 0' }}>

        {/* Hero Section */}
        <div className="px-5 pt-8 pb-6 relative" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f4f8ff 55%, #dbeafe 100%)', borderRadius: '20px 20px 0 0' }}>
          <p className="text-sm font-bold mb-2" style={{ color: '#2563eb' }}>5分でわかる「今の自分」</p>
          <h1 className="text-3xl font-bold leading-tight mb-4" style={{ color: '#091946' }}>
            開業の道が<br />動き出す
          </h1>
          <div className="relative pr-24 mb-6">
            <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
              1,200件以上の開業実績データを基に
              AIがあなたの成功確率を算出し、開業までサポートします
            </p>
            <div className="absolute right-0 flex flex-col items-end" style={{ top: -144 }}>
              <Image src="/mascot-1.png" alt="" width={169} height={169} />
              <Image src="/mascot-2.png" alt="" width={150} height={150} style={{ marginTop: -132, marginRight: -19 }} />
            </div>
          </div>

          <button onClick={handleStart} className="btn-primary mb-4 mx-auto" style={{ width: 298 }}>
            開業スコアを診断する
          </button>

          <div className="flex items-center justify-center gap-4 mb-6">
            {['完全無料', '3分で完了', '登録不要'].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Image src="/check.svg" alt="" width={14} height={14} />
                <span className="text-xs font-medium" style={{ color: '#4b5563' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="p-5 rounded-2xl" style={{ background: '#ffffff', border: '1px solid #dbeafe' }}>
            <h2 className="text-center text-sm font-bold mb-4" style={{ color: '#091946' }}>診断実績</h2>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '診断件数', value: '1,200+' },
                { label: '診断精度', value: '92%' },
                { label: '開業成功率', value: '85%' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-xs mb-1" style={{ color: '#6b7280' }}>{label}</div>
                  <div className="text-xl font-bold" style={{ color: '#2563eb' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor Concerns + Solution */}
        <div className="px-5 py-6 mb-6" style={{ background: '#eff6ff' }}>
          <div className="p-5 rounded-2xl" style={{ background: '#ffffff', border: '1px solid #eef2ff' }}>
            <h2 className="text-lg font-bold mb-4 text-center" style={{ color: '#111827' }}>医師の悩み</h2>

            {['“開業したいが、何から始めればいい？', '“本当に成功できるのか不安…'].map((q) => (
              <div key={q} className="rounded-xl px-4 py-3 mb-3 text-center text-sm font-medium"
                style={{ background: '#f3f4f6', color: '#374151' }}>
                {q}
              </div>
            ))}

            <p className="text-center text-sm leading-relaxed mb-4" style={{ color: '#6b7280' }}>
              開業には多額の資金、複雑な事業計画、競合調査など、多くの壁があります。
            </p>

            <ChevronDown className="mx-auto mb-3" />

            <div className="flex items-end justify-center gap-0 mb-3">
              <Image src="/mascot-1.png" alt="" width={133} height={133} />
              <Image src="/mascot-2.png" alt="" width={133} height={133} style={{ transform: 'rotate(-12deg)', marginLeft: -34 }} />
            </div>
            <div className="flex justify-center mb-4">
              <Image src="/logo-navy.svg" alt="DOCTORCOMPASS" width={77} height={32} />
            </div>

            <div className="rounded-xl p-4 mb-4 text-center" style={{ background: '#eff6ff' }}>
              <p className="text-sm font-bold mb-2" style={{ color: '#2563eb' }}>解決策</p>
              <p className="text-sm leading-relaxed" style={{ color: '#091946' }}>
                あなたの開業をデータで強力にサポート。簡単な質問に答えるだけで、成功への羅針盤を示します。
              </p>
            </div>

            <button onClick={handleStart} className="btn-primary mx-auto" style={{ width: 298 }}>まずは開業スコアを診断する</button>
          </div>
        </div>

        {/* Features */}
        <div className="px-5 mb-6">
          <h2 className="text-lg font-bold text-center mb-1" style={{ color: '#111827' }}>診断システムの特徴</h2>
          <p className="text-center text-xs mb-4" style={{ color: '#6b7280' }}>科学的根拠に基づいた信頼性の高い診断</p>
          {[
            { Icon: ShieldIcon, title: '高精度AI診断', desc: '1,000件以上の開業実績データを機械学習で分析。92%の高精度で成功確率を予測' },
            { Icon: DocumentIcon, title: '事業計画書生成', desc: '診断結果を基に、融資申請に使える本格的な事業計画書を自動生成' },
            { Icon: BulbIcon, title: '総合サポート', desc: '物件紹介から人材採用まで、開業に必要な全てのサポートをワンストップで提供' },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 mb-3 p-4 rounded-xl"
              style={{ background: '#ffffff', border: '1px solid #eef2ff' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#eff6ff' }}>
                <Icon />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#111827' }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="px-5 py-8 mb-6" style={{ background: 'linear-gradient(180deg, #eff6ff 0%, #bfdbfe 100%)' }}>
          <h2 className="text-lg font-bold text-center mb-1" style={{ color: '#111827' }}>診断の流れ</h2>
          <p className="text-center text-xs mb-5" style={{ color: '#6b7280' }}>シンプルなステップで完了</p>
          {[
            { step: '1', title: '簡単な質問に回答', desc: '気になる開業エリアや専門科目など数分で完了する質問に回答。' },
            { step: '2', title: '開業スコアを算出', desc: '独自AIがデータを分析し、あなたの開業ポテンシャルを数値化。' },
            { step: '3', title: 'あなたに最適な個別提案', desc: 'スコアに応じた具体的な事業計画書生成やサポート内容を提示。' },
          ].map(({ step, title, desc }, i, arr) => (
            <div key={step}>
              <div className="p-5 rounded-2xl text-center" style={{ background: '#ffffff' }}>
                <div className="w-8 h-8 mx-auto mb-2 rounded-full border-2 flex items-center justify-center text-sm font-bold"
                  style={{ borderColor: '#2563eb', color: '#2563eb' }}>
                  {step}
                </div>
                <p className="font-bold text-base mb-1" style={{ color: '#2563eb' }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{desc}</p>
              </div>
              {i < arr.length - 1 && <ChevronDown className="mx-auto my-2" />}
            </div>
          ))}
          <button onClick={handleStart} className="btn-primary mt-4 mx-auto" style={{ width: 298 }}>まずは開業スコアを診断する</button>
        </div>

        {/* Support by score */}
        <div className="px-5 mb-6">
          <h2 className="text-lg font-bold text-center mb-4 leading-snug" style={{ color: '#111827' }}>
            スコアに応じた<br />具体的なサポート
          </h2>

          <div className="p-5 rounded-2xl mb-4" style={{ background: '#ffffff', border: '1px solid #eef2ff' }}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUpIcon />
              <p className="font-bold text-sm" style={{ color: '#111827' }}>スコアが高い医師への強力サポート</p>
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: '#6b7280' }}>
              開業の成功可能性が高い方には、具体的なアクションを加速させるための強力なサポートをご提供します。
            </p>
            {['事業計画書のドラフト自動生成', '融資の事前審査申し込みサポート', '最適な開業物件の紹介', '優秀なスタッフの採用支援', '効果的な広告・集患戦略立案'].map((item) => (
              <div key={item} className="flex items-start gap-2 text-xs mb-1.5" style={{ color: '#374151' }}>
                <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#2563eb' }} />
                {item}
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl" style={{ background: '#ffffff', border: '1px solid #eef2ff' }}>
            <div className="flex items-center gap-2 mb-3">
              <BulbIcon size={20} />
              <p className="font-bold text-sm" style={{ color: '#111827' }}>課題がある医師への改善サポート</p>
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: '#6b7280' }}>
              現時点では開業に慎重な検討が必要な方にも、決して諦めさせません。成功可能性を高めるための具体的な改善策や、別の選択肢もご提案します。
            </p>
            {['開業成功可能性を高める改善策', 'リスクを抑えた開業方法の検討', '開業以外のキャリアパスの提案'].map((item) => (
              <div key={item} className="flex items-start gap-2 text-xs mb-1.5" style={{ color: '#374151' }}>
                <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#2563eb' }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Data strength */}
        <div className="px-5 mb-6">
          <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(160deg, #5b7fe0 0%, #1e3a8a 100%)' }}>
            <h2 className="text-lg font-bold text-center mb-5 text-white leading-snug">
              診断を支える<br />圧倒的なデータ力
            </h2>
            <p className="text-center font-bold text-sm mb-3 text-white">信頼性の源泉</p>
            <p className="text-xs leading-relaxed text-center mb-5" style={{ color: 'rgba(255,255,255,0.85)' }}>
              私たちは、医師への融資申込時に得られた詳細なデータ（学歴、部署、申込内容など）と、開業後の病院の成功/廃業結果データを長年蓄積してきました。この他に類を見ない膨大なデータをAIが深く分析することで、極めて精度の高い開業成功予測を可能にしています。
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: '1,200+', label: '診断件数' },
                { value: '92%', label: '診断精度' },
                { value: '85%', label: '開業成功率' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-xl font-bold text-white mb-1">{value}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="px-5 mb-6">
          <h2 className="text-lg font-bold text-center mb-4" style={{ color: '#111827' }}>今後の展望</h2>
          <p className="text-center text-sm font-bold leading-relaxed mb-4" style={{ color: '#2563eb' }}>
            DOCTORCOMPASSは<br />単なる診断アプリに留まりません。
          </p>
          <p className="text-xs leading-relaxed mb-3" style={{ color: '#6b7280' }}>
            診断結果に基づき、各種サポートサービス（物件、人材、集患など）や金融商品と連携し、開業準備から経営安定まで、医師のキャリアをトータルで支援するモデルを構築しています。
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>
            蓄積されたデータを活かし、より多くの医師が安心して開業できる未来を目指します。
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="px-5 pb-8">
          <div className="p-6 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
            <h2 className="text-lg font-bold text-white mb-2">今すぐ診断を開始しませんか？</h2>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
              3分の簡単診断で、あなたの開業成功への道筋が見えてきます。
            </p>
            <button onClick={handleStart} className="mx-auto font-semibold py-3.5"
              style={{ background: '#ffffff', color: '#2563eb', borderRadius: 22, width: 298 }}>
              開業スコアを診断する
            </button>
          </div>
        </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-10 text-center" style={{ background: '#091946' }}>
          <div className="flex justify-center mb-6">
            <Image src="/logo_yoko.svg" alt="DOCTORCOMPASS" width={240} height={25} />
          </div>
          <div className="flex flex-col gap-4 mb-6">
            {['よくある質問', 'お問い合わせ', '運営会社'].map((item) => (
              <button key={item} className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{item}</button>
            ))}
          </div>
          <div className="flex justify-center" style={{ marginTop: 48, marginBottom: 12 }}>
            <Image src="/sfc_white.png" alt="SHARP FINANCE" width={139} height={24} style={{ width: 139, height: 24 }} />
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>© SHARP FINANCE CORPORATION</p>
        </div>
      </div>
    </PhoneShell>
  );
}

function ChevronDown({ className = '' }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M5 8l5 5 5-5" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" stroke="#2563eb" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 3h8l4 4v14H6V3z" stroke="#2563eb" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12h6M9 16h6" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BulbIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 18h6M10 21h4" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 3a6 6 0 00-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0012 3z" stroke="#2563eb" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function TrendingUpIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 17l6-6 4 4 8-8" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6h6v6" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
