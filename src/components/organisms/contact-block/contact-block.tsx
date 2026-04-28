import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import type { ContactCompanyDetails, ContactPerson, SiteContent } from '../../../i18n/site-content';
import { useTranslation } from '../../../i18n/use-translation';
import { BodyText } from '../../atoms/body-text/body-text';
import { buttonTextStyles } from '../../atoms/button-text/button-text';
import { CaptionText, captionTextStyles } from '../../atoms/caption-text/caption-text';
import { Heading3 } from '../../atoms/heading-3/heading-3';
import { LabelText } from '../../atoms/label-text/label-text';
import { SectionIntro } from '../../molecules/section-intro/section-intro';

const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT ?? '/api/contact';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormValues {
  name: string;
  company: string;
  message: string;
  website: string;
}

const initialFormValues: ContactFormValues = {
  name: '',
  company: '',
  message: '',
  website: '',
};

const ContactSection = styled.section`
  padding: ${({ theme }) => theme.spacing['6xl']} 0 0;
  scroll-margin-top: 110px;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactLeft = styled.div`
  min-width: 0;
  padding: 0 ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing['6xl']} 0;
  border-right: 1px solid ${({ theme }) => theme.color.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 0 ${({ theme }) => theme.spacing['2xl']};
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
`;

const ContactRight = styled.div`
  min-width: 0;
  padding: 0 0 ${({ theme }) => theme.spacing['6xl']} ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing['2xl']} 0 0;
  }
`;

const ContactInfoBar = styled.div`
  display: grid;
  gap: 1px;
  background: ${({ theme }) => theme.color.border};
  border: 1px solid ${({ theme }) => theme.color.border};
`;

const ContactInfoCard = styled.article`
  display: grid;
  min-width: 0;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.color.surface};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ContactInfoLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
})`
  display: block;
`;

const ContactInfoName = styled(Heading3)`
  min-width: 0;
  font-size: clamp(20px, 6vw, 28px);
  overflow-wrap: anywhere;
`;

const ContactInfoMeta = styled(BodyText).attrs({
  as: 'div',
  $size: 'small',
})`
  display: grid;
  min-width: 0;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ContactInfoLink = styled.a`
  display: block;
  min-width: 0;
  color: ${({ theme }) => theme.color.textBody};
  text-decoration: none;
  overflow-wrap: anywhere;
  word-break: break-word;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.color.text};
  }
`;

const ContactInfoFallback = styled(CaptionText).attrs({
  as: 'div',
  $tone: 'dim',
})`
  ${captionTextStyles}
  line-height: 2;
`;

const ContactCompanyMeta = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ContactCompanyMetaRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xxs};
`;

const ContactCompanyMetaLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
  $size: 'small',
})`
  display: block;
`;

const ContactCompanyMetaValue = styled(BodyText).attrs({
  as: 'div',
  $size: 'small',
  $tone: 'default',
})`
  line-height: 1.7;
`;

const ContactForm = styled.form`
  display: grid;
`;

const ContactFieldLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.color.textMuted};
  font-size: 10px;
  line-height: ${({ theme }) => theme.typography.label.lineHeight};
  font-weight: ${({ theme }) => theme.typography.label.fontWeight};
  letter-spacing: 0.15em;
  text-transform: ${({ theme }) => theme.typography.label.textTransform};
`;

const ContactInput = styled.input`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderBright};
  background: transparent;
  color: ${({ theme }) => theme.color.text};
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.color.textMuted};
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.color.primary};
  }
`;

const ContactTextarea = styled.textarea`
  width: 100%;
  min-height: 124px;
  resize: vertical;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderBright};
  background: transparent;
  color: ${({ theme }) => theme.color.text};
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.color.textMuted};
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.color.primary};
  }
`;

const SubmitButton = styled.button`
  ${buttonTextStyles}
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.xs};
  border: none;
  background: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.background};
  padding: 14px 24px;
  cursor: pointer;
  transition: background 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.color.primaryDim};
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

const HoneypotField = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const SubmissionNote = styled.p<{ $tone: 'success' | 'error' }>`
  margin: ${({ theme }) => theme.spacing.md} 0 0;
  color: ${({ theme, $tone }) => ($tone === 'success' ? theme.status.success : theme.status.danger)};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  letter-spacing: 0.05em;
`;

export function ContactBlock({ content }: { content: SiteContent }): JSX.Element {
  const [formValues, setFormValues] = useState<ContactFormValues>(initialFormValues);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const { t } = useTranslation();

  const handleFieldChange = (field: keyof ContactFormValues, value: string): void => {
    setSubmissionState('idle');
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (submissionState === 'submitting') {
      return;
    }

    setSubmissionState('submitting');

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Unable to submit contact form.');
      }

      setFormValues(initialFormValues);
      setSubmissionState('success');
    } catch (error) {
      console.error(error);
      setSubmissionState('error');
    }
  };

  const submissionMessage =
    submissionState === 'success'
      ? t('ui.contact.successMessage')
      : submissionState === 'error'
        ? t('ui.contact.errorMessage')
        : null;
  const inboxEmail = content.contact.inboxEmail ?? content.contact.details?.[0];
  const people = content.contact.people ?? [];
  const companyDetails = content.contact.companyDetails;

  return (
    <ContactSection id="contact" data-section="contact">
      <SectionIntro
        number={content.contact.number}
        label={content.contact.label}
        title={content.contact.title}
        description={content.contact.description}
      />

      <ContactGrid>
        <ContactLeft>
          <ContactInfoBar>
            {inboxEmail ? (
              <ContactInfoCard>
                <ContactInfoLabel>{content.contact.inboxLabel ?? 'General'}</ContactInfoLabel>
                <ContactInfoMeta>
                  <ContactInfoLink href={`mailto:${inboxEmail}`}>{inboxEmail}</ContactInfoLink>
                </ContactInfoMeta>
              </ContactInfoCard>
            ) : null}

            {people.map((person) => (
              <ContactPersonCard key={person.email} person={person} />
            ))}

            {companyDetails ? <ContactCompanyDetailsCard details={companyDetails} /> : null}

            {!inboxEmail && people.length === 0 && content.contact.details?.length ? (
              <ContactInfoCard>
                <ContactInfoFallback>
                  {content.contact.details.map((detail) => (
                    <div key={detail}>{detail}</div>
                  ))}
                </ContactInfoFallback>
              </ContactInfoCard>
            ) : null}
          </ContactInfoBar>
        </ContactLeft>

        <ContactRight>
          <ContactForm
            aria-busy={submissionState === 'submitting'}
            onSubmit={(event) => void handleSubmit(event)}
          >
            <HoneypotField aria-hidden="true">
              <ContactFieldLabel htmlFor="website">Leave this field empty</ContactFieldLabel>
              <ContactInput
                id="website"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                value={formValues.website}
                onChange={(event) => handleFieldChange('website', event.target.value)}
              />
            </HoneypotField>

            {content.contact.fields.map((field) => {
              const value = formValues[field.name];

              return (
                <div key={field.name}>
                  <ContactFieldLabel htmlFor={field.name}>{field.label}</ContactFieldLabel>
                  {field.name === 'message' ? (
                    <ContactTextarea
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={value}
                      required
                      onChange={(event) => handleFieldChange(field.name, event.target.value)}
                    />
                  ) : (
                    <ContactInput
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={value}
                      required
                      onChange={(event) => handleFieldChange(field.name, event.target.value)}
                    />
                  )}
                </div>
              );
            })}

            <SubmitButton type="submit" disabled={submissionState === 'submitting'}>
              {submissionState === 'submitting'
                ? t('ui.contact.sendingLabel')
                : content.contact.submitLabel}
            </SubmitButton>
            {submissionMessage ? (
              <SubmissionNote
                aria-live="polite"
                role={submissionState === 'error' ? 'alert' : 'status'}
                $tone={submissionState === 'error' ? 'error' : 'success'}
              >
                {submissionMessage}
              </SubmissionNote>
            ) : null}
          </ContactForm>
        </ContactRight>
      </ContactGrid>
    </ContactSection>
  );
}

function ContactPersonCard({ person }: { person: ContactPerson }): JSX.Element {
  return (
    <ContactInfoCard>
      <ContactInfoLabel>{person.role}</ContactInfoLabel>
      <ContactInfoName>{person.name}</ContactInfoName>
      <ContactInfoMeta>
        <ContactInfoLink href={`mailto:${person.email}`}>{person.email}</ContactInfoLink>
        <ContactInfoLink href={`tel:${toTelephoneHref(person.phone)}`}>{person.phone}</ContactInfoLink>
      </ContactInfoMeta>
    </ContactInfoCard>
  );
}

function ContactCompanyDetailsCard({ details }: { details: ContactCompanyDetails }): JSX.Element {
  return (
    <ContactInfoCard>
      <ContactInfoLabel>{details.label}</ContactInfoLabel>
      <ContactInfoName>{details.name}</ContactInfoName>
      <ContactCompanyMeta>
        <ContactCompanyMetaRow>
          <ContactCompanyMetaLabel>{details.addressLabel}</ContactCompanyMetaLabel>
          <ContactCompanyMetaValue>{details.address}</ContactCompanyMetaValue>
        </ContactCompanyMetaRow>
        <ContactCompanyMetaRow>
          <ContactCompanyMetaLabel>{details.organizationNumberLabel}</ContactCompanyMetaLabel>
          <ContactCompanyMetaValue>{details.organizationNumber}</ContactCompanyMetaValue>
        </ContactCompanyMetaRow>
        <ContactCompanyMetaRow>
          <ContactCompanyMetaLabel>{details.postalCodeLabel}</ContactCompanyMetaLabel>
          <ContactCompanyMetaValue>{details.postalCode}</ContactCompanyMetaValue>
        </ContactCompanyMetaRow>
      </ContactCompanyMeta>
    </ContactInfoCard>
  );
}

function toTelephoneHref(phone: string): string {
  return phone.replace(/[^+\d]/g, '');
}
