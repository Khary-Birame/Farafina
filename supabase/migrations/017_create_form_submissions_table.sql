-- ============================================
-- TABLE: form_submissions
-- ============================================
-- EXPLICATION :
-- Cette table stocke toutes les soumissions de formulaires
-- (contact, partenaires, candidatures, newsletter, etc.)
-- ============================================

-- Créer la table form_submissions
CREATE TABLE IF NOT EXISTS public.form_submissions (
  -- ID unique
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Type de formulaire
  -- 'contact' = Formulaire de contact
  -- 'partner' = Demande de partenariat
  -- 'application' = Candidature (admission)
  -- 'newsletter' = Inscription newsletter
  -- 'scouting' = Demande de démo scouting
  form_type TEXT NOT NULL CHECK (form_type IN ('contact', 'partner', 'application', 'newsletter', 'scouting')),
  
  -- Données du formulaire (JSON flexible pour stocker tous les champs)
  -- Exemple pour contact: {"fullName": "John Doe", "email": "john@example.com", "subject": "...", "message": "..."}
  -- Exemple pour partner: {"organizationName": "...", "contactName": "...", "email": "...", "partnershipType": "..."}
  form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Statut de la soumission
  -- 'pending' = En attente de traitement
  -- 'reviewed' = En cours de traitement
  -- 'completed' = Traitée
  -- 'archived' = Archivée
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'completed', 'archived')),
  
  -- ID de l'utilisateur (optionnel, car certains formulaires peuvent être soumis sans compte)
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Index sur le type de formulaire pour filtrer rapidement
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON public.form_submissions(form_type);

-- Index sur le statut pour filtrer les soumissions en attente
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON public.form_submissions(status);

-- Index sur l'utilisateur pour voir toutes les soumissions d'un utilisateur
CREATE INDEX IF NOT EXISTS idx_form_submissions_user_id ON public.form_submissions(user_id);

-- Index sur la date de création pour trier par date
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions(created_at DESC);

-- ============================================
-- TRIGGER : Mettre à jour updated_at automatiquement
-- ============================================

CREATE OR REPLACE FUNCTION update_form_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_form_submissions_updated_at ON public.form_submissions;

CREATE TRIGGER trigger_update_form_submissions_updated_at
  BEFORE UPDATE ON public.form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_form_submissions_updated_at();

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON TABLE public.form_submissions IS
'Stocke toutes les soumissions de formulaires (contact, partenaires, candidatures, newsletter, etc.)';

COMMENT ON COLUMN public.form_submissions.form_type IS
'Type de formulaire : contact, partner, application, newsletter, scouting';

COMMENT ON COLUMN public.form_submissions.form_data IS
'Données du formulaire au format JSON (flexible pour tous les types de formulaires)';

COMMENT ON COLUMN public.form_submissions.status IS
'Statut de la soumission : pending, reviewed, completed, archived';

