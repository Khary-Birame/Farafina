# ✅ Upload de Photo - Formulaire Joueur

## 🎯 Fonctionnalité Ajoutée

Ajout de la fonctionnalité d'**upload de photo** dans le formulaire de création et modification de joueur.

## ✨ Fonctionnalités

### 1. **Upload de Photo**
- ✅ Champ d'upload dans le formulaire
- ✅ Preview de la photo avant upload
- ✅ Affichage de la photo existante en mode édition
- ✅ Possibilité de changer la photo
- ✅ Possibilité de supprimer la photo

### 2. **Validation**
- ✅ Types de fichiers acceptés : JPEG, PNG, WebP
- ✅ Taille maximale : 5MB
- ✅ Messages d'erreur clairs

### 3. **Stockage**
- ✅ Upload vers Supabase Storage (bucket `players`)
- ✅ Fallback vers bucket `applications` si `players` n'existe pas
- ✅ Génération d'URL publique
- ✅ Sauvegarde dans `photo_url` et `image` (alias)

## 📝 Modifications Apportées

### 1. **Interface et État** (`components/admin/player-form-dialog.tsx`)

**Nouveaux états :**
```typescript
interface PlayerFormState {
  photoFile: File | null
  photoPreview: string | null
  photoUrl: string | null
}

const [photoState, setPhotoState] = useState<PlayerFormState>({
  photoFile: null,
  photoPreview: null,
  photoUrl: null,
})
const [uploadingPhoto, setUploadingPhoto] = useState(false)
const fileInputRef = useRef<HTMLInputElement>(null)
```

**Ajout de `photo_url` dans `PlayerFormData` :**
```typescript
interface PlayerFormData {
  // ... autres champs
  photo_url: string
}
```

### 2. **Fonction d'Upload**

```typescript
const uploadPlayerPhoto = async (file: File, playerId?: string): Promise<string | null> => {
  // Validation du type et de la taille
  // Upload vers Supabase Storage
  // Retourne l'URL publique de la photo
}
```

**Caractéristiques :**
- Validation du type de fichier (JPEG, PNG, WebP)
- Validation de la taille (max 5MB)
- Upload vers bucket `players` ou `applications` (fallback)
- Génération d'URL publique
- Gestion d'erreur avec messages clairs

### 3. **Gestion des Photos**

**Changement de photo :**
```typescript
const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  // Créer une preview locale
  // Stocker le fichier pour upload ultérieur
}
```

**Suppression de photo :**
```typescript
const handleRemovePhoto = () => {
  // Réinitialiser l'état de la photo
  // Vider l'input file
}
```

### 4. **Intégration dans le Formulaire**

**Champ d'upload ajouté :**
- Zone de drag & drop visuelle
- Preview de la photo (actuelle ou nouvelle)
- Bouton pour supprimer la photo
- Indicateur de chargement pendant l'upload

**Position :** En haut de la section "Informations personnelles"

### 5. **Sauvegarde**

**Lors de la création :**
```typescript
const createData = {
  // ... autres champs
  photo_url: photoUrl || null,
  image: photoUrl || null, // Alias pour compatibilité
}
```

**Lors de la modification :**
```typescript
const updateData = {
  // ... autres champs
  photo_url: photoUrl || null,
  image: photoUrl || null, // Alias pour compatibilité
}
```

## 🎨 Interface Utilisateur

### Champ d'Upload
- **Zone de drop** : Bordure en pointillés, hover avec couleur dorée
- **Preview** : Miniature 24x24 avec bouton de suppression
- **Texte dynamique** : "Ajouter une photo" ou "Changer la photo"
- **Indicateur de chargement** : Spinner pendant l'upload

### Affichage en Mode Édition
- La photo existante s'affiche automatiquement
- Possibilité de la remplacer ou de la supprimer
- Preview immédiate de la nouvelle photo sélectionnée

## 🔧 Configuration Supabase

### Bucket de Stockage

**Option 1 : Créer un bucket `players` (Recommandé)**
1. Aller dans Supabase Dashboard → Storage
2. Créer un nouveau bucket nommé `players`
3. Configurer comme **public** ou **privé** selon vos besoins
4. Ajouter les politiques RLS appropriées

**Option 2 : Utiliser le bucket `applications` (Fallback)**
- Le code utilise automatiquement `applications` si `players` n'existe pas
- Les photos seront stockées dans `applications/players/...`

### Politiques RLS (si bucket privé)

```sql
-- Permettre l'upload aux utilisateurs authentifiés
CREATE POLICY "Authenticated users can upload player photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'players'
);

-- Permettre la lecture publique (si bucket public)
CREATE POLICY "Public can read player photos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'players');
```

## 📋 Structure des Fichiers

Les photos sont stockées avec cette structure :
```
players/
  {playerId}/
    photo-{timestamp}.{ext}
```

Ou pour les nouvelles créations (avant d'avoir l'ID) :
```
players/
  temp/
    photo-{timestamp}-{random}.{ext}
```

## 🧪 Tests à Effectuer

### Test 1 : Création avec Photo
1. Cliquer sur "Ajouter un Joueur"
2. Remplir le formulaire
3. Cliquer sur "Ajouter une photo"
4. Sélectionner une image (JPEG, PNG ou WebP < 5MB)
5. ✅ La preview doit s'afficher
6. Soumettre le formulaire
7. ✅ La photo doit être uploadée et sauvegardée

### Test 2 : Modification avec Changement de Photo
1. Cliquer sur "Modifier" pour un joueur existant
2. ✅ La photo actuelle doit s'afficher
3. Cliquer sur "Changer la photo"
4. Sélectionner une nouvelle image
5. ✅ La nouvelle preview doit s'afficher
6. Soumettre le formulaire
7. ✅ La nouvelle photo doit remplacer l'ancienne

### Test 3 : Suppression de Photo
1. Ouvrir le formulaire d'édition
2. Cliquer sur le bouton X sur la photo
3. ✅ La photo doit disparaître
4. Soumettre le formulaire
5. ✅ Le joueur doit être mis à jour sans photo

### Test 4 : Validation
1. Essayer d'uploader un fichier non-image (PDF, etc.)
2. ✅ Message d'erreur "Type de fichier non autorisé"
3. Essayer d'uploader une image > 5MB
4. ✅ Message d'erreur "Fichier trop volumineux"

## ✅ Résultat

**L'upload de photo est maintenant fonctionnel !** 🎉

- ✅ Upload de photo lors de la création
- ✅ Modification de photo lors de l'édition
- ✅ Suppression de photo
- ✅ Preview avant upload
- ✅ Validation des fichiers
- ✅ Gestion d'erreur

**Testez maintenant pour voir l'upload de photo en action !** 🚀

