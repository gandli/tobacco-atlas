# Home I18n And Infinite List Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add stable Chinese and English support to the migrated App Router pages and upgrade the homepage product area to a skeleton-backed infinite list.

**Architecture:** Keep the App Router page shell as Server Components where possible, continue using `react-i18next` for translated UI, and move the scroll-driven home product experience into a focused Client Component. Preserve existing route-level loading shells and progressively render product cards in batches with an `IntersectionObserver`.

**Tech Stack:** Next.js App Router, React 18, TypeScript, `react-i18next`, Vitest, Testing Library, bun

---

## File Map

- Create: `src/locales/zh-CN/manufacturers.json`
- Create: `src/locales/en-US/manufacturers.json`
- Create: `src/lib/i18n-utils.ts`
- Create: `src/components/HomeProductStream.tsx`
- Create: `src/components/HomeProductStream.test.tsx`
- Modify: `src/lib/i18n.ts`
- Modify: `src/components/LanguageSwitcher.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/pages/BrandList.tsx`
- Modify: `src/pages/ManufacturerList.tsx`
- Modify: `src/pages/ManufacturerList.test.tsx`
- Modify: `src/test/setup.ts`

## Chunk 1: Bilingual App Router Baseline

### Task 1: Add manufacturer translation namespaces

**Files:**
- Create: `src/locales/zh-CN/manufacturers.json`
- Create: `src/locales/en-US/manufacturers.json`

- [ ] **Step 1: Write the failing test**

Add test expectations in `src/pages/ManufacturerList.test.tsx` for translated page title and search placeholder in both Chinese and English.

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test src/pages/ManufacturerList.test.tsx`
Expected: FAIL because the current page is hard-coded and does not react to translated strings.

- [ ] **Step 3: Add locale files**

Define translated keys for:
- page badge
- title
- subtitle
- search placeholder
- filters
- sort labels
- empty states
- stats labels

- [ ] **Step 4: Run targeted test again**

Run: `bun run test src/pages/ManufacturerList.test.tsx`
Expected: still FAIL until the page consumes the new namespace.

- [ ] **Step 5: Commit**

```bash
git add src/locales/zh-CN/manufacturers.json src/locales/en-US/manufacturers.json src/pages/ManufacturerList.test.tsx
git commit -m "test: cover manufacturer translations"
```

### Task 2: Extend i18n resources and fallback helpers

**Files:**
- Create: `src/lib/i18n-utils.ts`
- Modify: `src/lib/i18n.ts`

- [ ] **Step 1: Write the failing test**

Add a new helper test file or extend an existing one to verify that bilingual field selection returns English when active and falls back to Chinese when missing.

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test src/lib/i18n-utils.test.ts`
Expected: FAIL because the helper does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Add:
- the `manufacturers` namespace to the i18n resource map
- a small helper to choose localized field content with fallback behavior

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun run test src/lib/i18n-utils.test.ts src/pages/ManufacturerList.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/i18n.ts src/lib/i18n-utils.ts src/lib/i18n-utils.test.ts src/pages/ManufacturerList.test.tsx
git commit -m "feat: add app router i18n fallback helpers"
```

### Task 3: Make migrated pages consume stable translations

**Files:**
- Modify: `src/components/LanguageSwitcher.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/pages/BrandList.tsx`
- Modify: `src/pages/ManufacturerList.tsx`

- [ ] **Step 1: Write the failing tests**

Add or extend tests for:
- brand page translated labels
- manufacturer page translated labels
- language switcher reflecting the active language

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun run test src/components/Navbar.test.tsx src/pages/ManufacturerList.test.tsx`
Expected: FAIL on new translation expectations.

- [ ] **Step 3: Write minimal implementation**

Update migrated pages and shared controls to:
- consume the right namespaces
- use translated labels instead of hard-coded mixed language strings
- use helper-based fallback when showing bilingual supporting text

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun run test src/components/Navbar.test.tsx src/pages/ManufacturerList.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/LanguageSwitcher.tsx src/components/Navbar.tsx src/components/HeroSection.tsx src/pages/BrandList.tsx src/pages/ManufacturerList.tsx src/components/Navbar.test.tsx src/pages/ManufacturerList.test.tsx
git commit -m "feat: localize migrated app router pages"
```

## Chunk 2: Home Infinite Product Stream

### Task 4: Add test coverage for progressive home loading

**Files:**
- Create: `src/components/HomeProductStream.test.tsx`
- Modify: `src/test/setup.ts`

- [ ] **Step 1: Write the failing test**

Cover:
- initial visible batch size
- append on observer trigger
- localized end-of-list text
- append skeleton shown while loading more

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test src/components/HomeProductStream.test.tsx`
Expected: FAIL because the component and observer support are missing.

- [ ] **Step 3: Add test support**

Add a controllable `IntersectionObserver` mock in `src/test/setup.ts` that tests can drive explicitly.

- [ ] **Step 4: Run test again**

Run: `bun run test src/components/HomeProductStream.test.tsx`
Expected: still FAIL until the component exists.

- [ ] **Step 5: Commit**

```bash
git add src/components/HomeProductStream.test.tsx src/test/setup.ts
git commit -m "test: cover home infinite product stream"
```

### Task 5: Implement the home product stream

**Files:**
- Create: `src/components/HomeProductStream.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/ProductGrid.tsx`

- [ ] **Step 1: Write the minimal implementation**

Build a client component that:
- renders an initial product batch
- appends batches through an observer-driven sentinel
- shows bottom skeleton cards during appends
- renders a localized end-of-list label

- [ ] **Step 2: Run targeted tests**

Run: `bun run test src/components/HomeProductStream.test.tsx src/components/ProductGrid.test.tsx`
Expected: PASS

- [ ] **Step 3: Integrate into the home page**

Replace the fixed secondary home section with the new stream while keeping the hero and route-level skeleton behavior intact.

- [ ] **Step 4: Re-run targeted tests**

Run: `bun run test src/components/HomeProductStream.test.tsx src/app/loading.test.tsx src/components/ProductGrid.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/HomeProductStream.tsx src/app/page.tsx src/components/ProductGrid.tsx src/components/HomeProductStream.test.tsx src/components/ProductGrid.test.tsx
git commit -m "feat: add infinite home product stream"
```

## Chunk 3: Verification

### Task 6: Full verification sweep

**Files:**
- Modify as needed based on failures from verification

- [ ] **Step 1: Run focused automated tests**

Run: `bun run test src/App.test.tsx src/components/Navbar.test.tsx src/components/HeroSection.test.tsx src/components/ProductGrid.test.tsx src/components/HomeProductStream.test.tsx src/pages/ManufacturerList.test.tsx src/app/loading.test.tsx`
Expected: PASS

- [ ] **Step 2: Run typecheck**

Run: `bun run typecheck`
Expected: PASS

- [ ] **Step 3: Run lint**

Run: `bun run lint`
Expected: PASS with no new errors; existing warnings may remain if untouched.

- [ ] **Step 4: Run route checks**

Run:
- `curl -I http://127.0.0.1:3000/`
- `curl -I http://127.0.0.1:3000/brands`
- `curl -I http://127.0.0.1:3000/manufacturers`

Expected: all three return `200 OK`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: verify home i18n and infinite list rollout"
```
