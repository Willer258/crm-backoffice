// Mock data for CRM demonstration
// This will be replaced with real API calls later

export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  companyId: string
  position: string
  avatar?: string
  tags: string[]
  status: 'lead' | 'qualified' | 'customer' | 'churned'
  source: string
  assignedTo: string
  lastContact: string
  createdAt: string
  dealValue: number
}

export interface Company {
  id: string
  name: string
  industry: string
  size: string
  website: string
  phone: string
  address: string
  logo?: string
  contactsCount: number
  dealsCount: number
  totalValue: number
  status: 'active' | 'inactive' | 'prospect'
  createdAt: string
}

export interface Deal {
  id: string
  title: string
  value: number
  probability: number
  stage: 'prospect' | 'qualification' | 'proposal' | 'negotiation' | 'won' | 'lost'
  contactId: string
  contactName: string
  companyId: string
  companyName: string
  assignedTo: string
  closeDate: string
  createdAt: string
  notes?: string
}

export interface Activity {
  id: string
  type: 'call' | 'email' | 'meeting' | 'task' | 'demo'
  title: string
  description?: string
  contactId: string
  contactName: string
  companyId?: string
  companyName?: string
  dealId?: string
  date: string
  duration?: number
  status: 'scheduled' | 'completed' | 'cancelled'
  assignedTo: string
  createdAt: string
}

// Mock Contacts
export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'Sophie',
    lastName: 'Durand',
    email: 'sophie.durand@techsolutions.fr',
    phone: '+33 6 12 34 56 78',
    company: 'TechSolutions',
    companyId: '1',
    position: 'Directrice Commerciale',
    tags: ['VIP', 'Decision Maker'],
    status: 'customer',
    source: 'LinkedIn',
    assignedTo: 'Jean Martin',
    lastContact: '2025-11-28',
    createdAt: '2024-03-15',
    dealValue: 45000,
  },
  {
    id: '2',
    firstName: 'Thomas',
    lastName: 'Lefebvre',
    email: 'thomas.lefebvre@startupgrowth.io',
    phone: '+33 6 23 45 67 89',
    company: 'StartupGrowth',
    companyId: '2',
    position: 'CEO',
    tags: ['Hot Lead', 'Startup'],
    status: 'qualified',
    source: 'Référencement',
    assignedTo: 'Marie Dubois',
    lastContact: '2025-11-30',
    createdAt: '2024-06-20',
    dealValue: 28000,
  },
  {
    id: '3',
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@innovcorp.com',
    phone: '+33 6 34 56 78 90',
    company: 'InnovCorp',
    companyId: '3',
    position: 'Responsable Ventes',
    tags: ['Customer'],
    status: 'customer',
    source: 'Salon',
    assignedTo: 'Jean Martin',
    lastContact: '2025-12-01',
    createdAt: '2024-01-10',
    dealValue: 67000,
  },
  {
    id: '4',
    firstName: 'Lucas',
    lastName: 'Bernard',
    email: 'lucas.bernard@digitalpro.fr',
    phone: '+33 6 45 67 89 01',
    company: 'DigitalPro',
    companyId: '4',
    position: 'Directeur Marketing',
    tags: ['Lead'],
    status: 'lead',
    source: 'Google Ads',
    assignedTo: 'Marie Dubois',
    lastContact: '2025-11-25',
    createdAt: '2024-11-15',
    dealValue: 15000,
  },
  {
    id: '5',
    firstName: 'Emma',
    lastName: 'Petit',
    email: 'emma.petit@cloudservices.com',
    phone: '+33 6 56 78 90 12',
    company: 'CloudServices',
    companyId: '5',
    position: 'CTO',
    tags: ['Technical', 'Decision Maker'],
    status: 'qualified',
    source: 'Webinaire',
    assignedTo: 'Jean Martin',
    lastContact: '2025-11-29',
    createdAt: '2024-08-05',
    dealValue: 52000,
  },
  {
    id: '6',
    firstName: 'Alexandre',
    lastName: 'Moreau',
    email: 'alex.moreau@salesforce.example',
    phone: '+33 6 67 89 01 23',
    company: 'SalesForce Example',
    companyId: '6',
    position: 'Account Manager',
    tags: ['Partner'],
    status: 'customer',
    source: 'Partenariat',
    assignedTo: 'Marie Dubois',
    lastContact: '2025-12-02',
    createdAt: '2024-02-28',
    dealValue: 89000,
  },
]

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechSolutions',
    industry: 'Technologie',
    size: '50-200',
    website: 'https://techsolutions.fr',
    phone: '+33 1 23 45 67 89',
    address: '123 Avenue des Champs-Élysées, 75008 Paris',
    contactsCount: 8,
    dealsCount: 3,
    totalValue: 125000,
    status: 'active',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    name: 'StartupGrowth',
    industry: 'Conseil',
    size: '10-50',
    website: 'https://startupgrowth.io',
    phone: '+33 1 34 56 78 90',
    address: '45 Rue de Rivoli, 75001 Paris',
    contactsCount: 5,
    dealsCount: 2,
    totalValue: 78000,
    status: 'active',
    createdAt: '2024-06-20',
  },
  {
    id: '3',
    name: 'InnovCorp',
    industry: 'Innovation',
    size: '200-500',
    website: 'https://innovcorp.com',
    phone: '+33 1 45 67 89 01',
    address: '78 Boulevard Haussmann, 75009 Paris',
    contactsCount: 12,
    dealsCount: 5,
    totalValue: 234000,
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: '4',
    name: 'DigitalPro',
    industry: 'Marketing Digital',
    size: '10-50',
    website: 'https://digitalpro.fr',
    phone: '+33 1 56 78 90 12',
    address: '12 Rue du Faubourg Saint-Honoré, 75008 Paris',
    contactsCount: 3,
    dealsCount: 1,
    totalValue: 45000,
    status: 'prospect',
    createdAt: '2024-11-15',
  },
  {
    id: '5',
    name: 'CloudServices',
    industry: 'Cloud Computing',
    size: '100-200',
    website: 'https://cloudservices.com',
    phone: '+33 1 67 89 01 23',
    address: '34 Avenue Montaigne, 75008 Paris',
    contactsCount: 7,
    dealsCount: 4,
    totalValue: 189000,
    status: 'active',
    createdAt: '2024-08-05',
  },
  {
    id: '6',
    name: 'SalesForce Example',
    industry: 'Software',
    size: '500+',
    website: 'https://salesforce.example',
    phone: '+33 1 78 90 12 34',
    address: '56 Rue de la Paix, 75002 Paris',
    contactsCount: 15,
    dealsCount: 6,
    totalValue: 456000,
    status: 'active',
    createdAt: '2024-02-28',
  },
]

// Mock Deals
export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'CRM Enterprise - TechSolutions',
    value: 45000,
    probability: 75,
    stage: 'negotiation',
    contactId: '1',
    contactName: 'Sophie Durand',
    companyId: '1',
    companyName: 'TechSolutions',
    assignedTo: 'Jean Martin',
    closeDate: '2025-12-15',
    createdAt: '2024-10-01',
    notes: 'Deal prometteur, budget confirmé',
  },
  {
    id: '2',
    title: 'CRM Starter - StartupGrowth',
    value: 12000,
    probability: 60,
    stage: 'proposal',
    contactId: '2',
    contactName: 'Thomas Lefebvre',
    companyId: '2',
    companyName: 'StartupGrowth',
    assignedTo: 'Marie Dubois',
    closeDate: '2025-12-20',
    createdAt: '2024-11-05',
    notes: 'En attente de validation interne',
  },
  {
    id: '3',
    title: 'CRM Pro + Support - InnovCorp',
    value: 67000,
    probability: 90,
    stage: 'negotiation',
    contactId: '3',
    contactName: 'Marie Dubois',
    companyId: '3',
    companyName: 'InnovCorp',
    assignedTo: 'Jean Martin',
    closeDate: '2025-12-10',
    createdAt: '2024-09-15',
    notes: 'Prêt à signer, contrat en relecture',
  },
  {
    id: '4',
    title: 'CRM Discovery - DigitalPro',
    value: 8000,
    probability: 30,
    stage: 'qualification',
    contactId: '4',
    contactName: 'Lucas Bernard',
    companyId: '4',
    companyName: 'DigitalPro',
    assignedTo: 'Marie Dubois',
    closeDate: '2026-01-15',
    createdAt: '2024-11-20',
    notes: 'Premier contact, besoin de qualification',
  },
  {
    id: '5',
    title: 'CRM Enterprise - CloudServices',
    value: 52000,
    probability: 70,
    stage: 'proposal',
    contactId: '5',
    contactName: 'Emma Petit',
    companyId: '5',
    companyName: 'CloudServices',
    assignedTo: 'Jean Martin',
    closeDate: '2025-12-25',
    createdAt: '2024-10-10',
    notes: 'Proposition envoyée, RDV planifié',
  },
  {
    id: '6',
    title: 'CRM Custom - SalesForce Example',
    value: 125000,
    probability: 85,
    stage: 'negotiation',
    contactId: '6',
    contactName: 'Alexandre Moreau',
    companyId: '6',
    companyName: 'SalesForce Example',
    assignedTo: 'Marie Dubois',
    closeDate: '2025-12-08',
    createdAt: '2024-08-01',
    notes: 'Deal stratégique, négociation finale',
  },
  {
    id: '7',
    title: 'CRM Renewal - TechSolutions',
    value: 38000,
    probability: 95,
    stage: 'won',
    contactId: '1',
    contactName: 'Sophie Durand',
    companyId: '1',
    companyName: 'TechSolutions',
    assignedTo: 'Jean Martin',
    closeDate: '2025-11-30',
    createdAt: '2024-11-01',
    notes: 'Renouvellement signé !',
  },
  {
    id: '8',
    title: 'CRM Pilot - DigitalPro',
    value: 5000,
    probability: 20,
    stage: 'prospect',
    contactId: '4',
    contactName: 'Lucas Bernard',
    companyId: '4',
    companyName: 'DigitalPro',
    assignedTo: 'Marie Dubois',
    closeDate: '2026-02-01',
    createdAt: '2024-11-25',
    notes: 'Phase de découverte',
  },
]

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Appel de suivi - TechSolutions',
    description: 'Discuter des derniers détails du contrat',
    contactId: '1',
    contactName: 'Sophie Durand',
    companyId: '1',
    companyName: 'TechSolutions',
    dealId: '1',
    date: '2025-12-03T10:00:00',
    duration: 30,
    status: 'scheduled',
    assignedTo: 'Jean Martin',
    createdAt: '2025-12-01',
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Démo produit - StartupGrowth',
    description: 'Présentation complète de la solution CRM',
    contactId: '2',
    contactName: 'Thomas Lefebvre',
    companyId: '2',
    companyName: 'StartupGrowth',
    dealId: '2',
    date: '2025-12-04T14:00:00',
    duration: 60,
    status: 'scheduled',
    assignedTo: 'Marie Dubois',
    createdAt: '2025-11-28',
  },
  {
    id: '3',
    type: 'email',
    title: 'Envoi proposition - InnovCorp',
    description: 'Envoyer la proposition commerciale finalisée',
    contactId: '3',
    contactName: 'Marie Dubois',
    companyId: '3',
    companyName: 'InnovCorp',
    dealId: '3',
    date: '2025-12-02T09:00:00',
    status: 'completed',
    assignedTo: 'Jean Martin',
    createdAt: '2025-12-02',
  },
  {
    id: '4',
    type: 'task',
    title: 'Préparer devis - CloudServices',
    description: 'Créer le devis personnalisé avec tarifs négociés',
    contactId: '5',
    contactName: 'Emma Petit',
    companyId: '5',
    companyName: 'CloudServices',
    dealId: '5',
    date: '2025-12-03T16:00:00',
    status: 'scheduled',
    assignedTo: 'Jean Martin',
    createdAt: '2025-12-01',
  },
  {
    id: '5',
    type: 'demo',
    title: 'Démo technique - SalesForce Example',
    description: 'Démonstration des intégrations API',
    contactId: '6',
    contactName: 'Alexandre Moreau',
    companyId: '6',
    companyName: 'SalesForce Example',
    dealId: '6',
    date: '2025-12-05T11:00:00',
    duration: 90,
    status: 'scheduled',
    assignedTo: 'Marie Dubois',
    createdAt: '2025-11-30',
  },
  {
    id: '6',
    type: 'call',
    title: 'Relance - DigitalPro',
    description: 'Prendre des nouvelles et qualifier le besoin',
    contactId: '4',
    contactName: 'Lucas Bernard',
    companyId: '4',
    companyName: 'DigitalPro',
    date: '2025-12-06T15:30:00',
    duration: 15,
    status: 'scheduled',
    assignedTo: 'Marie Dubois',
    createdAt: '2025-12-01',
  },
]

// Dashboard Stats
export const dashboardStats = {
  totalContacts: mockContacts.length,
  totalCompanies: mockCompanies.length,
  activeDeals: mockDeals.filter(d => !['won', 'lost'].includes(d.stage)).length,
  wonDeals: mockDeals.filter(d => d.stage === 'won').length,
  totalRevenue: mockDeals.filter(d => d.stage === 'won').reduce((sum, d) => sum + d.value, 0),
  pipelineValue: mockDeals.filter(d => !['won', 'lost'].includes(d.stage)).reduce((sum, d) => sum + d.value, 0),
  avgDealValue: Math.round(mockDeals.reduce((sum, d) => sum + d.value, 0) / mockDeals.length),
  conversionRate: Math.round((mockDeals.filter(d => d.stage === 'won').length / mockDeals.length) * 100),
}

// Chart data for dashboard
export const dealsByMonth = [
  { month: 'Jan', deals: 4, revenue: 45000 },
  { month: 'Fév', deals: 5, revenue: 67000 },
  { month: 'Mar', deals: 3, revenue: 34000 },
  { month: 'Avr', deals: 7, revenue: 89000 },
  { month: 'Mai', deals: 6, revenue: 72000 },
  { month: 'Juin', deals: 8, revenue: 95000 },
  { month: 'Juil', deals: 5, revenue: 58000 },
  { month: 'Août', deals: 4, revenue: 48000 },
  { month: 'Sep', deals: 9, revenue: 112000 },
  { month: 'Oct', deals: 7, revenue: 87000 },
  { month: 'Nov', deals: 6, revenue: 76000 },
  { month: 'Déc', deals: 3, revenue: 38000 },
]

export const dealsByStage = [
  { stage: 'Prospect', count: mockDeals.filter(d => d.stage === 'prospect').length, value: mockDeals.filter(d => d.stage === 'prospect').reduce((sum, d) => sum + d.value, 0) },
  { stage: 'Qualification', count: mockDeals.filter(d => d.stage === 'qualification').length, value: mockDeals.filter(d => d.stage === 'qualification').reduce((sum, d) => sum + d.value, 0) },
  { stage: 'Proposition', count: mockDeals.filter(d => d.stage === 'proposal').length, value: mockDeals.filter(d => d.stage === 'proposal').reduce((sum, d) => sum + d.value, 0) },
  { stage: 'Négociation', count: mockDeals.filter(d => d.stage === 'negotiation').length, value: mockDeals.filter(d => d.stage === 'negotiation').reduce((sum, d) => sum + d.value, 0) },
  { stage: 'Gagné', count: mockDeals.filter(d => d.stage === 'won').length, value: mockDeals.filter(d => d.stage === 'won').reduce((sum, d) => sum + d.value, 0) },
]
