-- ============================================
-- POLITIQUES RLS POUR LA TABLE conversations
-- ============================================
-- EXPLICATION :
-- Ces politiques définissent qui peut voir/créer les conversations.
-- Un utilisateur ne peut voir que les conversations où il est participant.
-- ============================================

-- ============================================
-- POLITIQUE 1 : Les utilisateurs peuvent voir leurs conversations
-- ============================================
-- EXPLICATION :
-- - Un utilisateur peut voir une conversation si :
--   - Il est user1 (user1_id = son ID)
--   - OU il est user2 (user2_id = son ID)
-- ============================================

CREATE POLICY "Users can view their own conversations"
ON public.conversations
FOR SELECT
USING (
  auth.uid() = user1_id OR auth.uid() = user2_id
);

-- ============================================
-- POLITIQUE 2 : Les utilisateurs peuvent créer des conversations
-- ============================================
-- EXPLICATION :
-- - Un utilisateur peut créer une conversation s'il est l'un des participants
-- - Il ne peut pas créer une conversation entre deux autres personnes
-- ============================================

CREATE POLICY "Users can create conversations"
ON public.conversations
FOR INSERT
WITH CHECK (
  auth.uid() = user1_id OR auth.uid() = user2_id
);

-- ============================================
-- POLITIQUE 3 : Les utilisateurs peuvent modifier leurs conversations
-- ============================================
-- EXPLICATION :
-- - Un utilisateur peut mettre à jour une conversation où il est participant
-- - Utile pour mettre à jour last_message, unread_count, etc.
-- ============================================

CREATE POLICY "Users can update their own conversations"
ON public.conversations
FOR UPDATE
USING (
  auth.uid() = user1_id OR auth.uid() = user2_id
)
WITH CHECK (
  auth.uid() = user1_id OR auth.uid() = user2_id
);

-- ============================================
-- POLITIQUE 4 : Les utilisateurs peuvent supprimer leurs conversations
-- ============================================

CREATE POLICY "Users can delete their own conversations"
ON public.conversations
FOR DELETE
USING (
  auth.uid() = user1_id OR auth.uid() = user2_id
);

-- ============================================
-- POLITIQUE 5 : Les admins peuvent tout voir
-- ============================================

CREATE POLICY "Admins can view all conversations"
ON public.conversations
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

COMMENT ON POLICY "Users can view their own conversations" ON public.conversations IS 
'Les utilisateurs peuvent voir uniquement les conversations où ils sont participants';

COMMENT ON POLICY "Users can create conversations" ON public.conversations IS 
'Les utilisateurs peuvent créer des conversations (en étant l''un des participants)';

