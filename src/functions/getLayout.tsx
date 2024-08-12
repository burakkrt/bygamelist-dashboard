// utils/getLayout.ts
import LoginLayout from '@/components/layouts/login-layout'
import DefaultLayout from '@/components/layouts/default-layout'

const getLayout = (pathname: string) => {
  switch (pathname) {
    case '/login':
      return LoginLayout

    default:
      return DefaultLayout
  }
}

export default getLayout
