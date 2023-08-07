import './globals.css'

export const metadata = {
  title: 'P10 Racing',
  description: 'P10 da rapaziada. Bora apostar no primeiro a se retirar da corrida e no décimo colocado.',
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
