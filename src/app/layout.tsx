import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Payment Portal',
  description: 'Quickly pay online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        <ToastContainer limit={5} />
      </body>
    </html>
  )
}
