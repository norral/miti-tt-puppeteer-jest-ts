import loginPage from '../../src/pages/login.page';

describe('Mitigram Login page', () => {
  //Probably better ways are out there to test it and penetration testing is needed reguralry by experts anyway,
  // but good to have some very basic test like this in the scope

  beforeEach(async () => {
    await loginPage.open();
    await page.waitForSelector(loginPage.loginButton, { visible: true });
    //cleanup and prep anything that would change the outcome of a test executed in a different order etc.
  });

  afterEach(async () => {
    await jestPuppeteer.resetPage();
  });

  it('should not allow XSS attack in email field', async () => {
    await page.type(loginPage.emailInput, '<script>alert("XSS")</script>');
    await page.click(loginPage.loginButton);
    const dialogHandler = jest.fn((dialog) => dialog.dismiss());
    page.on('dialog', dialogHandler);
    expect(dialogHandler).not.toHaveBeenCalled();
  });

  it.skip('should not allow SQL injection attack in email field', async () => {
    //TODO
  });
});
