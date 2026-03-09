'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertTriangle, Copy, Download, Check } from 'lucide-react'
import { toast } from 'sonner'

interface RecoveryCodesDisplayProps {
  codes: string[]
  onContinue?: () => void
  showAcknowledgement?: boolean
}

export function RecoveryCodesDisplay({
  codes,
  onContinue,
  showAcknowledgement = true,
}: RecoveryCodesDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [acknowledged, setAcknowledged] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codes.join('\n'))
      setCopied(true)
      toast.success('Codes copiés dans le presse-papiers')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Impossible de copier les codes')
    }
  }

  const handleDownload = () => {
    const content = `Codes de récupération CRM
${'='.repeat(30)}

${codes.join('\n')}

IMPORTANT: Conservez ces codes en lieu sûr.
Chaque code ne peut être utilisé qu'une seule fois.
Généré le: ${new Date().toLocaleString('fr-FR')}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'crm-codes-recuperation.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Codes téléchargés')
  }

  return (
    <Card className="border-2 border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
          <CardTitle className="text-lg">
            Sauvegardez vos codes de récupération
          </CardTitle>
        </div>
        <CardDescription>
          Ces codes vous permettent d&apos;accéder à votre compte si vous perdez
          votre appareil d&apos;authentification. Chaque code ne peut être utilisé
          qu&apos;une seule fois.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Codes grid */}
        <div className="grid grid-cols-2 gap-2 p-4 bg-background rounded-lg border">
          {codes.map((code, index) => (
            <div
              key={index}
              className="p-2 bg-muted rounded font-mono text-sm text-center"
            >
              {code}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="flex-1"
          >
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? 'Copié !' : 'Copier'}
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
        </div>

        {/* Acknowledgement checkbox */}
        {showAcknowledgement && (
          <>
            <div className="flex items-start space-x-3 pt-4 border-t">
              <Checkbox
                id="acknowledged"
                checked={acknowledged}
                onCheckedChange={(checked) =>
                  setAcknowledged(checked as boolean)
                }
              />
              <label
                htmlFor="acknowledged"
                className="text-sm leading-relaxed cursor-pointer"
              >
                J&apos;ai sauvegardé ces codes de récupération dans un endroit
                sécurisé
              </label>
            </div>

            {onContinue && (
              <Button
                onClick={onContinue}
                disabled={!acknowledged}
                className="w-full"
              >
                Continuer
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
