# Guide de Déploiement - Farafina Foot Academy

## 🚀 Déploiement avec Vercel + Supabase

### Prérequis

- Compte GitHub
- Compte Vercel (gratuit)
- Compte Supabase (gratuit)
- Nom de domaine (optionnel mais recommandé)

---

## 📋 Étapes de Déploiement

### 1. Préparer Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Noter les informations suivantes :
   - Project URL (ex: `https://xxxxx.supabase.co`)
   - Anon Key (clé publique)
   - Service Role Key (clé privée - à garder secrète)

### 2. Configurer les Variables d'Environnement Locales

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Déployer sur Vercel

#### Option A : Via l'interface Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Cliquer sur "Add New Project"
4. Importer votre repository GitHub
5. Vercel détecte automatiquement Next.js
6. Ajouter les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (mettre l'URL Vercel temporaire)
7. Cliquer sur "Deploy"
8. Attendre 2-3 minutes

#### Option B : Via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions
```

### 4. Configurer Supabase pour Production

Dans le dashboard Supabase → Authentication → URL Configuration :

**Site URL :**
```
https://votre-projet.vercel.app
```

**Redirect URLs :**
```
https://votre-projet.vercel.app/auth/callback
https://votre-projet.vercel.app/**/callback
```

Si vous avez un nom de domaine :
```
https://farafina-foot-academy.com
https://farafina-foot-academy.com/auth/callback
https://www.farina-foot-academy.com/auth/callback
```

### 5. Ajouter un Nom de Domaine (Optionnel)

#### Sur Vercel :

1. Aller dans votre projet → Settings → Domains
2. Cliquer sur "Add Domain"
3. Entrer votre domaine : `farafina-foot-academy.com`
4. Vercel vous donne les instructions DNS

#### Configuration DNS (chez votre registrar) :

**Option 1 : Configuration A Record (Recommandé)**

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Option 2 : Configuration CNAME (Alternative)**

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

**Pour le sous-domaine www :**

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### Mettre à jour les variables d'environnement :

Dans Vercel → Settings → Environment Variables :

Mettre à jour `NEXT_PUBLIC_SITE_URL` :
```
https://farafina-foot-academy.com
```

#### Mettre à jour Supabase :

Dans Supabase → Authentication → URL Configuration :

**Site URL :**
```
https://farafina-foot-academy.com
```

**Redirect URLs :**
```
https://farafina-foot-academy.com/auth/callback
https://www.farina-foot-academy.com/auth/callback
```

### 6. SSL/HTTPS

✅ **Automatique avec Vercel !**

Vercel génère automatiquement un certificat SSL Let's Encrypt pour votre domaine. Aucune configuration nécessaire.

---

## 🔄 Déploiements Automatiques

### Configuration GitHub Actions (Optionnel)

Vercel se connecte automatiquement à GitHub et déploie à chaque push :

- **Push sur `main`** → Déploiement en production
- **Push sur une branche** → Déploiement preview

### Variables d'Environnement par Environnement

Dans Vercel, vous pouvez définir des variables différentes pour :

- **Production** : Variables de production
- **Preview** : Variables de test/staging
- **Development** : Variables locales

---

## 📊 Monitoring et Analytics

### Vercel Analytics (Gratuit)

Vercel Analytics est déjà intégré dans le projet via `@vercel/analytics`.

Pour l'activer, ajouter dans `app/layout.tsx` :

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Supabase Dashboard

- Monitoring des requêtes
- Statistiques d'utilisation
- Logs en temps réel
- Métriques de performance

---

## 🔒 Sécurité

### Variables d'Environnement Sensibles

⚠️ **Ne jamais commiter** :
- `.env.local`
- `.env.production`
- Clés privées (Service Role Key, Stripe Secret Key)

✅ **Toujours utiliser** :
- Variables d'environnement Vercel
- `.env.example` pour documenter

### Row Level Security (RLS) dans Supabase

Activer RLS sur toutes les tables pour la sécurité :

```sql
-- Exemple : Les parents ne voient que leurs enfants
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can only see their child's data"
ON players FOR SELECT
USING (parent_id = auth.uid());
```

---

## 🐛 Dépannage

### Problème : Variables d'environnement non chargées

**Solution :**
1. Vérifier que les variables commencent par `NEXT_PUBLIC_` pour être accessibles côté client
2. Redéployer après avoir ajouté/modifié des variables
3. Vérifier dans Vercel → Settings → Environment Variables

### Problème : Authentification ne fonctionne pas

**Solution :**
1. Vérifier les URLs dans Supabase → Authentication → URL Configuration
2. S'assurer que `NEXT_PUBLIC_SITE_URL` est correct
3. Vérifier que les redirect URLs incluent `/auth/callback`

### Problème : Nom de domaine ne fonctionne pas

**Solution :**
1. Vérifier la propagation DNS (peut prendre jusqu'à 48h)
2. Utiliser [dnschecker.org](https://dnschecker.org) pour vérifier
3. Vérifier que les enregistrements DNS sont corrects
4. Attendre la génération du certificat SSL (quelques minutes)

---

## 📝 Checklist de Déploiement

- [ ] Compte Supabase créé
- [ ] Projet Supabase configuré
- [ ] Variables d'environnement Supabase notées
- [ ] Repository GitHub prêt
- [ ] Compte Vercel créé
- [ ] Projet déployé sur Vercel
- [ ] Variables d'environnement configurées dans Vercel
- [ ] URLs Supabase configurées
- [ ] Test du déploiement réussi
- [ ] Nom de domaine configuré (si applicable)
- [ ] DNS propagé
- [ ] SSL actif
- [ ] Test en production réussi

---

## 💰 Coûts

### Plan Gratuit (Démarrage)

**Vercel :**
- 100 GB bandwidth/mois
- Déploiements illimités
- SSL gratuit
- Nom de domaine gratuit

**Supabase :**
- 500 MB base de données
- 1 GB storage
- 2 GB bandwidth
- 50 000 utilisateurs actifs/mois

### Plan Payant (Croissance)

**Vercel Pro :** $20/mois
- Bandwidth illimité
- Analytics avancés
- Support prioritaire

**Supabase Pro :** $25/mois
- 8 GB base de données
- 100 GB storage
- 250 GB bandwidth
- Support email

---

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Guide DNS Vercel](https://vercel.com/docs/concepts/projects/domains)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Dernière mise à jour :** 2024

