# Guide de Responsivité - Farafina Foot Academy

## 📱 Breakpoints Standardisés

### Appareils Supportés

| Breakpoint | Taille | Appareil | Classes Tailwind |
|------------|--------|----------|------------------|
| `xs` | < 375px | Très petits téléphones | `xs:` |
| `sm` | 375px - 767px | Petits/moyens téléphones | `sm:` |
| `md` | 768px - 1023px | Tablettes portrait | `md:` |
| `lg` | 1024px - 1279px | Tablettes paysage / Petits laptops | `lg:` |
| `xl` | 1280px - 1535px | Laptops | `xl:` |
| `2xl` | ≥ 1536px | Desktops | `2xl:` |

## 🎯 Classes Responsives Standardisées

### Containers

```tsx
// Container avec padding adaptatif
<div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12">
  {/* Contenu */}
</div>
```

### Grilles

```tsx
// Grille 1-2-3 colonnes
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {/* Items */}
</div>

// Grille 1-2-4 colonnes
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
  {/* Items */}
</div>
```

### Typographie

```tsx
// Titres responsives
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  Titre
</h1>

<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Sous-titre
</h2>

// Texte responsive
<p className="text-sm sm:text-base md:text-lg">
  Paragraphe
</p>
```

### Espacements

```tsx
// Padding vertical adaptatif
<section className="py-12 sm:py-16 md:py-20 lg:py-24">
  {/* Contenu */}
</section>

// Gap adaptatif
<div className="flex gap-2 sm:gap-4 md:gap-6">
  {/* Items */}
</div>
```

## 📐 Règles de Responsivité

### 1. Mobile First
- Toujours commencer par le design mobile
- Utiliser `min-width` dans les media queries
- Classes de base = mobile, puis ajouter les breakpoints supérieurs

### 2. Touch Targets
- Minimum 44x44px pour les boutons sur mobile
- Espacement suffisant entre les éléments cliquables
- Utiliser `min-height: 44px` sur mobile

### 3. Images
- Utiliser `next/image` avec `sizes` approprié
- Lazy loading pour les images non critiques
- Formats modernes (WebP, AVIF) quand possible

### 4. Typographie
- Taille de base : 16px minimum (accessibilité)
- Line-height : 1.5 minimum
- Contraste WCAG AA minimum

### 5. Navigation Mobile
- Menu hamburger pour < 768px
- Navigation complète pour ≥ 1024px
- Menu sticky/fixed pour faciliter l'accès

## 🔧 Composants Optimisés

### Header
- ✅ Logo adaptatif (8px → 12px)
- ✅ Menu hamburger avec texte sur mobile
- ✅ Actions réduites sur petits écrans
- ✅ Hauteur adaptative (14px → 20px)

### Footer
- ✅ Grille 1 → 2 → 4 colonnes
- ✅ Padding adaptatif
- ✅ Liens empilés sur mobile

### Formulaires
- ✅ Champs full-width sur mobile
- ✅ Labels visibles et clairs
- ✅ Boutons touch-friendly (44px min)
- ✅ Messages d'erreur bien visibles

### Cards
- ✅ Full-width sur mobile
- ✅ 2 colonnes sur tablette
- ✅ 3-4 colonnes sur desktop
- ✅ Images responsives

## 📱 Optimisations Spécifiques Mobile

### Viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

### Safe Area (Notched Devices)
```css
.safe-area-top {
  padding-top: max(1rem, env(safe-area-inset-top));
}
```

### Touch Events
- Utiliser `onClick` plutôt que `onMouseEnter` sur mobile
- Désactiver les hover effects sur touch devices
- Feedback visuel immédiat

## ✅ Checklist Responsive

Pour chaque composant, vérifier :

- [ ] Fonctionne sur < 375px (très petits écrans)
- [ ] Fonctionne sur 375px - 767px (téléphones)
- [ ] Fonctionne sur 768px - 1023px (tablettes)
- [ ] Fonctionne sur ≥ 1024px (desktop)
- [ ] Textes lisibles sans zoom
- [ ] Boutons accessibles (44px min)
- [ ] Images optimisées et responsives
- [ ] Navigation intuitive sur tous les écrans
- [ ] Pas de scroll horizontal indésirable
- [ ] Performance optimale sur mobile

## 🚀 Performance Mobile

### Optimisations Implémentées

1. **Compression d'images** : Réduction automatique avant upload
2. **Lazy loading** : Images chargées à la demande
3. **Code splitting** : Chargement progressif des composants
4. **Font optimization** : Polices système préférées
5. **Minification** : CSS et JS optimisés en production

## 📊 Tests Recommandés

### Outils de Test
- Chrome DevTools (Device Toolbar)
- Firefox Responsive Design Mode
- Safari Web Inspector
- Real devices (iPhone, Android)

### Résolutions à Tester
- 320px (iPhone SE)
- 375px (iPhone 12/13)
- 414px (iPhone Pro Max)
- 768px (iPad)
- 1024px (iPad Pro)
- 1280px+ (Desktop)

## 🎨 Exemples de Code

### Container Responsive
```tsx
<div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12">
  <div className="max-w-7xl mx-auto">
    {/* Contenu */}
  </div>
</div>
```

### Card Responsive
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
  {items.map(item => (
    <Card className="w-full">
      {/* Contenu */}
    </Card>
  ))}
</div>
```

### Button Responsive
```tsx
<Button 
  className="w-full sm:w-auto min-h-[44px] text-sm sm:text-base px-4 sm:px-6"
>
  Action
</Button>
```

## 📝 Notes Importantes

1. **Toujours tester sur de vrais appareils** : Les émulateurs ne remplacent pas les tests réels
2. **Performance avant tout** : Un design responsive lent n'est pas acceptable
3. **Accessibilité** : La responsivité doit améliorer l'accessibilité, pas la réduire
4. **Progressive Enhancement** : Fonctionne d'abord sur mobile, puis améliore pour desktop

