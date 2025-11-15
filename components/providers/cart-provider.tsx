'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { formatCurrency } from '@/lib/utils'

export type CartItem = {
  id: string // ID unique de l'item dans le panier (product_id + variant_id)
  product_id: string
  variant_id?: string | null
  name: string
  variant_name?: string | null // Ex: "Rouge - L - 42"
  price: number
  image: string
  quantity: number
  sku?: string | null
  size?: string | null
  shoe_size?: string | null
  color?: string | null
  color_hex?: string | null
  stock_quantity?: number
}

export type CartItemInput = Omit<CartItem, 'quantity'>

type AddItemOptions = {
  openCart?: boolean
}

type CartContextValue = {
  items: CartItem[]
  totalQuantity: number
  totalAmount: number
  formattedTotal: string
  addItem: (item: CartItemInput, options?: AddItemOptions) => void
  removeItem: (id: string) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (item: CartItemInput, options?: AddItemOptions) => {
    setItems((prev) => {
      // Générer un ID unique basé sur product_id et variant_id
      const itemId = item.variant_id 
        ? `${item.product_id}-${item.variant_id}`
        : item.product_id

      const existing = prev.find((cartItem) => cartItem.id === itemId)
      if (existing) {
        // Vérifier le stock si disponible
        if (item.stock_quantity !== undefined && existing.quantity >= item.stock_quantity) {
          return prev // Ne pas augmenter si stock insuffisant
        }
        return prev.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
      }

      return [...prev, { ...item, id: itemId, quantity: 1 }]
    })

    if (options?.openCart) {
      setIsOpen(true)
    }
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const incrementItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // Vérifier le stock si disponible
          if (item.stock_quantity !== undefined && item.quantity >= item.stock_quantity) {
            return item // Ne pas augmenter si stock insuffisant
          }
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      }),
    )
  }

  const decrementItem = (id: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => setItems([])

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const totalAmount = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )

  const formattedTotal = useMemo(
    () => formatCurrency(totalAmount),
    [totalAmount],
  )

  const value = useMemo(
    () => ({
      items,
      totalQuantity,
      totalAmount,
      formattedTotal,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [
      items,
      totalQuantity,
      totalAmount,
      formattedTotal,
      isOpen,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
