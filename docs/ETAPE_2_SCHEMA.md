# Étape 2 : Créer le Schéma de Base de Données

## 🎯 Objectif de cette étape

Comprendre et créer la structure de votre base de données (les tables et leurs relations).

---

## 📖 Qu'est-ce qu'un Schéma de Base de Données ?

### Analogie Simple

Imaginez une bibliothèque :
- **Base de données** = La bibliothèque entière
- **Table** = Un rayon de livres (ex: "Romans", "Sciences")
- **Ligne (Row)** = Un livre spécifique
- **Colonne (Column)** = Une information sur le livre (titre, auteur, année)

### Dans notre cas

```
Base de données Supabase
├── Table "users" (utilisateurs)
│   ├── Colonnes : id, email, name, role, ...
│   └── Lignes : Chaque utilisateur = une ligne
│
├── Table "players" (joueurs)
│   ├── Colonnes : id, name, age, position, ...
│   └── Lignes : Chaque joueur = une ligne
│
└── Table "messages" (messages)
    ├── Colonnes : id, sender_id, content, ...
    └── Lignes : Chaque message = une ligne
```

---

## 🔍 Concepts Importants

### 1. Types de Données

Chaque colonne a un **type** qui définit ce qu'elle peut contenir :

- **UUID** : Identifiant unique (ex: `550e8400-e29b-41d4-a716-446655440000`)
- **TEXT** : Texte libre (ex: "Amadou Diallo")
- **INTEGER** : Nombre entier (ex: 17)
- **BOOLEAN** : Vrai/Faux (ex: `true` ou `false`)
- **TIMESTAMP** : Date et heure (ex: `2024-01-15 10:30:00`)
- **JSONB** : Données structurées (ex: `{"goals": 15, "assists": 8}`)

### 2. Clés Primaires (Primary Key)

- **C'est quoi ?** Un identifiant unique pour chaque ligne
- **Exemple :** Chaque joueur a un `id` unique
- **Pourquoi ?** Pour identifier de manière unique chaque enregistrement

### 3. Clés Étrangères (Foreign Key)

- **C'est quoi ?** Un lien vers une autre table
- **Exemple :** `player_id` dans la table `messages` pointe vers `id` dans `players`
- **Pourquoi ?** Pour créer des relations entre les tables

### 4. Relations

#### Relation "Un à Plusieurs" (One-to-Many)
```
Un joueur → Plusieurs messages
Un parent → Plusieurs enfants (joueurs)
```

#### Relation "Plusieurs à Plusieurs" (Many-to-Many)
```
Un joueur → Plusieurs coachs
Un coach → Plusieurs joueurs
```

---

## 📊 Structure de Notre Base de Données

### Vue d'Ensemble

```
┌─────────────┐
│   users     │ ← Tous les utilisateurs (joueurs, parents, coachs, clubs)
└──────┬──────┘
       │
       ├───┐
       │   │
┌──────▼───▼──────┐
│    players      │ ← Profils détaillés des joueurs
└──────┬──────────┘
       │
       ├──────────────┐
       │              │
┌──────▼──────┐  ┌────▼──────┐
│  messages   │  │notifications│
└─────────────┘  └───────────┘
```

---

## 🗂️ Tables à Créer

### 1. Table `users` (Utilisateurs)
**Rôle :** Stocker tous les utilisateurs du système

**Colonnes :**
- `id` (UUID) - Identifiant unique
- `email` (TEXT) - Email de connexion
- `password_hash` (TEXT) - Mot de passe crypté
- `role` (TEXT) - Type d'utilisateur : 'player', 'parent', 'coach', 'club', 'admin'
- `created_at` (TIMESTAMP) - Date de création
- `updated_at` (TIMESTAMP) - Dernière modification

### 2. Table `players` (Joueurs)
**Rôle :** Profils détaillés des joueurs

**Colonnes :**
- `id` (UUID) - Identifiant unique
- `user_id` (UUID) - Lien vers `users.id`
- `first_name` (TEXT) - Prénom
- `last_name` (TEXT) - Nom
- `age` (INTEGER) - Âge
- `position` (TEXT) - Poste : 'Attaquant', 'Milieu', 'Défenseur', 'Gardien'
- `category` (TEXT) - Catégorie : 'U12', 'U15', 'U18'
- `nationality` (TEXT) - Nationalité
- `photo_url` (TEXT) - URL de la photo
- `stats` (JSONB) - Statistiques (buts, passes, etc.)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 3. Table `messages` (Messages)
**Rôle :** Messagerie entre utilisateurs

**Colonnes :**
- `id` (UUID) - Identifiant unique
- `sender_id` (UUID) - Qui envoie (lien vers `users.id`)
- `receiver_id` (UUID) - Qui reçoit (lien vers `users.id`)
- `content` (TEXT) - Contenu du message
- `read` (BOOLEAN) - Message lu ou non
- `created_at` (TIMESTAMP)

### 4. Table `notifications` (Notifications)
**Rôle :** Notifications pour les utilisateurs

**Colonnes :**
- `id` (UUID) - Identifiant unique
- `user_id` (UUID) - Pour qui (lien vers `users.id`)
- `type` (TEXT) - Type : 'message', 'payment', 'event', etc.
- `title` (TEXT) - Titre
- `message` (TEXT) - Contenu
- `read` (BOOLEAN) - Notification lue ou non
- `created_at` (TIMESTAMP)

---

## 🚀 Comment Créer les Tables ?

### Méthode 1 : Via l'Interface Supabase (Recommandé pour débuter)

1. Aller dans Supabase Dashboard
2. Cliquer sur "Table Editor"
3. Cliquer sur "New Table"
4. Remplir les colonnes
5. Sauvegarder

### Méthode 2 : Via SQL (Plus rapide, plus puissant)

On va créer des scripts SQL que vous pourrez exécuter dans Supabase.

---

## ✅ Résultat Attendu

Après cette étape, vous aurez :
- ✅ Compris ce qu'est un schéma de base de données
- ✅ Créé toutes les tables nécessaires
- ✅ Défini les relations entre les tables
- ✅ Une base de données prête à être utilisée

---

## 🎯 Prêt ?

On va créer les tables une par une, avec des explications détaillées pour chacune !

