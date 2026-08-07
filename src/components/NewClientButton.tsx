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

type Step = 'form' | 'urls' | 'generating';

const PURPOSES = [
  { key: 'color',     label: 'カラー' },
  { key: 'ci',        label: 'ロゴ・CI' },
  { key: 'font',      label: 'フォント' },
  { key: 'form',      label: 'フォーム' },
] as const;
type PurposeKey = typeof PURPOSES[number]['key'];

interface UrlItem {
  url: string;
  checked: boolean;
  purposes: Record<PurposeKey, boolean>;
  isPreset?: boolean;
}

/** %XX エンコードが多い（日本語パス等）URLを判定 */
function isHeavilyEncoded(url: string): boolean {
  const encoded = (url.match(/%[0-9A-Fa-f]{2}/g) ?? []).length;
  return encoded > 6;
}

/** URLリストを初期化（エンコードURL除外 + デフォルト目的を設定） */
function initUrlItems(urls: string[]): { items: UrlItem[]; excluded: number } {
  const items: UrlItem[] = [];
  let excluded = 0;
  for (const url of urls) {
    if (isHeavilyEncoded(url)) { excluded++; continue; }
    // Wikipedia: ロゴ・CIのみデフォルトON
    const isWiki = url.includes('wikipedia.org');
    items.push({
      url,
      checked: true,
      purposes: {
        color: !isWiki,
        ci:    true,
        font:  !isWiki,
        form:  !isWiki,
      },
    });
  }
  return { items, excluded };
}

export function NewClientButton() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState({ company_name: '', client_slug: '' });
  const [genProgress, setGenProgress] = useState(0);
  const [genStatus, setGenStatus] = useState('');
  const [taskId, setTaskId] = useState('');
  const [workflowRunId, setWorkflowRunId] = useState('');
  const [formToken, setFormToken] = useState('');
  const [urlItems, setUrlItems] = useState<UrlItem[]>([]);
  const [excludedCount, setExcludedCount] = useState(0);
  const [urlSelectionDone, setUrlSelectionDone] = useState(false);
  const [presetUrls, setPresetUrls] = useState(['', '', '']);
  const router = useRouter();

  function reset() {
    setForm({ company_name: '', client_slug: '' });
    setStep('form');
    setGenProgress(0);
    setGenStatus('');
    setTaskId('');
    setWorkflowRunId('');
    setFormToken('');
    setUrlItems([]);
    setExcludedCount(0);
    setUrlSelectionDone(false);
    setPresetUrls(['', '', '']);
  }

  /** 第1フェーズ: /api/dify-create を実行し、interrupted で止まったら urls ステップへ */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep('generating');
    setGenProgress(5);
    setGenStatus('Difyワークフローを起動中...');

    const slug = form.client_slug;
    const hidden: string[] = JSON.parse(localStorage.getItem('hidden_clients') || '[]');
    localStorage.setItem('hidden_clients', JSON.stringify(hidden.filter(s => s !== slug)));

    try {
      const filledPresets = presetUrls.map(u => u.trim()).filter(Boolean);
      const res = await fetch('/api/dify-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: form.company_name,
          client_slug: slug,
          ...(filledPresets[0] ? { url1: filledPresets[0] } : {}),
          ...(filledPresets[1] ? { url2: filledPresets[1] } : {}),
          ...(filledPresets[2] ? { url3: filledPresets[2] } : {}),
        }),
      });

      const interrupted = await consumeSseStream(res, (data) => {
        if (data.interrupted) {
          // 人間の入力ノードで停止 → URL選択ステップへ
          setTaskId(typeof data.task_id === 'string' ? data.task_id : '');
          setWorkflowRunId(typeof data.workflow_run_id === 'string' ? data.workflow_run_id : '');
          setFormToken(typeof data.form_token === 'string' ? data.form_token : '');
          const urls: string[] = Array.isArray(data.urls) ? (data.urls as string[]) : [];
          // Wikipedia URL（会社名から自動生成・常に先頭に追加）
          const wikiUrl = `https://ja.wikipedia.org/wiki/${form.company_name}`;
          const wikiItem: UrlItem = {
            url: wikiUrl,
            checked: true,
            purposes: { color: false, ci: true, font: false, form: false },
            isPreset: true,
          };
          // ユーザー指定URL（重複排除してDify URLリストの先頭に追加）
          const presets = presetUrls.map(u => u.trim()).filter(Boolean);
          const presetItems: UrlItem[] = presets.map(url => ({
            url,
            checked: true,
            purposes: { color: true, ci: true, font: true, form: true },
            isPreset: true,
          }));
          // DifyのURLからWikipedia・ユーザー指定を除外（重複排除）
          const difyUrls = urls.filter(u => !presets.includes(u) && u !== wikiUrl);
          const { items, excluded } = initUrlItems(difyUrls);
          setUrlItems([wikiItem, ...presetItems, ...items]);
          setExcludedCount(excluded);
          setGenProgress(typeof data.progress === 'number' ? data.progress : 50);
          setStep('urls');
          return true; // signal: interrupted
        }
        return false;
      });

      if (!interrupted) {
        // 中断なし = ワークフローが1フェーズで完走（deploy_done は consumeSseStream 内で処理済み）
        // do nothing, handled inside
      }
    } catch {
      setGenStatus('接続エラーが発生しました');
    }
  }

  /** 第2フェーズ: 選択URLを /api/dify-resume に送る */
  async function handleResume() {
    setUrlSelectionDone(true);
    setStep('generating');
    setGenStatus('URLを送信してワークフローを再開中...');

    // 選択済みURLを「URL [目的1,目的2]」形式にして送信
    const selected = urlItems
      .filter(u => u.checked)
      .map(u => {
        const tags = PURPOSES.filter(p => u.purposes[p.key]).map(p => p.label);
        return tags.length > 0 ? `${u.url} [${tags.join(',')}]` : u.url;
      });

    try {
      const res = await fetch('/api/dify-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_id: taskId,
          workflow_run_id: workflowRunId,
          form_token: formToken,
          selected_urls: selected,
          company_name: form.company_name,
          client_slug: form.client_slug,
        }),
      });

      await consumeSseStream(res, () => false);
    } catch {
      setGenStatus('接続エラーが発生しました');
    }

    // フォールバック: deploy_done が来なかった場合（タイムアウト等）も
    // モーダルを閉じてリフレッシュする（deploy_done 済みなら reset() でクリア済みなので無害）
    setGenProgress(100);
    setGenStatus('完了しました。ページを更新します...');
    await new Promise(r => setTimeout(r, 1500));
    setOpen(false);
    reset();
    router.refresh();
  }

  /**
   * SSEストリームを消費し、各イベントを処理する。
   * onData が true を返したら「中断」として読み取りを止める。
   * deploy_done を受け取ったら modal を閉じてリフレッシュ。
   * Returns true if stream was interrupted by human_input.
   */
  async function consumeSseStream(
    res: Response,
    onData: (data: Record<string, unknown>) => boolean,
    timeoutMs = 320_000,
  ): Promise<boolean> {
    if (!res.ok || !res.body) {
      setGenStatus(`接続エラー: ${res.status}`);
      return false;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let lineBuffer = '';
    let difyDone = false;
    let lastActivity = Date.now();

    // タイムアウト監視
    const timeoutId = setTimeout(() => {
      reader.cancel().catch(() => {});
    }, timeoutMs);

    while (true) {
      const { done, value } = await reader.read().catch(() => ({ done: true, value: undefined }));
      if (done) break;
      lastActivity = Date.now();
      void lastActivity;
      lineBuffer += decoder.decode(value, { stream: true });
      const lines = lineBuffer.split('\n');
      lineBuffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        try {
          const data: Record<string, unknown> = JSON.parse(line.slice(6));
          if (typeof data.progress === 'number') setGenProgress(data.progress);
          if (typeof data.status === 'string') setGenStatus(data.status);
          if (data.dify_done) difyDone = true;
          if (data.deploy_done) {
            setGenProgress(100);
            setGenStatus('デプロイ完了！');
            await new Promise(r => setTimeout(r, 1200));
            setOpen(false); reset(); router.refresh();
            return false;
          }
          if (data.error) setGenStatus('エラー: ' + data.error);

          if (onData(data)) { clearTimeout(timeoutId); return true; } // interrupted
        } catch { /* skip */ }
      }
    }

    clearTimeout(timeoutId);

    // dify_done: Vercel のポーリングを自前で実施
    if (difyDone) {
      const slug = form.client_slug;
      let deployed = false;
      let attempts = 0;
      while (!deployed && attempts < 60) {
        setGenStatus('Vercelデプロイ待機中...');
        setGenProgress(prev => Math.min(95, prev + 0.7));
        await new Promise(r => setTimeout(r, 5000));
        attempts++;
        try {
          const r = await fetch('/' + slug + '?_t=' + Date.now(), { method: 'HEAD', cache: 'no-store' });
          if (r.ok) deployed = true;
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

    return false;
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
          background: '#f9fafb', border: '2px dashed #d1d5db', borderRadius: '24px',
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
        <a
          href="https://milize-design-flow.vercel.app/milize-asset-portal"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px', textDecoration: 'underline', cursor: 'pointer' }}
        >
          テンプレート
        </a>
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
            width: step === 'urls' ? '560px' : '480px', maxWidth: '92vw',
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
                  <div style={{ marginBottom: '18px' }}>
                    <label style={labelStyle}>{'スラッグ（URL用ID・英小文字とハイフンのみ）'}</label>
                    <input style={inputStyle} placeholder={'例：ge'} value={form.client_slug}
                      onChange={e => setForm(f => ({ ...f, client_slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))} required />
                    {form.client_slug && (
                      <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>
                        URL: milize-design-flow.vercel.app/{form.client_slug}
                      </div>
                    )}
                  </div>
                  <div style={{ marginBottom: '28px' }}>
                    <label style={labelStyle}>{'参照URL（任意・最大3件 — URL選択画面の先頭に表示されます）'}</label>
                    {[0, 1, 2].map(i => (
                      <input
                        key={i}
                        style={{ ...inputStyle, marginBottom: i < 2 ? '8px' : 0 }}
                        placeholder={`URL ${i + 1}（例：https://www.example.com）`}
                        value={presetUrls[i]}
                        onChange={e => setPresetUrls(p => p.map((v, j) => j === i ? e.target.value : v))}
                        type="url"
                      />
                    ))}
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

            {/* Step 2: URL選択 */}
            {step === 'urls' && (
              <>
                <StepIndicator current={2} />
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>{'参照URLを選択'}</h2>
                <p style={{ fontSize: '14px', color: '#777', marginBottom: '20px' }}>
                  {'Difyがリサーチ対象として収集したURLです。使用するURLを選んで生成を続行してください。'}
                </p>

                {urlItems.length === 0 ? (
                  <div style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                    URLが取得できませんでした。このまま続行するとDifyのデフォルトURLを使用します。
                  </div>
                ) : (
                  <div style={{ marginBottom: '20px' }}>
                    {/* 一括操作 */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'center' }}>
                      <button onClick={() => setUrlItems(u => u.map(i => ({ ...i, checked: true })))}
                        style={{ fontSize: '12px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', textDecoration: 'underline' }}>
                        すべて選択
                      </button>
                      <span style={{ color: '#d1d5db' }}>|</span>
                      <button onClick={() => setUrlItems(u => u.map(i => ({ ...i, checked: false })))}
                        style={{ fontSize: '12px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', textDecoration: 'underline' }}>
                        すべて解除
                      </button>
                      <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#9ca3af' }}>
                        {urlItems.filter(u => u.checked).length} / {urlItems.length} 件選択
                        {excludedCount > 0 && <span style={{ color: '#f59e0b', marginLeft: 6 }}>（エンコードURL {excludedCount}件除外）</span>}
                      </span>
                    </div>

                    {/* 目的ラベル凡例 */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', color: '#9ca3af', alignSelf: 'center' }}>参照目的：</span>
                      {PURPOSES.map(p => (
                        <span key={p.key} style={{ fontSize: '11px', padding: '2px 8px', borderRadius: 999, background: '#f3f4f6', color: '#6b7280' }}>{p.label}</span>
                      ))}
                    </div>

                    {/* URLリスト */}
                    <div style={{ maxHeight: '340px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                      {urlItems.map((item, idx) => (
                        <div key={item.url} style={{
                          padding: '10px 14px',
                          borderBottom: idx < urlItems.length - 1 ? '1px solid #f3f4f6' : 'none',
                          background: item.checked ? '#f8faff' : '#fff',
                          transition: 'background 0.1s',
                        }}>
                          {/* URL行 */}
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={e => setUrlItems(u => u.map((i, j) => j === idx ? { ...i, checked: e.target.checked } : i))}
                              style={{ marginTop: '3px', flexShrink: 0, cursor: 'pointer' }}
                            />
                            {item.url.includes('wikipedia.org') ? (
                              <span style={{
                                flexShrink: 0, fontSize: '10px', fontWeight: 700,
                                padding: '1px 6px', borderRadius: 999,
                                background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe',
                                marginTop: '2px',
                              }}>Wiki</span>
                            ) : item.isPreset && (
                              <span style={{
                                flexShrink: 0, fontSize: '10px', fontWeight: 700,
                                padding: '1px 6px', borderRadius: 999,
                                background: '#fef3c7', color: '#d97706', border: '1px solid #fde68a',
                                marginTop: '2px',
                              }}>指定</span>
                            )}
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: '12px', color: '#2563eb', wordBreak: 'break-all', lineHeight: 1.5, textDecoration: 'none' }}
                              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                            >
                              {item.url}
                            </a>
                          </div>
                          {/* 目的タグ（チェック済みURLのみ表示） */}
                          {item.checked && (
                            <div style={{ display: 'flex', gap: '6px', paddingLeft: '22px', flexWrap: 'wrap' }}>
                              {PURPOSES.map(p => {
                                const active = item.purposes[p.key];
                                return (
                                  <button
                                    key={p.key}
                                    onClick={() => setUrlItems(u => u.map((i, j) => j === idx
                                      ? { ...i, purposes: { ...i.purposes, [p.key]: !i.purposes[p.key] } }
                                      : i
                                    ))}
                                    style={{
                                      fontSize: '11px', padding: '2px 10px', borderRadius: 999,
                                      border: `1px solid ${active ? '#2563eb' : '#e5e7eb'}`,
                                      background: active ? '#eff6ff' : '#f9fafb',
                                      color: active ? '#2563eb' : '#9ca3af',
                                      cursor: 'pointer', fontWeight: active ? 600 : 400,
                                      transition: 'all 0.1s',
                                    }}
                                  >
                                    {active ? '✓ ' : ''}{p.label}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => { setOpen(false); reset(); }}
                    style={{ flex: 1, padding: '12px', border: '1.5px solid #e0e0e0', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: '#555' }}>
                    {'キャンセル'}
                  </button>
                  <button type="button" onClick={handleResume}
                    style={{ flex: 2, padding: '12px', border: 'none', borderRadius: '8px', background: '#111', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
                    {'この内容で生成 →'}
                  </button>
                </div>
              </>
            )}

            {/* Step 3: 生成中 */}
            {step === 'generating' && (
              <>
                <StepIndicator current={urlSelectionDone ? 3 : 2} />
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

function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const steps = ['入力・検証', 'URL選択', '生成'];
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
              background: done || active ? '#22c55e' : '#e5e7eb',
              color: done || active ? '#fff' : '#9ca3af',
              flexShrink: 0,
            }}>
              {done ? '✓' : num}
            </div>
            <span style={{ fontSize: '12px', fontWeight: active ? 600 : 400, color: active ? '#22c55e' : '#9ca3af' }}>{label}</span>
            {i < steps.length - 1 && <div style={{ width: '20px', height: '1px', background: '#e5e7eb', margin: '0 2px' }} />}
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
