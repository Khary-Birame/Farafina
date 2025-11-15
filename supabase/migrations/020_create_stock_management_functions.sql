-- Fonctions pour gérer le stock des variantes

-- Fonction pour décrémenter le stock d'une variante
CREATE OR REPLACE FUNCTION decrement_variant_stock(
  variant_id UUID,
  quantity INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  current_stock INTEGER;
BEGIN
  -- Récupérer le stock actuel
  SELECT stock_quantity INTO current_stock
  FROM public.product_variants
  WHERE id = variant_id;

  -- Vérifier si le stock est suffisant
  IF current_stock IS NULL THEN
    RAISE EXCEPTION 'Variant not found';
  END IF;

  IF current_stock < quantity THEN
    RAISE EXCEPTION 'Insufficient stock. Available: %, Requested: %', current_stock, quantity;
  END IF;

  -- Décrémenter le stock
  UPDATE public.product_variants
  SET stock_quantity = stock_quantity - quantity,
      updated_at = NOW()
  WHERE id = variant_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour incrémenter le stock d'une variante (pour les retours)
CREATE OR REPLACE FUNCTION increment_variant_stock(
  variant_id UUID,
  quantity INTEGER
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.product_variants
  SET stock_quantity = stock_quantity + quantity,
      updated_at = NOW()
  WHERE id = variant_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour réserver du stock (pour le panier)
CREATE OR REPLACE FUNCTION reserve_variant_stock(
  variant_id UUID,
  quantity INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  current_stock INTEGER;
BEGIN
  SELECT stock_quantity INTO current_stock
  FROM public.product_variants
  WHERE id = variant_id;

  IF current_stock IS NULL THEN
    RAISE EXCEPTION 'Variant not found';
  END IF;

  IF current_stock < quantity THEN
    RETURN FALSE;
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

