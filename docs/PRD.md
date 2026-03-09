# Product Requirements Document (PRD)

## Product Name

**Tobacco Atlas** (中国烟草图鉴)

## Executive Summary

Tobacco Atlas is a web-based informational platform that provides comprehensive, visually-appealing information about tobacco products available in China. The project is inspired by [ciggies.app](https://www.ciggies.app/) and aims to cover three main product categories: cigarettes, cigars, and e-cigarettes. The platform incorporates advanced features including AI-powered recommendations, product comparison tools, authenticity verification guides, and cigar preservation tips.

---

## 1. Problem Statement

### Current Situation

- Information about Chinese tobacco products is scattered across various sources
- No unified platform exists that covers cigarettes, cigars, AND e-cigarettes
- Existing resources lack visual appeal and modern user experience
- Difficult to compare products across different categories
- Lack of guidance on product authenticity and preservation techniques

### Target Users

1. **Tobacco Enthusiasts** - People interested in learning about different products
2. **Industry Professionals** - Sales, marketing, and research personnel
3. **Regulatory Personnel** - Law enforcement and compliance officers
4. **General Consumers** - People curious about tobacco products

---

## 2. Product Goals

### Primary Goals

1. Create a visually stunning, easy-to-navigate website
2. Cover three product categories comprehensively
3. Provide accurate, up-to-date product information
4. Support both Chinese and English languages
5. Implement AI-powered personalized recommendations
6. Offer product comparison tools for informed decision-making
7. Provide authenticity verification guides to combat counterfeits
8. Deliver cigar preservation tips for optimal enjoyment

### Success Metrics

- Page views and time on site
- Number of products cataloged
- User engagement (searches, comparisons, AI recommendations usage)
- Return visitor rate
- User satisfaction with authenticity verification and preservation guides

---

## 3. Product Categories

### 3.1 Cigarettes (香烟)

| Attribute | Description |
|-----------|-------------|
| Brand | Brand name (e.g., 中华, 黄鹤楼, 玉溪) |
| Series | Product line/series name |
| Type | Flue-cured, blended, etc. |
| Tar Content | mg per cigarette |
| Nicotine | mg per cigarette |
| Price Range | Retail price (RMB) |
| Origin | Province/Region |
| Pack Design | Visual images |
| Flavor Notes | Taste characteristics |

### 3.2 Cigars (雪茄烟)

| Attribute | Description |
|-----------|-------------|
| Brand | Brand name (e.g., 长城, 黄鹤楼雪茄) |
| Size | Length × Ring gauge |
| Wrapper | Leaf type and origin |
| Binder | Inner leaf type |
| Filler | Tobacco blend |
| Strength | Mild / Medium / Full |
| Flavor Profile | Tasting notes |
| Price | Retail price (RMB) |
| Origin | China / Import |

### 3.3 E-cigarettes (电子烟)

| Attribute | Description |
|-----------|-------------|
| Brand | Brand name (e.g., RELX, YOOZ, LAMI) |
| Device Type | Pod system / Disposable / Mod |
| Battery | mAh capacity |
| E-liquid Capacity | ml |
| Nicotine Strength | mg/ml or % |
| Flavors | Available flavor options |
| Price | Device and pod prices |
| Features | Smart features, charging type |

---

## 4. Feature Requirements

### 4.1 Core Features (MVP)

| Feature | Priority | Description |
|---------|----------|-------------|
| Product Catalog | P0 | Browse all products by category |
| Product Detail Page | P0 | Full specifications and images |
| Search | P0 | Search by brand, name, type |
| Filter | P0 | Filter by price, type, origin |
| Responsive Design | P0 | Mobile-first, works on all devices |

### 4.2 Enhanced Features (v1.1)

| Feature | Priority | Description |
|---------|----------|-------------|
| Product Comparison | P1 | Compare 2-4 products side by side |
| Favorites | P1 | Save favorite products |
| Price History | P1 | Track price changes over time |
| Reviews | P2 | User ratings and comments |

### 4.3 Advanced Features (v2.0)

| Feature | Priority | Description |
|---------|----------|-------------|
| AI Recommendations | P1 | Suggest products based on preferences and usage patterns |
| Authenticity Verification Guide | P1 | Comprehensive guides to identify genuine products |
| Cigar Preservation Tips | P1 | Expert advice on storing and preserving cigars |
| AR Preview | P2 | Augmented reality pack viewing |
| Price Alerts | P2 | Notify when prices change |
| API Access | P3 | Public API for developers |

---

## 5. Design Requirements

### Visual Style

- Inspired by [ciggies.app](https://www.ciggies.app/)
- Clean, minimal interface
- High-quality product photography
- Card-based layout
- Smooth animations and transitions

### Color Palette

```
Primary:    #1a1a2e (Dark Blue)
Secondary:  #16213e (Navy)
Accent:     #e94560 (Red/Pink)
Background: #0f0f23 (Deep Dark)
Text:       #eaeaea (Light Gray)
```

### Typography

- Headings: Inter / SF Pro Display
- Body: Inter / SF Pro Text
- Chinese: PingFang SC / Noto Sans SC

---

## 6. Technical Architecture

### Frontend

```
Next.js 14 (App Router)
├── React 18
├── TypeScript
├── Tailwind CSS
├── Framer Motion (animations)
└── React Query (data fetching)
```

### Data Layer

```
Content Source
├── JSON files (product data)
├── Markdown (articles)
├── AI Model (recommendations)
└── Images (Cloudinary / local)
```

### AI Services

- Machine Learning model for personalized recommendations
- Natural Language Processing for authenticity verification guides
- Image recognition for counterfeit detection (future)

### Deployment

- Platform: Vercel (recommended) or GitHub Pages
- CI/CD: GitHub Actions
- Analytics: Vercel Analytics / Google Analytics

---

## 7. Content Strategy

### Data Sources

1. Official brand websites
2. Tobacco industry publications
3. User submissions (moderated)
4. Partner APIs (if available)

### Content Types

- Product listings (structured data)
- Brand profiles
- Industry news
- Educational articles
- Authenticity verification guides
- Cigar preservation tips

---

## 8. Roadmap

### Phase 1: MVP (4 weeks)

- [ ] Set up project structure
- [ ] Design system and components
- [ ] Cigarette catalog (50+ products)
- [ ] Basic search and filter
- [ ] Deploy to Vercel

### Phase 2: Expansion (4 weeks)

- [ ] Cigar catalog (30+ products)
- [ ] E-cigarette catalog (30+ products)
- [ ] Product comparison feature
- [ ] English language support

### Phase 3: Enhancement (4 weeks)

- [ ] Price tracking
- [ ] User accounts
- [ ] Mobile app consideration
- [ ] SEO optimization

### Phase 4: Advanced Features (6 weeks)

- [ ] AI recommendation engine
- [ ] Authenticity verification guides
- [ ] Cigar preservation tips section
- [ ] Enhanced comparison tools

---

## 9. Domain Recommendations

### Premium Options

| Domain | Price Range | Notes |
|--------|-------------|-------|
| tobaccoatlas.com | $500-2000 | Best fit, descriptive |
| smokeatlas.com | $200-1000 | Shorter, catchy |
| vaporscope.com | $100-500 | Focus on e-cigs |

### Budget Options

| Domain | Price | Notes |
|--------|-------|-------|
| tobacco-atlas.com | $12/yr | Hyphenated, available |
| china-tobacco.guide | $15/yr | Descriptive |
| smokenguide.com | $20/yr | Available |

### Recommended Choice

**tobacco-atlas.com** - Clear, professional, and affordable

---

## 10. Legal Considerations

- All product information for educational purposes only
- Age verification may be required
- Disclaimer about health risks
- Respect trademark and copyright
- No sales or promotion of tobacco products
- Compliance with regulations for AI recommendations and authenticity verification

---

*Document Version: 1.1*
*Created: 2026-03-06*
*Updated: 2026-03-09*
*Author: Lobster AI Assistant 🦞*
