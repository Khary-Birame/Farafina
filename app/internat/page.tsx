import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Espace de l'Internat - Farafina Foot Academy",
  description:
    "Découvrez nos résidences étudiantes modernes et confortables pour les étudiants de Farafina Foot Academy.",
}

export default function InternatPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Espace de l'<span className="text-[#D4AF37]">Internat</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Hébergement confortable et sécurisé avec espaces d'étude et installations récréatives pour nos étudiants.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="font-sans font-bold text-3xl md:text-4xl text-gray-900 mb-6">
                  Nos Résidences Étudiantes
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Les résidences étudiantes de Farafina Foot Academy offrent un environnement sûr, confortable et propice à l'apprentissage. 
                  Chaque résidence est équipée d'espaces d'étude modernes, de zones de détente et de toutes les commodités nécessaires 
                  pour garantir le bien-être de nos étudiants.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-sans font-semibold text-xl text-gray-900 mb-3">
                      Chambres Confortables
                    </h3>
                    <p className="text-gray-700">
                      Chambres spacieuses et bien équipées pour un séjour agréable et reposant.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-sans font-semibold text-xl text-gray-900 mb-3">
                      Espaces d'Étude
                    </h3>
                    <p className="text-gray-700">
                      Salles d'étude dédiées pour permettre aux étudiants de travailler dans un environnement calme et concentré.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-sans font-semibold text-xl text-gray-900 mb-3">
                      Installations Récréatives
                    </h3>
                    <p className="text-gray-700">
                      Espaces de détente et d'activités pour favoriser l'équilibre entre études et loisirs.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-sans font-semibold text-xl text-gray-900 mb-3">
                      Sécurité 24/7
                    </h3>
                    <p className="text-gray-700">
                      Surveillance continue et mesures de sécurité pour garantir la tranquillité d'esprit des étudiants et de leurs familles.
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

