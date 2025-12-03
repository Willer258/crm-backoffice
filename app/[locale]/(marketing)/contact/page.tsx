'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  Users,
  Building2,
  Headphones,
  Calendar,
  ArrowRight,
  Check,
  PlayCircle,
  Sparkles,
  Star,
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import Link from 'next/link'

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

const contactReasons = [
  { value: 'demo', label: 'Demander une démo personnalisée' },
  { value: 'pricing', label: 'Question sur les tarifs' },
  { value: 'technical', label: 'Question technique' },
  { value: 'partnership', label: 'Partenariat / Intégration' },
  { value: 'press', label: 'Presse / Médias' },
  { value: 'careers', label: 'Rejoindre l\'équipe' },
  { value: 'other', label: 'Autre demande' },
]

const teamSizes = [
  { value: '1', label: '1 personne (indépendant)' },
  { value: '2-5', label: '2-5 personnes' },
  { value: '6-10', label: '6-10 personnes' },
  { value: '11-25', label: '11-25 personnes' },
  { value: '26-50', label: '26-50 personnes' },
  { value: '50+', label: 'Plus de 50 personnes' },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    reason: '',
    teamSize: '',
    message: '',
    newsletter: false,
    gdpr: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.gdpr) {
      toast({
        title: 'Consentement requis',
        description: 'Veuillez accepter notre politique de confidentialité.',
        variant: 'destructive',
      })
      return
    }
    toast({
      title: 'Message envoyé !',
      description: 'Notre équipe vous répondra dans les 24h ouvrées.',
    })
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      reason: '',
      teamSize: '',
      message: '',
      newsletter: false,
      gdpr: false,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
                Contactez-nous
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Parlons de votre{' '}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                projet commercial
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Que vous souhaitiez une démo personnalisée, des informations sur nos tarifs
              ou simplement discuter de vos enjeux commerciaux, notre équipe est là pour vous.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="container pb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-4 mb-12"
        >
          {[
            {
              icon: PlayCircle,
              title: 'Voir une démo',
              content: 'Découvrez le CRM en action',
              description: 'Vidéo de 5 minutes',
              action: 'Regarder',
              href: '#demo',
            },
            {
              icon: Calendar,
              title: 'Réserver un appel',
              content: 'Discutez avec un expert',
              description: '30 min, sans engagement',
              action: 'Planifier',
              href: '#call',
            },
            {
              icon: Mail,
              title: 'Email',
              content: 'contact@crmpro.fr',
              description: 'Réponse sous 24h',
              action: 'Écrire',
              href: 'mailto:contact@crmpro.fr',
            },
            {
              icon: Phone,
              title: 'Téléphone',
              content: '+33 1 23 45 67 89',
              description: 'Lun-Ven 9h-18h',
              action: 'Appeler',
              href: 'tel:+33123456789',
            },
          ].map((item) => (
            <motion.div key={item.title} variants={fadeIn}>
              <Card className="h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                <CardHeader className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="mx-auto mb-4 inline-flex rounded-2xl bg-primary/10 p-4 text-primary"
                  >
                    <item.icon className="h-6 w-6" />
                  </motion.div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="font-medium text-foreground">
                    {item.content}
                  </CardDescription>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <Button asChild variant="outline" size="sm" className="w-full border-2 hover:bg-primary hover:text-primary-foreground transition-all">
                    <Link href={item.href}>
                      {item.action} <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="container pb-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                <CardDescription>
                  Remplissez ce formulaire et notre équipe vous répondra dans les plus brefs délais.
                  Tous les champs marqués * sont obligatoires.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Jean"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="border-2 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Dupont"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="border-2 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email professionnel *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jean.dupont@entreprise.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-2 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-2 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise *</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Nom de votre entreprise"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="border-2 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Fonction</Label>
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="Directeur commercial"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="border-2 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="reason">Objet de votre demande *</Label>
                      <Select
                        value={formData.reason}
                        onValueChange={(value) => setFormData({ ...formData, reason: value })}
                        required
                      >
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="Sélectionnez un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactReasons.map((reason) => (
                            <SelectItem key={reason.value} value={reason.value}>
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Taille de l'équipe commerciale</Label>
                      <Select
                        value={formData.teamSize}
                        onValueChange={(value) => setFormData({ ...formData, teamSize: value })}
                      >
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="Nombre de commerciaux" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamSizes.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Votre message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre besoin, vos enjeux commerciaux actuels, ou posez-nous vos questions..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="border-2 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, newsletter: checked as boolean })
                        }
                      />
                      <Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer leading-relaxed">
                        Je souhaite recevoir les actualités produit, conseils commerciaux et invitations aux webinaires
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="gdpr"
                        checked={formData.gdpr}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, gdpr: checked as boolean })
                        }
                        required
                      />
                      <Label htmlFor="gdpr" className="text-sm font-normal cursor-pointer leading-relaxed">
                        J'accepte que mes données soient traitées conformément à la{' '}
                        <Link href="/privacy" className="text-primary underline hover:text-primary/80 transition-colors">
                          politique de confidentialité
                        </Link>{' '}
                        *
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Response Time */}
            <Card className="bg-gradient-to-br from-primary via-chart-2 to-primary text-primary-foreground border-0 shadow-xl shadow-primary/25">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-6 w-6" />
                  <CardTitle className="text-primary-foreground">Temps de réponse</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Demande de démo</span>
                  <span className="font-semibold">{'< 4h'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Question commerciale</span>
                  <span className="font-semibold">{'< 24h'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Support technique</span>
                  <span className="font-semibold">{'< 2h'}</span>
                </div>
                <p className="text-sm opacity-75 pt-2 border-t border-primary-foreground/20">
                  Horaires : Lun-Ven 9h-18h (CET)
                </p>
              </CardContent>
            </Card>

            {/* Why Contact Us */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Ce que vous obtiendrez</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  'Réponse personnalisée d\'un expert CRM',
                  'Démo adaptée à votre secteur d\'activité',
                  'Estimation gratuite du ROI potentiel',
                  'Conseils pour migrer vos données',
                  'Aucun engagement, aucune pression',
                ].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-2 transition-transform"
                  >
                    <div className="shrink-0 mt-0.5 rounded-full bg-primary p-0.5">
                      <Check className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Office Info */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Nos bureaux</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium">Paris (Siège)</div>
                  <p className="text-sm text-muted-foreground">
                    42 rue de la Performance<br />
                    75008 Paris, France
                  </p>
                </div>
                <div>
                  <div className="font-medium">Berlin</div>
                  <p className="text-sm text-muted-foreground">
                    Friedrichstraße 123<br />
                    10117 Berlin, Allemagne
                  </p>
                </div>
                <div>
                  <div className="font-medium">Madrid</div>
                  <p className="text-sm text-muted-foreground">
                    Calle Gran Vía 45<br />
                    28013 Madrid, Espagne
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Support for Existing Customers */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Headphones className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Déjà client ?</CardTitle>
                </div>
                <CardDescription>
                  Accédez à votre espace support dédié avec chat en direct et base de connaissances.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full border-2 hover:bg-primary hover:text-primary-foreground transition-all">
                  <Link href="/dashboard">
                    Accéder au support <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="bg-muted/30 border-y py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="secondary" className="mb-4">Questions fréquentes</Badge>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Vous avez peut-être déjà la réponse
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Users,
                question: 'Combien coûte le CRM ?',
                answer: 'À partir de 29€/utilisateur/mois. Essai gratuit 14 jours.',
                link: '/pricing',
              },
              {
                icon: Clock,
                question: 'Combien de temps pour démarrer ?',
                answer: 'Configuration en 5 minutes, import des données en 1h.',
                link: '/features',
              },
              {
                icon: Building2,
                question: 'Pour quels types d\'entreprises ?',
                answer: 'PME, startups, indépendants, équipes commerciales de 1 à 500.',
                link: '/about',
              },
              {
                icon: MessageCircle,
                question: 'Quel support est inclus ?',
                answer: 'Email, chat, téléphone selon le plan. Base de connaissances 24/7.',
                link: '/pricing',
              },
            ].map((faq) => (
              <motion.div key={faq.question} variants={fadeIn}>
                <Card className="h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                  <CardHeader>
                    <div className="rounded-xl bg-primary/10 p-2 w-fit mb-2">
                      <faq.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{faq.question}</CardTitle>
                    <CardDescription>{faq.answer}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
                      <Link href={faq.link}>
                        En savoir plus <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Chatbot />
      <Toaster />
    </div>
  )
}
