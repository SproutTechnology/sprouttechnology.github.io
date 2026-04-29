import styled from 'styled-components';
import { getPageForPath } from './i18n/site-pages';
import { useSiteContent } from './i18n/site-content';
import { HomePage } from './pages/home-page';
import { ServicePage } from './pages/service-page';
import { usePageMeta } from './seo/use-page-meta';

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.color.background};
`;

function App(): JSX.Element {
  const content = useSiteContent();
  const page = getPageForPath(typeof window === 'undefined' ? '/' : window.location.pathname);

  usePageMeta(content, page);

  if (page.kind === 'service') {
    return (
      <Shell>
        <ServicePage content={content} page={page} />
      </Shell>
    );
  }

  return (
    <Shell>
      <HomePage content={content} />
    </Shell>
  );
}

export default App;
