'use client'

import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'teal'
  className?: string
}

const colorVariants = {
  primary: {
    bg: 'bg-primary/10',
    icon: 'text-primary',
    trend: 'text-primary',
  },
  success: {
    bg: 'bg-crm-success/10',
    icon: 'text-crm-success',
    trend: 'text-crm-success',
  },
  warning: {
    bg: 'bg-crm-warning/10',
    icon: 'text-crm-warning',
    trend: 'text-crm-warning',
  },
  danger: {
    bg: 'bg-crm-danger/10',
    icon: 'text-crm-danger',
    trend: 'text-crm-danger',
  },
  info: {
    bg: 'bg-crm-info/10',
    icon: 'text-crm-info',
    trend: 'text-crm-info',
  },
  purple: {
    bg: 'bg-crm-purple/10',
    icon: 'text-crm-purple',
    trend: 'text-crm-purple',
  },
  teal: {
    bg: 'bg-crm-teal/10',
    icon: 'text-crm-teal',
    trend: 'text-crm-teal',
  },
}

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'primary',
  className,
}: KpiCardProps) {
  const colors = colorVariants[color]

  const TrendIcon = trend
    ? trend.value > 0
      ? TrendingUp
      : trend.value < 0
        ? TrendingDown
        : Minus
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card
        className={cn(
          'relative overflow-hidden rounded-2xl border-0 bg-card/50 backdrop-blur-md shadow-sm transition-shadow duration-300 hover:shadow-md',
          className
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
                {subtitle && (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
              </div>
              {trend && TrendIcon && (
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'flex items-center gap-1 text-sm font-medium',
                      trend.value > 0
                        ? 'text-crm-success'
                        : trend.value < 0
                          ? 'text-crm-danger'
                          : 'text-muted-foreground'
                    )}
                  >
                    <TrendIcon className="h-4 w-4" />
                    {Math.abs(trend.value)}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {trend.label}
                  </span>
                </div>
              )}
            </div>
            <div
              className={cn(
                'rounded-xl p-3',
                colors.bg
              )}
            >
              <Icon className={cn('h-6 w-6', colors.icon)} />
            </div>
          </div>
        </CardContent>
        {/* Decorative gradient */}
        <div
          className={cn(
            'absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl',
            colors.bg
          )}
        />
      </Card>
    </motion.div>
  )
}
