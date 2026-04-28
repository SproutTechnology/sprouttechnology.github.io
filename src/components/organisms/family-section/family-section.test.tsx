import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { afterEach, describe, expect, it } from 'vitest';
import type { SiteContent } from '../../../i18n/site-content';
import { I18nProvider } from '../../../i18n/use-translation';
import { theme } from '../../../theme';
import { FamilySection } from './family-section';

const content = {
  family: {
    number: '03',
    label: 'Our family',
    title: 'A decade of getting our hands dirty.',
    description: 'Built, backed, and exited companies.',
    tabs: [
      { id: 'investments', label: 'Investments', count: '3' },
      { id: 'exits', label: 'Exits', count: '2' },
      { id: 'portfolio', label: 'Portfolio', count: '2+' },
    ],
    investments: [
      {
        name: 'EQ2',
        sector: 'IT Consultancy',
        description: 'Operating companies and support.',
        progress: 100,
        status: 'active',
      },
      {
        name: 'Ivy',
        sector: 'IT Consultancy',
        description: 'Second consultancy arm.',
        progress: 100,
        status: 'active',
      },
      {
        name: 'Cuvivia',
        sector: 'Health',
        description: 'Digital health platform.',
        progress: 90,
        status: 'active',
      },
    ],
    exits: {
      items: [
        {
          name: 'Quartr',
          description: 'Built, backed, and exited companies.',
          tag: 'Backed & exited',
        },
        {
          name: 'Sightec',
          description: 'Early investment that exited well.',
          tag: 'Backed & exited',
        },
      ],
      note: 'We have done this before.',
    },
    portfolio: [
      {
        label: 'Health &\nFemtech',
        companies: ['Hormona', 'Medituner'],
      },
    ],
  },
} as unknown as SiteContent;

function renderFamilySection(): void {
  render(
    <I18nProvider initialLocale="en">
      <ThemeProvider theme={theme}>
        <FamilySection content={content} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('FamilySection', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders tabbed family panels and switches tabs', async () => {
    const user = userEvent.setup();

    renderFamilySection();

    expect(screen.getByRole('tab', { name: /investments/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText(/eq2/i)).toBeInTheDocument();
    expect(screen.getByText(/cuvivia/i)).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /exits/i }));

    expect(screen.getByRole('tab', { name: /exits/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText(/quartr/i)).toBeInTheDocument();
    expect(screen.getByText(/sightec/i)).toBeInTheDocument();
  });
});
