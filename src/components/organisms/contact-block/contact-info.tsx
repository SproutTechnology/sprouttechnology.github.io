import styled from 'styled-components';
import type {
  ContactCompanyDetails,
  ContactPerson,
  SiteContent,
} from '../../../i18n/site-content';
import { BodyText } from '../../atoms/body-text/body-text';
import { CaptionText, captionTextStyles } from '../../atoms/caption-text/caption-text';
import { Heading3 } from '../../atoms/heading-3/heading-3';
import { LabelText } from '../../atoms/label-text/label-text';

interface ContactInfoProps {
  contact: SiteContent['contact'];
}

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

export function ContactInfo({ contact }: ContactInfoProps): JSX.Element {
  const inboxEmail = contact.inboxEmail ?? contact.details?.[0];
  const people = contact.people ?? [];
  const companyDetails = contact.companyDetails;

  return (
    <ContactInfoBar>
      {inboxEmail ? (
        <ContactInfoCard>
          <ContactInfoLabel>{contact.inboxLabel ?? 'General'}</ContactInfoLabel>
          <ContactInfoMeta>
            <ContactInfoLink href={`mailto:${inboxEmail}`}>{inboxEmail}</ContactInfoLink>
          </ContactInfoMeta>
        </ContactInfoCard>
      ) : null}

      {people.map((person) => (
        <ContactPersonCard key={person.email} person={person} />
      ))}

      {companyDetails ? <ContactCompanyDetailsCard details={companyDetails} /> : null}

      {!inboxEmail && people.length === 0 && contact.details?.length ? (
        <ContactInfoCard>
          <ContactInfoFallback>
            {contact.details.map((detail) => (
              <div key={detail}>{detail}</div>
            ))}
          </ContactInfoFallback>
        </ContactInfoCard>
      ) : null}
    </ContactInfoBar>
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
