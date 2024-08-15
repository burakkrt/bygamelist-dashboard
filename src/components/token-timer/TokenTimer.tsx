import { useCallback, useEffect, useState } from 'react'
import useUserStore from '@/store/useStore'
import moment from 'moment'
import getTokenExpirationDate from '@/functions/getTokenExpirationDate'
import Anchor from '@/components/base/anchor'
import { ITokenTimerProps } from './types'

function TokenTimer({}: ITokenTimerProps) {
  const { token } = useUserStore()
  const [tokenTimer, setTokenTimer] = useState<string | null>('')

  const getRemainingTimeToken = useCallback(() => {
    const expirationDate = getTokenExpirationDate(token)
    if (!expirationDate) return null

    const now = moment()
    const expirationMoment = moment(expirationDate)

    const duration = moment.duration(expirationMoment.diff(now))

    const hours = Math.floor(duration.asHours())
    const minutes = Math.floor(duration.minutes())

    if (hours > 0) {
      return `${hours}sa ${minutes}dk`
    }

    if (hours <= 0 && minutes <= 0) {
      return null
    }

    return `${minutes}dk`
  }, [token])

  useEffect(() => {
    const timer = setInterval(() => {
      if (tokenTimer !== getRemainingTimeToken()) {
        setTokenTimer(getRemainingTimeToken())
      }
    }, 1000)

    if (tokenTimer === null) {
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [getRemainingTimeToken, tokenTimer])

  if (tokenTimer === '') {
    return null
  }

  if (tokenTimer === null) {
    return (
      <div className="token-timer token-left">
        <span>Token süresi bitti.</span>
        <span>Hiçbir işlem yapamazsın !</span>
        <Anchor href="/">Tekrar giriş yap</Anchor>
      </div>
    )
  }

  return (
    <div className="token-timer">
      <span>Token süresi</span>
      <span>{tokenTimer}</span>
    </div>
  )
}

export default TokenTimer
