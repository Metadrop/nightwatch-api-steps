const devices = require('../helpers/devices');
const { client } = require('nightwatch-api');

/**
 * Resize to a specific device dimensions.
 *
 * @param {string} device_name
 *   Device name.
 */
module.exports.command = function(device_name) {
    let device = devices.getDevice(device_name);
    client.resizeWindow(device.width, device.height);
    return this;
};
