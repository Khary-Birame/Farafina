# ✅ Checklist Avant la Mise en Production

Cette checklist vous rappelle les éléments importants à vérifier avant de déployer votre application en production.

---

## 🔐 Sécurité et Authentification

### Email de Confirmation
- [ ] **Réactiver la vérification d'email** dans Supabase Dashboard
  - **Où** : Settings → Auth → Email confirmations
  - **Action** : Activer "Enable email confirmations"
  - **⚠️ Important** : Actuellement désactivé pour le développement

### Variables d'Environnement
- [ ] Vérifier que toutes les variables d'environnement sont configurées en production
- [ ] S'assurer que `SUPABASE_SERVICE_ROLE_KEY` n'est jamais exposé côté client
- [ ] Utiliser des variables d'environnement différentes pour dev/prod

### Row Level Security (RLS)
- [ ] Vérifier que RLS est activé sur toutes les tables
- [ ] Tester que les politiques RLS fonctionnent correctement
- [ ] Vérifier que les utilisateurs ne peuvent accéder qu'à leurs propres données

---

## 📧 Configuration Email

### Templates d'Email
- [ ] Personnaliser les templates d'email dans Supabase Dashboard
  - Confirmation d'inscription
  - Réinitialisation de mot de passe
  - Changement d'email
- [ ] Tester l'envoi d'emails en production
- [ ] Vérifier que les liens de redirection fonctionnent

### SMTP Personnalisé (Optionnel)
- [ ] Configurer un SMTP personnalisé si vous utilisez votre propre domaine
- [ ] Vérifier l'email d'expéditeur
- [ ] Tester l'envoi d'emails via SMTP

### URLs de Redirection
- [ ] Configurer les URLs de redirection dans Supabase
  - **Site URL** : Votre domaine de production
  - **Redirect URLs** : 
    - `https://votre-domaine.com/auth/callback`
    - `https://votre-domaine.com/login`
    - `https://votre-domaine.com`

---

## 🗄️ Base de Données

### Migrations
- [ ] Vérifier que toutes les migrations ont été exécutées
- [ ] Vérifier l'ordre d'exécution des migrations
- [ ] Tester que les triggers fonctionnent correctement

### Sauvegarde
- [ ] Configurer les sauvegardes automatiques dans Supabase
- [ ] Tester la restauration d'une sauvegarde

---

## 🌐 Déploiement

### Domaine
- [ ] Configurer votre nom de domaine
- [ ] Configurer SSL/HTTPS
- [ ] Vérifier que le domaine fonctionne correctement

### Performance
- [ ] Tester les performances de l'application
- [ ] Vérifier les temps de chargement
- [ ] Optimiser les images et assets

---

## 🧪 Tests

### Fonctionnalités
- [ ] Tester l'inscription d'un nouveau compte
- [ ] Tester la connexion
- [ ] Tester la déconnexion
- [ ] Tester la réinitialisation de mot de passe
- [ ] Tester la confirmation d'email
- [ ] Tester les permissions utilisateur (RLS)

### Navigation
- [ ] Tester toutes les pages de l'application
- [ ] Vérifier que les liens fonctionnent
- [ ] Tester la navigation mobile

---

## 📝 Documentation

### README
- [ ] Mettre à jour le README avec les instructions de déploiement
- [ ] Documenter les variables d'environnement nécessaires
- [ ] Ajouter les instructions pour les nouveaux développeurs

---

## 🔍 Points d'Attention Spécifiques

### ⚠️ Actuellement Désactivé (À Réactiver)
- **Vérification d'email** : Désactivée pour le développement
  - **Action requise** : Réactiver dans Supabase Dashboard avant la mise en production

### ✅ Déjà Configuré
- Authentification Supabase
- Schéma de base de données
- Row Level Security (RLS)
- Route de callback pour confirmation d'email
- Templates d'email personnalisables

---

## 🚀 Après le Déploiement

- [ ] Monitorer les erreurs dans Supabase Dashboard
- [ ] Vérifier les logs d'authentification
- [ ] Tester avec de vrais utilisateurs
- [ ] Surveiller les performances

---

**Date de dernière mise à jour** : À compléter  
**Version** : 1.0.0

