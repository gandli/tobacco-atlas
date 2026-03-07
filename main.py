#!/usr/bin/env uv run
# /// script
# requires-python = ">=3.9"
# dependencies = [
#     "requests",
#     "beautifulsoup4",
#     "rich",
# ]
# ///
import argparse
import sys
import os
import warnings

# Suppress urllib3 NotOpenSSLWarning globally
import urllib3.exceptions
warnings.filterwarnings(
    action="ignore",
    category=urllib3.exceptions.NotOpenSSLWarning
)

from rich.console import Console
from rich.panel import Panel

# Import modules from our local files
try:
    import get_data
    import download_images
except ImportError as e:
    print(f"Error importing required modules: {e}")
    print("Please ensure you are running this from the project root directory containing get_data.py and download_images.py")
    sys.exit(1)

console = Console()

def parse_args():
    parser = argparse.ArgumentParser(
        description="Ciggies Data Processing Pipeline",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  uv run main.py                     # Run the data crawler only
  uv run main.py --download          # Run the full crawler, then download images
  uv run main.py --test 5            # Run crawler for 5 items only
  uv run main.py --test 5 --download # Run crawler & downloader for purely 5 items
"""
    )
    
    parser.add_argument("--test", type=int, help="Run a quick test limiting to N items")
    parser.add_argument("--download", action="store_true", help="Also download images after crawling data")
    
    return parser.parse_args()

def run_crawler(args=None):
    console.print(Panel("[bold green]Starting Data Crawler...[/]", expand=False))
    if args and getattr(args, 'test', None):
        console.print(f"[cyan]Running in TEST mode (limit: {args.test} products)[/]")
        get_data.test_crawl(args.test)
    else:
        get_data.crawl_all_products()
        
def run_downloader(args=None):
    console.print(Panel("[bold green]Starting Image Downloader...[/]", expand=False))
    limit = args.test if args and getattr(args, 'test', None) else None
    if limit:
        console.print(f"[cyan]Running in TEST mode (limit: {limit} images)[/]")
    download_images.main(limit=limit)

def main():
    args = parse_args()
    
    run_crawler(args)
    
    if args.download:
        console.print("\n" + "="*50 + "\n")
        run_downloader(args)
        
    console.print(Panel("[bold green]✨ All tasks finished successfully![/]", expand=False))

if __name__ == "__main__":
    main()
