'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WelcomeBannerProps {
  userName: string
  message?: string
  ctaText?: string
  ctaHref?: string
  onCtaClick?: () => void
  className?: string
}

export function WelcomeBanner({
  userName,
  message = "Prêt à conquérir de nouveaux clients aujourd'hui ?",
  ctaText = 'Voir les opportunités',
  ctaHref,
  onCtaClick,
  className,
}: WelcomeBannerProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bonjour'
    if (hour < 18) return 'Bon après-midi'
    return 'Bonsoir'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-8 text-primary-foreground shadow-lg',
        className
      )}
    >
      {/* Background decorations */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-white/10 blur-xl" />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium opacity-90">Tableau de bord</span>
          </div>
          <h1 className="text-2xl font-bold md:text-3xl">
            {getGreeting()}, {userName} !
          </h1>
          <p className="max-w-md text-sm opacity-90 md:text-base">{message}</p>
        </div>

        {(ctaHref || onCtaClick) && (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="secondary"
              size="lg"
              onClick={onCtaClick}
              className="group rounded-xl bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border-0"
              asChild={!!ctaHref}
            >
              {ctaHref ? (
                <a href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <>
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Floating illustration placeholder */}
      <div className="absolute bottom-4 right-8 hidden opacity-20 lg:block">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" />
          <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="2" />
          <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="2" />
          <line x1="60" y1="10" x2="60" y2="35" stroke="currentColor" strokeWidth="2" />
          <line x1="60" y1="85" x2="60" y2="110" stroke="currentColor" strokeWidth="2" />
          <line x1="10" y1="60" x2="35" y2="60" stroke="currentColor" strokeWidth="2" />
          <line x1="85" y1="60" x2="110" y2="60" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </motion.div>
  )
}
