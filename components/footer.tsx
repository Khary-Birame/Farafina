import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#2E2E2E] text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#f29200] rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/drkudvdmd/image/upload/v1762007821/ffa_kbbb86.jpg"
                  alt="Farafina Foot Academy"
                  width={48}
                  height={48}
                  // className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-sans font-bold text-lg">Farafina Foot Academy</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">L'avenir du football africain commence ici.</p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#f29200] rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#f29200] rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#f29200] rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#f29200] rounded-lg flex items-center justify-center transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#f29200] rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-[#f29200] transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm text-gray-400 hover:text-[#f29200] transition-colors">
                  Programmes
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-sm text-gray-400 hover:text-[#f29200] transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/ffa-tv" className="text-sm text-gray-400 hover:text-[#f29200] transition-colors">
                  FFA TV
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-[#f29200] transition-colors">
                  Partenaires
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">Ressources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/news" className="text-sm text-gray-400 hover:text-[#f29200] transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-400 hover:text-[#f29200] transition-colors">
                  Carrières
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-[#f29200] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-[#f29200] transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-[#f29200] transition-colors">
                  Conditions d'Utilisation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">Nous Contacter</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#f29200] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">Cayar, Région de Thiès, Sénégal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#f29200] flex-shrink-0" />
                <span className="text-sm text-gray-400">+221 XX XXX XX XX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#f29200] flex-shrink-0" />
                <span className="text-sm text-gray-400">info@farafinafootacademy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© 2025 Farafina Foot Academy. Tous droits réservés.</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Propulsé par</span>
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
