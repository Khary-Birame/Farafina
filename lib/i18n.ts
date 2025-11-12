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
      logout: "Se déconnecter",
      profile: "Mon Profil",
      apply: "Postuler",
      menu: "MENU",
    },
    navigation: {
      programs: "Programmes",
      admissions: "Admissions",
      events: "Événements",
      players: "Joueurs",
      international: "International",
      boutique: "Boutique",
      ffaTV: "FFA TV",
      clubConnect: "Club Connect",
      scouting: "IA Scouting",
      partners: "Devenir Partenaire",
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
      logout: "Logout",
      profile: "My Profile",
      apply: "Apply",
      menu: "MENU",
    },
    navigation: {
      programs: "Programs",
      admissions: "Admissions",
      events: "Events",
      players: "Players",
      international: "International",
      boutique: "Shop",
      ffaTV: "FFA TV",
      clubConnect: "Club Connect",
      scouting: "AI Scouting",
      partners: "Become a Partner",
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
      logout: "تسجيل الخروج",
      profile: "ملفي الشخصي",
      apply: "تقديم",
      menu: "القائمة",
    },
    navigation: {
      programs: "البرامج",
      admissions: "القبول",
      events: "الأحداث",
      players: "اللاعبون",
      international: "الدولي",
      boutique: "المتجر",
      ffaTV: "FFA TV",
      clubConnect: "Club Connect",
      scouting: "اكتشاف المواهب",
      partners: "كن شريكاً",
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
      logout: "Sair",
      profile: "Meu Perfil",
      apply: "Candidatar-se",
      menu: "MENU",
    },
    navigation: {
      programs: "Programas",
      admissions: "Admissões",
      events: "Eventos",
      players: "Jogadores",
      international: "Internacional",
      boutique: "Loja",
      ffaTV: "FFA TV",
      clubConnect: "Club Connect",
      scouting: "Scouting IA",
      partners: "Tornar-se Parceiro",
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

