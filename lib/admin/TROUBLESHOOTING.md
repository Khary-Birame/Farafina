# Guide de Dépannage - Admin Supabase

## 🔍 Diagnostic des Erreurs

Si vous voyez des erreurs `{}` vides dans la console, cela indique généralement un problème de **Row Level Security (RLS)** dans Supabase.

## ✅ Vérifications à faire

### 1. Vérifier les politiques RLS dans Supabase

1. Allez sur votre projet Supabase Dashboard
2. Cliquez sur **Authentication** → **Policies**
3. Vérifiez que les tables suivantes ont des politiques permettant la lecture :
   - `players`
   - `orders`
   - `notifications`
   - `form_submissions`
   - `users`

### 2. Créer des politiques RLS temporaires (pour tester)

Si vous voulez tester rapidement, créez ces politiques dans Supabase SQL Editor :

```sql
-- Permettre la lecture de players pour tous (TEMPORAIRE - pour test uniquement)
CREATE POLICY "Allow read players" ON public.players
  FOR SELECT
  USING (true);

-- Permettre la lecture de orders pour tous (TEMPORAIRE)
CREATE POLICY "Allow read orders" ON public.orders
  FOR SELECT
  USING (true);

-- Permettre la lecture de notifications pour tous (TEMPORAIRE)
CREATE POLICY "Allow read notifications" ON public.notifications
  FOR SELECT
  USING (true);

-- Permettre la lecture de form_submissions pour tous (TEMPORAIRE)
CREATE POLICY "Allow read form_submissions" ON public.form_submissions
  FOR SELECT
  USING (true);

-- Permettre la lecture de users pour tous (TEMPORAIRE)
CREATE POLICY "Allow read users" ON public.users
  FOR SELECT
  USING (true);
```

⚠️ **ATTENTION** : Ces politiques sont très permissives. Remplacez-les par des politiques plus restrictives en production.

### 3. Vérifier les variables d'environnement

Assurez-vous que votre fichier `.env.local` contient :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
```

### 4. Vérifier la console du navigateur

Ouvrez la console du navigateur (F12) et regardez les erreurs détaillées. Les nouvelles versions des hooks affichent maintenant :
- Le message d'erreur
- Le code d'erreur
- Les détails
- Le hint (si disponible)

### 5. Tester la connexion Supabase

Créez un fichier de test temporaire `app/admin/test-supabase/page.tsx` :

```typescript
"use client"

import { supabase } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function TestSupabase() {
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .limit(5)

      setResult({ data, error })
    }
    test()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Supabase</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  )
}
```

Visitez `/admin/test-supabase` pour voir l'erreur exacte.

## 🔧 Solutions courantes

### Erreur : "new row violates row-level security policy"

**Solution** : Créer des politiques RLS comme indiqué ci-dessus.

### Erreur : "relation does not exist"

**Solution** : Vérifiez que les tables existent dans Supabase Dashboard → Table Editor.

### Erreur : "permission denied for table"

**Solution** : Vérifiez les politiques RLS et les permissions de la clé `anon`.

### Les données ne s'affichent pas mais pas d'erreur

**Cause** : Les tables sont vides ou les requêtes ne retournent rien.

**Solution** : 
1. Vérifiez que vous avez des données dans Supabase
2. Vérifiez les filtres appliqués
3. Les données mockées s'afficheront en fallback

## 📊 Vérifier les données dans Supabase

1. Allez sur Supabase Dashboard → Table Editor
2. Vérifiez que vous avez des données dans :
   - `players` (au moins quelques joueurs)
   - `orders` (pour les finances)
   - `notifications` (pour les alertes)

## 🎯 Prochaines étapes

Une fois les erreurs corrigées :
1. Les KPIs devraient se mettre à jour automatiquement
2. Les graphiques devraient afficher les vraies données
3. La liste des joueurs devrait se charger depuis Supabase

Si les erreurs persistent, partagez les messages d'erreur détaillés de la console (maintenant plus informatifs).

