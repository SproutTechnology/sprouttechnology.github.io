import type { RefObject } from "react";
import styled, { css, keyframes } from "styled-components";
import type { IndustryItem } from "../../../i18n/site-content";
import { LabelText } from "../../atoms/label-text/label-text";
import { IndustryPreviewPanelBody } from "./industry-preview-panel";
import type { IndustryVisual } from "./industry-visuals";

interface IndustryMobileModalProps {
  closeButtonLabel: string;
  closeLabel: string;
  closeButtonRef: RefObject<HTMLButtonElement>;
  imageAlt: string;
  item: IndustryItem;
  previewEyebrowLabel: string;
  visual: IndustryVisual;
  onClose: () => void;
}

const modalOverlayAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const modalPanelAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const modalAnimationStyles = css`
  animation: ${modalPanelAnimation} 220ms ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const IndustryModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 240;
  display: grid;
  padding: 1rem;
  background: ${({ theme }) => theme.effect.scrim};
  backdrop-filter: blur(12px);
  animation: ${modalOverlayAnimation} 180ms ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const IndustryModalPanel = styled.article`
  ${modalAnimationStyles}
  position: relative;
  width: min(720px, 100%);
  max-height: 100%;
  margin: auto;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.effect.modalPanelSurface};
  box-shadow: ${({ theme }) => theme.effect.shadowLg};
`;

const IndustryModalTopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.effect.modalTopBar};
`;

const IndustryModalCloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.color.borderBright};
  background: ${({ theme }) => theme.effect.modalButtonSurface};
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
`;

const IndustryModalCloseIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-size: 20px;
  line-height: 1;
`;

const IndustryModalCloseLabel = styled(LabelText).attrs({
  as: "span",
  $tone: "default",
})`
  letter-spacing: 0.12em;
`;

const IndustryModalBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing["5xl"]};
`;

export function IndustryMobileModal({
  closeButtonLabel,
  closeButtonRef,
  closeLabel,
  imageAlt,
  item,
  previewEyebrowLabel,
  visual,
  onClose,
}: IndustryMobileModalProps): JSX.Element {
  return (
    <IndustryModalOverlay
      aria-hidden="false"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <IndustryModalPanel
        id="industry-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="industry-modal-title"
      >
        <IndustryModalTopBar>
          <IndustryModalCloseButton
            ref={closeButtonRef}
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <IndustryModalCloseIcon aria-hidden="true">×</IndustryModalCloseIcon>
            <IndustryModalCloseLabel>{closeButtonLabel}</IndustryModalCloseLabel>
          </IndustryModalCloseButton>
        </IndustryModalTopBar>

        <IndustryModalBody>
          <IndustryPreviewPanelBody
            item={item}
            visual={visual}
            imageAlt={imageAlt}
            previewEyebrowLabel={previewEyebrowLabel}
            titleId="industry-modal-title"
          />
        </IndustryModalBody>
      </IndustryModalPanel>
    </IndustryModalOverlay>
  );
}
