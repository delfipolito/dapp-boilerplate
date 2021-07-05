import { useCallback, useEffect, useRef } from 'react'
import { noop } from '@aragon/ui'

export function useInterval( callback, delay ) {
  const savedCallback = useRef(noop)
  const intervalId = useRef()

  const clear = useCallback(() => {
    clearInterval(intervalId.current)
  }, [])

  useEffect(() => {
    savedCallback.current = () => {
      callback(clear)
    }
  }, [callback, clear])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    // Avoid initial delys by running callback at starting edge
    tick()

    intervalId.current = setInterval(tick, delay)

    return () => {
      clear()
    }
  }, [callback, delay, clear])
}
