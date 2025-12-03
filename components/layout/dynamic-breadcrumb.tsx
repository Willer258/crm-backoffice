'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Home } from 'lucide-react'
import React from 'react'

// Mapping des segments d'URL vers les labels traduits
const segmentLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  users: 'Users',
  organizations: 'Organizations',
  projects: 'Projects',
  active: 'Active',
  archived: 'Archived',
  billing: 'Billing',
  logs: 'Logs',
  settings: 'Settings',
  analytics: 'Analytics',
  calendar: 'Calendar',
  contacts: 'Contacts',
  deals: 'Deals',
  companies: 'Companies',
  activities: 'Activities',
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()

  // Supprimer le locale du chemin (ex: /fr/dashboard -> /dashboard)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '')

  // Créer les segments du chemin
  const segments = pathWithoutLocale.split('/').filter(Boolean)

  // Construire les breadcrumbs
  const breadcrumbs = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/')
    const label = segmentLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    const isLast = index === segments.length - 1

    return {
      label,
      path,
      isLast,
    }
  })

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/dashboard" className="flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.path}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
