import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, Scale, Gavel, AlertCircle } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#D4AF37] to-[#d17e00] text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <FileText className="w-4 h-4 text-white" />
                <span className="text-sm font-medium">Conditions Légales</span>
              </div>

              <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Conditions d'Utilisation
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
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-[#D4AF37]" />
                    Introduction
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Bienvenue sur le site web de Farafina Foot Academy. En accédant et en utilisant ce site, vous
                    acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces
                    conditions, veuillez ne pas utiliser notre site.
                  </p>
                </div>

                {/* Acceptance of Terms */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Scale className="w-6 h-6 text-[#D4AF37]" />
                    Acceptation des Conditions
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    En utilisant notre site web, vous reconnaissez avoir lu, compris et accepté d'être lié par ces
                    conditions d'utilisation ainsi que par notre politique de confidentialité. Ces conditions
                    s'appliquent à tous les visiteurs, utilisateurs et autres personnes qui accèdent ou utilisent notre
                    site.
                  </p>
                </div>

                {/* Use of Website */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4">Utilisation du Site</h2>
                  <p className="text-muted-foreground mb-3">Vous vous engagez à utiliser notre site uniquement à des fins légales et de manière qui ne viole pas :</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Les droits de tiers</li>
                    <li>Les lois et réglementations applicables</li>
                    <li>Ces conditions d'utilisation</li>
                  </ul>
                  <p className="text-muted-foreground mt-3">Il est interdit de :</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Utiliser le site de manière frauduleuse ou trompeuse</li>
                    <li>Tenter d'accéder à des zones non autorisées du site</li>
                    <li>Transmettre des virus ou tout code malveillant</li>
                    <li>Collecter des informations sur d'autres utilisateurs sans leur consentement</li>
                    <li>Utiliser le site pour diffuser du spam ou des communications non sollicitées</li>
                  </ul>
                </div>

                {/* Intellectual Property */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4">Propriété Intellectuelle</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Tout le contenu de ce site, y compris mais sans s'y limiter, les textes, graphiques, logos, icônes,
                    images, clips audio et vidéo, est la propriété de Farafina Foot Academy ou de ses concédants de
                    licence et est protégé par les lois sur le droit d'auteur et autres lois sur la propriété
                    intellectuelle.
                  </p>
                  <p className="text-muted-foreground mt-3">
                    Vous ne pouvez pas reproduire, distribuer, modifier, créer des œuvres dérivées, afficher publiquement,
                    exécuter publiquement, republier, télécharger, stocker ou transmettre aucun matériel de notre site
                    sans notre autorisation écrite préalable.
                  </p>
                </div>

                {/* User Accounts */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4">Comptes Utilisateurs</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Si vous créez un compte sur notre site, vous êtes responsable de :
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Maintenir la confidentialité de votre mot de passe</li>
                    <li>Toutes les activités qui se produisent sous votre compte</li>
                    <li>Nous aOrir immédiatement de tout usage non autorisé</li>
                    <li>Fournir des informations exactes et à jour</li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    Nous nous réservons le droit de suspendre ou de résilier votre compte si vous violez ces conditions.
                  </p>
                </div>

                {/* Applications and Admissions */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4">Candidatures et Admissions</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    En soumettant une candidature à Farafina Foot Academy, vous acceptez que :
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Toutes les informations fournies sont exactes et complètes</li>
                    <li>Nous avons le droit de vérifier toutes les informations fournies</li>
                    <li>La décision d'admission est à la seule discrétion de l'académie</li>
                    <li>Les frais de candidature ne sont pas remboursables</li>
                  </ul>
                </div>

                {/* Payments */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4">Paiements</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Tous les paiements doivent être effectués conformément aux conditions convenues. Les retards de
                    paiement peuvent entraîner la suspension ou l'annulation de l'inscription. Les frais de scolarité et
                    autres frais sont détaillés dans le contrat d'inscription.
                  </p>
                </div>

                {/* Limitation of Liability */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-[#D4AF37]" />
                    Limitation de Responsabilité
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Dans la mesure permise par la loi applicable, Farafina Foot Academy ne sera pas responsable des
                    dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l'utilisation ou de
                    l'incapacité à utiliser notre site ou nos services.
                  </p>
                </div>

                {/* Indemnification */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Gavel className="w-6 h-6 text-[#D4AF37]" />
                    Indemnisation
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Vous acceptez d'indemniser, de défendre et de dégager de toute responsabilité Farafina Foot Academy,
                    ses dirigeants, employés et agents de toute réclamation, perte, responsabilité et dépense (y compris
                    les honoraires d'avocat) découlant de votre utilisation du site ou de votre violation de ces
                    conditions.
                  </p>
                </div>

                {/* Changes to Terms */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4">Modifications des Conditions</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les
                    modifications prendront effet immédiatement après leur publication sur cette page. Votre utilisation
                    continue du site après toute modification constitue votre acceptation des nouvelles conditions.
                  </p>
                </div>

                {/* Governing Law */}
                <div>
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4">Loi Applicable</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Ces conditions d'utilisation sont régies et interprétées conformément aux lois du Sénégal. Tout
                    litige découlant de ces conditions sera soumis à la juridiction exclusive des tribunaux compétents
                    du Sénégal.
                  </p>
                </div>

                {/* Contact */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <h2 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4">Nous Contacter</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter :
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong>Email :</strong>{" "}
                      <a href="mailto:legal@farafinafootacademy.com" className="text-[#D4AF37] hover:underline">
                        legal@farafinafootacademy.com
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

