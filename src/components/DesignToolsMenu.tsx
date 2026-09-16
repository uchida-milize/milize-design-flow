'use client';
import { useEffect, useRef, useState } from 'react';

interface Tool {
  label: string;
  href: string;
  external?: boolean;
}

const TOOLS: Tool[] = [
  { label: 'Client Production Portal', href: 'https://milize-design-flow.vercel.app/' },
  { label: 'Proposal Generator', href: 'https://milize-pptx-web.vercel.app/', external: true },
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
        className="font-bold text-sm"
        style={{
          color: '#111827', letterSpacing: '-0.01em', background: 'none', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: 0,
        }}
      >
        Design Tools
        <span style={{
          fontSize: 9, color: '#9ca3af', transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.15s ease',
        }}>
          ▾
        </span>
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
              target={tool.external ? '_blank' : undefined}
              rel={tool.external ? 'noopener noreferrer' : undefined}
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
