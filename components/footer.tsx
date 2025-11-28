"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/lib/hooks/use-translation"

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#CECECE] rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                <Image
                  src="ffa.png"
                  alt="Farafina Foot Academy"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-sans font-bold text-lg">Farafina Foot Academy</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">{t("footer.tagline")}</p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#D4AF37] rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/programs" className="text-xs xs:text-sm text-gray-400 hover:text-[#D4AF37] transition-colors block py-1 min-h-[32px] flex items-center">
                  {t("navigation.programs")}
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("navigation.admissions")}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("navigation.events")}
                </Link>
              </li>
              <li>
                <Link href="/players" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("navigation.players")}
                </Link>
              </li>
              <li>
                <Link href="/international" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("navigation.international")}
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("navigation.boutique")}
                </Link>
              </li>
              <li>
                <Link href="/ffa-tv" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("navigation.ffaTV")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("common.contact")}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("navigation.partners")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/news" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("footer.news")}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("footer.careers")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">{t("footer.location")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-sm text-gray-400">{t("footer.phone")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-sm text-gray-400">{t("footer.email")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">{t("footer.copyright")}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{t("footer.poweredBy")}</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/drkudvdmd/image/upload/v1762011778/fg_oyv7v0.jpg"
                  alt="Farafina Group"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[#D4AF37] font-semibold">Farafina Group</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
