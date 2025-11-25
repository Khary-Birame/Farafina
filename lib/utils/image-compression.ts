/**
 * Utilitaires pour compresser les images côté client
 * Optimisé pour mobile avec réduction de taille et qualité
 */

/**
 * Compresse une image avant upload
 * @param file - Le fichier image à compresser
 * @param maxWidth - Largeur maximale (défaut: 1920px)
 * @param maxHeight - Hauteur maximale (défaut: 1920px)
 * @param quality - Qualité JPEG (0.1 à 1.0, défaut: 0.85)
 * @param maxSizeMB - Taille maximale en MB (défaut: 2MB)
 * @returns Promise<File> - Le fichier compressé
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1920,
  quality: number = 0.85,
  maxSizeMB: number = 2
): Promise<File> {
  return new Promise((resolve, reject) => {
    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      resolve(file) // Retourner le fichier tel quel si ce n'est pas une image
      return
    }

    // Si le fichier est déjà assez petit, ne pas compresser
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size <= maxSizeBytes) {
      resolve(file)
      return
    }

    const reader = new FileReader()
    
    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        // Calculer les nouvelles dimensions en gardant le ratio
        let width = img.width
        let height = img.height
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = width * ratio
          height = height * ratio
        }

        // Créer un canvas pour redimensionner et compresser
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Impossible de créer le contexte canvas'))
          return
        }

        // Dessiner l'image redimensionnée
        ctx.drawImage(img, 0, 0, width, height)

        // Convertir en blob avec compression
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Erreur lors de la compression'))
              return
            }

            // Créer un nouveau fichier avec le blob compressé
            const compressedFile = new File(
              [blob],
              file.name,
              {
                type: file.type === 'image/png' ? 'image/jpeg' : file.type, // Convertir PNG en JPEG pour meilleure compression
                lastModified: Date.now(),
              }
            )

            console.log(`[compressImage] Compression: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`)
            
            resolve(compressedFile)
          },
          file.type === 'image/png' ? 'image/jpeg' : file.type, // Convertir PNG en JPEG
          quality
        )
      }

      img.onerror = () => {
        reject(new Error('Erreur lors du chargement de l\'image'))
      }

      if (e.target?.result) {
        img.src = e.target.result as string
      }
    }

    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'))
    }

    reader.readAsDataURL(file)
  })
}

/**
 * Compresse une photo de profil (plus agressive)
 * @param file - Le fichier image
 * @returns Promise<File> - Le fichier compressé
 */
export async function compressPhoto(file: File): Promise<File> {
  return compressImage(file, 1200, 1200, 0.8, 1) // 1MB max, qualité 0.8
}

/**
 * Compresse un document image (moins agressif pour garder la lisibilité)
 * @param file - Le fichier image
 * @returns Promise<File> - Le fichier compressé
 */
export async function compressDocumentImage(file: File): Promise<File> {
  return compressImage(file, 1920, 1920, 0.85, 2) // 2MB max, qualité 0.85
}

