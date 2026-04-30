import type { IndustryId, IndustryItem } from "../../../i18n/site-content";

export interface IndustryVisual {
  altKey: string;
  sourceUrl: string;
  url: string;
}

const unsplashParams = "auto=format&fit=crop&crop=entropy&w=1600&h=1000&q=80";

function buildUnsplashUrl(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?${unsplashParams}`;
}

const fallbackIndustryVisual: IndustryVisual = {
  altKey: "ui.industries.visuals.fallback.alt",
  sourceUrl: "https://unsplash.com/s/photos/technology",
  url: buildUnsplashUrl("photo-1550751827-4bd374c3f58b"),
};

const industryVisuals: Record<IndustryId, IndustryVisual> = {
  "automotive-ev": {
    altKey: "ui.industries.visuals.automotiveEv.alt",
    sourceUrl: "https://unsplash.com/s/photos/electric-vehicle",
    url: buildUnsplashUrl("photo-1619795080845-d59e11988633"),
  },
  cybersecurity: {
    altKey: "ui.industries.visuals.cybersecurity.alt",
    sourceUrl: "https://unsplash.com/s/photos/cybersecurity",
    url: buildUnsplashUrl("photo-1550751827-4bd374c3f58b"),
  },
  "health-femtech": {
    altKey: "ui.industries.visuals.healthFemtech.alt",
    sourceUrl: "https://unsplash.com/s/photos/health-technology",
    url: buildUnsplashUrl("photo-1527689368864-3a821dbccc34"),
  },
  "med-tech": {
    altKey: "ui.industries.visuals.medTech.alt",
    sourceUrl: "https://unsplash.com/s/photos/medical-technology",
    url: buildUnsplashUrl("photo-1511174511562-5f7f18b874f8"),
  },
  pharma: {
    altKey: "ui.industries.visuals.pharma.alt",
    sourceUrl: "https://unsplash.com/s/photos/pharmaceutical-lab",
    url: buildUnsplashUrl("photo-1579154392128-bf8c7ebee541"),
  },
  "banking-fintech": {
    altKey: "ui.industries.visuals.bankingFintech.alt",
    sourceUrl: "https://unsplash.com/s/photos/fintech",
    url: buildUnsplashUrl("photo-1563013544-824ae1b704d3"),
  },
  "consumer-retail": {
    altKey: "ui.industries.visuals.consumerRetail.alt",
    sourceUrl: "https://unsplash.com/s/photos/retail-display",
    url: buildUnsplashUrl("photo-1619617257069-3dc8f124c512"),
  },
  fashion: {
    altKey: "ui.industries.visuals.fashion.alt",
    sourceUrl: "https://unsplash.com/s/photos/fashion-store",
    url: buildUnsplashUrl("photo-1546213290-e1b492ab3eee"),
  },
  "energy-cleantech": {
    altKey: "ui.industries.visuals.energyCleantech.alt",
    sourceUrl: "https://unsplash.com/s/photos/clean-energy-technology",
    url: buildUnsplashUrl("photo-1589201529153-5297335c1684"),
  },
  "industrial-automation": {
    altKey: "ui.industries.visuals.industrialAutomation.alt",
    sourceUrl: "https://unsplash.com/s/photos/industrial-machinery",
    url: buildUnsplashUrl("photo-1716191299980-a6e8827ba10b"),
  },
  proptech: {
    altKey: "ui.industries.visuals.proptech.alt",
    sourceUrl: "https://unsplash.com/s/photos/office-building",
    url: buildUnsplashUrl("photo-1486406146926-c627a92ad1ab"),
  },
  "media-publishing": {
    altKey: "ui.industries.visuals.mediaPublishing.alt",
    sourceUrl: "https://unsplash.com/s/photos/publishing",
    url: buildUnsplashUrl("photo-1659141170537-6e0aa70329a4"),
  },
  sportstech: {
    altKey: "ui.industries.visuals.sportstech.alt",
    sourceUrl: "https://unsplash.com/s/photos/sport-technology",
    url: buildUnsplashUrl("photo-1434494878577-86c23bcb06b9"),
  },
  "supply-chain": {
    altKey: "ui.industries.visuals.supplyChain.alt",
    sourceUrl: "https://unsplash.com/s/photos/supply-chain",
    url: buildUnsplashUrl("photo-1712408213231-a1d8a3be1104"),
  },
};

export function getIndustryVisual(item: IndustryItem): IndustryVisual {
  return industryVisuals[item.id] ?? fallbackIndustryVisual;
}
