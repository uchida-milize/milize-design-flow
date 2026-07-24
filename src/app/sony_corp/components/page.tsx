'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'ã½ãã¼æ ªå¼ä¼ç¤¾';
const basePath = '/sony_corp';
const primaryColor = '#000000';
const accentColor = '#0071BC';

const tabs = [
  { key: 'buttons', label: 'Buttons' },
  { key: 'cards', label: 'Cards' },
  { key: 'forms', label: 'Forms' },
] as const;

type TabKey = typeof tabs[number]['key'];

function ComponentCard({
  label,
  code,
  children,
}: {
  label: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          padding: '8px 16px',
          fontSize: '12px',
          color: '#9ca3af',
          borderBottom: '1px solid #e5e7eb',
          background: '#fafafa',
        }}
      >
        {label}
      </div>
      <div style={{ padding: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        {children}
      </div>
      <pre
        style={{
          background: '#0f172a',
          color: '#94a3b8',
          fontFamily: 'monospace',
          fontSize: '12px',
          padding: '12px 16px',
          margin: 0,
          overflowX: 'auto',
        }}
      >
        {code}
      </pre>
    </div>
  );
}

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('buttons');

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="components"
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
            UI COMPONENTS
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: 0 }}>
            ã³ã³ãã¼ãã³ãä¸è¦§
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
            {clientName} ãã©ã³ãã«åºã¥ãUIã³ã³ãã¼ãã³ãã®å®è£ä¾ã§ãã
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

        {activeTab === 'buttons' && (
          <section>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
                Buttons
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                ä¸»è¦ãªã¢ã¯ã·ã§ã³ã«ä½¿ç¨ãããã¿ã³ã³ã³ãã¼ãã³ã
              </p>
            </div>

            <ComponentCard
              label=".btn-primary"
              code={`<button style={{ background: '${primaryColor}', color: '#fff' }}>\n  Primary Button\n</button>`}
            >
              <button
                style={{
                  background: primaryColor,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Primary Button
              </button>
            </ComponentCard>

            <ComponentCard
              label=".btn-accent"
              code={`<button style={{ background: '${accentColor}', color: '#fff' }}>\n  Accent Button\n</button>`}
            >
              <button
                style={{
                  background: accentColor,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Accent Button
              </button>
            </ComponentCard>

            <ComponentCard
              label=".btn-outline"
              code={`<button style={{ border: '1px solid ${primaryColor}', color: '${primaryColor}' }}>\n  Outline Button\n</button>`}
            >
              <button
                style={{
                  background: 'transparent',
                  color: primaryColor,
                  border: `1px solid ${primaryColor}`,
                  borderRadius: '6px',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Outline Button
              </button>
            </ComponentCard>
          </section>
        )}

        {activeTab === 'cards' && (
          <section>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
                Cards
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                ã³ã³ãã³ããã¾ã¨ããããã®ã«ã¼ãã³ã³ãã¼ãã³ã
              </p>
            </div>

            <ComponentCard
              label=".card-basic"
              code={`<div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>\n  <h3>Card Title</h3>\n  <p>Card description text.</p>\n</div>`}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  padding: '24px',
                  width: '260px',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
                  Card Title
                </h3>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                  ã«ã¼ãã®èª¬æãã­ã¹ããããã«å¥ãã¾ãã
                </p>
              </div>
            </ComponentCard>

            <ComponentCard
              label=".card-accent-border"
              code={`<div style={{ borderTop: '4px solid ${accentColor}' }}>\n  <h3>Accent Card</h3>\n</div>`}
            >
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderTop: `4px solid ${accentColor}`,
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  padding: '24px',
                  width: '260px',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
                  Accent Card
                </h3>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                  ã¢ã¯ã»ã³ãã«ã©ã¼ãä½¿ã£ãã«ã¼ãã§ãã
                </p>
              </div>
            </ComponentCard>
          </section>
        )}

        {activeTab === 'forms' && (
          <section>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
                Forms
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                å¥åãã©ã¼ã ã§ä½¿ç¨ããã³ã³ãã¼ãã³ã
              </p>
            </div>

            <ComponentCard
              label=".input-text"
              code={`<input type="text" placeholder="Enter text" />`}
            >
              <input
                type="text"
                placeholder="Enter text"
                style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  fontSize: '14px',
                  width: '240px',
                  outline: 'none',
                }}
              />
            </ComponentCard>

            <ComponentCard
              label=".checkbox"
              code={`<label>\n  <input type="checkbox" /> Agree to terms\n</label>`}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#111827' }}>
                <input type="checkbox" style={{ accentColor: accentColor }} />
                Agree to terms
              </label>
            </ComponentCard>

            <ComponentCard
              label=".select"
              code={`<select>\n  <option>Option A</option>\n  <option>Option B</option>\n</select>`}
            >
              <select
                style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  fontSize: '14px',
                  width: '240px',
                }}
              >
                <option>Option A</option>
                <option>Option B</option>
              </select>
            </ComponentCard>
          </section>
        )}
      </main>
    </div>
  );
}