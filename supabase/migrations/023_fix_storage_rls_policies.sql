-- ============================================
-- CORRECTION : Politiques RLS Storage pour les applications
-- ============================================
-- EXPLICATION :
-- Les politiques RLS du storage utilisent des requêtes directes sur public.users
-- qui peuvent causer des problèmes. On utilise maintenant la fonction is_admin()
-- qui contourne RLS de manière sécurisée.
-- ============================================

-- Créer la fonction is_admin() si elle n'existe pas déjà
-- Cette fonction vérifie si l'utilisateur actuel a le rôle 'admin'
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Récupérer le rôle depuis la table users en contournant RLS (SECURITY DEFINER)
  SELECT role INTO user_role
  FROM public.users
  WHERE id = auth.uid();
  
  RETURN COALESCE(user_role = 'admin', false);
END;
$$;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Authenticated users can read application files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete application files" ON storage.objects;

-- Recréer la politique de lecture avec is_admin()
CREATE POLICY "Authenticated users can read application files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'applications' AND
  (
    -- Les admins peuvent tout lire (utilise la fonction is_admin() qui contourne RLS)
    public.is_admin()
    OR
    -- Les utilisateurs peuvent lire les fichiers de leurs propres candidatures
    EXISTS (
      SELECT 1 FROM public.form_submissions
      WHERE form_submissions.user_id = auth.uid()
      AND form_submissions.form_type = 'application'
      AND (storage.foldername(name))[1] = form_submissions.id::text
    )
  )
);

-- Recréer la politique de suppression avec is_admin()
CREATE POLICY "Admins can delete application files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'applications' AND
  public.is_admin()
);

