"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslation } from "@/lib/hooks/use-translation"

export function BoutiqueCTA() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-white to-[#D4AF37]/5" />
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sans text-3xl font-bold text-[#1A1A1A] md:text-4xl">
            {t("boutique.cta.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {t("boutique.cta.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="#catalogue" className="w-full sm:w-auto">
              <Button className="bg-[#D4AF37] hover:bg-[#b98d2c] text-white font-semibold rounded-xl h-12 px-8">
                {t("boutique.cta.orderButton")}
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-semibold rounded-xl h-12 px-8"
              >
                {t("boutique.cta.learnMoreButton")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
