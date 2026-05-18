import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">AuthGuard</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Protecting consumers and brands from counterfeit products using blockchain-verified authentication technology.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/verify" className="text-sm text-muted-foreground hover:text-foreground">
                  Verify Product
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="text-sm text-muted-foreground hover:text-foreground">
                  Blockchain Explorer
                </Link>
              </li>
              <li>
                <Link href="/manufacturer/register" className="text-sm text-muted-foreground hover:text-foreground">
                  Register as Manufacturer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">For Manufacturers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/manufacturer/login" className="text-sm text-muted-foreground hover:text-foreground">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/manufacturer/register" className="text-sm text-muted-foreground hover:text-foreground">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} AuthGuard. Built with blockchain technology for product authenticity.
          </p>
        </div>
      </div>
    </footer>
  );
}
