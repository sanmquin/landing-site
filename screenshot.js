const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });

  // Mobile viewport (Instagram traffic)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12/13/14
    deviceScaleFactor: 2
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:8080');
  await mobilePage.screenshot({ path: 'mobile_preview.png', fullPage: true });

  // Desktop viewport
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:8080');
  await desktopPage.screenshot({ path: 'desktop_preview.png', fullPage: true });

  await browser.close();
  console.log("Screenshots captured successfully");
})();
