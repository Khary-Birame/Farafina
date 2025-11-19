# Backend du Formulaire de Candidature

## ✅ Implémentation Complète

Le backend du formulaire de candidature est maintenant entièrement implémenté avec :
- ✅ Validation des données
- ✅ Upload des fichiers vers Supabase Storage
- ✅ Gestion des erreurs
- ✅ Liaison des inputs au state

## 📁 Fichiers Créés/Modifiés

### 1. **Helper pour les Applications** (`lib/supabase/application-helpers.ts`)

Fonctions principales :
- `validateApplicationData()` : Valide toutes les données de candidature
- `uploadApplicationFile()` : Upload un fichier vers Supabase Storage
- `submitApplication()` : Soumet une candidature complète avec upload des fichiers

### 2. **Formulaire de Candidature** (`components/admissions/application-form.tsx`)

Améliorations :
- ✅ Tous les inputs sont liés au state avec `value` et `onChange`
- ✅ Validation en temps réel par étape
- ✅ Gestion des fichiers avec prévisualisation
- ✅ Affichage des erreurs de validation
- ✅ Utilisation de `submitApplication()` pour l'upload complet

### 3. **Migration SQL** (`supabase/migrations/022_create_applications_storage_bucket.sql`)

Crée :
- Le bucket `applications` dans Supabase Storage
- Les politiques RLS pour sécuriser l'accès aux fichiers

## 🚀 Configuration Requise

### 1. Créer le Bucket dans Supabase

**IMPORTANT** : Les buckets doivent être créés manuellement via le Dashboard Supabase.

1. Aller dans **Supabase Dashboard → Storage**
2. Cliquer sur **"New Bucket"**
3. Configurer le bucket :
   - **Name/ID** : `applications`
   - **Public** : `false` (privé)
   - **File size limit** : `104857600` (100MB)
   - **Allowed MIME types** : 
     - `application/pdf`
     - `image/jpeg`
     - `image/jpg`
     - `image/png`
     - `video/mp4`
     - `video/quicktime`

### 2. Exécuter la Migration SQL

Dans Supabase Dashboard → SQL Editor :

```sql
-- Exécuter le fichier : supabase/migrations/022_create_applications_storage_bucket.sql
```

Ou via la CLI Supabase :

```bash
supabase db push
```

Cette migration crée les politiques RLS pour sécuriser l'accès aux fichiers.

### 3. Vérifier le Bucket et les Politiques

1. Aller dans Supabase Dashboard → Storage
2. Vérifier que le bucket `applications` existe
3. Aller dans **Storage → Policies** pour vérifier les politiques créées

Les politiques permettent :
- **Tous les utilisateurs** : Upload de fichiers pour les candidatures
- **Utilisateurs authentifiés** : Lecture des fichiers de leurs propres candidatures
- **Admins** : Lecture et suppression de tous les fichiers

## 📋 Structure des Données

### Données Stockées dans `form_submissions`

```json
{
  "form_type": "application",
  "form_data": {
    "firstName": "John",
    "lastName": "Doe",
    "age": "15",
    "gender": "male",
    "height": "175",
    "weight": "70",
    "country": "senegal",
    "email": "john@example.com",
    "phone": "+221771234567",
    "phone2": "",
    "program": "resident",
    "position": "forward",
    "experience": "5",
    "currentClub": "Club ABC",
    "motivation": "Je veux devenir professionnel...",
    "guardian": "Jane Doe",
    "guardianPhone": "+221771234568",
    "birthCertificate": "https://...", // URL après upload
    "photo": "https://...",
    "medicalCertificate": "https://...",
    "video": "https://..."
  },
  "status": "pending",
  "user_id": "uuid-ou-null"
}
```

### Structure des Fichiers dans Storage

```
applications/
  └── {application_id}/
      ├── birthCertificate.pdf
      ├── photo.jpg
      ├── medicalCertificate.pdf
      └── video.mp4
```

## 🔒 Sécurité

### Validation Côté Client
- ✅ Validation en temps réel par étape
- ✅ Messages d'erreur clairs
- ✅ Empêche la soumission si erreurs

### Validation Côté Serveur
- ✅ Validation complète avant insertion
- ✅ Vérification des types de fichiers
- ✅ Vérification de la taille des fichiers (10MB pour documents, 100MB pour vidéos)

### Stockage
- ✅ Bucket privé (non accessible publiquement)
- ✅ RLS policies pour contrôler l'accès
- ✅ Fichiers organisés par ID de candidature

## 📝 Types de Fichiers Autorisés

### Acte de Naissance
- Formats : PDF, JPG, JPEG, PNG
- Taille max : 10MB

### Photo
- Formats : JPG, JPEG, PNG
- Taille max : 10MB

### Certificat Médical
- Formats : PDF, JPG, JPEG, PNG
- Taille max : 10MB

### Vidéo
- Formats : MP4, MOV
- Taille max : 100MB

## 🧪 Tester le Formulaire

1. Aller sur `/apply` ou `/admissions`
2. Remplir le formulaire étape par étape
3. Uploader les fichiers à l'étape 3
4. Soumettre la candidature
5. Vérifier dans Supabase :
   - Table `form_submissions` : La candidature doit apparaître
   - Storage `applications` : Les fichiers doivent être uploadés

## 🔍 Vérification des Erreurs

### Erreurs Communes

1. **Bucket non créé**
   - Solution : Exécuter la migration SQL

2. **Politiques RLS bloquantes**
   - Solution : Vérifier les politiques dans Supabase Dashboard

3. **Fichier trop volumineux**
   - Solution : Réduire la taille du fichier ou augmenter la limite dans la migration

4. **Type de fichier non autorisé**
   - Solution : Vérifier que le fichier est dans les formats autorisés

## 📊 Prochaines Étapes

1. ⏳ Créer une page admin pour voir toutes les candidatures
2. ⏳ Ajouter des notifications email lors de la soumission
3. ⏳ Ajouter la possibilité de télécharger les fichiers depuis l'admin
4. ⏳ Ajouter un système de statut (en attente, accepté, refusé)

## 🛠️ Fonctions Utiles

### Récupérer une Candidature

```typescript
import { getFormSubmissions } from "@/lib/supabase/form-submissions-helpers"

const { data, error } = await getFormSubmissions({
  formType: "application",
  status: "pending",
  limit: 10
})
```

### Mettre à Jour le Statut

```typescript
import { supabase } from "@/lib/supabase/client"

await supabase
  .from("form_submissions")
  .update({ status: "reviewed" })
  .eq("id", applicationId)
```

