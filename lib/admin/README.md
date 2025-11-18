# Configuration Admin avec Supabase

## 📁 Structure créée

```
lib/admin/
├── hooks/
│   ├── use-admin-dashboard.ts    # Hook pour les KPIs du dashboard
│   ├── use-admin-players.ts       # Hook pour la gestion des joueurs
│   └── use-admin-orders.ts        # Hook pour les commandes/paiements
├── services/
│   └── dashboard-stats.ts         # Services pour les statistiques (graphiques)
└── auth/
    └── admin-auth.ts              # Vérification des permissions admin
```

## ✅ Modifications effectuées

### 1. Hooks créés

#### `useAdminDashboard()`
- Récupère tous les KPIs depuis Supabase
- Retourne : `{ kpis, loading, error }`
- KPIs disponibles :
  - `totalPlayers` : Nombre total de joueurs
  - `activePlayers` : Joueurs actifs
  - `inactivePlayers` : Joueurs inactifs
  - `pendingPayments` : Paiements en attente
  - `monthlyRevenue` : Revenus du mois
  - `unreadNotifications` : Notifications non lues
  - `pendingApplications` : Candidatures en attente
  - `totalUsers` : Total utilisateurs

#### `useAdminPlayers(filters?)`
- Récupère la liste des joueurs avec filtres optionnels
- Filtres disponibles : `category`, `position`, `status`, `search`
- Retourne : `{ players, loading, error }`

#### `useAdminOrders(filters?)`
- Récupère les commandes/paiements
- Filtres disponibles : `status`, `payment_status`, `search`
- Retourne : `{ orders, loading, error }`

### 2. Services créés

#### `getAttendanceStats()`
- Récupère les statistiques de présence
- Retourne des données par défaut si aucune table `training_attendance` n'existe

#### `getAcademicPerformance()`
- Récupère les performances académiques depuis `players.academic` (JSONB)
- Calcule les moyennes par matière

#### `getFinancialData()`
- Récupère les données financières depuis `orders`
- Groupe par mois et calcule revenus/dépenses

### 3. Authentification

#### `checkAdminAccess()`
- Vérifie si l'utilisateur connecté a le rôle `admin`
- Retourne : `{ isAdmin, user, error }`

## 🔄 Pages modifiées

### `/admin` (Dashboard)
- ✅ Utilise `useAdminDashboard()` pour les KPIs
- ✅ Utilise les services pour les graphiques
- ✅ Fallback vers données mockées si Supabase vide

### `/admin/players`
- ✅ Utilise `useAdminPlayers()` pour la liste
- ✅ Calcule les statistiques depuis les données réelles
- ✅ Fallback vers données mockées

### `/admin/finance`
- ✅ Utilise `useAdminOrders()` pour les paiements
- ✅ Utilise `useAdminDashboard()` pour les KPIs financiers
- ✅ Fallback vers données mockées

## 🛡️ Sécurité

Les hooks utilisent le client Supabase avec la clé `anon`, qui est sécurisée via Row Level Security (RLS).

Pour les opérations admin, utilisez `checkAdminAccess()` avant d'afficher les pages sensibles.

## 📝 Prochaines étapes recommandées

1. **Créer les tables manquantes** (optionnel) :
   - `training_sessions` : Sessions d'entraînement
   - `training_attendance` : Présence aux entraînements
   - `matches` : Matchs
   - `injuries` : Blessures

2. **Ajouter l'authentification admin** :
   ```typescript
   // Dans app/admin/layout.tsx ou middleware
   import { checkAdminAccess } from '@/lib/admin/auth/admin-auth'
   
   // Vérifier l'accès avant de rendre la page
   ```

3. **Améliorer les graphiques** :
   - Séparer les revenus par devise (XOF, EUR, USD)
   - Ajouter des filtres de date
   - Implémenter la répartition des blessures depuis une table dédiée

4. **Ajouter des fonctionnalités** :
   - Export CSV/Excel
   - Filtres avancés
   - Pagination côté serveur
   - Recherche en temps réel

## 🧪 Tester

1. Vérifiez que vos variables d'environnement Supabase sont configurées
2. Visitez `/admin` - les données devraient se charger depuis Supabase
3. Si Supabase est vide, les données mockées s'afficheront (fallback)
4. Ajoutez des données dans Supabase et rafraîchissez - elles devraient apparaître

## ⚠️ Notes importantes

- Les données mockées sont utilisées comme fallback si Supabase est vide ou en cas d'erreur
- Tous les hooks gèrent les erreurs gracieusement
- Les chargements sont indiqués avec des "..." ou des messages de chargement
- Les données sont formatées pour correspondre au format attendu par le frontend


