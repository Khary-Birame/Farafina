-- ============================================
-- POLITIQUES RLS POUR LA TABLE players
-- ============================================
-- EXPLICATION :
-- Ces politiques définissent qui peut voir/modifier les profils des joueurs.
-- Accès différent selon le rôle : joueur, parent, coach, club, admin
-- ============================================

-- ============================================
-- POLITIQUE 1 : Les joueurs peuvent voir leur propre profil
-- ============================================
-- EXPLICATION :
-- - Un joueur (role = 'player') peut voir son profil
-- - On vérifie que user_id de la ligne = ID de l'utilisateur connecté
-- ============================================

CREATE POLICY "Players can view their own profile"
ON public.players
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
    AND role = 'player'
    AND id = players.user_id
  )
);

-- ============================================
-- POLITIQUE 2 : Les parents peuvent voir le profil de leur enfant
-- ============================================
-- EXPLICATION :
-- - Un parent (role = 'parent') peut voir les profils des joueurs
-- - Pour l'instant, on autorise tous les parents à voir tous les joueurs
-- - Plus tard, on pourra créer une table parent_players pour lier parent-enfant
-- ============================================

CREATE POLICY "Parents can view players"
ON public.players
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'parent'
  )
);

-- ============================================
-- POLITIQUE 3 : Les coachs peuvent voir les joueurs
-- ============================================
-- EXPLICATION :
-- - Un coach (role = 'coach') peut voir tous les profils de joueurs
-- - Utile pour le suivi et l'évaluation
-- ============================================

CREATE POLICY "Coaches can view players"
ON public.players
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'coach'
  )
);

-- ============================================
-- POLITIQUE 4 : Les clubs peuvent voir les profils publics
-- ============================================
-- EXPLICATION :
-- - Un club (role = 'club') peut voir les profils des joueurs
-- - Utile pour le recrutement
-- - Plus tard, on pourra ajouter une vérification de NDA signé
-- ============================================

CREATE POLICY "Clubs can view players"
ON public.players
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'club'
  )
);

-- ============================================
-- POLITIQUE 5 : Les admins peuvent tout voir
-- ============================================

CREATE POLICY "Admins can view all players"
ON public.players
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================================
-- POLITIQUE 6 : Les joueurs peuvent modifier leur propre profil
-- ============================================
-- EXPLICATION :
-- - Un joueur peut modifier uniquement son propre profil
-- - Certains champs pourraient être en lecture seule (réservés aux admins)
-- ============================================

CREATE POLICY "Players can update their own profile"
ON public.players
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
    AND role = 'player'
    AND id = players.user_id
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
    AND role = 'player'
    AND id = players.user_id
  )
);

-- ============================================
-- POLITIQUE 7 : Les coachs peuvent modifier les profils des joueurs
-- ============================================
-- EXPLICATION :
-- - Les coachs peuvent modifier les profils (stats, évaluations, etc.)
-- - Utile pour mettre à jour les performances
-- ============================================

CREATE POLICY "Coaches can update players"
ON public.players
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'coach'
  )
);

-- ============================================
-- POLITIQUE 8 : Les admins peuvent tout modifier
-- ============================================

CREATE POLICY "Admins can update all players"
ON public.players
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================================
-- POLITIQUE 9 : Permettre la création de profils joueurs (par les admins)
-- ============================================

CREATE POLICY "Admins and coaches can create player profiles"
ON public.players
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role IN ('admin', 'coach')
  )
);

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON POLICY "Players can view their own profile" ON public.players IS 
'Les joueurs peuvent voir uniquement leur propre profil';

COMMENT ON POLICY "Parents can view players" ON public.players IS 
'Les parents peuvent voir les profils des joueurs (à affiner avec une table parent_players)';

COMMENT ON POLICY "Clubs can view players" ON public.players IS 
'Les clubs peuvent voir les profils pour le recrutement (à combiner avec vérification NDA)';

