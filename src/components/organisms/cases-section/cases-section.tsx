import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import type { SiteContent } from '../../../i18n/site-content';
import { useTranslation } from '../../../i18n/use-translation';
import { SectionIntro } from '../../molecules/section-intro/section-intro';
import { sectionBase } from '../../atoms/layout-primitives/layout-primitives';
import { CaseCard } from './case-card';
import { CaseModal } from './case-modal';
import { getCaseVisual } from './case-visuals';

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
              caseRef={(element) => {
                caseButtonRefs.current[index] = element;
              }}
              actionLabel={t('ui.cases.openCaseLabel')}
              isActive={isActive}
              item={item}
              leadLabel={t('ui.cases.leadLabel')}
              visual={caseVisual}
              onKeyDown={(key) => handleCaseKeyDown(index, key)}
              onOpen={() => openCase(index)}
            />
          );
        })}
      </CasesGrid>

      {isModalOpen && activeCase && activeVisual ? (
        <CaseModal
          closeLabel={t('ui.cases.closeCaseLabel')}
          closeButtonLabel={t('ui.cases.closeButtonLabel')}
          item={activeCase}
          labels={{
            approach: t('ui.cases.approachLabel'),
            challenge: t('ui.cases.challengeLabel'),
            counterfactual: t('ui.cases.counterfactualLabel'),
            impact: t('ui.cases.impactLabel'),
            lead: t('ui.cases.leadLabel'),
            outcome: t('ui.cases.outcomeLabel'),
            previewEyebrow: t('ui.cases.previewEyebrow'),
          }}
          visual={activeVisual}
          onClose={closeCase}
        />
      ) : null}
    </Section>
  );
}
