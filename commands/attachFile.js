const selectors = require('../helpers/selectors');
const files = require('../helpers/files');
const { client } = require('nightwatch-api');

/**
 * Attach a file to a input field.
 *
 * The file must exists in the folder specified in field_path,
 * at globals.json.
 */
module.exports.command = async (relative_path, locator) => {
    let selector = selectors.buildInputSelector(locator, 'file');
    let fullpath = files.getFilesRealPath(relative_path);
    client.assert.visible(selector);
    return await client.setValue(selector, fullpath);
};