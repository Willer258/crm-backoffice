'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-2/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-lg mx-auto"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8"
        >
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-8xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent mb-4"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-semibold mb-2"
        >
          Page introuvable
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mb-8"
        >
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour en arrière
          </Button>

          <Link href="/dashboard">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              <Home className="h-4 w-4" />
              Accueil
            </Button>
          </Link>
        </motion.div>

        {/* Help text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          Besoin d&apos;aide ?{' '}
          <Link href="/support" className="text-primary hover:underline">
            Contactez le support
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}
