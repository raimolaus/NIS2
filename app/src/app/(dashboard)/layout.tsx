'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // TEMPORARY: Mock session for testing (no auth yet)
  const session = {
    user: {
      email: 'test@test.ee',
      name: 'Test User',
    },
  };

  // Helper to check if link is active
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(path);
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/assessment', label: 'Enesehindamine' },
    { href: '/documents', label: 'Dokumendid' },
    { href: '/risks', label: 'Riskihaldus' },
    { href: '/chat', label: 'AI Vestlus' },
    { href: '/company', label: '🏢 Ettevõte' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Sticky */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Nav */}
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">N2</span>
                </div>
                <span className="font-bold text-xl">NIS2 Abimees</span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      isActive(link.href)
                        ? 'text-primary font-semibold border-b-2 border-primary pb-1 transition'
                        : 'text-muted-foreground hover:text-foreground transition'
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Tere, {session.user.name}!
              </span>
              <ThemeToggle />
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profile">Profiil</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
