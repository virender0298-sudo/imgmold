import { defaultLocale, locales, type LocaleConfig } from './config';

// Import all translation files
import en from './translations/en.json';
import hi from './translations/hi.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import de from './translations/de.json';
import pt from './translations/pt.json';
import ja from './translations/ja.json';
import ko from './translations/ko.json';
import zh from './translations/zh.json';
import ar from './translations/ar.json';

const translations: Record<string, Record<string, string>> = {
  en, hi, es, fr, de, pt, ja, ko, zh, ar
};

/**
 * Get a translated string by key. Falls back to English if key is missing.
 */
export function t(locale: string, key: string): string {
  const lang = translations[locale] || translations[defaultLocale];
  return lang[key] || translations[defaultLocale][key] || key;
}

/**
 * Get all translations for a locale (for passing to components).
 */
export function useTranslations(locale: string): Record<string, string> {
  return { ...translations[defaultLocale], ...(translations[locale] || {}) };
}

/**
 * Generate a localized path. English paths have no prefix.
 */
export function getLocalizedPath(locale: string, path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) {
    return cleanPath;
  }
  return `/${locale}${cleanPath}`;
}

/**
 * Get the locale config object.
 */
export function getLocaleConfig(locale: string): LocaleConfig {
  return locales[locale] || locales[defaultLocale];
}

/**
 * Extract locale from a URL pathname.
 */
export function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && locales[segments[0]]) {
    return segments[0];
  }
  return defaultLocale;
}
