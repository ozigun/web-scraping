const puppeteer = require("puppeteer");

const link = ["https://www.trendyol.com/elbise-x-c56"];
puppeteer
  .launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--window-size=1920,1080",
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
    ],
  })
  .then(async (browser) => {
    const page = await browser.newPage();

    for (let i = 0; i < link.length; i++) {
      await page.goto(link[i]);
      await page.waitForSelector("body");

      var productInfo = await page.evaluate(() => {
        /* Get product title */
        let title = document.body.querySelector(".breadcrumb-item").innerText;
        //let img = document.body.querySelector(".a-dynamic-image").src;
        // let price = document.body.querySelector(".priceBlockBuyingPriceString")
        //  .innerText;
        // let price2 = document.body.querySelector(".priceBlockDealPriceString")
        // .innerText;
        // let about = document.body.querySelector("#feature-bullets").innerText;

        var product = {
          title: title,
          //img: img,
          //price: price,
          // dealPrice: price2,
          link: "",
          //about: about,
        };

        return product;
      });

      productInfo.link = link[i];

      console.log(productInfo, ",");
    }
    await browser.close();
  })
  .catch(function (error) {
    console.error(error);
  });
