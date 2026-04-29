import { type ReactNode, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { LabelText } from '../../atoms/label-text/label-text';

interface ModalProps {
  children: ReactNode;
  closeButtonLabel: string;
  closeLabel: string;
  labelledBy: string;
  panelId: string;
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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 240;
  display: grid;
  padding: 3rem;
  background: ${({ theme }) => theme.effect.scrim};
  backdrop-filter: blur(12px);
  animation: ${modalOverlayAnimation} 180ms ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const ModalPanel = styled.article`
  ${modalAnimationStyles}
  position: relative;
  width: min(1280px, 100%);
  max-height: 100%;
  margin: auto;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.effect.modalPanelSurface};
  box-shadow: ${({ theme }) => theme.effect.shadowLg};
`;

const ModalTopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.effect.modalTopBar};
`;

const CloseButton = styled.button`
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

const CloseButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-size: 20px;
  line-height: 1;
`;

const CloseButtonLabel = styled(LabelText).attrs({
  as: 'span',
  $tone: 'default',
})`
  letter-spacing: 0.12em;
`;

export function Modal({
  children,
  closeButtonLabel,
  closeLabel,
  labelledBy,
  panelId,
  onClose,
}: ModalProps): JSX.Element {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <ModalOverlay
      aria-hidden="false"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <ModalPanel id={panelId} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        <ModalTopBar>
          <CloseButton ref={closeButtonRef} type="button" aria-label={closeLabel} onClick={onClose}>
            <CloseButtonIcon aria-hidden="true">×</CloseButtonIcon>
            <CloseButtonLabel>{closeButtonLabel}</CloseButtonLabel>
          </CloseButton>
        </ModalTopBar>

        {children}
      </ModalPanel>
    </ModalOverlay>
  );
}
