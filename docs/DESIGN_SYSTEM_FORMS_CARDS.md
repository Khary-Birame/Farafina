# Design System - Formulaires et Cartes Harmonisés

## Vue d'ensemble

Ce document décrit le système de design harmonisé pour les formulaires et cartes de l'application Farafina. Tous les composants suivent maintenant une charte graphique cohérente avec les couleurs or/noir.

---

## 🎨 Charte Graphique Appliquée

### Couleurs
- **Or Principal** : `#D4AF37` (focus, bordures actives)
- **Or Foncé** : `#B8941F` (hover states)
- **Noir** : `#1A1A1A` (textes, arrière-plans)
- **Erreurs** : Rouge destructif (messages d'erreur)

---

## 📝 Système de Formulaires

### Composants Disponibles

#### 1. `InputField` - Champ de saisie
Composant harmonisé pour tous les champs de texte, email, téléphone, etc.

```tsx
import { InputField } from "@/components/ui/form-field"

<InputField
  label="Nom Complet"
  name="fullName"
  type="text"
  placeholder="Entrez votre nom"
  required
  hint="Minimum 2 caractères"
  error={errors.fullName}
/>
```

**Caractéristiques :**
- Hauteur standardisée : `h-12` (48px)
- Bordures arrondies : `rounded-lg`
- Focus ring Or : `ring-[#D4AF37]/20`
- Hover state : bordure Ore à 50% d'opacité
- Gestion des erreurs intégrée
- Support des hints/aide contextuelle

#### 2. `TextareaField` - Zone de texte
Pour les messages longs et descriptions.

```tsx
import { TextareaField } from "@/components/ui/form-field"

<TextareaField
  label="Message"
  name="message"
  placeholder="Votre message..."
  required
  rows={5}
  hint="Maximum 500 caractères"
/>
```

**Caractéristiques :**
- Hauteur minimale : `min-h-[100px]`
- Resize désactivé pour cohérence
- Mêmes styles de focus que Input

#### 3. `SelectField` - Sélecteur
Pour les listes déroulantes.

```tsx
import { SelectField } from "@/components/ui/form-field"

<SelectField
  label="Pays"
  name="country"
  placeholder="Sélectionnez un pays"
  required
  options={[
    { value: "senegal", label: "Sénégal" },
    { value: "mali", label: "Mali" }
  ]}
/>
```

---

### Styles Harmonisés

#### Dimensions Standard
- **Hauteur des champs** : `h-12` (48px)
- **Padding horizontal** : `px-4` (16px)
- **Padding Orical** : `py-2.5` (10px)
- **Border radius** : `rounded-lg` (8px)

#### États Visuels
- **Par défaut** : Bordure grise, fond blanc
- **Hover** : Bordure Ore à 50% (`border-[#D4AF37]/50`)
- **Focus** : Bordure Ore + ring (`ring-[#D4AF37]/20`)
- **Erreur** : Bordure rouge + ring destructif
- **Désactivé** : Opacité 50%, curseur not-allowed

#### Transitions
- **Durée** : `duration-200` (200ms)
- **Type** : `transition-all` pour fluidité

---

## 🃏 Système de Cartes

### Composants Disponibles

#### 1. `EnhancedCard` - Carte de base
Carte harmonisée avec variantes.

```tsx
import { EnhancedCard } from "@/components/ui/enhanced-card"

<EnhancedCard variant="elevated" hover>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
  </CardHeader>
  <CardContent>Contenu</CardContent>
</EnhancedCard>
```

**Variantes :**
- `default` : Bordure légère, ombre douce
- `elevated` : Ombre plus prononcée
- `outlined` : Bordure épaisse, pas d'ombre
- `gradient` : Dégradé Or subtil

#### 2. `CardWithIcon` - Carte avec icône
Carte avec icône et action optionnelle.

```tsx
import { CardWithIcon } from "@/components/ui/enhanced-card"
import { Trophy } from "lucide-react"

<CardWithIcon
  icon={<Trophy />}
  title="Excellence"
  description="Description de la carte"
  action={{
    label: "En savoir plus",
    href: "/about"
  }}
/>
```

#### 3. `StatCard` - Carte statistique
Pour afficher des métriques avec tendance.

```tsx
import { StatCard } from "@/components/ui/enhanced-card"
import { Users } from "lucide-react"

<StatCard
  value="2,450"
  label="Total Étudiants"
  icon={<Users />}
  trend={{
    value: "12.5%",
    isPositive: true
  }}
/>
```

#### 4. `ProgramCardEnhanced` - Carte programme
Carte spécialisée pour les programmes.

```tsx
import { ProgramCardEnhanced } from "@/components/ui/enhanced-card"

<ProgramCardEnhanced
  title="Programme Élite"
  description="Description du programme"
  image="/program-image.jpg"
  category="Sport"
  features={[
    "Formation intensive",
    "Suivi personnalisé"
  ]}
  action={{
    label: "Découvrir",
    href: "/programs/elite"
  }}
/>
```

---

### Styles Harmonisés des Cartes

#### Dimensions
- **Border radius** : `rounded-xl` (12px)
- **Padding** : `p-6` (24px) par défaut
- **Gap** : `gap-6` (24px) entre éléments

#### États
- **Hover** : 
  - Translation : `-translate-y-1` (4px vers le haut)
  - Ombre : `shadow-xl`
  - Transition : `duration-300`

#### Bordures
- **Carte par défaut** : `border-border`
- **Carte avec accent** : `border-l-4 border-l-[#D4AF37]`

---

## 🎯 Bonnes Pratiques

### Formulaires

1. **Espacement cohérent**
   - Utiliser `space-y-6` entre les groupes de champs
   - Utiliser `space-y-2` entre label et input

2. **Labels clairs**
   - Toujours inclure un label descriptif
   - Marquer les champs requis avec `*` en Or

3. **Feedback utilisateur**
   - Afficher les erreurs immédiatement
   - Fournir des hints pour guider l'utilisateur
   - Utiliser les icônes d'erreur (AlertCircle)

4. **Accessibilité**
   - Associer les labels avec `htmlFor`
   - Utiliser `aria-invalid` pour les erreurs
   - Utiliser `aria-describedby` pour les hints/erreurs

### Cartes

1. **Hiérarchie visuelle**
   - Utiliser les variantes appropriées selon l'importance
   - Éviter trop de cartes `elevated` sur une même page

2. **Contenu équilibré**
   - Limiter le texte à 2-3 lignes pour les descriptions
   - Utiliser des icônes pour améliorer la compréhension

3. **Actions claires**
   - Toujours inclure une action si la carte est cliquable
   - Utiliser des animations subtiles au hover

---

## 📦 Migration des Formulaires Existants

### Étapes de Migration

1. **Remplacer les champs individuels**
   ```tsx
   // Avant
   <div className="space-y-2">
     <Label htmlFor="email">Email</Label>
     <Input id="email" type="email" />
   </div>
   
   // Après
   <InputField
     label="Email"
     name="email"
     type="email"
   />
   ```

2. **Harmoniser les styles**
   - Supprimer les classes `h-12` redondantes
   - Utiliser les composants harmonisés

3. **Ajouter la gestion d'erreurs**
   - Intégrer les messages d'erreur
   - Ajouter les hints contextuels

---

## 📦 Migration des Cartes Existantes

### Étapes de Migration

1. **Identifier le type de carte**
   - Statistique → `StatCard`
   - Programme → `ProgramCardEnhanced`
   - Générique avec icône → `CardWithIcon`
   - Générique → `EnhancedCard`

2. **Remplacer les styles personnalisés**
   - Utiliser les variantes prédéfinies
   - Supprimer les classes de hover personnalisées

---

## 🎨 Exemples Complets

### Formulaire de Contact Harmonisé

```tsx
import { InputField, TextareaField, SelectField } from "@/components/ui/form-field"

<form className="space-y-6">
  <InputField
    label="Nom Complet"
    name="fullName"
    required
  />
  
  <InputField
    label="Email"
    name="email"
    type="email"
    required
  />
  
  <SelectField
    label="Sujet"
    name="subject"
    required
    options={[
      { value: "info", label: "Information" },
      { value: "support", label: "Support" }
    ]}
  />
  
  <TextareaField
    label="Message"
    name="message"
    required
    rows={5}
  />
</form>
```

### Grille de Cartes Harmonisée

```tsx
import { StatCard, ProgramCardEnhanced } from "@/components/ui/enhanced-card"

<div className="grid md:grid-cols-3 gap-6">
  <StatCard
    value="500+"
    label="Étudiants"
    icon={<Users />}
  />
  
  <ProgramCardEnhanced
    title="Programme Élite"
    description="..."
    category="Sport"
    action={{ label: "Découvrir", href: "/programs" }}
  />
</div>
```

---

## ✅ Checklist de Conformité

### Formulaires
- [ ] Utilisation des composants `InputField`, `TextareaField`, `SelectField`
- [ ] Hauteur standardisée à `h-12`
- [ ] Focus ring Or (`ring-[#D4AF37]/20`)
- [ ] Gestion des erreurs avec icônes
- [ ] Labels avec astérisque Or pour les champs requis
- [ ] Transitions fluides (`duration-200`)

### Cartes
- [ ] Utilisation des composants harmonisés
- [ ] Variante appropriée (default, elevated, etc.)
- [ ] Hover effect avec translation
- [ ] Border radius `rounded-xl`
- [ ] Espacement cohérent (`gap-6`, `p-6`)

---

**Dernière mise à jour** : [Date actuelle]
**Version** : 1.0

