'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'

interface PasswordStrengthProps {
  password: string
  className?: string
}

interface PasswordRequirement {
  label: string
  test: (password: string) => boolean
}

const requirements: PasswordRequirement[] = [
  { label: 'Au moins 8 caractères', test: (p) => p.length >= 8 },
  { label: 'Une lettre majuscule', test: (p) => /[A-Z]/.test(p) },
  { label: 'Une lettre minuscule', test: (p) => /[a-z]/.test(p) },
  { label: 'Un chiffre', test: (p) => /[0-9]/.test(p) },
  {
    label: 'Un caractère spécial (!@#$%^&*)',
    test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
  },
]

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const analysis = useMemo(() => {
    const passed = requirements.filter((req) => req.test(password))
    const score = passed.length
    const percentage = (score / requirements.length) * 100

    let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
    let color = 'bg-red-500'

    if (score >= 5) {
      strength = 'strong'
      color = 'bg-green-500'
    } else if (score >= 4) {
      strength = 'good'
      color = 'bg-emerald-500'
    } else if (score >= 3) {
      strength = 'fair'
      color = 'bg-yellow-500'
    }

    return { passed, score, percentage, strength, color }
  }, [password])

  if (!password) return null

  return (
    <div className={cn('space-y-3', className)}>
      {/* Strength bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Force du mot de passe</span>
          <span
            className={cn(
              'font-medium capitalize',
              analysis.strength === 'weak' && 'text-red-500',
              analysis.strength === 'fair' && 'text-yellow-500',
              analysis.strength === 'good' && 'text-emerald-500',
              analysis.strength === 'strong' && 'text-green-500'
            )}
          >
            {analysis.strength === 'weak' && 'Faible'}
            {analysis.strength === 'fair' && 'Moyen'}
            {analysis.strength === 'good' && 'Bon'}
            {analysis.strength === 'strong' && 'Fort'}
          </span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className={cn('h-full transition-all duration-300', analysis.color)}
            style={{ width: `${analysis.percentage}%` }}
          />
        </div>
      </div>

      {/* Requirements checklist */}
      <ul className="space-y-1">
        {requirements.map((req, index) => {
          const isPassed = req.test(password)
          return (
            <li
              key={index}
              className={cn(
                'flex items-center gap-2 text-xs transition-colors',
                isPassed ? 'text-green-600' : 'text-muted-foreground'
              )}
            >
              {isPassed ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
              {req.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Utility function to validate password
export function validatePassword(password: string): {
  isValid: boolean
  score: number
  feedback: string[]
} {
  const failed = requirements.filter((req) => !req.test(password))
  return {
    isValid: failed.length === 0,
    score: requirements.length - failed.length,
    feedback: failed.map((req) => req.label),
  }
}
