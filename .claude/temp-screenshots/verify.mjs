import { chromium } from 'playwright-core';
import path from 'path';

const outDir = 'D:/Documents/Github/portfolio/.claude/temp-screenshots';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});

const page = await context.newPage();
await page.goto('http://localhost:4000/', { waitUntil: 'networkidle' });

// Wait for model/animations to settle
await page.waitForTimeout(2000);

// Screenshot 1: initial state
await page.screenshot({ path: path.join(outDir, 'tab-nav-initial.png'), fullPage: false });

// Scroll down enough to trigger sticky
await page.evaluate(() => {
  window.scrollBy(0, 500);
});
await page.waitForTimeout(500);

// Screenshot 2: scrolled state
await page.screenshot({ path: path.join(outDir, 'tab-nav-scrolled.png'), fullPage: false });

await browser.close();
console.log('Screenshots saved to', outDir);
