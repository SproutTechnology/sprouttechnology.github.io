import styled from 'styled-components';
import type { NavigationLink } from '../../../i18n/site-content';
import type { Locale } from '../../../i18n/translations';
import { focusRingStyles, VisuallyHidden } from './navigation-styles';

interface NavigationPanelColumn {
  label: string;
  links: NavigationLink[];
  quote?: string;
}

interface NavigationPanelLanguageLabels {
  englishSelected: string;
  switchToEnglish: string;
  swedishSelected: string;
  switchToSwedish: string;
}

interface NavigationPanelProps {
  columns: NavigationPanelColumn[];
  footerLinks: NavigationLink[];
  isActive: (href: string) => boolean;
  isOpen: boolean;
  languageLabels: NavigationPanelLanguageLabels;
  locale: Locale;
  onClose: () => void;
  onLocaleChange: (nextLocale: Locale) => void;
  resolveHref: (href: string) => string;
}

const NavPanel = styled.div<{ $open: boolean }>`
  position: fixed;
  top: ${({ theme }) => theme.spacing['3xl']};
  left: 50%;
  width: min(1200px, calc(100% - 64px));
  transform: translateX(-50%);
  z-index: 199;
  background: ${({ theme }) => theme.color.surface};
  border: ${({ theme, $open }) => ($open ? `1px solid ${theme.color.border}` : 'none')};
  box-shadow: ${({ theme, $open }) => ($open ? theme.effect.shadowMd : 'none')};
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-gutter: stable;
  max-height: ${({ theme, $open }) => ($open ? `calc(100dvh - ${theme.spacing['3xl']})` : '0')};
  transition: max-height 0.38s ease;
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: 0;
    width: 100%;
    transform: none;
    box-shadow: none;
  }
`;

const NavPanelGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
  background: ${({ theme }) => theme.color.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const NavCol = styled.div`
  background: ${({ theme }) => theme.color.background};
  padding: 36px 40px 44px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 28px 24px 32px;
  }
`;

const NavColLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  font-size: ${({ theme }) => theme.typography.labelSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.labelSmall.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.labelSmall.letterSpacing};
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.primary};

  &::before {
    content: '';
    display: block;
    width: 16px;
    height: 1px;
    flex-shrink: 0;
    background: ${({ theme }) => theme.color.primary};
  }
`;

const NavLink = styled.a<{ $active: boolean }>`
  ${focusRingStyles}
  position: relative;
  display: block;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 700;
  color: ${({ theme, $active }) => ($active ? theme.color.text : theme.color.textDim)};
  text-decoration: none;
  letter-spacing: -0.01em;
  line-height: 1.1;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  transition: color 0.15s ease;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    color: ${({ theme }) => theme.color.text};
  }
`;

const NavLinkArrow = styled.span`
  position: absolute;
  right: 0;
  top: ${({ theme }) => theme.spacing.sm};
  font-size: 14px;
  color: ${({ theme }) => theme.color.primary};
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.15s ease;

  ${NavLink}:hover & {
    opacity: 1;
    transform: translate(3px, -3px);
  }
`;

const NavColQuote = styled.p`
  margin-top: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.9;
  font-style: italic;
`;

const NavPanelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 14px 40px;
  background: ${({ theme }) => theme.color.background};
  border-top: 1px solid ${({ theme }) => theme.color.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const NavFooterBrand = styled.span`
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.textMuted};
`;

const NavFooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    gap: 12px 20px;
  }
`;

const NavFooterLink = styled.a`
  ${focusRingStyles}
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.textMuted};
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;

const FooterLangDivider = styled.span`
  color: ${({ theme }) => theme.color.textMuted};
  font-size: 10px;
  letter-spacing: 0;
`;

const FooterLangButton = styled.button<{ $active: boolean }>`
  ${focusRingStyles}
  padding: 0;
  border: none;
  background: none;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text};
  font-weight: 500;
  opacity: ${({ $active }) => ($active ? 0.96 : 0.42)};
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }
`;

function renderLinks({
  isActive,
  links,
  onClose,
  resolveHref,
}: {
  isActive: (href: string) => boolean;
  links: NavigationLink[];
  onClose: () => void;
  resolveHref: (href: string) => string;
}): JSX.Element {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={resolveHref(link.href)}
          $active={isActive(link.href)}
          aria-current={isActive(link.href) ? 'location' : undefined}
          onClick={onClose}
        >
          {link.label}
          <NavLinkArrow aria-hidden="true">↗</NavLinkArrow>
        </NavLink>
      ))}
    </>
  );
}

export function NavigationPanel({
  columns,
  footerLinks,
  isActive,
  isOpen,
  languageLabels,
  locale,
  onClose,
  onLocaleChange,
  resolveHref,
}: NavigationPanelProps): JSX.Element {
  return (
    <NavPanel
      id="nav-panel"
      $open={isOpen}
      aria-hidden={!isOpen}
      data-region="site-menu-panel"
    >
      <NavPanelGrid>
        {columns.map((column) => (
          <NavCol key={column.label}>
            <NavColLabel>{column.label}</NavColLabel>
            {renderLinks({ isActive, links: column.links, onClose, resolveHref })}
            {column.quote ? <NavColQuote>&ldquo;{column.quote}&rdquo;</NavColQuote> : null}
          </NavCol>
        ))}
      </NavPanelGrid>

      <NavPanelFooter>
        <NavFooterBrand>wearesprout.se</NavFooterBrand>
        <NavFooterLinks>
          {footerLinks.map((link) => (
            <NavFooterLink
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </NavFooterLink>
          ))}
          <FooterLangButton
            type="button"
            $active={locale === 'en'}
            aria-pressed={locale === 'en'}
            onClick={() => onLocaleChange('en')}
          >
            EN
            <VisuallyHidden>
              {locale === 'en'
                ? ` — ${languageLabels.englishSelected}`
                : ` — ${languageLabels.switchToEnglish}`}
            </VisuallyHidden>
          </FooterLangButton>
          <FooterLangDivider>/</FooterLangDivider>
          <FooterLangButton
            type="button"
            $active={locale === 'sv'}
            aria-pressed={locale === 'sv'}
            onClick={() => onLocaleChange('sv')}
          >
            SV
            <VisuallyHidden>
              {locale === 'sv'
                ? ` — ${languageLabels.swedishSelected}`
                : ` — ${languageLabels.switchToSwedish}`}
            </VisuallyHidden>
          </FooterLangButton>
        </NavFooterLinks>
      </NavPanelFooter>
    </NavPanel>
  );
}
