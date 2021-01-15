import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

export function useWindowConfig() {
  const isBrowser = typeof window === "undefined"

  let [dimensions, setDimensions] = useState<{ h: number; w: number } | null>({
    h: 0,
    w: 0,
  })

  useEffect(() => {
    if (window) {
      let dimensions = { h: window.innerHeight, w: window.innerWidth }

      if (window.innerWidth > 1000) {
        dimensions.w = 1000
      }

      setDimensions(dimensions)
    }
  }, [isBrowser])

  return dimensions
}

export const WindowConfig = createContainer(useWindowConfig)
