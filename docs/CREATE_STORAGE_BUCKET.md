# Créer le Bucket Storage pour les Candidatures

## ⚠️ Problème

Si vous voyez l'erreur `{"statusCode":"404","error":"Bucket not found","message":"Bucket not found"}`, cela signifie que le bucket `applications` n'existe pas dans Supabase Storage.

## ✅ Solution : Créer le Bucket

### Étape 1 : Accéder au Dashboard Supabase

1. Connectez-vous à votre [Dashboard Supabase](https://app.supabase.com)
2. Sélectionnez votre projet
3. Allez dans **Storage** dans le menu de gauche

### Étape 2 : Créer le Bucket

1. Cliquez sur **"New Bucket"** ou **"Create Bucket"**
2. Configurez le bucket avec les paramètres suivants :
   - **Name/ID** : `applications` (exactement comme indiqué, en minuscules)
   - **Public** : `false` (privé - important pour la sécurité)
   - **File size limit** : `104857600` (100MB)
   - **Allowed MIME types** (optionnel mais recommandé) :
     - `application/pdf`
     - `image/jpeg`
     - `image/jpg`
     - `image/png`
     - `video/mp4`
     - `video/quicktime`

3. Cliquez sur **"Create bucket"**

### Étape 3 : Exécuter la Migration SQL

Après avoir créé le bucket, exécutez la migration SQL pour créer les politiques RLS :

1. Allez dans **SQL Editor** dans le menu Supabase
2. Ouvrez le fichier `supabase/migrations/022_create_applications_storage_bucket.sql`
3. Copiez-collez le contenu dans l'éditeur SQL
4. Cliquez sur **"Run"** pour exécuter la migration

### Étape 4 : Vérifier

1. Retournez dans **Storage**
2. Vérifiez que le bucket `applications` apparaît dans la liste
3. Allez dans **Storage → Policies** pour vérifier que les 3 politiques ont été créées :
   - "Anyone can upload application files"
   - "Authenticated users can read application files"
   - "Admins can delete application files"

## 🔒 Sécurité

Les politiques RLS permettent :
- **Tous les utilisateurs** : Upload de fichiers (pour permettre les candidatures sans compte)
- **Utilisateurs authentifiés** : Lecture des fichiers de leurs propres candidatures
- **Admins** : Lecture et suppression de tous les fichiers

## 📝 Notes

- Le bucket doit être **privé** (Public: false) pour la sécurité
- Les fichiers sont organisés par ID de candidature : `applications/{application_id}/{file_type}-{uuid}.{ext}`
- Les URLs signées sont générées automatiquement pour l'accès aux fichiers privés

