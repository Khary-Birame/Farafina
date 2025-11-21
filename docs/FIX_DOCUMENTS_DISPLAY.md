# Correction : Affichage des Documents dans la Console Admin

## Problème
Les documents (photo, acte de naissance, certificat médical, vidéo) ne s'affichent pas dans la console admin malgré leur existence dans Supabase Storage.

## Cause
Les politiques RLS (Row Level Security) du storage utilisent des requêtes directes sur `public.users` qui peuvent ne pas fonctionner correctement. La solution est d'utiliser la fonction `is_admin()` qui existe déjà et qui contourne RLS de manière sécurisée.

## Solution

### Étape 1 : Appliquer la Migration SQL

1. **Ouvrez Supabase Dashboard**
   - Allez sur votre projet
   - Cliquez sur **SQL Editor** dans le menu de gauche

2. **Exécutez la migration de correction**
   
   Ouvrez le fichier `supabase/migrations/023_fix_storage_rls_policies.sql` et copiez tout son contenu dans l'éditeur SQL de Supabase, puis cliquez sur **Run**.

   Ou exécutez directement ce SQL :

```sql
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
```

### Étape 2 : Vérifier que la fonction `is_admin()` existe

Si vous n'avez pas encore exécuté la migration `021_fix_rls_recursion_users.sql`, vous devez d'abord créer la fonction `is_admin()`. Exécutez ce SQL :

```sql
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
```

### Étape 3 : Vérifier que vous êtes bien connecté en tant qu'admin

1. Dans la console admin, ouvrez la console du navigateur (F12)
2. Vérifiez que vous êtes bien authentifié et que votre rôle est `admin` dans la table `users`

Vous pouvez tester avec ce code dans la console :

```javascript
const { data: { user } } = await supabase.auth.getUser()
console.log('User ID:', user?.id)

const { data: userData } = await supabase
  .from('users')
  .select('role, email')
  .eq('id', user?.id)
  .single()

console.log('User role:', userData?.role)
```

### Étape 4 : Tester l'accès aux fichiers

1. Rechargez la page de détails d'une candidature (`/admin/candidatures/[id]`)
2. Ouvrez la console du navigateur (F12)
3. Vous devriez voir des logs détaillés :
   - `[loadFileUrls] Diagnostic: Liste des fichiers dans le dossier {applicationId}`
   - `[loadFileUrls] Fichiers trouvés dans le bucket: [...]`
   - `[loadFileUrls] Infos du fichier {key}: {...}`

4. Si les fichiers s'affichent maintenant, le problème est résolu !

## Diagnostic

Si les documents ne s'affichent toujours pas après avoir appliqué la migration :

1. **Vérifiez les logs dans la console** :
   - Cherchez les messages commençant par `[loadFileUrls]` et `[getSignedFileUrl]`
   - Notez les erreurs spécifiques

2. **Vérifiez que les fichiers existent dans le bucket** :
   - Supabase Dashboard → Storage → applications
   - Vérifiez qu'il y a un dossier avec l'ID de l'application
   - Vérifiez que les fichiers sont présents dans ce dossier

3. **Vérifiez les chemins stockés** :
   - Supabase Dashboard → Table Editor → form_submissions
   - Regardez le champ `form_data` pour voir les chemins/URLs des fichiers
   - Les nouveaux fichiers devraient avoir un chemin au format : `{applicationId}/{fileType}-{uuid}.{ext}`

4. **Vérifiez les politiques RLS** :
   - Supabase Dashboard → Storage → applications → Policies
   - Vérifiez que les politiques "Authenticated users can read application files" et "Admins can delete application files" existent

## Notes

- La fonction `is_admin()` utilise `SECURITY DEFINER` pour contourner RLS de manière sécurisée
- Les admins peuvent maintenant lire tous les fichiers dans le bucket `applications`
- Les utilisateurs normaux peuvent toujours lire leurs propres fichiers de candidature

