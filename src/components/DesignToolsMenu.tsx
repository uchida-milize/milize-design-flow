'use client';
import { useEffect, useRef, useState } from 'react';

interface Tool {
  label: string;
  href: string;
}

const TOOLS: Tool[] = [
  { label: 'Client Production Portal', href: 'https://milize-design-flow.vercel.app/' },
  { label: 'Proposal Generator', href: 'https://milize-pptx-web.vercel.app/' },
];

/** ヘッダー左上のタイトルを「Design Tools」ドロップダウンにし、社内ツール群への導線をまとめる */
export function DesignToolsMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Design Tools"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, padding: 0,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <rect width="30" height="30" rx="8" fill="#111827" />
          <text
            x="15" y="21" textAnchor="middle"
            fontFamily="Arial, Helvetica, sans-serif" fontWeight={700} fontSize={15}
            fill="#ffffff"
          >
            D&apos;
          </text>
        </svg>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth={2.75}
          strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease', flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 10,
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10,
          boxShadow: '0 12px 32px rgba(0,0,0,0.10)', minWidth: 230, zIndex: 50, overflow: 'hidden',
        }}>
          {TOOLS.map((tool, i) => (
            <a
              key={tool.href}
              href={tool.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block', padding: '11px 14px', fontSize: 13, fontWeight: 500,
                color: '#374151', textDecoration: 'none',
                borderBottom: i < TOOLS.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#f9fafb'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
            >
              {tool.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
