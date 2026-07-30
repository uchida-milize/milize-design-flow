'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NewClientButton } from '@/components/NewClientButton';

type ClientInfo = {
  slug: string;
  name: string;
  colors: Array<{ hex: string; ratio: number }>;
  description: string;
};


export function ClientCardGrid({ clients }: { clients: ClientInfo[] }) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('hidden_clients');
    if (stored) {
      try { setHidden(new Set(JSON.parse(stored))); } catch { /* ignore */ }
    }
  }, []);

  const hideClient = (slug: string) => {
    const next = new Set([...hidden, slug]);
    setHidden(next);
    localStorage.setItem('hidden_clients', JSON.stringify([...next]));
    setConfirmSlug(null);
  };

  const restoreAll = () => {
    setHidden(new Set());
    localStorage.removeItem('hidden_clients');
  };

  const visible = clients.filter((c) => !hidden.has(c.slug));

  return (
    <>
      {hidden.size > 0 && (
        <div style={{ textAlign: 'right', fontSize: 12, color: '#9ca3af', marginBottom: 10 }}>
          {hidden.size}
          {'件を非表示中'} {'·'}{' '}
          <button
            onClick={restoreAll}
            style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: 12 }}
          >
            {'全て表示に戻す'}
          </button>
        </div>
      )}
      <div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}
      >
        <NewClientButton />
        {visible.map((client) => (
          <div key={client.slug} style={{ position: 'relative' }}>
            {confirmSlug === client.slug && (
              <div
                style={{
                  position: 'absolute',
                  top: 102,
                  right: 22,
                  zIndex: 20,
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 10,
                  padding: '12px 14px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  minWidth: 160,
                }}
              >
                <p style={{ fontSize: 13, color: '#111827', fontWeight: 600, margin: '0 0 10px' }}>
                  {'非表示にしますか？'}
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => hideClient(client.slug)}
                    style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
                  >
                    {'非表示'}
                  </button>
                  <button
                    onClick={() => setConfirmSlug(null)}
                    style={{ background: '#f3f4f6', color: '#6b7280', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}
                  >
                    {'キャンセル'}
                  </button>
                </div>
              </div>
            )}
            <Link
              href={`/${client.slug}`}
              className="block"
              style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 0, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', textDecoration: 'none' }}
            >
              <div style={{ display: 'flex', height: 40, borderBottom: '1px solid #c8c8c8', boxShadow: 'inset 0 0 0 1px #c8c8c8' }}>
                {client.colors.map((c) => (
                  <div
                    key={c.hex}
                    style={{
                      flex: c.ratio,
                      backgroundColor: c.hex,
                    }}
                  />
                ))}
              </div>
              <div style={{ padding: 28 }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold" style={{ fontSize: 18, color: '#111827' }}>{client.name}</p>
                    <p className="text-xs" style={{ color: '#9ca3af', marginTop: 2 }}>{client.slug}</p>
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirmSlug(confirmSlug === client.slug ? null : client.slug); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      width: 26,
                      height: 26,
                      fontSize: 16,
                      color: '#9ca3af',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: 0,
                    }}
                    title={'非表示にする'}
                  >
                    {'︙'}
                  </button>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{
                  color: '#6b7280',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {client.description || 'デザインガイドライン・コンポーネントカタログを確認できます。'}
                </p>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'nowrap', overflow: 'hidden' }}>
                  {['ガイドラインリサーチ', 'コンポーネント'].map((cat) => (
                    <span
                      key={cat}
                      style={{
                        background: '#f3f4f6',
                        color: '#6b7280',
                        borderRadius: 999,
                        padding: '3px 8px',
                        fontSize: '0.7rem',
                        whiteSpace: 'nowrap',
                        fontWeight: 500,
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

