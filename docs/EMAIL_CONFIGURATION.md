# Configuration Email - Formulaire de Contact

Ce document explique comment configurer l'envoi d'emails pour le formulaire de contact.

## ⚠️ IMPORTANT : Configuration sur Vercel

Si vous déployez sur Vercel, vous **DEVEZ** configurer les variables d'environnement dans les paramètres Vercel :

1. Allez sur votre projet Vercel
2. **Settings** → **Environment Variables**
3. Ajoutez les 3 variables obligatoires :
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `EMAIL_TO`
4. **IMPORTANT** : Après avoir ajouté les variables, **redéployez** l'application !

📖 **Guide complet** : Voir [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) pour les instructions détaillées.

## Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env.local` (développement) ou dans les paramètres de votre plateforme de déploiement (Vercel, etc.) :

### Variables obligatoires

```env
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application
EMAIL_TO=destinataire@example.com
```

### Variables optionnelles (SMTP)

Par défaut, la configuration utilise Gmail. Pour utiliser un autre fournisseur, ajoutez :

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

## Configuration par fournisseur

### Gmail

1. Activez la validation en 2 étapes sur votre compte Google
2. Générez un "Mot de passe d'application" :
   - Allez sur https://myaccount.google.com/apppasswords
   - Sélectionnez "Autre (nom personnalisé)" et entrez "Farafina Contact"
   - Copiez le mot de passe généré (16 caractères)
3. Configurez les variables :

```env
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # Le mot de passe d'application généré
EMAIL_TO=destinataire@example.com
```

### Outlook / Office 365

```env
EMAIL_USER=votre_email@outlook.com
EMAIL_PASS=votre_mot_de_passe
EMAIL_TO=destinataire@example.com
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

### Autres fournisseurs

Consultez la documentation SMTP de votre fournisseur pour les paramètres `HOST`, `PORT` et `SECURE`.

## Test de la configuration

Pour tester l'envoi d'emails :

1. Remplissez le formulaire de contact sur le site
2. Vérifiez que l'email arrive dans la boîte `EMAIL_TO`
3. Vérifiez les logs du serveur pour d'éventuelles erreurs

## Dépannage

### Erreur "EAUTH" (Authentification)

- Vérifiez que `EMAIL_USER` et `EMAIL_PASS` sont corrects
- Pour Gmail, utilisez un "Mot de passe d'application", pas votre mot de passe principal
- Assurez-vous que la validation en 2 étapes est activée (Gmail)

### Erreur "ECONNECTION" (Connexion)

- Vérifiez que `EMAIL_HOST` et `EMAIL_PORT` sont corrects
- Vérifiez votre connexion internet
- Vérifiez que le pare-feu n'bloque pas les connexions SMTP

### Email non reçu

- Vérifiez le dossier spam
- Vérifiez que `EMAIL_TO` est correct
- Vérifiez les logs du serveur pour des erreurs

## Structure des emails

### Email à l'administration

L'email envoyé à l'administration (`EMAIL_TO`) contient :
- **Header** : Logo FFA avec titre "Nouveau Message de Contact"
- **Informations du contact** : Nom, email, rôle, sujet
- **Message** : Le contenu du message du formulaire
- **Footer** : Copyright et informations

### Accusé de réception (automatique)

Un email de confirmation est automatiquement envoyé au contact qui a rempli le formulaire. Il contient :
- **Header** : Logo FFA avec titre "Message Reçu"
- **Message de confirmation** : Confirmation de réception du message
- **Récapitulatif** : Sujet, rôle (si applicable), date d'envoi
- **Informations de contact** : Email et téléphone pour assistance
- **Footer** : Copyright et informations

Les deux emails sont envoyés en format HTML avec une version texte en fallback.

## Configuration du logo

Le logo `ffa.png` est automatiquement inclus dans les emails. Pour que le logo s'affiche correctement :

1. Assurez-vous que le fichier `public/ffa.png` existe
2. Configurez `NEXT_PUBLIC_SITE_URL` avec l'URL complète de votre site :
   - En développement : `http://localhost:3000`
   - En production : `https://votre-domaine.com`

Le logo sera chargé depuis cette URL dans les emails.







