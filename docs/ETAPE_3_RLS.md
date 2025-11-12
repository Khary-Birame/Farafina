# Étape 3 : Row Level Security (RLS) - Sécurité des Données

## 🎯 Objectif de cette étape

Comprendre et configurer la sécurité des données pour que chaque utilisateur ne puisse accéder qu'aux données qui lui appartiennent.

---

## 📖 Qu'est-ce que Row Level Security (RLS) ?

### Analogie Simple

Imaginez un immeuble avec plusieurs appartements :
- **Sans RLS** : Tout le monde peut entrer dans tous les appartements
- **Avec RLS** : Chaque personne a une clé uniquement pour son appartement

### Dans notre cas

**Sans RLS :**
- ❌ Un parent pourrait voir les données de tous les joueurs
- ❌ Un joueur pourrait voir les messages des autres
- ❌ N'importe qui pourrait modifier les données

**Avec RLS :**
- ✅ Un parent voit uniquement les données de son enfant
- ✅ Un joueur voit uniquement ses propres messages
- ✅ Seuls les admins peuvent modifier certaines données

---

## 🔍 Comment ça fonctionne ?

### Principe

RLS utilise des **politiques (policies)** qui définissent :
- **Qui** peut faire **quoi** sur **quelles données**

### Exemple Concret

```sql
-- Politique : Un parent ne peut voir que les données de son enfant
CREATE POLICY "Parents can only see their child's data"
ON players FOR SELECT
USING (
  -- Vérifier que le joueur est l'enfant du parent connecté
  id IN (
    SELECT player_id FROM parent_players 
    WHERE parent_id = auth.uid()
  )
);
```

**Explication :**
- `FOR SELECT` = Pour les lectures
- `USING (...)` = Condition à respecter
- `auth.uid()` = ID de l'utilisateur connecté

---

## 🛡️ Politiques à Créer

### 1. Table `users`
- ✅ Les utilisateurs peuvent voir leur propre profil
- ✅ Les admins peuvent voir tous les profils
- ✅ Les utilisateurs peuvent modifier leur propre profil

### 2. Table `players`
- ✅ Les joueurs peuvent voir leur propre profil
- ✅ Les parents peuvent voir le profil de leur enfant
- ✅ Les coachs peuvent voir les profils de leurs joueurs
- ✅ Les clubs peuvent voir les profils publics (avec NDA)
- ✅ Les admins peuvent tout voir

### 3. Table `messages`
- ✅ Les utilisateurs peuvent voir leurs messages (envoyés et reçus)
- ✅ Les utilisateurs peuvent envoyer des messages
- ✅ Les utilisateurs peuvent modifier leurs propres messages

### 4. Table `notifications`
- ✅ Les utilisateurs peuvent voir uniquement leurs notifications
- ✅ Les utilisateurs peuvent marquer leurs notifications comme lues

### 5. Table `conversations`
- ✅ Les utilisateurs peuvent voir leurs conversations
- ✅ Les utilisateurs peuvent créer des conversations

---

## 🔐 Concepts Importants

### `auth.uid()`
- Fonction Supabase qui retourne l'ID de l'utilisateur connecté
- `NULL` si personne n'est connecté
- Utilisé dans les politiques pour identifier l'utilisateur

### Types d'Opérations
- **SELECT** : Lire les données
- **INSERT** : Créer de nouvelles données
- **UPDATE** : Modifier les données
- **DELETE** : Supprimer les données

### Types de Politiques
- **USING** : Pour SELECT, UPDATE, DELETE (vérification de lecture)
- **WITH CHECK** : Pour INSERT, UPDATE (vérification d'écriture)

---

## ✅ Résultat Attendu

Après cette étape, vous aurez :
- ✅ Compris ce qu'est RLS
- ✅ Activé RLS sur toutes les tables
- ✅ Créé les politiques de sécurité
- ✅ Testé que la sécurité fonctionne

---

## 🚀 Prêt ?

On va créer les politiques une par une, avec des explications détaillées pour chacune !

