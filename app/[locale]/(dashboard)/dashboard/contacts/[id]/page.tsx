"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockContacts, mockDeals, mockActivities, mockCompanies } from '@/lib/data/mock'
import {
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  TrendingUp,
  Edit,
  Trash,
  ArrowLeft,
  ExternalLink,
  FileText,
  Activity,
  DollarSign,
} from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { notFound } from 'next/navigation'
import { use } from 'react'

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  task: FileText,
  demo: TrendingUp,
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function ContactDetailPage({ params }: PageProps) {
  // Unwrap params promise for Next.js 15
  const { id } = use(params)

  // Find the contact
  const contact = mockContacts.find(c => c.id === id)

  if (!contact) {
    notFound()
  }

  // Find related data
  const company = mockCompanies.find(c => c.id === contact.companyId)
  const relatedDeals = mockDeals.filter(d => d.contactId === contact.id)
  const relatedActivities = mockActivities.filter(a => a.contactName === `${contact.firstName} ${contact.lastName}`)

  // Calculate stats
  const totalDealValue = relatedDeals.reduce((sum, d) => sum + d.value, 0)
  const activeDealCount = relatedDeals.filter(d => !['won', 'lost'].includes(d.stage)).length

  const statusConfig = {
    lead: { label: 'Prospect', variant: 'outline' as const },
    qualified: { label: 'Qualifié', variant: 'secondary' as const },
    customer: { label: 'Client', variant: 'default' as const },
    churned: { label: 'Perdu', variant: 'destructive' as const },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/contacts">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Détails du contact</h1>
          <p className="text-muted-foreground">
            Informations complètes et historique
          </p>
        </div>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Modifier
        </Button>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Supprimer
        </Button>
      </div>

      {/* Contact Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={contact.avatar} alt={`${contact.firstName} ${contact.lastName}`} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {contact.firstName[0]}{contact.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">
                    {contact.firstName} {contact.lastName}
                  </h2>
                  <Badge variant={statusConfig[contact.status].variant}>
                    {statusConfig[contact.status].label}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">{contact.position}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${contact.phone}`} className="text-sm hover:underline">
                    {contact.phone}
                  </a>
                </div>
                {company && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <Link
                      href={`/dashboard/companies/${company.id}`}
                      className="text-sm hover:underline flex items-center gap-1"
                    >
                      {contact.company}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs">Deals actifs</CardDescription>
                  <CardTitle className="text-2xl">{activeDealCount}</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs">Valeur totale</CardDescription>
                  <CardTitle className="text-2xl">{(totalDealValue / 1000).toFixed(0)}K €</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="activities">
            Activités
            <Badge variant="secondary" className="ml-2">
              {relatedActivities.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="deals">
            Deals
            <Badge variant="secondary" className="ml-2">
              {relatedDeals.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Source</div>
                  <div className="text-sm">{contact.source}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Assigné à</div>
                  <div className="text-sm">{contact.assignedTo}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Dernier contact</div>
                  <div className="text-sm">
                    {new Date(contact.lastContact).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Créé le</div>
                  <div className="text-sm">
                    {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            {company && (
              <Card>
                <CardHeader>
                  <CardTitle>Entreprise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Nom</div>
                    <Link href={`/dashboard/companies/${company.id}`} className="text-sm hover:underline">
                      {company.name}
                    </Link>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Secteur</div>
                    <div className="text-sm">{company.industry}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Localisation</div>
                    <div className="text-sm flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {company.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Employés</div>
                    <div className="text-sm">{company.employeeCount} personnes</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des activités</CardTitle>
              <CardDescription>
                Toutes les interactions avec ce contact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {relatedActivities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Activity className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Aucune activité enregistrée</p>
                </div>
              ) : (
                relatedActivities
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((activity) => {
                    const Icon = activityIcons[activity.type]
                    return (
                      <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border">
                        <div className="mt-1 rounded-full bg-primary/10 p-2">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold">{activity.title}</h4>
                            <Badge variant={activity.status === 'scheduled' ? 'default' : 'secondary'}>
                              {activity.status === 'scheduled' ? 'Planifié' : 'Terminé'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(activity.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
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
        </TabsContent>

        {/* Deals Tab */}
        <TabsContent value="deals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deals associés</CardTitle>
              <CardDescription>
                Opportunités commerciales en cours et terminées
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {relatedDeals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <DollarSign className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Aucun deal associé</p>
                </div>
              ) : (
                relatedDeals.map((deal) => (
                  <Link key={deal.id} href={`/dashboard/deals/${deal.id}`}>
                    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold">{deal.title}</h4>
                        <p className="text-sm text-muted-foreground">{deal.companyName}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            {(deal.value / 1000).toFixed(0)}K €
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {deal.probability}% probabilité
                          </div>
                        </div>
                        <Badge
                          variant={
                            deal.stage === 'won'
                              ? 'default'
                              : deal.stage === 'lost'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {deal.stage === 'won'
                            ? 'Gagné'
                            : deal.stage === 'lost'
                            ? 'Perdu'
                            : deal.stage === 'negotiation'
                            ? 'Négociation'
                            : deal.stage === 'proposal'
                            ? 'Proposition'
                            : deal.stage === 'qualification'
                            ? 'Qualification'
                            : 'Lead'}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>
                Notes et commentaires sur ce contact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Aucune note disponible</p>
                <Button className="mt-4">Ajouter une note</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
