'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Check,
  TrendingUp,
  Mail,
  Calendar,
  BarChart3,
  Workflow,
  Shield,
  Zap,
  Star,
  Play,
  Sparkles,
  Globe,
  FileText,
  Lock,
  UserCircle,
} from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

// Features principales avec description concise + carousel items
const mainFeatures = [
  {
    id: 'contacts',
    icon: UserCircle,
    title: 'Gestion des contacts',
    tagline: 'Tout vos contacts, au même endroit',
    description: 'Centralisez prospects et clients dans une interface unifiée. Enrichissement automatique, scoring intelligent et historique complet de chaque interaction.',
    carouselItems: [
      { title: 'Fiches enrichies', desc: 'Champs personnalisables illimités' },
      { title: 'Timeline activités', desc: 'Historique chronologique complet' },
      { title: 'Import intelligent', desc: 'CSV, Excel avec déduplication' },
      { title: 'Lead scoring', desc: 'Priorisation automatique' },
    ],
    mockup: {
      type: 'contact-card',
      data: {
        name: 'Marie Dupont',
        company: 'TechCorp',
        score: 85,
        status: 'Hot Lead',
        lastActivity: 'Appel il y a 2h',
      },
    },
  },
  {
    id: 'pipeline',
    icon: TrendingUp,
    title: 'Pipeline commercial',
    tagline: 'Visualisez chaque opportunité',
    description: 'Vue Kanban intuitive pour piloter vos deals du premier contact au closing. Prévisions automatiques et alertes sur les opportunités stagnantes.',
    carouselItems: [
      { title: 'Vue Kanban', desc: 'Drag & drop intuitif' },
      { title: 'Multi-pipelines', desc: 'Nouveaux clients, upsell...' },
      { title: 'Prévisions', desc: 'CA prévu automatique' },
      { title: 'Alertes deals', desc: 'Notifications stagnation' },
    ],
    mockup: {
      type: 'kanban',
      stages: ['Qualification', 'Proposition', 'Négociation', 'Closing'],
      deals: [
        { name: 'TechCorp', value: '45K€', stage: 0 },
        { name: 'StartupXYZ', value: '28K€', stage: 1 },
        { name: 'BigRetail', value: '120K€', stage: 2 },
      ],
    },
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics & Reporting',
    tagline: 'Décisions basées sur la data',
    description: 'Tableaux de bord personnalisables en temps réel. Suivez vos KPIs, analysez les performances et anticipez votre CA avec précision.',
    carouselItems: [
      { title: 'Dashboards live', desc: 'Widgets personnalisables' },
      { title: 'Rapports avancés', desc: 'Export PDF, Excel' },
      { title: 'Objectifs & quotas', desc: 'Suivi en temps réel' },
      { title: 'Prévisions CA', desc: 'Projections 12 mois' },
    ],
    mockup: {
      type: 'chart',
      metrics: [
        { label: 'CA Mensuel', value: '284K€', trend: '+18%' },
        { label: 'Deals gagnés', value: '47', trend: '+12%' },
        { label: 'Taux conversion', value: '34%', trend: '+5%' },
      ],
    },
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Automatisation',
    tagline: 'Moins de tâches, plus de ventes',
    description: 'Workflows visuels sans code. Automatisez les relances, l\'attribution des leads et les notifications pour vous concentrer sur le closing.',
    carouselItems: [
      { title: 'Workflows visuels', desc: 'Éditeur drag & drop' },
      { title: 'Séquences emails', desc: 'Nurturing automatique' },
      { title: 'Attribution leads', desc: 'Round-robin intelligent' },
      { title: 'Notifications', desc: 'Alertes personnalisées' },
    ],
    mockup: {
      type: 'workflow',
      nodes: ['Nouveau lead', 'Email bienvenue', 'Attente 2j', 'Relance auto'],
    },
  },
]

// Carousel Component
function FeatureCarousel({ items }: { items: { title: string; desc: string }[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <div className="relative">
      <div className="flex gap-2 mb-4">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? 'w-8 bg-primary' : 'w-1.5 bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[80px]"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-2">
            {items[current].title}
          </div>
          <p className="text-muted-foreground">{items[current].desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Mockup Components
function ContactCardMockup({ data }: { data: { name: string; company: string; score: number; status: string; lastActivity: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Floating score badge */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium shadow-lg"
      >
        Score: {data.score}
      </motion.div>

      <div className="bg-card border-2 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
            {data.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-lg">{data.name}</h4>
            <p className="text-muted-foreground">{data.company}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground">Statut</span>
            <Badge variant="secondary">{data.status}</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground">Dernière activité</span>
            <span className="text-sm font-medium">{data.lastActivity}</span>
          </div>
        </div>
        {/* Activity timeline preview */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>3 emails échangés cette semaine</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function KanbanMockup({ stages, deals }: { stages: string[]; deals: { name: string; value: string; stage: number }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-card border-2 rounded-2xl p-4 shadow-xl overflow-hidden"
    >
      <div className="flex gap-3 overflow-x-auto pb-2">
        {stages.map((stage, idx) => (
          <div key={stage} className="shrink-0 w-44">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">{stage}</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {deals.filter(d => d.stage === idx).length}
              </span>
            </div>
            <div className="space-y-2">
              {deals
                .filter(d => d.stage === idx)
                .map((deal, dealIdx) => (
                  <motion.div
                    key={deal.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: dealIdx * 0.1 + idx * 0.2 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-muted/50 border rounded-lg p-3 cursor-pointer hover:border-primary/50 transition-all"
                  >
                    <p className="font-medium text-sm">{deal.name}</p>
                    <p className="text-primary font-bold">{deal.value}</p>
                  </motion.div>
                ))}
              {deals.filter(d => d.stage === idx).length === 0 && (
                <div className="border-2 border-dashed rounded-lg p-4 text-center text-muted-foreground text-sm">
                  Drop ici
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Total pipeline */}
      <div className="mt-4 pt-4 border-t flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Pipeline total</span>
        <span className="text-lg font-bold text-primary">193K€</span>
      </div>
    </motion.div>
  )
}

function ChartMockup({ metrics }: { metrics: { label: string; value: string; trend: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-card border-2 rounded-2xl p-6 shadow-xl"
    >
      {/* Metrics grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="text-center"
          >
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-xs text-muted-foreground">{metric.label}</p>
            <span className="text-xs text-primary font-medium">{metric.trend}</span>
          </motion.div>
        ))}
      </div>

      {/* Chart visualization */}
      <div className="relative h-32 flex items-end gap-2">
        {[65, 45, 78, 52, 88, 72, 95, 68, 82, 75, 90, 85].map((value, idx) => (
          <motion.div
            key={idx}
            initial={{ height: 0 }}
            whileInView={{ height: `${value}%` }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            className="flex-1 bg-primary rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Jan</span>
        <span>Déc</span>
      </div>
    </motion.div>
  )
}

function WorkflowMockup({ nodes }: { nodes: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-card border-2 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="h-3 w-3 rounded-full bg-primary" />
        <span className="text-sm font-medium">Workflow actif</span>
      </div>

      <div className="relative">
        {nodes.map((node, idx) => (
          <motion.div
            key={node}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="relative">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                idx === 0 ? 'bg-accent text-accent-foreground' :
                idx === nodes.length - 1 ? 'bg-primary text-primary-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {idx === 0 ? <Zap className="h-5 w-5" /> :
                 idx === nodes.length - 1 ? <Check className="h-5 w-5" /> :
                 <span className="text-sm font-bold">{idx}</span>}
              </div>
              {idx < nodes.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 24 }}
                  transition={{ delay: idx * 0.15 + 0.1 }}
                  className="absolute left-1/2 top-full w-0.5 bg-border -translate-x-1/2"
                />
              )}
            </div>
            <div className="flex-1 bg-muted/50 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">{node}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t text-center">
        <p className="text-sm text-muted-foreground">
          <span className="text-primary font-medium">1,247</span> leads traités ce mois
        </p>
      </div>
    </motion.div>
  )
}

// Connexions disponibles
const connections = [
  { name: 'Gmail', icon: Mail, description: 'Synchronisez vos emails professionnels' },
  { name: 'Outlook', icon: Mail, description: 'Connectez votre messagerie Microsoft' },
  { name: 'Google Calendar', icon: Calendar, description: 'Gérez vos rendez-vous clients' },
  { name: 'Outlook Calendar', icon: Calendar, description: 'Synchronisez votre agenda Microsoft' },
]

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-muted/30" />

        {/* Subtle background shapes */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 -right-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl"
        />

        <div className="container relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-6 bg-accent text-accent-foreground border-0 px-4 py-1.5">
                <Sparkles className="mr-2 h-4 w-4" />
                Tout ce dont vous avez besoin
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Des outils <span className="text-primary">puissants</span>
              <br />
              Une interface <span className="text-primary">simple</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Chaque fonctionnalité est pensée pour vous faire gagner du temps et conclure plus de ventes.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/register">
                  Essayer gratuitement <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 text-lg px-8">
                <Link href="#demo">
                  <Play className="mr-2 h-5 w-5" /> Voir en action
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Features - Alternating Layout with Carousel */}
      {mainFeatures.map((feature, index) => (
        <section
          key={feature.id}
          className={`py-20 lg:py-32 ${index % 2 === 1 ? 'bg-muted/30' : ''}`}
        >
          <div className="container">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}>
              {/* Content side */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? 'lg:col-start-2' : ''}
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="inline-flex rounded-2xl bg-primary p-4 text-primary-foreground mb-6 shadow-lg"
                >
                  <feature.icon className="h-8 w-8" />
                </motion.div>

                <Badge variant="secondary" className="mb-4 ml-2">{feature.tagline}</Badge>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                  {feature.title}
                </h2>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {feature.description}
                </p>

                {/* Carousel */}
                <div className="bg-muted/50 rounded-2xl p-6 border">
                  <FeatureCarousel items={feature.carouselItems} />
                </div>
              </motion.div>

              {/* Mockup side */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}
              >
                {feature.mockup.type === 'contact-card' && (
                  <ContactCardMockup data={feature.mockup.data as { name: string; company: string; score: number; status: string; lastActivity: string }} />
                )}
                {feature.mockup.type === 'kanban' && (
                  <KanbanMockup
                    stages={feature.mockup.stages as string[]}
                    deals={feature.mockup.deals as { name: string; value: string; stage: number }[]}
                  />
                )}
                {feature.mockup.type === 'chart' && (
                  <ChartMockup metrics={feature.mockup.metrics as { label: string; value: string; trend: string }[]} />
                )}
                {feature.mockup.type === 'workflow' && (
                  <WorkflowMockup nodes={feature.mockup.nodes as string[]} />
                )}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Connexions Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="secondary" className="mb-4">Connexions</Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Connectez votre email et calendrier
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Synchronisez vos emails et votre agenda pour centraliser toutes vos interactions clients.
            </motion.p>
          </motion.div>

          {/* Connexions grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {connections.map((connection, idx) => (
              <motion.div
                key={connection.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card border-2 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:border-primary/30 transition-all"
              >
                <div className="inline-flex rounded-2xl bg-primary/10 p-4 mb-4">
                  <connection.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{connection.name}</h3>
                <p className="text-sm text-muted-foreground">{connection.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="secondary" className="mb-4">Sécurité</Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Vos données en sécurité
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Shield, label: 'Chiffrement AES-256' },
              { icon: Lock, label: 'Double authentification' },
              { icon: Globe, label: 'Hébergement EU' },
              { icon: FileText, label: 'Conforme RGPD' },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6"
              >
                <div className="inline-flex rounded-2xl bg-primary/10 p-4 mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <p className="font-medium">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-primary p-12 md:p-20 text-center shadow-xl"
          >
            {/* Subtle pattern background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <Star className="mx-auto mb-8 h-16 w-16 text-primary-foreground" />
              </motion.div>

              <h2 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
                Prêt à transformer vos ventes ?
              </h2>

              <p className="mx-auto mb-10 max-w-xl text-xl text-primary-foreground/90">
                14 jours gratuits. Sans carte bancaire. Support inclus.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="shadow-lg text-lg px-8 hover:scale-105 transition-transform">
                  <Link href="/register">
                    Démarrer maintenant <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 text-lg px-8"
                >
                  <Link href="/pricing">Voir les tarifs</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Chatbot />
    </div>
  )
}
