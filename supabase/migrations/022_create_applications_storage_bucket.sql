-- ============================================
-- STORAGE BUCKET: applications
-- ============================================
-- EXPLICATION :
-- Ce bucket stocke les fichiers uploadés pour les candidatures
-- (acte de naissance, photo, certificat médical, vidéo)
-- ============================================

-- Créer le bucket 'applications' s'il n'existe pas
-- Note: Les buckets doivent être créés via l'API Supabase ou le Dashboard
-- Cette migration vérifie seulement l'existence et crée les politiques

-- Vérifier si le bucket existe, sinon il faudra le créer manuellement via le Dashboard
-- Dashboard Supabase → Storage → New Bucket
-- ID: applications
-- Public: false
-- File size limit: 104857600 (100MB)
-- Allowed MIME types: application/pdf, image/jpeg, image/jpg, image/png, video/mp4, video/quicktime

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Supprimer les politiques existantes si elles existent
DROP POLICY IF EXISTS "Anyone can upload application files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read application files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete application files" ON storage.objects;

-- Permettre l'upload de fichiers pour les candidatures
-- Note: Les candidatures peuvent être soumises sans compte (user_id peut être NULL)
-- On permet l'upload à tous (authentifiés et non-authentifiés via anon key)
CREATE POLICY "Anyone can upload application files"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'applications'
);

-- Permettre l'accès en lecture à tous (public) pour les fichiers des candidatures
-- Note: Cette politique permet l'accès sans authentification pour la console admin
CREATE POLICY "Public can read application files"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'applications'
);

-- Permettre aux admins de supprimer tous les fichiers
CREATE POLICY "Admins can delete application files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'applications' AND
  public.is_admin()
);

-- ============================================
-- NOTES
-- ============================================
-- Note: Les commentaires sur storage.buckets ne peuvent pas être créés
-- car cette table est gérée par le système Supabase
-- Le bucket 'applications' doit être créé manuellement via le Dashboard

