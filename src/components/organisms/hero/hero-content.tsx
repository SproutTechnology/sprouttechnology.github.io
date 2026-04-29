import styled, { css, keyframes } from "styled-components";
import type { HeroContent as HeroContentModel } from "../../../i18n/site-content";
import { BodyText } from "../../atoms/body-text/body-text";
import { buttonTextStyles } from "../../atoms/button-text/button-text";
import { Heading1 } from "../../atoms/heading-1/heading-1";
import { LabelText } from "../../atoms/label-text/label-text";
import {
  Eyebrow,
  pageWidth,
} from "../../atoms/layout-primitives/layout-primitives";

interface HeroContentProps {
  content: HeroContentModel;
  hasEntered: boolean;
}

interface HeroEntranceProps {
  $entered: boolean;
}

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

export function HeroContent({
  content,
  hasEntered,
}: HeroContentProps): JSX.Element {
  return (
    <HeroInner>
      <HeroEyebrow $entered={hasEntered}>{content.eyebrow}</HeroEyebrow>
      <HeroHeading $entered={hasEntered}>
        {content.headline.map((line, index) => (
          <span key={line}>
            {index === content.mutedLineIndex ? (
              <HeroMutedLine>{line}</HeroMutedLine>
            ) : (
              line
            )}
            {index < content.headline.length - 1 ? <br /> : null}
          </span>
        ))}
      </HeroHeading>
      <HeroBody $entered={hasEntered}>{content.description}</HeroBody>
      <ActionRow $entered={hasEntered}>
        <PrimaryButton href={content.primaryCta.href}>
          {content.primaryCta.label}
        </PrimaryButton>
        <SecondaryButton href={content.secondaryCta.href}>
          {content.secondaryCta.label}
        </SecondaryButton>
      </ActionRow>
      <HeroCounter $entered={hasEntered}>
        <CounterValue>{content.counter.value}</CounterValue>
        <CounterLabel>{content.counter.label}</CounterLabel>
      </HeroCounter>
    </HeroInner>
  );
}
