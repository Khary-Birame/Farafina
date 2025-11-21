"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Hook pour révéler un élément au scroll avec animation
 * Inspiré des grands clubs européens (FC Barcelona, Real Madrid, PSG)
 */
export function useRevealOnScroll(options?: {
  threshold?: number
  rootMargin?: string
  delay?: number
}) {
  const [isRevealed, setIsRevealed] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || isRevealed) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsRevealed(true)
            }, options?.delay || 0)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || "0px 0px -50px 0px",
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [isRevealed, options])

  return { ref: elementRef, isRevealed }
}

/**
 * Hook pour révéler plusieurs éléments séquentiellement
 */
export function useRevealSequence(count: number, delay: number = 100) {
  const [revealedCount, setRevealedCount] = useState(0)
  const refs = Array.from({ length: count }, () => useRef<HTMLElement>(null))

  useEffect(() => {
    const observers = refs.map((ref, index) => {
      if (!ref.current) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setRevealedCount((prev) => Math.max(prev, index + 1))
              }, index * delay)
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      )

      observer.observe(ref.current)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [count, delay])

  return { refs, revealedCount }
}

