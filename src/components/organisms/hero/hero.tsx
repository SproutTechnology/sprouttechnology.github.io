import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import type { SiteContent } from "../../../i18n/site-content";
import { HeroCanvas } from "./hero-canvas";
import { HeroContent } from "./hero-content";

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: clamp(620px, 82vh, 760px);
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

export function Hero({ content }: { content: SiteContent }): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

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

  return (
    <HeroSection id="top" ref={sectionRef} data-section="hero">
      <HeroCanvas sectionRef={sectionRef} hasEntered={hasEntered} />
      <HeroContent content={content.hero} hasEntered={hasEntered} />
    </HeroSection>
  );
}
