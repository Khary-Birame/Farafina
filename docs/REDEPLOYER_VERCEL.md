# 🔄 Comment Redéployer sur Vercel

## Problème : L'erreur persiste après le push

Si vous voyez toujours l'erreur `MoreOrical is not defined` après avoir pushé le code, voici comment forcer un redéploiement :

## Solution 1 : Redéploiement Manuel (Recommandé)

### Étapes :

1. **Allez sur [vercel.com](https://vercel.com)**
2. **Connectez-vous** à votre compte
3. **Sélectionnez votre projet** "Farafina"
4. **Allez dans l'onglet "Deployments"**
5. **Trouvez le dernier déploiement** (celui qui a échoué)
6. **Cliquez sur les 3 points** (⋯) à droite du déploiement
7. **Sélectionnez "Redeploy"**
8. **Confirmez** le redéploiement

Vercel va alors :
- Récupérer le dernier code de GitHub
- Rebuild l'application
- Redéployer avec le code corrigé

## Solution 2 : Vérifier que le Code est sur GitHub

### Vérification :

1. **Allez sur GitHub** : `https://github.com/Khary-Birame/Farafina`
2. **Ouvrez le fichier** : `app/messaging/page.tsx`
3. **Vérifiez la ligne 20** : Elle doit contenir `MoreVertical` (pas `MoreOrical`)
4. **Vérifiez la ligne 219** : Elle doit contenir `<MoreVertical` (pas `<MoreOrical`)

Si le code sur GitHub est correct mais que Vercel montre toujours l'erreur :
- Attendez 1-2 minutes (Vercel peut mettre du temps à détecter le nouveau commit)
- Ou faites un redéploiement manuel (Solution 1)

## Solution 3 : Faire un Nouveau Commit (Si nécessaire)

Si le code sur GitHub n'est pas à jour :

```bash
# Vérifier l'état
git status

# Si des fichiers sont modifiés
git add .
git commit -m "Fix: Corriger MoreOrical -> MoreVertical"
git push origin main
```

Puis suivez la **Solution 1** pour redéployer.

## Solution 4 : Vider le Cache de Build

Si le problème persiste, il peut s'agir d'un cache :

1. **Vercel Dashboard** → **Settings** → **General**
2. **Scroll jusqu'à "Build & Development Settings"**
3. **Cliquez sur "Clear Build Cache"**
4. **Redéployez** (Solution 1)

## ⚠️ Important : Variables d'Environnement

**N'oubliez pas** de configurer les variables d'environnement Supabase avant le redéploiement :

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. Ajoutez :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

Voir `docs/FIX_VERCEL_BUILD_ERROR.md` pour les détails.

## ✅ Vérification Post-Redéploiement

Après le redéploiement, vérifiez que :

- [ ] Le build réussit (plus d'erreur `MoreOrical`)
- [ ] L'application se charge correctement
- [ ] Les variables d'environnement sont configurées
- [ ] L'authentification fonctionne

---

**Si le problème persiste après ces étapes, vérifiez les logs de build dans Vercel pour voir l'erreur exacte.**

