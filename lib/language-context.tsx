"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { LanguageCode, defaultLanguage, languages } from "@/lib/i18n"

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  currentLanguage: typeof languages[LanguageCode]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = "ffa-language"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(defaultLanguage)
  const [mounted, setMounted] = useState(false)

  // Charger la langue depuis localStorage au montage
  useEffect(() => {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null
    if (storedLanguage && languages[storedLanguage]) {
      setLanguageState(storedLanguage)
    }
    setMounted(true)
  }, [])

  // Fonction pour changer la langue et la persister
  const setLanguage = (lang: LanguageCode) => {
    if (languages[lang]) {
      setLanguageState(lang)
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
      // Mettre à jour l'attribut lang du document HTML
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang
      }
    }
  }

  // Mettre à jour l'attribut lang du document HTML quand la langue change
  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.lang = language
    }
  }, [language, mounted])

  const currentLanguage = languages[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

