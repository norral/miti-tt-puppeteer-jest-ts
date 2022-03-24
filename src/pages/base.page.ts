import 'dotenv/config';

export default abstract class BasePage {
  //Most of the pages are based on the same <sub_domain>.<domain>.com/<path> pattern, so we can save some time to delegate the responsibility
  // to the page objects to tell what are their <path>
  abstract getPath(): string;

  //this way we can centralize this open function here to keep our code DRY
  async open(): Promise<void> {
    await page.goto(`${process.env.BASE_URL as string}${this.getPath()}`, {
      waitUntil: 'domcontentloaded'
    });
  }

  //this could be easily a helper function in an other file, but seemed reasonable that this would work on all of our pages
  //Known issue: https://github.com/facebook/jest/issues/7962
  // jest --coverage breaks the evaluate function here, so had to ignore it from coverage...
  /* istanbul ignore next */
  async getScrollPosition(): Promise<number> {
    const html = await page.$('html');
    return html
      ? Number(await html.evaluate((e) => e.getAttribute('data-scroll')))
      : -1;
  }
}
