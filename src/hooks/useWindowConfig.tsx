import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

export function useWindowConfig() {
  const isBrowser = typeof window === "undefined"

  let [dimensions, setDimensions] = useState<{ h: number; w: number } | null>({
    h: 0,
    w: 0,
  })

  let [resize, setResize] = useState<boolean>(false)

  function getAdjustedWidth() {
    if (window) {
      if (window.innerWidth > 1000) {
        return 1000 - 8
      } else {
        return window.innerWidth - 8
      }
    }
  }

  function triggerResize() {
    setResize(true)
  }

  useEffect(() => {
    if (window) {
      window.addEventListener("resize", triggerResize)
      setDimensions({ h: window.innerHeight, w: getAdjustedWidth() })
      setResize(false)
    }

    return () => {
      window.removeEventListener("resize", triggerResize)
    }
  }, [isBrowser, resize])

  return dimensions
}

export const WindowConfig = createContainer(useWindowConfig)
