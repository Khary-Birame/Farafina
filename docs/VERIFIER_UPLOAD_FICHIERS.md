# Vérification : Les Fichiers sont-ils Uploadés ?

## Étapes de Vérification

### 1. Vérifier dans Supabase Dashboard

1. Allez dans **Supabase Dashboard → Storage → applications**
2. Cherchez un dossier avec l'ID de la candidature (ex: `8f953308-7433-438a-8391-ec4fc7b8fa96`)
3. **Si le dossier n'existe pas** → Les fichiers n'ont PAS été uploadés
4. **Si le dossier existe mais est vide** → Les fichiers n'ont PAS été uploadés
5. **Si le dossier contient des fichiers** → Notez les noms exacts des fichiers

### 2. Vérifier dans la Base de Données

1. Allez dans **Supabase Dashboard → Table Editor → form_submissions**
2. Trouvez la candidature concernée
3. Regardez le champ `form_data` (cliquez dessus pour voir le JSON)
4. Vérifiez les valeurs de :
   - `photo`
   - `birthCertificate`
   - `medicalCertificate`
   - `video`

### 3. Comparer les Chemins

Comparez :
- **Les chemins dans `form_data`** (ex: `8f953308-7433-438a-8391-ec4fc7b8fa96/photo-58154e60-fdb5-4e32-a55e-965bda08b3f9.jpeg`)
- **Les fichiers réels dans le bucket** (ex: `photo-58154e60-fdb5-4e32-a55e-965bda08b3f9.jpeg`)

**Si les chemins ne correspondent pas** → Le problème vient de l'upload ou du stockage du chemin

### 4. Vérifier les Logs lors de la Soumission

Quand vous soumettez une candidature, dans la console du navigateur (F12), cherchez :

```
[uploadApplicationFile] Tentative d'upload de photo: {...}
[uploadApplicationFile] ✅ Upload réussi pour photo: {...}
[submitApplication] ✅ photo uploadée: 8f953308-7433-438a-8391-ec4fc7b8fa96/photo-xxx.jpeg
```

**Si vous voyez des erreurs** → Partagez-les avec moi

## Solutions selon le Problème

### Problème 1 : Le dossier n'existe pas dans le bucket

**Cause** : Les fichiers n'ont pas été uploadés lors de la soumission

**Solution** :
1. Vérifiez les politiques RLS pour l'upload (doit permettre `public`)
2. Vérifiez les logs de la console lors de la soumission
3. Vérifiez que le bucket existe et est correctement configuré

### Problème 2 : Le dossier existe mais les fichiers ne correspondent pas

**Cause** : Les chemins stockés dans `form_data` ne correspondent pas aux fichiers réels

**Solution** :
1. Vérifiez que les fichiers uploadés ont bien été enregistrés dans `form_data`
2. Vérifiez que l'ID de l'application correspond au nom du dossier

### Problème 3 : Les fichiers existent mais ne sont pas accessibles

**Cause** : Problème de politiques RLS pour la lecture

**Solution** :
1. Vérifiez que la migration `023_fix_storage_rls_policies.sql` a été exécutée
2. Vérifiez que vous êtes bien connecté en tant qu'admin
3. Vérifiez les politiques RLS dans Supabase Dashboard → Storage → applications → Policies

