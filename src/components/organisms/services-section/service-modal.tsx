import styled from 'styled-components';
import type { CallToAction, ServiceItem } from '../../../i18n/site-content';
import { BodyText } from '../../atoms/body-text/body-text';
import { buttonTextStyles } from '../../atoms/button-text/button-text';
import { photographicImageStyles } from '../../atoms/image-treatment/image-treatment';
import { Heading3 } from '../../atoms/heading-3/heading-3';
import { LabelText } from '../../atoms/label-text/label-text';
import { Modal } from '../../molecules/modal';
import type { ServiceVisual } from './service-visuals';

interface ServiceModalProps {
  callout: string;
  closeButtonLabel: string;
  closeLabel: string;
  cta: CallToAction;
  detailCardLabel: string;
  sectionLabel: string;
  service: ServiceItem;
  visual: ServiceVisual;
  onClose: () => void;
}

const ModalBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 40px;
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const PreviewMedia = styled.div`
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

const PreviewImage = styled.img`
  ${photographicImageStyles}
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const PreviewContent = styled.div`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing.xl};
  min-width: 0;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PreviewHeader = styled.div`
  display: grid;
  gap: 18px;
  min-width: 0;
  padding-right: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-right: 0;
  }
`;

const PreviewEyebrow = styled(LabelText).attrs({
  as: 'div',
  $tone: 'accent',
})`
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

const PreviewTitle = styled(Heading3)`
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.05;
  letter-spacing: -0.03em;
`;

const PreviewSummary = styled(BodyText)`
  max-width: 48ch;
  color: ${({ theme }) => theme.color.text};
  font-size: 18px;
  line-height: 1.6;
`;

const PreviewIntro = styled(BodyText)`
  max-width: 56ch;
  font-size: 15px;
  line-height: 1.9;
`;

const PreviewCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.background};
`;

const PreviewCardLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
})`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const PreviewCardBody = styled(BodyText)`
  font-size: 13px;
`;

const ContactAction = styled.a`
  ${buttonTextStyles}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.primary};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.background};
  }
`;

export function ServiceModal({
  callout,
  closeButtonLabel,
  closeLabel,
  cta,
  detailCardLabel,
  sectionLabel,
  service,
  visual,
  onClose,
}: ServiceModalProps): JSX.Element {
  return (
    <Modal
      panelId="service-modal-panel"
      labelledBy="service-modal-title"
      closeLabel={closeLabel}
      closeButtonLabel={closeButtonLabel}
      onClose={onClose}
    >
      <ModalBody>
        <PreviewMedia>
          <PreviewImage src={visual.url} alt={visual.alt} loading="lazy" />
        </PreviewMedia>

        <PreviewContent>
          <PreviewHeader>
            <PreviewEyebrow>
              {sectionLabel} — {service.number}
            </PreviewEyebrow>
            <PreviewTitle id="service-modal-title">{service.title}</PreviewTitle>
            {service.cardSummary ? <PreviewSummary>{service.summary}</PreviewSummary> : null}
            <PreviewIntro>{service.body}</PreviewIntro>
          </PreviewHeader>

          <PreviewCard>
            <PreviewCardLabel>{detailCardLabel}</PreviewCardLabel>
            <PreviewCardBody>{callout}</PreviewCardBody>
            <ContactAction href={cta.href} onClick={onClose}>
              {cta.label}
            </ContactAction>
          </PreviewCard>
        </PreviewContent>
      </ModalBody>
    </Modal>
  );
}
