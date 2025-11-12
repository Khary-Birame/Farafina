import type React from "react"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieConsent } from "@/components/cookie-consent"
import { CartProvider } from "@/components/providers/cart-provider"
import { LanguageProvider } from "@/lib/language-context"
import { AuthProvider } from "@/lib/auth/auth-context"
import { Toaster } from "sonner"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Farafina Foot Academy | The Future of African Football",
  description:
    "Elite sport-study institution in Cayar, Senegal. Discovering, training, and promoting young football talents across Africa.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedLang = localStorage.getItem('ffa-language');
                  if (storedLang && ['fr', 'en', 'ar', 'pt'].includes(storedLang)) {
                    document.documentElement.lang = storedLang;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <ScrollToTop />
              <CookieConsent />
              <Toaster position="top-right" richColors />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
