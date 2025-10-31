import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CoverSlide } from "@/components/brand-kit/cover-slide"
import { BrandVision } from "@/components/brand-kit/brand-vision"
import { ColorPalette } from "@/components/brand-kit/color-palette"
import { TypographyPage } from "@/components/brand-kit/typography-page"
import { UIComponents } from "@/components/brand-kit/ui-components"
import { PageMockups } from "@/components/brand-kit/page-mockups"
import { ResponsivePreview } from "@/components/brand-kit/responsive-preview"
import { CreditsSlide } from "@/components/brand-kit/credits-slide"

export default function BrandKitPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <CoverSlide />
        <BrandVision />
        <ColorPalette />
        <TypographyPage />
        <UIComponents />
        <PageMockups />
        <ResponsivePreview />
        <CreditsSlide />
      </main>
      <Footer />
    </div>
  )
}
