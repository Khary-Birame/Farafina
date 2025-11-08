export type BoutiqueProduct = {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: 'maillot' | 'survetement' | 'accessoire'
  isPopular?: boolean
}

export const boutiqueProducts: BoutiqueProduct[] = [
  {
    id: 'maillot-elite-or',
    name: 'Maillot Élite Or',
    price: 35000,
    image: '/boutique/or.jpg',
    description: "Maillot officiel domicile en édition dorée, respirant et ultra-léger.",
    category: 'maillot',
    isPopular: true,
  },
  {
    id: 'maillot-noir',
    name: 'Maillot Noir Prestige',
    price: 30000,
    image: '/boutique/blacky.jpg',
    description: "Version noire iconique avec finitions dorées et technologie anti-transpiration.",
    category: 'maillot',
    isPopular: true,
  },
  {
    id: 'maillot-grand-modele',
    name: 'Maillot Grand Modèle',
    price: 32000,
    image: '/boutique/maillot_gm.jpg',
    description: "Coupe ample pour un confort optimal, inspirée des plus grands clubs.",
    category: 'maillot',
  },
  {
    id: 'survetement-complet',
    name: 'Survêtement Performance',
    price: 55000,
    image: '/boutique/complet.jpg',
    description: "Ensemble complet (haut + bas) pour les séances d'entraînement intensives.",
    category: 'survetement',
    isPopular: true,
  },
  {
    id: 'survetement-vc',
    name: 'Veste Club V&C',
    price: 45000,
    image: '/boutique/vc_b.jpg',
    description: "Veste élégante et chaude, idéale pour représenter l'académie en déplacement.",
    category: 'survetement',
  },
  {
    id: 'sac-or',
    name: 'Sac de Sport Or',
    price: 25000,
    image: '/boutique/or_sac.jpg',
    description: "Sac de sport premium avec renforts et compartiments dédiés.",
    category: 'accessoire',
  },
  {
    id: 'pack-equipements',
    name: "Pack Équipements d'Entraînement",
    price: 40000,
    image: '/boutique/equipements.jpg',
    description: "Pack complet (chaussettes, protège-tibias, gourde) pour accompagner vos séances.",
    category: 'accessoire',
    isPopular: true,
  },
]
