# 🔐 Comment Récupérer la Service Role Key

## ⚠️ IMPORTANT : Sécurité

La **Service Role Key** est une clé **PRIVÉE** qui donne un accès administrateur complet à votre base de données.

**NE JAMAIS :**
- ❌ La partager publiquement
- ❌ La mettre dans le code source
- ❌ La commiter sur GitHub
- ❌ L'utiliser côté client (navigateur)

**UTILISER UNIQUEMENT :**
- ✅ Côté serveur (API routes, Server Components)
- ✅ Pour les opérations administratives
- ✅ Pour les migrations de données

---

## 📋 Étapes pour Récupérer la Clé

### 1. Aller dans Supabase Dashboard

1. Connectez-vous sur [supabase.com](https://supabase.com)
2. Sélectionnez votre projet

### 2. Accéder aux Settings API

1. Dans le menu de gauche, cliquez sur **Settings** (⚙️)
2. Cliquez sur **API**

### 3. Trouver la Service Role Key

Vous verrez deux clés :

#### **anon / public key** (Déjà dans .env.local ✅)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
➡️ C'est la clé que vous avez déjà partagée (c'est OK, elle est publique)

#### **service_role key** (À récupérer ⚠️)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
➡️ C'est cette clé qu'il faut récupérer

### 4. Copier la Clé

1. Cliquez sur l'icône **👁️** (oeil) à côté de "service_role key" pour la révéler
2. Cliquez sur l'icône **📋** (copier) pour copier la clé
3. **NE PARTAGEZ PAS** cette clé publiquement !

### 5. Ajouter dans .env.local

Ouvrez votre fichier `.env.local` et ajoutez la clé :

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (votre clé complète)
```

---

## ✅ Vérification

Une fois la clé ajoutée :

1. **Redémarrer le serveur** :
   ```bash
   # Arrêter (Ctrl+C) puis relancer
   npm run dev
   ```

2. **Tester la connexion** :
   - Aller sur `http://localhost:3000/test-supabase`
   - Vérifier que tout fonctionne

---

## 🎯 Pourquoi Deux Clés ?

### Anon Key (Publique)
- ✅ Peut être utilisée côté client
- ✅ Sécurisée grâce au Row Level Security (RLS)
- ✅ Permissions limitées selon l'utilisateur connecté
- ✅ Visible dans le code source (c'est normal)

### Service Role Key (Privée)
- ⚠️ Uniquement côté serveur
- ⚠️ Accès administrateur complet
- ⚠️ Contourne le RLS
- ⚠️ Doit rester secrète

---

## 🔒 Bonnes Pratiques

1. ✅ Garder `.env.local` dans `.gitignore` (déjà fait)
2. ✅ Ne jamais commiter les fichiers `.env*`
3. ✅ Utiliser la Service Role Key uniquement côté serveur
4. ✅ Régénérer la clé si elle est compromise

---

**Une fois la clé ajoutée, on pourra passer à l'étape suivante !** 🚀

