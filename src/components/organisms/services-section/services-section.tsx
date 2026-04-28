import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { photographicImageStyles } from '../../atoms/image-treatment/image-treatment';
import { ParallaxImage } from '../../atoms/parallax-image/parallax-image';
import type { SiteContent } from '../../../i18n/site-content';
import { useTranslation } from '../../../i18n/use-translation';
import { BodyText } from '../../atoms/body-text/body-text';
import { buttonTextStyles } from '../../atoms/button-text/button-text';
import { LabelText } from '../../atoms/label-text/label-text';
import { Heading3 } from '../../atoms/heading-3/heading-3';
import { SectionIntro } from '../../molecules/section-intro/section-intro';
import { sectionBase } from '../../atoms/layout-primitives/layout-primitives';

interface ServiceVisual {
  url: string;
  alt: string;
}

const unsplashParams = 'auto=format&fit=crop&crop=entropy&w=1600&h=1000&q=80';

function buildUnsplashUrl(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?${unsplashParams}`;
}

const serviceVisuals: ServiceVisual[] = [
  {
    url: buildUnsplashUrl('photo-1522202176988-66273c2fd55f'),
    alt: 'Consultants collaborating around a laptop in a workshop setting',
  },
  {
    url: buildUnsplashUrl('photo-1677442136019-21780ecad995'),
    alt: 'Abstract AI visualization on a computer display',
  },
  {
    url: buildUnsplashUrl('photo-1517048676732-d65bc937f952'),
    alt: 'Project team planning together around a conference table',
  },
  {
    url: buildUnsplashUrl('photo-1522071820081-009f0129c71c'),
    alt: 'Cross-functional team collaborating around a table',
  },
  {
    url: buildUnsplashUrl('photo-1553028826-f4804a6dba3b'),
    alt: 'Advisory conversation in a lounge setting with notes and discussion',
  },
  {
    url: buildUnsplashUrl('photo-1498050108023-c5249f4df085'),
    alt: 'Startup workspace with laptop, sketches, and product planning',
  },
];

function getServiceVisual(index: number): ServiceVisual {
  return serviceVisuals[index] ?? serviceVisuals[0];
}

const serviceCalloutKeys = [
  'consultancy',
  'aiAgents',
  'projectCommitment',
  'teams',
  'advisory',
  'startups',
] as const;

const Section = styled.section`
  ${sectionBase}
`;

const ServicesLeadWrapper = styled.div``;

const ServicesLead = styled(BodyText)<{ $expanded: boolean }>`
  font-size: 13px;
  line-height: 1.9;
  color: ${({ theme }) => theme.color.textBody};
  white-space: pre-line;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? 'unset' : 8)};
`;

const ServicesLeadToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.color.textMuted};
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.color.text};
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ServicesFeaturePhoto = styled.div`
  width: 100%;
  aspect-ratio: 21 / 9;
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing['6xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    aspect-ratio: 16 / 9;
  }
`;

const ServiceCard = styled.button<{ $active: boolean }>`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  padding: 0;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.border)};
  background: ${({ theme, $active }) => ($active ? theme.color.surface : theme.color.background)};
  color: ${({ theme }) => theme.color.text};
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.color.surface};
    border-color: ${({ theme }) => theme.color.borderBright};
    transform: translateY(-2px);
  }
`;

const ServiceCardMedia = styled.div`
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.color.overlay};
  overflow: hidden;
`;

const ServiceCardImage = styled.img`
  ${photographicImageStyles}
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const ServiceCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  min-height: 0;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ServiceEyebrow = styled(LabelText).attrs({
  as: 'div',
  $tone: 'accent',
})`
  display: block;
`;

const ServiceSummary = styled(Heading3)`
  color: ${({ theme }) => theme.color.text};
  font-size: 24px;
  line-height: 1.15;
`;

const ServiceCardFooter = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.color.border};
`;

const ServiceNumber = styled(LabelText).attrs({
  as: 'div',
  $tone: 'accent',
})`
  display: block;
`;

const ServiceCardAction = styled(LabelText)<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textMuted)};
  white-space: nowrap;
`;

const modalOverlayAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const modalPanelAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const modalAnimationStyles = css`
  animation: ${modalPanelAnimation} 220ms ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 240;
  display: grid;
  padding: 3rem;
  background: ${({ theme }) => theme.effect.scrim};
  backdrop-filter: blur(12px);
  animation: ${modalOverlayAnimation} 180ms ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const ModalPanel = styled.article`
  ${modalAnimationStyles}
  position: relative;
  width: min(1280px, 100%);
  max-height: 100%;
  margin: auto;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.effect.modalPanelSurface};
  box-shadow: ${({ theme }) => theme.effect.shadowLg};
`;

const ModalTopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.effect.modalTopBar};
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.color.borderBright};
  background: ${({ theme }) => theme.effect.modalButtonSurface};
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
`;

const CloseButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-size: 20px;
  line-height: 1;
`;

const CloseButtonLabel = styled(LabelText).attrs({
  as: 'span',
  $tone: 'default',
})`
  letter-spacing: 0.12em;
`;

const ServiceModalBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 40px;
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const ServicePreviewMedia = styled.div`
  position: sticky;
  top: 72px;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  min-height: 520px;
  background: ${({ theme }) => theme.color.overlay};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    position: static;
    aspect-ratio: 16 / 10;
    min-height: 0;
  }
`;

const ServicePreviewImage = styled.img`
  ${photographicImageStyles}
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const ServicePreviewContent = styled.div`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing.xl};
  min-width: 0;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ServicePreviewHeader = styled.div`
  display: grid;
  gap: 18px;
  min-width: 0;
  padding-right: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-right: 0;
  }
`;

const ServicePreviewEyebrow = styled(LabelText).attrs({
  as: 'div',
  $tone: 'accent',
})`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 20px;
    height: 1px;
    background: currentColor;
  }
`;

const ServicePreviewTitle = styled(Heading3)`
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.05;
  letter-spacing: -0.03em;
`;

const ServicePreviewIntro = styled(BodyText)`
  max-width: 56ch;
  font-size: 15px;
  line-height: 1.9;
`;

const ServicePreviewCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.background};
`;

const ServicePreviewCardLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
})`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ServicePreviewCardBody = styled(BodyText)`
  font-size: 13px;
`;

const ContactAction = styled.a`
  ${buttonTextStyles}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.primary};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.background};
  }
`;

export function ServicesSection({ content }: { content: SiteContent }): JSX.Element {
  const section = content.services;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeadExpanded, setIsLeadExpanded] = useState(false);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation();
  const activeService = section.items[activeIndex];
  const activeVisual = getServiceVisual(activeIndex);
  const activeServiceCalloutKey = serviceCalloutKeys[activeIndex];
  const activeServiceCallout = activeServiceCalloutKey
    ? t<string>(`ui.services.callouts.${activeServiceCalloutKey}`)
    : content.contact.description;
  const featuredServiceVisual = {
    url: '/images/services-teams.webp',
    alt: 'Sprout team working at standing desks in the open-plan office',
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
        lastTriggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const openService = (index: number): void => {
    setActiveIndex(index);
    lastTriggerRef.current = cardRefs.current[index];
    setIsModalOpen(true);
  };

  const closeService = (): void => {
    setIsModalOpen(false);
    lastTriggerRef.current?.focus();
  };

  const focusService = (index: number): void => {
    const boundedIndex = Math.max(0, Math.min(index, section.items.length - 1));
    cardRefs.current[boundedIndex]?.focus();
  };

  const handleServiceKeyDown = (index: number, key: string): void => {
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      focusService(index + 1);
      return;
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      focusService(index - 1);
      return;
    }

    if (key === 'Home') {
      focusService(0);
      return;
    }

    if (key === 'End') {
      focusService(section.items.length - 1);
    }
  };

  return (
    <Section id="what-we-do" data-section="services">
      <SectionIntro
        number={section.number}
        label={section.label}
        title={section.title}
        descriptionContent={
          <ServicesLeadWrapper>
            <ServicesLead $expanded={isLeadExpanded}>{section.description}</ServicesLead>
            <ServicesLeadToggle
              type="button"
              onClick={() => setIsLeadExpanded((prev) => !prev)}
              aria-expanded={isLeadExpanded}
            >
              {isLeadExpanded ? 'Show less →' : 'Read more →'}
            </ServicesLeadToggle>
          </ServicesLeadWrapper>
        }
      />

      <ServicesGrid>
        {section.items.map((item, index) => {
          const isActive = isModalOpen && activeIndex === index;
          const visual = getServiceVisual(index);

          return (
            <ServiceCard
              key={item.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              type="button"
              $active={isActive}
              aria-expanded={isActive}
              aria-haspopup="dialog"
              aria-controls="service-modal-panel"
              onClick={() => openService(index)}
              onKeyDown={(event) => {
                if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                  event.preventDefault();
                  handleServiceKeyDown(index, event.key);
                }
              }}
            >
              <ServiceCardMedia>
                <ServiceCardImage src={visual.url} alt={visual.alt} loading="lazy" />
              </ServiceCardMedia>

              <ServiceCardContent>
                <ServiceEyebrow>{item.title}</ServiceEyebrow>
                <ServiceSummary>{item.summary}</ServiceSummary>
                <ServiceCardFooter>
                  <ServiceNumber>{item.number}</ServiceNumber>
                  <ServiceCardAction $active={isActive}>{t('ui.services.openServiceLabel')}</ServiceCardAction>
                </ServiceCardFooter>
              </ServiceCardContent>
            </ServiceCard>
          );
        })}
      </ServicesGrid>

      <ServicesFeaturePhoto>
        <ParallaxImage
          src={featuredServiceVisual.url}
          alt={featuredServiceVisual.alt}
          loading="lazy"
          objectPosition="center"
          range={48}
          scale={1.14}
        />
      </ServicesFeaturePhoto>

      {isModalOpen && activeService ? (
        <ModalOverlay
          aria-hidden="false"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeService();
            }
          }}
        >
          <ModalPanel
            id="service-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <ModalTopBar>
              <CloseButton
                ref={closeButtonRef}
                type="button"
                aria-label={t('ui.services.closeServiceLabel')}
                onClick={closeService}
              >
                <CloseButtonIcon aria-hidden="true">×</CloseButtonIcon>
                <CloseButtonLabel>{t('ui.services.closeButtonLabel')}</CloseButtonLabel>
              </CloseButton>
            </ModalTopBar>

            <ServiceModalBody>
              <ServicePreviewMedia>
                <ServicePreviewImage src={activeVisual.url} alt={activeVisual.alt} loading="lazy" />
              </ServicePreviewMedia>

              <ServicePreviewContent>
                <ServicePreviewHeader>
                  <ServicePreviewEyebrow>
                    {section.label} — {activeService.number}
                  </ServicePreviewEyebrow>
                  <ServicePreviewTitle id="service-modal-title">{activeService.title}</ServicePreviewTitle>
                  <ServicePreviewIntro>{activeService.body}</ServicePreviewIntro>
                </ServicePreviewHeader>

                <ServicePreviewCard>
                  <ServicePreviewCardLabel>{t('ui.services.detailCardLabel')}</ServicePreviewCardLabel>
                  <ServicePreviewCardBody>{activeServiceCallout}</ServicePreviewCardBody>
                  <ContactAction href={content.navigation.cta.href} onClick={closeService}>
                    {content.navigation.cta.label}
                  </ContactAction>
                </ServicePreviewCard>
              </ServicePreviewContent>
            </ServiceModalBody>
          </ModalPanel>
        </ModalOverlay>
      ) : null}
    </Section>
  );
}
