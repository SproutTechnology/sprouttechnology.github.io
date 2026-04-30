import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getIndexablePages, type SitePageDefinition } from '../src/i18n/site-pages';
import { translations, type Locale } from '../src/i18n/translations';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const siteUrl = 'https://www.wearesprout.se';
const ogImagePath = '/og-image.png';
const locales: Locale[] = ['en', 'sv'];

await copyOgImage();
await writeRedirectPage();

const pages = getIndexablePages();

for (const page of pages) {
  await writePage(page);
}

await writeRobots(pages);
await writeSitemap(pages);

async function copyOgImage(): Promise<void> {
  await copyFile(join(rootDir, 'public/sprout-white-name.png'), join(rootDir, 'public/og-image.png'));
}

async function writeRedirectPage(): Promise<void> {
  await writeFile(
    join(rootDir, 'index.html'),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0a0a08" />
    <meta name="robots" content="noindex,nofollow" />
    <link rel="canonical" href="${siteUrl}/en/" />
    <title>Redirecting to Sprout</title>
    <noscript>
      <meta http-equiv="refresh" content="0; url=/en/" />
    </noscript>
    <style>
      :root {
        color-scheme: dark;
        --background: #0a0a08;
        --text: #ffffff;
        --text-muted: rgba(255, 255, 255, 0.5);
        --text-subtle: rgba(255, 255, 255, 0.6);
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        min-height: 100%;
      }

      body {
        min-height: 100vh;
        background: var(--background);
        color: var(--text);
        font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        overflow: hidden;
      }

      .redirect-loader {
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 40px;
        padding: 24px;
      }

      .redirect-logo {
        position: relative;
        width: min(280px, calc(100vw - 48px));
        height: auto;
        opacity: 0;
        transform: translateY(10px);
        animation: fade-up 420ms cubic-bezier(0.22, 1, 0.36, 1) 70ms forwards;
      }

      .redirect-logo img {
        display: block;
        width: 100%;
        height: auto;
      }

      .redirect-logo-bg {
        opacity: 0.15;
      }

      .redirect-logo-fill {
        position: absolute;
        inset: 0;
        clip-path: inset(0 calc((1 - var(--progress, 0)) * 100%) 0 0);
        transition: clip-path 0.15s ease-out;
      }

      .redirect-status {
        display: flex;
        align-items: center;
        gap: 16px;
        color: var(--text-muted);
        font-size: 10px;
        font-weight: 500;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        opacity: 0;
        animation: fade-in 180ms ease 40ms forwards;
      }

      .redirect-dots {
        display: flex;
        gap: 4px;
      }

      .redirect-dots span {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--text);
        animation: pulse 1.2s ease-in-out infinite;
      }

      .redirect-dots span:nth-child(2) {
        animation-delay: 0.2s;
      }

      .redirect-dots span:nth-child(3) {
        animation-delay: 0.4s;
      }

      .redirect-percent {
        min-width: 32px;
        color: var(--text-subtle);
        font-variant-numeric: tabular-nums;
        text-align: right;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      @media (max-width: 600px) {
        .redirect-loader {
          gap: 32px;
        }

        .redirect-logo {
          width: min(200px, calc(100vw - 48px));
        }
      }

      @keyframes fade-up {
        from {
          opacity: 0;
          transform: translateY(10px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fade-in {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 0.2;
        }

        50% {
          opacity: 1;
        }
      }
    </style>
  </head>
  <body>
    <main class="redirect-loader" aria-live="polite">
      <div class="redirect-logo" aria-hidden="true">
        <img class="redirect-logo-bg" src="/sprout-white-name.svg" alt="" />
        <div class="redirect-logo-fill" id="redirect-logo-fill">
          <img src="/sprout-white-name.svg" alt="" />
        </div>
      </div>

      <div class="redirect-status" aria-hidden="true">
        <span>Loading</span>
        <span class="redirect-dots">
          <span></span><span></span><span></span>
        </span>
        <span class="redirect-percent" id="redirect-percent">0%</span>
      </div>

      <p class="sr-only">Redirecting to ${siteUrl}/en/</p>
      <a class="sr-only" href="/en/">Continue to English site</a>
    </main>
    <script>
      const redirectDelayMs = 1200;
      const startedAt = window.performance.now();
      const logoFill = document.getElementById('redirect-logo-fill');
      const percent = document.getElementById('redirect-percent');

      const updateProgress = (now) => {
        const elapsed = Math.min(now - startedAt, redirectDelayMs);
        const progress = elapsed / redirectDelayMs;

        logoFill?.style.setProperty('--progress', String(progress));

        if (percent) {
          percent.textContent = Math.round(progress * 100) + '%';
        }

        if (elapsed < redirectDelayMs) {
          window.requestAnimationFrame(updateProgress);
          return;
        }

        window.location.replace('/en/');
      };

      window.requestAnimationFrame(updateProgress);
    </script>
  </body>
</html>
`,
  );
}

async function writePage(page: SitePageDefinition): Promise<void> {
  const content = translations[page.locale].siteContent;
  const pageTitle = page.kind === 'service' ? `${content.services.items[page.serviceIndex].title} — ${content.seo.title}` : content.seo.title;
  const pageDescription =
    page.kind === 'service'
      ? content.services.items[page.serviceIndex].body
      : content.seo.description;
  const pagePath = page.path;
  const fullUrl = `${siteUrl}${pagePath}`;
  const htmlPath = join(rootDir, pagePath.slice(1), 'index.html');

  await mkdir(dirname(htmlPath), { recursive: true });
  await writeFile(
    htmlPath,
    `<!doctype html>
<html lang="${page.locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0a0a08" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(pageDescription)}" />
    <link rel="canonical" href="${fullUrl}" />
    ${locales
      .map(
        (locale) =>
          `<link rel="alternate" hreflang="${locale}" href="${siteUrl}${getLocalizedPagePath(page, locale)}" />`,
      )
      .join('\n    ')}
    <link rel="alternate" hreflang="x-default" href="${siteUrl}/en/" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="/sprout-white-symbol.png" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Sprout" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(pageDescription)}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:image" content="${siteUrl}${ogImagePath}" />
    <meta property="og:image:alt" content="Sprout logo" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(pageDescription)}" />
    <meta name="twitter:image" content="${siteUrl}${ogImagePath}" />
    <meta name="twitter:image:alt" content="Sprout logo" />
    <script type="application/ld+json">
      ${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Sprout',
        url: siteUrl,
        logo: `${siteUrl}${ogImagePath}`,
        email: 'hello@wearesprout.se',
      })}
    </script>
    <script type="application/ld+json">
      ${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': page.kind === 'service' ? 'Service' : 'WebSite',
        name: page.kind === 'service' ? content.services.items[page.serviceIndex].title : 'Sprout',
        url: fullUrl,
        description: pageDescription,
        inLanguage: page.locale,
      })}
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
  );
}

async function writeRobots(pages: SitePageDefinition[]): Promise<void> {
  await writeFile(
    join(rootDir, 'public/robots.txt'),
    `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
  );
}

async function writeSitemap(pages: SitePageDefinition[]): Promise<void> {
  const urlEntries = pages
    .map((page) => {
      const localizedLinks = locales
        .map(
          (locale) =>
            `    <xhtml:link rel="alternate" hreflang="${locale}" href="${siteUrl}${getLocalizedPagePath(page, locale)}" />`,
        )
        .join('\n');

      return `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <changefreq>${page.kind === 'home' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page.kind === 'home' ? '1.0' : '0.8'}</priority>
${localizedLinks}
  </url>`;
    })
    .join('\n');

  await writeFile(
    join(rootDir, 'public/sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`,
  );
}

function getLocalizedPagePath(page: SitePageDefinition, locale: Locale): string {
  if (page.kind === 'home') {
    return `/${locale}/`;
  }

  const localizedPages = getIndexablePages().find(
    (candidate: SitePageDefinition) =>
      candidate.kind === 'service' &&
      candidate.serviceIndex === page.serviceIndex &&
      candidate.locale === locale,
  );

  return localizedPages?.path ?? `/${locale}/`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
