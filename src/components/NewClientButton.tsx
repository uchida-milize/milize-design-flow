'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function NewClientButton() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ company_name: '', client_slug: '' });
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const router = useRouter();

  function reset() {
    setForm({ company_name: '', client_slug: '' });
    setProgress(0);
    setRunning(false);
    setStatusMsg('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRunning(true);
    setProgress(5);
    setStatusMsg('Difyワークフローを起動中...');

    try {
      const res = await fetch('/api/dify-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        for (const line of text.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.progress !== undefined) setProgress(data.progress);
            if (data.status) setStatusMsg(data.status);
            if (data.done) {
              setProgress(100);
              setStatusMsg('完了！');
              await new Promise(r => setTimeout(r, 1200));
              setOpen(false);
              reset();
              router.refresh();
            }
            if (data.error) {
              setStatusMsg('エラー: ' + data.error);
              setRunning(false);
            }
          } catch {}
        }
      }
    } catch {
      setStatusMsg('接続エラーが発生しました');
      setRunning(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    background: '#fafafa',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#555',
    marginBottom: '6px',
  };

  return (
    <>
      <div
        onClick={() => { reset(); setOpen(true); }}
        style={{
          background: '#f9fafb',
          border: '2px dashed #d1d5db',
          borderRadius: '12px',
          padding: '28px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          minHeight: '140px',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = '#9ca3af';
          el.style.background = '#f3f4f6';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = '#d1d5db';
          el.style.background = '#f9fafb';
        }}
      >
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: '#e5e7eb', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '24px', color: '#9ca3af',
        }}>+</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#374151' }}>新規クライアント</div>
          <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>Difyで自動生成</div>
        </div>
      </div>

      {open && (
        <div
          onClick={e => { if (!running && e.target === e.currentTarget) setOpen(false); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            background: '#fff', borderRadius: '16px',
            padding: '40px', width: '480px', maxWidth: '90vw',
            boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
          }}>
            {!running ? (
              <>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
                  新規クライアント追加
                </h2>
                <p style={{ fontSize: '14px', color: '#777', marginBottom: '28px' }}>
                  会社名を入力するとDifyがポータルを自動生成します
                </p>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '18px' }}>
                    <label style={labelStyle}>会社名（日本語）</label>
                    <input
                      style={inputStyle}
                      placeholder="例：シャープファイナンス株式会社"
                      value={form.company_name}
                      onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: '28px' }}>
                    <label style={labelStyle}>スラッグ（URL用ID・英小文字とハイフンのみ）</label>
                    <input
                      style={inputStyle}
                      placeholder="例：sharp-finance-corp"
                      value={form.client_slug}
                      onChange={e => setForm(f => ({ ...f, client_slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
                      required
                    />
                    {form.client_slug && (
                      <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>
                        URL: milize-design-flow.vercel.app/{form.client_slug}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      style={{
                        flex: 1, padding: '12px', border: '1.5px solid #e0e0e0',
                        borderRadius: '8px', background: '#fff', cursor: 'pointer',
                        fontSize: '14px', fontWeight: 500, color: '#555',
                      }}
                    >キャンセル</button>
                    <button
                      type="submit"
                      style={{
                        flex: 2, padding: '12px', border: 'none',
                        borderRadius: '8px', background: '#111', cursor: 'pointer',
                        fontSize: '14px', fontWeight: 600, color: '#fff',
                      }}
                    >生成開始</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
                  ポータルを生成中...
                </h2>
                <p style={{ fontSize: '14px', color: '#777', marginBottom: '32px' }}>
                  {form.company_name} のポータルをDifyが構築しています
                </p>
                <div style={{
                  background: '#f3f4f6', borderRadius: '999px',
                  height: '8px', overflow: 'hidden', marginBottom: '12px',
                }}>
                  <div style={{
                    height: '100%', borderRadius: '999px',
                    background: 'linear-gradient(90deg, #111 0%, #555 100%)',
                    width: progress + '%',
                    transition: 'width 0.6s ease',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#777' }}>{statusMsg}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>{progress}%</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
