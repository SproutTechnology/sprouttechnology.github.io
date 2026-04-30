import { useEffect, useState } from 'react';
import type { NavigationLink } from '../../../i18n/site-content';

interface UseNavigationScrollspyOptions {
  isEnabled: boolean;
  links: NavigationLink[];
}

/* Tracks the currently active in-page navigation section. */
export function useNavigationScrollspy({
  isEnabled,
  links,
}: UseNavigationScrollspyOptions): string | null {
  const [currentSectionHref, setCurrentSectionHref] = useState<string | null>(null);

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') {
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
  }, [isEnabled, links]);

  return currentSectionHref;
}
