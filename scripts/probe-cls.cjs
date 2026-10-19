const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 823 });
  await page.evaluateOnNewDocument(() => {
    window.__shifts = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__shifts.push({
            value: entry.value,
            start: Math.round(entry.startTime),
            sources: (entry.sources || []).map((s) => ({
              tag: s.node ? s.node.tagName : null,
              cls: s.node ? String(s.node.className || "").slice(0, 60) : null,
              prev: s.previousRect ? Math.round(s.previousRect.top) : null,
              next: s.currentRect ? Math.round(s.currentRect.top) : null,
            })),
          });
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto("http://localhost:3000/listings", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 2500));
  const shifts = await page.evaluate(() => window.__shifts);
  console.log(JSON.stringify(shifts.slice(0, 5), null, 1));
  console.log("total:", shifts.reduce((sum, s) => sum + s.value, 0).toFixed(3));

  const a11y = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll("*")).filter((el) => {
      const cs = getComputedStyle(el);
      return cs.color && el.textContent && el.children.length === 0 && el.textContent.trim();
    });
    return els.slice(0, 0);
  });
  void a11y;
  await browser.close();
})();
