import type { AppProps } from 'next/app'
import '../styles/main.scss'
import { Poppins } from 'next/font/google'
import Footer from '@/components/footer'
import Sidebar from '@/components/sidebar'
import Container from '@/components/base/container'

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${fontPoppins.variable}`}>
      <main>
        <Container size="wide">
          <div className="root-layout">
            <Sidebar />
            <Component {...pageProps} />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
