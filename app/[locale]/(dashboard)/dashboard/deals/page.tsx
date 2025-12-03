"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KanbanBoard } from '@/components/deals/kanban-board'
import { mockDeals } from '@/lib/data/mock'
import { Plus, TrendingUp, DollarSign, Target, Award } from 'lucide-react'
import { useState } from 'react'

export default function DealsPage() {
  const [deals] = useState(mockDeals)

  // Calculate stats
  const stats = {
    total: deals.filter(d => !['won', 'lost'].includes(d.stage)).length,
    totalValue: deals.filter(d => !['won', 'lost'].includes(d.stage)).reduce((sum, d) => sum + d.value, 0),
    avgValue: deals.filter(d => !['won', 'lost'].includes(d.stage)).length > 0
      ? deals.filter(d => !['won', 'lost'].includes(d.stage)).reduce((sum, d) => sum + d.value, 0) /
        deals.filter(d => !['won', 'lost'].includes(d.stage)).length
      : 0,
    wonDeals: deals.filter(d => d.stage === 'won').length,
    wonValue: deals.filter(d => d.stage === 'won').reduce((sum, d) => sum + d.value, 0),
  }

  const handleDealMove = (dealId: string, newStage: string) => {
    console.log(`Deal ${dealId} moved to ${newStage}`)
    // In a real app, this would call an API to update the deal stage
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline des Deals</h1>
          <p className="text-muted-foreground">
            Gérez vos opportunités commerciales avec le Kanban drag & drop
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau deal
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deals Actifs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              En cours de négociation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur Pipeline</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.totalValue / 1000).toFixed(0)}K €</div>
            <p className="text-xs text-muted-foreground">
              Opportunités actives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur Moyenne</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.avgValue / 1000).toFixed(0)}K €</div>
            <p className="text-xs text-muted-foreground">
              Par deal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deals Gagnés</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.wonDeals}</div>
            <p className="text-xs text-muted-foreground">
              {(stats.wonValue / 1000).toFixed(0)}K € de CA
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="rounded-lg border bg-card p-6">
        <KanbanBoard deals={deals} onDealMove={handleDealMove} />
      </div>
    </div>
  )
}
