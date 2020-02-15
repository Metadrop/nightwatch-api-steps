const selectors = require('../helpers/selectors');
const { client } = require('nightwatch-api');

/**
 * Press a button or an input of type submit.
 *
 * @param {string} locator
 *   Button's text, or input's value.
 */
module.exports.command = function(locator) {
    let button = selectors.buildButtonSelector(locator);
    client.assert.visible(button);
    client.click(button);
    return this;
};
