# Debug : Accès aux Fichiers dans Supabase Storage

## Problème
Les documents ne sont pas visibles dans l'interface admin malgré l'existence du bucket.

## Diagnostic

### 1. Vérifier les Politiques RLS

Dans Supabase Dashboard → Storage → Policies, vérifiez que les politiques suivantes existent :

```sql
-- Politique pour la lecture (SELECT)
CREATE POLICY "Authenticated users can read application files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'applications' AND
  (
    -- Les admins peuvent tout lire
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
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
```

**IMPORTANT** : Si vous n'avez pas de table `users` avec un champ `role`, la politique pour les admins ne fonctionnera pas.

### 2. Vérifier l'Existence des Fichiers

Dans Supabase Dashboard → Storage → applications, vérifiez que :
- Le dossier avec l'ID de l'application existe (ex: `375e8e13-8474-47d5-8fc8-243474d0c6fc`)
- Les fichiers sont présents dans ce dossier
- Les noms des fichiers correspondent aux chemins stockés dans `form_data`

### 3. Vérifier les Chemins Stockés

Dans Supabase Dashboard → Table Editor → form_submissions, vérifiez :
- Le champ `form_data` contient les URLs ou chemins des fichiers
- Les chemins sont au format : `{applicationId}/{fileType}-{uuid}.{ext}`

### 4. Test dans la Console du Navigateur

Ouvrez la console (F12) et exécutez :

```javascript
// Tester l'accès au bucket
const { data, error } = await supabase.storage
  .from('applications')
  .list('375e8e13-8474-47d5-8fc8-243474d0c6fc')

console.log('Fichiers dans le dossier:', data)
console.log('Erreur:', error)
```

### 5. Vérifier l'Authentification

Assurez-vous que vous êtes bien authentifié en tant qu'admin :

```javascript
const { data: { user } } = await supabase.auth.getUser()
console.log('Utilisateur actuel:', user)
```

## Solutions Possibles

### Solution 1 : Modifier les Politiques RLS

Si vous n'avez pas de table `users`, modifiez la politique pour permettre l'accès aux admins via une autre méthode :

```sql
-- Permettre à tous les utilisateurs authentifiés de lire les fichiers
CREATE POLICY "Authenticated users can read application files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'applications');
```

### Solution 2 : Rendre le Bucket Public (Temporaire)

Pour tester, vous pouvez rendre le bucket public temporairement :
1. Supabase Dashboard → Storage → applications
2. Cliquez sur les trois points → Edit
3. Changez "Public" à "true"
4. Testez l'accès
5. Remettez-le en privé après

### Solution 3 : Vérifier les Chemins

Si les fichiers existent mais avec des noms différents, vous devrez peut-être :
- Mettre à jour les chemins dans `form_data`
- Ou renommer les fichiers dans le bucket

## Logs à Vérifier

Dans la console du navigateur, cherchez :
- `[loadFileUrls] Fichiers trouvés dans le bucket:` - Liste des fichiers réels
- `[loadFileUrls] Infos du fichier:` - Informations sur chaque fichier
- `[getSignedFileUrl] Erreur pour le chemin:` - Erreurs spécifiques


