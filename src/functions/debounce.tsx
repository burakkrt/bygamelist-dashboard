type DebounceFunction<T extends () => any> = (...args: Parameters<T>) => void // eslint-disable-line

const debounce = <T extends (...args: any[]) => void>( // eslint-disable-line
  func: T,
  wait: number
): DebounceFunction<T> => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export default debounce
