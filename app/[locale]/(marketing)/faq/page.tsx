"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HelpCircle, Sparkles, ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const faqs = {
  general: [
    {
      q: 'Qu\'est-ce que ce CRM et à qui s\'adresse-t-il ?',
      a: 'Notre CRM est une plateforme de gestion de la relation client conçue pour les PME, startups et équipes commerciales de 1 à 500 personnes. Il centralise vos contacts, automatise vos processus de vente et vous donne une vision claire de votre pipeline commercial.'
    },
    {
      q: 'Puis-je tester gratuitement avant de m\'engager ?',
      a: 'Absolument ! Tous nos plans bénéficient d\'un essai gratuit de 14 jours, sans carte bancaire requise. Vous aurez accès à toutes les fonctionnalités pour évaluer si notre CRM répond à vos besoins.'
    },
    {
      q: 'Combien de temps faut-il pour démarrer ?',
      a: 'La configuration initiale prend environ 5 minutes. L\'import de vos données existantes (contacts, entreprises) peut être fait en quelques clics et prend généralement moins d\'une heure, même pour des bases de plusieurs milliers de contacts.'
    },
    {
      q: 'Mes données sont-elles sécurisées ?',
      a: 'La sécurité est notre priorité. Vos données sont chiffrées (AES-256) au repos et en transit, hébergées en Europe (conformité RGPD), avec des sauvegardes quotidiennes. Nous sommes certifiés SOC 2 Type II et ISO 27001.'
    }
  ],
  fonctionnalites: [
    {
      q: 'Quelles sont les principales fonctionnalités ?',
      a: 'Le CRM inclut : gestion des contacts et entreprises, pipeline commercial visuel, suivi des activités (appels, emails, réunions), automatisations, email tracking, calendrier intégré, rapports et tableaux de bord, et intégrations avec vos outils favoris.'
    },
    {
      q: 'Puis-je synchroniser mes emails ?',
      a: 'Oui, nous proposons une synchronisation bidirectionnelle avec Gmail, Outlook et tout fournisseur IMAP. Vos emails sont automatiquement liés aux contacts concernés dans le CRM, avec tracking d\'ouverture et de clics.'
    },
    {
      q: 'Comment fonctionnent les automatisations ?',
      a: 'Notre éditeur visuel de workflows vous permet de créer des automatisations sans coder : attribution automatique des leads, envoi de séquences email, notifications, mise à jour de statuts, etc. Vous pouvez déclencher des actions sur création, modification ou selon des dates.'
    },
    {
      q: 'Le CRM est-il disponible sur mobile ?',
      a: 'Oui, notre application mobile (iOS et Android) vous permet d\'accéder à vos contacts, opportunités et activités où que vous soyez. Elle inclut le mode hors-ligne, la synchronisation automatique et les appels en 1 clic.'
    }
  ],
  tarifs: [
    {
      q: 'Quels sont vos tarifs ?',
      a: 'Nos tarifs démarrent à 29€/utilisateur/mois pour le plan Starter. Le plan Pro (59€) est le plus populaire pour les équipes en croissance. Le plan Business (99€) convient aux entreprises avec des besoins avancés. Consultez notre page Tarifs pour tous les détails.'
    },
    {
      q: 'Puis-je changer de plan à tout moment ?',
      a: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement. En cas d\'upgrade, vous ne payez que la différence au prorata.'
    },
    {
      q: 'Y a-t-il des frais cachés ?',
      a: 'Non, nos tarifs sont transparents. Le prix affiché inclut toutes les fonctionnalités du plan, les mises à jour, le support standard et le stockage. Les seuls coûts additionnels possibles sont les utilisateurs supplémentaires et certains modules optionnels.'
    },
    {
      q: 'Proposez-vous des remises pour les startups ou associations ?',
      a: 'Oui ! Nous proposons des tarifs préférentiels pour les startups early-stage (moins de 2 ans, levée < 2M€) et les associations à but non lucratif. Contactez notre équipe commerciale pour en savoir plus.'
    }
  ],
  support: [
    {
      q: 'Quel support est inclus ?',
      a: 'Le support varie selon les plans : email pour Starter (réponse sous 48h), prioritaire pour Pro (réponse sous 24h), téléphonique pour Business (réponse sous 4h). Tous les plans ont accès à notre base de connaissances complète et à notre chatbot.'
    },
    {
      q: 'Proposez-vous de l\'accompagnement à la prise en main ?',
      a: 'Oui, nous proposons des sessions d\'onboarding adaptées à chaque plan : self-service et tutoriels vidéo pour Starter, webinaire de groupe pour Pro, accompagnement personnalisé pour Business et formation sur site pour Enterprise.'
    },
    {
      q: 'Puis-je migrer mes données depuis un autre CRM ?',
      a: 'Absolument ! Nous proposons des outils d\'import depuis Excel, CSV, et migration assistée depuis les principaux CRM du marché (Salesforce, HubSpot, Pipedrive, etc.). Notre équipe peut vous accompagner gratuitement dans ce processus.'
    },
    {
      q: 'Comment contacter le support ?',
      a: 'Vous pouvez nous contacter par email (support@crmpro.fr), par téléphone (+33 1 23 45 67 89) selon votre plan, via le chat intégré dans l\'application, ou en soumettant un ticket depuis votre espace client.'
    }
  ]
}

export default function FAQPage() {
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
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-12">
            <motion.div variants={fadeIn}>
              <Badge className="mb-4 bg-accent text-accent-foreground border-0">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                FAQ
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeIn} className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Questions{' '}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                Fréquentes
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto">
              Trouvez rapidement des réponses à vos questions sur notre CRM, nos tarifs et notre accompagnement
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Tabs */}
      <section className="container pb-20">
        <Tabs defaultValue="general" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 h-auto p-1">
            <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Général
            </TabsTrigger>
            <TabsTrigger value="fonctionnalites" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Fonctionnalités
            </TabsTrigger>
            <TabsTrigger value="tarifs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Tarifs
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Support
            </TabsTrigger>
          </TabsList>

          {Object.entries(faqs).map(([key, items]) => (
            <TabsContent key={key} value={key}>
              <Card className="border-2">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {items.map((faq, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-b-border/50">
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="flex items-center gap-3">
                            <div className="shrink-0 rounded-lg bg-primary/10 p-1.5">
                              <HelpCircle className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{faq.q}</span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pl-10 pb-4 leading-relaxed">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.div variants={fadeIn}>
              <div className="mx-auto mb-6 inline-flex rounded-2xl bg-primary/10 p-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Vous n'avez pas trouvé votre réponse ?
            </motion.h2>
            <motion.p variants={fadeIn} className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
              Notre équipe est là pour vous aider. Contactez-nous et obtenez une réponse personnalisée dans les plus brefs délais.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02]">
                <Link href="/contact">
                  Nous contacter <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground transition-all">
                <Link href="/register">Essayer gratuitement</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Chatbot />
    </div>
  )
}
