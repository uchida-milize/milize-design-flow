import './globals.css';
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="hitachi-portal" style={{ minHeight: '100vh' }}>{children}</div>;
}
