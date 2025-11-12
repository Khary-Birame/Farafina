# Guide : Personnaliser les Emails Supabase

Ce guide vous explique comment personnaliser les emails de confirmation et autres emails automatiques dans Supabase.

---

## 📧 Options Disponibles

Supabase offre plusieurs options pour personnaliser les emails :

1. **Templates d'email personnalisés** (dans le Dashboard)
2. **SMTP personnalisé** (utiliser votre propre serveur email)
3. **URLs de redirection personnalisées**

---

## 🎨 Option 1 : Personnaliser les Templates dans Supabase Dashboard

### Étape 1 : Accéder aux Paramètres d'Email

1. **Ouvrez Supabase Dashboard**
2. **Allez dans** : **Authentication** → **Email Templates** (ou **Settings** → **Auth** → **Email Templates**)

### Étape 2 : Personnaliser le Template de Confirmation

1. **Sélectionnez** "Confirm signup" (Confirmation d'inscription)

2. **Vous verrez** :
   - **Subject** (Sujet) : Le sujet de l'email
   - **Body** (Corps) : Le contenu de l'email (HTML)

3. **Variables disponibles** :
   - `{{ .ConfirmationURL }}` - Lien de confirmation
   - `{{ .Email }}` - Email de l'utilisateur
   - `{{ .Token }}` - Token de confirmation (si nécessaire)
   - `{{ .TokenHash }}` - Hash du token

### Étape 3 : Exemple de Template Personnalisé

**Sujet** :
```
Bienvenue à Farafina Foot Academy - Confirmez votre compte
```

**Corps (HTML)** :
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #008037 0%, #D4AF37 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .button {
      display: inline-block;
      background-color: #D4AF37;
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏆 Farafina Foot Academy</h1>
      <p>L'Excellence du Football Africain</p>
    </div>
    <div class="content">
      <h2>Bienvenue {{ .Email }} !</h2>
      <p>Merci de vous être inscrit à Farafina Foot Academy.</p>
      <p>Pour activer votre compte et commencer votre parcours, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>
      <div style="text-align: center;">
        <a href="{{ .ConfirmationURL }}" class="button">Confirmer mon Email</a>
      </div>
      <p>Ou copiez-collez ce lien dans votre navigateur :</p>
      <p style="word-break: break-all; color: #666;">{{ .ConfirmationURL }}</p>
      <p><strong>Ce lien expirera dans 24 heures.</strong></p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p>Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.</p>
    </div>
    <div class="footer">
      <p>© 2024 Farafina Foot Academy - Cayar, Sénégal</p>
      <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
    </div>
  </div>
</body>
</html>
```

---

## 📮 Option 2 : Configurer un SMTP Personnalisé

Si vous voulez utiliser votre propre serveur email (Gmail, SendGrid, Mailgun, etc.) :

### Étape 1 : Accéder aux Paramètres SMTP

1. **Supabase Dashboard** → **Settings** → **Auth**
2. **Scroll jusqu'à** "SMTP Settings"
3. **Activez** "Enable Custom SMTP"

### Étape 2 : Configurer les Paramètres SMTP

**Exemple avec Gmail** :
- **Host** : `smtp.gmail.com`
- **Port** : `587` (ou `465` pour SSL)
- **Username** : Votre email Gmail
- **Password** : Mot de passe d'application Gmail (pas votre mot de passe normal)
- **Sender email** : `noreply@farafina-foot-academy.com` (ou votre domaine)
- **Sender name** : `Farafina Foot Academy`

**Exemple avec SendGrid** :
- **Host** : `smtp.sendgrid.net`
- **Port** : `587`
- **Username** : `apikey`
- **Password** : Votre clé API SendGrid
- **Sender email** : Votre email vérifié dans SendGrid
- **Sender name** : `Farafina Foot Academy`

### Étape 3 : Créer un Mot de Passe d'Application (Gmail)

Si vous utilisez Gmail :

1. **Allez sur** : [Google Account Security](https://myaccount.google.com/security)
2. **Activez** "2-Step Verification" si ce n'est pas déjà fait
3. **Allez dans** "App passwords"
4. **Créez un nouveau mot de passe** pour "Mail"
5. **Utilisez ce mot de passe** dans Supabase (pas votre mot de passe Gmail normal)

---

## 🔗 Option 3 : Personnaliser les URLs de Redirection

### Dans le Code (Recommandé)

Vous pouvez spécifier les URLs de redirection lors de l'inscription :

```typescript
// Dans lib/auth/auth-helpers.ts
const { data: authData, error: authError } = await supabase.auth.signUp({
  email: signUpData.email,
  password: signUpData.password,
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
    data: {
      fullName: signUpData.fullName,
      role: signUpData.role,
    }
  }
})
```

### Dans Supabase Dashboard

1. **Settings** → **Auth** → **URL Configuration**
2. **Site URL** : `http://localhost:3000` (développement) ou votre domaine (production)
3. **Redirect URLs** : Ajoutez les URLs autorisées :
   - `http://localhost:3000/auth/callback`
   - `https://votre-domaine.com/auth/callback`

---

## 🎯 Option 4 : Désactiver la Vérification Email (Développement)

Pour le développement, vous pouvez désactiver la vérification email :

1. **Supabase Dashboard** → **Authentication** → **Settings**
2. **Désactivez** "Enable email confirmations"
3. ⚠️ **Important** : Réactivez-le en production !

---

## 📝 Exemple Complet : Template Email Personnalisé

Voici un template complet et professionnel :

**Sujet** :
```
🎯 Confirmez votre compte Farafina Foot Academy
```

**Corps** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation d'inscription</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header avec gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #008037 0%, #00a045 50%, #D4AF37 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                🏆 Farafina Foot Academy
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                L'Excellence du Football Africain
              </p>
            </td>
          </tr>
          
          <!-- Contenu principal -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1A1A1A; font-size: 24px;">
                Bienvenue {{ .Email }} ! 👋
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
                Merci de vous être inscrit à <strong>Farafina Foot Academy</strong>. Nous sommes ravis de vous accueillir dans notre communauté de talents du football africain.
              </p>
              
              <p style="margin: 0 0 30px 0; color: #333; font-size: 16px; line-height: 1.6;">
                Pour activer votre compte et accéder à toutes les fonctionnalités, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :
              </p>
              
              <!-- Bouton CTA -->
              <table role="presentation" style="width: 100%; margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="{{ .ConfirmationURL }}" style="display: inline-block; background-color: #D4AF37; color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 5px; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(212, 175, 55, 0.3);">
                      ✅ Confirmer mon Email
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Lien alternatif -->
              <p style="margin: 30px 0 0 0; color: #666; font-size: 14px; line-height: 1.6;">
                Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :
              </p>
              <p style="margin: 10px 0; word-break: break-all; color: #008037; font-size: 12px; font-family: monospace; background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
                {{ .ConfirmationURL }}
              </p>
              
              <!-- Avertissement expiration -->
              <div style="margin: 30px 0; padding: 15px; background-color: #fff3cd; border-left: 4px solid #D4AF37; border-radius: 5px;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  ⏰ <strong>Important :</strong> Ce lien expirera dans <strong>24 heures</strong> pour des raisons de sécurité.
                </p>
              </div>
              
              <!-- Séparateur -->
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <!-- Message de sécurité -->
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px; line-height: 1.6;">
                <strong>Vous n'avez pas créé de compte ?</strong>
              </p>
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
                Si vous n'avez pas demandé la création de ce compte, vous pouvez ignorer cet email en toute sécurité. Aucune action n'est requise de votre part.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                <strong>Farafina Foot Academy</strong>
              </p>
              <p style="margin: 0 0 10px 0; color: #666; font-size: 12px;">
                Cayar, Sénégal | <a href="https://farafina-foot-academy.com" style="color: #008037; text-decoration: none;">farafina-foot-academy.com</a>
              </p>
              <p style="margin: 20px 0 0 0; color: #999; font-size: 11px; line-height: 1.6;">
                Cet email a été envoyé automatiquement. Merci de ne pas y répondre.<br>
                Pour toute question, contactez-nous via notre site web.
              </p>
              <p style="margin: 15px 0 0 0; color: #999; font-size: 11px;">
                © 2024 Farafina Foot Academy. Tous droits réservés.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 🔧 Configuration dans Supabase Dashboard

### Étapes Détaillées :

1. **Connectez-vous** à Supabase Dashboard
2. **Sélectionnez votre projet**
3. **Allez dans** : **Authentication** → **Email Templates**
4. **Cliquez sur** "Confirm signup"
5. **Modifiez** :
   - Le **Subject** (sujet)
   - Le **Body** (corps HTML)
6. **Cliquez sur** "Save" (Enregistrer)

### Autres Templates Disponibles :

- **Confirm signup** - Confirmation d'inscription
- **Magic Link** - Lien magique de connexion
- **Change Email Address** - Changement d'email
- **Reset Password** - Réinitialisation de mot de passe
- **Invite user** - Invitation d'utilisateur

---

## 📧 Personnaliser l'Email d'Expéditeur

### Dans Supabase Dashboard :

1. **Settings** → **Auth** → **SMTP Settings**
2. **Sender email** : `noreply@farafina-foot-academy.com`
3. **Sender name** : `Farafina Foot Academy`

**Note** : Pour utiliser votre propre domaine (ex: `@farafina-foot-academy.com`), vous devez :
1. Configurer un SMTP personnalisé
2. Vérifier votre domaine dans votre service email

---

## 🎨 Variables Disponibles dans les Templates

- `{{ .ConfirmationURL }}` - URL de confirmation complète
- `{{ .Email }}` - Email de l'utilisateur
- `{{ .Token }}` - Token de confirmation
- `{{ .TokenHash }}` - Hash du token
- `{{ .SiteURL }}` - URL de votre site (configurée dans Settings)

---

## ✅ Checklist de Configuration

- [ ] Template de confirmation personnalisé créé
- [ ] Sujet de l'email personnalisé
- [ ] Design HTML/CSS ajouté
- [ ] Variables correctement utilisées
- [ ] SMTP personnalisé configuré (optionnel)
- [ ] Email d'expéditeur personnalisé
- [ ] URLs de redirection configurées
- [ ] Test d'envoi effectué

---

## 🧪 Tester l'Email

1. **Créez un compte de test** sur `/signup`
2. **Vérifiez votre boîte email** (y compris les spams)
3. **Vérifiez** :
   - Le design s'affiche correctement
   - Le lien de confirmation fonctionne
   - Les variables sont remplacées correctement

---

## 💡 Astuces

### Astuce 1 : Prévisualiser l'Email

Dans Supabase Dashboard, vous pouvez prévisualiser l'email avant de l'envoyer.

### Astuce 2 : Utiliser des Images

Vous pouvez inclure des images dans vos emails :
- Utilisez des URLs absolutes (ex: `https://votre-site.com/logo.png`)
- Ou hébergez-les sur Supabase Storage

### Astuce 3 : Responsive Design

Assurez-vous que votre template HTML est responsive (s'adapte aux mobiles) en utilisant des tables et des media queries.

---

## 🚀 Prochaines Étapes

Une fois les emails personnalisés :

1. ✅ Tester l'envoi d'emails
2. ✅ Vérifier le design sur différents clients email
3. ✅ Configurer les autres templates (reset password, etc.)
4. ✅ Configurer un SMTP personnalisé pour la production

---

**Besoin d'aide ?** N'hésitez pas à demander ! 😊

