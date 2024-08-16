import { useMutation } from '@tanstack/react-query'
import fetcher from '@/utils/services/fetcher'
import Cookies from 'js-cookie'
import { IPostUserLogin } from '@/utils/types'

function useUserLogin() {
  return useMutation({
    mutationFn: (value: any) =>
      fetcher({
        endpoint: 'v1/user/login',
        method: 'POST',
        body: value,
      }),
    onSuccess: (data: IPostUserLogin) => {
      if (data.data.length > 0) {
        const [res] = data.data

        Cookies.set('userToken', res.token, {
          maxAge: process.env.NEXT_PUBLIC_COKIE_VALIDITY_PERIOD || 3600,
        })
        Cookies.set(
          'userInfo',
          JSON.stringify({
            id: res.user.id,
            name: res.user.name,
            surname: res.user.surname,
            email: res.user.email,
            token: res.token,
          }),
          { maxAge: process.env.NEXT_PUBLIC_COKIE_VALIDITY_PERIOD || 3600 }
        )
      }
    },
  })
}

export default useUserLogin
