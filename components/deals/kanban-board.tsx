'use client'

import * as React from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Deal } from '@/lib/data/mock'
import { DealCard } from './deal-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const STAGE_CONFIG = {
  prospect: { label: 'Prospect', color: 'bg-slate-100 border-slate-300', count: 0 },
  qualification: { label: 'Qualification', color: 'bg-blue-100 border-blue-300', count: 0 },
  proposal: { label: 'Proposition', color: 'bg-purple-100 border-purple-300', count: 0 },
  negotiation: { label: 'Négociation', color: 'bg-orange-100 border-orange-300', count: 0 },
  won: { label: 'Gagné', color: 'bg-green-100 border-green-300', count: 0 },
  lost: { label: 'Perdu', color: 'bg-red-100 border-red-300', count: 0 },
}

interface KanbanBoardProps {
  deals: Deal[]
  onDealMove?: (dealId: string, newStage: Deal['stage']) => void
}

export function KanbanBoard({ deals: initialDeals, onDealMove }: KanbanBoardProps) {
  const [deals, setDeals] = React.useState<Deal[]>(initialDeals)
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Group deals by stage
  const dealsByStage = React.useMemo(() => {
    const grouped: Record<Deal['stage'], Deal[]> = {
      prospect: [],
      qualification: [],
      proposal: [],
      negotiation: [],
      won: [],
      lost: [],
    }

    deals.forEach((deal) => {
      grouped[deal.stage].push(deal)
    })

    return grouped
  }, [deals])

  // Calculate stage stats
  const stageStats = React.useMemo(() => {
    const stats: Record<Deal['stage'], { count: number; value: number }> = {
      prospect: { count: 0, value: 0 },
      qualification: { count: 0, value: 0 },
      proposal: { count: 0, value: 0 },
      negotiation: { count: 0, value: 0 },
      won: { count: 0, value: 0 },
      lost: { count: 0, value: 0 },
    }

    deals.forEach((deal) => {
      stats[deal.stage].count++
      stats[deal.stage].value += deal.value
    })

    return stats
  }, [deals])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const dealId = active.id as string
    const newStage = over.id as Deal['stage']

    // Update local state
    setDeals((currentDeals) =>
      currentDeals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      )
    )

    // Notify parent component
    onDealMove?.(dealId, newStage)

    setActiveId(null)
  }

  const activeDeal = activeId ? deals.find((d) => d.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {(Object.keys(STAGE_CONFIG) as Deal['stage'][]).map((stage) => {
          const config = STAGE_CONFIG[stage]
          const stageDeals = dealsByStage[stage]
          const stats = stageStats[stage]

          return (
            <SortableContext
              key={stage}
              id={stage}
              items={stageDeals.map((d) => d.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex-shrink-0 w-80">
                <Card className={cn('border-2', config.color)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">
                        {config.label}
                      </CardTitle>
                      <Badge variant="secondary">{stats.count}</Badge>
                    </div>
                    {stats.value > 0 && (
                      <div className="text-sm font-medium text-muted-foreground">
                        {(stats.value / 1000).toFixed(0)}K €
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3 min-h-[500px]">
                    {stageDeals.map((deal) => (
                      <DealCard key={deal.id} deal={deal} />
                    ))}
                    {stageDeals.length === 0 && (
                      <div className="flex items-center justify-center h-32 text-sm text-muted-foreground border-2 border-dashed rounded-lg">
                        Glissez un deal ici
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </SortableContext>
          )
        })}
      </div>

      <DragOverlay>
        {activeDeal ? (
          <div className="cursor-grabbing">
            <DealCard deal={activeDeal} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
