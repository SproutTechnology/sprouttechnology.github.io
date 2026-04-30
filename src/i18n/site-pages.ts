import type { Locale } from './translations';

export interface HomePageDefinition {
  kind: 'home';
  locale: Locale;
  path: string;
}

export interface ServicePageDefinition {
  kind: 'service';
  locale: Locale;
  path: string;
  serviceIndex: number;
}

export type SitePageDefinition = HomePageDefinition | ServicePageDefinition;

const serviceSlugs: Record<Locale, string[]> = {
  en: [
    'consultancy',
    'ai-agents',
    'project-commitment',
    'teams',
    'advisory',
    'startups',
  ],
  sv: [
    'konsultverksamhet',
    'ai-agenter',
    'projektatagande',
    'team',
    'radgivning',
    'startups',
  ],
};

const serviceBaseSegment: Record<Locale, string> = {
  en: 'services',
  sv: 'tjanster',
};

export function getHomePath(locale: Locale): string {
  return `/${locale}/`;
}

export function getServicePath(locale: Locale, serviceIndex: number): string {
  const slug = serviceSlugs[locale][serviceIndex];

  if (!slug) {
    return getHomePath(locale);
  }

  return `/${locale}/${serviceBaseSegment[locale]}/${slug}/`;
}

export function getIndexablePages(): SitePageDefinition[] {
  const locales: Locale[] = ['en', 'sv'];

  return locales.flatMap((locale) => [
    {
      kind: 'home',
      locale,
      path: getHomePath(locale),
    },
    ...serviceSlugs[locale].map((_, serviceIndex) => ({
      kind: 'service' as const,
      locale,
      path: getServicePath(locale, serviceIndex),
      serviceIndex,
    })),
  ]);
}

export function getLocaleFromPath(pathname: string): Locale | null {
  const [firstSegment] = normalizePathSegments(pathname);

  if (firstSegment === 'en' || firstSegment === 'sv') {
    return firstSegment;
  }

  return null;
}

export function getPageForPath(pathname: string): SitePageDefinition {
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath === '/' || normalizedPath === '/index.html') {
    return {
      kind: 'home',
      locale: 'en',
      path: getHomePath('en'),
    };
  }

  for (const page of getIndexablePages()) {
    if (normalizePathname(page.path) === normalizedPath) {
      return page;
    }
  }

  return {
    kind: 'home',
    locale: getLocaleFromPath(pathname) ?? 'en',
    path: getHomePath(getLocaleFromPath(pathname) ?? 'en'),
  };
}

export function buildLocalizedPath(pathname: string, locale: Locale): string {
  const page = getPageForPath(pathname);

  if (page.kind === 'service') {
    return getServicePath(locale, page.serviceIndex);
  }

  return getHomePath(locale);
}

function normalizePathname(pathname: string): string {
  const withoutIndex = pathname.replace(/\/index\.html$/, '/');

  if (withoutIndex === '/') {
    return '/';
  }

  return withoutIndex.endsWith('/') ? withoutIndex : `${withoutIndex}/`;
}

function normalizePathSegments(pathname: string): string[] {
  return normalizePathname(pathname)
    .split('/')
    .filter(Boolean);
}
