# Guide : Supprimer les Candidatures dans Supabase

⚠️ **ATTENTION** : La suppression est **irréversible**. Assurez-vous de vouloir vraiment supprimer ces données avant d'exécuter les requêtes.

---

## 🛡️ Avant de Supprimer

### 1. Faire une Sauvegarde (Recommandé)

Avant de supprimer, exportez vos données :

```sql
-- Exporter toutes les candidatures avant suppression
SELECT * FROM form_submissions
WHERE form_type = 'application';
```

1. Exécutez cette requête dans **SQL Editor**
2. Cliquez sur **Export** (icône de téléchargement)
3. Choisissez le format **CSV** ou **JSON**
4. Téléchargez le fichier

### 2. Vérifier ce que vous allez supprimer

```sql
-- Voir combien de candidatures seront supprimées
SELECT COUNT(*) as nombre_candidatures
FROM form_submissions
WHERE form_type = 'application';
```

---

## 🗑️ Méthodes de Suppression

### Méthode 1 : Via Table Editor (Interface Graphique)

1. **Connectez-vous** à [supabase.com](https://supabase.com)
2. Allez dans **Table Editor** → **form_submissions**
3. **Filtrez** par `form_type = 'application'`
4. **Sélectionnez** les lignes à supprimer (ou toutes)
5. Cliquez sur **Delete** (ou appuyez sur `Suppr`)
6. **Confirmez** la suppression

⚠️ **Limitation** : Cette méthode peut être lente si vous avez beaucoup de candidatures.

---

### Méthode 2 : Via SQL Editor (Recommandé)

#### Option A : Supprimer TOUTES les candidatures

```sql
-- ⚠️ SUPPRIME TOUTES LES CANDIDATURES
DELETE FROM form_submissions
WHERE form_type = 'application';
```

#### Option B : Supprimer uniquement les candidatures archivées

```sql
-- Supprimer uniquement les candidatures archivées
DELETE FROM form_submissions
WHERE form_type = 'application'
  AND status = 'archived';
```

#### Option C : Supprimer les candidatures en attente anciennes

```sql
-- Supprimer les candidatures en attente depuis plus de 90 jours
DELETE FROM form_submissions
WHERE form_type = 'application'
  AND status = 'pending'
  AND created_at < NOW() - INTERVAL '90 days';
```

#### Option D : Supprimer par date

```sql
-- Supprimer les candidatures créées avant une date spécifique
-- Remplacez '2024-01-01' par votre date
DELETE FROM form_submissions
WHERE form_type = 'application'
  AND created_at < '2024-01-01';
```

#### Option E : Supprimer une candidature spécifique

```sql
-- Supprimer une candidature par son ID
-- Remplacez 'ID_ICI' par l'ID réel
DELETE FROM form_submissions
WHERE id = 'ID_ICI'
  AND form_type = 'application';
```

---

## 🔍 Vérifier Avant de Supprimer

### Voir ce qui sera supprimé

```sql
-- Voir les candidatures qui seront supprimées (remplacez les conditions)
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  status,
  created_at
FROM form_submissions
WHERE form_type = 'application'
  -- Ajoutez ici les mêmes conditions que dans votre DELETE
  -- AND status = 'archived'
  -- AND created_at < NOW() - INTERVAL '90 days'
ORDER BY created_at DESC;
```

---

## 📋 Exemples de Suppression Sélective

### Supprimer les candidatures traitées et archivées

```sql
-- Supprimer les candidatures déjà traitées et archivées
DELETE FROM form_submissions
WHERE form_type = 'application'
  AND status IN ('completed', 'archived');
```

### Supprimer les candidatures sans fichiers

```sql
-- Supprimer les candidatures sans fichiers joints (incomplètes)
DELETE FROM form_submissions
WHERE form_type = 'application'
  AND (
    form_data->>'photo' IS NULL
    OR form_data->>'birthCertificate' IS NULL
    OR form_data->>'medicalCertificate' IS NULL
  )
  AND created_at < NOW() - INTERVAL '30 days'; -- Plus de 30 jours
```

### Supprimer les doublons (par email)

```sql
-- Supprimer les candidatures en double (garder la plus récente)
DELETE FROM form_submissions fs1
WHERE form_type = 'application'
  AND EXISTS (
    SELECT 1
    FROM form_submissions fs2
    WHERE fs2.form_type = 'application'
      AND fs2.form_data->>'email' = fs1.form_data->>'email'
      AND fs2.created_at > fs1.created_at
  );
```

---

## 🗂️ Supprimer aussi les Fichiers Joints

Si vous supprimez des candidatures, vous devriez aussi supprimer leurs fichiers dans Storage.

### 1. Voir les fichiers à supprimer

```sql
-- Lister les IDs des candidatures avec leurs fichiers
SELECT 
  id,
  form_data->>'photo' as photo,
  form_data->>'birthCertificate' as acte_naissance,
  form_data->>'medicalCertificate' as certificat_medical,
  form_data->>'video' as video
FROM form_submissions
WHERE form_type = 'application'
  -- Ajoutez les mêmes conditions que votre DELETE
  AND status = 'archived';
```

### 2. Supprimer les fichiers dans Storage

1. Allez dans **Storage** → **applications**
2. Trouvez le dossier correspondant à l'ID de la candidature
3. Supprimez les fichiers manuellement

**OU** utilisez l'API Supabase pour supprimer automatiquement (nécessite du code).

---

## ⚠️ Procédure de Sécurité Recommandée

### Étape par étape sécurisée

1. **Exporter les données** (voir section "Avant de Supprimer")
2. **Vérifier avec SELECT** ce qui sera supprimé
3. **Tester sur une candidature** (supprimer une seule d'abord)
4. **Vérifier le résultat**
5. **Supprimer le reste** si tout est correct

### Exemple de procédure sécurisée

```sql
-- ÉTAPE 1 : Voir ce qui sera supprimé
SELECT COUNT(*) as nombre
FROM form_submissions
WHERE form_type = 'application'
  AND status = 'archived';

-- ÉTAPE 2 : Voir quelques exemples
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  status,
  created_at
FROM form_submissions
WHERE form_type = 'application'
  AND status = 'archived'
LIMIT 10;

-- ÉTAPE 3 : Supprimer UNE candidature de test
DELETE FROM form_submissions
WHERE form_type = 'application'
  AND status = 'archived'
  AND id = 'ID_DE_TEST';

-- ÉTAPE 4 : Si tout est OK, supprimer le reste
DELETE FROM form_submissions
WHERE form_type = 'application'
  AND status = 'archived';
```

---

## 🔄 Annuler une Suppression (Si Possible)

⚠️ **Attention** : La suppression dans Supabase est **irréversible** sauf si :

1. Vous avez activé le **Point-in-Time Recovery** (PITR) dans Supabase
2. Vous avez une sauvegarde de la base de données

### Vérifier si PITR est activé

1. Allez dans **Settings** → **Database**
2. Vérifiez si **Point-in-Time Recovery** est activé
3. Si oui, contactez le support Supabase pour restaurer

---

## 📊 Vérifier Après Suppression

```sql
-- Vérifier combien de candidatures restent
SELECT 
  status,
  COUNT(*) as nombre
FROM form_submissions
WHERE form_type = 'application'
GROUP BY status;

-- Voir toutes les candidatures restantes
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  status,
  created_at
FROM form_submissions
WHERE form_type = 'application'
ORDER BY created_at DESC;
```

---

## 🎯 Cas d'Usage Courants

### Nettoyer les candidatures de test

```sql
-- Supprimer les candidatures de test (avec email de test)
DELETE FROM form_submissions
WHERE form_type = 'application'
  AND (
    form_data->>'email' LIKE '%test%'
    OR form_data->>'email' LIKE '%example.com%'
    OR form_data->>'email' LIKE '%demo%'
  );
```

### Nettoyer les candidatures incomplètes anciennes

```sql
-- Supprimer les candidatures incomplètes de plus de 60 jours
DELETE FROM form_submissions
WHERE form_type = 'application'
  AND status = 'pending'
  AND (
    form_data->>'firstName' IS NULL
    OR form_data->>'lastName' IS NULL
    OR form_data->>'email' IS NULL
  )
  AND created_at < NOW() - INTERVAL '60 days';
```

### Archiver au lieu de supprimer

Si vous ne voulez pas supprimer définitivement, archivez plutôt :

```sql
-- Archiver au lieu de supprimer
UPDATE form_submissions
SET status = 'archived'
WHERE form_type = 'application'
  AND status = 'pending'
  AND created_at < NOW() - INTERVAL '90 days';
```

---

## ⚡ Requête Rapide : Supprimer TOUTES les Candidatures

⚠️ **UTILISEZ AVEC PRÉCAUTION** - Supprime toutes les candidatures sans exception

```sql
-- ⚠️ SUPPRIME TOUTES LES CANDIDATURES - IRRÉVERSIBLE
DELETE FROM form_submissions
WHERE form_type = 'application';
```

**Avant d'exécuter** :
1. ✅ Exportez vos données
2. ✅ Vérifiez que vous êtes sûr
3. ✅ Confirmez que vous voulez vraiment tout supprimer

---

## 📝 Notes Importantes

- ⚠️ La suppression est **irréversible** (sauf avec PITR)
- ✅ **Toujours exporter** avant de supprimer
- ✅ **Tester** sur une petite quantité d'abord
- ✅ **Vérifier** avec SELECT avant DELETE
- ✅ Les fichiers dans Storage ne sont **pas supprimés automatiquement**
- ✅ La suppression peut prendre du temps si vous avez beaucoup de données

---

## 🆘 Besoin d'Aide ?

Si vous avez des doutes :
1. **Exportez d'abord** vos données
2. **Testez** sur une seule candidature
3. **Vérifiez** le résultat
4. **Continuez** si tout est correct

---

**Soyez prudent avec les suppressions ! 🛡️**

