# Sitewide Bilingual Rollout Design

## Summary

This spec expands bilingual support beyond the initial App Router surfaces and homepage stream. The next rollout covers the remaining high-traffic product and community surfaces that still mix Chinese hard-coded strings, English-only copy, or untranslated labels.

The target pages are:

- brand detail
- manufacturer detail
- SKU detail
- feed
- community leaderboard
- chat
- gallery
- my account

## Goals

- Move the remaining major pages onto the same Chinese/English translation system already used in the migrated app shell.
- Reuse a small set of new namespaces instead of scattering page strings across unrelated files.
- Keep bilingual data rendering consistent:
  - Chinese names remain primary where they are the source record
  - English descriptions and supporting labels are shown when the active language is English
  - missing English data falls back safely to Chinese

## Non-Goals

- Do not introduce locale-prefixed routing in this rollout.
- Do not localize user-generated content such as chat messages.
- Do not redesign layouts outside of text-fit or overflow fixes needed for translation.

## Recommended Approach

Add three new namespaces:

- `details`
- `social`
- `account`

Then convert the remaining pages to `react-i18next`-driven labels while using `getLocalizedText()` for database-backed bilingual fields.

This is preferred because it keeps the translation model simple, avoids duplicating keys across many page-specific JSON files, and lets the codebase continue migrating toward Next.js without blocking on a full routing-level i18n rewrite.

## Page Strategy

### Details

- `BrandDetail.tsx`
- `ManufacturerDetail.tsx`
- `SkuDetail.tsx`

These pages need the most careful bilingual treatment because they mix UI labels with structured product data. UI chrome moves into `details`, while descriptions, titles, and region labels use current-language selection plus fallback.

### Social

- `Feed.tsx`
- `Community.tsx`
- `Chat.tsx`
- `Gallery.tsx`

These pages are mostly UI text and empty-state copy. User-generated content remains as-is; only controls, headings, tabs, helper text, and placeholders become translated.

### Account

- `MyPage.tsx`

This page is mostly menu metadata and sign-in prompts, so it should be fully translation-driven through `account`.

## Data Rules

- Prefer English description fields when `i18n.resolvedLanguage` is English.
- Fall back to Chinese if English data is missing.
- Keep brand and manufacturer names in source form unless a true translated field exists.
- Region display should follow the active language, not show mixed bilingual pills by default.

## Testing

- Add focused tests for representative pages:
  - detail page translated UI
  - social/account translated empty state or header
- Keep verification centered on:
  - `bun run test`
  - `bun run typecheck`
  - `bun run lint`

## Acceptance Criteria

- All listed pages read UI strings from translation namespaces.
- English mode no longer leaves obvious Chinese-only shell text on these pages.
- Chinese mode continues to render correctly.
- Data-backed bilingual content falls back safely when English fields are absent.
