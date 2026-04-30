import { useEffect, useMemo, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useTranslation } from "../../../i18n/use-translation";

const tickerLoop = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
`;

const tickerFadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TickerSection = styled.section<{ $entered: boolean }>`
  position: relative;
  padding: ${({ theme }) => theme.spacing.md} 0;
  overflow: hidden;
  white-space: nowrap;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  opacity: 0;
  transform: translateY(18px);

  ${({ $entered }) =>
    $entered &&
    css`
      animation: ${tickerFadeUp} 640ms cubic-bezier(0.22, 1, 0.36, 1) 120ms forwards;
    `}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    animation: none;
  }
`;

const TickerTrack = styled.div<{ $started: boolean }>`
  display: inline-flex;
  min-width: max-content;

  ${({ $started }) =>
    $started &&
    css`
      animation: ${tickerLoop} 48s linear infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TickerMeasure = styled.div`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  height: 0;
  overflow: hidden;
  white-space: nowrap;
`;

const TickerItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.xl};
  font-size: 11px;
  color: ${({ theme }) => theme.color.textMuted};
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

const TickerDot = styled.span`
  color: ${({ theme }) => theme.color.primary};
  position: relative;
  bottom: 2px;
`;

export function Ticker({ items }: { items: string[] }): JSX.Element {
  const [repeatCount, setRepeatCount] = useState(2);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

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
    const updateRepeatCount = (): void => {
      const containerWidth = sectionRef.current?.offsetWidth ?? 0;
      const singleSetWidth = measureRef.current?.offsetWidth ?? 0;

      if (containerWidth === 0 || singleSetWidth === 0) {
        return;
      }

      const nextRepeatCount = Math.max(
        2,
        Math.ceil(containerWidth / singleSetWidth) + 1,
      );
      setRepeatCount((currentCount) =>
        currentCount === nextRepeatCount ? currentCount : nextRepeatCount,
      );
    };

    updateRepeatCount();
    window.addEventListener("resize", updateRepeatCount);

    let resizeObserver: ResizeObserver | null = null;

    if (
      typeof ResizeObserver !== "undefined" &&
      sectionRef.current &&
      measureRef.current
    ) {
      resizeObserver = new ResizeObserver(() => {
        updateRepeatCount();
      });

      resizeObserver.observe(sectionRef.current);
      resizeObserver.observe(measureRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateRepeatCount);
      resizeObserver?.disconnect();
    };
  }, [items]);

  const repeatedItems = useMemo(
    () => Array.from({ length: repeatCount }, () => items).flat(),
    [items, repeatCount],
  );
  const loopItems = useMemo(
    () => [...repeatedItems, ...repeatedItems],
    [repeatedItems],
  );

  return (
    <TickerSection
      $entered={hasEntered}
      ref={sectionRef}
      id="ticker"
      aria-label={t("ui.ticker.ariaLabel")}
      data-section="ticker"
    >
      <TickerMeasure ref={measureRef} aria-hidden="true">
        {items.map((item) => (
          <TickerItem key={`measure-${item}`} aria-hidden="true">
            {item}
            <TickerDot>●</TickerDot>
          </TickerItem>
        ))}
      </TickerMeasure>

      <TickerTrack $started={hasEntered}>
        {loopItems.map((item, index) => {
          const isDuplicateItem = index >= repeatedItems.length;

          return (
            <TickerItem key={`${item}-${index}`} aria-hidden={isDuplicateItem}>
              {item}
              <TickerDot>●</TickerDot>
            </TickerItem>
          );
        })}
      </TickerTrack>
    </TickerSection>
  );
}
