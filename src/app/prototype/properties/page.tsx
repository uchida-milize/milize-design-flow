'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PhoneShell } from '@/components/PhoneShell';
import { ScoreNumber } from '@/components/ScoreDigits';

const PROPERTIES = [
  {
    matchScore: 92,
    tags: ['医療モール', '新築', '内科向け'],
    name: '品川メディカルプラザ 3F',
    address: '東京都港区南2-16-1',
    rent: '55万円/月',
    area: '85m²',
    station: '品川駅 徒歩3分',
    photo: '/property-shinagawa.jpg',
  },
  {
    matchScore: 87,
    tags: ['クリニックビル', 'リノベ済', '小規模向け'],
    name: '田町クリニックビル 2F',
    address: '東京都港区芝浦3-4-1',
    rent: '42万円/月',
    area: '72m²',
    station: '田町駅 徒歩5分',
    photo: '/property-tamachi.jpg',
  },
  {
    matchScore: 79,
    tags: ['複合ビル', '広め', '専門クリニック向け'],
    name: '浜松町メディカルセンター 5F',
    address: '東京都港区浜松町2-1-1',
    rent: '68万円/月',
    area: '110m²',
    station: '浜松町駅 徒歩2分',
    photo: '/property-hamamatsucho.png',
  },
];

export default function PropertiesPage() {
  const router = useRouter();

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
          <span className="text-sm font-bold" style={{ color: '#111827' }}>おすすめ物件</span>
          <div className="w-8" />
        </div>

        <div className="flex-1" style={{ background: 'linear-gradient(160deg, #e8f0fe 0%, #f0f4ff 50%, #dbeafe 100%)' }}>
          <div className="px-5 pb-6">
            <div className="flex gap-2 mb-3 pt-6">
              <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#eff6ff', color: '#2563eb' }}>AIマッチング</span>
              <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#dcfce7', color: '#16a34a' }}>3件提案</span>
            </div>
            <h1 className="text-xl font-bold mb-1" style={{ color: '#111827' }}>あなたに最適な物件</h1>
            <p className="text-sm mb-5" style={{ color: '#6b7280' }}>診断スコアをもとにAIが選定した物件です</p>

            {PROPERTIES.map((p) => (
              <div key={p.name} className="glass-card mb-4 overflow-hidden">
                {/* Property photo */}
                <div className="relative h-36 flex items-end p-3">
                  <Image src={p.photo} alt={p.name} fill style={{ objectFit: 'cover' }} />
                  {/* Match score badge */}
                  <div className="absolute top-3 right-3 px-2 py-1.5 rounded-xl flex flex-col items-center"
                    style={{ background: 'white' }}>
                    <div className="flex items-end gap-0.5">
                      <ScoreNumber value={p.matchScore} height={19} color="#2563eb" />
                      <span className="text-xs font-bold" style={{ color: '#2563eb' }}>%</span>
                    </div>
                    <div className="text-[9px]" style={{ color: '#6b7280' }}>マッチ度</div>
                  </div>
                  {/* Tags */}
                  <div className="relative flex gap-1 flex-wrap">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm mb-0.5" style={{ color: '#111827' }}>{p.name}</h3>
                  <p className="text-xs mb-3 flex items-center gap-1" style={{ color: '#9ca3af' }}>
                    <Image src="/location-pin-eye.svg" alt="" width={14} height={14} />
                    {p.address}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="p-2 rounded-lg" style={{ background: '#f8faff' }}>
                      <p className="text-xs mb-0.5" style={{ color: '#9ca3af' }}>賃料</p>
                      <p className="text-sm font-bold" style={{ color: '#111827' }}>{p.rent}</p>
                    </div>
                    <div className="p-2 rounded-lg" style={{ background: '#f8faff' }}>
                      <p className="text-xs mb-0.5" style={{ color: '#9ca3af' }}>面積</p>
                      <p className="text-sm font-bold" style={{ color: '#111827' }}>{p.area}</p>
                    </div>
                  </div>

                  <p className="text-xs mb-3 flex items-center gap-1" style={{ color: '#6b7280' }}>
                    <Image src="/watch-circle.svg" alt="" width={14} height={14} />
                    {p.station}
                  </p>

                  <button className="btn-primary" style={{ padding: '10px 16px', fontSize: 14, width: 296, marginLeft: 'auto', marginRight: 'auto' }}>
                    詳細を見る &gt;
                  </button>
                </div>
              </div>
            ))}

            {/* More properties CTA */}
            <div className="glass-card p-5 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 relative">
                  <Image src="/staff-1.png" alt="" fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: '#111827' }}>他の物件もご紹介できます</p>
                  <p className="text-xs" style={{ color: '#6b7280' }}>
                    ご要望に合わせて、さらに多くの物件をご紹介します。専任担当者にお問い合わせください。
                  </p>
                </div>
              </div>
              <button className="btn-secondary" style={{ fontSize: 13, padding: '10px 16px', width: 296, marginLeft: 'auto', marginRight: 'auto' }}>
                物件相談をする
              </button>
            </div>

            {/* Specialist CTA */}
            <div className="rounded-2xl p-4 flex items-start gap-3"
              style={{ background: 'linear-gradient(160deg, #5b7fe0 0%, #1e3a8a 100%)' }}>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Image src="/phone-flip.svg" alt="" width={20} height={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-1">シャープファイナンス専門サポート</p>
                <p className="text-xs mb-3" style={{ color: '#bfdbfe' }}>
                  物件選びから融資まで、医師開業専門のスタッフが伴走します。
                </p>
                <button className="text-sm font-semibold text-white underline">
                  今すぐ相談する →
                </button>
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
      </div>
    </PhoneShell>
  );
}
