-- ============================================
-- FONCTION POUR VÉRIFIER RLS
-- ============================================
-- EXPLICATION :
-- Cette fonction permet de vérifier si RLS est activé sur les tables
-- et de compter les politiques. Utile pour la page de vérification.
-- ============================================

-- Fonction pour vérifier le statut RLS des tables
CREATE OR REPLACE FUNCTION check_rls_status()
RETURNS TABLE (
  tablename TEXT,
  rls_enabled BOOLEAN,
  policy_count BIGINT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.tablename::TEXT,
    t.rowsecurity as rls_enabled,
    COUNT(p.policyname)::BIGINT as policy_count
  FROM pg_tables t
  LEFT JOIN pg_policies p ON t.tablename = p.tablename AND p.schemaname = 'public'
  WHERE t.schemaname = 'public' 
    AND t.tablename IN ('users', 'players', 'messages', 'notifications', 'conversations')
  GROUP BY t.tablename, t.rowsecurity
  ORDER BY t.tablename;
END;
$$;

-- Permettre à tous les utilisateurs authentifiés d'utiliser cette fonction
GRANT EXECUTE ON FUNCTION check_rls_status() TO authenticated;
GRANT EXECUTE ON FUNCTION check_rls_status() TO anon;

-- ============================================
-- COMMENTAIRE
-- ============================================

COMMENT ON FUNCTION check_rls_status() IS 
'Fonction pour vérifier le statut RLS et compter les politiques sur les tables principales';

