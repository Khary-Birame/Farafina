-- ============================================
-- POLITIQUES RLS POUR LA TABLE notifications
-- ============================================
-- EXPLICATION :
-- Ces politiques définissent qui peut voir/modifier les notifications.
-- Un utilisateur ne peut voir que ses propres notifications.
-- ============================================

-- ============================================
-- POLITIQUE 1 : Les utilisateurs peuvent voir leurs propres notifications
-- ============================================
-- EXPLICATION :
-- - Un utilisateur peut voir uniquement les notifications qui lui sont destinées
-- - user_id de la notification = ID de l'utilisateur connecté
-- ============================================

CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

-- ============================================
-- POLITIQUE 2 : Les utilisateurs peuvent marquer leurs notifications comme lues
-- ============================================
-- EXPLICATION :
-- - Un utilisateur peut mettre à jour le champ "read" de ses notifications
-- - Il peut aussi mettre à jour "read_at"
-- ============================================

CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- ============================================
-- POLITIQUE 3 : Permettre la création de notifications (par le système/admins)
-- ============================================
-- EXPLICATION :
-- - Les admins et le système peuvent créer des notifications
-- - En production, on pourrait utiliser une fonction server-side pour cela
-- ============================================

CREATE POLICY "Admins and system can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (
  -- Permettre si c'est un admin
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
  -- OU si la notification est créée pour l'utilisateur connecté (auto-notification)
  OR auth.uid() = user_id
);

-- ============================================
-- POLITIQUE 4 : Les utilisateurs peuvent supprimer leurs notifications
-- ============================================

CREATE POLICY "Users can delete their own notifications"
ON public.notifications
FOR DELETE
USING (auth.uid() = user_id);

-- ============================================
-- POLITIQUE 5 : Les admins peuvent tout voir
-- ============================================

CREATE POLICY "Admins can view all notifications"
ON public.notifications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON POLICY "Users can view their own notifications" ON public.notifications IS 
'Les utilisateurs peuvent voir uniquement leurs propres notifications';

COMMENT ON POLICY "Users can update their own notifications" ON public.notifications IS 
'Les utilisateurs peuvent marquer leurs notifications comme lues';

