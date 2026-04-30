import styled, { css } from 'styled-components';
import type {
  FamilyExitItem,
  FamilyInvestmentItem,
  FamilyPortfolioGroup,
} from '../../../i18n/site-content';
import { BodyText } from '../../atoms/body-text/body-text';
import { LabelText } from '../../atoms/label-text/label-text';

interface InvestmentsPanelProps {
  activeStatusLabel: string;
  exitedStatusLabel: string;
  investments: FamilyInvestmentItem[];
}

interface ExitsPanelProps {
  items: FamilyExitItem[];
  note: string;
}

interface PortfolioPanelProps {
  groups: FamilyPortfolioGroup[];
}

const Panel = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-top: none;
`;

const readableItemFocusStyles = css`
  position: relative;
  transition:
    background 0.15s ease,
    outline-color 0.15s ease;

  &:focus-visible {
    z-index: 1;
    outline: 1px solid ${({ theme }) => theme.color.primary};
    outline-offset: -1px;
    background: ${({ theme }) => theme.color.surface};
  }
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const InvestmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: ${({ theme }) => theme.color.border};
`;

const InvestmentRow = styled.article`
  ${readableItemFocusStyles}
  display: grid;
  grid-template-columns: 140px 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.color.background};

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
  color: ${({ theme, $status }) =>
    $status === 'active' ? theme.color.primary : theme.color.textDim};
  border-color: ${({ theme, $status }) =>
    $status === 'active' ? theme.color.primaryDim : theme.color.borderBright};
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
  ${readableItemFocusStyles}
  padding: 32px 28px;
  background: ${({ theme }) => theme.color.background};

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
  ${readableItemFocusStyles}
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
  transition:
    border-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.primary};
  }
`;

export function InvestmentsPanel({
  activeStatusLabel,
  exitedStatusLabel,
  investments,
}: InvestmentsPanelProps): JSX.Element {
  return (
    <Panel role="tabpanel" id="family-panel-investments" aria-labelledby="family-tab-investments">
      <InvestmentList>
        {investments.map((item, index) => {
          const companyId = `family-investment-company-${index}`;
          const descriptionId = `family-investment-description-${index}`;
          const statusId = `family-investment-status-${index}`;
          const statusLabel =
            item.status === 'active' ? activeStatusLabel : exitedStatusLabel;

          return (
            <InvestmentRow
              key={item.name}
              role="group"
              tabIndex={0}
              aria-labelledby={companyId}
              aria-describedby={`${descriptionId} ${statusId}`}
            >
              <div>
                <InvestmentCompany id={companyId}>{item.name}</InvestmentCompany>
                <InvestmentSector>{item.sector}</InvestmentSector>
              </div>

              <div>
                <InvestmentDescription id={descriptionId}>
                  {item.description}
                </InvestmentDescription>
                <InvestmentBarWrap aria-hidden="true">
                  <InvestmentBar $progress={item.progress} />
                </InvestmentBarWrap>
              </div>

              <div>
                <InvestmentStatus id={statusId} $status={item.status}>
                  {statusLabel}
                  {item.status === 'exited' ? (
                    <span aria-hidden="true"> ↑</span>
                  ) : null}
                </InvestmentStatus>
              </div>
            </InvestmentRow>
          );
        })}
      </InvestmentList>
    </Panel>
  );
}

export function ExitsPanel({ items, note }: ExitsPanelProps): JSX.Element {
  return (
    <Panel role="tabpanel" id="family-panel-exits" aria-labelledby="family-tab-exits">
      <ExitGrid>
        {items.map((item, index) => {
          const exitNameId = `family-exit-name-${index}`;
          const exitDescriptionId = `family-exit-description-${index}`;
          const exitTagId = `family-exit-tag-${index}`;

          return (
            <ExitCard
              key={item.name}
              role="group"
              tabIndex={0}
              aria-labelledby={exitNameId}
              aria-describedby={`${exitDescriptionId} ${exitTagId}`}
            >
              <ExitArrow aria-hidden="true">↑</ExitArrow>
              <ExitName id={exitNameId}>{item.name}</ExitName>
              <ExitDescription id={exitDescriptionId}>
                {item.description}
              </ExitDescription>
              <ExitTag id={exitTagId}>{item.tag}</ExitTag>
            </ExitCard>
          );
        })}
      </ExitGrid>
      <ExitNote>
        <ExitNoteBody>{note}</ExitNoteBody>
      </ExitNote>
    </Panel>
  );
}

export function PortfolioPanel({ groups }: PortfolioPanelProps): JSX.Element {
  return (
    <Panel role="tabpanel" id="family-panel-portfolio" aria-labelledby="family-tab-portfolio">
      <PortfolioWrap>
        {groups.map((group, index) => {
          const labelId = `family-portfolio-label-${index}`;
          const companiesId = `family-portfolio-companies-${index}`;

          return (
            <PortfolioGroupRow
              key={group.label}
              role="group"
              tabIndex={0}
              aria-labelledby={labelId}
              aria-describedby={companiesId}
            >
              <PortfolioGroupLabel id={labelId}>{group.label}</PortfolioGroupLabel>
              <PortfolioTags>
                <VisuallyHidden id={companiesId}>
                  {group.companies.join(', ')}
                </VisuallyHidden>
                {group.companies.map((company) => (
                  <PortfolioTag key={`${group.label}-${company}`}>
                    {company}
                  </PortfolioTag>
                ))}
              </PortfolioTags>
            </PortfolioGroupRow>
          );
        })}
      </PortfolioWrap>
    </Panel>
  );
}
