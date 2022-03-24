import * as loginData from '../../src/data/login.data';
import loginPage from '../../src/pages/login.page';

describe('Mitigram Login page', () => {
  beforeAll(async () => {
    //I would clean up the DB and prepare the proper users for these scenarios here.
    //If there would be a lot scenarios and there are many kind of users to be created, than
    // I would probably move the creation part of the tests to the beginning of each test.
    //I would use some kind of existing API or database manipulation for this.
    //I only would use the (E2E) UI methods for creating these users in worst case scenario,
    // because that is really time consuming.
  });

  afterAll(async () => {
    //Do some additional cleanup if necessary
  });

  beforeEach(async () => {
    await loginPage.open();
    await page.waitForSelector(loginPage.loginButton, { visible: true });
    //cleanup and prep anything else here that would change the outcome of a test executed in a different order etc.
  });

  afterEach(async () => {
    await jestPuppeteer.resetPage();
  });

  it.skip('should go to the landing page when the user enters valid credentials', async () => {
    await loginPage.signIn(loginData.validUser);
    //await page.waitForSelector(landingPage.SomeButton, { visible: true })
    //expect(page.url()).toContain(landingPage.getPath());
    //expect(landingPage.EmailHeaderText).toBe(loginData.email);
  });

  it('should show most controls but no error notification bar by default', async () => {
    const selectorsToBeShown: string[] = [
      loginPage.emailInput,
      loginPage.passwordInput,
      loginPage.loginButton,
      loginPage.forgotPasswordLink,
      loginPage.appStoreLinks,
      loginPage.contactUsLink
    ];

    //wait will fail if one of them is missing
    for (const s of selectorsToBeShown) {
      await page.waitForSelector(s, { visible: true });
    }

    //there should be two appstore links
    expect((await page.$$(loginPage.appStoreLinks)).length).toBe(2);
    //and no error messages
    expect((await page.$$(loginPage.notificationBarError)).length).toBe(0);
  });

  it('should show "Invalid login attempt." error message for an invalid password for a valid user', async () => {
    await page.type(loginPage.emailInput, loginData.validUser.email);
    await page.type(
      loginPage.passwordInput,
      `invalidated!!!!${loginData.validUser.password}`
    );
    await page.click(loginPage.loginButton);
    await page.waitForNetworkIdle();

    const textError = await page.$eval(
      loginPage.notificationBarError,
      (e) => e.textContent
    );

    //I usually don't like to assert on texts, keeping in mind multilingual application,
    // but this page is only available in English
    // and there is no kind of type parameter to check on in the DOM
    expect(textError).not.toBe(null);
    expect(textError).toBe(loginPage.invalidLoginAtteptMessage);
  });

  it('should show the same "Invalid login attempt." error message for an invalid user', async () => {
    await loginPage.signIn(loginData.invalidUser);

    const textError = await page.$eval(
      loginPage.notificationBarError,
      (e) => e.textContent
    );

    expect(textError).not.toBe(null);
    expect(textError).toBe(loginPage.invalidLoginAtteptMessage);
  });

  //Can not test it, it's an assumption, that there is a state like this
  it.skip('should show user is locked message for a locked user', async () => {
    await loginPage.signIn(loginData.lockedUser);

    const textError = await page.$eval(
      loginPage.notificationBarError,
      (e) => e.textContent
    );
    expect(textError).not.toBe(null);
    expect(textError).toBe(loginPage.lockedOutmessage);
  });

  it('should show "Password is required." when password field is left empty', async () => {
    await loginPage.trySignInWithoutPassword(loginData.validUser);

    const textError = await page.$eval(
      loginPage.notificationBarError,
      (e) => e.textContent
    );
    expect(textError).not.toBe(null);
    expect(textError).toBe(loginPage.passwordIsRequiredMessage);
  });

  it('should show "Email is required." and Email is invalid when email field is left empty', async () => {
    await page.click(loginPage.loginButton);
    await page.waitForNetworkIdle();

    const textError = await page.$eval(
      loginPage.notificationBarError,
      (e) => e.textContent
    );
    expect(textError).not.toBe(null);
    expect(textError).toContain(loginPage.emailIsRequiredMessage);
    expect(textError).toContain(loginPage.emailIsInvalidMessage);
  });

  //I dont like when a test name is dynamically put together, but to create a data provider
  // and make it more readable in the logs it's faster this way
  it.each`
    email                       | message
    ${'somestring'}             | ${loginPage.emailIsInvalidMessage}
    ${'somestring@'}            | ${loginPage.emailIsInvalidMessage}
    ${'somestring@somedomain'}  | ${loginPage.emailIsInvalidMessage}
    ${'somestring@somedomain.'} | ${loginPage.emailIsInvalidMessage}
    ${'@'}                      | ${loginPage.emailIsInvalidMessage}
    ${'@somedomain'}            | ${loginPage.emailIsInvalidMessage}
    ${'@somedomain.com'}        | ${loginPage.emailIsInvalidMessage}
  `(
    'should show "$message" when email is "$email"',
    async ({ email, message }) => {
      await page.type(loginPage.emailInput, email);
      await page.click(loginPage.loginButton);
      await page.waitForNetworkIdle();

      const textError = await page.$eval(
        loginPage.notificationBarError,
        (e) => e.textContent
      );
      expect(textError).not.toBe(null);
      expect(textError).toBe(message);
    }
  );

  it('should hide the password field content', async () => {
    const passwordEntered = 'Password';
    await page.type(loginPage.passwordInput, passwordEntered);

    const password = await page.$eval(
      loginPage.passwordInput,
      (e) => e.textContent
    );
    expect(password).not.toBe(null);
    expect(password).not.toBe(passwordEntered);
    expect(password).toBe('');
  });

  it.skip('should open the Forgot password page when the link is clicked', async () => {
    //TODO
  });

  it.skip('should open the Apple Appstore page when the link is clicked', async () => {
    //TODO
  });

  it.skip('should open the Google Play page when the link is clicked', async () => {
    //TODO
  });

  it.skip('should open the Contact page when the link is clicked', async () => {
    //TODO
  });

  it.skip('should open the Forgot password page when the link is clicked', async () => {
    //TODO
  });

  it.skip('should allow to use "Enter" key to submit credentials', async () => {
    //TODO
  });

  it.skip('should not allow too long texts in email field', async () => {
    //TODO
  });

  it.skip('should not allow too long texts in password field', async () => {
    //TODO
  });
});
