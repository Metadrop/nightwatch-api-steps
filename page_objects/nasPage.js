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
      goToUrl(url) {
        return this.api.url(url)
          .waitForElementVisible('body', this.waitForElementTime);
      },
      assertPageContainsText: function (text) {
          return this.api.assert.containsText('html', text);
      },
      assertPageNotContainsText: function (text) {
        return this.api.assert.not.containsText('html', text);
      },
      scrollWithOffset: function (selector, offset) {
        if (typeof offset === 'undefined') {
          offset = 0;
        }
        return this.api.moveToElement(selector, offset, offset);
      },
      assertUrlContains: function (urlText) {
        return this.api.expect.url().to.contain(urlText);
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
