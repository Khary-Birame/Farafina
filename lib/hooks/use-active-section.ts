"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Hook pour détecter la section active dans le viewport
 * 
 * Ce hook surveille le scroll et détermine quelle section est actuellement
 * visible dans le viewport pour mettre à jour l'état actif du menu.
 */
export function useActiveSection() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string>(pathname)

  useEffect(() => {
    // Mettre à jour immédiatement avec le pathname
    setActiveSection(pathname)

    // Si on n'est pas sur la page d'accueil, utiliser le pathname
    if (pathname !== "/") {
      return
    }

    // Sur la page d'accueil, détecter la section visible
    const sections = [
      { id: "hero", selector: '[data-section="hero"]' },
      { id: "mission", selector: '[data-section="mission"]' },
      { id: "infrastructures", selector: '[data-section="infrastructures"]' },
      { id: "leadership", selector: '[data-section="leadership"]' },
      { id: "inclusion", selector: '[data-section="inclusion"]' },
    ]

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Section considérée active quand elle occupe au moins 20% du viewport
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    }

    const sectionElements: Map<string, IntersectionObserverEntry> = new Map()

    const updateActiveSection = () => {
      // Si on est en haut de la page, la section hero est active
      if (window.scrollY < 200) {
        setActiveSection("/")
        return
      }

      // Trouver la section la plus visible
      let maxRatio = 0
      let activeId = ""

      sectionElements.forEach((entry, sectionId) => {
        // Utiliser le ratio d'intersection de l'IntersectionObserver
        // qui est plus précis que notre calcul manuel
        const ratio = entry.intersectionRatio

        if (ratio > maxRatio) {
          maxRatio = ratio
          activeId = sectionId
        }
      })

      // Si une section est suffisamment visible, la page d'accueil est active
      if (activeId && maxRatio > 0.2) {
        setActiveSection("/")
      }
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute("data-section")
        if (sectionId) {
          if (entry.isIntersecting) {
            sectionElements.set(sectionId, entry)
          } else {
            sectionElements.delete(sectionId)
          }
        }
      })

      updateActiveSection()
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observer toutes les sections
    sections.forEach(({ selector }) => {
      const element = document.querySelector(selector)
      if (element) {
        observer.observe(element)
      }
    })

    // Gérer le scroll pour mettre à jour la section active
    const handleScroll = () => {
      updateActiveSection()
    }

    // Utiliser requestAnimationFrame pour optimiser les performances
    let ticking = false
    const optimizedScrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", optimizedScrollHandler, { passive: true })
    handleScroll() // Vérifier immédiatement

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", optimizedScrollHandler)
    }
  }, [pathname])

  return activeSection
}

