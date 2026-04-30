import styled from 'styled-components';
import type { CaseStudyItem } from '../../../i18n/site-content';
import { BodyText } from '../../atoms/body-text/body-text';
import { EyebrowText } from '../../atoms/eyebrow-text/eyebrow-text';
import { photographicImageStyles } from '../../atoms/image-treatment/image-treatment';
import { Heading3 } from '../../atoms/heading-3/heading-3';
import { LabelText } from '../../atoms/label-text/label-text';
import { Modal } from '../../molecules/modal';
import type { CaseVisual } from './case-visuals';

interface CaseModalLabels {
  approach: string;
  challenge: string;
  counterfactual: string;
  impact: string;
  lead: string;
  outcome: string;
  previewEyebrow: string;
}

interface CaseModalProps {
  closeButtonLabel: string;
  closeLabel: string;
  item: CaseStudyItem;
  labels: CaseModalLabels;
  visual: CaseVisual;
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

const PreviewEyebrow = styled(EyebrowText)`
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

const PreviewMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
`;

const PreviewMetaItem = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
})``;

const PreviewIntro = styled(BodyText)`
  max-width: 56ch;
  font-size: 15px;
  line-height: 1.9;
`;

const PreviewOutcome = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.background};
`;

const PreviewOutcomeLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'dim',
})`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const PreviewOutcomeText = styled(BodyText).attrs({
  $tone: 'default',
})``;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
  }
`;

const DetailBlock = styled.section`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.color.border};
`;

const DetailLabel = styled(LabelText).attrs({
  as: 'div',
  $tone: 'accent',
})`
  margin-bottom: 10px;
`;

const DetailBody = styled(BodyText)`
  font-size: 13px;
  line-height: 1.85;
`;

export function CaseModal({
  closeButtonLabel,
  closeLabel,
  item,
  labels,
  visual,
  onClose,
}: CaseModalProps): JSX.Element {
  return (
    <Modal
      panelId="case-modal-panel"
      labelledBy="case-modal-title"
      closeLabel={closeLabel}
      closeButtonLabel={closeButtonLabel}
      onClose={onClose}
    >
      <ModalBody>
        <PreviewMedia>
          <PreviewImage src={visual.url} alt={item.imageAlt} loading="lazy" />
        </PreviewMedia>

        <PreviewContent>
          <PreviewHeader>
            <PreviewEyebrow>{labels.previewEyebrow}</PreviewEyebrow>
            <PreviewTitle id="case-modal-title">{item.title}</PreviewTitle>
            <PreviewMeta>
              <PreviewMetaItem>{item.sector}</PreviewMetaItem>
              <PreviewMetaItem>
                {labels.lead} — {item.lead}
              </PreviewMetaItem>
            </PreviewMeta>
            <PreviewIntro>{item.description}</PreviewIntro>
          </PreviewHeader>

          <PreviewOutcome>
            <PreviewOutcomeLabel>{labels.outcome}</PreviewOutcomeLabel>
            <PreviewOutcomeText>{item.outcome}</PreviewOutcomeText>
          </PreviewOutcome>

          <DetailGrid>
            <DetailBlock>
              <DetailLabel>{labels.challenge}</DetailLabel>
              <DetailBody>{item.challenge}</DetailBody>
            </DetailBlock>

            <DetailBlock>
              <DetailLabel>{labels.approach}</DetailLabel>
              <DetailBody>{item.approach}</DetailBody>
            </DetailBlock>

            <DetailBlock>
              <DetailLabel>{labels.impact}</DetailLabel>
              <DetailBody>{item.impact}</DetailBody>
            </DetailBlock>

            {item.counterfactual ? (
              <DetailBlock>
                <DetailLabel>{labels.counterfactual}</DetailLabel>
                <DetailBody>{item.counterfactual}</DetailBody>
              </DetailBlock>
            ) : null}
          </DetailGrid>
        </PreviewContent>
      </ModalBody>
    </Modal>
  );
}
