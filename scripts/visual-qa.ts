import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const pages = [
  { path: '/', name: 'home' },
  { path: '/apartments', name: 'apartments' },
  { path: '/apartments/sunset-penthouse', name: 'apartment-detail' },
  { path: '/experience', name: 'experience' },
  { path: '/gallery', name: 'gallery' },
  { path: '/book', name: 'book' },
];

const viewports = [
  { width: 1440, height: 900, label: 'desktop' },
  { width: 390, height: 844, label: 'mobile' },
];

async function run() {
  const browser = await chromium.launch();
  console.log(`📸 Starting visual QA — ${pages.length} pages × ${viewports.length} viewports\n`);

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    for (const p of pages) {
      const url = `${BASE_URL}${p.path}`;
      console.log(`  → ${vp.label} ${p.name} (${url})`);
      await page.goto(url, { waitUntil: 'networkidle' });
      // Wait for animations to settle
      await page.waitForTimeout(3000);
      await page.screenshot({
        path: `screenshots/${p.name}-${vp.label}.png`,
        fullPage: true,
      });
    }

    await context.close();
  }

  // Reduced motion check (desktop only, home page)
  console.log('\n  → reduced-motion home (desktop)');
  const reducedCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const reducedPage = await reducedCtx.newPage();
  await reducedPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await reducedPage.waitForTimeout(2000);
  await reducedPage.screenshot({
    path: 'screenshots/home-reduced-motion.png',
    fullPage: true,
  });
  await reducedCtx.close();

  await browser.close();
  console.log(`\n✅ Done — ${pages.length * viewports.length + 1} screenshots saved to /screenshots/`);
}

run().catch((err) => {
  console.error('Visual QA failed:', err);
  process.exit(1);
});
