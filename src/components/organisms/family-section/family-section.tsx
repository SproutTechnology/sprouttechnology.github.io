import { useRef, useState } from 'react';
import styled from 'styled-components';
import type { FamilyTabId, SiteContent } from '../../../i18n/site-content';
import { useTranslation } from '../../../i18n/use-translation';
import { BodyText } from '../../atoms/body-text/body-text';
import { LabelText } from '../../atoms/label-text/label-text';
import { sectionBase } from '../../atoms/layout-primitives/layout-primitives';
import { SectionIntro } from '../../molecules/section-intro/section-intro';

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

const FamilyTabs = styled.div`
  display: flex;
  gap: 0;
  border-left: 1px solid ${({ theme }) => theme.color.border};
  border-top: 1px solid ${({ theme }) => theme.color.border};
  border-right: 1px solid ${({ theme }) => theme.color.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const FamilyTabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 16px 20px;
  background: ${({ theme }) => theme.color.background};
  border: none;
  border-right: 1px solid ${({ theme }) => theme.color.border};
  border-bottom: 1px solid ${({ theme, $active }) => ($active ? theme.color.background : theme.color.border)};
  color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textDim)};
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${({ theme }) => theme.color.surface};
    color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textMuted)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 0;
    padding: 14px 12px;
  }
`;

const FamilyTabCount = styled.span<{ $active: boolean }>`
  display: block;
  margin-bottom: 6px;
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
  color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textDim)};
  transition: color 0.15s ease;
`;

const FamilyTabLabel = styled(LabelText).attrs({
  as: 'span',
  $tone: 'default',
})<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textDim)};
`;

const FamilyPanel = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-top: none;
`;

const InvestmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: ${({ theme }) => theme.color.border};
`;

const InvestmentRow = styled.article`
  display: grid;
  grid-template-columns: 140px 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.color.background};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.color.surface};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const InvestmentCompany = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const InvestmentSector = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
  $size: 'small',
})`
  margin-top: ${({ theme }) => theme.spacing.xxs};
`;

const InvestmentDescription = styled(BodyText)`
  font-size: 12px;
  line-height: 1.6;
`;

const InvestmentBarWrap = styled.div`
  height: 2px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.color.border};
`;

const InvestmentBar = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  background: ${({ theme }) => theme.color.primary};
`;

const InvestmentStatus = styled.span<{ $status: 'active' | 'exited' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: 1px solid;
  color: ${({ theme, $status }) => ($status === 'active' ? theme.color.primary : theme.color.textDim)};
  border-color: ${({ theme, $status }) => ($status === 'active' ? theme.color.primaryDim : theme.color.borderBright)};
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
`;

const ExitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: ${({ theme }) => theme.color.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ExitCard = styled.article`
  padding: 32px 28px;
  background: ${({ theme }) => theme.color.background};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.color.surface};
  }
`;

const ExitArrow = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.color.primary};
  font-size: 20px;
`;

const ExitName = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const ExitDescription = styled(BodyText)`
  font-size: 12px;
  color: ${({ theme }) => theme.color.textDim};
  line-height: 1.7;
`;

const ExitTag = styled(LabelText).attrs({
  as: 'span',
  $tone: 'accent',
  $size: 'small',
})`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.color.primaryDim};
  padding-bottom: 2px;
`;

const ExitNote = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.color.background};
  border-top: 1px solid ${({ theme }) => theme.color.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ExitNoteBody = styled(BodyText)`
  font-size: 12px;
  color: ${({ theme }) => theme.color.textDim};
  font-style: italic;
`;

const PortfolioWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: ${({ theme }) => theme.color.border};
`;

const PortfolioGroupRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  background: ${({ theme }) => theme.color.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const PortfolioGroupLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'accent',
})`
  display: flex;
  align-items: center;
  padding: 24px 28px;
  border-right: 1px solid ${({ theme }) => theme.color.border};
  line-height: 1.5;
  white-space: pre-line;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
`;

const PortfolioTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  align-content: center;
  padding: 20px 28px;
`;

const PortfolioTag = styled.span`
  padding: 5px 12px;
  border: 1px solid ${({ theme }) => theme.color.borderBright};
  color: ${({ theme }) => theme.color.textMuted};
  font-size: 12px;
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.primary};
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

      <FamilyTabs role="tablist" aria-label={section.label}>
          {section.tabs.map((tab, index) => {
            const isActive = tab.id === activeTab;

            return (
              <FamilyTabButton
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`family-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`family-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                $active={isActive}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => {
                  if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                    event.preventDefault();
                    handleTabKeyDown(index, event.key);
                  }
                }}
              >
                <FamilyTabCount $active={isActive}>{tab.count}</FamilyTabCount>
                <FamilyTabLabel $active={isActive}>{tab.label}</FamilyTabLabel>
              </FamilyTabButton>
            );
          })}
        </FamilyTabs>

        {activeTab === 'investments' ? (
          <FamilyPanel
            role="tabpanel"
            id="family-panel-investments"
            aria-labelledby="family-tab-investments"
          >
            <InvestmentList>
              {section.investments.map((item) => (
                <InvestmentRow key={item.name}>
                  <div>
                    <InvestmentCompany>{item.name}</InvestmentCompany>
                    <InvestmentSector>{item.sector}</InvestmentSector>
                  </div>

                  <div>
                    <InvestmentDescription>{item.description}</InvestmentDescription>
                    <InvestmentBarWrap>
                      <InvestmentBar $progress={item.progress} />
                    </InvestmentBarWrap>
                  </div>

                  <div>
                    <InvestmentStatus $status={item.status}>
                      {item.status === 'active' ? t('ui.family.status.active') : t('ui.family.status.exited')}
                      {item.status === 'exited' ? ' ↑' : null}
                    </InvestmentStatus>
                  </div>
                </InvestmentRow>
              ))}
            </InvestmentList>
          </FamilyPanel>
        ) : null}

        {activeTab === 'exits' ? (
          <FamilyPanel role="tabpanel" id="family-panel-exits" aria-labelledby="family-tab-exits">
            <ExitGrid>
              {section.exits.items.map((item) => (
                <ExitCard key={item.name}>
                  <ExitArrow>↑</ExitArrow>
                  <ExitName>{item.name}</ExitName>
                  <ExitDescription>{item.description}</ExitDescription>
                  <ExitTag>{item.tag}</ExitTag>
                </ExitCard>
              ))}
            </ExitGrid>
            <ExitNote>
              <ExitNoteBody>{section.exits.note}</ExitNoteBody>
            </ExitNote>
          </FamilyPanel>
        ) : null}

        {activeTab === 'portfolio' ? (
          <FamilyPanel role="tabpanel" id="family-panel-portfolio" aria-labelledby="family-tab-portfolio">
            <PortfolioWrap>
              {section.portfolio.map((group) => (
                <PortfolioGroupRow key={group.label}>
                  <PortfolioGroupLabel>{group.label}</PortfolioGroupLabel>
                  <PortfolioTags>
                    {group.companies.map((company) => (
                      <PortfolioTag key={`${group.label}-${company}`}>{company}</PortfolioTag>
                    ))}
                  </PortfolioTags>
                </PortfolioGroupRow>
              ))}
            </PortfolioWrap>
          </FamilyPanel>
        ) : null}
    </Section>
  );
}
