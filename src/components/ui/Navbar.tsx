import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-primary">
          AI Interview Platform
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/interview/setup" className="hover:text-foreground transition">Start Interview</Link>
          <Link href="/report" className="hover:text-foreground transition">Reports</Link>
        </nav>
      </div>
    </header>
  );
}