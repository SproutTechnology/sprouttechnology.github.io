import styled from "styled-components";
import type { SiteContent } from "../../../i18n/site-content";
import { LabelText } from "../../atoms/label-text/label-text";
import { FullWidthContainer } from "../../atoms/layout-primitives/layout-primitives";

const StatsSection = styled.section`
  padding: 0;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  background: ${({ theme }) => theme.color.border};
  border: 1px solid ${({ theme }) => theme.color.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StatCell = styled.div`
  padding: 40px 32px;
  background: ${({ theme }) => theme.color.background};
`;

const StatValue = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.metricStat.fontSize};
  line-height: ${({ theme }) => theme.typography.metricStat.lineHeight};
  font-weight: ${({ theme }) => theme.typography.metricStat.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.metricStat.letterSpacing};
  color: ${({ theme }) => theme.color.primary};
`;

const StatLabel = styled(LabelText).attrs({
  $tone: "dim",
})`
  display: block;
  line-height: 1.4;
`;

export function StatsStrip({ content }: { content: SiteContent }): JSX.Element {
  return (
    <StatsSection id="stats" data-section="stats">
      <FullWidthContainer>
        <StatsRow>
          {content.stats.map((item) => (
            <StatCell key={item.label}>
              <StatValue>{item.value}</StatValue>
              <StatLabel>{item.label}</StatLabel>
            </StatCell>
          ))}
        </StatsRow>
      </FullWidthContainer>
    </StatsSection>
  );
}
