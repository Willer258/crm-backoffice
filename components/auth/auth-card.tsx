'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface AuthCardProps {
  title: string
  description?: string
  icon?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function AuthCard({
  title,
  description,
  icon,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4">
      {/* Background effects */}
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
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute bottom-1/4 -right-1/4 h-[300px] w-[300px] rounded-full bg-chart-2/20 blur-3xl"
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn('w-full max-w-md mx-auto', className)}
        >
          <Card className="border-2 shadow-xl shadow-primary/5">
            <CardHeader className="space-y-1 text-center pb-6">
              {icon && (
                <div className="mx-auto mb-4 inline-flex rounded-2xl bg-primary/10 p-3">
                  {icon}
                </div>
              )}
              <CardTitle className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
                  {title}
                </span>
              </CardTitle>
              {description && (
                <CardDescription className="text-base">
                  {description}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="space-y-4">{children}</CardContent>

            {footer && (
              <CardFooter className="flex flex-col space-y-4 pt-6 border-t">
                {footer}
              </CardFooter>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
