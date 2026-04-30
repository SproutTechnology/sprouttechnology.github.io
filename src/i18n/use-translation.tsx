import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { buildLocalizedPath, getLocaleFromPath } from './site-pages';
import { translations, type Locale } from './translations';

type TranslationValue =
  | string
  | number
  | boolean
  | null
  | TranslationValue[]
  | { [key: string]: TranslationValue };

interface TranslationContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: <T = string>(key: string) => T;
}

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);
const localeStorageKey = 'sprout-locale';

function resolveValue(source: unknown, path: string): TranslationValue | undefined {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, source) as TranslationValue | undefined;
}

function getStorage(): Storage | null {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return null;
  }

  const storage = window.localStorage;

  if (typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
    return null;
  }

  return storage;
}

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const localeFromPath = getLocaleFromPath(window.location.pathname);

  if (localeFromPath) {
    return localeFromPath;
  }

  const storage = getStorage();
  const storedLocale = storage?.getItem(localeStorageKey);

  if (storedLocale === 'en' || storedLocale === 'sv') {
    return storedLocale;
  }

  return window.navigator.language.toLowerCase().startsWith('sv') ? 'sv' : 'en';
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps): JSX.Element {
  const [locale, setLocaleState] = useState<Locale>(() => initialLocale ?? detectInitialLocale());

  useEffect(() => {
    document.documentElement.lang = locale;
    getStorage()?.setItem(localeStorageKey, locale);
  }, [locale]);

  const setLocale = useCallback(
    (nextLocale: Locale): void => {
      if (typeof window !== 'undefined') {
        const nextPath = buildLocalizedPath(window.location.pathname, nextLocale);
        const nextUrl = `${nextPath}${window.location.search}${window.location.hash}`;
        const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

        if (nextUrl !== currentUrl) {
          window.history.pushState({}, '', nextUrl);
        }
      }

      setLocaleState(nextLocale);
    },
    [],
  );

  const t = useCallback(function t<T = string>(key: string): T {
    const localizedValue = resolveValue(translations[locale], key);

    if (localizedValue !== undefined) {
      return localizedValue as T;
    }

    const fallbackValue = resolveValue(translations.en, key);

    if (fallbackValue !== undefined) {
      return fallbackValue as T;
    }

    return key as T;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t],
  );

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

/* Reads locale state and translation helpers from context. */
export function useTranslation(): TranslationContextValue {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider.');
  }

  return context;
}
