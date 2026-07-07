export const defaultLocale = 'en';

export interface LocaleConfig {
  code: string;
  name: string;       // Native name
  nameEn: string;     // English name
  dir: 'ltr' | 'rtl';
  flag: string;       // Emoji flag
}

export const locales: Record<string, LocaleConfig> = {
  en: { code: 'en', name: 'English', nameEn: 'English', dir: 'ltr', flag: '🇺🇸' },
  hi: { code: 'hi', name: 'हिन्दी', nameEn: 'Hindi', dir: 'ltr', flag: '🇮🇳' },
  es: { code: 'es', name: 'Español', nameEn: 'Spanish', dir: 'ltr', flag: '🇪🇸' },
  fr: { code: 'fr', name: 'Français', nameEn: 'French', dir: 'ltr', flag: '🇫🇷' },
  de: { code: 'de', name: 'Deutsch', nameEn: 'German', dir: 'ltr', flag: '🇩🇪' },
  pt: { code: 'pt', name: 'Português', nameEn: 'Portuguese', dir: 'ltr', flag: '🇧🇷' },
  ja: { code: 'ja', name: '日本語', nameEn: 'Japanese', dir: 'ltr', flag: '🇯🇵' },
  ko: { code: 'ko', name: '한국어', nameEn: 'Korean', dir: 'ltr', flag: '🇰🇷' },
  zh: { code: 'zh', name: '简体中文', nameEn: 'Chinese', dir: 'ltr', flag: '🇨🇳' },
  ar: { code: 'ar', name: 'العربية', nameEn: 'Arabic', dir: 'rtl', flag: '🇸🇦' },
};

export const localeKeys = Object.keys(locales);
export const nonDefaultLocales = localeKeys.filter(l => l !== defaultLocale);
