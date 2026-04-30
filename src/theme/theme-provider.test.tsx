import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTheme } from 'styled-components';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { darkTheme, lightTheme } from '../theme';
import { ThemeModeProvider, themeStorageKey, useThemeMode } from './theme-provider';

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

function Probe(): JSX.Element {
  const { mode, setMode, toggleMode } = useThemeMode();
  const theme = useTheme();

  return (
    <>
      <div data-testid="mode">{mode}</div>
      <div data-testid="theme-mode">{theme.mode}</div>
      <div data-testid="theme-background">{theme.color.background}</div>
      <button type="button" onClick={toggleMode}>
        toggle theme
      </button>
      <button type="button" onClick={() => setMode('dark')}>
        set dark
      </button>
    </>
  );
}

describe('theme-provider', () => {
  beforeEach(() => {
    storageState = {};

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createStorageMock(),
    });

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: light)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    document.documentElement.dataset.theme = '';
    document.documentElement.style.colorScheme = '';
    document.head.innerHTML = '<meta name="theme-color" content="#000000" />';
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('throws when the hook is used outside the provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    function OutsideProvider(): JSX.Element {
      useThemeMode();
      return <div>outside</div>;
    }

    expect(() => render(<OutsideProvider />)).toThrow(
      'useThemeMode must be used within a ThemeModeProvider.',
    );

    consoleError.mockRestore();
  });

  it('uses the explicit initial mode and syncs the document state', async () => {
    render(
      <ThemeModeProvider initialMode="dark">
        <Probe />
      </ThemeModeProvider>,
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('theme-background')).toHaveTextContent(darkTheme.color.background);

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe('dark');
      expect(document.documentElement.style.colorScheme).toBe('dark');
      expect(window.localStorage.getItem(themeStorageKey)).toBe('dark');
      expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
        'content',
        darkTheme.color.background,
      );
    });
  });

  it('prefers a stored theme mode when no explicit initial mode is provided', () => {
    storageState[themeStorageKey] = 'light';

    render(
      <ThemeModeProvider>
        <Probe />
      </ThemeModeProvider>,
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(screen.getByTestId('theme-background')).toHaveTextContent(lightTheme.color.background);
  });

  it('falls back to the system theme when there is no stored preference', () => {
    render(
      <ThemeModeProvider>
        <Probe />
      </ThemeModeProvider>,
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: light)');
  });

  it('falls back to dark mode when matchMedia is unavailable', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: undefined,
    });

    render(
      <ThemeModeProvider>
        <Probe />
      </ThemeModeProvider>,
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
  });

  it('toggles and sets the active theme mode', async () => {
    const user = userEvent.setup();

    render(
      <ThemeModeProvider initialMode="dark">
        <Probe />
      </ThemeModeProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'toggle theme' }));

    await waitFor(() => {
      expect(screen.getByTestId('mode')).toHaveTextContent('light');
      expect(screen.getByTestId('theme-background')).toHaveTextContent(lightTheme.color.background);
      expect(window.localStorage.getItem(themeStorageKey)).toBe('light');
    });

    await user.click(screen.getByRole('button', { name: 'set dark' }));

    await waitFor(() => {
      expect(screen.getByTestId('mode')).toHaveTextContent('dark');
      expect(window.localStorage.getItem(themeStorageKey)).toBe('dark');
    });
  });

  it('handles an invalid localStorage implementation gracefully', () => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {},
    });

    render(
      <ThemeModeProvider initialMode="light">
        <Probe />
      </ThemeModeProvider>,
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
  });
});
