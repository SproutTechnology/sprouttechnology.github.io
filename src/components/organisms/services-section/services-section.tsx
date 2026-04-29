import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { ParallaxImage } from '../../atoms/parallax-image/parallax-image';
import type { SiteContent } from '../../../i18n/site-content';
import { useTranslation } from '../../../i18n/use-translation';
import { BodyText } from '../../atoms/body-text/body-text';
import { SectionIntro } from '../../molecules/section-intro/section-intro';
import { sectionBase } from '../../atoms/layout-primitives/layout-primitives';
import { ServiceCard } from './service-card';
import { ServiceModal } from './service-modal';
import { getServiceVisual } from './service-visuals';

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

export function ServicesSection({ content }: { content: SiteContent }): JSX.Element {
  const section = content.services;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeadExpanded, setIsLeadExpanded] = useState(false);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
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

  const openService = (index: number): void => {
    setActiveIndex(index);
    lastTriggerRef.current = cardRefs.current[index];
    setIsModalOpen(true);
  };

  const closeService = useCallback((): void => {
    setIsModalOpen(false);
    lastTriggerRef.current?.focus();
  }, []);

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
              serviceRef={(element) => {
                cardRefs.current[index] = element;
              }}
              actionLabel={t('ui.services.openServiceLabel')}
              isActive={isActive}
              item={item}
              visual={visual}
              onKeyDown={(key) => handleServiceKeyDown(index, key)}
              onOpen={() => openService(index)}
            />
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
        <ServiceModal
          callout={activeServiceCallout}
          closeLabel={t('ui.services.closeServiceLabel')}
          closeButtonLabel={t('ui.services.closeButtonLabel')}
          cta={content.navigation.cta}
          detailCardLabel={t('ui.services.detailCardLabel')}
          sectionLabel={section.label}
          service={activeService}
          visual={activeVisual}
          onClose={closeService}
        />
      ) : null}
    </Section>
  );
}
