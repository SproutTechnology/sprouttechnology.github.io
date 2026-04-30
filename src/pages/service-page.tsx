import { ServiceDetailPage } from '../components/organisms/service-detail-page/service-detail-page';
import type { SiteContent } from '../i18n/site-content';
import { getServicePath, type ServicePageDefinition } from '../i18n/site-pages';

interface ServicePageProps {
  content: SiteContent;
  page: ServicePageDefinition;
}

export function ServicePage({ content, page }: ServicePageProps): JSX.Element | null {
  const service = content.services.items[page.serviceIndex];

  if (!service) {
    return null;
  }

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

  return <ServiceDetailPage content={content} service={service} relatedServices={relatedServices} />;
}
