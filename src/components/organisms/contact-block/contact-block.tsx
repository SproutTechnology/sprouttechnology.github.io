import styled from 'styled-components';
import type { SiteContent } from '../../../i18n/site-content';
import { SectionIntro } from '../../molecules/section-intro/section-intro';
import { ContactForm } from './contact-form';
import { ContactInfo } from './contact-info';

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

export function ContactBlock({ content }: { content: SiteContent }): JSX.Element {
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
          <ContactInfo contact={content.contact} />
        </ContactLeft>

        <ContactRight>
          <ContactForm contact={content.contact} />
        </ContactRight>
      </ContactGrid>
    </ContactSection>
  );
}
