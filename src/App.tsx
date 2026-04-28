import { useEffect } from 'react';
import styled from 'styled-components';
import { CasesSection } from './components/organisms/cases-section/cases-section';
import { ContactBlock } from './components/organisms/contact-block/contact-block';
import { FamilySection } from './components/organisms/family-section/family-section';
import { FooterBlock } from './components/organisms/footer-block/footer-block';
import { Hero } from './components/organisms/hero/hero';
import { IndustryShowcase } from './components/organisms/industry-showcase/industry-showcase';
import { NavigationBar } from './components/organisms/navigation-bar/navigation-bar';
import { QuoteBlock } from './components/organisms/quote-block/quote-block';
import { ServiceDetailPage } from './components/organisms/service-detail-page/service-detail-page';
import { ServicesSection } from './components/organisms/services-section/services-section';
import { StatsStrip } from './components/organisms/stats-strip/stats-strip';
import { Ticker } from './components/molecules/ticker/ticker';
import { WhoWeAreSection } from './components/organisms/who-we-are-section/who-we-are-section';
import { Page } from './components/atoms/layout-primitives/layout-primitives';
import { getPageForPath, getServicePath } from './i18n/site-pages';
import { useSiteContent } from './i18n/site-content';

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.color.background};
`;

const MainContent = styled.main`
  display: block;
`;

function App(): JSX.Element {
  const content = useSiteContent();
  const page = getPageForPath(typeof window === 'undefined' ? '/' : window.location.pathname);

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

  if (page.kind === 'service') {
    const service = content.services.items[page.serviceIndex];

    if (service) {
      const relatedServices = content.services.items
        .flatMap((item, index) =>
          index === page.serviceIndex
            ? []
            : [
                {
                  ...item,
                  href: getServicePath(page.locale, index),
                },
              ],
        )
        .slice(0, 3);

      return (
        <Shell>
          <ServiceDetailPage content={content} service={service} relatedServices={relatedServices} />
        </Shell>
      );
    }
  }

  return (
    <Shell>
      <NavigationBar content={content} />
      <MainContent id="main-content" data-page="home">
        <Page>
          <Hero content={content} />
        </Page>
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
      </MainContent>
      <FooterBlock content={content} />
    </Shell>
  );
}

export default App;
