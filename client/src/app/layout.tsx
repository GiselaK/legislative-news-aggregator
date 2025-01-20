import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your App',
  description: 'Your App Description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}