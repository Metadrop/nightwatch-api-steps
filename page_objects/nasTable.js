/**
 * Table commands.
 */
module.exports = {
  url: function () {
    return this.api.launchUrl;
  },
  elements: {},
  commands: [
    {
      getTableRowWithTextXpath: function(text) {
        let xpath = '//table//tr[contains(*, "' + text + '")]';
        return {selector: xpath, locateStrategy: 'xpath'};
      },
      assertTableRowContainsText: function (text) {
        let xpath = this.getTableRowWithTextXpath(text);
        return this.api.assert.visible(xpath);
      },
      assertTableRowNotContainsText: function (text) {
        let xpath = this.getTableRowWithTextXpath(text);
        return this.api.expect.element(xpath).to.not.be.present;
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
