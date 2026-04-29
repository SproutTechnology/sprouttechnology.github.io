import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import type { SiteContent } from '../../../i18n/site-content';
import { getHomePath, getPageForPath } from '../../../i18n/site-pages';
import type { Locale } from '../../../i18n/translations';
import { useTranslation } from '../../../i18n/use-translation';
import { useThemeMode } from '../../../theme/theme-provider';
import { BrandText } from '../../atoms/brand-text/brand-text';
import { buttonTextStyles } from '../../atoms/button-text/button-text';
import { pageWidth } from '../../atoms/layout-primitives/layout-primitives';
import { NavigationActions } from './navigation-actions';
import { NavigationPanel } from './navigation-panel';
import { focusRingStyles } from './navigation-styles';

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
  const panelColumns = [
    {
      label: t('ui.navigation.companyColumn'),
      links: links.slice(0, 2),
    },
    {
      label: t('ui.navigation.familyColumn'),
      links: links.slice(2, 4),
    },
    {
      label: t('ui.navigation.workColumn'),
      links: links.slice(4),
      quote: t('ui.navigation.workQuote'),
    },
  ];

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

  const handleLocaleChange = (nextLocale: Locale): void => {
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

          <NavigationActions
            contactHref={content.navigation.cta.href}
            hamburgerRef={hamburgerRef}
            isMenuOpen={isMenuOpen}
            labels={{
              contact: t('ui.navigation.openContact'),
              languageSelected:
                locale === 'sv'
                  ? `${t('ui.languageToggle.swedishSelected')} — ${t('ui.languageToggle.switchToEnglish')}`
                  : `${t('ui.languageToggle.englishSelected')} — ${t('ui.languageToggle.switchToSwedish')}`,
              languageToggle:
                locale === 'sv'
                  ? t('ui.languageToggle.switchToEnglish')
                  : t('ui.languageToggle.switchToSwedish'),
              menu: isMenuOpen ? t('ui.navigation.closeMenu') : t('ui.navigation.openMenu'),
              themeSelected:
                mode === 'dark'
                  ? t('ui.themeToggle.darkSelected')
                  : t('ui.themeToggle.lightSelected'),
              themeToggle:
                mode === 'dark'
                  ? t('ui.themeToggle.switchToLight')
                  : t('ui.themeToggle.switchToDark'),
            }}
            locale={locale}
            mode={mode}
            onCloseMenu={closeMenu}
            onLocaleToggle={handleLocaleToggle}
            onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
            onThemeToggle={toggleMode}
          />
        </NavigationInner>
      </Navigation>

      <NavigationPanel
        columns={panelColumns}
        footerLinks={content.footer.links}
        isActive={isActive}
        isOpen={isMenuOpen}
        languageLabels={{
          englishSelected: t('ui.languageToggle.englishSelected'),
          switchToEnglish: t('ui.languageToggle.switchToEnglish'),
          swedishSelected: t('ui.languageToggle.swedishSelected'),
          switchToSwedish: t('ui.languageToggle.switchToSwedish'),
        }}
        locale={locale}
        onClose={closeMenu}
        onLocaleChange={handleLocaleChange}
        resolveHref={resolveHref}
      />

      <Dimmer $open={isMenuOpen} onClick={closeMenu} aria-hidden="true" />
    </>
  );
}
