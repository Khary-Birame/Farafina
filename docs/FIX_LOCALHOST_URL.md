# 🔧 Correction du Problème avec localhost dans les URLs

## 🐛 Problème Identifié

Si `NEXT_PUBLIC_SITE_URL` est défini à `http://localhost:3000` dans votre fichier `.env.local` **ET** sur Vercel, cela peut causer plusieurs problèmes :

1. **Les emails contiennent des liens vers localhost** au lieu de l'URL de production
2. **Les formulaires peuvent sembler fonctionner** mais les liens dans les emails ne fonctionneront pas
3. **Sur mobile**, les liens vers localhost ne fonctionneront pas du tout

## ✅ Solution

### Pour le Développement Local (`.env.local`)

Dans votre fichier `.env.local`, vous pouvez garder :
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

C'est correct pour le développement local.

### Pour Vercel (Production)

**Option 1 : Ne pas définir `NEXT_PUBLIC_SITE_URL` (RECOMMANDÉ)**

1. Allez sur Vercel → Votre Projet → Settings → Environment Variables
2. Si `NEXT_PUBLIC_SITE_URL` existe et pointe vers `http://localhost:3000`, **SUPPRIMEZ-LE**
3. Le code utilisera automatiquement `VERCEL_URL` qui est fourni automatiquement par Vercel

**Option 2 : Définir avec l'URL de production**

1. Allez sur Vercel → Votre Projet → Settings → Environment Variables
2. Modifiez `NEXT_PUBLIC_SITE_URL` pour qu'il pointe vers votre URL de production :
   ```
   NEXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app
   ```
   Ou si vous avez un domaine personnalisé :
   ```
   NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
   ```

### Comment le Code Gère l'URL

Le code dans les routes API (`/api/application`, `/api/visite`, etc.) utilise cette logique :

```typescript
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                "http://localhost:3000")
```

Cela signifie :
1. Si `NEXT_PUBLIC_SITE_URL` est défini → utilise cette valeur
2. Sinon, si `VERCEL_URL` est défini (automatique sur Vercel) → utilise `https://${VERCEL_URL}`
3. Sinon (développement local) → utilise `http://localhost:3000`

## 🔍 Vérification

### Comment Vérifier si le Problème Existe

1. **Soumettez un formulaire** (candidature ou visite) depuis votre téléphone
2. **Vérifiez l'email reçu**
3. **Cliquez sur les liens dans l'email**
4. Si les liens pointent vers `http://localhost:3000` → le problème existe

### Comment Vérifier la Configuration sur Vercel

1. Allez sur Vercel → Votre Projet → Settings → Environment Variables
2. Cherchez `NEXT_PUBLIC_SITE_URL`
3. Si elle existe et vaut `http://localhost:3000` → **SUPPRIMEZ-LA** ou **MODIFIEZ-LA**

## 📝 Étapes de Correction

1. **Sur Vercel :**
   - Allez dans Settings → Environment Variables
   - Si `NEXT_PUBLIC_SITE_URL=http://localhost:3000` existe, supprimez-la ou modifiez-la
   - Si vous choisissez de la modifier, utilisez votre URL de production

2. **Redéployez l'application :**
   - Allez dans Deployments
   - Cliquez sur les 3 points (⋯) du dernier déploiement
   - Cliquez sur "Redeploy"

3. **Testez :**
   - Soumettez un formulaire depuis votre téléphone
   - Vérifiez que les liens dans l'email pointent vers l'URL de production

## 🎯 Résultat Attendu

Après correction :
- ✅ Les emails contiendront des liens vers l'URL de production
- ✅ Les liens fonctionneront sur tous les appareils (mobile, tablette, ordinateur)
- ✅ Les formulaires fonctionneront correctement sur mobile

## 📚 Ressources

- [Documentation Vercel - Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Documentation Vercel - System Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables/system-environment-variables)

