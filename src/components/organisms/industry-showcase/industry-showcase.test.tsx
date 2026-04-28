import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { afterEach, describe, expect, it } from 'vitest';
import type { SiteContent } from '../../../i18n/site-content';
import { theme } from '../../../theme';
import { I18nProvider } from '../../../i18n/use-translation';
import { IndustryShowcase } from './industry-showcase';

const content = {
  industries: {
    eyebrow: 'Industries',
    count: '14',
    countLabel: 'sectors — one codebase at a time',
    title: 'An almost unreasonable range of industries.',
    description: 'A lot of industries, one solid engineering mindset.',
    label: 'Hover to explore',
    footerBrand: 'wearesprout.se',
    items: [
      { id: 'automotive-ev', name: 'Automotive & EV', tag: 'EV Platform', description: 'Test description for automotive.', status: 'client' },
      { id: 'cybersecurity', name: 'Cybersecurity', tag: 'Security Eng.', description: 'Test description for cybersecurity.', status: 'portfolio' },
    ],
  },
} as SiteContent;

function renderIndustryShowcase(): void {
  render(
    <I18nProvider initialLocale="en">
      <ThemeProvider theme={theme}>
        <IndustryShowcase content={content} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

function setViewportWidth(width: number): void {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  });
  window.dispatchEvent(new Event('resize'));
}

describe('IndustryShowcase', () => {
  afterEach(() => {
    setViewportWidth(1024);
    cleanup();
  });

  it('updates the preview image when a new industry is selected', async () => {
    const user = userEvent.setup();

    renderIndustryShowcase();

    expect(
      screen.getByRole('img', {
        name: /electric vehicle charging on a city street/i,
      }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /cybersecurity/i }));

    expect(
      screen.getByRole('img', {
        name: /cybersecurity monitoring display/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cybersecurity/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('opens a modal on mobile when an industry is selected', async () => {
    const user = userEvent.setup();

    setViewportWidth(375);
    renderIndustryShowcase();

    await user.click(screen.getByRole('button', { name: /cybersecurity/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: /cybersecurity monitoring display/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /close industry details/i }),
    ).toBeInTheDocument();
  });
});
