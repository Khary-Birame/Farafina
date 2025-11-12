-- ============================================
-- ACTIVATION DE ROW LEVEL SECURITY (RLS)
-- ============================================
-- EXPLICATION :
-- Cette migration active RLS sur toutes les tables.
-- RLS empêche l'accès aux données sauf si une politique l'autorise explicitement.
--
-- IMPORTANT :
-- Après avoir activé RLS, par défaut, PERSONNE ne peut accéder aux données.
-- Il faut créer des politiques pour autoriser l'accès.
-- ============================================

-- Activer RLS sur la table users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Activer RLS sur la table players
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

-- Activer RLS sur la table messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Activer RLS sur la table notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Activer RLS sur la table conversations
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON TABLE public.users IS 'RLS activé - Les utilisateurs ne peuvent voir que leur propre profil (sauf admins)';
COMMENT ON TABLE public.players IS 'RLS activé - Accès restreint selon le rôle (joueur, parent, coach, club, admin)';
COMMENT ON TABLE public.messages IS 'RLS activé - Les utilisateurs ne peuvent voir que leurs propres messages';
COMMENT ON TABLE public.notifications IS 'RLS activé - Les utilisateurs ne peuvent voir que leurs propres notifications';
COMMENT ON TABLE public.conversations IS 'RLS activé - Les utilisateurs ne peuvent voir que leurs propres conversations';

