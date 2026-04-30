import type { CaseStudyId, CaseStudyItem } from '../../../i18n/site-content';

export interface CaseVisual {
  url: string;
}

const unsplashParams = 'auto=format&fit=crop&crop=entropy&w=1400&h=900&q=80';

function buildUnsplashUrl(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?${unsplashParams}`;
}

const fallbackCaseVisual: CaseVisual = {
  url: buildUnsplashUrl('photo-1516321318423-f06f85e504b3'),
};

const caseVisuals: Record<CaseStudyId, CaseVisual> = {
  'retail-signage-platform': {
    url: buildUnsplashUrl('photo-1542838132-92c53300491e'),
  },
  'global-hr-integration': {
    url: buildUnsplashUrl('photo-1521737604893-d14cc237f11d'),
  },
  'customer-portal-cms': {
    url: buildUnsplashUrl('photo-1460925895917-afdab827c52f'),
  },
};

export function getCaseVisual(item: CaseStudyItem): CaseVisual {
  return caseVisuals[item.id] ?? fallbackCaseVisual;
}
