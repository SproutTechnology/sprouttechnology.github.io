import { describe, expect, it } from 'vitest';
import {
  buildLocalizedPath,
  getHomePath,
  getIndexablePages,
  getLocaleFromPath,
  getPageForPath,
  getServicePath,
} from './site-pages';

describe('site-pages', () => {
  it('builds localized home paths', () => {
    expect(getHomePath('en')).toBe('/en/');
    expect(getHomePath('sv')).toBe('/sv/');
  });

  it('builds localized service paths and falls back to the home path for unknown indices', () => {
    expect(getServicePath('en', 0)).toBe('/en/services/consultancy/');
    expect(getServicePath('sv', 0)).toBe('/sv/tjanster/konsultverksamhet/');
    expect(getServicePath('en', 999)).toBe('/en/');
  });

  it('returns all indexable home and service pages', () => {
    const pages = getIndexablePages();

    expect(pages).toHaveLength(14);
    expect(pages).toEqual(
      expect.arrayContaining([
        {
          kind: 'home',
          locale: 'en',
          path: '/en/',
        },
        {
          kind: 'home',
          locale: 'sv',
          path: '/sv/',
        },
        {
          kind: 'service',
          locale: 'en',
          path: '/en/services/consultancy/',
          serviceIndex: 0,
        },
        {
          kind: 'service',
          locale: 'sv',
          path: '/sv/tjanster/startups/',
          serviceIndex: 5,
        },
      ]),
    );
  });

  it('extracts locales from normalized paths and returns null for unsupported paths', () => {
    expect(getLocaleFromPath('/en')).toBe('en');
    expect(getLocaleFromPath('/sv/index.html')).toBe('sv');
    expect(getLocaleFromPath('/services/consultancy/')).toBeNull();
  });

  it('maps root requests to the English home page', () => {
    expect(getPageForPath('/')).toEqual({
      kind: 'home',
      locale: 'en',
      path: '/en/',
    });
  });

  it('resolves known service routes even without trailing slashes', () => {
    expect(getPageForPath('/sv/tjanster/ai-agenter')).toEqual({
      kind: 'service',
      locale: 'sv',
      path: '/sv/tjanster/ai-agenter/',
      serviceIndex: 1,
    });
  });

  it('falls back to the localized home page for unknown routes', () => {
    expect(getPageForPath('/sv/okand-sida')).toEqual({
      kind: 'home',
      locale: 'sv',
      path: '/sv/',
    });

    expect(getPageForPath('/unknown-route')).toEqual({
      kind: 'home',
      locale: 'en',
      path: '/en/',
    });
  });

  it('builds localized paths for both home and service pages', () => {
    expect(buildLocalizedPath('/en/', 'sv')).toBe('/sv/');
    expect(buildLocalizedPath('/en/services/consultancy/', 'sv')).toBe('/sv/tjanster/konsultverksamhet/');
    expect(buildLocalizedPath('/missing-page', 'sv')).toBe('/sv/');
  });
});
