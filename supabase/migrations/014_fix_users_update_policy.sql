-- ============================================
-- CORRECTION : Politique UPDATE pour users
-- ============================================
-- EXPLICATION :
-- La politique actuelle empêche la mise à jour du rôle même lors
-- de la création initiale. Cette migration corrige cela en permettant
-- la mise à jour du rôle si l'utilisateur vient d'être créé (first_name/last_name NULL).
-- ============================================

-- Supprimer l'ancienne politique
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

-- Créer une nouvelle politique qui permet la mise à jour lors de la création initiale
CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id
  AND (
    -- Permettre la mise à jour du rôle si l'utilisateur vient d'être créé
    -- (first_name et last_name sont NULL = créé par le trigger uniquement)
    (first_name IS NULL AND last_name IS NULL)
    OR
    -- Sinon, empêcher la modification du rôle (seuls les admins peuvent le faire)
    (role = (SELECT role FROM public.users WHERE id = auth.uid()))
  )
);

-- ============================================
-- COMMENTAIRE
-- ============================================

COMMENT ON POLICY "Users can update their own profile" ON public.users IS 
'Les utilisateurs peuvent modifier leur propre profil. Permet la mise à jour du rôle lors de la création initiale.';

