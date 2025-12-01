# Requêtes SQL pour Visualiser les Candidatures

Ce fichier contient des requêtes SQL prêtes à utiliser dans l'éditeur SQL de Supabase.

---

## 📋 Requêtes de Base

### 1. Voir toutes les candidatures

```sql
-- Liste complète des candidatures
SELECT 
  id,
  form_type,
  form_data,
  status,
  created_at,
  updated_at,
  user_id
FROM form_submissions
WHERE form_type = 'application'
ORDER BY created_at DESC;
```

### 2. Candidatures avec détails extraits

```sql
-- Candidatures avec informations formatées
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  form_data->>'phone' as telephone,
  form_data->>'program' as programme,
  form_data->>'position' as poste,
  form_data->>'country' as pays,
  status as statut,
  created_at as date_creation
FROM form_submissions
WHERE form_type = 'application'
ORDER BY created_at DESC;
```

### 3. Candidatures en attente

```sql
-- Candidatures en attente de traitement
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  form_data->>'phone' as telephone,
  form_data->>'program' as programme,
  status,
  created_at
FROM form_submissions
WHERE form_type = 'application' 
  AND status = 'pending'
ORDER BY created_at DESC;
```

---

## 🔍 Requêtes de Recherche

### 4. Rechercher par nom

```sql
-- Rechercher par prénom ou nom
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  form_data->>'phone' as telephone,
  status,
  created_at
FROM form_submissions
WHERE form_type = 'application'
  AND (
    form_data->>'firstName' ILIKE '%NOM_RECHERCHE%'
    OR form_data->>'lastName' ILIKE '%NOM_RECHERCHE%'
  )
ORDER BY created_at DESC;
```

### 5. Rechercher par email

```sql
-- Rechercher par email
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  form_data->>'phone' as telephone,
  status,
  created_at
FROM form_submissions
WHERE form_type = 'application'
  AND form_data->>'email' ILIKE '%EMAIL_RECHERCHE%'
ORDER BY created_at DESC;
```

### 6. Rechercher par téléphone

```sql
-- Rechercher par numéro de téléphone
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  form_data->>'phone' as telephone,
  status,
  created_at
FROM form_submissions
WHERE form_type = 'application'
  AND (
    form_data->>'phone' LIKE '%NUMERO%'
    OR form_data->>'phone2' LIKE '%NUMERO%'
  )
ORDER BY created_at DESC;
```

---

## 📊 Requêtes Statistiques

### 7. Compter les candidatures par statut

```sql
-- Statistiques par statut
SELECT 
  status as statut,
  COUNT(*) as nombre
FROM form_submissions
WHERE form_type = 'application'
GROUP BY status
ORDER BY nombre DESC;
```

### 8. Candidatures par programme

```sql
-- Répartition par programme
SELECT 
  form_data->>'program' as programme,
  COUNT(*) as nombre
FROM form_submissions
WHERE form_type = 'application'
GROUP BY form_data->>'program'
ORDER BY nombre DESC;
```

### 9. Candidatures par pays

```sql
-- Répartition par pays
SELECT 
  form_data->>'country' as pays,
  COUNT(*) as nombre
FROM form_submissions
WHERE form_type = 'application'
GROUP BY form_data->>'country'
ORDER BY nombre DESC;
```

### 10. Candidatures par poste (position)

```sql
-- Répartition par poste
SELECT 
  form_data->>'position' as poste,
  COUNT(*) as nombre
FROM form_submissions
WHERE form_type = 'application'
GROUP BY form_data->>'position'
ORDER BY nombre DESC;
```

### 11. Statistiques complètes

```sql
-- Vue d'ensemble complète
SELECT 
  COUNT(*) as total_candidatures,
  COUNT(*) FILTER (WHERE status = 'pending') as en_attente,
  COUNT(*) FILTER (WHERE status = 'reviewed') as en_cours,
  COUNT(*) FILTER (WHERE status = 'completed') as traitees,
  COUNT(*) FILTER (WHERE status = 'archived') as archivees,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as dernieres_7_jours,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as dernier_mois
FROM form_submissions
WHERE form_type = 'application';
```

---

## 📅 Requêtes par Date

### 12. Candidatures des 7 derniers jours

```sql
-- Candidatures de la semaine
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  form_data->>'program' as programme,
  status,
  created_at
FROM form_submissions
WHERE form_type = 'application' 
  AND created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### 13. Candidatures du mois

```sql
-- Candidatures du mois
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  form_data->>'program' as programme,
  status,
  created_at
FROM form_submissions
WHERE form_type = 'application' 
  AND created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;
```

### 14. Candidatures par jour (graphique)

```sql
-- Nombre de candidatures par jour
SELECT 
  DATE(created_at) as date,
  COUNT(*) as nombre
FROM form_submissions
WHERE form_type = 'application'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## 📄 Requêtes de Détails

### 15. Voir une candidature complète par ID

```sql
-- Remplacez 'ID_ICI' par l'ID réel de la candidature
SELECT 
  id,
  form_data,
  status,
  created_at,
  updated_at,
  user_id
FROM form_submissions
WHERE id = 'ID_ICI';
```

### 16. Extraire tous les champs d'une candidature

```sql
-- Tous les champs formatés
SELECT 
  id,
  -- Informations personnelles
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'age' as age,
  form_data->>'gender' as genre,
  form_data->>'height' as taille,
  form_data->>'weight' as poids,
  form_data->>'country' as pays,
  
  -- Contact
  form_data->>'email' as email,
  form_data->>'phone' as telephone,
  form_data->>'phone2' as telephone_2,
  
  -- Programme
  form_data->>'program' as programme,
  form_data->>'position' as poste,
  form_data->>'experience' as experience,
  form_data->>'currentClub' as club_actuel,
  form_data->>'motivation' as motivation,
  
  -- Tuteur
  form_data->>'guardian' as tuteur,
  form_data->>'guardianPhone' as telephone_tuteur,
  
  -- Fichiers
  form_data->>'birthCertificate' as acte_naissance,
  form_data->>'photo' as photo,
  form_data->>'medicalCertificate' as certificat_medical,
  form_data->>'video' as video,
  
  -- Métadonnées
  status as statut,
  created_at as date_creation,
  updated_at as date_modification,
  user_id
FROM form_submissions
WHERE form_type = 'application'
ORDER BY created_at DESC;
```

---

## 📎 Requêtes avec Fichiers

### 17. Candidatures avec fichiers joints

```sql
-- Voir les candidatures avec leurs fichiers
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  CASE 
    WHEN form_data->>'photo' IS NOT NULL THEN 'Oui'
    ELSE 'Non'
  END as a_photo,
  CASE 
    WHEN form_data->>'birthCertificate' IS NOT NULL THEN 'Oui'
    ELSE 'Non'
  END as a_acte_naissance,
  CASE 
    WHEN form_data->>'medicalCertificate' IS NOT NULL THEN 'Oui'
    ELSE 'Non'
  END as a_certificat_medical,
  CASE 
    WHEN form_data->>'video' IS NOT NULL THEN 'Oui'
    ELSE 'Non'
  END as a_video,
  form_data->>'photo' as url_photo,
  form_data->>'birthCertificate' as url_acte_naissance,
  form_data->>'medicalCertificate' as url_certificat_medical,
  form_data->>'video' as url_video,
  status,
  created_at
FROM form_submissions
WHERE form_type = 'application'
ORDER BY created_at DESC;
```

### 18. Candidatures incomplètes (sans fichiers)

```sql
-- Candidatures sans tous les fichiers requis
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  CASE 
    WHEN form_data->>'photo' IS NULL THEN 'Manquant'
    ELSE 'OK'
  END as photo,
  CASE 
    WHEN form_data->>'birthCertificate' IS NULL THEN 'Manquant'
    ELSE 'OK'
  END as acte_naissance,
  CASE 
    WHEN form_data->>'medicalCertificate' IS NULL THEN 'Manquant'
    ELSE 'OK'
  END as certificat_medical,
  status,
  created_at
FROM form_submissions
WHERE form_type = 'application'
  AND (
    form_data->>'photo' IS NULL
    OR form_data->>'birthCertificate' IS NULL
    OR form_data->>'medicalCertificate' IS NULL
  )
ORDER BY created_at DESC;
```

---

## 🔄 Requêtes de Mise à Jour

### 19. Changer le statut d'une candidature

```sql
-- Mettre à jour le statut (remplacez les valeurs)
UPDATE form_submissions
SET status = 'reviewed'  -- ou 'completed', 'archived'
WHERE id = 'ID_ICI';
```

### 20. Marquer plusieurs candidatures comme traitées

```sql
-- Marquer toutes les candidatures en attente depuis plus de 30 jours comme archivées
UPDATE form_submissions
SET status = 'archived'
WHERE form_type = 'application'
  AND status = 'pending'
  AND created_at < NOW() - INTERVAL '30 days';
```

---

## 💡 Astuces d'Utilisation

### Comment utiliser ces requêtes

1. **Ouvrez Supabase Dashboard** → **SQL Editor**
2. **Copiez une requête** de ce fichier
3. **Remplacez les valeurs** si nécessaire (ex: `'ID_ICI'`, `'NOM_RECHERCHE'`)
4. **Cliquez sur Run** (ou `Ctrl+Enter`)
5. **Sauvegardez** les requêtes utiles pour les réutiliser

### Personnaliser les requêtes

- **Ajoutez des colonnes** : Ajoutez `form_data->>'nomChamp'` pour extraire d'autres champs
- **Modifiez les filtres** : Changez les conditions `WHERE` selon vos besoins
- **Changez le tri** : Modifiez `ORDER BY` pour trier différemment

---

## 📚 Requêtes Avancées

### 21. Vue complète avec jointure utilisateur

```sql
-- Candidatures avec informations utilisateur
SELECT 
  fs.id,
  fs.form_data->>'firstName' as prenom,
  fs.form_data->>'lastName' as nom,
  fs.form_data->>'email' as email,
  fs.status,
  fs.created_at,
  u.email as email_utilisateur,
  u.full_name as nom_utilisateur
FROM form_submissions fs
LEFT JOIN users u ON fs.user_id = u.id
WHERE fs.form_type = 'application'
ORDER BY fs.created_at DESC;
```

### 22. Export pour Excel/CSV

```sql
-- Format optimisé pour export
SELECT 
  form_data->>'firstName' as "Prénom",
  form_data->>'lastName' as "Nom",
  form_data->>'email' as "Email",
  form_data->>'phone' as "Téléphone",
  form_data->>'program' as "Programme",
  form_data->>'position' as "Poste",
  form_data->>'country' as "Pays",
  status as "Statut",
  TO_CHAR(created_at, 'DD/MM/YYYY HH24:MI') as "Date de création"
FROM form_submissions
WHERE form_type = 'application'
ORDER BY created_at DESC;
```

---

**Bon courage avec vos candidatures ! 🚀**

