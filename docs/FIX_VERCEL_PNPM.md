# Correction : Vercel utilise pnpm au lieu de npm

## Problème
Vercel essaie d'utiliser `pnpm run build` alors que le projet utilise `npm`.

## Solution

### 1. Fichier `vercel.json`
Un fichier `vercel.json` a été créé à la racine du projet pour forcer l'utilisation de npm :

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm ci",
  "framework": "nextjs"
}
```

### 2. Configuration dans `package.json`
Le champ `packageManager` a été ajouté dans `package.json` :

```json
{
  "packageManager": "npm@latest",
  ...
}
```

### 3. Vérifier qu'il n'y a pas de `pnpm-lock.yaml` dans le repo Git
Si un fichier `pnpm-lock.yaml` existe dans le repo Git (même s'il est supprimé localement), Vercel pourrait le détecter et utiliser pnpm.

**Action à faire :**
1. Vérifiez dans votre repo Git s'il y a un `pnpm-lock.yaml`
2. Si oui, supprimez-le et commitez la suppression :
   ```bash
   git rm pnpm-lock.yaml
   git commit -m "Remove pnpm-lock.yaml to force npm usage"
   git push
   ```

### 4. Configuration dans Vercel Dashboard (optionnel)
Si le problème persiste, vous pouvez aussi configurer directement dans Vercel :

1. Allez dans **Vercel Dashboard → Settings → General**
2. Dans la section **Build & Development Settings**, vérifiez :
   - **Install Command** : `npm ci` ou `npm install`
   - **Build Command** : `npm run build`
   - **Framework Preset** : Next.js

### 5. Redéployer
Après ces modifications, redéployez votre application sur Vercel.

## Vérification
Le build local fonctionne correctement avec `npm run build`. Vercel devrait maintenant utiliser npm au lieu de pnpm.

