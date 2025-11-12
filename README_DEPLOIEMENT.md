# 🚀 Guide de Déploiement sur Vercel

## ✅ Prérequis

- ✅ Build réussi en local (`npm run build`)
- ✅ Compte Vercel (gratuit)
- ✅ Repository GitHub/GitLab/Bitbucket
- ✅ Variables d'environnement Supabase

## 📋 Étapes Rapides

### 1. Préparer le Repository

Assurez-vous que votre code est sur GitHub/GitLab/Bitbucket :

```bash
# Vérifier que tout est commité
git status

# Si nécessaire, commit et push
git add .
git commit -m "Préparation pour déploiement Vercel"
git push
```

### 2. Créer un Projet sur Vercel

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Se connecter** avec GitHub/GitLab/Bitbucket
3. **Cliquer sur "Add New Project"**
4. **Sélectionner votre repository**
5. **Vercel détectera automatiquement Next.js** ✅

### 3. Configurer les Variables d'Environnement

Dans la section **"Environment Variables"**, ajouter :

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key_ici
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_ici
```

⚠️ **IMPORTANT** :
- `NEXT_PUBLIC_*` = Variables accessibles côté client (publiques)
- `SUPABASE_SERVICE_ROLE_KEY` = **SECRÈTE** (ne jamais exposer publiquement)

### 4. Configurer le Build

Vercel détecte automatiquement Next.js, mais vérifiez :

- **Framework Preset** : Next.js
- **Build Command** : `npm run build` (par défaut)
- **Output Directory** : `.next` (par défaut)
- **Install Command** : `npm install` (par défaut)

### 5. Déployer

1. **Cliquer sur "Deploy"**
2. **Attendre la fin du build** (2-5 minutes)
3. **Votre app sera disponible sur** : `votre-projet.vercel.app`

## 🔧 Configuration Avancée

### Variables d'Environnement par Environnement

Dans Vercel, vous pouvez définir des variables différentes pour :

- **Production** : Variables pour `main/master` branch
- **Preview** : Variables pour les autres branches
- **Development** : Variables pour `vercel dev` (local)

### Domaine Personnalisé

1. **Dans Vercel Dashboard** → **Settings** → **Domains**
2. **Ajouter votre domaine** (ex: `farafinafootacademy.com`)
3. **Configurer le DNS** :
   - Ajouter un **CNAME** pointant vers `cname.vercel-dns.com`
   - Ou un **A record** avec l'IP fournie par Vercel
4. **SSL automatique** : Vercel configure HTTPS automatiquement ✅

## 📊 Vérifications Post-Déploiement

### Checklist

- [ ] Le build réussit sans erreurs
- [ ] L'application se charge correctement
- [ ] Les variables d'environnement sont configurées
- [ ] L'authentification fonctionne (login/signup)
- [ ] Les formulaires fonctionnent (contact, partenariat, etc.)
- [ ] Le changement de langue fonctionne
- [ ] Les images se chargent correctement
- [ ] Les routes API fonctionnent (`/api/*`)

### Tester les Fonctionnalités

1. **Page d'accueil** : Vérifier que tout s'affiche
2. **Authentification** : Créer un compte et se connecter
3. **Formulaires** : Tester le formulaire de contact
4. **Changement de langue** : Tester le sélecteur de langue
5. **Profil** : Vérifier la page de profil utilisateur

## 🐛 Résolution de Problèmes

### Erreur : "Environment variable not found"

**Solution** :
1. Vérifier dans **Vercel Dashboard** → **Settings** → **Environment Variables**
2. S'assurer que les variables sont définies pour **Production**
3. Redéployer après avoir ajouté les variables

### Erreur : "Build failed"

**Solution** :
1. Vérifier les **logs de build** dans Vercel
2. Tester le build en local : `npm run build`
3. Vérifier les erreurs TypeScript/ESLint

### Erreur : "Supabase connection failed"

**Solution** :
1. Vérifier que `NEXT_PUBLIC_SUPABASE_URL` est correct
2. Vérifier que `NEXT_PUBLIC_SUPABASE_ANON_KEY` est correct
3. Vérifier que Supabase autorise les requêtes depuis votre domaine Vercel
4. Dans Supabase Dashboard → **Settings** → **API** → **URLs autorisées**, ajouter :
   - `https://votre-projet.vercel.app`
   - `https://*.vercel.app` (pour les preview deployments)

### Images ne se chargent pas

**Solution** : La configuration actuelle dans `next.config.mjs` utilise `unoptimized: true`, ce qui devrait fonctionner. Si problème persiste, vérifier les chemins des images.

## 📝 Notes Importantes

1. **Premier déploiement** : Peut prendre 3-5 minutes
2. **Redéploiement automatique** : Chaque push sur `main` redéploie automatiquement
3. **Preview deployments** : Chaque pull request crée un déploiement de prévisualisation
4. **Analytics** : Vercel fournit des analytics intégrés (optionnel)

## 🎯 Prochaines Étapes

Après le déploiement réussi :

1. ✅ **Tester toutes les fonctionnalités** sur la version déployée
2. ✅ **Configurer un domaine personnalisé** (si nécessaire)
3. ✅ **Activer la vérification d'email** dans Supabase (si désactivée en dev)
4. ✅ **Configurer les analytics** (Vercel Analytics)
5. ✅ **Mettre en place le monitoring** (Sentry, etc.)

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js sur Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Variables d'environnement Vercel](https://vercel.com/docs/environment-variables)
- [Guide Supabase + Vercel](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifier les **logs de build** dans Vercel Dashboard
2. Vérifier les **logs runtime** dans Vercel Dashboard → **Functions**
3. Consulter la [documentation Vercel](https://vercel.com/docs)
4. Vérifier la [documentation Supabase](https://supabase.com/docs)

---

**Bon déploiement ! 🚀**

