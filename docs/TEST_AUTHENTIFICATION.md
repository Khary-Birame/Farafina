# Guide de Test : Authentification Supabase

Ce guide vous explique comment tester l'authentification dans votre application.

---

## ✅ Prérequis

- ✅ Migration 013 exécutée (trigger auth.users → public.users)
- ✅ Serveur Next.js en cours d'exécution (`npm run dev`)
- ✅ Variables d'environnement configurées

---

## 🧪 Test 1 : Inscription (Sign Up)

### Étapes :

1. **Allez sur** : `http://localhost:3000/signup`

2. **Remplissez le formulaire** :
   - **Nom complet** : "Test Utilisateur"
   - **Email** : `test@example.com` (utilisez un email valide)
   - **Mot de passe** : `test123456` (minimum 6 caractères)
   - **Confirmer le mot de passe** : `test123456`
   - **Rôle** : Sélectionnez "Joueur / Étudiant"
   - **Cochez** "J'accepte les conditions"

3. **Cliquez sur** "Créer le Compte"

4. **Résultat attendu** :
   - ✅ Message vert "Compte créé avec succès !"
   - ✅ Redirection automatique vers la page d'accueil après 2 secondes
   - ✅ Dans le header, vous devriez voir votre nom au lieu de "Connexion"

5. **Vérification dans Supabase** :
   - **Authentication** → **Users** : Un nouvel utilisateur devrait apparaître
   - **Table Editor** → **users** : Un enregistrement avec votre email et rôle devrait être créé

---

## 🧪 Test 2 : Connexion (Login)

### Étapes :

1. **Déconnectez-vous** (si vous êtes connecté) :
   - Cliquez sur votre nom dans le header
   - Cliquez sur "Se déconnecter"

2. **Allez sur** : `http://localhost:3000/login`

3. **Remplissez le formulaire** :
   - **Email** : `test@example.com` (celui que vous avez créé)
   - **Mot de passe** : `test123456`

4. **Cliquez sur** "Se Connecter"

5. **Résultat attendu** :
   - ✅ Redirection vers la page d'accueil
   - ✅ Dans le header, vous devriez voir votre nom au lieu de "Connexion"
   - ✅ En cliquant sur votre nom, un menu déroulant apparaît avec :
     - Votre nom et email
     - Votre rôle
     - "Mon Profil"
     - "Se déconnecter"

---

## 🧪 Test 3 : Déconnexion (Logout)

### Étapes :

1. **Assurez-vous d'être connecté**

2. **Cliquez sur votre nom** dans le header (desktop) ou ouvrez le menu mobile

3. **Cliquez sur** "Se déconnecter"

4. **Résultat attendu** :
   - ✅ Redirection vers la page d'accueil
   - ✅ Le header affiche "Connexion" au lieu de votre nom
   - ✅ Vous n'êtes plus connecté

---

## 🧪 Test 4 : Gestion des Erreurs

### Test 4.1 : Email déjà utilisé

1. **Allez sur** `/signup`
2. **Essayez de créer un compte** avec un email déjà utilisé
3. **Résultat attendu** :
   - ❌ Message d'erreur : "Cet email est déjà utilisé"

### Test 4.2 : Mot de passe incorrect

1. **Allez sur** `/login`
2. **Entrez un email valide** mais un **mot de passe incorrect**
3. **Résultat attendu** :
   - ❌ Message d'erreur : "Email ou mot de passe incorrect"

### Test 4.3 : Email invalide

1. **Allez sur** `/signup`
2. **Entrez un email invalide** (ex: `test`)
3. **Résultat attendu** :
   - ❌ Le navigateur affiche une erreur de validation HTML
   - ❌ Ou message d'erreur : "Adresse email invalide"

### Test 4.4 : Mot de passe trop court

1. **Allez sur** `/signup`
2. **Entrez un mot de passe de moins de 6 caractères**
3. **Résultat attendu** :
   - ❌ Message d'erreur : "Le mot de passe doit contenir au moins 6 caractères"

---

## 🧪 Test 5 : Persistance de Session

### Étapes :

1. **Connectez-vous** avec vos identifiants

2. **Fermez l'onglet du navigateur** (ne fermez pas complètement le navigateur)

3. **Rouvrez un nouvel onglet** et allez sur `http://localhost:3000`

4. **Résultat attendu** :
   - ✅ Vous devriez toujours être connecté
   - ✅ Votre nom apparaît dans le header

5. **Rafraîchissez la page** (F5)

6. **Résultat attendu** :
   - ✅ Vous restez connecté

---

## 🧪 Test 6 : Header Dynamique

### Test 6.1 : Utilisateur non connecté

1. **Assurez-vous d'être déconnecté**

2. **Vérifiez le header** :
   - ✅ Desktop : Bouton "Connexion" visible
   - ✅ Mobile : Icône utilisateur visible
   - ✅ Menu mobile : Bouton "Connexion" visible

### Test 6.2 : Utilisateur connecté

1. **Connectez-vous**

2. **Vérifiez le header** :
   - ✅ Desktop : Votre nom visible (clic pour menu déroulant)
   - ✅ Mobile : Icône utilisateur (lien vers profil)
   - ✅ Menu mobile : Votre nom, email, rôle + boutons "Mon Profil" et "Se déconnecter"

---

## ✅ Checklist de Vérification

Avant de considérer que tout fonctionne, vérifiez :

- [ ] L'inscription crée un compte dans Supabase Auth
- [ ] L'inscription crée un enregistrement dans la table `users`
- [ ] La connexion fonctionne avec les identifiants créés
- [ ] La déconnexion fonctionne
- [ ] Le header affiche correctement l'état de connexion
- [ ] Les erreurs sont affichées de manière claire
- [ ] La session persiste après rafraîchissement
- [ ] Le menu utilisateur (desktop) fonctionne
- [ ] Le menu mobile affiche les bonnes options selon l'état de connexion

---

## 🐛 Problèmes Courants

### Problème 1 : "User already registered" lors de l'inscription

**Cause** : L'email est déjà utilisé

**Solution** : Utilisez un autre email ou connectez-vous avec l'email existant

---

### Problème 2 : L'utilisateur n'apparaît pas dans la table users

**Cause** : Le trigger n'a pas été créé ou ne fonctionne pas

**Solution** :
1. Vérifiez que la migration 013 a été exécutée
2. Vérifiez dans Supabase → Database → Functions que `handle_new_user` existe
3. Vérifiez dans Supabase → Database → Triggers que `on_auth_user_created` existe

---

### Problème 3 : "Invalid login credentials"

**Cause** : Email ou mot de passe incorrect

**Solution** :
1. Vérifiez vos identifiants
2. Vérifiez que l'email est bien celui utilisé lors de l'inscription
3. Vérifiez que le mot de passe est correct (attention aux majuscules/minuscules)

---

### Problème 4 : Le header ne se met pas à jour après connexion

**Cause** : Le contexte d'authentification ne se rafraîchit pas

**Solution** :
1. Rafraîchissez la page (F5)
2. Vérifiez la console du navigateur pour des erreurs
3. Vérifiez que `AuthProvider` est bien dans `app/layout.tsx`

---

## 📝 Notes Importantes

### Email de Confirmation

Par défaut, Supabase envoie un email de confirmation. Pour le développement :

1. **Option 1** : Vérifier votre boîte email (y compris les spams)
2. **Option 2** : Désactiver la vérification email dans Supabase :
   - Dashboard → Authentication → Settings
   - Désactiver "Enable email confirmations"

### Rôles Disponibles

Les rôles disponibles sont :
- `player` - Joueur / Étudiant
- `parent` - Parent / Tuteur
- `coach` - Entraîneur / Recruteur
- `club` - Club / Recruteur
- `admin` - Administrateur

---

## 🎉 Félicitations !

Si tous les tests passent, votre authentification est fonctionnelle ! 🚀

**Prochaine étape** : Créer une page de profil utilisateur et connecter les fonctionnalités (liste des joueurs, messages, etc.)

