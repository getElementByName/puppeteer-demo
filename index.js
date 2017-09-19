const puppeteer = require("puppeteer");

const chromeUA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36";
// document.cookie
const naverCookie = "";


puppeteer.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage();
  await page.setUserAgent(chromeUA); // window.navigator.userAgent
  await setCookie(page, naverCookie, ".naver.com");

  await page.goto("https://www.naver.com", { waitUntil: "networkidle" });

  await page.screenshot({ path: "naver.png", fullPage: true });

  await browser.close();
});

async function setCookie(page, cookieString, domain) {
  var cookieSplit = cookieString.split(/\s*;\s*/);

  const cookieTable = cookieSplit
    .map(token => {
      return token.split("=");
    })
    .reduce((sum, [key, value]) => {
      sum[key] = value;
      return sum;
    }, {});

  for (var key in cookieTable) {
    const value = cookieTable[key];

    await page.setCookie({
      name: key,
      value: value,
      domain: domain
    });
  }

  //   const cookieList = await page.cookies("https://www.naver.com");
  //   console.dir(cookieList);
}

async function login() {
  const idElement = await page.$("#id");
  await idElement.click();
  await page.type("id");
  const pwElement = await page.$("#pw");
  await pwElement.click();
  await page.type("pw");
}

async function getUA(page) {
  return await page.evaluate(() => {
    return window.navigator.userAgent;
  });
}

async function getCookie(page) {
  return await page.evaluate(() => {
    return document.cookie;
  });
}
