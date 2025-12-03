'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import {
  Users,
  Target,
  Award,
  Lightbulb,
  Heart,
  Globe,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Building2,
  Rocket,
  Check,
  MapPin,
  Sparkles,
  Star,
} from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const timeline = [
  {
    year: '2018',
    title: 'La genèse',
    description: 'Frustrés par les CRM complexes et coûteux du marché, trois commerciaux et un développeur décident de créer l\'outil qu\'ils auraient voulu avoir.',
  },
  {
    year: '2019',
    title: 'Lancement beta',
    description: '500 early-adopters testent notre première version. Leurs retours façonnent le produit que nous connaissons aujourd\'hui.',
  },
  {
    year: '2020',
    title: 'Croissance accélérée',
    description: 'Le passage au télétravail accélère l\'adoption. 3 000 utilisateurs nous font confiance. Première levée de fonds (2M€).',
  },
  {
    year: '2021',
    title: 'Expansion européenne',
    description: 'Ouverture des bureaux en Allemagne et en Espagne. Lancement de l\'application mobile et des automatisations avancées.',
  },
  {
    year: '2022',
    title: 'Leader reconnu',
    description: '8 000 utilisateurs, certifications SOC 2 et ISO 27001. Intégrations avec 50+ outils du marché.',
  },
  {
    year: '2023',
    title: 'Intelligence artificielle',
    description: 'Lancement des fonctionnalités IA : scoring prédictif, recommandations d\'actions, assistants conversationnels.',
  },
  {
    year: '2024',
    title: 'Aujourd\'hui',
    description: '12 000+ utilisateurs dans 15 pays. Une équipe de 60 personnes passionnées par la réussite de nos clients.',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Passion du client',
    description: 'Chaque fonctionnalité est pensée pour résoudre un vrai problème de nos utilisateurs. Leur succès est notre obsession quotidienne.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation pragmatique',
    description: 'Nous adoptons les nouvelles technologies quand elles apportent une vraie valeur, pas pour suivre les tendances.',
  },
  {
    icon: Shield,
    title: 'Confiance et transparence',
    description: 'Vos données vous appartiennent. Notre modèle économique repose sur la valeur que nous créons, pas sur vos données.',
  },
  {
    icon: Zap,
    title: 'Simplicité radicale',
    description: 'Puissant ne veut pas dire compliqué. Nous nous battons contre la complexité pour garder notre CRM accessible à tous.',
  },
  {
    icon: Users,
    title: 'Esprit d\'équipe',
    description: 'En interne comme avec nos clients, nous croyons à la collaboration. Les meilleures idées viennent du terrain.',
  },
  {
    icon: Target,
    title: 'Impact mesurable',
    description: 'Chaque décision est guidée par les résultats concrets. Nous mesurons notre succès au ROI de nos clients.',
  },
]

const team = [
  {
    name: 'Alexandre Martin',
    role: 'CEO & Co-fondateur',
    bio: 'Ex-directeur commercial, 15 ans d\'expérience en B2B. Passionné par l\'optimisation des processus de vente.',
    avatar: 'AM',
  },
  {
    name: 'Sophie Lefebvre',
    role: 'CTO & Co-fondatrice',
    bio: 'Ingénieure en informatique, ex-Google. Experte en scalabilité et en architecture cloud.',
    avatar: 'SL',
  },
  {
    name: 'Thomas Dubois',
    role: 'CPO & Co-fondateur',
    bio: 'Designer produit, ex-Spotify. Obsédé par l\'expérience utilisateur et la simplicité.',
    avatar: 'TD',
  },
  {
    name: 'Marie Cohen',
    role: 'VP Sales',
    bio: 'Bâtisseuse d\'équipes commerciales, ex-Salesforce. Pratique ce qu\'elle prêche au quotidien.',
    avatar: 'MC',
  },
]

const stats = [
  { value: '12 000+', label: 'Utilisateurs actifs', icon: Users },
  { value: '15', label: 'Pays couverts', icon: Globe },
  { value: '60', label: 'Collaborateurs passionnés', icon: Building2 },
  { value: '98%', label: 'Taux de satisfaction', icon: Award },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-background" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/4 -left-1/4 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl"
        />

        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center">
            <motion.div variants={fadeIn}>
              <Badge className="mb-4 bg-accent text-accent-foreground border-0">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Notre histoire
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Nous croyons que vendre{' '}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                devrait être simple
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Nous avons créé le CRM que nous aurions voulu avoir quand nous étions commerciaux.
              Un outil puissant mais simple, qui vous aide à vendre plus sans vous compliquer la vie.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 text-center md:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 p-6 transition-all"
              >
                <stat.icon className="h-8 w-8 text-primary mb-2" />
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="secondary" className="mb-4">Notre parcours</Badge>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              De la frustration à la solution
            </motion.h2>
            <motion.p variants={fadeIn} className="text-muted-foreground text-xl max-w-3xl mx-auto">
              Tout a commencé par un constat simple : les CRM existants étaient soit trop compliqués,
              soit trop limités, soit trop chers. Nous avons décidé de changer ça.
            </motion.p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-chart-2 to-primary" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-16 md:pl-0`}>
                  <Card className="border-2 border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <Badge className="w-fit mb-2 bg-primary text-primary-foreground">
                        {item.year}
                      </Badge>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-chart-2 border-4 border-background shadow-lg shadow-primary/25" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted/30 border-y py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4">Notre mission</Badge>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Démocratiser l'excellence commerciale
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Nous croyons que chaque entreprise, quelle que soit sa taille, mérite d'avoir
                accès aux meilleurs outils pour développer son activité commerciale.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                Notre mission est de rendre les techniques et les outils des meilleures équipes
                commerciales accessibles à tous, grâce à un CRM intuitif, puissant et abordable.
              </p>
              <div className="space-y-3">
                {[
                  'Simplifier la vie des commerciaux',
                  'Augmenter le taux de conversion',
                  'Offrir une visibilité totale sur le pipeline',
                  'Automatiser les tâches répétitives',
                ].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 transition-transform"
                  >
                    <div className="shrink-0 rounded-full bg-primary p-1">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary via-chart-2 to-primary text-primary-foreground border-0 shadow-2xl shadow-primary/25">
                <CardHeader>
                  <Rocket className="h-12 w-12 mb-4" />
                  <CardTitle className="text-2xl text-primary-foreground">Notre vision</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg opacity-90">
                    Devenir le CRM de référence pour les PME et ETI européennes d'ici 2027.
                  </p>
                  <p className="opacity-80">
                    Un monde où chaque commercial dispose des outils et des insights
                    pour exceller, où la technologie augmente l'humain plutôt que de le remplacer.
                  </p>
                  <div className="pt-4 border-t border-primary-foreground/20">
                    <div className="text-sm opacity-75">Objectif 2027</div>
                    <div className="text-3xl font-bold">100 000 utilisateurs</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="secondary" className="mb-4">Nos valeurs</Badge>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Ce qui nous guide au quotidien
            </motion.h2>
            <motion.p variants={fadeIn} className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Ces valeurs ne sont pas affichées sur un mur. Elles guident chaque décision,
              chaque fonctionnalité, chaque interaction avec nos clients.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={fadeIn}>
                <Card className="h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="rounded-2xl bg-gradient-to-br from-primary to-chart-2 p-3 w-fit text-primary-foreground mb-4 shadow-lg shadow-primary/25"
                    >
                      <value.icon className="h-6 w-6" />
                    </motion.div>
                    <CardTitle>{value.title}</CardTitle>
                    <CardDescription className="text-base">{value.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/30 border-y py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="secondary" className="mb-4">L'équipe fondatrice</Badge>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Des entrepreneurs, pas des théoriciens
            </motion.h2>
            <motion.p variants={fadeIn} className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Notre équipe de direction a passé des années sur le terrain avant de créer cet outil.
              Nous comprenons vos défis parce que nous les avons vécus.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeIn}>
                <Card className="text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-xl shadow-primary/25"
                    >
                      {member.avatar}
                    </motion.div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Et une équipe de 60 personnes talentueuses réparties entre Paris, Berlin et Madrid
            </p>
            <Button asChild variant="outline" className="border-2 hover:bg-primary hover:text-primary-foreground transition-all">
              <Link href="/contact">
                Rejoindre l'équipe <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="secondary" className="mb-4">Nos bureaux</Badge>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Une présence européenne
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                city: 'Paris',
                country: 'France',
                address: '42 rue de la Performance',
                type: 'Siège social',
                team: '35 personnes',
              },
              {
                city: 'Berlin',
                country: 'Allemagne',
                address: 'Friedrichstraße 123',
                type: 'Bureau régional',
                team: '15 personnes',
              },
              {
                city: 'Madrid',
                country: 'Espagne',
                address: 'Calle Gran Vía 45',
                type: 'Bureau régional',
                team: '10 personnes',
              },
            ].map((office) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{office.city}</CardTitle>
                        <CardDescription>{office.country}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{office.address}</p>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-muted-foreground">{office.type}</span>
                      <span className="font-medium text-primary">{office.team}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-chart-2 to-primary p-12 md:p-16 text-primary-foreground text-center shadow-2xl shadow-primary/25"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                <Star className="mx-auto mb-6 h-16 w-16" />
              </motion.div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Prêt à rejoindre l'aventure ?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
                Que vous soyez un futur client ou un futur collaborateur,
                nous serions ravis d'échanger avec vous.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl text-lg px-8 hover:scale-[1.02] transition-all">
                  <Link href="/register">
                    Essayer gratuitement <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 text-lg px-8 hover:scale-[1.02] transition-all"
                >
                  <Link href="/contact">Nous contacter</Link>
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
