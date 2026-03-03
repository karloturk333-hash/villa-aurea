import { chromium, type Page } from 'playwright';
import path from 'path';
import fs from 'fs';

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/apartments', name: 'apartments' },
  { path: '/apartments/sunset-penthouse', name: 'apartment-detail' },
  { path: '/gallery', name: 'gallery' },
  { path: '/book', name: 'booking' },
  { path: '/experience', name: 'experience' },
];

async function scrollAndWait(page: Page) {
  // Scroll through entire page to trigger whileInView animations
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    const step = 250;
    for (let pos = 0; pos < totalHeight; pos += step) {
      window.scrollTo(0, pos);
      await new Promise(r => setTimeout(r, 60));
    }
    await new Promise(r => setTimeout(r, 800));
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 500));
  });

  // Wait for all images to finish loading
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('img'));
    await Promise.allSettled(
      images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>(resolve => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
          setTimeout(resolve, 8000);
        });
      })
    );
  });

  await page.waitForTimeout(500);
}

async function screenshot() {
  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  for (const p of PAGES) {
    const url = `http://localhost:3000${p.path}`;
    console.log(`📸 Screenshotting: ${p.name}...`);

    // Desktop
    const desktopPage = await browser.newPage();
    await desktopPage.setViewportSize({ width: 1440, height: 900 });
    await desktopPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await desktopPage.waitForTimeout(3000);
    await scrollAndWait(desktopPage);
    await desktopPage.screenshot({
      path: path.join(screenshotsDir, `${p.name}-desktop.png`),
      fullPage: true,
    });
    await desktopPage.close();

    // Mobile
    const mobilePage = await browser.newPage();
    await mobilePage.setViewportSize({ width: 390, height: 844 });
    await mobilePage.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await mobilePage.waitForTimeout(3000);
    await scrollAndWait(mobilePage);
    await mobilePage.screenshot({
      path: path.join(screenshotsDir, `${p.name}-mobile.png`),
      fullPage: true,
    });
    await mobilePage.close();

    console.log(`  ✓ ${p.name} done`);
  }

  await browser.close();
  console.log('\n✅ All screenshots saved to ./screenshots/');
}

screenshot().catch(console.error);
