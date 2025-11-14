-- ============================================
-- POLITIQUES RLS POUR LA TABLE users
-- ============================================
-- EXPLICATION :
-- Ces politiques définissent qui peut lire/modifier les profils utilisateurs.
-- ============================================

-- ============================================
-- POLITIQUE 1 : Les utilisateurs peuvent voir leur propre profil
-- ============================================
-- EXPLICATION :
-- - auth.uid() = ID de l'utilisateur connecté
-- - Si l'ID de la ligne = ID de l'utilisateur connecté → Autorisé
-- - Sinon → Refusé
-- ============================================

CREATE POLICY "Users can view their own profile"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- ============================================
-- POLITIQUE 2 : Les utilisateurs peuvent modifier leur propre profil
-- ============================================
-- EXPLICATION :
-- - Un utilisateur peut modifier uniquement sa propre ligne
-- - Il ne peut pas modifier son rôle (réservé aux admins)
-- ============================================

CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id
  -- Empêcher la modification du rôle (seuls les admins peuvent le faire)
  AND (role = (SELECT role FROM public.users WHERE id = auth.uid()))
);

-- ============================================
-- POLITIQUE 3 : Les admins peuvent tout voir
-- ============================================
-- EXPLICATION :
-- - Les utilisateurs avec role = 'admin' peuvent voir tous les profils
-- - Utile pour la gestion administrative
-- ============================================

CREATE POLICY "Admins can view all users"
ON public.users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================================
-- POLITIQUE 4 : Les admins peuvent modifier tous les profils
-- ============================================

CREATE POLICY "Admins can update all users"
ON public.users
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================================
-- POLITIQUE 5 : Permettre la création de nouveaux utilisateurs
-- ============================================
-- EXPLICATION :
-- - Cette politique permet à Supabase Auth de créer des utilisateurs
-- - En production, on pourrait restreindre cela
-- ============================================

CREATE POLICY "Allow user creation"
ON public.users
FOR INSERT
WITH CHECK (true);

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON POLICY "Users can view their own profile" ON public.users IS 
'Les utilisateurs peuvent voir uniquement leur propre profil';

COMMENT ON POLICY "Admins can view all users" ON public.users IS 
'Les administrateurs peuvent voir tous les profils utilisateurs';



