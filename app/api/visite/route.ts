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

    const { visitorType, fullName, organization, email, phone, playerName, playerAge, program, visitDate, visitTime, message } = body

    // Validation des champs requis de base
    if (!visitorType || !fullName || !email || !phone || !visitDate || !visitTime) {
      return NextResponse.json(
        { error: "Les champs obligatoires sont manquants" },
        { status: 400 }
      )
    }

    // Validation conditionnelle selon le type de visiteur
    if (visitorType === "parent") {
      if (!playerName || !playerAge || !program) {
        return NextResponse.json(
          { error: "Pour les parents, les informations du joueur sont requises" },
          { status: 400 }
        )
      }
    }
    
    if (visitorType === "collaborateur" && !organization) {
      return NextResponse.json(
        { error: "Pour les collaborateurs, l'organisation est requise" },
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
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    "http://localhost:3000")
    
    let logoBuffer: Buffer | null = null
    const logoCid = "ffa-logo"
    
    try {
      const logoPath = join(process.cwd(), "public", "ffa.png")
      logoBuffer = readFileSync(logoPath)
      console.log("✅ Logo chargé depuis le système de fichiers")
    } catch (error) {
      console.warn("⚠️ Logo non trouvé localement, utilisation d'une URL externe")
    }
    
    const logoUrl = logoBuffer ? `cid:${logoCid}` : `${baseUrl}/ffa.png`

    // Mapper les types de visiteurs pour l'affichage
    const visitorTypeLabels: Record<string, string> = {
      parent: "Parent",
      collaborateur: "Collaborateur/Partenaire",
      joueur: "Joueur (adulte)",
      media: "Média/Journaliste",
      investisseur: "Investisseur",
      autre: "Autre",
    }

    const visitorTypeLabel = visitorTypeLabels[visitorType] || visitorType

    // Mapper les programmes pour l'affichage
    const programLabels: Record<string, string> = {
      internat: "Internat",
      external: "Externe",
      resident: "Résident",
      all: "Tous les programmes",
    }

    const programLabel = program ? (programLabels[program] || program) : "N/A"

    // Template HTML de l'email pour l'administration
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle demande de visite</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; margin: 0; padding: 0; background-color: #fafafa; color: #1a1a1a; }
          table { border-collapse: collapse; width: 100%; }
          td { padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden; }
          .header { padding: 40px 20px 20px; text-align: center; }
          .logo { max-width: 120px; height: auto; margin-bottom: 20px; }
          .title { font-size: 28px; font-weight: 600; color: #1a1a1a; margin: 0 0 10px 0; letter-spacing: -0.5px; }
          .subtitle { font-size: 15px; color: #666666; margin: 0; }
          .divider { border-bottom: 1px solid #e5e5e5; margin: 20px 0; }
          .content { padding: 20px 40px 40px; }
          .section-title { font-size: 12px; font-weight: 700; color: #999999; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.5px; }
          .info-row { display: flex; margin-bottom: 8px; }
          .info-label { font-weight: 600; width: 150px; flex-shrink: 0; color: #333333; font-size: 15px; }
          .info-value { color: #666666; font-size: 15px; }
          .message-block { background-color: #fafafa; border-left: 3px solid #e5e5e5; padding: 20px; border-radius: 4px; margin-top: 25px; }
          .message-text { font-size: 15px; line-height: 1.6; color: #333333; white-space: pre-wrap; }
          .footer { padding: 20px 40px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #e5e5e5; margin-top: 40px; }
          a { color: #D4AF37; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <table role="presentation" style="width: 100%; background-color: #fafafa;">
          <tr>
            <td align="center" style="padding: 60px 20px;">
              <table role="presentation" class="container">
                <tr>
                  <td class="header">
                    <img src="${logoUrl}" alt="Farafina Foot Academy" class="logo" />
                    <h1 class="title">Nouvelle demande de visite</h1>
                    <p class="subtitle">Reçue depuis le site web</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 40px;">
                    <div class="divider"></div>
                  </td>
                </tr>
                <tr>
                  <td class="content">
                    <p style="font-size: 16px; line-height: 1.6; color: #1a1a1a; margin-bottom: 25px;">
                      Vous avez reçu une nouvelle demande de visite depuis le site web.
                    </p>

                    <div style="margin-bottom: 25px;">
                      <p class="section-title">TYPE DE VISITEUR</p>
                      <div class="info-row"><span class="info-label">Type:</span> <span class="info-value">${visitorTypeLabel}</span></div>
                    </div>

                    <div style="margin-bottom: 25px;">
                      <p class="section-title">INFORMATIONS PERSONNELLES</p>
                      <div class="info-row"><span class="info-label">Nom complet:</span> <span class="info-value">${fullName}</span></div>
                      <div class="info-row"><span class="info-label">Email:</span> <span class="info-value"><a href="mailto:${email}">${email}</a></span></div>
                      <div class="info-row"><span class="info-label">Téléphone:</span> <span class="info-value">${phone}</span></div>
                      ${organization ? `<div class="info-row"><span class="info-label">Organisation:</span> <span class="info-value">${organization}</span></div>` : ''}
                    </div>

                    ${visitorType === "parent" && playerName ? `
                    <div style="margin-bottom: 25px;">
                      <p class="section-title">INFORMATIONS DU JOUEUR</p>
                      <div class="info-row"><span class="info-label">Nom du joueur:</span> <span class="info-value">${playerName}</span></div>
                      <div class="info-row"><span class="info-label">Âge:</span> <span class="info-value">${playerAge} ans</span></div>
                      <div class="info-row"><span class="info-label">Programme:</span> <span class="info-value">${programLabel}</span></div>
                    </div>
                    ` : ''}

                    <div style="margin-bottom: 25px;">
                      <p class="section-title">DÉTAILS DE LA VISITE</p>
                      <div class="info-row"><span class="info-label">Date souhaitée:</span> <span class="info-value">${visitDate}</span></div>
                      <div class="info-row"><span class="info-label">Créneau horaire:</span> <span class="info-value">${visitTime}</span></div>
                    </div>

                    ${message ? `
                    <div class="message-block">
                      <p class="section-title" style="margin-bottom: 15px;">MESSAGE / PRÉCISIONS</p>
                      <p class="message-text">${message.replace(/\n/g, '<br>')}</p>
                    </div>
                    ` : ''}
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <p>&copy; ${new Date().getFullYear()} Farafina Foot Academy. Tous droits réservés.</p>
                    <p style="margin-top: 5px;">Ce message a été envoyé depuis le formulaire de demande de visite du site web.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    const adminEmailText = `
      Nouvelle demande de visite – ${fullName}

      TYPE DE VISITEUR:
      Type: ${visitorTypeLabel}

      INFORMATIONS PERSONNELLES:
      Nom complet: ${fullName}
      Email: ${email}
      Téléphone: ${phone}
      ${organization ? `Organisation: ${organization}` : ''}

      ${visitorType === "parent" && playerName ? `
      INFORMATIONS DU JOUEUR:
      Nom du joueur: ${playerName}
      Âge: ${playerAge} ans
      Programme: ${programLabel}
      ` : ''}

      DÉTAILS DE LA VISITE:
      Date souhaitée: ${visitDate}
      Créneau horaire: ${visitTime}

      ${message ? `MESSAGE / PRÉCISIONS:\n${message}` : ''}

      ---
      © ${new Date().getFullYear()} Farafina Foot Academy. Tous droits réservés.
      Ce message a été envoyé depuis le formulaire de demande de visite du site web.
    `.trim()

    // Envoi de l'email à l'administration
    const mailOptions: any = {
      from: `"Farafina Foot Academy" <${emailUser}>`,
      to: emailTo,
      replyTo: email,
      subject: `Nouvelle demande de visite – ${fullName} (${visitorTypeLabel})`,
      text: adminEmailText,
      html: adminEmailHTML,
    }

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

    // Template HTML de l'accusé de réception
    const acknowledgmentHTML = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de réception</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; margin: 0; padding: 0; background-color: #fafafa; color: #1a1a1a; }
          table { border-collapse: collapse; width: 100%; }
          td { padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden; }
          .header { padding: 40px 20px 20px; text-align: center; }
          .logo { max-width: 120px; height: auto; margin-bottom: 20px; }
          .title { font-size: 28px; font-weight: 600; color: #1a1a1a; margin: 0 0 10px 0; letter-spacing: -0.5px; }
          .subtitle { font-size: 15px; color: #666666; margin: 0; }
          .divider { border-bottom: 1px solid #e5e5e5; margin: 20px 0; }
          .content { padding: 20px 40px 40px; }
          .section-title { font-size: 12px; font-weight: 700; color: #999999; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.5px; }
          .info-row { display: flex; margin-bottom: 8px; }
          .info-label { font-weight: 600; width: 150px; flex-shrink: 0; color: #333333; font-size: 15px; }
          .info-value { color: #666666; font-size: 15px; }
          .footer { padding: 20px 40px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #e5e5e5; margin-top: 40px; }
          a { color: #D4AF37; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <table role="presentation" style="width: 100%; background-color: #fafafa;">
          <tr>
            <td align="center" style="padding: 60px 20px;">
              <table role="presentation" class="container">
                <tr>
                  <td class="header">
                    <img src="${logoUrl}" alt="Farafina Foot Academy" class="logo" />
                    <h1 class="title">Demande Reçue</h1>
                    <p class="subtitle">Confirmation de réception de votre demande de visite</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 40px;">
                    <div class="divider"></div>
                  </td>
                </tr>
                <tr>
                  <td class="content">
                    <p style="font-size: 16px; line-height: 1.6; color: #1a1a1a; margin-bottom: 25px;">
                      Bonjour <strong>${fullName}</strong>,
                    </p>
                    <p style="font-size: 16px; line-height: 1.6; color: #1a1a1a; margin-bottom: 25px;">
                      Nous avons bien reçu votre demande de visite${visitorType === "parent" && playerName ? ` pour <strong>${playerName}</strong>` : ''}.
                    </p>

                    <div style="background-color: #fafafa; border-left: 3px solid #D4AF37; padding: 20px; border-radius: 4px; margin-top: 25px; margin-bottom: 25px;">
                      <p style="margin: 0 0 15px 0; color: #333333; font-size: 15px; line-height: 1.8;">
                        Notre équipe va examiner votre demande et vous contactera dans les plus brefs délais, généralement sous 24 à 48 heures, pour confirmer votre visite.
                      </p>
                      <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.8;">
                        En cas d'urgence, n'hésitez pas à nous contacter directement par téléphone.
                      </p>
                    </div>

                    <div style="margin-bottom: 25px;">
                      <p class="section-title">RÉCAPITULATIF DE VOTRE DEMANDE</p>
                      <div class="info-row"><span class="info-label">Type de visiteur:</span> <span class="info-value">${visitorTypeLabel}</span></div>
                      ${visitorType === "parent" && playerName ? `
                      <div class="info-row"><span class="info-label">Joueur:</span> <span class="info-value">${playerName} (${playerAge} ans)</span></div>
                      <div class="info-row"><span class="info-label">Programme:</span> <span class="info-value">${programLabel}</span></div>
                      ` : ''}
                      ${organization ? `<div class="info-row"><span class="info-label">Organisation:</span> <span class="info-value">${organization}</span></div>` : ''}
                      <div class="info-row"><span class="info-label">Date souhaitée:</span> <span class="info-value">${visitDate}</span></div>
                      <div class="info-row"><span class="info-label">Créneau horaire:</span> <span class="info-value">${visitTime}</span></div>
                      <div class="info-row"><span class="info-label">Date d'envoi:</span> <span class="info-value">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span></div>
                    </div>

                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
                      <p style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                        Besoin d'aide supplémentaire ?
                      </p>
                      <p style="margin: 0 0 5px 0; color: #666666; font-size: 14px;">
                        📧 Email: <a href="mailto:${emailTo}">${emailTo}</a>
                      </p>
                      <p style="margin: 0; color: #666666; font-size: 14px;">
                        📞 Téléphone: +221 763171202
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <p style="margin-bottom: 10px;">Ceci est un email automatique, merci de ne pas y répondre directement.</p>
                    <p>&copy; ${new Date().getFullYear()} Farafina Foot Academy. Tous droits réservés.</p>
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

      Nous avons bien reçu votre demande de visite${visitorType === "parent" && playerName ? ` pour ${playerName}` : ''}.

      Notre équipe va examiner votre demande et vous contactera dans les plus brefs délais pour confirmer votre visite.

      Récapitulatif:
      Type de visiteur: ${visitorTypeLabel}
      ${visitorType === "parent" && playerName ? `
      Joueur: ${playerName} (${playerAge} ans)
      Programme: ${programLabel}
      ` : ''}
      ${organization ? `Organisation: ${organization}` : ''}
      Date souhaitée: ${visitDate}
      Créneau horaire: ${visitTime}
      Date d'envoi: ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}

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
      subject: `Confirmation de réception – Demande de visite${visitorType === "parent" && playerName ? ` pour ${playerName}` : ''}`,
      text: acknowledgmentText,
      html: acknowledgmentHTML,
    }

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
    
    if (error.code === "EAUTH") {
      return NextResponse.json(
        { error: "Erreur d'authentification email. Vérifiez vos identifiants." },
        { status: 401 }
      )
    }
    
    if (error.code === "ECONNECTION") {
      return NextResponse.json(
        { error: "Erreur de connexion au serveur email. Vérifiez votre connexion internet." },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: error.message || "Une erreur est survenue lors de l'envoi de l'email" },
      { status: 500 }
    )
  }
}

