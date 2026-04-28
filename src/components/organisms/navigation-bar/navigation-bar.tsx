import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import type { SiteContent } from '../../../i18n/site-content';
import { getHomePath, getPageForPath } from '../../../i18n/site-pages';
import { useTranslation } from '../../../i18n/use-translation';
import { useThemeMode } from '../../../theme/theme-provider';
import { BrandText } from '../../atoms/brand-text/brand-text';
import { buttonTextStyles } from '../../atoms/button-text/button-text';
import { pageWidth } from '../../atoms/layout-primitives/layout-primitives';

const focusRingStyles = css`
  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.color.primary};
    outline-offset: 4px;
  }
`;

const navFadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ─── NAV BAR ─────────────────────────────────────────────────── */

const Navigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: ${({ theme }) => theme.color.background};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const SkipLink = styled.a`
  ${buttonTextStyles}
  ${focusRingStyles}
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.md};
  z-index: 201;
  padding: 10px 14px;
  background: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.background};
  text-decoration: none;
  transform: translateY(-220%);
  transition: transform 0.2s ease;

  &:focus-visible {
    transform: translateY(0);
  }
`;

interface NavEntranceProps {
  $entered: boolean;
}

const NavigationInner = styled.div<NavEntranceProps>`
  ${pageWidth}
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;

  > * {
    opacity: 0;
    transform: translateY(-10px);
  }

  ${({ $entered }) =>
    $entered &&
    css`
      > * {
        animation: ${navFadeUp} 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }

      > *:nth-child(1) {
        animation-delay: 80ms;
      }

      > *:nth-child(2) {
        animation-delay: 150ms;
      }

      > *:nth-child(3) {
        animation-delay: 220ms;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    > * {
      opacity: 1;
      transform: none;
      animation: none;
    }
  }
`;

const BrandLink = styled.a`
  ${focusRingStyles}
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
  font-size: ${({ theme }) => theme.typography.brand.fontSize};
  line-height: ${({ theme }) => theme.typography.brand.lineHeight};
  font-weight: ${({ theme }) => theme.typography.brand.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.brand.letterSpacing};
  text-decoration: none;
  text-transform: ${({ theme }) => theme.typography.brand.textTransform};
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const DesktopNav = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const DesktopNavLink = styled.a<{ $active: boolean }>`
  ${focusRingStyles}
  font-size: 11px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme, $active }) => ($active ? theme.color.text : theme.color.textMuted)};
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.color.text};
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const languageToggleTextStyles = css`
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.label.fontSize};
  line-height: ${({ theme }) => theme.typography.label.lineHeight};
  font-weight: ${({ theme }) => theme.typography.label.fontWeight};
  letter-spacing: ${({ theme }) => theme.typography.label.letterSpacing};
  text-transform: ${({ theme }) => theme.typography.label.textTransform};
`;

const LanguageToggleButton = styled.button`
  ${focusRingStyles}
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const LanguageOption = styled.span<{ $active: boolean }>`
  ${languageToggleTextStyles}
  opacity: ${({ $active }) => ($active ? 0.96 : 0.42)};
  transition: opacity 0.2s ease;

  ${LanguageToggleButton}:hover & {
    opacity: ${({ $active }) => ($active ? 1 : 0.64)};
  }
`;

const LanguageDivider = styled.span`
  ${languageToggleTextStyles}
  opacity: 0.28;
`;

const navIconButtonStyles = css`
  ${focusRingStyles}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.color.textMuted};
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.color.text};
    transform: translateY(-1px);
  }
`;

const ThemeToggleButton = styled.button`
  ${navIconButtonStyles}
`;

const ContactButton = styled.a`
  ${navIconButtonStyles}
  text-decoration: none;
`;

const MenuButton = styled.button`
  ${navIconButtonStyles}
`;

const NavActionIcon = styled.svg<{ $visible?: boolean }>`
  display: ${({ $visible = true }) => ($visible ? 'block' : 'none')};
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 1.5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

/* ─── DROPDOWN PANEL ──────────────────────────────────────────── */

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

/* ─── PANEL FOOTER ────────────────────────────────────────────── */

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

/* ─── DIMMER ──────────────────────────────────────────────────── */

const Dimmer = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  top: ${({ theme }) => theme.spacing['3xl']};
  z-index: 198;
  background: ${({ theme }) => theme.effect.scrimSoft};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.35s ease;
`;

/* ─── COMPONENT ───────────────────────────────────────────────── */

export function NavigationBar({ content }: { content: SiteContent }): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSectionHref, setCurrentSectionHref] = useState<string | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const { mode, toggleMode } = useThemeMode();
  const { locale, setLocale, t } = useTranslation();
  const currentPage = getPageForPath(typeof window === 'undefined' ? '/' : window.location.pathname);
  const homePath = getHomePath(locale);
  const isHomePage = currentPage.kind === 'home';

  const links = content.navigation.links;

  // Split links into 3 columns matching the reference layout
  const col1Links = links.slice(0, 2); // Who we are, What we do
  const col2Links = links.slice(2, 4); // Our family, Industries
  const col3Links = links.slice(4);    // Cases

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
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isHomePage || typeof window === 'undefined') {
      setCurrentSectionHref(null);
      return;
    }

    const sectionHrefs = links
      .map((link) => link.href)
      .filter((href) => href.startsWith('#'));

    const updateCurrentSection = (): void => {
      const offset = 180;
      const scrollPosition = window.scrollY + offset;
      let nextSectionHref = sectionHrefs[0] ?? null;

      sectionHrefs.forEach((href) => {
        const section = document.getElementById(href.slice(1));

        if (section && section.offsetTop <= scrollPosition) {
          nextSectionHref = href;
        }
      });

      setCurrentSectionHref(nextSectionHref);
    };

    updateCurrentSection();
    window.addEventListener('scroll', updateCurrentSection, { passive: true });
    window.addEventListener('resize', updateCurrentSection);

    return () => {
      window.removeEventListener('scroll', updateCurrentSection);
      window.removeEventListener('resize', updateCurrentSection);
    };
  }, [links, isHomePage]);

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  const handleLocaleChange = (nextLocale: 'en' | 'sv'): void => {
    closeMenu();
    setLocale(nextLocale);
  };

  const handleLocaleToggle = (): void => {
    handleLocaleChange(locale === 'sv' ? 'en' : 'sv');
  };

  const resolveHref = (href: string): string => {
    if (currentPage.kind === 'service' && href !== '#what-we-do') {
      return `${homePath}${href}`;
    }

    return href;
  };

  const isActive = (href: string): boolean =>
    isHomePage && currentSectionHref === href;

  const renderLinks = (colLinks: typeof links): JSX.Element => (
    <>
      {colLinks.map((link) => (
        <NavLink
          key={link.href}
          href={resolveHref(link.href)}
          $active={isActive(link.href)}
          aria-current={isActive(link.href) ? 'location' : undefined}
          onClick={closeMenu}
        >
          {link.label}
          <NavLinkArrow aria-hidden="true">↗</NavLinkArrow>
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      <Navigation aria-label={t('ui.navigation.label')} data-region="site-navigation">
        <SkipLink href="#main-content">{t('ui.navigation.skipToContent')}</SkipLink>

        <NavigationInner $entered={hasEntered}>
          <BrandLink href="#top" aria-label={t('ui.navigation.goToTop')} onClick={closeMenu}>
            <BrandText variant="wordmark" />
          </BrandLink>

          <DesktopNav>
            {links.slice(0, 2).map((link) => (
              <DesktopNavLink
                key={link.href}
                href={resolveHref(link.href)}
                $active={isActive(link.href)}
                aria-current={isActive(link.href) ? 'location' : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </DesktopNavLink>
            ))}
            {links[4] ? (
              <DesktopNavLink
                href={resolveHref(links[4].href)}
                $active={isActive(links[4].href)}
                aria-current={isActive(links[4].href) ? 'location' : undefined}
                onClick={closeMenu}
              >
                {links[4].label}
              </DesktopNavLink>
            ) : null}
          </DesktopNav>

          <NavRight>
            <LanguageToggleButton
              type="button"
              aria-label={locale === 'sv' ? t('ui.languageToggle.switchToEnglish') : t('ui.languageToggle.switchToSwedish')}
              title={locale === 'sv' ? t('ui.languageToggle.switchToEnglish') : t('ui.languageToggle.switchToSwedish')}
              onClick={handleLocaleToggle}
            >
              <LanguageOption $active={locale === 'sv'} aria-hidden="true">SV</LanguageOption>
              <LanguageDivider aria-hidden="true">/</LanguageDivider>
              <LanguageOption $active={locale === 'en'} aria-hidden="true">EN</LanguageOption>
              <VisuallyHidden>
                {locale === 'sv'
                  ? `${t('ui.languageToggle.swedishSelected')} — ${t('ui.languageToggle.switchToEnglish')}`
                  : `${t('ui.languageToggle.englishSelected')} — ${t('ui.languageToggle.switchToSwedish')}`}
              </VisuallyHidden>
            </LanguageToggleButton>

            <ThemeToggleButton
              type="button"
              aria-label={mode === 'dark' ? t('ui.themeToggle.switchToLight') : t('ui.themeToggle.switchToDark')}
              title={mode === 'dark' ? t('ui.themeToggle.switchToLight') : t('ui.themeToggle.switchToDark')}
              onClick={toggleMode}
            >
              <NavActionIcon
                $visible={mode === 'dark'}
                aria-hidden={mode !== 'dark'}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </NavActionIcon>
              <NavActionIcon
                $visible={mode === 'light'}
                aria-hidden={mode !== 'light'}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </NavActionIcon>
              <VisuallyHidden>
                {mode === 'dark' ? t('ui.themeToggle.darkSelected') : t('ui.themeToggle.lightSelected')}
              </VisuallyHidden>
            </ThemeToggleButton>

            <ContactButton href={content.navigation.cta.href} aria-label={t('ui.navigation.openContact')} onClick={closeMenu}>
              <NavActionIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </NavActionIcon>
            </ContactButton>

            <MenuButton
              ref={hamburgerRef}
              type="button"
              aria-label={isMenuOpen ? t('ui.navigation.closeMenu') : t('ui.navigation.openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls="nav-panel"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <NavActionIcon
                $visible={!isMenuOpen}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden={isMenuOpen}
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </NavActionIcon>
              <NavActionIcon
                $visible={isMenuOpen}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden={!isMenuOpen}
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </NavActionIcon>
            </MenuButton>
          </NavRight>
        </NavigationInner>
      </Navigation>

      <NavPanel
        id="nav-panel"
        $open={isMenuOpen}
        aria-hidden={!isMenuOpen}
        data-region="site-menu-panel"
      >
        <NavPanelGrid>
          <NavCol>
            <NavColLabel>{t('ui.navigation.companyColumn')}</NavColLabel>
            {renderLinks(col1Links)}
          </NavCol>

          <NavCol>
            <NavColLabel>{t('ui.navigation.familyColumn')}</NavColLabel>
            {renderLinks(col2Links)}
          </NavCol>

          <NavCol>
            <NavColLabel>{t('ui.navigation.workColumn')}</NavColLabel>
            {renderLinks(col3Links)}
            <NavColQuote>&ldquo;{t('ui.navigation.workQuote')}&rdquo;</NavColQuote>
          </NavCol>
        </NavPanelGrid>

        <NavPanelFooter>
          <NavFooterBrand>wearesprout.se</NavFooterBrand>
          <NavFooterLinks>
            {content.footer.links.map((link) => (
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
              onClick={() => handleLocaleChange('en')}
            >
              EN
              <VisuallyHidden>
                {locale === 'en' ? ` — ${t('ui.languageToggle.englishSelected')}` : ` — ${t('ui.languageToggle.switchToEnglish')}`}
              </VisuallyHidden>
            </FooterLangButton>
            <FooterLangDivider>/</FooterLangDivider>
            <FooterLangButton
              type="button"
              $active={locale === 'sv'}
              aria-pressed={locale === 'sv'}
              onClick={() => handleLocaleChange('sv')}
            >
              SV
              <VisuallyHidden>
                {locale === 'sv' ? ` — ${t('ui.languageToggle.swedishSelected')}` : ` — ${t('ui.languageToggle.switchToSwedish')}`}
              </VisuallyHidden>
            </FooterLangButton>
          </NavFooterLinks>
        </NavPanelFooter>
      </NavPanel>

      <Dimmer $open={isMenuOpen} onClick={closeMenu} aria-hidden="true" />
    </>
  );
}
