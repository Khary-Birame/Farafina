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

    console.log(`[getSignedFileUrl] 🔄 Tentative de création d'URL signée pour: ${cleanPath}`)
    
    // Vérifier si on est authentifié
    const { data: { user } } = await supabase.auth.getUser()
    
    // Si l'utilisateur n'est pas authentifié, utiliser l'URL publique
    if (!user) {
      console.log(`[getSignedFileUrl] ⚠️ Utilisateur non authentifié, utilisation de l'URL publique`)
      const { data: publicData } = supabase.storage.from(APPLICATION_BUCKET).getPublicUrl(cleanPath)
      return { url: publicData.publicUrl, error: null }
    }
    
    // Si authentifié, essayer de créer une URL signée
    const { data, error } = await supabase.storage
      .from(APPLICATION_BUCKET)
      .createSignedUrl(cleanPath, expiresIn)

    if (error) {
      console.error(`[getSignedFileUrl] ❌ Erreur pour le chemin "${cleanPath}":`, error)
      console.error(`[getSignedFileUrl] Détails de l'erreur:`, {
        message: error.message,
        statusCode: error.statusCode,
        error: error.error,
      })
      
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
          } else {
            console.error(`[getSignedFileUrl] Erreur lors de la liste:`, listError)
          }
        }
      }
      
      // En cas d'erreur, essayer avec l'URL publique en fallback
      console.warn(`[getSignedFileUrl] ⚠️ Erreur lors de la création de l'URL signée, tentative avec URL publique`)
      const { data: publicData } = supabase.storage.from(APPLICATION_BUCKET).getPublicUrl(cleanPath)
      console.log(`[getSignedFileUrl] URL publique générée:`, publicData.publicUrl)
      return { url: publicData.publicUrl, error: null }
      
      return { url: null, error }
    }

    console.log(`[getSignedFileUrl] ✅ URL signée créée avec succès pour: ${cleanPath}`)
    console.log(`[getSignedFileUrl] URL:`, data.signedUrl.substring(0, 100) + "...")
    return { url: data.signedUrl, error: null }
  } catch (error: any) {
    console.error("[getSignedFileUrl] Erreur inattendue lors de la création de l'URL signée:", error)
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

/**
 * Lister tous les fichiers dans un dossier du bucket
 */
export async function listFilesInFolder(folderPath: string): Promise<{ files: any[]; error: any }> {
  try {
    const { data, error } = await supabase.storage
      .from(APPLICATION_BUCKET)
      .list(folderPath)

    if (error) {
      console.error(`[listFilesInFolder] Erreur lors de la liste des fichiers dans ${folderPath}:`, error)
      return { files: [], error }
    }

    return { files: data || [], error: null }
  } catch (error: any) {
    console.error(`[listFilesInFolder] Erreur inattendue:`, error)
    return { files: [], error }
  }
}

/**
 * Obtenir toutes les informations sur un fichier (existence, URL publique, URL signée)
 */
export async function getFileInfo(filePath: string): Promise<{
  exists: boolean
  publicUrl: string | null
  signedUrl: string | null
  error: any
  actualFiles?: string[]
}> {
  try {
    // Vérifier d'abord si le fichier existe en listant le dossier parent
    const folderPath = filePath.split("/").slice(0, -1).join("/")
    const fileName = filePath.split("/").pop()
    
    console.log(`[getFileInfo] Vérification de l'existence du fichier:`, {
      filePath,
      folderPath,
      fileName,
    })
    
    const { files, error: listError } = await listFilesInFolder(folderPath)
    
    let actualFiles: string[] = []
    let exists = false
    
    if (listError) {
      console.warn(`[getFileInfo] ⚠️ Erreur lors de la liste des fichiers dans ${folderPath}:`, listError)
      console.warn(`[getFileInfo] ⚠️ Cela peut être dû à des permissions RLS. On va essayer quand même de créer l'URL signée.`)
      // Si la liste échoue, on considère que le fichier pourrait exister quand même
      // On va essayer de créer l'URL signée directement
    } else {
      actualFiles = files.map(f => f.name)
      exists = actualFiles.some((f) => f === fileName)
      console.log(`[getFileInfo] Fichiers trouvés dans ${folderPath}:`, actualFiles)
      console.log(`[getFileInfo] Le fichier ${fileName} existe:`, exists)
    }

    // Obtenir l'URL publique
    const { data: publicData } = supabase.storage.from(APPLICATION_BUCKET).getPublicUrl(filePath)
    const publicUrl = publicData.publicUrl

    // Essayer de créer une URL signée même si la liste a échoué
    // (car la liste peut échouer à cause de RLS mais l'URL signée peut fonctionner)
    const { url: signedUrl, error: signedError } = await getSignedFileUrl(filePath, 3600)
    
    // Si on a réussi à créer une URL signée, le fichier existe probablement
    if (!signedError && signedUrl) {
      console.log(`[getFileInfo] ✅ URL signée créée avec succès, le fichier existe probablement`)
      return {
        exists: true,
        publicUrl,
        signedUrl,
        error: null,
        actualFiles,
      }
    }

    // Si la liste a fonctionné et le fichier n'existe pas
    if (!listError && !exists) {
      return {
        exists: false,
        publicUrl,
        signedUrl: null,
        error: { message: `Fichier non trouvé: ${fileName}. Fichiers disponibles: ${actualFiles.join(", ")}` },
        actualFiles,
      }
    }

    // Si la liste a échoué mais l'URL signée aussi, on ne peut pas être sûr
    return {
      exists: false,
      publicUrl,
      signedUrl: null,
      error: signedError || listError || { message: "Impossible de vérifier l'existence du fichier" },
      actualFiles,
    }
  } catch (error: any) {
    console.error(`[getFileInfo] Erreur:`, error)
    return {
      exists: false,
      publicUrl: null,
      signedUrl: null,
      error,
    }
  }
}


