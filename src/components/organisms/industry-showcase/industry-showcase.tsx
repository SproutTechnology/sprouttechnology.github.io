import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes, useTheme } from "styled-components";
import { photographicImageStyles } from "../../atoms/image-treatment/image-treatment";
import type {
  IndustryId,
  IndustryItem,
  SiteContent,
} from "../../../i18n/site-content";
import { useTranslation } from "../../../i18n/use-translation";
import { BodyText } from "../../atoms/body-text/body-text";
import { CaptionText } from "../../atoms/caption-text/caption-text";
import { EyebrowText } from "../../atoms/eyebrow-text/eyebrow-text";
import { LabelText } from "../../atoms/label-text/label-text";
import { Heading3 } from "../../atoms/heading-3/heading-3";
import {
  FullWidthContainer,
  sectionBase,
} from "../../atoms/layout-primitives/layout-primitives";
import { SectionIntro } from "../../molecules/section-intro/section-intro";

interface IndustryVisual {
  altKey: string;
  sourceUrl: string;
  url: string;
}

const unsplashParams = "auto=format&fit=crop&crop=entropy&w=1600&h=1000&q=80";
const autoRotateIntervalMs = 6000;

function buildUnsplashUrl(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?${unsplashParams}`;
}

const fallbackIndustryVisual: IndustryVisual = {
  altKey: "ui.industries.visuals.fallback.alt",
  sourceUrl: "https://unsplash.com/s/photos/technology",
  url: buildUnsplashUrl("photo-1550751827-4bd374c3f58b"),
};

const industryVisuals: Record<IndustryId, IndustryVisual> = {
  "automotive-ev": {
    altKey: "ui.industries.visuals.automotiveEv.alt",
    sourceUrl: "https://unsplash.com/s/photos/electric-vehicle",
    url: buildUnsplashUrl("photo-1619795080845-d59e11988633"),
  },
  cybersecurity: {
    altKey: "ui.industries.visuals.cybersecurity.alt",
    sourceUrl: "https://unsplash.com/s/photos/cybersecurity",
    url: buildUnsplashUrl("photo-1550751827-4bd374c3f58b"),
  },
  "health-femtech": {
    altKey: "ui.industries.visuals.healthFemtech.alt",
    sourceUrl: "https://unsplash.com/s/photos/health-technology",
    url: buildUnsplashUrl("photo-1527689368864-3a821dbccc34"),
  },
  "med-tech": {
    altKey: "ui.industries.visuals.medTech.alt",
    sourceUrl: "https://unsplash.com/s/photos/medical-technology",
    url: buildUnsplashUrl("photo-1511174511562-5f7f18b874f8"),
  },
  pharma: {
    altKey: "ui.industries.visuals.pharma.alt",
    sourceUrl: "https://unsplash.com/s/photos/pharmaceutical-lab",
    url: buildUnsplashUrl("photo-1579154392128-bf8c7ebee541"),
  },
  "banking-fintech": {
    altKey: "ui.industries.visuals.bankingFintech.alt",
    sourceUrl: "https://unsplash.com/s/photos/fintech",
    url: buildUnsplashUrl("photo-1563013544-824ae1b704d3"),
  },
  "consumer-retail": {
    altKey: "ui.industries.visuals.consumerRetail.alt",
    sourceUrl: "https://unsplash.com/s/photos/retail-display",
    url: buildUnsplashUrl("photo-1619617257069-3dc8f124c512"),
  },
  fashion: {
    altKey: "ui.industries.visuals.fashion.alt",
    sourceUrl: "https://unsplash.com/s/photos/fashion-store",
    url: buildUnsplashUrl("photo-1546213290-e1b492ab3eee"),
  },
  "energy-cleantech": {
    altKey: "ui.industries.visuals.energyCleantech.alt",
    sourceUrl: "https://unsplash.com/s/photos/clean-energy-technology",
    url: buildUnsplashUrl("photo-1589201529153-5297335c1684"),
  },
  "industrial-automation": {
    altKey: "ui.industries.visuals.industrialAutomation.alt",
    sourceUrl: "https://unsplash.com/s/photos/industrial-machinery",
    url: buildUnsplashUrl("photo-1716191299980-a6e8827ba10b"),
  },
  proptech: {
    altKey: "ui.industries.visuals.proptech.alt",
    sourceUrl: "https://unsplash.com/s/photos/office-building",
    url: buildUnsplashUrl("photo-1486406146926-c627a92ad1ab"),
  },
  "media-publishing": {
    altKey: "ui.industries.visuals.mediaPublishing.alt",
    sourceUrl: "https://unsplash.com/s/photos/publishing",
    url: buildUnsplashUrl("photo-1659141170537-6e0aa70329a4"),
  },
  sportstech: {
    altKey: "ui.industries.visuals.sportstech.alt",
    sourceUrl: "https://unsplash.com/s/photos/sport-technology",
    url: buildUnsplashUrl("photo-1434494878577-86c23bcb06b9"),
  },
  "supply-chain": {
    altKey: "ui.industries.visuals.supplyChain.alt",
    sourceUrl: "https://unsplash.com/s/photos/supply-chain",
    url: buildUnsplashUrl("photo-1712408213231-a1d8a3be1104"),
  },
};

function getIndustryVisual(item: IndustryItem): IndustryVisual {
  return industryVisuals[item.id] ?? fallbackIndustryVisual;
}

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

const IndustryDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.borderBright};
  margin-bottom: 20px;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
`;

const IndustryName = styled(CaptionText).attrs({
  as: "span",
  $tone: "muted",
  $size: "default",
})`
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  line-height: 1.3;
  transition: color 0.15s ease;
`;

const IndustryTag = styled(LabelText).attrs<{
  $status: IndustryItem["status"];
}>({
  as: "span",
  $size: "small",
})<{ $status: IndustryItem["status"] }>`
  color: ${({ theme, $status }) =>
    $status === "client" ? theme.color.textDim : theme.color.primaryDim};
  letter-spacing: 0.12em;
  transition: color 0.15s ease;
`;

const IndustryUnderline = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background: ${({ theme }) => theme.color.primary};
  transition: width 0.3s ease;
`;

const IndustryCell = styled.button<{ $active: boolean }>`
  position: relative;
  overflow: hidden;
  padding: 28px 20px 24px;
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.color.overlay : theme.color.background};
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.color.surface};
  }

  &:hover ${IndustryName}, &[aria-pressed="true"] ${IndustryName} {
    color: ${({ theme, $active }) =>
      $active ? theme.color.primary : theme.color.text};
  }

  &:hover ${IndustryDot}, &[aria-pressed="true"] ${IndustryDot} {
    background: ${({ theme }) => theme.color.primary};
    transform: scale(1.4);
  }

  &:hover ${IndustryUnderline}, &[aria-pressed="true"] ${IndustryUnderline} {
    width: 100%;
  }

  &[aria-pressed="true"] ${IndustryTag} {
    color: ${({ theme }) => theme.color.primaryDim};
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
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const industryButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const { t } = useTranslation();
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

  const closeIndustryModal = (): void => {
    setIsMobileModalOpen(false);
    lastTriggerRef.current?.focus();
  };

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
    const handleResize = (): void => {
      setIsMobileViewport(getIsMobileViewport(theme.breakpoints.mobile));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [theme.breakpoints.mobile]);

  useEffect(() => {
    if (!isMobileViewport) {
      setIsMobileModalOpen(false);
    }
  }, [isMobileViewport]);

  useEffect(() => {
    if (!isMobileModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        closeIndustryModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileModalOpen]);

  useEffect(() => {
    if (isPaused || items.length === 0 || isMobileViewport) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, autoRotateIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [isPaused, isMobileViewport, items.length]);

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
                ref={(element) => {
                  industryButtonRefs.current[index] = element;
                }}
                type="button"
                $active={isActive}
                aria-pressed={isActive}
                aria-controls={
                  isMobileViewport
                    ? "industry-modal-panel"
                    : "industry-preview-panel"
                }
                aria-expanded={
                  isMobileViewport ? isMobileModalOpen && isActive : undefined
                }
                aria-haspopup={isMobileViewport ? "dialog" : undefined}
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
                onKeyDown={(event) => {
                  if (
                    [
                      "ArrowRight",
                      "ArrowDown",
                      "ArrowLeft",
                      "ArrowUp",
                      "Home",
                      "End",
                    ].includes(event.key)
                  ) {
                    event.preventDefault();
                    handleIndustryKeyDown(index, event.key);
                  }
                }}
              >
                <IndustryDot />
                <IndustryName>{item.name}</IndustryName>
                <IndustryTag $status={item.status}>{item.tag}</IndustryTag>
                <IndustryUnderline />
              </IndustryCell>
            );
          })}
        </IndustryGrid>

        {!isMobileViewport && activeItem && activeVisual ? (
          <IndustryPreview id="industry-preview-panel" aria-live="polite">
            <IndustryPreviewPanelBody
              item={activeItem}
              visual={activeVisual}
              imageAlt={t(activeVisual.altKey)}
              previewEyebrowLabel={t("ui.industries.previewEyebrow")}
            />
          </IndustryPreview>
        ) : null}

        {isMobileViewport && isMobileModalOpen && activeItem && activeVisual ? (
          <IndustryModalOverlay
            aria-hidden="false"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeIndustryModal();
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
                  aria-label={t("ui.industries.closeIndustryLabel")}
                  onClick={closeIndustryModal}
                >
                  <IndustryModalCloseIcon aria-hidden="true">
                    ×
                  </IndustryModalCloseIcon>
                  <IndustryModalCloseLabel>
                    {t("ui.industries.closeButtonLabel")}
                  </IndustryModalCloseLabel>
                </IndustryModalCloseButton>
              </IndustryModalTopBar>

              <IndustryModalBody>
                <IndustryPreviewPanelBody
                  item={activeItem}
                  visual={activeVisual}
                  imageAlt={t(activeVisual.altKey)}
                  previewEyebrowLabel={t("ui.industries.previewEyebrow")}
                  titleId="industry-modal-title"
                />
              </IndustryModalBody>
            </IndustryModalPanel>
          </IndustryModalOverlay>
        ) : null}
      </FullWidthContainer>
    </IndustrySection>
  );
}

interface IndustryPreviewPanelBodyProps {
  item: IndustryItem;
  visual: IndustryVisual;
  imageAlt: string;
  previewEyebrowLabel: string;
  titleId?: string;
}

function IndustryPreviewPanelBody({
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

function getIsMobileViewport(mobileBreakpoint: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const breakpointValue = Number.parseInt(mobileBreakpoint, 10);

  if (Number.isNaN(breakpointValue)) {
    return false;
  }

  return window.innerWidth <= breakpointValue;
}
