/**
 * Helpers pour gérer l'accès aux fichiers dans Supabase Storage
 */

import { supabase } from "./client"

const APPLICATION_BUCKET = "applications"

/**
 * Obtenir une URL signée pour un fichier privé
 * @param filePath Chemin du fichier dans le bucket
 * @param expiresIn Durée de validité en secondes (par défaut 1 heure)
 */
export async function getSignedFileUrl(
  filePath: string,
  expiresIn: number = 3600
): Promise<{ url: string | null; error: any }> {
  try {
    // Nettoyer le chemin (enlever les espaces, normaliser les slashes)
    const cleanPath = filePath.trim().replace(/^\/+|\/+$/g, '')
    
    if (!cleanPath) {
      return { url: null, error: { message: "Chemin de fichier vide" } }
    }

    console.log(`[getSignedFileUrl] Tentative de création d'URL signée pour: ${cleanPath}`)
    
    const { data, error } = await supabase.storage
      .from(APPLICATION_BUCKET)
      .createSignedUrl(cleanPath, expiresIn)

    if (error) {
      console.error(`[getSignedFileUrl] Erreur pour le chemin "${cleanPath}":`, error)
      // Si l'objet n'existe pas, essayer de lister les fichiers dans le dossier parent
      if (error.message?.includes("Object not found") || error.message?.includes("not found")) {
        const pathParts = cleanPath.split("/")
        if (pathParts.length > 1) {
          const folderPath = pathParts.slice(0, -1).join("/")
          const fileName = pathParts[pathParts.length - 1]
          console.log(`[getSignedFileUrl] Tentative de liste des fichiers dans: ${folderPath}`)
          
          const { data: listData, error: listError } = await supabase.storage
            .from(APPLICATION_BUCKET)
            .list(folderPath)
          
          if (!listError && listData) {
            console.log(`[getSignedFileUrl] Fichiers trouvés dans ${folderPath}:`, listData.map(f => f.name))
            console.log(`[getSignedFileUrl] Recherche du fichier: ${fileName}`)
          }
        }
      }
      return { url: null, error }
    }

    console.log(`[getSignedFileUrl] URL signée créée avec succès pour: ${cleanPath}`)
    return { url: data.signedUrl, error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la création de l'URL signée:", error)
    return { url: null, error }
  }
}

/**
 * Obtenir une URL publique ou signée pour un fichier
 * Essaie d'abord l'URL publique, puis crée une URL signée si nécessaire
 */
export async function getFileUrl(
  filePath: string,
  useSignedUrl: boolean = true
): Promise<{ url: string | null; error: any }> {
  try {
    if (useSignedUrl) {
      // Utiliser une URL signée pour les buckets privés
      return await getSignedFileUrl(filePath)
    } else {
      // Essayer d'obtenir une URL publique
      const { data } = supabase.storage.from(APPLICATION_BUCKET).getPublicUrl(filePath)
      return { url: data.publicUrl, error: null }
    }
  } catch (error: any) {
    console.error("Erreur lors de la récupération de l'URL du fichier:", error)
    return { url: null, error }
  }
}

/**
 * Vérifier si un fichier existe dans le bucket
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.storage
      .from(APPLICATION_BUCKET)
      .list(filePath.split("/").slice(0, -1).join("/"))

    if (error) {
      return false
    }

    const fileName = filePath.split("/").pop()
    return data?.some((file) => file.name === fileName) || false
  } catch {
    return false
  }
}

