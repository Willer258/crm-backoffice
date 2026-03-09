import { ReactNode } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Header */}
      <header className="absolute top-0 right-0 left-0 z-10 p-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-primary-foreground text-lg font-bold">C</span>
            </div>
            <span className="text-xl font-bold">CRM</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="text-muted-foreground py-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} CRM. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
