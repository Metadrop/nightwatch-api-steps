const selectors = require('../helpers/selectors');
const { client } = require('nightwatch-api');

/**
 * Fill a field.
 *
 * @param {string} label
 *   Label of the field.
 * @param {mixed} value
 *   Value of the field.
 * @param {mixed} region
 *   Region.
 */
module.exports.command = function(label, value, region) {
    let selector = selectors.buildInputSelector(label, null, region);
    client.assert.visible(selector);
    client.clearValue(selector);
    client.setValue(selector, value);
    return this;
};
