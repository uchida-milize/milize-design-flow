import './globals.css';
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="sharp-portal">{children}</div>;
}
