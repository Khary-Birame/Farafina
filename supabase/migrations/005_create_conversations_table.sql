-- ============================================
-- TABLE: conversations
-- ============================================
-- EXPLICATION :
-- Cette table stocke les conversations (groupes de messages).
-- Utile pour organiser les messages entre deux utilisateurs.
--
-- RELATIONS :
-- conversations.user1_id → users.id
-- conversations.user2_id → users.id
-- ============================================

-- Créer la table conversations
CREATE TABLE IF NOT EXISTS public.conversations (
  -- ID unique
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Les deux participants à la conversation
  user1_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Dernier message (pour affichage rapide)
  last_message TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE,
  
  -- Nombre de messages non lus par chaque utilisateur
  unread_count_user1 INTEGER DEFAULT 0,
  unread_count_user2 INTEGER DEFAULT 0,
  
  -- Statut en ligne (optionnel, peut être calculé en temps réel)
  user1_online BOOLEAN DEFAULT false,
  user2_online BOOLEAN DEFAULT false,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Index pour trouver les conversations d'un utilisateur
CREATE INDEX IF NOT EXISTS idx_conversations_user1 ON public.conversations(user1_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user2 ON public.conversations(user2_id);

-- Index composite pour trouver une conversation spécifique
CREATE INDEX IF NOT EXISTS idx_conversations_users ON public.conversations(user1_id, user2_id);

-- Index sur last_message_at pour trier par date
CREATE INDEX IF NOT EXISTS idx_conversations_last_message ON public.conversations(last_message_at DESC);

-- ============================================
-- CONTRAINTE
-- ============================================
-- Une seule conversation entre deux utilisateurs
-- ============================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_conversations_unique 
ON public.conversations(LEAST(user1_id, user2_id), GREATEST(user1_id, user2_id));

-- ============================================
-- TRIGGER
-- ============================================

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON TABLE public.conversations IS 'Conversations entre utilisateurs';
COMMENT ON COLUMN public.conversations.user1_id IS 'Premier participant';
COMMENT ON COLUMN public.conversations.user2_id IS 'Deuxième participant';

