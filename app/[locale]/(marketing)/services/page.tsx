"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { Code, Palette, ShoppingBag, MessageSquare, Check, ArrowRight, Sparkles, Zap, Shield, Clock } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

export default function ServicesPage() {
  const services = [
    {
      id: 'web',
      icon: Code,
      title: 'Développement Web',
      description: 'Applications web modernes et performantes',
      features: [
        'Applications React/Next.js',
        'Sites web sur mesure',
        'Progressive Web Apps (PWA)',
        'API REST et GraphQL',
        'Migration vers le cloud',
        'Maintenance et support'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
      price: 'À partir de 5 000€'
    },
    {
      id: 'design',
      icon: Palette,
      title: 'Design UI/UX',
      description: 'Interfaces exceptionnelles et expériences mémorables',
      features: [
        'Recherche utilisateur',
        'Wireframing et prototypage',
        'Design système complet',
        'Tests utilisateurs',
        'Design responsive',
        'Branding et identité visuelle'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'After Effects'],
      price: 'À partir de 3 000€'
    },
    {
      id: 'ecommerce',
      icon: ShoppingBag,
      title: 'Solutions E-commerce',
      description: 'Boutiques en ligne complètes et performantes',
      features: [
        'Boutique en ligne personnalisée',
        'Intégration paiement (Stripe, PayPal)',
        'Gestion des stocks',
        'Système de commande',
        'Analytics e-commerce',
        'Marketing automation'
      ],
      technologies: ['Shopify', 'WooCommerce', 'Stripe', 'Next.js Commerce'],
      price: 'À partir de 8 000€'
    },
    {
      id: 'consulting',
      icon: MessageSquare,
      title: 'Consulting Digital',
      description: 'Conseils stratégiques pour votre transformation digitale',
      features: [
        'Audit digital complet',
        'Stratégie de croissance',
        'Optimisation des performances',
        'Formation des équipes',
        'Roadmap technologique',
        'Support continu'
      ],
      technologies: ['Analytics', 'SEO', 'Performance', 'Security', 'Cloud'],
      price: 'À partir de 2 000€'
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-background" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/4 -right-1/4 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-0 -left-1/4 h-[300px] w-[300px] rounded-full bg-chart-2/20 blur-3xl"
        />

        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeIn}>
              <Badge className="mb-4 bg-accent text-accent-foreground border-0">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Nos Services
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeIn} className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Des solutions{' '}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                sur mesure
              </span>{' '}
              pour votre succès
            </motion.h1>
            <motion.p variants={fadeIn} className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez notre gamme complète de services digitaux conçus pour propulser votre entreprise vers de nouveaux sommets.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container pb-20">
        <Tabs defaultValue="web" className="w-full">
          <TabsList className="grid w-full md:w-[800px] mx-auto grid-cols-2 lg:grid-cols-4 mb-12 h-auto p-1">
            <TabsTrigger value="web" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Développement
            </TabsTrigger>
            <TabsTrigger value="design" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Design
            </TabsTrigger>
            <TabsTrigger value="ecommerce" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              E-commerce
            </TabsTrigger>
            <TabsTrigger value="consulting" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Consulting
            </TabsTrigger>
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="max-w-5xl mx-auto border-2 hover:border-primary/20 transition-all duration-300">
                  <CardHeader>
                    <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-primary/10 to-chart-2/10 p-4 w-fit">
                      <service.icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-3xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-lg">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Ce qui est inclus</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <div className="rounded-full bg-primary/10 p-1">
                              <Check className="h-4 w-4 text-primary" />
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Technologies utilisées</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="px-3 py-1 bg-accent/50 text-accent-foreground">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">À partir de</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                          {service.price}
                        </p>
                      </div>
                      <Button asChild size="lg" className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02]">
                        <Link href="/contact">
                          Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4 bg-accent text-accent-foreground border-0">Pourquoi nous choisir</Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ce qui nous{' '}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                différencie
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                icon: Zap,
                title: 'Rapidité d\'exécution',
                description: 'Des délais respectés et une mise en production rapide grâce à nos processus optimisés.'
              },
              {
                icon: Shield,
                title: 'Qualité garantie',
                description: 'Code robuste, testé et maintenable. Nous suivons les meilleures pratiques du secteur.'
              },
              {
                icon: Clock,
                title: 'Support réactif',
                description: 'Une équipe disponible pour vous accompagner avant, pendant et après votre projet.'
              }
            ].map((item) => (
              <motion.div key={item.title} variants={fadeIn}>
                <Card className="h-full text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                  <CardHeader>
                    <div className="mx-auto mb-4 inline-flex rounded-2xl bg-primary/10 p-4">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="mb-2">{item.title}</CardTitle>
                    <CardDescription className="text-base">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12 text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4 bg-accent text-accent-foreground border-0">Notre Processus</Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Comment nous travaillons
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-4"
          >
            {[
              {
                step: '01',
                title: 'Découverte',
                description: 'Nous analysons vos besoins et définissons ensemble vos objectifs.'
              },
              {
                step: '02',
                title: 'Planification',
                description: 'Nous créons une roadmap détaillée et un devis transparent.'
              },
              {
                step: '03',
                title: 'Développement',
                description: 'Notre équipe concrétise votre projet avec des points réguliers.'
              },
              {
                step: '04',
                title: 'Livraison',
                description: 'Nous déployons votre projet et assurons un support continu.'
              }
            ].map((item, index) => (
              <motion.div key={item.step} variants={fadeIn}>
                <Card className="h-full text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-2 border-transparent hover:border-primary/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-primary" />
                  <CardHeader>
                    <div className="mb-4 text-5xl font-bold bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                      {item.step}
                    </div>
                    <CardTitle className="mb-2">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeIn} className="mb-12 text-center">
              <Badge className="mb-4 bg-accent text-accent-foreground border-0">FAQ</Badge>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Questions fréquentes
              </h2>
            </motion.div>

            <Card className="border-2">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {[
                    {
                      q: 'Quels sont vos délais de livraison?',
                      a: 'Les délais varient selon la complexité du projet. Un site vitrine prend généralement 2-4 semaines, tandis qu\'une application web complexe peut prendre 2-6 mois. Nous établissons un planning détaillé lors de la phase de découverte.'
                    },
                    {
                      q: 'Proposez-vous un support après livraison?',
                      a: 'Oui, tous nos projets incluent 3 mois de support gratuit. Nous proposons également des contrats de maintenance mensuels pour garantir la sécurité et les performances de votre site.'
                    },
                    {
                      q: 'Comment se déroule le paiement?',
                      a: 'Nous fonctionnons généralement avec 3 versements : 30% à la signature, 40% à mi-parcours, et 30% à la livraison finale. Pour les petits projets, un paiement en 2 fois est possible.'
                    },
                    {
                      q: 'Travaillez-vous avec des clients internationaux?',
                      a: 'Absolument! Nous avons l\'habitude de travailler avec des clients du monde entier. Notre équipe est flexible et peut s\'adapter à différents fuseaux horaires pour faciliter la communication.'
                    },
                    {
                      q: 'Puis-je modifier mon site après sa création?',
                      a: 'Oui, tous nos sites sont conçus pour être facilement modifiables. Nous vous formons à l\'utilisation de votre CMS et restons disponibles pour toute assistance technique.'
                    }
                  ].map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b-border/50">
                      <AccordionTrigger className="text-left hover:no-underline py-4 hover:text-primary">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
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
              <Sparkles className="h-12 w-12 mx-auto mb-6" />
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Prêt à démarrer votre projet?
              </h2>
              <p className="mb-8 text-xl opacity-90 max-w-2xl mx-auto">
                Discutons de vos besoins et créons ensemble quelque chose d'exceptionnel
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                  <Link href="/contact">Demander un devis</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/20 transition-all">
                  <Link href="/portfolio">Voir nos réalisations</Link>
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
