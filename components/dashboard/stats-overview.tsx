'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface StatItem {
  label: string
  value: number
  target: number
  trend?: number
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

interface StatsOverviewProps {
  title: string
  description?: string
  stats: StatItem[]
}

const colorVariants = {
  primary: 'bg-primary',
  success: 'bg-crm-success',
  warning: 'bg-crm-warning',
  danger: 'bg-crm-danger',
  info: 'bg-crm-info',
}

export function StatsOverview({ title, description, stats }: StatsOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="rounded-2xl border-0 bg-card/50 backdrop-blur-md shadow-sm transition-shadow duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {stats.map((stat, index) => {
            const progress = Math.min((stat.value / stat.target) * 100, 100)
            const color = colorVariants[stat.color || 'primary']

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {stat.value.toLocaleString('fr-FR')} / {stat.target.toLocaleString('fr-FR')}
                    </span>
                    {stat.trend !== undefined && (
                      <span
                        className={cn(
                          'flex items-center text-xs font-medium',
                          stat.trend > 0 ? 'text-crm-success' : 'text-crm-danger'
                        )}
                      >
                        {stat.trend > 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {Math.abs(stat.trend)}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <Progress value={progress} className="h-2" />
                  <div
                    className={cn(
                      'absolute top-0 left-0 h-2 rounded-full transition-all duration-500',
                      color
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {progress.toFixed(0)}% atteint
                </p>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </motion.div>
  )
}
