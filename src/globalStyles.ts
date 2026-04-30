import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: ${({ theme }) => theme.mode};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    overflow-x: clip;
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  body {
    margin: 0;
    min-width: 320px;
    overflow-x: clip;
    background: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    font-family: ${({ theme }) => theme.typography.mono};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
    font-weight: ${({ theme }) => theme.typography.body.fontWeight};
    letter-spacing: ${({ theme }) => theme.typography.body.letterSpacing};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  a {
    color: inherit;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  a,
  button,
  input,
  textarea,
  select {
    &:focus-visible {
      outline: 1px solid ${({ theme }) => theme.color.primary};
      outline-offset: 4px;
    }
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.background};
  }
`;
