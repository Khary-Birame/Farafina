# Étape 1 : Installation et Configuration de Base

## 🎯 Objectif de cette étape

Comprendre et installer Supabase dans votre projet Next.js.

---

## 📖 Qu'est-ce qu'on va faire ?

1. **Installer le package Supabase** : Le client JavaScript pour communiquer avec Supabase
2. **Créer un fichier de configuration** : Pour centraliser la connexion à Supabase
3. **Configurer les variables d'environnement** : Pour stocker les clés secrètes
4. **Tester la connexion** : Vérifier que tout fonctionne

---

## 🔍 Explication : Comment fonctionne Supabase ?

### Architecture Simple

```
┌─────────────────┐
│  Votre App      │
│  (Next.js)      │
└────────┬────────┘
         │
         │ Requêtes HTTP
         │ (via @supabase/supabase-js)
         │
         ▼
┌─────────────────┐
│   Supabase      │
│   (Cloud)       │
│                 │
│  - Base de      │
│    données      │
│  - Auth         │
│  - Storage      │
└─────────────────┘
```

### Le Client Supabase

Le client Supabase est une bibliothèque JavaScript qui :
- Se connecte à votre projet Supabase
- Envoie des requêtes HTTP
- Gère l'authentification
- Fournit des types TypeScript

### Variables d'Environnement

Les variables d'environnement stockent des informations sensibles :
- **URL du projet** : L'adresse de votre base Supabase
- **Clé anonyme (Anon Key)** : Clé publique, peut être utilisée côté client
- **Clé service (Service Role Key)** : Clé privée, uniquement côté serveur

**Pourquoi séparer ?**
- **Anon Key** : Limite les permissions (via RLS)
- **Service Role Key** : Accès total (danger si exposée côté client)

---

## 📝 Étapes Détaillées

### 1. Installer le package Supabase

```bash
npm install @supabase/supabase-js
```

**Explication :**
- `@supabase/supabase-js` : Le client officiel Supabase
- Permet de faire des requêtes à votre base de données
- Gère l'authentification automatiquement

### 2. Créer le fichier de configuration

On va créer `lib/supabase/client.ts` pour le client côté navigateur.

**Pourquoi un fichier séparé ?**
- Réutilisable partout dans l'app
- Configuration centralisée
- Facile à maintenir

### 3. Créer le fichier serveur

On va créer `lib/supabase/server.ts` pour les requêtes côté serveur.

**Différence client/serveur :**
- **Client** : Utilisé dans les composants React (côté navigateur)
- **Serveur** : Utilisé dans les API routes et Server Components (côté serveur)

### 4. Configurer les variables d'environnement

Créer `.env.local` avec vos clés Supabase.

**Sécurité :**
- `.env.local` est dans `.gitignore` (pas commité)
- Les clés restent secrètes
- Chaque environnement a ses propres clés

---

## ✅ Résultat Attendu

Après cette étape, vous aurez :
- ✅ Supabase installé
- ✅ Configuration prête
- ✅ Connexion testée
- ✅ Compréhension de la structure

---

## 🚀 Prêt pour l'étape suivante ?

Une fois cette étape terminée, on passera à la création du schéma de base de données !

