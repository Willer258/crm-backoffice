'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { Check, X, Sparkles, ArrowRight, HelpCircle, Users, Building2, Rocket, Crown, Star } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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

const pricingPlans = {
  monthly: [
    {
      name: 'Starter',
      icon: Rocket,
      price: '29',
      description: 'Pour les indépendants et petites équipes qui démarrent',
      highlight: false,
      features: [
        { name: 'Jusqu\'à 2 utilisateurs', included: true },
        { name: '1 000 contacts', included: true },
        { name: 'Pipeline commercial', included: true },
        { name: 'Gestion des tâches', included: true },
        { name: 'Import/Export CSV', included: true },
        { name: 'Email tracking (100/mois)', included: true },
        { name: 'Rapports basiques', included: true },
        { name: 'Support email', included: true },
        { name: 'Automatisations', included: false },
        { name: 'Intégrations avancées', included: false },
        { name: 'API REST', included: false },
        { name: 'SSO / SAML', included: false },
      ],
      cta: 'Commencer gratuitement',
      ctaVariant: 'outline' as const,
    },
    {
      name: 'Pro',
      icon: Users,
      price: '59',
      description: 'Pour les équipes commerciales en croissance',
      highlight: true,
      features: [
        { name: 'Jusqu\'à 10 utilisateurs', included: true },
        { name: '10 000 contacts', included: true },
        { name: 'Pipelines multiples', included: true },
        { name: 'Automatisations (10 workflows)', included: true },
        { name: 'Email tracking illimité', included: true },
        { name: 'Séquences d\'emails', included: true },
        { name: 'Rapports avancés', included: true },
        { name: 'Intégrations (Gmail, Outlook, Slack)', included: true },
        { name: 'Support prioritaire', included: true },
        { name: 'API REST', included: true },
        { name: 'Application mobile', included: true },
        { name: 'SSO / SAML', included: false },
      ],
      cta: 'Essai gratuit 14 jours',
      ctaVariant: 'default' as const,
    },
    {
      name: 'Business',
      icon: Building2,
      price: '99',
      description: 'Pour les entreprises avec des besoins avancés',
      highlight: false,
      features: [
        { name: 'Jusqu\'à 50 utilisateurs', included: true },
        { name: 'Contacts illimités', included: true },
        { name: 'Pipelines illimités', included: true },
        { name: 'Automatisations illimitées', included: true },
        { name: 'Toutes les intégrations', included: true },
        { name: 'Prévisions de ventes', included: true },
        { name: 'Tableaux de bord personnalisés', included: true },
        { name: 'Rôles et permissions avancés', included: true },
        { name: 'Support téléphonique', included: true },
        { name: 'API REST + Webhooks', included: true },
        { name: 'Onboarding personnalisé', included: true },
        { name: 'SSO / SAML', included: true },
      ],
      cta: 'Essai gratuit 14 jours',
      ctaVariant: 'outline' as const,
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: 'Sur mesure',
      description: 'Pour les grandes organisations avec des besoins spécifiques',
      highlight: false,
      features: [
        { name: 'Utilisateurs illimités', included: true },
        { name: 'Contacts illimités', included: true },
        { name: 'Tout Business +', included: true },
        { name: 'Instance dédiée', included: true },
        { name: 'SLA garanti 99.9%', included: true },
        { name: 'Intégrations sur mesure', included: true },
        { name: 'Formation sur site', included: true },
        { name: 'Account manager dédié', included: true },
        { name: 'Support 24/7', included: true },
        { name: 'Audit de sécurité', included: true },
        { name: 'Contrat personnalisé', included: true },
        { name: 'Facturation annuelle', included: true },
      ],
      cta: 'Contacter les ventes',
      ctaVariant: 'outline' as const,
    },
  ],
  annual: [
    {
      name: 'Starter',
      icon: Rocket,
      price: '24',
      originalPrice: '29',
      description: 'Pour les indépendants et petites équipes qui démarrent',
      highlight: false,
      savings: '60€/an',
      features: [
        { name: 'Jusqu\'à 2 utilisateurs', included: true },
        { name: '1 000 contacts', included: true },
        { name: 'Pipeline commercial', included: true },
        { name: 'Gestion des tâches', included: true },
        { name: 'Import/Export CSV', included: true },
        { name: 'Email tracking (100/mois)', included: true },
        { name: 'Rapports basiques', included: true },
        { name: 'Support email', included: true },
        { name: 'Automatisations', included: false },
        { name: 'Intégrations avancées', included: false },
        { name: 'API REST', included: false },
        { name: 'SSO / SAML', included: false },
      ],
      cta: 'Commencer gratuitement',
      ctaVariant: 'outline' as const,
    },
    {
      name: 'Pro',
      icon: Users,
      price: '49',
      originalPrice: '59',
      description: 'Pour les équipes commerciales en croissance',
      highlight: true,
      savings: '120€/an',
      features: [
        { name: 'Jusqu\'à 10 utilisateurs', included: true },
        { name: '10 000 contacts', included: true },
        { name: 'Pipelines multiples', included: true },
        { name: 'Automatisations (10 workflows)', included: true },
        { name: 'Email tracking illimité', included: true },
        { name: 'Séquences d\'emails', included: true },
        { name: 'Rapports avancés', included: true },
        { name: 'Intégrations (Gmail, Outlook, Slack)', included: true },
        { name: 'Support prioritaire', included: true },
        { name: 'API REST', included: true },
        { name: 'Application mobile', included: true },
        { name: 'SSO / SAML', included: false },
      ],
      cta: 'Essai gratuit 14 jours',
      ctaVariant: 'default' as const,
    },
    {
      name: 'Business',
      icon: Building2,
      price: '79',
      originalPrice: '99',
      description: 'Pour les entreprises avec des besoins avancés',
      highlight: false,
      savings: '240€/an',
      features: [
        { name: 'Jusqu\'à 50 utilisateurs', included: true },
        { name: 'Contacts illimités', included: true },
        { name: 'Pipelines illimités', included: true },
        { name: 'Automatisations illimitées', included: true },
        { name: 'Toutes les intégrations', included: true },
        { name: 'Prévisions de ventes', included: true },
        { name: 'Tableaux de bord personnalisés', included: true },
        { name: 'Rôles et permissions avancés', included: true },
        { name: 'Support téléphonique', included: true },
        { name: 'API REST + Webhooks', included: true },
        { name: 'Onboarding personnalisé', included: true },
        { name: 'SSO / SAML', included: true },
      ],
      cta: 'Essai gratuit 14 jours',
      ctaVariant: 'outline' as const,
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: 'Sur mesure',
      description: 'Pour les grandes organisations avec des besoins spécifiques',
      highlight: false,
      features: [
        { name: 'Utilisateurs illimités', included: true },
        { name: 'Contacts illimités', included: true },
        { name: 'Tout Business +', included: true },
        { name: 'Instance dédiée', included: true },
        { name: 'SLA garanti 99.9%', included: true },
        { name: 'Intégrations sur mesure', included: true },
        { name: 'Formation sur site', included: true },
        { name: 'Account manager dédié', included: true },
        { name: 'Support 24/7', included: true },
        { name: 'Audit de sécurité', included: true },
        { name: 'Contrat personnalisé', included: true },
        { name: 'Facturation annuelle', included: true },
      ],
      cta: 'Contacter les ventes',
      ctaVariant: 'outline' as const,
    },
  ]
}

const faqs = [
  {
    question: 'Puis-je tester gratuitement avant de m\'engager ?',
    answer: 'Absolument ! Tous nos plans (sauf Enterprise) bénéficient d\'un essai gratuit de 14 jours, sans carte bancaire requise. Vous aurez accès à toutes les fonctionnalités du plan choisi pour évaluer si notre CRM répond à vos besoins.'
  },
  {
    question: 'Puis-je changer de plan à tout moment ?',
    answer: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement. En cas d\'upgrade, vous ne payez que la différence au prorata. En cas de downgrade, le crédit est reporté sur vos prochaines factures.'
  },
  {
    question: 'Qu\'est-ce qui est inclus dans le support ?',
    answer: 'Le support varie selon les plans : email pour Starter (réponse sous 48h), prioritaire pour Pro (réponse sous 24h), téléphonique pour Business (réponse sous 4h), et 24/7 pour Enterprise avec un account manager dédié.'
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'La sécurité est notre priorité. Vos données sont chiffrées (AES-256), hébergées en Europe (conformité RGPD), avec des sauvegardes quotidiennes. Nous sommes certifiés SOC 2 Type II et ISO 27001.'
  },
  {
    question: 'Comment fonctionne la facturation ?',
    answer: 'Nous facturons mensuellement ou annuellement selon votre choix. Le paiement annuel vous fait économiser jusqu\'à 20%. Nous acceptons les cartes bancaires, virements SEPA et PayPal. Des factures conformes sont générées automatiquement.'
  },
  {
    question: 'Puis-je ajouter des utilisateurs en cours de route ?',
    answer: 'Oui, vous pouvez ajouter des utilisateurs à tout moment. Le coût additionnel est calculé au prorata du temps restant sur votre période de facturation. Les plans Starter et Pro ont des limites d\'utilisateurs, mais Business et Enterprise sont plus flexibles.'
  },
  {
    question: 'Proposez-vous des remises pour les startups ou associations ?',
    answer: 'Oui ! Nous proposons des tarifs préférentiels pour les startups early-stage (moins de 2 ans, levée < 2M€) et les associations à but non lucratif. Contactez notre équipe commerciale pour en savoir plus.'
  },
  {
    question: 'Que se passe-t-il si je dépasse les limites de mon plan ?',
    answer: 'Vous recevrez une notification avant d\'atteindre vos limites. Si vous les dépassez, votre compte ne sera pas bloqué immédiatement : nous vous proposerons d\'upgrader vers un plan supérieur adapté à votre croissance.'
  },
]

const comparisonFeatures = [
  { name: 'Utilisateurs', starter: '2', pro: '10', business: '50', enterprise: 'Illimité' },
  { name: 'Contacts', starter: '1 000', pro: '10 000', business: 'Illimité', enterprise: 'Illimité' },
  { name: 'Pipelines', starter: '1', pro: '5', business: 'Illimité', enterprise: 'Illimité' },
  { name: 'Automatisations', starter: '—', pro: '10', business: 'Illimité', enterprise: 'Illimité' },
  { name: 'Email tracking', starter: '100/mois', pro: 'Illimité', business: 'Illimité', enterprise: 'Illimité' },
  { name: 'Séquences email', starter: '—', pro: '✓', business: '✓', enterprise: '✓' },
  { name: 'Rapports', starter: 'Basiques', pro: 'Avancés', business: 'Personnalisés', enterprise: 'Personnalisés' },
  { name: 'Intégrations', starter: 'Email', pro: 'Gmail, Outlook, Slack', business: 'Toutes', enterprise: 'Toutes + Sur mesure' },
  { name: 'API REST', starter: '—', pro: '✓', business: '✓', enterprise: '✓' },
  { name: 'SSO / SAML', starter: '—', pro: '—', business: '✓', enterprise: '✓' },
  { name: 'Support', starter: 'Email', pro: 'Prioritaire', business: 'Téléphone', enterprise: '24/7 + AM dédié' },
  { name: 'Onboarding', starter: 'Self-service', pro: 'Webinaire', business: 'Personnalisé', enterprise: 'Sur site' },
]

export default function PricingPage() {
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

        <div className="container relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4 bg-accent text-accent-foreground border-0">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Tarifs simples et transparents
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Un CRM adapté à{' '}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                votre croissance
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Choisissez le plan qui correspond à la taille de votre équipe et à vos ambitions commerciales.
              Évoluez à votre rythme, sans engagement.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {[
                'Essai gratuit 14 jours',
                'Sans carte bancaire',
                'Annulation à tout moment',
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container pb-20">
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full md:w-[400px] mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="monthly">Mensuel</TabsTrigger>
            <TabsTrigger value="annual">
              Annuel
              <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">-20%</Badge>
            </TabsTrigger>
          </TabsList>

          {(['monthly', 'annual'] as const).map((period) => (
            <TabsContent key={period} value={period}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="grid gap-6 lg:grid-cols-4 max-w-7xl mx-auto"
              >
                {pricingPlans[period].map((plan) => (
                  <motion.div key={plan.name} variants={fadeIn}>
                    <Card className={`h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${plan.highlight ? 'border-primary border-2 shadow-xl shadow-primary/10 relative' : 'border-2 border-transparent hover:border-primary/20'}`}>
                      {plan.highlight && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-primary to-chart-2 text-primary-foreground px-4 py-1 shadow-lg shadow-primary/25">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Le plus populaire
                          </Badge>
                        </div>
                      )}
                      <CardHeader className={plan.highlight ? 'pt-8' : ''}>
                        <div className="flex items-center gap-3 mb-2">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`rounded-xl p-2.5 ${plan.highlight ? 'bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-lg shadow-primary/25' : 'bg-primary/10 text-primary'}`}
                          >
                            <plan.icon className="h-5 w-5" />
                          </motion.div>
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                        </div>
                        <CardDescription className="min-h-[40px]">{plan.description}</CardDescription>
                        <div className="mt-4">
                          {plan.price === 'Sur mesure' ? (
                            <span className="text-3xl font-bold">Sur mesure</span>
                          ) : (
                            <>
                              {'originalPrice' in plan && (
                                <span className="text-lg text-muted-foreground line-through mr-2">{plan.originalPrice}€</span>
                              )}
                              <span className="text-4xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">{plan.price}€</span>
                              <span className="text-muted-foreground">/utilisateur/mois</span>
                            </>
                          )}
                        </div>
                        {'savings' in plan && plan.savings && (
                          <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary">
                            Économisez {plan.savings}
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-2">
                          {plan.features.map((feature) => (
                            <li key={feature.name} className="flex items-start gap-2">
                              {feature.included ? (
                                <div className="shrink-0 mt-0.5 rounded-full bg-primary p-0.5">
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                </div>
                              ) : (
                                <X className="h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                              )}
                              <span className={`text-sm ${feature.included ? '' : 'text-muted-foreground/50'}`}>
                                {feature.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className={`w-full transition-all ${plan.highlight ? 'shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30' : ''}`}
                          variant={plan.ctaVariant}
                          size="lg"
                          asChild
                        >
                          <Link href={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                            {plan.cta}
                            {plan.name !== 'Enterprise' && <ArrowRight className="ml-2 h-4 w-4" />}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Comparison Table */}
      <section className="bg-muted/30 border-y py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12 text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="secondary" className="mb-4">Comparatif détaillé</Badge>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Comparez les fonctionnalités
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <Card className="overflow-hidden border-2">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4 font-semibold">Fonctionnalité</th>
                    <th className="text-center p-4 font-semibold">Starter</th>
                    <th className="text-center p-4 font-semibold bg-primary/10">
                      <span className="text-primary">Pro</span>
                    </th>
                    <th className="text-center p-4 font-semibold">Business</th>
                    <th className="text-center p-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={feature.name} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                      <td className="p-4 font-medium">{feature.name}</td>
                      <td className="text-center p-4 text-muted-foreground">{feature.starter}</td>
                      <td className="text-center p-4 bg-primary/5 font-medium text-primary">{feature.pro}</td>
                      <td className="text-center p-4 text-muted-foreground">{feature.business}</td>
                      <td className="text-center p-4 text-muted-foreground">{feature.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12 text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="secondary" className="mb-4">FAQ</Badge>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Questions fréquentes
            </motion.h2>
            <motion.p variants={fadeIn} className="text-muted-foreground text-lg">
              Tout ce que vous devez savoir sur nos tarifs et notre fonctionnement
            </motion.p>
          </motion.div>

          <Card className="border-2">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b-border/50">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="flex items-center gap-3">
                        <div className="shrink-0 rounded-lg bg-primary/10 p-1.5">
                          <HelpCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pl-10 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
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
                Prêt à booster votre performance commerciale ?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
                Rejoignez plus de 12 000 commerciaux qui ont choisi notre CRM.
                Essai gratuit de 14 jours, sans engagement.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl text-lg px-8 hover:scale-[1.02] transition-all">
                  <Link href="/register">
                    Démarrer l'essai gratuit <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 text-lg px-8 hover:scale-[1.02] transition-all"
                >
                  <Link href="/contact">Parler à un conseiller</Link>
                </Button>
              </div>
              <p className="text-sm opacity-75">
                Questions ? Appelez-nous au +33 1 23 45 67 89 ou écrivez à contact@crmpro.fr
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Chatbot />
    </div>
  )
}
