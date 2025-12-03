'use client'

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
  Sparkles,
  Building2,
  UserCircle,
  Phone,
  Calendar,
  Star,
  Zap,
  Shield,
  Clock,
  BarChart3,
  Mail,
  MessageSquare,
  Workflow,
  Lock,
  Globe,
  Layers,
  RefreshCw,
  FileText,
  Settings,
  Plug,
  ChevronRight,
  Play,
  ArrowUpRight,
  Bot,
  MousePointerClick,
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Chatbot } from '@/components/chatbot/chatbot'

// Animation variants optimisés
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
}

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 4, repeat: Infinity },
  },
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          Layout: Split screen - Texte (45%) | Dashboard Preview (55%)
          Visual: Gradient background + floating mockup + micro-animations
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-background" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 -left-1/4 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-chart-2/30 blur-[100px]"
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center min-h-[85vh] py-12">
            {/* Left column - Minimal copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl">
              <motion.div variants={fadeInUp} className="mb-5">
                <Badge className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  CRM nouvelle génération
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-5"
              >
                Vendez plus.{' '}
                <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease-in-out_infinite]">
                  Vendez mieux.
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                Le CRM qui transforme votre pipeline en machine à closer. Visualisez, automatisez, performez.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button asChild size="lg" className="h-12 px-7 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] transition-all">
                  <Link href="/register">
                    Démarrer gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base border-2 hover:bg-accent group">
                  <Link href="#demo">
                    <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Voir la démo
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                {['14 jours gratuits', 'Sans CB', 'Setup 5 min'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column - Dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="relative perspective-1000 hidden lg:block"
            >
              {/* Glow effect */}
              <div className="absolute inset-4 bg-gradient-to-r from-primary/20 to-chart-2/20 rounded-2xl blur-2xl" />

              {/* Main dashboard card */}
              <motion.div
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                className="relative bg-card rounded-2xl shadow-2xl shadow-primary/10 border overflow-hidden"
              >
                {/* Window controls */}
                <div className="h-10 bg-muted/50 border-b flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                    <div className="w-3 h-3 rounded-full bg-chart-1/60" />
                  </div>
                  <div className="ml-3 flex-1 h-5 bg-muted rounded max-w-[180px]" />
                </div>

                {/* Dashboard content */}
                <div className="p-5 space-y-4">
                  {/* KPI row */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: 'Opportunités', value: '147', trend: '+12%', color: 'text-chart-1' },
                      { label: 'CA Prévisionnel', value: '284K€', trend: '+23%', color: 'text-chart-1' },
                      { label: 'Taux closing', value: '34%', trend: '+5%', color: 'text-primary' },
                      { label: 'Activités', value: '89', trend: '+8%', color: 'text-chart-2' },
                    ].map((kpi) => (
                      <div key={kpi.label} className="bg-muted/50 rounded-xl p-3">
                        <div className="text-[10px] text-muted-foreground mb-0.5">{kpi.label}</div>
                        <div className="text-base font-bold">{kpi.value}</div>
                        <div className={`text-[10px] ${kpi.color}`}>{kpi.trend}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pipeline mini */}
                  <div className="bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium">Pipeline</span>
                      <span className="text-[10px] text-muted-foreground">Ce mois</span>
                    </div>
                    <div className="flex gap-1.5">
                      {['Qualif.', 'Proposition', 'Négo', 'Closing'].map((stage, i) => (
                        <div key={stage} className="flex-1">
                          <div className="h-1.5 rounded-full bg-gradient-to-r from-primary to-chart-2" style={{ opacity: 1 - i * 0.2 }} />
                          <div className="text-[9px] text-muted-foreground mt-1 truncate">{stage}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chart mini */}
                  <div className="bg-muted/50 rounded-xl p-4 h-24">
                    <div className="flex items-end justify-between h-full gap-1">
                      {[35, 55, 40, 70, 50, 85, 60, 90, 55, 95, 65, 80].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                          className="flex-1 bg-gradient-to-t from-primary to-chart-2 rounded-t"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating notification cards */}
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.3 }}
                className="absolute -left-6 top-1/4 bg-card rounded-xl shadow-lg shadow-primary/10 p-3 border"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-chart-1/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-chart-1" />
                  </div>
                  <div>
                    <div className="text-xs font-medium">Deal gagné</div>
                    <div className="text-sm font-bold text-chart-1">+45 000€</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-4 bottom-1/3 bg-card rounded-xl shadow-lg shadow-primary/10 p-3 border"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-medium">Email ouvert</div>
                    <div className="text-[10px] text-muted-foreground">Il y a 2 min</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
          >
            <div className="w-0.5 h-1.5 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SOCIAL PROOF BAR
          Layout: Horizontal scrolling logos
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-10 border-y bg-muted/30 overflow-hidden">
        <div className="container mb-4">
          <p className="text-center text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">+12 000 équipes</span> nous font confiance
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/30 to-transparent z-10" />
          <motion.div
            animate={{ x: [0, -800] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="flex items-center gap-14 px-8"
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-14">
                {['TechCorp', 'InnovateSoft', 'CloudFirst', 'DataPro', 'ScaleUp', 'GrowthLabs', 'VentureX'].map((name) => (
                  <div key={`${setIndex}-${name}`} className="text-lg font-bold text-muted-foreground/40 whitespace-nowrap">
                    {name}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          VALUE PROPOSITION
          Layout: 3 columns cards with icon + minimal text
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-4">Pourquoi nous choisir</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Un CRM qui travaille pour vous
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
              Moins de clics. Plus de deals.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-5"
          >
            {[
              {
                icon: Target,
                title: 'Vision 360°',
                description: 'Tout votre business en un coup d\'œil.',
              },
              {
                icon: Zap,
                title: 'Automatisation',
                description: 'Vos tâches répétitives s\'exécutent seules.',
              },
              {
                icon: BarChart3,
                title: 'Analytics',
                description: 'Prédisez vos revenus. Optimisez.',
              },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeInUp}>
                <Card className="group h-full border-2 border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25"
                    >
                      <item.icon className="h-7 w-7" />
                    </motion.div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-base">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURE SHOWCASE
          Layout: Alternating split screens with mockups
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container space-y-24">
          {/* Feature 1 - Pipeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={fadeInUp} className="max-w-lg">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Pipeline</Badge>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Visualisez chaque opportunité</h3>
              <p className="text-muted-foreground mb-6">
                Drag & drop intuitif. Voyez exactement où en est chaque deal.
              </p>
              <ul className="space-y-2.5">
                {['Vue Kanban personnalisable', 'Prévisions automatiques', 'Alertes deals à risque'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeInScale} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-chart-2/10 rounded-2xl blur-xl" />
              <div className="relative bg-card rounded-2xl shadow-xl border p-5">
                <div className="flex gap-3">
                  {['Nouveau', 'Qualifié', 'Proposition', 'Gagné'].map((stage, i) => (
                    <div key={stage} className="flex-1 min-w-[100px]">
                      <div className="text-[10px] font-medium text-muted-foreground mb-2 flex justify-between">
                        <span>{stage}</span>
                        <span className="bg-muted px-1 rounded">{Math.max(1, 3 - i)}</span>
                      </div>
                      <div className="space-y-2">
                        {[...Array(Math.max(1, 3 - i))].map((_, j) => (
                          <div key={j} className="p-2.5 rounded-lg bg-muted/50 border">
                            <div className="w-14 h-1.5 bg-muted-foreground/20 rounded mb-1.5" />
                            <div className="w-9 h-1.5 bg-muted-foreground/10 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature 2 - Automatisations */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={fadeInScale} className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-chart-2/10 to-primary/10 rounded-2xl blur-xl" />
              <div className="relative bg-card rounded-2xl shadow-xl border p-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-chart-2/10 flex items-center justify-center">
                      <Workflow className="w-5 h-5 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <div className="w-20 h-1.5 bg-muted-foreground/20 rounded mb-1" />
                      <div className="w-14 h-1.5 bg-muted-foreground/10 rounded" />
                    </div>
                    <Badge className="bg-chart-1/10 text-chart-1 border-chart-1/20 text-[10px]">Actif</Badge>
                  </div>
                  <div className="ml-5 pl-5 border-l-2 border-dashed border-muted-foreground/20 space-y-3">
                    {[
                      { icon: Mail, text: 'Envoyer email' },
                      { icon: Clock, text: 'Attendre 2j' },
                      { icon: UserCircle, text: 'Assigner' },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
                          <step.icon className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <span className="text-xs">{step.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="max-w-lg order-1 lg:order-2">
              <Badge className="mb-4 bg-chart-2/10 text-chart-2 border-chart-2/20">Automatisation</Badge>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Laissez le CRM travailler</h3>
              <p className="text-muted-foreground mb-6">
                Workflows no-code. Créez des automatisations en quelques clics.
              </p>
              <ul className="space-y-2.5">
                {['Séquences email automatiques', 'Attribution intelligente', 'Rappels et notifications'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-chart-2/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-chart-2" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Feature 3 - Analytics */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={fadeInUp} className="max-w-lg">
              <Badge className="mb-4 bg-chart-1/10 text-chart-1 border-chart-1/20">Analytics</Badge>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Décidez avec les données</h3>
              <p className="text-muted-foreground mb-6">
                Tableaux de bord en temps réel. Prévisions précises.
              </p>
              <ul className="space-y-2.5">
                {['KPIs personnalisables', 'Prévisions CA', 'Rapports exportables'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-chart-1/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-chart-1" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeInScale} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-chart-1/10 to-chart-2/10 rounded-2xl blur-xl" />
              <div className="relative bg-card rounded-2xl shadow-xl border p-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'CA ce mois', value: '284K€', trend: '+23%' },
                    { label: 'Deals en cours', value: '47', trend: '+12' },
                    { label: 'Conversion', value: '34%', trend: '+5%' },
                    { label: 'Cycle moyen', value: '21j', trend: '-3j' },
                  ].map((stat) => (
                    <div key={stat.label} className="p-3 rounded-xl bg-muted/50">
                      <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                      <div className="text-lg font-bold">{stat.value}</div>
                      <div className="text-[10px] text-chart-1">{stat.trend}</div>
                    </div>
                  ))}
                </div>
                <div className="h-24 bg-muted/50 rounded-xl p-3">
                  <div className="flex items-end justify-between h-full gap-1.5">
                    {[30, 50, 40, 65, 55, 80, 60, 85, 70, 90, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-chart-1 to-chart-2 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          METRICS
          Layout: 4 columns large numbers
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: '+47%', label: 'Chiffre d\'affaires', sub: 'après 6 mois' },
              { value: '-5h', label: 'Par semaine', sub: 'tâches admin' },
              { value: '2x', label: 'Plus de deals', sub: 'closés' },
              { value: '98%', label: 'Satisfaction', sub: 'client' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="font-medium text-sm">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          INTEGRATIONS
          Layout: Grid of integration cards
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-4">Intégrations</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold mb-2">
              Connecté à vos outils
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground">
              +50 intégrations natives. API ouverte.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {[
              { name: 'Gmail', icon: Mail },
              { name: 'Outlook', icon: Calendar },
              { name: 'Slack', icon: MessageSquare },
              { name: 'WhatsApp', icon: Phone },
              { name: 'Zapier', icon: Zap },
              { name: 'Analytics', icon: BarChart3 },
              { name: 'API', icon: Layers },
              { name: 'AI', icon: Bot },
            ].map((integration) => (
              <motion.div key={integration.name} variants={fadeInUp}>
                <Card className="h-20 flex flex-col items-center justify-center gap-1.5 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group border-2 border-transparent">
                  <integration.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium">{integration.name}</span>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Button asChild variant="outline" size="sm" className="border-2">
              <Link href="/features#integrations">
                Toutes les intégrations <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS
          Layout: 3 cards with metrics
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-4">Témoignages</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold">
              Ils ont boosté leur performance
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-5"
          >
            {[
              {
                quote: 'Pipeline clair, deals closés plus vite. ROI dès le premier mois.',
                author: 'Sophie D.',
                role: 'Dir. Commerciale • TechSolutions',
                metric: '+52%',
                metricLabel: 'CA',
              },
              {
                quote: 'Les automatisations nous font gagner un temps précieux.',
                author: 'Thomas L.',
                role: 'CEO • GrowthStartup',
                metric: '38%',
                metricLabel: 'conversion',
              },
              {
                quote: 'Tout l\'historique client en un clic. Mon équipe est transformée.',
                author: 'Marie D.',
                role: 'Resp. Ventes • InnovCorp',
                metric: '-2h',
                metricLabel: '/jour',
              },
            ].map((testimonial) => (
              <motion.div key={testimonial.author} variants={fadeInUp}>
                <Card className="h-full border-2 border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-chart-4 text-chart-4" />
                        ))}
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">{testimonial.metric}</div>
                        <div className="text-[10px] text-muted-foreground">{testimonial.metricLabel}</div>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      "{testimonial.quote}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2.5 pt-3 border-t">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-primary-foreground font-bold text-xs">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{testimonial.author}</div>
                        <div className="text-[11px] text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECURITY BADGES
          Layout: Horizontal trust bar
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-muted/30 border-y">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-wrap justify-center items-center gap-8"
          >
            {[
              { label: 'RGPD', sub: 'Conforme' },
              { label: 'SOC 2', sub: 'Certifié' },
              { label: 'ISO 27001', sub: 'Certifié' },
              { label: '99.9%', sub: 'Uptime' },
              { label: 'AES-256', sub: 'Chiffrement' },
            ].map((badge) => (
              <motion.div key={badge.label} variants={fadeInUp} className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-chart-1" />
                <div>
                  <div className="font-semibold text-sm">{badge.label}</div>
                  <div className="text-[10px] text-muted-foreground">{badge.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA
          Layout: Full-width gradient card
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-chart-2 to-primary p-10 md:p-16 text-primary-foreground text-center shadow-2xl shadow-primary/20"
          >
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            {/* Glows */}
            <div className="absolute top-0 left-1/3 w-48 h-48 bg-primary-foreground/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-chart-2/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Sparkles className="w-7 h-7" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                Prêt à transformer vos ventes ?
              </h2>
              <p className="text-base md:text-lg opacity-90 mb-7 max-w-xl mx-auto">
                Rejoignez 12 000+ commerciaux performants.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
                <Button asChild size="lg" variant="secondary" className="h-12 px-7 text-base font-semibold shadow-lg hover:scale-[1.02] transition-all">
                  <Link href="/register">
                    Démarrer gratuitement <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                  <Link href="/contact">Parler à un expert</Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-5 text-sm opacity-80">
                {['14 jours gratuits', 'Sans CB', 'Support FR', 'Données EU'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
