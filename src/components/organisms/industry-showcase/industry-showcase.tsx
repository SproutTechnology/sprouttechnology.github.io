import { useCallback, useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import type { SiteContent } from "../../../i18n/site-content";
import { useTranslation } from "../../../i18n/use-translation";
import { useAutoRotate } from "../../../hooks/use-auto-rotate";
import { useMobileViewport } from "../../../hooks/use-mobile-viewport";
import { useModalKeyboardLock } from "../../../hooks/use-modal-keyboard-lock";
import { LabelText } from "../../atoms/label-text/label-text";
import {
  FullWidthContainer,
  sectionBase,
} from "../../atoms/layout-primitives/layout-primitives";
import { SectionIntro } from "../../molecules/section-intro/section-intro";
import { IndustryCell } from "./industry-cell";
import { IndustryMobileModal } from "./industry-mobile-modal";
import { IndustryDesktopPreview } from "./industry-preview-panel";
import { getIndustryVisual } from "./industry-visuals";

const autoRotateIntervalMs = 6000;

const IndustrySection = styled.section`
  ${sectionBase}
`;

const IndustryCountBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const IndustryMetaRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxs};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: start;
  }
`;

const IndustryCount = styled.div`
  font-size: ${({ theme }) => theme.typography.metricIndustry.fontSize};
  line-height: ${({ theme }) => theme.typography.metricIndustry.lineHeight};
  font-weight: ${({ theme }) => theme.typography.metricIndustry.fontWeight};
  letter-spacing: ${({ theme }) =>
    theme.typography.metricIndustry.letterSpacing};
  color: ${({ theme }) =>
    theme.mode === "dark" ? theme.color.textDim : theme.color.text};
`;

const IndustryCountLabel = styled(LabelText).attrs({
  as: "div",
  $tone: "dim",
  $size: "large",
})``;

const IndustryLabelRow = styled(LabelText).attrs({
  as: "div",
  $tone: "dim",
  $size: "small",
})`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const IndustryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 1px;
  background: ${({ theme }) => theme.color.border};
  border: 1px solid ${({ theme }) => theme.color.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export function IndustryShowcase({
  content,
}: {
  content: SiteContent;
}): JSX.Element {
  const items = content.industries.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const industryButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobileViewport = useMobileViewport(theme.breakpoints.mobile);
  const activeItem = items[activeIndex];
  const activeVisual = activeItem ? getIndustryVisual(activeItem) : null;

  const focusIndustry = (index: number): void => {
    const boundedIndex = Math.max(0, Math.min(index, items.length - 1));

    setIsPaused(true);
    setActiveIndex(boundedIndex);
    industryButtonRefs.current[boundedIndex]?.focus();
  };

  const openIndustry = (index: number): void => {
    setIsPaused(true);
    setActiveIndex(index);
    lastTriggerRef.current = industryButtonRefs.current[index];

    if (isMobileViewport) {
      setIsMobileModalOpen(true);
    }
  };

  const closeIndustryModal = useCallback((): void => {
    setIsMobileModalOpen(false);
    lastTriggerRef.current?.focus();
  }, []);

  const rotateIndustry = useCallback((): void => {
    setActiveIndex((current) => (current + 1) % items.length);
  }, [items.length]);

  const handleIndustryKeyDown = (index: number, key: string): void => {
    if (key === "ArrowRight" || key === "ArrowDown") {
      focusIndustry(index + 1);
      return;
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      focusIndustry(index - 1);
      return;
    }

    if (key === "Home") {
      focusIndustry(0);
      return;
    }

    if (key === "End") {
      focusIndustry(items.length - 1);
    }
  };

  useEffect(() => {
    if (!isMobileViewport) {
      setIsMobileModalOpen(false);
    }
  }, [isMobileViewport]);

  useModalKeyboardLock(isMobileModalOpen, closeButtonRef, closeIndustryModal);
  useAutoRotate({
    disabled: isPaused || isMobileViewport,
    intervalMs: autoRotateIntervalMs,
    itemCount: items.length,
    onRotate: rotateIndustry,
  });

  return (
    <IndustrySection id="industries" data-section="industries">
      <FullWidthContainer>
        <SectionIntro
          number={content.industries.number}
          label={content.industries.eyebrow}
          title={content.industries.title}
          description={content.industries.description}
        />

        <IndustryMetaRow>
          <IndustryCountBlock>
            <IndustryCount>{content.industries.count}</IndustryCount>
            <IndustryCountLabel>
              {content.industries.countLabel}
            </IndustryCountLabel>
          </IndustryCountBlock>
          <IndustryLabelRow>{content.industries.label}</IndustryLabelRow>
        </IndustryMetaRow>

        <IndustryGrid>
          {items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <IndustryCell
                key={item.id}
                industryRef={(element) => {
                  industryButtonRefs.current[index] = element;
                }}
                isActive={isActive}
                isMobileModalOpen={isMobileModalOpen}
                isMobileViewport={isMobileViewport}
                item={item}
                onMouseEnter={() => {
                  if (isMobileViewport) {
                    return;
                  }

                  setIsPaused(true);
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  if (!isMobileViewport) {
                    setIsPaused(false);
                  }
                }}
                onFocus={() => {
                  if (isMobileViewport) {
                    return;
                  }

                  setIsPaused(true);
                  setActiveIndex(index);
                }}
                onBlur={() => {
                  if (!isMobileViewport) {
                    setIsPaused(false);
                  }
                }}
                onClick={() => {
                  openIndustry(index);
                }}
                onKeyDown={(key) => handleIndustryKeyDown(index, key)}
              />
            );
          })}
        </IndustryGrid>

        {!isMobileViewport && activeItem && activeVisual ? (
          <IndustryDesktopPreview
            item={activeItem}
            visual={activeVisual}
            imageAlt={t(activeVisual.altKey)}
            previewEyebrowLabel={t("ui.industries.previewEyebrow")}
          />
        ) : null}

        {isMobileViewport && isMobileModalOpen && activeItem && activeVisual ? (
          <IndustryMobileModal
            closeButtonLabel={t("ui.industries.closeButtonLabel")}
            closeButtonRef={closeButtonRef}
            closeLabel={t("ui.industries.closeIndustryLabel")}
            imageAlt={t(activeVisual.altKey)}
            item={activeItem}
            previewEyebrowLabel={t("ui.industries.previewEyebrow")}
            visual={activeVisual}
            onClose={closeIndustryModal}
          />
        ) : null}
      </FullWidthContainer>
    </IndustrySection>
  );
}
