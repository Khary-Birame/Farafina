/**
 * Types TypeScript pour Supabase
 * 
 * EXPLICATION :
 * Ce fichier contiendra les types générés automatiquement
 * par Supabase basés sur votre schéma de base de données.
 * 
 * POURQUOI C'EST IMPORTANT :
 * - Autocomplétion dans votre éditeur
 * - Détection d'erreurs avant l'exécution
 * - Documentation automatique de votre schéma
 * 
 * COMMENT GÉNÉRER LES TYPES :
 * Plus tard, on utilisera la CLI Supabase pour générer ces types
 * automatiquement à partir de votre base de données.
 * 
 * Commande : npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
 */

// Pour l'instant, on définit un type de base
// On le remplira avec les vrais types plus tard

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  // On ajoutera les types de tables ici plus tard
  // Exemple :
  // public: {
  //   Tables: {
  //     players: {
  //       Row: {
  //         id: string
  //         name: string
  //         // ...
  //       }
  //       Insert: { ... }
  //       Update: { ... }
  //     }
  //   }
  // }
}

