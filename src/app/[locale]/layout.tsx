import { workSans } from '@/fonts'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import '../globals.scss'
import { NextAuthProvider } from '../providers'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }]
}

export interface ILocaleLayout {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: ILocaleLayout) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={workSans.className}>
        <NextAuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
