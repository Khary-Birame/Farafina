# Dépannage - Formulaire de Candidature

## Problème : Soumission très lente ou bloquée

### Symptômes
- Le formulaire reste bloqué sur "Soumission en cours..."
- L'upload prend beaucoup de temps
- Erreur de timeout

### Causes possibles

1. **Taille des fichiers trop importante**
   - Vidéo : jusqu'à 100MB (peut prendre plusieurs minutes)
   - Photos : jusqu'à 2MB chacune
   - Documents PDF : jusqu'à 5MB chacun

2. **Connexion internet lente**
   - Upload de fichiers volumineux nécessite une bonne connexion
   - Connexion instable peut causer des timeouts

3. **Timeout Vercel**
   - Plan Hobby : 10 secondes max
   - Plan Pro : 60 secondes max
   - Si l'upload dépasse ce temps, la fonction timeout

4. **Problème avec Supabase Storage**
   - Latence réseau
   - Problème de configuration du bucket

### Solutions implémentées

1. **Timeouts explicites**
   - 30 secondes par fichier individuel
   - 2 minutes pour l'ensemble des uploads
   - Messages d'erreur clairs si timeout

2. **Messages informatifs**
   - Toast au début de la soumission
   - Message dans le bouton pendant l'upload
   - Messages d'erreur détaillés

3. **Gestion d'erreur améliorée**
   - Détection des timeouts
   - Messages d'erreur spécifiques
   - Suggestions pour résoudre le problème

### Recommandations pour les utilisateurs

1. **Réduire la taille des fichiers**
   - **Vidéo** : Compresser avant upload (max 50MB recommandé)
   - **Photos** : Utiliser des images optimisées (max 1MB chacune)
   - **PDF** : Compresser les documents si possible

2. **Vérifier la connexion internet**
   - Utiliser une connexion stable
   - Éviter les réseaux publics lents
   - Vérifier la vitesse de connexion

3. **Réessayer en cas d'échec**
   - Si timeout, réessayer avec des fichiers plus petits
   - Vérifier que tous les fichiers sont valides
   - Contacter le support si le problème persiste

### Optimisations futures possibles

1. **Compression côté client**
   - Compresser les images avant upload
   - Réduire la qualité vidéo si nécessaire

2. **Upload progressif**
   - Afficher la progression de chaque fichier
   - Permettre de continuer si un fichier échoue

3. **Upload en arrière-plan**
   - Sauvegarder les données du formulaire immédiatement
   - Uploader les fichiers en arrière-plan
   - Notifier l'utilisateur une fois terminé

4. **Chunked upload**
   - Diviser les gros fichiers en chunks
   - Uploader par petits morceaux
   - Reconstituer côté serveur

### Vérification des logs

Pour déboguer, vérifier les logs dans :
- Console navigateur (F12)
- Logs Vercel (Deployments → Functions)
- Logs Supabase (Storage → Logs)

### Messages d'erreur courants

1. **"Le téléchargement prend trop de temps"**
   - Solution : Réduire la taille des fichiers, vérifier la connexion

2. **"Erreur lors de l'upload de [fichier]"**
   - Solution : Vérifier que le fichier est valide, réessayer

3. **"Type de fichier non autorisé"**
   - Solution : Utiliser les formats acceptés (PDF, JPG, PNG, MP4)

4. **"Le fichier est trop volumineux"**
   - Solution : Réduire la taille du fichier

