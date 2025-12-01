# Guide : Visualiser les Données dans Supabase

## 📋 Table des Matières

1. [Accéder au Dashboard Supabase](#accéder-au-dashboard-supabase)
2. [Visualiser les Tables](#visualiser-les-tables)
3. [Visualiser les Candidatures](#visualiser-les-candidatures)
4. [Filtrer et Rechercher](#filtrer-et-rechercher)
5. [Voir les Détails d'une Candidature](#voir-les-détails-dune-candidature)
6. [Visualiser les Fichiers Joints](#visualiser-les-fichiers-joints)
7. [Utiliser l'Éditeur SQL](#utiliser-léditeur-sql)

---

## 🚀 Accéder au Dashboard Supabase

### Étape 1 : Se connecter
1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez sur **Sign In** (ou **Log In**)
3. Connectez-vous avec votre compte

### Étape 2 : Sélectionner votre projet
1. Dans la liste des projets, cliquez sur votre projet **Farafina**
2. Vous arrivez sur le **Dashboard** principal

---

## 📊 Visualiser les Tables

### Méthode 1 : Via l'Interface Table Editor

1. **Dans le menu de gauche**, cliquez sur **Table Editor** (ou **Database** → **Tables**)
2. Vous verrez la liste de toutes vos tables :
   - `users` - Utilisateurs
   - `players` - Joueurs
   - `form_submissions` - **Toutes les soumissions de formulaires (candidatures incluses)**
   - `messages` - Messages
   - `notifications` - Notifications
   - `conversations` - Conversations
   - Et autres tables...

3. **Cliquez sur une table** pour voir ses données
4. Les données s'affichent sous forme de **tableau** avec :
   - Colonnes visibles
   - Boutons pour **éditer**, **supprimer**, **ajouter** des lignes
   - Filtres et recherche en haut

### Méthode 2 : Via SQL Editor (Plus puissant)

1. Dans le menu de gauche, cliquez sur **SQL Editor**
2. Écrivez une requête SQL, par exemple :
   ```sql
   SELECT * FROM form_submissions;
   ```
3. Cliquez sur **Run** (ou `Ctrl+Enter`)
4. Les résultats s'affichent en bas

---

## 🎯 Visualiser les Candidatures

### Les candidatures sont dans la table `form_submissions`

Les candidatures sont stockées dans la table `form_submissions` avec le champ `form_type = 'application'`.

### Méthode 1 : Via Table Editor (Simple)

1. **Cliquez sur** `Table Editor` dans le menu de gauche
2. **Cliquez sur la table** `form_submissions`
3. **Filtrez par type** :
   - En haut du tableau, vous verrez des filtres
   - Dans la colonne `form_type`, filtrez pour voir uniquement `application`
   - Ou utilisez la barre de recherche

### Méthode 2 : Via SQL Editor (Recommandé)

1. **Cliquez sur** `SQL Editor` dans le menu de gauche
2. **Copiez et exécutez cette requête** :

```sql
-- Voir toutes les candidatures
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

3. **Cliquez sur** `Run` (ou `Ctrl+Enter`)
4. Les candidatures s'affichent avec toutes leurs informations

### Méthode 3 : Requête avec détails formatés

Pour voir les candidatures avec les informations extraites du JSON :

```sql
-- Voir les candidatures avec détails extraits
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  form_data->>'phone' as telephone,
  form_data->>'program' as programme,
  form_data->>'position' as poste,
  status as statut,
  created_at as date_creation
FROM form_submissions
WHERE form_type = 'application'
ORDER BY created_at DESC;
```

---

## 🔍 Filtrer et Rechercher

### Dans Table Editor

1. **Barre de recherche** : En haut du tableau, tapez un terme (nom, email, etc.)
2. **Filtres par colonne** : Cliquez sur l'icône de filtre à côté du nom de colonne
3. **Tri** : Cliquez sur l'en-tête de colonne pour trier

### Dans SQL Editor

#### Filtrer par statut

```sql
-- Candidatures en attente
SELECT * FROM form_submissions
WHERE form_type = 'application' 
  AND status = 'pending'
ORDER BY created_at DESC;
```

#### Filtrer par date

```sql
-- Candidatures des 7 derniers jours
SELECT * FROM form_submissions
WHERE form_type = 'application' 
  AND created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

#### Rechercher par nom ou email

```sql
-- Rechercher par nom ou email
SELECT * FROM form_submissions
WHERE form_type = 'application'
  AND (
    form_data->>'firstName' ILIKE '%nom%'
    OR form_data->>'lastName' ILIKE '%nom%'
    OR form_data->>'email' ILIKE '%email%'
  )
ORDER BY created_at DESC;
```

---

## 📄 Voir les Détails d'une Candidature

### Dans Table Editor

1. **Cliquez sur une ligne** de candidature
2. Un panneau s'ouvre à droite avec tous les détails
3. Vous pouvez voir :
   - Les champs du formulaire dans `form_data` (format JSON)
   - Le statut
   - Les dates de création et modification
   - L'ID utilisateur si connecté

### Dans SQL Editor

Pour voir tous les détails d'une candidature spécifique :

```sql
-- Voir une candidature par ID
SELECT 
  id,
  form_data,
  status,
  created_at,
  updated_at,
  user_id
FROM form_submissions
WHERE id = 'VOTRE_ID_ICI';
```

Pour extraire tous les champs du formulaire :

```sql
-- Extraire tous les champs d'une candidature
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'age' as age,
  form_data->>'gender' as genre,
  form_data->>'height' as taille,
  form_data->>'weight' as poids,
  form_data->>'country' as pays,
  form_data->>'email' as email,
  form_data->>'phone' as telephone,
  form_data->>'program' as programme,
  form_data->>'position' as poste,
  form_data->>'experience' as experience,
  form_data->>'currentClub' as club_actuel,
  form_data->>'motivation' as motivation,
  form_data->>'guardian' as tuteur,
  form_data->>'guardianPhone' as telephone_tuteur,
  form_data->>'birthCertificate' as acte_naissance,
  form_data->>'photo' as photo,
  form_data->>'medicalCertificate' as certificat_medical,
  form_data->>'video' as video,
  status as statut,
  created_at as date_creation
FROM form_submissions
WHERE form_type = 'application'
ORDER BY created_at DESC;
```

---

## 📎 Visualiser les Fichiers Joints

Les fichiers (photos, certificats, vidéos) sont stockés dans **Storage**, pas dans la base de données.

### Accéder aux fichiers

1. **Dans le menu de gauche**, cliquez sur **Storage**
2. **Cliquez sur le bucket** `applications`
3. Vous verrez les dossiers organisés par `application_id`
4. **Cliquez sur un dossier** pour voir les fichiers :
   - `birthCertificate.pdf`
   - `photo.jpg`
   - `medicalCertificate.pdf`
   - `video.mp4`

### Lier les fichiers aux candidatures

Pour voir quels fichiers appartiennent à quelle candidature :

```sql
-- Voir les candidatures avec leurs fichiers
SELECT 
  fs.id,
  fs.form_data->>'firstName' as prenom,
  fs.form_data->>'lastName' as nom,
  fs.form_data->>'photo' as photo_url,
  fs.form_data->>'birthCertificate' as acte_naissance_url,
  fs.form_data->>'medicalCertificate' as certificat_medical_url,
  fs.form_data->>'video' as video_url,
  fs.status,
  fs.created_at
FROM form_submissions fs
WHERE fs.form_type = 'application'
ORDER BY fs.created_at DESC;
```

---

## 💻 Utiliser l'Éditeur SQL

### Requêtes utiles pour les candidatures

#### Compter les candidatures par statut

```sql
SELECT 
  status,
  COUNT(*) as nombre
FROM form_submissions
WHERE form_type = 'application'
GROUP BY status;
```

#### Candidatures par programme

```sql
SELECT 
  form_data->>'program' as programme,
  COUNT(*) as nombre
FROM form_submissions
WHERE form_type = 'application'
GROUP BY form_data->>'program'
ORDER BY nombre DESC;
```

#### Candidatures par pays

```sql
SELECT 
  form_data->>'country' as pays,
  COUNT(*) as nombre
FROM form_submissions
WHERE form_type = 'application'
GROUP BY form_data->>'country'
ORDER BY nombre DESC;
```

#### Statistiques complètes

```sql
SELECT 
  COUNT(*) as total_candidatures,
  COUNT(*) FILTER (WHERE status = 'pending') as en_attente,
  COUNT(*) FILTER (WHERE status = 'reviewed') as en_cours,
  COUNT(*) FILTER (WHERE status = 'completed') as traitees,
  COUNT(*) FILTER (WHERE status = 'archived') as archivees,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as dernier_mois
FROM form_submissions
WHERE form_type = 'application';
```

---

## 🎨 Astuces et Bonnes Pratiques

### Sauvegarder vos requêtes

1. Dans **SQL Editor**, après avoir écrit une requête
2. Cliquez sur **Save** (ou `Ctrl+S`)
3. Donnez un nom à votre requête (ex: "Candidatures en attente")
4. Vous pourrez la réutiliser plus tard

### Exporter les données

1. Après avoir exécuté une requête
2. Cliquez sur **Export** (icône de téléchargement)
3. Choisissez le format : CSV, JSON, etc.
4. Les données seront téléchargées

### Créer des vues (Views)

Pour simplifier l'accès aux candidatures, créez une vue :

```sql
-- Créer une vue pour les candidatures
CREATE OR REPLACE VIEW candidatures_view AS
SELECT 
  id,
  form_data->>'firstName' as prenom,
  form_data->>'lastName' as nom,
  form_data->>'email' as email,
  form_data->>'phone' as telephone,
  form_data->>'program' as programme,
  status as statut,
  created_at as date_creation
FROM form_submissions
WHERE form_type = 'application';

-- Utiliser la vue
SELECT * FROM candidatures_view ORDER BY date_creation DESC;
```

---

## 🔐 Permissions et Sécurité

### Vérifier les politiques RLS

1. Allez dans **Authentication** → **Policies**
2. Ou dans **Database** → **Policies**
3. Vérifiez que les politiques RLS sont bien configurées

### Accès Admin

Pour voir toutes les données sans restrictions :
- Utilisez le **SQL Editor** avec votre compte admin
- Les politiques RLS ne s'appliquent pas aux requêtes SQL directes dans le dashboard

---

## 📞 Besoin d'Aide ?

### Problèmes courants

**Je ne vois pas les données**
- Vérifiez que vous êtes connecté au bon projet
- Vérifiez que les migrations ont été exécutées
- Vérifiez les politiques RLS

**Les fichiers ne s'affichent pas**
- Vérifiez que le bucket `applications` existe
- Vérifiez les permissions du bucket
- Vérifiez que les URLs dans `form_data` sont correctes

**Erreur SQL**
- Vérifiez la syntaxe SQL
- Vérifiez que les noms de tables/colonnes sont corrects
- Utilisez les guillemets simples pour les valeurs JSON

---

## 📚 Ressources

- [Documentation Supabase Table Editor](https://supabase.com/docs/guides/database/tables)
- [Documentation Supabase SQL Editor](https://supabase.com/docs/guides/database/overview)
- [Documentation Supabase Storage](https://supabase.com/docs/guides/storage)

---

**Bon courage avec vos candidatures ! 🚀**

