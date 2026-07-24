'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ã½ãã¼æ ªå¼ä¼ç¤¾';
const basePath = '/sony_corp';
const primaryColor = '#000000';

const colorRatios = [
  { hex: '#000000', name: 'ãã©ãã¯ï¼ãã©ã¤ããªï¼', ratio: 40 },
  { hex: '#0071BC', name: 'ã½ãã¼ãã«ã¼ï¼ã¢ã¯ã»ã³ãï¼', ratio: 25 },
  { hex: '#FFFFFF', name: 'ãã¯ã¤ãï¼ã»ã«ã³ããªï¼', ratio: 25 },
  { hex: '#F5A623', name: 'ã¢ã¯ã»ã³ããªã¬ã³ã¸', ratio: 5 },
  { hex: '#333333', name: 'ãã¼ã¯ã°ã¬ã¼ï¼ãã­ã¹ãï¼', ratio: 5 },
];

const swatches = [
  { hex: '#000000', name: 'ãã©ã¤ããªã«ã©ã¼' },
  { hex: '#FFFFFF', name: 'ã»ã«ã³ããªã«ã©ã¼' },
  { hex: '#0071BC', name: 'ã¢ã¯ã»ã³ãã«ã©ã¼ï¼ã½ãã¼ãã«ã¼ï¼' },
  { hex: '#F5A623', name: 'ã¢ã¯ã»ã³ããªã¬ã³ã¸' },
  { hex: '#333333', name: 'ãã­ã¹ãã«ã©ã¼ï¼ãã¼ã¯ã°ã¬ã¼ï¼' },
];

const tabs = [
  { key: 'colors', label: 'Colors' },
  { key: 'typography', label: 'Typography' },
  { key: 'tone', label: 'Tone & Manner' },
] as const;

type TabKey = typeof tabs[number]['key'];

export default function GuidelinesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('colors');

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />

      <main className="portal-container" style={{ padding: '48px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: primaryColor,
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}
          >
            BRAND GUIDELINES
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: 0 }}>
            ãã©ã³ãã¬ã¤ãã©ã¤ã³
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
            {clientName} ã®ãã©ã³ãã«ã©ã¼ã»ã¿ã¤ãã°ã©ãã£ã»ãã³ãããã¾ã¨ãã¦ãã¾ãã
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === tab.key ? primaryColor : '#f3f4f6',
                color: activeTab === tab.key ? '#ffffff' : '#6b7280',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'colors' && (
          <section>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
                Color Palette
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                ãã©ã³ãã«ã©ã¼ã®ä½¿ç¨æ¯çã¨ã¹ã¦ã©ããä¸è¦§
              </p>
            </div>

            {/* ä½¿ç¨æ¯çæ¨ªå¸¯ */}
            <div style={{ marginBottom: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '48px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                }}
              >
                {colorRatios.map((c) => (
                  <div
                    key={c.hex}
                    style={{
                      width: `${c.ratio}%`,
                      background: c.hex,
                      height: '100%',
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginTop: '12px',
                }}
              >
                {colorRatios.map((c) => (
                  <div key={c.hex} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        borderRadius: '3px',
                        background: c.hex,
                        border: '1px solid #e5e7eb',
                      }}
                    />
                    <span style={{ fontSize: '12px', color: '#111827', fontFamily: 'monospace' }}>
                      {c.hex}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{c.ratio}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                padding: '24px',
                marginTop: '24px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                  gap: '12px',
                }}
              >
                {swatches.map((s) => (
                  <div
                    key={s.hex}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ height: '80px', background: s.hex }} />
                    <div style={{ padding: '8px 12px' }}>
                      <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#111827' }}>
                        {s.hex}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{s.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'typography' && (
          <section>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
                Typography
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                è¦åºãã»æ¬æã§ä½¿ç¨ãããã©ã³ãã®æ¹é
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                padding: '24px',
                marginBottom: '16px',
              }}
            >
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>HEADING FONT</div>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                Innovation & Creativity
              </div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                ã¢ãã³ã§æ´ç·´ãããå°è±¡ã®ãµã³ã»ãªãç³»ãã©ã³ããä½¿ç¨ãã¾ãã
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                padding: '24px',
              }}
            >
              <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>BODY FONT</div>
              <p style={{ fontSize: '16px', color: '#111827', margin: '0 0 8px', lineHeight: 1.7 }}>
                æ¬æã«ã¯æ¥æ¬èªã»è±èªå±ã«èª­ã¿ããããµã³ã»ãªãç³»ãã©ã³ããä½¿ç¨ããHelveticaãé¡ä¼¼ãã©ã³ãããã¼ã¹ã«è¦èªæ§ãéè¦ãã¾ãã
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Body text uses a highly legible sans-serif typeface for both Japanese and English content.
              </p>
            </div>
          </section>
        )}

        {activeTab === 'tone' && (
          <section>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
                Tone & Manner
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                ãã©ã³ããç®æãä¸çè¦³ã¨ã­ã¼ã¯ã¼ã
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              {['Innovation', 'Creativity', 'Trust'].map((word) => (
                <div
                  key={word}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '20px', fontWeight: 700, color: primaryColor }}>{word}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                padding: '24px',
              }}
            >
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.8, margin: 0 }}>
                ã½ãã¼ã®ãã©ã³ãã¯ããã¯ãã­ã¸ã¼ã¨ã¨ã³ã¿ãã¤ã³ã¡ã³ããèåããåé²çã§æ´ç·´ãããã¤ã¡ã¼ã¸ãæã¡ãã·ã³ãã«ãªãããåå¼·ããä¸çä¸­ã§èªç¥ãããæ®éæ§ã¨ä¿¡é ¼æãå¼ã­åãã¦ããããã¶ã¤ã³ã¯ã¢ãã³ã§çµ±ä¸æããããé»ã»ç½ã»éã®ã³ã³ãã©ã¹ãã§æå¿«ããä¼ãã¤ã¤ãã¢ã¯ã»ã³ãã«ãªã¬ã³ã¸ãªã©æ¸©ãã¿ã®ããè²ãä½¿ããæåã¨åºæ¿ãæ¼åºãã¦ããããã©ã³ãã¯è¦èªæ§ãéè¦ãã¤ã¤ãåé²çã§ã¯ãªã¨ã¤ãã£ããªãã©ã³ãã¤ã¡ã¼ã¸ãæ¯ãã¦ããã
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}