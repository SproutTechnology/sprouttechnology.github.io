import styled from 'styled-components';
import type { SiteContent } from '../../../i18n/site-content';
import { LabelText } from '../../atoms/label-text/label-text';
import { FullWidthContainer, sectionBase } from '../../atoms/layout-primitives/layout-primitives';

const QuoteSection = styled.section`
  ${sectionBase}
`;

const QuoteMark = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.quoteMark.fontSize};
  line-height: ${({ theme }) => theme.typography.quoteMark.lineHeight};
  font-weight: ${({ theme }) => theme.typography.quoteMark.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.quoteMark.letterSpacing};
  color: ${({ theme }) => theme.color.primary};
`;

const QuoteText = styled.p`
  max-width: 800px;
  margin: 0;
  font-size: ${({ theme }) => theme.typography.quote.fontSize};
  line-height: ${({ theme }) => theme.typography.quote.lineHeight};
  font-weight: ${({ theme }) => theme.typography.quote.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.quote.letterSpacing};
`;

const QuoteAttribution = styled(LabelText).attrs({
  $tone: 'dim',
})`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xl};

  span {
    color: ${({ theme }) => theme.color.primary};
  }
`;

export function QuoteBlock({ content }: { content: SiteContent }): JSX.Element {
  return (
    <QuoteSection id="quote" data-section="quote">
      <FullWidthContainer>
        <QuoteMark>"</QuoteMark>
        <QuoteText>{content.quote.text}</QuoteText>
        <QuoteAttribution>
          {content.quote.source} <span>—</span> {content.quote.context}
        </QuoteAttribution>
      </FullWidthContainer>
    </QuoteSection>
  );
}
