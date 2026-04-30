import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

let storageState: Record<string, string> = {};

function createStorageMock(overrides: Partial<Storage> = {}): Storage {
  return {
    get length() {
      return Object.keys(storageState).length;
    },
    clear(): void {
      storageState = {};
    },
    getItem(key: string): string | null {
      return key in storageState ? storageState[key] : null;
    },
    key(index: number): string | null {
      return Object.keys(storageState)[index] ?? null;
    },
    removeItem(key: string): void {
      delete storageState[key];
    },
    setItem(key: string, value: string): void {
      storageState[key] = value;
    },
    ...overrides,
  } as Storage;
}

function setNavigatorLanguage(language: string): void {
  Object.defineProperty(window.navigator, 'language', {
    configurable: true,
    value: language,
  });
}

async function loadI18nModule() {
  vi.resetModules();
  vi.doUnmock('./translations');
  return import('./use-translation');
}

async function loadI18nModuleWithTranslations(translations: Record<string, unknown>) {
  vi.resetModules();
  vi.doMock('./translations', () => ({ translations }));
  return import('./use-translation');
}

describe('use-translation', () => {
  beforeEach(() => {
    storageState = {};

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createStorageMock(),
    });

    window.history.pushState({}, '', '/');
    setNavigatorLanguage('en-US');
    document.documentElement.lang = '';
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.doUnmock('./translations');
  });

  it('throws when the hook is used outside the provider', async () => {
    const { useTranslation } = await loadI18nModule();
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    function OutsideProvider(): JSX.Element {
      useTranslation();
      return <div>outside</div>;
    }

    expect(() => render(<OutsideProvider />)).toThrow(
      'useTranslation must be used within an I18nProvider.',
    );

    consoleError.mockRestore();
  });

  it('uses the explicit initial locale and persists it to the document and storage', async () => {
    const { I18nProvider, useTranslation } = await loadI18nModule();

    function Probe(): JSX.Element {
      const { locale, t } = useTranslation();

      return (
        <>
          <div data-testid="locale">{locale}</div>
          <div>{t<string>('siteContent.navigation.cta.label')}</div>
        </>
      );
    }

    render(
      <I18nProvider initialLocale="sv">
        <Probe />
      </I18nProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('sv');
    expect(screen.getByText('Låt oss prata')).toBeInTheDocument();

    await waitFor(() => {
      expect(document.documentElement.lang).toBe('sv');
      expect(window.localStorage.getItem('sprout-locale')).toBe('sv');
    });
  });

  it('prefers the locale from the current path over storage and navigator defaults', async () => {
    storageState['sprout-locale'] = 'en';
    setNavigatorLanguage('en-US');
    window.history.pushState({}, '', '/sv/');

    const { I18nProvider, useTranslation } = await loadI18nModule();

    function Probe(): JSX.Element {
      return <div data-testid="locale">{useTranslation().locale}</div>;
    }

    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('sv');
  });

  it('falls back to the stored locale when the path does not contain one', async () => {
    storageState['sprout-locale'] = 'sv';
    window.history.pushState({}, '', '/missing-page');

    const { I18nProvider, useTranslation } = await loadI18nModule();

    function Probe(): JSX.Element {
      return <div data-testid="locale">{useTranslation().locale}</div>;
    }

    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('sv');
  });

  it('falls back to the browser language when neither path nor storage chooses a locale', async () => {
    setNavigatorLanguage('sv-SE');
    window.history.pushState({}, '', '/missing-page');

    const { I18nProvider, useTranslation } = await loadI18nModule();

    function Probe(): JSX.Element {
      return <div data-testid="locale">{useTranslation().locale}</div>;
    }

    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('sv');
  });

  it('updates the localized path while preserving search parameters and the hash', async () => {
    const user = userEvent.setup();
    window.history.pushState({}, '', '/en/services/consultancy/?source=ad#top');

    const { I18nProvider, useTranslation } = await loadI18nModule();

    function Probe(): JSX.Element {
      const { locale, setLocale } = useTranslation();

      return (
        <>
          <div data-testid="locale">{locale}</div>
          <button type="button" onClick={() => setLocale('sv')}>
            switch
          </button>
        </>
      );
    }

    render(
      <I18nProvider initialLocale="en">
        <Probe />
      </I18nProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'switch' }));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/sv/tjanster/konsultverksamhet/');
      expect(window.location.search).toBe('?source=ad');
      expect(window.location.hash).toBe('#top');
      expect(screen.getByTestId('locale')).toHaveTextContent('sv');
    });
  });

  it('does not push a new history entry when the localized url stays the same', async () => {
    const user = userEvent.setup();
    const pushStateSpy = vi.spyOn(window.history, 'pushState');
    window.history.pushState({}, '', '/en/');

    const { I18nProvider, useTranslation } = await loadI18nModule();

    function Probe(): JSX.Element {
      const { setLocale } = useTranslation();

      return (
        <button type="button" onClick={() => setLocale('en')}>
          keep locale
        </button>
      );
    }

    render(
      <I18nProvider initialLocale="en">
        <Probe />
      </I18nProvider>,
    );

    pushStateSpy.mockClear();

    await user.click(screen.getByRole('button', { name: 'keep locale' }));

    expect(pushStateSpy).not.toHaveBeenCalled();
  });

  it('returns the key itself when no translation exists', async () => {
    const { I18nProvider, useTranslation } = await loadI18nModule();

    function Probe(): JSX.Element {
      return <div>{useTranslation().t('siteContent.this.key.does.not.exist')}</div>;
    }

    render(
      <I18nProvider initialLocale="sv">
        <Probe />
      </I18nProvider>,
    );

    expect(screen.getByText('siteContent.this.key.does.not.exist')).toBeInTheDocument();
  });

  it('falls back to the English translation when the active locale misses a key', async () => {
    const { I18nProvider, useTranslation } = await loadI18nModuleWithTranslations({
      en: {
        greeting: 'Hello',
      },
      sv: {},
    });

    function Probe(): JSX.Element {
      return <div>{useTranslation().t('greeting')}</div>;
    }

    render(
      <I18nProvider initialLocale="sv">
        <Probe />
      </I18nProvider>,
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles an invalid localStorage implementation gracefully', async () => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {},
    });

    const { I18nProvider, useTranslation } = await loadI18nModule();

    function Probe(): JSX.Element {
      return <div data-testid="locale">{useTranslation().locale}</div>;
    }

    render(
      <I18nProvider initialLocale="en">
        <Probe />
      </I18nProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });
});
