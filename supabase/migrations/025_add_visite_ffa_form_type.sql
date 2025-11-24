-- ============================================
-- MIGRATION: Ajouter 'visite_ffa' au type de formulaire
-- ============================================
-- EXPLICATION :
-- Cette migration ajoute le type 'visite_ffa' à la liste des types de formulaires autorisés
-- dans la table form_submissions pour permettre la gestion des demandes de visite
-- ============================================

-- Supprimer la contrainte CHECK existante
ALTER TABLE public.form_submissions
DROP CONSTRAINT IF EXISTS form_submissions_form_type_check;

-- Recréer la contrainte CHECK avec le nouveau type 'visite_ffa'
ALTER TABLE public.form_submissions
ADD CONSTRAINT form_submissions_form_type_check
CHECK (form_type IN ('contact', 'partner', 'application', 'newsletter', 'scouting', 'visite_ffa'));

-- Commentaire mis à jour
COMMENT ON COLUMN public.form_submissions.form_type IS
'Type de formulaire : contact, partner, application, newsletter, scouting, visite_ffa';

