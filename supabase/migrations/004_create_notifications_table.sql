-- ============================================
-- TABLE: notifications
-- ============================================
-- EXPLICATION :
-- Cette table stocke les notifications pour les utilisateurs.
-- Notifications : nouveaux messages, paiements, événements, etc.
--
-- RELATION :
-- notifications.user_id → users.id (Pour qui est la notification)
-- ============================================

-- Créer la table notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  -- ID unique
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Pour qui est la notification (Foreign Key vers users)
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Type de notification
  -- 'info' = Information générale
  -- 'success' = Succès (paiement reçu, etc.)
  -- 'warning' = Avertissement
  -- 'error' = Erreur
  -- 'message' = Nouveau message
  -- 'payment' = Paiement reçu/dû
  -- 'event' = Nouvel événement
  -- 'achievement' = Nouveau succès
  -- 'system' = Notification système
  type TEXT NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error', 'message', 'payment', 'event', 'achievement', 'system')),
  
  -- Titre de la notification
  title TEXT NOT NULL,
  
  -- Contenu de la notification
  message TEXT NOT NULL,
  
  -- Lien vers la page concernée (optionnel)
  link TEXT,
  
  -- Notification lue ou non
  read BOOLEAN DEFAULT false,
  
  -- Date de lecture
  read_at TIMESTAMP WITH TIME ZONE,
  
  -- Temps relatif (pour affichage : "Il y a 5 min", "Hier", etc.)
  time_display TEXT,
  
  -- Icône (nom de l'icône Lucide à afficher)
  icon TEXT,
  
  -- Données supplémentaires (JSON flexible)
  -- Exemple : {"player_id": "xxx", "amount": 50000}
  data JSONB DEFAULT '{}'::jsonb,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Index sur user_id pour récupérer les notifications d'un utilisateur
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);

-- Index sur read pour les notifications non lues
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(user_id, read) WHERE read = false;

-- Index sur type pour filtrer par type
CREATE INDEX IF NOT EXISTS idx_notifications_type ON public.notifications(type);

-- Index sur created_at pour trier par date
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON TABLE public.notifications IS 'Notifications pour les utilisateurs';
COMMENT ON COLUMN public.notifications.type IS 'Type de notification : message, payment, event, achievement, system';
COMMENT ON COLUMN public.notifications.data IS 'Données supplémentaires en format JSON';

