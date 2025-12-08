# 🧪 Guide de Test - Correction Session

## ✅ Vérifications Préalables

Avant de tester, assurez-vous que :
- ✅ Le serveur de développement est lancé (`npm run dev`)
- ✅ Vous avez accès à la console du navigateur (F12)
- ✅ Vous avez un compte admin valide

## 🧪 Tests à Effectuer

### Test 1 : Première Connexion ✅

**Objectif** : Vérifier que la connexion fonctionne et que la session est synchronisée

**Étapes** :
1. Ouvrir le navigateur en mode navigation privée (ou vider le cache)
2. Aller sur `/login`
3. Se connecter avec un compte admin
4. Vérifier dans la console :
   - ✅ Pas d'erreurs rouges
   - ✅ Message "Auth state changed: SIGNED_IN"
   - ✅ Requête POST vers `/api/auth/sync-session` avec statut 200
5. Vérifier dans DevTools → Application → Cookies :
   - ✅ Cookies Supabase présents (sb-*)
   - ✅ Cookies avec `httpOnly: true`
6. Vérifier que vous êtes redirigé vers `/admin`
7. ✅ La console admin s'affiche sans boucle

**Résultat attendu** : ✅ Connexion réussie, session synchronisée, accès admin fonctionnel

---

### Test 2 : Rechargement de Page 🔄

**Objectif** : Vérifier que la session persiste après un refresh

**Étapes** :
1. Être connecté et sur `/admin`
2. Recharger la page (F5 ou Ctrl+R)
3. Observer le comportement :
   - ✅ Pas de boucle infinie "Vérification de l'accès administrateur..."
   - ✅ Le loader apparaît brièvement puis disparaît
   - ✅ La page admin s'affiche normalement
4. Vérifier dans la console :
   - ✅ Pas d'erreurs
   - ✅ Message "Vérification admin - user: présent"
   - ✅ Message "Accès admin autorisé"
5. Vérifier dans DevTools → Network :
   - ✅ Pas de requêtes en boucle vers `/api/auth/sync-session`

**Résultat attendu** : ✅ Page rechargée sans boucle, session persistante

---

### Test 3 : Reconnexion 🔐

**Objectif** : Vérifier que la reconnexion fonctionne sans problème

**Étapes** :
1. Se déconnecter (bouton de déconnexion)
2. Vérifier que vous êtes redirigé vers `/login`
3. Se reconnecter avec le même compte admin
4. Vérifier dans la console :
   - ✅ Requête POST vers `/api/auth/sync-session` réussie
   - ✅ Pas d'erreurs
5. Vérifier que vous êtes redirigé vers `/admin`
6. ✅ La console admin s'affiche sans boucle

**Résultat attendu** : ✅ Reconnexion réussie, session synchronisée, pas de boucle

---

### Test 4 : Session Expirée (Optionnel) ⏰

**Objectif** : Vérifier que le refresh token fonctionne avec retry

**Étapes** :
1. Être connecté
2. Dans DevTools → Application → Local Storage :
   - Trouver les clés Supabase (sb-*-auth-token)
   - Modifier manuellement `expires_at` à une date passée (pour simuler expiration)
3. Recharger la page
4. Vérifier dans la console :
   - ✅ Message "Session expirée, tentative de rafraîchissement..."
   - ✅ Tentatives de refresh (max 3)
   - ✅ Session rafraîchie avec succès
5. ✅ La page admin s'affiche normalement

**Résultat attendu** : ✅ Refresh token fonctionne avec retry, session restaurée

---

### Test 5 : Navigation Entre Pages 🧭

**Objectif** : Vérifier que la session persiste lors de la navigation

**Étapes** :
1. Être connecté sur `/admin`
2. Naviguer vers `/admin/players`
3. Naviguer vers `/admin` (retour)
4. Vérifier dans la console :
   - ✅ Pas de vérifications admin multiples inutiles
   - ✅ Pas de boucles
5. ✅ Toutes les pages s'affichent normalement

**Résultat attendu** : ✅ Navigation fluide, pas de vérifications inutiles

---

## 🔍 Points de Vérification

### Dans la Console (F12)

**Messages attendus** :
- ✅ "Auth state changed: SIGNED_IN"
- ✅ "Vérification admin - user: présent"
- ✅ "Accès admin autorisé"

**Messages à éviter** :
- ❌ "Admin check timeout - forcing check to complete"
- ❌ Erreurs répétées de synchronisation
- ❌ Requêtes en boucle

### Dans DevTools → Network

**Requêtes attendues** :
- ✅ `POST /api/auth/sync-session` (200 OK) - Une seule fois après connexion
- ✅ `GET /api/auth/sync-session` (optionnel) - Pour vérifier la session

**Requêtes à éviter** :
- ❌ Requêtes en boucle vers `/api/auth/sync-session`
- ❌ Requêtes avec statut 400/500 répétées

### Dans DevTools → Application → Cookies

**Cookies attendus** :
- ✅ `sb-*-auth-token` (avec httpOnly: true)
- ✅ `sb-*-auth-token-code-verifier` (optionnel)
- ✅ Autres cookies Supabase

**Vérifications** :
- ✅ `httpOnly: true` pour les cookies d'auth
- ✅ `secure: true` en production (HTTPS)
- ✅ `sameSite: Lax`

---

## 🐛 Si un Problème Persiste

### Problème : Boucle infinie persiste

**Solutions** :
1. Vider le cache du navigateur (Ctrl+Shift+Delete)
2. Vider localStorage (DevTools → Application → Local Storage → Clear)
3. Vider les cookies (DevTools → Application → Cookies → Clear)
4. Redémarrer le serveur de développement
5. Vérifier les logs dans la console pour identifier le problème

### Problème : Session non synchronisée

**Solutions** :
1. Vérifier que la route `/api/auth/sync-session` existe
2. Vérifier dans Network que la requête est envoyée
3. Vérifier le statut de la réponse (doit être 200 OK)
4. Vérifier les erreurs dans la console

### Problème : Refresh token échoue

**Solutions** :
1. Vérifier que le refresh token est présent dans localStorage
2. Vérifier les logs de retry dans la console
3. Vérifier la connexion internet
4. Vérifier les logs Supabase (Dashboard → Logs)

---

## ✅ Checklist de Validation

Avant de considérer que tout fonctionne :

- [ ] Test 1 : Première connexion ✅
- [ ] Test 2 : Rechargement de page ✅
- [ ] Test 3 : Reconnexion ✅
- [ ] Test 4 : Navigation entre pages ✅
- [ ] Pas d'erreurs dans la console
- [ ] Pas de requêtes en boucle dans Network
- [ ] Cookies présents et correctement configurés
- [ ] Session persistante après refresh

---

## 📊 Résultats Attendus

### ✅ Succès
- Connexion fonctionne
- Rechargement sans boucle
- Session persistante
- Navigation fluide
- Pas d'erreurs

### ❌ Échec
- Boucle infinie persiste
- Session non synchronisée
- Erreurs répétées
- Requêtes en boucle

---

## 🎯 Prochaines Étapes

Si tous les tests passent :
1. ✅ Le problème est résolu
2. ✅ Vous pouvez utiliser la console admin normalement
3. ✅ La session persiste correctement

Si un test échoue :
1. 📝 Noter quel test échoue
2. 📝 Noter les erreurs dans la console
3. 📝 Vérifier les logs dans Network
4. 🔄 Réessayer après avoir vidé le cache

---

**Bon test ! 🚀**

