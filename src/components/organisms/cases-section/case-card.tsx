import type { RefCallback } from 'react';
import styled from 'styled-components';
import type { CaseStudyItem } from '../../../i18n/site-content';
import { BodyText } from '../../atoms/body-text/body-text';
import { photographicImageStyles } from '../../atoms/image-treatment/image-treatment';
import { LabelText } from '../../atoms/label-text/label-text';
import type { CaseVisual } from './case-visuals';

interface CaseCardProps {
  actionLabel: string;
  isActive: boolean;
  item: CaseStudyItem;
  leadLabel: string;
  caseRef: RefCallback<HTMLButtonElement>;
  visual: CaseVisual;
  onKeyDown: (key: string) => void;
  onOpen: () => void;
}

const Card = styled.button<{ $active: boolean }>`
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

const CardMedia = styled.div`
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.color.overlay};
  overflow: hidden;
`;

const CardImage = styled.img`
  ${photographicImageStyles}
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const CardContent = styled.div`
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

const CaseTitle = styled(BodyText).attrs({
  as: 'div',
  $size: 'large',
  $tone: 'default',
})``;

const CardFooter = styled.div`
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

const LeadBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xxs};
`;

const LeadLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
  $size: 'small',
})`
  display: block;
`;

const LeadName = styled(BodyText)`
  font-size: 13px;
  line-height: 1.5;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const CardAction = styled(LabelText)<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textMuted)};
  white-space: nowrap;
`;

export function CaseCard({
  actionLabel,
  isActive,
  item,
  leadLabel,
  caseRef,
  visual,
  onKeyDown,
  onOpen,
}: CaseCardProps): JSX.Element {
  return (
    <Card
      ref={caseRef}
      type="button"
      $active={isActive}
      aria-expanded={isActive}
      aria-haspopup="dialog"
      aria-controls="case-modal-panel"
      onClick={onOpen}
      onKeyDown={(event) => {
        if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          onKeyDown(event.key);
        }
      }}
    >
      <CardMedia>
        <CardImage src={visual.url} alt={item.imageAlt} loading="lazy" />
      </CardMedia>

      <CardContent>
        <CaseSector>{item.sector}</CaseSector>
        <CaseTitle>{item.title}</CaseTitle>
        <CardFooter>
          <LeadBlock>
            <LeadLabel>{leadLabel}</LeadLabel>
            <LeadName>{item.lead}</LeadName>
          </LeadBlock>
          <CardAction $active={isActive}>{actionLabel}</CardAction>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
