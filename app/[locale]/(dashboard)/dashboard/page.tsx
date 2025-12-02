"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Plus,
  Phone,
  Mail,
  Calendar,
  Target
} from 'lucide-react'
import Link from 'next/link'
import {
  dashboardStats,
  dealsByMonth,
  dealsByStage,
  mockActivities,
  mockDeals
} from '@/lib/data/mock'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  task: Target,
  demo: TrendingUp,
}

export default function DashboardPage() {
  const recentActivities = mockActivities.filter(a => a.status === 'scheduled').slice(0, 5)
  const upcomingDeals = mockDeals
    .filter(d => !['won', 'lost'].includes(d.stage))
    .sort((a, b) => new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard CRM</h1>
          <p className="text-muted-foreground">
            Vue d&apos;ensemble de vos performances commerciales
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/contacts">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau contact
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/deals">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau deal
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Contacts
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalContacts}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Entreprises
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalCompanies}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+8%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Deals Actifs
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.activeDeals}</div>
            <p className="text-xs text-muted-foreground">
              Valeur: <span className="font-semibold">{(dashboardStats.pipelineValue / 1000).toFixed(0)}K €</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              CA du Mois
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(dashboardStats.totalRevenue / 1000).toFixed(0)}K €</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+47%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Deals par mois */}
        <Card>
          <CardHeader>
            <CardTitle>Deals par mois</CardTitle>
            <CardDescription>Nombre de deals gagnés sur l&apos;année</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dealsByMonth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="deals" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribution Pipeline</CardTitle>
            <CardDescription>Répartition des deals par étape</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dealsByStage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.stage}: ${entry.count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {dealsByStage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Widgets Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Activités récentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Prochaines activités
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/activities">Voir tout</Link>
              </Button>
            </CardTitle>
            <CardDescription>À faire aujourd&apos;hui et demain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activityIcons[activity.type]
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-2">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.contactName} • {new Date(activity.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Deals à gagner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Deals à gagner
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/deals">Voir tout</Link>
              </Button>
            </CardTitle>
            <CardDescription>Opportunités proches de la signature</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeals.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{deal.companyName}</p>
                    <p className="text-xs text-muted-foreground">
                      {deal.value.toLocaleString('fr-FR')} € • {deal.probability}%
                    </p>
                  </div>
                  <Badge variant={deal.probability >= 70 ? 'default' : 'secondary'}>
                    {deal.stage === 'negotiation' ? 'Négociation' :
                     deal.stage === 'proposal' ? 'Proposition' :
                     deal.stage === 'qualification' ? 'Qualification' : 'Prospect'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats rapides */}
        <Card>
          <CardHeader>
            <CardTitle>Statistiques clés</CardTitle>
            <CardDescription>Performance globale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Taux de conversion</span>
                <span className="text-2xl font-bold text-green-600">{dashboardStats.conversionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Valeur moyenne deal</span>
                <span className="text-2xl font-bold">{(dashboardStats.avgDealValue / 1000).toFixed(0)}K €</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Deals gagnés</span>
                <span className="text-2xl font-bold text-green-600">{dashboardStats.wonDeals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pipeline total</span>
                <span className="text-2xl font-bold">{(dashboardStats.pipelineValue / 1000).toFixed(0)}K €</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
