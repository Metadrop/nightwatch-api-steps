const { client } = require('nightwatch-api');

/**
 * Click a link.
 */
module.exports.command = function(url, wait) {
    if (typeof wait !== 'number') {
        wait = 500;
    }
    client.url(url)
        .waitForElementVisible('body', wait);
    return this;
};
