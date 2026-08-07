import './globals.css';
import type { ReactNode } from 'react';
export default function Layout({ children }: { children: ReactNode }) {
  return <div className="softbank-group-portal">{children}</div>;
}
