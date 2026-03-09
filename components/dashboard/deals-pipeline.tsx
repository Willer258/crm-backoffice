'use client'

import { motion } from 'framer-motion'
import { MoreHorizontal, ArrowUpRight, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export interface Deal {
  id: string
  name: string
  company: string
  value: number
  probability: number
  stage: string
  daysInStage: number
  owner: {
    name: string
    avatar?: string
  }
  expectedCloseDate: Date
}

interface DealsPipelineProps {
  deals: Deal[]
  title?: string
  showViewAll?: boolean
  onViewAll?: () => void
}

const stageColors: Record<string, string> = {
  qualification: 'bg-crm-info/10 text-crm-info border-crm-info/30',
  proposition: 'bg-crm-purple/10 text-crm-purple border-crm-purple/30',
  negotiation: 'bg-crm-warning/10 text-crm-warning border-crm-warning/30',
  closing: 'bg-crm-success/10 text-crm-success border-crm-success/30',
}

export function DealsPipeline({
  deals,
  title = 'Deals en cours',
  showViewAll = true,
  onViewAll,
}: DealsPipelineProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value)
  }

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
              className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Voir tout
              <ArrowUpRight className="h-4 w-4" />
            </button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group rounded-xl border bg-background/50 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium truncate">{deal.name}</h4>
                      <p className="text-sm text-muted-foreground">{deal.company}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Ajouter une note</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg font-semibold">
                      {formatCurrency(deal.value)}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        'capitalize',
                        stageColors[deal.stage.toLowerCase()] || stageColors.qualification
                      )}
                    >
                      {deal.stage}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Probabilité</span>
                      <span className="font-medium">{deal.probability}%</span>
                    </div>
                    <Progress value={deal.probability} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={deal.owner.avatar} />
                        <AvatarFallback className="text-[10px]">
                          {deal.owner.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {deal.owner.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{deal.daysInStage} jours</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
