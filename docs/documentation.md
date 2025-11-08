# Documentation - Vitrine Digitale FFA Farafina

## Table des Matières

1. [Introduction](#introduction)
2. [Architecture Technique](#architecture-technique)
3. [Charte Graphique](#charte-graphique)
4. [Structure du Projet](#structure-du-projet)
5. [Composants](#composants)
6. [Pages](#pages)
7. [Fonctionnalités](#fonctionnalités)
8. [Déploiement](#déploiement)
9. [Maintenance](#maintenance)

---

## Introduction

### À propos du Projet

La vitrine digitale Farafina est une plateforme web moderne développée pour la Fédération Française d'Athlétisme (FFA). Elle présente les programmes, admissions, et statistiques de l'académie Farafina.

### Objectifs

- Présenter l'académie Farafina au niveau mondial
- Faciliter les candidatures en ligne
- Afficher les KPI et statistiques
- Diffuser du contenu vidéo (FFA TV)
- Fournir une expérience utilisateur optimale

### Technologies Utilisées

- **Framework** : Next.js 16
- **Langage** : TypeScript
- **Styling** : Tailwind CSS 4
- **UI Components** : shadcn/ui (Radix UI)
- **Graphiques** : Recharts
- **Icons** : Lucide React

---

## Architecture Technique

### Stack Technique

```
┌─────────────────────────────────────┐
│         Next.js 16 (App Router)     │
├─────────────────────────────────────┤
│  React 18 | TypeScript | Tailwind   │
├─────────────────────────────────────┤
│  shadcn/ui | Recharts | Lucide      │
└─────────────────────────────────────┘
```

### Structure des Dossiers

```
farafina/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── programs/          # Page programmes
│   ├── admissions/        # Page admissions
│   ├── dashboard/         # Dashboard KPI
│   ├── ffa-tv/            # Page FFA TV
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── ui/                # Composants UI de base
│   ├── header.tsx         # Header
│   ├── footer.tsx         # Footer
│   └── [feature]/         # Composants par feature
├── lib/                   # Utilitaires
│   └── utils.ts          # Fonctions utilitaires
├── public/                # Assets statiques
├── docs/                  # Documentation
└── package.json          # Dépendances
```

---

## Charte Graphique

### Couleurs Principales

#### Or Farafina (Primaire)
- **Principal** : `#D4AF37` (RGB: 212, 175, 55)
- **Foncé** : `#B8941F` (RGB: 184, 148, 31)
- **Clair** : `#E8C966` (RGB: 232, 201, 102)

#### Noir (Secondaire)
- **Principal** : `#1A1A1A` (RGB: 26, 26, 26)
- **Clair** : `#2a2a2a` (RGB: 42, 42, 42)
- **Foncé** : `#000000` (RGB: 0, 0, 0)

#### Neutres
- **Blanc** : `#FFFFFF`
- **Gris Clair** : `#F5F5F5`
- **Gris Moyen** : `#737373`

### Typographie

#### Polices
- **Sans-serif** : Poppins (titres)
- **Mono** : Inter (corps de texte)

#### Hiérarchie
- **H1** : 4xl-5xl (48-60px), Bold
- **H2** : 3xl-4xl (36-48px), Bold
- **H3** : 2xl-3xl (24-36px), Bold
- **Body** : base (16px), Regular
- **Small** : sm (14px), Regular

### Espacement

Système de grille basé sur 8px :
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

---

## Structure du Projet

### Pages Principales

#### Page d'Accueil (`app/page.tsx`)
- Hero section avec CTA
- Statistiques (KPI cards)
- Programmes populaires
- Témoignages
- Partenaires

#### Page Programmes (`app/programs/page.tsx`)
- Liste des programmes
- Filtres par catégorie
- Détails de chaque programme

#### Page Admissions (`app/admissions/page.tsx`)
- Processus d'admission
- Formulaire de candidature
- Tarifs et bourses

#### Dashboard KPI (`app/dashboard/page.tsx`)
- Métriques clés
- Graphiques de performance
- Analyses géographiques
- Données financières

#### Page FFA TV (`app/ffa-tv/page.tsx`)
- Galerie vidéo
- Filtres par catégorie
- Player vidéo intégré

### Composants Réutilisables

#### Header (`components/header.tsx`)
- Navigation principale
- Logo Farafina
- Menu mobile responsive

#### Footer (`components/footer.tsx`)
- Liens rapides
- Informations de contact
- Réseaux sociaux
- Newsletter

#### Cards
- `stat-card.tsx` : Card pour statistiques
- `program-card.tsx` : Card pour programmes

---

## Composants

### Composants UI (shadcn/ui)

Les composants UI sont basés sur Radix UI et personnalisés avec Tailwind CSS :

- `Button` : Boutons avec variantes
- `Card` : Conteneurs de contenu
- `Tabs` : Navigation par onglets
- `Input` : Champs de formulaire
- `Select` : Sélecteurs
- Et plus...

### Utilisation

```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

<Button variant="default" className="bg-[#D4AF37]">
  Cliquer
</Button>
```

---

## Pages

### Configuration des Routes

Next.js App Router utilise le système de fichiers pour les routes :

- `/` → `app/page.tsx`
- `/programs` → `app/programs/page.tsx`
- `/admissions` → `app/admissions/page.tsx`
- `/dashboard` → `app/dashboard/page.tsx`
- `/ffa-tv` → `app/ffa-tv/page.tsx`

### Métadonnées SEO

Chaque page inclut des métadonnées pour le SEO :

```tsx
export const metadata = {
  title: "Titre de la page",
  description: "Description de la page",
}
```

---

## Fonctionnalités

### Dashboard KPI

Le dashboard affiche :
- Métriques en temps réel
- Graphiques interactifs (Recharts)
- Filtres par période
- Export de données (à venir)

### Responsive Design

- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

### Accessibilité

- Contraste WCAG AA
- Navigation au clavier
- ARIA labels
- Alt text pour images

---

## Déploiement

### Prérequis

- Node.js 18+
- npm ou pnpm

### Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build

# Lancer en production
npm start
```

### Variables d'Environnement

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_SITE_URL=https://farafina.ffa.fr
```

### Déploiement Vercel

1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement

---

## Maintenance

### Mises à Jour

- **Dépendances** : Mise à jour mensuelle
- **Sécurité** : Patches immédiats
- **Contenu** : Mise à jour régulière

### Monitoring

- **Performance** : Vercel Analytics
- **Erreurs** : Sentry (à configurer)
- **Analytics** : Google Analytics (à configurer)

### Support

Pour toute question ou problème :
- Documentation : `/docs`
- Issues : GitHub Issues
- Contact : [email]

---

## Ressources

### Documentation Externe

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Recharts](https://recharts.org)

### Liens Utiles

- Repository GitHub : [lien]
- Design System : [lien]
- Wireframes : `/docs/wireframes.md`
- Roadmap : `/docs/roadmap.md`

---

**Version** : 1.0
**Dernière mise à jour** : [Date]

