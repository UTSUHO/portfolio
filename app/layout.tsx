import type { Metadata } from 'next'
import './globals.css'
import { TopStatusBar, BottomStatusBar } from './components/status-bar'
import SidebarVisual from './components/sidebar-visual'

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
      <body className="min-h-screen bg-bg">
        {/* Left Sidebar Visual - fixed, does not occupy space */}
        <SidebarVisual />

        {/* Right Content Area */}
        <div className="flex flex-col min-h-0">
          <TopStatusBar />

          <main className="relative flex-1 flex flex-col min-h-0">{children}</main>
          <BottomStatusBar />
        </div>
      </body>
    </html>
  )
}
