'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance';
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
          <h1 className="section-title">ブランドガイドライン</h1>
          <p className="section-desc">
            {clientName} のブランド価値を正しく伝えるためのカラー・タイポグラフィ・トンマナ規定です。
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
                    {c.hex}（{c.ratio}%）
                  </span>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, marginTop: 8 }}>
              カラーパレット
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
                見出し フォント Aa
              </p>
              <p className="section-desc" style={{ marginTop: 8 }}>
                モダンで読みやすいサンセリフ体（Helvetica, Arial 等）を使用します。
              </p>
            </div>

            <div className="portal-card">
              <p className="section-label" style={{ color: primaryColor, marginBottom: 8 }}>
                BODY FONT
              </p>
              <p style={{ fontSize: 16, color: 'var(--text-main)', lineHeight: 1.8 }}>
                本文フォントはシンプルなサンセリフ体で可読性を重視しています。Noto Sans
                JPや游ゴシックなど、日本語に最適化された書体を採用し、法人のお客様にも読みやすい情報提供を実現します。
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
                    シャープファイナンス
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
              {['信頼感', '高級感', 'わかりやすさ'].map((kw) => (
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
                シャープファイナンスは金融サービス企業として、堅実で信頼感のある濃青を基調に、
                高級感を演出するアクセントカラーを用いながらも、親しみやすくわかりやすい情報提供を
                重視したトーンで構成されています。法人向けサービスの専門性と顧客に寄り添う姿勢が
                バランスよく表現されたデザインです。
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}