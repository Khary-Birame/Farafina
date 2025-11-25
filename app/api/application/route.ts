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

    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      program, 
      position, 
      age,
      country,
      applicationId 
    } = body

    // Validation des champs requis
    if (!firstName || !lastName || !email || !phone || !program || !applicationId) {
      return NextResponse.json(
        { error: "Les champs obligatoires sont manquants" },
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

    // Logs détaillés pour le débogage (ne s'affichent que dans les logs serveur)
    console.log("🔍 Vérification des variables d'environnement email:")
    console.log("EMAIL_USER:", emailUser ? "✅ Configuré" : "❌ Manquant")
    console.log("EMAIL_PASS:", emailPass ? "✅ Configuré" : "❌ Manquant")
    console.log("EMAIL_TO:", emailTo ? "✅ Configuré" : "❌ Manquant")

    if (!emailUser || !emailPass || !emailTo) {
      const missingVars = []
      if (!emailUser) missingVars.push("EMAIL_USER")
      if (!emailPass) missingVars.push("EMAIL_PASS")
      if (!emailTo) missingVars.push("EMAIL_TO")
      
      console.error("❌ Variables d'environnement email manquantes:", missingVars.join(", "))
      console.error("💡 Solution: Configurez ces variables dans Vercel → Settings → Environment Variables et redéployez l'application.")
      
      return NextResponse.json(
        { 
          error: "Configuration email manquante",
          details: `Variables manquantes: ${missingVars.join(", ")}. Veuillez configurer ces variables dans Vercel → Settings → Environment Variables et redéployer l'application.`
        },
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

    // Mapper les programmes pour l'affichage
    const programLabels: Record<string, string> = {
      internat: "Internat",
      external: "Externe",
      resident: "Résident",
      girls: "Filles",
      elite: "Élite",
    }

    const programLabel = programLabels[program] || program
    const fullName = `${firstName} ${lastName}`

    // Template HTML de l'email pour l'administration
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle candidature</title>
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
          .cta-button { display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #D4AF37; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; }
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
                    <h1 class="title">Nouvelle Candidature</h1>
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
                      Vous avez reçu une nouvelle candidature depuis le site web.
                    </p>

                    <div style="margin-bottom: 25px;">
                      <p class="section-title">INFORMATIONS DU CANDIDAT</p>
                      <div class="info-row"><span class="info-label">Nom complet:</span> <span class="info-value">${fullName}</span></div>
                      <div class="info-row"><span class="info-label">Email:</span> <span class="info-value"><a href="mailto:${email}">${email}</a></span></div>
                      <div class="info-row"><span class="info-label">Téléphone:</span> <span class="info-value">${phone}</span></div>
                      ${age ? `<div class="info-row"><span class="info-label">Âge:</span> <span class="info-value">${age} ans</span></div>` : ''}
                      ${country ? `<div class="info-row"><span class="info-label">Pays:</span> <span class="info-value">${country}</span></div>` : ''}
                    </div>

                    <div style="margin-bottom: 25px;">
                      <p class="section-title">DÉTAILS DE LA CANDIDATURE</p>
                      <div class="info-row"><span class="info-label">Programme:</span> <span class="info-value">${programLabel}</span></div>
                      ${position ? `<div class="info-row"><span class="info-label">Position:</span> <span class="info-value">${position}</span></div>` : ''}
                      <div class="info-row"><span class="info-label">ID Candidature:</span> <span class="info-value">${applicationId}</span></div>
                    </div>

                    <div style="margin-top: 30px; text-align: center;">
                      <a href="${baseUrl}/admin/candidatures/${applicationId}" class="cta-button">Voir la candidature complète</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <p>&copy; ${new Date().getFullYear()} Farafina Foot Academy. Tous droits réservés.</p>
                    <p style="margin-top: 5px;">Ce message a été envoyé depuis le formulaire de candidature du site web.</p>
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
      Nouvelle candidature – ${fullName}

      INFORMATIONS DU CANDIDAT:
      Nom complet: ${fullName}
      Email: ${email}
      Téléphone: ${phone}
      ${age ? `Âge: ${age} ans` : ''}
      ${country ? `Pays: ${country}` : ''}

      DÉTAILS DE LA CANDIDATURE:
      Programme: ${programLabel}
      ${position ? `Position: ${position}` : ''}
      ID Candidature: ${applicationId}

      Voir la candidature complète: ${baseUrl}/admin/candidatures/${applicationId}

      ---
      © ${new Date().getFullYear()} Farafina Foot Academy. Tous droits réservés.
      Ce message a été envoyé depuis le formulaire de candidature du site web.
    `.trim()

    // Envoi de l'email à l'administration
    const mailOptions: any = {
      from: `"Farafina Foot Academy" <${emailUser}>`,
      to: emailTo,
      replyTo: email,
      subject: `Nouvelle candidature – ${fullName} (${programLabel})`,
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
                    <h1 class="title">Candidature Reçue</h1>
                    <p class="subtitle">Confirmation de réception de votre candidature</p>
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
                      Nous avons bien reçu votre candidature pour le programme <strong>${programLabel}</strong>.
                    </p>

                    <div style="background-color: #fafafa; border-left: 3px solid #D4AF37; padding: 20px; border-radius: 4px; margin-top: 25px; margin-bottom: 25px;">
                      <p style="margin: 0 0 15px 0; color: #333333; font-size: 15px; line-height: 1.8;">
                        Notre équipe d'admissions va examiner votre candidature dans les plus brefs délais, généralement sous 5 à 7 jours ouvrés.
                      </p>
                      <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.8;">
                        Vous recevrez une réponse par email à l'adresse <strong>${email}</strong>. En cas d'urgence, n'hésitez pas à nous contacter directement.
                      </p>
                    </div>

                    <div style="margin-bottom: 25px;">
                      <p class="section-title">RÉCAPITULATIF DE VOTRE CANDIDATURE</p>
                      <div class="info-row"><span class="info-label">Nom:</span> <span class="info-value">${fullName}</span></div>
                      <div class="info-row"><span class="info-label">Programme:</span> <span class="info-value">${programLabel}</span></div>
                      ${position ? `<div class="info-row"><span class="info-label">Position:</span> <span class="info-value">${position}</span></div>` : ''}
                      ${age ? `<div class="info-row"><span class="info-label">Âge:</span> <span class="info-value">${age} ans</span></div>` : ''}
                      <div class="info-row"><span class="info-label">Date de soumission:</span> <span class="info-value">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span></div>
                      <div class="info-row"><span class="info-label">Numéro de candidature:</span> <span class="info-value">${applicationId}</span></div>
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

      Nous avons bien reçu votre candidature pour le programme ${programLabel}.

      Notre équipe d'admissions va examiner votre candidature dans les plus brefs délais, généralement sous 5 à 7 jours ouvrés.

      Récapitulatif:
      Nom: ${fullName}
      Programme: ${programLabel}
      ${position ? `Position: ${position}` : ''}
      ${age ? `Âge: ${age} ans` : ''}
      Date de soumission: ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
      Numéro de candidature: ${applicationId}

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
      subject: `Confirmation de réception – Candidature ${programLabel}`,
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

