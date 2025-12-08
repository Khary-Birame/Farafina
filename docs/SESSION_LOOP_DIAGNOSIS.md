# 🔍 Diagnostic Complet - Problème de Session en Boucle

## 📋 Analyse du Problème

### Symptômes
- ✅ Première connexion : fonctionne parfaitement
- ❌ Rechargement/Reconnexion : boucle infinie "Vérification de l'accès administrateur..."
- ❌ Session semble invalide après refresh

## 🔎 Problèmes Identifiés

### 1. **DÉSYNCHRONISATION localStorage (Client) ↔ Cookies (Serveur)**

**Problème** :
- Le client Supabase stocke la session dans `localStorage` (côté navigateur)
- Le serveur Supabase lit la session depuis les **cookies HTTPOnly**
- Après un refresh, les cookies peuvent ne pas être synchronisés avec localStorage

**Fichiers concernés** :
- `lib/supabase/client.ts` : Utilise `localStorage`
- `lib/supabase/server.ts` : Utilise `cookies()` HTTPOnly

**Impact** : Après refresh, le serveur ne trouve pas la session dans les cookies, mais le client pense qu'elle existe dans localStorage.

### 2. **BOUCLE INFINIE dans `app/admin/layout.tsx`**

**Problème** :
```typescript
useEffect(() => {
  // ...
}, [authLoading, user, router])
```

- Le `useEffect` dépend de `user` qui peut changer constamment
- Si `user` change → `useEffect` se relance → vérifie admin → peut changer `user` → boucle

**Impact** : Vérification admin en boucle infinie.

### 3. **PROBLÈME DE TIMING dans `auth-context.tsx`**

**Problème** :
```typescript
if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
  await new Promise(resolve => setTimeout(resolve, 100)) // Délai arbitraire
  const currentUser = await getCurrentUser()
  // ...
}
```

- Délai de 100ms arbitraire pour "synchroniser les cookies"
- Pas fiable, peut ne pas suffire
- Peut causer des race conditions

**Impact** : L'utilisateur peut ne pas être récupéré correctement après connexion.

### 4. **REFRESH TOKEN ÉCHOUE SILENCIEUSEMENT**

**Problème** :
Dans `getCurrentUser()` et `checkAdminAccess()`, si le refresh échoue, on retourne `null` sans retry ni log approprié.

**Impact** : Session expirée non rafraîchie correctement.

### 5. **COOKIES NON SYNCHRONISÉS**

**Problème** :
- Supabase client stocke dans localStorage
- Supabase serveur lit depuis cookies
- Pas de mécanisme de synchronisation automatique

**Impact** : Après refresh, le serveur ne voit pas la session.

## 🎯 Solutions Proposées

### Solution 1 : Synchroniser localStorage → Cookies (CRITIQUE)

Créer un middleware ou un composant qui synchronise la session localStorage vers les cookies HTTPOnly après chaque connexion.

### Solution 2 : Corriger la boucle dans `admin/layout.tsx`

Utiliser des refs pour éviter les re-vérifications inutiles et stabiliser les dépendances.

### Solution 3 : Améliorer la gestion du refresh token

Ajouter des retries et une meilleure gestion d'erreurs.

### Solution 4 : Unifier le stockage de session

Utiliser uniquement les cookies (HTTPOnly) pour la session, même côté client.

### Solution 5 : Ajouter un endpoint de synchronisation

Créer une route API qui synchronise la session localStorage → cookies.

## 📝 Plan d'Action

1. ✅ Créer un composant de synchronisation session
2. ✅ Corriger `admin/layout.tsx` pour éviter les boucles
3. ✅ Améliorer `auth-context.tsx` pour une meilleure gestion
4. ✅ Améliorer le refresh token avec retries
5. ✅ Créer une route API de synchronisation

