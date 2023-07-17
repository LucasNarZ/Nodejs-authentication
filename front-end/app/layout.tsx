import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Finance',
  description: 'Organiza your finances',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
