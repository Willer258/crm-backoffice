import type { Metadata } from 'next'
import { Inter, Lora, Fira_Code } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from '@/hooks/use-theme'
import { Toaster } from '@/components/ui/sonner'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SaaS Dashboard',
  description: 'Modern SaaS dashboard template with Next.js',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} ${firaCode.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider defaultTheme="default" defaultMode="light" storageKey="ui-theme">
            {children}
            <Toaster position="top-right" richColors closeButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
