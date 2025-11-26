# Guide de Déploiement sur Vercel

Ce guide explique comment déployer l'application Farafina Foot Academy sur Vercel et configurer toutes les variables d'environnement nécessaires.

## 📋 Prérequis

1. Un compte Vercel (gratuit ou payant)
2. Un compte Supabase
3. Un compte email avec accès SMTP (Gmail, Outlook, etc.)

## 🚀 Déploiement Initial

### 1. Connecter votre dépôt GitHub à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Add New Project"
3. Importez votre dépôt GitHub
4. Vercel détectera automatiquement Next.js

### 2. Configuration du Build

Vercel détecte automatiquement Next.js, mais vous pouvez vérifier :
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (par défaut)
- **Output Directory**: `.next` (par défaut)
- **Install Command**: `npm install` (par défaut)

## 🔐 Configuration des Variables d'Environnement

### Variables Obligatoires

Vous devez configurer ces variables dans les paramètres de votre projet Vercel :

#### 1. Supabase

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_supabase
```

**Où les trouver :**
- Allez sur votre projet Supabase
- Settings → API
- Copiez "Project URL" et "anon public" key

#### 2. Configuration Email (CRITIQUE pour les formulaires)

```
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application
EMAIL_TO=destinataire@example.com
```

**Pour Gmail :**
1. Activez la validation en 2 étapes sur votre compte Google
2. Générez un "Mot de passe d'application" :
   - Allez sur https://myaccount.google.com/apppasswords
   - Sélectionnez "Autre (nom personnalisé)" et entrez "Farafina Contact"
   - Copiez le mot de passe généré (16 caractères, format : `xxxx xxxx xxxx xxxx`)
3. Utilisez ce mot de passe dans `EMAIL_PASS` (sans les espaces)

**Pour Outlook/Office 365 :**
```
EMAIL_USER=votre_email@outlook.com
EMAIL_PASS=votre_mot_de_passe
EMAIL_TO=destinataire@example.com
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

#### 3. URL du Site (OPTIONNEL mais RECOMMANDÉ)

**⚠️ IMPORTANT :** Ne définissez PAS `NEXT_PUBLIC_SITE_URL` à `http://localhost:3000` sur Vercel !

Le code utilise automatiquement `VERCEL_URL` si `NEXT_PUBLIC_SITE_URL` n'est pas défini. Vous avez deux options :

**Option 1 (Recommandée) : Ne pas définir `NEXT_PUBLIC_SITE_URL`**
- Le code utilisera automatiquement `VERCEL_URL` qui est fourni automatiquement par Vercel
- Cela fonctionne pour tous les environnements (Production, Preview, Development)

**Option 2 : Définir avec l'URL de production**
```
NEXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app
```

Ou si vous avez un domaine personnalisé :
```
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

**⚠️ Pourquoi c'est important :**
- Cette URL est utilisée dans les emails envoyés (liens vers les candidatures, logo, etc.)
- Si elle pointe vers `localhost:3000`, les liens dans les emails ne fonctionneront pas sur mobile ou depuis d'autres appareils
- Les formulaires peuvent sembler fonctionner mais les emails contiendront des liens cassés

### Variables Optionnelles

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

Ces variables sont optionnelles car Gmail est utilisé par défaut.

## 📝 Comment Ajouter les Variables sur Vercel

1. Allez sur votre projet Vercel
2. Cliquez sur **Settings** (Paramètres)
3. Cliquez sur **Environment Variables** (Variables d'environnement)
4. Ajoutez chaque variable :
   - **Name** : Le nom de la variable (ex: `EMAIL_USER`)
   - **Value** : La valeur de la variable
   - **Environment** : Sélectionnez où appliquer :
     - ✅ Production
     - ✅ Preview
     - ✅ Development (optionnel)
5. Cliquez sur **Save**

### ⚠️ Important : Redéployer après Ajout de Variables

Après avoir ajouté ou modifié des variables d'environnement :
1. Allez dans l'onglet **Deployments**
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Cliquez sur **Redeploy**
4. Ou créez un nouveau commit et poussez-le sur GitHub

## 🧪 Test de la Configuration

### Test des Variables d'Environnement

1. Après le déploiement, testez le formulaire de contact
2. Vérifiez les logs Vercel :
   - Allez dans **Deployments**
   - Cliquez sur le dernier déploiement
   - Cliquez sur **Functions** → `api/visite`
   - Vérifiez les logs pour des erreurs

### Test de l'Envoi d'Email

1. Remplissez le formulaire de demande de visite
2. Vérifiez que :
   - ✅ L'email arrive dans la boîte `EMAIL_TO`
   - ✅ L'accusé de réception arrive à l'email du visiteur
   - ✅ Aucune erreur dans les logs Vercel

## 🔍 Dépannage

### Erreur "Configuration email manquante"

**Cause :** Les variables `EMAIL_USER`, `EMAIL_PASS`, ou `EMAIL_TO` ne sont pas configurées sur Vercel.

**Solution :**
1. Vérifiez que les 3 variables sont bien ajoutées dans Vercel
2. Vérifiez qu'elles sont activées pour **Production**
3. **Redéployez** l'application après avoir ajouté les variables

### Erreur "EAUTH" (Authentification)

**Cause :** Les identifiants email sont incorrects.

**Solution :**
- Pour Gmail : Utilisez un "Mot de passe d'application", pas votre mot de passe principal
- Vérifiez que la validation en 2 étapes est activée (Gmail)
- Vérifiez que `EMAIL_USER` et `EMAIL_PASS` sont corrects

### Erreur "ECONNECTION" (Connexion)

**Cause :** Problème de connexion au serveur SMTP.

**Solution :**
- Vérifiez `EMAIL_HOST` et `EMAIL_PORT`
- Vérifiez votre connexion internet
- Vérifiez que le pare-feu n'bloque pas les connexions SMTP

### Les emails ne sont pas reçus

**Vérifications :**
1. ✅ Vérifiez le dossier spam
2. ✅ Vérifiez que `EMAIL_TO` est correct
3. ✅ Vérifiez les logs Vercel pour des erreurs
4. ✅ Testez avec un autre compte email

## 📊 Vérification des Variables Configurées

Pour vérifier que toutes les variables sont bien configurées, vous pouvez :

1. **Via l'interface Vercel :**
   - Settings → Environment Variables
   - Vérifiez que toutes les variables sont listées

2. **Via les logs :**
   - Si une variable manque, vous verrez une erreur dans les logs
   - Les logs indiquent généralement quelle variable manque

## 🔄 Mise à Jour des Variables

Pour mettre à jour une variable :

1. Allez dans Settings → Environment Variables
2. Trouvez la variable à modifier
3. Cliquez sur **Edit**
4. Modifiez la valeur
5. Cliquez sur **Save**
6. **Redéployez** l'application

## 📚 Ressources

- [Documentation Vercel - Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Documentation Email Configuration](./EMAIL_CONFIGURATION.md)
- [Documentation Supabase](https://supabase.com/docs)

## ✅ Checklist de Déploiement

Avant de mettre en production, vérifiez :

- [ ] Variables Supabase configurées
- [ ] Variables Email configurées (`EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO`)
- [ ] `NEXT_PUBLIC_SITE_URL` **N'EST PAS** défini à `http://localhost:3000` sur Vercel
- [ ] Test du formulaire de contact réussi
- [ ] Test de l'envoi d'email réussi
- [ ] Les liens dans les emails pointent vers l'URL de production (pas localhost)
- [ ] Aucune erreur dans les logs Vercel
- [ ] Le logo `ffa.png` est accessible (dans `public/`)
- [ ] Test sur mobile : les formulaires fonctionnent et les liens dans les emails sont accessibles

## ⚠️ Problème Courant : localhost dans les URLs

Si vous rencontrez des problèmes avec les formulaires sur mobile ou si les liens dans les emails pointent vers `localhost:3000`, consultez [FIX_LOCALHOST_URL.md](./FIX_LOCALHOST_URL.md) pour la solution.

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs Vercel
2. Vérifiez la documentation [EMAIL_CONFIGURATION.md](./EMAIL_CONFIGURATION.md)
3. Vérifiez que toutes les variables sont bien configurées
4. Testez en local avec `.env.local` pour isoler le problème

