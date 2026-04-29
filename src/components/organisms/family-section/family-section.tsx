import { useRef, useState } from 'react';
import styled from 'styled-components';
import type { FamilyTabId, SiteContent } from '../../../i18n/site-content';
import { useTranslation } from '../../../i18n/use-translation';
import { BodyText } from '../../atoms/body-text/body-text';
import { sectionBase } from '../../atoms/layout-primitives/layout-primitives';
import { SectionIntro } from '../../molecules/section-intro/section-intro';
import { ExitsPanel, InvestmentsPanel, PortfolioPanel } from './family-panels';
import { FamilyTabs } from './family-tabs';

const Section = styled.section`
  ${sectionBase}
`;


const FamilyLeadWrapper = styled.div``;

const FamilyLead = styled(BodyText)<{ $expanded: boolean }>`
  font-size: 13px;
  line-height: 1.9;
  color: ${({ theme }) => theme.color.textBody};
  white-space: pre-line;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? 'unset' : 6)};
`;

const FamilyLeadToggle = styled.button`
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

export function FamilySection({ content }: { content: SiteContent }): JSX.Element {
  const section = content.family;
  const [activeTab, setActiveTab] = useState<FamilyTabId>(section.tabs[0]?.id ?? 'investments');
  const [isLeadExpanded, setIsLeadExpanded] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { t } = useTranslation();

  const focusTabByIndex = (index: number): void => {
    const boundedIndex = Math.max(0, Math.min(index, section.tabs.length - 1));
    const nextTab = section.tabs[boundedIndex];

    if (!nextTab) {
      return;
    }

    setActiveTab(nextTab.id);
    tabRefs.current[boundedIndex]?.focus();
  };

  const handleTabKeyDown = (index: number, key: string): void => {
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      focusTabByIndex(index + 1);
      return;
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      focusTabByIndex(index - 1);
      return;
    }

    if (key === 'Home') {
      focusTabByIndex(0);
      return;
    }

    if (key === 'End') {
      focusTabByIndex(section.tabs.length - 1);
    }
  };

  return (
    <Section id="our-family" data-section="family">
      <SectionIntro
        number={section.number}
        label={section.label}
        title={section.title}
        descriptionContent={
          <FamilyLeadWrapper>
            <FamilyLead $expanded={isLeadExpanded}>{section.description}</FamilyLead>
            <FamilyLeadToggle
              type="button"
              onClick={() => setIsLeadExpanded((prev) => !prev)}
              aria-expanded={isLeadExpanded}
            >
              {isLeadExpanded ? 'Show less →' : 'Read more →'}
            </FamilyLeadToggle>
          </FamilyLeadWrapper>
        }
      />

      <FamilyTabs
        activeTab={activeTab}
        label={section.label}
        tabs={section.tabs}
        registerTab={(index, element) => {
          tabRefs.current[index] = element;
        }}
        onKeyDown={handleTabKeyDown}
        onSelect={setActiveTab}
      />

        {activeTab === 'investments' ? (
          <InvestmentsPanel
            investments={section.investments}
            activeStatusLabel={t('ui.family.status.active')}
            exitedStatusLabel={t('ui.family.status.exited')}
          />
        ) : null}

        {activeTab === 'exits' ? (
          <ExitsPanel items={section.exits.items} note={section.exits.note} />
        ) : null}

        {activeTab === 'portfolio' ? (
          <PortfolioPanel groups={section.portfolio} />
        ) : null}
    </Section>
  );
}
