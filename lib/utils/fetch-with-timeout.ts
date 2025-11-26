/**
 * Utilitaire pour faire des appels fetch avec timeout
 * Particulièrement utile pour les connexions mobiles lentes
 */

interface FetchWithTimeoutOptions extends RequestInit {
  timeout?: number // Timeout en millisecondes (défaut: 30 secondes)
}

/**
 * Effectue un appel fetch avec un timeout configurable
 * @param url URL à appeler
 * @param options Options de fetch (incluant timeout)
 * @returns Promise avec la réponse
 */
export async function fetchWithTimeout(
  url: string,
  options: FetchWithTimeoutOptions = {}
): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options // 30 secondes par défaut

  // Créer un AbortController pour annuler la requête en cas de timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error: any) {
    clearTimeout(timeoutId)
    
    // Si c'est une erreur d'abort (timeout), lancer une erreur spécifique
    if (error.name === 'AbortError') {
      throw new Error(`La requête a pris trop de temps (timeout après ${timeout / 1000}s). Vérifiez votre connexion internet et réessayez.`)
    }
    
    // Sinon, propager l'erreur originale
    throw error
  }
}

