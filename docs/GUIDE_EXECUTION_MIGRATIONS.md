# Guide Détaillé : Exécuter les Migrations SQL dans Supabase

Ce guide vous explique étape par étape comment exécuter les migrations SQL pour activer RLS (Row Level Security) dans votre base de données Supabase.

---

## 📋 Prérequis

- ✅ Avoir un compte Supabase
- ✅ Avoir créé un projet Supabase
- ✅ Avoir configuré les variables d'environnement (voir `docs/CONFIGURATION_SUPABASE.md`)
- ✅ Avoir les fichiers de migration dans le dossier `supabase/migrations/`

---

## 🚀 Étape 1 : Accéder au SQL Editor

1. **Ouvrez votre navigateur** et allez sur [https://supabase.com](https://supabase.com)

2. **Connectez-vous** à votre compte Supabase

3. **Sélectionnez votre projet** dans la liste des projets
   - Si vous avez plusieurs projets, choisissez celui avec l'URL : `https://ngckzqmrytzxxauvkwid.supabase.co`

4. **Dans le menu de gauche**, cliquez sur **"SQL Editor"** (ou "Éditeur SQL")
   - C'est l'icône qui ressemble à un terminal ou à des lignes de code
   - Vous pouvez aussi utiliser le raccourci : `Alt + S` (Windows) ou `Cmd + S` (Mac)

5. **Vous devriez voir** :
   - Une zone de texte blanche (l'éditeur SQL)
   - Un bouton "Run" (Exécuter) en bas à droite
   - Un historique de vos requêtes à gauche

---

## 📝 Étape 2 : Exécuter la Première Migration (006_enable_rls.sql)

### 2.1 Ouvrir le fichier de migration

1. **Dans votre éditeur de code** (VS Code, etc.), ouvrez le fichier :
   ```
   supabase/migrations/006_enable_rls.sql
   ```

2. **Sélectionnez tout le contenu** du fichier :
   - Windows/Linux : `Ctrl + A`
   - Mac : `Cmd + A`

3. **Copiez le contenu** :
   - Windows/Linux : `Ctrl + C`
   - Mac : `Cmd + C`

### 2.2 Coller dans Supabase

1. **Retournez dans Supabase SQL Editor**

2. **Cliquez dans la zone de texte** (l'éditeur SQL)

3. **Effacez tout le contenu existant** s'il y en a :
   - Windows/Linux : `Ctrl + A` puis `Suppr`
   - Mac : `Cmd + A` puis `Suppr`

4. **Collez le contenu copié** :
   - Windows/Linux : `Ctrl + V`
   - Mac : `Cmd + V`

### 2.3 Exécuter la migration

1. **Vérifiez que le SQL est correct** (vous devriez voir des commandes `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`)

2. **Cliquez sur le bouton "Run"** en bas à droite
   - Ou utilisez le raccourci : `Ctrl + Enter` (Windows/Linux) ou `Cmd + Enter` (Mac)

3. **Attendez quelques secondes** - Supabase va exécuter la requête

4. **Vérifiez le résultat** :
   - ✅ **Succès** : Vous verrez un message vert "Success" et le nombre de lignes affectées
   - ❌ **Erreur** : Vous verrez un message rouge avec l'erreur (voir section "Résolution des erreurs" ci-dessous)

### 2.4 Exemple de résultat attendu

```
Success. No rows returned
```

ou

```
Success. 5 rows affected
```

---

## 🔄 Étape 3 : Répéter pour les Autres Migrations

Répétez l'**Étape 2** pour chaque fichier de migration **dans l'ordre suivant** :

### Ordre d'exécution :

1. ✅ **006_enable_rls.sql** - Active RLS sur toutes les tables
2. ✅ **007_create_rls_policies_users.sql** - Crée les politiques pour la table `users`
3. ✅ **008_create_rls_policies_players.sql** - Crée les politiques pour la table `players`
4. ✅ **009_create_rls_policies_messages.sql** - Crée les politiques pour la table `messages`
5. ✅ **010_create_rls_policies_notifications.sql** - Crée les politiques pour la table `notifications`
6. ✅ **011_create_rls_policies_conversations.sql** - Crée les politiques pour la table `conversations`
7. ✅ **012_create_rls_check_function.sql** - Crée la fonction de vérification (optionnel mais recommandé)

### ⚠️ Important

- **Exécutez-les dans l'ordre** : chaque migration dépend des précédentes
- **Attendez que chaque migration soit terminée** avant de passer à la suivante
- **Ne sautez aucune étape**

---

## 🎯 Étape 4 : Vérifier que Tout Fonctionne

### 4.1 Vérifier dans Supabase

1. **Dans Supabase**, allez dans **"Table Editor"** (Éditeur de tables)

2. **Sélectionnez une table** (par exemple `users`)

3. **Cliquez sur l'onglet "Policies"** (Politiques)

4. **Vous devriez voir** :
   - Des politiques listées (par exemple "Users can view their own profile")
   - Un indicateur que RLS est activé

### 4.2 Vérifier dans l'Application

1. **Retournez dans votre application** Next.js

2. **Allez sur la page de vérification** :
   ```
   http://localhost:3000/verify-rls
   ```

3. **Cliquez sur "Vérifier à nouveau"**

4. **Vous devriez voir** :
   - ✅ Toutes les tables avec un cadenas vert (RLS activé)
   - ✅ Statut "Sécurisé" au lieu de "Partiel"
   - ✅ Le nombre de politiques pour chaque table

---

## 🐛 Résolution des Erreurs Courantes

### Erreur 1 : "relation does not exist"

**Message d'erreur** :
```
relation "public.users" does not exist
```

**Cause** : Les tables n'ont pas encore été créées.

**Solution** :
1. Exécutez d'abord les migrations de création de tables (001 à 005)
2. Vérifiez dans "Table Editor" que les tables existent

---

### Erreur 2 : "permission denied"

**Message d'erreur** :
```
permission denied for schema public
```

**Cause** : Vous n'avez pas les permissions nécessaires.

**Solution** :
1. Vérifiez que vous êtes connecté avec le bon compte
2. Vérifiez que vous êtes le propriétaire du projet Supabase

---

### Erreur 3 : "duplicate key value"

**Message d'erreur** :
```
duplicate key value violates unique constraint
```

**Cause** : La migration a déjà été exécutée.

**Solution** :
1. C'est normal si vous réexécutez une migration
2. Vous pouvez ignorer cette erreur ou commenter les lignes déjà exécutées

---

### Erreur 4 : "syntax error"

**Message d'erreur** :
```
syntax error at or near "..."
```

**Cause** : Erreur de syntaxe SQL dans le fichier.

**Solution** :
1. Vérifiez que vous avez copié tout le contenu du fichier
2. Vérifiez qu'il n'y a pas de caractères étranges
3. Vérifiez que chaque commande SQL se termine par un `;`

---

## 💡 Astuces et Bonnes Pratiques

### Astuce 1 : Exécuter Plusieurs Migrations en Une Fois

Vous pouvez copier le contenu de plusieurs fichiers et les exécuter ensemble, **mais seulement si** :
- ✅ Vous les exécutez dans le bon ordre
- ✅ Vous les séparez par des lignes vides ou des commentaires
- ✅ Vous êtes sûr qu'elles ne dépendent pas les unes des autres

**Exemple** :
```sql
-- Migration 1
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Migration 2
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);
```

### Astuce 2 : Sauvegarder vos Requêtes

1. **Dans Supabase SQL Editor**, cliquez sur **"Save"** (Sauvegarder)
2. **Donnez un nom** à votre requête (ex: "Enable RLS")
3. **Vous pourrez la réutiliser** plus tard dans l'onglet "Saved queries"

### Astuce 3 : Vérifier l'Historique

1. **Dans Supabase SQL Editor**, regardez l'onglet **"History"** (Historique)
2. **Vous verrez** toutes les requêtes que vous avez exécutées
3. **Vous pouvez les réexécuter** en cliquant dessus

---

## ✅ Checklist de Vérification

Avant de considérer que tout est terminé, vérifiez :

- [ ] Toutes les 7 migrations ont été exécutées avec succès
- [ ] Aucune erreur rouge dans Supabase SQL Editor
- [ ] La page `/verify-rls` montre "Sécurisé" au lieu de "Partiel"
- [ ] Toutes les tables ont un cadenas vert (RLS activé)
- [ ] Le nombre de politiques est affiché pour chaque table

---

## 🆘 Besoin d'Aide ?

Si vous rencontrez des problèmes :

1. **Vérifiez la console du navigateur** (F12) pour voir les erreurs
2. **Vérifiez les logs Supabase** dans le dashboard
3. **Relisez ce guide** étape par étape
4. **Vérifiez que vos fichiers de migration sont complets**

---

## 📚 Prochaines Étapes

Une fois que RLS est activé :

1. ✅ **Étape 4** : Intégrer l'authentification Supabase (login, signup)
2. ✅ **Étape 5** : Créer les helpers et utilitaires pour interagir avec Supabase
3. ✅ **Étape 6** : Connecter les premières fonctionnalités (ex: liste des joueurs)

---

**Félicitations !** 🎉 Vous avez maintenant sécurisé votre base de données avec Row Level Security.

