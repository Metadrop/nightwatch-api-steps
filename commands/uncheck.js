const selectors = require('../helpers/selectors');
const { client } = require('nightwatch-api');

/**
 * Uncheck a checkbox.
 *
 * @param {string} label
 *   Checkbox label.
 */
module.exports.command = function(label) {
    let selector = selectors.buildInputSelector(label, 'checkbox');
    client.assert.visible(selector);
    client.expect.element(selector).to.have.property('checked').equals(true);
    client.click(selector);
    return this;
};
