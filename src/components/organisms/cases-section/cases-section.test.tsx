import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { afterEach, describe, expect, it } from 'vitest';
import type { SiteContent } from '../../../i18n/site-content';
import { I18nProvider } from '../../../i18n/use-translation';
import { theme } from '../../../theme';
import { CasesSection } from './cases-section';

const content = {
  cases: {
    number: '05',
    label: 'Cases',
    title: 'Selected cases',
    description: 'A few selected cases.',
    items: [
      {
        id: 'retail-signage-platform',
        title: 'Store communication, built in-house',
        sector: 'Retail communication',
        lead: 'Mikael Mühling',
        summary: 'One product surface.',
        description: 'Detailed description.',
        challenge: 'Complicated rollout.',
        approach: 'Ran workshops and built a platform.',
        impact: 'Faster delivery.',
        outcome: 'Cleaner releases.',
        imageAlt: 'Retail case visual',
      },
      {
        id: 'customer-portal-cms',
        title: 'Customer portal and admin CMS',
        sector: 'Customer self-service',
        lead: 'Fredrik Sahlen',
        summary: 'Useful platform work.',
        description: 'Detailed portal description.',
        challenge: 'Slow old portal.',
        approach: 'Rebuilt the full product.',
        impact: 'Lower support load.',
        outcome: 'Shorter loops.',
        imageAlt: 'Portal case visual',
      },
    ],
  },
} as SiteContent;

function renderCasesSection(): void {
  render(
    <I18nProvider initialLocale="en">
      <ThemeProvider theme={theme}>
        <CasesSection content={content} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('CasesSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('opens a case dialog when a case card is selected', async () => {
    const user = userEvent.setup();

    renderCasesSection();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /customer portal and admin cms/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/detailed portal description/i)).toBeInTheDocument();
    expect(screen.getByText(/shorter loops/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close case dialog/i }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
