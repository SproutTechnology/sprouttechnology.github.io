import { useEffect } from 'react';
import type { SiteContent } from '../i18n/site-content';
import type { SitePageDefinition } from '../i18n/site-pages';

/* Keeps document title and meta description aligned with the active page. */
export function usePageMeta(content: SiteContent, page: SitePageDefinition): void {
  useEffect(() => {
    const pageTitle =
      page.kind === 'service'
        ? `${content.services.items[page.serviceIndex]?.title} — ${content.seo.title}`
        : content.seo.title;
    const pageDescription =
      page.kind === 'service'
        ? content.services.items[page.serviceIndex]?.body ?? content.seo.description
        : content.seo.description;

    document.title = pageTitle;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    description?.setAttribute('content', pageDescription);
  }, [content, page]);
}
