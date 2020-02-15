// Set here the global variables used in the sets.
var config = {
    baseUrl: "http://localhost:3000",
    filesPath: __dirname + '/files',
    screenshotsPath: __dirname + '/screenshots',
    devices: {
        laptop: {
            width: 1200,
            height: 800
        },
        desktop: {
            width: 2560,
            height: 1440
        },
        mobile_portrait: {
            width: 370,
            height: 650
        },
        mobile_landscape: {
            width: 650,
            height: 370
        },
        tablet_portrait: {
            width: 800,
            height: 1024
        },
        tablet_landscape: {
            width: 1024,
            height: 768
        }
    }
};

module.exports = config;
