import type { RefCallback } from 'react';
import styled from 'styled-components';
import type { ServiceItem } from '../../../i18n/site-content';
import { photographicImageStyles } from '../../atoms/image-treatment/image-treatment';
import { BodyText } from '../../atoms/body-text/body-text';
import { LabelText } from '../../atoms/label-text/label-text';
import type { ServiceVisual } from './service-visuals';

interface ServiceCardProps {
  actionLabel: string;
  isActive: boolean;
  item: ServiceItem;
  serviceRef: RefCallback<HTMLButtonElement>;
  visual: ServiceVisual;
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

const ServiceEyebrow = styled(LabelText).attrs({
  as: 'div',
  $tone: 'accent',
})`
  display: block;
`;

const ServiceSummary = styled(BodyText).attrs({
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

const ServiceNumber = styled(LabelText).attrs({
  as: 'div',
  $tone: 'accent',
})`
  display: block;
`;

const CardAction = styled(LabelText)<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.color.primary : theme.color.textMuted)};
  white-space: nowrap;
`;

export function ServiceCard({
  actionLabel,
  isActive,
  item,
  serviceRef,
  visual,
  onKeyDown,
  onOpen,
}: ServiceCardProps): JSX.Element {
  return (
    <Card
      ref={serviceRef}
      type="button"
      $active={isActive}
      aria-expanded={isActive}
      aria-haspopup="dialog"
      aria-controls="service-modal-panel"
      onClick={onOpen}
      onKeyDown={(event) => {
        if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          onKeyDown(event.key);
        }
      }}
    >
      <CardMedia>
        <CardImage src={visual.url} alt={visual.alt} loading="lazy" />
      </CardMedia>

      <CardContent>
        <ServiceEyebrow>{item.title}</ServiceEyebrow>
        <ServiceSummary>{item.cardSummary ?? item.summary}</ServiceSummary>
        <CardFooter>
          <ServiceNumber>{item.number}</ServiceNumber>
          <CardAction $active={isActive}>{actionLabel}</CardAction>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
