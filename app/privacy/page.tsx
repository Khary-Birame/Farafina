import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Lock, Eye, FileText } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#f29200] to-[#d17e00] text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-sm font-medium">Protection des Données</span>
              </div>

              <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Politique de Confidentialité
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
                Dernière mise à jour : 15 Janvier 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <div className="space-y-8">
                {/* Introduction */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#2E2E2E] mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-[#f29200]" />
                    Introduction
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Farafina Foot Academy ("nous", "notre", "nous-mêmes") s'engage à protéger et respecter votre vie
                    privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et
                    protégeons vos informations personnelles lorsque vous utilisez notre site web et nos services.
                  </p>
                </div>

                {/* Information We Collect */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#2E2E2E] mb-4 flex items-center gap-2">
                    <Eye className="w-6 h-6 text-[#f29200]" />
                    Informations que Nous Collectons
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-[#2E2E2E] mb-2">1. Informations que vous nous fournissez</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Nom, prénom et coordonnées (adresse e-mail, numéro de téléphone, adresse postale)</li>
                        <li>Informations académiques et professionnelles</li>
                        <li>Informations médicales (pour les étudiants-athlètes)</li>
                        <li>Documents d'identification (passeport, acte de naissance)</li>
                        <li>Informations de paiement (traitées de manière sécurisée par nos prestataires de paiement)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#2E2E2E] mb-2">2. Informations collectées automatiquement</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Adresse IP et informations sur votre appareil</li>
                        <li>Cookies et technologies de suivi similaires</li>
                        <li>Données de navigation et pages visitées</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* How We Use Your Information */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#2E2E2E] mb-4 flex items-center gap-2">
                    <Lock className="w-6 h-6 text-[#f29200]" />
                    Comment Nous Utilisons Vos Informations
                  </h2>
                  <p className="text-muted-foreground mb-3">Nous utilisons vos informations pour :</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Traiter et gérer vos candidatures et inscriptions</li>
                    <li>Communiquer avec vous concernant nos services</li>
                    <li>Améliorer nos services et votre expérience utilisateur</li>
                    <li>Respecter nos obligations légales et réglementaires</li>
                    <li>Assurer la sécurité et prévenir la fraude</li>
                    <li>Envoyer des newsletters et des communications marketing (avec votre consentement)</li>
                  </ul>
                </div>

                {/* Data Sharing */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#2E2E2E] mb-4">Partage des Données</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous ne vendons pas vos données personnelles. Nous pouvons partager vos informations uniquement dans
                    les cas suivants :
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-3">
                    <li>Avec votre consentement explicite</li>
                    <li>Avec des prestataires de services de confiance qui nous aident à exploiter notre site web</li>
                    <li>Pour se conformer aux obligations légales</li>
                    <li>Pour protéger nos droits et notre sécurité</li>
                    <li>Avec des clubs partenaires pour les opportunités de transfert (pour les étudiants uniquement, avec consentement)</li>
                  </ul>
                </div>

                {/* Data Security */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#2E2E2E] mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-[#f29200]" />
                    Sécurité des Données
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations
                    personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction. Cela
                    inclut :
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-3">
                    <li>Chiffrement SSL/TLS pour les transmissions de données</li>
                    <li>Contrôles d'accès stricts et authentification</li>
                    <li>Surveillance régulière des systèmes</li>
                    <li>Formation du personnel sur la protection des données</li>
                  </ul>
                </div>

                {/* Your Rights */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#2E2E2E] mb-4">Vos Droits</h2>
                  <p className="text-muted-foreground mb-3">Conformément au RGPD et aux lois applicables, vous avez le droit de :</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Accéder à vos données personnelles</li>
                    <li>Rectifier des données inexactes</li>
                    <li>Demander la suppression de vos données ("droit à l'oubli")</li>
                    <li>S'opposer au traitement de vos données</li>
                    <li>Demander la portabilité de vos données</li>
                    <li>Retirer votre consentement à tout moment</li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    Pour exercer ces droits, veuillez nous contacter à :{" "}
                    <a href="mailto:privacy@farafinafootacademy.com" className="text-[#f29200] hover:underline">
                      privacy@farafinafootacademy.com
                    </a>
                  </p>
                </div>

                {/* Cookies */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#2E2E2E] mb-4">Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Notre site web utilise des cookies pour améliorer votre expérience. Vous pouvez contrôler les cookies
                    via les paramètres de votre navigateur. Certaines fonctionnalités du site peuvent ne pas fonctionner
                    correctement si les cookies sont désactivés.
                  </p>
                </div>

                {/* Changes to Privacy Policy */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#2E2E2E] mb-4">Modifications de cette Politique</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons
                    de tout changement significatif en publiant la nouvelle politique sur cette page et en mettant à jour
                    la date de "dernière mise à jour".
                  </p>
                </div>

                {/* Contact */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <h2 className="font-sans font-bold text-2xl text-[#2E2E2E] mb-4">Nous Contacter</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter :
                  </p>
                  <div className="mt-4 space-y-2 text-muted-foreground">
                    <p>
                      <strong>Email :</strong>{" "}
                      <a href="mailto:privacy@farafinafootacademy.com" className="text-[#f29200] hover:underline">
                        privacy@farafinafootacademy.com
                      </a>
                    </p>
                    <p>
                      <strong>Adresse :</strong> Farafina Foot Academy, Cayar, Région de Thiès, Sénégal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

