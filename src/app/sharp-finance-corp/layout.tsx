// SF Corp portal layout — CSS scoped to .sf-corp-portal
import './globals.css';
import type { ReactNode } from 'react';
export default function Layout({
  children,
}: { children: ReactNode }) {
  return <div className="sf-corp-portal">{children}</div>;
}
