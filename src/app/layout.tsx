import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'MILIZE Asset Portal | クライアント別デジタル資産ポータル',
  description: 'クライアントごとのデザインガイドライン・コンポーネント・営業資料を統合管理するMILIZEのデジタル資産ポータル。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', 'Yu Gothic Medium', 'Yu Gothic', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

