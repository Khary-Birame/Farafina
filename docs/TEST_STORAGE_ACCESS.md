# Test d'Accès au Storage

## Problème Identifié

Les fichiers existent dans le bucket mais ne sont pas accessibles car :
1. La liste des fichiers retourne `Array(0)` (vide)
2. `createSignedUrl` échoue avec "Object not found"
3. Cela indique un problème de permissions RLS

## Solution : Vérifier les Politiques RLS

### Étape 1 : Vérifier que la Migration a été Exécutée

Dans Supabase Dashboard → SQL Editor, exécutez :

```sql
-- Vérifier si la fonction is_admin() existe
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname = 'is_admin';

-- Vérifier les politiques RLS pour le storage
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%application%';
```

### Étape 2 : Vérifier votre Rôle Admin

Dans Supabase Dashboard → Table Editor → users, vérifiez que votre utilisateur a `role = 'admin'`.

### Étape 3 : Tester l'Accès dans la Console du Navigateur

Ouvrez la console du navigateur (F12) et exécutez :

```javascript
// 1. Vérifier l'authentification
const { data: { user } } = await supabase.auth.getUser()
console.log('User:', user?.id)

// 2. Vérifier le rôle
const { data: userData } = await supabase
  .from('users')
  .select('role, email')
  .eq('id', user?.id)
  .single()
console.log('User role:', userData?.role)

// 3. Tester la fonction is_admin()
const { data: isAdminResult } = await supabase.rpc('is_admin')
console.log('is_admin():', isAdminResult)

// 4. Tester la liste des fichiers
const { data: files, error: listError } = await supabase.storage
  .from('applications')
  .list('ef2e0ac7-685d-4ac8-9e1d-7b7130ba5eac')
console.log('Files:', files)
console.log('List error:', listError)

// 5. Tester la création d'URL signée
const { data: signedUrl, error: signedError } = await supabase.storage
  .from('applications')
  .createSignedUrl('ef2e0ac7-685d-4ac8-9e1d-7b7130ba5eac/photo-2768b53e-edda-409d-8152-37157f92b3a9.jpeg', 3600)
console.log('Signed URL:', signedUrl)
console.log('Signed URL error:', signedError)
```

### Étape 4 : Si la Fonction is_admin() n'Existe Pas

Exécutez la migration `023_fix_storage_rls_policies.sql` qui crée la fonction `is_admin()`.

### Étape 5 : Si les Politiques RLS ne Permettent Pas l'Accès

Les politiques RLS doivent permettre aux admins de :
1. **Lister** les fichiers dans les dossiers d'applications
2. **Créer des URLs signées** pour les fichiers

Si ce n'est pas le cas, exécutez la migration `023_fix_storage_rls_policies.sql`.

## Solution Alternative : Rendre le Bucket Public Temporairement

Si les politiques RLS posent problème, vous pouvez temporairement rendre le bucket public pour tester :

1. Supabase Dashboard → Storage → applications
2. Cliquez sur les trois points → Edit
3. Changez "Public" à "true"
4. Testez l'accès
5. Remettez-le en privé après

**Note** : Ce n'est qu'une solution temporaire pour tester. Le bucket doit rester privé en production.


