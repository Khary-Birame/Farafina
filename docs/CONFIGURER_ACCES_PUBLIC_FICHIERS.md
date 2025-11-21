# Configuration : Accès Public aux Fichiers

## Objectif
Permettre la visualisation des documents dans la console admin sans nécessiter d'authentification.

## Solution

### Option 1 : Rendre le Bucket Public (Recommandé pour le développement)

1. **Dans Supabase Dashboard → Storage → applications**
2. Cliquez sur les trois points → **Edit**
3. Changez **"Public"** à **`true`**
4. Cliquez sur **Save**

**Avantages :**
- Les URLs publiques fonctionneront directement
- Pas besoin d'authentification
- Simple à configurer

**Inconvénients :**
- Les fichiers sont accessibles publiquement (mais nécessitent de connaître l'URL exacte)

### Option 2 : Utiliser les Politiques RLS Publiques (Recommandé pour la production)

1. **Exécutez la migration SQL** `024_allow_public_read_applications.sql` dans Supabase Dashboard → SQL Editor

Cette migration permet l'accès en lecture à tous (public) grâce aux politiques RLS, même si le bucket reste privé.

**Avantages :**
- Le bucket reste privé
- Contrôle via les politiques RLS
- Plus sécurisé

**Inconvénients :**
- Nécessite que les URLs signées fonctionnent avec la clé anon
- Peut nécessiter une configuration supplémentaire

## Vérification

Après avoir configuré l'une des options :

1. Rechargez la page de détails d'une candidature dans la console admin
2. Les fichiers devraient maintenant s'afficher
3. Vérifiez dans la console du navigateur (F12) :
   - `[getSignedFileUrl] ✅ URL signée créée avec succès` ou
   - `[getSignedFileUrl] ⚠️ Utilisateur non authentifié, utilisation de l'URL publique`

## Note Importante

Si vous choisissez l'Option 1 (bucket public), les fichiers seront accessibles publiquement via leur URL. Assurez-vous que cela correspond à vos besoins de sécurité.

Si vous choisissez l'Option 2 (politiques RLS publiques), le bucket reste privé mais les politiques permettent l'accès en lecture à tous.


