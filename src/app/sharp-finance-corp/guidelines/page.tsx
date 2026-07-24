'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ã·ã£ã¼ããã¡ã¤ãã³ã¹æ ªå¼ä¼ç¤¾';
const basePath = '/sharp-finance-corp';
const primaryColor = '#004A99';

const colorRatios = [
  { hex: '#004A99', name: 'Primary Blue', ratio: 40 },
  { hex: '#0071BC', name: 'Secondary Blue', ratio: 25 },
  { hex: '#F5A623', name: 'Accent Orange', ratio: 15 },
  { hex: '#333333', name: 'Text Black', ratio: 12 },
  { hex: '#f0f0f0', name: 'Background Gray', ratio: 8 },
];

const tabs = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'tone', label: 'Tone & Manner' },
];

export default function GuidelinesPage() {
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <div>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <main className="portal-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <p className="section-label" style={{ color: primaryColor }}>
            GUIDELINES
          </p>
          <h1 className="section-title">ãã©ã³ãã¬ã¤ãã©ã¤ã³</h1>
          <p className="section-desc">
            {clientName} ã®ãã©ã³ãä¾¡å¤ãæ­£ããä¼ããããã®ã«ã©ã¼ã»ã¿ã¤ãã°ã©ãã£ã»ãã³ããè¦å®ã§ãã
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

        {activeTab === 'colors' && (
          <section>
            <div className="ratio-bar">
              {colorRatios.map((c) => (
                <div
                  key={c.hex}
                  style={{ width: `${c.ratio}%`, background: c.hex }}
                  title={`${c.name} ${c.ratio}%`}
                />
              ))}
            </div>
            <div className="ratio-labels">
              {colorRatios.map((c) => (
                <div className="ratio-label-item" key={c.hex}>
                  <span className="ratio-label-swatch" style={{ background: c.hex }} />
                  <span>
                    {c.hex}ï¼{c.ratio}%ï¼
                  </span>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, marginTop: 8 }}>
              ã«ã©ã¼ãã¬ãã
            </h2>
            <div className="color-swatch-grid">
              {colorRatios.map((c) => (
                <div className="color-swatch" key={c.hex}>
                  <div className="color-swatch-top" style={{ background: c.hex }} />
                  <div className="color-swatch-bottom">
                    <div className="color-swatch-hex">{c.hex}</div>
                    <div className="color-swatch-name">{c.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'typography' && (
          <section>
            <div className="portal-card" style={{ marginBottom: 24 }}>
              <p className="section-label" style={{ color: primaryColor, marginBottom: 8 }}>
                HEADING FONT
              </p>
              <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-main)' }}>
                è¦åºã ãã©ã³ã Aa
              </p>
              <p className="section-desc" style={{ marginTop: 8 }}>
                ã¢ãã³ã§èª­ã¿ããããµã³ã»ãªãä½ï¼Helvetica, Arial ç­ï¼ãä½¿ç¨ãã¾ãã
              </p>
            </div>

            <div className="portal-card">
              <p className="section-label" style={{ color: primaryColor, marginBottom: 8 }}>
                BODY FONT
              </p>
              <p style={{ fontSize: 16, color: 'var(--text-main)', lineHeight: 1.8 }}>
                æ¬æãã©ã³ãã¯ã·ã³ãã«ãªãµã³ã»ãªãä½ã§å¯èª­æ§ãéè¦ãã¦ãã¾ããNoto Sans
                JPãæ¸¸ã´ã·ãã¯ãªã©ãæ¥æ¬èªã«æé©åãããæ¸ä½ãæ¡ç¨ããæ³äººã®ãå®¢æ§ã«ãèª­ã¿ãããæå ±æä¾ãå®ç¾ãã¾ãã
              </p>
            </div>

            <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
              {[
                { size: 32, label: 'Heading 1 / 32px' },
                { size: 24, label: 'Heading 2 / 24px' },
                { size: 18, label: 'Heading 3 / 18px' },
                { size: 14, label: 'Body / 14px' },
                { size: 12, label: 'Caption / 12px' },
              ].map((item) => (
                <div key={item.label} className="portal-card" style={{ padding: 16 }}>
                  <p style={{ fontSize: item.size, fontWeight: 700, color: 'var(--text-main)' }}>
                    ã·ã£ã¼ããã¡ã¤ãã³ã¹
                  </p>
                  <p className="section-desc" style={{ marginTop: 4 }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'tone' && (
          <section>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 16,
                marginBottom: 24,
              }}
            >
              {['ä¿¡é ¼æ', 'é«ç´æ', 'ãããããã'].map((kw) => (
                <div
                  key={kw}
                  className="portal-card"
                  style={{ textAlign: 'center', borderTop: `4px solid ${primaryColor}` }}
                >
                  <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-main)' }}>{kw}</p>
                </div>
              ))}
            </div>

            <div className="portal-card">
              <p className="section-label" style={{ color: primaryColor, marginBottom: 8 }}>
                OVERALL IMPRESSION
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-main)', lineHeight: 1.9 }}>
                ã·ã£ã¼ããã¡ã¤ãã³ã¹ã¯éèãµã¼ãã¹ä¼æ¥­ã¨ãã¦ãå å®ã§ä¿¡é ¼æã®ããæ¿éãåºèª¿ã«ã
                é«ç´æãæ¼åºããã¢ã¯ã»ã³ãã«ã©ã¼ãç¨ããªããããè¦ªãã¿ãããããããããæå ±æä¾ã
                éè¦ãããã¼ã³ã§æ§æããã¦ãã¾ããæ³äººåããµã¼ãã¹ã®å°éæ§ã¨é¡§å®¢ã«å¯ãæ·»ãå§¿å¢ã
                ãã©ã³ã¹ããè¡¨ç¾ããããã¶ã¤ã³ã§ãã
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}