import type { AppProps } from 'next/app'
import '../styles/main.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import 'moment/locale/tr'
import { Poppins } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import getLayout from '@/functions/getLayout'

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  moment.locale('tr')
  const router = useRouter()
  const Layout = getLayout(router.pathname)

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${fontPoppins.variable}`}>
        <main>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer autoClose={3000} theme="dark" />
        </main>
      </div>
    </QueryClientProvider>
  )
}
