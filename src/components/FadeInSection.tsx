import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface FadeInSectionProps {
  children: ReactNode
  className?: string
  delayMs?: number
}

export const FadeInSection = ({ children, className = '', delayMs = 0 }: FadeInSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isVisible = useScrollReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      className={`${className} reveal-transition ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </section>
  )
}
