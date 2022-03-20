import BasePage from './base.page';

class CareersPage extends BasePage {
  //link at the top
  readonly openPositionsButton = '[href="#open-positions"]';

  //open position filter buttons
  readonly filterButtons = '.jl-subnav li';

  //open position accordion items
  readonly positions = '.tm-wrapper';
  readonly positionOpenerLinks = `${this.positions} > a`;
  readonly learnMoreButton = `${this.positions} div > a:nth-of-type(1)`;
  readonly applyForPositionButton = `${this.positions} a[href="/contact"]`;

  getPath(): string {
    return '/careers';
  }
}

export default new CareersPage();
