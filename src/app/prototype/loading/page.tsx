'use client';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { PhoneShell } from '@/components/PhoneShell';

export default function LoadingPage() {
  return (
    <Suspense fallback={null}>
      <LoadingPageInner />
    </Suspense>
  );
}

function LoadingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const embed = searchParams.get('embed') === '1';

  useEffect(() => {
    const timer = setTimeout(() => router.push(embed ? '/prototype/results?embed=1' : '/prototype/results'), 3500);
    return () => clearTimeout(timer);
  }, [router, embed]);

  return (
    <PhoneShell>
      <div className="relative w-full min-h-[844px] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: '#091946' }}>

        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', filter: 'blur(60px)' }} />
        </div>

        <div className="flex flex-col items-center gap-8 z-10">
          <div className="flex items-end">
            <Image src="/mascot-1.png" alt="" width={104} height={104} className="mascot-float"
              style={{ width: 104, height: 'auto', filter: 'drop-shadow(0 0 20px rgba(147,197,253,0.65))', animationDelay: '0s' }} />
            <Image src="/mascot-2.png" alt="" width={104} height={104} className="mascot-float"
              style={{ width: 104, height: 'auto', filter: 'drop-shadow(0 0 20px rgba(147,197,253,0.65))', animationDelay: '0.7s', marginLeft: -14 }} />
          </div>

          <div className="text-center">
            <p className="text-xl font-bold text-white mb-2">診断中...</p>
            <p className="text-sm" style={{ color: '#93c5fd' }}>
              あなたの回答をAIが分析しています。<br />少々お待ちください。
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div className="h-full rounded-full loading-bar-fill"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #2563eb)' }} />
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}
