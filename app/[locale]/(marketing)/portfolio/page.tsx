"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { ExternalLink, Github, Calendar, ArrowRight, Sparkles, Star, TrendingUp } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

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

const projects = [
  {
    id: '1',
    title: 'Marketplace E-commerce',
    category: 'E-commerce',
    description: 'Plateforme multi-vendeurs avec plus de 10 000 produits et système de paiement intégré',
    image: '🛍️',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
    year: '2024',
    client: 'ShopHub',
    featured: true
  },
  {
    id: '2',
    title: 'Application SaaS Analytics',
    category: 'Web App',
    description: 'Dashboard analytics en temps réel avec visualisations de données avancées',
    image: '📊',
    tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    year: '2024',
    client: 'DataViz Pro',
    featured: true
  },
  {
    id: '3',
    title: 'Site Corporate Luxe',
    category: 'Website',
    description: 'Site vitrine haut de gamme avec animations 3D et expérience immersive',
    image: '💎',
    tags: ['Next.js', 'Three.js', 'GSAP', 'Framer Motion'],
    year: '2024',
    client: 'Luxury Brand',
    featured: true
  },
  {
    id: '4',
    title: 'Plateforme de Formation',
    category: 'Education',
    description: 'LMS complet avec cours vidéo, quiz interactifs et suivi de progression',
    image: '🎓',
    tags: ['Next.js', 'Prisma', 'Stripe', 'AWS'],
    year: '2023',
    client: 'EduLearn',
    featured: false
  },
  {
    id: '5',
    title: 'App Mobile Fitness',
    category: 'Mobile',
    description: 'Application de suivi fitness avec plans personnalisés et coaching IA',
    image: '💪',
    tags: ['React Native', 'Firebase', 'TensorFlow', 'Stripe'],
    year: '2023',
    client: 'FitTrack',
    featured: false
  },
  {
    id: '6',
    title: 'Portfolio Photographe',
    category: 'Website',
    description: 'Portfolio élégant avec galerie haute résolution et e-commerce intégré',
    image: '📸',
    tags: ['Next.js', 'Sanity', 'Cloudinary', 'Stripe'],
    year: '2023',
    client: 'Photo Studio',
    featured: false
  },
  {
    id: '7',
    title: 'Plateforme de Réservation',
    category: 'Web App',
    description: 'Système de réservation en ligne pour salles et équipements',
    image: '📅',
    tags: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
    year: '2023',
    client: 'BookSpace',
    featured: false
  },
  {
    id: '8',
    title: 'Blog Culinaire',
    category: 'Website',
    description: 'Blog de recettes avec recherche avancée et fonctionnalités sociales',
    image: '👨‍🍳',
    tags: ['Next.js', 'MDX', 'Algolia', 'Vercel'],
    year: '2023',
    client: 'Chef Stories',
    featured: false
  }
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'E-commerce', 'Web App', 'Website', 'Mobile', 'Education']

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  const featuredProjects = projects.filter(p => p.featured)

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
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-0 -right-1/4 h-[300px] w-[300px] rounded-full bg-chart-2/20 blur-3xl"
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
                Portfolio
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Nos{' '}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                Réalisations
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Découvrez les projets qui ont marqué notre parcours et la confiance que nos clients nous accordent
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-4 mb-20"
        >
          {[
            { value: '500+', label: 'Projets', icon: TrendingUp },
            { value: '250+', label: 'Clients', icon: Star },
            { value: '15+', label: 'Pays', icon: Sparkles },
            { value: '98%', label: 'Satisfaction', icon: Star }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeIn}
            >
              <Card className="text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                <CardHeader className="pb-2">
                  <div className="mx-auto mb-2 rounded-full bg-primary/10 p-2 w-fit">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Projects */}
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
              <Badge className="mb-4 bg-accent text-accent-foreground border-0">
                <Star className="mr-1.5 h-3.5 w-3.5" />
                À la une
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight sm:text-4xl">
              Projets Phares
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={fadeIn}>
                <Card className="h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] group border-2 border-transparent hover:border-primary/20">
                  <CardHeader>
                    <div className="text-7xl mb-6 text-center group-hover:scale-110 transition-transform">
                      {project.image}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-primary text-primary-foreground">{project.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 text-primary" />
                        {project.year}
                      </div>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-accent/50 text-accent-foreground">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-sm font-medium text-muted-foreground">{project.client}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                            <Github className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Projects */}
      <section className="container py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4 bg-accent text-accent-foreground border-0">Catalogue</Badge>
          </motion.div>
          <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tous nos projets
          </motion.h2>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-1 w-full md:w-auto mb-12 h-auto p-1">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                onClick={() => setSelectedCategory(cat)}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {cat === 'all' ? 'Tous' : cat}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={fadeIn}>
                  <Card className="h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-primary/20">
                    <CardHeader>
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                        {project.image}
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-primary/30 text-primary">{project.category}</Badge>
                        <span className="text-xs text-muted-foreground">{project.year}</span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-accent/50 text-accent-foreground">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        Voir le projet <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Aucun projet trouvé dans cette catégorie.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
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
                Vous avez un projet en tête ?
              </h2>
              <p className="mb-8 text-xl opacity-90 max-w-2xl mx-auto">
                Transformons votre vision en réalité. Contactez-nous pour discuter de votre projet.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                  <Link href="/contact">
                    Démarrer un projet <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/20 transition-all">
                  <Link href="/services">Voir nos services</Link>
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
