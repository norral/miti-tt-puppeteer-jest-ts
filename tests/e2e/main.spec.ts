import careersPage from '../../src/pages/careers.page';
import loginPage from '../../src/pages/login.page';
import mainPage from '../../src/pages/main.page';

describe('Main page', () => {
  beforeEach(async () => {
    await mainPage.open();
  });

  afterEach(async () => {
    await jestPuppeteer.resetPage();
  });

  it('should open the Login page when "Login button" is clicked', async () => {
    await page.click(mainPage.loginButton);
    expect(page.url()).toContain(loginPage.getPath());
  });

  it('should open the Careers page when "Careers link" is clicked', async () => {
    //accpet Cookie popup
    await page.waitForSelector(mainPage.acceptCookieButton, { visible: true });
    await page.click(mainPage.acceptCookieButton);
    await page.waitForSelector(mainPage.careersLink, { visible: true });

    //goto Careers
    await page.click(mainPage.careersLink);
    await page.waitForSelector(careersPage.applyForPositionButton);

    expect(page.url()).toContain(careersPage.getPath());
  });
});
