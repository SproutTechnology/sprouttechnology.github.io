import styled, { css } from "styled-components";
import { BodyText } from "../body-text/body-text";
import { EyebrowText } from "../eyebrow-text/eyebrow-text";
import { Heading2 } from "../heading-2/heading-2";

export const pageWidth = css`
  width: min(1200px, calc(100% - 64px));
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(1200px, calc(100% - 40px));
  }
`;

export const sectionBase = css`
  padding: ${({ theme }) => theme.spacing["6xl"]} 0;
  scroll-margin-top: 110px;
`;

export const FullWidthContainer = styled.div`
  ${pageWidth}
`;

export const Page = styled.div`
  ${pageWidth}
`;

export const Eyebrow = styled(EyebrowText)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &::before {
    content: "";
    width: 24px;
    height: 1px;
    background: ${({ theme }) => theme.color.primary};
  }
`;

/* ─── SECTION HEADER ─────────────────────────────────────────── */
/* Two-row layout matching the design template:
   Row 1: 120px number (bottom-aligned) | title  + border-bottom
   Row 2: 120px eyebrow                 | description/lead       */

export const SectionHeader = styled.div``;

export const SectionHeaderTop = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: end;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  > :nth-child(2) {
    max-width: 760px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;

    > :nth-child(2) {
      max-width: none;
    }
  }
`;

export const SectionHeaderBottom = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: start;

  > :nth-child(2) {
    max-width: 680px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};

    > :nth-child(2) {
      max-width: none;
    }
  }
`;

export const SectionNumber = styled.span`
  display: block;
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: ${({ theme }) =>
    theme.mode === "dark" ? theme.color.textDim : theme.color.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 48px;
    margin-bottom: 12px;
  }
`;

export const SectionLabel = styled(EyebrowText)`
  font-size: 10px;
  color: ${({ theme }) => theme.color.primary};
  letter-spacing: 0.2em;
  padding-top: 4px;
`;

export const SectionTitle = styled(Heading2)`
  font-size: clamp(22px, 2.5vw, 32px);
`;

export const SectionDescription = styled(BodyText)`
  font-size: 13px;
  line-height: 1.9;
`;
