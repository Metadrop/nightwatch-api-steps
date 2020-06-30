const selectors = require('../helpers/selectors');
const { client } = require('nightwatch-api');

/**
 * Fill a field.
 *
 * @param {string} label
 *   Label of the field.
 * @param {mixed} value
 *   Value of the field.
 */
module.exports.command = function(label, value) {
    let selector = selectors.buildInputSelector(label);
    client.assert.visible(selector);
    client.clearValue(selector);
    client.setValue(selector, value);
    return this;
};
