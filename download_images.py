#!/usr/bin/env python3
"""
Download all brand and product images - with retry mechanism
"""
import os
import json
import time
import random
import logging
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Tuple, Optional

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).parent
OUTPUT_DIR = BASE_DIR / "output" / "images"
LOGO_DIR = BASE_DIR / "output" / "logos"
PRODUCTS_FILE = BASE_DIR / "output" / "products.json"
BRANDS_FILE = BASE_DIR / "output" / "brands.json"

# Create image directories
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
LOGO_DIR.mkdir(parents=True, exist_ok=True)

# Request headers
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.ciggies.app/",
}

# Global shared session for connection pooling
global_session = None

def get_session():
    """Get or create the global session with retry mechanism"""
    global global_session
    if global_session is None:
        global_session = requests.Session()
        retry_strategy = Retry(
            total=5,
            backoff_factor=1.5,
            status_forcelist=[403, 429, 500, 502, 503, 504],
            allowed_methods=["HEAD", "GET", "OPTIONS"]
        )
        # Increase pool size for concurrent threads
        adapter = HTTPAdapter(max_retries=retry_strategy, pool_connections=10, pool_maxsize=10)
        global_session.mount("http://", adapter)
        global_session.mount("https://", adapter)
    return global_session

def download_image(
    url: str, 
    is_logo: bool = False,
    max_retries: int = 3,
    retry_delay: float = 1.0,
    timeout: int = 30
) -> Tuple[str, str]:
    """
    Download a single image with retry logic
    
    Args:
        url: Image URL
        is_logo: Whether the image is a brand logo
        max_retries: Maximum number of retries
        retry_delay: Base delay time for retries (seconds)
        timeout: Request timeout time (seconds)
    
    Returns:
        tuple: (filename, status)
    """
    filename = url.split("/")[-1]
    target_dir = LOGO_DIR if is_logo else OUTPUT_DIR
    filepath = target_dir / filename
    
    # Skip if file already exists
    if filepath.exists():
        return filename, "exists"
    
    # Introduce random delay to avoid anti-scraping blocks
    time.sleep(random.uniform(0.5, 2.5))
    
    session = get_session()
    
    for attempt in range(max_retries + 1):
        try:
            # Rotate User-Agents minimally or just use a modern one
            current_headers = HEADERS.copy()
            current_headers["User-Agent"] = f"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{random.randint(120, 122)}.0.0.0 Safari/537.36"
            
            resp = session.get(
                url, 
                headers=current_headers, 
                timeout=timeout,
                stream=True
            )
            resp.raise_for_status()
            
            # Write to file
            with open(filepath, 'wb') as f:
                for chunk in resp.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
            
            logger.info(f"✅ Download successful: {filename}")
            return filename, "ok"
            
        except requests.exceptions.RequestException as e:
            if attempt < max_retries:
                # Exponential backoff + random jitter
                delay = retry_delay * (2 ** attempt) + random.uniform(0, 1)
                logger.warning(f"⚠️  Download failed (attempt {attempt + 1}/{max_retries + 1}): {filename} - {str(e)[:50]}, retrying in {delay:.1f}s")
                time.sleep(delay)
            else:
                error_msg = f"failed after {max_retries + 1} attempts: {str(e)[:50]}"
                logger.error(f"❌ Download completely failed: {filename} - {error_msg}")
                return filename, error_msg
        except Exception as e:
            error_msg = f"unexpected error: {str(e)[:50]}"
            logger.error(f"❌ Unexpected error: {filename} - {error_msg}")
            return filename, error_msg
    
    # Theoretically unreachable, but added for safety
    return filename, "unknown error"

def get_all_image_urls() -> List[Tuple[str, bool]]:
    """Extract all image URLs and their status (logo or not) from product and brand data"""
    url_map = {}
    
    # Extract product images
    if PRODUCTS_FILE.exists():
        try:
            with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
                products = json.load(f)
            
            for product in products:
                images = product.get('images', [])
                for img in images:
                    if 'url' in img:
                        url_map[img['url']] = False
        except Exception as e:
            logger.error(f"Failed to read product data: {e}")
    else:
        logger.warning(f"Product data file does not exist: {PRODUCTS_FILE}")

    # Extract brand logos
    if BRANDS_FILE.exists():
        try:
            with open(BRANDS_FILE, 'r', encoding='utf-8') as f:
                brands = json.load(f)
            
            for brand in brands:
                logo_url = brand.get('logo')
                if logo_url:
                    url_map[logo_url] = True
        except Exception as e:
            logger.error(f"Failed to read brand data: {e}")
    else:
        logger.warning(f"Brand data file does not exist: {BRANDS_FILE}")

    logger.info(f"📦 Found {len(url_map)} images to download")
    return [(k, v) for k, v in url_map.items()]

def main(limit=None):
    """Main function"""
    # Load product data
    items = get_all_image_urls()
    if not items:
        logger.error("No image URLs found, exiting")
        return
    
    # Prioritize Logos (True sorted first, so reverse=True)
    items.sort(key=lambda x: x[1], reverse=True)
    
    if limit:
        items = items[:limit]
        print(f"⚠️  Test mode: Only downloading the first {limit} images")
    
    print(f"📦 Total {len(items)} images to download")
    print(f"📁 Saving product images to: {OUTPUT_DIR}")
    print(f"📁 Saving brand images to: {LOGO_DIR}")
    print()
    
    # Download in parallel with reduced workers to prevent rate limiting
    downloaded = 0
    failed = []
    
    # Anti-scraping: Reduce concurrency from 10 to 3 workers
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(download_image, url, is_logo=is_logo): url for url, is_logo in items}
        
        for future in as_completed(futures):
            filename, status = future.result()
            
            if status == "ok":
                downloaded += 1
            elif status == "exists":
                downloaded += 1
            else:
                failed.append((filename, status))
            
            # Display progress
            total = len(items)
            done = downloaded + len(failed)
            if done % 100 == 0 or done == total:
                print(f"  Progress: {done}/{total} ({done/total*100:.1f}%)", end='\r')
    
    print()
    print(f"✅ Completed: {downloaded} images")
    if failed:
        print(f"❌ Failed: {len(failed)} images")
        for fn, err in failed[:10]:  # Only show first 10 failures
            print(f"  - {fn}: {err}")
    
    # Save failed list for future retries
    if failed:
        failed_file = OUTPUT_DIR / "download_failed.txt"
        with open(failed_file, 'w', encoding='utf-8') as f:
            for fn, err in failed:
                f.write(f"{fn}: {err}\n")
        print(f"📝 Failed list saved to: {failed_file}")

if __name__ == '__main__':
    main()