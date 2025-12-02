"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Menu, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { ThemeCustomizer } from '@/components/theme/theme-customizer'

export function Navbar() {
  const features = [
    { title: 'Gestion des contacts', href: '/features#contacts', description: 'Centralisez vos prospects et clients' },
    { title: 'Pipeline visuel', href: '/features#pipeline', description: 'Kanban drag & drop pour vos deals' },
    { title: 'Suivi d\'activités', href: '/features#activities', description: 'Ne ratez plus jamais une relance' },
    { title: 'Analytics & rapports', href: '/features#analytics', description: 'Dashboards temps réel' },
  ]

  const resources = [
    { title: 'FAQ', href: '/faq', description: 'Questions fréquentes' },
    { title: 'Blog', href: '/blog', description: 'Conseils et actualités CRM' },
    { title: 'Contact', href: '/contact', description: 'Nous sommes là pour vous aider' },
    { title: 'Support', href: '/contact', description: 'Assistance technique' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CRM Pro
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Accueil
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Fonctionnalités</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {features.map((feature) => (
                    <li key={feature.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={feature.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{feature.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {feature.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Tarifs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Ressources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {resources.map((resource) => (
                    <li key={resource.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={resource.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{resource.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {resource.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  À propos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeCustomizer />
          <ThemeToggle />

          {/* Login Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link href="/login">Connexion</Link>
            </Button>
          </motion.div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
              <Link href="/register">Essai gratuit</Link>
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                  Accueil
                </Link>
                <Link href="/features" className="text-lg font-medium hover:text-primary transition-colors">
                  Fonctionnalités
                </Link>
                <Link href="/pricing" className="text-lg font-medium hover:text-primary transition-colors">
                  Tarifs
                </Link>
                <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">
                  À propos
                </Link>
                <Link href="/faq" className="text-lg font-medium hover:text-primary transition-colors">
                  FAQ
                </Link>
                <Link href="/blog" className="text-lg font-medium hover:text-primary transition-colors">
                  Blog
                </Link>
                <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                  Contact
                </Link>
                <div className="border-t pt-4 mt-4 flex flex-col gap-2">
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/login">Connexion</Link>
                  </Button>
                  <Button asChild variant="default" className="w-full">
                    <Link href="/register">Essai gratuit 14 jours</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
