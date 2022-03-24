import { IUser } from '../interfaces/iUser';
import { validUser } from '../data/login.data';
import BasePage from './base.page';

class LoginPage extends BasePage {
  //login controls
  readonly emailInput = '#Email';
  readonly passwordInput = '#Password';
  readonly loginButton = '#loginBtn';
  readonly notificationBarError = '.noty_bar';

  //other links
  readonly forgotPasswordLink = 'a[href="/Account/ForgotPassword"]';
  readonly appStoreLinks = '#app-store-badges a';
  readonly contactUsLink = '.registration-call a';

  //error messages
  readonly invalidLoginAtteptMessage = 'Invalid login attempt.';
  readonly lockedOutmessage =
    'Your account has been locked, please contact support for assistnace.';
  readonly passwordIsRequiredMessage = 'Password is required.';
  readonly emailIsRequiredMessage = 'Email is required.';
  readonly emailIsInvalidMessage =
    'The Email field is not a valid e-mail address.';

  getPath(): string {
    return '/Account/Login';
  }

  async open(): Promise<void> {
    await page.goto(
      'https://marketplace.mitigram.com/Account/Login?ReturnUrl=%2F',
      { waitUntil: 'domcontentloaded' }
    );
  }

  //probably we will use this several times
  async signIn(user: IUser): Promise<void> {
    await page.type(this.emailInput, user.email);
    await page.type(this.passwordInput, user.password);
    await page.click(this.loginButton);
    return await page.waitForNetworkIdle();
  }

  //and this one even more times
  async signInWithDefaultUser(): Promise<void> {
    return await this.signIn(validUser);
  }

  async trySignInWithoutPassword(user: IUser): Promise<void> {
    await page.type(this.emailInput, user.email);
    await page.click(this.loginButton);
    return await page.waitForNetworkIdle();
  }
}

export default new LoginPage();
