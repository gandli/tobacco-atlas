# Sitewide Bilingual Rollout Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend bilingual support to the remaining major product, community, and account pages.

**Architecture:** Add three translation namespaces for details, social, and account surfaces, then wire existing React Router pages into `react-i18next` while using shared bilingual field helpers for data-backed content. Keep route structure unchanged and localize only the shell text plus data selection logic.

**Tech Stack:** React, react-router-dom, react-i18next, TypeScript, Vitest, bun

---

## Chunk 1: Translation Resources

### Task 1: Add new locale namespaces

**Files:**
- Create: `src/locales/zh-CN/details.json`
- Create: `src/locales/en-US/details.json`
- Create: `src/locales/zh-CN/social.json`
- Create: `src/locales/en-US/social.json`
- Create: `src/locales/zh-CN/account.json`
- Create: `src/locales/en-US/account.json`
- Modify: `src/lib/i18n.ts`

- [ ] Write failing tests for representative page strings.
- [ ] Run tests to verify failure.
- [ ] Add locale JSON files and register namespaces in `src/lib/i18n.ts`.
- [ ] Re-run tests and confirm namespace resolution works.
- [ ] Commit.

## Chunk 2: Detail Pages

### Task 2: Localize brand and manufacturer detail pages

**Files:**
- Modify: `src/pages/BrandDetail.tsx`
- Modify: `src/pages/ManufacturerDetail.tsx`
- Create/Modify tests for detail pages

- [ ] Write failing tests for translated headings, breadcrumbs, and empty states.
- [ ] Run tests to verify failure.
- [ ] Implement translation-driven UI labels and bilingual field selection.
- [ ] Re-run targeted tests.
- [ ] Commit.

### Task 3: Localize SKU detail page

**Files:**
- Modify: `src/pages/SkuDetail.tsx`
- Create/Modify tests for SKU detail page

- [ ] Write failing tests for translated labels, placeholders, and region display.
- [ ] Run tests to verify failure.
- [ ] Implement `details` namespace usage and bilingual description selection.
- [ ] Re-run targeted tests.
- [ ] Commit.

## Chunk 3: Social And Account Pages

### Task 4: Localize feed, community, chat, gallery, and my account

**Files:**
- Modify: `src/pages/Feed.tsx`
- Modify: `src/pages/Community.tsx`
- Modify: `src/pages/Chat.tsx`
- Modify: `src/pages/Gallery.tsx`
- Modify: `src/pages/MyPage.tsx`
- Create/Modify representative tests

- [ ] Write failing tests for translated headings or empty-state text.
- [ ] Run tests to verify failure.
- [ ] Implement `social` and `account` namespace usage.
- [ ] Re-run targeted tests.
- [ ] Commit.

## Chunk 4: Verification

### Task 5: Full verification

**Files:**
- Modify as needed based on verification failures

- [ ] Run relevant test suites with `bun run test`.
- [ ] Run `bun run typecheck`.
- [ ] Run `bun run lint`.
- [ ] Commit if fixes were needed.
