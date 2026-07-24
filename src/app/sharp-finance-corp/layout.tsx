// SF Corp portal layout — CSS scoped to .sf-corp-portal
import './globals.css';
export default function Layout({
  children,
}: { children: React.ReactNode }) {
  return <div className="sf-corp-portal">{children}</div>;
}
