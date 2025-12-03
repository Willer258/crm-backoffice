'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Menu, TrendingUp } from 'lucide-react'
import { ThemeToggle } from '../theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { ThemeCustomizer } from '@/components/theme/theme-customizer'

const features = [
  {
    title: 'Gestion des contacts',
    href: '/features#contacts',
    description: 'Centralisez vos prospects et clients',
  },
  {
    title: 'Pipeline visuel',
    href: '/features#pipeline',
    description: 'Kanban drag & drop pour vos deals',
  },
  {
    title: "Suivi d'activités",
    href: '/features#activities',
    description: 'Ne ratez plus jamais une relance',
  },
  {
    title: 'Analytics & rapports',
    href: '/features#analytics',
    description: 'Dashboards temps réel',
  },
]

const resources = [
  { title: 'FAQ', href: '/faq', description: 'Questions fréquentes' },
  { title: 'Blog', href: '/blog', description: 'Conseils et actualités CRM' },
  { title: 'Contact', href: '/contact', description: 'Nous sommes là pour vous aider' },
  { title: 'Support', href: '/contact', description: 'Assistance technique' },
]

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href ?? '#'}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary via-chart-2 to-primary">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-xl font-bold text-transparent">
            CRM Pro
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/">Accueil</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Fonctionnalités</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {features.map((feature) => (
                    <ListItem key={feature.title} title={feature.title} href={feature.href}>
                      {feature.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/pricing">Tarifs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Ressources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {resources.map((resource) => (
                    <ListItem key={resource.title} title={resource.title} href={resource.href}>
                      {resource.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/about">À propos</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeCustomizer />
          <ThemeToggle />

          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link href="/login">Connexion</Link>
          </Button>

          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/register">Essai gratuit</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-8">
                <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
                  Accueil
                </Link>
                <Link href="/features" className="text-lg font-medium transition-colors hover:text-primary">
                  Fonctionnalités
                </Link>
                <Link href="/pricing" className="text-lg font-medium transition-colors hover:text-primary">
                  Tarifs
                </Link>
                <Link href="/about" className="text-lg font-medium transition-colors hover:text-primary">
                  À propos
                </Link>
                <Link href="/faq" className="text-lg font-medium transition-colors hover:text-primary">
                  FAQ
                </Link>
                <Link href="/blog" className="text-lg font-medium transition-colors hover:text-primary">
                  Blog
                </Link>
                <Link href="/contact" className="text-lg font-medium transition-colors hover:text-primary">
                  Contact
                </Link>
                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/login">Connexion</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/register">Essai gratuit 14 jours</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
