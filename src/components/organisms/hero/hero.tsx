import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes, useTheme } from "styled-components";
import type { SiteContent } from "../../../i18n/site-content";
import { HeroContent } from "./hero-content";

const contourLevels = 12;
const contourStep = 8;

const heroFadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

interface HeroCanvasEntranceProps {
  $entered: boolean;
}

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

const HeroCanvas = styled.canvas<HeroCanvasEntranceProps>`
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
      <HeroContent content={content.hero} hasEntered={hasEntered} />
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
