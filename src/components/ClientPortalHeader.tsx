'use client';
import Link from 'next/link';

type ClientNavKey = 'home' | 'guidelines' | 'components' | 'resources';

const NAV_ITEMS: { key: ClientNavKey; label: string; path: string }[] = [
  { key: 'home',       label: 'ホーム',         path: '' },
  { key: 'guidelines', label: 'ガイドライン',   path: '/guidelines' },
  { key: 'components', label: 'コンポーネント', path: '/components' },
  { key: 'resources',  label: 'リソース',       path: '/resources' },
];

interface ClientPortalHeaderProps {
  clientName: string;
  basePath: string; // e.g. '/sharp-finance'
  active: ClientNavKey;
  primaryColor?: string;
}

export function ClientPortalHeader({
  clientName,
  basePath,
  active,
  primaryColor = '#2563eb',
}: ClientPortalHeaderProps) {
  return (
    <header style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: 1120, padding: '16px 24px' }}
      >
        <div className="flex items-center" style={{ gap: 20 }}>
          <Link
            href="/"
            className="text-xs font-medium flex items-center"
            style={{ color: '#9ca3af', gap: 4 }}
          >
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path d="M13 5l-5 5 5 5" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            クライアント一覧
          </Link>
          <span style={{ color: '#e5e7eb' }}>|</span>
          <Link
            href={basePath}
            className="text-sm font-bold"
            style={{ color: primaryColor }}
          >
            {clientName}
          </Link>
        </div>

        <nav className="flex items-center" style={{ gap: 24 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                href={`${basePath}${item.path}`}
                className="text-sm"
                style={{
                  color: isActive ? '#111827' : '#6b7280',
                  fontWeight: isActive ? 600 : 500,
                  paddingBottom: 4,
                  borderBottom: isActive ? `2px solid ${primaryColor}` : '2px solid transparent',
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
