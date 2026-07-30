'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MODAL_KEYFRAMES = `
@keyframes ncb-backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes ncb-modal-in {
  0%   { opacity: 0; transform: scale(0.86) translateY(20px); filter: blur(8px); }
  55%  { opacity: 1; transform: scale(1.03) translateY(-3px); filter: blur(0px); }
  75%  { transform: scale(0.99) translateY(1px); }
  100% { opacity: 1; transform: scale(1)    translateY(0);   filter: blur(0px); }
}
`;

type Step = 'form' | 'generating';

export function NewClientButton() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState({ company_name: '', client_slug: '' });
  const [genProgress, setGenProgress] = useState(0);
  const [genStatus, setGenStatus] = useState('');
  const router = useRouter();

  function reset() {
    setForm({ company_name: '', client_slug: '' });
    setStep('form');
    setGenProgress(0);
    setGenStatus('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep('generating');
    setGenProgress(5);
    setGenStatus('Difyワークフローを起動中...');

    const slug = form.client_slug;
    const hidden: string[] = JSON.parse(localStorage.getItem('hidden_clients') || '[]');
    localStorage.setItem('hidden_clients', JSON.stringify(hidden.filter(s => s !== slug)));

    let difyDone = false;
    try {
      const res = await fetch('/api/dify-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: form.company_name,
          client_slug: slug,
        }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let lineBuffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        lineBuffer += decoder.decode(value, { stream: true });
        const lines = lineBuffer.split('\n');
        lineBuffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.progress !== undefined) setGenProgress(data.progress);
            if (data.status) setGenStatus(data.status);
            if (data.dify_done) { difyDone = true; }
            if (data.deploy_done) {
              setGenProgress(100);
              setGenStatus('デプロイ完了！');
              await new Promise(r => setTimeout(r, 1200));
              setOpen(false); reset(); router.refresh();
              return;
            }
            if (data.error) { setGenStatus('エラー: ' + data.error); }
          } catch { /* skip */ }
        }
      }

      if (difyDone) {
        let deployed = false;
        let attempts = 0;
        while (!deployed && attempts < 60) {
          setGenStatus('Vercelデプロイ待機中...');
          setGenProgress(prev => Math.min(95, prev + 0.7));
          await new Promise(r => setTimeout(r, 5000));
          attempts++;
          try {
            const r = await fetch('/' + slug + '?_t=' + Date.now(), { method: 'HEAD', cache: 'no-store' });
            if (r.ok) { deployed = true; }
          } catch { /* ignore */ }
        }
        if (deployed) {
          setGenProgress(100);
          setGenStatus('デプロイ完了！');
          await new Promise(r => setTimeout(r, 1200));
          setOpen(false); reset(); router.refresh();
        } else {
          setGenStatus('デプロイタイムアウト');
        }
      }
    } catch {
      setGenStatus('接続エラーが発生しました');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid #e0e0e0', borderRadius: '8px',
    fontSize: '14px', outline: 'none',
    fontFamily: 'inherit', boxSizing: 'border-box', background: '#fafafa',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '12px', fontWeight: 600,
    color: '#555', marginBottom: '6px',
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MODAL_KEYFRAMES }} />

      {/* トリガーカード */}
      <div
        onClick={() => { reset(); setOpen(true); }}
        style={{
          background: '#f9fafb', border: '2px dashed #d1d5db', borderRadius: '12px',
          padding: '28px', cursor: 'pointer', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '12px', minHeight: '140px',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#9ca3af'; (e.currentTarget as HTMLDivElement).style.background = '#f3f4f6'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#d1d5db'; (e.currentTarget as HTMLDivElement).style.background = '#f9fafb'; }}
      >
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#9ca3af' }}>+</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#374151' }}>{'新規クライアント'}</div>
          <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>Difyで自動生成</div>
        </div>
      </div>

      {open && (
        <div
          onClick={e => { if (step === 'form' && e.target === e.currentTarget) { setOpen(false); reset(); } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(255,255,255,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'ncb-backdrop-in 0.3s ease forwards',
          }}
        >
          <div style={{
            background: '#fff', borderRadius: '20px', padding: '40px',
            width: '480px', maxWidth: '92vw',
            boxShadow: ['0 0 0 1px rgba(255,255,255,0.5)', '0 0 30px 14px rgba(255,255,255,0.55)', '0 32px 80px rgba(0,0,0,0.22)'].join(', '),
            animation: 'ncb-modal-in 0.52s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}>

            {/* Step 1: フォーム */}
            {step === 'form' && (
              <>
                <StepIndicator current={1} />
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>{'新規クライアント追加'}</h2>
                <p style={{ fontSize: '14px', color: '#777', marginBottom: '28px' }}>{'会社名とスラッグを入力してポータルを生成します'}</p>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '18px' }}>
                    <label style={labelStyle}>{'会社名（日本語）'}</label>
                    <input style={inputStyle} placeholder={'例：ゼネラル・エレクトリック'} value={form.company_name}
                      onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} required />
                  </div>
                  <div style={{ marginBottom: '28px' }}>
                    <label style={labelStyle}>{'スラッグ（URL用ID・英小文字とハイフンのみ）'}</label>
                    <input style={inputStyle} placeholder={'例：ge'} value={form.client_slug}
                      onChange={e => setForm(f => ({ ...f, client_slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))} required />
                    {form.client_slug && (
                      <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>
                        URL: milize-design-flow.vercel.app/{form.client_slug}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="button" onClick={() => { setOpen(false); reset(); }}
                      style={{ flex: 1, padding: '12px', border: '1.5px solid #e0e0e0', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: '#555' }}>
                      {'キャンセル'}
                    </button>
                    <button type="submit"
                      style={{ flex: 2, padding: '12px', border: 'none', borderRadius: '8px', background: '#111', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
                      {'生成開始 →'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Step 2: 生成中 */}
            {step === 'generating' && (
              <>
                <StepIndicator current={2} />
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>{'ポータルを生成中...'}</h2>
                <p style={{ fontSize: '14px', color: '#777', marginBottom: '32px' }}>
                  {form.company_name}{'のポータルをDifyが構築しています'}
                </p>
                <ProgressBar progress={genProgress} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#777' }}>{genStatus}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>{Math.round(genProgress)}%</span>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}

function StepIndicator({ current }: { current: 1 | 2 }) {
  const steps = ['入力', '生成'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
      {steps.map((label, i) => {
        const num = i + 1;
        const active = num === current;
        const done = num < current;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '22px', height: '22px', borderRadius: '50%', fontSize: '11px', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: done ? '#22c55e' : active ? '#111' : '#e5e7eb',
              color: done || active ? '#fff' : '#9ca3af',
              flexShrink: 0,
            }}>
              {done ? '✓' : num}
            </div>
            <span style={{ fontSize: '12px', fontWeight: active ? 600 : 400, color: active ? '#111' : '#9ca3af' }}>{label}</span>
            {i < steps.length - 1 && <div style={{ width: '24px', height: '1px', background: '#e5e7eb', margin: '0 2px' }} />}
          </div>
        );
      })}
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div style={{ background: '#f3f4f6', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: '999px',
        background: 'linear-gradient(90deg, #111 0%, #555 100%)',
        width: progress + '%', transition: 'width 0.6s ease',
      }} />
    </div>
  );
}
