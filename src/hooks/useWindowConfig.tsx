import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"

export function useWindowConfig() {
  const isBrowser = typeof window === "undefined"

  let [dimensions, setDimensions] = useState<{ h: number; w: number } | null>({
    h: 0,
    w: 0,
  })

  let [scrollbarWidth, setScrollbarWidth] = useState<number>(0)

  let [resize, setResize] = useState<boolean>(false)
  let [scrollResize, setScrollResize] = useState<boolean>(false)

  function getAdjustedWidth() {
    if (window) {
      if (window.innerWidth > 1000) {
        return 1000 - 8 - 2 * scrollbarWidth
      } else {
        return window.innerWidth - 8 - 2 * scrollbarWidth
      }
    }
  }

  function triggerResize() {
    setResize(true)
  }

  function triggerScrollResize() {
    setScrollResize(true)
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

  useEffect(() => {
    if (window) {
      window.document.addEventListener("resize", triggerScrollResize)
      setScrollbarWidth(window.innerWidth - window.document.body.clientWidth)
      setScrollResize(false)
    }

    return () => {
      window.document.removeEventListener("resize", triggerScrollResize)
    }
  }, [isBrowser, scrollResize])

  return dimensions
}

export const WindowConfig = createContainer(useWindowConfig)
