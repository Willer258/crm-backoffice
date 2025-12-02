'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Deal } from '@/lib/data/mock'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Building2, Calendar, TrendingUp, User } from 'lucide-react'
import Link from 'next/link'

interface DealCardProps {
  deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-green-600'
    if (probability >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const closeDate = new Date(deal.closeDate)
  const isOverdue = closeDate < new Date() && !['won', 'lost'].includes(deal.stage)

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Link href={`/dashboard/deals/${deal.id}`}>
        <Card className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-semibold text-sm leading-tight mb-1">
                  {deal.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Building2 className="h-3 w-3" />
                  <span>{deal.companyName}</span>
                </div>
              </div>
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {deal.contactName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Value and Probability */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-lg font-bold">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                {(deal.value / 1000).toFixed(0)}K €
              </div>
              <Badge
                variant="outline"
                className={getProbabilityColor(deal.probability)}
              >
                {deal.probability}%
              </Badge>
            </div>

            {/* Close Date */}
            <div className="flex items-center gap-1.5 text-xs">
              <Calendar className={`h-3 w-3 ${isOverdue ? 'text-red-600' : 'text-muted-foreground'}`} />
              <span className={isOverdue ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
                {isOverdue ? 'En retard · ' : ''}
                {closeDate.toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: closeDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
                })}
              </span>
            </div>

            {/* Assigned To */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{deal.assignedTo}</span>
            </div>

            {/* Tags */}
            {deal.tags && deal.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {deal.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                    {tag}
                  </Badge>
                ))}
                {deal.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0">
                    +{deal.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
