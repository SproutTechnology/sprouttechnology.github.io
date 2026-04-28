import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes, useTheme } from "styled-components";
import type { SiteContent } from "../../../i18n/site-content";
import { BodyText } from "../../atoms/body-text/body-text";
import { buttonTextStyles } from "../../atoms/button-text/button-text";
import { LabelText } from "../../atoms/label-text/label-text";
import { Heading1 } from "../../atoms/heading-1/heading-1";
import {
  Eyebrow,
  pageWidth,
} from "../../atoms/layout-primitives/layout-primitives";

const contourLevels = 12;
const contourStep = 8;

const heroFadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const heroFadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

interface HeroEntranceProps {
  $entered: boolean;
}

const heroEntrance = (delayMs: number) => css<HeroEntranceProps>`
  opacity: 0;
  transform: translateY(18px);

  ${({ $entered }) =>
    $entered &&
    css`
      animation: ${heroFadeUp} 680ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms forwards;
    `}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    animation: none;
  }
`;

const HeroSection = styled.section`
  position: relative;
  width: 100vw;
  min-height: clamp(620px, 82vh, 760px);
  margin-left: calc(50% - 50vw);
  overflow: hidden;
  background: ${({ theme }) => theme.color.background};
  isolation: isolate;

  @media (min-width: 1440px) {
    min-height: clamp(560px, 72vh, 680px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: auto;
  }
`;

const HeroCanvas = styled.canvas<HeroEntranceProps>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0;

  ${({ $entered }) =>
    $entered &&
    css`
      animation: ${heroFadeIn} 960ms ease 80ms forwards;
    `}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const HeroInner = styled.div`
  ${pageWidth}
  position: relative;
  z-index: 2;
  padding: 152px 0 112px;

  @media (min-width: 1440px) {
    padding: 120px 0 104px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 120px 0 72px;
  }
`;

const HeroEyebrow = styled(Eyebrow)<HeroEntranceProps>`
  ${heroEntrance(120)}
`;

const HeroHeading = styled(Heading1)<HeroEntranceProps>`
  ${heroEntrance(200)}
  max-width: 900px;
  margin-bottom: 48px;
`;

const HeroMutedLine = styled.em`
  color: ${({ theme }) => theme.color.textMuted};
  font-style: normal;
  font-weight: 300;
`;

const HeroBody = styled(BodyText)<HeroEntranceProps>`
  ${heroEntrance(290)}
  max-width: 680px;
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
`;

const ActionRow = styled.div<HeroEntranceProps>`
  ${heroEntrance(360)}
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const PrimaryButton = styled.a`
  ${buttonTextStyles}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border: none;
  background: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.background};
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.status.primaryHover};
  }
`;

const SecondaryButton = styled.a`
  ${buttonTextStyles}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12.5px 32px;
  border-style: inset;
  border: 1px solid ${({ theme }) => theme.color.borderBright};
  color: ${({ theme }) => theme.color.textMuted};
  text-decoration: none;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.color.textMuted};
    color: ${({ theme }) => theme.color.text};
    background: #e4e4e4;
  }
`;

const HeroCounter = styled.div<HeroEntranceProps>`
  ${heroEntrance(440)}
  position: absolute;
  right: 0;
  bottom: ${({ theme }) => theme.spacing["2xl"]};
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const CounterValue = styled.div`
  font-size: ${({ theme }) => theme.typography.metricHero.fontSize};
  line-height: ${({ theme }) => theme.typography.metricHero.lineHeight};
  font-weight: ${({ theme }) => theme.typography.metricHero.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.metricHero.letterSpacing};
  color: ${({ theme }) =>
    theme.mode === "dark" ? theme.color.textDim : theme.color.text};
`;

const CounterLabel = styled(LabelText).attrs({
  $tone: "dim",
})``;

export function Hero({ content }: { content: SiteContent }): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    let firstFrameId = 0;
    let secondFrameId = 0;

    firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        setHasEntered(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      window.cancelAnimationFrame(secondFrameId);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas || typeof window === "undefined") {
      return;
    }

    const context = getCanvasContext(canvas);

    if (!context) {
      return;
    }

    let animationFrameId = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let time = 0;
    let devicePixelRatio = window.devicePixelRatio || 1;
    let prefersReducedMotion = getPrefersReducedMotion();

    const primaryBlue = hexToRgb(theme.color.primary) ?? {
      r: 43,
      g: 117,
      b: 212,
    };

    const mouse = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };

    const resize = (): void => {
      if (!section || !canvas) {
        return;
      }

      canvasWidth = section.offsetWidth;
      canvasHeight = section.offsetHeight;
      devicePixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.round(canvasWidth * devicePixelRatio));
      canvas.height = Math.max(1, Math.round(canvasHeight * devicePixelRatio));
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent): void => {
      const rect = section.getBoundingClientRect();
      const width = rect.width || 1;
      const height = rect.height || 1;

      mouse.x = clamp((event.clientX - rect.left) / width, 0, 1);
      mouse.y = clamp((event.clientY - rect.top) / height, 0, 1);
    };

    const handlePointerLeave = (): void => {
      mouse.x = 0.5;
      mouse.y = 0.5;
    };

    const field = (x: number, y: number): number => {
      const nx = x / canvasWidth;
      const ny = y / canvasHeight;
      let value =
        Math.sin(nx * 4.0 + time * 0.14) * Math.cos(ny * 3.4 - time * 0.11) +
        Math.sin(nx * 2.0 - ny * 2.5 + time * 0.09) * 0.8 +
        Math.cos(nx * 6.0 + ny * 4.0 - time * 0.17) * 0.4 +
        Math.sin(nx * 1.6 + ny * 5.0 + time * 0.07) * 0.5;

      const deltaX = nx - smooth.x;
      const deltaY = ny - smooth.y;
      value += Math.exp(-(deltaX * deltaX + deltaY * deltaY) * 14) * 2.4;

      return value;
    };

    const drawContour = (
      threshold: number,
      strokeStyle: string,
      lineWidth: number,
    ): void => {
      context.beginPath();
      context.strokeStyle = strokeStyle;
      context.lineWidth = lineWidth;

      for (
        let x = contourStep;
        x < canvasWidth - contourStep;
        x += contourStep
      ) {
        for (
          let y = contourStep;
          y < canvasHeight - contourStep;
          y += contourStep
        ) {
          const value00 = field(x, y);
          const value10 = field(x + contourStep, y);
          const value01 = field(x, y + contourStep);

          if ((value00 - threshold) * (value10 - threshold) < 0) {
            const intersectionX =
              x + contourStep * ((threshold - value00) / (value10 - value00));
            context.moveTo(intersectionX, y);
            context.lineTo(intersectionX, y + 1);
          }

          if ((value00 - threshold) * (value01 - threshold) < 0) {
            const intersectionY =
              y + contourStep * ((threshold - value00) / (value01 - value00));
            context.moveTo(x, intersectionY);
            context.lineTo(x + 1, intersectionY);
          }
        }
      }

      context.stroke();
    };

    const drawFrame = (): void => {
      if (canvasWidth === 0 || canvasHeight === 0) {
        return;
      }

      smooth.x += (mouse.x - smooth.x) * 0.045;
      smooth.y += (mouse.y - smooth.y) * 0.045;

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let levelIndex = 0; levelIndex < contourLevels; levelIndex += 1) {
        const threshold = -2.0 + (levelIndex / (contourLevels - 1)) * 4.0;
        const contourIntensity = Math.pow(1 - Math.abs(threshold) / 2.0, 2);
        const alpha =
          (0.22 + contourIntensity * 0.4) * theme.effect.heroLineOpacityScale;

        drawContour(
          threshold,
          `rgba(${primaryBlue.r}, ${primaryBlue.g}, ${primaryBlue.b}, ${alpha})`,
          1 + contourIntensity * 1.2,
        );
      }

      const vignette = context.createRadialGradient(
        canvasWidth * 0.45,
        canvasHeight * 0.4,
        canvasHeight * 0.05,
        canvasWidth * 0.45,
        canvasHeight * 0.5,
        canvasHeight * 0.9,
      );
      vignette.addColorStop(0, theme.effect.heroVignetteStart);
      vignette.addColorStop(0.65, theme.effect.heroVignetteMid);
      vignette.addColorStop(1, theme.effect.heroVignetteEnd);
      context.fillStyle = vignette;
      context.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    const render = (): void => {
      drawFrame();

      if (prefersReducedMotion) {
        return;
      }

      time += 0.006;
      animationFrameId = window.requestAnimationFrame(render);
    };

    const handleViewportChange = (): void => {
      resize();
      drawFrame();
    };

    const handleReducedMotionChange = (): void => {
      prefersReducedMotion = getPrefersReducedMotion();
      window.cancelAnimationFrame(animationFrameId);
      render();
    };

    resize();
    drawFrame();

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleViewportChange);

    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        handleViewportChange();
      });
      resizeObserver.observe(section);
    }

    const reducedMotionQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    if (reducedMotionQuery) {
      if (typeof reducedMotionQuery.addEventListener === "function") {
        reducedMotionQuery.addEventListener(
          "change",
          handleReducedMotionChange,
        );
      } else if (typeof reducedMotionQuery.addListener === "function") {
        reducedMotionQuery.addListener(handleReducedMotionChange);
      }
    }

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleViewportChange);
      resizeObserver?.disconnect();

      if (reducedMotionQuery) {
        if (typeof reducedMotionQuery.removeEventListener === "function") {
          reducedMotionQuery.removeEventListener(
            "change",
            handleReducedMotionChange,
          );
        } else if (typeof reducedMotionQuery.removeListener === "function") {
          reducedMotionQuery.removeListener(handleReducedMotionChange);
        }
      }
    };
  }, [
    theme.color.primary,
    theme.effect.heroVignetteEnd,
    theme.effect.heroVignetteMid,
    theme.effect.heroVignetteStart,
  ]);

  return (
    <HeroSection id="top" ref={sectionRef} data-section="hero">
      <HeroCanvas ref={canvasRef} $entered={hasEntered} aria-hidden="true" />

      <HeroInner>
        <HeroEyebrow $entered={hasEntered}>{content.hero.eyebrow}</HeroEyebrow>
        <HeroHeading $entered={hasEntered}>
          {content.hero.headline.map((line, index) => (
            <span key={line}>
              {index === content.hero.mutedLineIndex ? (
                <HeroMutedLine>{line}</HeroMutedLine>
              ) : (
                line
              )}
              {index < content.hero.headline.length - 1 ? <br /> : null}
            </span>
          ))}
        </HeroHeading>
        <HeroBody $entered={hasEntered}>{content.hero.description}</HeroBody>
        <ActionRow $entered={hasEntered}>
          <PrimaryButton href={content.hero.primaryCta.href}>
            {content.hero.primaryCta.label}
          </PrimaryButton>
          <SecondaryButton href={content.hero.secondaryCta.href}>
            {content.hero.secondaryCta.label}
          </SecondaryButton>
        </ActionRow>
        <HeroCounter $entered={hasEntered}>
          <CounterValue>{content.hero.counter.value}</CounterValue>
          <CounterLabel>{content.hero.counter.label}</CounterLabel>
        </HeroCounter>
      </HeroInner>
    </HeroSection>
  );
}

function getCanvasContext(
  canvas: HTMLCanvasElement,
): CanvasRenderingContext2D | null {
  if (
    typeof window !== "undefined" &&
    /jsdom/i.test(window.navigator.userAgent)
  ) {
    return null;
  }

  try {
    return canvas.getContext("2d");
  } catch {
    return null;
  }
}

function getPrefersReducedMotion(): boolean {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalizedHex = hex.trim().replace("#", "");
  const fullHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split("")
          .map((char) => char + char)
          .join("")
      : normalizedHex;

  if (!/^[0-9a-fA-F]{6}$/.test(fullHex)) {
    return null;
  }

  return {
    r: Number.parseInt(fullHex.slice(0, 2), 16),
    g: Number.parseInt(fullHex.slice(2, 4), 16),
    b: Number.parseInt(fullHex.slice(4, 6), 16),
  };
}
