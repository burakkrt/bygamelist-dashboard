import type { AppProps } from 'next/app'
import '../styles/main.scss'
import { Poppins } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { useRouter } from 'next/router'
import getLayout from '@/functions/getLayout'

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [queryClient] = useState(() => new QueryClient())

  const Layout = getLayout(router.pathname)

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${fontPoppins.variable}`}>
        <main>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </div>
    </QueryClientProvider>
  )
}
