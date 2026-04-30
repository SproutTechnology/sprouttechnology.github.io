<p align="center">
  <a href="https://www.wearesprout.se">
    <img src="public/sprout-black-name.svg" alt="Sprout" width="320" />
  </a>
</p>

# Sprout Technology

Public frontend source for [www.wearesprout.se](https://www.wearesprout.se).

Sprout is a hybrid between an IT consultancy company and an investment company. We build software, back people, and help companies make better technical decisions early enough for those decisions to matter.

Our mission is lasting impact through software: for our clients, for the companies we invest in, and for the people building products that need to work in the real world.

## What We Do

Sprout works across consultancy, software development, AI and agents, advisory, project delivery, startup building, and investment.

The common thread is practical ownership. We help teams modernize legacy systems, build new products, improve architecture, ship internal tools, and bring senior engineering judgment into the moments where quality, speed, and long-term maintainability all matter.

## What We Care About

Software is the tool. Outcomes are the point.

We care about systems that hold up in production, code the next person can understand, teams that take responsibility from idea to launch, and advice shaped by real experience rather than slide-deck theory.

Over the years, Sprout has also grown into a family of companies across consultancy, health, proptech, femtech, fintech, sportstech, and beyond. Those companies are connected by a shared belief that software, used well, builds something lasting.

## Repository

This repository contains the public static frontend for the Sprout website.

- Framework: React with TypeScript
- Build tool: Vite
- Styling: styled-components
- Tests: Vitest and Testing Library
- Hosting: GitHub Pages
- Production domain: `https://www.wearesprout.se`

AWS infrastructure lives in the private ops repository and currently owns the contact API only.

## Development

Install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

## Validation

Run the production build:

```bash
pnpm build
```

Run the test suite:

```bash
pnpm test
```

## Contact API

The contact form reads `VITE_CONTACT_ENDPOINT` at build time and falls back to `/api/contact` for local or proxied environments.

For GitHub Pages production builds, set this repository variable:

```text
VITE_CONTACT_ENDPOINT=https://<api-id>.execute-api.eu-north-1.amazonaws.com/api/contact
```

This value is public client-side configuration, not a secret.

## Deployment

The GitHub Pages workflow builds and tests pull requests, but only deploys on push to `main`.

After a merge to `main`, GitHub Actions builds `dist` and publishes it to GitHub Pages for the configured custom domain.

The SEO generator uses `https://www.wearesprout.se` as the canonical production origin and generates route entrypoints, metadata, `robots.txt`, and `sitemap.xml`.
