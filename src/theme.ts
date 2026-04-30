import type { DefaultTheme } from 'styled-components';

export type ThemeMode = 'light' | 'dark';

const typography: DefaultTheme['typography'] = {
  mono: "'JetBrains Mono', monospace",
  heading1: {
    fontSize: 'clamp(36px, 5vw, 72px)',
    lineHeight: '1.1',
    fontWeight: 700,
    letterSpacing: '-0.05em',
  },
  heading2: {
    fontSize: 'clamp(24px, 3vw, 40px)',
    lineHeight: '1.1',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  heading3: {
    fontSize: 'clamp(20px, 2.5vw, 32px)',
    lineHeight: '1.3',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  bodySmall: {
    fontSize: '13px',
    lineHeight: '1.8',
    fontWeight: 400,
    letterSpacing: '0',
  },
  body: {
    fontSize: '14px',
    lineHeight: '1.9',
    fontWeight: 400,
    letterSpacing: '0',
  },
  bodyLarge: {
    fontSize: '16px',
    lineHeight: '1.9',
    fontWeight: 400,
    letterSpacing: '0',
  },
  eyebrow: {
    fontSize: '11px',
    lineHeight: '1',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  labelSmall: {
    fontSize: '10px',
    lineHeight: '1.2',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  label: {
    fontSize: '11px',
    lineHeight: '1.2',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  labelLarge: {
    fontSize: '12px',
    lineHeight: '1.2',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  captionSmall: {
    fontSize: '11px',
    lineHeight: '1.6',
    fontWeight: 400,
    letterSpacing: '0.05em',
  },
  caption: {
    fontSize: '12px',
    lineHeight: '1.8',
    fontWeight: 400,
    letterSpacing: '0.05em',
  },
  captionLarge: {
    fontSize: '13px',
    lineHeight: '1.8',
    fontWeight: 400,
    letterSpacing: '0.04em',
  },
  button: {
    fontSize: '12px',
    lineHeight: '1',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  brand: {
    fontSize: '15px',
    lineHeight: '1',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  sectionNumber: {
    fontSize: '40px',
    lineHeight: '1',
    fontWeight: 700,
    letterSpacing: '-0.04em',
  },
  metricHero: {
    fontSize: 'clamp(56px, 8vw, 80px)',
    lineHeight: '1',
    fontWeight: 700,
    letterSpacing: '-0.04em',
  },
  metricIndustry: {
    fontSize: 'clamp(64px, 8vw, 96px)',
    lineHeight: '1',
    fontWeight: 700,
    letterSpacing: '-0.04em',
  },
  metricStat: {
    fontSize: '48px',
    lineHeight: '1',
    fontWeight: 700,
    letterSpacing: '-0.04em',
  },
  quote: {
    fontSize: 'clamp(20px, 2.5vw, 32px)',
    lineHeight: '1.5',
    fontWeight: 300,
    letterSpacing: '-0.01em',
  },
  quoteMark: {
    fontSize: '80px',
    lineHeight: '0.8',
    fontWeight: 700,
    letterSpacing: '0',
  },
};

const breakpoints: DefaultTheme['breakpoints'] = {
  laptop: '1024px',
  tablet: '900px',
  mobile: '768px',
};

const spacing: DefaultTheme['spacing'] = {
  xxs: '0.25rem',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
  '5xl': '8rem',
  '6xl': '10rem',
};

function createTheme(theme: Pick<DefaultTheme, 'mode' | 'color' | 'effect' | 'status'>): DefaultTheme {
  return {
    ...theme,
    typography,
    breakpoints,
    spacing,
  };
}

export const darkTheme = createTheme({
  mode: 'dark',
  color: {
    background: '#0a0a08',
    surface: '#111110',
    border: '#1e1e1b',
    borderBright: '#2a2a26',
    primary: '#2b75d4',
    primaryDim: '#0660d6',
    text: '#e8e6df',
    textBody: '#a8a59d',
    textMuted: '#9e9b93',
    textDim: '#918f87',
    overlay: '#0d1220',
  },
  effect: {
    scrim: 'rgba(10, 10, 8, 0.84)',
    scrimSoft: 'rgba(10, 10, 8, 0.72)',
    shadowLg: '0 24px 80px rgba(0, 0, 0, 0.35)',
    shadowMd: '0 24px 64px rgba(0, 0, 0, 0.28)',
    modalPanelSurface:
      'linear-gradient(180deg, #111110 0%, #0a0a08 100%)',
    modalTopBar:
      'linear-gradient(180deg, rgba(17, 17, 16, 0.98) 0%, rgba(17, 17, 16, 0.78) 72%, rgba(17, 17, 16, 0) 100%)',
    modalButtonSurface: 'rgba(10, 10, 8, 0.82)',
    heroVignetteStart: 'rgba(10, 10, 8, 0)',
    heroVignetteMid: 'rgba(10, 10, 8, 0.08)',
    heroVignetteEnd: 'rgba(10, 10, 8, 0.34)',
    heroLineOpacityScale: 1,
  },
  status: {
    success: '#2b75d4',
    danger: '#f87171',
    primaryHover: '#5ee8b0',
  },
});

export const lightTheme = createTheme({
  mode: 'light',
  color: {
    background: '#f2f0eb',
    surface: '#e8e4db',
    border: '#ada697',
    borderBright: '#777063',
    primary: '#2b75d4',
    primaryDim: '#0660d6',
    text: '#171714',
    textBody: '#49453f',
    textMuted: '#5d584f',
    textDim: '#70695f',
    overlay: '#ddd7cd',
  },
  effect: {
    scrim: 'rgba(23, 23, 20, 0.30)',
    scrimSoft: 'rgba(23, 23, 20, 0.20)',
    shadowLg: '0 24px 80px rgba(23, 23, 20, 0.16)',
    shadowMd: '0 24px 64px rgba(23, 23, 20, 0.13)',
    modalPanelSurface:
      'linear-gradient(180deg, #e8e4db 0%, #f2f0eb 100%)',
    modalTopBar:
      'linear-gradient(180deg, rgba(232, 228, 219, 0.98) 0%, rgba(232, 228, 219, 0.82) 72%, rgba(232, 228, 219, 0) 100%)',
    modalButtonSurface: 'rgba(242, 240, 235, 0.96)',
    heroVignetteStart: 'rgba(242, 240, 235, 0)',
    heroVignetteMid: 'rgba(242, 240, 235, 0.03)',
    heroVignetteEnd: 'rgba(242, 240, 235, 0.12)',
    heroLineOpacityScale: 0.7,
  },
  status: {
    success: '#2b75d4',
    danger: '#d94848',
    primaryHover: '#1f66c7',
  },
});

export const theme = darkTheme;
