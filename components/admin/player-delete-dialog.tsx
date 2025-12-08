"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deletePlayer } from "@/lib/supabase/players-helpers"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface PlayerDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  playerId: string | null
  playerName: string
  onSuccess?: () => void
}

export function PlayerDeleteDialog({
  open,
  onOpenChange,
  playerId,
  playerName,
  onSuccess,
}: PlayerDeleteDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!playerId) return

    setLoading(true)

    try {
      const { error } = await deletePlayer(playerId)

      if (error) {
        console.error("Erreur suppression:", error)
        toast.error(`Erreur: ${error.message || "Impossible de supprimer le joueur"}`)
        return
      }

      toast.success("Joueur supprimé avec succès")
      onOpenChange(false)
      onSuccess?.()
    } catch (error: any) {
      console.error("Erreur inattendue:", error)
      toast.error(`Erreur: ${error.message || "Une erreur inattendue s'est produite"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer le joueur <strong>{playerName}</strong> ?
            Cette action est irréversible et supprimera toutes les données associées au joueur.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Suppression...
              </>
            ) : (
              "Supprimer"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

