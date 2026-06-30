const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[BROWSER ${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    console.log(`[BROWSER PAGE ERROR] ${err.toString()}`);
  });

  console.log("Navigating to localhost:3000...");
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    console.log("Navigation successful. Waiting 5 seconds...");
    // click on the page to trigger cinematic
    await page.mouse.click(100, 100);
    console.log("Clicked to start cinematic...");
    await new Promise(r => setTimeout(r, 5000));
  } catch (err) {
    console.error("Navigation failed:", err);
  }

  await browser.close();
})();
