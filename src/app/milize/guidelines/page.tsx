'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'シャープファイナンス株式会社';
const basePath = '/sharp-finance-corp';
const primaryColor = '#0055A4';

const colors = [
  { hex: '#0055A4', name: 'Primary Blue' },
  { hex: '#00A0E9', name: 'Secondary Blue' },
  { hex: '#F5A623', name: 'Accent Orange' },
  { hex: '#333333', name: 'Text Black' },
  { hex: '#FFFFFF', name: 'Background White' },
];

const tabs = [
  { key: 'color', label: 'カラー' },
  { key: 'typography', label: 'タイポグラフィ' },
  { key: 'tone', label: 'トンマナ' },
];

export default function GuidelinesPage() {
  const [tab, setTab] = useState('color');

  return (
    <div className="sharp-finance-corp-portal">
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <div className="section-label" style={{ color: primaryColor }}>
            GUIDELINES
          </div>
          <div className="section-title">ブランドガイドライン</div>
          <div className="section-desc">
            ブランドカラー、タイポグラフィ、トンマナについて定義しています。
          </div>
        </div>

        <div className="tab-nav">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`tab ${tab === t.key ? 'active' : ''}`}
              style={tab === t.key ? { background: primaryColor } : {}}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'color' && (
          <div className="card">
            <div className="section-title" style={{ fontSize: 18, marginBottom: 16 }}>
              カラーパレット
            </div>
            <div className="swatch-grid">
              {colors.map((c) => (
                <div className="swatch" key={c.hex}>
                  <div
                    className="swatch-color"
                    style={{
                      background: c.hex,
                      borderBottom: c.hex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                    }}
                  />
                  <div className="swatch-info">
                    <div className="swatch-hex">{c.hex}</div>
                    <div className="swatch-name">{c.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'typography' && (
          <div className="card">
            <div className="section-title" style={{ fontSize: 18, marginBottom: 16 }}>
              タイポグラフィ
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>
                見出しフォント
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>
                ヒラギノ角ゴシック / Sans-serif
              </div>
              <div className="section-desc">
                モダンで読みやすいサンセリフ体を使用します。
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>
                本文フォント
              </div>
              <div style={{ fontSize: 16, color: '#333333' }}>
                游ゴシック体 / ヒラギノ角ゴシック体で、明瞭な可読性を確保します。
              </div>
            </div>
          </div>
        )}

        {tab === 'tone' && (
          <div className="card">
            <div className="section-title" style={{ fontSize: 18, marginBottom: 16 }}>
              トンマナ
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              {['先進的', '信頼感', '親しみやすさ'].map((kw) => (
                <span
                  key={kw}
                  style={{
                    background: '#f0f7ff',
                    color: primaryColor,
                    padding: '6px 16px',
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
            <div className="section-desc" style={{ fontSize: 14, lineHeight: 1.8 }}>
              最先端テクノロジーを駆使しつつ、金融という堅実な分野で信頼性と透明性を重視。
              色使いやフォントはシンプルで明快、ユーザー目線を大切にした親しみやすいブランドイメージを形成しています。
            </div>
          </div>
        )}
      </div>
    </div>
  );
}