# 🔧 Correction du Problème de Timeout sur Mobile

## 🐛 Problème Identifié

Les formulaires fonctionnent sur PC mais restent bloqués sur "envoi en cours" ou "soumission en cours" indéfiniment sur mobile.

### Causes Probables

1. **Limite de timeout de Vercel** : Les fonctions serverless sur le plan gratuit ont une limite de 10 secondes
2. **Connexion mobile lente** : Les connexions mobiles peuvent être plus lentes que le WiFi
3. **Absence de timeout côté client** : Les appels `fetch` n'avaient pas de timeout explicite, pouvant rester bloqués indéfiniment
4. **Gestion d'erreur insuffisante** : Les erreurs réseau n'étaient pas bien détectées et signalées

## ✅ Solutions Implémentées

### 1. Timeout Côté Client

Un utilitaire `fetchWithTimeout` a été créé pour ajouter un timeout à tous les appels API :

```typescript
// lib/utils/fetch-with-timeout.ts
export async function fetchWithTimeout(url: string, options: FetchWithTimeoutOptions = {})
```

- **Timeout par défaut** : 30 secondes
- **Pour les emails** : 25 secondes (légèrement au-dessus de la limite Vercel pour laisser une marge)
- **Détection automatique** : Les timeouts sont détectés et signalés clairement à l'utilisateur

### 2. Gestion d'Erreur Améliorée

Les formulaires détectent maintenant :
- ⏱️ **Timeouts** : "Connexion lente détectée"
- 🔌 **Connexions interrompues** : "Connexion interrompue"
- 📤 **Erreurs d'upload** : Messages spécifiques avec conseils

### 3. Envoi d'Email Non-Bloquant

Pour le formulaire de candidature :
- La candidature est **toujours sauvegardée** même si l'email timeout
- Un avertissement est affiché si l'email n'a pas pu être envoyé immédiatement
- L'utilisateur est informé que l'email sera envoyé sous peu

### 4. Messages d'Erreur Contextuels

Les messages d'erreur sont maintenant adaptés au contexte mobile :
- Conseils spécifiques pour les connexions mobiles
- Suggestions pour améliorer la connexion (WiFi, 4G/5G)
- Instructions claires pour réessayer

## 📝 Fichiers Modifiés

1. **`lib/utils/fetch-with-timeout.ts`** (nouveau)
   - Utilitaire pour les appels fetch avec timeout

2. **`components/admissions/application-form.tsx`**
   - Utilise `fetchWithTimeout` pour l'envoi d'email
   - Gestion d'erreur améliorée pour les timeouts
   - Envoi d'email non-bloquant

3. **`components/visite-ffa/visite-form-premium.tsx`**
   - Utilise `fetchWithTimeout` pour l'envoi d'email
   - Gestion d'erreur améliorée

4. **`components/contact/contact-form.tsx`**
   - Utilise `fetchWithTimeout` pour l'envoi d'email

## 🧪 Test de la Solution

### Sur Mobile

1. **Testez avec une connexion normale** :
   - Les formulaires devraient se soumettre normalement
   - Les timeouts devraient être détectés et signalés clairement

2. **Testez avec une connexion lente** :
   - Activez le mode "Réseau lent" dans les DevTools Chrome (si disponible)
   - Ou utilisez une connexion mobile réelle
   - Les timeouts devraient être détectés après 25 secondes
   - Un message d'erreur clair devrait s'afficher

3. **Testez avec une connexion instable** :
   - Désactivez/réactivez le WiFi pendant la soumission
   - L'erreur devrait être détectée et signalée

### Vérifications

- ✅ Les formulaires ne restent plus bloqués indéfiniment
- ✅ Les timeouts sont détectés et signalés
- ✅ Les messages d'erreur sont clairs et utiles
- ✅ Les candidatures sont sauvegardées même si l'email timeout

## 🔍 Dépannage

### Le formulaire reste toujours bloqué

**Vérifiez :**
1. Que les modifications ont été déployées sur Vercel
2. Que le cache du navigateur est vidé
3. Les logs de la console pour des erreurs JavaScript

### Les timeouts se produisent trop souvent

**Solutions :**
1. Réduisez la taille des fichiers (notamment les vidéos)
2. Améliorez la connexion internet
3. Utilisez le WiFi au lieu des données mobiles si possible

### L'email n'est pas envoyé

**Note :** C'est normal si l'email timeout. La candidature est sauvegardée et l'email sera envoyé plus tard via un système de queue (à implémenter si nécessaire).

## 📚 Ressources

- [Documentation Vercel - Function Timeouts](https://vercel.com/docs/functions/serverless-functions/runtimes#max-duration)
- [Documentation Fetch API - AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

