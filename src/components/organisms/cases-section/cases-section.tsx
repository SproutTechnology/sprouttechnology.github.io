import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { photographicImageStyles } from '../../atoms/image-treatment/image-treatment';
import type { CaseStudyId, CaseStudyItem, SiteContent } from '../../../i18n/site-content';
import { useTranslation } from '../../../i18n/use-translation';
import { BodyText } from '../../atoms/body-text/body-text';
import { EyebrowText } from '../../atoms/eyebrow-text/eyebrow-text';
import { LabelText } from '../../atoms/label-text/label-text';
import { Heading3 } from '../../atoms/heading-3/heading-3';
import { Modal } from '../../molecules/modal';
import { SectionIntro } from '../../molecules/section-intro/section-intro';
import { sectionBase } from '../../atoms/layout-primitives/layout-primitives';

interface CaseVisual {
  url: string;
}

const unsplashParams = 'auto=format&fit=crop&crop=entropy&w=1400&h=900&q=80';

function buildUnsplashUrl(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?${unsplashParams}`;
}

const fallbackCaseVisual: CaseVisual = {
  url: buildUnsplashUrl('photo-1516321318423-f06f85e504b3'),
};

const caseVisuals: Record<CaseStudyId, CaseVisual> = {
  'retail-signage-platform': {
    url: buildUnsplashUrl('photo-1542838132-92c53300491e'),
  },
  'global-hr-integration': {
    url: buildUnsplashUrl('photo-1521737604893-d14cc237f11d'),
  },
  'customer-portal-cms': {
    url: buildUnsplashUrl('photo-1460925895917-afdab827c52f'),
  },
};

function getCaseVisual(item: CaseStudyItem): CaseVisual {
  return caseVisuals[item.id] ?? fallbackCaseVisual;
}

const Section = styled.section`
  ${sectionBase}
`;

const CasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CaseCard = styled.button<{ $active: boolean }>`
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

const CaseCardMedia = styled.div`
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.color.overlay};
  overflow: hidden;
`;

const CaseCardImage = styled.img`
  ${photographicImageStyles}
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const CaseCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  min-height: 0;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CaseSector = styled(LabelText).attrs({
  as: 'div',
  $tone: 'accent',
})`
  display: block;
`;

const CaseTitle = styled(Heading3)`
  font-size: 24px;
  line-height: 1.15;
`;

const CaseCardFooter = styled.div`
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

const CaseLeadBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xxs};
`;

const CaseLeadLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
  $size: 'small',
})`
  display: block;
`;

const CaseLeadName = styled(BodyText)`
  font-size: 13px;
  line-height: 1.5;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const CaseCardAction = styled(LabelText)<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textMuted)};
  white-space: nowrap;
`;

const CaseModalBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 40px;
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const CasePreviewMedia = styled.div`
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

const CasePreviewImage = styled.img`
  ${photographicImageStyles}
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const CasePreviewContent = styled.div`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing.xl};
  min-width: 0;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CasePreviewHeader = styled.div`
  display: grid;
  gap: 18px;
  min-width: 0;
  padding-right: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-right: 0;
  }
`;

const CasePreviewEyebrow = styled(EyebrowText)`
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

const CasePreviewTitle = styled(Heading3)`
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.05;
  letter-spacing: -0.03em;
`;

const CasePreviewMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
`;

const CasePreviewMetaItem = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
})``;

const CasePreviewIntro = styled(BodyText)`
  max-width: 56ch;
  font-size: 15px;
  line-height: 1.9;
`;

const CasePreviewOutcome = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.background};
`;

const CasePreviewOutcomeLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
})`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CasePreviewOutcomeText = styled(BodyText).attrs({
  $tone: 'default',
})``;

const CaseDetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
  }
`;

const CaseDetailBlock = styled.section`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.color.border};
`;

const CaseDetailLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'accent',
})`
  margin-bottom: 10px;
`;

const CaseDetailBody = styled(BodyText)`
  font-size: 13px;
  line-height: 1.85;
`;

export function CasesSection({ content }: { content: SiteContent }): JSX.Element {
  const section = content.cases;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const caseButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation();
  const activeCase = section.items[activeIndex];
  const activeVisual = activeCase ? getCaseVisual(activeCase) : null;

  const openCase = (index: number): void => {
    setActiveIndex(index);
    lastTriggerRef.current = caseButtonRefs.current[index];
    setIsModalOpen(true);
  };

  const closeCase = useCallback((): void => {
    setIsModalOpen(false);
    lastTriggerRef.current?.focus();
  }, []);

  const focusCase = (index: number): void => {
    const boundedIndex = Math.max(0, Math.min(index, section.items.length - 1));

    caseButtonRefs.current[boundedIndex]?.focus();
  };

  const handleCaseKeyDown = (index: number, key: string): void => {
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      focusCase(index + 1);
      return;
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      focusCase(index - 1);
      return;
    }

    if (key === 'Home') {
      focusCase(0);
      return;
    }

    if (key === 'End') {
      focusCase(section.items.length - 1);
    }
  };

  return (
    <Section id="cases" data-section="cases">
      <SectionIntro
        number={section.number}
        label={section.label}
        title={section.title}
        description={section.description}
      />

      <CasesGrid>
        {section.items.map((item, index) => {
          const isActive = isModalOpen && activeIndex === index;
          const caseVisual = getCaseVisual(item);

          return (
            <CaseCard
              key={item.id}
              ref={(element) => {
                caseButtonRefs.current[index] = element;
              }}
              type="button"
              $active={isActive}
              aria-expanded={isActive}
              aria-haspopup="dialog"
              aria-controls="case-modal-panel"
              onClick={() => openCase(index)}
              onKeyDown={(event) => {
                if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                  event.preventDefault();
                  handleCaseKeyDown(index, event.key);
                }
              }}
            >
              <CaseCardMedia>
                <CaseCardImage src={caseVisual.url} alt="" loading="lazy" />
              </CaseCardMedia>

              <CaseCardContent>
                <CaseSector>{item.sector}</CaseSector>
                <CaseTitle>{item.title}</CaseTitle>
                <CaseCardFooter>
                  <CaseLeadBlock>
                    <CaseLeadLabel>{t('ui.cases.leadLabel')}</CaseLeadLabel>
                    <CaseLeadName>{item.lead}</CaseLeadName>
                  </CaseLeadBlock>
                  <CaseCardAction $active={isActive}>{t('ui.cases.openCaseLabel')}</CaseCardAction>
                </CaseCardFooter>
              </CaseCardContent>
            </CaseCard>
          );
        })}
      </CasesGrid>

      {isModalOpen && activeCase && activeVisual ? (
        <Modal
          panelId="case-modal-panel"
          labelledBy="case-modal-title"
          closeLabel={t('ui.cases.closeCaseLabel')}
          closeButtonLabel={t('ui.cases.closeButtonLabel')}
          onClose={closeCase}
        >
            <CaseModalBody>
              <CasePreviewMedia>
                <CasePreviewImage src={activeVisual.url} alt={activeCase.imageAlt} loading="lazy" />
              </CasePreviewMedia>

              <CasePreviewContent>
                <CasePreviewHeader>
                  <CasePreviewEyebrow>{t('ui.cases.previewEyebrow')}</CasePreviewEyebrow>
                  <CasePreviewTitle id="case-modal-title">{activeCase.title}</CasePreviewTitle>
                  <CasePreviewMeta>
                    <CasePreviewMetaItem>{activeCase.sector}</CasePreviewMetaItem>
                    <CasePreviewMetaItem>
                      {t('ui.cases.leadLabel')} — {activeCase.lead}
                    </CasePreviewMetaItem>
                  </CasePreviewMeta>
                  <CasePreviewIntro>{activeCase.description}</CasePreviewIntro>
                </CasePreviewHeader>

                <CasePreviewOutcome>
                  <CasePreviewOutcomeLabel>{t('ui.cases.outcomeLabel')}</CasePreviewOutcomeLabel>
                  <CasePreviewOutcomeText>{activeCase.outcome}</CasePreviewOutcomeText>
                </CasePreviewOutcome>

                <CaseDetailGrid>
                  <CaseDetailBlock>
                    <CaseDetailLabel>{t('ui.cases.challengeLabel')}</CaseDetailLabel>
                    <CaseDetailBody>{activeCase.challenge}</CaseDetailBody>
                  </CaseDetailBlock>

                  <CaseDetailBlock>
                    <CaseDetailLabel>{t('ui.cases.approachLabel')}</CaseDetailLabel>
                    <CaseDetailBody>{activeCase.approach}</CaseDetailBody>
                  </CaseDetailBlock>

                  <CaseDetailBlock>
                    <CaseDetailLabel>{t('ui.cases.impactLabel')}</CaseDetailLabel>
                    <CaseDetailBody>{activeCase.impact}</CaseDetailBody>
                  </CaseDetailBlock>

                  {activeCase.counterfactual ? (
                    <CaseDetailBlock>
                      <CaseDetailLabel>{t('ui.cases.counterfactualLabel')}</CaseDetailLabel>
                      <CaseDetailBody>{activeCase.counterfactual}</CaseDetailBody>
                    </CaseDetailBlock>
                  ) : null}
                </CaseDetailGrid>
              </CasePreviewContent>
            </CaseModalBody>
        </Modal>
      ) : null}
    </Section>
  );
}
