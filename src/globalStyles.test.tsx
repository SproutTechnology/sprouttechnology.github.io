import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { afterEach, describe, expect, it } from 'vitest';
import { GlobalStyles } from './globalStyles';
import { darkTheme, lightTheme } from './theme';

function getInjectedCssText(): string {
  return Array.from(document.styleSheets)
    .flatMap((styleSheet) => Array.from(styleSheet.cssRules).map((rule) => rule.cssText))
    .join('\n');
}

function renderGlobalStyles(theme: typeof darkTheme): string {
  render(
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div>content</div>
      </>
    </ThemeProvider>,
  );

  return getInjectedCssText();
}

describe('GlobalStyles', () => {
  afterEach(() => {
    cleanup();
  });

  it('injects the dark theme values into the global stylesheet', () => {
    const css = renderGlobalStyles(darkTheme);

    expect(css).toContain(darkTheme.color.background);
    expect(css).toContain(darkTheme.color.text);
    expect(css).toContain(darkTheme.color.primary);
    expect(css).toContain(darkTheme.typography.body.fontSize);
  });

  it('updates the generated stylesheet when the theme changes', () => {
    const css = renderGlobalStyles(lightTheme);

    expect(css).toContain(lightTheme.color.background);
    expect(css).toContain(lightTheme.color.text);
    expect(css).toContain(lightTheme.color.primary);
    expect(css).toContain(lightTheme.typography.body.lineHeight);
  });
});
