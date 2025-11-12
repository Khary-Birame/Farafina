# Formulaires Connectés à Supabase

## ✅ Formulaires Connectés

Tous les formulaires de l'application sont maintenant connectés à Supabase et stockent leurs données dans la table `form_submissions`.

### 1. **Formulaire de Contact** (`components/contact/contact-form.tsx`)
- **Type** : `contact`
- **Champs** : fullName, email, subject, role, message
- **Fonctionnalités** :
  - ✅ Envoi vers Supabase
  - ✅ Toast de confirmation
  - ✅ Réinitialisation du formulaire après envoi
  - ✅ Indicateur de chargement

### 2. **Formulaire de Partenariat** (`app/partners/page.tsx`)
- **Type** : `partner`
- **Champs** : organizationName, contactName, email, phone, partnershipType, message
- **Fonctionnalités** :
  - ✅ Envoi vers Supabase
  - ✅ Toast de confirmation
  - ✅ Réinitialisation du formulaire après envoi
  - ✅ Indicateur de chargement

### 3. **Newsletter** (`components/contact/newsletter-banner.tsx`)
- **Type** : `newsletter`
- **Champs** : email
- **Fonctionnalités** :
  - ✅ Envoi vers Supabase
  - ✅ Toast de confirmation
  - ✅ Message de succès visuel
  - ✅ Indicateur de chargement

### 4. **Demande de Démo Scouting** (`components/scouting/scouting-cta.tsx`)
- **Type** : `scouting`
- **Champs** : name, email, organization, role, message, consent
- **Fonctionnalités** :
  - ✅ Envoi vers Supabase
  - ✅ Validation du consentement
  - ✅ Toast de confirmation
  - ✅ Réinitialisation du formulaire après envoi
  - ✅ Indicateur de chargement

### 5. **Formulaire de Candidature** (`components/admissions/application-form.tsx`)
- **Type** : `application`
- **Champs** : 
  - Étape 1 : firstName, lastName, age, gender, height, weight, country, email, phone, phone2
  - Étape 2 : program, position, experience, currentClub, motivation, guardian, guardianPhone
  - Étape 3 : birthCertificate, photo, medicalCertificate, video (noms de fichiers pour l'instant)
- **Fonctionnalités** :
  - ✅ Formulaire multi-étapes
  - ✅ Envoi vers Supabase à la dernière étape
  - ✅ Toast de confirmation
  - ✅ Réinitialisation complète après envoi
  - ✅ Indicateur de chargement

### 6. **Login** (`components/login/login-form.tsx`)
- ✅ Déjà connecté à Supabase Auth
- Fonctionne avec l'authentification

### 7. **Signup** (`components/signup/signup-form.tsx`)
- ✅ Déjà connecté à Supabase Auth
- Fonctionne avec l'authentification

## 📊 Structure de la Table `form_submissions`

```sql
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY,
  form_type TEXT NOT NULL, -- 'contact', 'partner', 'application', 'newsletter', 'scouting'
  form_data JSONB NOT NULL, -- Toutes les données du formulaire
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'completed', 'archived'
  user_id UUID REFERENCES users(id), -- Optionnel (peut être NULL)
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## 🔧 Helpers Créés

**Fichier** : `lib/supabase/form-submissions-helpers.ts`

- `createFormSubmission()` : Créer une nouvelle soumission
- `getFormSubmissions()` : Récupérer les soumissions (pour les admins)

## 📝 Migration SQL

**Fichier** : `supabase/migrations/017_create_form_submissions_table.sql`

**À exécuter** :
1. Ouvrir Supabase Dashboard → SQL Editor
2. Exécuter le fichier `017_create_form_submissions_table.sql`
3. Vérifier que la table est créée

## 🧪 Tester les Formulaires

1. **Formulaire de Contact** : `/contact`
2. **Formulaire de Partenariat** : `/partners`
3. **Newsletter** : En bas de la page d'accueil
4. **Demande de Démo Scouting** : Sur la page scouting
5. **Formulaire de Candidature** : `/apply`

## 📋 Prochaines Étapes

1. ✅ Exécuter la migration `017_create_form_submissions_table.sql`
2. ✅ Tester tous les formulaires
3. ⏳ Créer une page admin pour voir toutes les soumissions
4. ⏳ Ajouter RLS policies pour `form_submissions`
5. ⏳ Implémenter l'upload de fichiers pour le formulaire de candidature

## ⚠️ Notes Importantes

- Les fichiers du formulaire de candidature sont stockés comme noms seulement pour l'instant
- L'upload de fichiers nécessitera Supabase Storage (à implémenter plus tard)
- Tous les formulaires peuvent être soumis sans être connecté (user_id peut être NULL)
- Les soumissions sont stockées avec le statut `pending` par défaut

