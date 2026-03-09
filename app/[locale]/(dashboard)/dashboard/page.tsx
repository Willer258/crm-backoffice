'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  UserPlus,
  Briefcase,
  Calendar,
  Settings,
  BarChart3,
  Target,
  Layers,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  KpiCard,
  AreaChartComponent,
  BarChartComponent,
  DonutChartComponent,
  LineChartComponent,
  ActivityList,
  ModuleGrid,
  DealsPipeline,
  StatsOverview,
  WelcomeBanner,
  type Activity,
  type ModuleItem,
  type Deal,
} from '@/components/dashboard'
import {
  dashboardStats,
  dealsByMonth,
  dealsByStage,
  mockDeals,
  mockActivities,
} from '@/lib/data/mock'
import { useUser } from '@/stores/auth.store'

// Transform mock data to match our component interfaces
const transformedActivities: Activity[] = mockActivities.map((a) => ({
  id: a.id,
  type: a.type === 'demo' ? 'meeting' : a.type === 'task' ? 'task_completed' : a.type,
  title: a.title,
  description: a.description,
  user: {
    name: a.assignedTo,
  },
  timestamp: new Date(a.date),
  metadata: {
    contact: a.contactName,
  },
}))

const transformedDeals: Deal[] = mockDeals
  .filter((d) => !['won', 'lost'].includes(d.stage))
  .slice(0, 4)
  .map((d, index) => ({
    id: d.id,
    name: d.title,
    company: d.companyName,
    value: d.value,
    probability: d.probability,
    stage:
      d.stage === 'prospect'
        ? 'Qualification'
        : d.stage === 'qualification'
          ? 'Qualification'
          : d.stage === 'proposal'
            ? 'Proposition'
            : 'Negotiation',
    daysInStage: ((index * 7 + 3) % 14) + 1, // Deterministic value based on index (1-14 days)
    owner: {
      name: d.assignedTo,
    },
    expectedCloseDate: new Date(d.closeDate),
  }))

const modules: ModuleItem[] = [
  {
    id: 'contacts',
    title: 'Contacts',
    description: 'Gestion des contacts et prospects',
    icon: Users,
    href: '/dashboard/contacts',
    color: 'primary',
    badge: dashboardStats.totalContacts,
  },
  {
    id: 'companies',
    title: 'Entreprises',
    description: 'Base de vos comptes clients',
    icon: Building2,
    href: '/dashboard/companies',
    color: 'info',
    badge: dashboardStats.totalCompanies,
  },
  {
    id: 'deals',
    title: 'Deals',
    description: 'Pipeline commercial',
    icon: Briefcase,
    href: '/dashboard/deals',
    color: 'success',
    badge: dashboardStats.activeDeals,
  },
  {
    id: 'activities',
    title: 'Activités',
    description: 'Suivi des actions commerciales',
    icon: Calendar,
    href: '/dashboard/activities',
    color: 'purple',
  },
  {
    id: 'projects',
    title: 'Projets',
    description: 'Gestion de projets clients',
    icon: Layers,
    href: '/dashboard/projects',
    color: 'teal',
  },
  {
    id: 'settings',
    title: 'Paramètres',
    description: 'Configuration du CRM',
    icon: Settings,
    href: '/dashboard/settings',
    color: 'warning',
  },
]

// Chart data transformations
const revenueData = dealsByMonth.map((d) => ({
  name: d.month,
  value: d.revenue / 1000,
  value2: d.deals * 10,
}))

const dealsBarData = dealsByMonth.slice(-6).map((d) => ({
  name: d.month,
  value: d.deals,
}))

const pipelineData = dealsByStage.map((d, index) => ({
  name: d.stage,
  value: d.count,
  color: ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'][
    index
  ],
}))

const performanceData = dealsByMonth.map((d) => ({
  name: d.month,
  deals: d.deals,
  revenue: d.revenue / 1000,
  target: 80,
}))

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const user = useUser()

  const userName =  user?.firstName || 'Utilisateur'


  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <WelcomeBanner
        userName={userName}
        message="Vous avez 3 deals en attente de closing cette semaine. Prêt à les convertir ?"
        ctaText="Voir le pipeline"
        ctaHref="/dashboard/deals"
      />

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild className="rounded-xl">
          <Link href="/dashboard/contacts">
            <UserPlus className="mr-2 h-4 w-4" />
            Nouveau contact
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/dashboard/deals">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau deal
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/dashboard/activities">
            <Calendar className="mr-2 h-4 w-4" />
            Planifier activité
          </Link>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Contacts"
          value={dashboardStats.totalContacts.toLocaleString('fr-FR')}
          subtitle={`${dashboardStats.totalCompanies} entreprises`}
          icon={Users}
          trend={{ value: 12, label: 'vs mois dernier' }}
          color="primary"
        />
        <KpiCard
          title="Deals Actifs"
          value={dashboardStats.activeDeals}
          subtitle={`Valeur: ${(dashboardStats.pipelineValue / 1000).toFixed(0)}K €`}
          icon={TrendingUp}
          trend={{ value: 8, label: 'vs mois dernier' }}
          color="success"
        />
        <KpiCard
          title="CA du Mois"
          value={`${(dashboardStats.totalRevenue / 1000).toFixed(0)}K €`}
          subtitle={`${dashboardStats.wonDeals} deals gagnés`}
          icon={DollarSign}
          trend={{ value: 47, label: 'vs mois dernier' }}
          color="info"
        />
        <KpiCard
          title="Taux de Conversion"
          value={`${dashboardStats.conversionRate}%`}
          subtitle={`Moyenne: ${(dashboardStats.avgDealValue / 1000).toFixed(0)}K € / deal`}
          icon={Target}
          trend={{ value: 5, label: 'vs mois dernier' }}
          color="purple"
        />
      </div>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-6">
        <TabsList className="bg-muted/50 w-fit rounded-xl p-1">
          <TabsTrigger value="overview" className="rounded-lg">
            <BarChart3 className="mr-2 h-4 w-4" />
            Vue d&apos;ensemble
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="rounded-lg">
            <Briefcase className="mr-2 h-4 w-4" />
            Pipeline
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg">
            <TrendingUp className="mr-2 h-4 w-4" />
            Analytique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 flex flex-col gap-6">
          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            <AreaChartComponent
              title="Évolution du Chiffre d'Affaires"
              description="Revenus mensuels (en K€)"
              data={revenueData}
              height={300}
            />
            <DonutChartComponent
              title="Distribution Pipeline"
              description="Répartition des deals par étape"
              data={pipelineData}
              height={300}
              centerLabel={{
                value: dashboardStats.activeDeals,
                label: 'deals actifs',
              }}
            />
          </div>

          {/* Activity & Deals Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ActivityList
              activities={transformedActivities}
              title="Activités récentes"
              maxHeight={400}
            />
            <DealsPipeline deals={transformedDeals} title="Deals en cours" />
          </div>

          {/* Quick Access Modules */}
          <ModuleGrid modules={modules} title="Accès rapide" columns={3} />
        </TabsContent>

        <TabsContent value="pipeline" className="mt-0 flex flex-col gap-6">
          {/* Pipeline focused view */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <BarChartComponent
                title="Deals par mois"
                description="Évolution sur les 6 derniers mois"
                data={dealsBarData}
                height={300}
                colorful
              />
            </div>
            <StatsOverview
              title="Objectifs du mois"
              description="Progression vers vos objectifs"
              stats={[
                {
                  label: 'Nouveaux contacts',
                  value: 45,
                  target: 50,
                  trend: 12,
                  color: 'primary',
                },
                {
                  label: 'Deals créés',
                  value: 8,
                  target: 10,
                  trend: -5,
                  color: 'info',
                },
                {
                  label: 'CA réalisé',
                  value: 38000,
                  target: 50000,
                  trend: 15,
                  color: 'success',
                },
              ]}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <DealsPipeline deals={transformedDeals} title="Top deals à surveiller" />
            <DonutChartComponent
              title="Valeur par étape"
              description="Répartition de la valeur pipeline"
              data={dealsByStage.map((d, i) => ({
                name: d.stage,
                value: d.value / 1000,
                color: [
                  'var(--chart-1)',
                  'var(--chart-2)',
                  'var(--chart-3)',
                  'var(--chart-4)',
                  'var(--chart-5)',
                ][i],
              }))}
              height={300}
              centerLabel={{
                value: `${(dashboardStats.pipelineValue / 1000).toFixed(0)}K`,
                label: 'Pipeline total',
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0 flex flex-col gap-6">
          {/* Analytics focused view */}
          <LineChartComponent
            title="Performance commerciale"
            description="Deals gagnés vs objectifs mensuels"
            data={performanceData}
            lines={[
              { dataKey: 'deals', name: 'Deals gagnés', color: 'var(--chart-1)' },
              { dataKey: 'target', name: 'Objectif', color: 'var(--chart-3)' },
            ]}
            height={320}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <StatsOverview
              title="Performance commerciaux"
              stats={[
                {
                  label: 'Jean Martin',
                  value: 125000,
                  target: 150000,
                  trend: 18,
                  color: 'success',
                },
                {
                  label: 'Marie Dubois',
                  value: 98000,
                  target: 120000,
                  trend: 8,
                  color: 'info',
                },
                {
                  label: 'Lucas Bernard',
                  value: 45000,
                  target: 80000,
                  trend: -12,
                  color: 'warning',
                },
              ]}
            />
            <div className="lg:col-span-2">
              <BarChartComponent
                title="CA par source"
                description="Performance des canaux d'acquisition"
                data={[
                  { name: 'LinkedIn', value: 85 },
                  { name: 'Salon', value: 67 },
                  { name: 'Référencement', value: 54 },
                  { name: 'Webinaire', value: 42 },
                  { name: 'Google Ads', value: 28 },
                ]}
                height={280}
                horizontal
                colorful
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <AreaChartComponent
              title="Tendance de conversion"
              description="Taux de conversion mensuel"
              data={[
                { name: 'Jan', value: 12 },
                { name: 'Fév', value: 15 },
                { name: 'Mar', value: 11 },
                { name: 'Avr', value: 18 },
                { name: 'Mai', value: 16 },
                { name: 'Jun', value: 22 },
                { name: 'Jul', value: 19 },
                { name: 'Aoû', value: 14 },
                { name: 'Sep', value: 25 },
                { name: 'Oct', value: 21 },
                { name: 'Nov', value: 18 },
                { name: 'Déc', value: 13 },
              ]}
              height={300}
            />
            <ActivityList
              activities={transformedActivities.slice(0, 5)}
              title="Activités à venir"
              showViewAll={false}
              maxHeight={380}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
