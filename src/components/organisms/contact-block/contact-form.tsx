import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import type { SiteContent } from '../../../i18n/site-content';
import { useTranslation } from '../../../i18n/use-translation';
import { buttonTextStyles } from '../../atoms/button-text/button-text';

const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT ?? '/api/contact';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormValues {
  name: string;
  company: string;
  message: string;
  website: string;
}

interface ContactFormProps {
  contact: SiteContent['contact'];
}

const initialFormValues: ContactFormValues = {
  name: '',
  company: '',
  message: '',
  website: '',
};

const Form = styled.form`
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
  transition:
    background 0.2s ease,
    opacity 0.2s ease;

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

export function ContactForm({ contact }: ContactFormProps): JSX.Element {
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

  return (
    <Form
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

      {contact.fields.map((field) => {
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
        {submissionState === 'submitting' ? t('ui.contact.sendingLabel') : contact.submitLabel}
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
    </Form>
  );
}
