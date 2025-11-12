# Configuration Supabase - Guide Étape par Étape

## 📋 Prérequis

Avant de continuer, vous devez avoir :
1. ✅ Un compte Supabase (gratuit sur [supabase.com](https://supabase.com))
2. ✅ Un projet Supabase créé
3. ✅ Les clés API de votre projet

---

## 🔑 Étape 1 : Récupérer vos clés Supabase

### 1.1 Aller sur votre projet Supabase

1. Connectez-vous sur [supabase.com](https://supabase.com)
2. Sélectionnez votre projet (ou créez-en un nouveau)

### 1.2 Trouver les clés API

1. Dans le menu de gauche, cliquez sur **Settings** (⚙️)
2. Cliquez sur **API**
3. Vous verrez deux sections importantes :

#### **Project URL**
```
https://xxxxxxxxxxxxx.supabase.co
```
➡️ C'est votre `NEXT_PUBLIC_SUPABASE_URL`

#### **API Keys**

**anon / public key** (Clé anonyme)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTg3Njg4MCwiZXhwIjoxOTYxNDUyODgwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
➡️ C'est votre `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**service_role key** (Clé service - ⚠️ SECRÈTE)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQ1ODc2ODgwLCJleHAiOjE5NjE0NTI4ODB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
➡️ C'est votre `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **IMPORTANT** : Ne partagez JAMAIS la clé `service_role` ! Elle donne un accès total à votre base de données.

---

## 📝 Étape 2 : Créer le fichier .env.local

### 2.1 Créer le fichier

À la racine de votre projet, créez un fichier nommé `.env.local`

### 2.2 Ajouter les variables

Copiez ce template et remplacez par vos vraies valeurs :

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================

# URL de votre projet Supabase
# Format : https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co

# Clé anonyme (publique mais sécurisée via RLS)
# Trouvable dans Supabase → Settings → API → anon / public key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Clé service (PRIVÉE - uniquement côté serveur)
# Trouvable dans Supabase → Settings → API → service_role key
# ⚠️ NE JAMAIS exposer cette clé côté client !
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================
# SITE CONFIGURATION
# ============================================

# URL de votre site (pour les redirections auth)
# En développement : http://localhost:3000
# En production : https://votre-domaine.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2.3 Exemple complet

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTg3Njg4MCwiZXhwIjoxOTYxNDUyODgwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQ1ODc2ODgwLCJleHAiOjE5NjE0NTI4ODB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## ✅ Étape 3 : Vérifier la configuration

### 3.1 Redémarrer le serveur de développement

Après avoir créé/modifié `.env.local`, vous DEVEZ redémarrer Next.js :

```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer
npm run dev
```

**Pourquoi ?** Next.js charge les variables d'environnement au démarrage.

### 3.2 Tester la connexion

On va créer une page de test pour vérifier que tout fonctionne.

---

## 🔍 Comprendre les Variables

### NEXT_PUBLIC_SUPABASE_URL

- **NEXT_PUBLIC_** : Préfixe qui signifie "accessible côté client"
- Cette variable peut être utilisée dans le navigateur
- Contient l'URL de votre projet Supabase

### NEXT_PUBLIC_SUPABASE_ANON_KEY

- **Anon** = Anonyme
- Clé publique (visible dans le code source)
- **Mais sécurisée** grâce au Row Level Security (RLS)
- Permet de faire des requêtes avec les permissions de l'utilisateur connecté

### SUPABASE_SERVICE_ROLE_KEY

- **Service Role** = Rôle service
- Clé PRIVÉE (ne doit JAMAIS être dans le code client)
- Donne un accès administrateur complet
- Utilisée uniquement côté serveur (API routes, Server Components)
- Contourne le RLS (Row Level Security)

### NEXT_PUBLIC_SITE_URL

- URL de votre site
- Utilisée pour les redirections après authentification
- Change selon l'environnement (dev/prod)

---

## 🛡️ Sécurité

### ✅ À FAIRE

- ✅ Garder `.env.local` dans `.gitignore` (déjà fait)
- ✅ Utiliser `NEXT_PUBLIC_` uniquement pour les variables publiques
- ✅ Utiliser `SUPABASE_SERVICE_ROLE_KEY` uniquement côté serveur
- ✅ Ne jamais commiter les fichiers `.env*`

### ❌ À NE PAS FAIRE

- ❌ Partager vos clés publiquement
- ❌ Utiliser `SUPABASE_SERVICE_ROLE_KEY` côté client
- ❌ Commiter `.env.local` sur GitHub
- ❌ Mettre les clés dans le code source

---

## 🐛 Dépannage

### Erreur : "Variables Supabase manquantes"

**Cause :** Les variables d'environnement ne sont pas chargées.

**Solution :**
1. Vérifier que `.env.local` existe à la racine du projet
2. Vérifier que les noms des variables sont exacts (copier-coller)
3. Redémarrer le serveur Next.js (`npm run dev`)

### Erreur : "Invalid API key"

**Cause :** La clé API est incorrecte ou expirée.

**Solution :**
1. Vérifier que vous avez copié la bonne clé dans Supabase
2. Vérifier qu'il n'y a pas d'espaces avant/après la clé
3. Régénérer la clé dans Supabase si nécessaire

### Erreur : "Failed to fetch"

**Cause :** L'URL Supabase est incorrecte ou le projet n'existe plus.

**Solution :**
1. Vérifier l'URL dans Supabase → Settings → API
2. Vérifier que le projet est actif
3. Vérifier votre connexion internet

---

## 📚 Prochaine Étape

Une fois la configuration terminée, on passera à :
**Étape 2 : Créer le schéma de base de données**

---

**Questions ?** N'hésitez pas à demander ! 😊

