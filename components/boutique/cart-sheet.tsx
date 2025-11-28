'use client'

import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/providers/cart-provider'
import { formatCurrency } from '@/lib/utils'
import {
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  MessageCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const WHATSAPP_NUMBER = '221770000000'

export function CartSheet() {
  const {
    items,
    totalQuantity,
    formattedTotal,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    isOpen,
    openCart,
    closeCart,
  } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return

    const lines = items
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} - ${formatCurrency(item.price * item.quantity)}`,
      )
      .join('\n')

    const message = `Bonjour, je souhaite acheter les produits suivants sur la Boutique Farafina Foot Academy:

${lines}

Total: ${formattedTotal}.`

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <SheetTrigger asChild>
        <button
          onClick={openCart}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-[#1A1A1A] shadow-sm transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          aria-label="Ouvrir le panier"
          suppressHydrationWarning
        >
          <ShoppingCart className="h-5 w-5" />
          {totalQuantity > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#D4AF37] px-1.5 text-xs font-semibold text-white">
              {totalQuantity}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="bg-white" side="right">
        <SheetHeader>
          <SheetTitle className="text-left font-sans text-xl font-semibold text-[#1A1A1A]">
            Mon panier
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            Gérez vos articles avant de finaliser votre commande.
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
              <ShoppingBag className="h-12 w-12 text-[#D4AF37]" />
              <p>Votre panier est vide pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-2xl border border-border bg-white/80 p-4 shadow-sm">
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-sans text-base font-semibold text-[#1A1A1A]">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground transition hover:text-red-500"
                          aria-label={`Retirer ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrementItem(item.id)}
                          className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-full border border-border transition',
                            'hover:border-[#D4AF37] hover:text-[#D4AF37] text-sm font-semibold',
                          )}
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => incrementItem(item.id)}
                          className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-full border border-border transition',
                            'hover:border-[#D4AF37] hover:text-[#D4AF37] text-sm font-semibold',
                          )}
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-semibold text-[#1A1A1A]">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter>
          {items.length > 0 ? (
            <>
              <div className="flex items-center justify-between rounded-xl bg-muted/60 px-4 py-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Total ({totalQuantity} article{totalQuantity > 1 ? 's' : ''})
                </span>
                <span className="font-sans text-xl font-semibold text-[#1A1A1A]">
                  {formattedTotal}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={handleCheckout}
                  className="bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold rounded-xl h-12 gap-2"
                  disabled={items.length === 0}
                >
                  <MessageCircle className="h-5 w-5" />
                  Passer à la caisse (WhatsApp)
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-red-200 text-red-500 hover:bg-red-50 font-semibold rounded-xl h-12"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Vider le panier
                </Button>
              </div>
            </>
          ) : null}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
