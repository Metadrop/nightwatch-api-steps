const { client } = require('nightwatch-api');

/**
 * Get the info of a specific device.
 *
 * @param {string} device 
 *   Device name (mobile_portrait, desktop...).
 */
function getDevice(device) {
    if (typeof(client.globals.devices) != undefined && typeof(client.globals.devices[device]) === 'object'
        && typeof(client.globals.devices[device].width) === "number"
        && typeof(client.globals.devices[device].height) === "number") {
        return client.globals.devices[device];
    }
    else {
        throw new Error('Device ' + device + ' not found.');
    }
}

module.exports.getDevice = getDevice;