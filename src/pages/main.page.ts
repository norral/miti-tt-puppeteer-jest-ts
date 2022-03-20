import BasePage from './base.page';

class MainPage extends BasePage {
  readonly acceptCookieButton = '.cc-compliance a';
  readonly loginButton = '#g-navigation a[href*="Account/Login"]';
  readonly careersLink = 'a[href="/careers"]';

  getPath(): string {
    return '';
  }
}

export default new MainPage();
