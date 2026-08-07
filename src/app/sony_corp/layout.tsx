// Sony Corp portal layout â CSS scoped to .sony-corp-portal
import './globals.css';
import type { ReactNode } from 'react';
export default function Layout({
  children,
}: { children: ReactNode }) {
  return <div className="sony-corp-portal">{children}</div>;
}
