import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

export const useScrollReveal = <T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  rootMargin = '0px 0px -10% 0px',
): boolean => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = targetRef.current
    if (!target) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef, rootMargin])

  return visible
}
