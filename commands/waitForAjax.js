const { client } = require('nightwatch-api');

/**
 * Wait for ajax to finish.
 *
 * @param {string} url
 *   Url to wait. If undefined, just wait to the first AJAX request.
 * @param {int} seconds
 *   Seconds to wait, default 1.
 */
module.exports.command = function(url, seconds) {

    if (seconds === undefined) {
        seconds = 1;
    }

    client.executeAsync(
        function waitForAjax(expectedUrl, seconds, done) {
            let oldXHROpen = window.XMLHttpRequest.prototype.open;
            window.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
                // do something with the method, url and etc.
                this.addEventListener('load', function () {
                    if (expectedUrl === null || url.indexOf(expectedUrl) !== -1) {
                        done({
                            finished: true
                        });
                    }
                });
                return oldXHROpen.apply(this, arguments);
            }
            setTimeout(function () {
                done({
                    finished: false
                });
            }, seconds * 1000);
        },
        [url, seconds],
        function (resultVal) {
          client.assert.ok(resultVal.value.finished === true, 'AJAX was completed successfully');
        }
      );
};
