'use client'

import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import {
  LucideIcon,
  Mail,
  Phone,
  Calendar,
  FileText,
  MessageSquare,
  UserPlus,
  DollarSign,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export type ActivityType =
  | 'email'
  | 'call'
  | 'meeting'
  | 'note'
  | 'message'
  | 'contact_added'
  | 'deal_won'
  | 'task_completed'
  | 'reminder'

export interface Activity {
  id: string
  type: ActivityType
  title: string
  description?: string
  user: {
    name: string
    avatar?: string
  }
  timestamp: Date
  metadata?: {
    contact?: string
    deal?: string
    value?: number
  }
}

const activityIcons: Record<ActivityType, LucideIcon> = {
  email: Mail,
  call: Phone,
  meeting: Calendar,
  note: FileText,
  message: MessageSquare,
  contact_added: UserPlus,
  deal_won: DollarSign,
  task_completed: CheckCircle,
  reminder: Clock,
}

const activityColors: Record<ActivityType, string> = {
  email: 'bg-crm-info/10 text-crm-info',
  call: 'bg-crm-success/10 text-crm-success',
  meeting: 'bg-crm-purple/10 text-crm-purple',
  note: 'bg-crm-warning/10 text-crm-warning',
  message: 'bg-primary/10 text-primary',
  contact_added: 'bg-crm-teal/10 text-crm-teal',
  deal_won: 'bg-crm-success/10 text-crm-success',
  task_completed: 'bg-crm-success/10 text-crm-success',
  reminder: 'bg-crm-warning/10 text-crm-warning',
}

interface ActivityListProps {
  activities: Activity[]
  title?: string
  maxHeight?: number
  showViewAll?: boolean
  onViewAll?: () => void
}

export function ActivityList({
  activities,
  title = 'Activités récentes',
  maxHeight = 400,
  showViewAll = true,
  onViewAll,
}: ActivityListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="rounded-2xl border-0 bg-card/50 backdrop-blur-md shadow-sm transition-shadow duration-300 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {showViewAll && (
            <button
              onClick={onViewAll}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Voir tout
            </button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className={`h-[${maxHeight}px]`}>
            <div className="space-y-1 px-6 pb-6">
              {activities.map((activity, index) => {
                const Icon = activityIcons[activity.type]
                const colorClass = activityColors[activity.type]

                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-accent/50"
                  >
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                        colorClass
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium">
                          {activity.title}
                        </p>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatDistanceToNow(activity.timestamp, {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </span>
                      </div>
                      {activity.description && (
                        <p className="truncate text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback className="text-[10px]">
                            {activity.user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {activity.user.name}
                        </span>
                        {activity.metadata?.value && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {new Intl.NumberFormat('fr-FR', {
                              style: 'currency',
                              currency: 'EUR',
                            }).format(activity.metadata.value)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}
