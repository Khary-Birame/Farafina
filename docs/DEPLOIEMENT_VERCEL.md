# Guide de Déploiement sur Vercel

## 🚀 Préparation du Déploiement

### 1. Vérifier que tout fonctionne en local

```bash
# Tester le build
npm run build

# Si le build réussit, vous êtes prêt !
```

### 2. Préparer les Variables d'Environnement

Vous devrez configurer ces variables dans Vercel :

#### Variables Requises

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
```

⚠️ **IMPORTANT** : Ne jamais commiter `SUPABASE_SERVICE_ROLE_KEY` dans le code !

## 📋 Étapes de Déploiement

### Méthode 1 : Via l'Interface Vercel (Recommandé)

1. **Créer un compte Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Se connecter avec GitHub/GitLab/Bitbucket

2. **Importer le projet**
   - Cliquer sur "Add New Project"
   - Sélectionner votre repository GitHub
   - Vercel détectera automatiquement Next.js

3. **Configurer les variables d'environnement**
   - Dans "Environment Variables"
   - Ajouter :
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY` (pour les API routes)

4. **Configurer le build**
   - Framework Preset : Next.js (détecté automatiquement)
   - Build Command : `npm run build` (par défaut)
   - Output Directory : `.next` (par défaut)
   - Install Command : `npm install` (par défaut)

5. **Déployer**
   - Cliquer sur "Deploy"
   - Attendre la fin du build
   - Votre app sera disponible sur `votre-projet.vercel.app`

### Méthode 2 : Via la CLI Vercel

1. **Installer Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Se connecter**
   ```bash
   vercel login
   ```

3. **Déployer**
   ```bash
   vercel
   ```

4. **Ajouter les variables d'environnement**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   ```

5. **Déployer en production**
   ```bash
   vercel --prod
   ```

## ⚙️ Configuration Vercel

### Fichier `vercel.json` (optionnel)

Si vous avez besoin de configurations spéciales :

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["cdg1"]
}
```

### Variables d'Environnement par Environnement

Dans Vercel, vous pouvez définir des variables différentes pour :
- **Production** : Variables pour la production
- **Preview** : Variables pour les branches de développement
- **Development** : Variables pour le développement local

## 🔒 Sécurité

### Variables Sensibles

- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Peut être publique (préfixe NEXT_PUBLIC_)
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Peut être publique (préfixe NEXT_PUBLIC_)
- 🔒 `SUPABASE_SERVICE_ROLE_KEY` - **NE JAMAIS** exposer publiquement !

### Protection des Routes API

Assurez-vous que les routes API qui utilisent `SUPABASE_SERVICE_ROLE_KEY` sont bien protégées.

## 🌐 Configuration du Domaine Personnalisé

1. **Dans Vercel Dashboard**
   - Aller dans "Settings" → "Domains"
   - Ajouter votre domaine

2. **Configurer le DNS**
   - Ajouter un enregistrement CNAME pointant vers `cname.vercel-dns.com`
   - Ou un enregistrement A avec l'IP fournie par Vercel

3. **SSL automatique**
   - Vercel configure automatiquement le SSL (HTTPS)

## 📊 Vérifications Post-Déploiement

### Checklist

- [ ] Le build réussit sans erreurs
- [ ] Les variables d'environnement sont configurées
- [ ] L'application se charge correctement
- [ ] L'authentification fonctionne
- [ ] Les formulaires fonctionnent
- [ ] Le changement de langue fonctionne
- [ ] Les images se chargent correctement
- [ ] Le domaine personnalisé fonctionne (si configuré)

## 🐛 Résolution de Problèmes

### Erreur : "Environment variable not found"

**Solution** : Vérifier que toutes les variables sont bien configurées dans Vercel Dashboard → Settings → Environment Variables

### Erreur : "Build failed"

**Solution** :
1. Vérifier les logs de build dans Vercel
2. Tester le build en local : `npm run build`
3. Vérifier les erreurs TypeScript/ESLint

### Erreur : "Supabase connection failed"

**Solution** :
1. Vérifier que `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont corrects
2. Vérifier que Supabase autorise les requêtes depuis votre domaine Vercel

### Images ne se chargent pas

**Solution** : Vérifier la configuration dans `next.config.mjs` :
```js
images: {
  unoptimized: true, // Ou configurer les domaines autorisés
}
```

## 📝 Notes Importantes

1. **Premier déploiement** : Le premier déploiement peut prendre quelques minutes
2. **Redéploiement automatique** : Vercel redéploie automatiquement à chaque push sur la branche principale
3. **Preview deployments** : Chaque pull request crée automatiquement un déploiement de prévisualisation
4. **Analytics** : Vercel fournit des analytics intégrés (optionnel)

## 🎯 Prochaines Étapes Après Déploiement

1. ✅ Tester toutes les fonctionnalités sur la version déployée
2. ✅ Configurer un domaine personnalisé
3. ✅ Activer la vérification d'email dans Supabase (si désactivée en dev)
4. ✅ Configurer les analytics (Vercel Analytics)
5. ✅ Mettre en place le monitoring d'erreurs (Sentry, etc.)

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js sur Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Variables d'environnement Vercel](https://vercel.com/docs/environment-variables)

