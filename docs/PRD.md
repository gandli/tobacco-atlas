# Product Requirements Document (PRD)

## Product Name

**Ciggies Crawler** - Chinese Tobacco Product Data Crawler

## Overview

Ciggies Crawler is a Python-based web scraper designed to extract comprehensive product data from [ciggies.app](https://www.ciggies.app/), a database of Chinese tobacco products. The crawler collects brand information, product specifications, images, and metadata for use in the Tobacco Atlas project.

---

## 1. Problem Statement

### Current Situation

- No public API exists for ciggies.app
- Product data is scattered across individual product pages
- Manual data collection is time-consuming and error-prone
- Data needs to be structured for integration with Tobacco Atlas

### Target Users

1. **Tobacco Atlas Project** - Needs structured product data for the website
2. **Researchers** - Require datasets for market analysis
3. **Developers** - Building applications on tobacco product data

---

## 2. Product Goals

### Primary Goals

1. Scrape all cigarette products from ciggies.app
2. Extract structured data including specifications, barcodes, and images
3. Output data in machine-readable JSON format
4. Handle rate limiting and errors gracefully

### Success Metrics

- Number of products successfully scraped
- Data completeness (all fields populated)
- Error rate < 1%
- Download success rate > 95%

---

## 3. Data Requirements

### 3.1 Brand Data

| Field          | Type   | Description                         |
| -------------- | ------ | ----------------------------------- |
| id             | int    | Brand ID                            |
| name           | string | Brand name (Chinese)                |
| company        | string | Parent company name (if detected)   |
| logo           | string | Absolute URL to brand logo          |
| description_cn | string | Brand biography (Chinese)           |
| description_en | string | Brand biography (English)           |
| product_count  | int    | Number of products under this brand |
| url            | string | Brand page URL                      |

### 3.2 Product Data

| Field          | Type   | Description                            |
| -------------- | ------ | -------------------------------------- |
| sku_id         | int    | Product SKU ID                         |
| name           | string | Product name (Chinese)                 |
| name_en        | string | Product name (English)                 |
| brand          | string | Brand name                             |
| brand_id       | int    | Brand ID                               |
| description_cn | string | Product description/bio (Chinese)      |
| description_en | string | Product description/bio (English)      |
| region         | string | Origin region                          |
| image          | string | Primary product image URL              |
| images         | array  | List of all matched product image URLs |
| pricing        | object | Pack, carton, and wholesale prices     |
| specifications | object | Product specifications                 |
| barcodes       | object | Box and carton barcodes                |

### 3.3 Specifications Object

| Field        | Type   | Description               |
| ------------ | ------ | ------------------------- |
| Tobacco Type | string | Flue-cured, blended, etc. |
| Tar          | string | Tar content (mg)          |
| Nicotine     | string | Nicotine content (mg)     |
| CO           | string | Carbon monoxide (mg)      |
| Length       | string | Cigarette length (mm)     |
| Format       | string | Regular, slim, etc.       |

---

## 4. Technical Requirements

### 4.1 Performance

- **Fast HTML Parsing**: Analyzes raw HTML and extracts JSON-LD structures without heavy browser automation.
- **Concurrency**: Parallel image downloads using threads (10 workers).
- **Graceful Execution**: Uses `uv` for seamless dependency resolution and environment containment.
- Resume capability for interrupted runs (maintains `crawler_state.json`).

### 4.2 Error Handling

- Retry failed requests (3 attempts)
- Log failed products for manual review
- Skip broken images gracefully
- Generate error report

### 4.3 Output Format

- JSON files with UTF-8 encoding
- Images saved as JPG
- Organized directory structure

---

## 5. Usage

```bash
# Setup dependency
uv sync

# Fetch data and download all images sequentially
uv run main.py --download

# Output directory structure
output/
├── brands.json        # Brand list & Bios
├── product_list.json  # Product SKU list
├── products.json      # Full product details
├── images/            # Product gallery images
│   ├── 3686_云烟_细支醇萃.jpg
│   └── ...
├── logos/             # Brand logos
└── report.json        # Crawl statistics
```

---

## 6. Integration with Tobacco Atlas

The scraped data is designed to integrate with the [Tobacco Atlas](https://github.com/gandli/tobacco-atlas) project:

1. **Product Catalog** - All cigarette products
2. **Brand Pages** - Grouped by brand
3. **Search Index** - Product names and descriptions
4. **Image Gallery** - Product pack designs

### Data Transformation

A separate script transforms the crawled data into Tobacco Atlas format:

```
ciggies_crawler/products.json → tobacco-atlas/data/products.json
```

---

## 7. Changelog

- **v5.x**:
  - Overhauled crawler architecture using explicit HTML matching and JSON-LD extraction (`get_data.py`).
  - Added bilingual field extraction (`description_cn`, `description_en`) and removed redundant `description`.
  - Added extraction of brand `logo` and `company`.
  - Unified CLI exposed via `main.py` utilizing `uv` environment mapping.
  - Image downloader decouples normal product images into `/images` and brand logos to `/logos`.

## License

MIT License
