import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import fetcher from '@/utils/services/fetcher'
import { IGetServers, IServer } from '@/utils/types'
import { IPageMetin2Props } from './types'

function PageMetin2({}: IPageMetin2Props) {
  const [servers, setServers] = useState<Array<IServer>>([])

  const mutation = useMutation({
    mutationFn: () =>
      fetcher({
        endpoint: 'v1/server',
      }),
    onSuccess: (data: IGetServers) => {
      setServers(data.data)
    },
  })

  useEffect(() => {
    mutation.mutate()
  }, [])

  return (
    <div>
      <h3>Metin2</h3>
    </div>
  )
}

export default PageMetin2
