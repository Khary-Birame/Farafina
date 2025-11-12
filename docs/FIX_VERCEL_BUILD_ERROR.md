# 🔧 Résoudre l'Erreur de Build Vercel

## ❌ Erreur Rencontrée

```
Error: Variables Supabase manquantes ! Configurez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans Vercel Dashboard → Settings → Environment Variables
```

## ✅ Solution : Configurer les Variables d'Environnement

### Étape 1 : Aller dans Vercel Dashboard

1. Connectez-vous sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet **Farafina**
3. Allez dans **Settings** → **Environment Variables**

### Étape 2 : Ajouter les Variables

Ajoutez ces **3 variables** une par une :

#### Variable 1 : `NEXT_PUBLIC_SUPABASE_URL`

1. Cliquez sur **"Add New"**
2. **Name** : `NEXT_PUBLIC_SUPABASE_URL`
3. **Value** : `https://votre-projet.supabase.co` (remplacez par votre URL Supabase)
4. **Environments** : Cochez ✅ **Production**, ✅ **Preview**, ✅ **Development**
5. Cliquez sur **"Save"**

#### Variable 2 : `NEXT_PUBLIC_SUPABASE_ANON_KEY`

1. Cliquez sur **"Add New"**
2. **Name** : `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Value** : Votre clé anon (commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
4. **Environments** : Cochez ✅ **Production**, ✅ **Preview**, ✅ **Development**
5. Cliquez sur **"Save"**

#### Variable 3 : `SUPABASE_SERVICE_ROLE_KEY`

1. Cliquez sur **"Add New"**
2. **Name** : `SUPABASE_SERVICE_ROLE_KEY`
3. **Value** : Votre clé service_role (commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
4. **Environments** : Cochez ✅ **Production**, ✅ **Preview**, ✅ **Development**
5. Cliquez sur **"Save"**

### Étape 3 : Où Trouver les Valeurs ?

#### Dans Supabase Dashboard :

1. Allez sur [supabase.com](https://supabase.com)
2. Sélectionnez votre projet
3. Allez dans **Settings** → **API**

Vous trouverez :
- **Project URL** → C'est votre `NEXT_PUBLIC_SUPABASE_URL`
- **Project API keys** → 
  - `anon` `public` → C'est votre `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` `secret` → C'est votre `SUPABASE_SERVICE_ROLE_KEY`

### Étape 4 : Redéployer

Après avoir ajouté toutes les variables :

1. Allez dans **Deployments**
2. Trouvez le dernier déploiement (celui qui a échoué)
3. Cliquez sur les **3 points** (⋯) → **Redeploy**
4. Ou faites un nouveau commit et push (Vercel redéploiera automatiquement)

## ✅ Vérification

Après le redéploiement, vérifiez que :

- [ ] Le build réussit sans erreurs
- [ ] L'application se charge correctement
- [ ] L'authentification fonctionne
- [ ] Les formulaires fonctionnent

## 🆘 Si ça ne fonctionne toujours pas

1. **Vérifiez les noms des variables** : Ils doivent être **exactement** comme indiqué (sensible à la casse)
2. **Vérifiez qu'il n'y a pas d'espaces** avant/après les valeurs
3. **Vérifiez que toutes les variables sont cochées** pour Production, Preview et Development
4. **Redéployez** après chaque modification

## 📝 Exemple de Configuration

Dans Vercel Dashboard → Environment Variables, vous devriez voir :

```
NEXT_PUBLIC_SUPABASE_URL
├── Production: https://xxxxx.supabase.co
├── Preview: https://xxxxx.supabase.co
└── Development: https://xxxxx.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
├── Production: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
├── Preview: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
└── Development: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

SUPABASE_SERVICE_ROLE_KEY
├── Production: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
├── Preview: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
└── Development: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

**Une fois les variables configurées, le build devrait réussir ! 🎉**

