# 🔍 Guide de Débogage - Formulaire Bloqué sur Mobile

## 🐛 Problème

Le formulaire reste bloqué sur "Soumission en cours..." pendant plusieurs minutes sur mobile.

## 🔍 Comment Déboguer

### 1. Ouvrir la Console du Navigateur sur Mobile

**Sur Chrome (Android) :**
1. Connectez votre téléphone à votre ordinateur via USB
2. Activez le débogage USB dans les paramètres développeur
3. Ouvrez Chrome sur votre PC
4. Allez sur `chrome://inspect`
5. Cliquez sur "Inspect" pour votre téléphone
6. Ouvrez l'onglet "Console"

**Sur Safari (iOS) :**
1. Sur votre iPhone : Réglages → Safari → Avancé → Activer "Inspecteur Web"
2. Connectez votre iPhone à votre Mac via USB
3. Sur votre Mac : Safari → Développement → [Votre iPhone] → [Page web]
4. Ouvrez la console

### 2. Vérifier les Logs

Une fois la console ouverte, soumettez le formulaire et cherchez ces logs :

#### ✅ Logs Normaux (Succès)
```
[ApplicationForm] 🚀 Début de la soumission de la candidature
[ApplicationForm] 📤 Appel de submitApplication...
[submitApplication] 📤 Début de l'upload de X fichier(s)...
[uploadApplicationFile] Tentative d'upload de photo: ...
[uploadApplicationFile] ✅ Upload réussi pour photo: ...
[submitApplication] ✅ Tous les fichiers ont été uploadés avec succès en Xs
[ApplicationForm] ✅ submitApplication terminé avec succès
```

#### ❌ Logs d'Erreur à Chercher

**Timeout :**
```
[ApplicationForm] ⏱️ TIMEOUT CLIENT DÉCLENCHÉ après 2,5 minutes
[submitApplication] ⏱️ TIMEOUT après Xs
```

**Erreur d'Upload :**
```
[uploadApplicationFile] ❌ Erreur lors de l'upload de ...
[submitApplication] ❌ Erreur lors de l'upload des fichiers
```

**Erreur de Réseau :**
```
Failed to fetch
NetworkError
ERR_INTERNET_DISCONNECTED
```

### 3. Vérifier la Connexion

- **WiFi** : Vérifiez que vous êtes bien connecté
- **Données mobiles** : Vérifiez que vous avez du signal (4G/5G)
- **Test de vitesse** : Faites un test de vitesse internet

### 4. Vérifier la Taille des Fichiers

Les fichiers trop volumineux peuvent causer des timeouts :
- **Photo** : Max 2MB (recommandé < 1MB)
- **Acte de naissance** : Max 5MB (recommandé < 2MB)
- **Certificat médical** : Max 5MB (recommandé < 2MB)
- **Vidéo** : Max 50MB (recommandé < 20MB)

### 5. Vérifier les Logs Vercel

1. Allez sur votre projet Vercel
2. Cliquez sur "Deployments"
3. Cliquez sur le dernier déploiement
4. Cliquez sur "Functions" → `api/application`
5. Vérifiez les logs pour des erreurs

## 🛠️ Solutions selon le Problème

### Problème : Timeout après 2 minutes

**Cause :** Les fichiers prennent trop de temps à uploader

**Solutions :**
1. Réduire la taille des fichiers (notamment la vidéo)
2. Utiliser le WiFi au lieu des données mobiles
3. Se rapprocher du routeur WiFi
4. Réessayer à un moment où la connexion est meilleure

### Problème : Erreur "Failed to fetch"

**Cause :** Problème de connexion réseau

**Solutions :**
1. Vérifier la connexion internet
2. Réessayer après quelques instants
3. Changer de réseau (WiFi ↔ Données mobiles)

### Problème : Erreur d'upload spécifique

**Cause :** Un fichier spécifique ne peut pas être uploadé

**Solutions :**
1. Vérifier que le fichier n'est pas corrompu
2. Réduire la taille du fichier
3. Réessayer avec un autre format (ex: JPEG au lieu de PNG)

### Problème : Le formulaire reste bloqué sans logs

**Cause :** Le JavaScript ne s'exécute pas ou est bloqué

**Solutions :**
1. Vider le cache du navigateur
2. Réessayer en navigation privée
3. Vérifier que JavaScript est activé
4. Essayer avec un autre navigateur

## 📊 Informations à Collecter

Si le problème persiste, collectez ces informations :

1. **Logs de la console** (copier-coller)
2. **Taille des fichiers** uploadés
3. **Type de connexion** (WiFi, 4G, 5G)
4. **Vitesse de connexion** (test de vitesse)
5. **Navigateur et version** (Chrome 120, Safari 17, etc.)
6. **Modèle du téléphone** (iPhone 14, Samsung Galaxy S23, etc.)
7. **Screenshot** de l'écran bloqué

## 🔄 Test de Vérification

Pour vérifier que le problème est résolu :

1. ✅ Le formulaire se soumet en moins de 2 minutes
2. ✅ Un message de succès s'affiche
3. ✅ Le formulaire se réinitialise
4. ✅ Un email de confirmation est reçu (si configuré)

## 📞 Support

Si le problème persiste après avoir essayé toutes les solutions :
1. Collectez les informations ci-dessus
2. Vérifiez les logs Vercel
3. Contactez le support avec toutes les informations collectées

