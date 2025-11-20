/**
 * Helpers pour la boutique e-commerce
 * Gestion des produits, variantes, commandes, etc.
 */

import { supabase } from '@/lib/supabase/client'

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  sku: string | null
  category_id: string | null
  base_price: number
  compare_at_price: number | null
  cost_price: number | null
  is_active: boolean
  is_featured: boolean
  is_new: boolean
  is_bestseller: boolean
  weight_kg: number | null
  tags: string[] | null
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
  category?: Category
  images?: ProductImage[]
  variants?: ProductVariant[]
  reviews?: ProductReview[]
}

export type ProductVariant = {
  id: string
  product_id: string
  sku: string | null
  name: string | null
  size: string | null
  shoe_size: string | null
  color: string | null
  color_hex: string | null
  price: number | null
  stock_quantity: number
  low_stock_threshold: number
  is_active: boolean
  barcode: string | null
  created_at: string
  updated_at: string
}

export type ProductImage = {
  id: string
  product_id: string
  image_url: string
  alt_text: string | null
  sort_order: number
  is_primary: boolean
  created_at: string
}

export type ProductReview = {
  id: string
  product_id: string
  user_id: string | null
  rating: number
  title: string | null
  comment: string | null
  is_verified_purchase: boolean
  is_approved: boolean
  helpful_count: number
  created_at: string
  updated_at: string
  user?: {
    first_name: string | null
    last_name: string | null
  }
}

export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Order = {
  id: string
  order_number: string
  user_id: string | null
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: string | null
  subtotal: number
  shipping_cost: number
  discount_amount: number
  tax_amount: number
  total: number
  currency: string
  shipping_method: string | null
  tracking_number: string | null
  notes: string | null
  guest_email: string | null
  guest_phone: string | null
  guest_first_name: string | null
  guest_last_name: string | null
  shipping_address: any
  billing_address: any
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  variant_id: string | null
  product_name: string
  variant_name: string | null
  sku: string | null
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
}

export type Address = {
  id: string
  user_id: string
  type: 'billing' | 'shipping'
  first_name: string
  last_name: string
  company: string | null
  address_line1: string
  address_line2: string | null
  city: string
  region: string | null
  postal_code: string
  country: string
  phone: string | null
  is_default: boolean
  created_at: string
  updated_at: string
}

export type Coupon = {
  id: string
  code: string
  description: string | null
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  minimum_purchase: number | null
  maximum_discount: number | null
  usage_limit: number | null
  used_count: number
  is_active: boolean
  valid_from: string | null
  valid_until: string | null
  created_at: string
  updated_at: string
}

// ============================================
// PRODUITS
// ============================================

/**
 * Récupère tous les produits avec filtres
 */
export async function getProducts(options?: {
  category?: string
  featured?: boolean
  isNew?: boolean
  isBestseller?: boolean
  search?: string
  limit?: number
  offset?: number
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popularity'
}) {
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      images:product_images(*),
      variants:product_variants(*)
    `)
    .eq('is_active', true)

  if (options?.category) {
    query = query.eq('category_id', options.category)
  }

  if (options?.featured) {
    query = query.eq('is_featured', true)
  }

  if (options?.isNew) {
    query = query.eq('is_new', true)
  }

  if (options?.isBestseller) {
    query = query.eq('is_bestseller', true)
  }

  if (options?.search) {
    query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%,short_description.ilike.%${options.search}%`)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 20) - 1)
  }

  // Tri
  if (options?.sortBy === 'price_asc') {
    query = query.order('base_price', { ascending: true })
  } else if (options?.sortBy === 'price_desc') {
    query = query.order('base_price', { ascending: false })
  } else if (options?.sortBy === 'newest') {
    query = query.order('created_at', { ascending: false })
  } else {
    query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return { data: null, error }
  }

  return { data: data as Product[], error: null }
}

/**
 * Récupère un produit par son ID ou slug
 */
export async function getProductById(idOrSlug: string) {
  
  // Essayer d'abord par ID (UUID)
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      images:product_images(*),
      variants:product_variants(*),
      reviews:product_reviews(
        *,
        user:users(first_name, last_name)
      )
    `)
    .eq('is_active', true)
    .eq('id', idOrSlug)
    .single()

  let { data, error } = await query

  // Si pas trouvé par ID, essayer par slug
  if (error || !data) {
    query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        images:product_images(*),
        variants:product_variants(*),
        reviews:product_reviews(
          *,
          user:users(first_name, last_name)
        )
      `)
      .eq('is_active', true)
      .eq('slug', idOrSlug)
      .single()

    const result = await query
    data = result.data
    error = result.error
  }

  if (error) {
    console.error('Error fetching product:', error)
    return { data: null, error }
  }

  return { data: data as Product, error: null }
}

/**
 * Récupère toutes les catégories
 */
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return { data: null, error }
  }

  return { data: data as Category[], error: null }
}

/**
 * Vérifie le stock d'une variante
 */
export async function checkVariantStock(variantId: string, quantity: number) {
  const { data, error } = await supabase
    .from('product_variants')
    .select('stock_quantity, is_active')
    .eq('id', variantId)
    .single()

  if (error || !data) {
    return { available: false, error }
  }

  if (!data.is_active) {
    return { available: false, error: new Error('Variant is not active') }
  }

  if (data.stock_quantity < quantity) {
    return { available: false, error: new Error('Insufficient stock') }
  }

  return { available: true, error: null }
}

// ============================================
// COMMANDES
// ============================================

/**
 * Crée une nouvelle commande
 */
export async function createOrder(orderData: {
  user_id?: string | null
  subtotal: number
  shipping_cost: number
  discount_amount?: number
  tax_amount?: number
  total: number
  currency?: string
  shipping_method?: string
  payment_method?: string
  shipping_address: any
  billing_address: any
  guest_email?: string
  guest_phone?: string
  guest_first_name?: string
  guest_last_name?: string
  items: Array<{
    product_id: string
    variant_id?: string | null
    product_name: string
    variant_name?: string | null
    sku?: string | null
    quantity: number
    unit_price: number
    total_price: number
  }>
}) {

  // Créer la commande
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.user_id || null,
      subtotal: orderData.subtotal,
      shipping_cost: orderData.shipping_cost,
      discount_amount: orderData.discount_amount || 0,
      tax_amount: orderData.tax_amount || 0,
      total: orderData.total,
      currency: orderData.currency || 'XOF',
      shipping_method: orderData.shipping_method,
      payment_method: orderData.payment_method,
      shipping_address: orderData.shipping_address,
      billing_address: orderData.billing_address,
      guest_email: orderData.guest_email,
      guest_phone: orderData.guest_phone,
      guest_first_name: orderData.guest_first_name,
      guest_last_name: orderData.guest_last_name,
      status: 'pending',
      payment_status: 'pending',
    })
    .select()
    .single()

  if (orderError || !order) {
    console.error('Error creating order:', orderError)
    return { data: null, error: orderError }
  }

  // Créer les items de commande
  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    variant_id: item.variant_id || null,
    product_name: item.product_name,
    variant_name: item.variant_name || null,
    sku: item.sku || null,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.total_price,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    console.error('Error creating order items:', itemsError)
    // Supprimer la commande si les items échouent
    await supabase.from('orders').delete().eq('id', order.id)
    return { data: null, error: itemsError }
  }

  // Mettre à jour le stock des variantes
  for (const item of orderData.items) {
    if (item.variant_id) {
      await supabase.rpc('decrement_variant_stock', {
        variant_id: item.variant_id,
        quantity: item.quantity,
      })
    }
  }

  return { data: order as Order, error: null }
}

/**
 * Récupère les commandes d'un utilisateur
 */
export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user orders:', error)
    return { data: null, error }
  }

  return { data: data as Order[], error: null }
}

/**
 * Récupère une commande par son numéro
 */
export async function getOrderByNumber(orderNumber: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*)
    `)
    .eq('order_number', orderNumber)
    .single()

  if (error) {
    console.error('Error fetching order:', error)
    return { data: null, error }
  }

  return { data: data as Order, error: null }
}

// ============================================
// COUPONS
// ============================================

/**
 * Vérifie et applique un code promo
 */
export async function validateCoupon(code: string, subtotal: number) {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .single()

  if (error || !data) {
    return { valid: false, discount: 0, error: new Error('Code promo invalide') }
  }

  // Vérifier les dates
  if (data.valid_from && new Date(data.valid_from) > new Date()) {
    return { valid: false, discount: 0, error: new Error('Code promo pas encore valide') }
  }

  if (data.valid_until && new Date(data.valid_until) < new Date()) {
    return { valid: false, discount: 0, error: new Error('Code promo expiré') }
  }

  // Vérifier le montant minimum
  if (data.minimum_purchase && subtotal < data.minimum_purchase) {
    return { valid: false, discount: 0, error: new Error(`Montant minimum: ${data.minimum_purchase} XOF`) }
  }

  // Vérifier la limite d'utilisation
  if (data.usage_limit && data.used_count >= data.usage_limit) {
    return { valid: false, discount: 0, error: new Error('Code promo épuisé') }
  }

  // Calculer la réduction
  let discount = 0
  if (data.discount_type === 'percentage') {
    discount = (subtotal * data.discount_value) / 100
    if (data.maximum_discount) {
      discount = Math.min(discount, data.maximum_discount)
    }
  } else {
    discount = data.discount_value
  }

  return { valid: true, discount, coupon: data as Coupon, error: null }
}

