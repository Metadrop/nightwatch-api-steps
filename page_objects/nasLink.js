/**
 * Basic steps: assert page contains text, go to...
 */
module.exports = {
  url: function () {
    return this.api.launchUrl;
  },
  elements: {},
  commands: [
    {
      clickLink: function (locator) {
        let selector = this.getLinkSelector(locator);
        this.api.assert.visible(selector);
        return this.api.click(selector);
      },
      assertLinkVisible: function (locator) {
        let selector = this.getLinkSelector(locator);
        return this.api.assert.visible(selector);
      },
      assertLinkNotPresent: function (locator) {
        let selector = this.getLinkSelector(locator);
        return this.api.expect.element(selector).to.be.not.present;
      },
      getLinkSelector: function(locator) {
        let xpath = '//a[contains(text(), "' + locator + '")'
        + ' or contains(@alt,"' + locator + '") or @id="' + locator + '"'
        + ' or contains(@title, "' + locator + '")]';
        return {selector: xpath, locateStrategy: 'xpath'};
      }
    }
  ],
  // object version (best considered immutable)
  props: {
    waitForElementTime: 1000,
    waitTime: 1000
  },
  sections: { }
};
