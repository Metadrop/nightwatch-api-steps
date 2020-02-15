const { client } = require('nightwatch-api');

/**
 * Click a link.
 */
module.exports.command = function() {
    if (typeof offset === 'undefined') {
        offset = 0;
    }
    return client.moveToElement(selector, offset, offset);
    return this;
};
