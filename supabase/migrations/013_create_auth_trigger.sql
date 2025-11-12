-- ============================================
-- TRIGGER : Synchroniser auth.users et public.users
-- ============================================
-- EXPLICATION :
-- Quand un utilisateur est créé dans auth.users (via Supabase Auth),
-- ce trigger crée automatiquement un enregistrement correspondant
-- dans la table public.users.
--
-- POURQUOI ?
-- - Supabase Auth crée l'utilisateur dans auth.users
-- - Mais nous avons besoin d'un enregistrement dans public.users
--   pour stocker les informations supplémentaires (role, first_name, etc.)
-- - Ce trigger garantit que les deux sont synchronisés
-- ============================================

-- Fonction qui sera appelée par le trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Créer un enregistrement dans public.users avec l'ID de auth.users
  INSERT INTO public.users (
    id,
    email,
    email_verified
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.email_confirmed_at IS NOT NULL, false)
  )
  ON CONFLICT (id) DO NOTHING; -- Si l'utilisateur existe déjà, ne rien faire
  
  RETURN NEW;
END;
$$;

-- Trigger qui s'exécute après l'insertion dans auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- COMMENTAIRE
-- ============================================

COMMENT ON FUNCTION public.handle_new_user() IS 
'Crée automatiquement un enregistrement dans public.users quand un utilisateur est créé dans auth.users';

