import careersPage from '../../src/pages/careers.page';

describe('Mitigram Careers page', () => {
  beforeEach(async () => {
    await careersPage.open();
  });

  afterEach(async () => {
    await jestPuppeteer.resetPage();
  });

  it('should expand a position when the position link is clicked', async () => {
    const positionLinks = await page.$$(careersPage.positionOpenerLinks);
    await positionLinks[1].click();

    const positionSelectors = await page.$$(careersPage.positions);
    const classname = await positionSelectors[1].evaluate((e) =>
      e.getAttribute('class')
    );

    expect(classname).not.toBe(null);
    expect(classname).toContain('jl-open');
  });

  it.skip('should open a pdf when "Learn more" is clicked', async () => {
    //TODO
  });

  it.skip('should open the Contact page when "Apply for this position" is clicked', async () => {
    //TODO
  });

  it('should filter positions when an other filter is selected', async () => {
    //before filtering
    const numberOfVisiblePositionsBeforeFilter = await page.$$eval(
      careersPage.positions,
      (elements) => {
        return elements
          .map((e) => window.getComputedStyle(e).getPropertyValue('display'))
          .filter((e) => e !== 'none').length;
      }
    );

    //after filtering
    const filterLinks = await page.$$(careersPage.filterButtons);
    await filterLinks[1].click();

    //huge hack, but better than waiting for seoconds...
    // await page.waitForFunction(`document.querySelector("${careersPage.filterLinkSelectors}:nth-of-type(2)").getAttribute("class").includes("jl-active")`);

    //could not make that work
    await page.waitForTimeout(1000);

    const numberOfVisiblePositionsAfterFilter = await page.$$eval(
      careersPage.positions,
      (elements) => {
        return elements
          .map((e) => window.getComputedStyle(e).getPropertyValue('display'))
          .filter((e) => e !== 'none').length;
      }
    );

    expect(numberOfVisiblePositionsAfterFilter).toBeLessThan(
      numberOfVisiblePositionsBeforeFilter
    );
  });

  it('should collapse a position when another is clicked', async () => {
    const positionLinks = await page.$$(careersPage.positionOpenerLinks);
    await positionLinks[1].click();
    await positionLinks[0].click();

    const positions = await page.$$(careersPage.positions);
    const classNameWitchShouldBeOpen = await positions[0].evaluate((e) =>
      e.getAttribute('class')
    );
    const classNameWhichShouldBeClosed = await positions[1].evaluate((e) =>
      e.getAttribute('class')
    );

    expect(classNameWitchShouldBeOpen).not.toBe(null);
    expect(classNameWhichShouldBeClosed).not.toBe(null);

    expect(classNameWitchShouldBeOpen).toContain('jl-open');
    expect(classNameWhichShouldBeClosed).not.toContain('jl-open');
  });

  it('should scroll down when "Open positions" is clicked', async () => {
    await page.click(careersPage.openPositionsButton);
    const scrollPosition = await careersPage.getScrollPosition();

    expect(scrollPosition).toBeGreaterThan(2000);
    expect(scrollPosition).toBeLessThan(2400);
  });

  it('should not be scrolled when opened', async () => {
    expect(await careersPage.getScrollPosition()).toBe(0);
  });

  it('should show default controls and sections when opnened', async () => {
    //like Life at Mitigram section with its images
    //like the whole subsription page fragment and Miti footer page fragment etc.
  });
});
