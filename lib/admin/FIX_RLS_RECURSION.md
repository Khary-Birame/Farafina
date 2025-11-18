# 🔧 Correction de l'Erreur "Infinite Recursion" RLS

## 🐛 Problème

L'erreur `infinite recursion detected in policy for relation "users"` indique qu'une politique RLS crée une boucle infinie.

## 🔍 Cause

Cela se produit généralement quand :
1. Une politique sur `users` fait référence à `users` elle-même
2. Une politique sur `players` fait référence à `users`, et `users` fait référence à `players`
3. Des politiques utilisent des fonctions qui créent des références circulaires

## ✅ Solution

### Étape 1 : Supprimer les politiques problématiques

Exécutez ce SQL dans Supabase SQL Editor pour supprimer toutes les politiques existantes :

```sql
-- Supprimer toutes les politiques RLS existantes
DROP POLICY IF EXISTS "Allow read players" ON public.players;
DROP POLICY IF EXISTS "Allow read orders" ON public.orders;
DROP POLICY IF EXISTS "Allow read notifications" ON public.notifications;
DROP POLICY IF EXISTS "Allow read form_submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Allow read users" ON public.users;

-- Supprimer toutes les autres politiques qui pourraient causer des problèmes
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname, tablename 
              FROM pg_policies 
              WHERE schemaname = 'public' 
              AND tablename IN ('users', 'players', 'orders', 'notifications', 'form_submissions')) 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
    END LOOP;
END $$;
```

### Étape 2 : Créer des politiques simples (sans récursion)

```sql
-- Politique pour players (lecture seule, sans référence à users)
CREATE POLICY "admin_read_players" ON public.players
  FOR SELECT
  USING (true);

-- Politique pour orders (lecture seule)
CREATE POLICY "admin_read_orders" ON public.orders
  FOR SELECT
  USING (true);

-- Politique pour notifications (lecture seule)
CREATE POLICY "admin_read_notifications" ON public.notifications
  FOR SELECT
  USING (true);

-- Politique pour form_submissions (lecture seule)
CREATE POLICY "admin_read_form_submissions" ON public.form_submissions
  FOR SELECT
  USING (true);

-- Politique pour users (lecture seule, SANS référence à users elle-même)
CREATE POLICY "admin_read_users" ON public.users
  FOR SELECT
  USING (true);
```

### Étape 3 : Vérifier que RLS est activé

```sql
-- Vérifier que RLS est activé sur les tables
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
```

### Étape 4 : Tester

1. Visitez `/admin/test-supabase`
2. Tous les tests devraient maintenant passer ✓

## 🔒 Politiques plus sécurisées (pour plus tard)

Une fois que tout fonctionne, vous pouvez remplacer les politiques permissives par des politiques plus restrictives :

```sql
-- Exemple : Seuls les admins peuvent lire
CREATE POLICY "admin_only_read_users" ON public.users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );
```

⚠️ **ATTENTION** : Cette politique peut créer une récursion si elle fait référence à `users` dans la condition. Pour l'instant, utilisez les politiques simples ci-dessus.

## 📝 Notes

- Les politiques `USING (true)` permettent la lecture à tous (temporaire pour le développement)
- En production, remplacez par des politiques basées sur `auth.uid()` et les rôles
- Évitez les références circulaires entre tables dans les politiques RLS

