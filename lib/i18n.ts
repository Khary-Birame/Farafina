// Configuration i18n pour l'internationalisation

export const languages = {
  fr: {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
    locale: "fr-FR",
  },
  en: {
    code: "en",
    name: "English",
    flag: "🇬🇧",
    locale: "en-US",
  },
  ar: {
    code: "ar",
    name: "العربية",
    flag: "🇸🇦",
    locale: "ar-SA",
  },
  pt: {
    code: "pt",
    name: "Português",
    flag: "🇵🇹",
    locale: "pt-PT",
  },
} as const

export type LanguageCode = keyof typeof languages

export const defaultLanguage: LanguageCode = "fr"

// Traductions de base
export const translations = {
  fr: {
    common: {
      welcome: "Bienvenue",
      home: "Accueil",
      about: "À Propos",
      contact: "Contact",
      login: "Connexion",
      signup: "Inscription",
      search: "Rechercher",
      cancel: "Annuler",
      save: "Enregistrer",
      delete: "Supprimer",
      edit: "Modifier",
      submit: "Soumettre",
    },
    navigation: {
      programs: "Programmes",
      admissions: "Admissions",
      dashboard: "Tableau de bord",
      ffaTV: "FFA TV",
      clubConnect: "Club Connect",
      scouting: "IA Scouting",
    },
  },
  en: {
    common: {
      welcome: "Welcome",
      home: "Home",
      about: "About",
      contact: "Contact",
      login: "Login",
      signup: "Sign Up",
      search: "Search",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      submit: "Submit",
    },
    navigation: {
      programs: "Programs",
      admissions: "Admissions",
      dashboard: "Dashboard",
      ffaTV: "FFA TV",
      clubConnect: "Club Connect",
      scouting: "AI Scouting",
    },
  },
  ar: {
    common: {
      welcome: "مرحباً",
      home: "الرئيسية",
      about: "من نحن",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      signup: "التسجيل",
      search: "بحث",
      cancel: "إلغاء",
      save: "حفظ",
      delete: "حذف",
      edit: "تعديل",
      submit: "إرسال",
    },
    navigation: {
      programs: "البرامج",
      admissions: "القبول",
      dashboard: "لوحة التحكم",
      ffaTV: "FFA TV",
      clubConnect: "Club Connect",
      scouting: "اكتشاف المواهب",
    },
  },
  pt: {
    common: {
      welcome: "Bem-vindo",
      home: "Início",
      about: "Sobre",
      contact: "Contato",
      login: "Entrar",
      signup: "Registrar",
      search: "Pesquisar",
      cancel: "Cancelar",
      save: "Salvar",
      delete: "Excluir",
      edit: "Editar",
      submit: "Enviar",
    },
    navigation: {
      programs: "Programas",
      admissions: "Admissões",
      dashboard: "Painel",
      ffaTV: "FFA TV",
      clubConnect: "Club Connect",
      scouting: "Scouting IA",
    },
  },
} as const

export function getTranslation(lang: LanguageCode, key: string): string {
  const keys = key.split(".")
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}

