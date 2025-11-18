# 🔧 Guide de Correction - Récursion RLS

## 🐛 Problème identifié

L'erreur `infinite recursion detected in policy for relation "users"` vient des politiques RLS qui font des requêtes sur `users` dans leur condition, créant une boucle infinie.

## ✅ Solution

Une migration SQL a été créée : `supabase/migrations/021_fix_rls_recursion_users.sql`

### Étape 1 : Appliquer la migration dans Supabase

1. **Ouvrez Supabase Dashboard**
   - Allez sur votre projet
   - Cliquez sur **SQL Editor** dans le menu de gauche

2. **Copiez et exécutez la migration**

   Ouvrez le fichier `supabase/migrations/021_fix_rls_recursion_users.sql` et copiez tout son contenu dans l'éditeur SQL de Supabase, puis cliquez sur **Run**.

   Ou exécutez directement ce SQL :

```sql
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

CREATE POLICY "Admins can update all users"
ON public.users
FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Fonction pour vérifier si l'utilisateur est staff
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

-- Mettre à jour les politiques players
DROP POLICY IF EXISTS "Admins can view all players" ON public.players;
DROP POLICY IF EXISTS "Coaches can view players" ON public.players;
DROP POLICY IF EXISTS "Parents can view players" ON public.players;
DROP POLICY IF EXISTS "Clubs can view players" ON public.players;
DROP POLICY IF EXISTS "Admins can update all players" ON public.players;
DROP POLICY IF EXISTS "Coaches can update players" ON public.players;

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

-- Politiques pour orders
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

-- Politiques pour notifications
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

-- Politiques pour form_submissions
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
```

### Étape 2 : Vérifier que ça fonctionne

1. **Rafraîchissez votre page admin** (`/admin`)
2. **Visitez `/admin/test-supabase`** - tous les tests devraient maintenant passer ✓
3. **Vérifiez la console** - il ne devrait plus y avoir d'erreurs de récursion

## 🔍 Explication de la solution

### Le problème

Les politiques RLS comme celle-ci créaient une récursion :

```sql
-- ❌ PROBLÉMATIQUE
CREATE POLICY "Admins can view all users"
ON public.users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users  -- ← Cette requête déclenche RLS à nouveau !
    WHERE id = auth.uid() AND role = 'admin'
  )
);
```

### La solution

Utiliser une fonction `SECURITY DEFINER` qui contourne RLS :

```sql
-- ✅ CORRIGÉ
CREATE FUNCTION public.is_admin()
RETURNS BOOLEAN
SECURITY DEFINER  -- ← Contourne RLS
AS $$
  -- La requête ici ne déclenche pas RLS
  SELECT role = 'admin' FROM public.users WHERE id = auth.uid();
$$;

CREATE POLICY "Admins can view all users"
ON public.users
FOR SELECT
USING (public.is_admin());  -- ← Utilise la fonction, pas de récursion
```

## 📝 Notes importantes

- Les fonctions `is_admin()` et `is_staff()` utilisent `SECURITY DEFINER` pour contourner RLS
- Elles sont marquées `STABLE` pour optimisation
- Les politiques sont maintenant sans récursion

## ✅ Après la correction

Une fois la migration appliquée :
- ✅ Les erreurs de récursion disparaîtront
- ✅ Les données Supabase s'afficheront dans l'admin
- ✅ Les KPIs se mettront à jour automatiquement
- ✅ Les graphiques afficheront les vraies données

Si vous avez encore des problèmes après avoir appliqué la migration, partagez les nouveaux messages d'erreur !

