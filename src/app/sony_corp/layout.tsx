// Sony Corp portal layout — CSS scoped to .sony-corp-portal
import './globals.css';
export default function Layout({
  children,
}: { children: React.ReactNode }) {
  return <div className="sony-corp-portal">{children}</div>;
}
