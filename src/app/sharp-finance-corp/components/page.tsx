'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ã·ã£ã¼ããã¡ã¤ãã³ã¹æ ªå¼ä¼ç¤¾';
const basePath = '/sharp-finance-corp';
const primaryColor = '#004A99';
const secondaryColor = '#0071BC';
const accentColor = '#F5A623';

const tabs = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'badges', label: 'Badges' },
  { id: 'cards', label: 'Cards' },
  { id: 'forms', label: 'Forms' },
];

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState('buttons');

  return (
    <div>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
        primaryColor={primaryColor}
      />

      <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            COMPONENTS
          </p>
          <h1 className="section-title">UIã³ã³ãã¼ãã³ã</h1>
          <p className="section-desc">
            ãã©ã³ãã«ã©ã¼ãé©ç¨ããå®è£æ¸ã¿ã³ã³ãã¼ãã³ãã®ãµã³ãã«éã§ãã
          </p>
        </div>

        <div className="tab-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="tab-item"
              onClick={() => setActiveTab(tab.id)}
              style={
                activeTab === tab.id
                  ? { background: primaryColor, color: '#ffffff' }
                  : undefined
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'buttons' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="component-card">
              <div className="component-card-label">.btn-primary</div>
              <div className="component-card-render">
                <button
                  style={{
                    background: primaryColor,
                    color: '#fff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  ãç³ãè¾¼ã¿ã¯ãã¡ã
                </button>
              </div>
              <div className="code-block">{`<button className="btn-primary">
  ãç³ãè¾¼ã¿ã¯ãã¡ã
</button>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.btn-secondary</div>
              <div className="component-card-render">
                <button
                  style={{
                    background: secondaryColor,
                    color: '#fff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  è©³ç´°ãè¦ã
                </button>
              </div>
              <div className="code-block">{`<button className="btn-secondary">
  è©³ç´°ãè¦ã
</button>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.btn-accent</div>
              <div className="component-card-render">
                <button
                  style={{
                    background: accentColor,
                    color: '#fff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  ä»ããç¸è«ãã
                </button>
              </div>
              <div className="code-block">{`<button className="btn-accent">
  ä»ããç¸è«ãã
</button>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.btn-outline</div>
              <div className="component-card-render">
                <button
                  style={{
                    background: 'transparent',
                    color: primaryColor,
                    border: `1px solid ${primaryColor}`,
                    padding: '10px 24px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  è³æããã¦ã³ã­ã¼ã
                </button>
              </div>
              <div className="code-block">{`<button className="btn-outline">
  è³æããã¦ã³ã­ã¼ã
</button>`}</div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="component-card">
              <div className="component-card-label">.badge-primary</div>
              <div className="component-card-render">
                <span
                  style={{
                    background: primaryColor,
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  æ³äººåã
                </span>
              </div>
              <div className="code-block">{`<span className="badge-primary">æ³äººåã</span>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.badge-accent</div>
              <div className="component-card-render">
                <span
                  style={{
                    background: '#FFF4E0',
                    color: accentColor,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  ãããã
                </span>
              </div>
              <div className="code-block">{`<span className="badge-accent">ãããã</span>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.badge-outline</div>
              <div className="component-card-render">
                <span
                  style={{
                    background: 'transparent',
                    color: secondaryColor,
                    border: `1px solid ${secondaryColor}`,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}
                >
                  NEW
                </span>
              </div>
              <div className="code-block">{`<span className="badge-outline">NEW</span>`}</div>
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="component-card">
              <div className="component-card-label">.service-card</div>
              <div className="component-card-render" style={{ display: 'block' }}>
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: 24,
                    maxWidth: 360,
                    borderTop: `4px solid ${primaryColor}`,
                  }}
                >
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>
                    æ³äººåãèè³ãã©ã³
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--text-sub)', marginTop: 8 }}>
                    ä¿¡é ¼ã¨å®ç¸¾ã«åºã¥ããæè»ãªè³éèª¿éããµãã¼ããã¾ãã
                  </p>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 16,
                      fontSize: 13,
                      fontWeight: 500,
                      color: primaryColor,
                    }}
                  >
                    è©³ããè¦ã â
                  </span>
                </div>
              </div>
              <div className="code-block">{`<div className="service-card">
  <h3>æ³äººåãèè³ãã©ã³</h3>
  <p>ä¿¡é ¼ã¨å®ç¸¾ã«åºã¥ããæè»ãªè³éèª¿éããµãã¼ããã¾ãã</p>
  <a href="#">è©³ããè¦ã â</a>
</div>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.highlight-card</div>
              <div className="component-card-render" style={{ display: 'block' }}>
                <div
                  style={{
                    background: primaryColor,
                    borderRadius: 12,
                    padding: 24,
                    maxWidth: 360,
                    color: '#fff',
                  }}
                >
                  <p style={{ fontSize: 12, fontWeight: 700, color: accentColor }}>PREMIUM</p>
                  <p style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>
                    ãã¬ãã¢ã ãµãã¼ããã©ã³
                  </p>
                  <p style={{ fontSize: 14, marginTop: 8, opacity: 0.85 }}>
                    å°ä»»æå½èã«ããæåããµãã¼ãããæä¾ãã¾ãã
                  </p>
                </div>
              </div>
              <div className="code-block">{`<div className="highlight-card">
  <span className="label">PREMIUM</span>
  <h3>ãã¬ãã¢ã ãµãã¼ããã©ã³</h3>
  <p>å°ä»»æå½èã«ããæåããµãã¼ãããæä¾ãã¾ãã</p>
</div>`}</div>
            </div>
          </div>
        )}

        {activeTab === 'forms' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="component-card">
              <div className="component-card-label">.form-input</div>
              <div className="component-card-render" style={{ display: 'block', maxWidth: 360 }}>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-main)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  ä¼ç¤¾å
                </label>
                <input
                  type="text"
                  placeholder="æ ªå¼ä¼ç¤¾ãµã³ãã«"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>
              <div className="code-block">{`<label>ä¼ç¤¾å</label>
<input type="text" placeholder="æ ªå¼ä¼ç¤¾ãµã³ãã«" className="form-input" />`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.form-select</div>
              <div className="component-card-render" style={{ display: 'block', maxWidth: 360 }}>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-main)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  ãç¸è«åå®¹
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: 14,
                    outline: 'none',
                    background: '#fff',
                  }}
                >
                  <option>è³éèª¿éã«ã¤ãã¦</option>
                  <option>ãªã¼ã¹ã«ã¤ãã¦</option>
                  <option>ãã®ä»</option>
                </select>
              </div>
              <div className="code-block">{`<label>ãç¸è«åå®¹</label>
<select className="form-select">
  <option>è³éèª¿éã«ã¤ãã¦</option>
</select>`}</div>
            </div>

            <div className="component-card">
              <div className="component-card-label">.form-checkbox</div>
              <div className="component-card-render">
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 14,
                    color: 'var(--text-main)',
                  }}
                >
                  <input type="checkbox" style={{ accentColor: primaryColor }} />
                  ãã©ã¤ãã·ã¼ããªã·ã¼ã«åæãã
                </label>
              </div>
              <div className="code-block">{`<label>
  <input type="checkbox" />
  ãã©ã¤ãã·ã¼ããªã·ã¼ã«åæãã
</label>`}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}