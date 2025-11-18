-- ============================================
-- CORRECTION : Récursion infinie dans les politiques RLS users
-- ============================================
-- EXPLICATION :
-- Les politiques "Admins can view all users" et "Admins can update all users"
-- font une requête SELECT sur public.users dans leur condition USING,
-- ce qui déclenche à nouveau la politique RLS et crée une récursion infinie.
--
-- SOLUTION :
-- Utiliser une fonction SECURITY DEFINER qui contourne RLS pour vérifier le rôle,
-- ou utiliser auth.jwt() pour extraire le rôle depuis le token JWT.
-- ============================================

-- Supprimer les politiques problématiques
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;

-- Créer une fonction pour vérifier si l'utilisateur est admin (contourne RLS)
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
  
  RETURN user_role = 'admin';
END;
$$;

-- Recréer la politique pour les admins (sans récursion)
CREATE POLICY "Admins can view all users"
ON public.users
FOR SELECT
USING (public.is_admin());

-- Recréer la politique UPDATE pour les admins (sans récursion)
CREATE POLICY "Admins can update all users"
ON public.users
FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================
-- CORRECTION SIMILAIRE POUR LES AUTRES TABLES
-- ============================================

-- Fonction pour vérifier si l'utilisateur est admin, coach, ou parent
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM public.users
  WHERE id = auth.uid();
  
  RETURN user_role IN ('admin', 'coach', 'parent', 'club');
END;
$$;

-- Mettre à jour les politiques players pour utiliser la fonction
DROP POLICY IF EXISTS "Admins can view all players" ON public.players;
DROP POLICY IF EXISTS "Coaches can view players" ON public.players;
DROP POLICY IF EXISTS "Parents can view players" ON public.players;
DROP POLICY IF EXISTS "Clubs can view players" ON public.players;
DROP POLICY IF EXISTS "Admins can update all players" ON public.players;
DROP POLICY IF EXISTS "Coaches can update players" ON public.players;

-- Recréer les politiques players sans récursion
CREATE POLICY "Admins can view all players"
ON public.players
FOR SELECT
USING (public.is_admin());

CREATE POLICY "Coaches can view players"
ON public.players
FOR SELECT
USING (public.is_staff());

CREATE POLICY "Parents can view players"
ON public.players
FOR SELECT
USING (public.is_staff());

CREATE POLICY "Clubs can view players"
ON public.players
FOR SELECT
USING (public.is_staff());

CREATE POLICY "Admins can update all players"
ON public.players
FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Coaches can update players"
ON public.players
FOR UPDATE
USING (public.is_staff())
WITH CHECK (public.is_staff());

-- ============================================
-- POLITIQUES POUR ORDERS, NOTIFICATIONS, FORM_SUBMISSIONS
-- ============================================

-- Orders : Permettre la lecture pour les admins et les utilisateurs de leurs propres commandes
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;

CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (public.is_admin());

-- Notifications : Permettre la lecture pour les utilisateurs de leurs propres notifications
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Admins can view all notifications" ON public.notifications;

CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all notifications"
ON public.notifications
FOR SELECT
USING (public.is_admin());

-- Form submissions : Permettre la lecture pour les admins
DROP POLICY IF EXISTS "Users can view their own submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Admins can view all submissions" ON public.form_submissions;

CREATE POLICY "Users can view their own submissions"
ON public.form_submissions
FOR SELECT
USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Admins can view all submissions"
ON public.form_submissions
FOR SELECT
USING (public.is_admin());

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON FUNCTION public.is_admin() IS 
'Vérifie si l''utilisateur connecté est admin. Utilise SECURITY DEFINER pour contourner RLS et éviter la récursion.';

COMMENT ON FUNCTION public.is_staff() IS 
'Vérifie si l''utilisateur connecté est admin, coach, parent ou club. Utilise SECURITY DEFINER pour contourner RLS.';

COMMENT ON POLICY "Admins can view all users" ON public.users IS 
'Les administrateurs peuvent voir tous les profils utilisateurs. Utilise is_admin() pour éviter la récursion.';

