import type { Metadata } from 'next'
import './globals.css'
import { TopStatusBar, BottomStatusBar } from './components/status-bar'
import TabNav from './components/tab-nav'

export const metadata: Metadata = {
  title: 'Rei Utsuho - Portfolio',
  description: "ReiUtsuho's Portfolio",
  authors: [{ name: 'Rei Utsuho' }],
  openGraph: {
    siteName: 'Rei Utsuho',
    title: 'Rei Utsuho',
    type: 'website'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F5F3' }}>
        <TopStatusBar />
        <TabNav />
        <main className="flex-1">{children}</main>
        <BottomStatusBar />
      </body>
    </html>
  )
}
