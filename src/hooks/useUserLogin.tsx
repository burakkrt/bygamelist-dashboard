import { useMutation } from '@tanstack/react-query'
import fetcher from '@/services/fetcher'
import { IPostUserLogin } from '@/services/types'

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
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: res.user.id,
            name: res.user.name,
            surname: res.user.surname,
            email: res.user.email,
            token: res.token,
          })
        )
      }
    },
    onError: (error) => {
      console.error('Login failed', error)
    },
  })
}

export default useUserLogin
