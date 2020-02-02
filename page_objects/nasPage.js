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
      assertPageContainsText: function (text) {
          return this.api.assert.containsText('html', text);
      },
      assertPageNotContainsText: function (text) {
        return this.api.assert.not.containsText('html', text);
      }
    }
  ],
  // object version (best considered immutable)
  props: {},
  sections: { }
};
