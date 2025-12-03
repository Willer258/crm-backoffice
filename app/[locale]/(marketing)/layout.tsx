import { Navbar } from '@/components/layout/navbar'
import { CookieConsent } from '@/components/global/cookie-consent'
import { NewsletterPopup } from '@/components/global/newsletter-popup'
import { ScrollToTop } from '@/components/global/scroll-to-top'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-12 bg-muted/50">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CRM Pro
              </h3>
              <p className="text-sm text-muted-foreground">
                Le CRM qui transforme vos prospects en clients. Boostez vos ventes avec une solution simple et puissante.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition-colors">Fonctionnalités</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Tarifs</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Se connecter</Link></li>
                <li><Link href="/register" className="hover:text-foreground transition-colors">Essai gratuit</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">À propos</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Confidentialité</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">CGU</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">CGV</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} CRM Pro. Tous droits réservés. Made with ❤️ for sales teams.</p>
          </div>
        </div>
      </footer>

      <CookieConsent />
      <NewsletterPopup />
      <ScrollToTop />
    </div>
  )
}
