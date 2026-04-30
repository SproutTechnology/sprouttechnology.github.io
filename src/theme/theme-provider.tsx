import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { darkTheme, lightTheme, type ThemeMode } from '../theme';

interface ThemeModeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

interface ThemeModeProviderProps {
  children: ReactNode;
  initialMode?: ThemeMode;
}

const themeStorageKey = 'sprout-theme';
const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

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

function getStoredThemeMode(): ThemeMode | null {
  const storedMode = getStorage()?.getItem(themeStorageKey);

  if (storedMode === 'light' || storedMode === 'dark') {
    return storedMode;
  }

  return null;
}

function getSystemThemeMode(): ThemeMode {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function detectInitialThemeMode(): ThemeMode {
  return getStoredThemeMode() ?? getSystemThemeMode();
}

export function ThemeModeProvider({ children, initialMode }: ThemeModeProviderProps): JSX.Element {
  const [mode, setMode] = useState<ThemeMode>(() => initialMode ?? detectInitialThemeMode());
  const activeTheme = mode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
    getStorage()?.setItem(themeStorageKey, mode);

    const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    themeColorMeta?.setAttribute('content', activeTheme.color.background);
  }, [activeTheme.color.background, mode]);

  const toggleMode = useCallback((): void => {
    setMode((currentMode) => (currentMode === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode,
    }),
    [mode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <StyledThemeProvider theme={activeTheme}>{children}</StyledThemeProvider>
    </ThemeModeContext.Provider>
  );
}

/* Reads and updates the active theme mode from context. */
export function useThemeMode(): ThemeModeContextValue {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider.');
  }

  return context;
}

export { themeStorageKey };
