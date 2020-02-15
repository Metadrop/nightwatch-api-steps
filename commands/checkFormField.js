const selectors = require('../helpers/selectors');
const { client } = require('nightwatch-api');

/**
 * Check a checkbox / radio in a form.
 *
 * @param {string} label
 *   Form element label.
 * @param {string} type
 *   Form element type, default checkbox.
 */
module.exports.command = function(label, type) {
    if (typeof type !== 'string') {
        type = 'checkbox';
    }
    let selector = selectors.buildInputSelector(label, type);
    client.assert.visible(selector);
    client.expect.element(selector).to.have.property('checked').not.equals(true);
    client.click(selector);
    return this;
};
