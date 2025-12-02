"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  TrendingUp,
  Users,
  Target,
  LineChart,
  Sparkles,
  Building2,
  UserCircle,
  Phone,
  Calendar,
  LayoutGrid,
  Briefcase,
  Star,
  Zap,
  Shield,
  Clock,
  DollarSign,
  Award,
  BarChart3
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="container flex min-h-[90vh] flex-col items-center justify-center py-20 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4" variant="secondary">
              🚀 Le CRM qui transforme vos prospects en clients
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="mb-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            Arrêtez de perdre des{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              opportunités commerciales
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="mb-8 max-w-2xl text-xl text-muted-foreground mx-auto"
          >
            CRM Pro centralise vos contacts, automatise votre suivi et booste vos ventes.
            <strong className="text-foreground"> +47% de deals gagnés </strong>
            en moyenne pour nos clients.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/register">
                Essai gratuit 14 jours <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">Voir les tarifs</Link>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="mt-6 text-sm text-muted-foreground"
          >
            ✓ Sans carte bancaire • ✓ Installation en 5 minutes • ✓ Support français
          </motion.p>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-20 left-10 opacity-20"
        >
          <UserCircle className="h-20 w-20 text-blue-600" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 opacity-20"
        >
          <TrendingUp className="h-24 w-24 text-purple-600" />
        </motion.div>
      </section>

      {/* Problem/Solution Section */}
      <section className="container py-20 border-y bg-muted/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4">Le problème</Badge>
          </motion.div>
          <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Vous perdez de l'argent chaque jour
          </motion.h2>
          <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sans CRM, votre équipe commerciale perd un temps précieux à chercher des informations
            dispersées dans des emails, tableurs et post-its.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3 mb-12"
        >
          {[
            {
              stat: '23%',
              label: 'des prospects oubliés',
              description: 'Pas de relance = ventes perdues'
            },
            {
              stat: '5h/sem',
              label: 'perdues par commercial',
              description: 'À chercher des infos dispersées'
            },
            {
              stat: '67%',
              label: 'de deals mal suivis',
              description: 'Manque de visibilité sur le pipeline'
            }
          ].map((problem) => (
            <motion.div
              key={problem.label}
              variants={fadeIn}
              className="p-6 rounded-lg bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900"
            >
              <div className="mb-2 text-5xl font-bold text-red-600 dark:text-red-400">
                {problem.stat}
              </div>
              <div className="font-semibold text-foreground mb-1">{problem.label}</div>
              <div className="text-sm text-muted-foreground">{problem.description}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center"
        >
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h3 className="text-2xl font-bold mb-2">La solution ? CRM Pro 🎯</h3>
            <p className="text-lg opacity-90">Tout centralisé, automatisé, optimisé.</p>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4">Fonctionnalités</Badge>
          </motion.div>
          <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Tout ce qu'il faut pour vendre plus
          </motion.h2>
          <motion.p variants={fadeIn} className="text-xl text-muted-foreground">
            Une plateforme complète qui s'adapte à votre processus de vente
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: UserCircle,
              title: 'Gestion des contacts',
              description: 'Centralisez toutes les infos de vos prospects et clients en un seul endroit',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: Building2,
              title: 'Base entreprises',
              description: 'Suivez les comptes, identifiez les décideurs, mappez les organisations',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: TrendingUp,
              title: 'Pipeline visuel',
              description: 'Kanban drag & drop pour visualiser vos deals et prioriser vos actions',
              color: 'from-green-500 to-emerald-500'
            },
            {
              icon: Phone,
              title: 'Suivi d\'activités',
              description: 'Appels, emails, meetings : ne ratez plus jamais une relance',
              color: 'from-orange-500 to-red-500'
            },
            {
              icon: Calendar,
              title: 'Calendrier intégré',
              description: 'Planifiez vos rendez-vous et gérez votre agenda commercial',
              color: 'from-yellow-500 to-orange-500'
            },
            {
              icon: BarChart3,
              title: 'Analytics & rapports',
              description: 'Dashboards en temps réel pour piloter vos performances',
              color: 'from-indigo-500 to-blue-500'
            }
          ].map((service) => (
            <motion.div key={service.title} variants={fadeIn}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-r ${service.color} p-3 text-white w-fit group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="border-y bg-muted/50 py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12 text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4">Bénéfices mesurables</Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Des résultats concrets dès le premier mois
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                icon: DollarSign,
                title: '+47% de revenus',
                description: 'Augmentation moyenne du CA grâce à un meilleur suivi des opportunités',
                stat: 'Prouvé'
              },
              {
                icon: Clock,
                title: '-30% de temps administratif',
                description: 'Automatisation des tâches répétitives = plus de temps pour vendre',
                stat: 'Gain direct'
              },
              {
                icon: Target,
                title: '+65% de taux de conversion',
                description: 'Ne perdez plus aucun prospect grâce aux rappels automatiques',
                stat: 'Objectif'
              }
            ].map((item) => (
              <motion.div key={item.title} variants={fadeIn}>
                <Card className="text-center h-full border-2">
                  <CardHeader>
                    <div className="mx-auto mb-4 inline-flex rounded-full bg-green-100 dark:bg-green-950 p-4 text-green-600 dark:text-green-400">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                    <CardDescription className="mt-2 text-base">{item.description}</CardDescription>
                    <div className="mt-4">
                      <Badge className="bg-green-600">{item.stat}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-4 text-center"
          >
            {[
              { value: '12K+', label: 'Utilisateurs actifs', icon: Users },
              { value: '2.4M+', label: 'Deals gérés', icon: TrendingUp },
              { value: '98%', label: 'Satisfaction client', icon: Star },
              { value: '24/7', label: 'Support réactif', icon: Sparkles }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="mb-2 text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features List */}
      <section className="container py-20 bg-muted/50 rounded-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-4xl"
        >
          <motion.div variants={fadeIn} className="mb-12 text-center">
            <Badge className="mb-4">Tout inclus</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Fonctionnalités professionnelles
            </h2>
            <p className="text-xl text-muted-foreground">
              Sans surprise, sans frais cachés
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
            {[
              'Pipeline Kanban drag & drop',
              'Import CSV illimité',
              'Rapports & Analytics avancés',
              'Gestion des tags personnalisés',
              'Multi-utilisateurs',
              'Historique complet des interactions',
              'Calendrier synchronisé',
              'Rappels automatiques',
              'Recherche globale puissante',
              'Mobile responsive',
              'Exports Excel/PDF',
              'API REST complète',
            ].map((feature, index) => (
              <motion.div
                key={feature}
                variants={fadeIn}
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-background hover:bg-accent transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shrink-0">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="container py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4">Témoignages</Badge>
          </motion.div>
          <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ils ont boosté leurs ventes avec CRM Pro
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-8 md:grid-cols-3"
        >
          {[
            {
              name: 'Sophie Durand',
              role: 'Directrice Commerciale, TechSolutions',
              content: 'Nous avons augmenté notre CA de 52% en 6 mois. Le pipeline visuel nous a permis de ne plus perdre aucun prospect. Investissement rentabilisé dès le 2ème mois !',
              rating: 5,
              metric: '+52% CA'
            },
            {
              name: 'Thomas Lefebvre',
              role: 'CEO, StartupGrowth',
              content: 'Avant CRM Pro, on perdait 30% de nos leads par manque de suivi. Aujourd\'hui, notre taux de conversion est passé de 15% à 38%. Un game-changer absolu.',
              rating: 5,
              metric: '38% conversion'
            },
            {
              name: 'Marie Dubois',
              role: 'Responsable Ventes, InnovCorp',
              content: 'Mon équipe gagne 2h par jour grâce à l\'automatisation. Plus besoin de chercher qui a appelé qui. Tout est là, clair et accessible. On ne reviendrait en arrière pour rien au monde.',
              rating: 5,
              metric: '-2h/jour'
            }
          ].map((testimonial) => (
            <motion.div key={testimonial.name} variants={fadeIn}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge className="mb-4 w-fit bg-green-600">{testimonial.metric}</Badge>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                  <div className="mt-4">
                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="container text-center"
        >
          <motion.div variants={fadeIn}>
            <Award className="h-12 w-12 mx-auto mb-6" />
          </motion.div>
          <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Prêt à transformer vos ventes ?
          </motion.h2>
          <motion.p variants={fadeIn} className="mb-8 text-xl opacity-90 max-w-2xl mx-auto">
            Rejoignez 12 000+ commerciaux qui utilisent CRM Pro pour vendre plus, plus vite.
            <br />
            <strong>Essai gratuit 14 jours</strong>, sans carte bancaire.
          </motion.p>
          <motion.div variants={fadeIn} className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
              <Link href="/register">
                Commencer gratuitement <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Link href="/pricing">
                Voir les tarifs
              </Link>
            </Button>
          </motion.div>
          <motion.p variants={fadeIn} className="mt-6 text-sm opacity-75">
            Installation en 5 minutes • Support en français • Données sécurisées en Europe
          </motion.p>
        </motion.div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
