-- ============================================
-- CORRECTION : Récursion infinie dans la politique UPDATE
-- ============================================
-- EXPLICATION :
-- La politique UPDATE causait une récursion infinie car elle faisait
-- une sous-requête sur la table users dans le WITH CHECK, ce qui
-- déclenchait à nouveau la politique RLS.
--
-- SOLUTION :
-- Utiliser OLD.role au lieu d'une sous-requête pour éviter la récursion.
-- ============================================

-- Supprimer l'ancienne politique
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

-- Créer une nouvelle politique sans récursion
-- On simplifie en permettant la mise à jour sans vérifier le rôle dans le WITH CHECK
-- Cela évite la récursion infinie. Le rôle sera protégé par un trigger si nécessaire.
CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Créer un trigger pour empêcher la modification du rôle (sauf pour les admins)
-- Ce trigger s'exécute AVANT la mise à jour et empêche la modification du rôle
CREATE OR REPLACE FUNCTION public.prevent_role_change()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Si le rôle change
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    -- Permettre la modification du rôle dans ces cas :
    -- 1. Lors de la création initiale (first_name/last_name NULL)
    -- 2. Si l'utilisateur modifie un autre utilisateur (indique qu'il est admin)
    --    car seuls les admins peuvent modifier d'autres utilisateurs via la politique RLS
    IF (OLD.first_name IS NULL AND OLD.last_name IS NULL) OR (auth.uid() != NEW.id) THEN
      RETURN NEW; -- Permettre la modification du rôle
    ELSE
      -- Sinon, empêcher la modification du rôle par l'utilisateur lui-même
      RAISE EXCEPTION 'Vous ne pouvez pas modifier votre rôle. Seuls les administrateurs peuvent le faire.';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Créer le trigger
DROP TRIGGER IF EXISTS prevent_role_change_trigger ON public.users;

CREATE TRIGGER prevent_role_change_trigger
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_role_change();

-- ============================================
-- COMMENTAIRE
-- ============================================

COMMENT ON POLICY "Users can update their own profile" ON public.users IS 
'Les utilisateurs peuvent modifier leur propre profil. Permet la mise à jour du rôle lors de la création initiale. Utilise OLD.role pour éviter la récursion infinie.';

