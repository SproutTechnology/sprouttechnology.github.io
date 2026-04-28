import styled from 'styled-components';
import type { ServiceItem, SiteContent } from '../../../i18n/site-content';
import { useTranslation } from '../../../i18n/use-translation';
import { BodyText } from '../../atoms/body-text/body-text';
import { EyebrowText } from '../../atoms/eyebrow-text/eyebrow-text';
import { LabelText } from '../../atoms/label-text/label-text';
import { Heading1 } from '../../atoms/heading-1/heading-1';
import { Heading2 } from '../../atoms/heading-2/heading-2';
import { Heading3 } from '../../atoms/heading-3/heading-3';
import { ContactBlock } from '../contact-block/contact-block';
import { FooterBlock } from '../footer-block/footer-block';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Page, sectionBase } from '../../atoms/layout-primitives/layout-primitives';

const HeroSection = styled.section`
  ${sectionBase}
  padding-top: 120px;
`;

const HeroEyebrow = styled(EyebrowText)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &::before {
    content: '';
    width: 24px;
    height: 1px;
    background: currentColor;
  }
`;

const HeroNumber = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
})`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.color.textDim};
  font-size: 18px;
  letter-spacing: 0.16em;
`;

const HeroTitle = styled(Heading1)`
  margin-bottom: 20px;
  max-width: 720px;
  line-height: 1.02;
  letter-spacing: -0.03em;
`;

const HeroBody = styled(BodyText).attrs({
  $size: 'large',
})`
  max-width: 760px;
`;

const SupportingSection = styled.section`
  ${sectionBase}
`;

const SupportingGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.8fr);
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const SupportingBody = styled(BodyText)``;

const SupportingCard = styled.aside`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surface};
`;

const SupportingCardLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
})`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  letter-spacing: 0.16em;
`;

const SupportingCardText = styled(BodyText).attrs({
  $tone: 'default',
})`
  line-height: 1.8;
`;

const RelatedSection = styled.section`
  ${sectionBase}
`;

const RelatedHeading = styled(Heading2)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: clamp(28px, 4vw, 44px);
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: ${({ theme }) => theme.color.border};
  border: 1px solid ${({ theme }) => theme.color.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const RelatedCard = styled.a`
  display: block;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.color.background};
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.color.surface};
  }
`;

const RelatedCardNumber = styled(LabelText).attrs({
  as: 'div',
  $tone: 'accent',
})`
  margin-bottom: 20px;
  letter-spacing: 0.16em;
`;

const RelatedCardTitle = styled(Heading3)`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
`;

const RelatedCardBody = styled(BodyText)`
  line-height: 1.8;
`;

const MainContent = styled.main`
  display: block;
`;

export function ServiceDetailPage({
  content,
  service,
  relatedServices,
}: {
  content: SiteContent;
  service: ServiceItem;
  relatedServices: Array<ServiceItem & { href: string }>;
}): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <NavigationBar content={content} />
      <MainContent id="main-content" data-page="service-detail">
        <Page>
          <HeroSection id="top" data-section="service-hero">
            <HeroEyebrow>{content.services.label}</HeroEyebrow>
            <HeroNumber>{service.number}</HeroNumber>
            <HeroTitle>{service.title}</HeroTitle>
            <HeroBody>{service.body}</HeroBody>
          </HeroSection>

          <SupportingSection data-section="service-supporting">
            <SupportingGrid>
              <SupportingBody>{content.services.description}</SupportingBody>
              <SupportingCard>
                <SupportingCardLabel>{t('ui.services.detailCardLabel')}</SupportingCardLabel>
                <SupportingCardText>{content.contact.description}</SupportingCardText>
              </SupportingCard>
            </SupportingGrid>
          </SupportingSection>

          <RelatedSection id="what-we-do" data-section="related-services">
            <RelatedHeading>{t('ui.services.relatedHeading')}</RelatedHeading>
            <RelatedGrid>
              {relatedServices.map((relatedService) => (
                <RelatedCard key={relatedService.href} href={relatedService.href}>
                  <RelatedCardNumber>{relatedService.number}</RelatedCardNumber>
                  <RelatedCardTitle>{relatedService.title}</RelatedCardTitle>
                  <RelatedCardBody>{relatedService.body}</RelatedCardBody>
                </RelatedCard>
              ))}
            </RelatedGrid>
          </RelatedSection>

          <ContactBlock content={content} />
        </Page>
      </MainContent>
      <FooterBlock content={content} />
    </>
  );
}
