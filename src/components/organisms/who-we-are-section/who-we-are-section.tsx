import styled from "styled-components";
import type { SiteContent, WhoWeAreItem } from "../../../i18n/site-content";
import { ParallaxImage } from "../../atoms/parallax-image/parallax-image";
import { BodyText } from "../../atoms/body-text/body-text";
import { EyebrowText } from "../../atoms/eyebrow-text/eyebrow-text";
import {
  pageWidth,
  sectionBase,
} from "../../atoms/layout-primitives/layout-primitives";
import { SectionIntro } from "../../molecules/section-intro/section-intro";

/* ─── SECTION SHELL ───────────────────────────────────────────── */

const Section = styled.section`
  ${sectionBase}
`;

const SectionInner = styled.div`
  ${pageWidth}
`;

/* ─── LEAD (expandable description) ──────────────────────────── */

const WhoLead = styled(BodyText)<{ $expanded: boolean }>`
  font-size: 13px;
  line-height: 1.9;
  color: ${({ theme }) => theme.color.textBody};
  white-space: pre-line;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? "unset" : 8)};
`;

/* ─── OFFICE PHOTO ────────────────────────────────────────────── */

const WhoPhoto = styled.div`
  width: 100%;
  aspect-ratio: 21 / 9;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    aspect-ratio: 16 / 9;
  }
`;

/* ─── 2×2 GRID ────────────────────────────────────────────────── */

const WhoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: ${({ theme }) => theme.color.border};
  border: 1px solid ${({ theme }) => theme.color.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const WhoCard = styled.article`
  position: relative;
  background: ${({ theme }) => theme.color.background};
  padding: 40px 36px 48px;
  overflow: hidden;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.color.overlay};
  }

  /* top border on bottom-row cards */
  &:nth-child(n + 3) {
    border-top: 1px solid ${({ theme }) => theme.color.border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 32px 24px 40px;

    &:nth-child(n + 2) {
      border-top: 1px solid ${({ theme }) => theme.color.border};
    }
  }
`;

const CardNumber = styled.span`
  position: absolute;
  top: 32px;
  right: 36px;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.color.textDim};
  transition: color 0.2s ease;

  ${WhoCard}:hover & {
    color: ${({ theme }) => theme.color.textMuted};
  }
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-bottom: 28px;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .icon-stroke {
    stroke: ${({ theme }) => theme.color.borderBright};
    transition: stroke 0.2s ease;
  }

  .icon-fill {
    fill: ${({ theme }) => theme.color.borderBright};
    transition: fill 0.2s ease;
  }

  ${WhoCard}:hover & .icon-stroke {
    stroke: ${({ theme }) => theme.color.primary};
  }

  ${WhoCard}:hover & .icon-fill {
    fill: ${({ theme }) => theme.color.primary};
  }
`;

const CardLabel = styled(EyebrowText)`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.color.textDim};
  transition: color 0.2s ease;

  ${WhoCard}:hover & {
    color: ${({ theme }) => theme.color.primary};
  }
`;

const CardBody = styled(BodyText)`
  font-size: 13px;

  strong {
    color: ${({ theme }) => theme.color.text};
    font-weight: 500;
  }
`;

const CardAccentLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: ${({ theme }) => theme.color.primary};
  transition: width 0.35s ease;

  ${WhoCard}:hover & {
    width: 100%;
  }
`;

/* ─── SVG ICONS ───────────────────────────────────────────────── */

const ICONS = [
  // 01 — The mission: target/diamond
  <svg
    key="mission"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="17" strokeWidth="1" className="icon-stroke" />
    <path
      d="M13 20 L20 13 L27 20 L20 27 Z"
      strokeWidth="1"
      fill="none"
      className="icon-stroke"
    />
    <circle cx="20" cy="20" r="3.5" className="icon-fill" />
  </svg>,

  // 02 — The people: two figures
  <svg
    key="people"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="14" cy="14" r="5" strokeWidth="1" className="icon-stroke" />
    <circle cx="27" cy="14" r="5" strokeWidth="1" className="icon-stroke" />
    <path
      d="M4 32 C4 25 9 21 14 21 C19 21 24 25 24 32"
      strokeWidth="1"
      fill="none"
      className="icon-stroke"
    />
    <path
      d="M18 32 C18 25 22 21 27 21 C32 21 36 25 36 32"
      strokeWidth="1"
      fill="none"
      className="icon-stroke"
    />
  </svg>,

  // 03 — How we work: house/building
  <svg
    key="work"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 34 L6 16 L20 6 L34 16 L34 34 Z"
      strokeWidth="1"
      fill="none"
      className="icon-stroke"
    />
    <rect
      x="15"
      y="23"
      width="10"
      height="11"
      strokeWidth="1"
      fill="none"
      className="icon-stroke"
    />
    <path
      d="M13 16 L20 11 L27 16"
      strokeWidth="1"
      fill="none"
      className="icon-stroke"
    />
  </svg>,

  // 04 — What we care about: crosshair
  <svg
    key="care"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="20"
      cy="20"
      r="5"
      strokeWidth="1"
      fill="none"
      className="icon-stroke"
    />
    <circle
      cx="20"
      cy="20"
      r="12"
      strokeWidth="0.75"
      strokeDasharray="2.5 3"
      className="icon-stroke"
    />
    <path d="M20 5 L20 35" strokeWidth="1" className="icon-stroke" />
    <path d="M5 20 L35 20" strokeWidth="1" className="icon-stroke" />
  </svg>,
];

/* ─── HELPERS ─────────────────────────────────────────────────── */

function highlightPhrase(
  body: string,
  highlight: string,
): JSX.Element | string {
  const index = body.indexOf(highlight);

  if (index === -1) {
    return body;
  }

  return (
    <>
      {body.slice(0, index)}
      <strong>{highlight}</strong>
      {body.slice(index + highlight.length)}
    </>
  );
}

function formatCardNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/* ─── COMPONENT ───────────────────────────────────────────────── */

export function WhoWeAreSection({
  content,
}: {
  content: SiteContent;
}): JSX.Element {
  const section = content.whoWeAre;

  return (
    <Section id="who-we-are" data-section="who-we-are">
      <SectionInner>
        <SectionIntro
          number={section.number}
          label={section.label}
          title={section.title}
          descriptionContent={
            <WhoLead $expanded>{section.description}</WhoLead>
          }
        />

        <WhoPhoto>
          <ParallaxImage
            src="/images/who-we-are.webp"
            alt="The Sprout office — open lounge area with the glass-walled meeting room in the background"
            loading="lazy"
            objectPosition="center 40%"
            range={40}
            scale={1.14}
          />
        </WhoPhoto>

        <WhoGrid>
          {section.items.map((item: WhoWeAreItem, index: number) => (
            <WhoCard key={item.label}>
              <CardNumber aria-hidden="true">
                {formatCardNumber(index)}
              </CardNumber>
              <CardIcon aria-hidden="true">{ICONS[index]}</CardIcon>
              <CardLabel>{item.label}</CardLabel>
              <CardBody>{highlightPhrase(item.body, item.highlight)}</CardBody>
              <CardAccentLine aria-hidden="true" />
            </WhoCard>
          ))}
        </WhoGrid>
      </SectionInner>
    </Section>
  );
}
