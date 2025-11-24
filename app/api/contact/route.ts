import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { readFileSync } from "fs"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    // Parser le body de la requête avec gestion d'erreur
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        { error: "Corps de la requête invalide" },
        { status: 400 }
      )
    }

    const { fullName, email, subject, role, message } = body

    // Validation des champs requis
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      )
    }

    // Récupération des variables d'environnement
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS
    const emailTo = process.env.EMAIL_TO

    if (!emailUser || !emailPass || !emailTo) {
      console.error("Variables d'environnement email manquantes")
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500 }
      )
    }

    // Configuration du transporteur email
    const smtpHost = process.env.EMAIL_HOST || "smtp.gmail.com"
    const smtpPort = parseInt(process.env.EMAIL_PORT || "587")
    const smtpSecure = process.env.EMAIL_SECURE === "true" || smtpPort === 465

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Charger le logo depuis le système de fichiers pour l'intégrer dans l'email
    // En production (Vercel), on utilise une URL absolue car les fichiers ne sont pas accessibles via le système de fichiers
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    "http://localhost:3000")
    
    let logoBuffer: Buffer | null = null
    const logoCid = "ffa-logo"
    
    // Essayer de charger le logo depuis le système de fichiers (fonctionne en local)
    try {
      const logoPath = join(process.cwd(), "public", "ffa.png")
      logoBuffer = readFileSync(logoPath)
      console.log("✅ Logo chargé depuis le système de fichiers")
    } catch (error) {
      console.warn("⚠️ Logo non trouvé localement, utilisation d'une URL externe")
      // En production, on utilisera l'URL absolue
    }
    
    // Utiliser CID pour intégrer le logo dans l'email (si disponible), sinon URL externe
    const logoUrl = logoBuffer ? `cid:${logoCid}` : `${baseUrl}/ffa.png`

    // Template HTML de l'email - Design épuré et moderne
    const emailHTML = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau message de contact</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fafafa;">
          <tr>
            <td style="padding: 60px 20px;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <!-- Logo -->
                <tr>
                  <td style="padding: 40px 40px 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="Farafina Foot Academy" style="max-width: 120px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>
                
                <!-- Titre -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600; line-height: 1.3; letter-spacing: -0.5px;">
                      Nouveau message de contact
                    </h1>
                  </td>
                </tr>
                
                <!-- Ligne de séparation -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <div style="height: 1px; background-color: #e5e5e5;"></div>
                  </td>
                </tr>
                
                <!-- Contenu -->
                <tr>
                  <td style="padding: 0 40px 40px 40px;">
                    <p style="margin: 0 0 30px 0; color: #666666; font-size: 15px; line-height: 1.6;">
                      Vous avez reçu un nouveau message depuis le formulaire de contact du site web.
                    </p>
                    
                    <!-- Informations du contact -->
                    <div style="margin-bottom: 30px;">
                      <div style="margin-bottom: 20px;">
                        <div style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; font-weight: 500;">
                          Nom complet
                        </div>
                        <div style="color: #1a1a1a; font-size: 16px; font-weight: 500;">
                          ${fullName}
                        </div>
                      </div>
                      
                      <div style="margin-bottom: 20px;">
                        <div style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; font-weight: 500;">
                          Email
                        </div>
                        <div style="color: #1a1a1a; font-size: 16px;">
                          <a href="mailto:${email}" style="color: #1a1a1a; text-decoration: none; border-bottom: 1px solid #e5e5e5; transition: border-color 0.2s;">${email}</a>
                        </div>
                      </div>
                      
                      ${role ? `
                      <div style="margin-bottom: 20px;">
                        <div style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; font-weight: 500;">
                          Rôle / Type
                        </div>
                        <div style="color: #1a1a1a; font-size: 16px; font-weight: 500;">
                          ${role}
                        </div>
                      </div>
                      ` : ''}
                      
                      <div style="margin-bottom: 20px;">
                        <div style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; font-weight: 500;">
                          Sujet
                        </div>
                        <div style="color: #1a1a1a; font-size: 16px; font-weight: 500;">
                          ${subject}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Message -->
                    <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #f0f0f0;">
                      <div style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; font-weight: 500;">
                        Message
                      </div>
                      <div style="color: #333333; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
                        ${message.replace(/\n/g, '<br>')}
                      </div>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
                    <p style="margin: 0; color: #999999; font-size: 12px; text-align: center; line-height: 1.5;">
                      Ce message a été envoyé depuis le formulaire de contact du site web<br>
                      <span style="color: #cccccc;">© ${new Date().getFullYear()} Farafina Foot Academy. Tous droits réservés.</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    // Texte brut pour les clients email qui ne supportent pas HTML
    const emailText = `
Nouveau Message de Contact - Farafina Foot Academy

Nom complet: ${fullName}
Email: ${email}
${role ? `Rôle/Type: ${role}` : ''}
Sujet: ${subject}

Message:
${message}

---
Ce message a été envoyé depuis le formulaire de contact du site web.
    `.trim()

    // Envoi de l'email à l'administration
    const mailOptions: any = {
      from: `"Farafina Foot Academy" <${emailUser}>`,
      to: emailTo,
      replyTo: email,
      subject: `Nouveau message de contact – ${subject}`,
      text: emailText,
      html: emailHTML,
    }

    // Ajouter le logo comme pièce jointe si disponible
    if (logoBuffer) {
      mailOptions.attachments = [
        {
          filename: "ffa-logo.png",
          content: logoBuffer,
          cid: logoCid,
        },
      ]
    }

    await transporter.sendMail(mailOptions)

    // Template HTML de l'accusé de réception - Design épuré et moderne
    const acknowledgmentHTML = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de réception</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fafafa;">
          <tr>
            <td style="padding: 60px 20px;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <!-- Logo -->
                <tr>
                  <td style="padding: 40px 40px 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="Farafina Foot Academy" style="max-width: 120px; height: auto; display: block; margin: 0 auto;" />
                  </td>
                </tr>
                
                <!-- Titre -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: 600; line-height: 1.3; letter-spacing: -0.5px;">
                      Message reçu
                    </h1>
                  </td>
                </tr>
                
                <!-- Ligne de séparation -->
                <tr>
                  <td style="padding: 0 40px 30px 40px;">
                    <div style="height: 1px; background-color: #e5e5e5;"></div>
                  </td>
                </tr>
                
                <!-- Contenu -->
                <tr>
                  <td style="padding: 0 40px 40px 40px;">
                    <p style="margin: 0 0 25px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                      Bonjour <strong>${fullName}</strong>,
                    </p>
                    
                    <p style="margin: 0 0 30px 0; color: #666666; font-size: 15px; line-height: 1.7;">
                      Nous avons bien reçu votre message concernant <strong>"${subject}"</strong>. Notre équipe va examiner votre demande et vous répondra dans les plus brefs délais, généralement sous 24 à 48 heures.
                    </p>
                    
                    <!-- Récapitulatif -->
                    <div style="margin: 40px 0; padding: 25px; background-color: #fafafa; border-left: 3px solid #1a1a1a;">
                      <div style="color: #999999; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 15px; font-weight: 600;">
                        Récapitulatif
                      </div>
                      <div style="margin-bottom: 12px;">
                        <span style="color: #999999; font-size: 14px;">Sujet:</span>
                        <span style="color: #1a1a1a; font-size: 14px; font-weight: 500; margin-left: 8px;">${subject}</span>
                      </div>
                      ${role ? `
                      <div style="margin-bottom: 12px;">
                        <span style="color: #999999; font-size: 14px;">Rôle/Type:</span>
                        <span style="color: #1a1a1a; font-size: 14px; font-weight: 500; margin-left: 8px;">${role}</span>
                      </div>
                      ` : ''}
                      <div>
                        <span style="color: #999999; font-size: 14px;">Date d'envoi:</span>
                        <span style="color: #1a1a1a; font-size: 14px; font-weight: 500; margin-left: 8px;">${new Date().toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                    </div>
                    
                    <!-- Contact -->
                    <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #f0f0f0;">
                      <div style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; font-weight: 500;">
                        Besoin d'aide supplémentaire ?
                      </div>
                      <div style="color: #666666; font-size: 14px; line-height: 1.8;">
                        <a href="mailto:${emailTo}" style="color: #1a1a1a; text-decoration: none; border-bottom: 1px solid #e5e5e5;">${emailTo}</a><br>
                        <span style="color: #999999;">+221 763171202</span>
                      </div>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
                    <p style="margin: 0; color: #999999; font-size: 12px; text-align: center; line-height: 1.5;">
                      Ceci est un email automatique, merci de ne pas y répondre directement.<br>
                      <span style="color: #cccccc;">© ${new Date().getFullYear()} Farafina Foot Academy. Tous droits réservés.</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    const acknowledgmentText = `
Confirmation de Réception - Farafina Foot Academy

Bonjour ${fullName},

Nous avons bien reçu votre message concernant "${subject}".

Notre équipe va examiner votre demande et vous répondra dans les plus brefs délais, généralement sous 24 à 48 heures.

Récapitulatif:
- Sujet: ${subject}
${role ? `- Rôle/Type: ${role}` : ''}
- Date d'envoi: ${new Date().toLocaleDateString('fr-FR', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

Besoin d'aide supplémentaire ?
Email: ${emailTo}
Téléphone: +221 763171202

---
Ceci est un email automatique, merci de ne pas y répondre directement.
© ${new Date().getFullYear()} Farafina Foot Academy. Tous droits réservés.
    `.trim()

    // Envoi de l'accusé de réception
    const acknowledgmentOptions: any = {
      from: `"Farafina Foot Academy" <${emailUser}>`,
      to: email,
      subject: `Confirmation de réception – ${subject}`,
      text: acknowledgmentText,
      html: acknowledgmentHTML,
    }

    // Ajouter le logo comme pièce jointe si disponible
    if (logoBuffer) {
      acknowledgmentOptions.attachments = [
        {
          filename: "ffa-logo.png",
          content: logoBuffer,
          cid: logoCid,
        },
      ]
    }

    await transporter.sendMail(acknowledgmentOptions)

    return NextResponse.json(
      { 
        success: true,
        message: "Email et accusé de réception envoyés avec succès" 
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    
    // Gestion des erreurs spécifiques
    if (error.code === "EAUTH") {
      return NextResponse.json(
        { error: "Erreur d'authentification email. Vérifiez vos identifiants." },
        { status: 401 }
      )
    }
    
    if (error.code === "ECONNECTION") {
      return NextResponse.json(
        { error: "Erreur de connexion au serveur email." },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email", details: error.message },
      { status: 500 }
    )
  }
}

