const { client } = require('nightwatch-api');

/**
 * Save a screenshot ith file name to a specific directory.
 *
 * @param {string} filename
 *   File name.
 * @param {string} directory
 *   Directory where the file is saved (optional). 
 *   By default it takes the directory defined at globals.sreenshotsPath.
 */
module.exports.command = function(filename, directory) {
    if (typeof directory === 'undefined') {
        directory = client.globals.screenshotsPath;
    }

    let destination = directory + '/' + filename;
    client.saveScreenshot(destination);
    console.log('Saved screenshot at ' + destination)
    return this;
};
