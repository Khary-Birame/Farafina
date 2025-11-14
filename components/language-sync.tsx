"use client"

import { useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

/**
 * Composant pour synchroniser l'attribut lang du HTML avec la langue sélectionnée
 * Évite les erreurs d'hydratation en mettant à jour le lang avant le rendu
 */
export function LanguageSync() {
  const { language } = useLanguage()

  useEffect(() => {
    // Mettre à jour l'attribut lang sur l'élément html
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
    }
  }, [language])

  return null
}

