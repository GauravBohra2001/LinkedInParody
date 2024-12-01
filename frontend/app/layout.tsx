import { Inter, Roboto_Slab } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const robotoSlab = Roboto_Slab({ subsets: ['latin'], variable: '--font-roboto-slab' })

export const metadata = {
  title: 'LinkedOut - Where Professionalism Meets Parody',
  description: 'Mocking LinkedIn one cringe post at a time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoSlab.variable} font-sans`}>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

