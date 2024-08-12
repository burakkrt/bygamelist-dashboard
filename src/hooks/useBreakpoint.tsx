import { useState, useEffect } from 'react'
import debounce from '@/functions/debounce'
import { IReturnBreakpoint } from './types'

const breakpoints = {
  es: 360,
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1440,
  xxl: 1604,
}

const getBreakpoint = (breakpoint: IReturnBreakpoint): boolean => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < breakpoints[breakpoint]
  }

  return false
}
const useBreakpoint = (breakpoint: IReturnBreakpoint): boolean => {
  const [isBreakpoint, setIsBreakpoint] = useState<boolean>(false)

  useEffect(() => {
    setIsBreakpoint(getBreakpoint(breakpoint))

    const handleResize = debounce(() => {
      setIsBreakpoint(getBreakpoint(breakpoint))
    }, 200)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isBreakpoint
}

export default useBreakpoint
