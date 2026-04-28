import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    color: {
      background: string;
      surface: string;
      border: string;
      borderBright: string;
      primary: string;
      primaryDim: string;
      text: string;
      textBody: string;
      textMuted: string;
      textDim: string;
      overlay: string;
    };
    effect: {
      scrim: string;
      scrimSoft: string;
      shadowLg: string;
      shadowMd: string;
      modalPanelSurface: string;
      modalTopBar: string;
      modalButtonSurface: string;
      heroVignetteStart: string;
      heroVignetteMid: string;
      heroVignetteEnd: string;
      heroLineOpacityScale: number;
    };
    status: {
      success: string;
      danger: string;
      primaryHover: string;
    };
    typography: {
      mono: string;
      heading1: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      heading2: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      heading3: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      bodySmall: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      body: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      bodyLarge: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      eyebrow: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
        textTransform: 'uppercase';
      };
      labelSmall: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
        textTransform: 'uppercase';
      };
      label: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
        textTransform: 'uppercase';
      };
      labelLarge: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
        textTransform: 'uppercase';
      };
      captionSmall: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      caption: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      captionLarge: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      button: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
        textTransform: 'uppercase';
      };
      brand: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
        textTransform: 'uppercase';
      };
      sectionNumber: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      metricHero: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      metricIndustry: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      metricStat: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      quote: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
      quoteMark: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
    };
    breakpoints: {
      laptop: string;
      tablet: string;
      mobile: string;
    };
    spacing: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
  }
}
