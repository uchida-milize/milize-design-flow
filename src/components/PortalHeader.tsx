'use client';
import Link from 'next/link';
import Image from 'next/image';

type NavKey = 'home' | 'prototype' | 'guidelines' | 'components' | 'screens';

const NAV_ITEMS: { key: NavKey; label: string; href: string }[] = [
  { key: 'home', label: 'ホーム', href: '/' },
  { key: 'prototype', label: 'プロトタイプ', href: '/prototype' },
  { key: 'guidelines', label: 'ガイドライン', href: '/guidelines' },
  { key: 'components', label: 'コンポーネント', href: '/components' },
  { key: 'screens', label: 'スクリーン', href: '/screens' },
];

export function PortalHeader({ active }: { active: NavKey }) {
  const isPrototype = active === 'prototype';

  return (
    <header
      style={{
        background: isPrototype ? '#091946' : '#f7f9fc',
        borderBottom: isPrototype ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: 1120, padding: '16px 24px' }}
      >
        <Link href="/" className="flex items-center">
          <Image
            src={isPrototype ? '/logo_yoko.svg' : '/logo_yoko_blue.svg'}
            alt="DOCTORCOMPASS"
            width={168}
            height={18}
          />
        </Link>
        <nav className="flex items-center" style={{ gap: 28 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm"
                style={{
                  color: isActive
                    ? (isPrototype ? '#ffffff' : '#091946')
                    : (isPrototype ? 'rgba(255,255,255,0.6)' : '#6b7280'),
                  fontWeight: isActive ? 600 : 500,
                  paddingBottom: 4,
                  borderBottom: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                  transition: 'color 0.15s ease',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
