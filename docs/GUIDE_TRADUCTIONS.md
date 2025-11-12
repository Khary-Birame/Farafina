# Guide d'Utilisation des Traductions

## 🎯 Système de Traduction

L'application utilise un système de traduction basé sur des fichiers JSON qui se charge dynamiquement selon la langue sélectionnée.

## 📁 Structure des Fichiers

```
messages/
  ├── fr.json  (Français - langue par défaut)
  ├── en.json  (English)
  ├── ar.json  (العربية)
  └── pt.json  (Português)
```

## 🔧 Utilisation dans les Composants

### 1. Importer le hook

```tsx
import { useTranslation } from "@/lib/hooks/use-translation"
```

### 2. Utiliser dans le composant

```tsx
export function MyComponent() {
  const { t, loading } = useTranslation()

  // Optionnel : gérer le chargement
  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <div>
      <h1>{t("common.welcome")}</h1>
      <p>{t("navigation.programs")}</p>
    </div>
  )
}
```

## 📝 Ajouter de Nouvelles Traductions

### Étape 1 : Ajouter dans `messages/fr.json`

```json
{
  "common": {
    "welcome": "Bienvenue",
    "newKey": "Nouveau texte"  // ← Ajouter ici
  }
}
```

### Étape 2 : Ajouter dans toutes les autres langues

**messages/en.json** :
```json
{
  "common": {
    "welcome": "Welcome",
    "newKey": "New text"  // ← Traduction anglaise
  }
}
```

**messages/ar.json** :
```json
{
  "common": {
    "welcome": "مرحباً",
    "newKey": "نص جديد"  // ← Traduction arabe
  }
}
```

**messages/pt.json** :
```json
{
  "common": {
    "welcome": "Bem-vindo",
    "newKey": "Novo texto"  // ← Traduction portugaise
  }
}
```

### Étape 3 : Utiliser dans le code

```tsx
const { t } = useTranslation()
<p>{t("common.newKey")}</p>
```

## 🎨 Structure Recommandée

Organisez vos traductions par catégories :

```json
{
  "common": {
    // Textes communs (boutons, actions, etc.)
  },
  "navigation": {
    // Menu de navigation
  },
  "forms": {
    // Formulaires
  },
  "pages": {
    "home": {
      // Traductions spécifiques à la page d'accueil
    },
    "about": {
      // Traductions spécifiques à la page À propos
    }
  }
}
```

## ⚡ Fonctionnalités

### 1. **Changement automatique**
Quand l'utilisateur change la langue, tous les composants utilisant `useTranslation()` se mettent à jour automatiquement.

### 2. **Fallback**
Si une traduction n'existe pas, le système :
- Utilise le texte de fallback si fourni
- Sinon, affiche la clé de traduction

### 3. **Chargement dynamique**
Les traductions sont chargées à la demande, ce qui améliore les performances.

### 4. **Persistance**
La langue choisie est sauvegardée dans `localStorage` et restaurée au prochain chargement.

## 🔍 Exemples d'Utilisation

### Exemple 1 : Texte simple

```tsx
const { t } = useTranslation()
<h1>{t("common.welcome")}</h1>
```

### Exemple 2 : Avec fallback

```tsx
const { t } = useTranslation()
<p>{t("common.newKey", "Texte par défaut")}</p>
```

### Exemple 3 : Dans un formulaire

```tsx
const { t } = useTranslation()
<label>{t("forms.firstName")}</label>
<input placeholder={t("forms.firstName")} />
```

### Exemple 4 : Gérer le chargement

```tsx
const { t, loading } = useTranslation()

if (loading) {
  return <div>{t("common.loading", "Chargement...")}</div>
}

return <div>{t("common.welcome")}</div>
```

## 📋 Clés de Traduction Disponibles

### Common
- `common.welcome`
- `common.home`
- `common.contact`
- `common.login`
- `common.signup`
- `common.logout`
- `common.profile`
- `common.apply`
- `common.menu`
- `common.loading`
- `common.error`
- `common.success`

### Navigation
- `navigation.programs`
- `navigation.admissions`
- `navigation.events`
- `navigation.players`
- `navigation.international`
- `navigation.boutique`
- `navigation.ffaTV`
- `navigation.clubConnect`
- `navigation.scouting`
- `navigation.partners`

### Forms
- `forms.firstName`
- `forms.lastName`
- `forms.email`
- `forms.password`
- `forms.confirmPassword`
- `forms.submit`
- `forms.required`

### Header
- `header.role`

## 🚀 Pour Traduire Toute l'Application

1. **Identifier tous les textes** à traduire dans l'application
2. **Créer les clés** dans `messages/fr.json`
3. **Traduire** dans tous les fichiers de langue
4. **Remplacer** les textes en dur par `t("clé.de.traduction")`

## 💡 Astuces

- Utilisez des noms de clés descriptifs : `pages.home.hero.title` plutôt que `title1`
- Groupez les traductions par fonctionnalité ou page
- Vérifiez que toutes les langues ont les mêmes clés
- Testez le changement de langue après chaque ajout

