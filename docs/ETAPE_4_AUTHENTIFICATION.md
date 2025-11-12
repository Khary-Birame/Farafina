# Étape 4 : Authentification Supabase

## ✅ Ce qui a été implémenté

### 1. Fonctions d'authentification (`lib/auth/auth-helpers.ts`)

- ✅ `signIn()` - Connexion avec email et mot de passe
- ✅ `signUp()` - Création de compte avec validation
- ✅ `signOut()` - Déconnexion
- ✅ `getCurrentUser()` - Récupérer l'utilisateur connecté
- ✅ `isAuthenticated()` - Vérifier si connecté
- ✅ Messages d'erreur en français

### 2. Contexte d'authentification (`lib/auth/auth-context.tsx`)

- ✅ `AuthProvider` - Provider React pour gérer l'état global
- ✅ `useAuth()` - Hook pour accéder à l'utilisateur connecté
- ✅ Écoute des changements d'authentification en temps réel
- ✅ Rafraîchissement automatique de l'utilisateur

### 3. Formulaires connectés

- ✅ **Login** (`components/login/login-form.tsx`)
  - Connexion fonctionnelle
  - Gestion des erreurs
  - Indicateur de chargement
  - Redirection après connexion

- ✅ **Signup** (`components/signup/signup-form.tsx`)
  - Inscription fonctionnelle
  - Validation des données
  - Création dans Supabase Auth + table users
  - Messages de succès/erreur
  - Redirection après inscription

### 4. Intégration dans l'application

- ✅ `AuthProvider` ajouté dans `app/layout.tsx`
- ✅ Disponible dans toute l'application

---

## 🔧 Configuration nécessaire dans Supabase

### Important : Créer un trigger pour synchroniser auth.users et public.users

Par défaut, Supabase crée un utilisateur dans `auth.users` mais pas dans `public.users`. 

**Solution : Exécuter la migration 013**

Exécutez la migration `013_create_auth_trigger.sql` dans Supabase SQL Editor.

**Ou créez manuellement le trigger :**

```sql
-- ============================================
-- TRIGGER : Créer automatiquement un utilisateur dans public.users
-- quand un utilisateur est créé dans auth.users
-- ============================================

-- Fonction qui sera appelée par le trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, email_verified)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.email_confirmed_at IS NOT NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger qui s'exécute après l'insertion dans auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

**Pourquoi ce trigger ?**

- Quand un utilisateur s'inscrit via `signUp()`, Supabase crée un enregistrement dans `auth.users`
- Le trigger crée automatiquement un enregistrement correspondant dans `public.users`
- Cela garantit que chaque utilisateur auth a un enregistrement dans votre table users

**Alternative :** Si vous préférez créer l'utilisateur manuellement dans le code (comme actuellement), vous pouvez garder le code tel quel, mais le trigger est plus robuste.

---

## 🧪 Comment tester

### 1. Tester l'inscription

1. Allez sur `/signup`
2. Remplissez le formulaire :
   - Nom complet
   - Email valide
   - Mot de passe (min 6 caractères)
   - Sélectionnez un rôle
   - Acceptez les conditions
3. Cliquez sur "Créer le Compte"
4. Vous devriez voir un message de succès
5. Vérifiez dans Supabase :
   - **Authentication** → **Users** : Un nouvel utilisateur devrait apparaître
   - **Table Editor** → **users** : Un enregistrement devrait être créé

### 2. Tester la connexion

1. Allez sur `/login`
2. Entrez l'email et le mot de passe créés
3. Cliquez sur "Se Connecter"
4. Vous devriez être redirigé vers la page d'accueil
5. L'utilisateur devrait être connecté

### 3. Vérifier l'état de connexion

Dans n'importe quel composant client, vous pouvez utiliser :

```tsx
"use client"

import { useAuth } from "@/lib/auth/auth-context"

export function MyComponent() {
  const { user, loading } = useAuth()

  if (loading) return <div>Chargement...</div>
  if (!user) return <div>Non connecté</div>

  return <div>Connecté en tant que {user.email}</div>
}
```

---

## 🐛 Problèmes courants et solutions

### Problème 1 : "User already registered"

**Cause** : L'email est déjà utilisé

**Solution** : Utilisez un autre email ou connectez-vous avec l'email existant

---

### Problème 2 : "Invalid login credentials"

**Cause** : Email ou mot de passe incorrect

**Solution** : Vérifiez vos identifiants

---

### Problème 3 : L'utilisateur n'apparaît pas dans la table users

**Cause** : Le trigger n'a pas été créé ou l'insertion a échoué

**Solution** :
1. Vérifiez que le trigger existe dans Supabase
2. Vérifiez les logs Supabase pour voir les erreurs
3. Créez manuellement l'utilisateur dans la table users avec l'ID de auth.users

---

### Problème 4 : "Email not confirmed"

**Cause** : L'email n'a pas été vérifié

**Solution** :
1. Vérifiez votre boîte email (y compris les spams)
2. Cliquez sur le lien de confirmation
3. Ou désactivez la vérification email dans Supabase (pour le développement)

---

## 📝 Prochaines étapes

Une fois l'authentification fonctionnelle :

1. ✅ **Créer un middleware** pour protéger les routes
2. ✅ **Ajouter un bouton de déconnexion** dans le header
3. ✅ **Créer une page de profil** utilisateur
4. ✅ **Gérer la réinitialisation de mot de passe**
5. ✅ **Ajouter la vérification email**

---

## 🔐 Sécurité

- ✅ Les mots de passe sont hashés automatiquement par Supabase
- ✅ Les sessions sont gérées par Supabase (JWT)
- ✅ RLS (Row Level Security) protège les données
- ✅ Les tokens sont stockés de manière sécurisée

---

**Félicitations !** 🎉 L'authentification est maintenant fonctionnelle dans votre application.

