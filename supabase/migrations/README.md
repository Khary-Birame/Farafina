# 📁 Migrations Supabase

## 📖 Qu'est-ce qu'une Migration ?

Une **migration** est un script SQL qui modifie la structure de votre base de données.

**Pourquoi utiliser des migrations ?**
- ✅ Versionner les changements (comme Git pour le code)
- ✅ Appliquer les mêmes changements sur différents environnements
- ✅ Historique des modifications
- ✅ Facile à partager avec l'équipe

---

## 🚀 Comment Appliquer ces Migrations ?

### Méthode 1 : Via l'Interface Supabase (Recommandé pour débuter)

1. **Aller dans Supabase Dashboard**
   - Connectez-vous sur [supabase.com](https://supabase.com)
   - Sélectionnez votre projet

2. **Ouvrir l'éditeur SQL**
   - Dans le menu de gauche, cliquez sur **SQL Editor**
   - Cliquez sur **New Query**

3. **Exécuter les migrations dans l'ordre**
   - Ouvrir `001_create_users_table.sql`
   - Copier tout le contenu
   - Coller dans l'éditeur SQL
   - Cliquer sur **Run** (ou Ctrl+Enter)
   - Répéter pour chaque fichier dans l'ordre :
     - `001_create_users_table.sql`
     - `002_create_players_table.sql`
     - `003_create_messages_table.sql`
     - `004_create_notifications_table.sql`
     - `005_create_conversations_table.sql`
     - `006_enable_rls.sql` (Activer RLS)
     - `007_create_rls_policies_users.sql` (Politiques pour users)
     - `008_create_rls_policies_players.sql` (Politiques pour players)
     - `009_create_rls_policies_messages.sql` (Politiques pour messages)
     - `010_create_rls_policies_notifications.sql` (Politiques pour notifications)
     - `011_create_rls_policies_conversations.sql` (Politiques pour conversations)
     - `012_create_rls_check_function.sql` (Fonction de vérification RLS - optionnel)
     - `013_create_auth_trigger.sql` (Trigger pour synchroniser auth.users et public.users)
     - `014_fix_users_update_policy.sql` (Correction de la politique UPDATE)
     - `015_mark_all_emails_verified.sql` (Marquer tous les emails comme vérifiés - développement uniquement)
     - `016_fix_users_update_policy_recursion.sql` (Correction de la récursion infinie - IMPORTANT)

4. **Vérifier**
   - Aller dans **Table Editor**
   - Vous devriez voir les 4 tables créées !

### Méthode 2 : Via la CLI Supabase (Avancé)

```bash
# Installer la CLI Supabase
npm install -g supabase

# Se connecter
supabase login

# Lier le projet
supabase link --project-ref votre-project-ref

# Appliquer les migrations
supabase db push
```

---

## 📋 Ordre d'Exécution

**IMPORTANT :** Exécutez les migrations dans cet ordre :

1. ✅ `001_create_users_table.sql` - D'abord les utilisateurs
2. ✅ `002_create_players_table.sql` - Ensuite les joueurs (dépend de users)
3. ✅ `003_create_messages_table.sql` - Puis les messages (dépend de users)
4. ✅ `004_create_notifications_table.sql` - Ensuite les notifications (dépend de users)
5. ✅ `005_create_conversations_table.sql` - Enfin les conversations (dépend de users)
6. ✅ `006_enable_rls.sql` - Activer RLS sur toutes les tables
7. ✅ `007_create_rls_policies_users.sql` - Politiques de sécurité pour users
8. ✅ `008_create_rls_policies_players.sql` - Politiques de sécurité pour players
9. ✅ `009_create_rls_policies_messages.sql` - Politiques de sécurité pour messages
10. ✅ `010_create_rls_policies_notifications.sql` - Politiques de sécurité pour notifications
11. ✅ `011_create_rls_policies_conversations.sql` - Politiques de sécurité pour conversations
12. ✅ `012_create_rls_check_function.sql` - Fonction pour vérifier RLS (optionnel, pour la page de vérification)
13. ✅ `013_create_auth_trigger.sql` - Trigger pour synchroniser auth.users et public.users (IMPORTANT pour l'authentification)
14. ✅ `014_fix_users_update_policy.sql` - Correction de la politique UPDATE pour permettre la mise à jour lors de la création initiale
15. ✅ `015_mark_all_emails_verified.sql` - Marquer tous les emails existants comme vérifiés (utile en développement quand la vérification d'email est désactivée)
16. ✅ `016_fix_users_update_policy_recursion.sql` - Correction de la récursion infinie dans la politique UPDATE (IMPORTANT - à exécuter si vous avez l'erreur "infinite recursion")

**Pourquoi cet ordre ?**
- `players` a besoin de `users` (Foreign Key)
- `messages` a besoin de `users` (Foreign Keys)
- `notifications` a besoin de `users` (Foreign Key)

---

## ✅ Vérification

Après avoir exécuté toutes les migrations, vous devriez avoir :

- ✅ Table `users` avec toutes les colonnes
- ✅ Table `players` avec toutes les colonnes (stats, academic, videos, highlights, evaluations, certificates)
- ✅ Table `messages` avec toutes les colonnes
- ✅ Table `notifications` avec toutes les colonnes
- ✅ Table `conversations` avec toutes les colonnes
- ✅ Tous les index créés
- ✅ Tous les triggers créés

---

## 🐛 Dépannage

### Erreur : "relation already exists"
**Cause :** La table existe déjà
**Solution :** Supprimer la table dans Supabase → Table Editor → Delete Table, puis réexécuter

### Erreur : "foreign key constraint"
**Cause :** Ordre d'exécution incorrect
**Solution :** Exécuter dans l'ordre : 001 → 002 → 003 → 004

### Erreur : "function already exists"
**Cause :** La fonction `update_updated_at_column` existe déjà
**Solution :** C'est normal, continuer quand même

---

## 📚 Prochaine Étape

Une fois les tables créées, on passera à :
**Étape 3 : Configurer Row Level Security (RLS)**

---

**Questions ?** N'hésitez pas à demander ! 😊

