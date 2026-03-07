# 🦞 Ciggies Crawler

A web crawler for [ciggies.app](https://www.ciggies.app/) to scrape Chinese tobacco product data and images.

## Data Overview

- **Brands**: 218
- **Products**: 3,220
- **Fields**: Product name, specifications, barcodes, prices, images, etc.

## Requirements

This project now uses `uv` for lightning-fast dependency and environment management.

```bash
# Data extraction relies on standard libraries and some HTML parsers
uv pip install -r requirements.txt
```

## Usage

We provide a unified entry script `main.py` with flat arguments for simplicity:

```bash
# 1. Scrape all data (no images)
uv run main.py

# 2. Scrape data AND download all images/logos
uv run main.py --download

# 3. Test mode (first 5 products)
uv run main.py --test 5

# 4. Test mode with downloads
uv run main.py --test 5 --download
```

## Output

All data is saved to the `output/` directory:

- `brands.json` - Brand list (enriched with logo, company, and bio)
- `products.json` - Detailed product info
- `images/` - Product gallery images
- `logos/` - Brand logos
- `report.json` - Crawl statistics report

## Data Structure

### Brand (brands.json)

```json
{
  "id": 319,
  "name": "云烟",
  "product_count": 96,
  "url": "https://www.ciggies.app/brand/319"
}
```

### Product Detail (products.json)

```json
{
  "sku_id": 3686,
  "name": "云烟（细支醇萃）",
  "name_en": "YunYan Pure Extraction Slim",
  "brand": "云烟",
  "description_cn": "口味特征：本香为基，焦甜辅韵...",
  "description_en": "Flavor profile: Based on original fragrance...",
  "region": "大陆 · Mainland China",
  "image": "https://www.ciggies.app/api/img/products/xxx.jpg",
  "specifications": {
    "Tobacco Type": "烤烟型",
    "Tar": "7 mg",
    "Nicotine": "0.7 mg",
    "CO": "6 mg",
    "Length": "100 mm",
    "Format": "细支"
  },
  "pricing": {
    "pack": "¥20",
    "carton": "¥200",
    "wholesale": "¥175"
  },
  "barcodes": {
    "box_barcode": "6901028319089",
    "carton_barcode": "6901028319096"
  }
}
```

## Changelog

**v5.1 (Latest)**

- **Unified Entry CLI**: Added `main.py` with streamlined parameters (`--download`, `--test`).
- **Data Cleanup**: Automatically sanitizes redundant data (`description` field) for optimal JSON storage.
- **Improved Downloader**: Downloads are prioritized; product images saved to `/images` and brand logos to `/logos`. Overhauled retry logic.

**v5.0**

- **Architecture**: Refactored to `get_data.py`. Replaced Selenium with HTML and JSON-LD direct parsing for speed and stability.
- **Robust Extractions**: Now perfectly handles bilingual biography extraction (`description_cn`, `description_en`), full image linking, box/carton barcodes, and pricing structures.
- **Resilience**: Implemented robust exponential backoff for aggressive SSL warnings and Connection Error recovery.

## License

MIT
