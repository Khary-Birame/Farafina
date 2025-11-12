-- ============================================
-- TABLE: players
-- ============================================
-- EXPLICATION :
-- Cette table stocke les profils détaillés des joueurs.
-- Chaque joueur a un compte dans "users" ET un profil dans "players".
--
-- RELATION :
-- players.user_id → users.id (Foreign Key)
-- Un joueur = Un utilisateur avec des infos supplémentaires
-- ============================================

-- Créer la table players
CREATE TABLE IF NOT EXISTS public.players (
  -- ID unique
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Lien vers la table users (Foreign Key)
  -- NOT NULL = Obligatoire (chaque joueur doit avoir un compte utilisateur)
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Informations personnelles
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  age INTEGER, -- Peut être calculé depuis date_of_birth, mais stocké pour performance
  
  -- Informations football
  position TEXT CHECK (position IN ('Attaquant', 'Milieu', 'Défenseur', 'Gardien', 'Ailier')),
  preferred_foot TEXT CHECK (preferred_foot IN ('Droit', 'Gauche', 'Ambidextre')),
  category TEXT CHECK (category IN ('U12', 'U15', 'U18', 'Senior')),
  
  -- Informations physiques
  height TEXT, -- Format: "1,78 m" (comme dans le frontend)
  weight TEXT, -- Format: "72 kg" (comme dans le frontend)
  
  -- Informations géographiques
  nationality TEXT,
  country TEXT, -- Pays (utilisé dans le frontend)
  city TEXT, -- Ville (utilisé dans le frontend)
  country_of_birth TEXT,
  
  -- Photos et médias
  photo_url TEXT,
  image TEXT, -- Alias pour photo_url (compatibilité frontend)
  
  -- Performance (score numérique)
  performance NUMERIC(5,2), -- Ex: 8.5, 92.0
  
  -- Statistiques (stockées en JSON pour flexibilité)
  -- Exemple : {
  --   "matchesPlayed": 28, "goals": 15, "assists": 8,
  --   "speed": 9.0, "endurance": 8.5, "intensity": 8.8, "technique": 8.2,
  --   "minutes": 1620, "yellowCards": 2, "redCards": 0
  -- }
  stats JSONB DEFAULT '{}'::jsonb,
  
  -- Informations académiques (stockées en JSON)
  -- Exemple : {"level": "Terminale", "average": 15.5, "attendance": 95}
  academic JSONB DEFAULT '{}'::jsonb,
  academic_level TEXT, -- Pour compatibilité
  school_name TEXT,
  
  -- Section (Garçons/Filles)
  section TEXT CHECK (section IN ('Garçons', 'Filles')) DEFAULT 'Garçons',
  
  -- Commentaires et évaluations
  coach_feedback TEXT, -- Commentaire du coach
  
  -- Vidéos (stockées en JSON)
  -- Exemple : [{"id": 1, "title": "Compilation de buts", "duration": "5:32", "views": 1250}]
  videos JSONB DEFAULT '[]'::jsonb,
  
  -- Highlights (stockées en JSON)
  -- Exemple : [{"title": "Triplé vs École de Football Dakar", "duration": "4:12", "thumbnail": "/path"}]
  highlights JSONB DEFAULT '[]'::jsonb,
  
  -- Évaluations (stockées en JSON)
  -- Exemple : [{"coach": "Mamadou Dieng", "rating": 9, "comment": "Excellent potentiel"}]
  evaluations JSONB DEFAULT '[]'::jsonb,
  
  -- Certificats (stockés en JSON)
  -- Exemple : [{"name": "Certificat d'Excellence", "date": "2024-12", "issuer": "FFA"}]
  certificates JSONB DEFAULT '[]'::jsonb,
  
  -- Statut
  status TEXT CHECK (status IN ('active', 'inactive', 'graduated', 'transferred')) DEFAULT 'active',
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Index sur user_id pour les jointures rapides
CREATE INDEX IF NOT EXISTS idx_players_user_id ON public.players(user_id);

-- Index sur la catégorie pour filtrer par âge
CREATE INDEX IF NOT EXISTS idx_players_category ON public.players(category);

-- Index sur la position pour les recherches
CREATE INDEX IF NOT EXISTS idx_players_position ON public.players(position);

-- Index sur le statut pour filtrer les joueurs actifs
CREATE INDEX IF NOT EXISTS idx_players_status ON public.players(status);

-- Index sur les statistiques (recherche dans le JSON)
CREATE INDEX IF NOT EXISTS idx_players_stats ON public.players USING GIN (stats);

-- ============================================
-- TRIGGER : Mise à jour automatique de updated_at
-- ============================================

CREATE TRIGGER update_players_updated_at
  BEFORE UPDATE ON public.players
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON TABLE public.players IS 'Profils détaillés des joueurs de l''académie';
COMMENT ON COLUMN public.players.user_id IS 'Lien vers le compte utilisateur';
COMMENT ON COLUMN public.players.stats IS 'Statistiques du joueur en format JSON';
COMMENT ON COLUMN public.players.section IS 'Section : Garçons ou Filles';

