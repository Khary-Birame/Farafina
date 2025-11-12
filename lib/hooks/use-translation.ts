/**
 * Hook pour utiliser les traductions dans les composants
 * 
 * Ce hook charge dynamiquement les traductions depuis les fichiers JSON
 * et se met automatiquement à jour quand la langue change
 */

import { useLanguage } from "@/lib/language-context"
import { useMemo, useState, useEffect } from "react"
import type { LanguageCode } from "@/lib/i18n"

/**
 * Hook pour obtenir les traductions
 * 
 * @example
 * const { t, loading } = useTranslation()
 * if (loading) return <div>Chargement...</div>
 * <h1>{t("common.welcome")}</h1>
 * <p>{t("navigation.programs")}</p>
 */
export function useTranslation() {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(true)

  // Charger les messages de traduction dynamiquement
  useEffect(() => {
    setLoading(true)
    import(`@/messages/${language}.json`)
      .then((mod) => {
        setMessages(mod.default)
        setLoading(false)
      })
      .catch((err) => {
        console.error(`Failed to load messages for locale ${language}:`, err)
        // Fallback vers français
        import(`@/messages/fr.json`)
          .then((mod) => {
            setMessages(mod.default)
            setLoading(false)
          })
          .catch((fallbackErr) => {
            console.error("Failed to load fallback messages:", fallbackErr)
            setMessages({})
            setLoading(false)
          })
      })
  }, [language])

  /**
   * Fonction de traduction
   * @param key - Clé de traduction (ex: "common.welcome")
   * @param fallback - Texte de secours si la traduction n'existe pas
   * @returns Texte traduit
   */
  const t = useMemo(() => {
    return (key: string, fallback?: string): string => {
      if (!messages) {
        return fallback || key
      }

      // Naviguer dans l'objet de traduction avec la clé (ex: "common.welcome")
      const keys = key.split(".")
      let value: any = messages

      for (const k of keys) {
        value = value?.[k]
        if (value === undefined) {
          break
        }
      }

      // Si la traduction existe, la retourner
      if (value !== undefined && typeof value === "string") {
        return value
      }

      // Sinon, utiliser le fallback ou la clé
      return fallback || key
    }
  }, [messages, language]) // Re-créer la fonction quand les messages ou la langue changent

  return { t, language, loading }
}

/**
 * Type pour les clés de traduction (pour l'autocomplétion)
 */
export type TranslationKey =
  | "common.welcome"
  | "common.home"
  | "common.about"
  | "common.contact"
  | "common.login"
  | "common.signup"
  | "common.search"
  | "common.cancel"
  | "common.save"
  | "common.delete"
  | "common.edit"
  | "common.submit"
  | "navigation.programs"
  | "navigation.admissions"
  | "navigation.dashboard"
  | "navigation.ffaTV"
  | "navigation.clubConnect"
  | "navigation.scouting"

