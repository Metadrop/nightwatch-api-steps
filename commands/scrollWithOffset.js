const { client } = require('nightwatch-api');

/**
 * Scrolls to a selector with a specific offset.
 *
 * @param {string} selector
 *   Selector.
 * @param {int} offset
 *   offset.
 */
module.exports.command = function(selector, offset) {
    if (typeof offset === 'undefined') {
        offset = 0;
    }
    return client.moveToElement(selector, offset, offset);
    return this;
};
