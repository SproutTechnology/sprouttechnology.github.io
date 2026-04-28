# Frontend Cleanup Plan

## Objective

We should treat the current migration branch as a functional replacement, but not as the final frontend architecture. The next pass should reduce file size, lower component-specific styling, remove avoidable effects, and make the app easier to maintain page by page.

This cleanup must preserve the current visual result and public routes. It is not a redesign.

## Current Findings

Largest implementation files:

| File | Lines | Main risk |
| --- | ---: | --- |
| `src/components/organisms/navigation-bar/navigation-bar.tsx` | 786 | Navigation, modal/panel state, layout styling and link rendering live in one file. |
| `src/components/organisms/industry-showcase/industry-showcase.tsx` | 746 | Multiple effects, modal behavior, preview layout and grid rendering are coupled. |
| `src/components/organisms/services-section/services-section.tsx` | 638 | Cards, modal, active state and content layout are all local to one component. |
| `src/components/organisms/cases-section/cases-section.tsx` | 594 | Similar modal/card pattern to services, duplicated structure and styling. |
| `src/components/organisms/hero/hero.tsx` | 551 | Canvas animation, entrance behavior and hero content are mixed. |
| `src/components/organisms/family-section/family-section.tsx` | 470 | Tabs, portfolio rows, exits and text expansion are coupled. |
| `src/components/organisms/contact-block/contact-block.tsx` | 446 | Form state, API integration, validation copy and layout styling are in one file. |
| `src/i18n/translations.ts` | 1316 | Large static data file, acceptable short term but should be split if it slows review. |

Repeated patterns:

- Many local `styled-components` that encode one-off layout rules.
- Multiple section-specific modal implementations.
- Several `useEffect` blocks used for DOM/event behavior that could be isolated into hooks.
- Similar "expand lead text", "active card", "close on escape", "lock body scroll", and "measure/animate" patterns repeated across sections.
- Page routing and SEO mutation are currently handled directly in `App.tsx`.

## Cleanup Principles

1. Refactor one page or section at a time.
2. Keep behavior and copy unchanged unless the change is explicitly part of the task.
3. Prefer small local extractions before introducing shared abstractions.
4. Create shared primitives only after the same pattern appears in at least two cleaned sections.
5. Effects must have a named reason. If an effect manages DOM events, timers, observers or body state, move it into a focused hook.
6. Styled-components should describe reusable structure, not every visual one-off. Prefer existing atoms, layout primitives, and shared section/card/modal primitives.
7. Each cleanup PR must include tests for the behavior it touches.
8. Run `pnpm build` and `pnpm test` before considering a cleanup step done.

## Target Architecture

Suggested structure:

```text
src/
  components/
    atoms/
    molecules/
      modal/
      section-shell/
      expandable-text/
      card-grid/
    organisms/
      hero/
      navigation-bar/
      services-section/
      cases-section/
      industry-showcase/
      family-section/
      contact-block/
  hooks/
    use-body-scroll-lock.ts
    use-escape-key.ts
    use-intersection-entered.ts
    use-prefers-reduced-motion.ts
    use-active-index.ts
  pages/
    home-page.tsx
    service-page.tsx
  routing/
    resolve-page.ts
  seo/
    use-page-meta.ts
```

This structure should be introduced incrementally. Do not move everything at once.

## Shared Building Blocks To Extract

Create these only when a cleanup step needs them:

| Candidate | Purpose | First useful in |
| --- | --- | --- |
| `Modal` | Overlay, panel, close button, escape close, scroll lock. | Services and cases. |
| `ExpandableText` | Lead text truncation and read-more/read-less behavior. | Services and family. |
| `SectionShell` | Common section padding, max width, section header placement. | Services, cases, family, who-we-are. |
| `CardGrid` | Responsive card grid rules. | Services, cases, industry. |
| `useEscapeKey` | Escape handling without repeating effects. | Navigation, services, cases, industry. |
| `useBodyScrollLock` | Lock document scroll while panel/modal is open. | Navigation, services, cases, industry. |
| `useIntersectionEntered` | One-shot entrance/visibility state. | Hero, ticker, parallax, nav. |
| `usePageMeta` | Document title and meta description updates. | `App.tsx`. |

## Page-By-Page Plan

### 1. App Shell And Routing

Files:

- `src/App.tsx`
- `src/i18n/site-pages.ts`
- New `src/pages/home-page.tsx`
- New `src/pages/service-page.tsx`
- New `src/seo/use-page-meta.ts`

Tasks:

- Move home page rendering out of `App.tsx` into `HomePage`.
- Move service rendering out of `App.tsx` into `ServicePage`.
- Move document title and meta description effect into `usePageMeta`.
- Keep `App.tsx` responsible only for resolving the current page and selecting the page component.

Acceptance:

- `App.tsx` should be under roughly 70 lines.
- No route behavior changes.
- `src/App.test.tsx` still covers home and service route rendering.
- `pnpm build` and `pnpm test` pass.

### 2. Navigation

File:

- `src/components/organisms/navigation-bar/navigation-bar.tsx`

Tasks:

- Split rendering into `DesktopNavigation`, `MobileNavigationPanel`, `LanguageToggle`, `ThemeToggle`, and `ContactNavAction`.
- Extract panel behavior into hooks: escape close, outside click if present, and body scroll lock.
- Replace local repeated link mapping with small pure helpers.
- Keep all navigation data derived from `content`.

Acceptance:

- Main `navigation-bar.tsx` should become an orchestration file, ideally under 250 lines.
- Each extracted child component should have a single responsibility.
- Keyboard and mobile menu behavior must remain covered by tests or get new tests.
- No visual regression in desktop or mobile nav.

### 3. Hero

File:

- `src/components/organisms/hero/hero.tsx`

Tasks:

- Separate hero content from canvas animation.
- Move canvas animation into `HeroCanvasAnimation` or a hook with a clear lifecycle.
- Add a reduced-motion path that disables or simplifies animation.
- Keep entrance state isolated from content rendering.

Acceptance:

- Animation setup and cleanup are easy to audit.
- Canvas code has no dependency on translated content.
- Reduced motion is respected.
- Hero tests cover content rendering; animation code is either unit-light or isolated enough for manual verification.

### 4. Services

File:

- `src/components/organisms/services-section/services-section.tsx`

Tasks:

- Extract `ServiceCard`, `ServiceModal`, and `ServicePreview`.
- Reuse a shared `Modal` only if it can also support cases without special casing.
- Move active service state into a small hook if the same pattern is used by cases.
- Reuse `ExpandableText` for lead copy.

Acceptance:

- Services section file becomes mostly composition and data mapping.
- Modal close behavior is shared or isolated.
- Existing services test continues to pass and adds modal interaction coverage if not already present.

### 5. Cases

File:

- `src/components/organisms/cases-section/cases-section.tsx`

Tasks:

- Mirror the services cleanup where the patterns match.
- Extract `CaseCard`, `CaseModal`, `CaseDetailGrid`, and `CaseOutcome`.
- Replace duplicated modal behavior with the shared modal abstraction if it was introduced in services.

Acceptance:

- Cases no longer duplicates services modal infrastructure.
- Case-specific layout remains local.
- Tests cover open/close behavior and rendered case details.

### 6. Industry Showcase

File:

- `src/components/organisms/industry-showcase/industry-showcase.tsx`

Tasks:

- Identify each `useEffect` and classify it as event handling, modal behavior, measurement, animation, or derived state.
- Move each DOM/event effect into a named hook.
- Extract `IndustryGrid`, `IndustryCell`, `IndustryModal`, and `IndustryPreview`.
- Remove any state that can be derived during render without causing layout churn.

Acceptance:

- No anonymous multi-purpose effects remain in the main component.
- Modal behavior matches shared modal semantics where possible.
- Test coverage verifies selected industry, modal content and close behavior.

### 7. Family Section

File:

- `src/components/organisms/family-section/family-section.tsx`

Tasks:

- Extract `FamilyTabs`, `InvestmentList`, `ExitGrid`, and `PortfolioGroups`.
- Reuse `ExpandableText`.
- Keep portfolio and investment rendering data-driven.

Acceptance:

- Main file reads as section composition.
- Active tab behavior is tested.
- No change to displayed investments/exits/portfolio content.

### 8. Contact Block

File:

- `src/components/organisms/contact-block/contact-block.tsx`

Tasks:

- Split `ContactInfo`, `ContactCompanyMeta`, and `ContactForm`.
- Move form submission into `useContactForm` or a small service function plus hook.
- Keep `VITE_CONTACT_ENDPOINT` access in one place.
- Make field validation and submission states explicit.

Acceptance:

- Contact API endpoint behavior remains compatible with GitHub Pages env variable `VITE_CONTACT_ENDPOINT`.
- Tests cover successful submit, failed submit, and honeypot behavior if present.
- The form can be read without scrolling through layout styling.

### 9. Styling Consolidation

Tasks:

- After two or three sections are cleaned, review repeated styled-components.
- Promote only stable patterns into shared primitives.
- Avoid a large design-system rewrite before the page-level cleanup proves the right primitives.

Candidate primitives:

- `SectionShell`
- `SectionHeader`
- `ResponsiveGrid`
- `InteractiveCard`
- `Modal`
- `ActionLink`
- `MediaFrame`

Acceptance:

- Shared primitives reduce duplication without forcing awkward props.
- Section files still read naturally.
- No primitive should exist for only one component unless it clarifies a complex local concern.

### 10. i18n Content Split

File:

- `src/i18n/translations.ts`

Tasks:

- Split by locale or domain only if review friction remains high after component cleanup.
- Prefer `translations.en.ts` and `translations.sv.ts`, or `content/home.ts` and `content/services.ts`.
- Keep the public `useSiteContent` API stable.

Acceptance:

- No content key changes visible to components.
- Translation tests continue to cover required structure.

## Release Gate For Cleanup Work

Each cleanup slice must satisfy:

- `pnpm build`
- `pnpm test`
- No tracked file changes after a clean build.
- No removed route, anchor target or locale path.
- No new dependency unless it removes real code complexity and is approved.
- No broad restyling bundled with structural cleanup.

## Suggested Execution Order

1. App shell and page split.
2. Shared modal foundation through services.
3. Cases reuse of modal foundation.
4. Navigation split and hook cleanup.
5. Industry showcase effect cleanup.
6. Hero canvas isolation.
7. Contact form split.
8. Family section split.
9. Styling consolidation pass.
10. Optional i18n content split.

This order reduces risk because it starts with low-behavior structure, then attacks duplicated modal behavior before the most effect-heavy components.

## Definition Of Done

The cleanup is complete when:

- No organism file is carrying unrelated concerns such as data mapping, modal behavior, animation lifecycle and form/API logic all in the same file.
- Most organism files are under roughly 250 to 300 lines, except where static markup genuinely dominates.
- Effects are isolated in named hooks or have a narrow, documented purpose.
- Shared primitives exist for repeated layout and modal patterns.
- Tests cover the interactive behavior that was extracted.
- GitHub Pages build and deploy flow remains unchanged.
