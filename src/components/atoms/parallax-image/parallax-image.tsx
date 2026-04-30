import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { photographicImageStyles } from '../image-treatment/image-treatment';

interface ParallaxImageProps {
  src: string;
  alt: string;
  loading?: 'eager' | 'lazy';
  objectPosition?: string;
  range?: number;
  scale?: number;
}

const ParallaxImageRoot = styled.div<{
  $objectPosition: string;
  $scale: number;
}>`
  --parallax-offset: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    ${photographicImageStyles}
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${({ $objectPosition }) => $objectPosition};
    transform: translate3d(0, var(--parallax-offset), 0) scale(${({ $scale }) => $scale});
    transform-origin: center;
    will-change: transform;
    transition: filter 0.2s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transform: none;
    }
  }
`;

export function ParallaxImage({
  src,
  alt,
  loading = 'lazy',
  objectPosition = 'center',
  range = 32,
  scale = 1.12,
}: ParallaxImageProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const root = rootRef.current;

    if (!root) {
      return;
    }

    const reducedMotionQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    let animationFrameId = 0;

    const updateOffset = (): void => {
      const mobileBreakpoint = 768;
      const prefersReducedMotion = reducedMotionQuery?.matches ?? false;

      if (window.innerWidth <= mobileBreakpoint || prefersReducedMotion) {
        root.style.setProperty('--parallax-offset', '0px');
        return;
      }

      const rect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      const normalizedDistance = distanceFromCenter / viewportHeight;
      const offset = clamp(-normalizedDistance * range, -range, range);

      root.style.setProperty('--parallax-offset', `${offset.toFixed(2)}px`);
    };

    const scheduleUpdate = (): void => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateOffset);
    };

    const handleReducedMotionChange = (): void => {
      scheduleUpdate();
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    if (reducedMotionQuery) {
      if (typeof reducedMotionQuery.addEventListener === 'function') {
        reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
      } else if (typeof reducedMotionQuery.addListener === 'function') {
        reducedMotionQuery.addListener(handleReducedMotionChange);
      }
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);

      if (reducedMotionQuery) {
        if (typeof reducedMotionQuery.removeEventListener === 'function') {
          reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
        } else if (typeof reducedMotionQuery.removeListener === 'function') {
          reducedMotionQuery.removeListener(handleReducedMotionChange);
        }
      }
    };
  }, [range]);

  return (
    <ParallaxImageRoot ref={rootRef} $objectPosition={objectPosition} $scale={scale}>
      <img src={src} alt={alt} loading={loading} />
    </ParallaxImageRoot>
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
