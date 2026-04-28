# Sprout Technology

Public frontend source for [www.wearesprout.se](https://www.wearesprout.se).

The site is hosted by GitHub Pages from this repository. AWS infrastructure lives in the private ops repository and currently owns the contact API only.

## Development

```bash
pnpm install
pnpm dev
```

## Validation

```bash
pnpm build
pnpm test
```

## Contact API

The contact form reads `VITE_CONTACT_ENDPOINT` at build time and falls back to `/api/contact` for local/proxied environments.

For GitHub Pages production builds, set this repository variable:

```text
VITE_CONTACT_ENDPOINT=https://<api-id>.execute-api.eu-north-1.amazonaws.com/api/contact
```

The SEO generator uses `https://www.wearesprout.se` as the canonical production origin.
