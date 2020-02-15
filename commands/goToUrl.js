const { client } = require('nightwatch-api');

/**
 * Go to a specific url.
 *
 * @param {string} url
 *   Url.
 * @param {int} wait
 *   Time to wait for body.
 */
module.exports.command = function(url, wait) {
    if (typeof wait !== 'number') {
        wait = 500;
    }
    client.url(url)
        .waitForElementVisible('body', wait);
    return this;
};
