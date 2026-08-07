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

type ConfirmMode = 'menu' | 'hide' | 'delete';


export function ClientCardGrid({ clients }: { clients: ClientInfo[] }) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [deletedSlugs, setDeletedSlugs] = useState<Set<string>>(new Set());
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>('menu');
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('hidden_clients');
    if (stored) {
      try { setHidden(new Set(JSON.parse(stored))); } catch { /* ignore */ }
    }
  }, []);

  const openMenu = (slug: string) => {
    setConfirmSlug(slug);
    setConfirmMode('menu');
  };

  const closeMenu = () => {
    setConfirmSlug(null);
    setConfirmMode('menu');
  };

  const hideClient = (slug: string) => {
    const next = new Set([...hidden, slug]);
    setHidden(next);
    localStorage.setItem('hidden_clients', JSON.stringify([...next]));
    closeMenu();
  };

  const deleteClient = async (slug: string) => {
    setDeletingSlug(slug);
    try {
      const res = await fetch('/api/delete-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(`削除に失敗しました: ${data.error ?? res.status}`);
        return;
      }
      setDeletedSlugs(prev => new Set([...prev, slug]));
      closeMenu();
    } catch (e) {
      alert(`削除に失敗しました: ${String(e)}`);
    } finally {
      setDeletingSlug(null);
    }
  };

  const restoreAll = () => {
    setHidden(new Set());
    localStorage.removeItem('hidden_clients');
  };

  const visible = clients.filter((c) => !hidden.has(c.slug) && !deletedSlugs.has(c.slug));

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
          <div key={client.slug} style={{ position: 'relative', height: '100%' }}>
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
                  minWidth: 168,
                }}
              >
                {confirmMode === 'menu' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <button
                      onClick={() => setConfirmMode('hide')}
                      style={{ background: 'none', border: 'none', borderRadius: 6, padding: '7px 10px', fontSize: 13, cursor: 'pointer', color: '#374151', textAlign: 'left', fontWeight: 500 }}
                    >
                      {'非表示にする'}
                    </button>
                    <button
                      onClick={() => setConfirmMode('delete')}
                      style={{ background: 'none', border: 'none', borderRadius: 6, padding: '7px 10px', fontSize: 13, cursor: 'pointer', color: '#ef4444', textAlign: 'left', fontWeight: 500 }}
                    >
                      {'削除する'}
                    </button>
                    <button
                      onClick={closeMenu}
                      style={{ background: 'none', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer', color: '#9ca3af', textAlign: 'left' }}
                    >
                      {'キャンセル'}
                    </button>
                  </div>
                )}
                {confirmMode === 'hide' && (
                  <>
                    <p style={{ fontSize: 13, color: '#111827', fontWeight: 600, margin: '0 0 10px' }}>
                      {'非表示にしますか？'}
                    </p>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => hideClient(client.slug)}
                        style={{ background: '#6b7280', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
                      >
                        {'非表示'}
                      </button>
                      <button
                        onClick={closeMenu}
                        style={{ background: '#f3f4f6', color: '#6b7280', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}
                      >
                        {'戻る'}
                      </button>
                    </div>
                  </>
                )}
                {confirmMode === 'delete' && (
                  <>
                    <p style={{ fontSize: 13, color: '#111827', fontWeight: 600, margin: '0 0 4px' }}>
                      {'完全に削除しますか？'}
                    </p>
                    <p style={{ fontSize: 11, color: '#6b7280', margin: '0 0 10px', lineHeight: 1.5 }}>
                      {`「${client.name}」のデータを完全に削除します。同じスラッグで再構築可能です。`}
                    </p>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => deleteClient(client.slug)}
                        disabled={deletingSlug === client.slug}
                        style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: deletingSlug === client.slug ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: deletingSlug === client.slug ? 0.6 : 1 }}
                      >
                        {deletingSlug === client.slug ? '削除中...' : '削除'}
                      </button>
                      <button
                        onClick={closeMenu}
                        disabled={deletingSlug === client.slug}
                        style={{ background: '#f3f4f6', color: '#6b7280', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}
                      >
                        {'戻る'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            <Link
              href={`/${client.slug}`}
              style={{
                background: '#ffffff',
                border: 'none',
                borderRadius: 24,
                padding: 0,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = '';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{ display: 'flex', height: 40, flexShrink: 0 }}>
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
              <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>{client.name}</p>
                    <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2, margin: '2px 0 0' }}>{client.slug}</p>
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); confirmSlug === client.slug ? closeMenu() : openMenu(client.slug); }}
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
                <p style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#6b7280',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  flex: 1,
                  margin: '0 0 16px',
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

