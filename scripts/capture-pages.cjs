const puppeteer = require("puppeteer-core");
const fs = require("node:fs");
fs.mkdirSync("C:/rani/vantage-estates/qa", { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const [route, name] of [
    ["/", "home"],
    ["/listings", "listings"],
    ["/properties/one-bgc-tower", "detail"],
    ["/agents", "agents"],
  ]) {
    await page.goto("http://localhost:3000" + route, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1400));
    await page.screenshot({ path: `C:/rani/vantage-estates/qa/${name}.jpg` });
  }

  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/listings", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: "C:/rani/vantage-estates/qa/listings-mobile.jpg" });

  console.log("captured");
  await browser.close();
})();
