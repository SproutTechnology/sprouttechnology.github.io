import type { Ref } from 'react';
import styled, { css } from 'styled-components';
import type { Locale } from '../../../i18n/translations';
import type { ThemeMode } from '../../../theme';
import { focusRingStyles, VisuallyHidden } from './navigation-styles';

interface NavigationActionLabels {
  contact: string;
  languageSelected: string;
  languageToggle: string;
  menu: string;
  themeSelected: string;
  themeToggle: string;
}

interface NavigationActionsProps {
  contactHref: string;
  hamburgerRef: Ref<HTMLButtonElement>;
  isMenuOpen: boolean;
  labels: NavigationActionLabels;
  locale: Locale;
  mode: ThemeMode;
  onCloseMenu: () => void;
  onMenuToggle: () => void;
  onLocaleToggle: () => void;
  onThemeToggle: () => void;
}

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
  transition:
    color 0.2s ease,
    transform 0.2s ease;

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

export function NavigationActions({
  contactHref,
  hamburgerRef,
  isMenuOpen,
  labels,
  locale,
  mode,
  onCloseMenu,
  onMenuToggle,
  onLocaleToggle,
  onThemeToggle,
}: NavigationActionsProps): JSX.Element {
  return (
    <NavRight>
      <LanguageToggleButton
        type="button"
        aria-label={labels.languageToggle}
        title={labels.languageToggle}
        onClick={onLocaleToggle}
      >
        <LanguageOption $active={locale === 'sv'} aria-hidden="true">SV</LanguageOption>
        <LanguageDivider aria-hidden="true">/</LanguageDivider>
        <LanguageOption $active={locale === 'en'} aria-hidden="true">EN</LanguageOption>
        <VisuallyHidden>{labels.languageSelected}</VisuallyHidden>
      </LanguageToggleButton>

      <ThemeToggleButton
        type="button"
        aria-label={labels.themeToggle}
        title={labels.themeToggle}
        onClick={onThemeToggle}
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
        <VisuallyHidden>{labels.themeSelected}</VisuallyHidden>
      </ThemeToggleButton>

      <ContactButton href={contactHref} aria-label={labels.contact} onClick={onCloseMenu}>
        <NavActionIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </NavActionIcon>
      </ContactButton>

      <MenuButton
        ref={hamburgerRef}
        type="button"
        aria-label={labels.menu}
        aria-expanded={isMenuOpen}
        aria-controls="nav-panel"
        onClick={onMenuToggle}
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
  );
}
