-- Politiques RLS pour les tables e-commerce

-- Activer RLS sur toutes les tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CATEGORIES
-- ============================================
-- Tout le monde peut lire les catégories actives
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  USING (is_active = true);

-- Seuls les admins peuvent modifier
CREATE POLICY "Only admins can modify categories"
  ON public.categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- PRODUCTS
-- ============================================
-- Tout le monde peut lire les produits actifs
CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (is_active = true);

-- Seuls les admins peuvent modifier
CREATE POLICY "Only admins can modify products"
  ON public.products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- PRODUCT_VARIANTS
-- ============================================
-- Tout le monde peut lire les variantes actives
CREATE POLICY "Product variants are viewable by everyone"
  ON public.product_variants FOR SELECT
  USING (is_active = true);

-- Seuls les admins peuvent modifier
CREATE POLICY "Only admins can modify product variants"
  ON public.product_variants FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- PRODUCT_IMAGES
-- ============================================
-- Tout le monde peut lire les images
CREATE POLICY "Product images are viewable by everyone"
  ON public.product_images FOR SELECT
  USING (true);

-- Seuls les admins peuvent modifier
CREATE POLICY "Only admins can modify product images"
  ON public.product_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- PRODUCT_REVIEWS
-- ============================================
-- Tout le monde peut lire les avis approuvés
CREATE POLICY "Approved reviews are viewable by everyone"
  ON public.product_reviews FOR SELECT
  USING (is_approved = true);

-- Les utilisateurs peuvent créer leurs propres avis
CREATE POLICY "Users can create their own reviews"
  ON public.product_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Les utilisateurs peuvent modifier leurs propres avis
CREATE POLICY "Users can update their own reviews"
  ON public.product_reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leurs propres avis
CREATE POLICY "Users can delete their own reviews"
  ON public.product_reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Les admins peuvent tout faire
CREATE POLICY "Admins can manage all reviews"
  ON public.product_reviews FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- ORDERS
-- ============================================
-- Les utilisateurs peuvent voir leurs propres commandes
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (
    auth.uid() = user_id OR
    (user_id IS NULL AND guest_email IS NOT NULL) -- Pour les commandes invitées, on vérifiera par email côté application
  );

-- Les utilisateurs peuvent créer leurs propres commandes
CREATE POLICY "Users can create their own orders"
  ON public.orders FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR
    user_id IS NULL -- Permet les commandes invitées
  );

-- Les utilisateurs peuvent mettre à jour leurs propres commandes (statut limité)
CREATE POLICY "Users can update their own orders"
  ON public.orders FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Les admins peuvent tout faire
CREATE POLICY "Admins can manage all orders"
  ON public.orders FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- ORDER_ITEMS
-- ============================================
-- Les utilisateurs peuvent voir les items de leurs commandes
CREATE POLICY "Users can view their own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
    )
  );

-- Les utilisateurs peuvent créer des items pour leurs commandes
CREATE POLICY "Users can create items for their orders"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
    )
  );

-- Les admins peuvent tout faire
CREATE POLICY "Admins can manage all order items"
  ON public.order_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- ADDRESSES
-- ============================================
-- Les utilisateurs peuvent voir leurs propres adresses
CREATE POLICY "Users can view their own addresses"
  ON public.addresses FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres adresses
CREATE POLICY "Users can create their own addresses"
  ON public.addresses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent modifier leurs propres adresses
CREATE POLICY "Users can update their own addresses"
  ON public.addresses FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leurs propres adresses
CREATE POLICY "Users can delete their own addresses"
  ON public.addresses FOR DELETE
  USING (auth.uid() = user_id);

-- Les admins peuvent tout faire
CREATE POLICY "Admins can manage all addresses"
  ON public.addresses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- WISHLIST
-- ============================================
-- Les utilisateurs peuvent voir leur propre wishlist
CREATE POLICY "Users can view their own wishlist"
  ON public.wishlist FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent ajouter à leur wishlist
CREATE POLICY "Users can add to their wishlist"
  ON public.wishlist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer de leur wishlist
CREATE POLICY "Users can remove from their wishlist"
  ON public.wishlist FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- COUPONS
-- ============================================
-- Tout le monde peut lire les coupons actifs
CREATE POLICY "Active coupons are viewable by everyone"
  ON public.coupons FOR SELECT
  USING (
    is_active = true
    AND (valid_from IS NULL OR valid_from <= NOW())
    AND (valid_until IS NULL OR valid_until >= NOW())
  );

-- Seuls les admins peuvent modifier
CREATE POLICY "Only admins can modify coupons"
  ON public.coupons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

