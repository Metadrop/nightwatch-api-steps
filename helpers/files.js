const { client } = require('nightwatch-api');

/**
 * Get the path where files are located.
 */
function getFilesPath() {
    if (typeof client.globals.filesPath === 'undefined') {
        throw new Error('Files path is not set in globals file.');
    }
    return client.globals.filesPath;
}

/**
 * Get the real path for a relative path used in tests. 
 */
function getFilesRealPath(relative_path) {
    return getFilesPath() + '/' + relative_path;
}

module.exports.getFilesPath = getFilesPath;
module.exports.getFilesRealPath = getFilesRealPath;
