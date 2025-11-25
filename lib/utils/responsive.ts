/**
 * Utilitaires pour la responsivité
 * Breakpoints cohérents pour tous les appareils
 */

export const breakpoints = {
  xs: '320px',   // Très petits téléphones
  sm: '375px',   // Petits téléphones (iPhone SE, etc.)
  md: '768px',   // Tablettes portrait
  lg: '1024px',  // Tablettes paysage / Petits laptops
  xl: '1280px',  // Laptops
  '2xl': '1536px', // Desktops
} as const

/**
 * Hook pour détecter la taille d'écran
 */
export function useBreakpoint() {
  if (typeof window === 'undefined') {
    return { isMobile: false, isTablet: false, isDesktop: true }
  }

  const width = window.innerWidth

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isSmallMobile: width < 375,
    isLargeMobile: width >= 375 && width < 768,
  }
}

/**
 * Classes Tailwind responsives optimisées
 */
export const responsiveClasses = {
  // Padding
  padding: {
    container: 'px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12',
    section: 'py-12 sm:py-16 md:py-20 lg:py-24',
    card: 'p-4 sm:p-6 md:p-8',
  },
  // Grid
  grid: {
    '1-2-3': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
    '1-2-4': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6',
    '2-3-4': 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4',
  },
  // Typography
  typography: {
    h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    body: 'text-sm sm:text-base md:text-lg',
  },
} as const

