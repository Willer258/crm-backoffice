"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CompaniesTable } from '@/components/tables/companies-table'
import { mockCompanies } from '@/lib/data/mock'
import { Plus, Building2, TrendingUp, Users, DollarSign } from 'lucide-react'

export default function CompaniesPage() {
  // Calculate stats from mock data
  const stats = {
    total: mockCompanies.length,
    totalEmployees: mockCompanies.reduce((sum, c) => sum + c.employeeCount, 0),
    totalContacts: mockCompanies.reduce((sum, c) => sum + c.contactsCount, 0),
    totalDeals: mockCompanies.reduce((sum, c) => sum + c.dealsCount, 0),
    totalValue: mockCompanies.reduce((sum, c) => sum + c.totalValue, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Entreprises</h1>
          <p className="text-muted-foreground">
            Gérez votre portefeuille d'entreprises clients et prospects
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle entreprise
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entreprises</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Dans votre portefeuille
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground">
              Contacts associés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deals Actifs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDeals}</div>
            <p className="text-xs text-muted-foreground">
              Opportunités en cours
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
              Valeur totale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des entreprises</CardTitle>
          <CardDescription>
            Visualisez et gérez toutes vos entreprises en un seul endroit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompaniesTable data={mockCompanies} />
        </CardContent>
      </Card>
    </div>
  )
}
