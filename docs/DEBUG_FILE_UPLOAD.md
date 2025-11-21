# Debug : Problème d'Upload des Fichiers

## Problème
Les fichiers sont renseignés dans le formulaire mais ne sont pas trouvés dans le bucket Supabase Storage lors de l'affichage dans la console admin.

## Diagnostic

### 1. Vérifier les Logs lors de la Soumission

Quand vous soumettez une nouvelle candidature, ouvrez la console du navigateur (F12) et cherchez les logs qui commencent par :
- `[uploadApplicationFile] Tentative d'upload de...`
- `[uploadApplicationFile] ✅ Upload réussi pour...` ou `[uploadApplicationFile] ❌ Erreur...`
- `[submitApplication] Upload photo:`
- `[submitApplication] ✅ photo uploadée:` ou erreurs

### 2. Vérifier les Politiques RLS pour l'Upload

Dans Supabase Dashboard → Storage → applications → Policies, vérifiez que la politique suivante existe :

```sql
CREATE POLICY "Anyone can upload application files"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'applications'
);
```

**IMPORTANT** : Cette politique doit permettre l'upload à `public` (utilisateurs non authentifiés) car les candidatures peuvent être soumises sans compte.

### 3. Vérifier que le Bucket Existe et est Configuré Correctement

Dans Supabase Dashboard → Storage → applications :

1. **Vérifiez que le bucket existe** avec le nom exact `applications`
2. **Vérifiez les paramètres** :
   - **Public** : `false` (privé)
   - **File size limit** : `104857600` (100MB)
   - **Allowed MIME types** : 
     - `application/pdf`
     - `image/jpeg`
     - `image/jpg`
     - `image/png`
     - `video/mp4`
     - `video/quicktime`

### 4. Tester l'Upload Manuellement

Dans la console du navigateur, testez l'upload manuellement :

```javascript
// Créer un fichier de test
const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

// Tester l'upload
const { data, error } = await supabase.storage
  .from('applications')
  .upload('test-folder/test.jpg', testFile)

console.log('Upload test:', { data, error })
```

Si cela échoue, vérifiez l'erreur retournée.

### 5. Vérifier les Fichiers dans le Bucket

Après avoir soumis une candidature :

1. Allez dans Supabase Dashboard → Storage → applications
2. Cherchez un dossier avec l'ID de la candidature (ex: `8f953308-7433-438a-8391-ec4fc7b8fa96`)
3. Vérifiez si les fichiers sont présents dans ce dossier
4. Comparez les noms des fichiers avec les chemins stockés dans `form_data`

### 6. Vérifier les Chemins Stockés dans la Base de Données

Dans Supabase Dashboard → Table Editor → form_submissions :

1. Trouvez la candidature concernée
2. Regardez le champ `form_data`
3. Vérifiez les chemins des fichiers (ex: `photo`, `birthCertificate`, etc.)
4. Comparez avec les fichiers réels dans le bucket

## Causes Possibles

1. **Politique RLS bloque l'upload** : La politique d'upload n'existe pas ou ne permet pas l'upload à `public`
2. **Bucket mal configuré** : Le bucket n'existe pas ou les paramètres sont incorrects
3. **Erreur silencieuse lors de l'upload** : L'upload échoue mais l'erreur n'est pas correctement gérée
4. **Chemin incorrect** : Le chemin stocké ne correspond pas au fichier réel dans le bucket
5. **Permissions insuffisantes** : Les clés API Supabase n'ont pas les bonnes permissions

## Solution

Si les logs montrent une erreur lors de l'upload, partagez-moi :
- Le message d'erreur exact
- Les logs complets de `[uploadApplicationFile]`
- Les logs complets de `[submitApplication]`

Si les fichiers ne sont pas uploadés du tout, vérifiez :
- Que la politique RLS d'upload existe et permet l'upload à `public`
- Que le bucket existe et est correctement configuré
- Que les clés API Supabase sont correctement configurées dans `.env.local`

