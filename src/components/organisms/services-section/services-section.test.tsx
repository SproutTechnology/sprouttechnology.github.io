import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { afterEach, describe, expect, it } from 'vitest';
import type { SiteContent } from '../../../i18n/site-content';
import { I18nProvider } from '../../../i18n/use-translation';
import { theme } from '../../../theme';
import { ServicesSection } from './services-section';

const content = {
  navigation: {
    cta: {
      label: "Let's talk",
      href: '#contact',
    },
  },
  contact: {
    description: 'We are not hard to reach.',
  },
  services: {
    number: '02',
    label: 'What we do',
    title: 'We build things, we back people.',
    description: 'Section intro that should stay outside the modal.',
    items: [
      {
        number: '// 01',
        title: 'Consultancy',
        summary: 'Senior developers who quietly raise the level of the room.',
        body: 'Senior developers and architects.',
      },
      {
        number: '// 02',
        title: 'AI & Agents',
        summary: 'Practical AI that saves time, sharpens products, and earns its keep.',
        body: 'Production-ready models and autonomous agents.',
      },
    ],
  },
} as SiteContent;

function renderServicesSection(): void {
  render(
    <I18nProvider initialLocale="en">
      <ThemeProvider theme={theme}>
        <ServicesSection content={content} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('ServicesSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('opens a service dialog when a card is selected', async () => {
    const user = userEvent.setup();

    renderServicesSection();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /ai & agents/i }));

    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/production-ready models and autonomous agents/i)).toBeInTheDocument();
    expect(
      within(dialog).getByText(/if you're exploring where ai can create real leverage instead of just noise/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close service dialog/i }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
