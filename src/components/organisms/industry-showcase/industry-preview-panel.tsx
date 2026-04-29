import styled from "styled-components";
import type { IndustryItem } from "../../../i18n/site-content";
import { BodyText } from "../../atoms/body-text/body-text";
import { EyebrowText } from "../../atoms/eyebrow-text/eyebrow-text";
import { photographicImageStyles } from "../../atoms/image-treatment/image-treatment";
import { Heading3 } from "../../atoms/heading-3/heading-3";
import type { IndustryVisual } from "./industry-visuals";

interface IndustryPreviewPanelBodyProps {
  imageAlt: string;
  item: IndustryItem;
  previewEyebrowLabel: string;
  titleId?: string;
  visual: IndustryVisual;
}

interface IndustryDesktopPreviewProps extends IndustryPreviewPanelBodyProps {}

const IndustryPreview = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.9fr);
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: 28px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surface};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const IndustryPreviewMedia = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.color.overlay};
`;

const IndustryPreviewImage = styled.img`
  ${photographicImageStyles}
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const IndustryPreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  min-width: 0;
`;

const IndustryPreviewTop = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const IndustryPreviewEyebrow = styled(EyebrowText)`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "";
    width: 20px;
    height: 1px;
    background: currentColor;
  }
`;

const IndustryPreviewTitle = styled(Heading3)`
  font-size: clamp(26px, 4vw, 40px);
  line-height: 1;
  letter-spacing: -0.03em;
`;

const IndustryPreviewTag = styled(BodyText)`
  font-size: 14px;
  line-height: 1.8;
`;

export function IndustryDesktopPreview(props: IndustryDesktopPreviewProps): JSX.Element {
  return (
    <IndustryPreview id="industry-preview-panel" aria-live="polite">
      <IndustryPreviewPanelBody {...props} />
    </IndustryPreview>
  );
}

export function IndustryPreviewPanelBody({
  item,
  visual,
  imageAlt,
  previewEyebrowLabel,
  titleId,
}: IndustryPreviewPanelBodyProps): JSX.Element {
  return (
    <>
      <IndustryPreviewMedia>
        <IndustryPreviewImage src={visual.url} alt={imageAlt} loading="lazy" />
      </IndustryPreviewMedia>

      <IndustryPreviewContent>
        <IndustryPreviewTop>
          <IndustryPreviewEyebrow>{previewEyebrowLabel}</IndustryPreviewEyebrow>
          <IndustryPreviewTitle id={titleId}>{item.name}</IndustryPreviewTitle>
          <IndustryPreviewTag>{item.description}</IndustryPreviewTag>
        </IndustryPreviewTop>
      </IndustryPreviewContent>
    </>
  );
}
