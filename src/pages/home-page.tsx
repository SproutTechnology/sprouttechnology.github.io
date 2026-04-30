import { Page } from '../components/atoms/layout-primitives/layout-primitives';
import { CasesSection } from '../components/organisms/cases-section/cases-section';
import { ContactBlock } from '../components/organisms/contact-block/contact-block';
import { FamilySection } from '../components/organisms/family-section/family-section';
import { FooterBlock } from '../components/organisms/footer-block/footer-block';
import { Hero } from '../components/organisms/hero/hero';
import { IndustryShowcase } from '../components/organisms/industry-showcase/industry-showcase';
import { NavigationBar } from '../components/organisms/navigation-bar/navigation-bar';
import { QuoteBlock } from '../components/organisms/quote-block/quote-block';
import { ServicesSection } from '../components/organisms/services-section/services-section';
import { StatsStrip } from '../components/organisms/stats-strip/stats-strip';
import { WhoWeAreSection } from '../components/organisms/who-we-are-section/who-we-are-section';
import { Ticker } from '../components/molecules/ticker/ticker';
import type { SiteContent } from '../i18n/site-content';

interface HomePageProps {
  content: SiteContent;
}

export function HomePage({ content }: HomePageProps): JSX.Element {
  return (
    <>
      <NavigationBar content={content} />
      <main id="main-content" data-page="home">
        <Hero content={content} />
        <Ticker items={content.ticker} />
        <Page>
          <WhoWeAreSection content={content} />
          <ServicesSection content={content} />
          <FamilySection content={content} />
        </Page>
        <IndustryShowcase content={content} />
        <QuoteBlock content={content} />
        <StatsStrip content={content} />
        <Page>
          <CasesSection content={content} />
          <ContactBlock content={content} />
        </Page>
      </main>
      <FooterBlock content={content} />
    </>
  );
}
