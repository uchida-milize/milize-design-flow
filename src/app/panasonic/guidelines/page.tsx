'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/ClientPortalHeader';

const clientName = 'パナソニック株式会社';
const basePath = '/panasonic';
const primaryColor = '#003d7c';

const colors = [
  { hex: '#003d7c', name: 'Primary Blue' },
  { hex: '#0071bc', name: 'Secondary Blue' },
  { hex: '#f5a623', name: 'Accent Orange' },
  { hex: '#333333', name: 'Text Black' },
  { hex: '#f0f0f0', name: 'Background Gray' },
];

type Tab = 'colors' | 'typography' | 'tone';

export default function GuidelinesPage() {
  const [tab, setTab] = useState<Tab>('colors');

  return (
    <>
      <ClientPortalHeader
        clientName={clientName}
        basePath={basePath}
        active="guidelines"
        primaryColor={primaryColor}
      />
      <div className="portal-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <p className="section-label" style={{ color: primaryColor }}>
          GUIDELINES
        </p>
        <h1 className="section-title">ブランドガイドライン</h1>
        <p className="section-description">
          {clientName} のブランドカラー、タイポグラフィ、トンマナを定義しています。
        </p>

        <div className="tab-nav">
          <button
            className={`tab-item ${tab === 'colors' ? 'active' : ''}`}
            style={{ background: tab === 'colors' ? primaryColor : undefined }}
            onClick={() => setTab('colors')}
          >
            カラー
          </button>
          <button
            className={`tab-item ${tab === 'typography' ? 'active' : ''}`}
            style={{ background: tab === 'typography' ? primaryColor : undefined }}
            onClick={() => setTab('typography')}
          >
            タイポグラフィ
          </button>
          <button
            className={`tab-item ${tab === 'tone' ? 'active' : ''}`}
            style={{ background: tab === 'tone' ? primaryColor : undefined }}
            onClick={() => setTab('tone')}
          >
            トンマナ
          </button>
        </div>

        {tab === 'colors' && (
          <div>
            <div className="color-swatch-grid">
              {colors.map((c) => (
                <div key={c.hex} className="color-swatch">
                  <div className="color-swatch-top" style={{ background: c.hex }} />
                  <div className="color-swatch-bottom">
                    <div className="color-swatch-hex">{c.hex}</div>
                    <div className="color-swatch-name">{c.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'typography' && (
          <div className="card">
            <div className="typography-sample">
              <div className="typography-label">見出しフォント（Heading）</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>
                信頼と革新を、暮らしのそばに。
              </div>
            </div>
            <div className="typography-sample">
              <div className="typography-label">本文フォント（Body）</div>
              <div style={{ fontSize: 15, color: '#333333', lineHeight: 1.8 }}>
                ヒラギノ角ゴシック、メイリオなどのサンセリフ体で統一し、明瞭で視認性の高いフォントを使用します。
                清潔感と信頼感が伝わるよう、可読性を最優先したタイポグラフィ設計です。
              </div>
            </div>
          </div>
        )}

        {tab === 'tone' && (
          <div className="card">
            <div style={{ marginBottom: 16 }}>
              <span className="keyword-tag" style={{ background: '#e6f0fa', color: primaryColor }}>
                信頼感
              </span>
              <span className="keyword-tag" style={{ background: '#e6f4fc', color: '#0071bc' }}>
                先進技術
              </span>
              <span className="keyword-tag" style={{ background: '#fef3e2', color: '#f5a623' }}>
                親しみやすさ
              </span>
            </div>
            <p style={{ fontSize: 14, color: '#333333', lineHeight: 1.8 }}>
              伝統と革新を重視し、落ち着いたブルーを基調にアクセントとしてオレンジを使うことで
              温かみと活気を表現。アイコンや画像はシンプルで機能的、かつ親しみやすい印象を与え、
              ユーザーが快適に情報を得られるよう配慮しています。先進的かつ生活に寄り添うブランドイメージを
              強調しています。
            </p>
          </div>
        )}
      </div>
    </>
  );
}