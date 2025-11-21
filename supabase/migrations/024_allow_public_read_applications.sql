-- ============================================
-- PERMETTRE L'ACCÈS PUBLIC EN LECTURE AUX FICHIERS DES CANDIDATURES
-- ============================================
-- EXPLICATION :
-- Cette migration permet l'accès en lecture aux fichiers du bucket 'applications'
-- même sans authentification, pour permettre la visualisation dans la console admin
-- sans nécessiter de connexion.
-- ============================================

-- Supprimer l'ancienne politique qui nécessitait l'authentification
DROP POLICY IF EXISTS "Authenticated users can read application files" ON storage.objects;

-- Créer une nouvelle politique qui permet l'accès en lecture à tous (public)
CREATE POLICY "Public can read application files"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'applications'
);

-- Note: La politique pour les admins reste en place pour la suppression
-- La politique "Admins can delete application files" reste active

