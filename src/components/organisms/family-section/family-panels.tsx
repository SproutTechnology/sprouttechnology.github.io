import styled from 'styled-components';
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
        {investments.map((item) => (
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
                {item.status === 'active' ? activeStatusLabel : exitedStatusLabel}
                {item.status === 'exited' ? ' ↑' : null}
              </InvestmentStatus>
            </div>
          </InvestmentRow>
        ))}
      </InvestmentList>
    </Panel>
  );
}

export function ExitsPanel({ items, note }: ExitsPanelProps): JSX.Element {
  return (
    <Panel role="tabpanel" id="family-panel-exits" aria-labelledby="family-tab-exits">
      <ExitGrid>
        {items.map((item) => (
          <ExitCard key={item.name}>
            <ExitArrow>↑</ExitArrow>
            <ExitName>{item.name}</ExitName>
            <ExitDescription>{item.description}</ExitDescription>
            <ExitTag>{item.tag}</ExitTag>
          </ExitCard>
        ))}
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
        {groups.map((group) => (
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
    </Panel>
  );
}
