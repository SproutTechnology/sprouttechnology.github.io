import { useTranslation } from './use-translation';

export type IndustryId =
  | 'automotive-ev'
  | 'cybersecurity'
  | 'health-femtech'
  | 'med-tech'
  | 'pharma'
  | 'banking-fintech'
  | 'consumer-retail'
  | 'fashion'
  | 'energy-cleantech'
  | 'industrial-automation'
  | 'proptech'
  | 'media-publishing'
  | 'sportstech'
  | 'supply-chain';

export interface NavigationLink {
  label: string;
  href: string;
  description?: string;
}

export interface CallToAction extends NavigationLink {}

export interface HeroContent {
  eyebrow: string;
  headline: string[];
  mutedLineIndex: number;
  description: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  counter: {
    value: string;
    label: string;
  };
}

export interface IndustryItem {
  id: IndustryId;
  name: string;
  tag: string;
  description: string;
  status: 'client' | 'portfolio';
}

export interface ContentSection<TItem> {
  number: string;
  label: string;
  title: string;
  description: string;
  items: TItem[];
}

export interface WhoWeAreItem {
  label: string;
  body: string;
  highlight: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  summary: string;
  body: string;
}

export type CaseStudyId =
  | 'retail-signage-platform'
  | 'global-hr-integration'
  | 'customer-portal-cms';

export interface CaseStudyItem {
  id: CaseStudyId;
  title: string;
  sector: string;
  lead: string;
  summary: string;
  description: string;
  challenge: string;
  approach: string;
  impact: string;
  outcome: string;
  counterfactual?: string;
  imageAlt: string;
}

export type FamilyTabId = 'investments' | 'exits' | 'portfolio';

export interface FamilyTab {
  id: FamilyTabId;
  label: string;
  count: string;
}

export interface FamilyConsultancyItem {
  name: string;
  role: string;
  description: string;
  quote: string;
}

export interface FamilyInvestmentItem {
  name: string;
  sector: string;
  description: string;
  progress: number;
  status: 'active' | 'exited';
}

export interface FamilyExitItem {
  name: string;
  description: string;
  tag: string;
}

export interface FamilyPortfolioGroup {
  label: string;
  companies: string[];
}

export interface ContactField {
  label: string;
  name: 'name' | 'company' | 'message';
  placeholder: string;
}

export interface ContactPerson {
  role: string;
  name: string;
  email: string;
  phone: string;
}

export interface ContactCompanyDetails {
  label: string;
  name: string;
  addressLabel: string;
  address: string;
  organizationNumberLabel: string;
  organizationNumber: string;
  postalCodeLabel: string;
  postalCode: string;
}

export interface SiteContent {
  seo: {
    title: string;
    description: string;
  };
  navigation: {
    links: NavigationLink[];
    cta: CallToAction;
  };
  hero: HeroContent;
  ticker: string[];
  industries: {
    number: string;
    eyebrow: string;
    count: string;
    countLabel: string;
    title: string;
    description: string;
    label: string;
    footerBrand: string;
    items: IndustryItem[];
  };
  whoWeAre: ContentSection<WhoWeAreItem>;
  services: ContentSection<ServiceItem>;
  quote: {
    text: string;
    source: string;
    context: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  cases: ContentSection<CaseStudyItem>;
  family: {
    number: string;
    label: string;
    title: string;
    description: string;
    tabs: FamilyTab[];
    investments: FamilyInvestmentItem[];
    exits: {
      items: FamilyExitItem[];
      note: string;
    };
    portfolio: FamilyPortfolioGroup[];
  };
  contact: {
    number: string;
    label: string;
    title: string;
    description: string;
    details?: string[];
    inboxLabel?: string;
    inboxEmail?: string;
    people?: ContactPerson[];
    companyDetails?: ContactCompanyDetails;
    submitLabel: string;
    fields: ContactField[];
  };
  footer: {
    copy: string;
    links: NavigationLink[];
  };
}

/* Reads the typed site content for the active locale. */
export function useSiteContent(): SiteContent {
  const { t } = useTranslation();

  return t<SiteContent>('siteContent');
}
