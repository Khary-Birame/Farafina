-- ============================================
-- TABLE: messages
-- ============================================
-- EXPLICATION :
-- Cette table stocke les messages entre utilisateurs.
-- Système de messagerie interne (parents ↔ coachs, joueurs ↔ coachs, etc.)
--
-- RELATIONS :
-- messages.sender_id → users.id (Qui envoie)
-- messages.receiver_id → users.id (Qui reçoit)
-- ============================================

-- Créer la table messages
CREATE TABLE IF NOT EXISTS public.messages (
  -- ID unique
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Qui envoie le message (Foreign Key vers users)
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Qui reçoit le message (Foreign Key vers users)
  receiver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Contenu du message
  content TEXT NOT NULL,
  
  -- Message lu ou non
  read BOOLEAN DEFAULT false,
  
  -- Date de lecture (si lu)
  read_at TIMESTAMP WITH TIME ZONE,
  
  -- Pièces jointes (URLs vers fichiers dans Supabase Storage)
  attachments JSONB DEFAULT '[]'::jsonb,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Pour les conversations (groupe de messages)
  conversation_id UUID, -- ID de la conversation (optionnel, pour grouper les messages)
  
  -- Type de message
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system'))
);

-- ============================================
-- INDEXES
-- ============================================

-- Index sur sender_id pour récupérer les messages envoyés
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);

-- Index sur receiver_id pour récupérer les messages reçus
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON public.messages(receiver_id);

-- Index sur created_at pour trier par date
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

-- Index composite pour les conversations (sender + receiver)
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(sender_id, receiver_id, created_at DESC);

-- Index sur read pour les messages non lus
CREATE INDEX IF NOT EXISTS idx_messages_read ON public.messages(receiver_id, read) WHERE read = false;

-- ============================================
-- CONTRAINTE
-- ============================================
-- EXPLICATION :
-- On ne peut pas s'envoyer un message à soi-même
-- ============================================

ALTER TABLE public.messages
ADD CONSTRAINT check_no_self_message
CHECK (sender_id != receiver_id);

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON TABLE public.messages IS 'Messages entre utilisateurs du système';
COMMENT ON COLUMN public.messages.sender_id IS 'Utilisateur qui envoie le message';
COMMENT ON COLUMN public.messages.receiver_id IS 'Utilisateur qui reçoit le message';
COMMENT ON COLUMN public.messages.attachments IS 'Liste des URLs des pièces jointes en format JSON';

