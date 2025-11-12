# Variables d'Environnement pour Vercel

## 📋 Variables Requises

Voici les variables d'environnement à configurer dans Vercel :

### 1. Supabase URL (Publique)

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
```

**Où trouver** : Supabase Dashboard → Settings → API → Project URL

### 2. Supabase Anon Key (Publique)

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key_ici
```

**Où trouver** : Supabase Dashboard → Settings → API → Project API keys → `anon` `public`

⚠️ **Note** : Cette clé est publique (préfixe `NEXT_PUBLIC_`) et peut être utilisée côté client.

### 3. Supabase Service Role Key (SECRÈTE)

```
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_ici
```

**Où trouver** : Supabase Dashboard → Settings → API → Project API keys → `service_role` `secret`

🔒 **IMPORTANT** : Cette clé est **SECRÈTE** et ne doit **JAMAIS** être exposée publiquement. Elle est uniquement utilisée dans les API routes côté serveur.

## 🔧 Configuration dans Vercel

### Étapes

1. **Aller dans Vercel Dashboard**
2. **Sélectionner votre projet**
3. **Aller dans Settings → Environment Variables**
4. **Ajouter chaque variable** :
   - Nom : `NEXT_PUBLIC_SUPABASE_URL`
   - Valeur : `https://votre-projet.supabase.co`
   - Environnements : ✅ Production, ✅ Preview, ✅ Development
5. **Répéter pour les autres variables**

### Environnements

Vous pouvez définir des valeurs différentes pour :
- **Production** : Variables pour la branche `main/master`
- **Preview** : Variables pour les autres branches (pull requests)
- **Development** : Variables pour `vercel dev` (local)

## ✅ Vérification

Après avoir configuré les variables :

1. **Redéployer** le projet dans Vercel
2. **Vérifier les logs** pour s'assurer qu'il n'y a pas d'erreurs
3. **Tester l'application** pour vérifier que Supabase fonctionne

## 🔒 Sécurité

### Variables Publiques (`NEXT_PUBLIC_*`)

- ✅ Peuvent être exposées dans le code client
- ✅ Accessibles dans le navigateur
- ✅ Utilisées pour les requêtes Supabase côté client

### Variables Secrètes

- 🔒 **NE JAMAIS** exposer dans le code client
- 🔒 Utilisées uniquement dans les API routes (`/app/api/*`)
- 🔒 Stockées uniquement côté serveur

## 📝 Exemple de Configuration

Dans Vercel Dashboard → Environment Variables :

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

## 🆘 Problèmes Courants

### "Environment variable not found"

**Solution** : Vérifier que la variable est bien définie dans Vercel et redéployer.

### "Supabase connection failed"

**Solution** : 
1. Vérifier que les URLs sont correctes
2. Vérifier que les clés sont correctes
3. Vérifier que Supabase autorise les requêtes depuis votre domaine Vercel

### Variables non mises à jour

**Solution** : Après avoir modifié les variables, **redéployer** le projet.

