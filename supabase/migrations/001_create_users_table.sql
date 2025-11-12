-- ============================================
-- TABLE: users
-- ============================================
-- EXPLICATION :
-- Cette table stocke TOUS les utilisateurs du système.
-- Que ce soit un joueur, un parent, un coach, un club ou un admin,
-- ils sont tous dans cette table.
--
-- POURQUOI UNE SEULE TABLE POUR TOUS ?
-- - Simplifie l'authentification (un seul système)
-- - Facilite les relations (messages, notifications)
-- - Le champ "role" différencie les types d'utilisateurs
-- ============================================

-- Créer la table users
CREATE TABLE IF NOT EXISTS public.users (
  -- ID unique (UUID = Universal Unique Identifier)
  -- Généré automatiquement par Supabase
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Email pour la connexion (unique = un seul compte par email)
  email TEXT UNIQUE NOT NULL,
  
  -- Mot de passe crypté (jamais stocké en clair !)
  -- Supabase gère le cryptage automatiquement
  encrypted_password TEXT,
  
  -- Rôle de l'utilisateur
  -- 'player' = Joueur
  -- 'parent' = Parent
  -- 'coach' = Coach
  -- 'club' = Club/Recruteur
  -- 'admin' = Administrateur
  role TEXT NOT NULL DEFAULT 'player' CHECK (role IN ('player', 'parent', 'coach', 'club', 'admin')),
  
  -- Informations de base
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  
  -- Photo de profil (URL vers l'image stockée dans Supabase Storage)
  avatar_url TEXT,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Email vérifié ou non
  email_verified BOOLEAN DEFAULT false
);

-- ============================================
-- INDEXES
-- ============================================
-- EXPLICATION :
-- Un index accélère les recherches.
-- Comme on cherche souvent par email, on crée un index dessus.
-- ============================================

-- Index sur l'email pour accélérer les recherches
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Index sur le rôle pour filtrer rapidement par type d'utilisateur
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- ============================================
-- TRIGGER : Mise à jour automatique de updated_at
-- ============================================
-- EXPLICATION :
-- Un trigger est une fonction qui s'exécute automatiquement.
-- Ici, à chaque modification, on met à jour "updated_at" automatiquement.
-- ============================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger sur la table users
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMMENTAIRES
-- ============================================
-- Ajouter des commentaires pour la documentation
COMMENT ON TABLE public.users IS 'Table des utilisateurs du système (joueurs, parents, coachs, clubs, admins)';
COMMENT ON COLUMN public.users.role IS 'Rôle de l''utilisateur : player, parent, coach, club, admin';
COMMENT ON COLUMN public.users.email IS 'Email unique pour la connexion';

