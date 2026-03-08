# Style Guide - Tobacco Atlas Web

This document defines the styling conventions for the Tobacco Atlas Web project to ensure consistency and maintainability.

## Units

### Preferred Units

| Unit | Use Case | Example |
|------|----------|---------|
| `rem` | Font sizes, spacing, dimensions | `font-size: 1rem`, `padding: 1.5rem` |
| `em` | Relative to parent font size | `margin: 0.5em` |
| `%` | Percentages for widths | `width: 100%` |
| `vw/vh` | Viewport-relative sizing | `min-height: 100vh` |
| `px` | Only for 1px borders, shadows | `border: 1px solid` |

### Conversion Reference (Base: 16px)

| px | rem |
|----|-----|
| 1px | 0.0625rem |
| 2px | 0.125rem |
| 4px | 0.25rem |
| 8px | 0.5rem |
| 10px | 0.625rem |
| 11px | 0.6875rem |
| 12px | 0.75rem |
| 13px | 0.8125rem |
| 14px | 0.875rem |
| 15px | 0.9375rem |
| 16px | 1rem |
| 17px | 1.0625rem |
| 24px | 1.5rem |
| 36px | 2.25rem |
| 40px | 2.5rem |
| 56px | 3.5rem |
| 80px | 5rem |
| 100px | 6.25rem |
| 140px | 8.75rem |
| 180px | 11.25rem |
| 260px | 16.25rem |
| 300px | 18.75rem |
| 380px | 23.75rem |
| 420px | 26.25rem |
| 1200px | 75rem |
| 1600px | 100rem |

## Border Radius

### Standard Radius Values

| Class | Value | Use Case |
|-------|-------|----------|
| `rounded-none` | 0 | No rounding |
| `rounded-sm` | calc(var(--radius) - 4px) | Small elements |
| `rounded` | var(--radius) | Default |
| `rounded-md` | calc(var(--radius) - 2px) | Medium elements |
| `rounded-lg` | var(--radius) | Large containers |
| `rounded-xl` | 0.75rem | Cards, boxes |
| `rounded-2xl` | 1rem | Large cards |
| `rounded-full` | 9999px | Pills, avatars |

### Custom Radius (use rem)

```css
/* Instead of: rounded-[8px] */
/* Use: rounded-lg or define in rem */
border-radius: 0.5rem; /* 8px */
```

## CSS Variables

### Design Tokens (index.css)

```css
:root {
  /* Spacing */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  
  /* Navigation */
  --nav-height: 3.5rem;    /* 56px */
  
  /* Radius */
  --radius: 9999px;        /* Pill style for buttons */
  --radius-card: 0.75rem;  /* 12px for cards */
  --radius-box: 0.5rem;    /* 8px for boxes */
}
```

## Tailwind Configuration

### Custom Font Sizes

Use Tailwind's built-in size classes instead of arbitrary values:

| Class | Size | Instead of |
|-------|------|------------|
| `text-xs` | 0.75rem (12px) | `text-[12px]` |
| `text-sm` | 0.875rem (14px) | `text-[14px]` |
| `text-base` | 1rem (16px) | `text-[16px]` |
| `text-lg` | 1.125rem (18px) | `text-[18px]` |

### Custom Sizes

For sizes not covered by Tailwind defaults, extend the config:

```ts
// tailwind.config.ts
theme: {
  extend: {
    fontSize: {
      '2xs': ['0.625rem', { lineHeight: '0.875rem' }], // 10px
      '3xs': ['0.5625rem', { lineHeight: '0.75rem' }], // 9px
    },
    width: {
      '140': '8.75rem',  // 140px
      '180': '11.25rem', // 180px
    },
    height: {
      '260': '16.25rem', // 260px
    },
    maxWidth: {
      '1200': '75rem',   // 1200px
      '1600': '100rem',  // 1600px
    },
  },
}
```

## Responsive Design

### Breakpoints (Tailwind Defaults)

| Breakpoint | Min Width |
|------------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### Mobile-First Approach

Always design for mobile first, then add responsive classes:

```jsx
// Good
<div className="px-4 md:px-6 lg:px-8">

// Avoid
<div className="px-8 md:px-6 lg:px-4">
```

## Overflow

### Handling Border Radius with Overflow

When using `border-radius`, ensure `overflow: hidden` is applied to clip content:

```jsx
// Good - overflow hidden clips content to rounded corners
<div className="rounded-xl overflow-hidden">
  <img src="..." alt="..." />
</div>

// Bad - corners may show content outside rounded area
<div className="rounded-xl">
  <img src="..." alt="..." />
</div>
```

## Common Patterns

### Card Component

```jsx
<div className="rounded-xl overflow-hidden border border-border bg-card">
  <img src="..." className="w-full aspect-[4/5] object-cover" />
  <div className="p-4">
    <h3 className="text-sm font-medium">Title</h3>
    <p className="text-xs text-muted-foreground">Description</p>
  </div>
</div>
```

### Navigation Height

```jsx
// Use CSS variable for consistent nav height
<nav className="h-[var(--nav-height)]">
  
// In CSS
:root {
  --nav-height: 3.5rem;
}
```

## Migration Checklist

- [ ] Convert all `text-[Npx]` to Tailwind classes or custom config
- [ ] Convert all `w-[Npx]` and `h-[Npx]` to rem or Tailwind classes
- [ ] Convert all `rounded-[Npx]` to Tailwind classes
- [ ] Update CSS variables to use rem
- [ ] Ensure `overflow-hidden` is applied to rounded containers
- [ ] Test responsive layouts at all breakpoints