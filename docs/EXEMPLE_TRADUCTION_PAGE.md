# Exemple : Traduire une Page Complète

## 📄 Exemple avec la Page d'Accueil

Voici comment traduire tous les textes d'une page :

### Avant (texte en dur)

```tsx
export default function HomePage() {
  return (
    <div>
      <h1>Bienvenue à Farafina Foot Academy</h1>
      <p>Découvrez les talents de demain</p>
      <button>En savoir plus</button>
    </div>
  )
}
```

### Après (avec traductions)

```tsx
"use client"

import { useTranslation } from "@/lib/hooks/use-translation"

export default function HomePage() {
  const { t, loading } = useTranslation()

  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <div>
      <h1>{t("pages.home.hero.title")}</h1>
      <p>{t("pages.home.hero.subtitle")}</p>
      <button>{t("pages.home.cta.learnMore")}</button>
    </div>
  )
}
```

### Fichiers de traduction

**messages/fr.json** :
```json
{
  "pages": {
    "home": {
      "hero": {
        "title": "Bienvenue à Farafina Foot Academy",
        "subtitle": "Découvrez les talents de demain"
      },
      "cta": {
        "learnMore": "En savoir plus"
      }
    }
  }
}
```

**messages/en.json** :
```json
{
  "pages": {
    "home": {
      "hero": {
        "title": "Welcome to Farafina Foot Academy",
        "subtitle": "Discover tomorrow's talents"
      },
      "cta": {
        "learnMore": "Learn more"
      }
    }
  }
}
```

## 🎯 Bonnes Pratiques

1. **Organiser par page/fonctionnalité** : `pages.home.*`, `pages.about.*`, etc.
2. **Utiliser des noms descriptifs** : `hero.title` plutôt que `title1`
3. **Grouper les traductions** : Tous les textes d'une section ensemble
4. **Tester toutes les langues** : Vérifier que toutes les clés existent dans tous les fichiers

## ⚡ Avantages

- ✅ Changement instantané de langue
- ✅ Facile à maintenir (fichiers JSON séparés)
- ✅ Pas besoin de recharger la page
- ✅ Fonctionne partout dans l'application

