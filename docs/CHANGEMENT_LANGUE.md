# Système de Changement de Langue

## ✅ Fonctionnalités Implémentées

### 1. **Contexte de Langue** (`lib/language-context.tsx`)
- Gestion globale de la langue sélectionnée
- Persistance dans `localStorage`
- Mise à jour automatique de l'attribut `lang` du document HTML
- Support de 4 langues : Français, English, العربية, Português

### 2. **Hook de Traduction** (`lib/hooks/use-translation.ts`)
- Hook `useTranslation()` pour utiliser les traductions facilement
- Se met automatiquement à jour quand la langue change
- Utilise `useMemo` pour optimiser les performances

### 3. **Traductions** (`lib/i18n.ts`)
- Traductions pour toutes les langues supportées
- Structure organisée par catégories (`common`, `navigation`)
- Fonction `getTranslation()` pour récupérer les traductions

### 4. **Sélecteur de Langue** (`components/ui/language-selector.tsx`)
- Dropdown menu pour changer la langue
- Affiche le drapeau et le code de la langue actuelle
- Indicateur visuel (✓) pour la langue sélectionnée

### 5. **Header Traduit** (`components/header.tsx`)
- Tous les textes du header utilisent maintenant les traductions
- Menu de navigation traduit
- Boutons (Connexion, Profil, Déconnexion, Postuler) traduits

## 🌍 Langues Supportées

1. **Français (fr)** - Langue par défaut
2. **English (en)**
3. **العربية (ar)** - Arabe
4. **Português (pt)** - Portugais

## 📝 Utilisation

### Dans un Composant

```tsx
import { useTranslation } from "@/lib/hooks/use-translation"

export function MyComponent() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t("common.welcome")}</h1>
      <p>{t("navigation.programs")}</p>
    </div>
  )
}
```

### Clés de Traduction Disponibles

#### Common
- `common.welcome` - "Bienvenue" / "Welcome" / etc.
- `common.home` - "Accueil" / "Home" / etc.
- `common.contact` - "Contact"
- `common.login` - "Connexion" / "Login" / etc.
- `common.signup` - "Inscription" / "Sign Up" / etc.
- `common.logout` - "Se déconnecter" / "Logout" / etc.
- `common.profile` - "Mon Profil" / "My Profile" / etc.
- `common.apply` - "Postuler" / "Apply" / etc.
- `common.menu` - "MENU"

#### Navigation
- `navigation.programs` - "Programmes" / "Programs" / etc.
- `navigation.admissions` - "Admissions"
- `navigation.events` - "Événements" / "Events" / etc.
- `navigation.players` - "Joueurs" / "Players" / etc.
- `navigation.international` - "International"
- `navigation.boutique` - "Boutique" / "Shop" / etc.
- `navigation.ffaTV` - "FFA TV"
- `navigation.clubConnect` - "Club Connect"
- `navigation.scouting` - "IA Scouting" / "AI Scouting" / etc.
- `navigation.partners` - "Devenir Partenaire" / "Become a Partner" / etc.

## 🔄 Comment ça Fonctionne

1. **Changement de Langue** :
   - L'utilisateur clique sur le sélecteur de langue dans le header
   - La langue est mise à jour dans le contexte
   - La langue est sauvegardée dans `localStorage`
   - L'attribut `lang` du document HTML est mis à jour
   - Tous les composants utilisant `useTranslation()` se re-rendent automatiquement

2. **Persistance** :
   - La langue choisie est sauvegardée dans `localStorage` avec la clé `ffa-language`
   - Au chargement de la page, la langue est restaurée depuis `localStorage`
   - Un script inline dans `app/layout.tsx` charge la langue avant le premier rendu pour éviter le flash

3. **Re-render Automatique** :
   - Le hook `useTranslation()` utilise `useMemo` avec `language` comme dépendance
   - Quand la langue change, la fonction `t` est recréée
   - React détecte le changement et re-rend les composants

## 🎯 Prochaines Étapes

Pour étendre les traductions à d'autres pages :

1. Ajouter les nouvelles clés dans `lib/i18n.ts`
2. Utiliser `useTranslation()` dans les composants
3. Remplacer les textes en dur par `t("clé.de.traduction")`

## ⚠️ Notes Importantes

- Les traductions sont actuellement limitées au header et aux éléments communs
- Pour traduire les pages complètes, il faudra ajouter plus de traductions dans `lib/i18n.ts`
- Le système est extensible : il suffit d'ajouter de nouvelles clés dans l'objet `translations`

