import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { SiteContent } from '../../../i18n/site-content';
import { theme } from '../../../theme';
import { I18nProvider } from '../../../i18n/use-translation';
import { ContactBlock } from './contact-block';

const content = {
  contact: {
    number: '05',
    label: 'Contact',
    title: 'Get in touch',
    description: 'We would love to hear from you.',
    inboxLabel: 'General',
    inboxEmail: 'hello@wearesprout.se',
    people: [
      {
        role: 'CEO',
        name: 'Oliver Stanisic',
        email: 'oliver.stanisic@wearesprout.se',
        phone: '+4670-7508261',
      },
      {
        role: 'Head of Recruitment',
        name: 'Sara Ljungberg',
        email: 'sara.ljungberg@wearesprout.se',
        phone: '+4676-8535530',
      },
    ],
    companyDetails: {
      label: 'Company details',
      name: 'Sprout Technology AB',
      addressLabel: 'Address',
      address: 'Götgatan 15, Göteborg',
      organizationNumberLabel: 'Organisation number',
      organizationNumber: '559383-5159',
      postalCodeLabel: 'Postal code',
      postalCode: '411 05',
    },
    submitLabel: 'Send it →',
    fields: [
      { label: 'Your name', name: 'name', placeholder: 'Anna Lindqvist' },
      { label: 'Company', name: 'company', placeholder: 'Acme AB' },
      {
        label: "What's on your mind",
        name: 'message',
        placeholder: 'Tell us more',
      },
    ],
  },
} as SiteContent;

function renderContactBlock(): void {
  render(
    <I18nProvider initialLocale="en">
      <ThemeProvider theme={theme}>
        <ContactBlock content={content} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('ContactBlock', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('submits the contact form to the cloudfront api path', async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'ok' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );

    renderContactBlock();

    await user.type(screen.getByLabelText(/your name/i), 'Anna');
    await user.type(screen.getByLabelText(/company/i), 'Sprout');
    await user.type(screen.getByLabelText(/what's on your mind/i), 'Need help with product strategy.');
    await user.click(screen.getByRole('button', { name: /send it/i }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Anna',
          company: 'Sprout',
          message: 'Need help with product strategy.',
          website: '',
        }),
      });
    });

    expect(
      await screen.findByText(/thanks — your message has been sent/i),
    ).toBeInTheDocument();
  });
});
