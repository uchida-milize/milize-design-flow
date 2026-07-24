'use client';
import { ReactNode } from 'react';

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      background: '#444444',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '25%', right: '25%',
          width: 384, height: 384, borderRadius: '50%', opacity: 0.1,
          background: 'radial-gradient(circle, #3b82f6, transparent)', filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '25%', left: '25%',
          width: 256, height: 256, borderRadius: '50%', opacity: 0.1,
          background: 'radial-gradient(circle, #2563eb, transparent)', filter: 'blur(60px)',
        }} />
      </div>
      {/* Phone bezel */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 412,
        height: 'min(872px, 100%)',
        background: '#0a0a0a',
        borderRadius: 54,
        padding: 14,
        boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
      }}>
        {/* Screen */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 40,
          overflow: 'hidden',
          background: '#000',
        }}>
          <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
            {children}
          </div>
          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
            width: 120, height: 34, borderRadius: 20, background: '#000', zIndex: 20,
            pointerEvents: 'none',
          }} />
        </div>
      </div>
    </div>
  );
}
