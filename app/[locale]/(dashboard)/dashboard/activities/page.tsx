"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { mockActivities } from '@/lib/data/mock'
import { Plus, Phone, Mail, Calendar as CalendarIcon, Target, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: CalendarIcon,
  task: Target,
  demo: TrendingUp,
}

const activityColors = {
  call: 'bg-purple-100 text-purple-700 border-purple-300',
  email: 'bg-teal-100 text-teal-700 border-teal-300',
  meeting: 'bg-pink-100 text-pink-700 border-pink-300',
  task: 'bg-blue-100 text-blue-700 border-blue-300',
  demo: 'bg-orange-100 text-orange-700 border-orange-300',
}

const statusLabels = {
  scheduled: 'Planifié',
  completed: 'Terminé',
  cancelled: 'Annulé',
}

export default function ActivitiesPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Filter activities
  const filteredActivities = mockActivities.filter(activity => {
    if (typeFilter !== 'all' && activity.type !== typeFilter) return false
    if (statusFilter !== 'all' && activity.status !== statusFilter) return false
    return true
  })

  // Group activities by date
  const activitiesByDate = filteredActivities.reduce((acc, activity) => {
    const date = new Date(activity.date).toDateString()
    if (!acc[date]) acc[date] = []
    acc[date].push(activity)
    return acc
  }, {} as Record<string, typeof mockActivities>)

  // Get activities for selected date
  const selectedDateActivities = selectedDate
    ? activitiesByDate[selectedDate.toDateString()] || []
    : []

  // Calculate stats
  const stats = {
    scheduled: mockActivities.filter(a => a.status === 'scheduled').length,
    completed: mockActivities.filter(a => a.status === 'completed').length,
    calls: mockActivities.filter(a => a.type === 'call').length,
    meetings: mockActivities.filter(a => a.type === 'meeting').length,
  }

  // Dates with activities
  const datesWithActivities = Object.keys(activitiesByDate).map(date => new Date(date))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activités</h1>
          <p className="text-muted-foreground">
            Gérez et planifiez toutes vos activités commerciales
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle activité
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">À venir</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduled}</div>
            <p className="text-xs text-muted-foreground">
              Activités planifiées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appels</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.calls}</div>
            <p className="text-xs text-muted-foreground">
              Total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réunions</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.meetings}</div>
            <p className="text-xs text-muted-foreground">
              Total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="list">Liste</TabsTrigger>
        </TabsList>

        {/* Calendar View */}
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-[350px_1fr]">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendrier</CardTitle>
                <CardDescription>Sélectionnez une date</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={{
                    hasActivity: datesWithActivities,
                  }}
                  modifiersClassNames={{
                    hasActivity: 'bg-primary/10 font-bold',
                  }}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Activities for selected date */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? selectedDate.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Sélectionnez une date'}
                </CardTitle>
                <CardDescription>
                  {selectedDateActivities.length} activité{selectedDateActivities.length > 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDateActivities.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">
                      Aucune activité prévue ce jour
                    </p>
                  </div>
                ) : (
                  selectedDateActivities
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((activity) => {
                      const Icon = activityIcons[activity.type]
                      const colorClass = activityColors[activity.type]

                      return (
                        <div
                          key={activity.id}
                          className={`flex items-start gap-4 p-4 rounded-lg border-2 ${colorClass}`}
                        >
                          <div className={`mt-1 rounded-full p-2 ${colorClass}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-semibold">{activity.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(activity.date).toLocaleTimeString('fr-FR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                              <Badge variant={activity.status === 'scheduled' ? 'default' : 'secondary'}>
                                {statusLabels[activity.status]}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {activity.contactName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{activity.contactName}</span>
                            </div>
                            {activity.description && (
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                            )}
                          </div>
                        </div>
                      )
                    })
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="call">Appels</SelectItem>
                    <SelectItem value="email">Emails</SelectItem>
                    <SelectItem value="meeting">Réunions</SelectItem>
                    <SelectItem value="task">Tâches</SelectItem>
                    <SelectItem value="demo">Démos</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="scheduled">Planifiés</SelectItem>
                    <SelectItem value="completed">Terminés</SelectItem>
                    <SelectItem value="cancelled">Annulés</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex-1" />
                <div className="text-sm text-muted-foreground">
                  {filteredActivities.length} activité{filteredActivities.length > 1 ? 's' : ''}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredActivities
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((activity) => {
                  const Icon = activityIcons[activity.type]
                  const colorClass = activityColors[activity.type]

                  return (
                    <div
                      key={activity.id}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 ${colorClass}`}
                    >
                      <div className={`mt-1 rounded-full p-2 ${colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <Badge variant={activity.status === 'scheduled' ? 'default' : 'secondary'}>
                            {statusLabels[activity.status]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {activity.contactName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{activity.contactName}</span>
                        </div>
                        {activity.description && (
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
