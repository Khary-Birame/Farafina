"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Download, Trash2, FileText } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h1 className="font-sans font-bold text-4xl md:text-5xl text-foreground mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-muted-foreground">
              Protection de vos données personnelles conformément au RGPD
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Section 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#D4AF37]" />
                  Collecte des Données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Farafina Foot Academy collecte les données suivantes :
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Informations d'identification (nom, prénom, date de naissance)</li>
                  <li>Coordonnées (email, téléphone, adresse)</li>
                  <li>Données académiques et sportives</li>
                  <li>Données de paiement (traitées de manière sécurisée)</li>
                  <li>Données de navigation (cookies, analytics)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#D4AF37]" />
                  Utilisation des Données
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vos données sont utilisées pour :
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
                  <li>Gestion des admissions et inscriptions</li>
                  <li>Communication avec les parents, joueurs et coachs</li>
                  <li>Suivi des performances académiques et sportives</li>
                  <li>Gestion des paiements</li>
                  <li>Amélioration de nos services</li>
                  <li>Conformité légale et réglementaire</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 3 - RGPD Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                  Vos Droits RGPD
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">Droit d'Accès</div>
                    <p className="text-sm text-muted-foreground">
                      Vous pouvez demander l'accès à toutes vos données personnelles.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">Droit de Rectification</div>
                    <p className="text-sm text-muted-foreground">
                      Vous pouvez corriger vos données inexactes ou incomplètes.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Droit à la Portabilité
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Vous pouvez exporter vos données dans un format structuré.
                    </p>
                  </div>
                  {/* <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Droit à l'Oubli
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Vous pouvez demander la suppression de vos données.
                    </p>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            {/* Section 4 - Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#D4AF37]" />
                  Sécurité des Données
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Nous mettons en œuvre des mesures de sécurité strictes :
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Chiffrement SSL/TLS pour toutes les communications</li>
                  <li>Chiffrement des données sensibles en base de données</li>
                  <li>Authentification sécurisée (2FA disponible)</li>
                  <li>Sauvegardes quotidiennes automatiques</li>
                  <li>Logs d'audit complets</li>
                  <li>Cloisonnement filles/garçons (séparation des données)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 5 - Consent */}
            <Card>
              <CardHeader>
                <CardTitle>Consentement Parental</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pour les mineurs, nous exigeons le consentement explicite des parents ou tuteurs légaux.
                  Un formulaire de consentement digital avec signature électronique est requis lors de l'inscription.
                </p>
              </CardContent>
            </Card>

            {/* Section 6 - Contact */}
            <Card className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/15 border-[#D4AF37]/30">
              <CardHeader>
                <CardTitle>Contact DPO</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Pour exercer vos droits ou pour toute question concernant vos données personnelles :
                </p>
                <div className="space-y-2">
                  <div>
                    <strong>Data Protection Officer (DPO)</strong>
                  </div>
                  <div className="text-muted-foreground">
                    Email : dpo@farafina.ffa.fr
                  </div>
                  <div className="text-muted-foreground">
                    Téléphone : +221 XX XXX XX XX
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
