#!/usr/bin/env python3
"""
Ciggies.app Crawler v5.0 - Fast HTML Parser Edition
Parse JSON-LD structured data directly from HTML without browser rendering
"""

import os
import re
import json
import time
import random
import requests
import warnings
from pathlib import Path
from datetime import datetime
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Suppress SSL warnings for legacy systems
try:
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    import warnings
    warnings.filterwarnings("ignore", category=urllib3.exceptions.NotOpenSSLWarning)
except ImportError:
    pass

# ============== Configuration ==============
BASE_URL = "https://www.ciggies.app"
OUTPUT_DIR = Path(__file__).parent / "output"
STATE_FILE = OUTPUT_DIR / "crawler_state.json"

# Rate limiting - More conservative to avoid anti-scraping blocks
MIN_DELAY = 1.0
MAX_DELAY = 3.0
MAX_RETRIES = 5
BATCH_SIZE = 50

# Proxy (optional)
PROXIES = None
if os.environ.get("PROXY_SERVER"):
    PROXIES = {"http": os.environ["PROXY_SERVER"], "https": os.environ["PROXY_SERVER"]}

# Headers
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
}

# Create output directories
OUTPUT_DIR.mkdir(exist_ok=True)


# ============== State Management ==============
def load_state():
    """Load crawler state for resume capability"""
    if STATE_FILE.exists():
        with open(STATE_FILE, 'r', encoding='utf-8') as f:
            state = json.load(f)
            print(f"📂 Loaded state from {state.get('last_updated', 'unknown')}")
            return state
    return {
        'brands_done': False,
        'products_list_done': False,
        'crawled_skus': [],
        'failed_skus': [],
        'total_products': 0,
        'start_time': None,
        'last_updated': None,
    }


def save_state(state):
    """Save crawler state"""
    state['last_updated'] = datetime.now().isoformat()
    with open(STATE_FILE, 'w', encoding='utf-8') as f:
        json.dump(state, f, indent=2, ensure_ascii=False)


# ============== HTTP Request ==============
global_session = None

def get_session():
    """Get or create the global session with retry mechanism"""
    global global_session
    if global_session is None:
        from urllib3.util.retry import Retry
        from requests.adapters import HTTPAdapter
        global_session = requests.Session()
        retry_strategy = Retry(
            total=MAX_RETRIES,
            backoff_factor=1.5,
            status_forcelist=[403, 429, 500, 502, 503, 504],
            allowed_methods=["HEAD", "GET", "OPTIONS"]
        )
        adapter = HTTPAdapter(max_retries=retry_strategy, pool_connections=10, pool_maxsize=10)
        global_session.mount("http://", adapter)
        global_session.mount("https://", adapter)
    return global_session

def fetch(url, retry=0):
    """Fetch URL with retry logic"""
    session = get_session()
    try:
        # Increase delay with retries (exponential backoff)
        delay = random.uniform(MIN_DELAY, MAX_DELAY)
        if retry > 0:
            delay = (2 ** retry) + random.uniform(2, 5)
            print(f"  ⏳ Waiting {delay:.1f}s before retry {retry}...")
        
        time.sleep(delay)
        
        # Dynamic User-Agent Rotation
        current_headers = HEADERS.copy()
        current_headers["User-Agent"] = f"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{random.randint(115, 122)}.0.0.0 Safari/537.36"
        
        # Use verify=True but be prepared for SSL issues
        resp = session.get(url, headers=current_headers, proxies=PROXIES, timeout=30, verify=True)
        resp.raise_for_status()
        return resp.text
    except (requests.exceptions.SSLError, requests.exceptions.ConnectionError) as e:
        if retry < MAX_RETRIES + 4:  # Aggressive retries for SSL/Connection
            return fetch(url, retry + 1)
        raise
    except Exception as e:
        if retry < MAX_RETRIES:
            print(f"  ⚠️ Retry {retry+1}/{MAX_RETRIES}: {e}")
            return fetch(url, retry + 1)
        raise


def clean_product_data(products):
    """Remove redundant 'description' field and ensure consistent structure"""
    if not products:
        return products
    
    cleaned = []
    for p in products:
        if isinstance(p, dict):
            # Remove redundant description that matches description_cn
            if 'description' in p:
                p.pop('description', None)
            cleaned.append(p)
    return cleaned


# ============== Data Extraction ==============
def get_all_brands():
    """Get all brand information from brands page"""
    print(f"📦 DEBUG: Starting get_all_brands for {BASE_URL}/brands")
    
    try:
        html = fetch(f"{BASE_URL}/brands")
        print(f"📦 DEBUG: Fetch successful, HTML length: {len(html)}")
        if html:
            clean_snippet = html[:100].replace('\n', ' ')
            print(f"📦 DEBUG: HTML snippet: {clean_snippet}")
    except Exception as e:
        print(f"❌ DEBUG: Fetch failed with error: {e}")
        return []

    if not html:
        print("❌ DEBUG: HTML is empty!")
        return []

    soup = BeautifulSoup(html, 'html.parser')
    
    brands = []
    for link in soup.select('a[href^="/brand/"]'):
        href = link.get('href', '')
        brand_id = href.split('/brand/')[-1].strip('/')
        
        if not brand_id or not brand_id.isdigit():
            continue
        
        full_text = link.get_text(strip=True)
        
        # Structure is usually: ChineseNameCountSlug (e.g. "黄鹤楼217huanghelou")
        # Extract Chinese part (non-digit prefix)
        name_match = re.match(r'^([^\d]+)', full_text)
        name = name_match.group(1).strip() if name_match else ""
        
        # Get count
        count_match = re.search(r'(\d+)', full_text)
        count = int(count_match.group(1)) if count_match else 0
        
        # Additional cleanup: handle cases like "双喜·好日子"
        if name and count > 0:
            brands.append({
                'id': int(brand_id),
                'name': name,
                'product_count': count,
                'url': f"{BASE_URL}{href}"
            })
    
    # Deduplicate
    seen = set()
    unique_brands = []
    for b in brands:
        if b['id'] not in seen:
            seen.add(b['id'])
            unique_brands.append(b)
    
    print(f"✅ Found {len(unique_brands)} brands")
    return unique_brands
    
    # Deduplicate
    seen = set()
    unique_brands = []
    for b in brands:
        if b['id'] not in seen:
            seen.add(b['id'])
            unique_brands.append(b)
    
    print(f"✅ Found {len(unique_brands)} brands")
    return unique_brands


def get_brand_products(brand_id, brand_name):
    """Get all products and detailed info under a brand"""
    url = f"{BASE_URL}/brand/{brand_id}"
    
    try:
        html = fetch(url)
        soup = BeautifulSoup(html, 'html.parser')
    except Exception as e:
        print(f"  ⚠️ Brand {brand_name}: {e}")
        return [], {}
    
    # 1. Extract Brand Details
    brand_detail = {
        'id': brand_id,
        'name': brand_name,
        'url': url
    }
    
    # Logo - Based on /html/body/div[2]/div/div/div/div/div[1]/img
    # Usually in the hero/header section of the brand page
    logo_el = soup.select_one('img[src*="/api/img/brands/"]')
    if not logo_el:
        logo_el = soup.select_one('main img') # Fallback to first image in main
    
    if logo_el:
        brand_detail['logo'] = urljoin(BASE_URL, logo_el.get('src', ''))
    
    # Let's find the text container near the logo and all descriptive p tags
    paragraphs = soup.select('p')
    potential_bios = [p.get_text(strip=True) for p in paragraphs if len(p.get_text(strip=True)) > 20]
    
    for text in potential_bios:
        # Density detection
        cnt_cn = len([c for c in text if '\u4e00' <= c <= '\u9fff'])
        cnt_en = len([c for c in text if 'a' <= c.lower() <= 'z'])
        
        if cnt_cn > cnt_en:
            # If it's a very short Chinese string, it might be the company
            if len(text) < 50 and 'company' not in brand_detail:
                brand_detail['company'] = text
            else:
                brand_detail['description_cn'] = text
        else:
            brand_detail['description_en'] = text

    # 2. Extract Products
    products = []
    for link in soup.select('a[href^="/sku/"]'):
        href = link.get('href', '')
        sku_id = href.split('/sku/')[-1].strip('/')
        
        if not sku_id or not sku_id.isdigit():
            continue
        
        # Get product name
        name_el = link.select_one('.font-chinese, [class*="font-chinese"]')
        name = name_el.get_text(strip=True) if name_el else ''
        
        products.append({
            'sku_id': int(sku_id),
            'name': name,
            'url': f"{BASE_URL}{href}",
            'brand_id': brand_id,
            'brand_name': brand_name
        })
    
    # Deduplicate products
    seen = set()
    unique_products = []
    for p in products:
        if p['sku_id'] not in seen:
            seen.add(p['sku_id'])
            unique_products.append(p)
    
    return unique_products, brand_detail


def get_product_detail(sku_id):
    """Get detailed product information from HTML"""
    url = f"{BASE_URL}/sku/{sku_id}"
    
    try:
        html = fetch(url)
        soup = BeautifulSoup(html, 'html.parser')
    except Exception as e:
        return None, str(e)
    
    product = {
        'sku_id': sku_id,
        'url': url,
        'crawled_at': datetime.now().isoformat()
    }
    
    # 1. Extract JSON-LD (most reliable for core fields)
    json_ld = soup.select_one('script[type="application/ld+json"]')
    if json_ld:
        try:
            ld = json.loads(json_ld.string)
            product['name'] = ld.get('name', '')
            product['name_en'] = ld.get('alternateName', '')
            product['brand'] = ld.get('brand', {}).get('name', '') if isinstance(ld.get('brand'), dict) else ld.get('brand', '')
            
            # Ensure full image URL from JSON-LD
            img_url = ld.get('image', '')
            if img_url:
                product['image'] = urljoin(BASE_URL, img_url)
            
            if ld.get('offers'):
                offers = ld['offers']
                product['price'] = offers.get('price', '')
                product['currency'] = offers.get('priceCurrency', 'CNY')
        except json.JSONDecodeError:
            pass
    
    # Explicitly ensure NO 'description' field from JSON-LD or previous logic
    product.pop('description', None)
    
    # 2. Extract Biography/Description (CN & EN) using all p tags
    # Target often has flavor features and brand stories
    all_p = soup.select('p')
    for p in all_p:
        text = p.get_text(strip=True)
        # Lower minimum length to catch shorter English descriptions
        if not text or len(text) < 10: continue
        
        # Skip labels, names and prices
        if text.startswith('¥') or text == product.get('name') or text == product.get('name_en'):
            continue
        if 'Pack price' in text or 'Carton price' in text:
            continue
            
        # Density check
        c_count = len([c for c in text if '\u4e00' <= c <= '\u9fff'])
        e_count = len([c for c in text if 'a' <= c.lower() <= 'z'])
        
        # If text is purely English + numbers, c_count will be 0
        if c_count > e_count:
            # Prefer longer descriptions or first encounter
            if 'description_cn' not in product or len(text) > len(product.get('description_cn', '')):
                product['description_cn'] = text
        elif e_count > 0: # Ensures there's at least some English letters
            if 'description_en' not in product or len(text) > len(product.get('description_en', '')):
                product['description_en'] = text

    # 3. Extract region from stamp

    # 3. Extract region from stamp
    stamp = soup.select_one('.stamp')
    if stamp:
        product['region'] = stamp.get_text(strip=True)
    
    # 3. Extract images from HTML (product images only)
    # Use regex for more reliable extraction from raw HTML
    images = []
    seen_urls = set()
    
    # Find all product image URLs in HTML
    img_pattern = r'/api/img/products/[a-zA-Z0-9]+\.(?:png|jpg|jpeg)'
    for match in re.finditer(img_pattern, html, re.IGNORECASE):
        img_path = match.group(0)
        full_url = urljoin(BASE_URL, img_path)
        if full_url not in seen_urls:
            seen_urls.add(full_url)
            images.append({
                'type': f'gallery_{len(images) + 1}',
                'url': full_url
            })
    
    if images:
        product['images'] = images
        product['image_count'] = len(images)
    
    # 4. Extract specifications from page text
    specs = {}
    body_text = soup.get_text()
    
    # Standard specs
    spec_patterns = {
        'Tar': r'Tar\s*\n?\s*([\d.]+)\s*mg',
        'Nicotine': r'Nicotine\s*\n?\s*([\d.]+)\s*mg',
        'CO': r'CO\s*\n?\s*([\d.]+)\s*mg',
        'Length': r'Length\s*\n?\s*(\d+)\s*mm',
        'Format': r'Format\s*\n?\s*(\S+)',
        'Count/Box': r'Count\s*/\s*Box\s*\n?\s*(\d+)',
        'Boxes/Carton': r'Boxes\s*/\s*Carton\s*\n?\s*(\d+)',
    }
    
    for key, pattern in spec_patterns.items():
        match = re.search(pattern, body_text, re.IGNORECASE)
        if match:
            specs[key] = match.group(1)
    
    # Chinese format
    cn_patterns = {
        'Tar': r'焦油量[^\d]*(\d+)\s*mg',
        'Nicotine': r'烟碱量[^\d]*([\d.]+)\s*mg',
        'CO': r'一氧化碳量[^\d]*(\d+)\s*mg',
    }
    
    for key, pattern in cn_patterns.items():
        if key not in specs:
            match = re.search(pattern, body_text)
            if match:
                specs[key] = match.group(1)
    
    if specs:
        product['specifications'] = specs
    
    # 5. Extract pricing (including wholesale)
    pricing = {}
    price_match = re.search(r'Pack price[^¥]*¥(\d+)', body_text, re.IGNORECASE)
    if price_match:
        pricing['pack'] = f"¥{price_match.group(1)}"
    
    cart_match = re.search(r'Carton price[^¥]*¥(\d+)', body_text, re.IGNORECASE)
    if cart_match:
        pricing['carton'] = f"¥{cart_match.group(1)}"
    
    wholesale_match = re.search(r'Wholesale[^¥]*¥(\d+)', body_text, re.IGNORECASE)
    if wholesale_match:
        pricing['wholesale'] = f"¥{wholesale_match.group(1)}"
    
    if pricing:
        product['pricing'] = pricing
    
    # 6. Extract barcodes from HTML
    barcodes = {}
    
    # Find all 13-digit barcodes with their labels
    # Pattern: "Box barcode" followed by span containing the number
    barcode_pattern = r'(Box barcode|Carton barcode)[^<]*<[^>]*>[^<]*<[^>]*>(\d{13})'
    for match in re.finditer(barcode_pattern, html, re.DOTALL):
        label = match.group(1).lower().replace(' ', '_')
        barcodes[label] = match.group(2)
    
    if barcodes:
        product['barcodes'] = barcodes
    
    # 7. Extract ratings (if available)
    ratings = {}
    rating_patterns = {
        'votes': r'(\d+)\s*votes?',
        'taste': r'Taste\s*\n?\s*([\d.]+)',
        'pack': r'Pack\s*\n?\s*([\d.]+)',
        'value': r'Value\s*\n?\s*([\d.]+)',
        'overall': r'Overall\s*\n?\s*([\d.]+)',
    }
    
    for key, pattern in rating_patterns.items():
        match = re.search(pattern, body_text, re.IGNORECASE)
        if match:
            val = match.group(1)
            # Skip invalid values like '.'
            if val and val != '.' and not val.startswith('.'):
                try:
                    ratings[key] = float(val) if '.' in val else int(val)
                except ValueError:
                    pass
    
    if ratings:
        product['ratings'] = ratings
    
    return product, None


# ============== Main Crawler ==============
def crawl_all_products(brand_limit=None):
    """Main crawling function"""
    state = load_state()
    
    if not state.get('start_time'):
        state['start_time'] = datetime.now().isoformat()
    
    try:
        # Step 1: Get brands
        brands_file = OUTPUT_DIR / 'brands.json'
        
        if not state.get('brands_done') or not brands_file.exists():
            brands = get_all_brands()
            with open(brands_file, 'w', encoding='utf-8') as f:
                json.dump(brands, f, ensure_ascii=False, indent=2)
            state['brands_done'] = True
            save_state(state)
        else:
            with open(brands_file, 'r', encoding='utf-8') as f:
                brands = json.load(f)
            print(f"📦 Loaded {len(brands)} brands from cache")
        
        # Step 2: Get all product SKUs and enrich Brand details
        products_file = OUTPUT_DIR / 'product_list.json'
        
        if not state.get('products_list_done') or not products_file.exists():
            print("\n📦 Fetching product list and enriching brands...")
            all_products = []
            enriched_brands = []
            
            for i, brand in enumerate(brands):
                if brand_limit and i >= brand_limit:
                    print(f"\n✋ Reached limit of {brand_limit} brands. Stopping.")
                    break
                    
                try:
                    # Get products and brand details (logo, company, bio)
                    products, updated_brand = get_brand_products(brand['id'], brand['name'])
                    
                    # Merge information (preserving existing fields)
                    brand.update(updated_brand)
                    enriched_brands.append(brand)
                    
                    all_products.extend(products)
                    print(f"  [{i+1}/{len(brands)}] {brand['name']}: {len(products)} products found", end='\r')
                    
                except Exception as e:
                    print(f"  ❌ Brand {brand['name']} failed: {e}")
            
            # Final merge and save: Enriched brands + remaining untouched brands
            final_brands_list = enriched_brands + brands[len(enriched_brands):]
            with open(brands_file, 'w', encoding='utf-8') as f:
                json.dump(final_brands_list, f, ensure_ascii=False, indent=2)

            # Deduplicate products
            seen = set()
            unique_products = []
            for p in all_products:
                if p['sku_id'] not in seen:
                    seen.add(p['sku_id'])
                    unique_products.append(p)
            all_products = unique_products
            
            with open(products_file, 'w', encoding='utf-8') as f:
                json.dump(all_products, f, ensure_ascii=False, indent=2)
            
            state['products_list_done'] = True
            state['total_products'] = len(all_products)
            save_state(state)
            print(f"\n✅ Total: {len(all_products)} products")
        else:
            with open(products_file, 'r', encoding='utf-8') as f:
                all_products = json.load(f)
            print(f"📦 Loaded {len(all_products)} products from cache")
        
        # Step 3: Crawl product details
        crawled_set = set(state.get('crawled_skus', []))
        failed_skus = state.get('failed_skus', [])
        
        product_details = []
        details_file = OUTPUT_DIR / 'products.json'
        
        if details_file.exists():
            with open(details_file, 'r', encoding='utf-8') as f:
                product_details = clean_product_data(json.load(f))
            print(f"📦 Loaded {len(product_details)} existing details (cleaned redundant fields)")
        
        pending = [p for p in all_products if p['sku_id'] not in crawled_set]
        total = len(all_products)
        
        print(f"\n📦 Crawling {len(pending)} pending products...")
        
        for i, product in enumerate(pending):
            try:
                detail, error = get_product_detail(product['sku_id'])
                
                if detail and detail.get('name'):
                    detail['brand_id'] = product.get('brand_id')
                    detail['brand_name'] = product.get('brand_name')
                    product_details.append(detail)
                    crawled_set.add(product['sku_id'])
                    
                    name = detail.get('name', 'Unknown')
                    price = detail.get('price', 'N/A')
                    print(f"  ✅ [{len(crawled_set)}/{total}] {name} - ¥{price} ({(i+1)/len(pending)*100:.1f}%)", end='\r')
                else:
                    failed_skus.append({'sku_id': product['sku_id'], 'error': error or 'No data'})
                    print(f"  ⏭️ [{len(crawled_set)}/{total}] SKU {product['sku_id']} skipped", end='\r')
                
                # Save progress periodically
                if (i + 1) % BATCH_SIZE == 0:
                    state['crawled_skus'] = list(crawled_set)
                    state['failed_skus'] = failed_skus[-100:]
                    save_state(state)
                    
                    with open(details_file, 'w', encoding='utf-8') as f:
                        json.dump(product_details, f, ensure_ascii=False, indent=2)
                
            except KeyboardInterrupt:
                print("\n\n⚠️ Interrupted! Saving progress...")
                break
            except Exception as e:
                failed_skus.append({'sku_id': product['sku_id'], 'error': str(e)})
        
        # Final save
        product_details = clean_product_data(product_details)
        with open(details_file, 'w', encoding='utf-8') as f:
            json.dump(product_details, f, ensure_ascii=False, indent=2)
        
        state['crawled_skus'] = list(crawled_set)
        state['failed_skus'] = failed_skus
        save_state(state)
        
        print(f"\n✅ Crawled {len(product_details)} products")
        if failed_skus:
            print(f"⚠️ Failed: {len(failed_skus)} SKUs")
        
        # Generate report
        elapsed = (datetime.now() - datetime.fromisoformat(state['start_time'])).total_seconds()
        
        report = {
            'crawl_date': datetime.now().isoformat(),
            'total_brands': len(brands),
            'total_products': len(all_products),
            'successful_details': len(product_details),
            'failed_details': len(failed_skus),
            'elapsed_seconds': elapsed,
            'elapsed_minutes': round(elapsed / 60, 1),
        }
        
        with open(OUTPUT_DIR / 'report.json', 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        
        print(f"\n📊 Crawl complete!")
        print(f"  - Brands: {report['total_brands']}")
        print(f"  - Products: {report['total_products']}")
        print(f"  - Details: {report['successful_details']}")
        print(f"  - Time: {report['elapsed_minutes']} minutes")
        
        return product_details
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        raise


def test_crawl(limit=10):
    """Test crawl with limited products and enriched brands"""
    print(f"🦞 Testing with {limit} products...\n")
    
    # Use existing brands.json
    brands_file = OUTPUT_DIR / 'brands.json'
    if brands_file.exists():
        with open(brands_file, 'r', encoding='utf-8') as f:
            brands = json.load(f)
    else:
        brands = get_all_brands()
    
    if not brands:
        print("❌ No brands found")
        return
    
    # Get products from first brand
    brand = brands[0]
    print(f"\n📦 Getting products and info from {brand['name']} (ID: {brand['id']})...")
    products, enriched_brand = get_brand_products(brand['id'], brand['name'])
    products = products[:limit]
    
    print(f"\n📊 Enriched Brand Info:")
    print(f"    Logo: {enriched_brand.get('logo', 'N/A')}")
    print(f"    Company: {enriched_brand.get('company', 'N/A')}")
    print(f"    Bio EN: {enriched_brand.get('description_en', 'N/A')[:100]}...")
    print(f"    Bio CN: {enriched_brand.get('description_cn', 'N/A')[:100]}...")
    
    print(f"\n📦 Crawling {len(products)} products...\n")
    
    results = []
    for i, p in enumerate(products):
        print(f"[{i+1}/{len(products)}] SKU {p['sku_id']}...", end=' ')
        detail, error = get_product_detail(p['sku_id'])
        
        if detail:
            detail['brand_id'] = brand['id']
            detail['brand_name'] = brand['name']
            results.append(detail)
            print(f"{detail.get('name', 'N/A')} - ¥{detail.get('price', 'N/A')}")
            print(f"      - Desc CN: {detail.get('description_cn', 'N/A')[:60]}...")
            print(f"      - Desc EN: {detail.get('description_en', 'N/A')[:60]}...")
        else:
            print(f"Failed: {error}")
    
    print(f"\n✅ Test Complete. Enriched info would be saved to brands.json in full run.")
    return results


def main():
    import sys
    
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == 'test':
            limit = int(sys.argv[2]) if len(sys.argv) > 2 else 10
            test_crawl(limit)
        elif cmd == 'test_brands':
            limit = int(sys.argv[2]) if len(sys.argv) > 2 else 3
            print(f"🦞 Testing with first {limit} brands fully...")
            crawl_all_products(brand_limit=limit)
    else:
        print("🦞 Ciggies Crawler v5.0 (Fast HTML Parser)")
        print("=" * 60)
        start_time = time.time()
        crawl_all_products()
        elapsed = time.time() - start_time
        print(f"\n⏱️  Total time: {elapsed/60:.1f} minutes")

if __name__ == '__main__':
    main()