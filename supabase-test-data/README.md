# Données de Test pour Supabase

Ce dossier contient des fichiers CSV pour tester toutes les tables de la base de données Supabase avec des données cohérentes et réalistes.

## 📁 Structure des Fichiers

Chaque fichier CSV correspond à une table de la base de données et contient des données de test qui permettront de :

- ✅ Vérifier que toutes les statistiques s'affichent correctement
- ✅ Tester les graphiques avec des données réelles
- ✅ Valider les fonctionnalités de chaque page admin
- ✅ Vérifier les relations entre tables (foreign keys)

## 🗂️ Fichiers Disponibles

### Tables Principales

1. **users.csv** - Utilisateurs (admin, coaches, parents, joueurs, clubs) - 16 utilisateurs
2. **players.csv** - Profils détaillés des joueurs avec données académiques et statistiques - 10 joueurs
3. **training_sessions.csv** - Sessions d'entraînement avec venue et type - 13 sessions
4. **training_attendance.csv** - Présence aux entraînements (pour calculer les taux de présence) - 39 enregistrements
5. **matches.csv** - Matchs programmés avec venues et heures - 5 matchs
6. **orders.csv** - Commandes/paiements avec différentes devises (XOF, EUR, USD) et statuts - 13 commandes
7. **order_items.csv** - Articles des commandes - 4 articles
8. **messages.csv** - Messages entre utilisateurs - 5 messages
9. **conversations.csv** - Conversations entre utilisateurs - 3 conversations
10. **notifications.csv** - Notifications pour les utilisateurs - 5 notifications
11. **academic_history.csv** - Historique académique sur 6 mois pour tester le graphique d'évolution - 24 enregistrements
12. **talent_analyses.csv** - Analyses IA des talents pour la page scouting - 10 analyses
13. **injuries.csv** - Blessures des joueurs - 3 blessures
14. **form_submissions.csv** - Soumissions de formulaires - 4 soumissions
15. **categories.csv** - Catégories de produits - 3 catégories
16. **products.csv** - Produits de la boutique - 3 produits
17. **product_variants.csv** - Variantes de produits - 5 variantes
18. **product_images.csv** - Images de produits - 3 images
19. **product_reviews.csv** - Avis sur les produits - 3 avis
20. **addresses.csv** - Adresses des utilisateurs - 4 adresses
21. **coupons.csv** - Codes promo - 3 coupons
22. **wishlist.csv** - Listes de souhaits - 4 éléments

## 📊 Données Incluses

### Pour les Statistiques

- **Joueurs** : 10 joueurs (tous actifs) avec différentes positions, catégories (U15, U18) et pays (SN, ML, GN)
- **Présence** : 39 enregistrements de présence pour 13 sessions permettant de calculer des taux variés (75%, 80%, 85%, 90%, 100%)
- **Paiements** : 13 commandes avec différents statuts (pending, paid, processing, shipped, delivered) et devises (XOF, EUR, USD)
- **Académique** : Données académiques pour tester les moyennes et graphiques (données JSONB dans players)
- **Scouting** : 10 analyses IA avec différents niveaux de potentiel (2 Très élevé, 5 Élevé, 2 Moyen, 1 À Développer)
- **Historique académique** : 24 enregistrements sur 6 mois (août 2023 - janvier 2024) pour 4 joueurs

### Pour les Graphiques

- **Présence** : Données sur 4 mois (novembre 2023 - février 2024) pour voir l'évolution mensuelle
- **Académique** : Historique sur 6 mois (août 2023 - janvier 2024) pour le graphique d'évolution
- **Finances** : Revenus séparés par devise (XOF, EUR, USD) sur 4 mois (novembre 2023 - février 2024)

## 🔗 Relations Entre Tables

Les données sont cohérentes avec les foreign keys :

- `players.user_id` → `users.id`
- `training_sessions.coach_id` → `users.id`
- `training_attendance.player_id` → `players.id`
- `training_attendance.session_id` → `training_sessions.id`
- `messages.sender_id` et `receiver_id` → `users.id`
- `notifications.user_id` → `users.id`
- `orders.user_id` → `users.id`
- `academic_history.player_id` → `players.id`
- `talent_analyses.player_id` → `players.id`

## 📝 Instructions d'Import

### Via l'Interface Supabase

1. Allez dans votre projet Supabase
2. Cliquez sur "Table Editor" dans le menu de gauche
3. Pour chaque table :
   - Sélectionnez la table
   - Cliquez sur "Insert" → "Import data from CSV"
   - Uploadez le fichier CSV correspondant
   - Vérifiez que les colonnes correspondent
   - Cliquez sur "Import"

### Ordre d'Import Recommandé

**Important** : Respectez cet ordre pour éviter les erreurs de foreign keys :

1. `users.csv` (table de base, pas de dépendances)
2. `players.csv` (dépend de users)
3. `categories.csv` (pour les produits)
4. `products.csv` (dépend de categories)
5. `product_variants.csv` (dépend de products)
6. `product_images.csv` (dépend de products)
7. `addresses.csv` (dépend de users)
8. `coupons.csv` (table indépendante)
9. `training_sessions.csv` (dépend de users pour coach_id)
10. `training_attendance.csv` (dépend de players et training_sessions)
11. `matches.csv` (table indépendante)
12. `orders.csv` (dépend de users)
13. `order_items.csv` (dépend de orders et products/product_variants)
14. `messages.csv` (dépend de users)
15. `conversations.csv` (dépend de users)
16. `notifications.csv` (dépend de users)
17. `academic_history.csv` (dépend de players)
18. `talent_analyses.csv` (dépend de players)
19. `injuries.csv` (dépend de players)
20. `form_submissions.csv` (dépend optionnellement de users)
21. `product_reviews.csv` (dépend de products et users)
22. `wishlist.csv` (dépend de users et products)

## ⚠️ Notes Importantes

- Les UUIDs sont fixes pour garantir la cohérence des relations
- Les dates sont récentes (2024) pour que les données apparaissent dans les pages admin
- Les données JSONB sont formatées en JSON valide
- Les statuts de paiement varient pour tester tous les cas (pending, paid, delivered, etc.)
- Les devises varient (XOF, EUR, USD) pour tester le graphique par devise
- Les données de présence sont variées pour avoir des taux différents par joueur

## ✅ Après l'Import

Une fois les données importées, vous devriez pouvoir :

- ✅ Voir des statistiques réalistes dans le dashboard admin
- ✅ Voir des graphiques avec des données dans les pages admin
- ✅ Tester les listes (joueurs, paiements, messages, etc.)
- ✅ Vérifier les filtres et recherches
- ✅ Tester les relations entre les données

## 🔍 Vérifications

Après l'import, vérifiez :

1. **Page Players** : Doit afficher 10 joueurs avec des taux de présence calculés
2. **Page Training** : Doit afficher 8 sessions et 4 matchs à venir
3. **Page Academic** : Doit afficher des moyennes et un graphique d'évolution sur 6 mois
4. **Page Finance** : Doit afficher des revenus séparés par devise (XOF, EUR, USD)
5. **Page Scouting** : Doit afficher 8 analyses IA avec différents niveaux
6. **Page Messagerie** : Doit afficher des messages et notifications
