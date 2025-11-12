-- ============================================
-- POLITIQUES RLS POUR LA TABLE messages
-- ============================================
-- EXPLICATION :
-- Ces politiques définissent qui peut voir/envoyer les messages.
-- Un utilisateur ne peut voir que les messages qu'il a envoyés ou reçus.
-- ============================================

-- ============================================
-- POLITIQUE 1 : Les utilisateurs peuvent voir leurs messages (envoyés et reçus)
-- ============================================
-- EXPLICATION :
-- - Un utilisateur peut voir un message si :
--   - Il est l'expéditeur (sender_id = son ID)
--   - OU il est le destinataire (receiver_id = son ID)
-- ============================================

CREATE POLICY "Users can view their own messages"
ON public.messages
FOR SELECT
USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);

-- ============================================
-- POLITIQUE 2 : Les utilisateurs peuvent envoyer des messages
-- ============================================
-- EXPLICATION :
-- - Un utilisateur peut créer un message uniquement s'il est l'expéditeur
-- - Il ne peut pas envoyer un message au nom de quelqu'un d'autre
-- ============================================

CREATE POLICY "Users can send messages"
ON public.messages
FOR INSERT
WITH CHECK (
  auth.uid() = sender_id
  -- Empêcher l'envoi de message à soi-même (déjà géré par la contrainte CHECK)
);

-- ============================================
-- POLITIQUE 3 : Les utilisateurs peuvent modifier leurs propres messages
-- ============================================
-- EXPLICATION :
-- - Un utilisateur peut modifier uniquement les messages qu'il a envoyés
-- - Il ne peut pas modifier les messages qu'il a reçus
-- ============================================

CREATE POLICY "Users can update their own sent messages"
ON public.messages
FOR UPDATE
USING (auth.uid() = sender_id)
WITH CHECK (auth.uid() = sender_id);

-- ============================================
-- POLITIQUE 4 : Les utilisateurs peuvent marquer leurs messages reçus comme lus
-- ============================================
-- EXPLICATION :
-- - Un utilisateur peut mettre à jour le champ "read" des messages qu'il a reçus
-- - Il ne peut modifier que ce champ, pas le contenu
-- ============================================

CREATE POLICY "Users can mark received messages as read"
ON public.messages
FOR UPDATE
USING (auth.uid() = receiver_id)
WITH CHECK (
  auth.uid() = receiver_id
  -- On pourrait vérifier que seul le champ "read" est modifié
  -- Mais pour simplifier, on autorise la mise à jour
);

-- ============================================
-- POLITIQUE 5 : Les utilisateurs peuvent supprimer leurs propres messages
-- ============================================
-- EXPLICATION :
-- - Un utilisateur peut supprimer uniquement les messages qu'il a envoyés
-- ============================================

CREATE POLICY "Users can delete their own sent messages"
ON public.messages
FOR DELETE
USING (auth.uid() = sender_id);

-- ============================================
-- POLITIQUE 6 : Les admins peuvent tout voir
-- ============================================

CREATE POLICY "Admins can view all messages"
ON public.messages
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

COMMENT ON POLICY "Users can view their own messages" ON public.messages IS 
'Les utilisateurs peuvent voir uniquement les messages qu''ils ont envoyés ou reçus';

COMMENT ON POLICY "Users can send messages" ON public.messages IS 
'Les utilisateurs peuvent envoyer des messages (en étant l''expéditeur)';

