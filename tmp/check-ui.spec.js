const { test } = require('@playwright/test');

test('inspect local pages', async ({ page }) => {
  const results = {};

  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await page.locator('a[href^="/sku/"]').first().hover();
  const overlay = page.locator('.sku-card-overlay-content').first();
  results.overlay = await overlay.evaluate((node) => {
    const styles = window.getComputedStyle(node);
    const title = node.querySelector('[data-testid="product-card-overlay-title"]');
    const brand = node.querySelector('[data-testid="product-card-overlay-brand"]');
    return {
      overflowY: styles.overflowY,
      clientHeight: node.clientHeight,
      scrollHeight: node.scrollHeight,
      titleText: title?.textContent,
      brandText: brand?.textContent,
    };
  });
  await page.screenshot({ path: '/tmp/home-overlay.png' });

  for (const url of [
    'http://127.0.0.1:3000/maker/anhui-tobacco',
    'http://127.0.0.1:3000/maker/4',
    'http://127.0.0.1:3000/chat',
    'http://127.0.0.1:3000/changelog',
  ]) {
    await page.goto(url, { waitUntil: 'networkidle' });
    results[url] = {
      title: await page.locator('h1').first().textContent().catch(() => null),
      frameClass: await page.locator('[data-testid="page-frame"]').first().getAttribute('class').catch(() => null),
      bodyHas404: await page.locator('body').textContent().then((text) => text.includes('404')).catch(() => false),
    };
  }

  console.log(JSON.stringify(results, null, 2));
});
