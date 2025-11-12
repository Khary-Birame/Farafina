-- ============================================
-- MIGRATION : Marquer tous les emails comme vérifiés
-- ============================================
-- EXPLICATION :
-- Cette migration marque tous les emails existants comme vérifiés
-- dans auth.users. Utile quand la vérification d'email est désactivée
-- pour le développement.
--
-- ATTENTION :
-- Utilisez cette migration uniquement en développement ou si vous
-- êtes sûr que tous les emails sont valides.
-- ============================================

-- Marquer tous les emails non vérifiés comme vérifiés
-- NOTE: confirmed_at est une colonne générée, on ne peut pas la modifier directement
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, NOW())
WHERE email_confirmed_at IS NULL;

-- Mettre à jour aussi la table public.users pour être cohérent
UPDATE public.users
SET email_verified = true
WHERE email_verified = false OR email_verified IS NULL;

-- ============================================
-- RÉSULTAT
-- ============================================
-- Tous les emails existants sont maintenant marqués comme vérifiés.
-- Vous pouvez maintenant vous connecter sans recevoir le message
-- "Veuillez confirmer votre email avant de vous connecter".
--
-- ATTENTION : Cette migration est destinée au développement uniquement.
-- En production, assurez-vous que tous les emails sont réellement vérifiés.
-- ============================================

