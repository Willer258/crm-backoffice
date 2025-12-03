"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { Calendar, Clock, ArrowRight, Search, Sparkles, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
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

const blogPosts = [
  {
    id: '1',
    title: 'Comment augmenter votre taux de conversion de 50%',
    excerpt: 'Découvrez les stratégies éprouvées pour transformer plus de prospects en clients fidèles grâce à un suivi commercial optimisé.',
    category: 'Vente',
    author: 'Marie Dubois',
    date: '2025-01-10',
    readTime: '8 min',
    image: '📈',
    featured: true
  },
  {
    id: '2',
    title: 'Les meilleures pratiques CRM pour les PME en 2025',
    excerpt: 'Guide complet pour tirer le meilleur parti de votre CRM et booster votre performance commerciale.',
    category: 'CRM',
    author: 'Thomas Lefebvre',
    date: '2025-01-08',
    readTime: '10 min',
    image: '🎯',
    featured: true
  },
  {
    id: '3',
    title: 'Automatisation commerciale : par où commencer ?',
    excerpt: 'Les premières étapes pour automatiser vos processus de vente et gagner des heures chaque semaine.',
    category: 'Automatisation',
    author: 'Sophie Martin',
    date: '2025-01-05',
    readTime: '6 min',
    image: '⚡',
    featured: false
  },
  {
    id: '4',
    title: 'Pipeline commercial : 5 erreurs à éviter absolument',
    excerpt: 'Les pièges courants qui plombent votre pipeline et comment les éviter pour maximiser vos ventes.',
    category: 'Vente',
    author: 'Alexandre Martin',
    date: '2025-01-03',
    readTime: '7 min',
    image: '🚫',
    featured: false
  },
  {
    id: '5',
    title: 'Email de relance : templates qui convertissent',
    excerpt: 'Nos meilleurs modèles d\'emails de relance pour réengager vos prospects et conclure plus de ventes.',
    category: 'Email',
    author: 'Marie Dubois',
    date: '2025-01-01',
    readTime: '5 min',
    image: '✉️',
    featured: false
  },
  {
    id: '6',
    title: 'KPIs commerciaux : les indicateurs essentiels',
    excerpt: 'Quels indicateurs suivre pour piloter efficacement votre équipe commerciale au quotidien.',
    category: 'Analytics',
    author: 'Thomas Lefebvre',
    date: '2024-12-28',
    readTime: '9 min',
    image: '📊',
    featured: false
  },
  {
    id: '7',
    title: 'Scoring de leads : guide pratique',
    excerpt: 'Comment mettre en place un système de scoring pour prioriser vos prospects les plus chauds.',
    category: 'CRM',
    author: 'Sophie Martin',
    date: '2024-12-25',
    readTime: '8 min',
    image: '🔥',
    featured: false
  },
  {
    id: '8',
    title: 'Onboarding commercial : réussir les 90 premiers jours',
    excerpt: 'Les clés pour intégrer efficacement un nouveau commercial et l\'amener rapidement à performer.',
    category: 'Management',
    author: 'Alexandre Martin',
    date: '2024-12-20',
    readTime: '12 min',
    image: '🎓',
    featured: false
  }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'Vente', 'CRM', 'Automatisation', 'Email', 'Analytics', 'Management']

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4 bg-accent text-accent-foreground border-0">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Blog
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Actualités &{' '}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                Ressources
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Conseils pratiques, bonnes pratiques et stratégies pour booster votre performance commerciale
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher un article..."
                className="pl-12 h-12 border-2 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
        <section className="container pb-20">
          <h2 className="text-2xl font-bold mb-8">Articles à la une</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-primary/20">
                  <CardHeader>
                    <div className="text-6xl mb-4">{post.image}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-primary text-primary-foreground">{post.category}</Badge>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        <Star className="h-3 w-3 mr-1" /> À la une
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-primary" />
                          {new Date(post.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-primary" />
                          {post.readTime}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform text-primary">
                        Lire <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="container pb-20">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex flex-wrap justify-start gap-1 w-full md:w-auto mb-12 h-auto p-1">
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
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPosts.map((post) => (
                <motion.div key={post.id} variants={fadeIn}>
                  <Card className="h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-primary/20">
                    <CardHeader>
                      <div className="text-5xl mb-4">{post.image}</div>
                      <Badge className="w-fit mb-2 bg-primary/10 text-primary">{post.category}</Badge>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-primary" />
                            {new Date(post.date).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-primary" />
                            {post.readTime}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Par {post.author}
                          </span>
                          <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform text-primary">
                            Lire <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Aucun article trouvé pour cette recherche.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Newsletter CTA */}
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
              <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Ne manquez aucun article
              </motion.h2>
              <motion.p variants={fadeIn} className="mb-8 text-xl opacity-90 max-w-2xl mx-auto">
                Inscrivez-vous à notre newsletter et recevez les derniers articles, conseils et bonnes pratiques directement dans votre boîte mail
              </motion.p>
              <motion.div variants={fadeIn} className="flex gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  className="bg-primary-foreground text-foreground border-0"
                />
                <Button variant="secondary" size="lg" className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                  S'abonner
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Chatbot />
    </div>
  )
}
