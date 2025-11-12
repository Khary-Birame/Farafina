# 📝 Contenu à copier dans .env.local

Copiez exactement ce contenu dans votre fichier `.env.local` à la racine du projet :

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================

# URL de votre projet Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ngckzqmrytzxxauvkwid.supabase.co

# Clé anonyme (publique mais sécurisée via RLS)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nY2t6cW1yeXR6eHhhdXZrd2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MjQ2OTMsImV4cCI6MjA3ODUwMDY5M30.9WNMPC_EfwfdjKwXNDJNOw-PZtF4urxIxfJe7J1tovA

# Clé service (PRIVÉE - uniquement côté serveur)
# ⚠️ NE JAMAIS partager cette clé publiquement !
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nY2t6cW1yeXR6eHhhdXZrd2lkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjkyNDY5MywiZXhwIjoyMDc4NTAwNjkzfQ.NgfPmi_i_Pi0Gs10lH-oiwzZmusQmISWkY17robCbsw

# ============================================
# SITE CONFIGURATION
# ============================================

# URL de votre site (pour les redirections auth)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## ✅ Vérifications

1. ✅ Le fichier `.env.local` est à la racine du projet
2. ✅ Il contient toutes les variables ci-dessus
3. ✅ Aucun espace avant/après les `=` 
4. ✅ Pas de guillemets autour des valeurs

---

## 🔒 Sécurité

⚠️ **RAPPEL IMPORTANT** :
- Ce fichier est dans `.gitignore` (ne sera pas commité)
- Ne partagez JAMAIS la `SUPABASE_SERVICE_ROLE_KEY` publiquement
- Si vous avez partagé cette clé, régénérez-la dans Supabase

---

## 🚀 Prochaine Étape

Une fois le fichier créé :
1. Redémarrer le serveur : `npm run dev`
2. Tester : `http://localhost:3000/test-supabase`
3. Si ça fonctionne → On passe à l'Étape 2 ! 🎉

