'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PortalHeader } from '@/components/PortalHeader';

function PrototypeLayoutInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const embed = searchParams.get('embed') === '1';

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!embed && <PortalHeader active="prototype" />}
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  );
}

export default function PrototypeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <PrototypeLayoutInner>{children}</PrototypeLayoutInner>
    </Suspense>
  );
}
