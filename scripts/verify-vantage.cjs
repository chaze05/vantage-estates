const puppeteer = require("puppeteer-core");
const fs = require("node:fs");
fs.mkdirSync("C:/rani/vantage-estates/qa", { recursive: true });

const BASE = "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message.slice(0, 140)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 140));
  });

  await page.setViewport({ width: 1440, height: 900 });

  const cardCount = () =>
    page.evaluate(() => document.querySelectorAll("main article").length);

  await page.goto(BASE + "/listings", { waitUntil: "networkidle0", timeout: 90000 });
  await sleep(1200);
  console.log("initial cards:", await cardCount());

  await page.evaluate(() => {
    const chip = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent.trim() === "Condo"
    );
    if (chip) chip.click();
  });
  await sleep(900);
  console.log("Condo filter:", await cardCount(), "| url:", page.url().includes("type=Condo"));

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const clear = buttons.find((b) => b.textContent.trim() === "Clear all filters");
    if (clear) clear.click();
  });
  await sleep(700);

  const search = await page.$('input[placeholder="City, property or keyword…"]');
  if (search) await search.type("BGC");
  await sleep(800);
  console.log("search BGC:", await cardCount());

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const clear = buttons.find((b) => b.textContent.trim() === "Clear all filters");
    if (clear) clear.click();
  });
  await sleep(700);

  await page.select('select[aria-label="Sort properties"]', "price-asc");
  await sleep(800);
  const firstPrice = await page.evaluate(() => {
    const price = document.querySelector("main article p.text-emerald");
    return price ? price.textContent.trim() : null;
  });
  console.log("price asc first:", firstPrice, "| expected ₱6.5M");

  await page.evaluate(() => localStorage.removeItem("vantage.favorites.v1"));
  await page.reload({ waitUntil: "networkidle0" });
  await sleep(1000);
  await page.evaluate(() => {
    const button = document.querySelector('button[aria-label="Save property"]');
    if (button) button.click();
  });
  await sleep(600);
  const badge = () =>
    page.evaluate(() => {
      const link = document.querySelector('a[aria-label^="Saved properties"]');
      return link ? link.textContent.trim() : null;
    });
  console.log("favorite badge:", await badge());

  await page.goto(BASE + "/listings?saved=1", { waitUntil: "networkidle0" });
  await sleep(1200);
  console.log("saved filter count:", await cardCount());

  // Detail page: gallery + inquiry
  await page.goto(BASE + "/properties/one-bgc-tower", { waitUntil: "networkidle0" });
  await sleep(900);
  console.log("detail title:", await page.evaluate(() => document.querySelector("h1").textContent.trim()));

  await page.evaluate(() => {
    const button = document.querySelector('button[aria-label="Open photo gallery"]');
    if (button) button.click();
  });
  await sleep(700);
  console.log("gallery open:", await page.evaluate(() => Boolean(document.querySelector('[role="dialog"]'))));
  await page.keyboard.press("Escape");
  await sleep(800);
  console.log("gallery closed:", await page.evaluate(() => !document.querySelector('[role="dialog"]')));

  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent.trim() === "Request a viewing"
    );
    if (button) button.click();
  });
  await sleep(500);
  console.log("empty inquiry blocked:", await page.evaluate(() => document.body.innerText.includes("Please tell us your name.")));

  const fill = async (name, value) => {
    const el = await page.$(`[name="${name}"]`);
    if (el) await el.type(value);
  };
  await fill("name", "Rani Rubillos");
  await fill("email", "rani@example.com");
  await fill("phone", "+63 917 555 0142");
  await fill("message", "Please send me the floor plans and viewing times.");
  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent.trim() === "Request a viewing"
    );
    if (button) button.click();
  });
  await sleep(1300);
  console.log("inquiry success:", await page.evaluate(() => Boolean(document.querySelector('[role="status"]'))));

  // Navigation via header
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await sleep(800);
  await page.evaluate(() => {
    const link = document.querySelector('header a[href="/agents"]');
    if (link) link.click();
  });
  await sleep(1200);
  console.log("agents nav:", await page.evaluate(() => document.querySelector("h1").textContent.trim().slice(0, 40)));

  // Mobile filters drawer
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(BASE + "/listings", { waitUntil: "networkidle0" });
  await sleep(1000);
  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent.trim().startsWith("Filters")
    );
    if (button) button.click();
  });
  await sleep(700);
  console.log("mobile drawer:", await page.evaluate(() => Boolean(document.querySelector('[role="dialog"][aria-label="Filters"]'))));
  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent.trim().startsWith("Show") && b.textContent.includes("results")
    );
    if (button) button.click();
  });
  await sleep(600);
  console.log("drawer closed:", await page.evaluate(() => !document.querySelector('[role="dialog"][aria-label="Filters"]')));

  await page.screenshot({ path: "C:/rani/vantage-estates/qa/mobile-listings.jpg" });

  console.log("errors:", errors.length);
  errors.slice(0, 8).forEach((e) => console.log(" -", e));
  await browser.close();
})();
