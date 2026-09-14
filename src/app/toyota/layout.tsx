import './globals.css';
import type { ReactNode } from 'react';
export default function Layout({ children }: { children: ReactNode }) {
  return <div className="toyota-portal">{children}</div>;
}
