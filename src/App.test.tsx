import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { I18nProvider } from './i18n/use-translation';
import type { ThemeMode } from './theme';
import { ThemeModeProvider } from './theme/theme-provider';

let storageState: Record<string, string> = {};

function createStorageMock(): Storage {
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
  };
}

function renderApp(options: { initialMode?: ThemeMode } = {}): void {
  render(
    <I18nProvider initialLocale="en">
      <ThemeModeProvider initialMode={options.initialMode}>
        <App />
      </ThemeModeProvider>
    </I18nProvider>,
  );
}

describe('App', () => {
  beforeEach(() => {
    storageState = {};

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createStorageMock(),
    });

    window.history.pushState({}, '', '/');
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders the landing page in English by default', () => {
    renderApp({ initialMode: 'dark' });

    expect(screen.getByRole('heading', { name: /great software/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /consultancy/i })).toBeInTheDocument();
  });

  it('switches the page copy to Swedish', async () => {
    const user = userEvent.setup();

    renderApp({ initialMode: 'dark' });

    await user.click(screen.getByRole('button', { name: /^switch language to swedish$/i }));

    expect(screen.getByRole('heading', { name: /bra mjukvara/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /konsultverksamhet/i })).toBeInTheDocument();
  });

  it('renders a service detail page from the localized path', () => {
    window.history.pushState({}, '', '/en/services/consultancy/');

    renderApp({ initialMode: 'dark' });

    expect(screen.getByRole('heading', { name: /^consultancy$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /related services/i })).toBeInTheDocument();
  });

  it('toggles the mobile menu button state', async () => {
    const user = userEvent.setup();

    renderApp({ initialMode: 'dark' });

    const menuButton = screen.getByLabelText(/open menu/i);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    expect(screen.getByLabelText(/close menu/i)).toHaveAttribute('aria-expanded', 'true');
  });

  it('persists the selected theme mode', async () => {
    const user = userEvent.setup();

    renderApp({ initialMode: 'dark' });

    const themeToggleButton = screen.getByRole('button', { name: /switch to light theme/i });

    await user.click(themeToggleButton);

    await waitFor(() => {
      expect(window.localStorage.getItem('sprout-theme')).toBe('light');
    });

    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toBeInTheDocument();
  });

  it('falls back to the system theme when no stored preference exists', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    renderApp();

    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toBeInTheDocument();
  });
});
