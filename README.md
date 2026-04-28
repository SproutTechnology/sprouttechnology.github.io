# Sprout Technology

Public frontend source for [wearesprout.se](https://wearesprout.se).

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

The site generates localized static entry pages before dev/build through `scripts/generate-seo.ts`. Production infrastructure and deployment are owned by the private ops repository. In production, the contact form expects the API to be available at `/api/contact` behind CloudFront.
