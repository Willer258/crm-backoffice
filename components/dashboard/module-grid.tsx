'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface ModuleItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  href: string
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'teal' | 'pink'
  badge?: string | number
  disabled?: boolean
}

const colorVariants = {
  primary: {
    bg: 'bg-primary/10',
    icon: 'text-primary',
    hover: 'hover:border-primary/50',
  },
  success: {
    bg: 'bg-crm-success/10',
    icon: 'text-crm-success',
    hover: 'hover:border-crm-success/50',
  },
  warning: {
    bg: 'bg-crm-warning/10',
    icon: 'text-crm-warning',
    hover: 'hover:border-crm-warning/50',
  },
  danger: {
    bg: 'bg-crm-danger/10',
    icon: 'text-crm-danger',
    hover: 'hover:border-crm-danger/50',
  },
  info: {
    bg: 'bg-crm-info/10',
    icon: 'text-crm-info',
    hover: 'hover:border-crm-info/50',
  },
  purple: {
    bg: 'bg-crm-purple/10',
    icon: 'text-crm-purple',
    hover: 'hover:border-crm-purple/50',
  },
  teal: {
    bg: 'bg-crm-teal/10',
    icon: 'text-crm-teal',
    hover: 'hover:border-crm-teal/50',
  },
  pink: {
    bg: 'bg-crm-pink/10',
    icon: 'text-crm-pink',
    hover: 'hover:border-crm-pink/50',
  },
}

interface ModuleGridProps {
  modules: ModuleItem[]
  title?: string
  columns?: 2 | 3 | 4
}

export function ModuleGrid({
  modules,
  title = 'Accès rapide',
  columns = 3,
}: ModuleGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-semibold">{title}</h3>
      )}
      <div className={cn('grid gap-4', gridCols[columns])}>
        {modules.map((module, index) => {
          const Icon = module.icon
          const colors = colorVariants[module.color || 'primary']

          const content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card
                className={cn(
                  'group relative cursor-pointer overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md',
                  colors.hover,
                  module.disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
                        colors.bg
                      )}
                    >
                      <Icon className={cn('h-6 w-6', colors.icon)} />
                    </div>
                    {module.badge !== undefined && (
                      <Badge variant="secondary" className="text-xs">
                        {module.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-4 space-y-1">
                    <h4 className="font-semibold">{module.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {module.description}
                    </p>
                  </div>
                </CardContent>
                {/* Hover gradient effect */}
                <div
                  className={cn(
                    'absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30',
                    colors.bg
                  )}
                />
              </Card>
            </motion.div>
          )

          if (module.disabled) {
            return <div key={module.id}>{content}</div>
          }

          return (
            <Link key={module.id} href={module.href} className="block">
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
